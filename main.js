/* main.js — page assembly and interaction (data lives in sites.js). */
(() => {
  const B = Buildings;
  const $ = (s, el = document) => el.querySelector(s);
  const h = (tag, attrs = {}, html = '') => { const e = document.createElement(tag); for (const k in attrs) e.setAttribute(k, attrs[k]); e.innerHTML = html; return e; };
  const NS = 'http://www.w3.org/2000/svg';
  const sv = (n, a = {}, text) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (text != null) e.textContent = text; return e; };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- hero ----
  const heroSvg = B.render(B.bracketSection(), { label: '斗拱剖面：栌斗、华拱、昂、撩檐枋与椽' });
  $('#hero-fig').appendChild(heroSvg);
  B.prime(heroSvg, 1.15);
  requestAnimationFrame(() => requestAnimationFrame(() => heroSvg.classList.add('drawn')));

  // ---- sites by chapter ----
  const sitesRoot = $('#sites');
  const drafts = [];
  CHAPTERS.forEach(ch => {
    const d = DYN[ch.key];
    const sec = h('section', { class: 'chapter', id: 'ch-' + ch.key, style: `--acc:${d.acc}` });
    sec.appendChild(h('div', { class: 'glyph', 'aria-hidden': 'true' }, d.glyph));
    const wrap = h('div', { class: 'wrap' });
    wrap.appendChild(h('div', { class: 'chapter-head' }, `<h2>${d.name}</h2><div class="about"><span class="mono">${ch.years}</span><p>${ch.blurb}</p></div>`));
    SITES.filter(s => s.dyn === ch.key).forEach((s, i) => {
      const art = h('article', { class: 'site' + (i % 2 ? ' flip' : '') + (s.tall ? ' tall' : ''), id: s.id, 'data-year': s.year });
      const fig = h('div', { class: 'site-fig' });
      const figure = h('figure');
      const svg = B.render(s.draw(), { label: s.name + ' 立面示意' });
      figure.appendChild(svg);
      figure.appendChild(h('figcaption', {}, `<span class="mono">${s.caption[0]}</span><span class="mono">${s.caption[1]}</span>`));
      fig.appendChild(figure);
      const txt = h('div', { class: 'site-text' });
      txt.innerHTML = `
        <div class="meta"><span class="dyn${s.tag.length > 1 ? ' two' : ''}">${s.tag}</span><span class="mono">${s.era} · ${s.year}</span><span class="mono">${s.place}</span></div>
        <h3>${s.name}${s.sub ? `<small>${s.sub}</small>` : ''}</h3>
        <p class="lede">${s.lede}</p>
        <ul>${s.facts.map(f => `<li>${f}</li>`).join('')}</ul>
        ${s.quote ? `<p class="quote">${s.quote}</p>` : ''}`;
      art.append(fig, txt);
      wrap.appendChild(art);
      drafts.push(svg);
    });
    sec.appendChild(wrap);
    sitesRoot.appendChild(sec);
  });
  drafts.forEach(svg => B.prime(svg));

  // ---- rail ----
  const rail = $('#rail');
  SITES.forEach(s => rail.appendChild(h('li', { 'data-for': s.id }, `<a href="#${s.id}"><span>${s.year} · ${s.name}</span></a>`)));

  // ---- map ----
  (function map() {
    const svg = $('#mapsvg');
    const W = 360, H = 700, pad = { l: 44, r: 30, t: 40, b: 44 };
    const lat0 = 35.6, lat1 = 40.6, lon0 = 112.3, lon1 = 115.4, cosL = Math.cos(38.2 * Math.PI / 180);
    const kLat = (H - pad.t - pad.b) / (lat1 - lat0), kLon = kLat * cosL;
    const X = lon => pad.l + (lon - lon0) * kLon, Y = lat => pad.t + (lat1 - lat) * kLat;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-label', '五处古迹的位置示意图');
    for (let lat = 36; lat <= 40; lat++) { svg.appendChild(sv('line', { class: 'grid', x1: pad.l, x2: X(lon1), y1: Y(lat), y2: Y(lat) })); svg.appendChild(sv('text', { x: pad.l - 6, y: Y(lat) + 4, 'text-anchor': 'end' }, `${lat}°N`)); }
    for (let lon = 113; lon <= 115; lon++) { svg.appendChild(sv('line', { class: 'grid', x1: X(lon), x2: X(lon), y1: pad.t, y2: Y(lat0) })); svg.appendChild(sv('text', { x: X(lon), y: Y(lat0) + 18, 'text-anchor': 'middle' }, `${lon}°E`)); }
    svg.appendChild(sv('rect', { class: 'frame', x: pad.l, y: pad.t, width: X(lon1) - pad.l, height: Y(lat0) - pad.t }));
    svg.appendChild(sv('text', { class: 'prov', x: X(112.9), y: Y(39.4) }, '山西'));
    svg.appendChild(sv('text', { class: 'prov', x: X(114.35), y: Y(38.9) }, '河北'));
    svg.appendChild(sv('text', { class: 'prov', x: X(114.35), y: Y(36.75) }, '河南'));
    const route = sv('path', { class: 'route draw', d: PLACES.map((p, i) => `${i ? 'L' : 'M'}${X(p.lon).toFixed(1)},${Y(p.lat).toFixed(1)}`).join('') });
    svg.appendChild(route);
    PLACES.forEach(p => {
      const g = sv('g', { class: 'pt', 'data-key': p.key, tabindex: 0, role: 'link' });
      const acc = DYN[SITES.find(s => s.placeKey === p.key).dyn].acc;
      g.style.setProperty('--acc', acc);
      const x = X(p.lon), y = Y(p.lat);
      g.appendChild(sv('circle', { class: 'halo', cx: x, cy: y, r: 6 }));
      g.appendChild(sv('circle', { class: 'halo h2', cx: x, cy: y, r: 6 }));
      g.appendChild(sv('circle', { class: 'core', cx: x, cy: y, r: 4 }));
      const right = p.key !== 'zhengding' && p.key !== 'anyang';
      g.appendChild(sv('text', { class: 'name', x: x + (right ? 12 : -12), y: y + 5, 'text-anchor': right ? 'start' : 'end' }, p.name));
      g.appendChild(sv('text', { class: 'coord', x: x + (right ? 12 : -12), y: y + 20, 'text-anchor': right ? 'start' : 'end' }, `${p.lat.toFixed(2)}N ${p.lon.toFixed(2)}E`));
      svg.appendChild(g);
      g.addEventListener('click', () => location.hash = SITES.find(s => s.placeKey === p.key).id);
      g.addEventListener('keydown', e => { if (e.key === 'Enter') g.click(); });
    });
    const L = route.getTotalLength(); route.style.setProperty('--len', L);
    // list
    const ul = $('#places');
    PLACES.forEach(p => {
      const ss = SITES.filter(s => s.placeKey === p.key);
      const li = h('li', { 'data-key': p.key }, `<b>${p.name}</b><span class="sites">${ss.map(s => `<a href="#${s.id}">${s.name}</a>`).join('')}</span><span class="mono">${p.prov} · ${ss.map(s => s.year).join(' / ')}</span>`);
      ul.appendChild(li);
    });
    const focus = key => { svg.classList.toggle('focus', !!key); svg.querySelectorAll('.pt').forEach(g => g.classList.toggle('on', g.dataset.key === key)); ul.querySelectorAll('li').forEach(li => li.classList.toggle('on', li.dataset.key === key)); };
    [...ul.children].forEach(li => { li.addEventListener('mouseenter', () => focus(li.dataset.key)); li.addEventListener('mouseleave', () => focus(null)); });
    svg.querySelectorAll('.pt').forEach(g => { g.addEventListener('mouseenter', () => focus(g.dataset.key)); g.addEventListener('mouseleave', () => focus(null)); });
    new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { svg.classList.add('drawn'); o.disconnect(); } }), { threshold: .3 }).observe(svg);
  })();

  // ---- timeline ----
  (function timeline() {
    const svg = $('#tlsvg');
    const W = 1100, H = 250, l = 70, rgt = 30, y0 = 700, y1 = 1200;
    const X = yr => l + (yr - y0) / (y1 - y0) * (W - l - rgt);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-label', '七处古迹的年代与南北朝代对照');
    const lanes = [
      { name: '北', y: 92, bars: [{ n: '辽', s: 907, e: 1125, c: 'var(--cinnabar)' }, { n: '金', s: 1115, e: 1234, c: 'var(--amber)' }] },
      { name: '南', y: 168, bars: [{ n: '唐', s: 618, e: 907, c: 'var(--gold)' }, { n: '五代', s: 907, e: 960, c: 'var(--ash)' }, { n: '北宋', s: 960, e: 1127, c: 'var(--verdigris)' }, { n: '南宋', s: 1127, e: 1279, c: 'var(--verdigris)' }] },
    ];
    for (let yr = 700; yr <= 1200; yr += 100) { svg.appendChild(sv('line', { class: 'axis', x1: X(yr), x2: X(yr), y1: 40, y2: 205, 'stroke-dasharray': '2 5' })); svg.appendChild(sv('text', { x: X(yr), y: 226, 'text-anchor': 'middle' }, String(yr))); }
    lanes.forEach(ln => {
      svg.appendChild(sv('text', { class: 'lane-name', x: 14, y: ln.y + 5 }, ln.name));
      ln.bars.forEach(b => {
        const s = Math.max(b.s, y0), e = Math.min(b.e, y1);
        svg.appendChild(sv('rect', { class: 'bar', x: X(s), y: ln.y - 16, width: X(e) - X(s), height: 32, fill: b.c }));
        const narrow = X(e) - X(s) < 90;
        svg.appendChild(sv('text', { class: 'bar-name' + (narrow ? ' sm' : ''), x: narrow ? (X(s) + X(e)) / 2 : X(s) + 10, y: ln.y + (narrow ? 6 : 9), 'text-anchor': narrow ? 'middle' : 'start' }, b.n));
        svg.appendChild(sv('text', { x: X(e) - 6, y: ln.y - 22, 'text-anchor': 'end' }, `${b.s}–${b.e}`));
      });
    });
    const north = new Set(['huayan', 'yingxian', 'shanhua']);
    let flip = 0;
    SITES.forEach(s => {
      const ln = north.has(s.id) ? lanes[0] : lanes[1];
      const x = X(s.year), up = ln === lanes[0] ? (flip++ % 2 === 0) : (flip++ % 2 === 1);
      const g = sv('g', { class: 'mk', 'data-for': s.id, tabindex: 0, role: 'link' });
      const ty = up ? ln.y - 44 : ln.y + 44;
      g.appendChild(sv('line', { x1: x, x2: x, y1: ln.y, y2: ty + (up ? 8 : -8) }));
      g.appendChild(sv('circle', { cx: x, cy: ln.y, r: 5, fill: DYN[s.dyn].acc }));
      g.appendChild(sv('text', { class: 'nm', x, y: up ? ty - 2 : ty + 14, 'text-anchor': 'middle' }, s.name));
      g.appendChild(sv('text', { class: 'yr', x, y: up ? ty + 6 : ty - 2 + 14 + 14, 'text-anchor': 'middle' }, String(s.year)));
      g.addEventListener('click', () => location.hash = s.id);
      g.addEventListener('keydown', e => { if (e.key === 'Enter') g.click(); });
      svg.appendChild(g);
    });
  })();

  // ---- observers: draw on reveal, rail highlight, parallax ----
  const drawIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('drawn'); drawIO.unobserve(e.target); } }), { threshold: .3 });
  drafts.forEach(svg => drawIO.observe(svg));

  const arts = [...document.querySelectorAll('article.site')];
  const setCurrent = id => {
    document.querySelectorAll('#rail li').forEach(li => li.classList.toggle('on', li.dataset.for === id));
    document.querySelectorAll('.tl .mk').forEach(m => m.classList.toggle('on', m.dataset.for === id));
    const idx = SITES.findIndex(s => s.id === id);
    rail.style.setProperty('--fill', idx < 0 ? '0%' : `${(idx / (SITES.length - 1)) * 100}%`);
  };
  const curIO = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setCurrent(e.target.id); }), { rootMargin: '-45% 0px -45% 0px' });
  arts.forEach(a => curIO.observe(a));

  if (!reduced && matchMedia('(hover: hover)').matches) {
    let raf = 0;
    addEventListener('pointermove', e => { document.body.style.setProperty('--mx', e.clientX + 'px'); document.body.style.setProperty('--my', e.clientY + 'px'); }, { passive: true });
    const figs = [...document.querySelectorAll('.site-fig')];
    const px = () => { raf = 0; const vh = innerHeight; figs.forEach(f => { const r = f.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; f.style.transform = `translateY(${((r.top + r.height / 2) - vh / 2) * -0.05}px)`; }); };
    addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(px); }, { passive: true });
    px();
  }
})();
