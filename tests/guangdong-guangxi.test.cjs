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
const batch = json('assets/research/guangdong-guangxi-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({ SITES, PLACES })');
const facets = require('../catalog.js');
const { create } = require('../library.js');
const protection = require('../protection.js');
const catalog = facets.classify(SITES, PLACES);

test('two Guang additions cover both new provinces with paired artwork and genuine saved inputs', () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(batch.beforeCount, 241);
  assert.equal(batch.ids.length, 8);
  assert.deepEqual([...batch.ids].sort(), [...batch.plannedIds].sort());
  assert.equal(new Set(batch.ids).size, 8);
  assert(SITES.length >= batch.beforeCount + batch.ids.length);
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const province of ['广东', '广西']) {
    assert.equal(batch.groups[province].length, 4);
    assert.equal(catalog.filter(s => s.province === province).length, 4);
    for (const id of batch.groups[province]) {
      const site = catalog.find(s => s.id === id);
      assert.equal(site.province, province);
      assert.equal(site.region, 'south');
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
      assert(read('assets/research/guangdong-guangxi-review.html').includes('id="' + id + '"'));
    }
  }
});

test('two Guang subjects and dates do not conflate foundations, full units or world heritage titles', () => {
  const byId = id => SITES.find(s => s.id === id);
  assert.equal(byId('gd_chen').year, 1893);
  assert(byId('gd_chen').types.includes('gate'));
  assert(byId('gd_meian').yearApprox && byId('gd_meian').yearNote.includes('996'));
  assert.equal(byId('gd_meian').dyn, 'song');
  assert(byId('gd_meian').yearNote.includes('硬山'));
  assert(byId('gd_zumiao').yearApprox && byId('gd_zumiao').yearNote.includes('北宋'));
  assert.equal(byId('gd_ruishi').year, 1925);
  assert.equal(byId('gd_ruishi').dyn, 'modern');
  assert(byId('gd_ruishi').types.includes('residence'));
  assert.equal(byId('gx_chengyang').year, 1924);
  assert(byId('gx_chengyang').yearNote.includes('完整五亭全桥'));
  assert(byId('gx_dashi').yearApprox && byId('gx_gongcheng').yearApprox);
  const expected = {
    gd_chen: [3, '陈家祠堂', 'part'], gd_zumiao: [4, '佛山祖庙', 'part'],
    gd_meian: [4, '梅庵', 'part'], gd_ruishi: [5, '开平碉楼', 'part'],
    gx_zhenwu: [2, '经略台真武阁', 'unit'], gx_chengyang: [2, '程阳永济桥', 'unit'],
    gx_dashi: [3, '大士阁', 'unit'], gx_gongcheng: [6, '恭城古建筑群', 'part']
  };
  for (const [id, [batch, unitName, relation]] of Object.entries(expected)) {
    const item = protection.forSite(id)[0];
    assert.equal(item.batch, batch, id);
    assert.equal(item.unitName, unitName, id);
    assert.equal(item.relation, relation, id);
  }
  assert(protection.forSite('gd_ruishi')[0].scopeSources[0].url.includes('jiangmen.gov.cn'));
});

test('two Guang additions remain searchable and seed unvisited without changing existing journals', () => {
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
  assert.deepEqual(find({ region: 'south' }), [...batch.ids].sort());
  assert.deepEqual(find({ province: '广东', query: '第四批国保' }), ['gd_meian', 'gd_zumiao']);
  assert.deepEqual(find({ province: '广西', type: 'bridge' }), ['gx_chengyang']);
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(after.export());
  assert.equal(restored.record('foguang').note, '旧记录保留');
  assert.equal(restored.record('gd_chen').status, 'unvisited');
});

test('two Guang expansion preserves all previous originals, transparent deliveries and review states', () => {
  const current = json('assets/color-research/avif-manifest.json').images;
  assert.equal(Object.keys(batch.previousDeliveries).length, batch.beforeCount);
  for (const id of batch.previousIds) assert(SITES.some(s => s.id === id), id);
  for (const [id, old] of Object.entries(batch.previousDeliveries)) {
    for (const key of ['source', 'input', 'src']) assert.equal(hash(old[key]), old[{ source: 'sourceSha256', input: 'inputSha256', src: 'sha256' }[key]], id);
    assert.equal(current[id].visualReview, old.visualReview, id);
  }
});
