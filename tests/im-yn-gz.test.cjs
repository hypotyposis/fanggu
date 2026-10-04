const { assertUnvisited } = require('./helpers/native-catalog.cjs');
const assertArchivedTiantai = require('./helpers/archived-tiantai.cjs');
const assertArchivedXian = require('./helpers/archived-xian.cjs');
const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const batch = json('assets/research/im-yn-gz-batch.json');
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({ SITES, PLACES })');
const facets = require('../catalog.js');
const catalog = facets.classify(SITES, PLACES);

test('Inner Mongolia, Yunnan and Guizhou additions have real paired prototype assets and traceable inputs', requiresLocalAssets, () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(batch.ids.length, 8);
  assert.equal(batch.plannedIds.length, 9);
  assert.equal(new Set(batch.ids).size, 8);
  assert.deepEqual([...batch.ids, ...batch.blocked.map(b => b.id)].sort(), [...batch.plannedIds].sort());
  assert.equal(batch.blocked[0].id, 'gz_anshun');
  assert.equal(json('assets/research/gz_anshun.json').status, 'blocked');
  assert.equal(json('assets/research/gz_anshun.json').generation_history.length, 0);
  assert(!SITES.some(s => s.id === 'gz_anshun'));
  assert(!queue.entries.some(s => s.id === 'gz_anshun'));
  assert(!manifest.images.gz_anshun);
  assert.deepEqual(Object.values(batch.groups).flat().sort(), [...batch.ids].sort());
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const [province, ids] of Object.entries(batch.groups)) {
    assert.equal(ids.length, province === '贵州' ? 2 : 3);
    for (const id of ids) {
      const site = catalog.find(s => s.id === id);
      assert.equal(site.province, province);
      assert.equal(site.initialStatus, 'unvisited');
      assert.equal(site.country, 'CN');
      assert.equal(queue.entries.filter(e => e.id === id).length, 1);
      for (const folder of ['research', 'color-research']) {
        const meta = json(`assets/${folder}/${id}.json`);
        assert.equal(meta.id, id);
        assert(['needs_review', 'complete'].includes(meta.status));
        assert(meta.prompt);
        assert.equal(meta.background_preparation.sourceSha256, hash(meta.output || meta.generated_file));
        assert.equal(meta.background_preparation.method, 'white-matte-v1');
        for (const input of meta.reference_files || meta.input_images) assert(fs.existsSync(path.join(root, input)), input);
        assert(meta.generation_history.some(g => g.original_file && g.submitted_at && g.returned_at));
      }
      assert.equal(manifest.images[id].qualityMode, 'prototype');
      assert(['pending_user', 'approved_user'].includes(manifest.images[id].visualReview));
      assert(fs.existsSync(path.join(root, manifest.images[id].src)));
    }
  }
});

test('new provinces and aliases are reachable without duplicating existing monument identities', () => {
  const find = filters => catalog.filter(s => facets.matches(s, filters));
  assert(facets.provinces(catalog, 'southwest').includes('贵州'));
  for (const [province, ids] of Object.entries(batch.groups)) for (const id of ids) {
    assert(find({ province, status: 'unvisited' }).some(s => s.id === id));
    assert.equal(SITES.filter(s => s.id === id).length, 1);
  }
  assert(find({ query: '慈灯寺', province: '内蒙古' }).some(s => s.id === 'im_wuta'));
  assert(find({ query: '先师殿', province: '云南' }).some(s => s.id === 'yn_jianshui'));
  assert(find({ query: '九角', province: '贵州' }).some(s => s.id === 'gz_wenchang'));
  assert.equal(find({ region: 'north', province: '内蒙古' }).length, 4);
  assert.deepEqual(Array.from(find({ province: '云南' }), site => site.id).sort(),
    ['chongsheng', 'yn_jianshui', 'yn_jindian', 'yn_jingzhen', 'yn_shizhong', 'yn_cuanbaozi', 'yn_cuanyan', 'yn_duanshi'].sort());
});

test('dates distinguish foundation, surviving subject, reconstruction and approximate placement', () => {
  const site = id => SITES.find(s => s.id === id);
  assert.equal(site('yn_jindian').year, 1671);
  assert.equal(site('gz_wenchang').year, 1669);
  assert.equal(site('gz_jiaxiu').year, 1909);
  assert.equal(site('yn_jingzhen').year, 1701);
  for (const id of ['im_dazhao', 'im_wudang', 'yn_jianshui']) assert.equal(site(id).yearApprox, true);
  for (const id of batch.ids) assert(site(id).yearNote);
});

test('adding eight monuments preserves all 219 earlier color files and their review state', requiresLocalAssets, () => {
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(Object.keys(batch.previousDeliveries).length, 219);
  for (const [id, old] of Object.entries(batch.previousDeliveries)) {
    if (id === 'xian') { assertArchivedXian(old); continue; }
    if (id === 'tiantai') { assertArchivedTiantai(old); continue; }
    const now = manifest.images[id];
    assert.equal(now.sourceSha256, old.source, id);
    assert.equal(now.inputSha256, old.input, id);
    assert.equal(now.sha256, old.avif, id);
    if (now.visualReview !== old.visualReview) {
      const review = json(`assets/color-research/${id}.json`).user_review;
      assert.equal(old.visualReview, 'pending_user', id);
      assert.equal(now.visualReview, 'approved_user', id);
      assert.equal(review?.reviewer, 'user', id);
      assert.equal(review?.sourceSha256, now.sourceSha256, id);
      assert.equal(review?.inputSha256, now.inputSha256, id);
      assert.equal(review?.avifSha256, now.sha256, id);
    }
  }
});

test('new entries export unvisited defaults to the native catalogue', () => {
  assertUnvisited(batch.ids);
});
