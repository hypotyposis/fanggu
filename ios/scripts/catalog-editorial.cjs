'use strict';

const nonempty = value => typeof value === 'string' && value.trim().length > 0;
const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value);

// Validate before the exporter writes any language, so a broken editorial link cannot ship.
function validateEditorial(curations, recommendations = {}, sites) {
  const byID = new Map(sites.map(site => [site.id, site]));
  const monument = (id, label) => {
    const site = byID.get(id);
    if (!site || site.collectionOnly) throw new Error(`${label}: unknown or collection-only monument ${id}`);
  };
  if (!isRecord(recommendations)) throw new Error('Recommendations must be an object');
  for (const [sourceID, related] of Object.entries(recommendations)) {
    monument(sourceID, 'Recommendation source');
    if (!Array.isArray(related) || related.length < 2 || related.length > 3) {
      throw new Error(`Recommendations for ${sourceID} must contain 2–3 entries`);
    }
    const seen = new Set();
    for (const item of related) {
      if (!isRecord(item)) throw new Error(`Invalid recommendation for ${sourceID}`);
      monument(item.siteID, `Recommendation from ${sourceID}`);
      if (item.siteID === sourceID) throw new Error(`Self recommendation: ${sourceID}`);
      if (seen.has(item.siteID)) throw new Error(`Duplicate recommendation: ${sourceID} → ${item.siteID}`);
      seen.add(item.siteID);
      if (!['comparison', 'nearby'].includes(item.kind)) throw new Error(`Invalid recommendation kind: ${sourceID} → ${item.siteID}`);
      if (!nonempty(item.reason)) throw new Error(`Empty recommendation reason: ${sourceID} → ${item.siteID}`);
    }
  }
  for (const list of curations) {
    if (list.selectionReason === undefined && list.itemReasons === undefined) continue;
    if (!nonempty(list.selectionReason)) throw new Error(`Empty selection reason: ${list.id}`);
    if (!isRecord(list.itemReasons)) throw new Error(`Missing item reasons: ${list.id}`);
    for (const id of list.items) {
      if (!nonempty(list.itemReasons[id])) throw new Error(`Missing item reason: ${list.id}.${id}`);
    }
    for (const id of Object.keys(list.itemReasons)) {
      if (!list.items.includes(id)) throw new Error(`Unexpected item reason: ${list.id}.${id}`);
    }
  }
}

// A partial translation never drops a relationship or borrows another member's reason.
function localizeRelatedSites(related = [], translated = {}) {
  return related.map(({ siteID, kind, reason }) => ({
    siteID, kind, reason: nonempty(translated?.[siteID]) ? translated[siteID] : reason
  }));
}

function localizeCurationReasons(list, translated = {}) {
  const selectionReason = list.selectionReason || '';
  return {
    selectionReason: selectionReason && nonempty(translated.selectionReason) ? translated.selectionReason : selectionReason,
    itemReasons: Object.fromEntries(Object.entries(list.itemReasons || {}).map(([id, reason]) => [
      id, nonempty(translated.itemReasons?.[id]) ? translated.itemReasons[id] : reason
    ]))
  };
}

module.exports = { validateEditorial, localizeRelatedSites, localizeCurationReasons };
