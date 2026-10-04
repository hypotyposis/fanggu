const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
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
  jp_nanzenji_sanmon: ['京都府', 'jp_edo', 1628],
  jp_ujigami_honden: ['京都府', 'jp_heian', 1100],
  jp_ujigami_haiden: ['京都府', 'jp_kamakura', 1210],
  jp_kozanji_sekisuiin: ['京都府', 'jp_kamakura', 1230],
  jp_kamigamo_honden: ['京都府', 'jp_edo', 1863],
  jp_shimogamo_honden: ['京都府', 'jp_edo', 1863],
  jp_enryakuji_komponchudo: ['滋贺县', 'jp_edo', 1640],
  jp_katsura_koshoin: ['京都府', 'jp_edo', 1615],
  jp_joruriji_hondo: ['京都府', 'jp_heian', 1150],
  jp_joruriji_tower: ['京都府', 'jp_heian', 1150],
  jp_ryoanji_garden: ['京都府', 'jp_muromachi', 1500],
  jp_tenryuji_garden: ['京都府', 'jp_muromachi', 1340],
  jp_saihoji_garden: ['京都府', 'jp_muromachi', 1340],
};

test('Kyoto additions preserve distinct subjects, geography, approximate chronology and both catalogs', () => {
  const classified = catalog.classify(SITES, PLACES);
  for (const [id, [province, dynasty, year]] of Object.entries(expected)) {
    const site = classified.find(x => x.id === id);
    assert(site, id);
    assert.equal(SITES.filter(x => x.id === id).length, 1, id);
    assert.equal(site.country, 'JP', id);
    assert.equal(site.region, 'jp_kinki', id);
    assert.equal(site.province, province, id);
    assert.equal(site.dyn, dynasty, id);
    assert.equal(site.year, year, id);
    assert.equal(site.initialStatus, 'unvisited', id);
    assert.equal(queue.entries.filter(x => x.id === id).length, 1, id);
    assert.equal(ios.find(x => x.id === id)?.year, year, id);
    assert.equal(ios.find(x => x.id === id)?.sub, site.sub, id);
  }
  for (const id of ['jp_ryoanji_garden', 'jp_tenryuji_garden', 'jp_saihoji_garden']) {
    assert(SITES.find(x => x.id === id).types.includes('garden'), id);
    assert(SITES.find(x => x.id === id).yearApprox, id);
  }
  assert(SITES.find(x => x.id === 'jp_joruriji_tower').yearNote.includes('1178年是现址移筑'));
  assert(SITES.find(x => x.id === 'jp_kozanji_sekisuiin').sub.includes('内景'));
  assert(SITES.find(x => x.id === 'jp_shimogamo_honden').sub.includes('前部'));
  assert.equal(queue.count, queue.entries.length);
  assert.equal(SITES.length, queue.entries.length + queue.excluded.length);
});

test('all thirteen have source-bound local plates, explicit pending review and iOS art', requiresLocalAssets, () => {
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
    assert(line.sources[0].source_page.startsWith('https://commons.wikimedia.org/wiki/File:'), id);
    assert(line.sources.every(x => x.author && x.license), id);
    assert.equal(line.visual_review_status, 'pending_user', id);
    assert.equal(color.visual_review.status, 'pending_user', id);
    const delivery = manifest.images[id];
    assert(delivery, id);
    assert.equal(delivery.sourceSha256, sha(color.output), id);
    assert.equal(delivery.visualReview, 'pending_user', id);
    assert(fs.existsSync(path.join(root, delivery.src)), id);
    assert(fs.existsSync(path.join(root, site.image.src)), id);
    assert.equal(COLORED_PLATES[id].visualReview, 'pending_user', id);
    assert(fs.existsSync(path.join(root, COLORED_PLATES[id].src)), id);
    assert(fs.existsSync(path.join(root, `ios/Fanggu/Resources/Artwork/${id}.avif`)), id);
  }
});
