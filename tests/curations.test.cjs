const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const { SITES } = vm.runInNewContext(read('sites.js') + '\n({SITES})');
const { kinds, curations, validate } = require('../curations.js');
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
      assert.deepEqual(native.items, list.items, `${language} ${list.id} must keep the same members in order`);
      assert.equal(native.kindName, terms.curationKinds?.[list.kind] || kinds[list.kind], `${language} ${list.id}.kindName`);
      for (const field of ['name', 'eyebrow', 'lede', 'note']) {
        assert.equal(native[field], (list[field] && entry[field]) || list[field], `${language} ${list.id}.${field} uses the translation or falls back to Chinese`);
      }
      for (const id of native.items) assert.ok(siteIDs.has(id), `${list.id}: ${id}`);
    }
  }
  const english = JSON.parse(read(exportFile('en')));
  assert.deepEqual(english.map(list => list.id), curations.map(list => list.id));
});
