const { assertUnvisited } = require('./helpers/native-catalog.cjs');
const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const { SITES, PLACES, COLORED_PLATES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n({SITES, PLACES, COLORED_PLATES})');
const expected = [
  ['sx_zishou', 5, '资寿寺', '天王殿'],
  ['sx_ruicheng_chenghuang', 5, '芮城城隍庙', '大殿山面'],
  ['sx_qiao', 5, '乔家大院', '在中堂'],
  ['sx_wang', 6, '王家大院', '红门堡'],
  ['sx_daixian_wenmiao', 6, '代县文庙', '大成殿'],
  ['sx_ciyun', 6, '慈云寺', '大雄宝殿'],
  ['sx_wuyue', 6, '介休五岳庙', '戏楼'],
  ['sx_pingyao_chenghuang', 6, '平遥城隍庙', '前殿'],
  ['sx_rishengchang', 6, '日昇昌旧址', '临街门面'],
  ['sx_pujiu', 8, '普救寺塔', '莺莺塔'],
];
test('Shanxi additions preserve protected names, drawn scope and unvisited defaults', requiresLocalAssets, () => {
  const batch = JSON.parse(read('assets/research/shanxi-national-20261002-batch.json'));
  const protection = JSON.parse(read('assets/research/national-protection.json'));
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  assert.deepEqual(batch.ids, expected.map(item => item[0]));
  assert.equal(queue.count, queue.entries.length);
  for (const [id, batchNo, unitName, scope] of expected) {
    assert.equal(SITES.filter(site => site.id === id).length, 1);
    const site = SITES.find(site => site.id === id);
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(site.yearApprox, true);
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, '山西');
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    assert.equal(protection.entries[id][0].unitName, unitName);
    assert.equal(protection.entries[id][0].batch, batchNo);
    assert(protection.entries[id][0].scope.includes(scope));
    assert.equal(protection.sources[protection.entries[id][0].source].batch, batchNo);
    assert.equal(COLORED_PLATES[id].visualReview, 'approved_user');
    for (const folder of ['research', 'color-research']) {
      const record = JSON.parse(read(`assets/${folder}/${id}.json`));
      const original = record.generated_file || record.output;
      assert.equal(record.status, 'complete');
      assert.equal(record.background_preparation.sourceSha256, createHash('sha256').update(fs.readFileSync(path.join(root, original))).digest('hex'));
      assert(record.historical_sources.length > 0);
      assert((record.input_images || record.reference_files).every(file => fs.existsSync(path.join(root, file))));
      assert.equal(record.generation_history.length, 1);
      assert.equal(record.generation_history[0].prompt, record.prompt);
      assert.equal(record.generation_history[0].status, 'pending_user');
      assert.equal(record.user_review.status, 'approved_user');
      assert.equal(record.user_review.sourceSha256, record.background_preparation.sourceSha256);
      assert.equal(record.user_review.statement, '图版验收没问题');
      if (folder === 'color-research') {
        assert.equal(record.user_review.inputSha256, createHash('sha256').update(fs.readFileSync(path.join(root, COLORED_PLATES[id].transparentSrc))).digest('hex'));
        assert.equal(record.user_review.avifSha256, createHash('sha256').update(fs.readFileSync(path.join(root, COLORED_PLATES[id].src))).digest('hex'));
      }
    }
  }
});
test('Shanxi subjects distinguish tower protection and approximate dating', () => {
  const site = id => SITES.find(item => item.id === id);
  assert.equal(site('sx_ruicheng_chenghuang').dyn, 'song');
  // The Ming pagoda must stay distinguished from the temple halls rebuilt in the 1980s, whatever the wording.
  const pujiuText = [site('sx_pujiu').lede, ...site('sx_pujiu').facts].join('');
  assert(/现代复建|1986/.test(pujiuText) && /嘉靖|明/.test(pujiuText));
  assert(site('sx_pujiu').yearNote.includes('差异'));
  assert(site('sx_rishengchang').yearNote.includes('单体建造年未确定'));
  assert(site('sx_wang').sub.includes('局部'));
  assert(site('sx_wuyue').sub.includes('戏楼'));
});
test('New Shanxi sites compose with facets and export native unvisited defaults', () => {
  const facets = require('../catalog.js');
  const catalogue = facets.classify(SITES, PLACES);
  const ids = expected.map(item => item[0]);
  assertUnvisited(ids);
  for (const id of ids) {
    const site = catalogue.find(item => item.id === id);
    assert.equal(site.region, 'north');
    assert(facets.matches(site, { province: '山西', query: '国保' }));
  }
  for (const [id, query] of [['sx_pujiu', '莺莺塔'], ['sx_rishengchang', '日升昌'], ['sx_daixian_wenmiao', '代州文庙']]) {
    assert(facets.matches(catalogue.find(item => item.id === id), { query }));
  }
});
