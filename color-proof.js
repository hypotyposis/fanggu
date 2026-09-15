(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const el = (tag, cls, text) => { const node = document.createElement(tag); if (cls) node.className = cls; if (text != null) node.textContent = text; return node; };
  const sites = SITES.filter(site => COLORED_PLATES[site.id]);
  const params = new URLSearchParams(location.search);
  let mode = 'color', page = 0;
  const PAGE_SIZE = 12;
  const url = id => `color-proof.html?id=${encodeURIComponent(id)}`;
  for (const [key, dynasty] of Object.entries(DYN)) {
    if (!sites.some(site => site.dyn === key)) continue;
    const option = el('option', '', dynasty.name); option.value = key; $('#color-period').append(option);
  }
  function render() {
    const query = $('#color-search').value.trim().toLowerCase(), period = $('#color-period').value;
    const selected = sites.filter(site => (period === 'all' || period === site.dyn) && (!query || [site.name, site.sub, site.place].join(' ').toLowerCase().includes(query)));
    const pages = Math.max(1, Math.ceil(selected.length / PAGE_SIZE)); page = Math.min(page, pages - 1);
    $('#color-count').textContent = `${sites.length} / ${SITES.length} 处已有设色图版 · 当前 ${selected.length} 处`;
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
    document.body.classList.add('single-view');
    $('.color-browser').hidden = true; $('#color-single').hidden = false;
    document.title = `${site.name} · 图版对照`;
    $('#single-name').textContent = site.name; $('#single-era').textContent = `${DYN[site.dyn].name} · ${site.place}`;
    $('#single-detail').href = `detail.html?id=${encodeURIComponent(id)}`;
    for (const [target, art, label] of [['single-line', site.image, '线稿'], ['single-color', colored, '设色']]) {
      const image = $('#' + target); image.src = art.src; image.alt = `${site.name} · ${label}`; image.width = art.width; image.height = art.height;
    }
    $('#single-original').href = colored.src; $('#single-research').href = colored.record;
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
  if (!single(params.get('id'))) render();
})();
