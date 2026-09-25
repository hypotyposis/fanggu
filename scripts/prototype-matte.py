"""Best-effort prototype preparation. No visual or pixel-quality rejection.

Kept separate so the strict processor hash and existing artwork caches remain
unchanged. Image decoding/encoding errors still propagate to the caller.
"""
import argparse
import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


def prototype_enabled(args=None):
    args = sys.argv[1:] if args is None else args
    if "--strict" in args and "--prototype" in args:
        raise ValueError("Choose --strict or --prototype, not both")
    mode = ("strict" if "--strict" in args else "prototype" if "--prototype" in args
            else json.loads(Path(__file__).with_name("plate-policy.json").read_text())["mode"])
    if mode not in ("strict", "prototype"):
        raise ValueError(f"Unknown plate mode: {mode}")
    return mode == "prototype"


def extract_line(image, color):
    rgba = np.asarray(image.convert("RGBA"))
    if np.any(rgba[:, :, 3] < 255):
        alpha = rgba[:, :, 3]
    else:
        gray = rgba[:, :, :3].astype(np.float32).mean(axis=2)
        alpha = np.rint(np.clip((251 - gray) / 251, 0, 1) * 255).astype(np.uint8)
    ink = np.empty_like(rgba[:, :, :3])
    ink[:] = color
    return Image.fromarray(np.dstack((ink, alpha)))


def extract_color(image, seeds=()):
    rgba = image.convert("RGBA")
    if rgba.getchannel("A").getextrema() != (255, 255):
        return rgba, {"method": "existing-alpha-preserved", "rgbUnchanged": True}
    rgb = np.asarray(rgba)[:, :, :3].copy()
    candidate = np.min(rgb, axis=2) >= 243
    flood = Image.fromarray(np.pad(candidate, 1, constant_values=True).astype(np.uint8) * 255).copy()
    ImageDraw.floodfill(flood, (0, 0), 128)
    skipped = []
    for seed in seeds:
        if (not isinstance(seed, (list, tuple)) or len(seed) != 2
                or not all(isinstance(value, int) for value in seed)):
            skipped.append(seed)
            continue
        x, y = seed
        if not (0 <= x < image.width and 0 <= y < image.height) or not candidate[y, x]:
            skipped.append(seed)
            continue
        ImageDraw.floodfill(flood, (x + 1, y + 1), 128)
    background = np.asarray(flood)[1:-1, 1:-1] == 128
    # If preparation would erase everything, retain the original for human review.
    if background.all():
        return rgba, {"method": "prototype-original-retained", "rgbUnchanged": True,
                      "skippedSeeds": skipped}
    padded = np.pad(background, 1, constant_values=False)
    adjacent = np.zeros_like(background)
    for dy, dx in [(0, 1), (1, 0), (1, 2), (2, 1)]:
        adjacent |= padded[dy:dy + image.height, dx:dx + image.width]
    edge = adjacent & ~background
    alpha = np.where(background, 0, 255).astype(np.uint8)
    edge_alpha = 255 - np.min(rgb[edge], axis=1).astype(np.int16)
    alpha[edge] = edge_alpha.astype(np.uint8)
    coverage = edge_alpha.astype(np.float32)[:, None] / 255
    recovered = np.divide(rgb[edge] - (1 - coverage) * 255, coverage,
                          out=np.zeros_like(coverage * rgb[edge]), where=coverage > 0)
    rgb[edge] = np.rint(np.clip(recovered, 0, 255)).astype(np.uint8)
    return Image.fromarray(np.dstack((rgb, alpha))), {
        "method": "white-matte-prototype-v1", "matteRgb": [255, 255, 255],
        "interiorRgbUnchanged": True, "backgroundSeeds": list(seeds), "skippedSeeds": skipped}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--line-color", required=True)
    args = parser.parse_args()
    if args.source.resolve() == args.output.resolve():
        parser.error("Keep the original; use a separate output path")
    color = tuple(bytes.fromhex(args.line_color.lstrip("#")))
    with Image.open(args.source) as original:
        extract_line(original, color).save(args.output, format="PNG")
