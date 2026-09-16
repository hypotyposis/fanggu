"""Check the parameter-enforcing entry point without calling the paid Image API."""
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

ENTRY = Path(__file__).resolve().parents[1] / "scripts/generate-transparent-plate.py"
FAKE_CLI = '''
import json, os, sys
from pathlib import Path
from PIL import Image
args = sys.argv[1:]
assert args[0] == "edit"
assert args[args.index("--background") + 1] == "transparent"
assert args[args.index("--output-format") + 1] == "png"
assert "--no-augment" in args
out = Path(args[args.index("--out") + 1])
out.parent.mkdir(parents=True, exist_ok=True)
if os.environ.get("TEST_IMAGE_MODE") == "RGB":
    image = Image.new("RGB", (3, 3), "white")
else:
    image = Image.new("RGBA", (3, 3), (0, 0, 0, 0))
    image.putpixel((1, 1), (0, 0, 0, 255))
image.save(out)
'''


class ImageRequestTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix="fanggu-imagegen-")
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.cli = self.root / "skills/.system/imagegen/scripts/image_gen.py"
        self.cli.parent.mkdir(parents=True)
        self.cli.write_text(FAKE_CLI)
        self.prompt = self.root / "prompt with spaces.txt"
        self.prompt.write_text("Draw only the ink strokes.\n")
        self.reference = self.root / "reference.png"
        from PIL import Image
        Image.new("RGB", (3, 3)).save(self.reference)
        self.output = self.root / "new plate.png"
        self.env = dict(os.environ, CODEX_HOME=str(self.root), OPENAI_API_KEY="test-placeholder-not-a-key")

    def run_entry(self, *extra):
        return subprocess.run([sys.executable, str(ENTRY), "--prompt-file", str(self.prompt),
                               "--image", str(self.reference), "--out", str(self.output),
                               "--size", "1024x1536", *extra], env=self.env, capture_output=True, text=True)

    def test_transparency_parameters_and_receipt_match_actual_request(self):
        result = self.run_entry()
        self.assertEqual(result.returncode, 0, result.stderr)
        record = json.loads(self.output.with_suffix(".request.json").read_text())
        self.assertEqual(record["request_parameters"]["background"], "transparent")
        self.assertEqual(record["request_parameters"]["output_format"], "png")
        self.assertEqual(record["prompt"], self.prompt.read_text().strip())
        self.assertEqual(record["alpha_extrema"], [0, 255])
        self.assertEqual(record["status"], "needs_visual_review")
        self.assertNotIn("test-placeholder-not-a-key", json.dumps(record))
        before = self.output.read_bytes()
        self.assertNotEqual(self.run_entry().returncode, 0)
        self.assertEqual(self.output.read_bytes(), before)

    def test_opaque_api_output_is_rejected_without_rewriting_original(self):
        self.env["TEST_IMAGE_MODE"] = "RGB"
        result = self.run_entry()
        self.assertNotEqual(result.returncode, 0)
        record = json.loads(self.output.with_suffix(".request.json").read_text())
        self.assertEqual(record["status"], "rejected")
        self.assertEqual(record["mode"], "RGB")
        self.assertTrue(self.output.is_file())

    def test_background_cannot_be_overridden_and_key_is_required(self):
        self.assertNotEqual(self.run_entry("--background", "opaque").returncode, 0)
        self.env.pop("OPENAI_API_KEY")
        result = self.run_entry()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn("OPENAI_API_KEY", result.stderr)
        self.assertFalse(self.output.exists())


if __name__ == "__main__":
    unittest.main()
