#!/bin/sh
set -eu
if [ "$#" -ne 1 ]; then
  echo "Usage: ios/scripts/sync-artwork.sh /path/to/fanggu/assets" >&2
  exit 2
fi
SOURCE=${1%/}
ROOT=$(CDPATH= cd -- "$(dirname -- "$0")/../.." && pwd)
DEST="$ROOT/ios/Fanggu/Resources/Artwork"
for directory in plates colored-transparent-avif; do
  if [ ! -d "$SOURCE/$directory" ]; then
    echo "Missing $SOURCE/$directory" >&2
    exit 1
  fi
done
if [ ! -f "$SOURCE/longmen-vairocana.png" ]; then
  echo "Missing $SOURCE/longmen-vairocana.png" >&2
  exit 1
fi
mkdir -p "$DEST"
rsync -a "$SOURCE/plates/" "$DEST/"
rsync -a "$SOURCE/colored-transparent-avif/" "$DEST/"
cp "$SOURCE/longmen-vairocana.png" "$DEST/"
node - "$ROOT/ios/Fanggu/Resources/catalog.json" "$DEST" <<'NODE'
const fs = require('node:fs');
const [catalogPath, directory] = process.argv.slice(2);
const sites = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
const missing = sites.flatMap(site => [site.lineImage, site.colorImage].filter(name => !fs.existsSync(`${directory}/${name}`)));
if (missing.length) { console.error(`Missing ${missing.length} artwork files: ${missing.slice(0, 10).join(', ')}`); process.exitCode = 1; }
else console.log(`Artwork ready for ${sites.length} monuments`);
NODE
