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
const { sites, places, dynasties, colors, types } = vm.runInContext(
  '({sites:FangguCatalog.classify(SITES,PLACES),places:PLACES,dynasties:DYN,colors:COLORED_PLATES,types:FangguCatalog.types})', context
);
const placeByKey = new Map(places.map(place => [place.key, place]));
const css = fs.readFileSync(path.join(root, 'style.css'), 'utf8');
const palette = Object.fromEntries([...css.matchAll(/(--[\w-]+):\s*(#[\da-f]{6})\s*;/gi)].map(match => [match[1], match[2]]));
const protectionSources = vm.runInContext('FangguProtection.sources', context);
// These spans mirror the bands in timeline.js where DYN does not define a range.
const timelineSpans = {
  han: [25, 220], goguryeo: [37, 668], bei: [386, 534], nan: [420, 589],
  beiqi: [550, 577], sui: [581, 618], tang: [618, 907], balhae: [698, 926],
  zhou: [907, 979], song: [960, 1279], liao: [907, 1234], yuan: [1271, 1368],
  ming: [1368, 1912], modern: [1912, 2026]
};
const text = value => String(value || '').replace(/<br\s*\/?\s*>/gi, '\n')
  .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").trim();
const output = sites.map(site => {
  const location = placeByKey.get(site.placeKey);
  const color = colors[site.id];
  if (!location || !site.image?.src || !color?.src) throw new Error(`Missing place or artwork: ${site.id}`);
  const token = dynasties[site.dyn].acc.match(/^var\((--[\w-]+)\)$/)?.[1];
  const dynastyColor = palette[token];
  if (!dynastyColor) throw new Error(`Missing dynasty color: ${site.id}`);
  const researchPath = path.join(root, `assets/research/${site.id}.json`);
  const research = fs.existsSync(researchPath) ? JSON.parse(fs.readFileSync(researchPath, 'utf8')) : {};
  const sourceLinks = [...(research.sources || []), ...(color.references || [])]
    .map((source, index) => ({ title: source.title || source.author || `参考图 ${index + 1}`, url: source.source_page || source.page || source.url }))
    .filter(source => /^https?:\/\//.test(source.url || ''))
    .filter((source, index, all) => all.findIndex(item => item.url === source.url) === index);
  return {
    id: site.id, name: site.name, short: site.short || '', sub: site.sub || '',
    dynasty: site.dyn, dynastyName: dynasties[site.dyn].name, dynastyGlyph: dynasties[site.dyn].glyph,
    dynastyStart: dynasties[site.dyn].start ?? timelineSpans[site.dyn]?.[0],
    dynastyEnd: dynasties[site.dyn].end ?? timelineSpans[site.dyn]?.[1],
    dynastyColor, timelineLane: site.timelineLane || '', tag: site.tag,
    era: site.era, year: site.year, yearLabel: site.yearLabel || '', yearApprox: !!site.yearApprox, yearNote: site.yearNote || '',
    place: site.place, placeKey: site.placeKey, placeName: location.name, country: site.country,
    province: site.province, region: site.region, latitude: location.lat, longitude: location.lon,
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
if (new Set(output.map(site => site.id)).size !== output.length) throw new Error('Duplicate site ID');
const destination = path.join(root, 'ios/Fanggu/Resources/catalog.json');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(output, null, 2) + '\n');
process.stdout.write(`Exported ${output.length} monuments to ${path.relative(root, destination)}\n`);
