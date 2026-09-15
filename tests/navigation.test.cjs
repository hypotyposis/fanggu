const test = require('node:test');
const assert = require('node:assert/strict');
const navigation = require('../navigation.js');
const { create } = require('../library.js');

test('old monument bookmarks resolve to detail pages, section hashes do not', () => {
  const sites = [{ id: 'horyuji' }, { id: 'sx_tianlongshan' }];
  assert.equal(navigation.legacyDetail('#horyuji', sites), 'detail.html?id=horyuji');
  assert.equal(navigation.legacyDetail('#sx_tianlongshan', sites), 'detail.html?id=sx_tianlongshan');
  for (const hash of ['#atlas', '#wishlist', '#map', '#ch-tang', '#unknown', '#%E0%A4%A']) assert.equal(navigation.legacyDetail(hash, sites), null);
  assert.equal(navigation.detailURL('a&b'), 'detail.html?id=a%26b');
});

test('Back restores expanded results and all filters only for its own history entry', () => {
  const filters = { status: 'wishlist', country: 'CN', region: 'north', province: '山西', dynasty: 'liao', type: 'hall', query: '寺' };
  const state = { fangguView: { version: 1, hash: '#wishlist', filters, limit: 48, x: 0, y: 8000, timelineX: 200, anchor: { id: 'foguang', top: 100 }, focus: 'detail.html?id=foguang' } };
  assert.deepEqual(navigation.readView(state, '#wishlist', 200), { filters, limit: 48, x: 0, y: 8000, timelineX: 200, anchor: state.fangguView.anchor, focus: 'detail.html?id=foguang' });
  assert.equal(navigation.readView(state, '#map', 200), null);
  assert.equal(navigation.readView(null, '#wishlist', 200), null);
});

test('stale or malformed view state cannot break filters or scrolling', () => {
  const view = navigation.readView({ fangguView: { version: 1, hash: '', filters: { status: 'deleted', query: 42 }, limit: 999, y: -20, timelineX: NaN, anchor: { id: 'bad"]', top: 0 } } }, '', 200);
  assert.equal(view.filters.status, 'all');
  assert.equal(view.filters.query, '');
  assert.equal(view.filters.province, 'all');
  assert.equal(view.limit, 204);
  assert.equal(view.y, 0);
  assert.equal(view.timelineX, 0);
  assert.equal(view.anchor, null);
});

test('detail return only uses history for a same-site index with a previous entry', () => {
  const url = 'http://localhost:8765/guide/detail.html?id=foguang';
  for (const from of ['http://localhost:8765/guide/index.html#atlas', 'http://localhost:8765/guide/']) assert(navigation.canReturn(from, url, 2));
  for (const from of ['', 'invalid', 'http://elsewhere.test/guide/index.html', 'http://localhost:8765/index.html', 'http://localhost:8765/guide/proof.html']) assert.equal(navigation.canReturn(from, url, 2), false);
  assert.equal(navigation.canReturn('http://localhost:8765/guide/index.html', url, 1), false);
});

test('a detail-page check-in is reflected by the returning atlas without losing other notes', () => {
  const data = new Map(), storage = { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) };
  const sites = [{ id: 'a', initialStatus: 'wishlist' }, { id: 'b', initialStatus: 'visited' }];
  const atlas = create(sites, storage);
  atlas.setRecord('b', { status: 'visited', visitedOn: '', note: '已有的到访笔记' });
  const detail = create(sites, storage);
  detail.setRecord('a', { status: 'visited', visitedOn: '2026-09-15', note: '<b>保留为文字</b>' });
  atlas.refresh();
  assert.equal(atlas.record('a').status, 'visited');
  assert.equal(atlas.record('a').note, '<b>保留为文字</b>');
  assert.equal(atlas.record('b').note, '已有的到访笔记');
});
