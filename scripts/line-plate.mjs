import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

export function recolorLinePlate(original, target, color, legacySha256, preparation) {
  const [minAlpha, maxAlpha] = execFileSync('magick', [original, '-alpha', 'on', '-format', '%[fx:minima.a] %[fx:maxima.a]', 'info:'], { encoding: 'utf8' }).split(' ').map(Number);
  if (!Number.isFinite(minAlpha) || !Number.isFinite(maxAlpha) || maxAlpha <= 0) throw new Error(`Missing visible linework: ${original}`);
  if (minAlpha === 0) {
    // Recolor only strokes; never flatten or recompute native transparency.
    execFileSync('magick', [original, '-channel', 'RGB', '-fill', color, '-colorize', '100%', '+channel', '-depth', '8', target]);
    return;
  }
  const sourceHash = createHash('sha256').update(readFileSync(original)).digest('hex');
  if (minAlpha === 1 && preparation?.method === 'white-matte-v1' && preparation.sourceSha256 === sourceHash) {
    execFileSync('python3', [fileURLToPath(new URL('./white-matte.py', import.meta.url)), original, target, '--line-color', color]);
    return;
  }
  if (minAlpha !== 1 || sourceHash !== legacySha256) throw new Error(`New line PNG must be generated with a real transparent background: ${original}`);
  execFileSync('magick', [original, '-background', 'white', '-alpha', 'remove', '-alpha', 'off',
    '-colorspace', 'gray', '-negate', '-level', '1%,100%', '-alpha', 'copy', '-colorspace', 'sRGB',
    '-channel', 'RGB', '-fill', color, '-colorize', '100%', '+channel', '-depth', '8', target]);
}
