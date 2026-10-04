const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file));
const json = file => JSON.parse(read(file));
const hash = file => createHash('sha256').update(read(file)).digest('hex');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js').toString() + '\n({ SITES, PLACES })');
const queue = json('assets/color-research/queue.json');
const protection = json('assets/research/national-protection.json');
const delivery = json('assets/color-research/avif-manifest.json');
const expected = [
  ['zj_tianyige', 1], ['zj_qinganhui', 5], ['zj_yongan', 8], ['zj_daan', 8],
  ['zj_dashan', 8], ['zj_chaoyin', 8], ['zj_yuyaotongji', 8], ['zj_guyue', 5],
  ['zj_library_old', 8], ['zj_shinantang', 8], ['js_mingxiao', 1],
  ['js_zhongshan', 1], ['js_nanjingwall', 3], ['js_chaotiangong', 7],
  ['js_liuyuan', 1], ['js_baodai', 5], ['js_zhaoguan', 6],
  ['js_geyuan', 3], ['js_heyuan', 3], ['js_nanchao_stone', 3],
];

test('Jiangsu and Zhejiang twenty have scoped national titles and complete source-bound artwork', requiresLocalAssets, () => {
  assert.equal(expected.length, 20);
  assert.equal(expected.filter(([id]) => id.startsWith('zj_')).length, 10);
  assert.equal(expected.filter(([id]) => id.startsWith('js_')).length, 10);
  assert.equal(queue.count, queue.entries.length);
  for (const [id, batch] of expected) {
    const site = SITES.find(item => item.id === id);
    assert(site, id);
    assert.equal(site.initialStatus, 'unvisited', id);
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, id.startsWith('zj_') ? '浙江' : '江苏');
    const title = protection.entries[id]?.[0];
    assert.equal(title?.batch, batch, id);
    assert(title.unitName && title.scope && title.locator, id);
    assert.equal(title.source, `batch${batch}`);
    assert.equal(queue.entries.filter(item => item.id === id).length, 1, id);
    const line = json(`assets/research/${id}.json`);
    const color = json(`assets/color-research/${id}.json`);
    assert.deepEqual(Array.from(site.caption), line.caption, id);
    assert.equal(line.visual_review_status, 'pending_user');
    assert.equal(color.user_review.status, 'approved_user');
    assert.equal(color.user_review.reviewer, 'user');
    assert(line.prompt && color.prompt, id);
    assert(line.source_page.startsWith('https://commons.wikimedia.org/wiki/File:'), id);
    assert(color.references.photo_sources[0].author && color.references.photo_sources[0].license, id);
    for (const record of [line, color]) {
      assert.equal(record.status, 'complete', id);
      assert.equal(record.background_preparation.method, 'white-matte-v1');
      assert.equal(record.background_preparation.sourceSha256, hash(record.generated_file || record.output));
    }
    const image = delivery.images[id];
    assert.equal(image.visualReview, 'approved_user');
    assert.equal(image.sourceSha256, hash(color.output));
    assert.equal(image.review.sourceSha256, image.sourceSha256);
    assert.equal(image.review.inputSha256, image.inputSha256);
    assert.equal(image.review.avifSha256, image.sha256);
    assert(image.alpha.transparentPixels > 0 && image.alpha.opaquePixels > 0, id);
    for (const file of [line.generated_file, color.output, image.src, ...line.reference_files, ...color.references.selected_photo_files]) {
      assert(fs.existsSync(path.join(root, file)), file);
    }
  }
});
