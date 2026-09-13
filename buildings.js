/* buildings.js — composers that turn a few parameters into a full elevation Sheet,
 * plus the SVG renderer and the stroke-draw priming used by the page. */
const Buildings = (() => {
  const { Sheet, r, rect, line, eave, eaveRev, sag, chiwen, tiles, bracketPath, bracketH,
    bracketBand, railing, platform, colonnade, hipRoof, gableHipRoof, skirtRoof } = Draft;

  // ---- single-storey hall: 庑殿 or 歇山 ----
  function hall(o) {
    const w = o.w || 800, h = o.h || 560, S = new Sheet(w, h), cx = w / 2;
    const W = o.bays * o.bw, x0 = cx - W / 2, x1 = x0 + W;
    const yG = h - 34, yP = yG - o.platH;
    platform(S, x0 - o.platPad, x1 + o.platPad, yP, o.platH, true);
    if (o.platH > 30) S.stroke('base', line(x0 - o.platPad + 10, yP + o.platH * 0.5, x1 + o.platPad - 10, yP + o.platH * 0.5), 'thin');
    const { yL } = colonnade(S, x0, yP, o.bays, o.bw, o.colH, o.fills, { lower: o.lower });
    const top = bracketBand(S, x0, x1, yL, o.bracketS, o.bays + 1, o.tiers || 2, o.interm ?? 1);
    const yE = top - 9, xa = x0 - o.overhang, xb = x1 + o.overhang;
    const ro = { ridgeW: W * o.ridgeRatio, roofH: o.roofH, lift: o.lift || 14, chiwen: o.chiwen, chiStyle: o.chiStyle, gableH: o.gableH, k: o.k || 60 };
    const roof = o.roof === 'hip' ? hipRoof(S, cx, xa, xb, yE, ro) : gableHipRoof(S, cx, xa, xb, yE, ro);
    // notes
    S.note(roof.xr1, roof.yR - (o.chiwen || 20) * 0.6, o.chiStyle === 'tang' ? '鸱尾' : '鸱吻', 'r');
    S.note(x1 + 12, yL - bracketH(o.bracketS, o.tiers || 2) / 2, '斗拱 · ' + (o.puzuo || '五铺作'), 'r');
    S.note(xa + 8, yE - 8, o.roof === 'hip' ? '庑殿 · 出檐' : '歇山 · 戗脊', 'l');
    S.note(x0 + 2, yP - o.colH * 0.55, '侧脚 · 生起', 'l');
    S.note(cx + o.bw * 0.5, yP + o.platH * 0.5, '台基 · 踏道', 'r');
    S.dim = { x0: x0 - o.platPad, x1: x1 + o.platPad, y: yG + 18, label: o.dimLabel };
    return S;
  }

  // ---- two-storey pavilion (楼阁) with 平座, upper 歇山 ----
  function pavilion(o) {
    const w = 800, h = 560, S = new Sheet(w, h), cx = w / 2;
    const W = o.bays * o.bw, x0 = cx - W / 2, x1 = x0 + W;
    const yG = h - 34, yP = yG - o.platH;
    platform(S, x0 - o.platPad, x1 + o.platPad, yP, o.platH, true);
    const { yL } = colonnade(S, x0, yP, o.bays, o.bw, o.colH, o.fills);
    const top = bracketBand(S, x0, x1, yL, o.bracketS, o.bays + 1, 2, 1);
    const yE1 = top - 9, ov = o.overhang;
    const bw2 = W + 30, bx0 = cx - bw2 / 2, bx1 = cx + bw2 / 2, yT = yE1 - o.skirtH;
    skirtRoof(S, x0 - ov, x1 + ov, yE1, bx0, bx1, yT, { k: 46 });
    // 平座
    const pzTop = bracketBand(S, bx0 + 8, bx1 - 8, yT, 0.9, o.bays + 1, 1, 1);
    S.stroke('frame', rect(bx0, pzTop - 5, bw2, 5));
    railing(S, bx0 + 4, bx1 - 4, pzTop - 5, 15);
    const yP2 = pzTop - 20;
    const W2 = W - 2 * o.inset, x20 = cx - W2 / 2;
    const { yL: yL2 } = colonnade(S, x20, yP2, o.bays, W2 / o.bays, o.colH2, o.fills2);
    const top2 = bracketBand(S, x20, x20 + W2, yL2, o.bracketS, o.bays + 1, 2, 1);
    const yE2 = top2 - 9;
    const roof = gableHipRoof(S, cx, x20 - ov, x20 + W2 + ov, yE2, { ridgeW: W2 * 0.55, roofH: o.roofH, gableH: o.gableH, lift: 13, chiwen: 18, k: 50 });
    S.note(roof.xr0 + 4, roof.yB, '歇山 · 山花', 'l');
    S.note(bx1 - 2, pzTop - 12, '平座 · 勾阑', 'r');
    S.note(x1 + ov - 6, yE1 - 6, '腰檐', 'r');
    S.note(x0 - 4, yL - 18, '斗拱', 'l');
    S.dim = { x0: x0 - o.platPad, x1: x1 + o.platPad, y: yG + 18, label: o.dimLabel };
    return S;
  }

  // ---- octagonal storey helpers ----
  function octColonnade(S, cx, w, yP, colH, kind = 'door') {
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
    for (const sx of [-1, 1]) {
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
    let yL = octColonnade(S, cx, s1.porch, y, s1.colH, 'door');
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
    const top = bracketBand(S, x0, x1, yL, o.bracketS, o.bays + 1, 2, 1);
    const yE1 = top - 9, ov = o.overhang;
    const W2 = W - 2 * o.bw, x20 = cx - W2 / 2, yT = yE1 - o.skirtH;
    skirtRoof(S, x0 - ov, x1 + ov, yE1, x20 - 10, x20 + W2 + 10, yT, { k: 56 });
    // upper storey
    const { yL: yL2 } = colonnade(S, x20, yT, o.bays - 2, o.bw, o.colH2, o.fills2);
    const top2 = bracketBand(S, x20, x20 + W2, yL2, o.bracketS, o.bays - 1, 2, 1);
    const yE2 = top2 - 9;
    const roof = gableHipRoof(S, cx, x20 - ov, x20 + W2 + ov, yE2, { ridgeW: W2 * 0.55, roofH: o.roofH, gableH: o.gableH, lift: 14, chiwen: o.chiwen || 22, k: 60 });
    // 抱厦 in front, gable facing the viewer
    const pb = 3, pW = pb * o.bw, px0 = cx - pW / 2, px1 = cx + pW / 2, pov = o.porchOver || 44;
    const pyL = yP - o.porchColH;
    const pTop = pyL - bracketH(o.bracketS * 0.9, 2) - 4, pyE = pTop - 8;
    const pxa = px0 - pov, pxb = px1 + pov, plift = 12, gw = o.gableW, yB = pyE - o.porchRise, yA = yB - o.gableRise;
    // occluder: porch roof + body
    S.fill('frame', `M${r(cx)},${r(yA - 2)}L${r(cx + gw / 2 + 3)},${r(yB)}${sag(cx + gw / 2 + 3, yB, pxb, pyE - plift, 0.3, 0.7)}${eaveRev(pxa, pxb, pyE, plift, 40)}${sag(pxa, pyE - plift, cx - gw / 2 - 3, yB, 0.7, 0.3)}z` +
      rect(px0 - 6, pyE, pW + 12, yP - pyE), 'occlude');
    colonnade(S, px0, yP, pb, o.bw, o.porchColH, ['win', 'door', 'win']);
    bracketBand(S, px0, px1, pyL, o.bracketS * 0.9, pb + 1, 2, 1);
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
    S.note(roof.xr1, roof.yR - 12, '重檐歇山', 'r');
    S.note(x0 - ov + 10, yE1 - 6, '下檐', 'l');
    S.dim = { x0: x0 - o.platPad, x1: x1 + o.platPad, y: yG + 18, label: o.dimLabel };
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

  return { hall, pavilion, woodPagoda, brickPagoda, crossHall, bracketSection, render, prime };
})();
