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
const protection = JSON.parse(read('assets/research/national-protection.json'));
const expected = [
  ['sc_leshan', '四川', 2, '乐山大佛', '头部至胸腹'],
  ['sc_baoen', '四川', 4, '平武报恩寺', '大雄宝殿'],
  ['sc_wuliang', '四川', 6, '无量宝塔', '十三层'],
  ['sc_zhanghuan', '四川', 4, '张桓侯祠', '敌万楼'],
  ['sc_luodai', '四川', 6, '洛带会馆', '禹王宫'],
  ['sc_shenque', '四川', 1, '沈府君阙', '一座'],
  ['cq_shibao', '重庆', 5, '石宝寨', '十二层'],
  ['cq_huguang', '重庆', 6, '湖广会馆', '戏楼'],
  ['cq_diaoyu', '重庆', 4, '钓鱼城遗址', '护国门'],
  ['cq_tongnan', '重庆', 6, '潼南大佛寺摩崖造像', '饰金坐像'],
];
test('Sichuan/Chongqing additions register the actual protected subjects and complete user-approved deliveries', requiresLocalAssets, () => {
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  assert.equal(queue.count, queue.entries.length);
  for (const [id, province, batch, unit, subject] of expected) {
    assert.equal(SITES.filter(site => site.id === id).length, 1);
    const site = SITES.find(site => site.id === id);
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, province);
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    const registration = protection.entries[id][0];
    assert.equal(registration.batch, batch);
    assert.equal(registration.unitName, unit);
    assert(registration.scope.includes(subject));
    assert.equal(protection.sources[registration.source].batch, batch);
    assert(registration.scopeSources.length > 0);
    assert.equal(COLORED_PLATES[id].visualReview, 'approved_user');
    for (const folder of ['research', 'color-research']) {
      const meta = JSON.parse(read(`assets/${folder}/${id}.json`));
      const original = meta.generated_file || meta.output;
      assert.equal(meta.status, folder === 'color-research' ? 'complete' : 'needs_review');
      assert.equal(meta.background_preparation.sourceSha256, createHash('sha256').update(fs.readFileSync(path.join(root, original))).digest('hex'));
      assert(meta.historical_sources.length > 0);
      assert(meta.input_images.every(file => fs.existsSync(path.join(root, file))));
      assert.equal(meta.generation_history.length, 1);
      assert.equal(meta.generation_history[0].prompt, meta.prompt);
      assert.equal(meta.user_review.status, 'approved_user');
      assert.equal(meta.user_review.sourceSha256, meta.background_preparation.sourceSha256);
      if (folder === 'color-research') {
        assert.equal(meta.user_review.inputSha256, createHash('sha256').update(fs.readFileSync(path.join(root, `assets/colored-transparent/${id}.png`))).digest('hex'));
        assert.equal(meta.user_review.avifSha256, createHash('sha256').update(fs.readFileSync(path.join(root, `assets/colored-transparent-avif/${id}.avif`))).digest('hex'));
      }
    }
  }
});
test('Drawn subjects distinguish original creation, later reconstruction and uncertain years', () => {
  const site = id => SITES.find(item => item.id === id);
  assert.equal(site('sc_luodai').dyn, 'modern');
  assert.equal(site('sc_luodai').year, 1913);
  assert(site('sc_luodai').yearNote.includes('重建'));
  assert.equal(site('cq_tongnan').year, 1151);
  assert(site('cq_tongnan').yearNote.includes('金箔'));
  assert.equal(site('cq_diaoyu').year, 1243);
  assert(site('cq_diaoyu').yearNote.includes('后修'));
  assert.equal(site('sc_wuliang').yearApprox, true);
  assert.equal(site('cq_shibao').yearApprox, true);
  assert.equal(protection.entries.sc_shenque[0].batch, 1);
});
