const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const hash = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const batch = json('assets/research/ganquan-20261016-batch.json');
const { SITES, PLACES, PLATES, COLORED_PLATES } = vm.runInNewContext(
  read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n({SITES, PLACES, PLATES, COLORED_PLATES})');

test('Ganquan adds only the surviving Ming hall and keeps foundation, repairs and approximate map point distinct', () => {
  assert.deepEqual(batch.ids, ['sc_ganquan']);
  assert.equal(SITES.length, batch.beforeCount + batch.ids.length);
  const matches = SITES.filter(site => site.id === 'sc_ganquan');
  assert.equal(matches.length, 1);
  const site = matches[0];
  assert.equal(site.initialStatus, 'unvisited');
  assert.equal(site.dyn, 'ming');
  assert.equal(site.yearApprox, true);
  assert(site.yearNote.includes('不是确切建年'));
  assert(site.yearNote.includes('1434') && site.yearNote.includes('2010'));
  assert.equal(site.sub, '现存大雄宝殿');
  assert.equal(PLACES.find(place => place.key === site.placeKey).prov, '四川');
  const protection = json('assets/research/national-protection.json').entries.sc_ganquan[0];
  assert.equal(protection.batch, 7);
  assert.equal(protection.unitName, '甘泉寺');
  assert.equal(protection.scope, '甘泉寺现存大雄宝殿');
  for (const language of ['', '-en', '-ja']) {
    const exported = json(`ios/Fanggu/Resources/catalog${language}.json`).find(item => item.id === site.id);
    assert.equal(exported.initialStatus, 'unvisited');
    assert.equal(exported.siteLatitude, null);
    assert.equal(exported.siteLongitude, null);
    assert.equal(exported.protection[0].batch, 7);
    assert(exported.lineImage.endsWith('sc_ganquan.png'));
    assert(exported.colorImage.endsWith('sc_ganquan.avif'));
  }
});

test('Ganquan originals, references, queue and transparent deliveries have honest default approvals bound to actual files', () => {
  const id = batch.ids[0];
  const queue = json('assets/color-research/queue.json');
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
  assert.equal(COLORED_PLATES[id].visualReview, 'approved_default');
  assert.equal(PLATES[id].width, 1536);
  assert.equal(PLATES[id].height, 1024);
  for (const folder of ['research', 'color-research']) {
    const meta = json(`assets/${folder}/${id}.json`);
    assert.equal(meta.background_preparation.sourceSha256, hash(meta.generated_file || meta.output));
    assert.equal(meta.user_review.status, 'approved_default');
    assert.equal(meta.user_review.reviewer, 'default-policy');
    assert.equal(meta.user_review.sourceSha256, meta.background_preparation.sourceSha256);
    assert.equal(meta.generation_history.length, 1);
    assert.equal(meta.generation_history[0].prompt, meta.prompt);
    assert(meta.historical_sources.length > 0);
    for (const input of meta.input_images) assert(fs.existsSync(path.join(root, input)), input);
  }
  const line = json(`assets/research/${id}.json`);
  const color = json(`assets/color-research/${id}.json`);
  assert.equal(line.user_review.lineSha256, hash(`assets/plates/${id}.png`));
  assert.equal(color.user_review.inputSha256, hash(`assets/colored-transparent/${id}.png`));
  assert.equal(color.user_review.avifSha256, hash(`assets/colored-transparent-avif/${id}.avif`));
});
