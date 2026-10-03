const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const catalog = require('../catalog.js');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const sha = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES})');
const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
const expected = {
  jp_ueno_toshogu_karamon: [1651, 'jp_edo', 'Ueno Toshogu'],
  jp_nezu_romon: [1706, 'jp_edo', 'Nezu'],
  jp_asakusa_jinja: [1649, 'jp_edo', 'Asakusa-jinja'],
  jp_zojoji_sangedatsumon: [1622, 'jp_edo', 'Sangedatsumon'],
  jp_kaneiji_kiyomizu: [1631, 'jp_edo', 'Kiyomizu Kannondo'],
  jp_gokokuji_hondo: [1697, 'jp_edo', 'Gokokuji'],
  jp_ikegami_pagoda: [1608, 'jp_edo', 'Honmonji Pagoda'],
  jp_shofukuji_jizodo: [1407, 'jp_muromachi', 'Shofukuji'],
};

test('Tokyo additions retain subject dates, Japanese geography and independent unvisited records', () => {
  const sites = catalog.classify(SITES, PLACES);
  const native = json('ios/Fanggu/Resources/catalog.json');
  for (const [id, [year, dynasty, alias]] of Object.entries(expected)) {
    assert.equal(sites.filter(site => site.id === id).length, 1, id);
    const site = sites.find(site => site.id === id);
    assert.equal(site.year, year, id);
    assert.equal(site.dyn, dynasty, id);
    assert.equal(site.country, 'JP', id);
    assert.equal(site.region, 'jp_kanto', id);
    assert.equal(site.province, '东京都', id);
    assert.equal(site.initialStatus, 'unvisited', id);
    assert.equal(site.protection.length, 0, id);
    assert(catalog.matches(site, { country: 'JP', province: '东京都', query: alias }), id);
    const exported = native.find(item => item.id === id);
    assert.equal(exported.year, year, id);
    assert.equal(exported.lineImage, `${id}.png`, id);
    assert.equal(exported.colorImage, `${id}.avif`, id);
    assert.equal(exported.initialStatus, 'unvisited', id);
  }
  assert.equal(sites.find(site => site.id === 'jp_sensoji').year, 1958);
  assert.notEqual(sites.find(site => site.id === 'jp_asakusa_jinja').id, 'jp_sensoji');
  assert.match(sites.find(site => site.id === 'jp_kaneiji_kiyomizu').yearNote, /1694/);
  assert.match(sites.find(site => site.id === 'jp_shofukuji_jizodo').facts.join(''), /单层带裳阶/);
});

test('Tokyo source records bind actual originals, deliveries and any explicit user reviews', () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(queue.count, queue.entries.length);
  assert.deepEqual(new Set([...queue.entries.map(item => item.id), ...queue.excluded]), new Set(SITES.map(site => site.id)));
  assert.deepEqual(new Set(Object.keys(COLORED_PLATES)), new Set(SITES.map(site => site.id)));
  for (const id of Object.keys(expected)) {
    const line = json(`assets/research/${id}.json`);
    const color = json(`assets/color-research/${id}.json`);
    assert.equal(queue.entries.filter(item => item.id === id).length, 1, id);
    assert(line.prompt && color.prompt && color.material_observations, id);
    assert(line.historical_sources.length > 0, id);
    assert(line.sources[0].author && line.sources[0].license, id);
    for (const file of [...line.input_images, ...color.input_images]) assert(fs.existsSync(path.join(root, file)), file);
    assert.equal(line.background_preparation.sourceSha256, sha(line.generated_file), id);
    assert.equal(color.background_preparation.sourceSha256, sha(color.output), id);
    assert.equal(manifest.images[id].sourceSha256, sha(color.output), id);
    assert.equal(manifest.images[id].sha256, sha(COLORED_PLATES[id].src), id);
    for (const [record, source] of [[line, line.generated_file], [color, color.output]]) {
      if (!record.user_review) continue;
      assert.equal(record.user_review.status, 'approved_user', id);
      assert.equal(record.user_review.reviewer, 'user', id);
      assert.equal(record.user_review.sourceSha256, sha(source), id);
    }
    assert.equal(manifest.images[id].visualReview, color.user_review ? 'approved_user' : 'pending_user', id);
    if (color.user_review) {
      assert.equal(color.user_review.inputSha256, sha(`assets/colored-transparent/${id}.png`), id);
      assert.equal(color.user_review.avifSha256, sha(COLORED_PLATES[id].src), id);
    }
  }
});
