#!/usr/bin/env python3
"""Draw the app seal from the existing ink, paper and cinnabar palette."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

S = 1024
image = Image.new("RGB", (S, S), "#22292a")
draw = ImageDraw.Draw(image)
draw.rounded_rectangle((126, 126, 898, 898), radius=70, fill="#bd3b2d")
draw.rounded_rectangle((160, 160, 864, 864), radius=42, outline="#f0e7d2", width=16)
font = ImageFont.truetype("/System/Library/Fonts/STHeiti Medium.ttc", 256)
for label, top in (("访", 210), ("古", 512)):
    box = draw.textbbox((0, 0), label, font=font)
    width = box[2] - box[0]
    draw.text(((S - width) / 2 - box[0], top - box[1]), label, font=font, fill="#f0e7d2")
destination = Path(__file__).resolve().parents[1] / "Fanggu/Assets.xcassets/AppIcon.appiconset/AppIcon.png"
image.save(destination, optimize=True)
print(destination)
