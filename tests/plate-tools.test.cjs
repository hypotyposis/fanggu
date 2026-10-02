const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { execFileSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');

test('source navigation can rebuild without originals or rewriting plate deliveries', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'fanggu-sources-test-'));
  const write = (file, value) => {
    fs.mkdirSync(path.dirname(path.join(directory, file)), { recursive: true });
    fs.writeFileSync(path.join(directory, file), value);
  };
  try {
    for (const file of ['prepare-plates.mjs', 'line-plate.mjs', 'plate-policy.mjs', 'plate-policy.json']) {
      write(`scripts/${file}`, fs.readFileSync(path.join(root, `scripts/${file}`)));
    }
    write('sites.js', 'const SITES = [{ id: "test", dyn: "tang" }]; const DYN = {};\n');
    const manifest = 'const PLATES = { test: { src: "assets/plates/test.png", alt: "测试线稿", width: 100, height: 100 } };\n';
    write('plates.js', manifest);
    write('palette.css', ':root { --gold: #d6ab5c; }\n');
    write('assets/research/test.json', JSON.stringify({ id: 'test', subject: '测试主体', prompt: '原始提示词', sources: [] }));
    write('assets/plates/test.png', 'unchanged delivery');
    execFileSync(process.execPath, [path.join(directory, 'scripts/prepare-plates.mjs'), '--sources-only'], { cwd: directory });
    assert.equal(fs.readFileSync(path.join(directory, 'plates.js'), 'utf8'), manifest);
    assert.equal(fs.readFileSync(path.join(directory, 'assets/plates/test.png'), 'utf8'), 'unchanged delivery');
    assert(!fs.existsSync(path.join(directory, 'assets/generated')));
    const html = fs.readFileSync(path.join(directory, 'sources.html'), 'utf8');
    assert(html.includes('测试主体'));
    assert(html.includes('href="plate-preview.css"'));
    assert(html.includes('href="color-proof.html"'));
    assert(!html.includes('href="index.html"'));
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});
