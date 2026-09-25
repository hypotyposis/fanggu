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
const batch = json('assets/research/shandong-20260917-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES, PLACES})');
const facets = require('../catalog.js');
const protection = require('../protection.js');
const { create } = require('../library.js');
const catalog = facets.classify(SITES, PLACES);

test('Shandong expansion has eight complete pairs with genuine generation inputs and pending human review', () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(batch.beforeCount, 261);
  assert.equal(new Set(batch.ids).size, 8);
  assert.deepEqual(batch.ids.slice().sort(), batch.plannedIds.slice().sort());
  for (const id of batch.ids) {
    const site = catalog.find(s => s.id === id);
    assert.equal(site.province, '山东'); assert.equal(site.region, 'east');
    assert.equal(site.country, 'CN'); assert.equal(site.initialStatus, 'unvisited');
    assert.equal(queue.entries.filter(e => e.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const record = json(`assets/${folder}/${id}.json`);
      assert.equal(record.quality_mode, 'prototype');
      assert(['pending_user', 'approved_user'].includes(record.visual_review_status));
      assert.equal(record.background_preparation.sourceSha256, hash(record.generated_file || record.output));
      assert.equal(record.background_preparation.method, 'white-matte-v1');
      assert(record.inputs_viewed && record.historical_sources.length);
      const event = record.generation_history[0];
      assert.equal(record.generation_history.length, 1); assert.equal(event.status, 'saved');
      assert.equal(event.prompt, record.prompt);
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

test('Shandong dates and national titles distinguish selected subjects and merged components', () => {
  const byId = id => SITES.find(s => s.id === id);
  assert.equal(byId('sd_yanmiao').year, 1507);
  assert(byId('sd_yanmiao').yearNote.includes('1509'));
  assert.equal(byId('sd_jiuding').yearApprox, true);
  assert.equal(byId('sd_jiuding').yearLabel, '唐代');
  assert.equal(byId('sd_chongjue').year, 1105);
  assert(byId('sd_chongjue').yearNote.includes('1581'));
  assert(byId('sd_yantai_huiguan').yearNote.includes('2025'));
  assert.equal(byId('sd_qingdao_catholic').year, 1934);
  assert.equal(byId('sd_qingdao_christ').year, 1910);
  assert.equal(protection.forSite('sd_jiuding')[0].unitName, '千佛崖造像');
  for (const id of ['sd_qingdao_christ', 'sd_qingdao_catholic']) {
    const tag = protection.forSite(id)[0];
    assert.equal(tag.batch, 6); assert.equal(tag.relation, 'merged');
    assert.equal(tag.parent.batch, 4); assert.equal(tag.parent.unitName, '青岛德国建筑');
  }
});

test('Shandong additions are searchable and start unvisited while the blocked historical candidate stays outside intake', () => {
  const library = create(catalog, { getItem: () => null, setItem() {} });
  const find = filters => library.all().filter(s => facets.matches(s, filters));
  assert.deepEqual(Array.from(find({ province: '山东' }), s => s.id).sort(), [...batch.previousProvinceIds, ...batch.ids].sort());
  for (const id of batch.ids) assert(find({ province: '山东', status: 'unvisited' }).some(s => s.id === id));
  assert(find({ query: '复圣殿', type: 'hall' }).some(s => s.id === 'sd_yanmiao'));
  assert(find({ query: '天后行宫', province: '山东' }).some(s => s.id === 'sd_yantai_huiguan'));
  assert.deepEqual(Array.from(find({ query: '第六批国保', province: '山东', type: 'church' }), s => s.id).sort(), ['sd_hongjialou', 'sd_qingdao_catholic', 'sd_qingdao_christ'].sort());
  assert.equal(find({ query: '第四批国保', province: '山东', type: 'church' }).length, 0);
  assert.equal(json('assets/research/sd_penglai.json').status, 'blocked');
});

test('Shandong intake preserves all previous colored deliverables and human approvals', () => {
  const manifest = json('assets/color-research/avif-manifest.json');
  for (const [id, previous] of Object.entries(batch.previousDeliveries)) {
    const now = manifest.images[id];
    assert.equal(now.sourceSha256, previous.source, id);
    assert.equal(now.inputSha256, previous.input, id);
    assert.equal(now.sha256, previous.avif, id);
    assert.equal(now.visualReview, previous.visualReview, id);
  }
});
