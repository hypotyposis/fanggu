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
    sec.appendChild(h('div', { class: 'glyph' + (d.glyph.length > 1 ? ' two' : ''), 'aria-hidden': 'true' }, d.glyph));
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
  SITES.forEach(s => rail.appendChild(h('li', { 'data-for': s.id }, `<a href="#${s.id}"><span>${s.yearLabel || s.year} · ${s.name}</span></a>`)));

  // ---- map ----
  (function map() {
    const svg = $('#mapsvg');
    const W = 505, H = 700, pad = { l: 44, r: 30, t: 40, b: 44 };
    const lat0 = 29.4, lat1 = 40.7, lon0 = 111.3, lon1 = 121.4, cosL = Math.cos(35.5 * Math.PI / 180);
    const kLat = (H - pad.t - pad.b) / (lat1 - lat0), kLon = kLat * cosL;
    const X = lon => pad.l + (lon - lon0) * kLon, Y = lat => pad.t + (lat1 - lat) * kLat;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-label', '五处古迹的位置示意图');
    for (let lat = 30; lat <= 40; lat += 2) { svg.appendChild(sv('line', { class: 'grid', x1: pad.l, x2: X(lon1), y1: Y(lat), y2: Y(lat) })); svg.appendChild(sv('text', { x: pad.l - 6, y: Y(lat) + 4, 'text-anchor': 'end' }, `${lat}°N`)); }
    for (let lon = 113; lon <= 121; lon += 2) { svg.appendChild(sv('line', { class: 'grid', x1: X(lon), x2: X(lon), y1: pad.t, y2: Y(lat0) })); svg.appendChild(sv('text', { x: X(lon), y: Y(lat0) + 18, 'text-anchor': 'middle' }, `${lon}°E`)); }
    svg.appendChild(sv('rect', { class: 'frame', x: pad.l, y: pad.t, width: X(lon1) - pad.l, height: Y(lat0) - pad.t }));
    svg.appendChild(sv('text', { class: 'prov', x: X(111.6), y: Y(39.75) }, '山西'));
    svg.appendChild(sv('text', { class: 'prov', x: X(117.2), y: Y(38.5) }, '河北'));
    svg.appendChild(sv('text', { class: 'prov', x: X(112.6), y: Y(34.6) }, '河南'));
    svg.appendChild(sv('text', { class: 'prov', x: X(116.5), y: Y(31.4) }, '浙江'));
    const route = sv('path', { class: 'route draw', d: ROUTE.map(k => PLACES.find(p => p.key === k)).map((p, i) => `${i ? 'L' : 'M'}${X(p.lon).toFixed(1)},${Y(p.lat).toFixed(1)}`).join('') });
    svg.appendChild(route);
    PLACES.forEach(p => {
      const g = sv('g', { class: 'pt', 'data-key': p.key, tabindex: 0, role: 'link' });
      const acc = DYN[SITES.find(s => s.placeKey === p.key).dyn].acc;
      g.style.setProperty('--acc', acc);
      const x = X(p.lon), y = Y(p.lat);
      g.appendChild(sv('circle', { class: 'halo', cx: x, cy: y, r: 6 }));
      g.appendChild(sv('circle', { class: 'halo h2', cx: x, cy: y, r: 6 }));
      g.appendChild(sv('circle', { class: 'core', cx: x, cy: y, r: 4 }));
      const right = p.side !== 'l';
      const dy = p.dy || 0;
      g.appendChild(sv('text', { class: 'name', x: x + (right ? 12 : -12), y: y + 5 + dy, 'text-anchor': right ? 'start' : 'end' }, p.name));
      g.appendChild(sv('text', { class: 'coord', x: x + (right ? 12 : -12), y: y + 20 + dy, 'text-anchor': right ? 'start' : 'end' }, `${p.lat.toFixed(2)}N ${p.lon.toFixed(2)}E`));
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
    const W = 1100, H = 318, l = 70, rgt = 30, y0 = 600, yb = 1250, y1 = 1912, split = 0.68;
    const span = W - l - rgt;
    const X = yr => yr <= yb ? l + (yr - y0) / (yb - y0) * span * split : l + span * split + (yr - yb) / (y1 - yb) * span * (1 - split);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-label', '七处古迹的年代与南北朝代对照');
    const lanes = [
      { name: '北', y: 92, bars: [{ n: '辽', s: 907, e: 1125, c: 'var(--cinnabar)' }, { n: '金', s: 1115, e: 1234, c: 'var(--amber)' }] },
      { name: '南', y: 168, bars: [{ n: '唐', s: 618, e: 907, c: 'var(--gold)' }, { n: '五代', s: 907, e: 960, c: 'var(--ash)' }, { n: '北宋', s: 960, e: 1127, c: 'var(--verdigris)' }, { n: '南宋', s: 1127, e: 1279, c: 'var(--verdigris)' }] },
    ];
    for (const yr of [600, 700, 800, 900, 1000, 1100, 1200, 1300, 1500, 1700, 1900]) { svg.appendChild(sv('line', { class: 'axis', x1: X(yr), x2: X(yr), y1: 40, y2: 290, 'stroke-dasharray': '2 5' })); svg.appendChild(sv('text', { x: X(yr), y: 308, 'text-anchor': 'middle' }, String(yr))); }
    // axis break at 1250: the right third is compressed
    svg.appendChild(sv('path', { class: 'axis', d: `M${X(yb) - 6},${290}l4,-8l4,16l4,-8`, fill: 'none', 'stroke-dasharray': 'none' }));
    svg.appendChild(sv('text', { x: X(yb), y: 308, 'text-anchor': 'middle' }, '⋯'));
    // unified dynasties after the Song–Jin split: one bar across both lanes
    for (const b of [{ n: '元', s: 1271, e: 1368, c: 'var(--paper-3)' }, { n: '明', s: 1368, e: 1644, c: 'var(--lapis)' }, { n: '清', s: 1644, e: 1912, c: 'var(--ash)' }]) {
      svg.appendChild(sv('rect', { class: 'bar', x: X(b.s), y: 76, width: X(b.e) - X(b.s), height: 108, fill: b.c }));
      const nw = X(b.e) - X(b.s) < 70;
      svg.appendChild(sv('text', { class: 'bar-name' + (nw ? ' sm' : ''), x: nw ? (X(b.s) + X(b.e)) / 2 : X(b.e) - 8, y: 176, 'text-anchor': nw ? 'middle' : 'end' }, b.n));
      svg.appendChild(sv('text', { x: X(b.e) - 6, y: 70, 'text-anchor': 'end' }, `${b.s}–${b.e}`));
    }
    lanes.forEach(ln => {
      svg.appendChild(sv('text', { class: 'lane-name', x: 14, y: ln.y + 5 }, ln.name));
      ln.bars.forEach(b => {
        const s = Math.max(b.s, y0), e = Math.min(b.e, y1);
        svg.appendChild(sv('rect', { class: 'bar', x: X(s), y: ln.y - 16, width: X(e) - X(s), height: 32, fill: b.c }));
        const narrow = X(e) - X(s) < 90;
        svg.appendChild(sv('text', { class: 'bar-name' + (narrow ? ' sm' : ''), x: narrow ? (X(s) + X(e)) / 2 : X(s) + 10, y: ln.y + (narrow ? 6 : 9), 'text-anchor': narrow ? 'middle' : 'start' }, b.n));
        svg.appendChild(sv('text', { x: X(e) - 6, y: ln.y + 26, 'text-anchor': 'end' }, `${b.s}–${b.e}`));
      });
    });
    const north = new Set(['kaishan', 'huayan', 'yingxian', 'shanhua', 'chunhua', 'huata']), unified = new Set(['jiutian', 'xiayu', 'shuanglin', 'tiantan', 'feihong']);
    // [row, dx]: north labels stack above the north lane, everything else below its lane
    const TL = { kaiyuan: [0], xiuding: [1], nanchan: [0], foguang: [1], longmen: [0, -6], tiantai: [2, -6], dayun: [1, 6], wenfeng: [0, 12], longxing: [2, 6], yuanqi: [1, 6], lingxiao: [0], fotou: [2], liaodi: [1, 8], jiutian: [1, -12], liuhe: [1], kaishan: [0, -4], huayan: [1], yingxian: [0, 8], shanhua: [1], chunhua: [0], huata: [2], xiayu: [0, 10], shuanglin: [1], tiantan: [0], feihong: [1] };
    const mid = { name: '', y: 130, below: 62 };
    SITES.forEach(s => {
      const ln = unified.has(s.id) ? mid : north.has(s.id) ? lanes[0] : lanes[1];
      const [row = 0, dx = 0] = TL[s.id] || [];
      const x = X(s.year), tx = x + dx, above = ln === lanes[0];
      const off = (ln.below || 40) + row * 26;
      const g = sv('g', { class: 'mk', 'data-for': s.id, tabindex: 0, role: 'link' });
      const nmY = above ? ln.y - off - 2 : ln.y + off + 10, yrY = above ? ln.y - off + 10 : ln.y + off + 22;
      g.appendChild(sv('line', { x1: x, x2: tx, y1: above ? ln.y - 6 : ln.y + 6, y2: above ? ln.y - off + 14 : ln.y + off - 2 }));
      g.appendChild(sv('circle', { cx: x, cy: ln.y, r: 5, fill: DYN[s.dyn].acc }));
      g.appendChild(sv('text', { class: 'nm', x: tx, y: nmY, 'text-anchor': 'middle' }, s.short || s.name));
      g.appendChild(sv('text', { class: 'yr', x: tx, y: yrY, 'text-anchor': 'middle' }, String(s.yearLabel || s.year)));
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
