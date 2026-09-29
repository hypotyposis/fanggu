const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const catalog = require('../catalog.js');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sha = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES})');
const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
const queue = JSON.parse(read('assets/color-research/queue.json'));
const manifest = JSON.parse(read('assets/color-research/avif-manifest.json'));
const ios = JSON.parse(read('ios/Fanggu/Resources/catalog.json'));
const expected = {
  jp_tofukuji_sanmon: ['京都府', 'jp_muromachi', 1425],
  jp_fushimi_inari_honden: ['京都府', 'jp_muromachi', 1499],
  jp_kitano_honden: ['京都府', 'jp_edo', 1607],
  jp_ninnaji_kondo: ['京都府', 'jp_momoyama', 1613],
  jp_hongwanji_hiunkaku: ['京都府', 'jp_momoyama', 1600],
  jp_manpukuji_daiou: ['京都府', 'jp_edo', 1668],
  jp_iwashimizu_honden: ['京都府', 'jp_edo', 1634],
  jp_ishiyamadera_tahoto: ['滋贺县', 'jp_kamakura', 1194],
  jp_ishiyamadera_hondo: ['滋贺县', 'jp_heian', 1096],
  jp_chionin_sanmon: ['京都府', 'jp_edo', 1621],
};

test('Kyoto and nearby batch keeps ten distinct mapped subjects with qualified construction dates', () => {
  assert.equal(Object.keys(expected).length, 10);
  const classified = catalog.classify(SITES, PLACES);
  for (const [id, [province, dynasty, year]] of Object.entries(expected)) {
    const site = classified.find(item => item.id === id);
    assert(site, id);
    assert.equal(SITES.filter(item => item.id === id).length, 1, id);
    assert.equal(site.country, 'JP', id);
    assert.equal(site.region, 'jp_kinki', id);
    assert.equal(site.province, province, id);
    assert.equal(site.dyn, dynasty, id);
    assert.equal(site.year, year, id);
    assert.equal(site.initialStatus, 'unvisited', id);
    assert.equal(queue.entries.filter(item => item.id === id).length, 1, id);
    assert.equal(ios.find(item => item.id === id)?.year, year, id);
    assert.equal(ios.find(item => item.id === id)?.sub, site.sub, id);
  }
  assert(SITES.find(item => item.id === 'jp_ninnaji_kondo').yearNote.includes('移建'));
  assert(SITES.find(item => item.id === 'jp_hongwanji_hiunkaku').yearApprox);
  assert(SITES.find(item => item.id === 'jp_hongwanji_hiunkaku').yearNote.includes('并非确切'));
  assert(SITES.find(item => item.id === 'jp_ishiyamadera_hondo').yearNote.includes('1602'));
  assert(SITES.find(item => item.id === 'jp_iwashimizu_honden').sub.includes('局部'));
});

test('all ten have source-bound originals and user-approved local transparent deliveries', () => {
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const id of Object.keys(expected)) {
    const line = JSON.parse(read(`assets/research/${id}.json`));
    const color = JSON.parse(read(`assets/color-research/${id}.json`));
    for (const record of [line, color]) {
      assert.equal(record.status, 'complete', id);
      assert.equal(record.background_preparation.method, 'white-matte-v1', id);
      assert.equal(record.background_preparation.sourceSha256, sha(record.generated_file || record.output), id);
      assert(record.prompt.includes('#FFFFFF'), id);
      assert(record.historical_sources.every(source => source.url.startsWith('https://')), id);
      for (const input of record.input_images) assert(fs.existsSync(path.join(root, input)), input);
    }
    assert(line.sources[0].source_page.startsWith('https://commons.wikimedia.org/wiki/File:'), id);
    assert(line.sources[0].author && line.sources[0].license, id);
    assert.equal(line.visual_review_status, 'approved_user', id);
    assert.equal(line.user_review.status, 'approved_user', id);
    assert.equal(line.user_review.statement, '验收没问题', id);
    assert.equal(line.user_review.sourceSha256, sha(line.generated_file), id);
    assert.equal(line.user_review.lineSha256, sha(`assets/plates/${id}.png`), id);
    assert.equal(color.visual_review.status, 'approved_user', id);
    assert.equal(color.user_review.status, 'approved_user', id);
    assert.equal(color.user_review.statement, '验收没问题', id);
    const delivery = manifest.images[id];
    assert.equal(delivery.sourceSha256, sha(color.output), id);
    assert.equal(delivery.visualReview, 'approved_user', id);
    assert.equal(delivery.review.sourceSha256, color.user_review.sourceSha256, id);
    assert.equal(delivery.review.inputSha256, sha(delivery.input), id);
    assert.equal(delivery.review.avifSha256, sha(delivery.src), id);
    assert(delivery.alpha.transparentPixels > 0 && delivery.alpha.opaquePixels > 0, id);
    assert.equal(COLORED_PLATES[id].visualReview, 'approved_user', id);
    assert(fs.existsSync(path.join(root, COLORED_PLATES[id].src)), id);
    assert(fs.existsSync(path.join(root, SITES.find(item => item.id === id).image.src)), id);
  }
});
