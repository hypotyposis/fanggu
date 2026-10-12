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
const hash = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const { SITES, PLATES, COLORED_PLATES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n({SITES,PLATES,COLORED_PLATES})');
const batch = json('assets/research/china-single-20261012-batch.json');
const followup = json('assets/research/china-single-resume-20261012-batch.json');
const byID = Object.fromEntries(SITES.map(site => [site.id, site]));
const { curations } = require('../curations.js');

test('building splits preserve old IDs exclusively as collection records and ship every new member', () => {
  assert.equal(SITES.length, batch.baseline_catalog_count + batch.ids.length + followup.ids.length);
  assert.equal(new Set(batch.ids).size, batch.ids.length);
  assert.deepEqual(Object.values(batch.delivered_groups).flat().sort(), [...batch.ids].sort());
  for (const [parent, ids] of Object.entries(batch.delivered_groups)) {
    assert.equal(byID[parent].collectionOnly, true, parent);
    const list = curations.find(list => list.id === parent);
    assert.equal(list.kind, 'collection');
    assert.equal(list.legacySiteID, parent);
    assert.deepEqual(list.items.filter(id => batch.ids.includes(id)), ids);
    assert.deepEqual(list.items.filter(id => !batch.ids.includes(id)), followup.delivered_groups[parent] || []);
    assert.ok(!list.items.includes(parent));
    for (const id of ids) {
      assert.equal(byID[id].initialStatus, 'unvisited', id);
      assert.equal(byID[id].placeKey, byID[parent].placeKey, id);
      assert.notEqual(byID[id].collectionOnly, true, id);
      assert.ok(PLATES[id] && COLORED_PLATES[id], id);
      for (const language of ['', '-en', '-ja']) {
        const exported = json(`ios/Fanggu/Resources/catalog${language}.json`);
        assert.equal(exported.find(s => s.id === parent).collectionOnly, true);
        assert.equal(exported.find(s => s.id === id).collectionOnly, false);
      }
    }
  }
});

test('new plates retain real generation or reuse provenance and independently bound delivery hashes', requiresLocalAssets, () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  for (const id of batch.ids) {
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1, id);
    for (const [folder, field] of [['research', 'generated_file'], ['color-research', 'output']]) {
      const record = json(`assets/${folder}/${id}.json`);
      assert.equal(record.id, id);
      assert.ok(record.prompt.length > 100, id);
      assert.equal(record.background_preparation.sourceSha256, hash(record[field]), id);
      assert.ok(record.reference_files?.length || record.input_images?.length, id);
      const files = record.input_images || record.reference_files;
      for (const file of files) assert.ok(fs.existsSync(path.resolve(root, file)), `${id}: ${file}`);
      assert.equal(record.user_review.status, 'approved_default', id);
      assert.equal(record.user_review.reviewer, 'default-policy', id);
    }
    const delivery = manifest.images[id];
    assert.equal(delivery.visualReview, 'approved_default', id);
    assert.equal(delivery.inputSha256, hash(delivery.input), id);
    assert.equal(delivery.sha256, hash(delivery.src), id);
    assert.ok(delivery.alpha.transparentPixels > 0 && delivery.alpha.opaquePixels > 0, id);
  }
});

test('single-building dates, the Eight Liao list and separate protection batches follow the actual subjects', () => {
  for (const [id, year, tag] of [['huayan_bojia',1038,'辽'], ['huayan_daxiong',1140,'金'], ['shanhua_puxian',1154,'金'], ['dule_gate',984,'辽'], ['yongzuo_wenfeng',1599,'明'], ['yongzuo_xuanwen',1612,'明'], ['chongsheng_qianxun',840,'南诏'], ['chongsheng_north',1000,'大理'], ['xitai_chenghuang',1935,'近现代']]) {
    assert.equal(byID[id].year, year, id); assert.equal(byID[id].tag, tag, id);
  }
  const liao = curations.find(list => list.id === 'liao_eight');
  assert.equal(liao.items.length, 8);
  assert.ok(liao.items.includes('dule_gate') && liao.items.includes('dule_guanyin'));
  assert.ok(liao.items.includes('huayan_bojia') && liao.items.includes('shanhua_daxiong'));
  assert.ok(liao.items.every(id => byID[id].collectionOnly !== true));
  const protection = json('assets/research/national-protection.json');
  assert.deepEqual(protection.entries.kaiyuan_bell.map(e => e.batch), [3]);
  assert.deepEqual(protection.entries.kaiyuan_xumi.map(e => e.batch), [6]);
  assert.ok(!byID.longxing_dabei, 'the complete Dabei assembly still requires unobstructed reference evidence');
});
