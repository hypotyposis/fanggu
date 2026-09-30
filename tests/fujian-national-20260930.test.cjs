const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const { classify } = require('../catalog.js');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file));
const json = file => JSON.parse(read(file));
const hash = file => createHash('sha256').update(read(file)).digest('hex');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js').toString() + '\n({ SITES, PLACES })');
const queue = json('assets/color-research/queue.json');
const titles = json('assets/research/national-protection.json');
const delivered = json('assets/color-research/avif-manifest.json');
const expected = [
  ['fj_luoyang', 3, '洛阳桥'], ['fj_tianhou', 3, '泉州天后宫'],
  ['fj_zhangzhou_paifang', 4, '漳州石牌坊'], ['fj_jiangdong', 5, '江东桥'],
  ['fj_dongshan_guandi', 4, '东山关帝庙'], ['fj_eryi', 4, '二宜楼'],
  ['fj_hegui', 5, '福建土楼'], ['fj_hulishan', 4, '胡里山炮台'],
  ['fj_laojun', 3, '老君岩造像'], ['fj_fuzhou_wenmiao', 6, '福州文庙'],
];

test('ten distinct Fujian national units have scoped titles, saved references and pending artwork', () => {
  assert.equal(expected.length, 10);
  assert.equal(new Set(expected.map(([id]) => id)).size, 10);
  const catalog = classify(SITES, PLACES);
  assert.equal(catalog.filter(site => site.province === '福建').length, 22);
  assert.equal(queue.count, queue.entries.length);
  for (const [id, batch, unitName] of expected) {
    const site = catalog.find(item => item.id === id);
    assert(site, id);
    assert.equal(site.province, '福建', id);
    assert.equal(site.initialStatus, 'unvisited', id);
    const title = titles.entries[id]?.[0];
    assert.equal(title?.batch, batch, id);
    assert.equal(title.unitName, unitName, id);
    assert(title.scope && title.locator && title.scopeSources?.length, id);
    assert.equal(queue.entries.filter(item => item.id === id).length, 1, id);
    const line = json(`assets/research/${id}.json`);
    const color = json(`assets/color-research/${id}.json`);
    assert.equal(line.visual_review_status, 'pending_user', id);
    assert.equal(color.visual_review.status, 'pending_user', id);
    assert.equal(color.user_review, undefined, id);
    assert(line.prompt && color.prompt && line.source_page.startsWith('https://commons.wikimedia.org/wiki/File:'), id);
    assert(color.references.photo_sources[0].author && color.references.photo_sources[0].license, id);
    for (const record of [line, color]) {
      assert.equal(record.background_preparation.method, 'white-matte-v1', id);
      assert.equal(record.background_preparation.sourceSha256, hash(record.generated_file || record.output), id);
    }
    const image = delivered.images[id];
    assert.equal(image.visualReview, 'pending_user', id);
    assert.equal(image.sourceSha256, hash(color.output), id);
    for (const file of [line.generated_file, color.output, image.src, ...line.reference_files]) {
      assert(fs.existsSync(path.join(root, file)), file);
    }
  }
  assert.equal(titles.entries.fj_eryi[0].batch, 4);
  assert.equal(titles.entries.fj_hegui[0].parent.batch, 4);
  assert.equal(titles.entries.fj_laojun[0].batch, 3);
});
