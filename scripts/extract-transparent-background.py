#!/usr/bin/env python3
"""Extract a reviewed, near-uniform matte without repainting the source RGB.

Only matte-colored regions connected to the canvas edge (or explicit reviewed
background seeds) become transparent. Enclosed architectural shadows survive.
This is a sample workflow, not a batch acceptance check for every illustration.
"""
import argparse
import hashlib
import json
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


def extract(image, tolerance=4, seeds=(), border_policy="strict"):
    if image.mode not in ("RGB", "RGBA"):
        raise ValueError("Expected an RGB or RGBA illustration")
    if image.mode == "RGBA" and image.getextrema()[3] != (255, 255):
        raise ValueError("Source already has transparency; do not flatten it")
    rgb = np.array(image.convert("RGB"))
    border = np.concatenate((rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]))
    if border_policy == "dominant":
        # Cropped buildings can touch the frame. Use its most common color bin,
        # rather than mistaking the median of background and masonry for matte.
        bins, counts = np.unique(border.astype(np.int16) // 4, axis=0, return_counts=True)
        dominant = bins[np.argmax(counts)]
        cluster = border[np.all(border.astype(np.int16) // 4 == dominant, axis=1)]
        matte = np.median(cluster, axis=0).astype(np.int16)
    elif border_policy == "strict":
        matte = np.median(border, axis=0).astype(np.int16)
    else:
        raise ValueError("Unknown border policy")
    deviation = np.max(np.abs(border.astype(np.int16) - matte), axis=1)
    if border_policy == "strict" and np.percentile(deviation, 99) > tolerance:
        raise ValueError("The border is not uniform enough for this extraction method")
    candidate = np.max(np.abs(rgb.astype(np.int16) - matte), axis=2) <= tolerance
    # A one-pixel matte border joins all edge-connected background regions.
    padded = np.pad(candidate, 1, constant_values=True)
    # fromarray may share read-only memory; floodfill needs a writable image.
    flood = Image.fromarray(padded.astype(np.uint8) * 255).copy()
    ImageDraw.floodfill(flood, (0, 0), 128)
    for x, y in seeds:
        if not (0 <= x < image.width and 0 <= y < image.height):
            raise ValueError(f"Background seed outside image: {(x, y)}")
        if not candidate[y, x]:
            raise ValueError(f"Seed is not matte-colored: {(x, y)}")
        ImageDraw.floodfill(flood, (x + 1, y + 1), 128)
    background = np.asarray(flood)[1:-1, 1:-1] == 128
    if not background.any() or background.all():
        raise ValueError("Extraction must retain a subject and remove background")
    alpha = np.where(background, 0, 255).astype(np.uint8)
    # No blur, feathering or RGB recoloring: keep original fine dark linework.
    result = Image.fromarray(np.dstack((rgb, alpha)))
    return result, {
        "matteRgb": matte.tolist(),
        "borderPolicy": border_policy,
        "borderMatchFraction": float(np.mean(deviation <= tolerance)),
        "tolerancePerChannel": tolerance,
        "backgroundSeeds": [list(seed) for seed in seeds],
        "transparentPixels": int(background.sum()),
        "opaquePixels": int((~background).sum()),
        "rgbUnchanged": bool(np.array_equal(np.asarray(result)[:, :, :3], rgb)),
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--tolerance", type=int, default=4)
    parser.add_argument("--seed", action="append", default=[], help="Reviewed background point x,y; repeat for enclosed air gaps")
    args = parser.parse_args()
    if not 0 <= args.tolerance <= 32:
        parser.error("Tolerance must be between 0 and 32")
    if args.output.suffix.lower() != ".png":
        parser.error("Output must be a PNG to retain lossless RGB and alpha")
    report_path = args.output.with_suffix(".json")
    if args.output.exists() or report_path.exists():
        parser.error("Output already exists; use a new sample filename")
    seeds = [tuple(map(int, seed.split(","))) for seed in args.seed]
    if any(len(seed) != 2 for seed in seeds):
        parser.error("Seeds must be x,y pairs")
    source_bytes = args.source.read_bytes()
    source_hash = hashlib.sha256(source_bytes).hexdigest()
    with Image.open(args.source) as original:
        result, report = extract(original, args.tolerance, seeds)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    result.save(args.output)
    with Image.open(args.output) as check:
        if check.mode != "RGBA" or not np.array_equal(np.asarray(check), np.asarray(result)):
            raise ValueError("Saved PNG did not preserve the expected RGBA pixels")
    if hashlib.sha256(args.source.read_bytes()).hexdigest() != source_hash:
        raise ValueError("Source changed during extraction")
    report.update({
        "source": str(args.source), "sourceSha256": source_hash,
        "output": str(args.output), "outputSha256": hashlib.sha256(args.output.read_bytes()).hexdigest(),
        "width": result.width, "height": result.height, "mode": "RGBA",
        "method": "edge-connected matte flood fill with explicitly reviewed background seeds",
        "visualReview": "pending",
    })
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(report, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
