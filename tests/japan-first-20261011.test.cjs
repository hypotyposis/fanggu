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
const batch = json('assets/research/japan-first-20261011-batch.json');
const second = json('assets/research/japan-second-20261012-batch.json');
const { SITES, PLACES, DYN, CHAPTERS } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES,DYN,CHAPTERS})');
const sites = require('../catalog.js').classify(SITES, PLACES);

test('first Japan batch covers all agreed subjects with unvisited records and display-only points', requiresLocalAssets, () => {
  assert.equal(batch.ids.length, 26);
  assert.equal(new Set(batch.ids).size, 26);
  assert.deepEqual([...batch.ids].sort(), batch.jobs.map(job => job.id).sort());
  assert.equal(SITES.length, batch.beforeCount + batch.ids.length + second.ids.length + json('assets/research/china-single-20261012-batch.json').ids.length);
  assert.equal(sites.filter(site => site.country === 'JP').length, batch.beforeJapanCount + batch.ids.length + second.ids.length);
  for (const job of batch.jobs) {
    const site = sites.find(site => site.id === job.id);
    assert.equal(site.country, 'JP');
    assert.equal(site.dyn, job.dyn);
    assert.equal(site.initialStatus, 'unvisited');
    assert(site.region && site.province && site.yearNote.length > 15, job.id);
    assert.equal(site.siteLatitude, undefined);
    assert.equal(site.siteLongitude, undefined);
    assert.equal(site.sub, job.subject);
    assert(job.photo.source_page && job.photo.author && job.photo.license, job.id);
    assert(job.historical_sources.length >= 1 && job.checkpoints.length >= 2, job.id);
    for (const call of job.calls) for (const file of call.input_images) assert(fs.existsSync(path.join(root, file)), file);
  }
  for (const [id, region] of [['jp_burakuji_yakushido', 'jp_shikoku'], ['jp_kamitani_honden', 'jp_shikoku'], ['jp_tamaudun', 'jp_okinawa'], ['jp_aoi_aso', 'jp_kyushu'], ['jp_engakuji_shariden', 'jp_kanto']]) {
    assert.equal(sites.find(site => site.id === id).region, region);
  }
});

test('dates distinguish foundation, surviving fabric, additions and relocation in every language', () => {
  for (const [id, year, approximate] of [['jp_hokiji_pagoda',706,false], ['jp_kozanji_butsuden',1320,false], ['jp_sofukuji_daiippomon',1695,false], ['jp_engakuji_shariden',1425,true], ['jp_burakuji_yakushido',1151,true], ['jp_myoikian_taian',1582,true], ['jp_hakogi_house',1350,true]]) {
    const site = sites.find(site => site.id === id);
    assert.equal(site.year, year); assert.equal(site.yearApprox, approximate);
  }
  assert.match(sites.find(site => site.id === 'jp_sofukuji_daiou').yearNote, /1681/);
  assert.match(sites.find(site => site.id === 'jp_urakuen_joan').yearNote, /1972/);
  assert.match(sites.find(site => site.id === 'jp_aoi_aso').facts[0], /寄栋/);
  assert.equal(sites.find(site => site.id === 'jp_tamaudun').dyn, 'jp_ryukyu');
  assert.equal(DYN.jp_ryukyu.start, 1429); assert.equal(DYN.jp_ryukyu.end, 1879);
  assert(CHAPTERS.some(chapter => chapter.key === 'jp_ryukyu'));
  for (const language of ['en', 'ja']) {
    const translations = json(`i18n/${language}.json`);
    const exported = json(`ios/Fanggu/Resources/catalog-${language}.json`);
    for (const id of batch.ids) {
      const source = sites.find(site => site.id === id), entry = translations.sites[id], item = exported.find(site => site.id === id);
      assert(entry.name && entry.lede && entry.yearNote, `${language}: ${id}`);
      assert.equal(entry.facts.length, source.facts.length); assert.equal(entry.captions.length, 2);
      assert.equal(item.name, entry.name); assert.equal(item.yearNote, entry.yearNote);
      assert.equal(item.year, source.year); assert.equal(item.yearApprox, source.yearApprox);
      assert.equal(item.region, source.region);
      assert.equal(item.siteLatitude, null); assert.equal(item.siteLongitude, null);
      assert(item.sourceLinks.length >= 1 && item.sourceLinks.every(link => /^https:\/\//.test(link.url)), id);
      assert(item.searchAliases.includes(source.name) || item.name === source.name, id);
    }
    assert.match(translations.sites.jp_sofukuji_daiou.yearNote, /1681/);
    assert.match(translations.sites.jp_urakuen_joan.yearNote, /1972/);
  }
});

test('all 52 real originals bind actual prompts and default-approved transparent deliveries', requiresLocalAssets, () => {
  const queue = json('assets/color-research/queue.json');
  const manifest = json('assets/color-research/avif-manifest.json');
  assert.equal(queue.count, queue.entries.length);
  assert.equal(new Set([...queue.entries.map(entry => entry.id), ...queue.excluded]).size, SITES.length);
  for (const job of batch.jobs) {
    const id = job.id, line = json(`assets/research/${id}.json`), color = json(`assets/color-research/${id}.json`);
    assert.equal(job.calls.length, 2);
    assert.deepEqual(job.calls.map(call => call.phase), ['line', 'color']);
    for (const call of job.calls) { assert.equal(call.status, 'received'); assert.equal(call.attempt, 1); assert(call.prompt && call.original_file); assert.equal(hash(call.retained_file), call.sourceSha256); }
    assert.equal(line.prompt, job.calls[0].prompt); assert.equal(color.prompt, job.calls[1].prompt);
    assert.equal(line.status, 'complete'); assert.equal(color.status, 'complete');
    assert.equal(line.review.inputs_viewed, true); assert.equal(line.review.output_viewed, true);
    assert.equal(color.visual_review.inputs_viewed, true); assert.equal(color.visual_review.output_viewed, true);
    assert.equal(line.background_preparation.sourceSha256, hash(line.generated_file));
    assert.equal(color.background_preparation.sourceSha256, hash(color.output));
    assert.equal(line.user_review.status, 'approved_default'); assert.equal(color.user_review.status, 'approved_default');
    const delivery = manifest.images[id];
    assert.equal(delivery.sourceSha256, hash(color.output));
    assert.equal(delivery.sha256, hash(`assets/colored-transparent-avif/${id}.avif`));
    assert.equal(delivery.alpha.min, 0); assert.equal(delivery.alpha.max, 255);
    assert.equal(delivery.visualReview, 'approved_default');
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
  }
});
