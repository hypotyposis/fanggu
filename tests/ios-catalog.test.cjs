const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

test('iOS catalog stays aligned with site IDs, artwork and original status', () => {
  const context = vm.createContext({});
  for (const filename of ['sites.js', 'plates.js', 'colored-plates.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, { filename });
  }
  const source = vm.runInContext('({sites:SITES, colors:COLORED_PLATES})', context);
  const exported = JSON.parse(fs.readFileSync(path.join(root, 'ios/Fanggu/Resources/catalog.json'), 'utf8'));
  assert.equal(exported.length, source.sites.length);
  assert.equal(new Set(exported.map(site => site.id)).size, exported.length);
  for (const [index, site] of source.sites.entries()) {
    const native = exported[index];
    assert.equal(native.id, site.id);
    assert.equal(native.name, site.name);
    assert.equal(native.initialStatus, site.initialStatus || 'unvisited');
    assert.equal(native.lineImage, path.basename(site.image.src));
    assert.equal(native.colorImage, path.basename(source.colors[site.id].src));
    assert.ok(Number.isFinite(native.latitude) && Number.isFinite(native.longitude));
  }
});
