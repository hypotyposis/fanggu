/* Compact chronology: fixed lanes, clustered monuments, four reading cards. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FangguTimeline = factory();
})(typeof globalThis === 'object' ? globalThis : this, () => {
  'use strict';
  const WIDTH = 1200, HEIGHT = 240, PAGE_SIZE = 4;
  const endYear = 2026;
  const x = year => 76 + 1090 * (year <= 600 ? year / 600 * .18 : year <= 1250 ? .18 + (year - 600) / 650 * .54 : .72 + (year - 1250) / (endYear - 1250) * .28);
  const lane = (site, dynasties) => dynasties[site.dyn].country === 'JP' ? 'japan'
    : site.timelineLane === 'north' || ['han', 'bei', 'beiqi', 'qiuci', 'xiyu', 'sui', 'liao', 'xixia', 'yuan', 'ming', 'modern'].includes(site.dyn) ? 'north' : 'south';
  const trackY = { north: 91, south: 155, japan: 218 };
  function clusters(sites, dynasties) {
    const result = [];
    for (const track of Object.keys(trackY)) {
      const groups = [];
      for (const site of sites.filter(site => lane(site, dynasties) === track).sort((a, b) => a.year - b.year || a.id.localeCompare(b.id))) {
        const previous = groups.at(-1), position = x(site.year);
        if (previous && position - previous.x < 32) {
          previous.x = (previous.x * previous.sites.length + position) / (previous.sites.length + 1);
          previous.sites.push(site);
        } else groups.push({ x: position, sites: [site], lane: track, y: trackY[track] });
      }
      groups.forEach(group => { group.id = group.sites.map(site => site.id).join('.'); result.push(group); });
    }
    return result;
  }
  function select(sites, state, groups) {
    const group = groups.find(group => group.id === state.cluster);
    const selected = group ? group.sites : state.period === 'all' ? sites : sites.filter(site => site.dyn === state.period);
    return [...selected].sort((a, b) => a.year - b.year || a.id.localeCompare(b.id));
  }
  function restore(value, sites, groups) {
    const period = sites.some(site => site.dyn === value?.period) ? value.period : 'all';
    const cluster = groups.some(group => group.id === value?.cluster) ? value.cluster : '';
    const state = { period, cluster, page: 0 };
    state.page = Math.max(0, Math.min(Math.ceil(select(sites, state, groups).length / PAGE_SIZE) - 1, Number.isInteger(value?.page) ? value.page : 0));
    return state;
  }
  function mount(sites, dynasties) {
    const $ = selector => document.querySelector(selector);
    const el = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text != null) node.textContent = text; return node; };
    const sv = (tag, attrs = {}, text) => { const node = document.createElementNS('http://www.w3.org/2000/svg', tag); Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value)); if (text != null) node.textContent = text; return node; };
    const svg = $('#tlsvg'), groups = clusters(sites, dynasties), nodes = new Map();
    let state = restore(history.state?.fangguTimeline, sites, groups);
    let records = new Map(sites.map(site => [site.id, { status: site.initialStatus || 'unvisited' }]));
    const statusNames = { visited: '已到访', wishlist: '想去', unvisited: '未到访' };
    const periodNames = { ...Object.fromEntries(Object.entries(dynasties).map(([key, era]) => [key, era.name])), all: '全部时期' };
    const yearLabel = site => String(site.yearLabel || site.year);
    const range = items => {
      const years = items.map(site => site.year), start = Math.min(...years), end = Math.max(...years);
      return start === end ? `${start} 年` : `${start}—${end} 年`;
    };
    const picker = $('#tl-period');
    for (const key of ['all', ...Object.keys(dynasties)]) {
      const count = key === 'all' ? sites.length : sites.filter(site => site.dyn === key).length;
      if (count) { const option = el('option', '', `${periodNames[key]} · ${count} 处`); option.value = key; picker.append(option); }
    }
    function remember() {
      try { history.replaceState({ ...history.state, fangguTimeline: { ...state, notesOpen: $('#tl-notes').open } }, ''); } catch { /* Reading remains available without history state. */ }
    }
    function choose(period = 'all', cluster = '') {
      state = { period, cluster, page: 0 }; hidePreview(); render(); remember();
    }
    function activate(node, action) {
      node.setAttribute('role', 'button'); node.setAttribute('tabindex', '0'); node.setAttribute('aria-controls', 'tl-cards');
      node.addEventListener('click', action);
      node.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); action(); } });
    }
    svg.setAttribute('viewBox', `0 0 ${WIDTH} ${HEIGHT}`);
    svg.setAttribute('aria-label', `${sites.length}处古迹的年代总览；点选朝代或聚合点，在下方查看古迹`);
    for (const year of [100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2000]) {
      svg.append(sv('line', { class: 'axis', x1: x(year), x2: x(year), y1: 27, y2: 230 }));
      svg.append(sv('text', { class: 'tick', x: x(year), y: 17, 'text-anchor': 'middle' }, year));
    }
    for (const year of [600, 1250]) svg.append(sv('path', { class: 'axis-break', d: `M${x(year) - 5},23l4,-7l4,14l4,-7` }));
    for (const [label, y] of [['北', 91], ['南', 155], ['日本', 214]]) svg.append(sv('text', { class: 'lane-name', x: 14, y }, label));
    // The paired bars use the catalogue's existing combined dynasty categories.
    const bars = [
      ['han', '东汉', 25, 220, 'unified'], ['sui', '隋', 581, 618, 'unified'],
      ['yuan', '元', 1271, 1368, 'unified'], ['ming', '明', 1368, 1644, 'unified'], ['ming', '清', 1644, 1912, 'unified'], ['modern', '今', 1912, endYear, 'unified'],
      ['bei', '北魏', 386, 534, 'north'], ['beiqi', '北齐', 550, 577, 'north'],
      ['liao', '辽', 907, 1125, 'north'], ['liao', '金', 1115, 1234, 'north'],
      ['xixia', '西夏', dynasties.xixia.start, dynasties.xixia.end, 'northwest'],
      ['nan', '南朝', 420, 589, 'south'], ['tang', '唐', 618, 907, 'south'], ['zhou', '五代', 907, 960, 'south'],
      ['song', '北宋', 960, 1127, 'south'], ['song', '南宋', 1127, 1279, 'south'],
      ...Object.entries(dynasties).filter(([, era]) => era.country === 'JP').map(([key, era]) => [key, era.glyph, era.start, era.end, 'japan']),
    ];
    for (const [key, label, start, end, track] of bars) {
      // Xixia overlaps Liao/Jin in time; its narrow strip sits above those bars.
      const y = track === 'northwest' ? 28 : track === 'south' ? 115 : track === 'japan' ? 182 : 50, height = track === 'northwest' ? 17 : track === 'unified' ? 117 : track === 'japan' ? 48 : 53;
      const left = x(start), width = x(end) - left, center = left + width / 2;
      const group = sv('g', { class: 'tl-period', 'data-period': key, 'aria-label': `${label}，${start}—${end}，查看${periodNames[key]}古迹` });
      group.style.setProperty('--acc', dynasties[key].acc);
      group.append(sv('title', {}, `${label} · ${start}—${end} · 查看${periodNames[key]}古迹`));
      group.append(sv('rect', { class: 'period-fill', x: left, y, width, height, rx: 2 }));
      group.append(sv('rect', { class: 'period-hit', x: center - Math.max(width, 24) / 2, y, width: Math.max(width, 24), height }));
      const labelY = track === 'northwest' ? 41 : track === 'unified' ? 119 : track === 'japan' ? 198 : width < 30 ? 42 : y + 19;
      if (width < 30 && track === 'north') group.append(sv('line', { class: 'narrow-leader', x1: center, x2: center, y1: 44, y2: 50 }));
      group.append(sv('text', { class: 'period-name', x: center, y: labelY, 'text-anchor': 'middle' }, label));
      activate(group, () => choose(key)); svg.append(group);
    }
    const kingdoms = sv('g', { class: 'tl-period kingdoms', 'data-period': 'zhou', 'aria-label': '十国延续至979年，查看五代十国古迹' });
    kingdoms.style.setProperty('--acc', dynasties.zhou.acc);
    kingdoms.append(sv('rect', { class: 'period-fill', x: x(902), y: 107, width: x(979) - x(902), height: 6 }));
    kingdoms.append(sv('text', { class: 'kingdoms-label', x: x(979) + 5, y: 112 }, '十国 · 至979'));
    activate(kingdoms, () => choose('zhou')); svg.append(kingdoms);
    for (const group of groups) {
      const node = sv('g', { class: 'tl-point', 'data-cluster': group.id, 'aria-label': `${group.sites.length === 1 ? group.sites[0].name : range(group.sites) + '，' + group.sites.length + '处古迹'}，点选预览` });
      node.style.setProperty('--acc', group.sites.every(site => site.dyn === group.sites[0].dyn) ? dynasties[group.sites[0].dyn].acc : 'var(--paper-2)');
      node.append(sv('rect', { class: 'point-hit', x: group.x - 15, y: group.y - 15, width: 30, height: 30 }));
      node.append(sv('circle', { cx: group.x, cy: group.y, r: group.sites.length > 1 ? 11 : 5 }));
      if (group.sites.length > 1) node.append(sv('text', { class: 'cluster-count', x: group.x, y: group.y + 4, 'text-anchor': 'middle' }, group.sites.length));
      activate(node, () => choose('all', group.id));
      node.addEventListener('pointerenter', event => { if (event.pointerType !== 'touch') showPreview(group, node); });
      node.addEventListener('pointerleave', hidePreview);
      node.addEventListener('focus', () => showPreview(group, node));
      node.addEventListener('blur', hidePreview);
      node.setAttribute('aria-describedby', 'tl-preview');
      nodes.set(group.id, node); svg.append(node);
    }
    function hidePreview() { $('#tl-preview').hidden = true; }
    function showPreview(group, node) {
      const preview = $('#tl-preview'), first = group.sites[0];
      const image = el('img'); FangguArtwork.apply(image, first, records.get(first.id)?.status); image.alt = ''; image.width = 76; image.height = 76;
      const copy = el('div');
      copy.append(el('strong', '', first.name + (group.sites.length > 1 ? ` 等 ${group.sites.length} 处` : '')));
      copy.append(el('span', '', group.sites.length > 1 ? range(group.sites) : `${dynasties[first.dyn].name} · ${yearLabel(first)}`));
      copy.append(el('span', '', group.sites.length > 1 ? '点选后在下方逐一查看' : `${statusNames[records.get(first.id)?.status || 'unvisited']} · 点选查看图版`));
      preview.replaceChildren(image, copy); preview.hidden = false;
      const bounds = $('#timeline > .wrap').getBoundingClientRect(), point = node.getBoundingClientRect();
      preview.style.left = `${Math.max(0, Math.min(bounds.width - preview.offsetWidth, point.left - bounds.left + point.width / 2 - preview.offsetWidth / 2))}px`;
      preview.style.top = `${Math.max(0, point.top - bounds.top - preview.offsetHeight - 12)}px`;
    }
    function render() {
      const selected = select(sites, state, groups), pages = Math.max(1, Math.ceil(selected.length / PAGE_SIZE));
      state.page = Math.min(state.page, pages - 1);
      picker.value = state.period;
      $('#tl-selection-title').textContent = state.cluster ? selected.length === 1 ? selected[0].name : range(selected) : periodNames[state.period];
      $('#tl-result').textContent = `${selected.length} 处${state.period !== 'all' && !state.cluster ? ' · ' + range(selected) : ''}`;
      $('#tl-page').textContent = `${state.page + 1} / ${pages}`;
      $('#tl-prev').disabled = state.page === 0; $('#tl-next').disabled = state.page === pages - 1;
      $('#tl-reset').hidden = state.period === 'all' && !state.cluster;
      const visible = selected.slice(state.page * PAGE_SIZE, (state.page + 1) * PAGE_SIZE);
      $('#tl-cards').replaceChildren(...visible.map(site => {
        const link = el('a', 'tl-card'); link.href = FangguNavigation.detailURL(site.id); link.dataset.id = site.id;
        link.style.setProperty('--acc', dynasties[site.dyn].acc);
        link.setAttribute('aria-label', `细读${site.name}`);
        const image = el('img'); FangguArtwork.apply(image, site, records.get(site.id)?.status); image.alt = ''; image.width = 82; image.height = 100; image.loading = 'lazy';
        const copy = el('div', 'tl-card-copy');
        copy.append(el('span', 'tl-card-year', `${dynasties[site.dyn].name} · ${yearLabel(site)}`), el('strong', '', site.name), el('span', 'tl-card-place', site.place));
        copy.append(el('span', 'tl-card-status', `${statusNames[records.get(site.id)?.status || 'unvisited']} · 细读 ↗`));
        link.append(image, copy); return link;
      }));
      svg.querySelectorAll('[data-period]').forEach(node => {
        const active = node.dataset.period === state.period && !state.cluster;
        node.classList.toggle('is-selected', active); node.setAttribute('aria-pressed', String(active));
      });
      const selectedIds = new Set(selected.map(site => site.id));
      for (const group of groups) {
        const node = nodes.get(group.id), visited = group.sites.filter(site => records.get(site.id)?.status === 'visited').length;
        node.classList.toggle('is-dim', !group.sites.some(site => selectedIds.has(site.id)));
        node.classList.toggle('is-selected', state.cluster === group.id);
        node.classList.toggle('all-visited', visited === group.sites.length);
        node.setAttribute('aria-pressed', String(state.cluster === group.id));
      }
    }
    picker.addEventListener('change', () => choose(picker.value));
    $('#tl-reset').addEventListener('click', () => choose());
    for (const [id, step] of [['tl-prev', -1], ['tl-next', 1]]) $('#' + id).addEventListener('click', () => { state.page += step; render(); remember(); });
    $('#tl-notes').addEventListener('toggle', remember);
    $('#timeline').addEventListener('keydown', event => { if (event.key === 'Escape') hidePreview(); });
    $('.tl-wrap').addEventListener('scroll', hidePreview, { passive: true });
    window.addEventListener('resize', hidePreview);
    window.addEventListener('fanggu:change', event => { records = new Map(event.detail.sites.map(site => [site.id, site.record])); render(); });
    document.addEventListener('click', event => { if (event.target.closest('a[href]')) remember(); }, { capture: true });
    window.addEventListener('pagehide', remember);
    const resume = () => { state = restore(history.state?.fangguTimeline, sites, groups); $('#tl-notes').open = !!history.state?.fangguTimeline?.notesOpen; hidePreview(); render(); };
    window.addEventListener('popstate', resume);
    window.addEventListener('pageshow', event => { if (event.persisted) resume(); });
    $('#tl-notes').open = !!history.state?.fangguTimeline?.notesOpen;
    render();
  }
  return { WIDTH, HEIGHT, PAGE_SIZE, x, lane, clusters, select, restore, mount };
});
