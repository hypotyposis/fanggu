const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const os = require('node:os');
const { spawnSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const { SITES } = vm.runInNewContext(read('sites.js') + '\n({SITES})');
const { kinds, curations, recommendations = {}, validate } = require('../curations.js');
const { validateEditorial, localizeRelatedSites, localizeCurationReasons } = require('../ios/scripts/catalog-editorial.cjs');
const siteIDs = new Set(SITES.map(site => site.id));

test('curations only reference catalogued monuments and stay well formed', () => {
  assert.ok(curations.length >= 3);
  assert.deepEqual(validate(curations, siteIDs), curations);
  for (const list of curations) {
    assert.ok(kinds[list.kind], list.id);
    assert.ok(list.eyebrow && list.note, `${list.id} needs an eyebrow and a scope note`);
    for (const key of ['record', 'visitedOn', 'note_personal', 'reviews', 'initialStatus']) assert.ok(!Object.hasOwn(list, key), `${list.id}: personal data in curation`);
  }
  const byID = Object.fromEntries(SITES.map(site => [site.id, site]));
  assert.deepEqual(curations.find(list => list.id === 'zhuozhang_valley').items.map(id => byID[id].year),
    [...curations.find(list => list.id === 'zhuozhang_valley').items.map(id => byID[id].year)].sort((a, b) => a - b),
    'route members are listed chronologically');
});

test('editorial reasons and recommendations reference valid individual monuments', () => {
  assert.doesNotThrow(() => validateEditorial(curations, recommendations, SITES));
  const members = new Set();
  for (const id of ['tang_timber', 'liao_eight', 'zhuozhang_valley']) {
    const list = curations.find(list => list.id === id);
    assert.ok(list.selectionReason?.trim(), `${id} needs a selection reason`);
    assert.deepEqual(Object.keys(list.itemReasons).sort(), [...list.items].sort(), `${id} must explain every member`);
    list.items.forEach(member => members.add(member));
  }
  for (const id of members) assert.ok(recommendations[id]?.length >= 2, `${id} needs recommendations in the first release`);
});

const editorialSites = [{ id: 'a' }, { id: 'b' }, { id: 'c' }, { id: 'd' }, { id: 'old', collectionOnly: true }];
const relatedFixture = () => [
  { siteID: 'b', kind: 'comparison', reason: '比较柱网。' },
  { siteID: 'c', kind: 'nearby', reason: '同在河谷。' }
];
const curationFixture = () => ({ id: 'route', items: ['a', 'b'], selectionReason: '观察两种做法。', itemReasons: { a: '先看柱网。', b: '再看梁架。' } });

test('editorial validation rejects broken, duplicated and empty recommendations', () => {
  const check = recommendations => validateEditorial([], recommendations, editorialSites);
  for (const source of ['missing', 'old']) assert.throws(() => check({ [source]: relatedFixture() }), /unknown or collection-only/);
  for (const target of ['missing', 'old']) {
    const related = relatedFixture(); related[0].siteID = target;
    assert.throws(() => check({ a: related }), /unknown or collection-only/);
  }
  for (const related of [[], relatedFixture().slice(0, 1), [...relatedFixture(), ...relatedFixture()]]) {
    assert.throws(() => check({ a: related }), /2–3 entries/);
  }
  for (const [patch, message] of [
    [{ siteID: 'a' }, /Self recommendation/],
    [{ siteID: 'c' }, /Duplicate recommendation/],
    [{ kind: 'automatic' }, /Invalid recommendation kind/],
    [{ reason: '  ' }, /Empty recommendation reason/],
    [{ reason: 17 }, /Empty recommendation reason/]
  ]) {
    const related = relatedFixture(); Object.assign(related[0], patch);
    assert.throws(() => check({ a: related }), message);
  }
  assert.doesNotThrow(() => check({ a: [...relatedFixture(), { siteID: 'd', kind: 'comparison', reason: '第三种做法。' }] }));
});

test('curation reasons must cover every member without extra keys', () => {
  const check = list => validateEditorial([list], {}, editorialSites);
  assert.doesNotThrow(() => check(curationFixture()));
  assert.throws(() => check({ ...curationFixture(), selectionReason: ' ' }), /Empty selection reason/);
  assert.throws(() => check({ ...curationFixture(), itemReasons: undefined }), /Missing item reasons/);
  assert.throws(() => check({ ...curationFixture(), itemReasons: { a: '一' } }), /Missing item reason/);
  assert.throws(() => check({ ...curationFixture(), itemReasons: { a: '一', b: ' ' } }), /Missing item reason/);
  assert.throws(() => check({ ...curationFixture(), itemReasons: { a: '一', b: '二', c: '三' } }), /Unexpected item reason/);
});

test('old editorial data remains valid and partial translations fall back per relationship', () => {
  const oldList = { id: 'old-list', items: ['a', 'b'] };
  assert.doesNotThrow(() => validateEditorial([oldList], undefined, editorialSites));
  assert.deepEqual(localizeCurationReasons(oldList), { selectionReason: '', itemReasons: {} });
  assert.deepEqual(localizeRelatedSites(), []);
  const related = relatedFixture();
  const list = curationFixture();
  const before = JSON.stringify({ related, list });
  for (const translated of [{ b: 'Compare the columns.' }, { b: '柱の配置を比較。' }]) {
    assert.deepEqual(localizeRelatedSites(related, { ...translated, c: ' ', missing: 'Ignored' }), [
      { ...related[0], reason: translated.b }, related[1]
    ]);
  }
  assert.deepEqual(localizeCurationReasons(list, { itemReasons: { b: 'Compare the roof frame.', absent: 'Ignored' } }), {
    selectionReason: list.selectionReason, itemReasons: { a: list.itemReasons.a, b: 'Compare the roof frame.' }
  });
  assert.deepEqual(localizeCurationReasons(list, { selectionReason: 'Two approaches', itemReasons: { a: '' } }), {
    selectionReason: 'Two approaches', itemReasons: list.itemReasons
  });
  assert.equal(JSON.stringify({ related, list }), before, 'localization never mutates the Chinese source');
});

test('an invalid editorial reference fails the build before any catalog is written', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'fanggu-editorial-'));
  try {
    for (const file of ['sites.js', 'plates.js', 'colored-plates.js', 'protection-data.js', 'protection.js', 'catalog.js', 'curations.js',
      'ios/scripts/build-catalog.cjs', 'ios/scripts/catalog-editorial.cjs']) {
      const target = path.join(temporary, file);
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(path.join(root, file), target);
    }
    fs.appendFileSync(path.join(temporary, 'curations.js'), '\nFangguCurations.recommendations = { missing: [] };\n');
    const resources = path.join(temporary, 'ios/Fanggu/Resources');
    fs.mkdirSync(resources, { recursive: true });
    const filenames = ['catalog.json', 'catalog-en.json', 'catalog-ja.json', 'curations.json', 'curations-en.json', 'curations-ja.json'];
    for (const file of filenames) fs.writeFileSync(path.join(resources, file), `Existing ${file}`);
    const result = spawnSync(process.execPath, [path.join(temporary, 'ios/scripts/build-catalog.cjs')], { encoding: 'utf8' });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /Recommendation source: unknown or collection-only monument missing/);
    for (const file of filenames) assert.equal(fs.readFileSync(path.join(resources, file), 'utf8'), `Existing ${file}`);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('validate rejects unknown members, duplicates and invalid kinds', () => {
  const base = { id: 'x', kind: 'canon', name: 'n', lede: 'l', items: ['nanchan', 'foguang'] };
  assert.throws(() => validate([{ ...base, items: ['nanchan', 'no-such-site'] }], siteIDs), /未收录/);
  assert.throws(() => validate([{ ...base, items: ['nanchan', 'nanchan'] }], siteIDs), /重复/);
  assert.throws(() => validate([{ ...base, items: ['nanchan'] }], siteIDs), /两条/);
  assert.throws(() => validate([{ ...base, kind: 'playlist' }], siteIDs), /类型无效/);
  assert.throws(() => validate([base, base], siteIDs), /ID 重复/);
});

// Every language exports the same lists; names and copy come from i18n/<language>.json and fall
// back to the Chinese source when a translation is missing, so the App never shows an empty list.
const languages = ['zh-Hans', 'en', 'ja'];
const exportFile = language => `ios/Fanggu/Resources/curations${language === 'zh-Hans' ? '' : `-${language}`}.json`;
const translation = language => language === 'zh-Hans' ? { terms: {}, curations: {} } : JSON.parse(read(`i18n/${language}.json`));

test('iOS curations exports match the source lists in every language', () => {
  for (const language of languages) {
    const exported = JSON.parse(read(exportFile(language)));
    const { terms = {}, curations: translated = {} } = translation(language);
    assert.equal(exported.length, curations.length, language);
    for (const [index, list] of curations.entries()) {
      const native = exported[index];
      const entry = translated[list.id] || {};
      assert.equal(native.id, list.id, language);
      assert.equal(native.kind, list.kind, `${language} ${list.id}`);
      assert.equal(native.legacySiteID, list.legacySiteID || null, `${language} ${list.id}.legacySiteID`);
      assert.deepEqual(native.items, list.items, `${language} ${list.id} must keep the same members in order`);
      assert.equal(native.kindName, terms.curationKinds?.[list.kind] || kinds[list.kind], `${language} ${list.id}.kindName`);
      for (const field of ['name', 'eyebrow', 'lede', 'note']) {
        assert.equal(native[field], (list[field] && entry[field]) || list[field], `${language} ${list.id}.${field} uses the translation or falls back to Chinese`);
      }
      assert.deepEqual({ selectionReason: native.selectionReason, itemReasons: native.itemReasons },
        localizeCurationReasons(list, entry), `${language} ${list.id} editorial reasons`);
      for (const id of native.items) assert.ok(siteIDs.has(id), `${list.id}: ${id}`);
    }
  }
  const english = JSON.parse(read(exportFile('en')));
  assert.deepEqual(english.map(list => list.id), curations.map(list => list.id));
});

test('every language exports the same recommendation targets in editorial order', () => {
  for (const language of languages) {
    const catalog = JSON.parse(read(`ios/Fanggu/Resources/catalog${language === 'zh-Hans' ? '' : `-${language}`}.json`));
    const translated = translation(language).recommendations || {};
    for (const site of catalog) {
      assert.deepEqual(site.relatedSites, localizeRelatedSites(recommendations[site.id], translated[site.id]), `${language} ${site.id}`);
    }
  }
});

test('a building collection must identify its preserved original without including it as a member', () => {
  const base = { id: 'x', kind: 'collection', name: 'n', lede: 'l', items: ['nanchan', 'foguang'] };
  assert.throws(() => validate([base], siteIDs), /原集合/);
  assert.throws(() => validate([{ ...base, legacySiteID: 'missing' }], siteIDs), /原集合/);
  assert.throws(() => validate([{ ...base, legacySiteID: 'nanchan' }], siteIDs), /原集合/);
});
