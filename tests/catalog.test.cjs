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
additions.push(...northernExpansion.ids, 'sd_pizhi', 'sx_doudafu', 'sx_jiulongbi');
const anhuiExpansion = JSON.parse(read('assets/research/anhui-batch.json'));
additions.push(...anhuiExpansion.ids);
const shanghaiExpansion = JSON.parse(read('assets/research/shanghai-batch.json'));
additions.push(...shanghaiExpansion.ids);
const henanAdditions = JSON.parse(read('assets/research/henan-additions-2026-09-18.json'));
additions.push(...henanAdditions.ids);
test('all 214 catalogue entries have a real PNG, matching dimensions and a map location', () => {
  assert.equal(SITES.length, 214); assert.equal(new Set(SITES.map(s => s.id )).size, SITES.length);
  for (const site of SITES) {
    assert(site.image?.src, `${site.id} has no plate`);
    const bytes = fs.readFileSync(path.join(root, site.image.src));
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
    assert.equal(bytes.readUInt32BE(16), site.image.width); assert.equal(bytes.readUInt32BE(20), site.image.height);
    assert(PLACES.some(p => p.key === site.placeKey && Number.isFinite(p.lat) && Number.isFinite(p.lon)), `${site.id} has no location`);
  }
});

test('Shanghai additions cover every delivered plate with recorded, source-bound white originals', () => {
  const { createHash } = require('node:crypto');
  const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  assert.equal(shanghaiExpansion.count, shanghaiExpansion.ids.length);
  assert.equal(queue.count, queue.entries.length);
  assert.deepEqual(Object.keys(COLORED_PLATES).sort(), Array.from(SITES, site => site.id).sort());
  for (const id of shanghaiExpansion.ids) {
    const site = SITES.find(site => site.id === id);
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, '上海');
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const meta = JSON.parse(read(`assets/${folder}/${id}.json`));
      assert.equal(meta.status, 'complete');
      assert(meta.historical_sources.length > 0);
      const bytes = fs.readFileSync(path.join(root, meta.generated_file || meta.output));
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
      assert.equal(meta.background_preparation.sourceSha256, createHash('sha256').update(bytes).digest('hex'));
    }
  }
  assert.equal(SITES.find(site => site.id === 'sh_tangchuang').year, 859);
  assert.equal(SITES.find(site => site.id === 'sh_longhuata').year, 977);
  assert.equal(SITES.find(site => site.id === 'sh_fangta').yearApprox, true);
  assert.equal(SITES.find(site => site.id === 'sh_zhenru').year, 1320);
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

test('Shanxi additions have hash-bound white originals and complete transparent deliveries', () => {
  const { createHash } = require('node:crypto');
  const hash = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  const delivery = JSON.parse(read('assets/color-research/avif-manifest.json'));
  const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
  assert.equal(queue.count, queue.entries.length);
  assert.equal(new Set([...queue.entries.map(entry => entry.id), ...queue.excluded]).size, SITES.length);
  assert.deepEqual(Object.keys(COLORED_PLATES).sort(), Array.from(SITES, site => site.id).sort());
  for (const [id, dynasty, year] of [['sx_doudafu', 'yuan', 1343], ['sx_jiulongbi', 'ming', 1392]]) {
    const site = SITES.find(site => site.id === id);
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(site.dyn, dynasty); assert.equal(site.year, year);
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, '山西');
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const meta = JSON.parse(read(`assets/${folder}/${id}.json`));
      assert.equal(meta.status, 'complete');
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
      assert.equal(meta.background_preparation.sourceSha256, hash(meta.generated_file || meta.output));
      for (const file of meta.input_images) assert(fs.existsSync(path.join(root, file)), file);
    }
    const item = delivery.images[id];
    assert(['pending_user', 'approved_user'].includes(item.visualReview));
    assert.equal(item.alpha.min, 0); assert.equal(item.alpha.max, 255);
    assert(item.alpha.transparentPixels > 0 && item.alpha.opaquePixels > 0);
    assert.equal(item.sourceSha256, hash(item.source));
    assert.equal(item.inputSha256, hash(item.input)); assert.equal(item.sha256, hash(item.src));
    assert.equal(COLORED_PLATES[id].visualReview, item.visualReview);
    if (item.visualReview === 'approved_user') {
      assert.equal(item.review.reviewer, 'user');
      assert.equal(item.review.avifSha256, item.sha256);
      assert.equal(item.review.inputSha256, item.inputSha256);
    } else {
      assert.equal(item.review, undefined);
    }
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

test('Anhui subjects have dated research and complete queued line/color deliveries', () => {
  assert.equal(anhuiExpansion.ids.length, 3);
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  assert.equal(queue.count, queue.entries.length);
  for (const id of anhuiExpansion.ids) {
    const site = SITES.find(site => site.id === id);
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, '安徽');
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    for (const folder of ['research', 'color-research']) {
      const meta = JSON.parse(read(`assets/${folder}/${id}.json`));
      assert.equal(meta.status, 'complete');
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
    }
    const research = JSON.parse(read(`assets/research/${id}.json`));
    assert(research.historical_sources.length > 0);
    assert(research.historical_sources.every(source => /^https:\/\//.test(source.url)));
  }
  assert.equal(SITES.find(site => site.id === 'ah_xuguo').year, 1584);
  assert.equal(SITES.find(site => site.id === 'ah_huaxilou').year, 1676);
  assert.equal(SITES.find(site => site.id === 'ah_huaxilou').types[0], 'stage');
  assert.equal(SITES.find(site => site.id === 'ah_zhenfeng').yearApprox, true);
});

test('Henan additions preserve subject dates, registration and source-bound white originals', () => {
  const { createHash } = require('node:crypto');
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
  assert.equal(SITES.filter(s => PLACES.find(p => p.key === s.placeKey)?.prov === '河南').length, 38);
  assert.equal(queue.count, queue.entries.length);
  assert.deepEqual(Object.keys(COLORED_PLATES).sort(), Array.from(SITES, s => s.id).sort());
  for (const id of henanAdditions.ids) {
    const site = SITES.find(s => s.id === id);
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(site.country, 'CN');
    assert.equal(PLACES.find(p => p.key === site.placeKey).prov, '河南');
    assert.equal(queue.entries.filter(s => s.id === id).length, 1);
    assert.equal(COLORED_PLATES[id].visualReview, 'pending_user');
    for (const folder of ['research', 'color-research']) {
      const meta = JSON.parse(read(`assets/${folder}/${id}.json`));
      const original = fs.readFileSync(path.join(root, folder === 'research' ? meta.generated_file : meta.output));
      assert.equal(meta.status, 'complete');
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
      assert.equal(meta.background_preparation.sourceSha256, createHash('sha256').update(original).digest('hex'));
      assert(meta.generation_history.every(attempt => attempt.prompt && attempt.original_file));
    }
  }
  const miaole = SITES.find(s => s.id === 'hn_miaole');
  assert.equal(miaole.dyn, 'zhou'); assert.equal(miaole.year, 955); assert.equal(miaole.timelineLane, 'north');
  const fawang = SITES.find(s => s.id === 'hn_fawang');
  assert.equal(fawang.dyn, 'tang'); assert.equal(fawang.yearApprox, true); assert.equal(fawang.yearLabel, '唐代');
  assert.match(fawang.yearNote, /不代表确切建塔年/);
  const songling = SITES.find(s => s.id === 'hn_songling');
  assert.equal(songling.year, 1063); assert(songling.types.includes('tomb') && songling.types.includes('sculpture'));
  assert.match(songling.sub, /永昭陵.*文官石像/);
  const bixia = SITES.find(s => s.id === 'hn_bixia');
  assert.equal(bixia.year, 1542); assert.equal(bixia.yearLabel, '1542起');
  assert.match(bixia.yearNote, /始建.*重修/);
});
