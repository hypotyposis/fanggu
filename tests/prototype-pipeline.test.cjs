const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { execFileSync, spawnSync } = require('node:child_process');
const { createHash } = require('node:crypto');

test('prototype is default; strict quality gates remain explicitly available', async () => {
  const { plateMode } = await import('../scripts/plate-policy.mjs');
  assert.equal(plateMode([]), 'prototype');
  assert.equal(plateMode(['--strict']), 'strict');
  assert.throws(() => plateMode(['--strict', '--prototype']), /not both/);
  const { recolorLinePlate } = await import('../scripts/line-plate.mjs');
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'fanggu-prototype-line-'));
  try {
    const source = path.join(directory, 'source.png'), output = path.join(directory, 'output.png');
    execFileSync('magick', ['-size', '7x7', 'xc:#f0f0f0', '-fill', '#5a4628', '-draw', 'rectangle 2,2 4,4', source]);
    const original = fs.readFileSync(source);
    recolorLinePlate(source, output, '#b79d77', undefined, undefined, { prototype: true });
    assert(fs.existsSync(output));
    assert.deepEqual(fs.readFileSync(source), original);
    assert.throws(() => recolorLinePlate(source, output, '#b79d77'), /real transparent background/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('prototype collector bypasses quality/status gates without inventing user approval', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'fanggu-prototype-collect-'));
  const put = (file, value) => {
    const target = path.join(directory, file);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, typeof value === 'string' ? value : JSON.stringify(value));
  };
  try {
    for (const name of ['collect-colored-plates.mjs', 'plate-policy.mjs', 'plate-policy.json', 'record-plate-review.mjs']) {
      put(`scripts/${name}`, fs.readFileSync(path.join(__dirname, '../scripts', name), 'utf8'));
    }
    put('sites.js', 'const SITES = [{id:"demo"}];');
    put('plates.js', '');
    const source = 'assets/colored/demo.png', input = 'assets/colored-transparent/demo.png', src = 'assets/colored-transparent-avif/demo.avif';
    put(source, ''); put(input, ''); put(src, '');
    execFileSync('magick', ['-size', '4x4', 'xc:gray', path.join(directory, source)]);
    fs.copyFileSync(path.join(directory, source), path.join(directory, input));
    execFileSync('magick', [path.join(directory, source), path.join(directory, src)]);
    const hash = file => createHash('sha256').update(fs.readFileSync(path.join(directory, file))).digest('hex');
    const record = 'assets/color-research/demo.json';
    put(record, { id: 'demo', status: 'needs_review', output: source });
    put('assets/color-research/queue.json', { count: 1, excluded: [], entries: [{ id: 'demo', subject: 'demo', record, output: source, width: 999, height: 999 }] });
    put('assets/color-research/avif-manifest.json', { format: 'AVIF', settings: { quality: 1 }, images: {
      demo: { source, input, src, width: 999, height: 999, alpha: { min: 255, max: 255 },
        sourceSha256: hash(source), inputSha256: hash(input), sha256: hash(src), visualReview: 'pending_user' }
    } });
    const collect = args => spawnSync(process.execPath, ['scripts/collect-colored-plates.mjs', ...args], { cwd: directory, encoding: 'utf8' });
    const result = collect(['--require-complete']);
    assert.equal(result.status, 0, result.stderr);
    const generated = fs.readFileSync(path.join(directory, 'colored-plates.js'), 'utf8');
    assert.match(generated, /"visualReview": "pending_user"/);
    assert.match(generated, /"transparent": false/);
    assert.notEqual(collect(['--strict']).status, 0);
    execFileSync(process.execPath, ['scripts/record-plate-review.mjs', 'color', 'demo'], { cwd: directory });
    const accepted = JSON.parse(fs.readFileSync(path.join(directory, record), 'utf8')).user_review;
    assert.equal(accepted.status, 'approved_user');
    assert.equal(accepted.sourceSha256, hash(source));
    assert.equal(accepted.avifSha256, hash(src));
    const delivery = JSON.parse(fs.readFileSync(path.join(directory, 'assets/color-research/avif-manifest.json'), 'utf8'));
    delivery.images.demo.visualReview = 'approved_user';
    delivery.images.demo.review = accepted;
    put('assets/color-research/avif-manifest.json', delivery);
    assert.equal(collect(['--require-complete']).status, 0);
    assert.match(fs.readFileSync(path.join(directory, 'colored-plates.js'), 'utf8'), /"visualReview": "approved_user"/);
    fs.appendFileSync(path.join(directory, src), 'changed');
    assert.equal(collect(['--require-complete']).status, 0);
    assert.match(fs.readFileSync(path.join(directory, 'colored-plates.js'), 'utf8'), /"visualReview": "pending_user"/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
