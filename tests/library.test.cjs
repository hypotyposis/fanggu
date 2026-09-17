const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const { create, KEY, REVIEW_LIMIT, validDate, today } = require('../library.js');
const existing = vm.runInNewContext(fs.readFileSync(require.resolve('../sites.js'), 'utf8') + '\nSITES');
const catalog = existing;
const memory = () => { const data = new Map(); return { getItem: key => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) }; };
const old = { id: 'personal-test-000001', name: '奉国寺', place: '义县', dyn: 'unknown', description: '想看七佛' };
const v1 = (site = old) => JSON.stringify({ version: 1, customSites: [site], records: { [site.id]: { status: 'wishlist', visitedOn: '', note: '雨天也想去' } } });

test('visit and wishlist seeds reflect the requested collection; unknown places cannot be added', () => {
  const library = create(catalog, memory());
  assert.equal(library.all().filter(s => s.record.status === 'visited').length, 44);
  assert.equal(library.record('fengguo').status, 'unvisited');
  assert.equal(library.record('xiaoxitian').visitedOn, '');
  for (const id of ['jingtusi','shisi','hongfu','yanqing','guanyintang','xianwall','xianzhonggu']) {
    assert.equal(library.record(id).status, 'visited'); assert.equal(library.record(id).visitedOn, '');
  }
  assert.deepEqual(Array.from(library.all().filter(s => s.record.status === 'wishlist'), s => s.id).sort(), ['xuankong','yongan','yuanjue','hunyuanwenmiao','gugong','taimiao','yanfu','jinhuatianning','taishique','shaoshique','qimuque','songyue','yongle','jiwang','guangren','feiyun','qiufeng','huanghuatan','mimi','gongzhu','yanshan','quanzhouwenmiao','quanzhoukaiyuan','fuzhouwuta','fuzhoubaita','guanque','xianshen','chongsheng','dule','qufukongmiao','wangbao','gaoyique','liyeque','daimiao','xiangtang','zhaoling','horyuji','toshodaiji','byodoin','todaiji','kiyomizu','toji','zhakoubaita','feiying','songyangyanqing','huqiuta','qixia','haiqing','xuanmiao','duanliang','jijian','xuanyuan','fenghuangsi','linggu','feilaifeng','xinchangdafo','zijinan','baosheng','rulong','baziqiao','longxingchuang','lingyin','luohanshuangta','ruiguang','haichunxuan'].sort());
  assert.equal(create([...catalog, {id:'future-site'}], memory()).record('future-site').status, 'unvisited');
  assert.equal(library.add, undefined); assert.equal(library.edit, undefined);
  assert.throws(() => library.setStatus('personal-not-in-catalog', 'wishlist'), /古迹库/);
});
test('legacy Fengguo wish migrates to its illustrated entry and remains idempotent after removing wish', () => {
  const storage = memory(); storage.setItem(KEY, v1());
  let library = create(catalog, storage);
  assert.equal(library.all().length, catalog.length);
  assert.equal(library.record('fengguo').status, 'wishlist');
  assert.equal(library.record('fengguo').note, '雨天也想去\n\n想看七佛');
  assert.equal(library.legacy().length, 0);
  library.setStatus('fengguo', 'unvisited'); library = create(catalog, storage);
  assert.equal(library.record('fengguo').status, 'unvisited');
  library.import(v1()); assert.equal(library.record('fengguo').status, 'unvisited');
  const backup = JSON.parse(library.export());
  assert.equal(backup.customSites[0].description, old.description);
  assert.equal(backup.records[old.id].note, '雨天也想去');
  assert.equal(backup.links[old.id], 'fengguo');
});
test('new aliases migrate to the illustrated monument and unrelated city names remain separate', () => {
  const library = create(catalog, memory());
  library.import(v1({ ...old, name:'后母阙', place:'登封' }));
  assert.equal(library.legacy().length, 0);
  assert.equal(JSON.parse(library.export()).links[old.id], 'qimuque');
  const second = create(catalog, memory());
  second.import(v1({ ...old, name:'开元寺', place:'泉州' }));
  assert.equal(JSON.parse(second.export()).links[old.id], 'quanzhoukaiyuan');
  assert.equal(second.record('kaiyuan').status, 'visited');
  for (const [name, place, id] of [['高平 王报二郎庙', '高平', 'wangbao'], ['独乐寺', '天津', 'dule'], ['天贶殿', '泰安', 'daimiao']]) {
    const next = create(catalog, memory());
    next.import(v1({ ...old, name, place }));
    assert.equal(JSON.parse(next.export()).links[old.id], id);
  }
});
test('unknown legacy entries are retained outside cards until manually matched', () => {
  const source = v1({ ...old, name: '未知寺', place: '未知村' });
  const library = create(catalog, memory()); library.import(source);
  assert.equal(library.all().length, catalog.length); assert.equal(library.legacy().length, 1);
  library.linkLegacy(old.id, 'fengguo');
  assert.equal(library.legacy().length, 0); assert.equal(library.record('fengguo').status, 'wishlist');
  assert.equal(JSON.parse(library.export()).customSites.length, 1);
});
test('same name in a different place is not automatically linked', () => {
  const library = create(catalog, memory()); library.import(v1({ ...old, place: '山西 · 测试村' }));
  assert.equal(library.legacy().length, 1); assert.equal(library.record('fengguo').status, 'unvisited');
});
test('wishlist → check-in → reload → wishlist keeps date and journal; backup round-trip merges unrelated records', () => {
  const storage = memory(); let library = create(catalog, storage);
  library.setStatus('fengguo', 'wishlist');
  library.setRecord('fengguo', { status: 'visited', visitedOn: '2025-04-05', note: '<img onerror=alert(1)>' });
  library = create(catalog, storage); library.setStatus('fengguo', 'wishlist');
  assert.equal(library.record('fengguo').visitedOn, '2025-04-05');
  const target = create(catalog, memory()); target.setRecord('tiefo', { status: 'visited', visitedOn: '', note: '旧笔记' });
  target.import(library.export()); target.import(library.export());
  assert.equal(target.record('fengguo').note, '<img onerror=alert(1)>');
  assert.equal(target.record('tiefo').note, '旧笔记'); assert.equal(target.all().length, catalog.length);
});
test('current export restores migrated record without duplicating the legacy notes', () => {
  const library = create(catalog, memory()); library.import(v1());
  library.setRecord('fengguo', { status: 'visited', visitedOn: '2024-01-01', note: '已经看过了' });
  const restored = create(catalog, memory()); restored.import(library.export()); restored.import(library.export());
  assert.deepEqual(restored.record('fengguo'), library.record('fengguo'));
});

test('v1 and v2 records gain an empty review view without rewriting stored bytes', () => {
  for (const source of [v1(), JSON.stringify({ version: 2, customSites: [], records: { fengguo: { status: 'visited', visitedOn: '', note: '旧笔记' } }, links: {} })]) {
    const storage = memory(); storage.setItem(KEY, source);
    const library = create(catalog, storage);
    assert.deepEqual(library.review('fengguo'), { rating: null, text: '', updatedAt: '' });
    assert.equal(storage.getItem(KEY), source);
    library.setReview('fengguo', { rating: 5, text: '七佛与梁架' });
    assert.equal(JSON.parse(storage.getItem(KEY)).version, 3);
    assert.equal(library.record('fengguo').note, source === v1() ? '雨天也想去\n\n想看七佛' : '旧笔记');
  }
});

test('rating and short review are optional and independent of check-in status and private notes', () => {
  const storage = memory(), library = create(catalog, storage), before = library.record('fengguo');
  library.setReview('fengguo', { rating: 4, text: '  <img onerror=alert(1)>\n木纹  ' });
  assert.deepEqual(library.record('fengguo'), before);
  assert.equal(library.review('fengguo').text, '<img onerror=alert(1)>\n木纹');
  assert.equal(new Date(library.review('fengguo').updatedAt).toISOString(), library.review('fengguo').updatedAt);
  library.setRecord('fengguo', { status: 'visited', visitedOn: '', note: '私人的到访笔记' });
  library.setStatus('fengguo', 'wishlist');
  const restored = create(catalog, storage);
  assert.equal(restored.review('fengguo').rating, 4);
  assert.equal(restored.record('fengguo').note, '私人的到访笔记');
  library.setReview('fengguo', { rating: null, text: '只写短评' });
  assert.equal(library.review('fengguo').rating, null);
  library.setReview('fengguo', { rating: 1, text: '' });
  assert.equal(library.review('fengguo').text, '');
});

test('clearing a review survives reload and replaces the same review on backup import', () => {
  const storage = memory(), library = create(catalog, storage), target = create(catalog, memory());
  library.setReview('fengguo', { rating: 5, text: '待清除' });
  target.import(library.export());
  library.setReview('fengguo', { rating: null, text: '' });
  const cleared = create(catalog, storage).review('fengguo');
  assert.equal(cleared.rating, null); assert.equal(cleared.text, ''); assert(cleared.updatedAt);
  target.import(library.export());
  assert.deepEqual(target.review('fengguo'), cleared);
  assert.equal(target.record('fengguo').status, 'unvisited');
});

test('review backups merge by site ID and older backup versions preserve existing reviews', () => {
  const source = create(catalog, memory()), target = create(catalog, memory());
  source.setReview('fengguo', { rating: 3, text: '备份短评' });
  target.setReview('fengguo', { rating: 5, text: '当前短评' });
  target.setReview('tiefo', { rating: 4, text: '另一处' });
  target.import(source.export()); target.import(source.export());
  assert.deepEqual(target.review('fengguo'), source.review('fengguo'));
  assert.equal(target.review('tiefo').text, '另一处');
  target.import(v1());
  target.import(JSON.stringify({ version: 2, customSites: [], records: { fengguo: { status: 'visited', visitedOn: '', note: 'v2 笔记' } }, links: {} }));
  assert.equal(target.review('fengguo').text, '备份短评');
  assert.equal(target.record('fengguo').note, 'v2 笔记');
});

test('invalid reviews and v3 backups leave storage and in-memory state intact', () => {
  const storage = memory(), library = create(catalog, storage);
  library.setReview('fengguo', { rating: 5, text: '原评价' });
  const before = storage.getItem(KEY), original = library.review('fengguo');
  for (const rating of [0, 6, -1, 2.5, '4', false, undefined]) assert.throws(() => library.setReview('fengguo', { rating, text: '' }), /评分/);
  for (const text of ['字'.repeat(REVIEW_LIMIT + 1), 123, null, {}]) assert.throws(() => library.setReview('fengguo', { rating: null, text }), /短评/);
  assert.throws(() => library.setReview('unknown', { rating: 5, text: '' }), /古迹库/);
  assert.equal(storage.getItem(KEY), before); assert.deepEqual(library.review('fengguo'), original);
  library.setReview('tiefo', { rating: 2, text: '字'.repeat(REVIEW_LIMIT) });
  assert.equal(library.review('tiefo').text.length, REVIEW_LIMIT);
  const baseline = storage.getItem(KEY);
  for (const mutate of [data => { delete data.reviews; }, data => { data.reviews.unknown = original; }, data => { data.reviews.fengguo.updatedAt = 'invalid'; }, data => { data.reviews.fengguo.updatedAt = '2025-02-30T00:00:00.000Z'; }, data => { data.reviews.fengguo.text = '字'.repeat(REVIEW_LIMIT + 1); }]) {
    const data = JSON.parse(baseline); mutate(data);
    assert.throws(() => library.import(JSON.stringify(data)));
    assert.equal(storage.getItem(KEY), baseline);
    assert.deepEqual(library.review('fengguo'), original);
  }
});

test('multiple tabs preserve fresh reviews, journals and unrelated reviews across all record actions', () => {
  const storage = memory(), first = create(catalog, storage), second = create(catalog, storage);
  first.setReview('fengguo', { rating: 5, text: '刚写的短评' });
  second.setRecord('fengguo', { status: 'wishlist', visitedOn: '', note: '刚写的笔记' });
  first.setReview('tiefo', { rating: 4, text: '另一处评价' });
  second.checkIn('fengguo');
  first.setReview('fengguo', { rating: 3, text: '改评' });
  second.refresh();
  assert.equal(second.record('fengguo').status, 'visited');
  assert.equal(second.record('fengguo').note, '刚写的笔记');
  assert.equal(second.review('fengguo').text, '改评');
  assert.equal(second.review('tiefo').rating, 4);
  second.setStatus('fengguo', 'wishlist');
  first.refresh(); assert.equal(first.review('fengguo').text, '改评');
});

test('failed review saves and corrupt storage do not show or overwrite an unsaved review', () => {
  const storage = memory(), library = create(catalog, storage);
  library.setReview('fengguo', { rating: 4, text: '原评价' });
  const before = storage.getItem(KEY), original = library.review('fengguo');
  storage.setItem = () => { throw Error('full'); };
  assert.throws(() => library.setReview('fengguo', { rating: 5, text: '存不下' }), /未能保存/);
  assert.equal(storage.getItem(KEY), before); assert.deepEqual(library.review('fengguo'), original);
  const corrupt = memory(); corrupt.setItem(KEY, '{broken');
  const blocked = create(catalog, corrupt);
  assert.throws(() => blocked.setReview('fengguo', { rating: 1, text: '覆盖' }), /原数据已保留/);
  assert.equal(blocked.export(), '{broken');
});
test('invalid dates, duplicate IDs and malformed backups do not change storage', () => {
  const storage = memory(), library = create(catalog, storage); library.setStatus('fengguo', 'wishlist');
  const before = storage.getItem(KEY);
  for (const date of ['2025-02-30', '2099-01-01', 'not-a-date']) assert.throws(() => library.setRecord('tiefo', { status: 'visited', visitedOn: date, note: '' }));
  assert.equal(validDate('2024-02-29'), true); assert.equal(validDate(today()), true);
  for (const data of ['{', '{"version":9}', JSON.stringify({version:1,customSites:[old,old],records:{}}), JSON.stringify({version:1,customSites:[],records:{unknown:{status:'visited'}}})]) assert.throws(() => library.import(data));
  assert.equal(storage.getItem(KEY), before);
});
test('storage failure is explicit and leaves previous state intact', () => {
  const storage = memory(), library = create(catalog, storage); library.setStatus('fengguo', 'wishlist');
  storage.setItem = () => { throw new Error('quota exceeded'); };
  assert.throws(() => library.setStatus('fengguo', 'visited'), /未能保存/);
  assert.equal(library.record('fengguo').status, 'wishlist');
});
test('corrupt bytes remain exportable; valid import recovers them', () => {
  const storage = memory(); storage.setItem(KEY, '{broken'); const library = create(catalog, storage);
  assert(library.error()); assert.equal(library.export(), '{broken'); assert.throws(() => library.setStatus('fengguo', 'wishlist'));
  library.import(JSON.stringify({version:1,customSites:[],records:{}})); assert.equal(library.error(), '');
});
test('multiple tabs keep unrelated records and read the freshest journal before changing status', () => {
  const storage = memory(), first = create(catalog, storage), second = create(catalog, storage);
  first.setRecord('tiefo', {status:'visited',visitedOn:'2024-01-01',note:'甲'});
  second.setRecord('qinglian', {status:'wishlist',visitedOn:'',note:'乙'});
  second.setStatus('tiefo', 'wishlist');
  first.refresh(); assert.equal(first.record('qinglian').note, '乙'); assert.equal(first.record('tiefo').note, '甲');
});

test('removing a seeded wish survives reload, backup and restoration without changing prior wishes', () => {
  const storage = memory(), library = create(catalog, storage);
  library.setStatus('fengguo', 'wishlist');
  library.setStatus('gugong', 'unvisited');
  assert.equal(create(catalog, storage).record('gugong').status, 'unvisited');
  const restored = create(catalog, memory()); restored.import(library.export());
  assert.equal(restored.record('gugong').status, 'unvisited');
  assert.equal(restored.record('fengguo').status, 'wishlist');
  assert.equal(restored.record('taimiao').status, 'wishlist');
  assert.equal(restored.record('xiaoxitian').status, 'visited');
});
