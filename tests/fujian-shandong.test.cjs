const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const batch = json('assets/research/fujian-shandong-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({ SITES, PLACES })');
const facets = require('../catalog.js');
const { create } = require('../library.js');
const catalog = facets.classify(SITES, PLACES);

test('Fujian and Shandong additions have paired prototype images with genuine inputs and histories', () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(batch.plannedIds.length, 8);
  assert.equal(batch.ids.length, 7);
  assert.equal(new Set(batch.ids).size, 7);
  assert.deepEqual([...batch.ids, ...batch.blocked.map(b => b.id)].sort(), [...batch.plannedIds].sort());
  assert.deepEqual(Object.values(batch.groups).flat().sort(), [...batch.ids].sort());
  assert(SITES.length >= batch.beforeCount + batch.ids.length);
  for (const id of Object.keys(batch.previousDeliveries)) assert(SITES.some(s => s.id === id), id);
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const [province, ids] of Object.entries(batch.groups)) {
    assert.equal(ids.length, province === '福建' ? 4 : 3);
    for (const id of ids) {
      const site = catalog.find(s => s.id === id);
      assert.equal(site.province, province);
      assert.equal(site.initialStatus, 'unvisited');
      assert.equal(site.country, 'CN');
      assert.equal(queue.entries.filter(e => e.id === id).length, 1);
      for (const folder of ['research', 'color-research']) {
        const meta = json(`assets/${folder}/${id}.json`);
        assert.equal(meta.id, id);
        assert(['needs_review', 'complete'].includes(meta.status));
        assert.equal(meta.quality_mode, 'prototype');
        assert(meta.historical_sources?.length || meta.references?.length);
        assert.equal(meta.background_preparation.sourceSha256, hash(meta.output || meta.generated_file));
        assert.equal(meta.background_preparation.method, 'white-matte-v1');
        for (const input of meta.reference_files || meta.input_images) assert(fs.existsSync(path.join(root, input)), input);
        const saved = meta.generation_history.filter(g => g.status === 'saved');
        assert.equal(saved.length, 1);
        assert.equal(saved[0].prompt, meta.prompt);
        assert(saved[0].original_file && saved[0].submitted_at && saved[0].received_at && saved[0].saved_at);
        assert(meta.references.every(r => r.author && r.license && r.page && r.url));
      }
      assert.equal(manifest.images[id].qualityMode, 'prototype');
      assert(['pending_user', 'approved_user'].includes(manifest.images[id].visualReview));
      assert(fs.existsSync(path.join(root, manifest.images[id].src)));
    }
  }
});

test('separate Kaiyuan subjects keep distinct identities and all seven additions are searchable by province', () => {
  const library = create(catalog, { getItem: () => null, setItem() {} });
  const find = filters => library.all().filter(s => facets.matches(s, filters));
  for (const [province, ids] of Object.entries(batch.groups)) for (const id of ids) {
    assert(find({ province, status: 'unvisited' }).some(s => s.id === id));
    assert.equal(SITES.filter(s => s.id === id).length, 1);
  }
  for (const id of ['quanzhoukaiyuan', 'fj_zhenguo', 'fj_renshou']) assert(find({ query: '开元寺', province: '福建' }).some(s => s.id === id));
  assert.equal(SITES.find(s => s.id === 'quanzhoukaiyuan').year, 1637);
  assert.equal(SITES.find(s => s.id === 'fj_renshou').year, 1237);
  assert.equal(SITES.find(s => s.id === 'fj_zhenguo').year, 1250);
  assert.equal(find({ province: '福建' }).length, 10);
  const laterShandong = json('assets/research/shandong-20260917-batch.json');
  assert.deepEqual(Array.from(find({ province: '山东' }), s => s.id).sort(), [...laterShandong.previousProvinceIds, ...laterShandong.ids].sort());
  assert(find({ query: '承启楼', type: 'residence' }).some(s => s.id === 'fj_chengqi'));
});

test('dates distinguish stone-tower inscriptions, earlier foundations and uncertain repair phases', () => {
  const site = id => SITES.find(s => s.id === id);
  assert.equal(site('sd_simen').year, 611);
  assert.equal(site('sd_simen').dyn, 'sui');
  assert(site('sd_simen').yearNote.includes('544'));
  assert.equal(site('fj_chengqi').year, 1709);
  assert.equal(site('sd_mengmiao').year, 1673);
  assert.equal(site('fj_chongwu').yearApprox, true);
  assert(site('fj_chongwu').yearNote.includes('门楼'));
  assert.equal(site('sd_longhu').yearApprox, true);
  assert(site('sd_longhu').yearNote.includes('约略定位'));
  assert(site('sd_longhu').yearNote.includes('塔顶'));
  for (const id of batch.ids) assert(site(id).yearNote);
});

test('Penglai lacks a full-subject input and remains blocked rather than becoming a fabricated catalogue entry', () => {
  const record = json('assets/research/sd_penglai.json');
  assert.equal(batch.blocked.length, 1);
  assert.equal(batch.blocked[0].id, 'sd_penglai');
  assert.equal(record.status, 'blocked');
  assert.equal(record.generation_history.length, 0);
  assert(!SITES.some(s => s.id === 'sd_penglai'));
  assert(!json('assets/color-research/queue.json').entries.some(e => e.id === 'sd_penglai'));
  assert(!json('assets/color-research/avif-manifest.json').images.sd_penglai);
});

test('adding seven monuments preserves earlier files and their human-review state', () => {
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(Object.keys(batch.previousDeliveries).length, batch.beforeCount);
  assert.equal(batch.beforeCount, 227);
  for (const [id, old] of Object.entries(batch.previousDeliveries)) {
    const now = manifest.images[id];
    assert.equal(hash(now.source), old.source, id);
    assert.equal(hash(now.input), old.input, id);
    assert.equal(hash(now.src), old.avif, id);
    if (now.visualReview !== old.visualReview) {
      const review = json(`assets/color-research/${id}.json`).user_review;
      assert.equal(old.visualReview, 'pending_user', id);
      assert.equal(now.visualReview, 'approved_user', id);
      assert.equal(review?.reviewer, 'user', id);
      assert.equal(review?.sourceSha256, now.sourceSha256, id);
      assert.equal(review?.inputSha256, now.inputSha256, id);
      assert.equal(review?.avifSha256, now.sha256, id);
    }
  }
});

test('new unvisited seeds do not erase saved notes or dates and survive backup restoration', () => {
  const data = new Map();
  const storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
  const previous = create(catalog.filter(s => !batch.ids.includes(s.id)), storage);
  previous.setRecord('quanzhoukaiyuan', { status: 'visited', visitedOn: '', note: '原有泉州记录' });
  const expanded = create(catalog, storage);
  for (const id of batch.ids) {
    assert.equal(expanded.record(id).status, 'unvisited');
    assert.equal(expanded.record(id).visitedOn, '');
  }
  assert.equal(expanded.record('quanzhoukaiyuan').note, '原有泉州记录');
  expanded.setRecord('sd_simen', { status: 'wishlist', visitedOn: '', note: '柳埠石塔' });
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(expanded.export());
  assert.equal(restored.record('sd_simen').note, '柳埠石塔');
  assert.equal(restored.record('quanzhoukaiyuan').status, 'visited');
});
