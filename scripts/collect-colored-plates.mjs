// Aggregate source records and technically validated transparent deliveries.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';
import { plateMode } from './plate-policy.mjs';
const root = fileURLToPath(new URL('../', import.meta.url));
const prototype = plateMode() === 'prototype';
const read = file => readFileSync(path.join(root, file), 'utf8');
const { SITES: sites } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES})');
const queue = JSON.parse(read('assets/color-research/queue.json'));
const deliveryManifest = 'assets/color-research/avif-manifest.json';
if (!existsSync(path.join(root, deliveryManifest))) throw new Error('Run python3 scripts/prepare-colored-avif.py first.');
const delivery = JSON.parse(read(deliveryManifest));
if (!prototype && (delivery.format !== 'AVIF' || delivery.settings.quality !== 85 || delivery.settings.subsampling !== '4:4:4' || !delivery.transparency)) throw new Error('Expected transparent AVIF Q85 with 4:4:4 color sampling.');
const manifest = {}, prompts = [], progress = { total: queue.count, complete: [], pending: [] };
const hash = file => createHash('sha256').update(readFileSync(path.join(root, file))).digest('hex');
function deliverySource(id, originalSrc, size) {
  const item = delivery.images[id];
  if (prototype) {
    if (!item || item.source !== originalSrc || !existsSync(path.join(root, item.src)) || !existsSync(path.join(root, item.input))) {
      throw new Error(`Missing delivery files for ${id}; run python3 scripts/prepare-colored-avif.py.`);
    }
    const unchanged = item.sourceSha256 === hash(originalSrc) && item.sha256 === hash(item.src) && item.inputSha256 === hash(item.input);
    return { src: item.src, originalSrc, transparentSrc: item.input,
      transparent: item.alpha?.min === 0 && item.alpha?.max > 0,
      visualReview: unchanged ? item.visualReview : 'pending_user' };
  }
  const colorsPreserved = item?.extraction?.rgbUnchanged || (item?.extraction?.method === 'white-matte-v1'
    && item.extraction.interiorRgbUnchanged && item.backgroundPreparation?.method === 'white-matte-v1'
    && item.backgroundPreparation.sourceSha256 === item.sourceSha256
    && item.backgroundPreparation.processorSha256 === hash('scripts/white-matte.py'));
  if (!item || item.source !== originalSrc || item.src !== `assets/colored-transparent-avif/${id}.avif`
      || item.input !== `assets/colored-transparent/${id}.png`
      || item.width !== size.width || item.height !== size.height
      || item.sourceSha256 !== hash(originalSrc) || !existsSync(path.join(root, item.src))
      || !existsSync(path.join(root, item.input)) || item.inputSha256 !== hash(item.input)
      || item.alpha?.min !== 0 || item.alpha?.max !== 255 || !colorsPreserved
      || item.sha256 !== hash(item.src)) throw new Error(`Missing or stale transparent AVIF for ${id}; run python3 scripts/prepare-colored-avif.py.`);
  return { src: item.src, originalSrc, transparentSrc: item.input, transparent: true, visualReview: item.visualReview };
}
function dimensions(file) {
  const bytes = readFileSync(path.join(root, file));
  if (bytes.subarray(1, 4).toString() !== 'PNG') throw new Error(`Invalid PNG: ${file}`);
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}
for (const entry of queue.entries) {
  if (!existsSync(path.join(root, entry.record))) { progress.pending.push(entry.id); continue; }
  const meta = JSON.parse(read(entry.record));
  if ((!prototype && meta.status !== 'complete') || !existsSync(path.join(root, entry.output))) { progress.pending.push(entry.id); continue; }
  const references = Array.isArray(meta.references) ? meta.references : meta.references?.photo_sources;
  if (!prototype && (!meta.prompt || !meta.visual_review || !meta.material_observations || !references?.length)) throw new Error(`Incomplete color research: ${entry.id}`);
  const size = dimensions(entry.output);
  if (!prototype && (Math.abs(size.width - entry.width) > 2 || Math.abs(size.height - entry.height) > 2)) throw new Error(`Unexpected dimensions: ${entry.id}`);
  manifest[entry.id] = { ...deliverySource(entry.id, entry.output, size), alt: `${entry.subject} · 设色图`, ...size, tint: false, record: entry.record,
    references: (references || []).map(ref => ({ page: ref.source_page || ref.page, author: ref.author, license: ref.license, date: ref.date })).filter(ref => typeof ref.page === 'string' && /^https?:\/\//.test(ref.page)) };
  prompts.push({ id: entry.id, name: entry.name, prompt: meta.prompt, input_images: meta.input_images, record: entry.record });
  progress.complete.push(entry.id);
}
for (const id of queue.excluded) {
  const site = sites.find(site => site.id === id), src = `assets/color-studies/v1/${id}-colored.png`;
  // Preserve the approved PNG masters; publish their AVIF delivery copies.
  const size = dimensions(src);
  manifest[id] = { ...deliverySource(id, src, size), alt: `${site.name} · 设色图`, ...size, tint: false, record: 'assets/color-studies/v1/README.md' };
}
if (process.argv.includes('--require-complete') && progress.pending.length) throw new Error(`${progress.pending.length} plates still pending`);
writeFileSync(path.join(root, 'colored-plates.js'), '/* Generated by scripts/collect-colored-plates.mjs. */\nglobalThis.COLORED_PLATES = ' + JSON.stringify(manifest, null, 2) + ';\n');
writeFileSync(path.join(root, 'assets/color-research/progress.json'), JSON.stringify(progress, null, 2) + '\n');
writeFileSync(path.join(root, 'assets/color-research/prompts.json'), JSON.stringify(prompts, null, 2) + '\n');
console.log(`${progress.complete.length}/${queue.count} batch colored plates ready (${prototype ? 'prototype: quality gates off; human review decides' : 'strict'}); ${Object.keys(manifest).length} including ${queue.excluded.length} approved existing plates.`);
