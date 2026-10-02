const { assertUnvisited } = require('./helpers/native-catalog.cjs');
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const facets = require('../catalog.js');
const { SITES, PLACES } = vm.runInNewContext(fs.readFileSync(require.resolve('../sites.js'), 'utf8') + '\n({SITES, PLACES})');
const catalog = facets.classify(SITES, PLACES);
const find = filters => Array.from(catalog.filter(site => facets.matches(site, filters)), site => site.id).sort();
const kansaiTwelve = ['jp_daigoji_tower', 'jp_sanjusangendo', 'jp_nijo_ninomaru', 'jp_yasaka_honden', 'jp_yakushiji_east', 'jp_gangoji_gokuraku', 'jp_kofukuji_hokuen', 'jp_kasuga_honden', 'jp_sumiyoshi_honden', 'jp_osaka_sengan', 'jp_jigenin_tahoto', 'jp_kanshinji_kondo'];
const kyotoNearbyTen = ['jp_tofukuji_sanmon', 'jp_fushimi_inari_honden', 'jp_kitano_honden', 'jp_ninnaji_kondo', 'jp_hongwanji_hiunkaku', 'jp_manpukuji_daiou', 'jp_iwashimizu_honden', 'jp_ishiyamadera_tahoto', 'jp_ishiyamadera_hondo', 'jp_chionin_sanmon'];
const kyotoThirteen = ['jp_nanzenji_sanmon', 'jp_ujigami_honden', 'jp_ujigami_haiden', 'jp_kozanji_sekisuiin', 'jp_kamigamo_honden', 'jp_shimogamo_honden', 'jp_enryakuji_komponchudo', 'jp_katsura_koshoin', 'jp_joruriji_hondo', 'jp_joruriji_tower', 'jp_ryoanji_garden', 'jp_tenryuji_garden', 'jp_saihoji_garden'];
const kyotoNine = ['jp_hokanji_tower', 'jp_gosho_shishinden', 'jp_daitokuji_karamon', 'jp_daitokuji_hojo', 'jp_jishoji_togudo', 'jp_toji_kondo', 'jp_daigoji_sanboin', 'jp_hongwanji_goeido', 'jp_chionin_mieido'];

test('Taiwan additions filter by province and search by simplified or traditional names', () => {
  const ids = ['tw_lukang_longshan', 'tw_tainan_confucius', 'tw_taipei_northgate'];
  assert.deepEqual(find({ province: '台湾' }), ids);
  assert.deepEqual(find({ country: 'CN', region: 'east', province: '台湾' }), ids);
  assert.deepEqual(find({ query: '鹿港龍山寺五門殿' }), ['tw_lukang_longshan']);
  assert.deepEqual(find({ query: '承恩門' }), ['tw_taipei_northgate']);
  assert.deepEqual(find({ query: '臺南孔子廟大成殿' }), ['tw_tainan_confucius']);
  assert.deepEqual(find({ province: '台湾', type: 'gate' }), ['tw_taipei_northgate']);
  for (const id of ids) assert.equal((catalog.find(site => site.id === id).initialStatus || 'unvisited'), 'unvisited');
});

test('Shanghai filtering and native unvisited defaults stay aligned', () => {
  const batch = JSON.parse(fs.readFileSync(require.resolve('../assets/research/shanghai-batch.json'), 'utf8'));
  assert.deepEqual(find({ country: 'CN', region: 'east', province: '上海' }), [...batch.ids].sort());
  assert.deepEqual(find({ province: '上海', type: 'pagoda' }), ['sh_fangta', 'sh_longhuata']);
  assert.deepEqual(find({ province: '上海', query: '兴圣教寺' }), ['sh_fangta']);
  assert.deepEqual(find({ province: '上海', dynasty: 'yuan', type: 'hall' }), ['sh_zhenru']);
  assertUnvisited(batch.ids);
});

test('every site has a province, region and explicit architectural types', () => {
  assert.equal(catalog.length, SITES.length);
  assert.equal(new Set(catalog.map(site => site.province)).size, 54);
  assert.deepEqual(find({ province: '西藏', dynasty: 'tubo' }), ['xz_jokhang']);
  assert.deepEqual(find({ province: '新疆', type: 'grotto' }), ['xj_kizil', 'xj_kumtura']);
  assert.deepEqual(find({ type: 'column' }), ['hn_xizhou']);
  for (const site of catalog) {
    assert(facets.regions[site.region].provinces.includes(site.province));
    assert.equal(new Set(site.types).size, site.types.length);
    assert(site.types.every(type => facets.types[type]));
  }
  assert.throws(() => facets.classify([{ id: 'missing', placeKey: 'xian' }], PLACES), /缺少/);
});

test('status, dynasty, region, province and type combine by intersection', () => {
  assert.deepEqual(find({ status: 'wishlist', dynasty: 'beiqi', region: 'north', province: '河北', type: 'grotto' }), ['xiangtang']);
  assert.deepEqual(find({ status: 'visited', dynasty: 'tang', province: '山西', type: 'hall' }), ['foguang', 'nanchan']);
  assert.deepEqual(find({ region: 'east', province: '河北' }), []);
  assert.deepEqual(find({ province: '福建', type: 'que' }), []);
});

test('compound monuments appear under each type without duplicate cards', () => {
  assert(find({ type: 'pagoda' }).includes('kaiyuan'));
  assert(find({ type: 'pavilion' }).includes('kaiyuan'));
  assert(find({ type: 'hall' }).includes('yuanqi'));
  assert(find({ type: 'pagoda' }).includes('yuanqi'));
  assert(find({ type: 'stage' }).includes('xianshen'));
  assert(find({ type: 'pavilion' }).includes('xianshen'));
  for (const id of ['baosheng', 'guanyintang', 'xiaoxitian', 'zijinan', 'sx_zezhou_yuhuang', 'hb_cangzhoulion']) assert(find({ type: 'sculpture' }).includes(id));
  assert.equal(find({}).length, new Set(find({})).size);
});

test('province options follow region and only show catalogued provinces', () => {
  assert.deepEqual(facets.provinces(catalog, 'north'), ['北京', '天津', '河北', '山西', '内蒙古']);
  assert.deepEqual(facets.provinces(catalog, 'south'), ['广东', '广西']);
  assert.deepEqual(facets.provinces(catalog, 'central'), ['河南', '湖北', '湖南']);
  assert.deepEqual(facets.provinces(catalog, 'northwest'), ['陕西', '甘肃', '青海', '宁夏', '新疆']);
  assert(facets.provinces(catalog, 'east').includes('福建'));
  assert(!facets.provinces(catalog, 'east').includes('山西'));
  assert.equal(facets.provinces(catalog).length, new Set(catalog.map(site => site.province)).size);
});

test('aliases and geographic or type names remain searchable with facets', () => {
  assert.deepEqual(find({ province: '河南', type: 'que', query: '后母阙' }), ['qimuque']);
  assert(find({ query: '华北', type: 'grotto' }).includes('xiangtang'));
  assert.deepEqual(find({ province: '福建', query: '昭灵宫' }), ['zhaoling']);
  for (const id of ['baosheng', 'guanyintang', 'xiaoxitian', 'zijinan']) assert(find({ query: '  彩塑悬塑  ' }).includes(id));
  assert(find({ status: 'unvisited', type: 'grotto' }).includes('xiangtang'));
});

test('Japanese country, prefecture and era facets stay separate from Chinese regions and dynasties', () => {
  const ids = ['byodoin', 'horyuji', 'jp_ginkaku', 'jp_himeji', 'jp_itsukushima', 'jp_kinkaku', 'jp_nikko_toshogu', 'jp_sensoji', 'kiyomizu', 'todaiji', 'toji', 'toshodaiji', ...kansaiTwelve, ...kyotoNearbyTen, ...kyotoThirteen, ...kyotoNine].sort();
  assert.deepEqual(find({ country: 'JP' }), ids);
  assert.deepEqual(find({ query: '日本' }), ids);
  assert.deepEqual(find({ country: 'JP', dynasty: 'jp_edo' }), ['jp_chionin_mieido', 'jp_chionin_sanmon', 'jp_daitokuji_hojo', 'jp_enryakuji_komponchudo', 'jp_gosho_shishinden', 'jp_himeji', 'jp_hongwanji_goeido', 'jp_iwashimizu_honden', 'jp_kamigamo_honden', 'jp_kasuga_honden', 'jp_katsura_koshoin', 'jp_kitano_honden', 'jp_manpukuji_daiou', 'jp_nanzenji_sanmon', 'jp_nijo_ninomaru', 'jp_nikko_toshogu', 'jp_osaka_sengan', 'jp_shimogamo_honden', 'jp_sumiyoshi_honden', 'jp_yasaka_honden', 'kiyomizu', 'toji']);
  assert.deepEqual(find({ country: 'JP', province: '奈良县', type: 'hall' }), ['horyuji', 'jp_gangoji_gokuraku', 'jp_kofukuji_hokuen', 'toshodaiji']);
  assert.deepEqual(find({ country: 'JP', type: 'gate' }), ['jp_chionin_sanmon', 'jp_daitokuji_karamon', 'jp_iwashimizu_honden', 'jp_nanzenji_sanmon', 'jp_nikko_toshogu', 'jp_tofukuji_sanmon', 'todaiji']);
  assert.deepEqual(find({ country: 'JP', type: 'garden' }), ['jp_ryoanji_garden', 'jp_saihoji_garden', 'jp_tenryuji_garden']);
  assert.deepEqual(find({ country: 'JP', region: 'jp_kanto', dynasty: 'jp_showa' }), ['jp_sensoji']);
  assert.deepEqual(find({ country: 'JP', region: 'jp_chugoku', type: 'shrine' }), ['jp_itsukushima']);
  assert.deepEqual(find({ country: 'JP', type: 'castle' }), ['jp_himeji', 'jp_osaka_sengan']);
  assert.deepEqual(find({ country: 'JP', region: 'jp_kinki', province: '大阪府' }), ['jp_jigenin_tahoto', 'jp_kanshinji_kondo', 'jp_osaka_sengan', 'jp_sumiyoshi_honden']);
  assert.deepEqual(find({ country: 'JP', query: 'Kinkaku-ji' }), ['jp_kinkaku']);
  assert.deepEqual(find({ country: 'CN', dynasty: 'jp_edo' }), []);
  assert.deepEqual(find({ country: 'JP', region: 'north' }), []);
  assert.deepEqual(facets.provinces(catalog, 'all', 'JP'), ['东京都', '栃木县', '京都府', '滋贺县', '奈良县', '大阪府', '兵库县', '广岛县']);
  assert.equal(facets.provinces(catalog, 'all', 'CN').length, 31);
});

test('Jiangsu and Zhejiang additions cover bridges, stone pillars and early regional periods', () => {
  assert.equal(find({ province: '浙江' }).length, 28);
  assert.equal(find({ province: '江苏' }).length, 26);
  assert.deepEqual(find({ type: 'bridge', province: '浙江', status: 'wishlist' }), ['baziqiao', 'rulong']);
  assert.deepEqual(find({ type: 'pillar', province: '浙江' }), ['lingyin', 'longxingchuang']);
  assert(find({ type: 'pagoda' }).includes('lingyin'));
  assert.deepEqual(find({ dynasty: 'nan' }).sort(), ['xinchangdafo', 'yn_cuanyan', 'js_nanchao_stone'].sort());
  assert.deepEqual(find({ dynasty: 'jin' }), ['yn_cuanbaozi']);
  assert.deepEqual(find({ dynasty: 'qiuci' }), ['xj_kizil', 'xj_kumtura']);
  assert.deepEqual(find({ dynasty: 'nanzhao' }), ['yn_shizhong']);
  assert.deepEqual(find({ dynasty: 'dali' }), ['yn_duanshi']);
});

test('82 northern additions remain unvisited in the native catalogue', () => {
  const batch = JSON.parse(fs.readFileSync(require.resolve('../assets/research/north200-batch.json'), 'utf8'));
  assert.equal(batch.ids.length, 82);
  for (const [province, added] of [['河南', 27], ['河北', 25], ['山西', 30]]) {
    assert.equal(batch.groups[province].length, added);
    const matches = find({ province });
    for (const id of batch.groups[province]) assert(matches.includes(id), `${id} lost its ${province} classification`);
  }
  assert(find({ type: 'tomb' }).includes('sx_macun'));
  assert(find({ type: 'residence' }).includes('sx_dingcun'));
  assert(find({ type: 'mural' }).includes('sx_jishan_qinglong'));
  assert.deepEqual(find({ type: 'observatory' }), ['hn_guanxing']);
  assertUnvisited(batch.ids);
});

test('Shanxi screens are distinct from fortifications and additions remain unvisited', () => {
  assert.equal(find({ province: '山西' }).length, 82);
  assert.deepEqual(find({ province: '山西', type: 'screen' }), ['sx_jiulongbi']);
  assert(!find({ type: 'wall' }).includes('sx_jiulongbi'));
  assert.deepEqual(find({ province: '山西', type: 'screen', query: '影壁' }), ['sx_jiulongbi']);
  assert.deepEqual(find({ province: '山西', query: '烈石神祠' }), ['sx_doudafu']);
  assert.deepEqual(find({ province: '山西', query: '代王府九龙壁' }), ['sx_jiulongbi']);
  assertUnvisited(['sx_doudafu', 'sx_jiulongbi']);
});

test('Beijing and Tianjin expansion is searchable and exports unvisited defaults', () => {
  const batch = JSON.parse(fs.readFileSync(require.resolve('../assets/research/beijing-tianjin-batch.json'), 'utf8'));
  assert.equal(find({ province: '北京' }).length, 12);
  assert.deepEqual(find({ province: '北京', query: '云居寺北塔' }), ['bj_yunju_north']);
  assert.equal(find({ province: '天津' }).length, 5);
  assert.deepEqual(find({ province: '北京', type: 'bridge', query: '盧溝橋' }), ['bj_lugou']);
  assert.deepEqual(find({ province: '天津', type: 'stage', query: '戏剧博物馆' }), ['tj_guangdonghuiguan']);
  assert.deepEqual(find({ province: '天津', type: 'residence', query: '尊美堂' }), ['tj_shijia']);
  for (const id of batch.ids) {
    assert(find({ country: 'CN', region: 'north', status: 'unvisited' }).includes(id));
  }
  assertUnvisited(batch.ids);
});

test('Anhui additions support region, province, type and alias filters without seeding visits', () => {
  const ids = ['ah_huaxilou', 'ah_xuguo', 'ah_zhenfeng'];
  assert.deepEqual(find({ country: 'CN', region: 'east', province: '安徽' }), ids);
  assert(facets.provinces(catalog, 'east', 'CN').includes('安徽'));
  assert.deepEqual(find({ province: '安徽', type: 'gate', query: '八脚牌楼' }), ['ah_xuguo']);
  assert.deepEqual(find({ province: '安徽', type: 'pagoda' }), ['ah_zhenfeng']);
  assert.deepEqual(find({ province: '安徽', type: 'stage' }), ['ah_huaxilou']);
  assert.deepEqual(find({ province: '安徽', status: 'visited' }), []);
  for (const id of ids) assert.equal((catalog.find(site => site.id === id).initialStatus || 'unvisited'), 'unvisited');
  assertUnvisited(ids);
});

test('Henan continuation joins filters with native unvisited defaults', () => {
  const { ids } = JSON.parse(fs.readFileSync(require.resolve('../assets/research/henan-additions-2026-09-18.json'), 'utf8'));
  for (const id of ids) assert(find({ province: '河南', country: 'CN', status: 'unvisited' }).includes(id));
  assert(find({ province: '河南', type: 'pagoda', dynasty: 'tang' }).includes('hn_fawang'));
  assert(find({ province: '河南', type: 'tomb', dynasty: 'song' }).includes('hn_songling'));
  assert(find({ province: '河南', type: 'sculpture' }).includes('hn_songling'));
  assertUnvisited(ids);
});
