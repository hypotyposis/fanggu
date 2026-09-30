"""Trace the user's selected two-tone dougong image into palette-swappable SVGs.

Run with OpenCV available: python3 trace-icon.py
The reference image is kept beside this script. This is a design-source tool,
not part of the app build.
"""

from pathlib import Path

import cv2


HERE = Path(__file__).resolve().parent
SOURCE = HERE / "reference-two-tone-red.png"
PALETTES = {
    "01-ink-ivory": ("#232521", "#DDD0B6"),
    "02-jade-ivory": ("#304942", "#E7DDC8"),
    "03-paper-ink": ("#E9E3D8", "#35453F"),
}


def main():
    image = cv2.imread(str(SOURCE))
    if image is None:
        raise FileNotFoundError(SOURCE)
    height, width = image.shape[:2]

    # The approved reference has warm cream parts over dark red. Its green
    # channel cleanly separates the parts while retaining the original curves.
    mask = cv2.threshold(image[:, :, 1], 90, 255, cv2.THRESH_BINARY)[1]
    contours, hierarchy = cv2.findContours(
        mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE
    )
    if len(contours) != 70 or any(item[3] >= 0 for item in hierarchy[0]):
        raise ValueError("The reference silhouette changed; inspect the trace")

    paths = []
    for contour in contours:
        points = cv2.approxPolyDP(contour, 0.8, True).reshape(-1, 2)
        commands = [f"M{points[0, 0]} {points[0, 1]}"]
        commands.extend(f"L{x} {y}" for x, y in points[1:])
        paths.append(" ".join(commands) + " Z")

    for name, (background, mark) in PALETTES.items():
        shapes = "\n".join(f'  <path d="{path}"/>' for path in paths)
        svg = (
            f'<svg xmlns="http://www.w3.org/2000/svg" '
            f'viewBox="0 0 {width} {height}" width="1024" height="1024">\n'
            f'  <rect width="{width}" height="{height}" fill="{background}"/>\n'
            f'  <g fill="{mark}">\n{shapes}\n  </g>\n</svg>\n'
        )
        (HERE / f"{name}.svg").write_text(svg, encoding="utf-8")


if __name__ == "__main__":
    main()
