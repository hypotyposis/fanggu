/* One monument per page, using the same catalogue, artwork and personal records. */
(() => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const el = (tag, className, text) => { const node = document.createElement(tag); if (className) node.className = className; if (text != null) node.textContent = text; return node; };
  const back = $('#detail-back');
  if (FangguNavigation.canReturn(document.referrer, location.href, history.length)) {
    back.textContent = '← 返回前页';
    back.addEventListener('click', event => {
      if (event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); history.back(); }
    });
  }
  const catalog = FangguCatalog.classify(SITES, PLACES);
  const id = new URLSearchParams(location.search).get('id');
  const site = catalog.find(site => site.id === id);
  if (!site) {
    document.title = '未找到古迹 · 访古';
    $('#detail-missing').hidden = false;
    $('#detail-content').hidden = true;
    return;
  }
  const dynasty = DYN[site.dyn];
  document.title = `${site.name} · 访古`;
  document.querySelector('meta[name="description"]').content = `${site.name}，${site.place}。${site.lede.replace(/<[^>]*>/g, '')}`;
  document.body.style.setProperty('--acc', dynasty.acc);
  $('#detail-glyph').textContent = dynasty.glyph;
  $('#detail-geography').textContent = [FangguCatalog.countries[site.country], site.province, site.types.map(type => FangguCatalog.types[type]).join(' · ')].join(' / ');
  const article = el('article', 'site' + (site.tall ? ' tall' : '') + (site.lost ? ' lost' : ''));
  article.id = site.id;
  const fig = el('div', 'site-fig'), figure = el('figure');
  const image = el('img', 'plate' + (site.image.tint === false ? ' raw' : ''));
  image.src = site.image.src; image.alt = site.image.alt || site.name;
  image.width = site.image.width; image.height = site.image.height;
  image.fetchPriority = 'high'; image.decoding = 'async';
  const caption = el('figcaption');
  (site.image.caption || site.caption).forEach(text => caption.append(el('span', 'mono', text)));
  const arrivalSlot = el('div', 'detail-arrival');
  figure.append(image, caption, arrivalSlot); fig.append(figure);
  const text = el('div', 'site-text');
  // Editorial HTML is curated in sites.js; personal notes below only use textContent.
  text.innerHTML = `<div class="meta"><span class="dyn${site.tag.length > 1 ? ' two' : ''}">${site.tag}</span><span class="mono">${site.era}${site.yearApprox ? '' : ` · ${site.year}`}</span><span class="mono">${site.place}</span></div>
    <h1>${site.name}${site.sub ? `<small>${site.sub}</small>` : ''}</h1>
    <p class="lede">${site.lede}</p>
    <ul>${site.facts.map(fact => `<li>${fact}</li>`).join('')}</ul>
    ${site.quote ? `<p class="quote">${site.quote}</p>` : ''}`;
  const record = el('section', 'detail-record'); record.setAttribute('aria-label', '我的心愿与到访记录');
  const links = el('div', 'detail-links');
  const proof = el('a', '', '放大图版 ↗'); proof.href = `proof.html?fig=${encodeURIComponent(site.id)}`;
  const sources = el('a', '', '图版来源 ↗'); sources.href = site.id === 'longmenshiku' ? 'sources.html' : `sources.html#${encodeURIComponent(site.id)}`;
  links.append(proof, sources); text.append(record, links); article.append(fig, text);
  $('#detail-content').append(article);
  const { library, statusNames, button, arrival } = FangguJournal.create(catalog, renderRecord);
  function renderRecord() {
    const personal = library.record(site.id);
    FangguVisit.clear(image);
    const artwork = FangguArtwork.apply(image, site, personal.status);
    if (personal.status === 'visited') FangguVisit.mark(image);
    arrivalSlot.replaceChildren(...(personal.status === 'visited' ? [] : [arrival(site, image)]));
    caption.replaceChildren(...(site.image.caption || site.caption).map(text => el('span', 'mono', artwork.colored ? text.replace(/线稿|线描/g, '设色') : text)));
    proof.href = artwork.colored ? `color-proof.html?id=${encodeURIComponent(site.id)}` : `proof.html?fig=${encodeURIComponent(site.id)}`;
    sources.href = artwork.colored ? artwork.record : site.id === 'longmenshiku' ? 'sources.html' : `sources.html#${encodeURIComponent(site.id)}`;
    const strip = el('div', 'visit-strip');
    strip.append(el('span', 'visit-label', `${statusNames[personal.status]}${personal.status === 'visited' ? ' · ' + (personal.visitedOn || '日期未记') : ''}`));
    if (personal.status === 'visited') strip.append(button('编辑到访记录', 'visit', site.id));
    if (personal.status !== 'visited') strip.append(button(personal.status === 'wishlist' ? '移出心愿单' : '加入心愿单', personal.status === 'wishlist' ? 'unwish' : 'wish', site.id));
    record.replaceChildren(strip);
    if (personal.note) record.append(el('p', 'detail-note', personal.note));
    const warning = $('#storage-error'); warning.textContent = library.error(); warning.hidden = !library.error();
  }
  renderRecord();
})();
