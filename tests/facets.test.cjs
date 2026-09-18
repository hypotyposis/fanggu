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

test('Anhui additions support region, province, type and alias filters without seeding visits', () => {
  const ids = ['ah_huaxilou', 'ah_xuguo', 'ah_zhenfeng'];
  assert.deepEqual(find({ country: 'CN', region: 'east', province: '安徽' }), ids);
  assert(facets.provinces(catalog, 'east', 'CN').includes('安徽'));
  assert.deepEqual(find({ province: '安徽', type: 'gate', query: '八脚牌楼' }), ['ah_xuguo']);
  assert.deepEqual(find({ province: '安徽', type: 'pagoda' }), ['ah_zhenfeng']);
  assert.deepEqual(find({ province: '安徽', type: 'stage' }), ['ah_huaxilou']);
  assert.deepEqual(find({ province: '安徽', status: 'visited' }), []);
  for (const id of ids) assert.equal(library.record(id).status, 'unvisited');
  const memory = new Map(), storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const before = create(catalog.filter(site => !ids.includes(site.id)), storage);
  before.setRecord('xianwall', { status: 'visited', visitedOn: '2025-05-01', note: '原有行记' });
  const after = create(catalog, storage);
  assert.equal(after.record('xianwall').note, '原有行记');
  after.setStatus('ah_xuguo', 'wishlist');
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(after.export());
  assert.equal(restored.record('ah_xuguo').status, 'wishlist');
  assert.equal(restored.record('ah_huaxilou').status, 'unvisited');
  assert.equal(restored.record('xianwall').note, '原有行记');
});

test('Shanghai filtering and expansion preserve prior records and blank arrival dates', () => {
  const batch = JSON.parse(fs.readFileSync(require.resolve('../assets/research/shanghai-batch.json'), 'utf8'));
  assert.deepEqual(find({ country: 'CN', region: 'east', province: '上海' }), [...batch.ids].sort());
  assert.deepEqual(find({ province: '上海', type: 'pagoda' }), ['sh_fangta', 'sh_longhuata']);
  assert.deepEqual(find({ province: '上海', query: '兴圣教寺' }), ['sh_fangta']);
  assert.deepEqual(find({ province: '上海', dynasty: 'yuan', type: 'hall' }), ['sh_zhenru']);
  const memory = new Map(), storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const before = create(catalog.filter(site => !batch.ids.includes(site.id)), storage);
  before.setRecord('xianwall', { status: 'visited', visitedOn: '2025-05-01', note: '保留城墙行记' });
  before.setStatus('toji', 'unvisited');
  const after = create(catalog, storage);
  for (const id of batch.ids) {
    assert.equal(after.record(id).status, 'unvisited');
    assert.equal(after.record(id).visitedOn, '');
  }
  assert.deepEqual(after.record('xianwall'), before.record('xianwall'));
  assert.equal(after.record('toji').status, 'unvisited');
  after.setRecord('sh_longhuata', { status: 'visited', visitedOn: '', note: '塔身与木檐' });
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(after.export());
  assert.equal(restored.record('sh_longhuata').note, '塔身与木檐');
  assert.equal(restored.record('sh_longhuata').visitedOn, '');
  assert.equal(restored.record('sh_fangta').status, 'unvisited');
  assert.deepEqual(restored.record('xianwall'), before.record('xianwall'));
});

test('every site has a province, region and explicit architectural types', () => {
  assert.equal(catalog.length, SITES.length);
  assert.equal(new Set(catalog.map(site => site.province)).size, 19);
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
  assert.equal(facets.provinces(catalog).length, 19);
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
  assert.equal(facets.provinces(catalog, 'all', 'CN').length, 17);
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
  for (const [province, added, total] of [['河南', 27, 34], ['河北', 25, 35], ['山西', 30, 72]]) {
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

test('Shanxi screens are distinct from fortifications and additions preserve saved records', () => {
  assert.deepEqual(find({ province: '山西', type: 'screen' }), ['sx_jiulongbi']);
  assert(!find({ type: 'wall' }).includes('sx_jiulongbi'));
  assert.deepEqual(find({ province: '山西', type: 'screen', query: '影壁' }), ['sx_jiulongbi']);
  assert.deepEqual(find({ province: '山西', query: '烈石神祠' }), ['sx_doudafu']);
  assert.deepEqual(find({ province: '山西', query: '代王府九龙壁' }), ['sx_jiulongbi']);
  const memory = new Map(), storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const before = create(catalog.filter(site => !['sx_doudafu', 'sx_jiulongbi'].includes(site.id)), storage);
  before.setRecord('foguang', { status: 'visited', visitedOn: '', note: '既有行记' });
  before.setStatus('sx_chongfu', 'wishlist');
  const after = create(catalog, storage);
  for (const id of ['sx_doudafu', 'sx_jiulongbi']) {
    assert.equal(after.record(id).status, 'unvisited'); assert.equal(after.record(id).visitedOn, '');
  }
  assert.equal(after.record('foguang').note, '既有行记');
  assert.equal(after.record('sx_chongfu').status, 'wishlist');
  after.setRecord('sx_doudafu', { status: 'visited', visitedOn: '', note: '献亭粗柱' });
  after.setStatus('sx_jiulongbi', 'wishlist');
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(after.export());
  assert.equal(restored.record('sx_doudafu').note, '献亭粗柱');
  assert.equal(restored.record('sx_jiulongbi').status, 'wishlist');
});
