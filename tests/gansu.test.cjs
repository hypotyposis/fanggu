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
const batch = json('assets/research/gansu-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({ SITES, PLACES })');
const facets = require('../catalog.js');
const { create } = require('../library.js');
const protection = require('../protection.js');
const catalog = facets.classify(SITES, PLACES);

test('Gansu intake adds four genuine paired plates with saved prompts, references and pending human review', () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(batch.beforeCount, 257);
  assert.equal(batch.ids.length, 4);
  assert.deepEqual([...batch.ids].sort(), [...batch.plannedIds].sort());
  assert.equal(new Set(batch.ids).size, 4);
  assert(SITES.length >= batch.beforeCount + batch.ids.length);
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  assert.deepEqual([...batch.groups['甘肃']].sort(), [...batch.ids].sort());
  for (const id of batch.ids) {
    const site = catalog.find(s => s.id === id);
    assert.equal(site.province, '甘肃'); assert.equal(site.region, 'northwest');
    assert.equal(site.country, 'CN'); assert.equal(site.initialStatus, 'unvisited');
    assert.equal(queue.entries.filter(e => e.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const record = json(`assets/${folder}/${id}.json`);
      assert.equal(record.quality_mode, 'prototype');
      assert(['pending_user', 'approved_user'].includes(record.visual_review_status));
      assert.equal(record.background_preparation.method, 'white-matte-v1');
      assert.equal(record.background_preparation.sourceSha256, hash(record.output || record.generated_file));
      assert.equal(record.generation_history.length, 1);
      const event = record.generation_history[0];
      assert.equal(event.status, 'saved'); assert.equal(event.prompt, record.prompt);
      assert(Date.parse(event.received_at) >= Date.parse(event.submitted_at));
      assert(Date.parse(event.saved_at) >= Date.parse(event.received_at));
      assert(record.inputs_viewed && record.references.length && record.historical_sources.length);
      for (const ref of record.references) {
        assert.equal(hash(ref.file), ref.sha256);
        assert(ref.author && ref.license && ref.page.startsWith('https://'));
        assert(!ref.author.includes('<a'));
      }
      for (const file of record.reference_files || record.input_images) assert(fs.existsSync(path.join(root, file)), file);
      if (record.visual_review_status === 'approved_user') assert.equal(record.user_review.sourceSha256, record.background_preparation.sourceSha256);
    }
    const art = manifest.images[id];
    assert.equal(art.sourceSha256, hash(art.source)); assert.equal(art.inputSha256, hash(art.input));
    assert.equal(art.sha256, hash(art.src));
    assert(read('assets/research/gansu-review.html').includes('id="' + id + '"'));
  }
});

test('Gansu dates and national-protection titles refer to the actual selected subjects', () => {
  const byId = id => SITES.find(s => s.id === id);
  assert(byId('gs_jiayuguan').yearApprox && byId('gs_jiayuguan').yearNote.includes('1372'));
  assert(byId('gs_dafo_tuta').yearApprox && byId('gs_dafo_tuta').sub.includes('上部'));
  assert(byId('gs_dafo_tuta').yearNote.includes('1986'));
  assert.equal(byId('gs_fuxi').year, 1805); assert(byId('gs_fuxi').yearNote.includes('1523'));
  assert.equal(byId('gs_bingling').year, 731); assert.equal(byId('gs_bingling').dyn, 'tang');
  const expected = { gs_jiayuguan: [1, '万里长城—嘉峪关'], gs_dafo_tuta: [4, '张掖大佛寺'], gs_fuxi: [5, '伏羲庙'], gs_bingling: [1, '炳灵寺石窟'] };
  for (const [id, [batchNumber, unitName]] of Object.entries(expected)) {
    const item = protection.forSite(id)[0];
    assert.equal(item.batch, batchNumber, id); assert.equal(item.unitName, unitName, id);
    assert.equal(item.relation, 'part', id); assert(item.scope && item.scopeSources.length);
  }
  const color = json('assets/color-research/gs_bingling.json');
  assert(color.input_images.some(f => f.includes('official')));
  assert(!color.input_images.some(f => f.includes('historic')));
  assert(color.prompt.includes('残损'));
});

test('Gansu additions are discoverable by region, national batch and type without changing journals', () => {
  const memory = new Map();
  const storage = { getItem: k => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v) };
  const before = create(catalog.filter(s => !batch.ids.includes(s.id)), storage);
  before.setRecord('foguang', { status: 'visited', visitedOn: '', note: '旧记录保留' });
  const after = create(catalog, storage);
  for (const id of batch.ids) { assert.equal(after.record(id).status, 'unvisited'); assert.equal(after.record(id).visitedOn, ''); }
  assert.equal(after.record('foguang').note, '旧记录保留');
  const find = filters => Array.from(after.all().filter(s => facets.matches(s, filters)), s => s.id).sort();
  const firstBatchStone = ['gs_maijishan', 'gs_mogao', 'gs_xixia_stele', 'gs_yulin'];
  assert.deepEqual(find({ region: 'northwest', province: '甘肃' }), [...batch.ids, ...firstBatchStone].sort());
  assert.deepEqual(find({ province: '甘肃', query: '第一批国保' }), ['gs_bingling', 'gs_jiayuguan', ...firstBatchStone].sort());
  assert.deepEqual(find({ province: '甘肃', type: 'pagoda' }), ['gs_dafo_tuta']);
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(after.export()); assert.equal(restored.record('foguang').note, '旧记录保留');
});

test('Gansu expansion preserves previous original, delivery hashes and visual-review records', () => {
  const current = json('assets/color-research/avif-manifest.json').images;
  assert.equal(Object.keys(batch.previousDeliveries).length, batch.beforeCount);
  for (const id of batch.previousIds) assert(SITES.some(s => s.id === id), id);
  for (const [id, old] of Object.entries(batch.previousDeliveries)) {
    for (const key of ['source', 'input', 'src']) assert.equal(hash(old[key]), old[{ source: 'sourceSha256', input: 'inputSha256', src: 'sha256' }[key]], id);
    assert.equal(current[id].visualReview, old.visualReview, id);
  }
});
