const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
const json = f => JSON.parse(read(f));
const hash = f => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, f))).digest('hex');
const batch = json('assets/research/shaanxi-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({ SITES, PLACES })');
const { classify } = require('../catalog.js');
const { create } = require('../library.js');
const catalog = classify(SITES, PLACES);

test('Shaanxi additions have paired originals, real input references and genuine generation records', () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(batch.ids.length, 7);
  assert.equal(batch.plannedIds.length, 8);
  assert.equal(new Set(batch.ids).size, batch.ids.length);
  assert.deepEqual([...batch.ids, ...batch.blocked.map(b => b.id)].sort(), [...batch.plannedIds].sort());
  assert.deepEqual(batch.groups['陕西'], batch.ids);
  assert(SITES.length >= batch.beforeCount + batch.ids.length);
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const id of batch.ids) {
    const site = catalog.find(s => s.id === id);
    assert.equal(site.province, '陕西');
    assert.equal(site.region, 'northwest');
    assert.equal(site.country, 'CN');
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(queue.entries.filter(e => e.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const record = json(`assets/${folder}/${id}.json`);
      assert.equal(record.id, id);
      assert.equal(record.quality_mode, 'prototype');
      assert(['pending_user', 'approved_user'].includes(record.visual_review_status));
      assert.equal(record.background_preparation.method, 'white-matte-v1');
      assert.equal(record.background_preparation.sourceSha256, hash(record.output || record.generated_file));
      const savedEvents = record.generation_history.filter(e => e.status === 'saved');
      assert.equal(savedEvents.length, 1);
      assert(record.generation_history.every(e => ['saved', 'abandoned_wait'].includes(e.status)));
      const event = savedEvents[0];
      assert.equal(event.status, 'saved');
      assert.equal(event.prompt, record.prompt);
      assert(Date.parse(event.saved_at) >= Date.parse(event.submitted_at));
      assert(record.inputs_viewed);
      assert(record.references.length);
      for (const ref of record.references) {
        assert.equal(hash(ref.file), ref.sha256);
        assert(ref.author && ref.license && ref.page.startsWith('https://'));
      }
      for (const file of record.reference_files || record.input_images) assert(fs.existsSync(path.join(root, file)), file);
      if (record.visual_review_status === 'approved_user') assert.equal(record.user_review.sourceSha256, record.background_preparation.sourceSha256);
    }
    const item = manifest.images[id];
    assert.equal(item.sourceSha256, hash(item.source));
    assert.equal(item.inputSha256, hash(item.input));
    assert.equal(item.sha256, hash(item.src));
  }
});

test('Shaanxi subject selection and dates distinguish surviving fabric from foundation history', () => {
  const byId = id => SITES.find(s => s.id === id);
  for (const id of ['xian', 'xianwall', 'xianzhonggu']) assert(byId(id));
  assert.equal(byId('sn_xingjiao').year, 669);
  assert(byId('sn_xingjiao').yearNote.includes('另两座'));
  assert(byId('sn_xiangji').yearApprox);
  assert(byId('sn_xiangji').yearNote.includes('681'));
  assert(byId('sn_xiangji').yearNote.includes('706'));
  assert.equal(byId('sn_daqin').dyn, 'song');
  assert(byId('sn_daqin').yearApprox);
  assert.equal(byId('sn_yanan').dyn, 'ming');
  assert(byId('sn_yanan').yearApprox);
  assert(byId('sn_yanan').yearNote.includes('名录标宋'));
  assert(byId('sn_qianling').types.includes('stele'));
  assert(byId('sn_qianling').yearNote.includes('并非今日完全无字'));
  assert(byId('sn_hancheng').yearApprox);
});

test('insufficient Puzhao photographs cause a documented hold rather than fabricated artwork', () => {
  const rec = json('assets/research/sn_puzhao.json');
  assert.equal(rec.status, 'blocked');
  assert.equal(rec.generation_history.length, 0);
  assert.equal(batch.blocked[0].id, 'sn_puzhao');
  assert(!SITES.some(s => s.id === 'sn_puzhao'));
  assert(!json('assets/color-research/queue.json').entries.some(e => e.id === 'sn_puzhao'));
  assert(!json('assets/color-research/avif-manifest.json').images.sn_puzhao);
});

test('Shaanxi expansion preserves every previous color original, delivery and review state', () => {
  const current = json('assets/color-research/avif-manifest.json').images;
  assert.equal(Object.keys(batch.previousDeliveries).length, batch.beforeCount);
  for (const id of batch.previousIds) assert(SITES.some(s => s.id === id), id);
  for (const [id, old] of Object.entries(batch.previousDeliveries)) {
    for (const key of ['source', 'input', 'src']) assert.equal(hash(old[key]), old[{ source: 'sourceSha256', input: 'inputSha256', src: 'sha256' }[key]], id);
    assert.equal(current[id].visualReview, old.visualReview, id);
  }
});

test('Shaanxi unvisited seeds preserve personal records and never fabricate visit dates', () => {
  const data = new Map();
  const storage = { getItem: k => data.get(k) ?? null, setItem: (k, v) => data.set(k, v) };
  const old = create(catalog.filter(s => !batch.ids.includes(s.id)), storage);
  old.setRecord('xian', { status: 'visited', visitedOn: '', note: '原有长安笔记' });
  const added = create(catalog, storage);
  for (const id of batch.ids) {
    assert.equal(added.record(id).status, 'unvisited');
    assert.equal(added.record(id).visitedOn, '');
  }
  assert.equal(added.record('xian').note, '原有长安笔记');
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(added.export());
  assert.equal(restored.record('xian').note, '原有长安笔记');
  assert.equal(restored.record('sn_qianling').status, 'unvisited');
});
