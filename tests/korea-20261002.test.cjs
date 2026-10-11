const { assertUnvisited } = require('./helpers/native-catalog.cjs');
const assertArchivedTiantai = require('./helpers/archived-tiantai.cjs');
const assertArchivedXian = require('./helpers/archived-xian.cjs');
const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const { SITES, PLACES, DYN, CHAPTERS, COLORED_PLATES } = vm.runInNewContext(read('sites.js') + read('plates.js') + read('colored-plates.js') + '\n({ SITES, PLACES, DYN, CHAPTERS, COLORED_PLATES })');
const facets = require('../catalog.js');
const batch = json('assets/research/korea-20261002-batch.json');
const sites = facets.classify(SITES, PLACES);

test('Korean batch has both countries, all regions, independent eras and no personal records', () => {
  assert.equal(batch.ids.length, 8);
  for (const country of ['KR', 'KP']) {
    const selected = sites.filter(site => facets.matches({ ...site, record: { status: 'unvisited' } }, { country }));
    assert.equal(selected.length, 4);
    assert(selected.every(site => batch.ids.includes(site.id)));
    for (const site of selected) {
      assert.equal(site.initialStatus, 'unvisited');
      assert.equal(PLACES.find(place => place.key === site.placeKey).country, country);
      assert.equal(facets.regions[site.region].country, country);
      assert(site.yearNote, `${site.id}: missing construction-date qualification`);

      assert(site.legacyNames.some(name => facets.matches({ ...site, record: { status: 'unvisited' } }, { query: name, country })));
    }
  }
  for (const era of ['ko_silla', 'ko_goryeo', 'ko_joseon']) {
    assert(CHAPTERS.some(chapter => chapter.key === era));
    assert.equal(DYN[era].timelineLane, 'korea');
  }
  assertUnvisited(batch.ids);
});

test('Korean dates distinguish uncertain construction, later additions and war reconstruction', () => {
  const get = id => SITES.find(site => site.id === id);
  assert.equal(get('kr_sudeoksa_daeungjeon').year, 1308);
  assert.equal(get('kr_buseoksa_muryangsujeon').year, 1376);
  assert.equal(get('kr_changdeokgung_injeongjeon').year, 1804);
  assert.equal(get('kp_kaesong_namdaemun').dyn, 'modern');
  assert.equal(get('kp_kaesong_namdaemun').year, 1955);
  assert(get('kp_kaesong_namdaemun').yearNote.includes('1954'));
  for (const id of ['kr_bulguksa_dabotap', 'kp_sungyang_hall', 'kp_sonjuk_bridge']) assert(get(id).yearApprox);
  assert(get('kp_sonjuk_bridge').yearNote.includes('1780'));
  assert(get('kp_sungyang_hall').yearNote.includes('未定'));
});

test('Korean line/color originals, references, queue and actual transparent deliveries cover every ID', requiresLocalAssets, () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count + queue.excluded.length, SITES.length);
  assert.deepEqual(Object.keys(COLORED_PLATES).sort(), Array.from(SITES, site => site.id).sort());
  for (const id of batch.ids) {
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const meta = json(`assets/${folder}/${id}.json`);
      assert.equal(meta.id, id); assert(['pending_user', 'approved_user', 'approved_default'].includes(meta.visual_review_status));
      assert.equal(meta.background_preparation.sourceSha256, hash(meta.output || meta.generated_file));
      assert(meta.prompt.length > 500); assert(meta.inputs_viewed && meta.preview_check.original_viewed);
      assert(meta.generation_history.length >= 1);
      assert.equal(meta.generation_history.at(-1).prompt, meta.prompt);
      for (const file of meta.reference_files || meta.input_images) assert(fs.existsSync(path.join(root, file)), file);
      for (const ref of meta.references) assert.equal(hash(ref.file), ref.sha256);
      assert(meta.historical_sources[0].url.startsWith('https://'));
    }
    const image = manifest.images[id];
    assert.equal(image.visualReview, json(`assets/color-research/${id}.json`).visual_review_status);
    assert(image.alpha.transparentPixels > 0 && image.alpha.opaquePixels > 0);
    assert.equal(image.extraction.interiorRgbUnchanged, true);
    assert.equal(image.sha256, hash(COLORED_PLATES[id].src));
  }
  for (const [id, previous] of Object.entries(batch.previousDeliveries)) {
    if (id === 'xian') { assertArchivedXian(previous); continue; }
    if (id === 'tiantai') { assertArchivedTiantai(previous); continue; }
    assert.equal(manifest.images[id].sha256, previous.sha256, `${id}: unrelated delivery changed`);
    if (previous.visualReview === 'approved_user') assert.equal(manifest.images[id].visualReview, 'approved_user', `${id}: prior approval lost`);
  }
});
