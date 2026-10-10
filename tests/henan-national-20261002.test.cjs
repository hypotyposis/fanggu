const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const { SITES, PLACES, COLORED_PLATES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n({SITES, PLACES, COLORED_PLATES})');
const batch = json('assets/research/henan-national-20261002-batch.json');
test('Henan national ten have distinct protected scopes, source records and complete pending art', requiresLocalAssets, () => {
  assert.equal(batch.count, 10);
  assert.equal(new Set(batch.ids).size, 10);
  const queue = json('assets/color-research/queue.json');
  const protection = json('assets/research/national-protection.json');
  const delivery = json('assets/color-research/avif-manifest.json');
  assert.equal(queue.count, queue.entries.length);
  for (const item of batch.items) {
    const id = item.id;
    assert.equal(SITES.filter(site => site.id === id).length, 1);
    const site = SITES.find(site => site.id === id);
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(site.country, 'CN');
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, '河南');
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    const protectedScope = protection.entries[id][0];
    assert.equal(protectedScope.batch, item.batch);
    assert.equal(protectedScope.unitName, item.unitName);
    assert(protectedScope.scope.includes(item.subject));
    assert(protectedScope.scopeSources.length > 0);
    assert.equal(protection.sources[protectedScope.source].batch, item.batch);
    assert.equal(COLORED_PLATES[id].visualReview, 'approved_default');
    assert(delivery.images[id].alpha.transparentPixels > 0);
    assert(delivery.images[id].alpha.opaquePixels > 0);
    for (const folder of ['research', 'color-research']) {
      const meta = json(`assets/${folder}/${id}.json`);
      const original = meta.generated_file || meta.output;
      assert.equal(meta.status, 'complete');
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
      assert.equal(meta.background_preparation.sourceSha256, createHash('sha256').update(fs.readFileSync(path.join(root, original))).digest('hex'));
      assert(meta.historical_sources.length > 0);
      assert(meta.input_images.every(file => fs.existsSync(path.join(root, file))));
      assert.equal(meta.generation_history.length, 1);
      assert.equal(meta.generation_history[0].prompt, meta.prompt);
      assert.equal(meta.user_review.status, 'approved_default');
      assert.equal(meta.user_review.reviewer, 'default-policy');
    }
  }
});
test('Henan subjects preserve merged designation and distinguish present structures from earlier foundations', () => {
  const protection = json('assets/research/national-protection.json');
  assert.equal(protection.entries.hn_yanqing[0].relation, 'merged');
  assert.equal(protection.entries.hn_yanqing[0].parent.batch, 3);
  assert.equal(protection.entries.hn_yanqing[0].parent.unitName, '宋东京城遗址');
  const site = id => SITES.find(item => item.id === id);
  assert.equal(site('hn_xiangguo').year, 1766);
  assert.equal(site('hn_linfeng').year, 1862);
  assert.equal(site('hn_songyang').tag, '清');
  assert.equal(site('hn_wenzhige').tag, '清');
  assert.equal(site('hn_wenzhige').yearApprox, true);
  assert.equal(site('hn_gaoge').yearApprox, true);
  assert.match(site('hn_gaoge').sub, /高台上部/);
});
