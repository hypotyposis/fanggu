(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const el = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text != null) node.textContent = text; return node; };
  const sites = SITES.filter(site => COLORED_PLATES[site.id]);
  const params = new URLSearchParams(location.search);
  let background = ['dark', 'light', 'checker'].includes(params.get('bg')) ? params.get('bg') : 'checker';
  let reference = params.get('ref') === 'line' ? 'line' : 'original';
  let mode = 'color', page = 0;
  const PAGE_SIZE = 12;
  const url = id => `color-proof.html?${new URLSearchParams({ ...(id ? { id } : {}), bg: background, ref: reference })}`;
  const reviewLabel = plate => plate.visualReview === 'approved_user' ? '已通过人工审阅' : '待人工审阅';
  const pending = sites.filter(site => COLORED_PLATES[site.id].visualReview !== 'approved_user').length;
  $('#color-review-summary').textContent = pending ? `当前有 ${pending} 张待人工审阅。` : '当前全部透明图版已通过人工审阅，已用于图鉴与详情页。';
  for (const [key, dynasty] of Object.entries(DYN)) {
    if (!sites.some(site => site.dyn === key)) continue;
    const option = el('option', '', dynasty.name); option.value = key; $('#color-period').append(option);
  }
  function render() {
    const query = $('#color-search').value.trim().toLowerCase(), period = $('#color-period').value;
    const selected = sites.filter(site => (period === 'all' || period === site.dyn) && (!query || [site.id, site.name, site.sub, site.place].join(' ').toLowerCase().includes(query)));
    const pages = Math.max(1, Math.ceil(selected.length / PAGE_SIZE)); page = Math.min(page, pages - 1);
    $('#color-count').textContent = `${sites.length} / ${SITES.length} 处透明设色图版 · 当前 ${selected.length} 处 · ${pending ? pending + ' 张待审' : '全部已通过'}`;
    $('#color-empty').hidden = !!selected.length;
    $('#color-page').textContent = `${page + 1} / ${pages}`;
    $('#color-prev').disabled = page === 0; $('#color-next').disabled = page === pages - 1;
    $('#color-grid').replaceChildren(...selected.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE).map(site => {
      const article = el('article', 'color-tile'), link = el('a'); link.href = url(site.id); link.setAttribute('aria-label', `对照${site.name}的线稿与设色图`);
      const art = mode === 'color' ? COLORED_PLATES[site.id] : site.image;
      const image = el('img', mode === 'color' ? 'colored-plate' : ''); image.src = art.src; image.alt = art.alt; image.width = art.width; image.height = art.height; image.loading = 'lazy'; image.decoding = 'async';
      link.append(image, el('p', 'mono', `${DYN[site.dyn].name} · ${site.yearLabel || site.year}`), el('h2', '', site.name), el('p', '', `${site.place} · 对照 ↗`));
      article.append(link); return article;
    }));
  }
  function single(id) {
    const index = sites.findIndex(site => site.id === id); if (index < 0) return false;
    const site = sites[index], colored = COLORED_PLATES[id];
    $('#single-review').textContent = `透明设色 · ${reviewLabel(colored)}`;
    document.body.classList.add('single-view');
    $('.color-browser').hidden = true; $('#color-single').hidden = false;
    document.title = `${site.name} · 图版对照`;
    $('#single-name').textContent = site.name; $('#single-era').textContent = `${DYN[site.dyn].name} · ${site.place}`;
    $('#single-detail').href = `detail.html?id=${encodeURIComponent(id)}`;
    const comparison = reference === 'line' ? site.image : { ...colored, src: colored.originalSrc || colored.src };
    $('#single-reference').value = reference;
    for (const [target, art, label] of [['single-line', comparison, reference === 'line' ? '线稿' : '原始设色'], ['single-color', colored, '透明设色']]) {
      const image = $('#' + target); image.src = art.src; image.alt = `${site.name} · ${label}`; image.width = art.width; image.height = art.height;
    }
    $('#single-original').href = colored.originalSrc || colored.src; $('#single-research').href = colored.record;
    $('#single-avif').href = colored.src; $('#single-id').textContent = `ID · ${site.id}`;
    $('#color-all').href = url();
    $('#single-sources').replaceChildren(...(colored.references || []).map((source, i) => {
      const row = el('p'), link = el('a', '', `参考实拍 ${i + 1} ↗`); link.href = source.page;
      row.append(link, document.createTextNode(' · ' + [source.author, source.date, source.license].filter(Boolean).join(' · '))); return row;
    }));
    $('#single-page').textContent = `${index + 1} / ${sites.length}`;
    $('#single-prev').hidden = index === 0; $('#single-next').hidden = index === sites.length - 1;
    if (index) $('#single-prev').href = url(sites[index - 1].id);
    if (index < sites.length - 1) $('#single-next').href = url(sites[index + 1].id);
    return true;
  }
  $('#color-search').addEventListener('input', () => { page = 0; render(); });
  $('#color-period').addEventListener('change', () => { page = 0; render(); });
  for (const [id, step] of [['color-prev', -1], ['color-next', 1]]) $('#' + id).addEventListener('click', () => { page += step; render(); $('.color-filters').scrollIntoView({ block: 'start' }); });
  document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => {
    mode = button.dataset.mode; document.querySelectorAll('[data-mode]').forEach(item => item.setAttribute('aria-pressed', String(item === button))); render();
  }));
  function syncBackground() {
    document.body.dataset.background = background;
    document.querySelectorAll('[data-background]').forEach(button => {
      if (button.tagName === 'BUTTON') button.setAttribute('aria-pressed', String(button.dataset.background === background));
    });
  }
  function refreshComparison() {
    history.replaceState(null, '', url(params.get('id')));
    if (!single(params.get('id'))) render();
  }
  document.querySelectorAll('button[data-background]').forEach(button => button.addEventListener('click', () => {
    background = button.dataset.background; syncBackground(); refreshComparison();
  }));
  $('#single-reference').addEventListener('change', event => { reference = event.target.value; refreshComparison(); });
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || /^(INPUT|SELECT|TEXTAREA|BUTTON)$/.test(event.target.tagName)) return;
    if ($('#color-single').hidden || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    const target = $(event.key === 'ArrowLeft' ? '#single-prev' : '#single-next');
    if (!target.hidden) { event.preventDefault(); location.href = target.href; }
  });
  syncBackground();
  if (!single(params.get('id'))) render();
})();
