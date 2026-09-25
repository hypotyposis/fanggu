const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const json = p => JSON.parse(read(p));
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
const batch = json('assets/research/hebei-20260917-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES, PLACES})');
const facets = require('../catalog.js');
const protection = require('../protection.js');
const { create } = require('../library.js');
const catalog = facets.classify(SITES, PLACES);

test('Hebei intake has complete sourced pairs and preserves real generation inputs', () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(batch.beforeCount, 269);
  assert.equal(new Set(batch.ids).size, 8);
  assert.deepEqual(batch.ids.slice().sort(), batch.plannedIds.slice().sort());
  assert.deepEqual([...queue.entries.map(e => e.id), ...queue.excluded].sort(), Array.from(SITES, s => s.id).sort());
  assert.deepEqual(Object.keys(manifest.images).sort(), Array.from(SITES, s => s.id).sort());
  for (const id of batch.ids) {
    const site = catalog.find(s => s.id === id);
    assert.equal(site.province, '河北'); assert.equal(site.region, 'north');
    assert.equal(site.country, 'CN'); assert.equal(site.initialStatus, 'unvisited');
    assert.equal(queue.entries.filter(e => e.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const record = json(`assets/${folder}/${id}.json`);
      assert.equal(record.quality_mode, 'prototype');
      assert(['pending_user', 'approved_user'].includes(record.visual_review_status));
      assert.equal(record.background_preparation.method, 'white-matte-v1');
      assert.equal(record.background_preparation.sourceSha256, hash(record.generated_file || record.output));
      assert(record.inputs_viewed && record.historical_sources.length);
      assert.equal(record.generation_history.length, 1);
      const event = record.generation_history[0];
      assert.equal(event.status, 'saved'); assert.equal(event.prompt, record.prompt);
      assert.deepEqual(event.input_images, record.reference_files || record.input_images);
      assert(Date.parse(event.saved_at) >= Date.parse(event.received_at));
      assert(Date.parse(event.received_at) >= Date.parse(event.submitted_at));
      assert(fs.existsSync(event.original_file));
      for (const ref of record.references) {
        assert.equal(ref.sha256, hash(ref.file));
        assert(ref.author && ref.license && ref.page && ref.url);
      }
    }
    const art = manifest.images[id];
    assert.equal(art.sourceSha256, hash(art.source));
    assert.equal(art.inputSha256, hash(art.input)); assert.equal(art.sha256, hash(art.src));
    assert.equal(art.visualReview, json(`assets/color-research/${id}.json`).visual_review_status);
  }
});

test('Hebei dates and national protection refer to the selected surviving subject', () => {
  const byId = id => SITES.find(s => s.id === id);
  for (const id of ['hb_shanhaiguan', 'hb_zhili', 'hb_yongtong']) assert.equal(byId(id).yearApprox, true);
  assert.equal(byId('hb_yongtong').yearLabel, '1190—1195');
  assert.equal(byId('hb_tiangong').year, 1062);
  assert.equal(byId('hb_pule').year, 1766);
  assert.equal(byId('hb_anyuan').year, 1764);
  assert(byId('hb_shien').yearNote.includes('清代增建'));
  assert.equal(byId('hb_dajingmen').year, 1644);
  assert.equal(protection.forSite('hb_pule')[0].scope, '旭光阁与上层台基');
  assert.equal(protection.forSite('hb_zhili')[0].scope, '大堂');
  const gate = protection.forSite('hb_dajingmen')[0];
  assert.equal(gate.batch, 7); assert.equal(gate.relation, 'merged');
  assert.equal(gate.unitName, '长城'); assert.equal(gate.parent.batch, 5);
});

test('Hebei additions are searchable, unvisited, and do not admit blocked candidates', () => {
  const library = create(catalog, { getItem: () => null, setItem() {} });
  const find = filters => library.all().filter(s => facets.matches(s, filters));
  assert.deepEqual(Array.from(find({ province: '河北' }), s => s.id).sort(), [...batch.previousProvinceIds, ...batch.ids].sort());
  for (const id of batch.ids) assert(find({ province: '河北', status: 'unvisited' }).some(s => s.id === id));
  for (const [query, id] of [['天下第一关', 'hb_shanhaiguan'], ['伊犁庙', 'hb_anyuan'], ['赵县小石桥', 'hb_yongtong'], ['丰润', 'hb_tiangong']]) {
    assert(find({ query, province: '河北' }).some(s => s.id === id));
  }
  assert(find({ query: '第七批国保', province: '河北' }).some(s => s.id === 'hb_dajingmen'));
  assert(!find({ query: '第五批国保', province: '河北' }).some(s => s.id === 'hb_dajingmen'));
  for (const id of Object.keys(batch.researchBlocked)) assert(!SITES.some(s => s.id === id));
});

test('Hebei intake preserves all previous colored deliverables and human approvals', () => {
  const manifest = json('assets/color-research/avif-manifest.json');
  for (const [id, previous] of Object.entries(batch.previousDeliveries)) {
    const now = manifest.images[id];
    assert.equal(now.sourceSha256, previous.source, id);
    assert.equal(now.inputSha256, previous.input, id);
    assert.equal(now.sha256, previous.avif, id);
    assert.equal(now.visualReview, previous.visualReview, id);
  }
});
