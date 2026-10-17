#!/usr/bin/env python3
"""Writes a consistent, gzip-compressed snapshot of the community database and keeps the newest N.

Uses SQLite's backup API, so the service keeps running and the copy includes WAL contents."""
import argparse
from datetime import datetime, timezone
import gzip
from pathlib import Path
import shutil
import sqlite3


def backup(database, destination, keep):
    destination = Path(destination)
    destination.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
    snapshot = destination / f'.community-{stamp}.sqlite'
    target = destination / f'community-{stamp}.sqlite.gz'
    partial = target.with_suffix('.gz.part')
    try:
        source = sqlite3.connect(database, timeout=30)
        try:
            copy = sqlite3.connect(snapshot)
            try:
                source.backup(copy)
                result = copy.execute('PRAGMA integrity_check').fetchone()[0]
                if result != 'ok':
                    raise SystemExit(f'Backup failed integrity check: {result}')
            finally:
                copy.close()
        finally:
            source.close()
        with open(snapshot, 'rb') as raw, gzip.open(partial, 'wb') as packed:
            shutil.copyfileobj(raw, packed)
        partial.rename(target)
    finally:
        snapshot.unlink(missing_ok=True)
        partial.unlink(missing_ok=True)
    for old in sorted(destination.glob('community-*.sqlite.gz'))[:-keep]:
        old.unlink()
    return target


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('database')
    parser.add_argument('destination')
    parser.add_argument('--keep', type=int, default=14)
    args = parser.parse_args()
    if args.keep < 1:
        parser.error('--keep must be at least 1')
    print(backup(args.database, args.destination, args.keep), flush=True)
