const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const { assertUnvisited } = require('./helpers/native-catalog.cjs');
const { curations } = require('../curations.js');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const hash = file => createHash('sha256').update(fs.readFileSync(path.resolve(root, file))).digest('hex');
const batch = json('assets/research/china-single-resume-20261012-batch.json');
const { SITES, PLATES, COLORED_PLATES } = vm.runInNewContext(
  read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n({SITES, PLATES, COLORED_PLATES})');

test('the recovered Chongxing interior is an independent unvisited member of the preserved Ninghai collection', () => {
  assert.deepEqual(batch.ids, ['xitai_chongxing']);
  assert.equal(SITES.length, batch.baseline_catalog_count + batch.ids.length);
  assert.deepEqual(Object.values(batch.delivered_groups).flat(), batch.ids);
  const site = SITES.find(s => s.id === 'xitai_chongxing');
  assert.equal(site.year, 1841);
  assert.equal(site.yearApprox, false);
  assert.equal(site.dyn, 'ming');
  assert.equal(site.tag, '清');
  assert.match(site.yearLabel, /起重建/);
  assert.match(site.sub, /内部.*三连贯藻井/);
  assert.deepEqual(Array.from(site.types), ['stage']);
  assert.equal(site.placeKey, 'ninghai');
  assert.equal(site.initialStatus, 'unvisited');
  assertUnvisited(batch.ids);
  assert.equal(SITES.find(s => s.id === 'xitai').collectionOnly, true);
  const list = curations.find(c => c.id === 'xitai');
  assert.equal(list.legacySiteID, 'xitai');
  assert.deepEqual(list.items, ['xitai_aohu', 'xitai_chongxing', 'xitai_chenghuang']);
  for (const suffix of ['', '-en', '-ja']) {
    const exported = json(`ios/Fanggu/Resources/catalog${suffix}.json`);
    const member = exported.find(s => s.id === site.id);
    assert.equal(member.year, 1841);
    assert.equal(member.collectionOnly, false);
    assert.equal(member.protection[0].batch, 6);
    const group = json(`ios/Fanggu/Resources/curations${suffix}.json`).find(c => c.id === 'xitai');
    assert.deepEqual(group.items, list.items);
    assert.equal(group.legacySiteID, 'xitai');
  }
});

test('recovered line and newly generated color retain real inputs, source attribution and bound delivery hashes', requiresLocalAssets, () => {
  const id = batch.ids[0];
  const line = json(`assets/research/${id}.json`);
  const color = json(`assets/color-research/${id}.json`);
  assert.match(line.generation_original_file, /exec-3898adfd-e7ef-4d98-8f40-efde03d933b1\.png$/);
  assert.match(color.generated_original, /exec-cb4a2943-25cc-4224-bed6-0c02704ff7a0\.png$/);
  assert.match(line.prompt, /interior architectural cutaway/);
  assert.match(color.prompt, /three connected caissons/);
  assert.equal(line.sources.length, 3);
  assert.ok(line.sources.every(s => s.author === 'confusingstone' && s.source_page.includes('pixnet.net')));
  assert.ok(line.historical_sources.some(s => s.url.includes('news.cnnb.com.cn')));
  const protectionSource = line.historical_sources.find(s => s.local_file?.endsWith('ninghai-plan-source.pdf'));
  assert.ok(protectionSource.url.includes('.zj.gov.cn/'));
  assert.equal(protectionSource.retrievedSha256, hash(protectionSource.local_file));
  for (const [record, output] of [[line, line.generated_file], [color, color.output]]) {
    assert.equal(record.background_preparation.sourceSha256, hash(output));
    assert.equal(record.background_preparation.method, 'white-matte-v1');
    for (const file of record.input_images) assert.ok(fs.existsSync(path.resolve(root, file)), file);
    assert.equal(record.user_review.status, 'approved_default');
    assert.equal(record.user_review.reviewer, 'default-policy');
    assert.equal(record.user_review.sourceSha256, hash(output));
  }
  assert.equal(line.user_review.lineSha256, hash(PLATES[id].src));
  const queue = json('assets/color-research/queue.json');
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.entries.filter(s => s.id === id).length, 1);
  const delivery = json('assets/color-research/avif-manifest.json').images[id];
  assert.equal(delivery.inputSha256, hash(delivery.input));
  assert.equal(delivery.sha256, hash(delivery.src));
  assert.equal(color.user_review.avifSha256, hash(delivery.src));
  assert.equal(delivery.visualReview, 'approved_default');
  assert.ok(delivery.alpha.transparentPixels > 0 && delivery.alpha.opaquePixels > 0);
  assert.equal(COLORED_PLATES[id].visualReview, 'approved_default');
});

test('incomplete subject evidence remains explicit without introducing speculative children', () => {
  const blocked = batch.candidates.filter(c => c.phase === 'blocked');
  assert.deepEqual(blocked.map(c => c.id), batch.blocked_ids);
  for (const c of blocked) {
    assert.ok(c.blocker.length > 20, c.id);
    assert.ok(!batch.ids.includes(c.id), c.id);
  }
  assert.ok(!SITES.some(s => s.id === 'longxing_dabei'));
  for (const id of ['sx_jishan_jiwang', 'xz_guge', 'xz_tholing', 'nx_108towers']) {
    assert.notEqual(SITES.find(s => s.id === id).collectionOnly, true, id);
  }
});
