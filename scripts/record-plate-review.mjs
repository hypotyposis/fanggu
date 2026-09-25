// Run only after the user explicitly accepts these exact local images.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const [stage, ...ids] = process.argv.slice(2);
if (!['line', 'color'].includes(stage) || !ids.length || ids.some(id => !/^[a-z0-9_]+$/.test(id))) {
  throw new Error('Usage: node scripts/record-plate-review.mjs line|color <explicitly approved id> ...');
}
const hash = file => createHash('sha256').update(readFileSync(path.join(root, file))).digest('hex');
const updates = ids.map(id => {
  const file = `assets/${stage === 'line' ? 'research' : 'color-research'}/${id}.json`;
  const meta = JSON.parse(readFileSync(path.join(root, file), 'utf8'));
  if (meta.id !== id) throw new Error(`Record ID does not match ${id}`);
  const source = stage === 'line' ? `assets/generated/${id}.png` : meta.output;
  if (!source || !source.startsWith('assets/') || path.relative(root, path.resolve(root, source)).startsWith('..') || !existsSync(path.join(root, source))) throw new Error(`Missing local asset for ${id}`);
  const review = { status: 'approved_user', reviewer: 'user', reviewed_at: new Date().toISOString(), sourceSha256: hash(source) };
  if (stage === 'color') {
    review.inputSha256 = hash(`assets/colored-transparent/${id}.png`);
    review.avifSha256 = hash(`assets/colored-transparent-avif/${id}.avif`);
  }
  return { file, meta: { ...meta, ...(stage === 'color' ? { status: 'complete' } : {}), user_review: review } };
});
for (const { file, meta } of updates) writeFileSync(path.join(root, file), JSON.stringify(meta, null, 2) + '\n');
console.log(`Recorded explicit user acceptance for ${stage}: ${ids.join(', ')}. No quality checks or regeneration.`);
if (stage === 'color') console.log('Run prepare-colored-avif.py, then collect-colored-plates.mjs to rebuild the review display.');
