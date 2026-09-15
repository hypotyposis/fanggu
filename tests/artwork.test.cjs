const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const context = vm.createContext({});
vm.runInContext(read('sites.js') + '\n' + read('plates.js') + '\n' + read('colored-plates.js') + '\n' + read('artwork.js') + '\nglobalThis.sitesForTest = SITES;', context);
const art = context.FangguArtwork, sites = context.sitesForTest;
test('personal status chooses the companion while preserving line art and records', () => {
  const site = sites.find(site => site.id === 'liyeque'), original = JSON.stringify(site);
  assert.equal(art.resolve(site, 'visited').src, 'assets/colored/liyeque.png');
  for (const status of ['wishlist', 'unvisited', undefined]) {
    assert.equal(art.resolve(site, status).src, site.image.src);
    assert.equal(art.resolve(site, status).colored, false);
  }
  assert.equal(JSON.stringify(site), original);
});
test('missing or failed colored art falls back to its existing line plate', () => {
  const missing = { id: 'not-generated', name: 'test', image: { src: 'line.png', width: 10, height: 20 } };
  assert.equal(art.resolve(missing, 'visited').src, 'line.png');
  const classes = new Set();
  const image = { classList: { toggle: (key, value) => value ? classes.add(key) : classes.delete(key), remove: key => classes.delete(key) } };
  const site = sites.find(site => site.id === 'liyeque');
  art.apply(image, site, 'visited');
  assert(classes.has('colored-plate')); assert.equal(typeof image.onerror, 'function');
  image.onerror();
  assert.equal(image.src, site.image.src); assert.equal(image.onerror, null); assert(!classes.has('colored-plate'));
  art.apply(image, site, 'wishlist'); assert.equal(image.src, site.image.src);
});
test('every published colored companion is a real PNG at its declared dimensions', () => {
  for (const [id, item] of Object.entries(context.COLORED_PLATES)) {
    assert(sites.some(site => site.id === id));
    const bytes = fs.readFileSync(path.join(root, item.src));
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
    assert.equal(bytes.readUInt32BE(16), item.width); assert.equal(bytes.readUInt32BE(20), item.height);
    assert(fs.existsSync(path.join(root, item.record)));
  }
});
