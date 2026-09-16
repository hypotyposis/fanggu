/* main.js — page assembly and interaction (data lives in sites.js). */
(() => {
  const B = Buildings;
  const $ = (s, el = document) => el.querySelector(s);
  const h = (tag, attrs = {}, html = '') => { const e = document.createElement(tag); for (const k in attrs) e.setAttribute(k, attrs[k]); e.innerHTML = html; return e; };
  const NS = 'http://www.w3.org/2000/svg';
  const sv = (n, a = {}, text) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); if (text != null) e.textContent = text; return e; };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  $('#heritage-span').textContent = `${Math.min(...SITES.map(s => s.year))} — ${Math.max(...SITES.map(s => s.year))}`;
  $('#catalog-summary').textContent = `现收录 ${SITES.length} 处古迹：${Object.entries(DYN).map(([key, dynasty]) => ({ name: dynasty.name, count: SITES.filter(site => site.dyn === key).length })).filter(group => group.count).map(group => `${group.name} ${group.count}`).join('、')}。`;

  // ---- hero ----
  const heroFigure = h('figure');
  const heroImage = h('img', { class: 'plate raw', src: PLATES.hero.src, alt: PLATES.hero.alt,
    width: PLATES.hero.width, height: PLATES.hero.height, fetchpriority: 'high', decoding: 'async' });
  heroImage.addEventListener('error', () => {
    const svg = B.render(B.bracketSection(), { label: '斗拱剖面示意' });
    heroImage.replaceWith(svg); B.prime(svg); svg.classList.add('drawn');
    heroFigure.querySelector('figcaption').textContent = '斗拱剖面示意';
  });
  heroFigure.append(heroImage, h('figcaption', {}, '<span class="mono">佛光寺东大殿 · 柱头铺作</span><span class="mono">一攒斗拱，承起深檐</span>'));
  $('#hero-fig').appendChild(heroFigure);

  // ---- map ----
  let mapSites = [], mapWidth = 0;
  function renderMap(allSites) {
    mapSites = allSites;
    const visitedSites = allSites.filter(site => site.record.status === 'visited');
    const places = PLACES.filter(place => visitedSites.some(site => site.placeKey === place.key));
    const unmapped = visitedSites.filter(site => !places.some(place => place.key === site.placeKey));
    const svg = $('#mapsvg');
    svg.replaceChildren();
    svg.classList.remove('focus');
    $('#map-summary').textContent = `${visitedSites.length} 处已到访 · ${places.length} 个地点`;
    const W = Math.max(320, Math.round(svg.getBoundingClientRect().width));
    const H = W < 640 ? 640 : Math.max(640, Math.min(800, Math.round(W * .62)));
    const pad = { l: 44, r: 28, t: 28, b: 36 };
    mapWidth = W;
    const lat0 = Math.min(28.8, ...places.map(p => p.lat - .9)), lat1 = Math.max(40.7, ...places.map(p => p.lat + .9));
    const lon0 = Math.min(108.2, ...places.map(p => p.lon - 1.8)), lon1 = Math.max(122.6, ...places.map(p => p.lon + 1.8)), cosL = Math.cos((lat0 + lat1) / 2 * Math.PI / 180);
    const kLat = Math.min((H - pad.t - pad.b) / (lat1 - lat0), (W - pad.l - pad.r) / ((lon1 - lon0) * cosL)), kLon = kLat * cosL;
    const centerX = (pad.l + W - pad.r) / 2, centerY = (pad.t + H - pad.b) / 2;
    const X = lon => centerX + (lon - (lon0 + lon1) / 2) * kLon, Y = lat => centerY - (lat - (lat0 + lat1) / 2) * kLat;
    const west = (lon0 + lon1) / 2 - (W - pad.l - pad.r) / (2 * kLon), east = (lon0 + lon1) / 2 + (W - pad.l - pad.r) / (2 * kLon);
    const south = (lat0 + lat1) / 2 - (H - pad.t - pad.b) / (2 * kLat), north = (lat0 + lat1) / 2 + (H - pad.t - pad.b) / (2 * kLat);
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-label', `${places.length}地、${visitedSites.length - unmapped.length}处已到访古迹的位置示意图`);
    const gridStep = W < 640 ? 4 : 2;
    for (let lat = Math.ceil(south / gridStep) * gridStep; lat <= north; lat += gridStep) { svg.appendChild(sv('line', { class: 'grid', x1: pad.l, x2: W - pad.r, y1: Y(lat), y2: Y(lat) })); svg.appendChild(sv('text', { x: pad.l - 6, y: Y(lat) + 4, 'text-anchor': 'end' }, `${lat}°N`)); }
    for (let lon = Math.ceil(west / gridStep) * gridStep; lon <= east; lon += gridStep) { svg.appendChild(sv('line', { class: 'grid', x1: X(lon), x2: X(lon), y1: pad.t, y2: H - pad.b })); svg.appendChild(sv('text', { x: X(lon), y: H - pad.b + 20, 'text-anchor': 'middle' }, `${lon}°E`)); }
    svg.appendChild(sv('rect', { class: 'frame', x: pad.l, y: pad.t, width: W - pad.l - pad.r, height: H - pad.t - pad.b }));
    svg.appendChild(sv('text', { class: 'prov', x: X(111.6), y: Y(39.75) }, '山西'));
    svg.appendChild(sv('text', { class: 'prov', x: X(108.6), y: Y(36.2) }, '陕西'));
    svg.appendChild(sv('text', { class: 'prov', x: X(117.6), y: Y(33.2) }, '江苏'));
    svg.appendChild(sv('text', { class: 'prov', x: X(117.2), y: Y(38.5) }, '河北'));
    svg.appendChild(sv('text', { class: 'prov', x: X(113.6), y: Y(33.5) }, '河南'));
    svg.appendChild(sv('text', { class: 'prov', x: X(116.5), y: Y(31.4) }, '浙江'));
    if (places.some(place => place.country === 'JP')) svg.appendChild(sv('text', { class: 'prov', x: X(131.5), y: Y(36) }, '日本'));
    const mapLabels = [];
    places.forEach(p => {
      const g = sv('a', { class: 'pt', 'data-key': p.key, href: FangguNavigation.detailURL(visitedSites.find(s => s.placeKey === p.key).id), 'aria-label': `细读${visitedSites.find(s => s.placeKey === p.key).name}` });
      g.appendChild(sv('title', {}, `${p.name} · ${visitedSites.filter(site => site.placeKey === p.key).map(site => site.name).join('、')}`));
      const acc = DYN[visitedSites.find(s => s.placeKey === p.key).dyn].acc;
      g.style.setProperty('--acc', acc);
      const x = X(p.lon), y = Y(p.lat);
      g.appendChild(sv('circle', { class: 'halo', cx: x, cy: y, r: 6 }));
      g.appendChild(sv('circle', { class: 'halo h2', cx: x, cy: y, r: 6 }));
      g.appendChild(sv('circle', { class: 'core', cx: x, cy: y, r: 4 }));
      const candidates = [];
      // A shared grid keeps dense maps from fragmenting the space needed by later labels.
      if (places.length > 40) {
        for (let top = pad.t + 3; top + 22 <= H - pad.b; top += 28) {
          for (let left = pad.l; left + 80 <= W - 8; left += 86) {
            const rect = { left, right: left + 80, top, bottom: top + 22 };
            const overlap = mapLabels.some(r => rect.left < r.right + 5 && rect.right > r.left - 5 && rect.top < r.bottom + 4 && rect.bottom > r.top - 4);
            const coversPoint = places.some(other => X(other.lon) > rect.left - 5 && X(other.lon) < rect.right + 5 && Y(other.lat) > rect.top - 5 && Y(other.lat) < rect.bottom + 5);
            if (overlap || coversPoint) continue;
            const facingRight = x <= left + 40, tx = facingRight ? left : left + 80;
            candidates.push({ ...rect, facingRight, cost: Math.abs(tx - x) + Math.abs(top + 8 - y) * 1.3 });
          }
        }
      } else for (const right of [p.side !== 'l', p.side === 'l']) {
        for (const dx of [12, 70, 130, 190, 250, 310, 370, 430, 490]) {
          for (let dy = -H; dy <= H; dy += 18) {
            const width = 80, left = right ? x + dx : x - dx - width, top = y - 8 + dy;
            if (left < pad.l || left + width > W - 8 || top < pad.t + 3 || top + 22 > H - pad.b) continue;
            const rect = { left, right: left + width, top, bottom: top + 22 };
            const overlap = mapLabels.some(r => rect.left < r.right + 5 && rect.right > r.left - 5 && rect.top < r.bottom + 4 && rect.bottom > r.top - 4);
            const coversPoint = places.some(other => other !== p && X(other.lon) > rect.left - 5 && X(other.lon) < rect.right + 5 && Y(other.lat) > rect.top - 5 && Y(other.lat) < rect.bottom + 5);
            if (!overlap && !coversPoint) candidates.push({ ...rect, facingRight: right, cost: dx + Math.abs(dy - (p.dy || 0)) * 1.3 + (right === (p.side !== 'l') ? 0 : 8) });
          }
        }
      }
      // Dense clusters can exhaust positions aligned to a point; use the remaining gaps.
      if (!candidates.length) {
        for (let top = pad.t + 3; top + 22 <= H - pad.b; top += 6) {
          for (let left = pad.l; left + 80 <= W - 8; left += 6) {
            const rect = { left, right: left + 80, top, bottom: top + 22 };
            const overlap = mapLabels.some(r => rect.left < r.right + 5 && rect.right > r.left - 5 && rect.top < r.bottom + 4 && rect.bottom > r.top - 4);
            const coversPoint = places.some(other => X(other.lon) > rect.left - 5 && X(other.lon) < rect.right + 5 && Y(other.lat) > rect.top - 5 && Y(other.lat) < rect.bottom + 5);
            if (overlap || coversPoint) continue;
            const facingRight = x <= left + 40, tx = facingRight ? left : left + 80;
            candidates.push({ ...rect, facingRight, cost: Math.abs(tx - x) + Math.abs(top + 8 - y) * 1.3 });
          }
        }
      }
      const label = candidates.sort((a, b) => a.cost - b.cost)[0] || { left: x + 12, right: x + 92, top: y - 8, bottom: y + 14, facingRight: true };
      mapLabels.push(label);
      const tx = label.facingRight ? label.left : label.right;
      if (Math.abs(label.top + 8 - y) > 16 || Math.abs(tx - x) > 20) g.appendChild(sv('line', { class: 'leader', x1: x, y1: y, x2: tx, y2: label.top + 12 }));
      g.appendChild(sv('text', { class: 'name', x: tx, y: label.top + 13, 'text-anchor': label.facingRight ? 'start' : 'end' }, p.name));
      svg.appendChild(g);
    });
    $('#map-note').textContent = visitedSites.length
      ? '点亮已经到访的地方，点选地点细读古迹。'
      : '还没有到访印记，从图鉴中的第一处打卡开始。';
    const focus = key => { svg.classList.toggle('focus', !!key); svg.querySelectorAll('.pt').forEach(g => g.classList.toggle('on', g.dataset.key === key)); };
    svg.querySelectorAll('.pt').forEach(g => {
      g.addEventListener('mouseenter', () => focus(g.dataset.key));
      g.addEventListener('mouseleave', () => focus(null));
      g.addEventListener('focus', () => focus(g.dataset.key));
      g.addEventListener('blur', () => focus(null));
    });
  }
  const mapResize = new ResizeObserver(entries => {
    if (Math.abs(entries[0].contentRect.width - mapWidth) > 1) renderMap(mapSites);
  });
  mapResize.observe($('#mapsvg'));
  window.addEventListener('fanggu:change', event => renderMap(event.detail.sites));

  FangguTimeline.mount(SITES, DYN);

  // back to top: appears once the hero has scrolled away
  const totop = $('#totop');
  if (totop) {
    const tick = () => totop.classList.toggle('show', scrollY > innerHeight * 0.9);
    addEventListener('scroll', tick, { passive: true }); tick();
    totop.addEventListener('click', () => scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }));
  }

  if (!reduced && matchMedia('(hover: hover)').matches) {
    addEventListener('pointermove', e => { document.body.style.setProperty('--mx', e.clientX + 'px'); document.body.style.setProperty('--my', e.clientY + 'px'); }, { passive: true });
  }
})();
