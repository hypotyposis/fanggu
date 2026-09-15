/* Stable detail URLs and per-history-entry atlas state. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FangguNavigation = factory();
})(typeof globalThis === 'object' ? globalThis : this, () => {
  'use strict';
  const detailURL = id => `detail.html?id=${encodeURIComponent(id)}`;
  function legacyDetail(hash, sites) {
    let id;
    try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch { return null; }
    return sites.some(site => site.id === id) ? detailURL(id) : null;
  }
  function readView(state, hash, count) {
    const view = state?.fangguView;
    if (view?.version !== 1 || view.hash !== hash || !view.filters) return null;
    const filters = {};
    for (const key of ['country', 'dynasty', 'region', 'province', 'type']) filters[key] = typeof view.filters[key] === 'string' ? view.filters[key] : 'all';
    filters.query = typeof view.filters.query === 'string' ? view.filters.query.slice(0, 120) : '';
    filters.status = ['all', 'wishlist', 'visited', 'unvisited'].includes(view.filters.status) ? view.filters.status : 'all';
    const position = value => Number.isFinite(value) ? Math.max(0, value) : 0;
    return { filters, limit: Math.min(Math.ceil(count / 12) * 12, Math.max(12, Number.isInteger(view.limit) ? view.limit : 12)),
      x: position(view.x), y: position(view.y), timelineX: position(view.timelineX),
      anchor: view.anchor && /^[a-z0-9_-]+$/.test(view.anchor.id) && Number.isFinite(view.anchor.top) ? view.anchor : null,
      focus: typeof view.focus === 'string' ? view.focus : '' };
  }
  function canReturn(referrer, currentURL, historyLength) {
    if (!referrer || historyLength < 2) return false;
    try {
      const from = new URL(referrer), index = new URL('index.html', currentURL);
      return from.origin === index.origin && [index.pathname, index.pathname.replace(/index\.html$/, '')].includes(from.pathname);
    } catch { return false; }
  }
  return { detailURL, legacyDetail, readView, canReturn };
});
