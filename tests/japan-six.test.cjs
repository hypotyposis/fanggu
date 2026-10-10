const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const catalog = require('../catalog.js');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sha256 = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const { SITES, PLACES, DYN } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES,DYN})');
const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
const queue = JSON.parse(read('assets/color-research/queue.json'));
const manifest = JSON.parse(read('assets/color-research/avif-manifest.json'));
const periods = JSON.parse(read('assets/research/japan-periods.json'));
const ids = ['jp_kinkaku', 'jp_ginkaku', 'jp_sensoji', 'jp_himeji', 'jp_itsukushima', 'jp_nikko_toshogu'];

test('six Japanese additions have unique IDs, subject dates and independent geography', () => {
  const classified = catalog.classify(SITES, PLACES);
  assert.equal(new Set(ids).size, 6);
  for (const id of ids) {
    const matches = classified.filter(site => site.id === id);
    assert.equal(matches.length, 1, id);
    const site = matches[0];
    assert.equal(site.country, 'JP', id);
    assert.equal(site.initialStatus, 'unvisited', id);
    assert(site.province && site.region && site.placeKey, id);
    assert.equal(DYN[site.dyn].country, 'JP', id);
    assert.deepEqual(Array.from(periods.periods[site.dyn]), [DYN[site.dyn].start, DYN[site.dyn].end]);
    assert(site.image.src.endsWith('/' + id + '.png'), id);
    assert.equal(site.protection.length, 0, id);
  }
  assert.equal(classified.find(site => site.id === 'jp_kinkaku').year, 1955);
  assert.equal(classified.find(site => site.id === 'jp_sensoji').year, 1958);
  assert.equal(classified.find(site => site.id === 'jp_ginkaku').dyn, 'jp_muromachi');
  assert.equal(classified.find(site => site.id === 'jp_itsukushima').yearApprox, true);
});

test('each new Japanese plate has a licensed photo, source-bound originals and pending review', () => {
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const id of ids) {
    const line = JSON.parse(read(`assets/research/${id}.json`));
    const color = JSON.parse(read(`assets/color-research/${id}.json`));
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1, id);
    assert.equal(line.status, 'complete', id);
    assert.equal(color.status, 'complete', id);
    assert.equal(line.visual_review_status, 'approved_default', id);
    assert.equal(color.visual_review.status, 'approved_default', id);
    assert(line.sources[0].source_page.startsWith('https://commons.wikimedia.org/wiki/File:'), id);
    assert(line.sources[0].author && line.sources[0].license, id);
    assert(fs.existsSync(path.join(root, line.sources[0].reference_file)), id);
    assert.equal(line.background_preparation.sourceSha256, sha256(line.generated_file), id);
    assert.equal(color.background_preparation.sourceSha256, sha256(color.output), id);
    assert.equal(manifest.images[id].sourceSha256, sha256(color.output), id);
    assert.equal(manifest.images[id].visualReview, 'approved_default', id);
    assert(manifest.images[id].alpha.transparentPixels > 0, id);
    assert(COLORED_PLATES[id].src.endsWith('/' + id + '.avif'), id);
  }
});
