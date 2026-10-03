#!/usr/bin/env python3
"""Install the user-supplied Chiwen icon set without redrawing its artwork."""
import json
import shutil
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = root / "icon-concepts/chiwen/AppIcon.appiconset"
destination = root / "Fanggu/Assets.xcassets/AppIcon.appiconset"
contents = json.loads((source / "Contents.json").read_text())
filenames = [entry["filename"] for entry in contents["images"]]
for filename in filenames:
    if Path(filename).name != filename or not (source / filename).is_file():
        raise ValueError(f"Missing or invalid icon: {filename}")
destination.mkdir(parents=True, exist_ok=True)
for filename in [*filenames, "Contents.json"]:
    shutil.copyfile(source / filename, destination / filename)
legacy = destination / "AppIcon.png"
if legacy.exists():
    legacy.unlink()
print(f"Installed {len(filenames)} supplied icon variants in {destination}")
