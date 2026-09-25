"""Synthetic mask regression checks, independent of monument visual review."""
import importlib.util
import json
import shutil
import subprocess
import sys
import tempfile
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

    def test_prototype_does_not_reject_tinted_lines_or_nonwhite_borders(self):
        rgb = np.full((7, 7, 3), 240, dtype=np.uint8)
        rgb[2:5, 2:5] = [90, 70, 40]
        image = Image.fromarray(rgb)
        with self.assertRaises(ValueError):
            delivery.white_matte.extract_line(image, (100, 150, 120))
        result = delivery.prototype_matte.extract_line(image, (100, 150, 120))
        np.testing.assert_array_equal(np.asarray(result)[3, 3, :3], [100, 150, 120])
        self.assertGreater(np.asarray(result)[3, 3, 3], 0)
        np.testing.assert_array_equal(np.asarray(image), rgb)

    def test_prototype_keeps_stone_and_dark_recess_and_skips_invalid_seeds(self):
        rgb = np.full((11, 11, 3), 255, dtype=np.uint8)
        rgb[2:9, 2:9] = [100, 110, 120]
        rgb[4:6, 4:6] = 255
        rgb[7, 7] = [10, 12, 14]
        result, report = delivery.prepare_source(Image.fromarray(rgb), 'new', 'hash',
                                                preparation={'seeds': [[-1, 2], [7, 7]]}, prototype=True)
        out = np.asarray(result)
        self.assertEqual(out[0, 0, 3], 0)
        self.assertEqual(out[4, 4, 3], 255)
        self.assertEqual(out[7, 7, 3], 255)
        self.assertEqual(report['skippedSeeds'], [[-1, 2], [7, 7]])

    def test_prototype_accepts_opaque_delivery_and_human_review_without_quality_gate(self):
        record = {'sourceSha256': 'source', 'inputSha256': 'png', 'sha256': 'avif',
                  'alpha': {'min': 255, 'max': 255}, 'visualReview': 'pending_user'}
        review = {'status': 'approved_user', 'reviewer': 'user', 'sourceSha256': 'source',
                  'inputSha256': 'png', 'avifSha256': 'avif'}
        self.assertEqual(delivery.apply_user_review(record, review)['visualReview'], 'approved_user')
        changed = {**review, 'sourceSha256': 'different'}
        self.assertEqual(delivery.apply_user_review(record, changed)['visualReview'], 'pending_user')
        image, _ = delivery.prepare_source(Image.new('RGB', (4, 4), 'white'), 'new', 'hash', prototype=True)
        self.assertEqual(image.getextrema()[3], (255, 255))
        self.assertTrue(delivery.prototype_matte.prototype_enabled([]))
        self.assertFalse(delivery.prototype_matte.prototype_enabled(['--strict']))

    def test_prototype_transcodes_and_reuses_user_approved_opaque_file(self):
        saved = delivery.ROOT, delivery.OUTPUT, delivery.PNG_OUTPUT
        with tempfile.TemporaryDirectory(prefix='fanggu-prototype-') as directory:
            try:
                delivery.ROOT = Path(directory)
                delivery.OUTPUT = delivery.ROOT / 'assets/colored-transparent-avif'
                delivery.PNG_OUTPUT = delivery.ROOT / 'assets/colored-transparent'
                delivery.OUTPUT.mkdir(parents=True)
                delivery.PNG_OUTPUT.mkdir(parents=True)
                source = 'source.png'
                Image.new('RGB', (4, 4), 'gray').save(delivery.ROOT / source)
                source_hash = delivery.digest(delivery.ROOT / source)
                _, record, reused = delivery.convert('demo', source, source_hash, {}, prototype=True)
                self.assertFalse(reused)
                self.assertEqual(record['visualReview'], 'pending_user')
                self.assertEqual(record['alpha']['min'], 255)
                review = {'status': 'approved_user', 'reviewer': 'user', 'sourceSha256': source_hash,
                          'inputSha256': record['inputSha256'], 'avifSha256': record['sha256']}
                _, approved, reused = delivery.convert('demo', source, source_hash, record, prototype=True, user_review=review)
                self.assertTrue(reused)
                self.assertEqual(approved['visualReview'], 'approved_user')
                self.assertEqual(approved['sha256'], record['sha256'])
                with self.assertRaises(ValueError):
                    delivery.convert('demo', source, source_hash, record, prototype=False)
            finally:
                delivery.ROOT, delivery.OUTPUT, delivery.PNG_OUTPUT = saved

    def test_prototype_main_reuses_existing_strict_delivery_and_records_user_acceptance(self):
        with tempfile.TemporaryDirectory(prefix='fanggu-prototype-main-') as directory:
            root = Path(directory)
            (root / 'scripts').mkdir()
            for name in ['prepare-colored-avif.py', 'white-matte.py', 'prototype-matte.py',
                         'extract-transparent-background.py', 'plate-policy.json']:
                shutil.copyfile(delivery.ROOT / 'scripts' / name, root / 'scripts' / name)
            (root / 'assets/color-research').mkdir(parents=True)
            (root / 'assets/colored').mkdir()
            source = 'assets/colored/demo.png'
            rgb = np.full((11, 11, 3), 255, dtype=np.uint8)
            rgb[2:9, 2:9] = [80, 90, 100]
            Image.fromarray(rgb).save(root / source)
            meta = {'id': 'demo', 'output': source, 'status': 'needs_review', 'background_preparation': {
                'method': 'white-matte-v1', 'sourceSha256': delivery.digest(root / source), 'seeds': []}}
            record_path = root / 'assets/color-research/demo.json'
            record_path.write_text(json.dumps(meta))
            (root / 'assets/color-research/queue.json').write_text(json.dumps({
                'entries': [{'id': 'demo', 'output': source, 'record': 'assets/color-research/demo.json'}], 'excluded': []}))
            command = [sys.executable, '-B', str(root / 'scripts/prepare-colored-avif.py')]
            subprocess.run(command + ['--strict'], check=True, capture_output=True, text=True)
            manifest_path = root / 'assets/color-research/avif-manifest.json'
            before = json.loads(manifest_path.read_text())['images']['demo']
            meta['user_review'] = {'status': 'approved_user', 'reviewer': 'user', 'sourceSha256': before['sourceSha256'],
                                   'inputSha256': before['inputSha256'], 'avifSha256': before['sha256']}
            record_path.write_text(json.dumps(meta))
            result = subprocess.run(command, check=True, capture_output=True, text=True)
            after = json.loads(manifest_path.read_text())['images']['demo']
            self.assertIn('1 reused', result.stdout)
            self.assertEqual(after['sha256'], before['sha256'])
            self.assertEqual(after['inputSha256'], before['inputSha256'])
            self.assertEqual(after['backgroundPreparation'], before['backgroundPreparation'])
            self.assertEqual(after['visualReview'], 'approved_user')


if __name__ == "__main__":
    unittest.main()
