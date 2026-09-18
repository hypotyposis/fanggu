const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const timeline = require('../timeline.js');
const { SITES, DYN } = vm.runInNewContext(fs.readFileSync(require.resolve('../sites.js'), 'utf8') + '\n({SITES,DYN})');
const groups = timeline.clusters(SITES, DYN);

test('compact clusters retain every monument exactly once and keep the country and political lanes', () => {
  const ids = groups.flatMap(group => group.sites.map(site => site.id));
  assert.equal(ids.length, 203);
  assert.equal(new Set(ids).size, 203);
  assert.deepEqual([...ids].sort(), Array.from(SITES, site => site.id).sort());
  assert.equal(timeline.lane(SITES.find(site => site.id === 'sx_zhenguo'), DYN), 'north');
  assert.equal(timeline.lane(SITES.find(site => site.id === 'horyuji'), DYN), 'japan');
  for (const group of groups) {
    assert(group.sites.every(site => timeline.lane(site, DYN) === group.lane));
    assert(group.y >= 0 && group.y < timeline.HEIGHT);
  }
});

test('dense future additions do not overlap point hit targets or add vertical rows', () => {
  const larger = Array.from({ length: 10 }, (_, i) => SITES.map(site => ({ ...site, id: `${site.id}_${i}` }))).flat();
  const packed = timeline.clusters(larger, DYN);
  assert.equal(packed.reduce((n, group) => n + group.sites.length, 0), larger.length);
  for (const lane of ['north', 'south', 'japan']) {
    const row = packed.filter(group => group.lane === lane);
    for (let i = 1; i < row.length; i++) assert(row[i].x - row[i - 1].x >= 32);
  }
  assert.equal(new Set(packed.map(group => group.y)).size, 3);
});

test('all dynasty selections and all pages remain reachable in chronological order', () => {
  for (const period of ['all', ...Object.keys(DYN)]) {
    const result = timeline.select(SITES, { period }, groups);
    const expected = SITES.filter(site => period === 'all' || site.dyn === period);
    assert.equal(result.length, expected.length);
    const pages = [];
    for (let page = 0; page < Math.ceil(result.length / timeline.PAGE_SIZE); page++) pages.push(...result.slice(page * timeline.PAGE_SIZE, (page + 1) * timeline.PAGE_SIZE));
    assert.deepEqual(pages.map(site => site.id), result.map(site => site.id));
    assert(result.every((site, i) => !i || result[i - 1].year <= site.year));
  }
});

test('Back restores a chosen period or cluster and clamps stale page numbers', () => {
  assert.deepEqual(timeline.restore({ period: 'song', page: 3 }, SITES, groups), { period: 'song', cluster: '', page: 3 });
  const group = groups.find(group => group.sites.length > 4);
  const state = timeline.restore({ cluster: group.id, page: 1 }, SITES, groups);
  assert.equal(state.cluster, group.id);
  assert.equal(state.page, 1);
  assert.equal(timeline.select(SITES, state, groups).length, group.sites.length);
  assert.deepEqual(timeline.restore({ period: 'jp_asuka', page: 99 }, SITES, groups), { period: 'jp_asuka', cluster: '', page: 0 });
  assert.deepEqual(timeline.restore({ period: 'missing', cluster: 'gone', page: -10 }, SITES, groups), { period: 'all', cluster: '', page: 0 });
});
