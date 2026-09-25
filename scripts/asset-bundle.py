#!/usr/bin/env python3
"""Lock, package, restore and verify the ignored local artwork library."""

import argparse
import hashlib
import json
import os
import subprocess
import sys
import tarfile
import tempfile
from pathlib import Path, PurePosixPath

CHUNK_LIMIT = 900 * 1024 * 1024
BUFFER = 1024 * 1024


def fail(message):
    raise ValueError(message)


def digest(path):
    sha = hashlib.sha256()
    with path.open("rb") as stream:
        for block in iter(lambda: stream.read(BUFFER), b""):
            sha.update(block)
    return sha.hexdigest()


def canonical(data):
    return json.dumps(data, ensure_ascii=False, sort_keys=True, separators=(",", ":")).encode("utf-8")


def save_json(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as stream:
        temporary = Path(stream.name)
        json.dump(data, stream, ensure_ascii=False, indent=2)
        stream.write("\n")
    os.replace(temporary, path)


def safe_path(root, name):
    path = PurePosixPath(name)
    if path.is_absolute() or len(path.parts) < 2 or path.parts[0] != "assets" or any(p in (".", "..") for p in path.parts):
        fail(f"Unsafe asset path: {name}")
    target = root.joinpath(*path.parts)
    if target.is_symlink() or not target.parent.resolve().is_relative_to(root.resolve()):
        fail(f"Asset path escapes repository: {name}")
    return target


def runtime_paths(root):
    catalog = json.loads((root / "ios/Fanggu/Resources/catalog.json").read_text(encoding="utf-8"))
    paths = {"assets/longmen-vairocana.png"}
    for site in catalog:
        for field, folder, suffix in (("lineImage", "plates", ".png"), ("colorImage", "colored-transparent-avif", ".avif")):
            name = site[field]
            if Path(name).name != name or not name.endswith(suffix):
                fail(f"Unexpected {field} in catalog: {name}")
            paths.add("assets/longmen-vairocana.png" if field == "lineImage" and name == "longmen-vairocana.png" else f"assets/{folder}/{name}")
    return paths


def read_lock(root):
    lock_path = root / "assets/asset-lock.json"
    lock = json.loads(lock_path.read_text(encoding="utf-8"))
    if lock.get("format") != 1 or not isinstance(lock.get("files"), list):
        fail("Unsupported asset lock format")
    files = lock["files"]
    if files != sorted(files, key=lambda item: item["path"]):
        fail("Asset lock is not sorted")
    seen = set()
    for item in files:
        name = item["path"]
        safe_path(root, name)
        if name in seen or item["tier"] not in ("runtime", "source") or not isinstance(item["bytes"], int) or item["bytes"] < 0 or len(item["sha256"]) != 64:
            fail(f"Invalid asset lock entry: {name}")
        seen.add(name)
    if lock.get("assetSet") != hashlib.sha256(canonical(files)).hexdigest()[:20]:
        fail("Asset lock set ID does not match its files")
    if {item["path"] for item in files if item["tier"] == "runtime"} != runtime_paths(root):
        fail("Runtime asset lock does not match the iOS catalog; regenerate it")
    return lock


def make_lock(root):
    result = subprocess.run(["git", "ls-files", "--others", "-i", "--exclude-standard", "-z", "--", "assets"], cwd=root, capture_output=True, check=True)
    names = sorted(os.fsdecode(raw) for raw in result.stdout.split(b"\0") if raw)
    runtime = runtime_paths(root)
    missing = runtime.difference(names)
    if missing:
        fail(f"Runtime assets missing or not ignored: {', '.join(sorted(missing)[:5])}")
    files = []
    for name in names:
        path = safe_path(root, name)
        if not path.is_file() or path.is_symlink():
            fail(f"Not a regular asset file: {name}")
        files.append({"path": name, "bytes": path.stat().st_size, "sha256": digest(path), "tier": "runtime" if name in runtime else "source"})
    lock = {"format": 1, "assetSet": hashlib.sha256(canonical(files)).hexdigest()[:20], "files": files}
    save_json(root / "assets/asset-lock.json", lock)
    print(f"Locked {len(files)} files ({sum(x['bytes'] for x in files):,} bytes), set {lock['assetSet']}")


def selected(lock, profile):
    return [item for item in lock["files"] if profile == "full" or item["tier"] == "runtime"]


def verify(root, lock, profile):
    errors = []
    for item in selected(lock, profile):
        path = safe_path(root, item["path"])
        if not path.is_file() or path.is_symlink():
            errors.append(f"missing: {item['path']}")
        elif path.stat().st_size != item["bytes"] or digest(path) != item["sha256"]:
            errors.append(f"mismatch: {item['path']}")
    if errors:
        fail(f"{len(errors)} asset errors:\n" + "\n".join(errors[:20]))
    print(f"Verified {len(selected(lock, profile))} {profile} files")


def archive_groups(lock):
    groups = []
    for tier in ("runtime", "source"):
        members, size = [], 0
        for item in lock["files"]:
            if item["tier"] != tier:
                continue
            estimated = ((item["bytes"] + 511) // 512) * 512 + 2048
            if members and size + estimated > CHUNK_LIMIT:
                groups.append((tier, members))
                members, size = [], 0
            members.append(item)
            size += estimated
        if members:
            groups.append((tier, members))
    return groups


def pack(root, lock, output):
    verify(root, lock, "full")
    output.mkdir(parents=True, exist_ok=True)
    if any(output.iterdir()):
        fail(f"Bundle directory is not empty: {output}")
    archives = []
    for number, (tier, members) in enumerate(archive_groups(lock), 1):
        name = f"{number:02d}-{tier}.tar"
        target = output / name
        with tarfile.open(target, "w", format=tarfile.PAX_FORMAT) as tar:
            for item in members:
                info = tarfile.TarInfo(item["path"])
                info.size = item["bytes"]
                info.mode = 0o644
                info.mtime = info.uid = info.gid = 0
                with safe_path(root, item["path"]).open("rb") as stream:
                    tar.addfile(info, stream)
        archives.append({"file": name, "tier": tier, "bytes": target.stat().st_size, "sha256": digest(target), "paths": [item["path"] for item in members]})
        print(f"Packed {name}: {len(members)} files, {target.stat().st_size:,} bytes", flush=True)
    save_json(output / "index.json", {"format": 1, "assetSet": lock["assetSet"], "lockSha256": digest(root / "assets/asset-lock.json"), "archives": archives})
    print(f"Bundle ready: {output}")


def checked_archives(root, lock, bundle, profile):
    index = json.loads((bundle / "index.json").read_text(encoding="utf-8"))
    if index.get("format") != 1 or index.get("assetSet") != lock["assetSet"] or index.get("lockSha256") != digest(root / "assets/asset-lock.json"):
        fail("Bundle index does not match the checked-in asset lock")
    expected = {item["path"] for item in selected(lock, profile)}
    all_paths = []
    result = []
    for archive in index["archives"]:
        name = archive["file"]
        if Path(name).name != name or not name.endswith(".tar") or archive["tier"] not in ("runtime", "source"):
            fail(f"Invalid archive entry: {name}")
        all_paths.extend(archive["paths"])
        if profile == "runtime" and archive["tier"] == "source":
            continue
        path = bundle / name
        if not path.is_file() or path.stat().st_size != archive["bytes"] or digest(path) != archive["sha256"]:
            fail(f"Archive missing or damaged: {name}")
        result.append((path, archive["paths"]))
    if len(all_paths) != len(set(all_paths)) or set(all_paths) != {item["path"] for item in lock["files"]}:
        fail("Bundle index has missing or duplicate assets")
    if {name for _, paths in result for name in paths} != expected:
        fail("Bundle does not cover requested profile")
    return result


def restore(root, lock, bundle, profile, force):
    archives = checked_archives(root, lock, bundle, profile)
    by_name = {item["path"]: item for item in lock["files"]}
    count = 0
    for archive, paths in archives:
        with tarfile.open(archive, "r:") as tar:
            members = tar.getmembers()
            if [member.name for member in members] != paths or any(not member.isfile() for member in members):
                fail(f"Archive entries differ from index: {archive.name}")
            for member in members:
                item = by_name[member.name]
                if member.size != item["bytes"]:
                    fail(f"Archive size mismatch: {member.name}")
                target = safe_path(root, member.name)
                if target.exists():
                    if target.is_file() and target.stat().st_size == item["bytes"] and digest(target) == item["sha256"]:
                        continue
                    if not force:
                        fail(f"Existing asset differs; use --force to replace: {member.name}")
                target.parent.mkdir(parents=True, exist_ok=True)
                with tempfile.NamedTemporaryFile("wb", dir=target.parent, delete=False) as stream:
                    temporary = Path(stream.name)
                    sha = hashlib.sha256()
                    source = tar.extractfile(member)
                    for block in iter(lambda: source.read(BUFFER), b""):
                        stream.write(block)
                        sha.update(block)
                if sha.hexdigest() != item["sha256"] or temporary.stat().st_size != item["bytes"]:
                    temporary.unlink()
                    fail(f"Archive content mismatch: {member.name}")
                os.replace(temporary, target)
                count += 1
        print(f"Restored {archive.name}", flush=True)
    verify(root, lock, profile)
    print(f"Wrote {count} files")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=("lock", "verify", "pack", "restore"))
    parser.add_argument("--root", type=Path, default=Path(__file__).resolve().parent.parent)
    parser.add_argument("--profile", choices=("runtime", "full"), default="full")
    parser.add_argument("--bundle", type=Path, help="Bundle directory containing index.json")
    parser.add_argument("--force", action="store_true", help="Replace differing local assets during restore")
    args = parser.parse_args()
    root = args.root.resolve()
    try:
        if args.command == "lock":
            make_lock(root)
            return
        lock = read_lock(root)
        if args.command == "verify":
            verify(root, lock, args.profile)
        elif args.command == "pack":
            pack(root, lock, args.bundle or root / "asset-dist" / lock["assetSet"])
        elif args.command == "restore":
            if not args.bundle:
                fail("--bundle is required for restore")
            restore(root, lock, args.bundle, args.profile, args.force)
    except (OSError, ValueError, subprocess.CalledProcessError, tarfile.TarError) as error:
        print(f"asset-bundle: {error}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
