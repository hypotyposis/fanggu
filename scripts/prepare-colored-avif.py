#!/usr/bin/env python3
"""Create transparent PNG companions and AVIF deliveries; retain all originals.

Pixel/alpha checks are automatic. Visual acceptance belongs to the user.
"""
import hashlib
import importlib.util
import json
import re
import sys
import tempfile
import time
from concurrent.futures import ProcessPoolExecutor, as_completed
from pathlib import Path

import numpy as np
from PIL import Image, __version__ as pillow_version, _avif

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "assets/colored-transparent-avif"
PNG_OUTPUT = ROOT / "assets/colored-transparent"
MANIFEST = ROOT / "assets/color-research/avif-manifest.json"
CHECKPOINT = ROOT / "assets/color-research/transparent-avif-progress.json"
SETTINGS = {"quality": 85, "subsampling": "4:4:4", "speed": 6,
            "max_threads": 2, "codec": "aom", "range": "full"}
EXTRACTOR = ROOT / "scripts/extract-transparent-background.py"
spec = importlib.util.spec_from_file_location("background_extractor", EXTRACTOR)
extractor = importlib.util.module_from_spec(spec)
spec.loader.exec_module(extractor)
WHITE_EXTRACTOR = ROOT / "scripts/white-matte.py"
white_spec = importlib.util.spec_from_file_location("white_matte", WHITE_EXTRACTOR)
white_matte = importlib.util.module_from_spec(white_spec)
white_spec.loader.exec_module(white_matte)
PROTOTYPE_EXTRACTOR = ROOT / "scripts/prototype-matte.py"
prototype_spec = importlib.util.spec_from_file_location("prototype_matte", PROTOTYPE_EXTRACTOR)
prototype_matte = importlib.util.module_from_spec(prototype_spec)
prototype_spec.loader.exec_module(prototype_matte)
MASK_SETTINGS = {"tolerance": 12, "borderPolicy": "dominant", "method": "edge-connected-matte-v1",
                 "overrides": {"baoen": {"borderPolicy": "strict", "seeds": [[479, 182], [544, 185], [409, 183], [613, 186]]}}}


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def atomic_json(path, value):
    temporary = path.with_suffix(".json.tmp")
    temporary.write_text(json.dumps(value, ensure_ascii=False, indent=2) + "\n")
    temporary.replace(path)


def prepare_source(original, id, source_hash, legacy_source_hash=None, preparation=None, prototype=False):
    if prototype:
        return prototype_matte.extract_color(original, (preparation or {}).get("seeds", []))
    if original.has_transparency_data and original.convert("RGBA").getchannel("A").getextrema() != (255, 255):
        image = original.convert("RGBA")
        if image.getextrema()[3] != (0, 255):
            raise ValueError(f"Generated PNG needs a real transparent background and opaque subject: {id}")
        return image, {"method": "existing-alpha-preserved", "rgbUnchanged": True}
    if preparation and preparation.get("method") == "white-matte-v1":
        if preparation.get("sourceSha256") != source_hash:
            raise ValueError(f"White-background source no longer matches its preparation record: {id}")
        return white_matte.extract_color(original, preparation.get("seeds", []))
    if source_hash != legacy_source_hash:
        raise ValueError(f"New colored PNG must be generated with a real transparent background: {id}")
    override = MASK_SETTINGS["overrides"].get(id, {})
    return extractor.extract(original, MASK_SETTINGS["tolerance"],
        override.get("seeds", []), override.get("borderPolicy", MASK_SETTINGS["borderPolicy"]))


def review_status(images):
    return "approved_user" if images and all(item.get("visualReview") == "approved_user" for item in images.values()) else "pending_user"


def apply_user_review(record, review):
    if (review and review.get("status") == "approved_user"
            and review.get("sourceSha256") == record.get("sourceSha256")
            and review.get("avifSha256") == record.get("sha256")
            and review.get("inputSha256") == record.get("inputSha256")):
        return {**record, "visualReview": "approved_user", "review": review}
    return record


def convert(id, source, source_hash, old, published=None, preparation=None, prototype=False, user_review=None):
    src = ROOT / source
    relative = f"assets/colored-transparent-avif/{id}.avif"
    png_relative = f"assets/colored-transparent/{id}.png"
    dst, png_dst = ROOT / relative, ROOT / png_relative
    if ((prototype or old.get("qualityMode") != "prototype")
            and old.get("backgroundPreparation") == preparation
            and old.get("source") == source and old.get("sourceSha256") == source_hash
            and old.get("src") == relative and old.get("input") == png_relative
            and dst.exists() and png_dst.exists()
            and old.get("sha256") == digest(dst) and old.get("inputSha256") == digest(png_dst)
            and (prototype or (old.get("alpha", {}).get("min") == 0 and old.get("alpha", {}).get("max") == 255))):
        return id, apply_user_review(old, user_review), True
    started = time.perf_counter()
    with Image.open(src) as original:
        original.load()
        # New white originals require a hash-bound preparation record. Old dark
        # originals keep their exact published extraction path and approvals.
        legacy_hash = (published or {}).get("sourceSha256") if (published or {}).get("extraction", {}).get("matteRgb") else None
        image, report = prepare_source(original, id, source_hash, legacy_hash, preparation, prototype)
        if not prototype and report.get("method") == "white-matte-v1":
            if not report.get("interiorRgbUnchanged"):
                raise ValueError(f"Interior RGB changed during white-background extraction: {id}")
        elif not prototype and not np.array_equal(np.asarray(image)[:, :, :3], np.asarray(original.convert("RGB"))):
            raise ValueError(f"RGB changed during extraction: {id}")
    rgba = np.asarray(image)
    if not prototype and image.getextrema()[3] != (0, 255):
        raise ValueError(f"Expected a transparent background and opaque subject: {id}")
    # Both files are decoded before being published. The PNG remains lossless.
    with tempfile.TemporaryDirectory(prefix=f".{id}-", dir=OUTPUT) as directory:
        staged, staged_png = Path(directory) / "image.avif", Path(directory) / "image.png"
        image.save(staged_png, format="PNG")
        if not prototype:
            with Image.open(staged_png) as checked:
                if checked.mode != "RGBA" or not np.array_equal(np.asarray(checked), rgba):
                    raise ValueError(f"PNG round-trip failed: {id}")
        image.save(staged, format="AVIF", **SETTINGS)
        with Image.open(staged) as decoded:
            decoded.load()
            if not prototype and (decoded.size != image.size or decoded.mode != "RGBA" or decoded.getextrema()[3] != (0, 255)):
                raise ValueError(f"AVIF dimensions or transparency changed: {id}")
            alpha = np.asarray(decoded.convert("RGBA"))[:, :, 3]
            error = np.abs(alpha.astype(np.int16) - rgba[:, :, 3].astype(np.int16))
            alpha_info = {"min": int(alpha.min()), "max": int(alpha.max()),
                          "transparentPixels": int((alpha == 0).sum()), "opaquePixels": int((alpha == 255).sum()),
                          "meanError": float(error.mean()), "maxError": int(error.max())}
        if digest(src) != source_hash:
            raise ValueError(f"Source changed during conversion: {id}")
        record = {"source": source, "sourceSha256": source_hash, "sourceBytes": src.stat().st_size,
                  "input": png_relative, "inputSha256": digest(staged_png), "inputBytes": staged_png.stat().st_size,
                  "src": relative, "sha256": digest(staged), "bytes": staged.stat().st_size,
                  "width": image.width, "height": image.height, "alpha": alpha_info,
                  "extraction": report, "visualReview": "pending_user",
                  "processingSeconds": round(time.perf_counter() - started, 3)}
        if preparation:
            record["backgroundPreparation"] = preparation
        if prototype:
            record["qualityMode"] = "prototype"
        review = (published or {}).get("review", {})
        if ((published or {}).get("visualReview") == "approved_user"
                and review.get("avifSha256") == record["sha256"] and review.get("inputSha256") == record["inputSha256"]):
            record.update(visualReview="approved_user", review=review)
        record = apply_user_review(record, user_review)
        staged_png.replace(png_dst)
        staged.replace(dst)
    return id, record, False


def main():
    started = time.perf_counter()
    prototype = prototype_matte.prototype_enabled(sys.argv[1:])
    print(f"Plate mode: {'prototype (quality gates off; human review decides)' if prototype else 'strict'}", flush=True)
    queue = json.loads((ROOT / "assets/color-research/queue.json").read_text())
    sources = [(item["id"], item["output"]) for item in queue["entries"]]
    sources += [(id, f"assets/color-studies/v1/{id}-colored.png") for id in queue["excluded"]]
    metadata = {item["id"]: json.loads((ROOT / item["record"]).read_text()) for item in queue["entries"]}
    if len({id for id, _ in sources}) != len(sources):
        raise ValueError("Duplicate monument IDs in the color queue")
    hashes = {}
    for id, source in sources:
        path = (ROOT / source).resolve()
        if not re.fullmatch(r"[a-z0-9_]+", id) or not path.is_relative_to(ROOT) or path.suffix != ".png":
            raise ValueError(f"Invalid source: {id}: {source}")
        hashes[id] = digest(path)
    config = {"format": "AVIF", "settings": SETTINGS,
              "encoder": {"pillow": pillow_version, "libavif": _avif.libavif_version},
              "transparency": {**MASK_SETTINGS, "extractorSha256": digest(EXTRACTOR)}}
    published = json.loads(MANIFEST.read_text()) if MANIFEST.exists() else {}
    cached = {}
    for path in [MANIFEST, CHECKPOINT]:
        previous = json.loads(path.read_text()) if path.exists() else {}
        if all(previous.get(k) == v for k, v in config.items()):
            cached.update(previous.get("images", {}))
    preparations = {}
    for id, meta in metadata.items():
        preparation = meta.get("background_preparation")
        if not preparation:
            continue
        old = cached.get(id, {})
        previous = old.get("backgroundPreparation", {})
        if (prototype and old.get("sourceSha256") == hashes[id]
                and all(previous.get(key) == preparation.get(key) for key in ("method", "sourceSha256", "seeds"))):
            # Keep unchanged existing deliveries and approvals byte-for-byte.
            preparations[id] = previous
        else:
            preparations[id] = {**preparation, "processorSha256": digest(PROTOTYPE_EXTRACTOR if prototype else WHITE_EXTRACTOR)}
            if prototype:
                preparations[id].update(sourceSha256=hashes[id], qualityMode="prototype")
    OUTPUT.mkdir(parents=True, exist_ok=True)
    PNG_OUTPUT.mkdir(parents=True, exist_ok=True)
    images, errors, reused = {}, {}, 0
    with ProcessPoolExecutor(max_workers=4) as pool:
        futures = {pool.submit(convert, id, source, hashes[id], cached.get(id, {}), published.get("images", {}).get(id), preparations.get(id), prototype, metadata.get(id, {}).get("user_review")): id for id, source in sources}
        for future in as_completed(futures):
            id = futures[future]
            try:
                id, record, skip = future.result()
                images[id] = record
                reused += int(skip)
            except Exception as error:
                errors[id] = str(error)
                print(f"FAILED {id}: {error}", flush=True)
            atomic_json(CHECKPOINT, {**config, "images": images, "errors": errors})
            if (len(images) + len(errors)) % 10 == 0 or len(images) + len(errors) == len(sources):
                print(f"Transparent AVIF {len(images)}/{len(sources)} ready, {len(errors)} failed, {reused} reused", flush=True)
    if errors:
        raise RuntimeError(f"Conversion incomplete; successful files cached for resume: {errors}")
    for id, source in sources:
        if digest(ROOT / source) != hashes[id]:
            raise ValueError(f"Source changed during conversion: {id}")
    status = review_status(images)
    manifest = {**config, "visualReview": status, "images": {id: images[id] for id, _ in sources}}
    if status == "approved_user" and set(images) == set(published.get("images", {})) and published.get("review"):
        manifest["review"] = published["review"]
    atomic_json(MANIFEST, manifest)
    CHECKPOINT.unlink(missing_ok=True)
    before = sum(item["sourceBytes"] for item in images.values())
    after = sum(item["bytes"] for item in images.values())
    print(f"{len(images)} transparent plates: {before / 1024**2:.2f} → {after / 1024**2:.2f} MiB; "
          f"{time.perf_counter() - started:.1f}s elapsed. Originals retained. Visual review: {status}.", flush=True)


if __name__ == "__main__":
    main()
