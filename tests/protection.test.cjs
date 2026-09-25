const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const data = JSON.parse(read('assets/research/national-protection.json'));
const protection = require('../protection.js');
const facets = require('../catalog.js');
const { create } = require('../library.js');
const { SITES, PLACES } = JSON.parse(JSON.stringify(vm.runInNewContext(read('sites.js') + '\n({ SITES, PLACES })')));
const catalog = facets.classify(SITES, PLACES);

test('national protection source and generated metadata agree, with traceable catalogue subjects', () => {
  assert.deepEqual(require('../protection-data.js'), data);
  execFileSync(process.execPath, [path.join(root, 'scripts/prepare-protection.mjs'), '--check']);
  for (const site of SITES) {
    // Newly added unverified IDs are valid: a title is not an intake gate.
    for (const entry of protection.forSite(site.id)) {
      assert.equal(data.sources[entry.source].batch, entry.batch);
      assert(entry.unitName && entry.scope && entry.locator);
      assert(['unit', 'part', 'merged'].includes(entry.relation));
      assert(!data.untagged[site.id]);
    }
  }
  for (const id of [...Object.keys(data.entries), ...Object.keys(data.untagged)]) assert(SITES.some(site => site.id === id));
});

test('batches use original announcement dates, not modern republication dates', () => {
  assert.equal(data.sources.batch2.announcedOn, '1982-02-23');
  assert.equal(data.sources.batch5.announcedOn, '2001-06-25');
  assert.equal(data.sources.batch7.announcedOn, '2013-03-05');
  assert.equal(data.sources.batch8.announcedOn, '2019-10-07');
  for (const source of Object.values(data.sources)) {
    assert(new URL(source.url).hostname.endsWith('.gov.cn'));
    assert.match(source.retrievedSha256, /^[a-f0-9]{64}$/);
  }
});

test('easy-to-confuse national batches and original unit names are retained', () => {
  const expected = { hongfu: 5, sx_macun: 5, sx_jiexiu_houtu: 5, qiufeng: 4, lingyin: 7, haiqing: 6, fotou: 6, tj_jizhou_baita: 7, hn_yuzhoutianning: 8, sx_jiexiu_chenghuang: 7, hn_guanlin: 6, hn_xiaonanhai: 5, hn_dapishan: 5, wangbao: 6, xinchangdafo: 7, qingzhou: 3, tiefo: 8 };
  for (const [id, batch] of Object.entries(expected)) assert.equal(protection.forSite(id)[0].batch, batch, id);
  assert.equal(protection.forSite('ln_dazheng')[0].unitName, '沈阳故宫');
  assert.equal(protection.forSite('xianzhonggu').length, 1);
  assert.equal(protection.forSite('xianzhonggu')[0].unitName, '西安钟楼、鼓楼');
  assert.equal(protection.forSite('hn_dapishan')[0].relation, 'part');
  assert.equal(protection.forSite('yongan')[0].unitName, '浑源永安寺');
});

test('merged components do not inherit a parent earlier batch and compound tags stay explicit', () => {
  assert.equal(protection.forSite('hn_fanta')[0].batch, 4);
  assert.equal(protection.forSite('hn_fanta')[0].parent.batch, 3);
  assert.equal(protection.forSite('sn_yanan')[0].batch, 4);
  assert.equal(protection.forSite('sn_yanan')[0].parent.batch, 1);
  assert.equal(protection.forSite('fj_chengqi')[0].batch, 5);
  assert.equal(protection.forSite('fj_chengqi')[0].parent.batch, 4);
  assert.equal(protection.forSite('linggu')[0].batch, 5);
  assert.deepEqual(protection.badges('kaiyuan').map(badge => badge.label), ['第三批国保 · 钟楼', '第六批国保 · 须弥塔（并入）']);
  assert.equal(protection.forSite('xian').length, 2);
  assert.deepEqual(protection.badges('xian').map(badge => badge.label), ['第一批国保']);
});

test('unverified, reconstructed, foreign and unknown subjects receive no inferred national title', () => {
  for (const id of ['fuzhoubaita', 'tj_wenmiao', 'baoen', 'guanque', 'zhaoling', 'horyuji', 'toji', 'future-site']) {
    assert.deepEqual(protection.forSite(id), []);
    assert.deepEqual(protection.badges(id), []);
    assert.equal(protection.searchText(id), '');
  }
  assert.equal(data.untagged.tj_wenmiao.status, 'unconfirmed');
  assert.equal(data.untagged.baoen.status, 'related_site');
  for (const site of catalog.filter(site => site.country === 'JP')) assert.equal(data.untagged[site.id].status, 'not_applicable');
  const future = facets.classify([{ id: 'future-site', placeKey: SITES[0].placeKey, types: ['hall'] }], PLACES)[0];
  assert.deepEqual(future.protection, []);
});

test('protection batch and official unit search compose with existing geographic and type filters', () => {
  const sites = create(catalog, { getItem: () => null, setItem() {} }).all();
  const find = filters => sites.filter(site => facets.matches(site, filters)).map(site => site.id);
  assert.deepEqual(find({ query: '国保', province: '天津' }).sort(), ['dule', 'tj_guangdonghuiguan', 'tj_jizhou_baita', 'tj_shijia'].sort());
  assert.deepEqual(find({ query: '第八批国保', type: 'hall' }).sort(), ['hn_yuzhoutianning', 'tiefo'].sort());
  assert.deepEqual(find({ query: '第八批国保', type: 'stage' }), []);
  assert.deepEqual(find({ query: '第8批国保' }).sort(), find({ query: '第八批国保' }).sort());
  assert(find({ query: '全国重点文物保护单位', province: '陕西' }).includes('sn_qianling'));
  assert.deepEqual(find({ query: '金刚座舍利宝塔' }), ['im_wuta']);
  assert(!find({ query: '第三批国保' }).includes('hn_fanta'));
  assert(!find({ query: '第一批国保' }).includes('sn_yanan'));
  assert(!find({ query: '第五批国保' }).includes('qingzhou'));
});

test('national metadata never mutates personal records or leaks into exported backups', () => {
  let saved = JSON.stringify({ version: 2, customSites: [], links: {}, records: { gugong: { status: 'visited', visitedOn: '', note: '旧笔记' } } });
  const original = saved;
  const library = create(catalog, { getItem: () => saved, setItem: (key, value) => { saved = value; } });
  assert.equal(library.record('gugong').note, '旧笔记');
  assert.equal(library.all().find(site => site.id === 'gugong').protection[0].batch, 1);
  protection.badges('gugong'); protection.searchText('gugong');
  assert.equal(saved, original);
  assert(!JSON.stringify(library.export()).includes('protection'));
});

test('browser globals and both page dependency orders agree with CommonJS', () => {
  const context = vm.createContext({});
  for (const file of ['protection-data.js', 'protection.js', 'catalog.js']) vm.runInContext(read(file), context);
  assert.equal(context.FangguProtection.batchLabel(8), protection.batchLabel(8));
  assert.equal(context.FangguCatalog.classify(SITES, PLACES).find(site => site.id === 'tiefo').protection[0].batch, 8);
  for (const page of ['index.html', 'detail.html']) {
    const html = read(page);
    assert(html.indexOf('src="protection-data.js') < html.indexOf('src="protection.js'));
    assert(html.indexOf('src="protection.js') < html.indexOf('src="catalog.js'));
  }
  assert.equal(protection.batchLabel(10), '第十批国保');
  assert.throws(() => protection.batchLabel(0));
});
