const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { createHash } = require('node:crypto');

test('native line recoloring preserves alpha; unrecorded opaque originals are rejected', async () => {
  const { recolorLinePlate } = await import('../scripts/line-plate.mjs');
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'fanggu-line-alpha-'));
  try {
    const native = path.join(directory, 'native.png'), output = path.join(directory, 'output.png');
    execFileSync('magick', ['-size', '3x1', 'xc:none', '-fill', 'rgba(0,0,0,0.25)', '-draw', 'point 1,0', '-fill', 'black', '-draw', 'point 2,0', '-depth', '8', native]);
    recolorLinePlate(native, output, '#b79d77');
    const alpha = file => execFileSync('magick', [file, '-alpha', 'extract', '-depth', '8', 'gray:-']);
    assert.deepEqual(alpha(output), alpha(native));
    const opaque = path.join(directory, 'opaque.png');
    execFileSync('magick', ['-size', '3x1', 'xc:white', '-fill', 'black', '-draw', 'point 1,0', opaque]);
    assert.throws(() => recolorLinePlate(opaque, output, '#b79d77'), /real transparent background/);
    const hash = createHash('sha256').update(fs.readFileSync(opaque)).digest('hex');
    recolorLinePlate(opaque, output, '#b79d77', hash);
    const values = alpha(output);
    assert.equal(values[0], 0); assert.equal(values[1], 255);
    assert.throws(() => recolorLinePlate(opaque, output, '#b79d77', 'different-hash'), /real transparent background/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
