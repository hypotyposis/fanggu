const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const catalog = require('../catalog.js');

const root = path.resolve(__dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const json = rel => JSON.parse(read(rel));
const sha = rel => createHash('sha256').update(fs.readFileSync(path.join(root, rel))).digest('hex');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES})');
const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
const queue = json('assets/color-research/queue.json');
const manifest = json('assets/color-research/avif-manifest.json');
const ios = json('ios/Fanggu/Resources/catalog.json');
const expected = {
  jp_hokanji_tower: ['jp_muromachi', 1440],
  jp_gosho_shishinden: ['jp_edo', 1855],
  jp_daitokuji_karamon: ['jp_momoyama', 1590],
  jp_daitokuji_hojo: ['jp_edo', 1636],
  jp_jishoji_togudo: ['jp_muromachi', 1486],
  jp_toji_kondo: ['jp_momoyama', 1603],
  jp_daigoji_sanboin: ['jp_momoyama', 1598],
  jp_hongwanji_goeido: ['jp_edo', 1636],
  jp_chionin_mieido: ['jp_edo', 1639],
};

test('nine Kyoto building subjects have distinct IDs, extant dates and cross-platform records', () => {
  const classified = catalog.classify(SITES, PLACES);
  for (const [id, [dyn, year]] of Object.entries(expected)) {
    const site = classified.find(x => x.id === id);
    assert(site, id);
    assert.equal(SITES.filter(x => x.id === id).length, 1, id);
    assert.equal(site.country, 'JP', id);
    assert.equal(site.province, '京都府', id);
    assert.equal(site.region, 'jp_kinki', id);
    assert.equal(site.dyn, dyn, id);
    assert.equal(site.year, year, id);
    assert.equal(site.initialStatus, 'unvisited', id);
    assert.equal(queue.entries.filter(x => x.id === id).length, 1, id);
    assert.equal(ios.find(x => x.id === id)?.year, year, id);
    assert.equal(ios.find(x => x.id === id)?.sub, site.sub, id);
  }
  assert(SITES.find(x => x.id === 'jp_daitokuji_karamon').yearNote.includes('传说'));
  assert(SITES.find(x => x.id === 'jp_jishoji_togudo').facts.some(x => x.includes('银阁')));
  assert(SITES.find(x => x.id === 'jp_chionin_mieido').facts.some(x => x.includes('三门')));
  assert.equal(queue.count, queue.entries.length);
  assert.equal(SITES.length, queue.entries.length + queue.excluded.length);
});

test('nine new plates bind local sources, hashes, pending review and iOS artwork', () => {
  for (const id of Object.keys(expected)) {
    const site = SITES.find(x => x.id === id);
    const line = json(`assets/research/${id}.json`);
    const color = json(`assets/color-research/${id}.json`);
    for (const record of [line, color]) {
      assert.equal(record.status, 'complete', id);
      assert.equal(record.background_preparation.sourceSha256, sha(record.generated_file || record.output), id);
      assert(record.prompt.includes('#FFFFFF'), id);
      assert(record.historical_sources.length > 0, id);
      assert(record.historical_sources.every(x => x.url.startsWith('https://')), id);
      for (const input of record.input_images) assert(fs.existsSync(path.join(root, input)), input);
    }
    assert(line.source_page.startsWith('https://'), id);
    assert(line.author && line.license, id);
    assert.equal(line.visual_review_status, 'approved_default', id);
    assert.equal(color.visual_review.status, 'approved_default', id);
    const delivery = manifest.images[id];
    assert(delivery, id);
    assert.equal(delivery.sourceSha256, sha(color.output), id);
    assert.equal(delivery.visualReview, 'approved_default', id);
    assert(fs.existsSync(path.join(root, delivery.src)), id);
    assert(fs.existsSync(path.join(root, site.image.src)), id);
    assert.equal(COLORED_PLATES[id].visualReview, 'approved_default', id);
    assert(fs.existsSync(path.join(root, COLORED_PLATES[id].src)), id);
    assert(fs.existsSync(path.join(root, `ios/Fanggu/Resources/Artwork/${id}.avif`)), id);
  }
});
