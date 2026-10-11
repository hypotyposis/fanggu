const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { test, after } = require('node:test');

// English and Japanese translations are machine output that ships as it comes. A monument or list
// without a translation is shown in Chinese by the App, so coverage is reported, not required.
// Whatever translation exists must align with the Chinese source, and the glossary (terms) that
// labels filters, places and list kinds must be complete.
const root = path.resolve(__dirname, '..');
const read = file => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const base = read('ios/Fanggu/Resources/catalog.json');
const lists = read('ios/Fanggu/Resources/curations.json');
const languages = ['en', 'ja'];
const translations = Object.fromEntries(languages.map(language => [language, read(`i18n/${language}.json`)]));
const textFields = ['name', 'short', 'sub', 'era', 'yearLabel', 'yearNote', 'place', 'lede', 'quote'];
const listFields = ['facts', 'captions'];
const protectionFields = ['unitName', 'scope', 'note'];
const curationFields = ['name', 'eyebrow', 'lede', 'note'];
const han = /\p{Script=Han}/u;
// High-confidence simplified-only forms; Japanese text uses the shinjitai or traditional form instead.
const simplifiedOnly = /[这们为东门马长书车说贝见风鸟龙广实层庙图齐汉经阁乐县开关观觉记论设证译读贵资过还进远连选铁铜银钟镇间问阙陕顶须顺题飞驿鸡鹤龟访迹录评维愿]/u;
const script = {
  en: value => assert.doesNotMatch(value, han, 'English text must not contain Han characters'),
  ja: value => assert.doesNotMatch(value, simplifiedOnly, 'Japanese text must not use simplified-only forms')
};
const coverage = [];

test('the glossary covers every key the catalog and the curations use', () => {
  const groups = {
    countries: site => [site.country], regions: site => [site.region], types: site => site.types,
    dynasties: site => [site.dynasty], provinces: site => [site.province], places: site => [site.placeKey],
    protectionSources: site => site.protection.map(entry => entry.sourceTitle).filter(Boolean)
  };
  for (const language of languages) {
    const { terms } = translations[language];
    for (const [group, keys] of Object.entries(groups)) {
      for (const key of new Set(base.flatMap(keys))) assert.ok(terms[group]?.[key]?.trim(), `${language} terms.${group}.${key}`);
    }
    for (const list of lists) assert.ok(terms.curationKinds?.[list.kind]?.trim(), `${language} terms.curationKinds.${list.kind}`);
    for (const [group, entries] of Object.entries(terms)) {
      for (const [key, value] of Object.entries(entries)) {
        assert.ok(typeof value === 'string' && value.trim(), `${language} terms.${group}.${key} is empty`);
        script[language](value);
      }
    }
  }
});

test('monument translations that exist align with the Chinese source', () => {
  const ids = new Set(base.map(site => site.id));
  for (const language of languages) {
    const { sites } = translations[language];
    assert.deepEqual(Object.keys(sites).filter(id => !ids.has(id)), [], `${language} translations for unknown IDs`);
    let complete = 0, partial = 0;
    for (const site of base) {
      const entry = sites[site.id];
      if (!entry) continue;
      const allowed = new Set([...textFields, ...listFields, 'protection']);
      for (const key of Object.keys(entry)) assert.ok(allowed.has(key), `${language} ${site.id}.${key} is not a translatable field`);
      let missing = 0;
      for (const field of textFields) {
        if (entry[field] === undefined) { if (site[field]) missing++; continue; }
        assert.ok(site[field], `${language} ${site.id}.${field} translates an empty source field`);
        assert.ok(typeof entry[field] === 'string' && entry[field].trim(), `${language} ${site.id}.${field} is empty`);
        script[language](entry[field]);
      }
      for (const field of listFields) {
        if (entry[field] === undefined) { if (site[field].length) missing++; continue; }
        assert.equal(entry[field].length, site[field].length, `${language} ${site.id}.${field} must keep every item in order`);
        for (const item of entry[field]) { assert.ok(item.trim(), `${language} ${site.id}.${field} has an empty item`); script[language](item); }
      }
      if (entry.protection === undefined) {
        if (site.protection.length) missing++;
      } else {
        assert.equal(entry.protection.length, site.protection.length, `${language} ${site.id}.protection must keep every entry in order`);
        site.protection.forEach((item, index) => {
          const translated = entry.protection[index];
          for (const field of protectionFields) {
            assert.equal(Boolean(translated[field]?.trim()), Boolean(item[field]), `${language} ${site.id}.protection[${index}].${field}`);
            if (translated[field]) script[language](translated[field]);
          }
        });
      }
      if (missing) partial++; else complete++;
    }
    coverage.push(`${language}: ${complete}/${base.length} monuments fully translated, ${partial} partial, ${base.length - complete - partial} shown in Chinese`);
  }
});

test('language catalogs keep every fixed field and fall back to Chinese where a translation is missing', () => {
  const fixed = ['id', 'dynasty', 'dynastyGlyph', 'dynastyColor', 'dynastyStart', 'dynastyEnd', 'timelineLane', 'tag', 'year',
    'yearApprox', 'placeKey', 'country', 'province', 'region', 'latitude', 'longitude', 'siteLatitude', 'siteLongitude',
    'siteCoordinateSource', 'types', 'lineImage', 'colorImage', 'initialStatus', 'legacyNames', 'legacyPlaces', 'sourceURL'];
  for (const language of languages) {
    const catalog = read(`ios/Fanggu/Resources/catalog-${language}.json`);
    const { terms, sites } = translations[language];
    assert.equal(catalog.length, base.length);
    catalog.forEach((site, index) => {
      const source = base[index];
      const entry = sites[source.id] || {};
      for (const key of fixed) assert.deepEqual(site[key], source[key], `${language} ${source.id}.${key}`);
      for (const field of textFields) {
        assert.equal(site[field], (source[field] && entry[field]) || source[field], `${language} ${source.id}.${field} must use the translation or the Chinese source`);
      }
      for (const field of listFields) {
        const translated = Array.isArray(entry[field]) && entry[field].length === source[field].length ? entry[field] : source[field];
        assert.deepEqual(site[field], translated, `${language} ${source.id}.${field}`);
      }
      assert.equal(site.placeName, terms.places[source.placeKey]);
      assert.equal(site.provinceName, terms.provinces[source.province]);
      assert.equal(site.countryName, terms.countries[source.country]);
      assert.equal(site.regionName, terms.regions[source.region]);
      assert.equal(site.dynastyName, terms.dynasties[source.dynasty]);
      assert.deepEqual(site.typeNames, source.types.map(type => terms.types[type]));
      assert.deepEqual(site.protection.map(item => [item.batch, item.relation, item.locator, item.sourceURL]),
        source.protection.map(item => [item.batch, item.relation, item.locator, item.sourceURL]));
      source.protection.forEach((item, position) => {
        const translated = Array.isArray(entry.protection) && entry.protection.length === source.protection.length ? entry.protection[position] : {};
        const exported = site.protection[position];
        assert.equal(exported.unitName, translated.unitName || item.unitName, `${language} ${source.id}.protection[${position}].unitName`);
        assert.equal(exported.scope, (item.scope && translated.scope) || item.scope, `${language} ${source.id}.protection[${position}].scope`);
        assert.equal(exported.note, (item.note && translated.note) || item.note, `${language} ${source.id}.protection[${position}].note`);
        assert.equal(exported.sourceTitle, terms.protectionSources[item.sourceTitle] || item.sourceTitle);
      });
      assert.deepEqual(site.sourceLinks.map(link => link.url), source.sourceLinks.map(link => link.url));
      assert.ok(site.searchAliases.includes(source.name) || site.name === source.name, `${language} ${source.id} keeps the Chinese name searchable`);
    });
  }
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
  const info = read('ios/Fanggu/InfoPlist.xcstrings').strings;
  for (const key of ['CFBundleDisplayName', 'NSLocationWhenInUseUsageDescription', 'NSLocationAlwaysAndWhenInUseUsageDescription', 'NSPhotoLibraryAddUsageDescription']) {
    assert.deepEqual(Object.keys(info[key]?.localizations || {}).sort(), ['en', 'ja', 'zh-Hans'], key);
  }
});

test('curation translations that exist align with the source', () => {
  for (const language of languages) {
    const { curations = {} } = translations[language];
    assert.deepEqual(Object.keys(curations).filter(id => !lists.some(list => list.id === id)), [], `${language} translations for unknown curations`);
    let complete = 0;
    for (const list of lists) {
      const entry = curations[list.id];
      if (!entry) continue;
      for (const key of Object.keys(entry)) assert.ok(curationFields.includes(key), `${language} curations.${list.id}.${key} is not a translatable field`);
      for (const field of curationFields) {
        if (entry[field] === undefined) continue;
        assert.ok(list[field], `${language} curations.${list.id}.${field} translates an empty source field`);
        assert.ok(typeof entry[field] === 'string' && entry[field].trim(), `${language} curations.${list.id}.${field} is empty`);
        script[language](entry[field]);
      }
      if (curationFields.every(field => !list[field] || entry[field])) complete++;
    }
    coverage.push(`${language}: ${complete}/${lists.length} curations fully translated`);
  }
});

after(() => { for (const line of coverage) console.log(`i18n coverage · ${line}`); });
