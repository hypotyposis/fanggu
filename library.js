/* Curated sites and browser-local journals; v1 personal entries remain recoverable. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FangguLibrary = factory();
})(typeof globalThis === 'object' ? globalThis : this, () => {
  'use strict';
  const KEY = 'fanggu.library.v1';
  const STATUSES = ['unvisited', 'wishlist', 'visited'];
  const REVIEW_LIMIT = 500;
  const DYNASTIES = ['han', 'bei', 'tang', 'zhou', 'song', 'liao', 'yuan', 'ming', 'modern', 'unknown'];
  const clone = value => JSON.parse(JSON.stringify(value));
  const empty = () => ({ version: 3, customSites: [], records: {}, links: {}, reviews: {} });
  const emptyReview = () => ({ rating: null, text: '', updatedAt: '' });
  const plain = value => value && typeof value === 'object' && !Array.isArray(value);
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
  const cleanText = (value, max, label, required = false) => {
    if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(`${label}格式不正确`);
    return value.trim();
  };
  const normalized = value => value.replace(/[\s·，,。／/－—-]/g, '').toLowerCase();
  function validDate(value) {
    if (!value) return true;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value > today()) return false;
    const date = new Date(value + 'T12:00:00Z');
    return Number.isFinite(date.getTime()) && date.toISOString().slice(0, 10) === value;
  }
  function create(catalog, storage) {
    const baseIds = new Set(catalog.map(site => site.id));
    let state = empty(), loadError = '';
    const defaults = id => ({ status: catalog.find(site => site.id === id)?.initialStatus || 'unvisited', visitedOn: '', note: '' });
    function validate(input) {
      if (!plain(input) || ![1, 2, 3].includes(input.version) || !Array.isArray(input.customSites) || !plain(input.records) || (input.version >= 2 && !plain(input.links)) || (input.version === 3 && !plain(input.reviews))) throw new Error('这不是可识别的访古备份');
      if (input.customSites.length > 2000 || Object.keys(input.records).length > 5000 || Object.keys(input.reviews || {}).length > 5000) throw new Error('备份条目过多');
      const ids = new Set(baseIds), next = empty();
      next.customSites = input.customSites.map(site => {
        if (!plain(site) || !/^personal-[a-z0-9-]{6,80}$/.test(site.id) || ids.has(site.id) || !DYNASTIES.includes(site.dyn)) throw new Error('备份中的古迹信息不完整或重复');
        ids.add(site.id);
        return { id: site.id, name: cleanText(site.name, 80, '古迹名称', true), place: cleanText(site.place, 120, '地点', true), dyn: site.dyn, description: cleanText(site.description || '', 1000, '心愿备注'), custom: true };
      });
      for (const [id, record] of Object.entries(input.records)) {
        if (!ids.has(id) || !plain(record) || !STATUSES.includes(record.status)) throw new Error('备份中的打卡状态无法识别');
        const visitedOn = cleanText(record.visitedOn || '', 10, '到访日期');
        if (!validDate(visitedOn)) throw new Error('到访日期应为有效日期，且不晚于今天');
        next.records[id] = { status: record.status, visitedOn, note: cleanText(record.note || '', 12000, '笔记') };
      }
      for (const [id, target] of Object.entries(input.links || {})) {
        if (!next.customSites.some(site => site.id === id) || !baseIds.has(target) || !next.records[target]) throw new Error('备份中的古迹关联无法识别');
        next.links[id] = target;
      }
      for (const [id, review] of Object.entries(input.version === 3 ? input.reviews : {})) {
        if (!baseIds.has(id) || !plain(review)) throw new Error('备份中的评价无法关联古迹');
        if (review.rating !== null && (!Number.isInteger(review.rating) || review.rating < 1 || review.rating > 5)) throw new Error('评分应为 1–5 星，或留空');
        if (typeof review.updatedAt !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(review.updatedAt) || !Number.isFinite(Date.parse(review.updatedAt)) || new Date(review.updatedAt).toISOString() !== review.updatedAt) throw new Error('评价修改时间格式不正确');
        next.reviews[id] = { rating: review.rating, text: cleanText(review.text, REVIEW_LIMIT, '短评'), updatedAt: review.updatedAt };
      }
      return next;
    }
    function link(next, id, target) {
      const site = next.customSites.find(item => item.id === id);
      if (!site || !baseIds.has(target) || next.links[id]) throw new Error('这条旧记录无法关联');
      const current = next.records[target] || defaults(target), old = next.records[id] || { status: 'wishlist', visitedOn: '', note: '' };
      const note = [...new Set([current.note, old.note, site.description].filter(Boolean))].join('\n\n');
      next.records[target] = { status: STATUSES[Math.max(STATUSES.indexOf(current.status), STATUSES.indexOf(old.status))], visitedOn: current.visitedOn || old.visitedOn, note };
      next.links[id] = target;
    }
    function migrate(next) {
      for (const old of next.customSites) {
        if (next.links[old.id]) continue;
        const matches = catalog.filter(site => {
          const names = [site.name, ...(site.legacyNames || [])].map(normalized);
          const places = (site.legacyPlaces || [site.place]).filter(Boolean).map(normalized);
          const place = normalized(old.place);
          return names.includes(normalized(old.name)) && places.some(p => p.includes(place) || place.includes(p));
        });
        if (matches.length === 1) link(next, old.id, matches[0].id);
      }
      return next;
    }
    function read() {
      const raw = storage.getItem(KEY);
      if (!raw) return empty();
      try { return validate(migrate(validate(JSON.parse(raw)))); }
      catch { throw new Error('已有记录无法读取，原数据已保留。请先导出原始备份，再恢复有效备份。'); }
    }
    try { state = read(); } catch (error) { loadError = error.message || '当前浏览器无法读取记录'; }
    function commit(change, recovery = false) {
      if (loadError && !recovery) throw new Error(loadError);
      const next = recovery ? clone(state) : read();
      change(next);
      const valid = validate(migrate(next));
      try { storage.setItem(KEY, JSON.stringify(valid)); }
      catch { throw new Error('未能保存，请检查浏览器存储空间或设置。原记录没有改变。'); }
      state = valid; loadError = '';
    }
    function record(id) { return clone(state.records[id] || defaults(id)); }
    function review(id) { return clone(state.reviews[id] || emptyReview()); }
    function all() { return catalog.map(site => ({ ...site, record: record(site.id) })); }
    function requireSite(id) { if (!baseIds.has(id)) throw new Error('请从古迹库中选择'); }
    return {
      all, record, review, today, error: () => loadError,
      legacy: () => state.customSites.filter(site => !state.links[site.id]).map(site => ({ ...site, record: record(site.id) })),
      linkLegacy(id, target) { commit(next => link(next, id, target)); },
      setRecord(id, value) { requireSite(id); commit(next => { next.records[id] = value; }); },
      setReview(id, value) {
        requireSite(id);
        if (!plain(value)) throw new Error('评价格式不正确');
        commit(next => { next.reviews[id] = { rating: value.rating, text: value.text, updatedAt: new Date().toISOString() }; });
      },
      checkIn(id) {
        requireSite(id);
        commit(next => {
          const current = next.records[id] || defaults(id);
          if (current.status !== 'visited') next.records[id] = { ...current, status: 'visited', visitedOn: today() };
        });
      },
      setStatus(id, status) { requireSite(id); commit(next => { next.records[id] = { ...(next.records[id] || defaults(id)), status }; }); },
      export() {
        // Corrupt bytes and unmatched legacy entries remain available in backups.
        if (loadError) return storage.getItem(KEY) || JSON.stringify(state, null, 2);
        state = read();
        return JSON.stringify({ ...state, exportedAt: new Date().toISOString() }, null, 2);
      },
      parseBackup(text) {
        if (typeof text !== 'string' || text.length > 2_000_000) throw new Error('请选择小于 2 MB 的访古 JSON 备份');
        let input; try { input = JSON.parse(text); } catch { throw new Error('备份不是有效的 JSON 文件'); }
        return validate(input);
      },
      import(text) {
        const imported = this.parseBackup(text);
        commit(next => {
          for (const site of imported.customSites) {
            const existing = next.customSites.find(item => item.id === site.id);
            if (existing) Object.assign(existing, site); else next.customSites.push(site);
          }
          Object.assign(next.records, imported.records);
          Object.assign(next.links, imported.links);
          Object.assign(next.reviews, imported.reviews);
        }, !!loadError);
      },
      refresh() { try { state = read(); loadError = ''; } catch (error) { loadError = error.message; } },
    };
  }
  return { KEY, REVIEW_LIMIT, create, today, validDate };
});
