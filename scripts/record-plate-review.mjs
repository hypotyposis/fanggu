// Record plate review decisions. Every record binds the exact local files by SHA-256;
// a changed image falls back to pending_user until the command runs again.
//   Explicit user acceptance:  node scripts/record-plate-review.mjs line|color <id> ...            → approved_user
//   Default policy (2026-10-05 user decision, no human review):
//                              node scripts/record-plate-review.mjs line|color --default [--all-pending] [<id> ...] → approved_default
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const APPROVED = ['approved_user', 'approved_default'];
const [stage, ...rest] = process.argv.slice(2);
const flags = rest.filter(arg => arg.startsWith('--'));
const listed = rest.filter(arg => !arg.startsWith('--'));
const byDefault = flags.includes('--default');
const allPending = flags.includes('--all-pending');
const usage = 'Usage: node scripts/record-plate-review.mjs line|color <explicitly approved id> ...\n'
  + '       node scripts/record-plate-review.mjs line|color --default [--all-pending] [<id> ...]';
if (!['line', 'color'].includes(stage) || flags.some(flag => !['--default', '--all-pending'].includes(flag))
    || (allPending && !byDefault) || (!allPending && !listed.length) || listed.some(id => !/^[a-z0-9_]+$/.test(id))) {
  throw new Error(usage);
}
const local = file => path.join(root, file);
const hash = file => createHash('sha256').update(readFileSync(local(file))).digest('hex');
const readJSON = file => JSON.parse(readFileSync(local(file), 'utf8'));
const recordFile = id => `assets/${stage === 'line' ? 'research' : 'color-research'}/${id}.json`;

function pendingIDs() {
  if (stage === 'color') {
    const manifest = readJSON('assets/color-research/avif-manifest.json');
    return Object.entries(manifest.images || {})
      .filter(([id, item]) => !APPROVED.includes(item.visualReview) && existsSync(local(recordFile(id))))
      .map(([id]) => id);
  }
  return readdirSync(local('assets/research')).filter(name => name.endsWith('.json')).flatMap(name => {
    try {
      const meta = readJSON(`assets/research/${name}`);
      return meta.id === name.slice(0, -5) && meta.visual_review_status === 'pending_user' ? [meta.id] : [];
    } catch { return []; }
  });
}

const ids = [...new Set([...listed, ...(allPending ? pendingIDs() : [])])];
if (!ids.length) { console.log(`No pending ${stage} plates; nothing recorded.`); process.exit(0); }

const now = new Date().toISOString();
const kept = [];
const missing = [];
const updates = ids.flatMap(id => {
  const file = recordFile(id);
  const meta = readJSON(file);
  if (meta.id !== id) throw new Error(`Record ID does not match ${id}`);
  // The default policy never overrides an explicit user decision.
  if (byDefault && meta.user_review?.status === 'approved_user') { kept.push(id); return []; }
  const source = stage === 'line' ? (meta.generated_file || `assets/generated/${id}.png`) : meta.output;
  if (!source || !source.startsWith('assets/') || path.relative(root, path.resolve(root, source)).startsWith('..') || !existsSync(local(source))) {
    // Blocked entries without an original stay pending; only an explicitly listed ID is an error.
    if (allPending && !listed.includes(id)) { missing.push(id); return []; }
    throw new Error(`Missing local asset for ${id}`);
  }
  const review = { status: byDefault ? 'approved_default' : 'approved_user', reviewer: byDefault ? 'default-policy' : 'user',
    reviewed_at: now, sourceSha256: hash(source) };
  if (byDefault) review.policy = 'default-approve-2026-10-05';
  if (stage === 'color') {
    review.inputSha256 = hash(`assets/colored-transparent/${id}.png`);
    review.avifSha256 = hash(`assets/colored-transparent-avif/${id}.avif`);
  } else if (existsSync(local(`assets/plates/${id}.png`))) {
    review.lineSha256 = hash(`assets/plates/${id}.png`);
  }
  const next = { ...meta, visual_review_status: review.status, user_review: review };
  if (stage === 'line' && meta.status === 'needs_review') next.status = 'complete';
  if (stage === 'color') {
    next.status = 'complete';
    if (meta.visual_review && typeof meta.visual_review === 'object') {
      next.visual_review = { ...meta.visual_review, status: review.status, decided_by: review.reviewer };
    }
  }
  return [{ id, file, meta: next }];
});
for (const { file, meta } of updates) writeFileSync(local(file), JSON.stringify(meta, null, 2) + '\n');
const label = byDefault ? 'default approval (approved_default, no human review)' : 'explicit user acceptance (approved_user)';
console.log(`Recorded ${label} for ${updates.length} ${stage} plate(s)${updates.length ? ': ' + updates.map(item => item.id).join(', ') : ''}.`);
if (kept.length) console.log(`Kept existing user approval for ${kept.length}: ${kept.join(', ')}.`);
if (missing.length) console.log(`Skipped ${missing.length} without a local original (still pending): ${missing.join(', ')}.`);
console.log('No quality checks or regeneration.');
if (stage === 'color') console.log('Run python3 -B scripts/prepare-colored-avif.py, then node scripts/collect-colored-plates.mjs --require-complete to publish the status.');
