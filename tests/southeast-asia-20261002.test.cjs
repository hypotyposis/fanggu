const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const sha = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const batch = json('assets/research/southeast-asia-20261002-batch.json');
const { SITES, PLACES, DYN, CHAPTERS, COLORED_PLATES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n({SITES,PLACES,DYN,CHAPTERS,COLORED_PLATES})');
const facets = require('../catalog.js');
const timeline = require('../timeline.js');
const { create } = require('../library.js');
const catalog = facets.classify(SITES, PLACES);

test('approved Southeast Asia selection has twelve source-bound local line/color pairs', () => {
  assert.deepEqual(batch.ids, batch.plannedIds);
  assert.equal(batch.ids.length, 12);
  assert.equal(new Set(batch.ids).size, 12);
  assert(batch.previousIds.every(id => SITES.some(site => site.id === id)));
  assert.equal(SITES.filter(site => batch.ids.includes(site.id)).length, 12);
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  for (const id of batch.ids) {
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    for (const kind of ['research', 'color-research']) {
      const record = json(`assets/${kind}/${id}.json`);
      assert.equal(record.quality_mode, 'prototype');
      assert.equal(record.visual_review_status, 'pending_user');
      assert(record.inputs_viewed && record.preview_check.original_viewed, id);
      assert.equal(record.background_preparation.sourceSha256, sha(record.generated_file || record.output));
      assert(record.factual_sources.length && record.factual_sources.every(source => /^https:\/\//.test(source.url)));
      assert(record.references.length);
      for (const ref of record.references) {
        assert.equal(ref.sha256, sha(ref.file));
        assert(ref.author && ref.license && ref.page && ref.url);
      }
      assert.equal(record.generation_history.length, 1);
      const call = record.generation_history[0];
      assert.equal(call.prompt, record.prompt);
      assert.deepEqual(call.input_images, record.reference_files || record.input_images);
      assert.equal(call.status, 'saved');
      assert(fs.existsSync(call.original_file));
      assert(Date.parse(call.saved_at) >= Date.parse(call.received_at));
      assert(Date.parse(call.received_at) >= Date.parse(call.submitted_at));
    }
    const image = manifest.images[id];
    assert.equal(image.sourceSha256, sha(image.source));
    assert.equal(image.inputSha256, sha(image.input));
    assert.equal(image.sha256, sha(image.src));
    assert.equal(image.visualReview, 'pending_user');
    assert.equal(COLORED_PLATES[id].visualReview, 'pending_user');
    assert(image.alpha.min === 0 && image.alpha.max > 0, `${id} needs transparent background and visible subject`);
  }
  for (const [id, before] of Object.entries(batch.previousDeliveries)) {
    const image = manifest.images[id];
    for (const key of ['sourceSha256', 'inputSha256', 'sha256']) assert.equal(image[key], before[key], `${id}: ${key}`);
    if (image.visualReview !== before.visualReview) {
      assert.equal(before.visualReview, 'pending_user');
      assert.equal(image.visualReview, 'approved_user');
      assert.equal(image.review.reviewer, 'user');
      assert.equal(image.review.avifSha256, image.sha256);
      assert.equal(image.review.inputSha256, image.inputSha256);
    }
  }
});

test('seven countries use their own eras, regions and a separate chronology lane', () => {
  const sites = catalog.filter(site => batch.ids.includes(site.id));
  assert.deepEqual(Object.fromEntries(['KH', 'ID', 'TH', 'MM', 'LA', 'VN', 'PH'].map(country => [country, sites.filter(site => site.country === country).length])), { KH: 3, ID: 2, TH: 2, MM: 1, LA: 1, VN: 2, PH: 1 });
  assert.equal(new Set(sites.map(site => site.dyn)).size, 9);
  for (const site of sites) {
    assert.equal(DYN[site.dyn].country, site.country);
    assert.equal(facets.regions[site.region].country, site.country);
    assert(CHAPTERS.some(chapter => chapter.key === site.dyn));
    assert.equal(site.protection.length, 0);
    assert.equal(timeline.lane(site, DYN), 'southeastAsia');
  }
  const groups = timeline.clusters(SITES, DYN).filter(group => group.lane === 'southeastAsia');
  assert.deepEqual(groups.flatMap(group => group.sites.map(site => site.id)).sort(), [...batch.ids].sort());
  for (const country of ['KH', 'ID', 'TH', 'MM', 'LA', 'VN', 'PH']) {
    const library = create(catalog, { getItem: () => null, setItem() {} });
    assert.deepEqual(library.all().filter(site => facets.matches(site, { country })).map(site => site.id).sort(), sites.filter(site => site.country === country).map(site => site.id).sort());
  }
  assert(PLACES.filter(place => place.country === 'ID').every(place => place.lat < 0));
});

test('current geography, approximate dates and main-shrine identity stay explicit', () => {
  const library = create(catalog, { getItem: () => null, setItem() {} });
  const matches = query => Array.from(library.all().filter(site => facets.matches(site, { query })), site => site.id);
  const po = catalog.find(site => site.id === 'vn_po_klong_garai');
  assert.equal(po.province, '庆和省');
  assert.deepEqual(matches('宁顺省'), ['vn_po_klong_garai']);
  assert.deepEqual(matches('Candi Siwa'), ['id_prambanan_shiva']);
  assert.equal(po.year, 1300); assert.equal(po.yearApprox, true);
  for (const id of ['th_sukhothai_mahathat', 'mm_ananda', 'id_prambanan_shiva']) assert(SITES.find(site => site.id === id).yearApprox);
  assert(SITES.find(site => site.id === 'kh_banteay_srei').yearNote.includes('奉献'));
  assert(!json('assets/research/vn_po_klong_garai.json').reference_files.some(file => file.endsWith('-photo-whole.jpg')), 'the narrow gate-tower photo is not a main-shrine input');
});

test('intake starts unvisited and retains existing records across reload and backup', () => {
  const memory = new Map();
  const storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const before = create(catalog.filter(site => !batch.ids.includes(site.id)), storage);
  before.setRecord('xianwall', { status: 'visited', visitedOn: '2025-05-01', note: '旧城墙行记' });
  before.setStatus('toji', 'wishlist');
  const after = create(catalog, storage);
  assert.deepEqual(after.record('xianwall'), before.record('xianwall'));
  assert.deepEqual(after.record('toji'), before.record('toji'));
  for (const id of batch.ids) {
    assert.equal(after.record(id).status, 'unvisited');
    assert.equal(after.record(id).visitedOn, '');
  }
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(after.export());
  assert.deepEqual(restored.record('xianwall'), after.record('xianwall'));
  for (const id of batch.ids) assert.equal(restored.record(id).status, 'unvisited');
});
