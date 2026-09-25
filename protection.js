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
  const forSite = id => data.entries[id] || [];
  function badges(id) {
    const seen = new Set();
    return forSite(id).map(entry => {
      const label = batchLabel(entry.batch) + (entry.badgeScope ? ` · ${entry.badgeScope}` : '') + (entry.relation === 'merged' ? '（并入）' : '');
      return { label, title: `${data.level} · ${entry.unitName} · ${entry.scope}` };
    }).filter(badge => { if (seen.has(badge.label)) return false; seen.add(badge.label); return true; });
  }
  function searchText(id) {
    return forSite(id).map(entry => [data.level, '国保', batchLabel(entry.batch), `第${entry.batch}批国保`, entry.unitName, entry.scope].join(' ')).join(' ');
  }
  return { forSite, badges, batchLabel, searchText, sources: data.sources, checkedAt: data.checkedAt, level: data.level };
});
