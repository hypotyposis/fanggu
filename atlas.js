/* Catalogue, wishlist and check-ins. User-entered text is always rendered as text. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text != null) node.textContent = text; return node; };
  const catalog = FangguCatalog.classify(SITES, PLACES);
  const { library, statusNames, button, arrival, toast, open, formError } = FangguJournal.create(catalog, render);
  let filter = location.hash === '#wishlist' ? 'wishlist' : 'all', limit = 12;
  let backup = '', previousRecords = '';
  const facetIds = { country: 'atlas-country', dynasty: 'atlas-dynasty', region: 'atlas-region', province: 'atlas-province', type: 'atlas-type' };
  function filters() {
    return { status: filter, query: $('#atlas-search').value.trim(), ...Object.fromEntries(Object.entries(facetIds).map(([key, id]) => [key, $('#' + id).value])) };
  }
  function isNarrowed(values) { return !!values.query || Object.keys(facetIds).some(key => values[key] !== 'all'); }
  function options(id, allLabel, entries) {
    const select = $('#' + id), previous = select.value;
    select.replaceChildren(...[['all', allLabel], ...entries].map(([value, label]) => { const option = el('option', '', label); option.value = value; return option; }));
    select.value = [...select.options].some(option => option.value === previous) ? previous : 'all';
  }
  function provinceOptions() {
    const country = $('#atlas-country').value;
    options('atlas-province', country === 'JP' ? '全部都道府县' : country === 'CN' ? '全部省份' : '全部省份与府县', FangguCatalog.provinces(catalog, $('#atlas-region').value, country).map(province => [province, province]));
  }
  function countryOptions() {
    const country = $('#atlas-country').value;
    options('atlas-region', '全部地区', Object.entries(FangguCatalog.regions).filter(([key, area]) => (country === 'all' || (area.country || 'CN') === country) && catalog.some(site => site.region === key)).map(([key, area]) => [key, country === 'all' ? `${FangguCatalog.countries[area.country || 'CN']} · ${area.name}` : area.name]));
    options('atlas-dynasty', '全部时代', Object.entries(DYN).filter(([key, era]) => (country === 'all' || (era.country || 'CN') === country) && catalog.some(site => site.dyn === key)).map(([key, era]) => [key, era.name]));
    provinceOptions();
  }
  options('atlas-country', '全部国家', Object.entries(FangguCatalog.countries).filter(([key]) => catalog.some(site => site.country === key)));
  countryOptions();
  options('atlas-type', '全部类型', Object.entries(FangguCatalog.types).filter(([key]) => catalog.some(site => site.types.includes(key))));
  function card(site) {
    const { status, visitedOn, note } = site.record;
    const dynasty = DYN[site.dyn] || { acc: 'var(--paper-2)', name: '年代待考', glyph: '待' };
    const article = el('article', 'atlas-card'); article.dataset.id = site.id; article.style.setProperty('--acc', dynasty.acc);
    const visual = el('div', 'card-visual');
    const link = el('a', 'card-art'); link.href = FangguNavigation.detailURL(site.id); link.setAttribute('aria-label', `细读${site.name}`);
    const image = el('img'); FangguArtwork.apply(image, site, status); image.loading = 'lazy'; image.decoding = 'async';
    link.append(image); visual.append(link);
    if (status === 'visited') FangguVisit.mark(image);
    visual.append(el('span', 'visit-stamp ' + status, statusNames[status]));
    const body = el('div', 'card-body');
    const era = site.yearLabel || site.year;
    body.append(el('span', 'card-era mono', `${dynasty.name}${era && String(era) !== dynasty.name ? ' · ' + era : ''}`), el('h3', '', site.name), el('p', 'card-place', site.place));
    body.append(el('p', 'card-kind', site.types.map(type => FangguCatalog.types[type]).join(' · ')));
    const excerpt = note;
    if (excerpt) body.append(el('p', 'card-note', excerpt));
    if (status === 'visited') body.append(el('p', 'card-date mono', visitedOn ? `${visitedOn} 到访` : '已到访 · 日期未记'));
    const actions = el('div', 'card-actions');
    if (status === 'visited') actions.append(button('到访记录', 'visit', site.id));
    else if (status === 'wishlist') {
      actions.append(button('移出心愿单', 'unwish', site.id));
    } else {
      actions.append(button('加入心愿单', 'wish', site.id, 'card-button emphasized'));
    }
    { const read = el('a', 'card-read', '细读 ↗'); read.href = FangguNavigation.detailURL(site.id); actions.append(read); }
    if (status !== 'visited') body.append(arrival(site, image));
    body.append(actions); article.append(visual, body); return article;
  }
  function render() {
    const sites = library.all();
    const counts = { all: sites.length, wishlist: 0, visited: 0, unvisited: 0 };
    sites.forEach(s => { if (s.record.status === 'visited') counts.visited++; else counts.unvisited++; if (s.record.status === 'wishlist') counts.wishlist++; });
    Object.entries(counts).forEach(([key, value]) => { $('#count-' + key).textContent = value; });
    $('.collection-tabs').querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
    $('#hero-count').textContent = `${counts.all} 处收录 · ${counts.visited} 处已到访`;
    const values = filters(), narrowed = isNarrowed(values);
    const selected = sites.filter(site => FangguCatalog.matches(site, values));
    selected.sort((a, b) => (b.record.visitedOn || '').localeCompare(a.record.visitedOn || '') || a.year - b.year);
    $('#atlas-grid').replaceChildren(...selected.slice(0, limit).map(card));
    $('#atlas-result').textContent = `共 ${selected.length} 处${selected.length > limit ? ` · 已展 ${limit} 处` : ''}`;
    $('#atlas-reset').hidden = !narrowed;
    $('#atlas-more').hidden = selected.length <= limit;
    $('#atlas-empty').hidden = !!selected.length;
    if (!selected.length) {
      $('#empty-title').textContent = narrowed ? '这一页，还没有找到' : filter === 'visited' ? '第一枚印记，留给下一次出发' : filter === 'all' ? '从一个名字，开始访古' : '山河辽阔，下一处想去哪里';
      $('#empty-description').textContent = narrowed ? '换个名称、朝代、地区或建筑类型试试。' : '从图鉴中挑一处惦记的古迹，亲眼见过后，再盖下到访印记。';
      $('#empty-action').textContent = narrowed ? '清除筛选' : '从图鉴选心愿';
      $('#empty-action').dataset.clear = String(narrowed);
    }
    renderLegacy();
    const warning = $('#storage-error'); warning.textContent = library.error(); warning.hidden = !library.error();
    const fingerprint = JSON.stringify(sites.map(s => [s.id, s.name, s.place, s.record]));
    if (fingerprint !== previousRecords) {
      previousRecords = fingerprint;
      window.dispatchEvent(new CustomEvent('fanggu:change', { detail: { sites } }));
    }
  }
  function select(value, reset = false) {
    filter = value; limit = 12;
    if (reset) {
      $('#atlas-search').value = '';
      Object.values(facetIds).forEach(id => { $('#' + id).value = 'all'; });
      countryOptions();
    }
    render();
  }
  function browseWishes() {
    select('unvisited', true);
    $('#atlas').scrollIntoView({ behavior: 'instant', block: 'start' });
    $('#atlas-search').focus({ preventScroll: true });
  }
  function renderLegacy() {
    const entries = library.legacy(), list = $('#legacy-list');
    $('#legacy-records').hidden = !entries.length;
    list.replaceChildren();
    for (const site of entries) {
      const row = el('form', 'legacy-row');
      const info = el('div'); info.append(el('b', '', site.name), el('p', '', `${site.place} · ${statusNames[site.record.status]}`));
      if (site.description || site.record.note) info.append(el('p', '', [site.description, site.record.note].filter(Boolean).join(' · ')));
      const select = el('select'); select.required = true; select.setAttribute('aria-label', `为${site.name}选择库内古迹`);
      const placeholder = el('option', '', '选择对应的库内古迹'); placeholder.value = ''; select.append(placeholder);
      for (const target of library.all()) { const option = el('option', '', `${target.name} · ${target.place}`); option.value = target.id; select.append(option); }
      const submit = el('button', 'journal-button', '关联图版'); submit.type = 'submit';
      row.append(info, select, submit);
      row.addEventListener('submit', event => {
        event.preventDefault();
        try { library.linkLegacy(site.id, select.value); render(); toast('已关联正式图版，原记录仍保留在备份中'); }
        catch (error) { toast(error.message); }
      });
      list.append(row);
    }
  }
  $('.collection-tabs').addEventListener('click', event => { const b = event.target.closest('[data-filter]'); if (b) select(b.dataset.filter); });
  $('#atlas-search').addEventListener('input', () => { limit = 12; render(); });
  Object.entries(facetIds).forEach(([key, id]) => $('#' + id).addEventListener('change', () => {
    if (key === 'country') countryOptions();
    else if (key === 'region') provinceOptions();
    limit = 12; render();
  }));
  $('#atlas-reset').addEventListener('click', () => select(filter, true));
  $('#atlas-more').addEventListener('click', () => { limit += 12; render(); });
  $('#add-wish').addEventListener('click', browseWishes);
  $('#empty-action').addEventListener('click', () => { if ($('#empty-action').dataset.clear === 'true') select(filter, true); else browseWishes(); });
  $('#export-records').addEventListener('click', () => {
    try {
      const url = URL.createObjectURL(new Blob([library.export()], { type: 'application/json' }));
      const link = el('a'); link.href = url; link.download = `访古备份-${FangguLibrary.today()}.json`; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1500); toast('备份已导出，请妥善保存');
    } catch (error) { toast('导出失败：' + error.message); }
  });
  $('#import-records').addEventListener('click', () => $('#backup-file').click());
  $('#backup-file').addEventListener('change', async event => {
    const file = event.target.files[0]; event.target.value = ''; if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error('请选择小于 2 MB 的访古 JSON 备份');
      backup = await file.text(); const parsed = library.parseBackup(backup);
      $('#import-preview').textContent = `这份备份包含 ${Object.keys(parsed.records).length} 条心愿或到访记录${parsed.customSites.length ? `，另保留 ${parsed.customSites.length} 条旧版登记资料` : ''}。同名旧心愿会自动关联图版，其余可手动匹配。`;
      open($('#import-dialog'));
    } catch (error) { toast(error.message); }
  });
  $('#confirm-import').addEventListener('click', () => {
    try { library.import(backup); $('#import-dialog').close(); select('all', true); toast('备份已合并导入'); }
    catch (error) { formError($('#import-dialog'), error); }
  });
  // Each browser history entry owns its filters, expanded cards and position.
  // No browsing state is mixed into the personal-record backup.
  history.scrollRestoration = 'manual';
  const readView = () => FangguNavigation.readView(history.state, location.hash, catalog.length);
  let restoring = false, restoration = 0, restoredHash = null;
  function applyView(view) {
    filter = view.filters.status; limit = view.limit;
    $('#atlas-search').value = view.filters.query;
    const set = key => {
      const control = $('#' + facetIds[key]), value = view.filters[key];
      control.value = [...control.options].some(option => option.value === value) ? value : 'all';
    };
    set('country'); countryOptions(); set('region'); provinceOptions();
    ['dynasty', 'province', 'type'].forEach(set);
  }
  function saveView(link) {
    if (restoring) return;
    const visibleHeight = node => { const rect = node.getBoundingClientRect(); return Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 58)); };
    const card = [...document.querySelectorAll('.atlas-card')].find(card => visibleHeight(card) > 0);
    const section = [...document.querySelectorAll('#map, #timeline')].filter(node => visibleHeight(node) > 0).sort((a, b) => visibleHeight(b) - visibleHeight(a))[0];
    const anchor = link?.closest('.atlas-card, #map, #timeline') || card || section;
    const view = { version: 1, hash: location.hash, filters: filters(), limit, x: scrollX, y: scrollY,
      timelineX: $('.tl-wrap').scrollLeft,
      anchor: anchor ? { id: anchor.dataset.id || anchor.id, type: anchor.classList.contains('atlas-card') ? 'card' : 'section', top: anchor.getBoundingClientRect().top } : null,
      focus: link?.getAttribute('href') || readView()?.focus || '' };
    try { history.replaceState({ ...history.state, fangguView: view }, ''); } catch { /* Native Back still works if the browser refuses state. */ }
  }
  function restorePosition(view) {
    const ticket = ++restoration; restoring = true;
    const position = () => {
      if (ticket !== restoration) return;
      $('.tl-wrap').scrollLeft = view.timelineX;
      const anchor = view.anchor && document.querySelector(view.anchor.type === 'section' ? `#${view.anchor.id}` : `.atlas-card[data-id="${view.anchor.id}"]`);
      const y = anchor ? scrollY + anchor.getBoundingClientRect().top - view.anchor.top : view.y;
      scrollTo({ left: view.x, top: y, behavior: 'instant' });
      if (view.focus) {
        const links = [...document.querySelectorAll('a[href]')].filter(link => link.getAttribute('href') === view.focus);
        const visible = links.filter(link => { const rect = link.getBoundingClientRect(); return rect.bottom > 58 && rect.top < innerHeight; });
        (visible.find(link => link.classList.contains('card-read')) || visible[0])?.focus({ preventScroll: true });
      }
      restoring = false;
    };
    requestAnimationFrame(position);
    // Font loading can change the height of the timeline and card rows.
    document.fonts?.ready.then(() => requestAnimationFrame(position));
  }
  ['wheel', 'touchstart', 'pointerdown', 'keydown'].forEach(type => addEventListener(type, () => { restoration++; restoring = false; }, { passive: true }));
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]'); if (!link) return;
    saveView(link);
    const hash = link.getAttribute('href');
    if (!hash.startsWith('#') || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    // Explicit section navigation must not restore the position we just left.
    event.preventDefault();
    if (location.hash !== hash) history.pushState({ ...history.state, fangguView: null }, '', hash);
    followHash(); saveView();
  }, { capture: true });
  window.addEventListener('pagehide', () => saveView());
  function followHash() {
    const detail = FangguNavigation.legacyDetail(location.hash, catalog);
    if (detail) { location.replace(detail); return; }
    if (location.hash === '#wishlist') { select('wishlist', true); $('#atlas').scrollIntoView({ behavior: 'instant', block: 'start' }); }
    else if (location.hash === '#atlas' || location.hash === '#sites') { select('all'); $('#atlas').scrollIntoView({ behavior: 'instant', block: 'start' }); }
    else if (location.hash.startsWith('#ch-') && DYN[location.hash.slice(4)]) {
      select('all', true); $('#atlas-dynasty').value = location.hash.slice(4); render(); $('#atlas').scrollIntoView({ behavior: 'instant', block: 'start' });
    }
    else if (['#map', '#timeline', '#top'].includes(location.hash)) $(location.hash).scrollIntoView({ behavior: 'instant', block: 'start' });
  }
  window.addEventListener('popstate', () => {
    const view = readView();
    if (view) { restoredHash = location.hash; applyView(view); render(); restorePosition(view); }
  });
  window.addEventListener('hashchange', () => {
    if (restoredHash === location.hash) { restoredHash = null; return; }
    restoredHash = null; followHash();
  });
  window.addEventListener('pageshow', event => {
    if (event.persisted) { const view = readView(); if (view) { applyView(view); render(); restorePosition(view); } }
  });
  const initialView = readView();
  if (initialView) applyView(initialView);
  render();
  if (initialView) restorePosition(initialView);
  else {
    followHash();
    const startingHash = location.hash;
    document.fonts?.ready.then(() => {
      if (restoration === 0 && location.hash === startingHash && ['#map', '#timeline', '#top'].includes(startingHash)) $(startingHash).scrollIntoView({ behavior: 'instant', block: 'start' });
    });
  }
})();
