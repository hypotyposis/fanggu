#!/usr/bin/env node
// Single-writer integration of agent content rewrites into sites.js, research JSON and i18n files.
// Usage: node apply.cjs --root <repo> --out <dir with group json> [--i18n <dir>] [--only id,id] [--dry-run]
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const args = process.argv.slice(2);
const opt = (name, def) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : def; };
const root = path.resolve(opt('--root', process.cwd()));
const outDir = path.resolve(opt('--out', 'out'));
const i18nDir = opt('--i18n', path.join(root, 'i18n'));
const only = opt('--only', '') ? new Set(opt('--only').split(',')) : null;
const dryRun = args.includes('--dry-run');
const sitesPath = path.join(root, 'sites.js');
let sites = fs.readFileSync(sitesPath, 'utf8');

function loadSites(source) {
  const ctx = vm.createContext({});
  vm.runInContext('var Buildings = new Proxy({}, { get: () => () => null });\n' + source + '\n;globalThis.__SITES = SITES;', ctx);
  return ctx.__SITES;
}
const current = new Map(loadSites(sites).map(site => [site.id, site]));

// Collect rewrites from every group file.
const rewrites = new Map();
// Agents sometimes leave intermediate chunk files beside the group file; only the group files count.
for (const file of fs.readdirSync(outDir).filter(f => f.endsWith('.json') && !/\.chunk\d*\.json$/.test(f) && !f.startsWith('_'))) {
  let data; try { data = JSON.parse(fs.readFileSync(path.join(outDir, file), 'utf8')); } catch (error) { console.error(`skip ${file}: ${error.message}`); continue; }
  for (const [id, entry] of Object.entries(data)) {
    if (only && !only.has(id)) continue;
    if (rewrites.has(id)) console.error(`duplicate rewrite for ${id} in ${file}; keeping first`);
    else rewrites.set(id, { ...entry, _file: file });
  }
}

// Japanese text must use shinjitai forms; agents occasionally leak simplified-only characters.
const JA_FORMS = { '为': '為', '东': '東', '门': '門', '马': '馬', '长': '長', '书': '書', '车': '車', '说': '説', '贝': '貝', '见': '見', '风': '風', '鸟': '鳥', '龙': '龍', '广': '広', '实': '実', '层': '層', '庙': '廟', '图': '図', '齐': '斉', '汉': '漢', '经': '経', '阁': '閣', '乐': '楽', '县': '県', '开': '開', '关': '関', '观': '観', '觉': '覚', '记': '記', '论': '論', '设': '設', '证': '証', '译': '訳', '读': '読', '贵': '貴', '资': '資', '过': '過', '还': '還', '进': '進', '远': '遠', '连': '連', '选': '選', '铁': '鉄', '铜': '銅', '银': '銀', '钟': '鐘', '镇': '鎮', '间': '間', '问': '問', '阙': '闕', '陕': '陝', '顶': '頂', '须': '須', '顺': '順', '题': '題', '飞': '飛', '驿': '駅', '鸡': '鶏', '鹤': '鶴', '龟': '亀', '访': '訪', '迹': '跡', '录': '録', '评': '評', '维': '維', '愿': '願' };
const jaFix = text => String(text).replace(/[为东门马长书车说贝见风鸟龙广实层庙图齐汉经阁乐县开关观觉记论设证译读贵资过还进远连选铁铜银钟镇间问阙陕顶须顺题飞驿鸡鹤龟访迹录评维愿]/gu, ch => JA_FORMS[ch] || ch);
for (const entry of rewrites.values()) {
  if (entry.ja && typeof entry.ja === 'object') {
    if (typeof entry.ja.lede === 'string') entry.ja.lede = jaFix(entry.ja.lede);
    if (Array.isArray(entry.ja.facts)) entry.ja.facts = entry.ja.facts.map(jaFix);
  }
}
const problems = [];
const valid = new Map();
const han = s => (String(s).match(/\p{Script=Han}/gu) || []).length;
for (const [id, entry] of rewrites) {
  const issues = [];
  if (!current.has(id)) issues.push('unknown id');
  if (typeof entry.lede !== 'string' || han(entry.lede) < 60 || han(entry.lede) > 190) issues.push(`lede length ${han(entry.lede || '')}`);
  if (!Array.isArray(entry.facts) || entry.facts.length !== 3) issues.push('facts count');
  else entry.facts.forEach((f, i) => { if (typeof f !== 'string' || han(f) < 25 || han(f) > 130) issues.push(`fact ${i + 1} length ${han(f || '')}`); if (/<(?!\/?b>)[a-z]/i.test(f)) issues.push(`fact ${i + 1} has tags other than <b>`); });
  if (/<[a-z]/i.test(entry.lede || '')) issues.push('lede has HTML');
  for (const lang of ['en', 'ja']) {
    const t = entry[lang];
    if (!t || typeof t.lede !== 'string' || !t.lede.trim() || !Array.isArray(t.facts) || t.facts.length !== 3 || t.facts.some(f => !String(f).trim())) issues.push(`${lang} missing or misaligned`);
    else if (lang === 'en' && /\p{Script=Han}/u.test(t.lede + t.facts.join(''))) issues.push('en contains Han');
    else if (lang === 'ja' && /[这们]/u.test(t.lede + t.facts.join(''))) issues.push('ja contains Chinese-only characters');
  }
  if (!Array.isArray(entry.sources) || !entry.sources.length) issues.push('no sources');
  if (issues.length) problems.push(`${id} (${entry._file}): ${issues.join('; ')}`); else valid.set(id, entry);
}

// --- sites.js patching -------------------------------------------------------------------
// Entries are object literals inside `const SITES = [ ... ]`; the id property is not always first,
// so objects are located by brace matching and properties by a small top-level tokenizer.
const jsString = (value, quote) => {
  if (quote === '"') return JSON.stringify(value);
  return "'" + value.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n') + "'";
};
function skipStringOrComment(src, i) {
  // Returns the index just past a string/comment starting at i, or i if none starts here.
  const ch = src[i];
  if (ch === "'" || ch === '"' || ch === '`') {
    for (let j = i + 1; j < src.length; j++) { if (src[j] === '\\') { j++; continue; } if (src[j] === ch) return j + 1; }
    throw new Error('unterminated string');
  }
  if (ch === '/' && src[i + 1] === '/') { const nl = src.indexOf('\n', i); return nl < 0 ? src.length : nl; }
  if (ch === '/' && src[i + 1] === '*') { const close = src.indexOf('*/', i + 2); return close < 0 ? src.length : close + 2; }
  return i;
}
function objectSpans(src) {
  // Every object literal in the file is a candidate; entries are the ones with string `id` and `lede` props.
  // Nested braces are examined too, so SITES.push({...}) and SITES.push(...[{...}]) forms all work.
  const spans = [];
  for (let i = 0; i < src.length; i++) {
    const skipped = skipStringOrComment(src, i);
    if (skipped !== i) { i = skipped - 1; continue; }
    if (src[i] !== '{') continue;
    let depth = 0, j = i;
    for (; j < src.length; j++) {
      const s2 = skipStringOrComment(src, j);
      if (s2 !== j) { j = s2 - 1; continue; }
      if (src[j] === '{') depth++;
      else if (src[j] === '}') { depth--; if (depth === 0) break; }
    }
    if (depth !== 0) break;
    spans.push([i, j + 1]);
  }
  return spans;
}
function topLevelProps(src, start, end) {
  // Tokenize `{ key: value, ... }` at depth 1; values may contain nested literals, strings and arrow functions.
  const props = [];
  let i = start + 1;
  while (i < end - 1) {
    while (i < end - 1 && /[\s,]/.test(src[i])) i++;
    const c = skipStringOrComment(src, i);
    if (c !== i && (src[i] === '/' )) { i = c; continue; }
    if (i >= end - 1) break;
    let key, keyEnd;
    if (src[i] === '"' || src[i] === "'") { keyEnd = skipStringOrComment(src, i); key = src.slice(i + 1, keyEnd - 1); }
    else { const m = /^[A-Za-z_$][\w$]*/.exec(src.slice(i, end)); if (!m) throw new Error(`cannot read key at ${i}: ${JSON.stringify(src.slice(i, i + 30))}`); key = m[0]; keyEnd = i + m[0].length; }
    let j = keyEnd; while (/\s/.test(src[j])) j++;
    if (src[j] !== ':') throw new Error(`expected ':' after ${key}`);
    j++; while (/\s/.test(src[j])) j++;
    const valueStart = j;
    let d = 0;
    for (; j < end - 1; j++) {
      const s2 = skipStringOrComment(src, j);
      if (s2 !== j) { j = s2 - 1; continue; }
      const ch = src[j];
      if (ch === '{' || ch === '[' || ch === '(') d++;
      else if (ch === '}' || ch === ']' || ch === ')') { if (d === 0) break; d--; }
      else if (ch === ',' && d === 0) break;
    }
    let valueEnd = j; while (valueEnd > valueStart && /\s/.test(src[valueEnd - 1])) valueEnd--;
    props.push({ key, valueStart, valueEnd, value: src.slice(valueStart, valueEnd) });
    i = j;
  }
  return props;
}
function factsLiteral(original, facts) {
  const q = original.trim().startsWith('[') && /^\[\s*"/.test(original.trim()) ? '"' : (/^\[\s*'/.test(original.trim()) ? "'" : (original.includes('\n') ? '"' : "'"));
  if (original.includes('\n')) {
    const inner = original.match(/\n(\s*)["']/);
    const itemIndent = inner ? inner[1] : '      ';
    const closeIndent = (original.match(/\n(\s*)\]\s*$/) || [, itemIndent.slice(0, Math.max(0, itemIndent.length - 2))])[1];
    return '[\n' + facts.map(f => itemIndent + jsString(f, q)).join(',\n') + '\n' + closeIndent + ']';
  }
  return '[' + facts.map(f => jsString(f, q)).join(', ') + ']';
}
let patched = 0;
{
  const edits = [];
  const spans = objectSpans(sites);
  const byId = new Map();
  for (const [a, b] of spans) {
    let props;
    try { props = topLevelProps(sites, a, b); } catch { continue; }
    const idProp = props.find(p => p.key === 'id');
    if (!idProp || !/^['"][a-z0-9_]+['"]$/.test(idProp.value) || !props.some(p => p.key === 'lede')) continue;
    const idValue = idProp.value.slice(1, -1);
    if (byId.has(idValue)) throw new Error(`duplicate entry object for ${idValue}`);
    byId.set(idValue, { props });
  }
  for (const [id, entry] of valid) {
    const found = byId.get(id);
    if (!found) throw new Error(`entry not found: ${id}`);
    const lede = found.props.find(p => p.key === 'lede'), facts = found.props.find(p => p.key === 'facts');
    if (!lede || !facts) throw new Error(`lede/facts not found for ${id}`);
    edits.push({ start: lede.valueStart, end: lede.valueEnd, text: jsString(entry.lede, lede.value[0] === '"' ? '"' : "'") });
    edits.push({ start: facts.valueStart, end: facts.valueEnd, text: factsLiteral(facts.value, entry.facts) });
    patched++;
  }
  edits.sort((x, y) => y.start - x.start);
  for (const e of edits) sites = sites.slice(0, e.start) + e.text + sites.slice(e.end);
}
// Verify by evaluating the patched source.
const after = new Map(loadSites(sites).map(site => [site.id, site]));
for (const [id, entry] of valid) {
  const site = after.get(id);
  if (!site || site.lede !== entry.lede || JSON.stringify(site.facts) !== JSON.stringify(entry.facts)) throw new Error(`verification failed for ${id}`);
  for (const key of ['name', 'sub', 'year', 'era', 'place', 'placeKey', 'dyn']) {
    if (JSON.stringify(current.get(id)[key]) !== JSON.stringify(site[key])) throw new Error(`unexpected change of ${key} in ${id}`);
  }
}
if (after.size !== current.size) throw new Error('site count changed');

// --- research JSON sources ----------------------------------------------------------------
let sourcesAdded = 0, researchMissing = [];
const researchUpdates = new Map();
for (const [id, entry] of valid) {
  const file = path.join(root, 'assets/research', `${id}.json`);
  if (!fs.existsSync(file)) { researchMissing.push(id); continue; }
  const meta = JSON.parse(fs.readFileSync(file, 'utf8'));
  const list = Array.isArray(meta.historical_sources) ? meta.historical_sources : [];
  const seen = new Set(list.map(s => s.url));
  for (const s of entry.sources) {
    if (!s || typeof s.url !== 'string' || !/^https?:\/\//.test(s.url) || seen.has(s.url)) continue;
    const item = { title: String(s.title || s.publisher || '来源'), url: s.url };
    if (s.publisher) item.publisher = String(s.publisher);
    if (s.note) item.note = String(s.note);
    item.added = 'content-rewrite-20261005';
    list.push(item); seen.add(s.url); sourcesAdded++;
  }
  meta.historical_sources = list;
  researchUpdates.set(file, meta);
}

// --- i18n -----------------------------------------------------------------------------------
const i18nUpdates = new Map();
const pending = {};
for (const lang of ['en', 'ja']) {
  const file = path.join(i18nDir, `${lang}.json`);
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.sites = data.sites || {};
    for (const [id, entry] of valid) {
      data.sites[id] = { ...(data.sites[id] || {}), lede: entry[lang].lede, facts: entry[lang].facts };
    }
    i18nUpdates.set(file, data);
  } else {
    for (const [id, entry] of valid) (pending[id] ||= {})[lang] = entry[lang];
  }
}

console.log(`rewrites: ${rewrites.size}, valid: ${valid.size}, rejected: ${problems.length}`);
for (const p of problems) console.log('  reject:', p);
console.log(`sites.js entries patched: ${patched}; sources added: ${sourcesAdded}; research JSON missing for: ${researchMissing.join(', ') || 'none'}`);
console.log(`i18n: ${i18nUpdates.size ? [...i18nUpdates.keys()].map(f => path.relative(root, f)).join(', ') : 'no i18n dir; ' + Object.keys(pending).length + ' entries kept pending'}`);
if (dryRun) { console.log('dry run: nothing written'); process.exit(0); }
fs.writeFileSync(sitesPath, sites);
for (const [file, meta] of researchUpdates) fs.writeFileSync(file, JSON.stringify(meta, null, 2) + '\n');
for (const [file, data] of i18nUpdates) fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
if (Object.keys(pending).length) {
  const pendingFile = path.join(outDir, '..', 'i18n-pending.json');
  const existing = fs.existsSync(pendingFile) ? JSON.parse(fs.readFileSync(pendingFile, 'utf8')) : {};
  fs.writeFileSync(pendingFile, JSON.stringify({ ...existing, ...pending }, null, 2) + '\n');
  console.log(`pending translations written to ${pendingFile}`);
}
console.log('written');
