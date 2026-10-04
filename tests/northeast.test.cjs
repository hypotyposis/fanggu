const { assertUnvisited } = require('./helpers/native-catalog.cjs');
const assertArchivedTiantai = require('./helpers/archived-tiantai.cjs');
const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assertArchivedXian = require('./helpers/archived-xian.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const facets = require('../catalog.js');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const { SITES, PLACES, DYN, CHAPTERS, COLORED_PLATES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n({ SITES, PLACES, DYN, CHAPTERS, COLORED_PLATES })');
const batch = json('assets/research/northeast-batch.json');
const catalog = facets.classify(SITES, PLACES);
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');

test('northeast delivery distinguishes requested ten from structurally blocked or unapproved scope', requiresLocalAssets, () => {
  assert.equal(batch.requested_ids.length, 10);
  assert.deepEqual(Object.values(batch.requested_groups).map(ids => ids.length), [4, 3, 3]);
  assert.deepEqual(Object.values(batch.groups).flat().sort(), [...batch.ids].sort());
  assert.deepEqual([...batch.ids, ...batch.pending.map(item => item.id)].sort(), [...batch.requested_ids].sort());
  assert.equal(new Set([...batch.ids, ...batch.pending.map(item => item.id)]).size, 10);
  for (const item of batch.pending) {
    assert(!SITES.some(site => site.id === item.id));
    assert(!COLORED_PLATES[item.id]);
  }
  const blocked = json('assets/research/ln_chaoyangbei.json');
  assert.equal(blocked.status, 'blocked');
  assert.equal(blocked.generation_history.length, 3);
  assert(blocked.generation_history.every(attempt => !attempt.accepted && attempt.prompt && fs.existsSync(path.join(root, attempt.retained_file))));
});

test('northeast paired plates bind real originals, transparency and existing artwork hashes', requiresLocalAssets, () => {
  const queue = json('assets/color-research/queue.json'), manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(queue.count, queue.entries.length);
  assert.deepEqual([...queue.entries.map(item => item.id), ...queue.excluded].sort(), Array.from(SITES, site => site.id).sort());
  for (const id of batch.ids) {
    const site = catalog.find(site => site.id === id);
    assert.equal(site.region, 'northeast'); assert.equal(site.initialStatus, 'unvisited');
    for (const folder of ['research', 'color-research']) {
      const meta = json(`assets/${folder}/${id}.json`);
      assert.equal(meta.status, 'complete'); assert(meta.prompt);
      if (folder === 'research') assert(meta.factual_sources?.length);
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
      assert.equal(meta.background_preparation.sourceSha256, hash(meta.output || meta.generated_file));
      for (const input of meta.reference_files || meta.input_images) assert(fs.existsSync(path.join(root, input)), input);
      assert.equal((meta.review || meta.visual_review).output_viewed, true);
    }
    assert(COLORED_PLATES[id].src.endsWith(`${id}.avif`));
    const image = manifest.images[id];
    assert(['pending_user', 'approved_user'].includes(image.visualReview));
    if (image.visualReview === 'approved_user') {
      const userReview = json(`assets/color-research/${id}.json`).user_review;
      assert.equal(userReview?.reviewer, 'user');
      assert.equal(userReview?.sourceSha256, image.sourceSha256);
      assert.equal(userReview?.inputSha256, image.inputSha256);
      assert.equal(userReview?.avifSha256, image.sha256);
    }
    assert(image.alpha.transparentPixels > 0 && image.alpha.opaquePixels > 0);
    assert.equal(image.extraction.interiorRgbUnchanged, true);
  }
  assert.equal(Object.keys(batch.baseline_artwork).length, 211);
  for (const [id, before] of Object.entries(batch.baseline_artwork)) {
    if (id === 'xian') { assertArchivedXian(before); continue; }
    if (id === 'tiantai') { assertArchivedTiantai(before); continue; }
    const after = manifest.images[id];
    assert.equal(after.inputSha256, before.input, id);
    assert.equal(after.sha256, before.avif, id);
    if (after.visualReview !== before.visualReview) {
      const userReview = json(`assets/color-research/${id}.json`).user_review;
      assert.equal(before.visualReview, 'pending_user', id);
      assert.equal(after.visualReview, 'approved_user', id);
      assert.equal(userReview?.reviewer, 'user', id);
      assert.equal(userReview?.sourceSha256, after.sourceSha256, id);
      assert.equal(userReview?.inputSha256, after.inputSha256, id);
      assert.equal(userReview?.avifSha256, after.sha256, id);
    }
  }
});

test('northeast provinces, separate periods and church facets are actually reachable', () => {
  const find = filters => catalog.filter(site => facets.matches(site, filters));
  assert.deepEqual(facets.provinces(catalog, 'northeast'), ['辽宁', '吉林', '黑龙江']);
  assert.equal(find({ region: 'northeast' }).length, batch.ids.length + 2);
  for (const [province, ids] of Object.entries(batch.groups)) for (const id of ids) assert(find({ province, status: 'unvisited' }).some(site => site.id === id));
  assert.deepEqual(Array.from(find({ type: 'church', region: 'northeast' }), site => site.id), ['hlj_sofia']);
  for (const [id, dyn] of [['jl_jiangjunfen', 'goguryeo'], ['hlj_shideng', 'balhae']]) {
    const site = SITES.find(site => site.id === id);
    assert.equal(site.dyn, dyn); assert.equal(site.yearApprox, true);
    assert(CHAPTERS.some(chapter => chapter.key === dyn));
    assert(SITES.filter(site => site.dyn === dyn).some(site => site.id === id));
  }
  assert.notEqual(DYN.goguryeo.acc, DYN.bei.acc); assert.notEqual(DYN.balhae.acc, DYN.tang.acc);
  assert.equal(SITES.find(site => site.id === 'jl_wenmiao').year, 1909);
  assert.equal(SITES.find(site => site.id === 'hlj_sofia').year, 1932);
});

test('new entries export unvisited defaults to the native catalogue', () => {
  assertUnvisited(batch.ids);
});
