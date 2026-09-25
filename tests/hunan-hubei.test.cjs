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
const batch = json('assets/research/hunan-hubei-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({ SITES, PLACES })');
const facets = require('../catalog.js');
const { create } = require('../library.js');
const protection = require('../protection.js');
const catalog = facets.classify(SITES, PLACES);

test('Hunan and Hubei additions cover both new provinces with paired artwork and genuine saved inputs', () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(batch.beforeCount, 249);
  assert.equal(batch.ids.length, 8);
  assert.deepEqual([...batch.ids].sort(), [...batch.plannedIds].sort());
  assert.equal(new Set(batch.ids).size, 8);
  assert(SITES.length >= batch.beforeCount + batch.ids.length);
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const province of ['湖南', '湖北']) {
    assert.equal(batch.groups[province].length, 4);
    assert.equal(catalog.filter(s => s.province === province).length, 4);
    for (const id of batch.groups[province]) {
      const site = catalog.find(s => s.id === id);
      assert.equal(site.province, province);
      assert.equal(site.region, 'central');
      assert.equal(site.country, 'CN');
      assert.equal(site.initialStatus, 'unvisited');
      assert.equal(queue.entries.filter(e => e.id === id).length, 1);
      for (const folder of ['research', 'color-research']) {
        const record = json(`assets/${folder}/${id}.json`);
        assert.equal(record.quality_mode, 'prototype');
        assert(['pending_user', 'approved_user'].includes(record.visual_review_status));
        assert.equal(record.background_preparation.method, 'white-matte-v1');
        assert.equal(record.background_preparation.sourceSha256, hash(record.output || record.generated_file));
        assert.equal(record.generation_history.length, 1);
        const event = record.generation_history[0];
        assert.equal(event.status, 'saved');
        assert.equal(event.prompt, record.prompt);
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
      assert.equal(art.sourceSha256, hash(art.source));
      assert.equal(art.inputSha256, hash(art.input));
      assert.equal(art.sha256, hash(art.src));
      assert(read('assets/research/hunan-hubei-review.html').includes('id="' + id + '"'));
    }
  }
});

test('Hunan and Hubei dates and protection scopes follow drawn surviving subjects', () => {
  const byId = id => SITES.find(s => s.id === id);
  assert.equal(byId('hu_yueyang').year, 1880);
  assert(byId('hu_yueyang').yearNote.includes('1984'));
  assert.equal(byId('hu_nanyue').year, 1882);
  assert(byId('hu_zhanggu').yearApprox && byId('hu_zhanggu').sub.includes('民居'));
  assert(byId('hu_zhanggu').yearNote.includes('局部'));
  assert.equal(byId('hu_tianhou').year, 1748);
  assert(byId('hu_tianhou').types.includes('sculpture'));
  assert.equal(byId('hb_jindian').year, 1416);
  assert(byId('hb_jindian').yearNote.includes('元代'));
  assert(byId('hb_zixiao').yearApprox && byId('hb_zixiao').yearLabel.includes('永乐'));
  assert.equal(byId('hb_yuquan').year, 1061);
  assert.equal(byId('hb_yuquan').dyn, 'song');
  assert(byId('hb_yuquan').yearNote.includes('清代'));
  assert(byId('hb_xianling').yearApprox && byId('hb_xianling').yearNote.includes('1990'));
  const expected = {
    hu_yueyang: [3, '岳阳楼'], hu_nanyue: [6, '南岳庙'],
    hu_zhanggu: [5, '张谷英村古建筑群'], hu_tianhou: [7, '芷江天后宫'],
    hb_jindian: [1, '武当山金殿'], hb_zixiao: [2, '紫霄宫'],
    hb_yuquan: [2, '玉泉寺及铁塔'], hb_xianling: [3, '显陵']
  };
  for (const [id, [batch, unitName]] of Object.entries(expected)) {
    const item = protection.forSite(id)[0];
    assert.equal(item.batch, batch, id);
    assert.equal(item.unitName, unitName, id);
    assert.equal(item.relation, 'part', id);
    assert(item.scope && item.scopeSources.length);
  }
  const color = json('assets/color-research/hu_nanyue.json');
  assert(!color.input_images.some(f => f.includes('historic')));
  assert(color.input_images.some(f => f.includes('actual')));
});

test('Hunan and Hubei additions remain searchable and seed unvisited without changing existing journals', () => {
  const memory = new Map();
  const storage = { getItem: k => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v) };
  const before = create(catalog.filter(s => !batch.ids.includes(s.id)), storage);
  before.setRecord('foguang', { status: 'visited', visitedOn: '', note: '旧记录保留' });
  const after = create(catalog, storage);
  for (const id of batch.ids) {
    assert.equal(after.record(id).status, 'unvisited');
    assert.equal(after.record(id).visitedOn, '');
  }
  assert.equal(after.record('foguang').note, '旧记录保留');
  const find = filters => Array.from(after.all().filter(s => facets.matches(s, filters)), s => s.id).sort();
  for (const province of ['湖南', '湖北']) assert.deepEqual(find({ region: 'central', province }), [...batch.groups[province]].sort());
  assert.deepEqual(find({ province: '湖南', query: '第七批国保' }), ['hu_tianhou']);
  assert.deepEqual(find({ province: '湖北', type: 'pagoda' }), ['hb_yuquan']);
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(after.export());
  assert.equal(restored.record('foguang').note, '旧记录保留');
  assert.equal(restored.record('hu_yueyang').status, 'unvisited');
});

test('Hunan and Hubei expansion preserves all previous originals, transparent deliveries and review states', () => {
  const current = json('assets/color-research/avif-manifest.json').images;
  assert.equal(Object.keys(batch.previousDeliveries).length, batch.beforeCount);
  for (const id of batch.previousIds) assert(SITES.some(s => s.id === id), id);
  for (const [id, old] of Object.entries(batch.previousDeliveries)) {
    for (const key of ['source', 'input', 'src']) assert.equal(hash(old[key]), old[{ source: 'sourceSha256', input: 'inputSha256', src: 'sha256' }[key]], id);
    assert.equal(current[id].visualReview, old.visualReview, id);
  }
});
