const { assertUnvisited } = require('./helpers/native-catalog.cjs');
const assertArchivedTiantai = require('./helpers/archived-tiantai.cjs');
const assertArchivedXian = require('./helpers/archived-xian.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const json = p => JSON.parse(read(p));
const sha = p => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, p))).digest('hex');
const batch = json('assets/research/hebei-national-20261002-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES})');
const facets = require('../catalog.js');
const protection = require('../protection.js');
const catalog = facets.classify(SITES, PLACES);

test('ten Hebei national monuments have complete source-bound line and color pairs', () => {
  assert.equal(batch.ids.length, 10);
  assert.equal(new Set(batch.ids).size, 10);
  assert.deepEqual(batch.ids, batch.plannedIds);
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  for (const id of batch.ids) {
    assert(!batch.previousIds.includes(id), id);
    assert.equal(queue.entries.filter(e => e.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const record = json(`assets/${folder}/${id}.json`);
      assert.equal(record.quality_mode, 'prototype');
      assert(['pending_user', 'approved_user'].includes(record.visual_review_status));
      assert.equal(record.background_preparation.sourceSha256, sha(record.generated_file || record.output));
      assert(record.inputs_viewed && record.preview_check.original_viewed);
      assert(record.historical_sources.some(s => s.url.includes('.gov.cn')));
      for (const ref of record.references) {
        assert.equal(ref.sha256, sha(ref.file));
        assert(ref.author && ref.license && ref.page && ref.url);
      }
      const event = record.generation_history[0];
      assert.equal(event.prompt, record.prompt);
      assert.deepEqual(event.input_images, record.reference_files || record.input_images);
      assert.equal(event.status, 'saved');
      assert(fs.existsSync(event.original_file));
      assert(Date.parse(event.saved_at) >= Date.parse(event.received_at));
      assert(Date.parse(event.received_at) >= Date.parse(event.submitted_at));
    }
    const art = manifest.images[id];
    assert.equal(art.sourceSha256, sha(art.source));
    assert.equal(art.inputSha256, sha(art.input));
    assert.equal(art.sha256, sha(art.src));
    assert.equal(art.visualReview, json(`assets/color-research/${id}.json`).visual_review_status);
  }
});

test('Hebei intake distinguishes present structures, formal units and partial scopes', () => {
  const byId = id => SITES.find(s => s.id === id);
  assert.equal(byId('hb_bailinta').year, 1330);
  assert.equal(byId('hb_lingyan').year, 1441);
  assert.equal(byId('hb_xumifushou').year, 1780);
  assert.equal(byId('hb_puren').year, 1713);
  for (const id of ['hb_zdfuwenmiao', 'hb_zhenwu', 'hb_dzwenmiao', 'hb_changping', 'hb_daci', 'hb_xingwen']) {
    assert.equal(byId(id).yearApprox, true);
    assert(byId(id).yearNote.includes('约略'));
  }
  assert.equal(protection.forSite('hb_zhenwu')[0].unitName, '真武庙');
  assert.equal(protection.forSite('hb_changping')[0].unitName, '常平仓');
  assert.equal(protection.forSite('hb_puren')[0].scope, '主殿山花与侧面檐下局部');
  assert.equal(protection.forSite('hb_xumifushou')[0].scope, '妙高庄严殿金顶与大红台上部');
  assert.equal(protection.forSite('hb_dzwenmiao')[0].batch, 7);
  assert.equal(protection.forSite('hb_xumifushou')[0].batch, 1);
  assert(byId('hb_zdfuwenmiao').yearNote.includes('1070'));
  assert(byId('hb_xingwen').yearNote.includes('744'));
});

test('new Hebei sites are searchable and default unvisited without disturbing older IDs', () => {
  assertUnvisited(batch.ids);
  for (const id of batch.ids) {
    const site = catalog.find(s => s.id === id);
    assert.equal(site.province, '河北');
    assert.equal(site.region, 'north');
    assert.equal(site.initialStatus, 'unvisited');
    assert(facets.matches(site, { province: '河北', query: '国保', status: 'unvisited' }));
    assert(facets.matches(site, { query: batch.entries[id].unitName }));
  }
  for (const id of batch.previousIds) assert(SITES.some(s => s.id === id), id);
});

test('Hebei intake preserves older plate content and human acceptance', () => {
  const manifest = json('assets/color-research/avif-manifest.json');
  for (const [id, previous] of Object.entries(batch.previousDeliveries)) {
    if (id === 'xian') { assertArchivedXian(previous); continue; }
    if (id === 'tiantai') { assertArchivedTiantai(previous); continue; }
    const now = manifest.images[id];
    assert.equal(now.sourceSha256, previous.sourceSha256, id);
    assert.equal(now.inputSha256, previous.inputSha256, id);
    assert.equal(now.sha256, previous.sha256, id);
    if (previous.visualReview === 'approved_user') {
      assert.equal(now.visualReview, 'approved_user', id);
    } else if (now.visualReview === 'approved_user') {
      // A different batch may receive explicit acceptance after this baseline.
      const review = json(`assets/color-research/${id}.json`).user_review;
      assert.equal(review.status, 'approved_user', id);
      assert.equal(review.sourceSha256, now.sourceSha256, id);
      assert.equal(review.inputSha256, now.inputSha256, id);
      assert.equal(review.avifSha256, now.sha256, id);
    } else {
      assert.equal(now.visualReview, previous.visualReview, id);
    }
  }
});
