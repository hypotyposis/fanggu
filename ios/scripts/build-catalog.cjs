#!/usr/bin/env node
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '../..');
const context = vm.createContext({});
for (const filename of ['sites.js', 'plates.js', 'colored-plates.js', 'catalog.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, { filename });
}
const { sites, places, dynasties, colors, types } = vm.runInContext(
  '({sites:FangguCatalog.classify(SITES,PLACES),places:PLACES,dynasties:DYN,colors:COLORED_PLATES,types:FangguCatalog.types})', context
);
const placeByKey = new Map(places.map(place => [place.key, place]));
const text = value => String(value || '').replace(/<br\s*\/?\s*>/gi, '\n')
  .replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'").trim();
const output = sites.map(site => {
  const location = placeByKey.get(site.placeKey);
  const color = colors[site.id];
  if (!location || !site.image?.src || !color?.src) throw new Error(`Missing place or artwork: ${site.id}`);
  return {
    id: site.id, name: site.name, short: site.short || '', sub: site.sub || '',
    dynasty: site.dyn, dynastyName: dynasties[site.dyn].name, tag: site.tag,
    era: site.era, year: site.year, yearLabel: site.yearLabel || '', yearApprox: !!site.yearApprox,
    place: site.place, placeKey: site.placeKey, country: site.country,
    province: site.province, region: site.region, latitude: location.lat, longitude: location.lon,
    types: site.types, typeNames: site.types.map(type => types[type]),
    lede: text(site.lede), facts: site.facts.map(text), quote: text(site.quote),
    captions: site.image.caption || site.caption || [],
    lineImage: path.basename(site.image.src), colorImage: path.basename(color.src),
    initialStatus: site.initialStatus || 'unvisited',
    legacyNames: site.legacyNames || [], legacyPlaces: site.legacyPlaces || [],
    sourceURL: color.references?.find(ref => ref.page)?.page || ''
  };
});
if (new Set(output.map(site => site.id)).size !== output.length) throw new Error('Duplicate site ID');
const destination = path.join(root, 'ios/Fanggu/Resources/catalog.json');
fs.mkdirSync(path.dirname(destination), { recursive: true });
fs.writeFileSync(destination, JSON.stringify(output, null, 2) + '\n');
process.stdout.write(`Exported ${output.length} monuments to ${path.relative(root, destination)}\n`);
