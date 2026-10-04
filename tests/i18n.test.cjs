const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const base = read('ios/Fanggu/Resources/catalog.json');
const languages = ['en', 'ja'];
const textFields = ['name', 'short', 'sub', 'era', 'yearLabel', 'yearNote', 'place', 'lede', 'quote'];
const listFields = ['facts', 'captions'];
const han = /\p{Script=Han}/u;
// High-confidence simplified-only forms; Japanese text uses the shinjitai or traditional form instead.
const simplifiedOnly = /[这们为东门马长书车说贝见风鸟龙广实层庙图齐汉经阁乐县开关观觉记论设证译读贵资过还进远连选铁铜银钟镇间问阙陕顶须顺题飞驿鸡鹤龟访迹录评维愿]/u;

test('every monument has complete English and Japanese translations aligned with the source', () => {
  const ids = new Set(base.map(site => site.id));
  for (const language of languages) {
    const { terms, sites } = read(`i18n/${language}.json`);
    const groups = {
      countries: site => [site.country], regions: site => [site.region], types: site => site.types,
      dynasties: site => [site.dynasty], provinces: site => [site.province], places: site => [site.placeKey],
      protectionSources: site => site.protection.map(entry => entry.sourceTitle).filter(Boolean)
    };
    for (const [group, keys] of Object.entries(groups)) {
      for (const key of new Set(base.flatMap(keys))) assert.ok(terms[group]?.[key]?.trim(), `${language} terms.${group}.${key}`);
    }
    assert.deepEqual(Object.keys(sites).filter(id => !ids.has(id)), [], `${language} translations for unknown IDs`);
    for (const site of base) {
      const entry = sites[site.id];
      assert.ok(entry, `${language} translation missing for ${site.id}`);
      const allowed = new Set([...textFields, ...listFields, 'protection']);
      for (const key of Object.keys(entry)) assert.ok(allowed.has(key), `${language} ${site.id}.${key} is not a translatable field`);
      for (const field of textFields) {
        assert.equal(Boolean(entry[field]?.trim()), Boolean(site[field]), `${language} ${site.id}.${field}`);
      }
      for (const field of listFields) {
        assert.equal(entry[field]?.length ?? 0, site[field].length, `${language} ${site.id}.${field} must keep every item in order`);
        for (const item of entry[field] || []) assert.ok(item.trim(), `${language} ${site.id}.${field} has an empty item`);
      }
      assert.equal(entry.protection?.length ?? 0, site.protection.length, `${language} ${site.id}.protection`);
      site.protection.forEach((item, index) => {
        const translated = entry.protection[index];
        assert.ok(translated.unitName?.trim() && translated.scope?.trim(), `${language} ${site.id}.protection[${index}]`);
        assert.equal(Boolean(translated.note?.trim()), Boolean(item.note), `${language} ${site.id}.protection[${index}].note`);
      });
    }
  }
});

test('language catalogs keep every key, image and record field of the Chinese catalog', () => {
  const fixed = ['id', 'dynasty', 'dynastyGlyph', 'dynastyColor', 'dynastyStart', 'dynastyEnd', 'timelineLane', 'tag', 'year',
    'yearApprox', 'placeKey', 'country', 'province', 'region', 'latitude', 'longitude', 'types', 'lineImage', 'colorImage',
    'initialStatus', 'legacyNames', 'legacyPlaces', 'sourceURL'];
  for (const language of languages) {
    const catalog = read(`ios/Fanggu/Resources/catalog-${language}.json`);
    assert.equal(catalog.length, base.length);
    catalog.forEach((site, index) => {
      const source = base[index];
      for (const key of fixed) assert.deepEqual(site[key], source[key], `${language} ${source.id}.${key}`);
      assert.deepEqual(site.protection.map(entry => [entry.batch, entry.relation, entry.locator, entry.sourceURL]),
        source.protection.map(entry => [entry.batch, entry.relation, entry.locator, entry.sourceURL]));
      assert.deepEqual(site.sourceLinks.map(link => link.url), source.sourceLinks.map(link => link.url));
      assert.equal(site.facts.length, source.facts.length);
      assert.ok(site.searchAliases.includes(source.name) || site.name === source.name, `${language} ${source.id} keeps the Chinese name searchable`);
    });
  }
});

test('translated display text uses the target script', () => {
  const english = read('ios/Fanggu/Resources/catalog-en.json');
  const japanese = read('ios/Fanggu/Resources/catalog-ja.json');
  const display = site => [site.name, site.short, site.sub, site.era, site.yearLabel, site.yearNote, site.place, site.placeName,
    site.provinceName, site.countryName, site.regionName, site.dynastyName, site.lede, site.quote, ...site.typeNames, ...site.facts,
    ...site.captions, ...site.protection.flatMap(entry => [entry.unitName, entry.scope, entry.note, entry.sourceTitle])].filter(Boolean);
  for (const site of english) for (const value of display(site)) assert.doesNotMatch(value, han, `en ${site.id}: ${value}`);
  for (const site of japanese) for (const value of display(site)) assert.doesNotMatch(value, simplifiedOnly, `ja ${site.id}: ${value}`);
});

test('every interface string has English and Japanese translations with matching placeholders', () => {
  const specifiers = text => [...text.matchAll(/%(?:(\d+)\$)?(lld|@|d)/g)]
    .map((match, index) => [Number(match[1] || index + 1), match[2]]).sort((a, b) => a[0] - b[0]).map(([, type]) => type);
  const values = localization => localization?.stringUnit ? [localization.stringUnit]
    : Object.values(localization?.variations?.plural || {}).map(variant => variant.stringUnit);
  const strings = read('ios/Fanggu/Localizable.xcstrings');
  assert.equal(strings.sourceLanguage, 'zh-Hans');
  for (const [key, entry] of Object.entries(strings.strings)) {
    for (const language of languages) {
      const units = values(entry.localizations?.[language]);
      assert.ok(units.length, `${language} missing for "${key}"`);
      for (const unit of units) {
        assert.equal(unit.state, 'translated', `${language} "${key}"`);
        assert.deepEqual(specifiers(unit.value.replace(/%%/g, '')), specifiers(key.replace(/%%/g, '')), `${language} placeholders for "${key}"`);
      }
    }
  }
  const info = read('ios/Fanggu/InfoPlist.xcstrings').strings.CFBundleDisplayName.localizations;
  assert.deepEqual(Object.keys(info).sort(), ['en', 'ja', 'zh-Hans']);
});
