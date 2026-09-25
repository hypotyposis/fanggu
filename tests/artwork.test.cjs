const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({});
vm.runInContext(read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n' + read('artwork.js') + '\nglobalThis.sitesForTest = SITES;', context);
const art = context.FangguArtwork, sites = context.sitesForTest;
test('personal status chooses the companion while preserving line art and records', () => {
  const site = sites.find(site => site.id === 'liyeque'), original = JSON.stringify(site);
  assert.equal(art.resolve(site, 'visited').src, 'assets/colored-transparent-avif/liyeque.avif');
  for (const status of ['wishlist', 'unvisited', undefined]) {
    assert.equal(art.resolve(site, status).src, site.image.src);
    assert.equal(art.resolve(site, status).colored, false);
  }
  assert.equal(JSON.stringify(site), original);
});
test('missing or failed colored art falls back to its existing line plate', () => {
  const missing = { id: 'not-generated', name: 'test', image: { src: 'line.png', width: 10, height: 20 } };
  assert.equal(art.resolve(missing, 'visited').src, 'line.png');
  const classes = new Set();
  const image = { classList: { toggle: (key, value) => value ? classes.add(key) : classes.delete(key), remove: key => classes.delete(key) } };
  const site = sites.find(site => site.id === 'liyeque');
  art.apply(image, site, 'visited');
  assert(classes.has('colored-plate')); assert.equal(typeof image.onerror, 'function');
  image.onerror();
  assert.equal(image.src, site.image.src); assert.equal(image.onerror, null); assert(!classes.has('colored-plate'));
  art.apply(image, site, 'wishlist'); assert.equal(image.src, site.image.src);
});
test('every transparent AVIF traces to its lossless companion and retained PNG master', () => {
  assert.deepEqual(Object.keys(context.COLORED_PLATES).sort(), Array.from(sites, site => site.id).sort());
  const delivery = JSON.parse(read('assets/color-research/avif-manifest.json'));
  assert.equal(delivery.settings.quality, 85);
  assert.equal(delivery.settings.subsampling, '4:4:4');
  const hash = bytes => createHash('sha256').update(bytes).digest('hex');
  for (const [id, item] of Object.entries(context.COLORED_PLATES)) {
    assert(sites.some(site => site.id === id));
    const encoded = delivery.images[id];
    assert.equal(item.src, encoded.src);
    assert.equal(item.originalSrc, encoded.source);
    assert.equal(item.transparentSrc, encoded.input);
    const prototype = JSON.parse(read('scripts/plate-policy.json')).mode === 'prototype' && encoded.qualityMode === 'prototype';
    if (prototype) {
      assert.equal(item.transparent, encoded.alpha.min === 0 && encoded.alpha.max > 0);
    } else {
      assert.equal(item.transparent, true);
      assert.equal(encoded.alpha.min, 0); assert.equal(encoded.alpha.max, 255);
      assert(encoded.alpha.transparentPixels > 0); assert(encoded.alpha.opaquePixels > 0);
      if (encoded.extraction.method === 'white-matte-v1') {
        assert.equal(encoded.extraction.interiorRgbUnchanged, true);
        assert.equal(encoded.backgroundPreparation.sourceSha256, encoded.sourceSha256);
        assert.equal(encoded.backgroundPreparation.processorSha256, hash(fs.readFileSync(path.join(root, 'scripts/white-matte.py'))));
      } else assert.equal(encoded.extraction.rgbUnchanged, true);
    }
    assert.equal(item.visualReview, encoded.visualReview);
    if (encoded.visualReview === 'approved_user') {
      assert.equal(encoded.review.reviewer, 'user');
      assert.equal(encoded.review.avifSha256, encoded.sha256);
      assert.equal(encoded.review.inputSha256, encoded.inputSha256);
    }
    const transparent = fs.readFileSync(path.join(root, encoded.input));
    assert.equal(hash(transparent), encoded.inputSha256);
    assert.equal(transparent[25], 6, 'PNG must have an RGBA color type');
    assert.equal(transparent.readUInt32BE(16), item.width); assert.equal(transparent.readUInt32BE(20), item.height);
    const bytes = fs.readFileSync(path.join(root, item.src));
    assert.equal(bytes.subarray(4, 8).toString(), 'ftyp');
    assert.equal(bytes.subarray(8, 12).toString(), 'avif');
    assert.equal(hash(bytes), encoded.sha256);
    const original = fs.readFileSync(path.join(root, item.originalSrc));
    assert.equal(hash(original), encoded.sourceSha256);
    assert.equal(original.subarray(1, 4).toString(), 'PNG');
    assert.equal(original.readUInt32BE(16), item.width); assert.equal(original.readUInt32BE(20), item.height);
    assert.equal(encoded.width, item.width); assert.equal(encoded.height, item.height);
    assert(fs.existsSync(path.join(root, item.record)));
  }
});
