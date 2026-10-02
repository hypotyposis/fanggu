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
const beijingTianjinExpansion = JSON.parse(read('assets/research/beijing-tianjin-batch.json'));
additions.push(...beijingTianjinExpansion.ids);
const northeastExpansion = JSON.parse(read('assets/research/northeast-batch.json'));
additions.push(...northeastExpansion.ids);
const imYunnanGuizhouExpansion = JSON.parse(read('assets/research/im-yn-gz-batch.json'));
additions.push(...imYunnanGuizhouExpansion.ids);
const fujianShandongExpansion = JSON.parse(read('assets/research/fujian-shandong-batch.json'));
additions.push(...fujianShandongExpansion.ids);
const shaanxiExpansion = JSON.parse(read('assets/research/shaanxi-batch.json'));
additions.push(...shaanxiExpansion.ids);
const twoGuangExpansion = JSON.parse(read('assets/research/guangdong-guangxi-batch.json'));
additions.push(...twoGuangExpansion.ids);
const hunanHubeiExpansion = JSON.parse(read('assets/research/hunan-hubei-batch.json'));
additions.push(...hunanHubeiExpansion.ids);
const gansuExpansion = JSON.parse(read('assets/research/gansu-batch.json'));
additions.push(...gansuExpansion.ids);
const shandongExpansion = JSON.parse(read('assets/research/shandong-20260917-batch.json'));
additions.push(...shandongExpansion.ids);
const hebeiExpansion = JSON.parse(read('assets/research/hebei-20260917-batch.json'));
additions.push(...hebeiExpansion.ids);
const shanghaiExpansion = JSON.parse(read('assets/research/shanghai-batch.json'));
additions.push(...shanghaiExpansion.ids);
const anhuiExpansion = JSON.parse(read('assets/research/anhui-batch.json'));
additions.push(...anhuiExpansion.ids);
const henanAdditions = JSON.parse(read('assets/research/henan-additions-2026-09-18.json'));
additions.push(...henanAdditions.ids);
additions.push('nx_xumishan','nx_xixialing','nx_108towers');
const firstBatchStone = JSON.parse(read('assets/research/first-batch-grotto-stone.json'));
const firstBatchNewIds = firstBatchStone.units.filter(unit => unit.added && unit.id !== 'gs_bingling').map(unit => unit.id);
const firstBatchFive = ['sd_xiaotang_shrine', 'fj_qingjing_gate', 'fj_anping_bridge', 'bj_yunju_north', 'xz_jokhang'];
additions.push(...firstBatchFive);
const firstBatchEight = ['qh_taer', 'jx_nanchang_uprising', 'xj_jiaohe', 'xz_potala', 'js_zhuozheng', 'sc_luding', 'bj_guozijian', 'zj_yuefei'];
additions.push(...firstBatchEight);
const japanSix = ['jp_kinkaku', 'jp_ginkaku', 'jp_sensoji', 'jp_himeji', 'jp_itsukushima', 'jp_nikko_toshogu'];
additions.push(...japanSix);
const kansaiTwelve = ['jp_daigoji_tower', 'jp_sanjusangendo', 'jp_nijo_ninomaru', 'jp_yasaka_honden', 'jp_yakushiji_east', 'jp_gangoji_gokuraku', 'jp_kofukuji_hokuen', 'jp_kasuga_honden', 'jp_sumiyoshi_honden', 'jp_osaka_sengan', 'jp_jigenin_tahoto', 'jp_kanshinji_kondo'];
additions.push(...kansaiTwelve);
const kyotoNearbyTen = ['jp_tofukuji_sanmon', 'jp_fushimi_inari_honden', 'jp_kitano_honden', 'jp_ninnaji_kondo', 'jp_hongwanji_hiunkaku', 'jp_manpukuji_daiou', 'jp_iwashimizu_honden', 'jp_ishiyamadera_tahoto', 'jp_ishiyamadera_hondo', 'jp_chionin_sanmon'];
additions.push(...kyotoNearbyTen);
const kyotoThirteen = ['jp_nanzenji_sanmon', 'jp_ujigami_honden', 'jp_ujigami_haiden', 'jp_kozanji_sekisuiin', 'jp_kamigamo_honden', 'jp_shimogamo_honden', 'jp_enryakuji_komponchudo', 'jp_katsura_koshoin', 'jp_joruriji_hondo', 'jp_joruriji_tower', 'jp_ryoanji_garden', 'jp_tenryuji_garden', 'jp_saihoji_garden'];
additions.push(...kyotoThirteen);
const kyotoNine = ['jp_hokanji_tower', 'jp_gosho_shishinden', 'jp_daitokuji_karamon', 'jp_daitokuji_hojo', 'jp_jishoji_togudo', 'jp_toji_kondo', 'jp_daigoji_sanboin', 'jp_hongwanji_goeido', 'jp_chionin_mieido'];
additions.push(...kyotoNine);
const jiangzheTwenty = ['zj_tianyige', 'zj_qinganhui', 'zj_yongan', 'zj_daan', 'zj_dashan', 'zj_chaoyin', 'zj_yuyaotongji', 'zj_guyue', 'zj_library_old', 'zj_shinantang', 'js_mingxiao', 'js_zhongshan', 'js_nanjingwall', 'js_chaotiangong', 'js_liuyuan', 'js_baodai', 'js_zhaoguan', 'js_geyuan', 'js_heyuan', 'js_nanchao_stone'];
additions.push(...jiangzheTwenty);
const fujianNationalTen = ['fj_luoyang', 'fj_tianhou', 'fj_zhangzhou_paifang', 'fj_jiangdong', 'fj_dongshan_guandi', 'fj_eryi', 'fj_hegui', 'fj_hulishan', 'fj_laojun', 'fj_fuzhou_wenmiao'];
additions.push(...fujianNationalTen);
const taiwanThree = ['tw_tainan_confucius', 'tw_lukang_longshan', 'tw_taipei_northgate'];
additions.push(...taiwanThree);
const sichuanChongqingTen = ['sc_leshan', 'sc_baoen', 'sc_wuliang', 'sc_zhanghuan', 'sc_luodai', 'sc_shenque', 'cq_shibao', 'cq_huguang', 'cq_diaoyu', 'cq_tongnan'];
additions.push(...sichuanChongqingTen);
const shanxiNationalTen = ["sx_zishou","sx_ruicheng_chenghuang","sx_qiao","sx_wang","sx_daixian_wenmiao","sx_ciyun","sx_wuyue","sx_pingyao_chenghuang","sx_rishengchang","sx_pujiu"];
additions.push(...shanxiNationalTen);
const hebeiNationalTen = ["hb_bailinta","hb_zdfuwenmiao","hb_lingyan","hb_zhenwu","hb_dzwenmiao","hb_xumifushou","hb_changping","hb_daci","hb_puren","hb_xingwen"];
additions.push(...hebeiNationalTen);
test('all catalogue entries have a real PNG, matching dimensions and a map location', () => {
  assert.equal(firstBatchStone.units.filter(unit => unit.added).length, 19);
  assert.equal(firstBatchNewIds.length, 18); // Bingling was already in the Gansu batch.
  assert.equal(SITES.length, hebeiExpansion.beforeCount + hebeiExpansion.ids.length + 2 + shanghaiExpansion.ids.length + anhuiExpansion.ids.length + henanAdditions.ids.length + 3 + firstBatchNewIds.length + firstBatchFive.length + firstBatchEight.length + japanSix.length + kansaiTwelve.length + kyotoNearbyTen.length + kyotoThirteen.length + kyotoNine.length + jiangzheTwenty.length + fujianNationalTen.length + taiwanThree.length + sichuanChongqingTen.length + shanxiNationalTen.length + hebeiNationalTen.length); assert.equal(new Set(SITES.map(s => s.id )).size, SITES.length);
  for (const site of SITES) {
    assert(site.image?.src, `${site.id} has no plate`);
    const bytes = fs.readFileSync(path.join(root, site.image.src));
    assert.equal(bytes.subarray(1, 4).toString(), 'PNG');
    assert.equal(bytes.readUInt32BE(16), site.image.width); assert.equal(bytes.readUInt32BE(20), site.image.height);
    assert(PLACES.some(p => p.key === site.placeKey && Number.isFinite(p.lat) && Number.isFinite(p.lon)), `${site.id} has no location`);
  }
});
test('first-batch five have distinct subjects, sourced scope and unvisited records', () => {
  const protection = JSON.parse(read('assets/research/national-protection.json'));
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  const expected = [
    ['sd_xiaotang_shrine', 'han', '山东', '石祠本体'],
    ['fj_qingjing_gate', 'song', '福建', '石门楼'],
    ['fj_anping_bridge', 'song', '福建', '桥面'],
    ['bj_yunju_north', 'liao', '北京', '北塔'],
    ['xz_jokhang', 'tubo', '西藏', '正立面'],
  ];
  for (const [id, dynasty, province, subject] of expected) {
    const site = SITES.find(item => item.id === id);
    assert(site && site.dyn === dynasty && site.initialStatus === 'unvisited');
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, province);
    assert(site.yearNote?.length > 15);
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    assert(queue.entries.find(entry => entry.id === id).subject.includes(subject));
    assert.equal(protection.entries[id][0].batch, 1);
    assert.equal(protection.entries[id][0].source, 'batch1');
  }
  assert.equal(SITES.find(site => site.id === 'xz_jokhang').year, 647);
  assert.equal(SITES.find(site => site.id === 'fj_qingjing_gate').types[0], 'mosque');
  assert(CHAPTERS.some(chapter => chapter.key === 'tubo'));
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
test('Taiwan additions retain distinct subjects, sourced originals and unvisited defaults', () => {
  const { createHash } = require('node:crypto');
  const hash = file => createHash('sha256').update(fs.readFileSync(path.join(root, file))).digest('hex');
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  const protection = JSON.parse(read('assets/research/national-protection.json'));
  const expected = [
    ['tw_tainan_confucius', 'modern', 1917, '大成殿'],
    ['tw_lukang_longshan', 'ming', 1831, '五门殿'],
    ['tw_taipei_northgate', 'ming', 1884, '承恩门'],
  ];
  assert.equal(queue.count, queue.entries.length);
  for (const [id, dyn, year, subject] of expected) {
    const site = SITES.find(site => site.id === id);
    assert.equal(site.dyn, dyn);
    assert.equal(site.year, year);
    assert.equal(site.initialStatus, 'unvisited');
    assert.equal(PLACES.find(place => place.key === site.placeKey).prov, '台湾');
    assert.equal(queue.entries.filter(entry => entry.id === id).length, 1);
    assert(queue.entries.find(entry => entry.id === id).subject.includes(subject));
    assert.equal(protection.untagged[id].status, 'not_applicable');
    for (const folder of ['research', 'color-research']) {
      const meta = JSON.parse(read(`assets/${folder}/${id}.json`));
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
      assert.equal(meta.background_preparation.sourceSha256, hash(meta.generated_file || meta.output));
      assert(meta.historical_sources.length && meta.prompt.length > 100);
      assert.equal(folder === 'research' ? meta.visual_review_status : meta.visual_review.status, 'pending_user');
    }
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

test('Beijing and Tianjin additions have paired artwork, real inputs and recorded white-matte hashes', () => {
  const batch = beijingTianjinExpansion;
  assert.equal(batch.ids.length, 10);
  assert.equal(new Set(batch.ids).size, 10);
  assert.equal(batch.groups['北京'].length, 6); assert.equal(batch.groups['天津'].length, 4);
  assert.deepEqual(Object.values(batch.groups).flat().sort(), [...batch.ids].sort());
  const queue = JSON.parse(read('assets/color-research/queue.json'));
  const avif = JSON.parse(read('assets/color-research/avif-manifest.json'));
  const { COLORED_PLATES } = vm.runInNewContext(read('colored-plates.js') + '\n({COLORED_PLATES})');
  assert.equal(queue.count, queue.entries.length);
  assert.equal(queue.count, SITES.length - queue.excluded.length);
  assert.deepEqual(Object.keys(COLORED_PLATES).sort(), Array.from(SITES, site => site.id).sort());
  for (const id of batch.ids) {
    const site = SITES.find(s => s.id === id);
    assert.equal(site.initialStatus, 'unvisited'); assert.equal(site.country, 'CN');
    assert.equal(queue.entries.filter(s => s.id === id).length, 1);
    assert.equal(PLACES.find(p => p.key === site.placeKey).prov, id.startsWith('bj_') ? '北京' : '天津');
    for (const folder of ['research', 'color-research']) {
      const meta = JSON.parse(read(`assets/${folder}/${id}.json`));
      assert.equal(meta.id, id); assert.equal(meta.status, 'complete');
      assert.equal(meta.background_preparation.method, 'white-matte-v1');
      const original = fs.readFileSync(path.resolve(root, meta.output || meta.generated_file));
      const hash = require('node:crypto').createHash('sha256').update(original).digest('hex');
      assert.equal(meta.background_preparation.sourceSha256, hash);
      for (const file of meta.input_images || meta.reference_files) assert(fs.existsSync(path.resolve(root, file)), file);
    }
    const delivery = avif.images[id];
    assert(['pending_user', 'approved_user'].includes(delivery.visualReview));
    if (delivery.visualReview === 'approved_user') {
      assert.equal(delivery.review?.inputSha256, delivery.inputSha256);
      assert.equal(delivery.review?.avifSha256, delivery.sha256);
    }
    assert(delivery.alpha.transparentPixels > 0); assert(delivery.alpha.opaquePixels > 0);
    assert.equal(delivery.extraction.interiorRgbUnchanged, true);
    assert(COLORED_PLATES[id].src.endsWith(`${id}.avif`));
  }
  const laterIds = new Set([batch, northeastExpansion, imYunnanGuizhouExpansion, fujianShandongExpansion, shaanxiExpansion, twoGuangExpansion, hunanHubeiExpansion, gansuExpansion, shandongExpansion, hebeiExpansion, shanghaiExpansion, anhuiExpansion, henanAdditions].flatMap(expansion => expansion.ids));
  for (const id of ['sd_pizhi', 'sx_doudafu', 'sx_jiulongbi', 'nx_xumishan', 'nx_xixialing', 'nx_108towers', ...firstBatchNewIds, ...firstBatchFive, ...firstBatchEight, ...japanSix, ...kansaiTwelve, ...kyotoNearbyTen, ...kyotoThirteen, ...kyotoNine, ...jiangzheTwenty, ...fujianNationalTen, ...taiwanThree, ...sichuanChongqingTen, ...shanxiNationalTen, ...hebeiNationalTen]) laterIds.add(id);
  const previouslyApproved = Object.entries(avif.images).filter(([id]) => !laterIds.has(id));
  assert.equal(previouslyApproved.length, 200);
  assert(previouslyApproved.every(([, item]) => item.visualReview === 'approved_user'));
  assert(SITES.find(s => s.id === 'bj_changling').yearApprox);
  assert(SITES.find(s => s.id === 'tj_wenmiao').sub.includes('中部'));
  assert(SITES.find(s => s.id === 'tj_guangdonghuiguan').sub.includes('局部'));
});

test('Japanese subjects use the depicted construction or reconstruction dates and Japanese eras', () => {
  for (const [id, era, year] of [['horyuji','jp_asuka',690], ['toshodaiji','jp_nara',780], ['byodoin','jp_heian',1053], ['todaiji','jp_kamakura',1203], ['kiyomizu','jp_edo',1633], ['toji','jp_edo',1644], ['jp_kinkaku','jp_showa',1955], ['jp_ginkaku','jp_muromachi',1489], ['jp_sensoji','jp_showa',1958], ['jp_himeji','jp_edo',1609], ['jp_itsukushima','jp_kamakura',1241], ['jp_nikko_toshogu','jp_edo',1636]]) {
    const site = SITES.find(site => site.id === id);
    assert.equal(site.country, 'JP'); assert.equal(site.dyn, era); assert.equal(site.year, year);
    assert.equal(DYN[era].country, 'JP');
    assert(site.year >= DYN[era].start && site.year <= DYN[era].end);
    assert(CHAPTERS.some(chapter => chapter.key === era));
    const place = PLACES.find(place => place.key === site.placeKey);
    assert.equal(place.country, 'JP'); assert(['奈良县', '京都府', '东京都', '兵库县', '广岛县', '栃木县'].includes(place.prov));
  }
  assert(SITES.find(site => site.id === 'horyuji').yearApprox);
  assert(SITES.find(site => site.id === 'toshodaiji').yearApprox);
  assert(SITES.find(site => site.id === 'jp_kinkaku').yearNote.includes('1950'));
  assert(SITES.find(site => site.id === 'jp_sensoji').yearNote.includes('1958'));
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
