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

test('iOS curations export matches the source lists', () => {
  const exported = JSON.parse(read('ios/Fanggu/Resources/curations.json'));
  assert.equal(exported.length, curations.length);
  for (const [index, list] of curations.entries()) {
    const native = exported[index];
    assert.equal(native.id, list.id);
    assert.equal(native.kind, list.kind);
    assert.equal(native.kindName, kinds[list.kind]);
    assert.equal(native.name, list.name);
    assert.equal(native.lede, list.lede);
    assert.deepEqual(native.items, list.items);
    for (const id of native.items) assert.ok(siteIDs.has(id), `${list.id}: ${id}`);
  }
});
