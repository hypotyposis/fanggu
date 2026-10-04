const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');

test('iOS catalog stays aligned with site IDs, artwork and original status', () => {
  const context = vm.createContext({});
  for (const filename of ['sites.js', 'plates.js', 'colored-plates.js', 'protection-data.js', 'protection.js', 'catalog.js']) {
    vm.runInContext(fs.readFileSync(path.join(root, filename), 'utf8'), context, { filename });
  }
  const source = vm.runInContext('({sites:FangguCatalog.classify(SITES,PLACES), colors:COLORED_PLATES, dynasties:DYN})', context);
  const css = fs.readFileSync(path.join(root, 'palette.css'), 'utf8');
  const palette = Object.fromEntries([...css.matchAll(/(--[\w-]+):\s*(#[\da-f]{6})\s*;/gi)].map(match => [match[1], match[2]]));
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
    assert.ok(native.placeName);
    assert.ok(Number.isFinite(native.latitude) && Number.isFinite(native.longitude));
    const token = source.dynasties[site.dyn].acc.match(/^var\((--[\w-]+)\)$/)[1];
    assert.equal(native.dynastyColor, palette[token]);
    assert.ok(Number.isInteger(native.dynastyStart) && Number.isInteger(native.dynastyEnd));
    assert.ok(native.dynastyStart < native.dynastyEnd);
    assert.equal(native.timelineLane, site.timelineLane || '');
    assert.equal(native.yearNote, site.yearNote || '');
    assert.equal(native.protection.length, site.protection.length);
    assert.deepEqual(native.protection.map(entry => [entry.batch, entry.unitName]),
      Array.from(site.protection, entry => [entry.batch, entry.unitName]));
    assert.equal(new Set(native.sourceLinks.map(link => link.url)).size, native.sourceLinks.length);
    const researchPath = path.join(root, `assets/research/${site.id}.json`);
    const research = fs.existsSync(researchPath) ? JSON.parse(fs.readFileSync(researchPath, 'utf8')) : {};
    const recorded = research.coordinates;
    const expected = recorded && Number.isFinite(recorded.lat) ? [recorded.lat, recorded.lng ?? recorded.lon] : null;
    if (expected) {
      assert.deepEqual([native.siteLatitude, native.siteLongitude], expected, site.id);
      assert.ok(native.siteCoordinateSource, `${site.id}: a monument coordinate carries its source`);
      // site_recommendation often repeats the town point and is deliberately not exported.
      // A monument point is only meaningful near its own town marker.
      assert.ok(Math.abs(native.siteLatitude - native.latitude) < 0.6 && Math.abs(native.siteLongitude - native.longitude) < 0.6, site.id);
    } else {
      assert.equal(native.siteLatitude, null, site.id);
      assert.equal(native.siteLongitude, null, site.id);
      assert.equal(native.siteCoordinateSource, '', site.id);
    }
  }
  const located = exported.filter(site => site.siteLatitude !== null);
  assert.ok(located.length > 0, 'monument-level coordinates feed the nearby reminder');
  assert.ok(located.length < exported.length, 'town-level markers alone must not become monument coordinates');
});
