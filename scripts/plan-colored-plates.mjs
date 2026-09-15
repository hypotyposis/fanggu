import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const sites = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\nSITES');
const excluded = new Set(['longmenshiku', 'foguang', 'yingxian']);
const wanted = sites.filter(site => !excluded.has(site.id));
if (wanted.length !== 197) throw new Error('Expected 197 remaining plates');
const mainIds = new Set([...wanted.filter(s => s.dyn.startsWith('jp_')), ...wanted.filter(s => !s.dyn.startsWith('jp_')).slice(0, 11)].map(s => s.id));
let workerIndex = 0;
const queue = wanted.map(site => {
  const research = JSON.parse(read('assets/research/' + site.id + '.json'));
  const strings = [];
  function collect(value) {
    if (typeof value === 'string') strings.push(value);
    else if (Array.isArray(value)) value.forEach(collect);
    else if (value && typeof value === 'object') Object.values(value).forEach(collect);
  }
  collect(research);
  const references = [...new Set(strings.filter(s => s.startsWith('assets/references/') && /\.(png|jpe?g|webp)$/i.test(s) && !s.includes('longmen-style')))];
  return {
    id: site.id, name: site.name, subject: research.subject || site.sub || site.name,
    sub: site.sub || '', place: site.place, dyn: site.dyn, types: site.types,
    owner: mainIds.has(site.id) ? 'main' : ['worker_a', 'worker_b', 'worker_c'][Math.floor(workerIndex++ / 60)],
    line: 'assets/generated/' + site.id + '.png',
    displayLine: site.image.src, width: site.image.width, height: site.image.height,
    originalResearch: 'assets/research/' + site.id + '.json',
    candidateReferences: references,
    output: 'assets/colored/' + site.id + '.png',
    record: 'assets/color-research/' + site.id + '.json'
  };
});
// Rebalanced with workers: each worker keeps its first 50; root takes their last 10.
for (const owner of ['worker_a', 'worker_b', 'worker_c']) {
  for (const item of queue.filter(item => item.owner === owner).slice(50)) item.owner = 'main';
}
for (const item of queue) if (!fs.existsSync(path.join(root, item.line))) throw new Error('Missing ' + item.line);
for (const dir of ['assets/colored', 'assets/color-research', 'assets/color-research/batches', 'assets/color-references']) fs.mkdirSync(path.join(root, dir), { recursive: true });
fs.writeFileSync(path.join(root, 'assets/color-research/queue.json'), JSON.stringify({ created: '2026-09-15', count: queue.length, excluded: [...excluded], entries: queue }, null, 2) + '\n');
for (const owner of ['main', 'worker_a', 'worker_b', 'worker_c']) {
  const entries = queue.filter(s => s.owner === owner);
  fs.writeFileSync(path.join(root, 'assets/color-research/batches/' + owner + '.json'), JSON.stringify(entries, null, 2) + '\n');
  console.log(owner + ': ' + entries.length + ' entries');
}
