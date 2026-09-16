"""Prepare transparent delivery copies from flat white imagegen originals."""
import argparse
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw


def white_rgb(image):
    if image.has_transparency_data and image.convert("RGBA").getchannel("A").getextrema() != (255, 255):
        raise ValueError("White-matte extraction expects an opaque original")
    rgb = np.array(image.convert("RGB"))
    border = np.concatenate((rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]))
    if np.min(border) < 247 or np.max(np.ptp(border.astype(np.int16), axis=0)) > 8:
        raise ValueError("Expected a flat near-white border; reject textured backgrounds or cropped subjects")
    return rgb


def extract_line(image, color):
    rgb = white_rgb(image)
    if np.percentile(np.ptp(rgb.astype(np.int16), axis=2), 99.99) > 12:
        raise ValueError("Line original must be neutral black ink on white")
    # White and faint white-background noise vanish, including enclosed areas.
    gray = rgb.astype(np.float32).mean(axis=2)
    alpha = np.rint(np.clip((251 - gray) / 251, 0, 1) * 255).astype(np.uint8)
    if not np.any(alpha == 0) or not np.any(alpha > 0):
        raise ValueError("Line extraction must retain strokes and remove the background")
    ink = np.empty_like(rgb)
    ink[:] = color
    return Image.fromarray(np.dstack((ink, alpha)))


def extract_color(image, seeds=()):
    rgb = white_rgb(image)
    candidate = np.min(rgb, axis=2) >= 243
    flood = Image.fromarray(np.pad(candidate, 1, constant_values=True).astype(np.uint8) * 255).copy()
    ImageDraw.floodfill(flood, (0, 0), 128)
    for x, y in seeds:
        if not (0 <= x < image.width and 0 <= y < image.height) or not candidate[y, x]:
            raise ValueError(f"Reviewed open-air seed is not white background: {(x, y)}")
        ImageDraw.floodfill(flood, (x + 1, y + 1), 128)
    background = np.asarray(flood)[1:-1, 1:-1] == 128
    if background.all() or not background.any():
        raise ValueError("Color extraction must retain a subject and remove background")
    padded = np.pad(background, 1, constant_values=True)
    adjacent = np.zeros_like(background)
    for dy, dx in [(0, 1), (1, 0), (1, 2), (2, 1)]:
        adjacent |= padded[dy:dy + image.height, dx:dx + image.width]
    edge = adjacent & ~background
    alpha = np.where(background, 0, 255).astype(np.uint8)
    # Remove white mixing from only the outermost ink-contour pixels. Interior
    # stone, paint and shadows remain byte-identical to the generated original.
    edge_alpha = 255 - np.min(rgb[edge], axis=1).astype(np.int16)
    alpha[edge] = edge_alpha.astype(np.uint8)
    output_rgb = rgb.copy()
    coverage = edge_alpha.astype(np.float32)[:, None] / 255
    output_rgb[edge] = np.rint(np.clip((rgb[edge] - (1 - coverage) * 255) / coverage, 0, 255)).astype(np.uint8)
    result = Image.fromarray(np.dstack((output_rgb, alpha)))
    return result, {"method": "white-matte-v1", "matteRgb": [255, 255, 255],
                    "tolerancePerChannel": 12, "backgroundSeeds": [list(seed) for seed in seeds],
                    "edgeDecontaminatedPixels": int(edge.sum()),
                    "transparentPixels": int((alpha == 0).sum()),
                    "rgbUnchanged": bool(np.array_equal(output_rgb, rgb)),
                    "interiorRgbUnchanged": bool(np.array_equal(output_rgb[~edge], rgb[~edge]))}


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("source", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--line-color", required=True)
    args = parser.parse_args()
    if args.source.resolve() == args.output.resolve():
        parser.error("Keep the generated original; use a separate output path")
    color = args.line_color.lstrip("#")
    if len(color) != 6:
        parser.error("Line color must be #RRGGBB")
    with Image.open(args.source) as source:
        result = extract_line(source, tuple(int(color[i:i + 2], 16) for i in (0, 2, 4)))
    result.save(args.output, format="PNG")
