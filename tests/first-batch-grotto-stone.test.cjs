const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const hash = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const batch = JSON.parse(read('assets/research/first-batch-grotto-stone.json'));
const queue = JSON.parse(read('assets/color-research/queue.json'));
const delivery = JSON.parse(read('assets/color-research/avif-manifest.json'));
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES})');
const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');

test('first-batch grottoes and stone/metal relics are all represented once', () => {
  assert.deepEqual(batch.units.map(unit => unit.number), [35,36,37,38,39,40,41,42,43,44,45,46,47,125,126,127,128,129,130,131,132,133]);
  assert.equal(batch.units.filter(unit => unit.added).length, 19);
  assert.deepEqual(batch.units.filter(unit => !unit.added).map(unit => unit.id), ['longmenshiku','xiangtang','dazu']);
  assert.equal(new Set(batch.units.map(unit => unit.id)).size, 22);
  for (const unit of batch.units) assert.equal(SITES.filter(site => site.id === unit.id).length, 1, unit.name);
});

test('new entries are unvisited and have source-bound, transparent artwork', () => {
  assert.equal(queue.count, queue.entries.length);
  for (const unit of batch.units.filter(unit => unit.added)) {
    const id = unit.id, site = SITES.find(site => site.id === id);
    const line = JSON.parse(read(`assets/research/${id}.json`));
    const color = JSON.parse(read(`assets/color-research/${id}.json`));
    const entry = queue.entries.filter(entry => entry.id === id);
    const delivered = delivery.images[id];
    assert.equal(site.protection.unitName, unit.name);
    assert.equal(site.initialStatus, 'unvisited');
    assert(PLACES.some(place => place.key === site.placeKey));
    assert.equal(entry.length, 1);
    assert.equal(line.status, 'complete');
    assert.equal(color.status, 'complete');
    assert.equal(line.background_preparation.sourceSha256, hash(line.generated_file));
    assert.equal(color.background_preparation.sourceSha256, hash(color.output));
    assert(line.sources.every(source => /^https?:\/\//.test(source.source_page)));
    assert.equal(delivered.sourceSha256, hash(color.output));
    assert.equal(delivered.alpha.min, 0);
    assert.equal(delivered.alpha.max, 255);
    assert.equal(COLORED_PLATES[id].visualReview, 'pending_user');
  }
});
