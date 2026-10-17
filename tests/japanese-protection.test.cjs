const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const protection = require('../protection.js');
const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));

test('Japanese designations use their own system and never acquire a Chinese batch', () => {
  assert.equal(protection.forSite('horyuji')[0]?.designation, 'national_treasure');
  assert.equal(protection.forSite('jp_osaka_sengan')[0]?.designation, 'important_cultural_property');
  assert.deepEqual(protection.badges('horyuji').map(item => item.label), ['日本国宝']);
  assert.deepEqual(protection.badges('jp_osaka_sengan').map(item => item.label), ['日本重要文化财']);
  assert(!protection.searchText('horyuji').includes('国保'));
  assert(protection.searchText('jp_osaka_sengan').includes('重要文化財'));
  assert.deepEqual(protection.badges('foguang').map(item => item.label), ['第一批国保']);
});

test('every Japanese subject has a sourced designation or an explicit reason for no badge', () => {
  const data = read('assets/research/japanese-protection.json');
  const catalog = read('ios/Fanggu/Resources/catalog.json');
  const japanese = catalog.filter(site => site.country === 'JP');
  assert.deepEqual(require('../protection-data.js').japan, data);
  execFileSync(process.execPath, [path.join(root, 'scripts/prepare-protection.mjs'), '--check']);
  assert.deepEqual(Object.keys({...data.entries, ...data.untagged}).sort(), japanese.map(site => site.id).sort());
  for (const site of japanese) {
    const entries = data.entries[site.id];
    assert.equal(site.protection.length, entries?.length || 0, site.id);
    if (!entries) { assert(data.untagged[site.id].reason); continue; }
    assert(!data.untagged[site.id]);
    for (const [index, entry] of entries.entries()) {
      assert(['national_treasure', 'important_cultural_property'].includes(entry.designation), site.id);
      assert.equal(entry.system, 'JP');
      assert.equal(entry.batch, null);
      const source = data.sources[entry.source];
      assert(new URL(source.url).hostname.endsWith('.bunka.go.jp'), site.id);
      assert.match(source.retrievedSha256, /^[a-f0-9]{64}$/);
      assert(entry.unitName && entry.scope && entry.locator && entry.designatedOn);
      assert.equal(site.protection[index].sourceURL, source.url);
      assert.equal(site.protection[index].designation, entry.designation);
    }
  }
});

test('reconstructed buildings, imperial buildings and gardens do not inherit building designations', () => {
  for (const id of ['jp_kinkaku', 'jp_sensoji', 'jp_katsura_koshoin', 'jp_gosho_shishinden',
    'jp_ryoanji_garden', 'jp_tenryuji_garden', 'jp_saihoji_garden']) {
    assert.deepEqual(protection.forSite(id), [], id);
  }
  // The 2024 promotion must replace the old Important Cultural Property title.
  assert.equal(protection.forSite('jp_manpukuji_daiou')[0].designation, 'national_treasure');
  assert.equal(protection.forSite('jp_furui_house')[0].designation, 'national_treasure');
  assert.equal(protection.forSite('jp_furui_house')[0].designatedOn, '2026-09-04');
  assert.equal(protection.badges('jp_manpukuji_daiou').length, 1);
  assert.equal(protection.forSite('jp_saimyoji_pagoda')[0].designation, 'national_treasure');
  assert.equal(protection.forSite('jp_senshuji_mieido')[0].designation, 'national_treasure');
});
