const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { createHash } = require('node:crypto');
const facets = require('../catalog.js');
const { create } = require('../library.js');
const timeline = require('../timeline.js');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const json = file => JSON.parse(read(file));
const hash = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
const { SITES, PLACES, DYN, CHAPTERS } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES,DYN,CHAPTERS})');
const colors = vm.runInNewContext(read('colored-plates.js') + '\nCOLORED_PLATES');
const ids = ['nx_108towers', 'nx_xixialing', 'nx_xumishan'];
const catalog = facets.classify(SITES, PLACES);

test('Ningxia covers three distinct subjects with searchable northwestern geography', () => {
  const library = create(catalog, { getItem: () => null, setItem() {} });
  const find = filters => Array.from(library.all().filter(site => facets.matches(site, filters)), site => site.id).sort();
  assert.deepEqual(find({ country: 'CN', region: 'northwest', province: '宁夏' }), ids);
  assert.deepEqual(find({ province: '宁夏', type: 'tomb', query: '西夏王陵' }), ['nx_xixialing']);
  assert.deepEqual(find({ province: '宁夏', dynasty: 'xixia', type: 'pagoda', query: '108塔' }), ['nx_108towers']);
  assert.deepEqual(find({ province: '宁夏', dynasty: 'tang', type: 'grotto' }), ['nx_xumishan']);
  assert(facets.provinces(catalog, 'northwest', 'CN').includes('宁夏'));
});

test('Xixia remains separate from Song while partial subjects and approximate dating are explicit', () => {
  assert(CHAPTERS.some(chapter => chapter.key === 'xixia'));
  assert.notEqual(DYN.xixia.acc, DYN.song.acc);
  assert.equal(DYN.xixia.start, 1038); assert.equal(DYN.xixia.end, 1227);
  const groups = timeline.clusters(SITES, DYN);
  assert.deepEqual(Array.from(timeline.select(SITES, { period: 'xixia' }, groups), site => site.id).sort(), ['gs_xixia_stele', ...ids.slice(0, 2)]);
  for (const id of ids) {
    const site = SITES.find(site => site.id === id);
    assert.equal(site.yearApprox, true); assert(site.yearNote);
  }
  assert.match(SITES.find(site => site.id === 'nx_108towers').caption[0], /七塔局部/);
  assert.match(SITES.find(site => site.id === 'nx_108towers').yearNote, /国保名录.*元/);
  assert.match(SITES.find(site => site.id === 'nx_xumishan').caption[0], /胸膝局部/);
  assert.equal(SITES.find(site => site.id === 'nx_xumishan').dyn, 'tang');
});

test('Ningxia starts unvisited without dates and preserves saved records through expansion and backup', () => {
  const memory = new Map(), storage = { getItem: key => memory.get(key) ?? null, setItem: (key, value) => memory.set(key, value) };
  const before = create(catalog.filter(site => !ids.includes(site.id)), storage);
  before.setRecord('foguang', { status: 'visited', visitedOn: '', note: '原有行记' });
  const expanded = create(catalog, storage);
  for (const id of ids) {
    assert.equal(expanded.record(id).status, 'unvisited'); assert.equal(expanded.record(id).visitedOn, '');
  }
  expanded.setRecord('nx_xumishan', { status: 'visited', visitedOn: '', note: '山谷大佛' });
  const reloaded = create(catalog, storage);
  assert.equal(reloaded.record('nx_xumishan').status, 'visited');
  assert.equal(reloaded.record('foguang').note, '原有行记');
  const restored = create(catalog, { getItem: () => null, setItem() {} });
  restored.import(reloaded.export());
  assert.equal(restored.record('nx_xumishan').note, '山谷大佛');
  assert.equal(restored.record('nx_xixialing').status, 'unvisited');
});

test('Ningxia white originals and deliveries are complete with explicit hash-bound user approval', () => {
  const queue = json('assets/color-research/queue.json'), delivery = json('assets/color-research/avif-manifest.json');
  assert.equal(queue.count, queue.entries.length);
  assert.deepEqual(Object.keys(colors).sort(), Array.from(SITES, site => site.id).sort());
  for (const id of ids) {
    const entry = queue.entries.filter(entry => entry.id === id);
    assert.equal(entry.length, 1);
    for (const folder of ['research', 'color-research']) {
      const meta = json(`assets/${folder}/${id}.json`);
      assert.equal(meta.status, 'complete');
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
      assert.equal(meta.background_preparation.sourceSha256, hash(folder === 'research' ? meta.generated_file : meta.output));
      for (const file of meta.reference_files || meta.input_images) assert(fs.existsSync(path.join(root, file)), file);
    }
    assert.equal(colors[id].visualReview, 'approved_user');
    const acceptance = delivery.images[id].review;
    assert.equal(acceptance.reviewer, 'user');
    assert.equal(acceptance.statement, '验收通过');
    assert.equal(acceptance.sourceSha256, hash(colors[id].originalSrc));
    assert.equal(acceptance.inputSha256, hash(colors[id].transparentSrc));
    assert.equal(acceptance.avifSha256, hash(colors[id].src));
    const colorReview = json(`assets/color-research/${id}.json`).visual_review;
    assert.equal(colorReview.status, 'approved_user');
    for (const field of ['reviewer', 'date', 'statement', 'sourceSha256', 'inputSha256', 'avifSha256']) {
      assert.equal(colorReview[field], acceptance[field]);
    }
    const lineReview = json(`assets/research/${id}.json`).user_review;
    assert.equal(lineReview.status, 'approved_user');
    assert.equal(lineReview.reviewer, 'user');
    assert.equal(lineReview.statement, acceptance.statement);
    assert.equal(lineReview.sourceSha256, hash(`assets/generated/${id}.png`));
    assert.equal(lineReview.lineSha256, hash(`assets/plates/${id}.png`));
    assert.equal(delivery.images[id].alpha.min, 0); assert.equal(delivery.images[id].alpha.max, 255);
    assert.equal(delivery.images[id].inputSha256, hash(colors[id].transparentSrc));
    assert.equal(delivery.images[id].sha256, hash(colors[id].src));
    assert.equal(delivery.images[id].extraction.interiorRgbUnchanged, true);
  }
});
