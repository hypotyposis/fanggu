const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const digest = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES})');
const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
const queue = JSON.parse(read('assets/color-research/queue.json'));
const delivery = JSON.parse(read('assets/color-research/avif-manifest.json'));
const ios = JSON.parse(read('ios/Fanggu/Resources/catalog.json'));

const batch = {
  jp_daigoji_tower: ['京都府', 'jp_heian', 951],
  jp_sanjusangendo: ['京都府', 'jp_kamakura', 1266],
  jp_nijo_ninomaru: ['京都府', 'jp_edo', 1626],
  jp_yasaka_honden: ['京都府', 'jp_edo', 1654],
  jp_yakushiji_east: ['奈良县', 'jp_nara', 730],
  jp_gangoji_gokuraku: ['奈良县', 'jp_kamakura', 1244],
  jp_kofukuji_hokuen: ['奈良县', 'jp_kamakura', 1210],
  jp_kasuga_honden: ['奈良县', 'jp_edo', 1863],
  jp_sumiyoshi_honden: ['大阪府', 'jp_edo', 1810],
  jp_osaka_sengan: ['大阪府', 'jp_edo', 1620],
  jp_jigenin_tahoto: ['大阪府', 'jp_kamakura', 1271],
  jp_kanshinji_kondo: ['大阪府', 'jp_muromachi', 1355],
};

test('Kansai batch keeps twelve distinct subjects, map regions and depicted dates', () => {
  assert.equal(Object.keys(batch).length, 12);
  for (const [id, [province, era, year]] of Object.entries(batch)) {
    const matches = SITES.filter(site => site.id === id);
    assert.equal(matches.length, 1, id);
    const site = matches[0];
    assert.equal(site.initialStatus, 'unvisited', id);
    assert.equal(site.country, 'JP', id);
    assert.equal(site.dyn, era, id);
    assert.equal(site.year, year, id);
    assert.equal(PLACES.find(place => place.key === site.placeKey)?.prov, province, id);
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1, id);
    assert.equal(COLORED_PLATES[id].visualReview, 'pending_user', id);
  }
  assert(SITES.find(site => site.id === 'jp_kasuga_honden').facts.some(fact => fact.includes('四座')));
  assert(SITES.find(site => site.id === 'jp_sumiyoshi_honden').facts.some(fact => fact.includes('第四')));
  assert(SITES.find(site => site.id === 'jp_osaka_sengan').facts.some(fact => fact.includes('1931')));
  assert.equal(queue.count, SITES.length - queue.excluded.length);
});

test('Kansai artwork retains licensed sources, exact originals and transparent deliveries', requiresLocalAssets, () => {
  for (const id of Object.keys(batch)) {
    const line = JSON.parse(read(`assets/research/${id}.json`));
    const color = JSON.parse(read(`assets/color-research/${id}.json`));
    for (const record of [line, color]) {
      assert.equal(record.status, 'complete', id);
      assert(record.historical_sources[0].url.startsWith('https://'), id);
      assert(record.prompt.includes('#FFFFFF'), id);
      assert.equal(record.background_preparation.method, 'white-matte-v1', id);
      assert.equal(record.background_preparation.sourceSha256, digest(record.generated_file || record.output), id);
      for (const input of record.input_images) assert(fs.existsSync(path.join(root, input)), input);
    }
    for (const source of line.sources) {
      assert(source.source_page.startsWith('https://commons.wikimedia.org/wiki/File:'), id);
      assert(source.author && source.license && source.license_url, id);
      assert(fs.existsSync(path.join(root, source.reference_file)), source.reference_file);
    }
    assert.equal(line.visual_review_status, 'pending_user', id);
    assert.equal(color.visual_review.status, 'pending_user', id);
    assert.equal(delivery.images[id].sourceSha256, digest(color.output), id);
    assert(delivery.images[id].alpha.transparentPixels > 0, id);
    assert(delivery.images[id].alpha.opaquePixels > 0, id);
    assert(COLORED_PLATES[id].src.endsWith('/' + id + '.avif'), id);
  }
  assert.equal(lineCount('jp_kasuga_honden'), 2);
});

function lineCount(id) {
  return JSON.parse(read(`assets/research/${id}.json`)).sources.length;
}

test('iOS export includes every Kansai monument with the same subject and year', () => {
  const items = ios.monuments || ios.sites || ios;
  assert(Array.isArray(items));
  for (const id of Object.keys(batch)) {
    const web = SITES.find(site => site.id === id);
    const mobile = items.find(site => site.id === id);
    assert(mobile, id);
    assert.equal(mobile.year, web.year, id);
    assert.equal(mobile.name, web.name, id);
  }
});
