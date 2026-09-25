const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const protection = require('../protection.js');
const catalog = require('../catalog.js');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const hash = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const { SITES, PLACES, DYN } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES,DYN})');
const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
const queue = JSON.parse(read('assets/color-research/queue.json'));
const delivered = JSON.parse(read('assets/color-research/avif-manifest.json'));
const ids = ['qh_taer', 'jx_nanchang_uprising', 'xj_jiaohe', 'xz_potala', 'js_zhuozheng', 'sc_luding', 'bj_guozijian', 'zj_yuefei'];

test('eight first-batch additions have stable IDs, scope and geography', () => {
  assert.equal(new Set(ids).size, 8);
  const classified = catalog.classify(SITES, PLACES);
  for (const id of ids) {
    const entries = classified.filter(site => site.id === id);
    assert.equal(entries.length, 1, id);
    const site = entries[0];
    assert.equal(site.initialStatus, 'unvisited', id);
    assert(DYN[site.dyn], id);
    assert(site.province && site.region, id);
    assert(site.protection.some(entry => entry.batch === 1), id);
    assert(site.image?.src?.endsWith('/' + id + '.png'), id);
  }
  const jiaohe = classified.find(site => site.id === 'xj_jiaohe');
  assert.equal(jiaohe.dyn, 'xiyu');
  assert.equal(jiaohe.yearApprox, true);
  assert(jiaohe.yearNote.includes('不能'));
  assert(classified.find(site => site.id === 'js_zhuozheng').types.includes('garden'));
  assert(classified.find(site => site.id === 'bj_guozijian').types.includes('school'));
});

test('each new artwork has a source, hash binding, queue entry and pending review', () => {
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const id of ids) {
    const line = JSON.parse(read('assets/research/' + id + '.json'));
    const color = JSON.parse(read('assets/color-research/' + id + '.json'));
    const entries = queue.entries.filter(entry => entry.id === id);
    assert.equal(entries.length, 1, id);
    assert.equal(line.status, 'complete');
    assert.equal(color.status, 'complete');
    assert.equal(line.visual_review_status, 'pending_user');
    assert.equal(color.visual_review.status, 'pending_user');
    assert.equal(line.background_preparation.sourceSha256, hash(line.generated_file));
    assert.equal(color.background_preparation.sourceSha256, hash(color.output));
    assert(line.sources.every(source => fs.existsSync(path.join(root, source.reference_file))));
    assert.equal(delivered.images[id].sourceSha256, hash(color.output));
    assert.equal(delivered.images[id].alpha.min, 0);
    assert.equal(COLORED_PLATES[id].visualReview, 'pending_user');
  }
});
