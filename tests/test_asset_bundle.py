"""Small offline round trips for the ignored asset bundle workflow."""

import importlib.util
import json
import subprocess
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts/asset-bundle.py"
SPEC = importlib.util.spec_from_file_location("asset_bundle", SCRIPT)
bundle = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(bundle)


class AssetBundleTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name) / "author"
        self.root.mkdir()
        subprocess.run(["git", "init", "-q", str(self.root)], check=True)
        (self.root / ".gitignore").write_text("/assets/**/*.png\n/assets/**/*.avif\n/assets/references/\n", encoding="utf-8")
        catalog_path = self.root / "ios/Fanggu/Resources/catalog.json"
        catalog_path.parent.mkdir(parents=True)
        catalog_path.write_text(json.dumps([{"lineImage": "one.png", "colorImage": "one.avif"}]))
        for name, content in (("assets/plates/one.png", b"line"), ("assets/colored-transparent-avif/one.avif", b"color"), ("assets/longmen-vairocana.png", b"hero"), ("assets/references/photo.png", b"private photo")):
            path = self.root / name
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(content)
        bundle.make_lock(self.root)
        self.lock = bundle.read_lock(self.root)
        self.package = Path(self.temp.name) / "package"
        bundle.pack(self.root, self.lock, self.package)
        self.clone = Path(self.temp.name) / "clone"
        (self.clone / "assets").mkdir(parents=True)
        (self.clone / "assets/asset-lock.json").write_bytes((self.root / "assets/asset-lock.json").read_bytes())
        cloned_catalog = self.clone / "ios/Fanggu/Resources/catalog.json"
        cloned_catalog.parent.mkdir(parents=True)
        cloned_catalog.write_bytes((self.root / "ios/Fanggu/Resources/catalog.json").read_bytes())

    def test_runtime_then_full_restore(self):
        bundle.restore(self.clone, self.lock, self.package, "runtime", False)
        self.assertFalse((self.clone / "assets/references/photo.png").exists())
        bundle.restore(self.clone, self.lock, self.package, "full", False)
        self.assertEqual((self.clone / "assets/references/photo.png").read_bytes(), b"private photo")

    def test_conflicting_file_is_preserved_without_force(self):
        target = self.clone / "assets/plates/one.png"
        target.parent.mkdir(parents=True)
        target.write_bytes(b"local edit")
        with self.assertRaisesRegex(ValueError, "Existing asset differs"):
            bundle.restore(self.clone, self.lock, self.package, "runtime", False)
        self.assertEqual(target.read_bytes(), b"local edit")
        bundle.restore(self.clone, self.lock, self.package, "runtime", True)
        self.assertEqual(target.read_bytes(), b"line")

    def test_damaged_archive_rejected_before_restore(self):
        archive = next(self.package.glob("*runtime.tar"))
        with archive.open("ab") as stream:
            stream.write(b"tampered")
        with self.assertRaisesRegex(ValueError, "Archive missing or damaged"):
            bundle.restore(self.clone, self.lock, self.package, "runtime", False)
        self.assertFalse((self.clone / "assets/plates/one.png").exists())

    def test_unsafe_path_rejected(self):
        with self.assertRaisesRegex(ValueError, "Unsafe asset path"):
            bundle.safe_path(self.clone, "assets/../outside.png")

    def test_catalog_change_requires_new_lock(self):
        catalog = self.clone / "ios/Fanggu/Resources/catalog.json"
        catalog.write_text(json.dumps([{"lineImage": "new.png", "colorImage": "one.avif"}]))
        with self.assertRaisesRegex(ValueError, "does not match the iOS catalog"):
            bundle.read_lock(self.clone)


if __name__ == "__main__":
    unittest.main()
