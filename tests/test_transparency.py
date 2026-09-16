"""Synthetic mask regression checks, independent of monument visual review."""
import importlib.util
import unittest
from pathlib import Path

import numpy as np
from PIL import Image

spec = importlib.util.spec_from_file_location("extractor", Path(__file__).resolve().parents[1] / "scripts/extract-transparent-background.py")
extractor = importlib.util.module_from_spec(spec)
spec.loader.exec_module(extractor)
delivery_spec = importlib.util.spec_from_file_location("delivery", Path(__file__).resolve().parents[1] / "scripts/prepare-colored-avif.py")
delivery = importlib.util.module_from_spec(delivery_spec)
delivery_spec.loader.exec_module(delivery)


class TransparencyTests(unittest.TestCase):
    def test_white_color_preserves_enclosed_white_stone_and_dark_recess(self):
        rgb = np.full((11, 11, 3), 255, dtype=np.uint8)
        rgb[2:9, 2:9] = [100, 110, 120]
        rgb[4:6, 4:6] = 255
        rgb[7, 7] = [10, 12, 14]
        result, report = delivery.prepare_source(Image.fromarray(rgb), 'new', 'hash', preparation={
            'method': 'white-matte-v1', 'sourceSha256': 'hash'})
        out = np.asarray(result)
        self.assertEqual(out[0, 0, 3], 0)
        self.assertEqual(out[4, 4, 3], 255)
        self.assertEqual(out[7, 7, 3], 255)
        np.testing.assert_array_equal(out[3:8, 3:8, :3], rgb[3:8, 3:8])
        self.assertTrue(report['interiorRgbUnchanged'])
        seeded, _ = delivery.white_matte.extract_color(Image.fromarray(rgb), [(4, 4)])
        self.assertEqual(np.asarray(seeded)[4, 4, 3], 0)
        with self.assertRaises(ValueError):
            delivery.prepare_source(Image.fromarray(rgb), 'new', 'changed', preparation={
                'method': 'white-matte-v1', 'sourceSha256': 'hash'})

    def test_white_edges_are_unmatted_without_erasing_dark_outline(self):
        rgb = np.full((7, 7, 3), 255, dtype=np.uint8)
        rgb[2:5, 2:5] = 0
        rgb[1, 3] = 127
        result, _ = delivery.white_matte.extract_color(Image.fromarray(rgb))
        out = np.asarray(result)
        np.testing.assert_array_equal(out[1, 3], [0, 0, 0, 128])
        np.testing.assert_array_equal(out[3, 3], [0, 0, 0, 255])

    def test_white_line_removes_enclosed_paper_and_rejects_bad_background(self):
        rgb = np.full((7, 7, 3), 254, dtype=np.uint8)
        rgb[2:5, 2:5] = 0
        rgb[3, 3] = 254
        result = delivery.white_matte.extract_line(Image.fromarray(rgb), (100, 150, 120))
        out = np.asarray(result)
        np.testing.assert_array_equal(out[2, 2], [100, 150, 120, 255])
        self.assertEqual(out[3, 3, 3], 0)
        for invalid in [Image.new('RGB', (7, 7), 'white'), Image.new('RGB', (7, 7), 'gray')]:
            with self.assertRaises(ValueError):
                delivery.white_matte.extract_color(invalid)

    def test_exterior_removed_but_enclosed_shadow_preserved(self):
        rgb = np.full((11, 11, 3), [11, 10, 8], dtype=np.uint8)
        rgb[2:9, 2:9] = [100, 120, 150]
        rgb[4:7, 4:7] = [11, 10, 8]
        result, _ = extractor.extract(Image.fromarray(rgb), 12)
        pixels = np.asarray(result)
        self.assertEqual(pixels[0, 0, 3], 0)
        self.assertEqual(pixels[2, 2, 3], 255)
        self.assertEqual(pixels[5, 5, 3], 255)
        np.testing.assert_array_equal(pixels[:, :, :3], rgb)
        result, _ = extractor.extract(Image.fromarray(rgb), 12, [(5, 5)])
        self.assertEqual(np.asarray(result)[5, 5, 3], 0)
        self.assertEqual(np.asarray(result)[2, 2, 3], 255)

    def test_cropped_subject_is_not_used_as_background_median(self):
        rng = np.random.default_rng(7)
        rgb = rng.integers(100, 240, size=(40, 40, 3), dtype=np.uint8)
        rgb[:12] = [12, 12, 9]
        result, report = extractor.extract(Image.fromarray(rgb), 12, border_policy="dominant")
        self.assertEqual(report["matteRgb"], [12, 12, 9])
        self.assertEqual(np.asarray(result)[0, 0, 3], 0)
        self.assertEqual(np.asarray(result)[39, 39, 3], 255)

    def test_empty_subject_and_invalid_seed_rejected(self):
        plain = Image.new("RGB", (10, 10), (11, 10, 8))
        with self.assertRaises(ValueError):
            extractor.extract(plain)
        rgb = np.asarray(plain).copy()
        rgb[3:7, 3:7] = 200
        with self.assertRaises(ValueError):
            extractor.extract(Image.fromarray(rgb), seeds=[(5, 5)])

    def test_native_alpha_is_preserved_and_new_opaque_generation_rejected(self):
        rgba = np.zeros((4, 4, 4), dtype=np.uint8)
        rgba[1, 1] = [80, 60, 40, 255]
        rgba[1, 2] = [80, 60, 40, 64]
        result, report = delivery.prepare_source(Image.fromarray(rgba), 'new_site', 'new_hash')
        np.testing.assert_array_equal(np.asarray(result), rgba)
        self.assertEqual(report['method'], 'existing-alpha-preserved')
        for image in [Image.new('RGB', (4, 4), 'black'), Image.new('RGBA', (4, 4), (20, 20, 20, 255))]:
            with self.assertRaises(ValueError):
                delivery.prepare_source(image, 'new_site', 'new_hash')

    def test_changed_opaque_legacy_source_is_not_silently_cut_out(self):
        with self.assertRaises(ValueError):
            delivery.prepare_source(Image.new('RGB', (4, 4)), 'old_site', 'changed_hash', 'old_hash')

    def test_batch_review_does_not_reset_approved_cached_images(self):
        self.assertEqual(delivery.review_status({'a': {'visualReview': 'approved_user'}}), 'approved_user')
        self.assertEqual(delivery.review_status({'a': {'visualReview': 'approved_user'}, 'new': {'visualReview': 'pending_user'}}), 'pending_user')


if __name__ == "__main__":
    unittest.main()
