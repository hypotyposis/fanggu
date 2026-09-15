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
  let mapObserver;
  function renderMap(allSites) {
    const visitedSites = allSites.filter(site => site.record.status === 'visited');
    const places = PLACES.filter(place => visitedSites.some(site => site.placeKey === place.key));
    const unmapped = visitedSites.filter(site => !places.some(place => place.key === site.placeKey));
    const svg = $('#mapsvg');
    svg.replaceChildren();
    $('#places').replaceChildren();
    $('#map-summary').textContent = `${visitedSites.length} 处已到访 · ${places.length} 地已落图`;
    const W = 670, H = 700, pad = { l: 44, r: 30, t: 40, b: 44 };
    const lat0 = Math.min(28.8, ...places.map(p => p.lat - .9)), lat1 = Math.max(40.7, ...places.map(p => p.lat + .9));
    const lon0 = Math.min(108.2, ...places.map(p => p.lon - 1.8)), lon1 = Math.max(122.6, ...places.map(p => p.lon + 1.8)), cosL = Math.cos((lat0 + lat1) / 2 * Math.PI / 180);
    const kLat = Math.min((H - pad.t - pad.b) / (lat1 - lat0), (W - pad.l - pad.r) / ((lon1 - lon0) * cosL)), kLon = kLat * cosL;
    const X = lon => pad.l + (lon - lon0) * kLon, Y = lat => pad.t + (lat1 - lat) * kLat;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.setAttribute('aria-label', `${places.length}地、${visitedSites.length - unmapped.length}处已到访古迹的位置示意图`);
    for (let lat = Math.ceil(lat0 / 2) * 2; lat <= lat1; lat += 2) { svg.appendChild(sv('line', { class: 'grid', x1: pad.l, x2: X(lon1), y1: Y(lat), y2: Y(lat) })); svg.appendChild(sv('text', { x: pad.l - 6, y: Y(lat) + 4, 'text-anchor': 'end' }, `${lat}°N`)); }
    for (let lon = Math.ceil(lon0 / 2) * 2; lon <= lon1; lon += 2) { svg.appendChild(sv('line', { class: 'grid', x1: X(lon), x2: X(lon), y1: pad.t, y2: Y(lat0) })); svg.appendChild(sv('text', { x: X(lon), y: Y(lat0) + 18, 'text-anchor': 'middle' }, `${lon}°E`)); }
    svg.appendChild(sv('rect', { class: 'frame', x: pad.l, y: pad.t, width: X(lon1) - pad.l, height: Y(lat0) - pad.t }));
    svg.appendChild(sv('text', { class: 'prov', x: X(111.6), y: Y(39.75) }, '山西'));
    svg.appendChild(sv('text', { class: 'prov', x: X(108.6), y: Y(36.2) }, '陕西'));
    svg.appendChild(sv('text', { class: 'prov', x: X(117.6), y: Y(33.2) }, '江苏'));
    svg.appendChild(sv('text', { class: 'prov', x: X(117.2), y: Y(38.5) }, '河北'));
    svg.appendChild(sv('text', { class: 'prov', x: X(113.6), y: Y(33.5) }, '河南'));
    svg.appendChild(sv('text', { class: 'prov', x: X(116.5), y: Y(31.4) }, '浙江'));
    if (places.some(place => place.country === 'JP')) svg.appendChild(sv('text', { class: 'prov', x: X(131.5), y: Y(36) }, '日本'));
    const routePlaces = ROUTE.map(key => places.find(place => place.key === key)).filter(Boolean);
    const route = sv('path', { class: 'route draw', d: routePlaces.map((place, index) => `${index && (place.country || 'CN') === (routePlaces[index - 1].country || 'CN') ? 'L' : 'M'}${X(place.lon).toFixed(1)},${Y(place.lat).toFixed(1)}`).join('') });
    svg.appendChild(route);
    const mapLabels = [];
    places.forEach(p => {
      const g = sv('a', { class: 'pt', 'data-key': p.key, href: FangguNavigation.detailURL(visitedSites.find(s => s.placeKey === p.key).id), 'aria-label': `细读${visitedSites.find(s => s.placeKey === p.key).name}` });
      const acc = DYN[visitedSites.find(s => s.placeKey === p.key).dyn].acc;
      g.style.setProperty('--acc', acc);
      const x = X(p.lon), y = Y(p.lat);
      g.appendChild(sv('circle', { class: 'halo', cx: x, cy: y, r: 6 }));
      g.appendChild(sv('circle', { class: 'halo h2', cx: x, cy: y, r: 6 }));
      g.appendChild(sv('circle', { class: 'core', cx: x, cy: y, r: 4 }));
      const candidates = [];
      // A shared grid keeps dense maps from fragmenting the space needed by later labels.
      if (places.length > 40) {
        for (let top = pad.t + 3; top + 32 <= H - pad.b; top += 38) {
          for (let left = pad.l; left + 112 <= W - 8; left += 118) {
            const rect = { left, right: left + 112, top, bottom: top + 32 };
            const overlap = mapLabels.some(r => rect.left < r.right + 5 && rect.right > r.left - 5 && rect.top < r.bottom + 4 && rect.bottom > r.top - 4);
            const coversPoint = places.some(other => X(other.lon) > rect.left - 5 && X(other.lon) < rect.right + 5 && Y(other.lat) > rect.top - 5 && Y(other.lat) < rect.bottom + 5);
            if (overlap || coversPoint) continue;
            const facingRight = x <= left + 56, tx = facingRight ? left : left + 112;
            candidates.push({ ...rect, facingRight, cost: Math.abs(tx - x) + Math.abs(top + 8 - y) * 1.3 });
          }
        }
      } else for (const right of [p.side !== 'l', p.side === 'l']) {
        for (const dx of [12, 70, 130, 190, 250, 310, 370, 430, 490]) {
          for (let dy = -684; dy <= 684; dy += 18) {
            const width = 112, left = right ? x + dx : x - dx - width, top = y - 8 + dy;
            if (left < pad.l || left + width > W - 8 || top < pad.t + 3 || top + 32 > H - pad.b) continue;
            const rect = { left, right: left + width, top, bottom: top + 32 };
            const overlap = mapLabels.some(r => rect.left < r.right + 5 && rect.right > r.left - 5 && rect.top < r.bottom + 4 && rect.bottom > r.top - 4);
            const coversPoint = places.some(other => other !== p && X(other.lon) > rect.left - 5 && X(other.lon) < rect.right + 5 && Y(other.lat) > rect.top - 5 && Y(other.lat) < rect.bottom + 5);
            if (!overlap && !coversPoint) candidates.push({ ...rect, facingRight: right, cost: dx + Math.abs(dy - (p.dy || 0)) * 1.3 + (right === (p.side !== 'l') ? 0 : 8) });
          }
        }
      }
      // Dense clusters can exhaust positions aligned to a point; use the remaining gaps.
      if (!candidates.length) {
        for (let top = pad.t + 3; top + 32 <= H - pad.b; top += 6) {
          for (let left = pad.l; left + 112 <= W - 8; left += 6) {
            const rect = { left, right: left + 112, top, bottom: top + 32 };
            const overlap = mapLabels.some(r => rect.left < r.right + 5 && rect.right > r.left - 5 && rect.top < r.bottom + 4 && rect.bottom > r.top - 4);
            const coversPoint = places.some(other => X(other.lon) > rect.left - 5 && X(other.lon) < rect.right + 5 && Y(other.lat) > rect.top - 5 && Y(other.lat) < rect.bottom + 5);
            if (overlap || coversPoint) continue;
            const facingRight = x <= left + 56, tx = facingRight ? left : left + 112;
            candidates.push({ ...rect, facingRight, cost: Math.abs(tx - x) + Math.abs(top + 8 - y) * 1.3 });
          }
        }
      }
      const label = candidates.sort((a, b) => a.cost - b.cost)[0] || { left: x + 12, right: x + 124, top: y - 8, bottom: y + 24, facingRight: true };
      mapLabels.push(label);
      const tx = label.facingRight ? label.left : label.right;
      if (Math.abs(label.top + 8 - y) > 16 || Math.abs(tx - x) > 20) g.appendChild(sv('line', { class: 'leader', x1: x, y1: y, x2: tx, y2: label.top + 12 }));
      g.appendChild(sv('text', { class: 'name', x: tx, y: label.top + 13, 'text-anchor': label.facingRight ? 'start' : 'end' }, p.name));
      g.appendChild(sv('text', { class: 'coord', x: tx, y: label.top + 28, 'text-anchor': label.facingRight ? 'start' : 'end' }, `${p.lat.toFixed(2)}N ${p.lon.toFixed(2)}E`));
      svg.appendChild(g);
    });
    const L = places.length > 1 ? route.getTotalLength() : 0; route.style.setProperty('--len', L);
    // list
    const ul = $('#places');
    places.forEach(p => {
      const ss = visitedSites.filter(s => s.placeKey === p.key);
      const dateLabels = ss.map(s => s.yearLabel || s.year).join(' / ');
      const yrs = ss.length > 3 || dateLabels.length > 24
        ? `${Math.min(...ss.map(s => s.year))} – ${Math.max(...ss.map(s => s.year))}`
        : dateLabels;
      const li = h('li', { 'data-key': p.key }, `<b>${p.name}</b><span class="sites">${ss.map(s => `<a href="${FangguNavigation.detailURL(s.id)}">${s.name}</a>`).join('')}</span><span class="mono">${p.country === 'JP' ? '日本 · ' : ''}${p.prov} · ${yrs}</span>`);
      ul.appendChild(li);
    });
    unmapped.forEach(site => {
      const li = h('li');
      const name = h('b'); name.textContent = site.name;
      const place = h('span', { class: 'sites' }); place.textContent = site.place;
      const edit = h('button', { class: 'card-button', type: 'button', 'data-action': 'visit', 'data-id': site.id }, '到访记录');
      li.append(name, place, edit); ul.append(li);
    });
    if (!visitedSites.length) ul.append(h('li', {}, '还没有到访印记，从图鉴中的第一处打卡开始。'));
    const focus = key => { svg.classList.toggle('focus', !!key); svg.querySelectorAll('.pt').forEach(g => g.classList.toggle('on', g.dataset.key === key)); ul.querySelectorAll('li').forEach(li => li.classList.toggle('on', li.dataset.key === key)); };
    [...ul.children].forEach(li => { li.addEventListener('mouseenter', () => focus(li.dataset.key)); li.addEventListener('mouseleave', () => focus(null)); });
    svg.querySelectorAll('.pt').forEach(g => { g.addEventListener('mouseenter', () => focus(g.dataset.key)); g.addEventListener('mouseleave', () => focus(null)); });
    mapObserver?.disconnect();
    mapObserver = new IntersectionObserver((es, o) => es.forEach(e => { if (e.isIntersecting) { svg.classList.add('drawn'); o.disconnect(); } }), { threshold: .3 });
    mapObserver.observe(svg);
  }
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
