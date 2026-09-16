const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const { SITES, PLACES, DYN, CHAPTERS } = vm.runInNewContext(read('sites.js') + '\n' + read('plates.js') + '\n({SITES,PLACES,DYN,CHAPTERS})');
const additions = ['fengguo','zhuozhou','geyuan','dazu','anyue','yuhuang','jinci','qingzhou','hualin','xiaoxitian','xuankong','yongan','yuanjue','hunyuanwenmiao','gugong','taimiao'];
additions.push('jingtusi','shisi','hongfu','yanqing','yanfu','jinhuatianning','taishique','shaoshique','qimuque','songyue','yongle','jiwang','guangren','feiyun','qiufeng','huanghuatan','mimi','gongzhu','yanshan','quanzhouwenmiao','quanzhoukaiyuan','fuzhouwuta','fuzhoubaita');
additions.push('guanyintang','guanque','xianshen','chongsheng','dule','qufukongmiao','wangbao','gaoyique','liyeque','daimiao');
additions.push('xianwall','xianzhonggu','xiangtang','zhaoling','horyuji','toshodaiji','byodoin','todaiji','kiyomizu','toji');
additions.push('zhakoubaita','feiying','songyangyanqing','huqiuta','qixia','haiqing','xuanmiao','duanliang','jijian','xuanyuan','fenghuangsi','linggu','feilaifeng','xinchangdafo','zijinan','baosheng','rulong','baziqiao','longxingchuang','lingyin','luohanshuangta','ruiguang','haichunxuan');
const northernExpansion = JSON.parse(read('assets/research/north200-batch.json'));
additions.push(...northernExpansion.ids, 'sd_pizhi');
test('all 201 catalogue entries have a real PNG, matching dimensions and a map location', () => {
  assert.equal(SITES.length, 201); assert.equal(new Set(SITES.map(s => s.id )).size, 201);
  for (const site of SITES) {
    assert(site.image?.src, `${site.id} has no plate`);
    const bytes = fs.readFileSync(path.join(root, site.image.src));
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
    assert.equal(bytes.readUInt32BE(16), site.image.width); assert.equal(bytes.readUInt32BE(20), site.image.height);
    assert(PLACES.some(p => p.key === site.placeKey && Number.isFinite(p.lat) && Number.isFinite(p.lon)), `${site.id} has no location`);
  }
});
test('early monuments have distinct dynasty colours and dates covered by the expanded chronology', () => {
  assert.notEqual(DYN.han.acc, DYN.bei.acc);
  assert.equal(SITES.find(site => site.id === 'hb_anjibridge').dyn, 'sui');
  assert.equal(SITES.find(site => site.id === 'hn_lingquan').dyn, 'sui');
  assert(CHAPTERS.some(chapter => chapter.key === 'sui'));
  assert.equal(SITES.find(site => site.id === 'sx_zhenguo').timelineLane, 'north');
  assert.equal(SITES.find(site => site.id === 'sx_zhenguo').year, 963);
  for (const [id, dyn] of [['taishique','han'],['shaoshique','han'],['qimuque','han'],['songyue','bei'],['xiangtang','beiqi'],['xinchangdafo','nan']]) {
    const site = SITES.find(s => s.id === id);
    assert.equal(site.dyn, dyn); assert(site.year > 0 && site.year < 600);
    assert(CHAPTERS.some(chapter => chapter.key === dyn));
  }
  const rebuilt = SITES.find(site => site.id === 'guanque');
  assert.equal(rebuilt.dyn, 'modern'); assert.equal(rebuilt.year, 2002);
  assert(CHAPTERS.some(chapter => chapter.key === 'modern'));
  assert.equal(new Set(Object.values(DYN).map(dynasty => dynasty.acc)).size, Object.keys(DYN).length);
  for (const site of SITES) assert(site.year >= 0 && site.year <= 2026);
});
test('all researched additions have source-backed imagegen plates in their original dynasty colour', () => {
  const colours = Object.fromEntries([...read('style.css').matchAll(/(--[\w-]+):\s*(#[\da-f]{6})\s*;/gi)].map(m => [m[1],m[2]]));
  for (const id of additions) {
    const site = SITES.find(s => s.id === id), meta = JSON.parse(read(`assets/research/${id}.json`));
    assert.equal(meta.caption.length, 2); assert(meta.caption.every(s => typeof s === 'string'));
    assert(meta.prompt && meta.generation_tool.includes('image_gen'));
    assert(meta.reference_files.length >= 2);
    for (const file of meta.reference_files) assert(fs.existsSync(path.resolve(root,file)), file);
    assert.equal(site.image.color, colours[DYN[site.dyn].acc.match(/var\(([^)]+)\)/)[1]]);
  }
});

test('Pizhi addition is unvisited, mapped to Shandong and uses recorded white originals', () => {
  const site = SITES.find(s => s.id === 'sd_pizhi');
  assert.equal(site.initialStatus, 'unvisited');
  assert.equal(site.dyn, 'song'); assert.equal(site.yearApprox, true);
  assert.equal(PLACES.find(p => p.key === site.placeKey).prov, '山东');
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  assert.equal(queue.entries.filter(s => s.id === site.id).length, 1);
  assert.equal(queue.count, queue.entries.length);
  for (const folder of ['research', 'color-research']) {
    const meta = JSON.parse(read(`assets/${folder}/sd_pizhi.json`));
    assert.equal(meta.background_preparation.method, 'white-matte-v1');
    assert.equal(meta.status, 'complete');
  }
});

test('Japanese temple subjects use their surviving construction dates and Japanese eras', () => {
  for (const [id, era, year] of [['horyuji','jp_asuka',690], ['toshodaiji','jp_nara',780], ['byodoin','jp_heian',1053], ['todaiji','jp_kamakura',1203], ['kiyomizu','jp_edo',1633], ['toji','jp_edo',1644]]) {
    const site = SITES.find(site => site.id === id);
    assert.equal(site.country, 'JP'); assert.equal(site.dyn, era); assert.equal(site.year, year);
    assert.equal(DYN[era].country, 'JP');
    assert(site.year >= DYN[era].start && site.year <= DYN[era].end);
    assert(CHAPTERS.some(chapter => chapter.key === era));
    const place = PLACES.find(place => place.key === site.placeKey);
    assert.equal(place.country, 'JP'); assert(['奈良县', '京都府'].includes(place.prov));
  }
  assert(SITES.find(site => site.id === 'horyuji').yearApprox);
  assert(SITES.find(site => site.id === 'toshodaiji').yearApprox);
});
