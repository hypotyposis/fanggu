import { readFileSync } from 'node:fs';

export function plateMode(args = process.argv.slice(2)) {
  if (args.includes('--strict') && args.includes('--prototype')) throw new Error('Choose --strict or --prototype, not both.');
  const mode = args.includes('--strict') ? 'strict' : args.includes('--prototype') ? 'prototype'
    : JSON.parse(readFileSync(new URL('./plate-policy.json', import.meta.url), 'utf8')).mode;
  if (!['strict', 'prototype'].includes(mode)) throw new Error(`Unknown plate mode: ${mode}`);
  return mode;
}
