const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const facets = require('../catalog.js');
const { create } = require('../library.js');
const { SITES, PLACES } = vm.runInNewContext(fs.readFileSync(require.resolve('../sites.js'), 'utf8') + '\n({SITES, PLACES})');
const catalog = facets.classify(SITES, PLACES);
const library = create(catalog, { getItem: () => null, setItem() {} });
const find = filters => Array.from(library.all().filter(site => facets.matches(site, filters)), site => site.id).sort();

test('every site has a province, region and explicit architectural types', () => {
  assert.equal(catalog.length, SITES.length);
  assert.equal(new Set(catalog.map(site => site.province)).size, 18);
  for (const site of catalog) {
    assert(facets.regions[site.region].provinces.includes(site.province));
    assert.equal(new Set(site.types).size, site.types.length);
    assert(site.types.every(type => facets.types[type]));
  }
  assert.throws(() => facets.classify([{ id: 'missing', placeKey: 'xian' }], PLACES), /缺少/);
});

test('status, dynasty, region, province and type combine by intersection', () => {
  assert.deepEqual(find({ status: 'wishlist', dynasty: 'beiqi', region: 'north', province: '河北', type: 'grotto' }), ['xiangtang']);
  assert.deepEqual(find({ status: 'visited', dynasty: 'tang', province: '山西', type: 'hall' }), ['foguang', 'nanchan']);
  assert.deepEqual(find({ region: 'east', province: '河北' }), []);
  assert.deepEqual(find({ province: '福建', type: 'que' }), []);
});

test('compound monuments appear under each type without duplicate cards', () => {
  assert(find({ type: 'pagoda' }).includes('kaiyuan'));
  assert(find({ type: 'pavilion' }).includes('kaiyuan'));
  assert(find({ type: 'hall' }).includes('yuanqi'));
  assert(find({ type: 'pagoda' }).includes('yuanqi'));
  assert(find({ type: 'stage' }).includes('xianshen'));
  assert(find({ type: 'pavilion' }).includes('xianshen'));
  for (const id of ['baosheng', 'guanyintang', 'xiaoxitian', 'zijinan', 'sx_zezhou_yuhuang', 'hb_cangzhoulion']) assert(find({ type: 'sculpture' }).includes(id));
  assert.equal(find({}).length, new Set(find({})).size);
});

test('province options follow region and only show catalogued provinces', () => {
  assert.deepEqual(facets.provinces(catalog, 'north'), ['北京', '天津', '河北', '山西', '内蒙古']);
  assert.deepEqual(facets.provinces(catalog, 'south'), []);
  assert(facets.provinces(catalog, 'east').includes('福建'));
  assert(!facets.provinces(catalog, 'east').includes('山西'));
  assert.equal(facets.provinces(catalog).length, 18);
});

test('aliases and geographic or type names remain searchable with facets', () => {
  assert.deepEqual(find({ province: '河南', type: 'que', query: '后母阙' }), ['qimuque']);
  assert(find({ query: '华北', type: 'grotto' }).includes('xiangtang'));
  assert.deepEqual(find({ province: '福建', query: '昭灵宫' }), ['zhaoling']);
  for (const id of ['baosheng', 'guanyintang', 'xiaoxitian', 'zijinan']) assert(find({ query: '  彩塑悬塑  ' }).includes(id));
  assert(find({ status: 'unvisited', type: 'grotto' }).includes('xiangtang'));
});

test('Japanese country, prefecture and era facets stay separate from Chinese regions and dynasties', () => {
  const ids = ['byodoin', 'horyuji', 'kiyomizu', 'todaiji', 'toji', 'toshodaiji'];
  assert.deepEqual(find({ country: 'JP' }), ids);
  assert.deepEqual(find({ query: '日本' }), ids);
  assert.deepEqual(find({ country: 'JP', dynasty: 'jp_edo' }), ['kiyomizu', 'toji']);
  assert.deepEqual(find({ country: 'JP', province: '奈良县', type: 'hall' }), ['horyuji', 'toshodaiji']);
  assert.deepEqual(find({ country: 'JP', type: 'gate' }), ['todaiji']);
  assert.deepEqual(find({ country: 'CN', dynasty: 'jp_edo' }), []);
  assert.deepEqual(find({ country: 'JP', region: 'north' }), []);
  assert.deepEqual(facets.provinces(catalog, 'all', 'JP'), ['京都府', '奈良县']);
  assert.equal(facets.provinces(catalog, 'all', 'CN').length, 16);
});

test('Japanese additions seed wishes with blank dates and survive backup restoration', () => {
  const data = new Map(), storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
  const source = create(catalog, storage);
  const japanese = source.all().filter(site => site.country === 'JP');
  assert.equal(japanese.length, 6);
  for (const site of japanese) { assert.equal(site.record.status, 'wishlist'); assert.equal(site.record.visitedOn, ''); }
  source.setRecord('todaiji', { status: 'visited', visitedOn: '', note: '记住南大门的梁架' });
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(source.export());
  assert.equal(restored.record('todaiji').note, '记住南大门的梁架');
  assert.equal(restored.record('todaiji').visitedOn, '');
  assert.equal(restored.record('toji').status, 'wishlist');
  assert.equal(restored.record('xiangtang').status, 'wishlist');
  assert.equal(restored.record('xianwall').status, 'visited');
});


test('Jiangsu and Zhejiang additions cover bridges, stone pillars and early regional periods', () => {
  assert.equal(find({ province: '浙江' }).length, 17);
  assert.equal(find({ province: '江苏' }).length, 14);
  assert.deepEqual(find({ type: 'bridge', province: '浙江', status: 'wishlist' }), ['baziqiao', 'rulong']);
  assert.deepEqual(find({ type: 'pillar', province: '浙江' }), ['lingyin', 'longxingchuang']);
  assert(find({ type: 'pagoda' }).includes('lingyin'));
  assert.deepEqual(find({ dynasty: 'nan' }), ['xinchangdafo']);
});

test('new wishes seed alongside saved visits and removed wishes without overwriting them', () => {
  const storage = new Map();
  const adapter = { getItem: key => storage.get(key) ?? null, setItem: (key, value) => storage.set(key, value) };
  const oldCatalog = catalog.filter(site => !['rulong', 'longxingchuang'].includes(site.id));
  const old = create(oldCatalog, adapter);
  old.setRecord('xianwall', { status: 'visited', visitedOn: '2025-05-01', note: '保留原有行记' });
  old.setStatus('toji', 'unvisited');
  const updated = create(catalog, adapter);
  assert.equal(updated.record('xianwall').note, '保留原有行记');
  assert.equal(updated.record('toji').status, 'unvisited');
  assert.equal(updated.record('rulong').status, 'wishlist');
  updated.setRecord('rulong', { status: 'visited', visitedOn: '', note: '看过木拱与桥廊' });
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(updated.export());
  assert.equal(restored.record('rulong').status, 'visited');
  assert.equal(restored.record('rulong').note, '看过木拱与桥廊');
  assert.equal(restored.record('longxingchuang').status, 'wishlist');
});

test('82 northern additions remain unvisited while existing personal records survive expansion and backup', () => {
  const batch = JSON.parse(fs.readFileSync(require.resolve('../assets/research/north200-batch.json'), 'utf8'));
  assert.equal(batch.ids.length, 82);
  for (const [province, added, total] of [['河南', 27, 34], ['河北', 25, 35], ['山西', 30, 70]]) {
    assert.equal(batch.groups[province].length, added);
    assert.equal(find({ province }).length, total);
  }
  assert(find({ type: 'tomb' }).includes('sx_macun'));
  assert(find({ type: 'residence' }).includes('sx_dingcun'));
  assert(find({ type: 'mural' }).includes('sx_jishan_qinglong'));
  assert.deepEqual(find({ type: 'observatory' }), ['hn_guanxing']);
  const memory = new Map(), storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const before = create(catalog.filter(site => !batch.ids.includes(site.id)), storage);
  before.setRecord('xianwall', { status: 'visited', visitedOn: '2025-05-01', note: '城墙行记' });
  before.setStatus('toji', 'unvisited');
  const after = create(catalog, storage);
  for (const id of batch.ids) assert.equal(after.record(id).status, 'unvisited');
  assert.equal(after.record('xianwall').note, '城墙行记');
  assert.equal(after.record('toji').status, 'unvisited');
  assert.equal(after.record('xiangtang').status, 'wishlist');
  after.setStatus('hb_anjibridge', 'wishlist');
  after.setRecord('sx_yungang', { status: 'visited', visitedOn: '', note: '第20窟大佛' });
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(after.export());
  assert.equal(restored.record('hb_anjibridge').status, 'wishlist');
  assert.equal(restored.record('sx_yungang').note, '第20窟大佛');
  assert.equal(restored.record('sx_yungang').visitedOn, '');
  assert.equal(restored.record('sx_chongfu').status, 'unvisited');
});
