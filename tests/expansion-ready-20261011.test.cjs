const test = require('node:test');
const { requiresLocalAssets } = require('./helpers/local-assets.cjs');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const hash = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const batch = json('assets/research/expansion-ready-20261011-batch.json');
const laterBatches = ['japan-first-20261011', 'japan-second-20261012'].map(name => json(`assets/research/${name}-batch.json`));
const laterResolved = { ids: laterBatches.flatMap(batch => batch.ids), jobs: laterBatches.flatMap(batch => batch.jobs) };
const intakes = ['dongbei', 'hubei-hunan', 'xizang', 'japan-kokuho'].map(group => json(`assets/research/content-rewrites/20261005/expansion-intake/${group}-20261005-intake.json`));
const { SITES, PLACES } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES})');
const catalog = require('../catalog.js');
const sites = catalog.classify(SITES, PLACES);
const queue = json('assets/color-research/queue.json');
const manifest = json('assets/color-research/avif-manifest.json');

test('ready expansion covers all eligible candidates and excludes unresolved subjects', () => {
  assert.deepEqual([...batch.ids].sort(), intakes.flatMap(item => item.ready).sort());
  assert.equal(batch.ids.length, 41);
  assert.equal(SITES.length, batch.beforeCount + batch.ids.length + laterResolved.ids.length + json('assets/research/china-single-20261012-batch.json').ids.length);
  assert.equal(new Set(SITES.map(site => site.id)).size, SITES.length);
  for (const candidate of intakes.flatMap(item => item.blocked)) {
    if (laterResolved.ids.includes(candidate.id)) {
      const resolved = laterResolved.jobs.find(job => job.id === candidate.id);
      assert(resolved?.historical_sources.length && resolved.calls.length === 2, candidate.id);
    } else assert(!SITES.some(site => site.id === candidate.id), candidate.id);
  }
  for (const id of ['hb_ezhou_guanyin', 'hb_wanshou_pagoda', 'hu_yueyang_cishi']) assert(!SITES.some(site => site.id === id));
  for (const id of batch.ids) {
    const site = sites.find(site => site.id === id);
    assert.equal(site.initialStatus, 'unvisited', id);
    assert(site.region && site.province, id);
    assert.equal(site.siteLatitude, undefined, 'Approximate map points must not become reminder targets');
    assert.equal(site.siteLongitude, undefined);
  }
});

test('new Japanese regions and dated building scopes survive classification and translations', () => {
  for (const [id, region] of [['jp_zuiganji_hondo', 'jp_tohoku'], ['jp_matsumoto_tenshu', 'jp_chubu'], ['jp_fukiji_odo', 'jp_kyushu'], ['jp_izumo_honden', 'jp_chugoku'], ['jp_jodoji_jododo', 'jp_kinki']]) {
    assert.equal(sites.find(site => site.id === id).region, region);
  }
  assert.equal(sites.find(site => site.id === 'jp_sanbutsuji_nageiredo').yearApprox, true);
  assert.equal(sites.find(site => site.id === 'hb_huanghelou').year, 1985);
  for (const [id, year, dynasty] of [['xz_ramoche', 1986, 'modern'], ['xz_samye_utse', 1990, 'modern'], ['xz_tholing', 1028, 'song'], ['xz_tradruk', 1351, 'yuan']]) {
    const site = sites.find(site => site.id === id);
    assert.equal(site.year, year); assert.equal(site.dyn, dynasty);
    assert(site.yearNote.includes('现'));
  }
  for (const language of ['en', 'ja']) {
    const translations = json(`i18n/${language}.json`);
    const exported = json(`ios/Fanggu/Resources/catalog-${language}.json`);
    for (const id of batch.ids) {
      const source = sites.find(site => site.id === id);
      const translated = translations.sites[id];
      assert(translated.name && translated.lede && translated.yearNote, `${language}: ${id}`);
      assert.equal(translated.facts.length, source.facts.length);
      assert.equal(translated.captions.length, 2);
      const item = exported.find(site => site.id === id);
      assert.equal(item.name, translated.name);
      assert.equal(item.year, source.year);
      assert.equal(item.yearApprox, source.yearApprox || false);
      assert.equal(item.region, source.region);
    }
  }
});

test('all 82 originals bind prompts, viewed references and default-approved deliveries', requiresLocalAssets, () => {
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  for (const job of batch.jobs) {
    const id = job.id;
    assert.equal(job.calls.length, 2, id);
    assert(job.calls.every(call => call.status === 'received' && call.attempt === 1), id);
    const line = json(`assets/research/${id}.json`);
    const color = json(`assets/color-research/${id}.json`);
    assert.equal(line.status, 'complete');
    assert.equal(color.status, 'complete');
    assert.equal(line.review.inputs_viewed, true);
    assert.equal(line.review.output_viewed, true);
    assert.equal(color.visual_review.inputs_viewed, true);
    assert.equal(color.visual_review.output_viewed, true);
    assert(line.prompt && color.prompt, id);
    for (const reference of job.references) assert(fs.existsSync(path.join(root, reference)), reference);
    assert.equal(line.background_preparation.sourceSha256, hash(line.generated_file));
    assert.equal(color.background_preparation.sourceSha256, hash(color.output));
    assert.equal(line.user_review.status, 'approved_default');
    assert.equal(color.user_review.status, 'approved_default');
    assert.equal(manifest.images[id].sourceSha256, hash(color.output));
    assert.equal(manifest.images[id].sha256, hash(`assets/colored-transparent-avif/${id}.avif`));
    assert.equal(manifest.images[id].alpha.min, 0);
    assert.equal(manifest.images[id].alpha.max, 255);
    assert.equal(manifest.images[id].visualReview, 'approved_default');
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
  }
});
