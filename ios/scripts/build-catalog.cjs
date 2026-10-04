#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const context = vm.createContext({});
for (const filename of ['sites.js', 'plates.js', 'colored-plates.js', 'protection-data.js', 'protection.js', 'catalog.js']) {
  if (!fs.existsSync(path.join(root, filename))) continue;
  vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, { filename });
}
const { sites, places, dynasties, colors, types, countries, regions } = vm.runInContext(
  '({sites:FangguCatalog.classify(SITES,PLACES),places:PLACES,dynasties:DYN,colors:COLORED_PLATES,types:FangguCatalog.types,countries:FangguCatalog.countries,regions:FangguCatalog.regions})', context
);
const placeByKey = new Map(places.map(place => [place.key, place]));
const css = fs.readFileSync(path.join(root, 'palette.css'), 'utf8');
const palette = Object.fromEntries([...css.matchAll(/(--[\w-]+):\s*(#[\da-f]{6})\s*;/gi)].map(match => [match[1], match[2]]));
const protectionSources = vm.runInContext('FangguProtection.sources', context);
// Fallback spans for older catalogue periods without an explicit DYN range.
const timelineSpans = {
  han: [25, 220], goguryeo: [37, 668], bei: [386, 534], nan: [420, 589],
  beiqi: [550, 577], sui: [581, 618], tang: [618, 907], balhae: [698, 926],
  zhou: [907, 979], song: [960, 1279], liao: [907, 1234], yuan: [1271, 1368],
  ming: [1368, 1912], modern: [1912, 2026]
};
// Translations live in i18n/<language>.json. Missing entries fall back to the Chinese source.
const languages = ['en', 'ja'];
const referenceTitle = { 'zh-Hans': n => `参考图 ${n}`, en: n => `Reference image ${n}`, ja: n => `参考画像 ${n}` };
const translations = Object.fromEntries(languages.map(language => {
  const file = path.join(root, 'i18n', `${language}.json`);
  const data = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
  return [language, { terms: data.terms || {}, sites: data.sites || {} }];
}));
const text = value => String(value || '').replace(/<br\s*\/?\s*>/gi, '\n')
  .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").trim();
const base = sites.map(site => {
  const location = placeByKey.get(site.placeKey);
  const color = colors[site.id];
  if (!location || !site.image?.src || !color?.src) throw new Error(`Missing place or artwork: ${site.id}`);
  const token = dynasties[site.dyn].acc.match(/^var\((--[\w-]+)\)$/)?.[1];
  const dynastyColor = palette[token];
  if (!dynastyColor) throw new Error(`Missing dynasty color: ${site.id}`);
  const researchPath = path.join(root, `assets/research/${site.id}.json`);
  const research = fs.existsSync(researchPath) ? JSON.parse(fs.readFileSync(researchPath, 'utf8')) : {};
  const sourceLinks = [...(research.sources || []), ...(color.references || [])]
    .map((source, index) => ({ title: source.title || source.author || '', index: index + 1, url: source.source_page || source.page || source.url }))
    .filter(source => /^https?:\/\//.test(source.url || ''))
    .filter((source, index, all) => all.findIndex(item => item.url === source.url) === index);
  return {
    id: site.id, name: site.name, short: site.short || '', sub: site.sub || '',
    dynasty: site.dyn, dynastyName: dynasties[site.dyn].name, dynastyGlyph: dynasties[site.dyn].glyph,
    dynastyStart: dynasties[site.dyn].start ?? timelineSpans[site.dyn]?.[0],
    dynastyEnd: dynasties[site.dyn].end ?? timelineSpans[site.dyn]?.[1],
    dynastyColor, timelineLane: site.timelineLane || '', tag: site.tag,
    era: site.era, year: site.year, yearLabel: site.yearLabel || '', yearApprox: !!site.yearApprox, yearNote: site.yearNote || '',
    place: site.place, placeKey: site.placeKey, placeName: location.name,
    country: site.country, countryName: countries[site.country],
    province: site.province, provinceName: site.province,
    region: site.region, regionName: regions[site.region].name,
    latitude: location.lat, longitude: location.lon,
    types: site.types, typeNames: site.types.map(type => types[type]),
    lede: text(site.lede), facts: site.facts.map(text), quote: text(site.quote),
    captions: site.image.caption || site.caption || [],
    lineImage: path.basename(site.image.src), colorImage: path.basename(color.src),
    initialStatus: site.initialStatus || 'unvisited',
    legacyNames: site.legacyNames || [], legacyPlaces: site.legacyPlaces || [],
    sourceURL: color.references?.find(ref => ref.page)?.page || '', sourceLinks,
    protection: site.protection.map(entry => ({
      batch: entry.batch, unitName: entry.unitName, relation: entry.relation,
      scope: entry.scope, locator: entry.locator, note: entry.note || '',
      sourceTitle: protectionSources[entry.source]?.title || '',
      sourceURL: protectionSources[entry.source]?.url || ''
    }))
  };
});
if (new Set(base.map(site => site.id)).size !== base.length) throw new Error('Duplicate site ID');

const textFields = ['name', 'short', 'sub', 'era', 'yearLabel', 'yearNote', 'place', 'lede', 'quote'];
const listFields = ['facts', 'captions'];
function localize(site, language) {
  if (language === 'zh-Hans') return site;
  const { terms, sites: entries } = translations[language];
  const entry = entries[site.id] || {};
  const term = (group, key, fallback) => terms[group]?.[key] || fallback;
  const localized = { ...site };
  for (const field of textFields) if (site[field] && entry[field]) localized[field] = entry[field];
  for (const field of listFields) {
    // Each fact or caption must keep its position; a partial list would mislabel the plate.
    if (Array.isArray(entry[field]) && entry[field].length === site[field].length) localized[field] = entry[field];
  }
  localized.placeName = term('places', site.placeKey, site.placeName);
  localized.provinceName = term('provinces', site.province, site.provinceName);
  localized.countryName = term('countries', site.country, site.countryName);
  localized.regionName = term('regions', site.region, site.regionName);
  localized.dynastyName = term('dynasties', site.dynasty, site.dynastyName);
  localized.typeNames = site.types.map((type, index) => term('types', type, site.typeNames[index]));
  localized.protection = site.protection.map((item, index) => {
    const translated = Array.isArray(entry.protection) && entry.protection.length === site.protection.length ? entry.protection[index] : {};
    return {
      ...item,
      unitName: translated.unitName || item.unitName,
      scope: item.scope && translated.scope || item.scope,
      note: item.note && translated.note || item.note,
      sourceTitle: term('protectionSources', item.sourceTitle, item.sourceTitle)
    };
  });
  return localized;
}

const catalogs = Object.fromEntries(['zh-Hans', ...languages].map(language => [language, base.map(site => localize(site, language))]));
// Any language's name for a monument also finds it in every other language.
for (const [language, catalog] of Object.entries(catalogs)) {
  catalog.forEach((site, index) => {
    const others = Object.entries(catalogs).filter(([other]) => other !== language).map(([, list]) => list[index]);
    const own = new Set([site.name, site.short, site.place, site.placeName, site.provinceName]);
    const aliases = others.flatMap(other => [other.name, other.short, other.place, other.placeName, other.provinceName]);
    site.searchAliases = [...new Set(aliases.filter(alias => alias && !own.has(alias)))];
  });
}
const destination = path.join(root, 'ios/Fanggu/Resources');
fs.mkdirSync(destination, { recursive: true });
for (const [language, catalog] of Object.entries(catalogs)) {
  const output = catalog.map(site => ({
    ...site,
    sourceLinks: site.sourceLinks.map(({ title, index, url }) => ({ title: title || referenceTitle[language](index), url }))
  }));
  const filename = language === 'zh-Hans' ? 'catalog.json' : `catalog-${language}.json`;
  fs.writeFileSync(path.join(destination, filename), JSON.stringify(output, null, 2) + '\n');
}
const coverage = languages.map(language => {
  const missing = base.filter(site => !translations[language].sites[site.id]).map(site => site.id);
  if (missing.length) process.stderr.write(`Untranslated (${language}, shown in Chinese): ${missing.join(', ')}\n`);
  return `${language} ${base.length - missing.length}/${base.length}`;
});
process.stdout.write(`Exported ${base.length} monuments to ${path.relative(root, destination)} (translated: ${coverage.join(', ')})\n`);
