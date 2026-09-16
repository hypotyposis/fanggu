#!/usr/bin/env python3
"""Generate a PNG through the bundled Image API CLI with mandatory transparency."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--model", default="gpt-image-2.5-sunburst")
    parser.add_argument("--prompt-file", type=Path, required=True)
    parser.add_argument("--image", type=Path, action="append", required=True)
    parser.add_argument("--out", type=Path, required=True)
    parser.add_argument("--size", choices=["1024x1024", "1024x1536", "1536x1024"], required=True)
    parser.add_argument("--quality", choices=["low", "medium", "high", "auto"], default="high")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    cli = Path(os.environ.get("CODEX_HOME", str(Path.home() / ".codex"))) / "skills/.system/imagegen/scripts/image_gen.py"
    if not cli.is_file():
        parser.error(f"Bundled imagegen CLI is missing: {cli}")
    for source in [args.prompt_file, *args.image]:
        if not source.is_file():
            parser.error(f"Input file is missing: {source}")
    if args.out.suffix.lower() != ".png":
        parser.error("Output must be a PNG file")
    receipt_path = args.out.with_suffix(".request.json")
    if args.out.exists() or receipt_path.exists():
        parser.error("Output or request record already exists; choose a new filename")

    command = [sys.executable, str(cli), "edit", "--model", args.model,
               "--prompt-file", str(args.prompt_file.resolve()), "--no-augment",
               "--background", "transparent", "--output-format", "png",
               "--size", args.size, "--quality", args.quality, "--n", "1",
               "--out", str(args.out.resolve())]
    for source in args.image:
        command += ["--image", str(source.resolve())]
    if args.dry_run:
        return subprocess.run(command + ["--dry-run"], check=False).returncode
    if not os.environ.get("OPENAI_API_KEY"):
        parser.error("Set OPENAI_API_KEY in this process environment; never store it in the website directory")
    try:
        from PIL import Image
    except ImportError:
        parser.error("Pillow is required to validate the returned PNG before delivery")

    def relative(path):
        resolved = path.resolve()
        return str(resolved.relative_to(ROOT)) if resolved.is_relative_to(ROOT) else str(resolved)

    record = {"status": "prepared", "generator": "OpenAI Image API via bundled imagegen CLI",
              "endpoint": "/v1/images/edits", "model": args.model,
              "request_parameters": {"background": "transparent", "output_format": "png",
                                     "size": args.size, "quality": args.quality, "n": 1},
              "prompt": args.prompt_file.read_text(encoding="utf-8").strip(), "input_images": [relative(p) for p in args.image],
              "output": relative(args.out)}
    receipt_path.parent.mkdir(parents=True, exist_ok=True)

    def save_record():
        receipt_path.write_text(json.dumps(record, ensure_ascii=False, indent=2) + "\n")

    save_record()
    result = subprocess.run(command, check=False)
    if result.returncode:
        record.update(status="generation_failed", exit_code=result.returncode)
        save_record()
        return result.returncode
    try:
        with Image.open(args.out) as image:
            image.load()
            record.update(width=image.width, height=image.height, mode=image.mode,
                          sha256=hashlib.sha256(args.out.read_bytes()).hexdigest())
            alpha = image.getchannel("A").getextrema() if "A" in image.getbands() else None
            record["alpha_extrema"] = alpha
            if image.format != "PNG" or alpha is None or alpha[0] != 0 or alpha[1] <= 0:
                raise ValueError("Output lacks a real transparent background or visible subject")
        record.update(status="needs_visual_review", visualReview="pending_user")
    except Exception as error:
        record.update(status="rejected", validation_error=str(error))
        save_record()
        print(f"Rejected output; original retained: {error}", file=sys.stderr)
        return 1
    save_record()
    print(f"Native alpha verified; visual review still required: {args.out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
