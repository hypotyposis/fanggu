/* draft.js — procedural elevation drawings of Chinese timber & brick architecture.
 * Every drawing is a Sheet: an ordered list of strokes/fills grouped in layers
 * (base → frame → bracket → roof → ornament) plus annotation anchors.
 * Geometry is stylised after survey elevations, not measured drawings. */
const Draft = (() => {
  const r = n => Math.round(n * 10) / 10;
  const LAYERS = ['base', 'frame', 'bracket', 'roof', 'ornament'];

  class Sheet {
    constructor(w, h) { this.w = w; this.h = h; this.items = []; this.notes = []; }
    stroke(layer, d, cls = '') { this.items.push({ kind: 'stroke', layer, d, cls }); return this; }
    fill(layer, d, cls = 'wash') { this.items.push({ kind: 'fill', layer, d, cls }); return this; }
    note(x, y, text, side = 'r', len = 34) { this.notes.push({ x: r(x), y: r(y), text, side, len }); return this; }
  }

  // ---------- primitives ----------
  const rect = (x, y, w, h) => `M${r(x)},${r(y)}h${r(w)}v${r(h)}h${r(-w)}z`;
  const line = (x0, y0, x1, y1) => `M${r(x0)},${r(y0)}L${r(x1)},${r(y1)}`;

  // Eave line with upturned corners (翘角), left → right.
  function eave(xa, xb, y, lift, k) {
    return `M${r(xa)},${r(y - lift)}Q${r(xa + k * 0.55)},${r(y)} ${r(xa + k)},${r(y)}` +
      `L${r(xb - k)},${r(y)}Q${r(xb - k * 0.55)},${r(y)} ${r(xb)},${r(y - lift)}`;
  }
  function eaveRev(xa, xb, y, lift, k) { // right → left, for closing fills (no leading M)
    return `Q${r(xb - k * 0.55)},${r(y)} ${r(xb - k)},${r(y)}L${r(xa + k)},${r(y)}Q${r(xa + k * 0.55)},${r(y)} ${r(xa)},${r(y - lift)}`;
  }
  // Concave ridge (垂脊 / 戗脊) from ridge end to eave corner, no leading M.
  function sag(x0, y0, x1, y1, a = 0.28, b = 0.78) {
    return `Q${r(x0 + (x1 - x0) * a)},${r(y0 + (y1 - y0) * b)} ${r(x1)},${r(y1)}`;
  }
  // 鸱吻 (owl-tail ridge ornament) at a ridge end; dir = -1 left end, +1 right end.
  function chiwen(s, x, y, h, dir) {
    const w = h * 0.55;
    s.stroke('ornament',
      `M${r(x)},${r(y)}v${r(-h)}c0,${r(-w * 0.9)} ${r(dir * w)},${r(-w * 0.9)} ${r(dir * w)},${r(-w * 0.15)}` +
      `l${r(-dir * w * 0.45)},${r(w * 0.1)}M${r(x)},${r(y - h * 0.55)}h${r(dir * w * 0.6)}`, 'orn');
  }
  // 鸱尾 (Tang fish-tail fin) at a ridge end; dir = +1 left end (curls right), -1 right end.
  function chiwei(s, x, y, h, dir) {
    const w = h * 0.62;
    let d = `M${r(x)},${r(y)}V${r(y - h * 0.72)}Q${r(x)},${r(y - h * 1.02)} ${r(x + dir * w * 0.72)},${r(y - h * 0.98)}` +
      `Q${r(x + dir * w * 1.02)},${r(y - h * 0.96)} ${r(x + dir * w * 0.9)},${r(y - h * 0.8)}L${r(x + dir * w * 0.58)},${r(y - h * 0.62)}` +
      `L${r(x + dir * w * 0.7)},${r(y)}`;
    for (let k = 1; k <= 3; k++) { const t = k / 4; d += `M${r(x)},${r(y - h * 0.72 * t)}l${r(dir * w * 0.22)},${r(-h * 0.04)}`; }
    s.stroke('ornament', d, 'orn');
  }
  // Fanned tile lines between a ridge span and an eave span.
  function tiles(s, xr0, xr1, yR, xe0, xe1, yE, step = 34) {
    const n = Math.max(2, Math.round((xe1 - xe0) / step));
    let d = '';
    for (let i = 1; i < n; i++) {
      const t = i / n;
      d += line(xr0 + (xr1 - xr0) * t, yR + 3, xe0 + (xe1 - xe0) * t, yE - 4);
    }
    s.stroke('roof', d, 'tile');
  }

  // Front-view bracket set (斗拱) as one path. Base at yBase, grows upward. s = scale.
  function bracketPath(x, yBase, s, tiers = 2, opt = {}) {
    let d = '';
    const ludou = opt.ludou !== false;
    // 栌斗 (a 补间 without one sits straight on the 柱头枋)
    if (ludou) d += `M${r(x - 7 * s)},${r(yBase)}l${r(1.5 * s)},${r(-6 * s)}h${r(11 * s)}l${r(1.5 * s)},${r(6 * s)}z`;
    let y = yBase - 6 * s;
    const arms = [30, 46, 60];
    const blocks = [[-12, 0, 12], [-19, -6, 6, 19], [-25, -8, 8, 25]];
    for (let t = 0; t < tiers; t++) {
      const a = arms[t] * s;
      // arm with 卷杀 (curved ends)
      d += `M${r(x - a / 2 + 2 * s)},${r(y)}q${r(-2 * s)},0 ${r(-2 * s)},${r(-2 * s)}v${r(-2 * s)}h${r(a)}v${r(2 * s)}q0,${r(2 * s)} ${r(-2 * s)},${r(2 * s)}z`;
      y -= 4 * s;
      for (const b of blocks[t]) {
        d += `M${r(x + b * s - 3 * s)},${r(y)}l${r(0.8 * s)},${r(-4 * s)}h${r(4.4 * s)}l${r(0.8 * s)},${r(4 * s)}z`;
      }
      y -= 4 * s;
    }
    // 昂嘴: lever beaks projecting toward the viewer — solid wedges in front of the arms
    let ang = '';
    for (let k = 0; k < (opt.ang || 0); k++) {
      const yb = yBase - 6 * s - 8 * s * (tiers - 2 - k) - 2 * s;
      ang += `M${r(x - 3.6 * s)},${r(yb)}l${r(3.6 * s)},${r(6.5 * s)}l${r(3.6 * s)},${r(-6.5 * s)}z`;
    }
    return { d, top: y, ang };
  }
  const bracketH = (s, tiers = 2) => 6 * s + tiers * 8 * s;

  function bracketBand(sheet, x0, x1, yBase, s, n, tiers = 2, interm = 1, opt = {}) {
    // n columns → n 柱头铺作 plus `interm` 补间铺作 per bay; 补间 may be smaller, 栌斗-less and 昂-less
    const bays = n - 1, bw = (x1 - x0) / bays;
    const iS = opt.intermS ?? 0.9, iTiers = opt.intermTiers ?? tiers, iLudou = opt.intermLudou !== false;
    let d = '', beaks = '';
    for (let i = 0; i < n; i++) {
      const p = bracketPath(x0 + i * bw, yBase, s, tiers, { ang: opt.ang || 0 });
      d += p.d; beaks += p.ang;
      if (i < bays) for (let j = 1; j <= interm; j++) { const q = bracketPath(x0 + i * bw + bw * j / (interm + 1), yBase, s * iS, iTiers, { ludou: iLudou, ang: opt.intermAng || 0 }); d += q.d; beaks += q.ang; }
    }
    sheet.stroke('bracket', d, 'brk');
    if (beaks) { sheet.fill('bracket', beaks, 'occlude'); sheet.stroke('bracket', beaks, 'ang'); }
    // 柱头枋 / 撩檐枋 — the beam riding on top of the band
    const top = yBase - bracketH(s, tiers);
    sheet.stroke('bracket', rect(x0 - 24 * s, top - 4 * s, (x1 - x0) + 48 * s, 4 * s));
    return top - 4 * s;
  }

  function railing(sheet, x0, x1, y, h = 14) {
    let d = rect(x0, y - h, x1 - x0, h);
    d += line(x0, y - h * 0.55, x1, y - h * 0.55);
    for (let x = x0 + 9; x < x1 - 4; x += 9) d += line(x, y - h * 0.55, x, y);
    sheet.stroke('frame', d, 'thin');
  }

  function platform(sheet, x0, x1, yTop, h, stairs = true, ground = true) {
    sheet.stroke('base', rect(x0, yTop, x1 - x0, h));
    if (stairs) {
      const cx = (x0 + x1) / 2, tw = Math.min(70, (x1 - x0) * 0.22);
      let d = `M${r(cx - tw / 2)},${r(yTop)}l${r(-12)},${r(h)}M${r(cx + tw / 2)},${r(yTop)}l12,${r(h)}`;
      for (let i = 1; i <= 3; i++) { const t = i / 4; d += line(cx - tw / 2 - 12 * t, yTop + h * t, cx + tw / 2 + 12 * t, yTop + h * t); }
      sheet.stroke('base', d, 'thin');
    }
    if (ground) sheet.stroke('base', line(x0 - 70, yTop + h, x1 + 70, yTop + h), 'ground');
  }

  // Columns + lintel + bay infill. `fills` is an array per bay: 'door' | 'win' | 'wall'.
  function colonnade(sheet, x0, yP, bays, bw, colH, fills, opts = {}) {
    const x1 = x0 + bays * bw, yL = yP - colH;
    let cols = '';
    for (let i = 0; i <= bays; i++) {
      const x = x0 + i * bw;
      const lean = i === 0 ? 2.5 : i === bays ? -2.5 : 0; // 侧脚
      const rise = (i === 0 || i === bays) ? -2 : 0;      // 生起
      cols += `M${r(x)},${r(yP)}L${r(x + lean)},${r(yL + rise)}`;
      cols += `M${r(x - 5)},${r(yP)}h10`; // 柱础
    }
    sheet.stroke('frame', cols, 'col');
    sheet.stroke('frame', rect(x0, yL, x1 - x0, 5));           // 阑额
    if (opts.lower) sheet.stroke('frame', line(x0, yL + 5 + 10, x1, yL + 5 + 10), 'thin'); // 由额
    let inf = '';
    for (let i = 0; i < bays; i++) {
      const bx = x0 + i * bw, kind = fills[i] || 'wall';
      if (kind === 'door') {
        inf += rect(bx + 6, yL + 7, bw - 12, colH - 7);
        inf += line(bx + bw / 2, yL + 7, bx + bw / 2, yP);
        const rows = Math.max(2, Math.round((colH - 7) / 16));
        for (let k = 1; k < rows; k++) inf += `M${r(bx + 10)},${r(yL + 7 + (colH - 7) * k / rows)}h${r(bw - 20)}`;
      } else if (kind === 'win') {
        const wh = Math.min(colH * 0.5, 44);
        inf += rect(bx + 6, yL + 7, bw - 12, wh);
        for (let x = bx + 12; x < bx + bw - 8; x += 6) inf += line(x, yL + 7, x, yL + 7 + wh);
        inf += line(bx, yL + 7 + wh + 4, bx + bw, yL + 7 + wh + 4); // 窗台
      } else if (kind === 'figure') { // a guardian statue standing in an open bay
        const fw = bw * 0.42, fh = colH * 0.78, fx = bx + bw / 2, hr = fw * 0.2;
        inf += `M${r(fx)},${r(yP - fh)}m${r(-hr)},0a${r(hr)},${r(hr)} 0 1 0 ${r(hr * 2)},0a${r(hr)},${r(hr)} 0 1 0 ${r(-hr * 2)},0`;
        inf += `M${r(fx - fw / 2)},${r(yP)}v${r(-fh * 0.5)}q0,${r(-fh * 0.2)} ${r(fw * 0.22)},${r(-fh * 0.26)}h${r(fw * 0.56)}q${r(fw * 0.22)},${r(fh * 0.06)} ${r(fw * 0.22)},${r(fh * 0.26)}v${r(fh * 0.5)}z`;
        inf += line(bx, yP - 6, bx + bw, yP - 6);
      } else {
        inf += line(bx, yP - 6, bx + bw, yP - 6); // 地栿
      }
    }
    sheet.stroke('frame', inf, 'thin');
    return { x1, yL };
  }

  // ---------- roofs ----------
  function hipRoof(sheet, cx, xa, xb, yE, o) {
    const { lift = 14, ridgeW, roofH, k = 60 } = o;
    const yR = yE - roofH, xr0 = cx - ridgeW / 2, xr1 = cx + ridgeW / 2;
    sheet.fill('roof', `M${r(xr0)},${r(yR)}L${r(xr1)},${r(yR)}${sag(xr1, yR, xb, yE - lift)}${eaveRev(xa, xb, yE, lift, k)}${sag(xa, yE - lift, xr0, yR, 0.72, 0.22)}z`);
    tiles(sheet, xr0, xr1, yR, xa + k * 0.6, xb - k * 0.6, yE);
    sheet.stroke('roof', eave(xa, xb, yE, lift, k), 'eave');
    sheet.stroke('roof', `M${r(xr0)},${r(yR)}${sag(xr0, yR, xa, yE - lift)}M${r(xr1)},${r(yR)}${sag(xr1, yR, xb, yE - lift)}`, 'ridge');
    sheet.stroke('roof', rect(xr0, yR, ridgeW, 5), 'ridge');
    const orn = o.chiStyle === 'tang' ? chiwei : chiwen;
    orn(sheet, xr0, yR, o.chiwen || 20, 1);
    orn(sheet, xr1, yR, o.chiwen || 20, -1);
    if (o.ridgeOrn) sheet.stroke('ornament', `M${r(cx - 7)},${r(yR)}l2,-6h10l2,6zM${r(cx)},${r(yR - 6)}q-6,-8 0,-16q6,8 0,16`, 'orn'); // 火珠
    return { yR, xr0, xr1 };
  }

  function gableHipRoof(sheet, cx, xa, xb, yE, o) {
    const { lift = 14, ridgeW, roofH, gableH, k = 60 } = o;
    const yR = yE - roofH, yB = yR + gableH, xr0 = cx - ridgeW / 2, xr1 = cx + ridgeW / 2, sl = 5;
    sheet.fill('roof', `M${r(xr0)},${r(yR)}L${r(xr1)},${r(yR)}L${r(xr1 + sl)},${r(yB)}${sag(xr1 + sl, yB, xb, yE - lift)}${eaveRev(xa, xb, yE, lift, k)}${sag(xa, yE - lift, xr0 - sl, yB, 0.72, 0.22)}z`);
    tiles(sheet, xr0, xr1, yR, xa + k * 0.6, xb - k * 0.6, yE);
    sheet.stroke('roof', eave(xa, xb, yE, lift, k), 'eave');
    sheet.stroke('roof', `M${r(xr0)},${r(yR)}L${r(xr0 - sl)},${r(yB)}${sag(xr0 - sl, yB, xa, yE - lift)}M${r(xr1)},${r(yR)}L${r(xr1 + sl)},${r(yB)}${sag(xr1 + sl, yB, xb, yE - lift)}`, 'ridge');
    sheet.stroke('roof', rect(xr0, yR, ridgeW, 5), 'ridge');
    const orn = o.chiStyle === 'tang' ? chiwei : chiwen;
    orn(sheet, xr0, yR, o.chiwen || 18, 1);
    orn(sheet, xr1, yR, o.chiwen || 18, -1);
    return { yR, yB, xr0, xr1 };
  }

  // 悬山 (overhanging gable): ridge and eave both run the full width; 博风 edges seen end-on.
  function gableRoof(sheet, cx, xa, xb, yE, o) {
    const { roofH, chiwen: ch = 18 } = o, yR = yE - roofH;
    sheet.fill('roof', `M${r(xa)},${r(yR)}L${r(xb)},${r(yR)}L${r(xb)},${r(yE - (o.lift ?? 5))}${eaveRev(xa, xb, yE, o.lift ?? 5, 40)}z`);
    tiles(sheet, xa + 8, xb - 8, yR, xa + 8, xb - 8, yE, 26);
    sheet.stroke('roof', eave(xa, xb, yE, o.lift ?? 5, 40), 'eave');
    sheet.stroke('roof', `M${r(xa)},${r(yR)}V${r(yE)}M${r(xa + 5)},${r(yR + 3)}V${r(yE - 2)}M${r(xb)},${r(yR)}V${r(yE)}M${r(xb - 5)},${r(yR + 3)}V${r(yE - 2)}`, 'ridge'); // 博风板
    sheet.stroke('roof', rect(xa, yR, xb - xa, 5), 'ridge');
    chiwen(sheet, xa + 10, yR, ch, 1);
    chiwen(sheet, xb - 10, yR, ch, -1);
    return { yR, xr0: xa + 10, xr1: xb - 10 };
  }
  // Skirt roof (腰檐 / 副阶): eave at yE spanning xa..xb, rising to a narrower top xt0..xt1 at yT.
  function skirtRoof(sheet, xa, xb, yE, xt0, xt1, yT, o = {}) {
    const { lift = 12, k = 50 } = o;
    sheet.fill('roof', `M${r(xt0)},${r(yT)}L${r(xt1)},${r(yT)}${sag(xt1, yT, xb, yE - lift, 0.3, 0.7)}${eaveRev(xa, xb, yE, lift, k)}${sag(xa, yE - lift, xt0, yT, 0.7, 0.3)}z`);
    tiles(sheet, xt0, xt1, yT, xa + k * 0.6, xb - k * 0.6, yE);
    sheet.stroke('roof', eave(xa, xb, yE, lift, k), 'eave');
    sheet.stroke('roof', `M${r(xt0)},${r(yT)}${sag(xt0, yT, xa, yE - lift, 0.3, 0.7)}M${r(xt1)},${r(yT)}${sag(xt1, yT, xb, yE - lift, 0.3, 0.7)}`, 'ridge');
    sheet.stroke('roof', line(xt0, yT, xt1, yT), 'thin');
  }

  return { Sheet, LAYERS, r, rect, line, eave, eaveRev, sag, chiwen, chiwei, tiles, bracketPath, bracketH, bracketBand, railing, platform, colonnade, hipRoof, gableHipRoof, gableRoof, skirtRoof };
})();
