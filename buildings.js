/* buildings.js — composers that turn a few parameters into a full elevation Sheet,
 * plus the SVG renderer and the stroke-draw priming used by the page. */
const Buildings = (() => {
  const { Sheet, r, rect, line, eave, eaveRev, sag, chiwen, tiles, bracketPath, bracketH,
    bracketBand, railing, platform, colonnade, hipRoof, gableHipRoof, gableRoof, gableEnd, skirtRoof } = Draft;

  // ---- single-storey hall: 庑殿 or 歇山 ----
  function hall(o) {
    const inset = o.roof === 'gable' && !o.S && o.gableEnd !== false;
    const S = o.S || new Sheet(o.w || (inset ? 960 : 800), o.h || 560), cx = o.cx ?? (inset ? 400 : S.w / 2);
    const W = o.bays * o.bw, x0 = cx - W / 2, x1 = x0 + W;
    const yG = o.yG ?? S.h - 34, yP = yG - o.platH;
    platform(S, x0 - o.platPad, x1 + o.platPad, yP, o.platH, true, !o.S);
    if (o.platH > 30) S.stroke('base', line(x0 - o.platPad + 10, yP + o.platH * 0.5, x1 + o.platPad - 10, yP + o.platH * 0.5), 'thin');
    const { yL } = colonnade(S, x0, yP, o.bays, o.bw, o.colH, o.fills, { lower: o.lower });
    const top = bracketBand(S, x0, x1, yL, o.bracketS, o.bays + 1, o.tiers || 2, o.interm ?? 1, { intermS: o.intermS, intermTiers: o.intermTiers, intermLudou: o.intermLudou, ang: o.ang, intermAng: o.intermAng });
    const yE = top - 9, xa = x0 - o.overhang, xb = x1 + o.overhang;
    const ro = { ridgeW: W * o.ridgeRatio, roofH: o.roofH, lift: o.lift || 14, chiwen: o.chiwen, chiStyle: o.chiStyle, gableH: o.gableH, k: o.k || 60, ridgeOrn: o.ridgeOrn };
    const roof = o.roof === 'hip' ? hipRoof(S, cx, xa, xb, yE, ro) : o.roof === 'gable' ? gableRoof(S, cx, xa, xb, yE, ro) : gableHipRoof(S, cx, xa, xb, yE, ro);
    // notes
    if (!o.quiet) {
      S.note(roof.xr1, roof.yR - (o.chiwen || 20) * 0.6, o.chiStyle === 'tang' ? '鸱尾' : '鸱吻', 'r');
      if (inset) S.note(x0 - 12, yL - bracketH(o.bracketS, o.tiers || 2) / 2, '斗拱 · ' + (o.puzuo || '五铺作'), 'l');
      else S.note(x1 + 12, yL - bracketH(o.bracketS, o.tiers || 2) / 2, '斗拱 · ' + (o.puzuo || '五铺作'), 'r');
      S.note(xa + 8, yE - 8, o.roof === 'hip' ? '庑殿 · 出檐' : o.roof === 'gable' ? '悬山 · 博风' : '歇山 · 戗脊', 'l');
      if (!inset) S.note(x0 + 2, yP - o.colH * 0.55, '侧脚 · 生起', 'l');
      S.note(cx + o.bw * 0.5, yP + o.platH * 0.5, '台基 · 踏道', 'r');
      if (o.ridgeNote) S.note(cx, roof.yR + 2, o.ridgeNote, 'l', 70);
      S.dim = { x0: x0 - o.platPad, x1: x1 + o.platPad, y: yG + 18, label: o.dimLabel };
    }
    if (inset) {
      const gx = xb + 130;
      gableEnd(S, gx, yG, { depth: o.depth || W * 0.5, colH: o.colH, platH: o.platH, roofH: o.roofH * 0.96, ov: o.overhang * 0.55 });
    }
    S.top = roof.yR - (o.chiwen || 20);
    S.span = { x0: x0 - o.platPad, x1: x1 + o.platPad };
    return S;
  }

  // ---- a brick pagoda beside a small hall on one ground line (原起寺) ----
  function towerAndHall(o) {
    const S = new Sheet(800, 560), yG = 526;
    S.stroke('base', line(40, yG, 760, yG), 'ground');
    tierTower({ ...o.tower, S, cx: o.towerX || 230, yG });
    const tTop = S.top;
    hall({ ...o.hall, S, cx: o.hallX || 560, yG, quiet: true });
    if (o.towerNote) S.note((o.towerX || 230) + o.tower.storeys[0].w / 2 + 4, yG - o.tower.storeys[0].wallH * 0.5 - (o.tower.base ? o.tower.base[0].h : 0), o.towerNote, 'r');
    if (o.hallNote) S.note((o.hallX || 560) + o.hall.bays * o.hall.bw / 2 + o.hall.overhang - 6, S.top + 40, o.hallNote, 'r');
    S.dim = { x0: (o.towerX || 230) - o.tower.base[0].w / 2, x1: (o.towerX || 230) + o.tower.base[0].w / 2, y: yG + 16, label: o.dimLabel, v: { x: (o.towerX || 230) - o.tower.base[0].w / 2 - 40, y0: yG, y1: tTop - 4, label: o.vLabel } };
    S.dim2 = { x0: S.span.x0, x1: S.span.x1, y: yG + 16, label: o.dimLabel2 };
    return S;
  }

  // ---- two-storey pavilion (楼阁) with 平座, upper 歇山 ----
  function pavilion(o) {
    const S = o.S || new Sheet(800, 560), cx = o.cx ?? S.w / 2, k = o.k || 1;
    const W = o.bays * o.bw, x0 = cx - W / 2, x1 = x0 + W;
    const yG = o.yG ?? S.h - 34, yP = yG - o.platH;
    platform(S, x0 - o.platPad, x1 + o.platPad, yP, o.platH, true, !o.S);
    const { yL } = colonnade(S, x0, yP, o.bays, o.bw, o.colH, o.fills);
    const top = bracketBand(S, x0, x1, yL, o.bracketS, o.bays + 1, 2, 1);
    const yE1 = top - 9 * k, ov = o.overhang;
    const bw2 = W + 30 * k, bx0 = cx - bw2 / 2, bx1 = cx + bw2 / 2, yT = yE1 - o.skirtH;
    skirtRoof(S, x0 - ov, x1 + ov, yE1, bx0, bx1, yT, { k: 46 * k, lift: 12 * k });
    // 平座
    const pzTop = bracketBand(S, bx0 + 8 * k, bx1 - 8 * k, yT, 0.9 * k, o.bays + 1, 1, 1);
    S.stroke('frame', rect(bx0, pzTop - 5 * k, bw2, 5 * k));
    railing(S, bx0 + 4 * k, bx1 - 4 * k, pzTop - 5 * k, 15 * k);
    const yP2 = pzTop - 20 * k;
    const W2 = W - 2 * o.inset, x20 = cx - W2 / 2;
    const { yL: yL2 } = colonnade(S, x20, yP2, o.bays, W2 / o.bays, o.colH2, o.fills2);
    const top2 = bracketBand(S, x20, x20 + W2, yL2, o.bracketS, o.bays + 1, 2, 1);
    const yE2 = top2 - 9 * k;
    const roof = gableHipRoof(S, cx, x20 - ov, x20 + W2 + ov, yE2, { ridgeW: W2 * 0.55, roofH: o.roofH, gableH: o.gableH, lift: 13 * k, chiwen: o.chiwen || 18, k: 50 * k });
    if (!o.quiet) {
      S.note(roof.xr0 + 4, roof.yB, '歇山 · 山花', 'l');
      S.note(bx1 - 2, pzTop - 12, '平座 · 勾阑', 'r');
      S.note(x1 + ov - 6, yE1 - 6, '腰檐', 'r');
      S.note(x0 - 4, yL - 18, '斗拱', 'l');
      S.dim = { x0: x0 - o.platPad, x1: x1 + o.platPad, y: yG + 18, label: o.dimLabel };
    }
    S.top = roof.yR - (o.chiwen || 18);
    return S;
  }

  // ---- octagonal storey helpers ----
  function octColonnade(S, cx, w, yP, colH, kind = 'door', plain = false) {
    const f = 0.207 * w, yL = yP - colH;
    let d = '';
    for (const x of [cx - w / 2, cx - f, cx + f, cx + w / 2]) d += line(x, yP, x, yL);
    S.stroke('frame', d, 'col');
    S.stroke('frame', rect(cx - w / 2, yL, w, 4));
    let inf = '';
    if (kind === 'door') {
      const dw = Math.min(f * 0.9, 34), dh = colH - 6;
      inf += rect(cx - dw / 2, yL + 6, dw, dh) + line(cx, yL + 6, cx, yP);
    }
    // side-face windows (直棂窗)
    if (!plain) for (const sx of [-1, 1]) {
      const wx0 = cx + sx * (f + 8), wx1 = cx + sx * (w / 2 - 8);
      const a = Math.min(wx0, wx1), b = Math.max(wx0, wx1), wh = Math.min(colH * 0.55, 26);
      if (b - a > 10) { inf += rect(a, yL + 7, b - a, wh); for (let x = a + 5; x < b - 3; x += 5) inf += line(x, yL + 7, x, yL + 7 + wh); }
    }
    S.stroke('frame', inf, 'thin');
    return yL;
  }
  function octBrackets(S, cx, w, yBase, s, tiers = 2, dense = false) {
    const f = 0.207 * w;
    let d = '';
    let xs = [cx - w / 2, cx - f, cx + f, cx + w / 2, cx - (w / 2 + f) / 2, cx + (w / 2 + f) / 2, cx];
    if (dense) { xs = []; const n = Math.round(w / 22); for (let k = 0; k <= n; k++) xs.push(cx - w / 2 + w * k / n); }
    for (const x of xs) d += bracketPath(x, yBase, s, tiers).d;
    S.stroke('bracket', d, 'brk');
    const top = yBase - bracketH(s, tiers);
    S.stroke('bracket', rect(cx - w / 2 - 16 * s, top - 3, w + 32 * s, 3));
    return top - 3;
  }
  function octEave(S, cx, w, yE, ov, wTop, band, lift = 10) {
    const xa = cx - w / 2 - ov, xb = cx + w / 2 + ov, yT = yE - band;
    const t0 = cx - wTop / 2, t1 = cx + wTop / 2, ew = xb - xa, fi = 0.207 * ew;
    S.fill('roof', `M${r(t0)},${r(yT)}L${r(t1)},${r(yT)}${sag(t1, yT, xb, yE - lift, 0.3, 0.7)}${eaveRev(xa, xb, yE, lift, 30)}${sag(xa, yE - lift, t0, yT, 0.7, 0.3)}z`);
    S.stroke('roof', eave(xa, xb, yE, lift, 30), 'eave');
    // octagon face ridges: outer corners + inner corners
    S.stroke('roof', `M${r(t0)},${r(yT)}${sag(t0, yT, xa, yE - lift, 0.3, 0.7)}M${r(t1)},${r(yT)}${sag(t1, yT, xb, yE - lift, 0.3, 0.7)}` +
      line(cx - 0.207 * wTop, yT, cx - fi, yE - 2) + line(cx + 0.207 * wTop, yT, cx + fi, yE - 2), 'ridge');
    S.stroke('roof', line(t0, yT, t1, yT), 'thin');
    return yT;
  }
  function octBalcony(S, cx, w, yBase) {
    const top = octBrackets(S, cx, w - 20, yBase, 0.75, 1);
    S.stroke('frame', rect(cx - w / 2, top - 4, w, 4));
    railing(S, cx - w / 2 + 3, cx + w / 2 - 3, top - 4, 10);
    return top - 14;
  }
  function sha(S, cx, yApex, hTotal) { // 塔刹
    let d = '', y = yApex;
    d += `M${r(cx - 11)},${r(y)}l2,-8h18l2,8z`; y -= 8;             // 基座
    d += `M${r(cx - 14)},${r(y)}l3,-6h22l3,6z`; y -= 6;              // 仰莲
    const rings = 7, rh = hTotal * 0.55 / rings;
    for (let i = 0; i < rings; i++) { const rw = 20 - i * 1.6; d += `M${r(cx - rw / 2)},${r(y)}a${r(rw / 2)},${r(rh / 2)} 0 1 0 ${r(rw)},0a${r(rw / 2)},${r(rh / 2)} 0 1 0 ${r(-rw)},0`; y -= rh; }
    d += `M${r(cx - 15)},${r(y)}a15,3 0 1 0 30,0a15,3 0 1 0 -30,0`; y -= 7; // 宝盖
    d += `M${r(cx - 5)},${r(y)}a5,5 0 1 0 10,0a5,5 0 1 0 -10,0`; y -= 10;  // 宝珠
    S.stroke('ornament', d, 'orn');
    return { top: y, gai: y + 17 };
  }

  // ---- 楼阁式木塔 (应县木塔) ----
  function woodPagoda(o) {
    const w = 560, h = 800, S = new Sheet(w, h), cx = w / 2;
    const yG = h - 30;
    platform(S, cx - 215, cx + 215, yG - 16, 16, true);
    platform(S, cx - 172, cx + 172, yG - 30, 14, false, false);
    let y = yG - 30;
    // storey 1 with 副阶周匝
    const s1 = o.storeys[0];
    let yL = octColonnade(S, cx, s1.porch, y, s1.colH, 'door', true);
    let top = octBrackets(S, cx, s1.porch, yL, s1.bs, 2);
    let yE = top - 7;
    let yT = octEave(S, cx, s1.porch, yE, s1.over, s1.w, s1.band);
    S.note(cx + s1.porch / 2 + s1.over - 4, yE - 6, '副阶周匝', 'r');
    // body of storey 1 above the skirt
    S.stroke('frame', line(cx - s1.w / 2, yT, cx - s1.w / 2, yT - 14) + line(cx + s1.w / 2, yT, cx + s1.w / 2, yT - 14), 'col');
    S.stroke('frame', rect(cx - s1.w / 2, yT - 18, s1.w, 4));
    top = octBrackets(S, cx, s1.w, yT - 18, s1.bs, 2);
    yE = top - 7;
    let nextW = o.storeys[1].w + 22;
    yT = octEave(S, cx, s1.w, yE, s1.over, nextW, s1.band);
    for (let i = 1; i < o.storeys.length; i++) {
      const st = o.storeys[i];
      const yP = octBalcony(S, cx, st.w + 22, yT);
      if (i === 2) S.note(cx + st.w / 2 + 12, yP + 8, '平座', 'r');
      yL = octColonnade(S, cx, st.w, yP, st.colH, 'door');
      top = octBrackets(S, cx, st.w, yL, st.bs, 2);
      if (i === 3) S.note(cx - st.w / 2 - 4, yL - 10, '斗拱 · 五十四种', 'l');
      yE = top - 7;
      const last = i === o.storeys.length - 1;
      if (!last) { nextW = o.storeys[i + 1].w + 22; yT = octEave(S, cx, st.w, yE, st.over, nextW, st.band); }
      else {
        // 八角攒尖 top roof
        const xa = cx - st.w / 2 - st.over, xb = cx + st.w / 2 + st.over, lift = 10, ew = xb - xa, fi = 0.207 * ew;
        const yA = yE - o.topH;
        S.fill('roof', `M${r(cx)},${r(yA)}${sag(cx, yA, xb, yE - lift, 0.3, 0.7)}${eaveRev(xa, xb, yE, lift, 30)}${sag(xa, yE - lift, cx, yA, 0.7, 0.3)}z`);
        S.stroke('roof', eave(xa, xb, yE, lift, 30), 'eave');
        S.stroke('roof', `M${r(cx)},${r(yA)}${sag(cx, yA, xa, yE - lift, 0.3, 0.7)}M${r(cx)},${r(yA)}${sag(cx, yA, xb, yE - lift, 0.3, 0.7)}` +
          `M${r(cx)},${r(yA)}${sag(cx, yA, cx - fi, yE - 2, 0.3, 0.7)}M${r(cx)},${r(yA)}${sag(cx, yA, cx + fi, yE - 2, 0.3, 0.7)}`, 'ridge');
        const sh = sha(S, cx, yA, o.shaH);
        S.stroke('ornament', line(cx - 14, sh.gai, xa + 6, yE - lift - 2) + line(cx + 14, sh.gai, xb - 6, yE - lift - 2), 'chain');
        S.note(cx + 12, sh.gai - 20, '塔刹 · 相轮', 'r');
        S.topY = sh.top;
      }
    }
    S.dim = { x0: cx - 215, x1: cx + 215, y: yG + 16, label: o.dimLabel, v: { x: cx - 250, y0: yG, y1: S.topY - 6, label: o.vLabel } };
    return S;
  }

  // ---- 砖塔, 上大下小 (文峰塔) — calibrated against a photo: tall plain first storey with
  // a relief band, dense brick-imitating bracket bands under tiled eaves, four short upper
  // storeys widening upward, a parapet platform and a large Tibetan stupa on top ----
  function brickPagoda(o) {
    const w = 560, h = 800, S = new Sheet(w, h), cx = w / 2;
    const yG = h - 30, ov = o.over;
    platform(S, cx - 150, cx + 150, yG - 18, 18, true);
    let y = yG - 18;
    // storey 1: plain brick body
    const w1 = o.w0, f1 = 0.207 * w1, H1 = o.firstH;
    let d = rect(cx - w1 / 2, y - H1, w1, H1) + line(cx - f1, y - H1, cx - f1, y) + line(cx + f1, y - H1, cx + f1, y);
    S.stroke('frame', d, 'col');
    // 券门 with lattice on the front face, 砖雕假窗 panels on the side faces
    const dw = f1 * 1.1, dh = H1 * 0.46, arch = (x, yb, ww, hh) => `M${r(x - ww / 2)},${r(yb)}v${r(-(hh - ww / 2))}a${r(ww / 2)},${r(ww / 2)} 0 0 1 ${r(ww)},0v${r(hh - ww / 2)}z`;
    let f = arch(cx, y - 6, dw, dh) + arch(cx, y - 6, dw - 8, dh - 6);
    const lx0 = cx - dw / 2 + 8, lx1 = cx + dw / 2 - 8, ly0 = y - 6 - dh * 0.55, ly1 = y - 6;
    f += rect(lx0, ly0, lx1 - lx0, ly1 - ly0);
    for (let x = lx0 + 6; x < lx1 - 2; x += 6) f += line(x, ly0, x, ly1);
    for (let yy = ly0 + 6; yy < ly1 - 2; yy += 6) f += line(lx0, yy, lx1, yy);
    for (const sx of [-1, 1]) { const px = cx + sx * (f1 + (w1 / 2 - f1) / 2), pw = (w1 / 2 - f1) * 0.62, ph = dh * 0.7, py = y - 6 - dh * 0.15; f += rect(px - pw / 2, py - ph, pw, ph) + rect(px - pw / 2 + 4, py - ph + 4, pw - 8, ph - 8); }
    S.stroke('frame', f, 'thin');
    // 佛传砖雕 relief band near the top of the first storey
    const bh = H1 * 0.18, by = y - H1 + 8;
    let rb = rect(cx - w1 / 2, by, w1, bh) + line(cx - w1 / 2, by + bh + 6, cx + w1 / 2, by + bh + 6);
    for (const [a, b] of [[cx - w1 / 2, cx - f1], [cx - f1, cx + f1], [cx + f1, cx + w1 / 2]]) {
      const n = Math.max(1, Math.round((b - a) / 18));
      for (let k = 1; k < n; k++) rb += line(a + (b - a) * k / n, by, a + (b - a) * k / n, by + bh);
      for (let k = 0; k < n; k++) { const mx = a + (b - a) * (k + .5) / n; rb += `M${r(mx - 3)},${r(by + bh * .7)}q3,-${r(bh * .45)} 6,0`; }
    }
    S.stroke('frame', rb, 'thin');
    S.note(cx + w1 / 2 - 2, by + bh / 2, '佛传砖雕带', 'r');
    S.note(cx - dw / 2 - 2, y - dh * 0.5, '券门', 'l');
    y -= H1;
    let wPrev = w1;
    for (let i = 0; i < o.storeys; i++) {
      const wi = i === 0 ? w1 : o.w0 * (1 + o.grow * i), wn = o.w0 * (1 + o.grow * (i + 1));
      if (i > 0) { // short upper storey wall (朱红 wall with small 券门 per face)
        const fi = 0.207 * wi, wallH = o.wallH;
        let wd = rect(cx - wi / 2, y - wallH, wi, wallH) + line(cx - fi, y - wallH, cx - fi, y) + line(cx + fi, y - wallH, cx + fi, y);
        wd += arch(cx, y - 4, 16, wallH - 10);
        for (const sx of [-1, 1]) wd += rect(cx + sx * (fi + (wi / 2 - fi) / 2) - 5, y - wallH + 8, 10, wallH - 16);
        S.stroke('frame', wd, 'thin');
        y -= wallH;
      }
      // brick-imitating bracket band, dense
      const top = octBrackets(S, cx, wi, y, o.bs, 2, true);
      if (i === 3) S.note(cx + wi / 2 + 6, y - 8, '仿木砖斗拱', 'r');
      const yE = top - 6;
      const last = i === o.storeys - 1;
      const yT = octEave(S, cx, wi, yE, ov, last ? wn + 4 : wn, o.band, 9);
      if (i === 2) S.note(cx + wi / 2 + ov - 4, yE - 5, '瓦檐 · 翘角', 'r');
      y = yT;
      wPrev = wi;
    }
    // 塔顶平台 with parapet
    const wt = o.w0 * (1 + o.grow * o.storeys) + 4;
    S.stroke('frame', rect(cx - wt / 2 - 8, y - 7, wt + 16, 7)); y -= 7;
    railing(S, cx - wt / 2 - 4, cx + wt / 2 + 4, y, 11); y -= 11;
    S.note(cx + wt / 2 + 6, y + 6, '平台 · 女儿墙', 'r');
    // 喇嘛塔: stepped base, bell-shaped 覆钵, neck, smooth cone (十三天), 宝珠
    let sd = '';
    for (const [sw, sh] of [[118, 6], [98, 6], [80, 6]]) { sd += rect(cx - sw / 2, y - sh, sw, sh); y -= sh; }
    const B = o.bulb;
    sd += `M${r(cx - B * .3)},${r(y)}c${r(-B * .3)},${r(-B * .12)} ${r(-B * .32)},${r(-B * .38)} ${r(-B * .15)},${r(-B * .46)}q${r(B * .45)},${r(-B * .12)} ${r(B * .9)},0c${r(B * .17)},${r(B * .08)} ${r(B * .15)},${r(B * .34)} ${r(-B * .15)},${r(B * .46)}z`;
    y -= B * .5;
    sd += rect(cx - 11, y - 6, 22, 6); y -= 6;
    const ch = o.cone, cw = 34;
    sd += `M${r(cx - cw / 2)},${r(y)}L${r(cx - 3)},${r(y - ch)}h6L${r(cx + cw / 2)},${r(y)}z`;
    for (let k = 1; k <= 5; k++) { const t = k / 6, lw = cw - (cw - 6) * t; sd += `M${r(cx - lw / 2)},${r(y - ch * t)}h${r(lw)}`; }
    y -= ch;
    sd += `M${r(cx - 5)},${r(y - 5)}a5,5 0 1 0 10,0a5,5 0 1 0 -10,0`; y -= 10;
    S.stroke('ornament', sd, 'orn');
    S.note(cx + B * .4, y + 40, '覆钵式喇嘛塔', 'r');
    S.dim = { x0: cx - o.w0 / 2 - ov, x1: cx + o.w0 / 2 + ov, y: yG + 16, label: o.dimLabel, v: { x: cx - wt / 2 - 46, y0: yG, y1: y - 4, label: o.vLabel } };
    return S;
  }

  // ---- 重檐歇山 + 抱厦 (摩尼殿) ----
  function crossHall(o) {
    const w = 800, h = 560, S = new Sheet(w, h), cx = w / 2;
    const W = o.bays * o.bw, x0 = cx - W / 2, x1 = x0 + W;
    const yG = h - 34, yP = yG - o.platH;
    platform(S, x0 - o.platPad, x1 + o.platPad, yP, o.platH, false);
    const { yL } = colonnade(S, x0, yP, o.bays, o.bw, o.colH, o.fills);
    const top = bracketBand(S, x0, x1, yL, o.bracketS, o.bays + 1, 2, 1, { ang: o.ang || 0, intermAng: o.ang || 0 });
    const yE1 = top - 9, ov = o.overhang;
    const W2 = W - 2 * o.bw, x20 = cx - W2 / 2, yT = yE1 - o.skirtH;
    skirtRoof(S, x0 - ov, x1 + ov, yE1, x20 - 10, x20 + W2 + 10, yT, { k: 56 });
    // upper storey
    const { yL: yL2 } = colonnade(S, x20, yT, o.bays - 2, o.bw, o.colH2, o.fills2, { lower: false });
    const top2 = bracketBand(S, x20, x20 + W2, yL2, o.bracketS, o.bays - 1, 2, 1, { ang: o.ang || 0, intermAng: o.ang || 0 });
    const yE2 = top2 - 9;
    const roof = gableHipRoof(S, cx, x20 - ov, x20 + W2 + ov, yE2, { ridgeW: W2 * 0.55, roofH: o.roofH, gableH: o.gableH, lift: 14, chiwen: o.chiwen || 22, k: 60 });
    if (o.porch !== false) {
      // 抱厦 in front, gable facing the viewer
      const pb = 3, pW = pb * o.bw, px0 = cx - pW / 2, px1 = cx + pW / 2, pov = o.porchOver || 44;
      const pyL = yP - o.porchColH;
      const pTop = pyL - bracketH(o.bracketS * 0.9, 2) - 4, pyE = pTop - 8;
      const pxa = px0 - pov, pxb = px1 + pov, plift = 12, gw = o.gableW, yB = pyE - o.porchRise, yA = yB - o.gableRise;
      // occluder: porch roof + body
      S.fill('frame', `M${r(cx)},${r(yA - 2)}L${r(cx + gw / 2 + 3)},${r(yB)}${sag(cx + gw / 2 + 3, yB, pxb, pyE - plift, 0.3, 0.7)}${eaveRev(pxa, pxb, pyE, plift, 40)}${sag(pxa, pyE - plift, cx - gw / 2 - 3, yB, 0.7, 0.3)}z` +
        rect(px0 - 6, pyE, pW + 12, yP - pyE), 'occlude');
      colonnade(S, px0, yP, pb, o.bw, o.porchColH, ['win', 'door', 'win']);
      bracketBand(S, px0, px1, pyL, o.bracketS * 0.9, pb + 1, 2, 1, { ang: o.ang || 0, intermAng: o.ang || 0 });
      // porch roof fill + lines
      S.fill('roof', `M${r(cx)},${r(yA)}L${r(cx + gw / 2)},${r(yB)}${sag(cx + gw / 2, yB, pxb, pyE - plift, 0.3, 0.7)}${eaveRev(pxa, pxb, pyE, plift, 40)}${sag(pxa, pyE - plift, cx - gw / 2, yB, 0.7, 0.3)}z`);
      S.stroke('roof', eave(pxa, pxb, pyE, plift, 40), 'eave');
      S.stroke('roof', `M${r(cx - gw / 2)},${r(yB)}${sag(cx - gw / 2, yB, pxa, pyE - plift, 0.3, 0.7)}M${r(cx + gw / 2)},${r(yB)}${sag(cx + gw / 2, yB, pxb, pyE - plift, 0.3, 0.7)}`, 'ridge');
      // 山花: 博风板 + 悬鱼 + slats
      let g = `M${r(cx - gw / 2)},${r(yB)}L${r(cx)},${r(yA)}L${r(cx + gw / 2)},${r(yB)}z`;
      g += `M${r(cx - gw / 2 - 2)},${r(yB + 4)}L${r(cx)},${r(yA - 4)}L${r(cx + gw / 2 + 2)},${r(yB + 4)}`;
      g += `M${r(cx)},${r(yA + 6)}c-8,8 -8,20 0,26c8,-6 8,-18 0,-26z`;           // 悬鱼
      for (let x = cx - gw / 2 + 12; x < cx + gw / 2 - 6; x += 10) { const t = Math.abs(x - cx) / (gw / 2); g += line(x, yB - 2, x, yA + (yB - yA) * t + 6); }
      S.stroke('roof', g, 'thin');
      S.stroke('roof', line(cx - gw / 2, yB, cx + gw / 2, yB), 'ridge');
      S.note(cx, yA + 24, '抱厦 · 山面向前', 'l', 150);
    }
    S.note(roof.xr1, roof.yR - 12, '重檐歇山', 'r');
    S.note(x0 - ov + 10, yE1 - 6, '下檐', 'l');
    S.dim = { x0: x0 - o.platPad, x1: x1 + o.platPad, y: yG + 18, label: o.dimLabel };
    return S;
  }

  // ---- shared: corbelled brick eave (叠涩), stepping out `outL` courses then back in to `wIn` ----
  function brickEave(S, cx, w, y, outStep, outL, inL, wIn, courseH = 6, cls = '') {
    let ww = w;
    for (let k = 0; k < outL; k++) { ww += outStep * 2; S.stroke('roof', rect(cx - ww / 2, y - courseH, ww, courseH), k === outL - 1 ? 'eave' : cls); y -= courseH; }
    for (let k = 1; k <= inL; k++) { const lw = ww + (wIn - ww) * k / inL; S.stroke('roof', rect(cx - lw / 2, y - courseH, lw, courseH), cls); y -= courseH; }
    return y;
  }
  // wall of one tower storey: 4 or 8 sides, with an opening on the front face and side-face windows
  function towerWall(S, cx, w, y, hh, o = {}) {
    const sides = o.sides || 8, f = sides === 8 ? 0.207 * w : w / 2;
    let d = rect(cx - w / 2, y - hh, w, hh);
    if (sides === 8) d += line(cx - f, y - hh, cx - f, y) + line(cx + f, y - hh, cx + f, y);
    S.stroke('frame', d, o.cls || 'col');
    let inf = '';
    const arch = (x, yb, ww, ah) => `M${r(x - ww / 2)},${r(yb)}v${r(-(ah - ww / 2))}a${r(ww / 2)},${r(ww / 2)} 0 0 1 ${r(ww)},0v${r(ah - ww / 2)}z`;
    const lattice = (x0, y0, ww, ah, s = 5) => { let q = rect(x0, y0, ww, ah); for (let x = x0 + s; x < x0 + ww - 1; x += s) q += line(x, y0, x, y0 + ah); for (let yy = y0 + s; yy < y0 + ah - 1; yy += s) q += line(x0, yy, x0 + ww, yy); return q; };
    const dw = o.doorW || Math.min(f * 0.9, hh * 0.5), dh = o.doorH || hh * 0.72;
    if (o.door === 'arch') inf += arch(cx, y - 3, dw, dh) + line(cx, y - 3, cx, y - 3 - dh + dw / 2);
    else if (o.door === 'door') inf += rect(cx - dw / 2, y - 3 - dh, dw, dh) + line(cx, y - 3 - dh, cx, y - 3);
    else if (o.door === 'lattice') inf += lattice(cx - dw / 2, y - 3 - dh, dw, dh, 5);
    if (sides === 8 && o.win && o.win !== 'none') {
      for (const sx of [-1, 1]) {
        const a = cx + sx * (f + 6), b = cx + sx * (w / 2 - 6), x0 = Math.min(a, b), ww = Math.abs(b - a);
        if (ww < 8) continue;
        const wh = Math.min(hh * 0.5, ww * 0.9), y0 = y - 3 - dh * 0.55 - wh / 2;
        if (o.win === 'blind') inf += rect(x0 + 1, y0, ww - 2, wh) + rect(x0 + 4, y0 + 3, ww - 8, wh - 6);
        else if (o.win === 'lattice') inf += lattice(x0 + 1, y0, ww - 2, wh, 4);
        else if (o.win === 'arch') inf += arch((x0 + x0 + ww) / 2, y0 + wh, Math.min(ww * 0.6, wh * 0.7), wh);
      }
    }
    if (inf) S.stroke('frame', inf, 'thin');
    return y - hh;
  }
  function stupaTop(S, cx, y, o = {}) { // 覆钵 + 相轮 + 宝珠, returns top y
    const bw = o.bulbW || 40, bh = o.bulbH || bw * 0.8;
    let d = `M${r(cx - bw * .32)},${r(y)}c${r(-bw * .3)},${r(-bh * .2)} ${r(-bw * .3)},${r(-bh * .8)} ${r(-bw * .05)},${r(-bh * .92)}q${r(bw * .37)},${r(-bh * .12)} ${r(bw * .74)},0c${r(bw * .25)},${r(bh * .12)} ${r(bw * .25)},${r(bh * .6)} ${r(-bw * .05)},${r(bh * .92)}z`;
    y -= bh;
    const rings = o.rings || 5, rh = o.ringH || 5;
    for (let i = 0; i < rings; i++) { const rw = (o.ringW || 16) - i * 1.8; d += `M${r(cx - rw / 2)},${r(y)}a${r(rw / 2)},${r(rh / 2)} 0 1 0 ${r(rw)},0a${r(rw / 2)},${r(rh / 2)} 0 1 0 ${r(-rw)},0`; y -= rh; }
    d += `M${r(cx - 4)},${r(y - 4)}a4,4 0 1 0 8,0a4,4 0 1 0 -8,0`; y -= 9;
    S.stroke('ornament', d, 'orn');
    return y;
  }

  // ---- generic multi-storey tower: 楼阁式 / 密檐式, brick or timber eaves ----
  function tierTower(o) {
    const S = o.S || new Sheet(o.w || 560, o.h || 800), cx = o.cx ?? S.w / 2, yG = o.yG ?? S.h - 30;
    const sides = o.sides || 8;
    let y = yG;
    (o.base || []).forEach((b, i) => { platform(S, cx - b.w / 2, cx + b.w / 2, y - b.h, b.h, i === 0 && b.stairs !== false, i === 0 && !o.S); y -= b.h; });
    const n = o.storeys.length;
    o.storeys.forEach((st, i) => {
      const next = o.storeys[i + 1];
      if (st.balcony) {
        const bw = st.w + st.balcony;
        if (st.balconyStyle === 'brick') { y = brickEave(S, cx, st.w - 4, y, 4, 2, 0, 0, 4); S.stroke('frame', rect(cx - bw / 2, y - 4, bw, 4)); y -= 4; }
        else { const top = octBrackets(S, cx, bw - 16, y, st.bsB || 0.6, 1); S.stroke('frame', rect(cx - bw / 2, top - 4, bw, 4)); y = top - 4; }
        railing(S, cx - bw / 2 + 3, cx + bw / 2 - 3, y, st.railH || 10); y -= st.railH || 10;
        if (st.noteBalcony) S.note(cx + bw / 2 + 4, y + 6, st.noteBalcony, 'r');
      }
      y = towerWall(S, cx, st.w, y, st.wallH, { sides, door: st.door, win: st.win, doorW: st.doorW, doorH: st.doorH, cls: st.wallCls });
      if (st.noteWall) S.note(cx - st.w / 2 - 2, y + st.wallH * 0.5, st.noteWall, 'l');
      if (st.noteWallR) S.note(cx + st.w / 2 + 2, y + st.wallH * 0.5, st.noteWallR, 'r');
      if (st.bs) { y = octBrackets(S, cx, st.w, y, st.bs, st.tiers || 2, !!st.dense); if (st.noteBs) S.note(cx + st.w / 2 + 6, y + 8, st.noteBs, 'r'); }
      const last = i === n - 1;
      if (st.eave === 'tile') {
        const yE = y - (st.rafter ?? 6);
        const wTop = last ? (o.top && o.top.w) || st.w * 0.8 : (next.w + (next.balcony || 0));
        y = octEave(S, cx, st.w, yE, st.over, wTop, st.band, st.lift ?? 10);
        if (st.noteEave) S.note(cx + st.w / 2 + st.over - 4, yE - 5, st.noteEave, 'r');
      } else if (st.eave === 'brick') {
        const wIn = last ? (o.top && o.top.w) || st.w * 0.7 : next.w + (next.balcony ? next.balcony + 8 : 0);
        const yBefore = y;
        y = brickEave(S, cx, st.w, y, st.outStep || 5, st.outL || 3, st.inL ?? 2, wIn, st.courseH || 6);
        if (st.noteEave) S.note(cx + st.w / 2 + (st.outStep || 5) * (st.outL || 3) - 2, yBefore - 6, st.noteEave, 'r');
      }
    });
    // top
    const T = o.top || {};
    if (T.type === 'pyramid') {
      const st = o.storeys[n - 1], xa = cx - st.w / 2 - st.over, xb = cx + st.w / 2 + st.over, lift = st.lift ?? 10, ew = xb - xa, fi = 0.207 * ew;
      const yE = y + st.band, yA = yE - T.h;
      S.fill('roof', `M${r(cx)},${r(yA)}${sag(cx, yA, xb, yE - lift, 0.3, 0.7)}${eaveRev(xa, xb, yE, lift, 30)}${sag(xa, yE - lift, cx, yA, 0.7, 0.3)}z`);
      S.stroke('roof', `M${r(cx)},${r(yA)}${sag(cx, yA, xa, yE - lift, 0.3, 0.7)}M${r(cx)},${r(yA)}${sag(cx, yA, xb, yE - lift, 0.3, 0.7)}M${r(cx)},${r(yA)}${sag(cx, yA, cx - fi, yE - 2, 0.3, 0.7)}M${r(cx)},${r(yA)}${sag(cx, yA, cx + fi, yE - 2, 0.3, 0.7)}`, 'ridge');
      y = yA;
      if (T.sha) { const sh = sha(S, cx, y, T.sha); y = sh.top; }
      else y = stupaTop(S, cx, y, T.stupa || { bulbW: 22, rings: 3, ringW: 12 });
    } else if (T.type === 'cap') {
      // brick stepped cap then a stupa-form finial
      let ww = T.w || o.storeys[n - 1].w * 0.7;
      for (let k = 0; k < (T.courses || 4); k++) { ww -= (T.step || 12); S.stroke('roof', rect(cx - ww / 2, y - 6, ww, 6)); y -= 6; }
      y = stupaTop(S, cx, y, T.stupa || {});
    }
    if (T.note) S.note(cx + 10, y + 16, T.note, 'r');
    S.top = y;
    if (!o.S) S.dim = { x0: cx - (o.base ? o.base[0].w / 2 : o.storeys[0].w / 2), x1: cx + (o.base ? o.base[0].w / 2 : o.storeys[0].w / 2), y: yG + 16, label: o.dimLabel, v: o.vLabel ? { x: cx - (o.base ? o.base[0].w / 2 : o.storeys[0].w / 2) - 40, y0: yG, y1: y - 4, label: o.vLabel } : undefined };
    return S;
  }

  // ---- 塔楼对峙 (正定开元寺): square 密檐 pagoda beside a two-storey bell tower ----
  function kaiyuan(o) {
    const S = new Sheet(800, 560), yG = 526;
    S.stroke('base', line(40, yG, 760, yG), 'ground');
    tierTower({ ...o.tower, S, cx: 250, yG });
    S.note(250 + 6, S.top + 10, '塔刹', 'r');
    pavilion({ ...o.tower2, S, cx: 590, yG, quiet: true });
    S.note(590 - 60, yG - 28, '钟楼 · 唐', 'l');
    S.note(250 + o.tower.storeys[0].w / 2 + 4, yG - o.tower.storeys[0].wallH * 0.55, '须弥塔 · 九级密檐', 'r');
    S.dim = { x0: 250 - o.tower.base[0].w / 2, x1: 250 + o.tower.base[0].w / 2, y: yG + 16, label: o.dimLabel, v: { x: 250 - o.tower.base[0].w / 2 - 40, y0: yG, y1: S.top - 4, label: o.vLabel } };
    S.dim2 = { x0: 590 - o.tower2.bays * o.tower2.bw / 2 - o.tower2.platPad, x1: 590 + o.tower2.bays * o.tower2.bw / 2 + o.tower2.platPad, y: yG + 16, label: o.dimLabel2 };
    return S;
  }

  // ---- 华塔 (广惠寺): octagonal lower storeys, four hexagonal side chambers, flower-cluster top ----
  function huaTa(o) {
    const S = new Sheet(560, 800), cx = 280, yG = 770;
    platform(S, cx - 250, cx + 250, yG - 14, 14, true);
    let y = yG - 14;
    const w1 = o.w1, wingW = o.wingW, wingH = o.wingH;
    // wings (六角套室) first, then the main body over them
    for (const sx of [-1, 1]) {
      const wx = cx + sx * (w1 / 2 + wingW * 0.28);
      towerWall(S, wx, wingW, y, wingH, { sides: 8, door: 'arch', doorW: 18, doorH: 40, win: 'none' });
      const top = octBrackets(S, wx, wingW, y - wingH, 0.55, 2, true);
      const yT = octEave(S, wx, wingW, top - 5, 18, wingW * 0.55, 22, 8);
      S.stroke('frame', rect(wx - wingW * 0.3, yT - 6, wingW * 0.6, 6));
      stupaTop(S, wx, yT - 6, { bulbW: 26, bulbH: 26, rings: 2, ringW: 10, ringH: 4 });
      if (sx > 0) S.note(wx + wingW / 2 - 4, y - wingH * 0.5, '六角套室 · 四隅', 'r');
    }
    // main storey 1
    S.fill('frame', rect(cx - w1 / 2, y - o.h1 - 40, w1, o.h1 + 40), 'occlude');
    y = towerWall(S, cx, w1, y, o.h1, { sides: 8, door: 'arch', doorW: 36, doorH: 84, win: 'blind' });
    S.note(cx - 18, yG - 14 - 50, '券门', 'l');
    y = octBrackets(S, cx, w1, y, 0.7, 2, true);
    S.note(cx + w1 / 2 + 4, y + 8, '仿木砖斗拱', 'r');
    const w2 = o.w2;
    y = octEave(S, cx, w1, y - 6, 34, w2 + 20, 30, 10);
    // storey 2 with 平座
    let top = octBrackets(S, cx, w2 + 4, y, 0.6, 1); S.stroke('frame', rect(cx - (w2 + 20) / 2, top - 4, w2 + 20, 4)); y = top - 4;
    railing(S, cx - (w2 + 20) / 2 + 3, cx + (w2 + 20) / 2 - 3, y, 10); y -= 10;
    S.note(cx + (w2 + 20) / 2 + 4, y + 6, '平座', 'r');
    y = towerWall(S, cx, w2, y, o.h2, { sides: 8, door: 'door', doorW: 24, doorH: o.h2 - 8, win: 'lattice' });
    y = octBrackets(S, cx, w2, y, 0.65, 2, true);
    const w3 = o.w3;
    y = octEave(S, cx, w2, y - 6, 26, w3 + 14, 24, 9);
    // storey 3 (short) with brick balcony, then the flower body
    top = octBrackets(S, cx, w3 + 2, y, 0.5, 1); S.stroke('frame', rect(cx - (w3 + 14) / 2, top - 4, w3 + 14, 4)); y = top - 4;
    railing(S, cx - (w3 + 14) / 2 + 3, cx + (w3 + 14) / 2 - 3, y, 8); y -= 8;
    y = towerWall(S, cx, w3, y, o.h3, { sides: 8, door: 'arch', doorW: 14, doorH: o.h3 - 6, win: 'none' });
    y = brickEave(S, cx, w3, y, 4, 2, 1, w3 + 6, 5);
    // flower body: bulging cone with tiers of niches and figures
    const fh = o.flowerH, fw = o.flowerW, yb = y, yt = y - fh;
    const outline = `M${r(cx - fw * .42)},${r(yb)}q${r(-fw * .12)},${r(-fh * .12)} ${r(-fw * .06)},${r(-fh * .3)}c${r(fw * .08)},${r(-fh * .35)} ${r(fw * .2)},${r(-fh * .6)} ${r(fw * .36)},${r(-fh * .7)}` +
      `h${r(fw * .24)}c${r(fw * .16)},${r(fh * .1)} ${r(fw * .28)},${r(fh * .35)} ${r(fw * .36)},${r(fh * .7)}q${r(fw * .06)},${r(fh * .18)} ${r(-fw * .06)},${r(fh * .3)}z`;
    S.fill('frame', outline, 'occlude');
    S.stroke('frame', outline, 'col');
    // width of the body at height t (0 bottom → 1 top), approximating the outline
    const wAt = t => fw * (0.84 - 0.36 * Math.pow(t, 1.4)) * (t < 0.3 ? 1 + 0.12 * (t / 0.3) : 1.12 - 0.12 * ((t - 0.3) / 0.7) * 0.4);
    let dec = '';
    const tiers = o.tiers || 8;
    for (let k = 0; k < tiers; k++) {
      const t0 = k / tiers, t1 = (k + 1) / tiers, yy = yb - fh * t0, yy1 = yb - fh * t1, ww = wAt((t0 + t1) / 2) * 0.92;
      const cells = Math.max(3, Math.round(ww / 16)), cw = ww / cells;
      for (let c = 0; c < cells; c++) {
        const x = cx - ww / 2 + cw * (c + 0.5), hh = (yy - yy1) * 0.7;
        if ((c + k) % 2 === 0) dec += `M${r(x - cw * .32)},${r(yy - 3)}v${r(-hh * .6)}a${r(cw * .32)},${r(cw * .32)} 0 0 1 ${r(cw * .64)},0v${r(hh * .6)}`; // 佛龛
        else dec += `M${r(x - cw * .3)},${r(yy - 4)}q${r(cw * .1)},${r(-hh * .5)} ${r(cw * .3)},${r(-hh * .5)}q${r(cw * .2)},0 ${r(cw * .3)},${r(hh * .5)}M${r(x - cw * .12)},${r(yy - 4 - hh * .5)}q${r(cw * .12)},${r(-hh * .25)} ${r(cw * .24)},0`; // 狮象/力士 blob
      }
      dec += line(cx - ww / 2, yy1 + 2, cx + ww / 2, yy1 + 2);
    }
    S.stroke('frame', dec, 'thin');
    S.note(cx + fw * 0.4, yb - fh * 0.45, '花束形塔身 · 狮象佛龛', 'r');
    y = yt;
    // 刹座: small octagonal pavilion with a tile eave, then a conical 刹
    const w4 = o.w4;
    y = towerWall(S, cx, w4, y, o.h4, { sides: 8, door: 'arch', doorW: 10, doorH: o.h4 - 6, win: 'none' });
    y = octBrackets(S, cx, w4, y, 0.5, 2, true);
    y = octEave(S, cx, w4, y - 4, 16, w4 * 0.5, 18, 8);
    const ch = o.coneH;
    let sd = `M${r(cx - w4 * .25)},${r(y)}L${r(cx - 3)},${r(y - ch)}h6L${r(cx + w4 * .25)},${r(y)}z`;
    for (let k = 1; k <= 4; k++) { const tt = k / 5, lw = w4 * .5 * (1 - tt); sd += `M${r(cx - lw / 2)},${r(y - ch * tt)}h${r(lw)}`; }
    sd += `M${r(cx - 4)},${r(y - ch - 4)}a4,4 0 1 0 8,0a4,4 0 1 0 -8,0`;
    S.stroke('ornament', sd, 'orn');
    y -= ch + 8;
    S.note(cx + 8, y + 10, '刹座 · 塔刹', 'r');
    S.dim = { x0: cx - 250, x1: cx + 250, y: yG + 16, label: o.dimLabel, v: { x: cx - 270, y0: yG, y1: y - 4, label: o.vLabel } };
    return S;
  }

  // ---- 单层方塔 (修定寺塔): a cube faced with patterned bricks, corbelled eave, stepped roof, stupa finial ----
  function cubeStupa(o) {
    const S = new Sheet(640, 800), cx = 320, yG = 770;
    platform(S, cx - 210, cx + 210, yG - 16, 16, true);
    let y = yG - 16;
    // 须弥座 with sculpted panels
    const bw = o.baseW;
    S.stroke('base', rect(cx - bw / 2, y - 12, bw, 12)); y -= 12;
    let pd = rect(cx - bw / 2 + 10, y - 40, bw - 20, 40);
    for (let k = 1; k < 6; k++) pd += line(cx - bw / 2 + 10 + (bw - 20) * k / 6, y - 40, cx - bw / 2 + 10 + (bw - 20) * k / 6, y);
    for (let k = 0; k < 6; k++) { const px = cx - bw / 2 + 10 + (bw - 20) * (k + .5) / 6; pd += `M${r(px - 6)},${r(y - 8)}q6,-26 12,0`; }
    S.stroke('base', pd, 'thin'); y -= 40;
    S.stroke('base', rect(cx - bw / 2, y - 12, bw, 12)); y -= 12;
    S.note(cx + bw / 2 - 2, y + 30, '须弥座 · 砖雕', 'r');
    // body with slight batter
    const w0 = o.bodyW, w1 = o.bodyW - 10, H = o.bodyH, yT = y - H;
    S.stroke('frame', `M${r(cx - w0 / 2)},${r(y)}L${r(cx - w1 / 2)},${r(yT)}L${r(cx + w1 / 2)},${r(yT)}L${r(cx + w0 / 2)},${r(y)}z`, 'col');
    // corner strips (力士 / 青龙白虎) and frieze band
    const cs = 16, fz = 30;
    let fr = line(cx - w0 / 2 + cs, y, cx - w1 / 2 + cs, yT) + line(cx + w0 / 2 - cs, y, cx + w1 / 2 - cs, yT) + line(cx - w1 / 2, yT + fz, cx + w1 / 2, yT + fz) + line(cx - w1 / 2, yT + fz + 6, cx + w1 / 2, yT + fz + 6);
    for (let k = 0; k < 4; k++) { const yy = y - 20 - k * 60; for (const sx of [-1, 1]) { const px = cx + sx * (w0 / 2 - cs / 2 - 1); fr += `M${r(px - 4)},${r(yy)}q4,-14 8,0q-4,6 -8,0`; } }
    for (let x = cx - w1 / 2 + cs + 10; x < cx + w1 / 2 - cs - 4; x += 18) fr += `M${r(x - 5)},${r(yT + fz - 4)}q5,-18 10,0`;
    S.stroke('frame', fr, 'thin');
    // diamond lattice of patterned bricks
    const dx = o.cellW, dy = o.cellH, x0 = cx - w1 / 2 + cs, x1 = cx + w1 / 2 - cs, yb = y - 4, yt = yT + fz + 10;
    let lat = '';
    for (let yy = yb; yy > yt + dy / 2; yy -= dy) {
      for (let x = x0 + dx / 2; x < x1; x += dx) { if (yy - dy < yt) continue; lat += `M${r(x)},${r(yy)}l${r(dx / 2)},${r(-dy / 2)}l${r(-dx / 2)},${r(-dy / 2)}l${r(-dx / 2)},${r(dy / 2)}z`; }
      const off = ((yb - yy) / dy) % 2 === 1;
      if (off) { /* second lattice offset for the 菱形 mesh */ }
    }
    for (let yy = yb - dy / 2; yy > yt + dy; yy -= dy) for (let x = x0 + dx; x < x1 - dx / 2 + 1; x += dx) lat += `M${r(x)},${r(yy)}m0,-3a3,3 0 1 0 0.1,0`;
    S.stroke('frame', lat, 'tile');
    S.note(cx + w1 / 2 - cs - 6, y - H * 0.55, '模制花砖 · 菱形网格', 'r');
    // 券门 on the south face
    const dw = o.doorW, dh = o.doorH;
    S.fill('frame', rect(cx - dw / 2 - 4, y - dh - 8, dw + 8, dh + 8), 'occlude');
    S.stroke('frame', `M${r(cx - dw / 2)},${r(y)}v${r(-(dh - dw / 2))}a${r(dw / 2)},${r(dw / 2)} 0 0 1 ${r(dw)},0v${r(dh - dw / 2)}z` + `M${r(cx - dw / 2 - 4)},${r(y)}v${r(-(dh - dw / 2))}a${r(dw / 2 + 4)},${r(dw / 2 + 4)} 0 0 1 ${r(dw + 8)},0v${r(dh - dw / 2)}` + line(cx, y, cx, y - dh + dw / 2));
    S.note(cx + dw / 2 + 4, y - dh * 0.3, '券门', 'r');
    y = yT;
    // corbelled eave stepping out, then the stepped 四注 roof
    const yEave = y;
    y = brickEave(S, cx, w1, y, o.eaveStep, o.eaveL, 0, 0, 8);
    S.note(cx - w1 / 2 - o.eaveStep * o.eaveL + 2, yEave - 10, '叠涩出檐', 'l', 24);
    let ww = w1 + o.eaveStep * o.eaveL * 2;
    for (let k = 0; k < o.roofL; k++) { ww -= o.roofStep * 2; S.stroke('roof', rect(cx - ww / 2, y - 7, ww, 7), k === o.roofL - 1 ? '' : 'thin'); y -= 7; }
    S.note(cx - ww / 2 - 30, y + 20, '四注顶 · 叠涩收分', 'l');
    // 刹座 with 山花蕉叶, then the 覆钵
    S.stroke('ornament', rect(cx - 26, y - 14, 52, 14) + `M${r(cx - 26)},${r(y - 14)}q-6,-10 -2,-22q8,10 12,22M${r(cx + 26)},${r(y - 14)}q6,-10 2,-22q-8,10 -12,22M${r(cx - 8)},${r(y - 14)}q4,-14 8,-22q4,8 8,22`, 'orn');
    y -= 14;
    y = stupaTop(S, cx, y, { bulbW: 56, bulbH: 66, rings: 4, ringW: 22, ringH: 6 });
    S.note(cx + 30, y + 40, '覆钵式塔刹', 'r');
    S.dim = { x0: cx - w0 / 2, x1: cx + w0 / 2, y: yG + 16, label: o.dimLabel, v: { x: cx - w0 / 2 - 90, y0: yG, y1: y - 4, label: o.vLabel } };
    return S;
  }

  // ---- round triple-eave hall on a three-tier circular terrace (祈年殿) ----
  function roundHall(o) {
    const S = new Sheet(800, 560), cx = 400, yG = 526;
    let y = yG;
    S.stroke('base', line(30, yG, 770, yG), 'ground');
    // terrace tiers with balustrades and a central stair
    o.tiers.forEach((t, i) => {
      S.stroke('base', rect(cx - t.w / 2, y - t.h, t.w, t.h));
      const stairW = 70 + i * 8;
      S.stroke('base', `M${r(cx - stairW / 2)},${r(y - t.h)}v${r(t.h)}M${r(cx + stairW / 2)},${r(y - t.h)}v${r(t.h)}` + [1, 2, 3].map(k => line(cx - stairW / 2, y - t.h + t.h * k / 4, cx + stairW / 2, y - t.h + t.h * k / 4)).join(''), 'thin');
      y -= t.h;
      // balustrade: posts + rail along the tier edge, broken at the stair
      const next = o.tiers[i + 1], inner = next ? next.w / 2 : o.drums[0].w / 2 + 14;
      let br = '';
      for (const sx of [-1, 1]) {
        const a = cx + sx * (stairW / 2 + 6), b = cx + sx * (t.w / 2 - 4);
        br += line(a, y - t.rail, b, y - t.rail) + line(a, y - t.rail * 0.55, b, y - t.rail * 0.55);
        for (let x = Math.min(a, b); x <= Math.max(a, b); x += 14) br += line(x, y - t.rail - 3, x, y);
      }
      S.stroke('base', br, 'thin');
      if (i === 0) S.note(cx - t.w / 2 + 10, y - t.rail * 0.6, '三层圆坛 · 汉白玉栏', 'l');
    });
    // drums and conical roofs
    const roofFor = (wE, wTop, yE, band, lift = 4) => {
      const xa = cx - wE / 2, xb = cx + wE / 2, t0 = cx - wTop / 2, t1 = cx + wTop / 2, yT = yE - band;
      S.fill('roof', `M${r(t0)},${r(yT)}L${r(t1)},${r(yT)}${sag(t1, yT, xb, yE - lift, 0.35, 0.65)}${eaveRev(xa, xb, yE, lift, 26)}${sag(xa, yE - lift, t0, yT, 0.65, 0.35)}z`);
      tiles(S, t0, t1, yT, xa + 20, xb - 20, yE, 22);
      S.stroke('roof', eave(xa, xb, yE, lift, 26), 'eave');
      S.stroke('roof', `M${r(t0)},${r(yT)}${sag(t0, yT, xa, yE - lift, 0.35, 0.65)}M${r(t1)},${r(yT)}${sag(t1, yT, xb, yE - lift, 0.35, 0.65)}`, 'ridge');
      return yT;
    };
    o.drums.forEach((d, i) => {
      // drum wall: lattice doors all round, seen as repeated panels
      let w = rect(cx - d.w / 2, y - d.h, d.w, d.h);
      const n = Math.max(3, Math.round(d.w / 34)), pw = d.w / n;
      for (let k = 0; k <= n; k++) w += line(cx - d.w / 2 + pw * k, y - d.h, cx - d.w / 2 + pw * k, y);
      if (i === 0) for (let k = 0; k < n; k++) { const px = cx - d.w / 2 + pw * k + 4; for (let yy = y - d.h + 6; yy < y - d.h * 0.45; yy += 6) w += line(px, yy, px + pw - 8, yy); }
      S.stroke('frame', w, i ? 'thin' : 'col');
      if (i === 0) S.note(cx - d.w / 2 + 6, y - d.h * 0.5, '隔扇 · 十二檐柱', 'l');
      y -= d.h;
      const top = octBrackets(S, cx, d.w, y, d.bs, 2, true);
      const yE = top - 6;
      const next = o.drums[i + 1];
      y = roofFor(d.w + 2 * d.over, next ? next.w : o.topW, yE, d.band);
      if (i === 1) S.note(cx + d.w / 2 + d.over - 6, yE - 6, '三重檐 · 蓝琉璃', 'r');
    });
    // top cone to the gilded 宝顶
    const yA = y - o.coneH, xa = cx - o.topW / 2, xb = cx + o.topW / 2;
    S.fill('roof', `M${r(cx)},${r(yA)}${sag(cx, yA, xb, y, 0.35, 0.65)}L${r(xa)},${r(y)}${sag(xa, y, cx, yA, 0.65, 0.35)}z`);
    S.stroke('roof', `M${r(xa)},${r(y)}${sag(xa, y, cx, yA, 0.65, 0.35)}${sag(cx, yA, xb, y, 0.35, 0.65)}`, 'ridge');
    let bd = rect(cx - 8, yA - 10, 16, 10) + `M${r(cx - 12)},${r(yA - 10)}h24` + `M${r(cx - 11)},${r(yA - 22)}a11,12 0 1 0 22,0a11,12 0 1 0 -22,0`;
    S.stroke('ornament', bd, 'orn');
    S.note(cx + 12, yA - 24, '鎏金宝顶', 'r');
    S.dim = { x0: cx - o.tiers[0].w / 2, x1: cx + o.tiers[0].w / 2, y: yG + 16, label: o.dimLabel, v: { x: cx - o.tiers[0].w / 2 - 40, y0: yG, y1: yA - 36, label: o.vLabel } };
    return S;
  }

  // ---- 祠庙戏台 (宁海): a one-bay stage raised on posts, balustrade at the lip, 歇山 roof with sweeping 翘角 ----
  function stage(o) {
    const S = new Sheet(800, 560), cx = 400, yG = 526;
    const W = o.w, x0 = cx - W / 2, x1 = cx + W / 2, yF = yG - o.stageH;
    S.stroke('base', line(x0 - 90, yG, x1 + 90, yG), 'ground');
    let posts = '';
    for (const x of [x0 + 4, cx - W * 0.2, cx + W * 0.2, x1 - 4]) posts += `M${r(x)},${r(yG)}V${r(yF - 8)}M${r(x - 8)},${r(yG)}h16M${r(x - 6)},${r(yG - 6)}h12`;
    S.stroke('base', posts, 'col');
    S.stroke('base', rect(x0 - 12, yF - 8, W + 24, 8));
    S.stroke('base', line(x0 - 6, yF - 4, x1 + 6, yF - 4), 'thin');
    railing(S, x0 - 8, x1 + 8, yF - 8, o.railH);
    S.note(x1 + 8, yF - 8 - o.railH * 0.5, '台口勾阑 · 雕花', 'r');
    const { yL } = colonnade(S, x0, yF - 8, 1, W, o.colH, ['open']);
    // 挂落 valance and the 匾额
    let gl = rect(x0 + 6, yL + 5, W - 12, 14);
    for (let x = x0 + 12; x < x1 - 8; x += 7) gl += line(x, yL + 5, x, yL + 19);
    for (let x = x0 + 9; x < x1 - 8; x += 7) gl += line(x, yL + 12, x + 7, yL + 12);
    S.stroke('frame', gl, 'thin');
    S.stroke('frame', rect(cx - 44, yL + 24, 88, 24) + line(cx - 36, yL + 36, cx + 36, yL + 36), 'thin');
    S.note(cx + 44, yL + 36, '匾额 · 台内藻井', 'r');
    // 牛腿: carved knee brackets on the outer face of the columns
    S.stroke('bracket', `M${r(x0)},${r(yL + 10)}q-22,2 -26,-24q16,12 26,-4zM${r(x1)},${r(yL + 10)}q22,2 26,-24q-16,12 -26,-4z`, 'brk2');
    const top = bracketBand(S, x0, x1, yL, o.bracketS, 2, 1, 3, { intermS: 1 });
    const yE = top - 9;
    const roof = gableHipRoof(S, cx, x0 - o.overhang, x1 + o.overhang, yE, { ridgeW: W * .6, roofH: o.roofH, gableH: o.gableH, lift: o.lift, chiwen: o.chiwen, k: o.k || 80 });
    S.stroke('ornament', `M${r(cx - 8)},${r(roof.yR)}l2,-8h12l2,8zM${r(cx)},${r(roof.yR - 8)}v-12m-6,0h12m-6,0m-4,-8h8`, 'orn'); // 脊刹
    S.note(x0 - o.overhang + 4, yE - o.lift - 4, '翘角 · 浙东做法', 'l');
    S.note(roof.xr1, roof.yR - o.chiwen * 0.6, '鸱吻 · 脊刹', 'r');
    S.note(x0 - 10, yL - 6, '牛腿', 'l');
    S.note(x1 - 4, yG - o.stageH * 0.5, '台下 · 架空', 'r');
    S.dim = { x0: x0 - 12, x1: x1 + 12, y: yG + 18, label: o.dimLabel, v: { x: x0 - o.overhang - 30, y0: yG, y1: yF - 8, label: o.vLabel } };
    return S;
  }

  // ---- hero: section through a bracket set with 昂, eave and rafters ----
  function bracketSection() {
    const w = 760, h = 400, S = new Sheet(w, h), cx = 430, yB = 352;
    const R = (x, y, ww, hh) => rect(x, y, ww, hh);
    const hatch = (x, y, ww, hh) => { let d = R(x, y, ww, hh); for (let k = 1; k < 4; k++) { const t = k / 4; d += line(x + ww * t, y, x, y + hh * t) + line(x + ww, y + hh * t, x + ww * t, y + hh); } return d; };
    // column, 阑额 (into the hall) and 普拍枋
    S.stroke('base', `M${r(cx - 20)},${r(h)}V${r(yB)}M${r(cx + 20)},${r(h)}V${r(yB)}`, 'col');
    S.stroke('base', hatch(cx + 20, yB + 16, 210, 22) + R(cx - 36, yB - 8, 270, 8));
    // 栌斗 with 斗欹
    S.stroke('bracket', `M${r(cx - 26)},${r(yB - 34)}h52v12q0,8 -6,14h-40q-6,-6 -6,-14z`, 'brk2');
    const arm = (xo, yTop, len, hh) => `M${r(xo + 12)},${r(yTop + hh)}q-12,-2 -12,-9v-${r(hh - 9)}h${r(len)}v${r(hh)}z`;
    const dou = (x, yTop) => `M${r(x - 13)},${r(yTop + 12)}q0,-6 3,-8v-4h20v4q3,2 3,8z`;
    // tier 1 华拱 + 泥道拱 cut at the axis
    S.stroke('bracket', arm(cx - 100, yB - 48, 126, 14) + hatch(cx - 12, yB - 48, 24, 14), 'brk2');
    S.stroke('bracket', dou(cx - 94, yB - 60) + dou(cx, yB - 60), 'brk2');
    // tier 2 华拱 + 柱头枋 cut
    S.stroke('bracket', arm(cx - 168, yB - 74, 194, 14) + hatch(cx - 12, yB - 74, 24, 14), 'brk2');
    S.stroke('bracket', dou(cx - 162, yB - 86), 'brk2');
    // 昂: slanted lever with a 批竹 beak; tail pressed under the 乳栿
    const A0 = { x: cx + 90, y: yB - 168 }, A1 = { x: cx - 208, y: yB - 76 };
    const th = 16, L = Math.hypot(A1.x - A0.x, A1.y - A0.y), nx = -(A1.y - A0.y) / L * th, ny = (A1.x - A0.x) / L * th;
    const T = { x: A1.x - 22, y: A1.y + 22 };
    const ang = `M${r(A0.x)},${r(A0.y)}L${r(A1.x)},${r(A1.y)}L${r(T.x)},${r(T.y)}L${r(A1.x + nx)},${r(A1.y + ny)}L${r(A0.x + nx)},${r(A0.y + ny)}z`;
    S.fill('bracket', ang, 'occlude');
    S.stroke('bracket', ang, 'ang');
    // 交互斗 on the 昂, 令拱 cut, 撩檐枋
    const sx = cx - 194, sy = A0.y + (sx - A0.x) / (A1.x - A0.x) * (A1.y - A0.y);
    S.stroke('bracket', dou(sx, sy - 12) + hatch(sx - 9, sy - 28, 18, 16) + R(sx - 13, sy - 54, 26, 26), 'brk2');
    // inner 柱头枋 stack on the axis, then the 乳栿 beam over the 昂 tail
    S.stroke('bracket', hatch(cx - 12, yB - 100, 24, 26) + hatch(cx - 12, yB - 128, 24, 28), 'brk2');
    const bm = R(cx + 8, yB - 176, 200, 22);
    S.fill('frame', bm, 'occlude');
    S.stroke('frame', bm);
    S.stroke('frame', `M${r(cx + 150)},${r(yB - 176)}q20,-26 40,0z` + `M${r(cx + 159)},${r(yB - 200)}a11,11 0 1 0 22,0a11,11 0 1 0 -22,0`, 'thin'); // 驼峰 + 槫
    // rafter (椽) as a bar from the 撩檐枋 up over the purlin; 飞椽 kicking out; tiles above
    const ex = sx - 13, ey = sy - 54;
    const rf = (x0, y0, x1, y1, t) => { const l = Math.hypot(x1 - x0, y1 - y0), ox = -(y1 - y0) / l * t, oy = (x1 - x0) / l * t; return `M${r(x0)},${r(y0)}L${r(x1)},${r(y1)}L${r(x1 + ox)},${r(y1 + oy)}L${r(x0 + ox)},${r(y0 + oy)}z`; };
    S.stroke('roof', rf(ex - 6, ey - 2, cx + 190, yB - 246, -9), 'rafter');
    S.stroke('roof', rf(ex - 78, ey - 8, ex + 40, ey - 16, -7), 'rafter');
    // 瓦当 + 滴水 at the eave, tile surface line with a few 瓦垄 ticks
    let tile = `M${r(ex - 88)},${r(ey - 34)}a8,8 0 1 0 16,0a8,8 0 1 0 -16,0M${r(ex - 80)},${r(ey - 34)}m-5,0l5,-5l5,5l-5,7z`;
    tile += `M${r(ex - 84)},${r(ey - 42)}q10,-6 24,-10L${r(cx + 190)},${r(yB - 272)}`;
    for (let k = 0; k < 7; k++) { const t = k / 7; const x = ex - 60 + (cx + 190 - (ex - 60)) * t, y = ey - 52 + ((yB - 272) - (ey - 52)) * t; tile += `M${r(x)},${r(y)}l-3,-5`; }
    S.stroke('roof', tile, 'eave');
    S.note(cx + 34, yB - 22, '栌斗', 'r');
    S.note(cx - 92, yB - 41, '华拱 · 出跳', 'ld');
    S.note(T.x + 6, T.y - 2, '批竹昂', 'l');
    S.note(sx - 13, sy - 41, '撩檐枋', 'ld', 50);
    S.note(cx + 20, yB - 236, '椽 · 飞椽', 'r');
    S.note(cx + 60, yB - 166, '乳栿', 'rd');
    S.note(cx - 4, yB - 118, '柱头枋 · 剖', 'l');
    return S;
  }

  // ---------- renderer ----------
  const NS = 'http://www.w3.org/2000/svg';
  const el = (n, a = {}) => { const e = document.createElementNS(NS, n); for (const k in a) e.setAttribute(k, a[k]); return e; };

  function paths(S, cls) {
    const g = el('g', { class: cls });
    for (const it of S.items) {
      g.appendChild(el('path', { d: it.d, class: `${it.kind} ${it.cls}`.trim(), 'data-layer': Draft.LAYERS.indexOf(it.layer) }));
    }
    return g;
  }
  function notes(S) {
    const g = el('g', { class: 'notes' });
    for (const n of S.notes) {
      const dir = n.side[0] === 'l' ? -1 : 1, down = n.side.endsWith('d'), ex = n.x + dir * (n.len || 34), ey = n.y + (down ? 22 : -22);
      const ng = el('g', { class: 'note' });
      ng.appendChild(el('circle', { cx: n.x, cy: n.y, r: 2.6 }));
      ng.appendChild(el('path', { d: `M${n.x},${n.y}L${ex},${ey}h${dir * 10}` }));
      const t = el('text', { x: ex + dir * 14, y: ey + 4, 'text-anchor': dir < 0 ? 'end' : 'start' });
      t.textContent = n.text; ng.appendChild(t); g.appendChild(ng);
    }
    return g;
  }
  function dims(S) {
    const g = el('g', { class: 'dims' });
    if (!S.dim) return g;
    const d = S.dim;
    g.appendChild(el('path', { d: `M${d.x0},${d.y - 6}v12M${d.x1},${d.y - 6}v12M${d.x0},${d.y}H${d.x1}` }));
    const t = el('text', { x: (d.x0 + d.x1) / 2, y: d.y + 18, 'text-anchor': 'middle' }); t.textContent = d.label; g.appendChild(t);
    if (d.v) {
      g.appendChild(el('path', { d: `M${d.v.x - 6},${d.v.y0}h12M${d.v.x - 6},${d.v.y1}h12M${d.v.x},${d.v.y0}V${d.v.y1}` }));
      const v = el('text', { x: d.v.x - 10, y: (d.v.y0 + d.v.y1) / 2, 'text-anchor': 'middle', transform: `rotate(-90 ${d.v.x - 10} ${(d.v.y0 + d.v.y1) / 2})` });
      v.textContent = d.v.label; g.appendChild(v);
    }
    if (S.dim2) {
      const e = S.dim2;
      g.appendChild(el('path', { d: `M${e.x0},${e.y - 6}v12M${e.x1},${e.y - 6}v12M${e.x0},${e.y}H${e.x1}` }));
      const t2 = el('text', { x: (e.x0 + e.x1) / 2, y: e.y + 18, 'text-anchor': 'middle' }); t2.textContent = e.label; g.appendChild(t2);
    }
    return g;
  }
  function render(S, opts = {}) {
    const svg = el('svg', { viewBox: `0 0 ${S.w} ${S.h}`, class: 'draft', role: 'img', 'aria-label': opts.label || '' });
    if (opts.ghost !== false) svg.appendChild(paths(S, 'ghost'));
    svg.appendChild(paths(S, 'ink'));
    svg.appendChild(dims(S));
    svg.appendChild(notes(S));
    return svg;
  }
  // Set per-path dash lengths and staggered delays. Must run after the svg is in the DOM.
  function prime(svg, speed = 1) {
    const strokes = svg.querySelectorAll('.ink .stroke');
    const perLayer = [0, 0, 0, 0, 0];
    strokes.forEach(p => {
      const L = p.getTotalLength(), layer = +p.dataset.layer;
      const idx = perLayer[layer]++;
      p.style.setProperty('--len', L);
      p.style.strokeDasharray = L; p.style.strokeDashoffset = L;
      p.style.setProperty('--dur', `${Math.min(2.2, 0.5 + L / 700) / speed}s`);
      p.style.setProperty('--delay', `${(layer * 0.55 + Math.min(idx, 12) * 0.05) / speed}s`);
    });
    svg.querySelectorAll('.ink .fill').forEach(p => p.style.setProperty('--delay', `${(+p.dataset.layer * 0.55 + 1.2) / speed}s`));
    svg.classList.add('primed');
  }

  return { hall, pavilion, woodPagoda, brickPagoda, crossHall, stage, tierTower, kaiyuan, towerAndHall, huaTa, cubeStupa, roundHall, bracketSection, render, prime };
})();
