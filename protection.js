/* National protection is editorial metadata, separate from personal and artwork reviews. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./protection-data.js'));
  else root.FangguProtection = factory(root.FangguProtectionData);
})(typeof globalThis === 'object' ? globalThis : this, data => {
  'use strict';
  const numerals = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  function batchLabel(batch) {
    if (!Number.isInteger(batch) || batch < 1 || batch > 99) throw new Error('无效国保批次');
    const name = batch < 10 ? numerals[batch] : (batch < 20 ? '' : numerals[Math.floor(batch / 10)]) + '十' + (batch % 10 ? numerals[batch % 10] : '');
    return `第${name}批国保`;
  }
  const forSite = id => data.japan.entries[id] || data.entries[id] || [];
  const sources = { ...data.sources, ...data.japan.sources };
  const japaneseLabel = entry => entry.designation === 'national_treasure' ? '日本国宝' : '日本重要文化财';
  function badges(id) {
    const seen = new Set();
    return forSite(id).map(entry => {
      const label = entry.system === 'JP' ? japaneseLabel(entry) : batchLabel(entry.batch) + (entry.badgeScope ? ` · ${entry.badgeScope}` : '') + (entry.relation === 'merged' ? '（并入）' : '');
      return { label, title: `${entry.system === 'JP' ? japaneseLabel(entry) : data.level} · ${entry.unitName} · ${entry.scope}` };
    }).filter(badge => { if (seen.has(badge.label)) return false; seen.add(badge.label); return true; });
  }
  function searchText(id) {
    return forSite(id).map(entry => (entry.system === 'JP'
      ? [japaneseLabel(entry), entry.designation === 'national_treasure' ? '国宝 National Treasure' : '重要文化財 Important Cultural Property', entry.unitName, entry.scope]
      : [data.level, '国保', batchLabel(entry.batch), `第${entry.batch}批国保`, entry.unitName, entry.scope]).join(' ')).join(' ');
  }
  return { forSite, badges, batchLabel, searchText, sources, checkedAt: data.checkedAt, level: data.level };
});
