/* sites.js — heritage sites, their chapters, places and drawing parameters. */
const DYN = {
  ko_silla: { glyph: '新罗', name: '朝鲜半岛 · 统一新罗', acc: 'var(--ko-silla)', start: 668, end: 935, timelineLane: 'korea' },
  ko_goryeo: { glyph: '高丽', name: '朝鲜半岛 · 高丽', acc: 'var(--ko-goryeo)', start: 918, end: 1392, timelineLane: 'korea' },
  ko_joseon: { glyph: '朝鲜王朝', name: '朝鲜半岛 · 朝鲜王朝', acc: 'var(--ko-joseon)', start: 1392, end: 1910, timelineLane: 'korea' },
  han: { glyph: '汉', name: '汉', acc: 'var(--ochre)' },
  jin: { glyph: '东晋', name: '东晋', acc: 'var(--jin)', start: 317, end: 420 },
  goguryeo: { glyph: '高句丽', name: '高句丽', acc: 'var(--goguryeo)' },
  bei: { glyph: '北魏', name: '北魏', acc: 'var(--plum)' },
  qiuci: { glyph: '龟兹', name: '龟兹', acc: 'var(--qiuci)', start: 300, end: 900 },
  xiyu: { glyph: '西域', name: '西域古城', acc: 'var(--xiyu)', start: -200, end: 1400 },
  tubo: { glyph: '吐蕃', name: '吐蕃', acc: 'var(--tubo)', start: 633, end: 842 },
  nan: { glyph: '南朝', name: '南朝', acc: 'var(--clay)' },
  beiqi: { glyph: '北齐', name: '北齐', acc: 'var(--rose)' },
  sui: { glyph: '隋', name: '隋', acc: 'var(--celadon)' },
  tang: { glyph: '唐', name: '唐', acc: 'var(--gold)' },
  nanzhao: { glyph: '南诏', name: '南诏', acc: 'var(--nanzhao)', start: 738, end: 902 },
  balhae: { glyph: '渤海', name: '渤海', acc: 'var(--balhae)' },
  zhou: { glyph: '五代', name: '五代 · 十国', acc: 'var(--ash)' },
  song: { glyph: '宋', name: '宋', acc: 'var(--verdigris)' },
  dali: { glyph: '大理', name: '大理', acc: 'var(--dali)', start: 937, end: 1253 },
  liao: { glyph: '辽', name: '辽 · 金', acc: 'var(--cinnabar)' },
  xixia: {"glyph":"夏","name":"西夏","acc":"var(--sand)","start":1038,"end":1227},
  yuan: { glyph: '元', name: '元', acc: 'var(--amber)' },
  ming: { glyph: '明', name: '明 · 清', acc: 'var(--lapis)' },
  modern: { glyph: '今', name: '近现代', acc: 'var(--silver)' },
  jp_asuka: { glyph: '飞鸟', name: '日本 · 飞鸟', acc: 'var(--jp-asuka)', country: 'JP', start: 538, end: 710 },
  jp_nara: { glyph: '奈良', name: '日本 · 奈良', acc: 'var(--jp-nara)', country: 'JP', start: 710, end: 794 },
  jp_heian: { glyph: '平安', name: '日本 · 平安', acc: 'var(--jp-heian)', country: 'JP', start: 794, end: 1185 },
  jp_kamakura: { glyph: '镰仓', name: '日本 · 镰仓', acc: 'var(--jp-kamakura)', country: 'JP', start: 1185, end: 1333 },
  jp_muromachi: { glyph: '室町', name: '日本 · 室町', acc: 'var(--jp-muromachi)', country: 'JP', start: 1336, end: 1573 },
  jp_momoyama: { glyph: '桃山', name: '日本 · 桃山', acc: 'var(--jp-momoyama)', country: 'JP', start: 1573, end: 1615 },
  jp_edo: { glyph: '江户', name: '日本 · 江户', acc: 'var(--jp-edo)', country: 'JP', start: 1603, end: 1867 },
  jp_showa: { glyph: '昭和', name: '日本 · 昭和', acc: 'var(--jp-showa)', country: 'JP', start: 1926, end: 1989 },
  kh_angkor: { glyph: '吴哥', name: '柬埔寨 · 吴哥', acc: 'var(--kh-angkor)', country: 'KH', start: 900, end: 1300 },
  id_java_classical: { glyph: '古爪哇', name: '印度尼西亚 · 古典爪哇', acc: 'var(--id-java)', country: 'ID', start: 750, end: 1000 },
  th_sukhothai: { glyph: '素可泰', name: '泰国 · 素可泰', acc: 'var(--th-sukhothai)', country: 'TH', start: 1200, end: 1500 },
  th_ayutthaya: { glyph: '大城', name: '泰国 · 阿瑜陀耶', acc: 'var(--th-ayutthaya)', country: 'TH', start: 1350, end: 1767 },
  mm_bagan: { glyph: '蒲甘', name: '缅甸 · 蒲甘', acc: 'var(--mm-bagan)', country: 'MM', start: 1000, end: 1300 },
  la_lan_xang: { glyph: '澜沧', name: '老挝 · 澜沧', acc: 'var(--la-lan-xang)', country: 'LA', start: 1350, end: 1700 },
  vn_champa: { glyph: '占婆', name: '越南 · 占婆', acc: 'var(--vn-champa)', country: 'VN', start: 1200, end: 1400 },
  vn_nguyen: { glyph: '阮朝', name: '越南 · 阮朝', acc: 'var(--vn-nguyen)', country: 'VN', start: 1802, end: 1945 },
  ph_spanish: { glyph: '西殖', name: '菲律宾 · 西班牙殖民时期', acc: 'var(--ph-spanish)', country: 'PH', start: 1565, end: 1898 },
};

const SITES = [
  {
    initialStatus: 'visited', id: 'kaiyuan', types: ["pagoda", "pavilion"], name: '正定开元寺', short: '开元寺', sub: '须弥塔 · 钟楼', dyn: 'tang', tag: '唐', era: '贞观十年始建', year: 636, place: '河北正定 · 古城', placeKey: 'zhengding',
    lede: '塔和钟楼在大殿前左右对峙，殿居其后——唐代寺院从以塔为中心转向以殿为中心的过渡格局，全国只剩这一处实例。西侧须弥塔贞观十年（636）始建，九级密檐方塔素面无饰，比大雁塔还早十几年；东侧钟楼下层仍是唐构，是中国现存唯一的唐代钟楼，1933年梁思成在这里认出了它。',
    facts: ['<b>形制</b>：须弥塔方形九级密檐，砖砌素面，高42.5米；钟楼两层，平面方形、面阔进深各三间，重檐歇山，高14米，下层砖墙、上层木构，楼上仍悬唐代铜钟。', '<b>沿革</b>：寺始建于东魏兴和二年（540），唐开元二十六年（738）改今名；寺存唐大历十二年《解慧寺三门楼赞并序》记当时有三门楼、雁塔与法船正殿，钟楼为晚唐增建。', '<b>断代</b>：梁思成1933年考察后认为钟楼下层为唐代遗构，《中国建筑史》称其外檐“下层似为金元样式，上层则清代所修”；寺内其余殿阁多已不存，仅余法船殿遗址。'],
    caption: ['立面示意 · 塔楼对峙', '方形密檐 · 重檐歇山'],
    draw: () => Buildings.kaiyuan({
      tower: { sides: 4, base: [{ w: 190, h: 14 }], storeys: [
        { w: 140, wallH: 118, door: 'arch', doorW: 30, doorH: 70, eave: 'brick', outStep: 6, outL: 4, inL: 2, courseH: 6 },
        ...[136, 130, 124, 118, 113, 108, 103, 98].map((w, i) => ({ w, wallH: 12 - i * 0.4, door: 'none', eave: 'brick', outStep: 5, outL: 3, inL: 2, courseH: 4, noteEave: i === 3 ? '密檐 · 叠涩' : undefined }))],
        top: { type: 'cap', w: 70, courses: 2, step: 10, stupa: { bulbW: 24, bulbH: 26, rings: 3, ringW: 14, ringH: 5 } } },
      tower2: { k: .5, bays: 3, bw: 34, colH: 30, fills: ['wall', 'door', 'wall'], fills2: ['win', 'door', 'win'], bracketS: .6, overhang: 26, skirtH: 16, inset: 8, colH2: 20, roofH: 32, gableH: 12, chiwen: 10, platH: 8, platPad: 12 },
      dimLabel: '须弥塔 · 方形九级', vLabel: '通高 42.5 m', dimLabel2: '钟楼 · 高 14 m' }),
  },
  {
    initialStatus: 'visited', id: 'longmenshiku', types: ["grotto"], name: '龙门石窟', short: '龙门', sub: '奉先寺 · 卢舍那大佛', dyn: 'tang', tag: '唐', era: '奉先寺上元二年成', year: 675, place: '河南洛阳 · 伊阙', placeKey: 'luoyang',
    lede: '北魏太和十七年（493）迁都洛阳后开凿，一直凿到唐。奉先寺大龛咸亨三年（672）开工、上元二年（675）完成，武则天捐了两万贯脂粉钱。十七米的卢舍那坐在正中，弟子、菩萨、天王、力士九尊一字排开——石窟里最像一座殿堂的一龛。',
    facts: ['<b>卢舍那</b>通高 17.14 米，头高 4 米，耳长 1.9 米；结跏趺坐于莲座，圆形头光刻莲瓣与火焰纹。', '龛宽约 36 米，九尊像左右对称：迦叶、阿难侍立，文殊、普贤高 13.25 米，天王踏鬼，力士 9.75 米。', '龙门两山现存窟龛二千三百余、造像十万余尊；北魏古阳洞（493）、宾阳中洞在先，唐代万佛洞（680）在后；2000 年列入世界遗产。'],
    caption: ['奉先寺立面示意 · 九尊剪影', '卢舍那头像线稿'],
    image: { src: 'assets/longmen-vairocana.png', alt: '卢舍那大佛线稿 · 正面', width: 1024, height: 1536, tint: false, caption: ['卢舍那大佛线稿 · 正面 · 绘图 AI', '奉先寺 · 上元二年'] },
    tall: true,
    draw: () => Buildings.grotto({ buddhaH: 300, figures: [
      { kind: 'warrior', m: 9.75, dx: -18.6, name: '力士' }, { kind: 'king', m: 10.5, dx: -15.2, name: '天王' }, { kind: 'bodhisattva', m: 13.25, dx: -11.2, name: '普贤' }, { kind: 'disciple', m: 10.6, dx: -7.2, name: '迦叶' },
      { kind: 'disciple', m: 10.6, dx: 7.2, name: '阿难' }, { kind: 'bodhisattva', m: 13.25, dx: 11.2, name: '文殊' }, { kind: 'king', m: 10.5, dx: 15.2, name: '天王' }, { kind: 'warrior', m: 9.75, dx: 18.6, name: '力士' }],
      dimLabel: '奉先寺大龛 · 宽约 36 m', vLabel: '卢舍那 通高 17.14 m' }),
  },
  {
    initialStatus: 'visited', id: 'xian', types: ["pagoda"], name: '西安大雁塔', short: '大雁塔', sub: '大慈恩寺 · 七层楼阁式砖塔', dyn: 'tang', tag: '唐', era: '永徽三年始建 · 武周长安年间改建', year: 704, yearLabel: '701–704', yearNote: '652年初创；以武周长安年间七层改建形制定年，后世包砌与修缮另述。', place: '陕西西安 · 大慈恩寺', placeKey: 'xian',
    lede: '大雁塔的七层砖身并非一次营建便形成：玄奘保存取回经卷的塔在唐永徽三年初建，武周长安年间又经改建，外层还留下明代包砌的痕迹。大慈恩寺中，逐层收分的方塔以券门和砖砌柱额组织墙面，把木楼的形式转成了砖石，眼前轮廓因此兼有唐代形制与后世修护。',
    facts: ['方形七层楼阁式砖塔逐级减小，各层墙面以砖隐出柱与阑额，券门通向塔内。厚实墙体和浅挑砖檐形成节奏，可从外观辨认它模仿木楼的构思。', '永徽三年初建塔以保存玄奘带回的佛经，武周长安年间重修为七层形制。地方志又记现存外层为明代包砌，因此初创、改建和今日表面须分别理解。', '大慈恩寺既与玄奘译经有关，塔又服务于经卷保存，建筑与知识传播在此相连。与荐福寺小雁塔比较，可看到楼阁式与密檐式砖塔不同的层间比例。'],
    caption: ['立面示意 · 大雁塔楼阁式砖塔', '七层 · 通高约64.5 m'],
    draw: () => Buildings.tierTower({ sides: 4, base: [{ w: 230, h: 12 }], storeys: Array.from({ length: 7 }, (_, i) => ({ w: 196 * Math.pow(.9, i), wallH: 46 - i * 3.5, pil: i ? 5 : 9, lintel: true, door: 'arch', doorW: 12, doorH: 16, eave: 'brick', outStep: 5, outL: 4, inL: 3, courseH: 3.2, noteEave: i === 2 ? '叠涩檐 · 砖砌' : undefined, noteWall: i === 4 ? '砖柱 · 阑额' : undefined })), top: { type: 'pyramid', h: 34, w: 60, stupa: { bulbW: 18, bulbH: 16, rings: 2, ringW: 10, ringH: 5 } } }),
  },
  {
    initialStatus: 'unvisited', id: 'xian_small', types: ["pagoda"], name: '西安小雁塔', short: '小雁塔', sub: '荐福寺 · 十三级密檐式砖塔', dyn: 'tang', tag: '唐', era: '唐中宗景龙年间', year: 707, yearLabel: '707–710', yearNote: '唐景龙年间创建；以707年为排序起点，现绘明代地震后留下的十三级残顶形态。', place: '陕西西安 · 荐福寺', placeKey: 'xian', legacyNames: ['荐福寺塔'],
    lede: '小雁塔原名荐福寺塔，建于唐中宗景龙年间（707–710）。方形砖塔以密集叠涩砖檐向上收束，原有十五级，明代地震毁去顶部两级；如今保留十三级与残缺塔顶。',
    facts: ['方形密檐式砖塔，现存十三级，残高约43.4米，底层边长约11.38米；底层高大，上部檐层紧密。', '塔身多次经历地震，顶部十四、十五级已经毁失。图版按现存残顶绘制，不复原消失的塔层或补画塔刹。', '所绘主体为荐福寺小雁塔本体，不包含西安博物院展馆或寺院其他建筑；与大慈恩寺大雁塔分别记录到访。'],
    caption: ['立面示意 · 小雁塔密檐式砖塔', '现存十三级 · 残高约43.4 m'],
    draw: () => Buildings.tierTower({ sides: 4, base: [{ w: 170, h: 12 }], storeys: [{ w: 150, wallH: 70, door: 'arch', doorW: 18, doorH: 30, eave: 'brick', outStep: 5, outL: 4, inL: 3, courseH: 2.6 }, ...Array.from({ length: 12 }, (_, i) => ({ w: 150 * (1 - .0035 * (i + 1) * (i + 1)) * .98, wallH: 3, door: (i % 2) ? 'none' : 'arch', doorW: 8, doorH: 5, eave: 'brick', outStep: 5, outL: 4, inL: 3, courseH: 2.3 }))], top: { type: 'cap', w: 50, courses: 2, step: 6, stupa: null, note: '塔顶震毁' } }),
  },
  {
    initialStatus: 'visited', id: 'xiuding', types: ["pagoda"], name: '修定寺塔', short: '修定寺', sub: '唐塔 · 清凉山', dyn: 'tang', tag: '唐', era: '北齐始建 · 唐重修', year: 700, yearLabel: '唐', place: '河南安阳 · 清凉山', placeKey: 'anyang',
    lede: '一座单层方形砖塔，通体嵌满 3775 块模制花砖：菱形、矩形、三角形拼成一张浮雕的网。考古学家称它"真正的中国第一华塔"。',
    facts: ['北齐天保元年（550）初建，唐代重修；现存塔身花砖皆唐代烧制，故称唐塔。', '<b>通高 20 米</b>，塔身高 9.3 米、宽 8.3 米，近于一个立方体；上覆叠涩出檐与四注攒尖顶，顶立覆钵式塔刹。', '花砖上有力士、飞天、青龙、白虎、僧侣与缠枝纹，七十余种图样，拼缝严丝合缝。'],
    caption: ['立面示意 · 单层方塔', '模制花砖 · 叠涩檐'],
    tall: true,
    draw: () => Buildings.cubeStupa({ baseW: 300, bodyW: 320, bodyH: 340, cellW: 26, cellH: 32, doorW: 60, doorH: 120, eaveStep: 11, eaveL: 6, roofL: 11, roofStep: 17, dimLabel: '塔身宽 8.3 m', vLabel: '通高 20 m' }),
  },
  {
    initialStatus: 'visited', id: 'nanchan', types: ["hall"], name: '南禅寺大殿', short: '南禅寺', dyn: 'tang', tag: '唐', era: '建中三年', year: 782, place: '山西五台 · 李家庄', placeKey: 'wutai',
    lede: '中国现存最早的木构建筑。殿内西平梁下墨书“大唐建中三年（782）……重修殿”，比佛光寺东大殿早七十五年。它只是一座村民合资的三间小殿，因为偏僻才躲过会昌灭法；屋顶举折是现存古建里最平缓的，十二根檐柱直接托起斗拱，殿内一根柱子也没有。',
    facts: ['<b>形制</b>：面阔、进深各三间，平面近方形，约11.6米×9.9米；单檐歇山，十二根檐柱直接承斗拱，柱头五铺作双杪偷心造，无补间铺作；殿内无柱、无天花，四椽栿通檐，墙体只作隔断不承重。', '<b>年代</b>：西平梁下墨书题记记建中三年（782）重修，20世纪50年代初文物普查时辨出；1974—1975年由祁英涛、柴泽俊主持修复，拆除后世改动。西面三根方柱形制更古，被推测为创建时遗物。', '<b>价值</b>：现存有纪年依据的唐代木构，仅此殿与芮城广仁王庙正殿、五台佛光寺东大殿三座。殿内唐塑原十七尊，1999年三尊被盗，现存十四尊，是莫高窟之外内地最早的一堂佛殿彩塑。'],
    caption: ['立面示意 · 面阔三间', '单檐歇山'],
    draw: () => Buildings.hall({ bays: 3, bw: 118, colH: 84, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.9, tiers: 2, interm: 0, overhang: 96, roofH: 150, ridgeRatio: .48, gableH: 54, platH: 18, platPad: 40, lift: 16, chiwen: 40, chiStyle: 'tang', puzuo: '五铺作 · 无补间', dimLabel: '面阔 11.62 m' }),
  },
  {
    initialStatus: 'visited', id: 'foguang', types: ["hall"], name: '佛光寺东大殿', short: '佛光寺', dyn: 'tang', tag: '唐', era: '大中十一年', year: 857, place: '山西五台 · 豆村', placeKey: 'wutai',
    lede: '1937年6月，梁思成、林徽因一行在殿内梁下读出“佛殿主上都送供女弟子宁公遇”，与殿前大中十一年（857）经幢上的同一个名字对上——中国学者第一次亲手找到一座唐代木构。七间大殿立在十余米高的台上，斗拱高近柱高之半，出檐深远；殿内三十余尊唐塑与唐代壁画、题记同在一殿，梁思成称之为“四绝”。',
    facts: ['<b>形制</b>：面阔七间34米、进深四间八架椽17.66米，单檐庑殿；柱头七铺作双杪双下昂，补间五铺作双杪，斗拱高约为柱高之半；平面为内外两圈柱等高的“金厢斗底槽”殿堂构架，脊槫下只用叉手不设侏儒柱。', '<b>年代</b>：北侧明栿下墨书题记与殿前大中十一年（857）经幢同记“女弟子宁公遇”，为断代依据；会昌五年（845）灭法寺毁，宣宗复法后重建。1937年6月中国营造学社梁思成一行实测，莫宗江回忆此前学界以为中国已无唐构。', '<b>价值</b>：现存规模最大的唐代木构，也是最早的庑殿顶实例；佛坛上33尊唐塑、栱眼壁唐代“弥陀说法图”与唐人墨书题记与建筑同存，梁思成在《中国建筑史》中并称“四绝”。2009年随五台山列入世界遗产。'],
    quote: '"这是我们这些年的搜寻中所遇到的唯一唐代木建筑……国内古建筑之第一瑰宝。" <b>——梁思成《记五台山佛光寺的建筑》</b>',
    caption: ['立面示意 · 面阔七间', '单檐庑殿'],
    draw: () => Buildings.hall({ bays: 7, bw: 80, colH: 96, fills: ['win', 'door', 'door', 'door', 'door', 'door', 'win'], roof: 'hip', bracketS: 2.2, tiers: 3, interm: 1, intermS: .5, intermTiers: 2, intermLudou: false, ang: 2, overhang: 96, roofH: 150, ridgeRatio: .62, ridgeOrn: true, platH: 20, platPad: 48, lift: 12, chiwen: 36, chiStyle: 'tang', puzuo: '七铺作 · 双杪双下昂 · 补间出双杪', dimLabel: '面阔 34.0 m' }),
  },
  {
    initialStatus: 'visited', id: 'gongchen', types: ["pagoda"], name: '临安功臣塔', short: '功臣塔', sub: '功臣山', dyn: 'zhou', tag: '五代', era: '后梁贞明元年', year: 915, place: '浙江临安 · 功臣山', placeKey: 'linan',
    lede: '后梁贞明元年（915），吴越王钱镠把自己发迹的功臣山上的功臣堂舍为寺，同时在山上起塔。塔是方形五层的砖砌筒体，通高25.3米，轮廓平缓，继承唐塔遗制；塔檐与平座下留着一排排空洞，是当年木构出跳构件烂掉后的痕迹——它很可能是砖塔从叠涩出檐走向砖木混合、外挂木檐与平座的最早一例。塔下功臣山南麓的钱坞垄，是钱镠出生的地方。',
    facts: ['<b>形制</b>：平面方形，五层，砖砌筒形楼阁式，通高25.3米，底层高5米；每层每面隐出倚柱、平柱与槏柱，槏柱间辟长方形门洞，门洞顶部叠涩成穹窿，一、二层八角形，三至五层方形；檐与平座均以平砖叠涩，出檐很浅；塔顶覆钵、宝瓶安于刹杵木上。', '<b>纪年</b>：功臣山原名大官山，唐昭宗以钱镠有大功诏改今名；梁贞明元年（915）钱镠舍功臣堂建功臣寺，同时建塔。1963年浙江省公布为省级重点文物保护单位，1982年9月省、县拨款重修，1984年5月竣工。', '<b>价值</b>：腰檐与平座铺作的扶壁拱为砖制，出跳构件原为木刻，今毁而留残洞，按残迹推断檐下为五铺作、平座为四铺作；若复原成立，它便是由叠涩砖檐过渡到砖木混合结构、使用木构塔檐与平座的现存最早实例。'],
    caption: ['立面示意 · 方形五层', '砖仿木 · 五代'],
    tall: true,
    draw: () => Buildings.tierTower({ w: 560, h: 800, sides: 4, base: [{ w: 240, h: 16 }, { w: 200, h: 10, stairs: false }],
      storeys: Array.from({ length: 5 }, (_, i) => ({ w: 176 * Math.pow(.93, i), wallH: 84 - i * 4, pil: 3, lintel: true, door: 'arch', doorW: 20, doorH: 30 - i * 2, bs: .6, tiers: 2, eave: 'brick', outStep: 5, outL: 3, inL: 2, courseH: 5, noteBs: i === 1 ? '砖砌斗拱 · 仿木' : undefined, noteWall: i === 3 ? '倚柱 · 阑额 · 壶门' : undefined })),
      top: { type: 'cap', w: 110, courses: 3, step: 12, stupa: { bulbW: 24, bulbH: 22, rings: 4, ringW: 14, ringH: 5 }, note: '铁刹' }, dimLabel: '方形 · 五层', vLabel: '通高 25.3 m' }),
  },
  {
    initialStatus: 'visited', id: 'longmen', types: ["hall"], name: '龙门寺西配殿', short: '龙门寺', dyn: 'zhou', tag: '五代', era: '后唐同光三年', year: 925, place: '山西平顺 · 浊漳河谷 · 源头村', placeKey: 'pingshun',
    lede: '全国现存五代木构不过六七座，三座挤在浊漳河谷，龙门寺西配殿是其中最早的一座。后汉乾祐三年（950）的经幢记寺院“自乙酉岁方营”，乙酉即后唐同光三年（925）。三间悬山小殿，殿内无柱，四椽栿直接伸出柱头做成斗口跳，阑额不出头、不用普拍枋——唐人的做法在一座村寺的配殿里留了下来。',
    facts: ['<b>形制</b>：面阔三间、进深四椽，单檐悬山；殿内不设内柱，四椽栿通檐，两端交于栌斗并伸出为华栱，形成斗口跳，不设补间；柱头卷杀和缓，不施普拍枋，阑额不出头。平梁上以驼峰立侏儒柱再置栌斗，为已知最早实例。', '<b>年代</b>：寺内后唐长兴元年（930）造像碑已有“龙门院”之名，后汉乾祐三年（950）《佛顶尊胜陀罗尼经》幢记营建始于乙酉岁（925），西配殿据此定年；明嘉靖二十二年（1543）曾更换石柱，有题记可考。', '<b>价值</b>：一寺之内五代、宋、金、元、明、清六朝木构同存：大雄宝殿北宋绍圣五年（1098），天王殿金，燃灯佛殿元，东配殿明弘治年间重修，被称为“古建筑博物馆”；与天台庵、大云院同为浊漳河谷的五代遗构。'],
    caption: ['西配殿立面示意 · 面阔三间', '单檐悬山 · 五代'],
    draw: () => Buildings.hall({ bays: 3, bw: 100, colH: 84, fills: ['win', 'door', 'win'], roof: 'gable', bracketS: 1.4, tiers: 1, interm: 0, overhang: 52, roofH: 92, ridgeRatio: 1, chiwen: 16, ridgeOrn: true, lift: 4, platH: 14, platPad: 26, depth: 150, puzuo: '斗口跳 · 无补间', dimLabel: '面阔三间 · 进深四椽' }),
  },
  {
    initialStatus: 'visited', id: 'tiantai', types: ["hall"], name: '天台庵', short: '天台庵', sub: '王曲村', dyn: 'zhou', tag: '五代', era: '后唐长兴四年', year: 933, place: '山西平顺 · 浊漳河谷 · 王曲村', placeKey: 'pingshun',
    lede: '一座三间的小殿，几十年里被当作“四座唐构”之一，直到2014年落架大修时在脊槫与飞子上发现墨书：“大唐天成四年建创立”“长兴四年九月二日……”——天成四年（929）、长兴四年（933）都是后唐年号，自称“大唐”的后唐人把殿盖得仍是唐人的样子。它是浊漳河谷三座五代木构里最小、也最“唐”的一座。',
    facts: ['<b>形制</b>：面阔三间、进深四椽，东西约7.15米、南北约7.12米，近方形；单檐歇山，十二根檐柱，柱头栌斗出华栱一跳即以替木承橑檐槫，不设补间，是最简的斗口跳；四椽栿上立蜀柱承平梁。殿顶琉璃脊饰为金代改换。', '<b>年代</b>：2014年11月落架大修时，帅银川在脊槫与替木间发现“长兴四年（933）九月二日”题记，又在飞子上见“大唐天成四年（929）建创立，大金壬午年重修……大清康熙九年重修”墨书，贺大龙据此定为后唐创建；王春波认为仍不排除唐建五代修。', '<b>价值</b>：殿前唐碑字迹漫灭，2024年以微痕成像辨出八百余字，尚待公布；殿角原有一对小石狮近年被盗。它与龙门寺西配殿、大云院弥陀殿同为浊漳河谷的五代遗构，形制上最接近南禅寺与广仁王庙。'],
    caption: ['立面示意 · 面阔三间', '单檐歇山 · 五代'],
    draw: () => Buildings.hall({ bays: 3, bw: 100, colH: 80, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.3, tiers: 1, interm: 0, overhang: 92, roofH: 122, ridgeRatio: .36, gableH: 42, lift: 22, chiwen: 24, ridgeOrn: true, platH: 24, platPad: 40, puzuo: '斗口跳 · 出檐深远', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'dayun', types: ["hall"], name: '大云院弥陀殿', short: '大云院', dyn: 'zhou', tag: '五代', era: '后晋天福五年', year: 940, place: '山西平顺 · 浊漳河谷 · 实会村', placeKey: 'pingshun',
    lede: '后晋天福五年（940）建的弥陀殿，殿内东壁和扇面墙上还留着五代壁画——现存寺观壁画里，五代的只此一处，维摩与文殊对坐论法的场面近三十平方米。殿只有三间，却是现存最早在阑额上加普拍枋的木构；每间一朵补间铺作，也比唐构多出一层秩序。',
    facts: ['<b>形制</b>：面阔三间、进深六椽，单檐歇山；十八根檐柱有卷杀与侧脚，柱头与补间铺作均为五铺作双杪偷心造，每间补间一朵；栌斗下加普拍枋，是现存木构中最早的实例。殿内减柱，仅用两根金柱。', '<b>年代</b>：寺由幽州僧奉景创建于后晋天福三年（938），初名仙岩院；天福五年（940）始建佛殿与方丈室，后周显德元年（954）建七宝塔，北宋太平兴国八年（983）改称大云禅院。2015年国家投资修缮屋面与地面渗水。', '<b>价值</b>：殿内东壁《维摩诘经变》与扇面墙背面壁画约28.8平方米，拱眼壁与梁架彩画另有11平方米，是中国仅存的五代寺观壁画；抗战时日军剥取西壁、北壁壁画失败，村民以泥皮覆盖东壁才得以保存，1962年勘察时重见。'],
    caption: ['弥陀殿立面示意 · 面阔三间', '单檐歇山 · 五代'],
    draw: () => Buildings.hall({ bays: 3, bw: 110, colH: 90, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.7, tiers: 2, interm: 1, intermS: .7, overhang: 80, roofH: 130, ridgeRatio: .42, gableH: 40, lift: 14, chiwen: 26, platH: 26, platPad: 44, puzuo: '五铺作 · 双杪 · 补间一朵', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'wenfeng', types: ["pagoda"], name: '文峰塔', sub: '原名天宁寺塔', dyn: 'zhou', tag: '周', era: '广顺二年', year: 952, place: '河南安阳 · 老城', placeKey: 'anyang',
    lede: '一座上大下小的塔。从第一层到第五层，每层都比下一层略宽，五层相差约一米，整体像一把撑开的伞——在中国古塔里几乎是孤例。塔建于五代后周广顺二年（952），八角五层，砖身木檐，高38.65米；五层之上又顶着一座覆钵式小塔，塔上有塔。原名天宁寺塔，清乾隆年间彰德知府黄邦宁题“文峰耸秀”，才改叫文峰塔。',
    facts: ['<b>形制</b>：八角五层密檐式砖木塔，通高38.65米，塔基周长40米，立在七层莲瓣的圆形莲座上，第一层与第五层宽度相差约1米。首层八面砖雕佛传故事，八根圆倚柱各雕双龙，一面真门、三面假门。塔刹是清代砌筑的覆钵式喇嘛塔。', '<b>纪年</b>：天宁寺建于隋仁寿年间，塔建于后周广顺二年（952），宋、元、明、清均有修葺。清乾隆三十七年（1772）彰德知府黄邦宁主持扩建天宁寺，在塔门题“文峰耸秀”，塔由此得名；最近一次修缮在2015年。', '<b>价值</b>：塔基与第一层重近3000吨，二至五层连塔刹约2500吨，下重上轻，这座“倒立”的塔经受了1966年邢台地震而无损。梁思成《中国建筑史》称其“形制特殊点颇多”；赵朴初登塔有“层伞高擎窄堵波”之句。'],
    caption: ['立面示意 · 五层八角', '上大下小 · 砖构'],
    tall: true,
    draw: () => Buildings.brickPagoda({ storeys: 5, w0: 214, grow: .06, firstH: 188, wallH: 30, bs: .62, over: 30, band: 28, bulb: 92, cone: 60, dimLabel: '顶檐 : 底檐 ≈ 1.2 : 1', vLabel: '通高 38.65 m' }),
  },
  {
    initialStatus: 'visited', id: 'chongming', types: ["hall"], name: '高平崇明寺', short: '崇明寺', sub: '中佛殿 · 圣佛山', dyn: 'song', tag: '宋', era: '开宝四年', year: 971, place: '山西高平 · 河西镇 · 郭家庄村', placeKey: 'gaoping',
    lede: '圣佛山东麓的中佛殿，北宋开宝四年（971）建成，离《营造法式》刊行还有一百三十年，做法却仍是唐人的：柱头七铺作双杪双下昂与佛光寺东大殿如出一辙，斗拱几乎与柱子等高，无普拍枋、阑额不出头。殿内没有一根内柱，抬头看，承重的主梁竟由两根短木对接而成，缝下用顺栿串托住——“断梁”，小材大用的孤例。',
    facts: ['<b>形制</b>：面阔三间、进深六椽，单檐歇山，举折平缓、出檐深远；柱头七铺作双杪双下昂，斗拱高与柱高之比接近1:1，柱头卷杀圆缓，无普拍枋，阑额不出头；殿内无内柱，屋顶荷载经斗拱层传至檐柱，梁架用材反而纤细。', '<b>年代</b>：寺内宋淳化二年（991）《创修敕赐圣佛山崇明寺记》碑载寺创于开宝年间，太平兴国年间开山僧行颙入京，得宋太宗敕赐寺名；中佛殿定为开宝四年（971）所建，明万历十九年（1591）、清道光六年（1826）大修。寺原名狼谷寺。', '<b>价值</b>：双栿系统中的承重主梁由两根同径同长的短材对接而成，正中缝下以顺栿串承托，两端架在前后檐柱斗拱后尾上，谓之“断梁”，为现存古建中的孤例；其斗拱是《营造法式》颁行前同类做法的九处实例之一，被称为“宋构唐制”。'],
    caption: ['中佛殿线稿 · 面阔三间', '七铺作 · 单檐歇山 · 北宋'],
    draw: () => Buildings.hall({ bays: 3, bw: 108, colH: 88, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 2, tiers: 3, ang: 2, interm: 0, overhang: 94, roofH: 110, ridgeRatio: .5, gableH: 34, lift: 10, chiwen: 24, platH: 22, platPad: 40, puzuo: '七铺作 · 双杪双下昂', dimLabel: '面阔三间 · 进深六椽' }),
  },
  {
    initialStatus: 'visited', id: 'longxing', types: ["hall", "pavilion"], name: '隆兴寺', sub: '摩尼殿 · 大悲阁 · 转轮藏', dyn: 'song', tag: '宋', era: '开宝四年', year: 971, place: '河北正定 · 古城', placeKey: 'zhengding',
    lede: '宋太祖开宝四年（971）敕令扩建龙藏寺，铸起七丈三尺的铜观音——隆兴寺由此成为北宋官式建筑保存最完整的一处。摩尼殿皇祐四年（1052）建，十字形平面四面出抱厦，歇山山面朝前，梁思成说这是“宋画里所常见，而在遗建中尚未曾得到者”；大悲阁里21.3米的千手观音和转轮藏殿里直径七米的宋代转轮藏，一个是现存最大的古代铜铸观音，一个是现存最早的转轮藏。',
    facts: ['<b>摩尼殿</b>：面阔、进深各七间，殿身近方形，四面正中各出歇山抱厦、山面朝前，组成十字形平面；重檐歇山顶，厚墙环绕，仅抱厦正面开门窗，形制与传世宋画中的建筑相近。', '<b>年代</b>：寺始建于隋开皇六年（586），初名龙藏寺，寺存同年所立龙藏寺碑；开宝四年（971）奉敕扩建并铸观音像，摩尼殿建于皇祐四年（1052），康熙四十九年（1710）赐额“隆兴寺”。', '<b>宋代之最</b>：大悲阁千手观音铜像通高21.3米、四十二臂，为现存最大的古代铜铸观音；转轮藏直径约7米，以五跳八铺作斗拱承托，是现存年代最早的转轮藏。大悲阁现构重建于1940年前后。'],
    caption: ['摩尼殿立面示意 · 面阔七间', '重檐歇山 · 抱厦四出'],
    draw: () => Buildings.crossHall({ bays: 7, bw: 74, colH: 84, fills: ['wall', 'win', 'door', 'door', 'door', 'win', 'wall'], fills2: ['wall', 'win', 'win', 'win', 'wall'], bracketS: 1.5, ang: 1, overhang: 62, skirtH: 56, colH2: 36, roofH: 142, gableH: 56, porchColH: 72, porchOver: 30, gableW: 132, porchRise: 44, gableRise: 56, chiwen: 30, platH: 22, platPad: 40, dimLabel: '面阔 35.0 m' }),
  },
  {
    initialStatus: 'visited', id: 'yuanqi', types: ["hall", "pagoda"], name: '潞城原起寺', short: '原起寺', sub: '大雄宝殿 · 青龙塔', dyn: 'song', tag: '宋', era: '唐天宝六年创建 · 现存宋构', year: 1000, yearLabel: '宋', place: '山西潞城 · 浊漳河畔 · 辛安村', placeKey: 'pingshun',
    lede: '寺坐在浊漳河西岸凤凰山的山顶上，南北不过二十二米、东西三十三米，唐天宝六年（747）创建。现存的大雄宝殿与青龙宝塔都是宋代遗物：三间四椽的小殿单檐歇山，斗拱简朴；殿西一座八角七级的砖塔高约十七米，层层出檐下砖雕仿木斗拱，塔顶宝瓶式刹用八条铁索牵在八个铁人上。一殿一塔并立崖顶，从河谷仰望，塔影先入眼。',
    facts: ['<b>形制</b>：大雄宝殿面阔三间、进深四椽，单檐歇山，形制朴拙、斗拱简洁；青龙宝塔位于殿西侧，八角七层砖塔，高约17米，层层出檐，檐下砖雕仿木斗拱，顶立宝瓶式塔刹，八角各有铁人牵铁索加固。', '<b>年代</b>：寺始建于唐天宝六年（747）；大雄宝殿与青龙宝塔为宋代建筑，塔一说建于北宋元祐二年（1087）；享亭、配殿等为明清所建。文物部门将寺的整体年代定为宋。', '<b>价值</b>：寺址南北仅22.3米、东西32.7米，占地729平方米，在孤峰顶上以一殿一塔并列构成完整格局，塔不在中轴线上而偏于殿西；与下游不远的大云院、天台庵同处浊漳河谷，是这条河谷古建序列中宋代的一环。'],
    caption: ['立面示意 · 殿塔并立', '单檐歇山 · 八角七级'],
    draw: () => Buildings.towerAndHall({ towerX: 220, hallX: 560,
      tower: { sides: 8, base: [{ w: 130, h: 10 }], storeys: Array.from({ length: 7 }, (_, i) => ({ w: 114 * Math.pow(.93, i), wallH: 33 - i * 1.5, door: 'arch', doorW: 10, doorH: 14 - i, win: 'none', eave: 'brick', outStep: 4, outL: 3, inL: 1, courseH: 4 })), top: { type: 'cap', w: 50, courses: 2, step: 8, stupa: { bulbW: 18, bulbH: 16, rings: 3, ringW: 10, ringH: 4 } } },
      hall: { bays: 3, bw: 72, colH: 60, fills: ['wall', 'door', 'wall'], roof: 'gablehip', bracketS: 1.1, tiers: 2, interm: 1, intermS: .8, overhang: 56, roofH: 92, ridgeRatio: .42, gableH: 30, lift: 14, chiwen: 18, platH: 14, platPad: 28 },
      towerNote: '青龙塔 · 宋', hallNote: '大雄宝殿 · 宋', dimLabel: '八角七级', vLabel: '青龙塔', dimLabel2: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'baoguo', types: ["hall"], name: '宁波保国寺', short: '保国寺', sub: '大殿 · 灵山', dyn: 'song', tag: '宋', era: '大中祥符六年', year: 1013, place: '浙江宁波 · 江北 · 灵山', placeKey: 'ningbo',
    lede: '北宋大中祥符六年（1013）的大殿，长江以南现存最早的木构建筑。原是三间单檐歇山，清代四周加了一圈副阶，才成了今天看到的五间重檐——中间那三间，仍是一千年前的宋构。',
    facts: ['平面进深大于面阔，殿内前槽三个<b>藻井</b>遮住梁架，民间因此叫它"无梁殿"。', '<b>瓜棱柱</b>用四段小料拼合成一根大柱，是中国现存最早的拼合柱实例；斗拱七铺作，双杪双下昂。', '"鸟不栖，虫不蛀，蜘蛛不结网，梁上不落尘"——传说归功于木料，实则是殿内穿堂风。', '寺内不供佛像，今为古建筑博物馆。'],
    caption: ['大殿立面示意 · 面阔五间', '重檐歇山 · 副阶清增'],
    draw: () => Buildings.crossHall({ porch: false, bays: 5, bw: 92, colH: 84, fills: ['open', 'open', 'door', 'open', 'open'], fills2: ['wall', 'win', 'wall'], bracketS: 1.4, ang: 2, overhang: 66, skirtH: 52, colH2: 40, roofH: 132, gableH: 46, chiwen: 26, platH: 22, platPad: 44, dimLabel: '面阔五间 · 宋构三间在中' }),
  },
  {
    initialStatus: 'visited', id: 'lingxiao', types: ["pagoda"], name: '天宁寺凌霄塔', short: '凌霄塔', sub: '正定 · 塔心柱', dyn: 'song', tag: '宋', era: '唐始建 · 宋庆历五年重修', year: 1045, place: '河北正定 · 古城', placeKey: 'zhengding',
    lede: '下面四层是宋代的砖，上面五层是金代的木——两个朝代叠在一座塔上，而且每次重修都没有推倒重来。第四层中心竖起一根由九条圆木捆成、直通塔顶的塔心柱，罗哲文称这种结构是现存古建筑中的孤例。地宫石函铭文记塔始建于唐代宗朝，北宋庆历五年（1045）在唐塔残址上重修，金皇统元年（1141）再建上部；1966年邢台地震震坏了七层以上，1981年起重修。',
    facts: ['<b>形制</b>：八角九层楼阁式，高约41米，一至四层砖砌，五层以上木构；第四层中心立塔心柱，由九条圆木捆束而成直抵塔顶，塔心柱式是唐以前建塔的主要样式，现存仅此一例。', '<b>年代</b>：1982年塔基下发现地宫，石函刻“唐代宗朝建塔”，始建年因此定在唐至德元年至大历十四年间（756—779）；北宋庆历五年（1045）重修，金皇统元年（1141）重建上部，原名慧光塔。', '<b>修缮</b>：北宋怀丙和尚换掉朽坏的塔心柱，“偷梁换柱”的故事由此附会于它；1966年邢台地震致七层以上严重损毁，1981年起河北省文物部门全面勘察后重修。'],
    caption: ['立面示意 · 八角九层', '下四层砖 · 上五层砖木'],
    tall: true,
    draw: () => Buildings.tierTower({ w: 560, h: 860, base: [{ w: 300, h: 16 }],
      storeys: [
        { w: 236, wallH: 136, door: 'arch', doorW: 26, doorH: 56, win: 'none', bs: .6, dense: true, eave: 'tile', over: 30, band: 22, lift: 9, rafter: 5, noteWall: '砖砌 · 宋' },
        ...[224, 212, 200].map((w, i) => ({ w, wallH: 26, door: 'win', doorW: 12, doorH: 16, win: 'none', bs: .6, dense: true, eave: 'tile', over: 30 - i * 2, band: 21, lift: 9, rafter: 5, noteBs: i === 1 ? '仿木砖斗拱' : undefined })),
        ...[186, 170, 154, 138, 122].map((w, i) => ({ w, wallH: 19, door: 'win', doorW: 12, doorH: 13, win: 'none', bs: .7, tiers: 2, eave: 'tile', over: 34 - i * 2, band: 19, lift: 11, rafter: 5, noteWallR: i === 1 ? '金 · 塔心柱自此而上' : undefined, noteEave: i === 3 ? '木檐 · 斗拱' : undefined }))],
      top: { type: 'pyramid', h: 46, w: 50, stupa: { bulbW: 22, bulbH: 20, rings: 3, ringW: 12 }, note: '塔刹' }, dimLabel: '八角 · 九层', vLabel: '通高 41 m' }),
  },
  {
    initialStatus: 'visited', id: 'fotou', types: ["hall"], name: '平顺佛头寺', short: '佛头寺', sub: '车当村', dyn: 'song', tag: '宋', era: '北宋', year: 1050, yearLabel: '北宋', place: '山西平顺 · 浊漳河南岸 · 车当村', placeKey: 'pingshun',
    lede: '浊漳河南岸车当村的坡上，一座小寺只剩下一座殿，面积一百三十一平方米。三间四椽的歇山殿，柱头与补间都用五铺作双下昂，殿内三椽栿对后劄牵、蜀柱托平梁，国务院公布的名单把它定为宋。殿内四壁是二十四诸天壁画，与木构不是同一个年代——一座殿里叠着两个时代的手笔。',
    facts: ['<b>形制</b>：大殿坐北面南，面阔三间、进深四椽，建筑面积131平方米，单檐歇山，殿顶琉璃脊饰；柱头与补间铺作均为五铺作双下昂；梁架为三椽栿对后劄牵用三柱，平梁以蜀柱承托。', '<b>年代</b>：寺因后山形似佛头得名，创建年代无考；现存大殿由国务院2006年公布的名单定为宋，殿内壁画有元代之说，另有地方报刊称其为“金构明画”，木构与壁画的年代均存分歧，本条按官方名单作北宋。', '<b>价值</b>：殿内四壁绘二十四诸天护法，是浊漳河谷少见的元代（一说明代）壁画；它与淳化寺、九天圣母庙等同属平顺境内的宋金小庙，体量虽小，梁架与铺作完整，是一座可以一眼读完的宋式三间殿。'],
    caption: ['佛殿立面示意 · 面阔三间', '单檐歇山 · 北宋'],
    draw: () => Buildings.hall({ bays: 3, bw: 100, colH: 84, fills: ['wall', 'door', 'wall'], roof: 'gablehip', bracketS: 1.5, tiers: 2, interm: 1, intermS: .8, overhang: 74, roofH: 122, ridgeRatio: .42, gableH: 38, lift: 16, chiwen: 22, platH: 16, platPad: 30, puzuo: '四铺作 · 补间一朵', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'liaodi', types: ["pagoda"], name: '定州开元寺塔', short: '料敌塔', sub: '料敌塔', dyn: 'song', tag: '宋', era: '咸平四年始建 · 至和二年成', year: 1055, place: '河北定州 · 古城', placeKey: 'dingzhou',
    lede: '八十三米七，中国现存最高的砖塔。宋真宗咸平四年（1001）开工，仁宗至和二年（1055）才完工，前后五十四年，当地留下“砍尽嘉山木，修成定州塔”的民谚。定州是宋辽边境的军事重镇，登塔可瞭望契丹动静，故名料敌。塔身十一层逐层收分，内部塔心与外塔之间夹着回廊，塔中有塔。清光绪十年（1884）东北面自上而下塌落，缺口豁开一百多年，直到本世纪初才补齐。',
    facts: ['<b>形制</b>：八角十一层楼阁式砖塔，高83.7米，逐层收分；采用穿心式与回廊式结合的内外双层结构，塔内有阶可登，是北方唯一采用穿心式结构的塔。塔身四面辟门，顶置忍冬覆钵与青铜塔刹。', '<b>年代</b>：咸平四年（1001）开元寺僧会能自天竺取回舍利，真宗下诏建塔，至和二年（1055）建成，历时五十余年；宋辽对峙时期借以瞭望敌情，故又名料敌塔。', '<b>修缮</b>：光绪十年（1884）六月东北面塔身自上而下塌落，残缺一百余年；1986年起国家文物部门大规模整修，2002年重新开放，旧时“缺憾之美”的残塔形象不复存在。'],
    caption: ['立面示意 · 八角十一层', '砖构 · 叠涩檐 · 平座'],
    tall: true,
    draw: () => Buildings.tierTower({ w: 560, h: 900, base: [{ w: 300, h: 16 }, { w: 264, h: 12, stairs: false }],
      storeys: Array.from({ length: 11 }, (_, i) => ({ w: 236 * Math.pow(.955, i), wallH: 40 - i * 1.2, door: 'arch', doorW: 15, doorH: 26 - i, win: 'blind', balcony: i ? 10 : 0, balconyStyle: 'brick', railH: 5, bs: i === 0 ? .55 : 0, dense: true, eave: 'brick', outStep: 5, outL: 3, inL: 1, courseH: 4, noteBalcony: i === 4 ? '平座' : undefined, noteEave: i === 7 ? '叠涩檐' : undefined, noteWall: i === 2 ? '券门 · 假窗' : undefined })),
      top: { type: 'cap', w: 120, courses: 3, step: 10, stupa: { bulbW: 30, bulbH: 28, rings: 5, ringW: 18, ringH: 5 }, note: '铁刹' }, dimLabel: '八角 · 十一层', vLabel: '通高 83.7 m' }),
  },
  {
    initialStatus: 'visited', id: 'qinglian', types: ["hall"], name: '晋城青莲寺', short: '青莲寺', sub: '上寺释迦殿', dyn: 'song', tag: '宋', era: '元祐四年', year: 1089, place: '山西晋城 · 泽州 · 硖石山', placeKey: 'jincheng',
    lede: '丹河畔的硖石山腰，青莲寺分作上下两院。上寺释迦殿的石刻留下北宋元祐四年的纪年，三间小殿立在高台上，石柱托起深远的檐口；沿山而下，下寺还保存着唐代彩塑。',
    facts: ['释迦殿<b>面阔三间</b>，进深六椽，单檐歇山；石门框题记为北宋元祐四年（1089）的断代提供依据。', '方形抹棱石柱之上施<b>五铺作，单抄单下昂</b>，无补间铺作；明间开门，两次间置直棂窗。', '上寺释迦殿存<b>四尊宋塑</b>，下寺弥勒殿存<b>六尊唐塑</b>。一寺上下，木构与彩塑各自保存着不同朝代的面貌。'],
    caption: ['上寺释迦殿线稿 · 面阔三间', '单檐歇山 · 北宋元祐四年'],
    draw: () => Buildings.hall({ bays: 3, bw: 110, colH: 88, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.6, tiers: 2, ang: 1, interm: 0, overhang: 82, roofH: 128, ridgeRatio: .5, gableH: 38, lift: 18, chiwen: 28, platH: 42, platPad: 36, puzuo: '五铺作 · 无补间', dimLabel: '面阔三间 · 进深六椽' }),
  },
  {
    initialStatus: 'visited', id: 'liuhe', types: ["pagoda"], name: '杭州六和塔', short: '六和塔', sub: '月轮山 · 钱塘江', dyn: 'song', tag: '宋', era: '南宋绍兴二十六年重建', year: 1156, place: '浙江杭州 · 月轮山', placeKey: 'hangzhou',
    lede: '北宋开宝三年（970）吴越王为镇钱塘江潮而建；现存砖身为南宋绍兴二十六年（1156）重建、隆兴元年（1163）竣工。外围那十三层木檐，是清光绪二十五年（1899）加上去的。',
    facts: ['砖木混构，八角，<b>通高 59.89 米</b>；砖身七层，外檐十三层，"外十三内七"，每层平座勾阑环绕。', '塔内须弥座砖雕的花卉、飞禽与走兽纹样，与《营造法式》所载图样相合，是研究宋代建筑的实物。', '梁思成 1934 年曾为它拟过"瘦身"方案：拆去光绪木檐，恢复宋塔原貌，终未实施。'],
    caption: ['立面示意 · 外十三层', '砖身七层 · 木檐 · 平座'],
    tall: true,
    draw: () => Buildings.tierTower({ w: 560, h: 900, base: [{ w: 380, h: 14 }],
      storeys: Array.from({ length: 13 }, (_, i) => ({ w: 330 * Math.pow(.925, i), wallH: i ? 14 : 22, door: 'lattice', doorW: 14, doorH: 11, win: 'lattice', balcony: i ? 14 : 0, bsB: .4, railH: 6, bs: .5, tiers: 1, eave: 'tile', over: 30 - i * 1.1, band: 11, lift: 12, rafter: 4, noteEave: i === 0 ? '副阶 · 木檐' : undefined, noteBalcony: i === 6 ? '平座勾阑' : undefined, noteWall: i === 3 ? '砖身 · 格窗' : undefined })),
      top: { type: 'pyramid', h: 34, w: 60, stupa: { bulbW: 24, bulbH: 22, rings: 3, ringW: 12 }, note: '宝顶' }, dimLabel: '外十三层 · 内七层', vLabel: '通高 59.89 m' }),
  },
  {
    initialStatus: 'visited', id: 'kaishan', types: ["hall"], name: '高碑店开善寺', short: '开善寺', sub: '大雄宝殿', dyn: 'liao', tag: '辽', era: '辽', year: 1020, yearLabel: '辽', place: '河北高碑店 · 新城', placeKey: 'gaobeidian',
    lede: '八座辽代木构里最朴素的一座，却把辽代的手法用了个全：殿内减柱、移柱并用，五间三进的大殿只留四根金柱，礼佛空间通敞；斗栱硕大，出檐深远，后檐与山面的柱子明显向内侧脚。单檐庑殿，屋面曲线舒展。1936年刘敦桢考察时，从明嘉靖碑“宋重庆二年”的讹误推断寺建于辽重熙年间，断为辽构；具体年份至今无定论，本条只标辽。',
    facts: ['<b>形制</b>：面阔五间、进深三间，约30.4米×18.5米，高约12米，坐于1.11米高的石台基上，殿前月台27.6米×11.4米；单檐庑殿顶，殿内仅四根金柱，梁架为抬梁式彻上露明造，推山用大叉手。', '<b>断代</b>：1936年刘敦桢据明嘉靖三十年《开善寺重修记》“宋重庆二年”推为辽“重熙”之误，并以构造与独乐寺相近断为辽构；一说殿内梁上题记指向1033年，学界对确年仍有争议。', '<b>研究与修缮</b>：祁英涛1957年发表《河北省新城县开善寺大殿》；2001年维修时在后檐夹壁墙内发现辽代千手千眼观音石像；2023年8月洪水淹没寺院，大殿积水数日后排出。'],
    caption: ['立面示意 · 面阔五间', '单檐庑殿 · 减柱造'],
    draw: () => Buildings.hall({ bays: 5, bw: 100, colH: 96, fills: ['wall', 'win', 'door', 'win', 'wall'], roof: 'hip', bracketS: 2.0, tiers: 2, interm: 1, overhang: 84, roofH: 156, ridgeRatio: .56, platH: 20, platPad: 46, lift: 14, chiwen: 30, puzuo: '五铺作 · 补间十四', dimLabel: '面阔 25.8 m' }),
  },
  {
    initialStatus: 'visited', id: 'huayan', types: ["hall"], name: '华严寺', sub: '薄伽教藏殿 · 大雄宝殿', dyn: 'liao', tag: '辽', era: '重熙七年', year: 1038, place: '山西大同 · 古城', placeKey: 'datong',
    lede: '契丹人拜日，所以整座寺院坐西朝东。下寺的薄伽教藏殿是辽重熙七年（1038）的藏经殿，殿内四壁三十八间两层楼阁式的壁藏，后窗处以圜桥飞架“天宫楼阁”，梁思成称之为海内孤品；上寺的大雄宝殿毁于1122年辽金战火，金天眷三年（1140）在辽代台基上重建，面阔九间，是现存最大的古代佛殿。图版所绘为大雄宝殿正面。',
    facts: ['<b>形制</b>：大雄宝殿立于4米高台基上，单檐庑殿，面阔九间、进深十椽，建筑面积1559平方米，出檐3.6米、檐高9.5米，正脊琉璃鸱吻高4.5米，为现存古建中最大；斗拱五铺作双杪，殿内减柱十二根。薄伽教藏殿单檐歇山，面阔五间、进深八椽，立于3米高台基。', '<b>年代</b>：薄伽教藏殿椽底题记“维重熙七年岁次戊寅九月甲午朔十五日戊申午时建”，即1038年；大雄宝殿始建于辽清宁八年（1062），保大二年（1122）毁于金兵攻城，金天眷三年（1140）重建，1997—2000年修缮。明万历初年寺分为上下两寺。', '<b>价值</b>：薄伽教藏殿内38间壁藏、天宫楼阁与29尊辽塑均为辽代原物，壁藏是国内唯一的辽代木构建筑模型，殿内“合掌露齿”胁侍菩萨尤为著名；寺院坐西朝东被认为与契丹“信鬼拜日”习俗有关；大雄宝殿是中国现存规模最大的古代佛殿。'],
    caption: ['大雄宝殿立面示意 · 面阔九间', '单檐庑殿 · 高台'],
    draw: () => Buildings.hall({ bays: 9, bw: 64, colH: 92, fills: ['wall', 'wall', 'win', 'win', 'door', 'win', 'win', 'wall', 'wall'], roof: 'hip', bracketS: 1.6, tiers: 2, interm: 1, overhang: 62, roofH: 194, ridgeRatio: .6, platH: 46, platPad: 44, lift: 18, chiwen: 44, puzuo: '五铺作 · 双杪', dimLabel: '面阔 53.9 m' }),
  },
  {
    initialStatus: 'visited', id: 'yingxian', types: ["pagoda"], name: '应县木塔', short: '木塔', sub: '佛宫寺释迦塔', dyn: 'liao', tag: '辽', era: '清宁二年', year: 1056, place: '山西朔州 · 应县', placeKey: 'yingxian',
    lede: '六十七米的纯木高塔，辽清宁二年（1056）立起，九百七十年没有倒。外看五层六檐，内藏四个暗层，实为九层；全塔以五十余种斗拱层层承接，被称为“斗拱博物馆”，不用一颗铁钉。它挨过多次大地震，1926年军阀混战中中了二百余发炮弹，1974年人们又在塔内塑像中找出辽代刻经与佛牙舍利——世界现存最高、最古老的木塔。',
    facts: ['<b>形制</b>：八角楼阁式木塔，通高67.31米，底层直径30.27米，总重约7400吨；外观五层六檐，一至四层各有一暗层，实为明五暗四九层；一层副阶周匝，各层外设平座勾栏；主料华北落叶松、斗拱用榆木，全塔五十余种斗拱，塔顶立铁刹。', '<b>年代</b>：明代方志记塔建于辽清宁二年（1056），金明昌年间加修；塔上匾额题记另见明昌五年（1194）、明正统元年（1436）、成化七年（1471）等修缮纪年。1926年遭炮击二百余发，1935年拆除夹泥墙与斜戗致塔身扭曲，2013年确定加固方案、2014年启动。', '<b>价值</b>：一层内槽释迦坐像高约10米；1966年与1974年先后在塔内佛像中发现辽代刻经、写经与两粒佛牙舍利。2016年获吉尼斯认证为世界最高木塔；明成祖题“峻极神工”、明武宗题“天下奇观”匾至今悬于塔上。'],
    caption: ['立面示意 · 八角五层', '楼阁式 · 六檐'],
    tall: true,
    draw: () => Buildings.woodPagoda({ storeys: [{ porch: 300, w: 232, colH: 42, bs: 1.05, over: 40, band: 26 }, { w: 214, colH: 28, bs: .95, over: 38, band: 22 }, { w: 197, colH: 27, bs: .9, over: 36, band: 21 }, { w: 181, colH: 26, bs: .85, over: 34, band: 20 }, { w: 167, colH: 25, bs: .8, over: 32, band: 20 }], topH: 50, shaH: 84, dimLabel: '底层直径 30.27 m', vLabel: '通高 67.31 m' }),
  },
  {
    initialStatus: 'visited', id: 'tianning', types: ["pagoda"], name: '北京天宁寺塔', short: '天宁寺塔', sub: '广安门外', dyn: 'liao', tag: '辽', era: '天庆九年至十年', year: 1120, place: '北京 · 广安门', placeKey: 'beijing',
    lede: '1935 年梁思成写文章说，天宁寺塔“绝对绝对不是隋宏业寺的原塔”，当是辽末所建；1991 年大修拆砌塔刹，刹座里取出一块辽代建塔碑：天庆九年（1119）——他说对了。塔八角十三层，实心密檐，高 57.8 米：两层须弥座、一圈平座斗栱、三层仰莲托起高大的塔身，再往上十三层檐一层压一层，越收越紧，梁思成说它富有音乐的韵律，是汉族工匠为契丹统治者创造的新类型。',
    facts: ['<b>形制</b>：实心砖塔，八角十三层密檐，高 57.8 米，立于方形平台；塔座为两层须弥座，束腰刻壶门，上为砖雕斗栱、栏杆的平座与三层仰莲。塔身四正面砖雕假门，四斜面雕直棂窗，门窗两侧力士、上方菩萨浮雕，转角砖柱刻升降龙。', '<b>年代</b>：文献相传为隋文帝所建舍利塔；梁思成、林徽因 1935 年以形制断为辽末，1991—1992 年大修时从塔刹座内取出辽代建塔碑，确定建于天庆九年（1119）。明宣德十年（1435）寺重建改名天宁寺，正德、嘉靖、乾隆年间多次重修。', '<b>密檐</b>：十三层檐下皆以砖雕双抄斗栱承托，首层檐下每面一朵补间铺作并出 45 度斜栱，以上各层两朵补间，檐距逐层缩短；椽、飞、角梁为木，檐瓦脊兽为琉璃。1976 年唐山地震震落塔刹，文革中多尊浮雕被毁，1992 年修复后建塔碑归位。'],
    caption: ['立面示意 · 八角十三层', '密檐式 · 辽'],
    tall: true,
    draw: () => Buildings.tierTower({ w: 560, h: 800, base: [{ w: 300, h: 16 }, { w: 262, h: 22, stairs: false }, { w: 246, h: 14, stairs: false }],
      storeys: [{ w: 226, wallH: 118, door: 'arch', doorW: 28, doorH: 60, win: 'blind', bs: .62, dense: true, eave: 'tile', over: 34, band: 22, lift: 9, rafter: 5, noteWall: '券门 · 金刚 · 菩萨' },
        ...Array.from({ length: 12 }, (_, i) => ({ w: 222 * Math.pow(.972, i + 1), wallH: 5, door: 'none', bs: .48, dense: true, eave: 'tile', over: 28 - i * .8, band: 14, lift: 8, rafter: 4, noteEave: i === 5 ? '密檐十三层' : undefined }))],
      top: { type: 'pyramid', h: 26, w: 70, stupa: { bulbW: 34, bulbH: 30, rings: 2, ringW: 14, ringH: 5 }, note: '宝珠' }, dimLabel: '八角 · 须弥座 · 仰莲', vLabel: '通高 57.8 m' }),
  },
  {
    // 1120 is an approximate timeline position, not a documented construction year.
    initialStatus: 'visited', id: 'huilong', types: ["hall"], name: '回龙寺', short: '回龙寺', sub: '正殿 · 浊漳河南岸', dyn: 'liao', tag: '金', era: '金构 · 宋金之际', year: 1120, yearApprox: true, yearLabel: '宋金之际', place: '山西平顺 · 浊漳河谷 · 侯壁村', placeKey: 'pingshun',
    lede: '浊漳河南岸的侯壁村，回龙寺只剩一座三间正殿。两根八角石柱立在前廊，低缓的悬山顶向两侧伸出；没有高塔与重楼，早期木构的分量都落在檐下几攒斗拱之间。',
    facts: ['正殿<b>面阔三间</b>，进深四椽，单檐悬山；前檐明间立两根八角石柱，两侧支点包入墙体，后设一门两窗。', '柱头不施普拍枋，阑额至角柱不出头，保留古朴的构造特征。', '全国重点文物保护单位公布年代为<b>金</b>；另有北宋末至金初的形制与测年转述。尚无确切建造纪年，年表仅在宋金之际作约略定位。'],
    caption: ['正殿线稿 · 面阔三间', '单檐悬山 · 宋金之际'],
    draw: () => Buildings.hall({ bays: 3, bw: 104, colH: 84, fills: ['win', 'door', 'win'], roof: 'gable', bracketS: 1.5, tiers: 2, interm: 0, overhang: 60, roofH: 96, ridgeRatio: 1, lift: 6, chiwen: 24, platH: 16, platPad: 32, puzuo: '柱头铺作 · 无普拍枋', dimLabel: '面阔三间 · 进深四椽' }),
  },
  {
    initialStatus: 'visited', id: 'shanhua', types: ["hall", "pavilion"], name: '善化寺', sub: '大雄宝殿 · 三圣殿 · 普贤阁', dyn: 'liao', tag: '辽金', era: '辽 · 金天会六年', year: 1128, place: '山西大同 · 南门', placeKey: 'datong',
    lede: '辽代的大雄宝殿居北，金代的三圣殿、山门沿中轴排开，普贤阁立在西侧——现存规模最大、布局最完整的辽金寺院。金天会六年（1128）起僧圆满用十四年重建，到皇统三年（1143）完工。图版所绘的普贤阁建于金贞元二年（1154），外观两层、中夹平座暗层，重檐歇山，三间见方，是了解辽金楼阁为数不多的实物。',
    facts: ['<b>形制</b>：普贤阁面阔、进深各三间，重檐歇山，外观二层，两明层之间设平座暗层；上檐次间柱头、补间与转角铺作以瓜子栱连成一体，做法罕见。大雄宝殿面阔七间41.8米、进深五间26.18米，单檐庑殿；三圣殿五间32.5米，六铺作斜栱层叠如花。', '<b>年代</b>：寺创于唐开元年间，辽保大二年（1122）毁于兵火；金天会六年（1128）僧圆满重建，至皇统三年（1143）完工，普贤阁建于贞元二年（1154）；明正统十年（1445）敕名善化寺。大雄宝殿为辽构，山门、三圣殿、普贤阁为金构。2007年三圣殿大修。', '<b>价值</b>：大雄宝殿是现存第三大古代佛殿，殿内三十四尊金代彩塑、五方佛与二十四诸天完整；三圣殿内朱弁撰文的金大定十六年（1176）《重修大殿记》碑是寺史的依据；梁思成评三圣殿斗拱“颇足以表示当时方兴未艾之朝气”。'],
    caption: ['普贤阁立面示意 · 面阔三间', '两层楼阁 · 平座 · 歇山'],
    draw: () => Buildings.pavilion({ bays: 3, bw: 80, colH: 84, fills: ['wall', 'door', 'wall'], fills2: ['wall', 'door', 'wall'], bracketS: 1.5, overhang: 54, skirtH: 44, inset: 14, colH2: 58, roofH: 126, gableH: 44, platH: 20, platPad: 36, dimLabel: '面阔 10.6 m' }),
  },
  {
    initialStatus: 'visited', id: 'chunhua', types: ["hall"], name: '平顺淳化寺', short: '淳化寺', sub: '正殿 · 阳高村', dyn: 'liao', tag: '金', era: '金大定九年前', year: 1160, yearLabel: '金', place: '山西平顺 · 浊漳河谷 · 阳高村', placeKey: 'pingshun',
    lede: '殿前两座北宋开宝三年（970）的石经幢，比殿还老两百年。正殿三间六椽，单檐歇山，出檐宽大；柱头四铺作单昂，昂作琴面式，不设补间铺作。梁架用一根整料六椽栿通搭前后檐，上面不再用四椽栿，只以蜀柱和剳牵承槫，是晋东南早期建筑里少见的省料做法。殿无题记，按结构断为金。',
    facts: ['<b>形制</b>：面阔三间、进深六椽，单檐歇山顶，柱上有普拍枋；柱头铺作四铺作单昂，昂为琴面式，令栱抹角，不设补间铺作。梁架一根六椽栿通搭前后檐，其上立蜀柱施剳牵承槫，彻上露明；前后檐开门，后门小抱厦为后世添建。', '<b>年代</b>：寺创于北齐天保年间，原名龙门禅院，为龙门寺下院；北宋开宝年间重建，淳化二年（991）改今名。正殿未见建造题记，依结构断为金代；殿北墙嵌金大定九年（1169）县令李晏题诗碑，两幢经幢刻北宋开宝三年（970）年号。雍正、嘉庆、民国均曾维修。', '<b>价值</b>：山西现存早期建筑中进深六椽者多用组合梁架，整根六椽栿通檐者极少，此殿是代表；两幢经幢分刻《金刚经》与《尊胜陀罗尼经》。李晏同次出游也在龙门寺大殿后檐柱留题，两处题记互证；李晏《金史》有传，后官至礼部尚书。'],
    caption: ['正殿立面示意 · 面阔三间', '单檐歇山 · 金'],
    draw: () => Buildings.hall({ bays: 3, bw: 104, colH: 88, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.5, tiers: 1, ang: 1, interm: 1, intermS: .8, overhang: 70, roofH: 124, ridgeRatio: .45, gableH: 38, lift: 14, chiwen: 22, platH: 18, platPad: 32, puzuo: '四铺作 · 单杪 · 批竹昂', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'huata', types: ["pagoda"], name: '广惠寺华塔', short: '华塔', sub: '花塔', dyn: 'liao', tag: '金', era: '唐始建 · 金大定年间重修', year: 1161, yearLabel: '金大定', place: '河北正定 · 古城', placeKey: 'zhengding',
    lede: '中国现存华塔里最华丽的一座：下面三层是八角楼阁，四隅各抱一座六角小塔，最上一层收成一束"花"，狮、象、菩萨、力士层层簇拥着塔刹。',
    facts: ['唐代始建，金大定年间重修；通高 <b>40.5 米</b>（一说 33.35 米），四层，砖砌仿木。', '第一层<b>四隅六角套室</b>与主塔相连，各有券门，顶为覆钵；"一主四副"的组合别处未见。', '第四层<b>花束形塔身</b>：八面塑狮、象、佛龛、力士，交错排布，共八层，华塔之名由此而来。', '与开元寺须弥塔、天宁寺凌霄塔、临济寺澄灵塔并称"正定四塔"。'],
    caption: ['立面示意 · 四层华塔', '八角楼阁 · 六角套室 · 花束塔身'],
    tall: true,
    draw: () => Buildings.huaTa({ w1: 250, h1: 176, wingW: 96, wingH: 120, w2: 190, h2: 56, w3: 120, h3: 30, flowerH: 170, flowerW: 150, tiers: 8, w4: 70, h4: 26, coneH: 44, dimLabel: '一主四副 · 六角套室', vLabel: '通高 40.5 m' }),
  },
  {
    initialStatus: 'visited', id: 'xiayu', types: ["hall"], name: '夏禹神祠', short: '禹王庙', sub: '侯壁村', dyn: 'yuan', tag: '元', era: '元至元二年', year: 1336, place: '山西平顺 · 浊漳河谷 · 侯壁村', placeKey: 'pingshun',
    lede: '浊漳河谷侯壁村最高处的禹王垴上，一座只有一进院的小庙把元、明、清三代木构收在877平方米里：山门是明代的，上层倒座戏台正对元代正殿，配殿与厢房是清代补齐的。图版所绘为正殿——三间悬山、前出两椽深廊的元至元二年（1336）遗构，殿内四椽栿对前乳栿、通檐用四柱的梁架，是认识晋东南元代村庙的现成教材。',
    facts: ['<b>正殿</b>：面阔三间、进深六椽，单檐悬山顶，前檐设廊、廊深两椽；柱头斗栱四铺作单下昂，补间三朵为清代所加，梁架为四椽栿对前乳栿通檐用四柱。', '<b>纪年</b>：祠始建于元至元二年（1336），明清屡有修葺；殿内尚存明代嵌壁石一方、清代两方及万历年间石质供桌三张，山门为明构，配殿、厢房属清代。', '<b>格局</b>：一进院落仅877平方米，山门面阔三间、进深四椽，上层倒座戏台正对正殿，殿前凸字形月台三面浮雕；国家文物局登记的时代为“元至清”，一院之内三朝木构齐备。'],
    caption: ['正殿立面示意 · 面阔三间', '单檐悬山 · 元'],
    draw: () => Buildings.hall({ bays: 3, bw: 100, colH: 84, fills: ['win', 'door', 'win'], roof: 'gable', bracketS: 1.3, tiers: 1, interm: 1, intermS: .8, overhang: 50, roofH: 96, ridgeRatio: 1, chiwen: 18, lift: 5, platH: 16, platPad: 28, depth: 170, puzuo: '元 · 四铺作', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'jiutian', types: ["hall"], name: '九天圣母庙', short: '圣母庙', sub: '献殿 · 东河村', dyn: 'yuan', tag: '宋元', era: '宋建中靖国元年重修 · 献殿元构', year: 1300, yearLabel: '元', place: '山西平顺 · 浊漳河谷 · 东河村', placeKey: 'pingshun',
    lede: '九天圣母庙献殿四面开敞，石柱托着木梁与屋顶，站在其中能直接看见柱、斗栱和梁架的连接。它位于戏楼与正殿之间，三座建筑紧密相接，屋檐在有限院落中彼此穿插。现存献殿按元代遗构认识，不能把寺庙宋代重修年份直接用作它的建年。前后相接的祭祀空间、院内历代碑刻与不同时期殿宇，让一座山村庙宇留下持续营建的时间层次。',
    facts: ['开敞：献殿以石柱支撑木构，三间宽、五间深，周围不设封闭墙面；柱间可望见相邻殿宇，梁架与承檐构件直接暴露在视线中，形成不同于封闭正殿的空间。', '断代：现存献殿为元代遗构，正殿为宋代，梳妆楼又属明代，其他部分多有清代层次；不同建筑前后相接，并不表示全部建于宋代重修所记的同一个年份。', '院落：中轴线依次安排山门戏楼、献殿与正殿，两旁还有配殿和廊房；祭祀与演剧在同一院落展开，碑刻保存历次营修，使空间布局与文字记录能够相互对读。'],
    caption: ['献殿侧立面示意 · 进深五间', '庑殿顶 · 正脊沿进深 · 元'],
    draw: () => Buildings.hall({ bays: 5, bw: 76, colH: 96, fills: ['open', 'open', 'open', 'open', 'open'], roof: 'hip', bracketS: 1.5, tiers: 1, interm: 1, intermS: .8, overhang: 72, roofH: 140, ridgeRatio: .5, lift: 16, chiwen: 26, platH: 30, platPad: 34, puzuo: '四铺作 · 单杪 · 石柱', ridgeNote: '正脊沿进深 · 院内正面见山面', dimLabel: '进深五间（面阔三间在另一面）' }),
  },
  {
    initialStatus: 'visited', id: 'shuanglin', types: ["hall"], name: '平遥双林寺', short: '双林寺', sub: '天王殿 · 彩塑', dyn: 'ming', tag: '明', era: '北齐武平二年重修 · 明初重建', year: 1400, yearLabel: '明初', place: '山西平遥 · 桥头村', placeKey: 'pingyao',
    lede: '进了堡门第一眼就是它：天王殿五间悬山，前廊一字排开四尊三米高的金刚，是双林寺两千余尊明代彩塑的开场白。寺初名中都寺，寺内北宋碑记载北齐武平二年（571）已有重修，今天的殿宇与塑像多出自明代重建、清代重妆；1997年它与镇国寺一起随平遥古城列入世界遗产。图版所绘为天王殿正面与廊下金刚，殿内弥勒、帝释、梵天与四大天王不在画中。',
    facts: ['<b>天王殿</b>：面阔五间、进深三间，单檐悬山顶；前廊塑四大金刚，每尊高约3米；殿内天冠弥勒高2.2米，帝释、梵天胁侍高约1.75米，南墙倒座四大天王，两侧列八大菩萨。', '<b>纪年</b>：寺内北宋大中祥符四年（1011）《姑姑之碑》记“中都寺重修于北齐武平二年（571）”，宋取“双林入灭”之义改名；现存殿宇与彩塑主要出自明代重建，清代重妆；寺外明代夯土围墙置箭垛，形如堡寨。', '<b>彩塑</b>：全寺十座殿堂存彩塑2052尊，完好者1566尊，大者逾3米、小者30厘米，约四分之三以悬塑手法前倾10至20度；塑泥用本地红胶泥，眼珠嵌黑琉璃。'],
    caption: ['天王殿立面示意 · 面阔五间', '单檐悬山 · 前廊四金刚'],
    draw: () => Buildings.hall({ bays: 5, bw: 100, colH: 92, fills: ['figure', 'figure', 'door', 'figure', 'figure'], roof: 'gable', bracketS: 1.1, tiers: 1, interm: 1, overhang: 56, roofH: 96, ridgeRatio: 1, platH: 18, platPad: 30, chiwen: 22, lift: 6, gableEnd: false, puzuo: '明式', dimLabel: '面阔五间' }),
  },
  {
    initialStatus: 'visited', id: 'tiantan', types: ["hall"], name: '北京天坛', short: '天坛', sub: '祈年殿', dyn: 'ming', tag: '明清', era: '永乐十八年始建 · 光绪二十二年重建', year: 1420, place: '北京 · 天坛', placeKey: 'beijing',
    lede: '明永乐十八年（1420）建大祀殿，嘉靖年间改为三重檐圆殿，乾隆时换上蓝瓦、改名祈年殿。光绪十五年（1889）雷火焚毁，六年后按原样重建——今天看到的，是 1896 年的木头。',
    facts: ['圆形三重檐攒尖，蓝琉璃瓦，鎏金宝顶；<b>直径 32.72 米，通高 38 米</b>，立于三层汉白玉圆坛之上。', '殿内二十八根柱子：四根龙井柱象四季，十二根金柱象十二月，十二根檐柱象十二时辰。', '全殿无大梁，靠柱、枋、斗拱层层承托攒尖顶，是明清官式木构的极致。'],
    caption: ['祈年殿立面示意 · 圆形三重檐', '攒尖 · 三层圆坛'],
    draw: () => Buildings.roundHall({ tiers: [{ w: 700, h: 22, rail: 14 }, { w: 600, h: 22, rail: 14 }, { w: 500, h: 22, rail: 14 }],
      drums: [{ w: 260, h: 62, bs: .7, over: 44, band: 40 }, { w: 200, h: 38, bs: .65, over: 40, band: 36 }, { w: 148, h: 32, bs: .6, over: 36, band: 34 }], topW: 104, coneH: 26, dimLabel: '祈谷坛 · 三层', vLabel: '通高 38 m' }),
  },
  {
    initialStatus: 'visited', id: 'baoen', types: ["pagoda"], name: '南京大报恩寺塔', short: '报恩塔', sub: '琉璃塔 · 已毁', dyn: 'ming', tag: '明', era: '永乐十年始建 · 宣德三年成', year: 1428, place: '江苏南京 · 中华门外', placeKey: 'nanjing',
    lede: '明永乐十年（1412）动工，宣德三年（1428）建成，九层八面，高 78.2 米，塔身贴白瓷砖，拱门用五色琉璃拼出狮、象、飞羊，角梁下挂 152 只风铃，塔上一百多盏长明灯夜夜不灭——欧洲人叫它“南京瓷塔”，列进中古世界七大奇观。1856 年天京事变中被炸毁，只剩塔刹与石碑；1958 年出土的墨书字号琉璃构件和 2008 年地宫里的七宝阿育王塔，是它留下的实物。图版依据的是复原模型。',
    facts: ['<b>形制</b>：琉璃塔九层八面，通高 78.2 米，数十里外长江上可见；塔身白瓷贴面，拱门为琉璃门券，门框饰狮子、白象、飞羊等五色琉璃砖；刹顶镶金银珠宝，角梁下悬风铃 152 个，塔内壁布满佛龛。', '<b>年代</b>：永乐十年（1412）敕工部重建天禧寺，二十二年（1424）赐名大报恩寺并亲制碑文；塔同年起建，宣德三年（1428）竣工，历时十九年，据载由南京守备郑和督造。嘉靖末寺院遭火，“惟塔及禅殿香积厨仅存”。', '<b>毁与出土</b>：1856 年天京事变，北王韦昌辉为防翼王部据塔发炮而下令炸毁，此后仅余塔刹与石碑。1958 年窑岗村一带出土大批带墨书字号的琉璃构件，相传当年一式烧造三份；2008 年遗址铁函中发现七宝阿育王塔，内藏“佛顶真骨”，2015 年遗址公园开园。'],
    caption: ['立面示意 · 九层八角 · 据十七世纪版画', '琉璃塔 · 1856 年毁'],
    tall: true, lost: true,
    draw: () => Buildings.tierTower({ w: 560, h: 900, base: [{ w: 360, h: 18 }, { w: 300, h: 14, stairs: false }],
      storeys: Array.from({ length: 9 }, (_, i) => ({ w: 210 * Math.pow(.9, i), wallH: i ? 22 : 36, door: 'arch', doorW: 14, doorH: 18, win: 'arch', balcony: i ? 16 : 0, bsB: .45, railH: 8, bs: .55, tiers: 1, eave: 'tile', over: 36 - i * 1.6, band: 16, lift: 13, rafter: 4, noteBalcony: i === 4 ? '平座勾阑 · 檐角悬铃' : undefined, noteWall: i === 1 ? '白瓷砖 · 琉璃拱门' : undefined })),
      top: { type: 'pyramid', h: 44, w: 70, sha: 110, note: '铁刹 · 相轮' }, dimLabel: '八角九层', vLabel: '通高 78.2 m' }),
  },
  {
    initialStatus: 'visited', id: 'tiefo', types: ["hall"], name: '高平铁佛寺', short: '铁佛寺', sub: '正殿 · 二十四诸天', dyn: 'ming', tag: '明', era: '嘉靖元年重修', year: 1522, place: '山西高平 · 米山镇 · 米西村', placeKey: 'gaoping',
    lede: '米西村街巷里，铁佛寺的三间正殿以悬山顶和琉璃脊饰收束。走进门，二十四诸天沿殿壁展开：怒目、含笑、低眉，铁丝撑起的须发与飘带，把泥塑做出了将要动起来的神情。',
    facts: ['正殿<b>面阔三间</b>，进深六椽，单檐悬山；前檐斗拱五踩双昂，屋脊中央立<b>狮驼宝瓶</b>琉璃饰件。', '殿内<b>明代二十四诸天彩塑</b>以木骨泥身塑成，须发、冠饰和飘带借助铁丝塑形，细部轻巧而有张力。', '创建年代不详。金大定七年（1167）铸铁佛并重修，明嘉靖元年（1522）、万历三年（1575）及清代又经修缮，现存建筑呈明清风格。'],
    caption: ['正殿线稿 · 面阔三间', '单檐悬山 · 明代'],
    draw: () => Buildings.hall({ bays: 3, bw: 106, colH: 90, fills: ['win', 'door', 'win'], roof: 'gable', bracketS: 1.4, tiers: 2, ang: 2, interm: 1, overhang: 58, roofH: 118, ridgeRatio: 1, lift: 10, ridgeOrn: true, chiwen: 24, platH: 16, platPad: 32, puzuo: '五踩双昂 · 琉璃脊饰', dimLabel: '面阔三间 · 进深六椽' }),
  },
  {
    initialStatus: 'visited', id: 'feihong', types: ["pagoda"], name: '广胜寺飞虹塔', short: '飞虹塔', sub: '洪洞 · 琉璃塔', dyn: 'ming', tag: '明', era: '正德十年始建 · 嘉靖六年成', year: 1527, place: '山西洪洞 · 霍山', placeKey: 'hongtong',
    lede: '正德十年（1515）至嘉靖六年（1527），僧达连募资十余年，在霍山上寺中轴最前端立起这座八角十三级、高四十七米余的砖塔，外壁从塔檐、斗栱到佛像、力士、盘龙全用琉璃烧成，赤橙黄绿青蓝紫俱全，是中国现存最大、最完整的琉璃塔。它建在元代旧塔的位置上，之后扛过了1556年关中、1695年平阳两次大地震。图版所绘为飞虹塔全塔。',
    facts: ['<b>塔身</b>：平面八角，十三级，通高47.31米（一作47.6米），自下而上急剧收分呈锥形；内部砖石砌筑，外壁各层塔檐、斗栱、佛龛与人物、盘龙均为赤橙黄绿青蓝紫等色琉璃构件。', '<b>纪年</b>：明正德十年（1515）由高僧达连募资在元代原址重建，嘉靖六年（1527）建成；其后经嘉靖三十五年（1556）关中大地震与康熙三十四年（1695）平阳大地震两次强震而无恙。', '<b>关联</b>：广胜寺1961年列入第一批全国重点文物保护单位；下寺元代壁画1928年被售出，分藏美国三家博物馆；1986年版电视剧《西游记》“唐僧扫塔”一集在此取景。'],
    caption: ['立面示意 · 八角十三级', '琉璃 · 一层回廊'],
    tall: true,
    draw: () => Buildings.tierTower({ w: 560, h: 820, base: [{ w: 440, h: 14 }],
      storeys: [
        { w: 300, wallH: 40, door: 'door', doorW: 22, doorH: 32, win: 'lattice', bs: .7, tiers: 1, eave: 'tile', over: 56, band: 26, lift: 12, rafter: 5, noteEave: '木构回廊 · 副阶' },
        ...Array.from({ length: 12 }, (_, i) => ({ w: 200 * Math.pow(.925, i), wallH: i ? 22 - i * .4 : 36, door: 'arch', doorW: 10, doorH: 12, win: 'blind', bs: .42, dense: true, eave: 'brick', outStep: 4, outL: 3, inL: 1, courseH: 4, noteBs: i === 4 ? '琉璃仿木斗拱' : undefined, noteWall: i === 8 ? '佛龛 · 力士' : undefined }))],
      top: { type: 'cap', w: 60, courses: 2, step: 8, stupa: { bulbW: 20, bulbH: 18, rings: 5, ringW: 12, ringH: 4 }, note: '塔刹' }, dimLabel: '八角 · 十三级', vLabel: '通高 47.31 m' }),
  },
  {
    initialStatus: 'visited', id: 'xitai', types: ["stage"], name: '宁海古戏台', short: '戏台', sub: '岙胡胡氏宗祠 · 崇兴庙 · 城隍庙', dyn: 'ming', tag: '清', era: '清至民国 · 岙胡戏台咸丰四年', year: 1854, yearLabel: '清', place: '浙江宁海 · 祠庙', placeKey: 'ninghai',
    lede: '宁海一县现存古戏台一百二十五座，十座列为国保，都建在祠堂和庙宇里，清代到民国。一间见方的台子架在半人高的空中，歇山顶的翘角像牛角一样翻起来，台内是螺旋盘上去的藻井。',
    facts: ['戏台多为<b>面阔一间</b>，台面架空离地，台口一圈雕花勾阑；柱头用牛腿承檐，不用斗拱。', '<b>藻井</b>是宁海戏台的看家本领：岙胡胡氏宗祠戏台与勾连廊连设三个藻井，浙江仅存三处"三连贯藻井"。', '岙胡胡氏宗祠建于清咸丰四年（1854），戏台与两侧看楼相接，观众在楼上看戏。'],
    caption: ['戏台立面示意 · 面阔一间', '歇山 · 翘角 · 架空台面'],
    draw: () => Buildings.stage({ w: 210, stageH: 58, railH: 20, colH: 96, bracketS: 1.0, overhang: 74, roofH: 112, gableH: 44, lift: 60, chiwen: 30, k: 100, dimLabel: '面阔一间', vLabel: '台高' }),
  },

  // Curated additions: all have imagegen plates and start unvisited.
  {
    "id": "fengguo",
    "types": ["hall"],
    "name": "义县奉国寺",
    "short": "奉国寺",
    "sub": "大雄殿",
    "dyn": "liao",
    "tag": "辽",
    "era": "辽开泰九年",
    "year": 1020,
    "place": "辽宁锦州 · 义县古城",
    "placeKey": "yixian",
    "legacyNames": [
      "奉国寺",
      "义县奉国寺"
    ],
    "legacyPlaces": [
      "义县",
      "锦州"
    ],
    "lede": "九间面阔的屋顶覆盖着一整排七佛，奉国寺大雄殿的辽代尺度在殿外与殿内都能感到。高台上单檐庑殿宽而稳，柱网托起深远的空间，梁架彩画又把视线引向上方。寺院始建于辽开泰九年，今日寺内仍有后世建筑；大雄殿、彩塑与彩画的组合，才是这处遗存的核心。",
    "facts": [
      "大雄殿面阔九间、进深五间，单檐庑殿坐落于高台上。宽展屋面与开阔殿身相接，檐下木构的层次使庞大体量仍能显出清楚而有序的支撑关系。",
      "奉国寺始建于辽开泰九年，大雄殿是现存辽代建筑。寺内山门、牌楼等另有清代及重建历史，不能把全寺今日所见都归入同一次辽代营建。",
      "殿内过去七佛彩塑与建筑彩画，与木构大殿合为观看重点。建筑不只是造像的外壳，宽阔空间和梁架上的彩饰也共同塑造了辽代佛殿的庄严气氛。"
    ],
    "caption": [
      "奉国寺大雄殿线稿 · 面阔九间",
      "单檐庑殿 · 辽开泰九年"
    ]
  },
  {
    "id": "zhuozhou",
    "types": ["pagoda"],
    "name": "涿州辽代双塔",
    "short": "涿州双塔",
    "sub": "云居寺塔 · 智度寺塔",
    "dyn": "liao",
    "tag": "辽",
    "era": "十一世纪",
    "year": 1031,
    "place": "河北涿州 · 古城",
    "placeKey": "zhuozhou",
    "legacyNames": [
      "涿州双塔",
      "涿州辽代双塔"
    ],
    "legacyPlaces": [
      "涿州"
    ],
    "lede": "南北两塔最醒目的差别，是一座六层、一座五层，而砖墙上都能找到木楼的柱、窗与斗拱。涿州辽代双塔原属不同寺院，寺院已消失，塔仍隔着旧城相望。这里的砖作并非简单叠高，而是把辽代楼阁的层次和登临空间保存下来；北塔建年的不同考证，也提醒人们形制与纪年需要分开阅读。",
    "facts": [
      "两塔均为八角楼阁式仿木砖塔，北为六层云居寺塔，南为五层智度寺塔；各层正面开券门，斜面砌直棂盲窗，以门窗和斗拱分出木楼般的层次。",
      "智度寺塔建于辽太平十一年，即一〇三一年；云居寺塔的建年有重熙与大安年间等不同记载，因此两塔合称十一世纪遗存，不把北塔争议纪年当作定论。",
      "塔内外墙之间形成走廊，塔心又设旋转踏垛，使高大的砖塔具有可登临的内部组织；寺院虽已不存，这些结构仍为理解辽代楼阁营造留下实物参照。"
    ],
    "caption": [
      "云居寺塔 · 智度寺塔",
      "北塔六层 · 南塔五层"
    ],
    "yearLabel": "十一世纪",
    "yearApprox": true
  },
  {
    "id": "geyuan",
    "types": ["hall"],
    "name": "涞源阁院寺",
    "short": "阁院寺",
    "sub": "文殊殿",
    "dyn": "liao",
    "tag": "辽",
    "era": "辽应历十六年（通行定年）",
    "year": 966,
    "place": "河北保定 · 涞源县城",
    "placeKey": "laiyuan",
    "legacyNames": [
      "阁院寺",
      "涞源阁院寺"
    ],
    "legacyPlaces": [
      "涞源"
    ],
    "lede": "三开间的佛殿，用的却是七开间大殿的材分：阁院寺文殊殿的斗栱用材与大同善化寺大殿、应县木塔相同，相当于《营造法式》二等材，所以它历经地震千年未倒，也从未落架大修。殿平面近方，边长约15米，单檐歇山出檐深远，殿内减柱、移柱只用两根内柱。通行定年为辽应历十六年（966），八大辽构中最早的一座；正面的格子门窗里还夹着辽代晚期的原构。",
    "facts": [
      "<b>形制</b>：面阔、进深各三间，平面近方形，边长约15米，通高约12.5米；单檐歇山，外檐柱头铺作双抄五铺作，转角用抹角栱；殿内减柱、移柱，梁架为“前四椽栿、后乳栿用三柱”。",
      "<b>年代</b>：寺存唐咸通八年（867）经幢、辽应历十六年（966）经幢与辽天庆四年（1114）铁钟；文殊殿通行定年966，1959年卢绳调查确认为辽构，1960年冯秉其、申天在《文物》发表。",
      "<b>装修与壁画</b>：正面三间格子门窗由辽、元、明、清、民国构件拼合，部分菱花格眼属辽代晚期，是现存最早的木窗装修实例之一；殿内辽代壁画明代被泥封，1960年代佛像被毁时意外重见。"
    ],
    "caption": [
      "阁院寺文殊殿线稿 · 面阔三间",
      "单檐歇山 · 辽代木构"
    ],
    "yearLabel": "966（通行定年）",
    "yearApprox": true
  },
  {
    "id": "dazu",
    "types": ["grotto"],
    "name": "大足石刻",
    "short": "大足石刻",
    "sub": "宝顶山千手观音",
    "dyn": "song",
    "tag": "南宋",
    "era": "南宋淳熙至淳祐",
    "year": 1200,
    "place": "重庆 · 大足",
    "placeKey": "dazu",
    "legacyNames": [
      "大足石刻"
    ],
    "legacyPlaces": [
      "大足",
      "重庆"
    ],
    "lede": "低眉合掌的观音居中，密集手臂向两侧和上方放射，持物与手势让石壁像一片展开的光轮。宝顶山第8龛千手观音属于南宋营造，金箔和彩绘又经历历代重装与现代修护。这里聚焦主尊和邻近手臂，近看沉静面容与繁密手势的对照，可以体会匠人怎样把佛教的救苦愿望化成可见形象。",
    "facts": [
      "主尊结跏趺坐，身旁和头顶上方雕出放射状手臂，手中多执法器。手势有伸屈和正侧之别，密集排列却围绕主像形成秩序，这一局部不代表整龛全景。",
      "第8龛营建于南宋淳熙至淳祐年间，属于赵智凤主持开凿的宝顶山石窟。现存饰金和彩绘包含后世重装与现代修复，不能把全部表层视为南宋原妆。",
      "千手与千眼表达观音回应不同苦难的慈悲与智慧，繁多持物也让信仰变得可感。雕石、贴金和彩绘共同作用，展现宋代石窟艺术及其持续维护的历史。"
    ],
    "caption": [
      "大足石刻 · 宝顶山千手观音",
      "南宋 · 主尊与放射手臂局部"
    ],
    "yearLabel": "南宋",
    "yearApprox": true
  },
  {
    "id": "anyue",
    "types": ["grotto"],
    "name": "安岳石刻",
    "short": "安岳石刻",
    "sub": "毗卢洞水月观音",
    "dyn": "song",
    "tag": "宋",
    "era": "宋代",
    "year": 1100,
    "place": "四川 · 资阳安岳",
    "placeKey": "anyue",
    "legacyNames": [
      "安岳石刻"
    ],
    "legacyPlaces": [
      "安岳",
      "资阳"
    ],
    "lede": "右腿屈起搭在荷叶上，左脚悬垂轻踏花蕊，左手撑叶，右手搭膝，上身微微侧向一边——这尊高约3米的观音坐得随意，像在水边歇脚。毗卢洞人称她紫竹观音，题材实为水月观音，宋代所刻，是国内少见的宋代石刻精品。毗卢洞始凿于五代后晋天福年间，北宋为四川密宗的重要道场，今存五个龛窟、四百六十五尊造像。图版只画这一尊。",
    "facts": [
      "<b>形制</b>：高浮雕坐像，高约3米，坐于弧形荷叶之上；右腿弯曲上翘、脚踏莲叶，左脚悬于莲台轻踏花蕊，左手抚撑叶面，右手置于膝上，上身稍向左侧，赤足，是宋代流行的“游戏坐”姿。",
      "<b>断代</b>：毗卢洞始凿于五代后晋天福年间，宋代为极盛期，此后至清代仍有续凿与历代妆彩；现存龛窟5个、造像465尊、碑刻题记32处。观音像一般定为北宋，四川省文物考古研究院则称主体开凿于南宋，两说并存。",
      "<b>价值</b>：毗卢洞是北宋四川佛教密宗的主要道场之一，洞内另有柳本尊“十炼”修行图与三百余浮雕小像。水月观音以舒展的坐姿与写实的衣纹被称为“东方维纳斯”，为国内罕见的宋代石刻精品；2001年列为全国重点文物保护单位。"
    ],
    "caption": [
      "安岳石刻 · 毗卢洞水月观音",
      "宋代 · 紫竹观音游戏坐"
    ],
    "yearLabel": "宋代",
    "yearApprox": true,
    "tall": true
  },
  {
    "id": "yuhuang",
    "types": ["pavilion"],
    "name": "蔚州玉皇阁",
    "short": "玉皇阁",
    "sub": "靖边楼",
    "dyn": "ming",
    "tag": "明",
    "era": "洪武十年始建",
    "year": 1377,
    "place": "河北蔚县 · 北城墙",
    "placeKey": "yuxian",
    "legacyNames": [
      "蔚县玉皇庙",
      "蔚县玉皇阁",
      "蔚州玉皇阁",
      "靖边楼"
    ],
    "legacyPlaces": [
      "蔚县",
      "蔚州"
    ],
    "lede": "靖边楼把玉皇信仰放在蔚州古城的北城垣上，也把两层楼阁做出了三道檐口。层间增加的腰檐，使屋顶与回廊形成连续的横线，登城所见的楼阁因而既有防边意味，也有庙宇的庄严。它始建于明初，现貌经过后世维修；读清楼层与檐层的区别，比单凭重檐判断高度更能理解这座建筑。",
    "facts": [
      "玉皇阁又名靖边楼，立在北城垣上，为两层、三檐的歇山琉璃顶楼阁；围廊将阁身包住，层间腰檐增加一道檐线，三檐并不等于三层可用楼面。",
      "河北省文物局记始建于明洪武十年，即一三七七年，檐下斗拱和用材比例保留明代特点；后世修缮与初建分别理解，不能把眼前每一构件都认作明初原件。",
      "阁与前院天王殿、后院钟鼓楼共同组成宗教院落，又借古城墙形成高处的城市标志；城防环境与玉皇祭祀在此相邻，使阁名中的靖边意味有了空间依托。"
    ],
    "caption": [
      "蔚州玉皇阁 · 正面",
      "三檐两层 · 面阔五间"
    ]
  },
  {
    "id": "jinci",
    "types": ["hall"],
    "name": "晋祠",
    "short": "晋祠",
    "sub": "圣母殿",
    "dyn": "song",
    "tag": "北宋",
    "era": "北宋崇宁元年重修",
    "year": 1102,
    "place": "山西 · 太原",
    "placeKey": "taiyuan",
    "legacyNames": [
      "晋祠",
      "晋祠博物馆"
    ],
    "legacyPlaces": [
      "太原",
      "晋源"
    ],
    "lede": "北宋天圣年间（1023—1032）为唐叔虞之母邑姜建的圣母殿，崇宁元年（1102）重修，是晋祠最老的建筑。殿面阔七间、重檐歇山，四周回廊环绕，前廊深两间，格外空阔；八根前檐柱上各盘一条木雕龙，是中国现存最早的木盘龙。殿内四十余尊宋塑侍女分列圣母两侧，各有所奉。图版所绘为圣母殿正面，鱼沼飞梁不在其内。",
    "facts": [
      "<b>形制</b>：面阔七间、进深六间（八架椽），重檐歇山，高约19米，近方形；“副阶周匝”，四周围廊，前廊深达两间；殿身减柱，仅留一排内柱；檐柱有侧脚与生起，上檐柱头六铺作双杪单下昂，下檐五铺作。前檐八柱各雕盘龙一条，龙与柱分别雕成后以榫卯拼合。",
      "<b>年代</b>：北宋天圣年间（1023—1032）创建，崇宁元年（1102）重修，殿上构件规格不一，反映前后多次营造；金大定八年（1168）殿前增建献殿；1993—1996年落架大修。殿内彩塑43尊，其中41尊为宋塑，2尊为明代补塑。",
      "<b>价值</b>：圣母殿、鱼沼飞梁、献殿合称“晋祠三宝”，殿前十字形的鱼沼飞梁是现存孤例；八根木盘龙为现存最早；宋塑侍女像与周柏、难老泉并称“晋祠三绝”。梁思成1934年《晋汾古建筑预查纪略》已记其考察。"
    ],
    "caption": [
      "晋祠 · 圣母殿",
      "北宋 · 七间重檐与八根盘龙柱"
    ],
    "yearLabel": "1102 重修"
  },
  {
    "id": "qingzhou",
    "types": ["pagoda"],
    "name": "庆州白塔",
    "short": "庆州白塔",
    "sub": "辽庆州城 · 释迦佛舍利塔",
    "dyn": "liao",
    "tag": "辽",
    "era": "辽 · 重熙十六至十八年",
    "year": 1049,
    "place": "内蒙古 · 巴林右旗",
    "placeKey": "qingzhou",
    "legacyNames": [
      "庆州白塔",
      "辽庆州白塔"
    ],
    "legacyPlaces": [
      "巴林右旗",
      "庆州",
      "赤峰"
    ],
    "lede": "草原平地上的白塔以七层八角楼阁向上收分，檐下砖雕斗栱与木椽交接，远观清晰的层次近看却布满细部。庆州白塔又称释迦佛舍利塔，于一〇四七年开建、一〇四九年竣工。它位于辽庆州城遗址西北部，塔上的佛教雕刻与修理时发现的经卷，把这座州城的信仰生活留在砖木之间。",
    "facts": [
      "白塔为八角七级砖木楼阁式塔，每层砖雕斗栱承托木质檐椽，门旁雕天王像；层层檐带与递收塔身共同组成轮廓，不能只把它当作一座素面砖塔。",
      "巴林右旗政府资料记重熙十六年开建、十八年竣工，即一〇四七至一〇四九年；塔处于辽庆州城西北部，所记营建年代属于塔体而非后来的州城重用阶段。",
      "一九八九年维修时发现秘藏经卷和小型木质法舍利塔，说明舍利塔不仅以佛像装饰外壁，也把经典和法物纳入内部，留下辽代佛教仪轨的实物线索。"
    ],
    "caption": [
      "辽庆州白塔",
      "八角七级，北立面"
    ],
    "tall": true
  },
  {
    "id": "hualin",
    "types": ["hall"],
    "name": "福州华林寺",
    "short": "华林寺",
    "sub": "大殿",
    "dyn": "song",
    "tag": "宋",
    "era": "北宋乾德二年 · 吴越营建",
    "year": 964,
    "place": "福建福州 · 鼓楼区 · 屏山南麓",
    "placeKey": "fuzhou",
    "legacyNames": [
      "华林寺",
      "福州华林寺"
    ],
    "legacyPlaces": [
      "福州"
    ],
    "lede": "长江以南现存最早的木构建筑，还是一座用“一等材”的小殿：面阔只有三间，斗拱却用上《营造法式》规定九至十一间大殿才可用的最大用材，栌斗硕大，殿身的屋面几乎全靠柱头上的斗拱撑起。乾德二年（964）福州尚属吴越，郡守鲍修让拆闽国宫殿旧料建此越山吉祥禅院，所以它既是北宋初，也是五代末。1980年代落架大修时，整座殿还向东移了十余米。",
    "facts": [
      "<b>形制</b>：面阔三间15.84米、进深四间14.70米，单檐歇山顶，八架椽屋前后乳栿用四柱；全殿仅18根柱（檐柱14、内柱4），柱头铺作七铺作双杪三下昂，材分硕大，殿内彻上露明造。",
      "<b>断代</b>：《淳熙三山志》记乾德二年建寺；1980年代大修时取样作碳14测定，构件年代普遍在千年以上。嘉庆、道光间曾扩为七间重檐，1984—1989年落架大修恢复三间单檐的早期形制，新址较原址东移14.6米。",
      "<b>比较</b>：按年代排在南禅寺、佛光寺等山西唐五代木构之后，是长江以南最古老的木构建筑，比宁波保国寺大殿早约半个世纪；中日学者多认为其梭柱、硕大斗拱等做法与日本镰仓时代的建筑有渊源。"
    ],
    "caption": [
      "华林寺大殿线稿 · 面阔三间",
      "单檐歇山 · 北宋乾德二年"
    ]
  },

  // Added visits and wishes requested for this personal collection.
  {
    "id": "xiaoxitian",
    "types": ["sculpture"],
    "initialStatus": "visited",
    "name": "隰县小西天",
    "short": "小西天",
    "sub": "满堂悬塑 · 千佛庵",
    "dyn": "ming",
    "tag": "明清",
    "era": "明末清初 · 悬塑",
    "year": 1650,
    "yearLabel": "明末清初",
    "yearApprox": true,
    "place": "山西隰县 · 凤凰山",
    "placeKey": "xixian",
    "lede": "大雄宝殿不到一百七十平方米，却塞进了近两千尊彩塑：主尊之上天宫楼阁层层升起，殿前勾栏平台上十二乐伎菩萨起舞，飞天、神鸟立在云头，大的三米多，小的只有拇指大。全部是泥塑贴金敷彩，悬在梁架与墙面之间，明末崇祯年间起手，清顺治年间完成。千佛庵本身只有一千一百余平方米，三分之二的殿堂做成两层。图版取中央主龛与天宫楼阁局部，不代表全殿。",
    "facts": [
      "<b>大雄宝殿</b>：面阔五间、进深六椽，单檐悬山顶，殿内面积不足170平方米；悬塑近两千尊，依附梁架、墙面与佛龛分层布置，最大者高3米余，最小可置于掌中。",
      "<b>纪年</b>：千佛庵为明末东明禅师创建，大雄宝殿悬塑始塑于崇祯年间，完成于清顺治年间，前后约三十年；寺院坐西朝东依山分上下两院，1996年列为全国重点文物保护单位。",
      "<b>格局</b>：全寺建筑面积仅1100余平方米，三分之二殿堂为双层，以洞为门分隔上院、中院与前院；上院有大雄宝殿、文殊殿、普贤殿等，下院有无量殿、韦陀殿、摩云阁与钟鼓楼。"
    ],
    "tall": true,
    "caption": [
      "小西天 · 大雄宝殿悬塑局部",
      "明末清初 · 主龛与天宫楼阁"
    ],
    "legacyNames": [
      "隰县小西天",
      "小西天",
      "千佛庵"
    ],
    "legacyPlaces": [
      "隰县"
    ]
  },
  {
    "id": "xuankong",
    "types": ["hall", "pavilion"],
    "initialStatus": "wishlist",
    "name": "浑源悬空寺",
    "short": "悬空寺",
    "sub": "绝壁楼阁 · 三教合一",
    "dyn": "ming",
    "tag": "明清",
    "era": "明清 · 现存遗构",
    "year": 1600,
    "yearLabel": "明清",
    "yearApprox": true,
    "place": "山西浑源 · 恒山金龙峡",
    "placeKey": "hunyuan",
    "lede": "整座寺挂在翠屏山半腰的内凹处，最高处离谷底九十余米。看着是几十根细木柱撑着，其实真正受力的是二十七根插进岩体的横梁，木柱多半只是陪衬。南北两座三层飞楼各高十余米，三面悬空，由两条仅容一人的栈道相连；北楼顶层的三教殿把释迦、孔子、老子请到一处。北魏创建的说法流传已久，现存四十间木构却都是明清重修的产物。图版所绘为南北二楼与栈道。",
    "facts": [
      "<b>构架</b>：寺底埋入27根直径约50厘米、经桐油浸泡的木梁，一端榫入岩体，另一端承托建筑并外伸约1米承接栈道；全寺40间，木构面积152.5平方米，南北两座飞楼三层九脊，外侧立十几米长的木柱。",
      "<b>沿革</b>：一说北魏太和十五年（491）孝文帝为迁天师道场而建，另有天兴元年（398）之说；金、明及清同治年间屡修，现存建筑多为明清重建；1978年大修更换承重横梁时重新确认了插梁结构。",
      "<b>三教</b>：主殿上层为三佛殿、太乙殿、关帝庙，南楼自下而上为纯阳宫、三官殿、雷音殿，北楼为四佛殿、三圣殿、三教殿，三教殿同龛供释迦牟尼、孔子、老子；1982年列为全国重点文物保护单位。"
    ],
    "caption": [
      "悬空寺 · 崖壁建筑群",
      "明清遗构 · 南北楼与凌空栈道"
    ],
    "legacyNames": [
      "浑源悬空寺",
      "悬空寺",
      "恒山悬空寺"
    ],
    "legacyPlaces": [
      "浑源",
      "恒山"
    ]
  },
  {
    "id": "yongan",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "name": "浑源永安禅寺",
    "short": "永安禅寺",
    "sub": "传法正宗殿",
    "dyn": "yuan",
    "tag": "元",
    "era": "元延祐二年",
    "year": 1315,
    "yearApprox": false,
    "place": "山西大同 · 浑源古城",
    "placeKey": "hunyuan",
    "lede": "传法正宗殿以五间宽的殿面和单檐庑殿顶，在浑源永安寺中占据核心位置。正面中央开门，两端墙上的大字与宽阔屋檐一起形成庄重的尺度，殿内又保存水陆法会壁画。寺院始建于金代，现存这座主殿由高璞在元延祐二年捐建，不能把全寺创建与殿堂营建混为一谈。木构与后世绘画共同构成所见空间，各自留下宗教活动与修葺的历史。",
    "facts": [
      "形制：传法正宗殿面阔五间、进深三间，采用单檐庑殿顶，建在较高台基上；前有月台与石阶，殿身宽阔，正面门墙和屋檐共同组织出主殿的空间等级。",
      "营建：永安寺始建于金代，火后又经元代重建，高璞于延祐二年捐建传法正宗殿；现存主殿是元代遗构，其他明清建筑与后来的修缮应作为不同阶段分别理解。",
      "壁画：殿内四壁绘水陆法会题材，人物群像兼有儒释道内容；它们与木构殿堂共同保存，但绘画制作、重绘和建殿并非同一事件，不能只据木殿年代判定全部画面。"
    ],
    "caption": [
      "传法正宗殿线稿 · 面阔五间",
      "单檐庑殿 · 元延祐二年"
    ],
    "legacyNames": [
      "浑源永安禅寺",
      "永安禅寺",
      "永安寺"
    ],
    "legacyPlaces": [
      "浑源"
    ]
  },
  {
    "id": "yuanjue",
    "types": ["pagoda"],
    "initialStatus": "wishlist",
    "name": "浑源圆觉寺",
    "short": "圆觉寺",
    "sub": "砖塔",
    "dyn": "liao",
    "tag": "金",
    "era": "金正隆三年",
    "year": 1158,
    "yearApprox": false,
    "place": "山西大同 · 浑源古城 · 石桥北巷",
    "placeKey": "hunyuan",
    "lede": "塔顶的铁凤凰至今还随风转头，是中国古塔上仅存的候风仪实物。圆觉寺这座八角九级密檐砖塔，据顺治《浑源州志》为金正隆三年（1158）僧玄真所建，高三十余米：四米高的基座上四层砖雕，第一层塔身开仿木门窗，其上七层密檐一气收紧，到第八、九层间距又放开，轮廓因此不呆板。",
    "facts": [
      "<b>形制</b>：八角九级密檐式砖塔，高30余米，通体砖仿木构；基座高约4米，四层砖雕自下而上为狮子兽面、莲瓣、乐伎舞伎（编钟、琵琶、排箫、腰鼓等十余种乐器）、仿木斗栱；第一层八面雕仿木门窗，北门有妇人半掩门浮雕，其上为连续七层密檐。",
      "<b>年代</b>：据顺治《浑源州志》，寺建于金正隆三年（1158），由僧人玄真主持筹建，塔为金代遗物，明清均有修缮；塔身未见纪年题记，年代从寺的创建年。1986年列山西省文物保护单位，2013年列全国重点文物保护单位，山西省政府已公布其保护规划。",
      "<b>价值</b>：大同地区唯一的金代密檐塔；塔刹铁凤凰可随风旋转指示风向，被视为中国古代唯一流传下来的候风仪实物。塔是浑源古城的地标，寺与城中永安寺有“小寺”“大寺”之称。1951年宿白《浑源古建筑调查简报》即重点记录了永安寺与圆觉寺两寺。"
    ],
    "tall": true,
    "caption": [
      "圆觉寺塔线稿 · 八角九级",
      "密檐式砖塔 · 金正隆三年"
    ],
    "legacyNames": [
      "浑源圆觉寺",
      "圆觉寺",
      "圆觉寺塔"
    ],
    "legacyPlaces": [
      "浑源"
    ]
  },
  {
    "id": "hunyuanwenmiao",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "name": "浑源文庙",
    "short": "浑源文庙",
    "sub": "大成殿",
    "dyn": "ming",
    "tag": "明",
    "era": "明代遗构",
    "year": 1472,
    "yearLabel": "明代遗构",
    "yearApprox": true,
    "place": "山西大同 · 浑源古城 · 永安西街",
    "placeKey": "hunyuan",
    "lede": "北岳脚下的浑源州学，大成殿是院里唯一压得住场面的建筑：五间宽、三间深的殿身覆黄绿琉璃，前檐明间、次间满装六抹格扇，两梢间却砌成厚实砖墙，殿后砖面刻着“忠孝节义”四个大字。州志记明成化八年（1472）大规模重建，现存大成殿一般视作明代遗构；殿内减去前槽金柱、檐下斗栱只用四铺作的做法，保留着更早的手感。图版所绘为大成殿正面。",
    "facts": [
      "<b>大成殿</b>：面宽五间27.6米、进深三间14.6米，单檐歇山顶覆黄绿琉璃瓦；檐下斗栱四铺作，明间、次间各施补间两朵，殿内前槽金柱减去；殿前月台长约13米、宽约6米、高约1.5米，中设二龙戏珠御路。",
      "<b>纪年</b>：清乾隆《浑源州志》记文庙始建于辽金以前，元初扩建，明成化八年（1472）大规模重建，至万历年间全部建成；国家文物局登记时代为明至清，大成殿本身没有确切落成纪年。",
      "<b>格局</b>：现存建筑沿中轴仅余戟门、大成殿、尊经阁与崇圣祠等，尊经阁下为砖砌窑洞、上为楼阁；殿后“忠孝节义”砖刻与近旁永安寺的砖雕题记风格相近，殿顶琉璃构件亦与永安寺基本一致。"
    ],
    "caption": [
      "文庙大成殿线稿 · 面阔五间",
      "单檐庑殿 · 现存明代遗构"
    ],
    "legacyNames": [
      "浑源文庙",
      "浑源文庙大成殿",
      "文庙"
    ],
    "legacyPlaces": [
      "浑源"
    ]
  },
  {
    "id": "gugong",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "name": "北京故宫",
    "short": "故宫",
    "sub": "太和殿",
    "dyn": "ming",
    "tag": "清",
    "era": "康熙重建",
    "year": 1697,
    "yearLabel": "1697年竣工",
    "yearApprox": false,
    "place": "北京 · 紫禁城",
    "placeKey": "beijing",
    "lede": "太和殿的威严，来自十一间殿面、重檐庑殿顶与三层汉白玉台基共同托出的高度。殿檐角的十只脊兽还把建筑等级写在屋顶上。今日所见大殿是康熙年间火灾后重建的成果，至康熙三十六年竣工，并非永乐初建的原殿。皇帝登极、大婚与节庆大典在此举行；这座紫禁城外朝的核心，承担的是隆重的国家礼仪，而非日常处理政务的场所。",
    "facts": [
      "形制：太和殿面阔十一间、进深五间，以重檐庑殿顶覆黄琉璃瓦，坐落在三层汉白玉台基上；宽阔殿面、高台与层叠屋檐共同构成紫禁城外朝最醒目的建筑轮廓。",
      "重建：太和殿前身始建于永乐十八年，康熙十八年遭雷火毁坏；康熙三十四年启动重建，至三十六年完成，现殿应以这次清代工程断代，而非沿用明代初建年份。",
      "等级：屋顶檐角排列十只脊兽，显示高规格殿宇的装饰制度；皇帝登极、大婚以及元旦、冬至等大典在此举行，空间的尺度服务于礼仪，并非每日办公的需要。"
    ],
    "caption": [
      "故宫 · 太和殿",
      "十一间面阔 · 重檐庑殿顶"
    ],
    "legacyNames": [
      "北京故宫",
      "故宫",
      "故宫博物院"
    ],
    "legacyPlaces": [
      "北京"
    ]
  },
  {
    "id": "taimiao",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "name": "北京太庙",
    "short": "太庙",
    "sub": "享殿 · 前殿",
    "dyn": "ming",
    "tag": "明",
    "era": "嘉靖复建",
    "year": 1545,
    "yearLabel": "1545年复建",
    "yearApprox": false,
    "place": "北京 · 天安门东侧",
    "placeKey": "beijing",
    "lede": "太庙享殿用十一间宽的殿面、六十八根楠木柱和三层汉白玉台基，为祭祖仪式搭起与皇宫大殿相称的空间。它是太庙最前面的主殿，帝后牌位在大祭时由后方移来，礼仪在这里展开。太庙与紫禁城同于永乐十八年初建，现有主体格局则承续嘉靖二十四年的复建。殿内的尺度与前后殿的分工，说明宗庙并非日常住宅，而是王朝礼制的建筑表达。",
    "facts": [
      "形制：享殿面阔十一间、进深六间，重檐庑殿顶覆黄琉璃瓦，下承三层汉白玉台基；殿内六十八根整材楠木柱支撑梁架，宽阔殿面与高台共同强化祭祀空间的等级。",
      "沿革：太庙于永乐十八年初建，嘉靖二十四年重建并恢复“同堂异室”的合祀制度；今日主体格局承续这次复建，初创年代与现存享殿所采用的断代应分别叙述。",
      "礼仪：享殿是举行祭祖大典的前殿，寝殿与祧庙承担安奉牌位的不同职责；祭前将牌位移入享殿神座，再行大祭，前后殿的次序因此对应着一套具体的礼仪行动。"
    ],
    "caption": [
      "北京太庙 · 享殿",
      "十一间面阔 · 三层须弥座"
    ],
    "legacyNames": [
      "北京太庙",
      "太庙",
      "太庙享殿"
    ],
    "legacyPlaces": [
      "北京"
    ]
  },

  // Further visits and wishlist entries, each with a researched plate.
  {
    "id": "jingtusi",
    "types": ["hall"],
    "initialStatus": "visited",
    "placeKey": "yingxian",
    "name": "应县净土寺",
    "short": "净土寺",
    "sub": "应县 · 大雄宝殿",
    "dyn": "liao",
    "tag": "金",
    "era": "金大定二十四年",
    "year": 1184,
    "yearLabel": "1184年重修",
    "place": "山西 · 朔州 · 应县",
    "lede": "净土寺大雄宝殿的精彩藏在头顶：藻井与微型天宫楼阁铺开在天花上，柱、栏、檐与斗栱都缩入精细的小木作。三间见方的金代殿堂外观并不高大，内部却以层层构件营造出另一座佛国建筑。寺院在金天会年间创建，大定二十四年重修，后来又经历多次整修。看这座殿，不只看承重梁柱，还可比较大木构架与装饰木作如何用不同尺度表现建筑。",
    "facts": [
      "空间：大殿面阔、进深各三间，采用单檐歇山顶；内部天花配以藻井与天宫楼阁，柱、栏和屋檐缩成小尺度构件，外观的朴素与室内的繁复形成鲜明对照。",
      "沿革：据《应州志》记载，净土寺金天会二年创建、大定二十四年重修，现存大雄宝殿为金代原构；明代又有大修，初创、重修与后世装修不能合并成一个年份。",
      "小木作：天宫楼阁并非可进入的楼房，而是附着于天花的建筑形象；细密构件把净土信仰中的楼阁转化为仰观的空间，也为研究金代室内装饰与木作技艺留下实物。"
    ],
    "caption": [
      "净土寺大雄宝殿正面 · 据实景照片重绘",
      "金大定二十四年重修（1184）· 三间单檐歇山顶"
    ],
    "legacyNames": [
      "应县净土寺",
      "净土寺"
    ],
    "legacyPlaces": [
      "应县"
    ]
  },
  {
    "id": "shisi",
    "types": ["hall"],
    "initialStatus": "visited",
    "placeKey": "jingning",
    "name": "景宁时思寺",
    "short": "时思寺",
    "sub": "大殿 · 山村元构",
    "dyn": "yuan",
    "tag": "元",
    "era": "元 · 至正十六年",
    "year": 1356,
    "yearLabel": "1356年",
    "place": "浙江景宁 · 大漈",
    "lede": "景宁大漈的时思寺大殿以重檐歇山屋顶立在山村古建之间，木构殿身与层叠出檐保留江南元代殿堂的气质。大殿纪年为至正十六年，与清代修建的三清殿、重修后的钟楼并不相同。寺院还关联梅氏宗族的祭祀与村落生活，使这座山村殿堂不仅是一件孤立古建筑，也成为理解当地宗教和家族记忆的入口。",
    "facts": [
      "形制：大殿为重檐歇山顶，位于钟楼和三清殿之间，以木构架承托上下两重檐口。它与寺内不同功能的建筑共同组成院落，单殿形制仍可独立辨认。",
      "断代：大殿建于元至正十六年，即一三五六年。寺院后在明清继续扩建，钟楼于清顺治三年重修，三清殿更晚，不能用大殿纪年概括整组现存建筑。",
      "价值：元代大殿与后世建筑在同一山村并存，呈现寺院逐步生长的过程。时思寺与梅氏宗族的联系，也使宗教空间和家族祭祀相互交织，保留地方生活的历史层次。"
    ],
    "caption": [
      "时思寺 · 大殿",
      "元至正十六年 · 重檐歇山"
    ],
    "legacyNames": [
      "丽水时思寺",
      "景宁时思寺",
      "时思寺"
    ],
    "legacyPlaces": [
      "丽水",
      "景宁"
    ]
  },
  {
    "id": "hongfu",
    "types": ["hall"],
    "initialStatus": "visited",
    "placeKey": "dingxiang",
    "name": "定襄洪福寺",
    "short": "洪福寺",
    "sub": "定襄 · 大雄宝殿",
    "dyn": "liao",
    "tag": "金",
    "era": "金代",
    "year": 1200,
    "yearLabel": "金代遗构",
    "yearApprox": true,
    "place": "山西 · 忻州 · 定襄",
    "lede": "洪福寺的大殿藏在高台堡墙之内，五间宽的悬山殿与外部围墙形成两种截然不同的尺度：外面像堡，里面仍是佛寺。现存大雄宝殿按金代遗构认识，确切建年未有题记证实。殿中砖砌佛坛上保留九尊泥塑，建筑、塑像与历代修葺的痕迹并置；看这里既可观察粗大的梁柱与屋檐，也要分清木殿断代和造像年代，不把整座寺院都归于一个年份。",
    "facts": [
      "形制：正殿面阔五间、七檩六椽，采用悬山顶，檐下设斗栱；寺院建在高土台上，四周筑堡墙，殿堂与围护共同构成既是宗教院落又有封闭外观的空间。",
      "断代：现存大雄宝殿属金代遗构，具体建造年未定；寺院创建也不能据传说强定，宋元明清及现代修葺应另作沿革，年表定位不表示全部木构同年完成。",
      "塑像：殿内砖砌佛坛上有九尊泥塑，主尊、菩萨、弟子与护法形成一组供奉关系；地方研究将其评价为宋代彩塑，造像的断代与金代殿宇须分别理解。"
    ],
    "caption": [
      "洪福寺大雄宝殿正面 · 据实景照片重绘",
      "金代遗构 · 面阔五间，单檐悬山顶"
    ],
    "legacyNames": [
      "定襄洪福寺",
      "洪福寺"
    ],
    "legacyPlaces": [
      "定襄"
    ]
  },
  {
    "id": "yanqing",
    "types": ["hall"],
    "initialStatus": "visited",
    "placeKey": "wutai",
    "name": "五台延庆寺",
    "short": "延庆寺",
    "sub": "五台 · 大佛殿",
    "dyn": "liao",
    "tag": "金",
    "era": "金代",
    "year": 1200,
    "yearLabel": "金代遗构",
    "yearApprox": true,
    "place": "山西 · 忻州 · 五台",
    "lede": "延庆寺大佛殿只有三间宽，灰瓦歇山屋顶的深远出檐却让小殿显得舒展。中央板门、两侧直棂窗与檐下斗栱，将木殿的柱网关系直接呈现在眼前。大殿按金代遗构断代，具体建年不详；寺中另有宋代石经幢，年代早于这座木构。把经幢与殿堂分开看，既能认识村寺长期延续的信仰，也不会将一件较早遗物的纪年误当作全部建筑的创建时间。",
    "facts": [
      "形制：大佛殿面阔三间、进深六椽，单檐歇山顶覆灰瓦；中央设板门，两侧直棂窗，柱间由阑额与普柏枋联结，宽大的屋檐由斗栱承托，形成小殿的舒展外观。",
      "断代：现存大佛殿为金代建筑，确切建造年不详；院中景祐二年的石经幢属北宋遗存，不能用经幢纪年替代殿堂断代，寺院不同遗物各自保存了历史线索。",
      "木作：柱头斗栱出单抄单下昂，补间斗栱还有斜栱，殿内梁架露明；站在檐下与殿内，可分别观察承檐和承屋的部件，让金代木构的受力关系成为可见的细节。"
    ],
    "caption": [
      "延庆寺大佛殿正面 · 五台善文村",
      "金代遗构 · 三间歇山顶，现状保留后世柱头兽面"
    ],
    "legacyNames": [
      "五台延庆寺",
      "延庆寺",
      "善文村延庆寺"
    ],
    "legacyPlaces": [
      "五台",
      "善文"
    ]
  },
  {
    "id": "yanfu",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "wuyi",
    "name": "武义延福寺",
    "short": "延福寺",
    "sub": "大殿 · 江南元构",
    "dyn": "yuan",
    "tag": "元",
    "era": "元 · 延祐四年重建",
    "year": 1317,
    "yearLabel": "1317年重建起",
    "place": "浙江武义 · 桃溪陶村",
    "lede": "延福寺大殿藏在武义桃溪的山村，舒展的重檐歇山屋顶下，木柱、月梁与斗栱共同撑开殿内空间。元代重建时保留了部分宋代构件，因而既有元构的整体，又能读到更早的营造手法。延祐四年是这次工程的起点，建成还历时数年。历代修缮没有抹去它的层次，使这座江南木殿成为研究宋元建筑延续的实例。",
    "facts": [
      "形制：大殿采用重檐歇山顶，檐下斗栱承托向外舒展的屋面。殿内可见梭形木柱与弓形月梁，柱、梁和铺作的组合构成不同于北方厚重殿堂的轻巧气质。",
      "断代：元延祐四年由僧人怀法、德环募资重建，历时七年，起年为一三一七年。殿中部分柱件保有宋代遗存，另有清代以来的修缮题记，不能视为单一年代的全新建筑。",
      "价值：宋代构件与元代重建框架共同保存在殿中，为观察江南木构传统的延续提供依据。梁思成与林徽因的调查又留下测绘和照片，使近代建筑研究与古殿保护相连接。"
    ],
    "caption": [
      "延福寺 · 大殿",
      "元延祐四年 · 重檐歇山"
    ],
    "legacyNames": [
      "武义延福寺",
      "延福寺"
    ],
    "legacyPlaces": [
      "武义"
    ]
  },
  {
    "id": "jinhuatianning",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "jinhua",
    "name": "金华天宁寺",
    "short": "天宁寺",
    "sub": "大殿 · 三间元构",
    "dyn": "yuan",
    "tag": "元",
    "era": "元 · 延祐五年",
    "year": 1318,
    "yearLabel": "1318年",
    "place": "浙江金华 · 古城",
    "lede": "金华天宁寺大殿以三间见方的体量，保存了江南宋元木构的细密层次。单檐歇山屋顶之下，梁与斗栱相互组合，殿内梁底的墨书又把元代重建落实到延祐五年。寺院更早的创建、殿中沿用的宋代构件和后世修理，应分别看待。今天的大殿虽只是旧寺的一部分，却仍让人从真实木材与题记中理解古代营造的传承。",
    "facts": [
      "形制：大殿面阔、进深各三间，平面近方，屋顶为单檐歇山。梁架采用梁与斗栱相结合的做法，外檐铺作托起屋面，把紧凑体量与较深出檐联系起来。",
      "断代：梁底墨书明确记载元延祐五年重建，即一三一八年。元代营建沿用部分宋代构件，现代又作落架维修，题记所记工程与今日全部材料的年代并不等同。",
      "价值：明确纪年的题记和存留的木构使这座殿堂具有可比较的研究依据。宋代旧件与元代重建相接，展示江南寺院在修葺中承续早期构造，而非每次重建都全数更新。"
    ],
    "caption": [
      "金华天宁寺 · 大殿",
      "元延祐五年 · 单檐歇山"
    ],
    "legacyNames": [
      "金华天宁寺",
      "天宁寺"
    ],
    "legacyPlaces": [
      "金华"
    ]
  },
  {
    "id": "taishique",
    "types": ["que"],
    "initialStatus": "wishlist",
    "placeKey": "dengfeng",
    "name": "登封太室阙",
    "short": "太室阙",
    "sub": "西阙 · 中岳庙神道阙",
    "dyn": "han",
    "tag": "东汉",
    "era": "元初五年",
    "year": 118,
    "yearLabel": "118年",
    "yearApprox": false,
    "place": "河南 · 登封",
    "lede": "中国现存最早的祭祀建筑不是殿，而是一对石阙。东汉元初五年（118），阳城长吕常在太室山庙前立起这对神道阙，把当时木构门阙的样子整个搬进石头：母阙旁贴着一座矮一截的子阙，阙顶刻出正脊、垂脊、瓦垅和椽子。图版所绘为西阙，它比东阙略高，通高3.96米，南面还留着篆书题额“中岳泰室阳城”。",
    "facts": [
      "<b>形制</b>：东西二阙相对，阙门间距6.75米；每阙由母阙与外侧较矮的子阙连成一体，自下而上为阙基、阙身、阙顶。西阙通高3.96米，阙身叠砌八层石条，阙顶仿庑殿屋面，雕出正脊、垂脊、瓦垅与椽子。",
      "<b>纪年</b>：西阙北面子阙檐下刻隶书铭记二十七行、每行七字，记东汉元初五年（118）阳城长吕常等建阙的缘由；西阙南面上部阳刻篆书“中岳泰室阳城”六字。1971年用散落的阙顶残石修复了东阙顶部。",
      "<b>价值</b>：与少室阙、启母阙并称中岳汉三阙（118—123），是中国仅存的汉代庙阙。阙身减地平雕车马出行、马戏、斗鸡、杂技、楼阁与青龙白虎等画像，2010年随登封“天地之中”历史建筑群列入世界遗产。"
    ],
    "tall": true,
    "caption": [
      "太室阙 · 西阙南面",
      "东汉元初五年"
    ],
    "legacyNames": [
      "太室阙",
      "登封太室阙"
    ],
    "legacyPlaces": [
      "登封"
    ]
  },
  {
    "id": "shaoshique",
    "types": ["que"],
    "initialStatus": "wishlist",
    "placeKey": "dengfeng",
    "name": "登封少室阙",
    "short": "少室阙",
    "sub": "西阙 · 少室山神道阙",
    "dyn": "han",
    "tag": "东汉",
    "era": "汉安帝时期",
    "year": 123,
    "yearLabel": "约123年",
    "yearApprox": true,
    "place": "河南 · 登封",
    "lede": "三阙里画像最密的一座。少室阙是少室山庙的神道阙，与太室阙同为二重子母阙，但阙身四面刻满了七十余幅画面：赛马、蹴鞠、驯象、斗鸡、犬逐兔、玄鸟生商……东汉人把一场山神祭祀的热闹都刻了进去。阙铭无确切纪年，依人名与太室、启母二阙相同，推在118至123年之间；郑州市文物局径记延光二年（123）。图版所绘为西阙。",
    "facts": [
      "<b>形制</b>：东西二阙相距7.60米，皆为二重子母阙，由阙基、阙身、阙顶三部分构成，以青灰色块石砌筑；西阙通高3.75米，东阙通高3.37米，阙顶残损较重。1972年按原状修复。",
      "<b>纪年</b>：铭文大多剥蚀，仅西阙北面篆书题额“少室神道之阙”六字与子阙檐下“郡阳城县，兴治神道”等隶书题名可辨。因铭中人名与太室、启母二阙相同，推定建于118—123年间；郑州市文物局记为延光二年（123）。",
      "<b>画像</b>：阙身四面存画像七十余幅，题材有车马出行、宴饮、羽人、四灵、兽斗、击剑、狩猎、驯象、斗鸡、蹴鞠、月宫等，以马戏图与狩猎图最为出众。它是三阙中保存画像最多的一座，与太室阙、启母阙并为中国仅存的汉代庙阙。"
    ],
    "tall": true,
    "caption": [
      "少室阙 · 西阙南面",
      "东汉子母阙"
    ],
    "legacyNames": [
      "少室阙",
      "登封少室阙"
    ],
    "legacyPlaces": [
      "登封"
    ]
  },
  {
    "id": "qimuque",
    "types": ["que"],
    "initialStatus": "wishlist",
    "placeKey": "dengfeng",
    "name": "登封启母阙",
    "short": "启母阙",
    "sub": "西阙 · 启母庙神道阙",
    "dyn": "han",
    "tag": "东汉",
    "era": "延光二年",
    "year": 123,
    "yearLabel": "123年",
    "yearApprox": false,
    "place": "河南 · 登封",
    "lede": "大禹之妻化石生启的传说，在汉代被建成一座庙；庙早已不存，庙前的神道阙却立到今天。启母阙由颍川太守朱宠建于延光二年（123），阙身刻着夏禹化熊、郭巨埋儿、驯象、幻术和一幅女子蹴鞠，阙顶残存的瓦垅与瓦当仍是汉代屋面的直接样本。图版所绘为西阙南面，背面那两方讲治水与请雨的阙铭不在画中。",
    "facts": [
      "<b>形制</b>：东西二阙相距6.8米，西阙高3.17米、东阙高3.18米。西阙阙基为两层石板，阙身七层石块垂直叠砌、总高2.75米，上承斗形石与阙顶；阙顶残损严重，残存部分雕四阿顶的瓦垅、垂脊、柿蒂纹瓦当与板瓦，正脊已毁。",
      "<b>纪年</b>：西阙北面存两方阙铭。《启母阙铭》篆书，记延光二年（123）颍川太守朱宠建阙并颂夏禹治水之功；其下《请雨铭》隶书，堂溪典撰，十八行每行五字，今存十一行。汉代避景帝刘启讳，曾改称开母庙、开母阙。",
      "<b>画像</b>：阙身雕马技、骑马出行、杂技、幻术、驯象、郭巨埋儿、夏禹化熊、果下马、狩猎、虎逐鹿、双蛟、月宫等，其中的女子蹴鞠图常被引为蹴鞠在汉代流行的实物证据。阙北190米处即传为涂山氏所化的“启母石”。"
    ],
    "tall": true,
    "caption": [
      "启母阙 · 西阙南面",
      "残存阙顶 · 东汉石刻"
    ],
    "legacyNames": [
      "启母阙",
      "后母阙",
      "後母阙",
      "登封启母阙"
    ],
    "legacyPlaces": [
      "登封"
    ]
  },
  {
    "id": "songyue",
    "types": ["pagoda"],
    "initialStatus": "wishlist",
    "placeKey": "dengfeng",
    "name": "登封嵩岳寺塔",
    "short": "嵩岳寺塔",
    "sub": "十二边形密檐砖塔",
    "dyn": "bei",
    "tag": "北魏",
    "era": "北魏晚期",
    "year": 520,
    "yearLabel": "6世纪初",
    "yearApprox": true,
    "place": "河南 · 登封",
    "lede": "中国现存最早的砖塔，也是唯一一座十二边形的密檐塔。十五层砖檐自下而上逐层内收，连成一条抛物线，梁思成称其“秀美异常”；上部塔身四面开券门，其余八面各砌一座塔形龛，莲瓣形门楣与饰火焰宝珠的柱头都带着印度与西域造型的影子。塔属北魏晚期：传统记正光年间（520—525），郑州市文物局则记永平二年（509）始建，刻有正光四年年号的造像曾出自塔下地宫。",
    "facts": [
      "<b>形制</b>：十二边形密檐式砖塔，青砖黏土砌筑，通高约37—40米（郑州市文物局记37.045米，1980年代勘测记39.8米），底层直径10.6米。塔身上段四面辟券门、八面砌塔形龛，转角立八边形倚柱；其上十五层叠涩密檐逐层内收，顶部为砖砌塔刹。",
      "<b>年代</b>：北魏晚期建成，传统记正光年间（520—525），郑州市文物局记永平二年（509）始建。1986年地宫出土带“正光四年”（523）发愿文的释迦造像；外露塔砖曾因大火二次加热，热释光测年得出唐代数据，1996年遂有“建于唐代”之说，后被否定。",
      "<b>影响</b>：此前未发现更早的密檐塔，嵩岳寺塔被视为中国密檐式塔的原型；塔刹内两座天宫藏有舍利罐与银塔。1961年列为第一批全国重点文物保护单位，2010年随登封“天地之中”历史建筑群列入世界遗产。"
    ],
    "tall": true,
    "caption": [
      "嵩岳寺塔 · 正面",
      "十二边形 · 十五层密檐"
    ],
    "legacyNames": [
      "登封嵩岳寺塔",
      "嵩岳寺塔",
      "嵩岳寺"
    ],
    "legacyPlaces": [
      "登封",
      "嵩山"
    ]
  },
  {
    "id": "yongle",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "ruicheng",
    "name": "芮城永乐宫",
    "short": "永乐宫",
    "sub": "三清殿 · 无极殿",
    "dyn": "yuan",
    "tag": "元",
    "era": "蒙元 · 中统三年",
    "year": 1262,
    "yearApprox": false,
    "place": "山西芮城 · 古魏镇",
    "lede": "三清殿的长檐从两侧缓缓挑起，巨大的琉璃龙吻守在正脊两端。殿内《朝元图》把数百神祇排列成恢宏行列，元代木构与壁画在同一空间相互映照。",
    "facts": [
      "<b>七间庑殿</b>：三清殿又名无极殿，是永乐宫主殿，面阔七间、单檐庑殿顶，按中统三年（1262）纪年。",
      "<b>朝元图</b>：殿内壁画绘成于1325年，与建筑营造年代分别记录。",
      "<b>迁建保护</b>：为配合三门峡水库工程，20世纪60年代宫殿和壁画迁至现址，保存了原有殿宇与壁画。"
    ],
    "caption": [
      "永乐宫 · 三清殿正面",
      "七间庑殿 · 中统三年"
    ],
    "legacyNames": [
      "芮城永乐宫",
      "永乐宫"
    ],
    "legacyPlaces": [
      "芮城",
      "运城"
    ]
  },
  {
    "id": "jiwang",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "wanrong",
    "name": "万荣稷王庙",
    "short": "稷王庙",
    "sub": "正殿 · 无梁殿",
    "dyn": "song",
    "tag": "宋",
    "era": "北宋遗构",
    "year": 1023,
    "yearLabel": "北宋",
    "yearApprox": true,
    "place": "山西万荣 · 南张乡 · 太赵村",
    "lede": "低展的庑殿屋顶覆盖五间立面，深廊将祭祀空间围在其中。这里奉祀农耕始祖后稷，正殿以不设通长大梁的构架，留下北宋营造的一种独特解法。",
    "facts": [
      "<b>北宋遗构</b>：官方资料将正殿定为北宋建筑，记庙宇始创不晚于天圣元年（1023）。",
      "<b>五间庑殿</b>：正殿面阔五间，采用单檐庑殿顶，柱头与补间铺作承托深檐。",
      "<b>无梁殿</b>：俗称源自殿内没有通长大梁，仍是木构梁架，并非砖石无梁殿。2001年列入第五批全国重点文物保护单位。"
    ],
    "caption": [
      "万荣稷王庙 · 正殿",
      "五间庑殿 · 北宋遗构"
    ],
    "legacyNames": [
      "万荣稷王庙",
      "稷王庙"
    ],
    "legacyPlaces": [
      "万荣"
    ]
  },
  {
    "id": "guangren",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "ruicheng",
    "name": "芮城广仁王庙",
    "short": "广仁王庙",
    "sub": "芮城 · 龙王殿",
    "dyn": "tang",
    "tag": "唐",
    "era": "唐大和年间",
    "year": 832,
    "yearLabel": "832年 · 唐代木构",
    "place": "山西 · 运城 · 芮城",
    "lede": "全国仅存的三座唐代木构里，这是唯一一座不是佛殿的——一座祈雨的龙王庙正殿。它立在古魏城残垣旁的高台上，面阔五间却只有十一米多宽，进深四椽，殿内一根柱子也没有；柱头斗拱双杪偷心、不设补间，阑额直接压在柱头上，不用普拍枋。唐大和六年（832）的《龙泉记》碑记下了那次重修。",
    "facts": [
      "<b>形制</b>：正殿面阔五间、进深四椽，通面阔仅11.47米、进深4.92米，稍间不及次间之半；单檐歇山，十六根檐柱，殿内无柱，四椽栿通檐；柱头五铺作双杪偷心造，无补间、无令栱，阑额不出头、不用普拍枋。",
      "<b>年代</b>：殿旁原嵌唐碑两通：元和三年（808）《广仁王龙泉记》记县令引泉灌田，大和六年（832）《龙泉记》记重修庙宇，现存正殿据此与构架特征定为唐构。1958年修缮曾锯短前檐椽、改动墙体；2013—2014年落架大修。",
      "<b>价值</b>：现存三座唐代木构中唯一的道教庙殿，也是中国最早的道庙建筑。宋大观二年（1108）诏封五龙为王，青龙称“广仁王”，庙名由此而来，当地仍俗称五龙庙；庙前土崖下原有五龙泉涌出。"
    ],
    "caption": [
      "广仁王庙正殿正面 · 据实景照片重绘",
      "唐代木构 · 五间单檐歇山顶，墙面及屋面历经修缮"
    ],
    "legacyNames": [
      "运城广仁王庙",
      "芮城广仁王庙",
      "广仁王庙",
      "五龙庙"
    ],
    "legacyPlaces": [
      "运城",
      "芮城"
    ]
  },
  {
    "id": "feiyun",
    "types": ["pavilion"],
    "initialStatus": "wishlist",
    "placeKey": "wanrong",
    "name": "万荣东岳庙",
    "short": "飞云楼",
    "sub": "飞云楼",
    "dyn": "ming",
    "tag": "清",
    "era": "乾隆十一年重修",
    "year": 1746,
    "yearLabel": "1746年重修",
    "yearApprox": false,
    "place": "山西 · 万荣",
    "lede": "万荣县城这座三层木楼高23.19米，四根通天柱从底层直贯楼顶，周身345组斗栱、32个翘起的檐角层层外挑，远看如云簇楼身，“飞云”由此得名；楼身不施彩画，露着木料本色。它立在东岳庙中轴最前端，创建年代不详，明万历四十五年（1617）已有重修碑，现状为清乾隆十一年（1746）重修后的样貌。图版所绘为飞云楼正面。",
    "facts": [
      "<b>形制</b>：平面正方，面阔进深各五间，明三层暗五层，三层四滴水，顶为十字歇山；二、三层四面各出歇山抱厦，下设平座。全楼榫卯相接不用铁钉，四根柏木通天柱直径0.7米、高逾15米。",
      "<b>纪年</b>：乾隆《重修飞云楼碑记》称唐贞观元年已有东岳庙；楼本身创建年代不详，明万历四十五年（1617）与清乾隆十一年（1746）两次重修皆有碑记，现状以后者为准。1988年列为全国重点文物保护单位。",
      "<b>评价</b>：柴泽俊称其“在我国现存古代楼阁式建筑中居重要地位”，与应县木塔并称山西“南楼北塔”；楼后午门、献殿为元构，正殿东岳大帝殿石柱有明正统、正德题记，图版未绘。"
    ],
    "tall": true,
    "caption": [
      "东岳庙 · 飞云楼",
      "三层四滴水 · 南立面"
    ],
    "legacyNames": [
      "万荣东岳庙",
      "东岳庙",
      "飞云楼",
      "万荣飞云楼"
    ],
    "legacyPlaces": [
      "万荣"
    ]
  },
  {
    "id": "qiufeng",
    "types": ["pavilion"],
    "initialStatus": "wishlist",
    "placeKey": "wanrong",
    "name": "万荣后土祠",
    "short": "秋风楼",
    "sub": "秋风楼",
    "dyn": "ming",
    "tag": "清",
    "era": "清 · 同治九年重建",
    "year": 1870,
    "yearLabel": "1870年重建",
    "yearApprox": false,
    "place": "山西万荣 · 荣河镇 · 庙前村",
    "lede": "汉武帝在汾阴祭后土，泛舟汾河作《秋风辞》，两千年后这座楼仍以此命名。楼立在后土祠最北端十六米见方的砖石台基上，三层，高三十二米余，四面回廊，十字歇山顶；台基东西贯通如过街门楼，门额东“瞻鲁”、西“望秦”。黄河屡次改道，祠庙一再东迁，现址为清同治九年（1870）知县戴儒珍迁建，秋风楼也在此时移到庙后。图版所绘为秋风楼正面。",
    "facts": [
      "<b>形制</b>：台基16米见方，楼身三层，高32.6米（一说33米），面阔进深各五间，十字歇山顶，各层设回廊，挑角上各置武士塑像；台基南门内墙上小龛题“扫地坛”，楼内自下而上分藏现代、清代、元代《秋风辞》刻石。",
      "<b>沿革</b>：元代建秋风亭于庙后，藏至元八年（1271）《秋风辞》碑；明隆庆中亭没于汾水，改建楼于庙前；清康熙元年（1662）河决楼没，次年移建；同治元年（1862）再毁，九年（1870）迁建今址。据《光绪荣河县志》。",
      "<b>背景</b>：汾阴后土祠是汉武帝所立皇帝祭地的本庙，汉、唐、宋多位皇帝亲祀；金天会十五年（1137）庙貌图碑刻出北宋扩建后的庙制。今祠除元代山门外多为晚清所建，1996年列为全国重点文物保护单位。"
    ],
    "tall": true,
    "caption": [
      "后土祠 · 秋风楼正面",
      "三层楼阁 · 清代重建"
    ],
    "legacyNames": [
      "万荣后土祠",
      "后土祠",
      "后土庙",
      "秋风楼",
      "万荣秋风楼"
    ],
    "legacyPlaces": [
      "万荣"
    ]
  },
  {
    "id": "huanghuatan",
    "types": ["pagoda"],
    "initialStatus": "wishlist",
    "placeKey": "chaoyang",
    "name": "黄花滩塔",
    "short": "黄花滩塔",
    "sub": "大平房镇 · 西塔山",
    "dyn": "liao",
    "tag": "辽",
    "era": "辽代",
    "year": 1050,
    "yearLabel": "辽代",
    "yearApprox": true,
    "place": "辽宁 · 朝阳",
    "lede": "山顶的黄花滩塔以长塔身和紧密叠起的砖檐，遥望山下的辽代建州城址。八角实心塔的十三层檐向上收束，厚重基座与瘦长塔身形成对照，砖雕又将佛教图像留在墙面。它属于辽代，具体建成年份仍待考；塔旁延续的转塔风俗，让这座古塔也保有地方生活的记忆。",
    "facts": [
      "塔为八角实心十三层密檐式砖塔，台座、塔身与连续叠檐层层相接。观察砖砌轮廓与佛像等装饰，可看到辽代匠人如何把木构形式和佛教图像转入塔壁。",
      "黄花滩塔断为辽代建筑，确切营建年份尚未明确。它所在山丘与附近建州城址相互联系，但古城的迁建年代不能直接当作这座塔的建成时间。",
      "当地农历四月十五日的转塔活动，包含绕塔礼拜与聚会祈福等习俗。古塔因此既是辽代建筑遗存，也与周边居民持续传承的民俗生活发生联系。"
    ],
    "tall": true,
    "caption": [
      "黄花滩塔 · 辽宁朝阳",
      "十三层密檐 · 修缮后现貌"
    ],
    "legacyNames": [
      "黄花滩塔",
      "朝阳黄花滩塔"
    ],
    "legacyPlaces": [
      "朝阳",
      "辽宁"
    ]
  },
  {
    "id": "mimi",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "fanshi",
    "name": "繁峙秘密寺",
    "short": "秘密寺",
    "sub": "文殊殿 · 秘魔岩",
    "dyn": "ming",
    "tag": "清",
    "era": "清代遗构",
    "year": 1700,
    "yearLabel": "清代",
    "yearApprox": true,
    "place": "山西繁峙 · 岩头乡 · 秘魔岩",
    "lede": "五台山台怀镇西南三十八公里，维屏山秘魔岩下的这座寺，旧有“朝五台不朝龙洞只朝了半座五台山”之说。寺传始于北齐，唐木叉和尚在此建寺，盛于唐宋，寺外尚存唐建明修的木叉祖师塔与北汉天会七年（963）的玄觉大师塔；殿宇本身却是清代重建，前、中两院正殿皆五间。图版所绘为文殊殿正面：五间带前廊，中央台阶通向高起的殿基，廊板与殿内留有清代绘画。",
    "facts": [
      "<b>文殊殿</b>：图版所见面阔五间、前檐出廊、硬山顶，立于高起的殿基上，中央石阶登殿；寺内前院正殿、中院正殿皆为五间，南北藏经楼各五楹，后院仅存北阁五楹。",
      "<b>纪年</b>：《清凉山志》载唐木叉和尚于秘密岩藏修始建寺，一说北齐已有比丘尼结庵；原有茅蓬三十二处，现存前院、中院、后院与西庵、中庵；国家文物局登记时代为清，2006年列为全国重点文物保护单位。",
      "<b>石作</b>：寺前有金代石幢与两座砖塔，木叉祖师塔唐建明修、六角四层、高约10米，玄觉大师塔建于北汉天会七年（963）、六角两层；中庵金佛楼内石雕接引佛高约7米，为明嘉靖十四年（1535）造。"
    ],
    "caption": [
      "秘密寺 · 文殊殿正面",
      "五间硬山 · 清代遗构"
    ],
    "legacyNames": [
      "繁峙秘密寺",
      "秘密寺",
      "秘魔寺",
      "秘魔岩"
    ],
    "legacyPlaces": [
      "繁峙"
    ]
  },
  {
    "id": "gongzhu",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "fanshi",
    "name": "繁峙公主寺",
    "short": "公主寺",
    "sub": "繁峙 · 大雄宝殿",
    "dyn": "ming",
    "tag": "明",
    "era": "明弘治十六年",
    "year": 1503,
    "yearLabel": "1503年重修",
    "yearApprox": false,
    "place": "山西 · 忻州 · 繁峙",
    "lede": "公主村里这座以北魏公主命名的小寺，看点不在外表：大雄宝殿只有三间，悬山顶，檐下连斗栱都省了，殿内四壁却满绘明代水陆画，佛、菩萨、天神与道教诸神分层赴会，是一堂完整的明代水陆壁画。寺传为北魏文成帝第四女诚信公主所建，现存殿宇以明弘治十六年（1503）重修为纪年，大雄宝殿与前方过殿是寺内仅存的明构。图版所绘为大雄宝殿正面，壁画在殿内。",
    "facts": [
      "<b>大雄宝殿</b>：面阔三间、进深六椽，单檐悬山顶，檐下不施斗栱；前方过殿面阔、进深各三间，单檐歇山顶，斗栱五铺作，两殿同为寺内仅存的明代建筑。",
      "<b>纪年</b>：寺传为北魏文成帝第四女诚信公主所建，明弘治十六年（1503）重修，国家文物局登记时代为明至清；寺坐北朝南，三进院落，占地4347平方米，建筑面积1116平方米。",
      "<b>壁画</b>：大雄宝殿内保存明代水陆壁画，佛教与道教神祇同绘一堂；东西两侧的伽蓝殿、马王殿、财神殿、二郎殿等均为清代所建，与殿内壁画分属不同时期。"
    ],
    "caption": [
      "公主寺大雄宝殿正面 · 据实景照片重绘",
      "明弘治十六年（1503）重修 · 三间单檐悬山顶，檐下无斗栱"
    ],
    "legacyNames": [
      "繁峙公主寺",
      "公主寺"
    ],
    "legacyPlaces": [
      "繁峙"
    ]
  },
  {
    "id": "yanshan",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "fanshi",
    "name": "繁峙岩山寺",
    "short": "岩山寺",
    "sub": "繁峙 · 文殊殿",
    "dyn": "liao",
    "tag": "金",
    "era": "金代，元代重修",
    "year": 1167,
    "yearLabel": "金代遗构 · 元代重修",
    "yearApprox": true,
    "place": "山西 · 忻州 · 繁峙",
    "lede": "文殊殿外观是一座五间宽的金代佛殿，走入其中却能看见另一种尺度：壁画里的城郭、宫殿与市井，铺开了佛教故事中的人间生活。画师王逵等人在金大定七年完成壁画，木构后来又有元代重修。单檐歇山顶、宽大的斗栱与四壁绘画共同保存下来，使岩山寺既能从梁架读营造，也能从画中读建筑与社会；二者的年代线索各有依据。",
    "facts": [
      "木构：文殊殿面阔五间、进深六椽，采用单檐歇山顶，斗栱仅出一跳，为四铺作；殿内梁架与承托屋檐的构件仍保留金代遗构的尺度，形制简洁而有力。",
      "题记：文殊殿为金代遗构，四椽栿下留有元延祐二年的重建题记，是后世修葺的证据；壁画则完成于金大定七年，不能把画成、建殿与重修视作同一事件。",
      "壁画：西壁绘佛传，东壁画须阇提太子的故事，北壁还有塔院与海难场景；其中的殿阁、城街与人物活动，让宗教绘画同时成为理解宋金建筑和社会生活的材料。"
    ],
    "caption": [
      "岩山寺文殊殿正面 · 据实景照片重绘",
      "金代遗构，元延祐二年（1315）重修 · 五间单檐歇山顶"
    ],
    "legacyNames": [
      "繁峙岩山寺",
      "岩山寺"
    ],
    "legacyPlaces": [
      "繁峙"
    ]
  },
  {
    "id": "quanzhouwenmiao",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "quanzhou",
    "name": "泉州府文庙",
    "short": "泉州文庙",
    "sub": "大成殿 · 宋式清构",
    "dyn": "ming",
    "tag": "清",
    "era": "清 · 乾隆二十六年",
    "year": 1761,
    "yearLabel": "1761年",
    "place": "福建泉州 · 鲤城",
    "lede": "一座地方府学的大成殿，用的却是重檐庑殿顶、黄琉璃瓦和盘龙石柱——这在全国文庙里极为罕见。文庙北宋太平兴国初年迁到今址，绍兴七年（1137）重建后形成左学右庙的格局；大成殿咸淳年间重建，今殿大修于乾隆二十六年（1761），柱网、梁架与真昂斗拱仍保持十二世纪的做法。殿前六根浮雕盘龙檐柱，当地称“六龙捧圣”。",
    "facts": [
      "<b>形制</b>：面阔七间、进深五间，建筑面积约801平方米，重檐庑殿顶覆黄色琉璃瓦；殿身由48根白石圆柱承托，柱网为内外两排的“双槽”，前檐六根浮雕盘龙檐柱，殿内另有两根盘龙金柱；铺作内外用真昂，梁架通饰彩绘，屋脊饰剪瓷雕。",
      "<b>断代</b>：北宋太平兴国初迁建今址，南宋绍兴七年（1137）重建；大成殿咸淳年间（1265—1274）重建，现殿为清乾隆二十六年（1761）大修所成，仍保留宋代结构特点。2014—2015年按原形制、原材料修缮，被评为2020年度全国优秀古迹遗址保护项目。",
      "<b>价值</b>：泉州府文庙及学宫是宋元泉州官员与士人群体的象征，建筑规模为中国东南七省文庙之冠；殿前月台须弥座束腰尚存宋代青石浮雕卷草。2021年作为“泉州：宋元中国的世界海洋商贸中心”遗产点之一列入世界遗产。"
    ],
    "caption": [
      "泉州府文庙 · 大成殿",
      "清乾隆二十六年 · 保留宋式重檐庑殿"
    ],
    "legacyNames": [
      "泉州文庙",
      "泉州府文庙",
      "文庙"
    ],
    "legacyPlaces": [
      "泉州"
    ]
  },
  {
    "id": "quanzhoukaiyuan",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "quanzhou",
    "name": "泉州开元寺",
    "short": "开元寺",
    "sub": "大雄宝殿 · 百柱殿",
    "dyn": "ming",
    "tag": "明",
    "era": "明 · 崇祯十年重修",
    "year": 1637,
    "yearLabel": "1637年",
    "place": "福建泉州 · 西街",
    "lede": "正面九间、重檐歇山，是中国佛殿里最高的形制。殿内本应立百根石柱，为了给巨大的五方佛和礼拜空间让位，减去中部两排十四根，剩八十六根，“百柱殿”之名却留了下来。更特别的是柱头上的二十四尊飞天乐伎斗拱——人身羽翅鸟腿的迦陵频伽，手执乐器或文房，既是承托梁架的构件，也是佛前乐舞的场面。现状形制定于崇祯十年（1637）郑芝龙等人的重建。",
    "facts": [
      "<b>形制</b>：面阔九间、进深六间，建筑面积约1388平方米，重檐歇山顶，通高约20米；殿堂式构架，中部减去两排共14根柱，殿内尚存石柱86根，斗拱76朵；中部两排石柱与梁架相接处雕成24尊飞天乐伎。",
      "<b>沿革</b>：唐垂拱二年（686）始建，构架比例大部承袭南宋绍兴二十五年（1155）重建之制，洪武二十二年（1389）增扩外檐，崇祯十年（1637）郑芝龙等重建成现状。月台须弥座束腰嵌73方狮子与人面狮身石刻，系明代重修时从元末废弃的印度教寺移来。",
      "<b>多元</b>：殿内按密宗规仪供奉五方佛，各高6米；后廊檐下两根印度教石柱亦为1637年重修时移用，24幅圆浮雕中9幅刻毗湿奴、克里希那等神话。佛寺重修竟用印度教构件，是泉州港多元文化最直观的物证。"
    ],
    "caption": [
      "泉州开元寺 · 大雄宝殿",
      "明崇祯十年重修 · 九间百柱殿"
    ],
    "legacyNames": [
      "泉州开元寺",
      "开元寺"
    ],
    "legacyPlaces": [
      "泉州"
    ]
  },
  {
    "id": "fuzhouwuta",
    "types": ["pagoda"],
    "initialStatus": "wishlist",
    "placeKey": "fuzhou",
    "name": "福州乌塔",
    "short": "乌塔",
    "sub": "崇妙保圣坚牢塔",
    "dyn": "zhou",
    "tag": "五代",
    "era": "闽 · 永隆年间",
    "year": 944,
    "yearLabel": "941—944年",
    "yearApprox": false,
    "place": "福建福州 · 鼓楼区 · 乌山东麓",
    "lede": "九层的计划只盖到七层：闽永隆三年（941）王延羲称帝，在乌山东麓唐代无垢净光塔的旧址上起塔，三年后他在政变中被杀，工程停在第七层。塔身全用花岗石砌成，叠涩出檐，层层平座围出一圈可以绕行的窄廊，石面风化发黑，福州人叫它乌塔。四层东壁嵌着塔名碑，上款仍是王曦的名号。",
    "facts": [
      "<b>形制</b>：八角七层楼阁式花岗石塔，通高34.74米，塔基埋入地表近2米，地上高32.86米；每层叠涩出檐、设平座栏板回廊，八角翘脊端各坐一尊镇塔佛，七层共56尊，顶为铁葫芦刹。",
      "<b>题记</b>：四层东壁嵌黑色页岩塔名碑“崇妙保圣坚牢之塔”，上款功德主王曦名号42字、下款监造官员80字；五层南壁嵌塔记，七层南壁嵌闽国王室官员祈福题名碑。塔东南侧另存唐贞元十五年（799）净光塔铭碑。",
      "<b>沿革</b>：明天启元年（1621）大修，底层八角增嵌八尊金刚；清康熙三十五年（1696）重修并重铸塔刹；1958年因塔身倾斜逐层箍钢加固。它是中国为数不多的五代石塔，塔中佛像与题记是闽国史的第一手材料。"
    ],
    "tall": true,
    "caption": [
      "福州乌塔 · 崇妙保圣坚牢塔",
      "七层八角 · 五代石塔"
    ],
    "legacyNames": [
      "福州乌塔",
      "乌塔",
      "崇妙保圣坚牢塔"
    ],
    "legacyPlaces": [
      "福州"
    ]
  },
  {
    "id": "fuzhoubaita",
    "types": ["pagoda"],
    "initialStatus": "wishlist",
    "placeKey": "fuzhou",
    "name": "福州白塔",
    "short": "白塔",
    "sub": "报恩定光多宝塔",
    "dyn": "ming",
    "tag": "明",
    "era": "嘉靖二十七年",
    "year": 1548,
    "yearLabel": "1548年重建",
    "yearApprox": false,
    "place": "福建 · 福州",
    "lede": "乌塔用石，白塔用砖。天祐元年（904）王审知为父母荐福，在于山西麓建报恩定光多宝塔，原是砖心木廊的七层高塔；嘉靖十三年（1534）遭雷火焚毁，二十七年（1548）重建时干脆把砖砌塔心做成塔身，外涂白灰，八角七层，顶上一枚葫芦刹。今天看到的清朗素净的轮廓，是明代重建后的样子。",
    "facts": [
      "<b>形制</b>：八角七层楼阁式砖塔，高41米，外壁素面涂白灰，顶置葫芦形塔刹；塔心砖砌，内设挂柱悬梯盘旋登顶。1963年整治塔周环境时出土唐代青石须弥座束腰石雕15方，刻海国神话、狮子、牡丹等，现立于原地。",
      "<b>沿革</b>：《十国春秋》记天祐元年（904）王审知建此塔荐考妣；初建为砖砌塔心、外施木构；明嘉靖十三年（1534）毁于雷火，二十七年（1548）重建成今塔；1958年重修更换悬梯，1991年公布为福建省文物保护单位。",
      "<b>对望</b>：与乌山东麓的五代乌塔遥相对峙，合称“三山两塔”，是福州古城延续千年的地标组合；一石一砖、一黑一白，也正好显示五代与明代两种建塔材料与做法的差别。"
    ],
    "tall": true,
    "caption": [
      "福州白塔 · 定光塔",
      "七层八角 · 明代重建"
    ],
    "legacyNames": [
      "福州白塔",
      "白塔",
      "报恩定光多宝塔"
    ],
    "legacyPlaces": [
      "福州"
    ]
  },

  // Additional visited site and wishlist monuments with complete researched plates.
  {
    "id": "guanyintang",
    "types": ["sculpture"],
    "initialStatus": "visited",
    "placeKey": "changzhi",
    "name": "长治观音堂",
    "short": "观音堂",
    "sub": "明代悬塑 · 梁家庄",
    "dyn": "ming",
    "tag": "明",
    "era": "明 · 万历年间",
    "year": 1582,
    "yearLabel": "明万历年间",
    "yearApprox": true,
    "place": "山西长治 · 梁家庄",
    "lede": "一座三间的小殿，墙面、梁架、门窗上方全被塑像占满：观音居中，文殊、普贤在侧，身后天宫楼阁层层叠起，十八罗汉、二十四诸天、十二圆觉分层环列，最上一层南壁是道教神仙、北壁是儒家人物，释迦、老子、孔子同在一堂。五百余尊明万历十年（1582）前后的悬塑，把三教合一的信仰塑成了一个看得见的世界。图版取中央观音与天宫楼阁局部，不代表全殿。",
    "facts": [
      "<b>正殿</b>：面阔三间、进深四椽，单檐悬山顶，覆黄绿两色琉璃瓦，纹饰为蟠龙与西番莲；殿内明代悬塑五百余尊，描金彩绘，依附墙面、屋架与门窗上部分层布置。",
      "<b>纪年</b>：观音堂建于明万历十年（1582），清代修葺；殿额“观音堂”为万历十一年（1583）兵部侍郎郜钦所题；寺坐东朝西，二进院落，占地7400平方米，正殿为明构，余为清建。",
      "<b>题材</b>：佛坛供观音、文殊、普贤，后壁塑佛传故事，两侧为十八罗汉、二十四诸天、十二圆觉，第四层南壁道教、北壁儒教人物，释迦居中而老子、孔子分列左右，是民间庙堂三教合流的实物。"
    ],
    "tall": true,
    "caption": [
      "长治观音堂 · 观音与天宫悬塑局部",
      "明万历年间 · 彩塑与悬塑"
    ],
    "legacyNames": [
      "长治观音堂",
      "观音堂"
    ],
    "legacyPlaces": [
      "长治"
    ]
  },
  {
    "id": "guanque",
    "types": ["pavilion"],
    "initialStatus": "wishlist",
    "placeKey": "yongji",
    "name": "永济鹳雀楼",
    "short": "鹳雀楼",
    "sub": "黄河岸畔 · 当代重建",
    "dyn": "modern",
    "tag": "今",
    "era": "当代重建",
    "year": 2002,
    "yearLabel": "2002年重建",
    "yearApprox": false,
    "place": "山西永济 · 蒲州古城西",
    "lede": "王之涣笔下的名楼，今天重新立在蒲州古城以西的黄河岸边。眼前的楼体于2002年重建落成：高台托起四重檐口，层层柱廊把登高望远的诗意接回现实。",
    "facts": [
      "<b>现存楼体</b>：1997年12月开工重建，2002年9月26日落成开放；本图与年表均按2002年登记。",
      "<b>仿唐楼阁</b>：外观四檐三层，通高73.9米，坐南朝北，采用唐风彩画与舒展檐口。",
      "<b>古楼沿革</b>：原楼始建于北周，历唐、宋，元初毁于战火；创建年代与现存重建建筑分别记录。"
    ],
    "caption": [
      "鹳雀楼正面 · 四檐三层",
      "仿唐形制 · 2002年重建"
    ],
    "legacyNames": [
      "永济鹳雀楼",
      "鹳雀楼",
      "鹳鹊楼"
    ],
    "legacyPlaces": [
      "永济",
      "蒲州",
      "运城"
    ]
  },
  {
    "id": "xianshen",
    "types": ["pavilion", "stage"],
    "initialStatus": "wishlist",
    "placeKey": "jiexiu",
    "name": "介休祆神楼",
    "short": "祆神楼",
    "sub": "过街楼与乐楼 · 复合楼阁",
    "dyn": "ming",
    "tag": "清",
    "era": "清 · 顺治末至康熙初",
    "year": 1664,
    "yearLabel": "顺治末—康熙初",
    "yearApprox": true,
    "place": "山西介休 · 东关",
    "lede": "一座楼同时干三件事：街道从楼下穿过，它是顺城关大街的过街楼；上去一层是三结义庙的山门；再往上，五间戏楼倒座朝北，叠成四层高的轮廓。它还是中国仅存的祆教相关建筑，檐下木雕牛首、驼首异兽被姜伯勤解读为祆教神祇的化身。庙传为北宋文彦博所建，清初毁于火，现存楼阁为顺治末至康熙初（1660—1668）重建，乐楼脊刹下留有康熙六年（1667）题记。图版所绘为过街楼与乐楼。",
    "facts": [
      "<b>形制</b>：平面呈凸字形，总进深约20米；前端过街楼与戏楼前抱厦面阔、进深均三间，后部戏楼面阔五间、进深四间，带周围廊；下层为山门，上层为戏楼，连乐楼与重檐共四层。",
      "<b>纪年</b>：清初三结义庙毁于火，顺治十七年（1660）重建，康熙七年（1668）竣工，乐楼正脊宝瓶下有康熙六年（1667）题记，献亭为乾隆五十一年（1786）增建；1985年过街楼整体顶升1.5米，1987年修缮竣工。",
      "<b>祆教</b>：碑记称宋文潞公（文彦博）为祆神建庙，明嘉靖间知县改为三结义庙；姜伯勤据檐下牛首、驼首木雕判断其为祆祠遗存，陈明达1951年调查即称其艺术成就极高，不能因时代较晚而忽视。"
    ],
    "caption": [
      "介休祆神楼 · 过街楼与乐楼",
      "清 · 顺治末至康熙初重建"
    ],
    "legacyNames": [
      "介休祆神楼",
      "祆神楼"
    ],
    "legacyPlaces": [
      "介休"
    ]
  },
  {
    "id": "chongsheng",
    "types": ["pagoda"],
    "initialStatus": "wishlist",
    "placeKey": "dali",
    "name": "大理崇圣寺三塔",
    "short": "崇圣寺三塔",
    "sub": "大理 · 千寻塔与南北二塔",
    "dyn": "tang",
    "tag": "南诏",
    "era": "南诏 · 大理国",
    "year": 840,
    "yearLabel": "9世纪（千寻塔）",
    "yearApprox": true,
    "place": "云南 · 大理",
    "lede": "一座高大的方形塔与两座较矮的八角塔，在苍山东麓形成鼎足而立的轮廓。崇圣寺三塔看似统一，却并非同年建成：千寻塔属于南诏时期，南北两塔则系大理国时期。近看砖檐、佛龛与收分的塔壁，既能辨认各塔的形制，也能看出大理佛教建筑在不同阶段的延续。",
    "facts": [
      "中央千寻塔为方形十六层密檐砖塔，南北两塔为八角十层砖塔。高低与平面形状同时形成对照，密集砖檐、龛窗和塔刹又把三座塔联系为一组。",
      "千寻塔一般系于南诏劝丰佑时期，南北两塔则归于大理国时期的营建。中央大塔的约略年代不能直接用于两侧小塔，三塔共同经历了后世维修和保护。",
      "三塔保留了旧崇圣寺的重要遗存，周围寺院建筑的兴废与塔的延续并不同步。比较方塔与八角塔，可以从同一地点读出南诏、大理国佛教建筑的不同阶段。"
    ],
    "caption": [
      "崇圣寺三塔 · 东向组合视图",
      "千寻塔十六层，南北小塔各十层"
    ],
    "legacyNames": [
      "大理崇圣寺三塔",
      "崇圣寺三塔",
      "大理三塔"
    ],
    "legacyPlaces": [
      "大理"
    ]
  },
  {
    "id": "dule",
    "types": ["pavilion"],
    "initialStatus": "wishlist",
    "placeKey": "jizhou",
    "name": "天津独乐寺",
    "short": "独乐寺",
    "sub": "蓟州 · 观音阁",
    "dyn": "liao",
    "tag": "辽",
    "era": "辽统和二年",
    "year": 984,
    "yearLabel": "984年重建",
    "yearApprox": false,
    "place": "天津 · 蓟州",
    "lede": "观音阁的空间围绕高大的十一面观音展开：内外两圈木柱与梁栱相连，外观两层的楼阁内部还藏着一道暗层。宽阔深檐和平座回廊使阁身在厚重中保持舒展。现存主体重建于辽统和二年，与寺院更早的起源分别计年；建筑和泥塑相互配合，让礼拜者从不同高度看见同一尊造像。",
    "facts": [
      "观音阁面阔五间、进深四间，外观两层而内部含暗层共三层。内外柱圈通过梁枋与斗栱连接，中央留出贯通空间容纳高大观音，楼层与造像形成紧密关系。",
      "现存观音阁重建于辽统和二年，即九八四年，与山门共同保存辽代营造。寺院初创与现存阁体须分别理解，后来修缮和室内装饰也不能全部归入重建当年。",
      "梁柱和斗栱既承托深檐与楼层，也组织围绕佛像的礼拜空间。阁内辽代泥塑与木构相互依存，为认识北方早期高层佛阁的结构和宗教使用提供实物。"
    ],
    "caption": [
      "独乐寺观音阁正面 · 据实景照片重绘",
      "辽统和二年（984）重建 · 面阔五间，外观两层、内部三层"
    ],
    "legacyNames": [
      "天津独乐寺",
      "蓟州独乐寺",
      "独乐寺",
      "独乐寺观音阁"
    ],
    "legacyPlaces": [
      "天津",
      "蓟州",
      "蓟县"
    ]
  },
  {
    "id": "qufukongmiao",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "qufu",
    "name": "曲阜孔庙",
    "short": "曲阜孔庙",
    "sub": "曲阜 · 大成殿",
    "dyn": "ming",
    "tag": "清",
    "era": "清雍正八年",
    "year": 1730,
    "yearLabel": "1730年重建竣工",
    "yearApprox": false,
    "place": "山东 · 济宁 · 曲阜",
    "lede": "大成殿把祭孔的中心落实在九间宽面、黄琉璃瓦和盘龙石柱之间。两重歇山檐下的柱廊，与殿前露台共同组织仪式的行进和停驻。今日殿堂是雍正年间火灾后重建的成果，承接更早的祭祀传统，却不能按孔庙的初创年代理解。石柱的深雕与层叠木构并列，也让礼制规格具有鲜明的工艺表达。",
    "facts": [
      "形制：大殿面阔九间、进深五间，黄琉璃瓦重檐歇山顶下设围廊。前檐十根石柱深雕盘龙，殿前露台与阶道相接，构成祭孔中心的立面和仪式空间。",
      "断代：雍正二年一七二四年火灾后，大成殿重新营建，至雍正八年一七三〇年完工。这个年代对应现存主殿的重建，不等于孔庙的创建时间，后世维修也须另看。",
      "价值：龙柱、黄瓦和九五尺度把孔子的礼遇转化为可见的建筑等级。殿堂与露台的关系使供奉、行礼和观看各有位置，是理解祭孔制度及清代官式营造的实例。"
    ],
    "caption": [
      "曲阜孔庙大成殿正面 · 据实景照片重绘",
      "清雍正八年（1730）重建竣工 · 九间重檐歇山顶"
    ],
    "legacyNames": [
      "曲阜孔庙",
      "孔庙",
      "孔庙大成殿"
    ],
    "legacyPlaces": [
      "曲阜"
    ]
  },
  {
    "id": "wangbao",
    "types": ["stage"],
    "initialStatus": "wishlist",
    "placeKey": "gaoping",
    "name": "高平王报二郎庙",
    "short": "二郎庙",
    "sub": "金代戏台 · 山花朝前",
    "dyn": "liao",
    "tag": "金",
    "era": "金 · 大定二十三年",
    "year": 1183,
    "yearLabel": "1183",
    "yearApprox": false,
    "place": "山西高平 · 王报村",
    "lede": "王报二郎庙戏台把歇山顶的山花转向观众，与常见横向展开的殿堂不同。一间见方的舞台靠四角圆柱和粗大的斗栱托住屋盖，台面不大，承重关系却十分清楚。须弥座束腰上的题记留下金大定二十三年及石匠姓名，为这座早期戏台提供了可以核读的年代。它朝向庙中正殿，把演剧与祭神安排在同一院落，也留下乡村戏曲活动的建筑证据。",
    "facts": [
      "结构：戏台面阔一间，平面正方，四角立圆柱，单檐歇山顶的山花朝前；宽厚额枋与斗栱承托屋盖，每面设两朵补间铺作，小体量内仍有完整的木构层次。",
      "纪年：石台基束腰刻“大定二十三年”并列石匠赵显、赵志，明确对应金代营建；庙内其他建筑多为明清重建，其年代不能替代这座有题记的金代戏台。",
      "演剧：戏台位于院南、面向正殿，表演空间与祭祀建筑相对；它为研究早期庙会演剧提供实物，台基文字又能把木构形制与具体纪年联系起来，而非只凭传说定年。"
    ],
    "caption": [
      "王报二郎庙 · 金代戏台",
      "金 · 大定二十三年（1183）"
    ],
    "legacyNames": [
      "高平王报二郎庙",
      "王报二郎庙",
      "二郎庙"
    ],
    "legacyPlaces": [
      "高平",
      "王报"
    ]
  },
  {
    "id": "gaoyique",
    "types": ["que"],
    "initialStatus": "wishlist",
    "placeKey": "yaan",
    "name": "高颐阙",
    "short": "高颐阙",
    "sub": "雅安 · 石刻子母阙",
    "dyn": "han",
    "tag": "东汉",
    "era": "东汉 · 建安十四年",
    "year": 209,
    "yearLabel": "209年",
    "yearApprox": false,
    "place": "四川 · 雅安 · 雨城",
    "lede": "一座用红砂岩堆出来的木构楼阁：石材层层叠成台基、阙身、楼部与顶盖，楼部的栌斗、一斗二升斗栱、纵横叠置的枋子一一刻出，重檐庑殿顶的椽子与瓦垅都在，出檐达0.6米以上。主阙通高5.9米，耳阙2.94米相连，是四川汉阙中保存最完整的子母阙。墓主益州太守高颐卒于建安十四年（209），阙即立于其后。图版按西阙（右阙）正面绘制。",
    "facts": [
      "<b>形制</b>：仿木构红砂岩子母阙，主阙分台基、阙身、楼部、顶盖四段，通高5.9米；阙身四层整石高2.64米，南北面各刻六根柱；楼部四层，第一层四面砌六朵栌斗，第二层以一斗二升斗栱承托；顶盖为重檐庑殿，24个枋头各刻一隶书字。",
      "<b>断代</b>：铭文记墓主为“汉故益州太守阴平都尉武阳令北府丞举孝廉高君”，高颐于建安十四年（209）卒于任上，阙随之而立。宋代修墓并建景贤堂安置高君颂碑；1983年、2012年两次维修，2013年芦山地震中严重受损，2015年保护工程获批。",
      "<b>价值</b>：全国现存汉阙约三十座，高颐阙被视为四川汉阙中价值最高的两座之一，梁思成曾考察并写入《中国建筑史》。楼部浮雕九尾狐、三足鸟、季札挂剑等题材。东侧的左阙仅存台基与阙身，顶盖为后人补配，图版不绘。"
    ],
    "tall": true,
    "caption": [
      "高颐阙 · 西侧子母阙",
      "近正视 · 东汉建安十四年"
    ],
    "legacyNames": [
      "高颐阙",
      "高颐墓阙",
      "雅安高颐阙"
    ],
    "legacyPlaces": [
      "雅安"
    ]
  },
  {
    "id": "liyeque",
    "types": ["que"],
    "initialStatus": "wishlist",
    "placeKey": "zitong",
    "name": "李业阙",
    "short": "李业阙",
    "sub": "梓潼 · 东汉单石阙",
    "dyn": "han",
    "tag": "东汉",
    "era": "东汉初年",
    "year": 36,
    "yearLabel": "东汉初年",
    "yearApprox": true,
    "place": "四川 · 绵阳 · 梓潼",
    "lede": "一根素面石柱，没有斗栱楼部，连阙顶都是后人配的，却被认为是中国现存最早的汉阙。阙身独石刻成，高2.45米，仅南面刻两行隶书“汉侍御史李公之阙”，字迹似为后代补刻。李业是新莽、公孙述时期拒不出仕的梓潼名士，建武十二年（36）东汉灭述后旌表其门，阙遂系于东汉初年。南宋《舆地纪胜》已记此阙被赤眉所破。图版按现存单阙的南面绘制。",
    "facts": [
      "<b>形制</b>：现存单阙，仅余基石与阙身：基石高0.25米、长1.57米、宽0.8米；阙身一石，高2.45米，底部长0.97米、宽0.69米，向上收分至0.68米、0.49米。四面中只有正南面刻边线与铭文，其余三面素面，阙顶为后世补配。",
      "<b>断代</b>：传统据《后汉书·李业传》系于建武十二年（36）前后，为四川汉阙中最早者；最早记载见南宋王象之《舆地纪胜》，称“遭赤眉破其二阙”。明嘉靖年间于阙旁建李业祠；清道光二十五年（1845）知县周树棠发现残阙，移入李节士祠并刻《移阙记》。",
      "<b>价值</b>：因身、顶无饰、结构过简，曾有“李业阙并非阙”之说；但正因它只剩阙身，反而显出汉阙未加楼部装饰前的基本体量。1950年代后建亭保护，2008年汶川地震后经检查未受损。图版所绘阙顶为后配，不计入汉代原构。"
    ],
    "tall": true,
    "caption": [
      "李业阙 · 现存单阙南面",
      "东汉初年阙身，阙顶为后配"
    ],
    "legacyNames": [
      "李业阙",
      "梓潼李业阙"
    ],
    "legacyPlaces": [
      "梓潼",
      "绵阳"
    ]
  },
  {
    "id": "daimiao",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "taian",
    "name": "岱庙天贶殿",
    "short": "岱庙",
    "sub": "泰安 · 天贶殿",
    "dyn": "ming",
    "tag": "清",
    "era": "清代重修",
    "year": 1677,
    "yearLabel": "清代重修",
    "yearApprox": true,
    "place": "山东 · 泰安",
    "lede": "天贶殿的九间宽面与两重庑殿檐，把泰山神的祭祀抬升到宫殿般的规格。殿堂沿用宋代创建的礼制位置，今日木构尺度与做法则体现清代修护。康熙重修碑细记保留梁柱、替换檩枋和重新烧瓦，殿内清初重绘的壁画又展开泰山神出巡与回宫；建筑的价值正藏在这些不同年代相接的层次里。",
    "facts": [
      "形制：殿堂面阔九间、进深五间，重檐庑殿顶覆盖黄琉璃瓦。宽阔殿身和双重檐口形成高规格祭岳建筑，供奉泰山神的空间由柱网与三面殿墙围合。",
      "断代：康熙重修碑记工程于一六七七年告成，并记大殿保留可用梁柱、更换腐坏檩枋及椽板瓦件。现存木构体现清代做法，后世仍修缮，不能将告成年视为全部构件建年。",
      "价值：殿内泰山神启跸回銮图在宋代壁画内容基础上于清初重绘，宗教仪式与山川楼阁同入画面。木构和壁画的分期，使祭岳传统的延续有了具体可辨的证据。"
    ],
    "caption": [
      "岱庙天贶殿正面 · 九间重檐庑殿",
      "宋代创建 · 现存清代重修形制"
    ],
    "legacyNames": [
      "岱庙天贶殿",
      "岱庙",
      "天贶殿"
    ],
    "legacyPlaces": [
      "泰安",
      "泰山"
    ]
  },

  // Additional Xi’an visits with photo-referenced plates.
  {
    "id": "xianwall",
    "types": ["pavilion", "wall"],
    "initialStatus": "visited",
    "placeKey": "xian",
    "name": "西安城墙",
    "short": "西安城墙",
    "sub": "安定门箭楼 · 明代城垣",
    "dyn": "ming",
    "tag": "明",
    "era": "明 · 洪武七至十一年",
    "year": 1378,
    "yearLabel": "1374—1378",
    "yearApprox": false,
    "place": "陕西西安 · 安定门",
    "lede": "安定门箭楼的宽阔墙面密布箭窗，门洞却把通行压缩成一道入口，守御的意图比华丽屋顶更醒目。西安西门沿明洪武年间扩城而成，箭楼、城楼与瓮城串成多重防线。砖包夯土的城垣后来屡经明清及近现代整修，今日这段城门仍可让人把平面的城防格局读成真实空间。",
    "facts": [
      "箭楼立于厚重门台之上，墙面密集开箭窗，中央券洞贯穿下部。箭楼与里侧城楼之间由瓮城相连，行人通过的门洞只是整套层叠防御空间的一部分。",
      "地方志将安定门营建系于洪武七至十一年的扩城工程，明清又多次整修，清末外侧闸楼毁坏。现存箭楼、城楼格局保存下来，墙砖与木构仍包含后世修护。",
      "城防需要同时解决通行与防守，楼台、狭口和围合院落于是互相配合。沿着入口想象由外向内的路径，比只把城墙看成一道连续高墙更能理解古城守御。"
    ],
    "caption": [
      "西安城墙 · 安定门箭楼与中央券洞",
      "明代城垣 · 明清及近现代修葺"
    ],
    "legacyNames": [
      "西安城墙",
      "西安明城墙",
      "明城墙"
    ],
    "legacyPlaces": [
      "西安",
      "陕西西安"
    ]
  },
  {
    "id": "xianzhonggu",
    "types": ["pavilion"],
    "initialStatus": "visited",
    "placeKey": "xian",
    "name": "西安钟楼 · 鼓楼",
    "short": "钟鼓楼",
    "sub": "西安 · 晨钟暮鼓",
    "dyn": "ming",
    "tag": "明",
    "era": "洪武始建 · 万历迁建",
    "year": 1380,
    "yearLabel": "1380 · 1384（1582迁建）",
    "yearApprox": false,
    "place": "陕西西安 · 府城中心",
    "lede": "方形钟楼的屋顶向中央攒起，鼓楼的长屋脊则横向舒展，两种轮廓曾把城中时辰化成可听见的钟鼓声。鼓楼先建于洪武十三年，钟楼晚四年初建，随后在万历年间迁到今天的街道交会处。并看两楼的台基、通道与檐层，既能认出相通的报时用途，也能辨清各自的空间比例。",
    "facts": [
      "钟楼立于方形台基上，四面券洞交会，三重檐收向攒尖顶。鼓楼台基为长方形，楼身七间、四周有廊，上部歇山屋顶与下层腰檐共同拉长横向轮廓。",
      "鼓楼始建于洪武十三年，钟楼始建于洪武十七年并在万历十年迁至现址。钟楼迁建时台基重新营筑，后世又有修葺，初建年与眼前全部构件不能相等。",
      "两楼以钟鼓报时，建筑位置让声音和主要街道相连。方台与长台、攒尖与歇山的差别使相同的城市功能拥有不同形象；此处并置两楼，实际并非紧贴相邻。"
    ],
    "caption": [
      "西安钟楼 · 鼓楼",
      "双主体组合图，并非实景相邻"
    ],
    "legacyNames": [
      "西安钟鼓楼",
      "西安钟楼",
      "西安鼓楼",
      "钟鼓楼",
      "钟楼",
      "鼓楼"
    ],
    "legacyPlaces": [
      "西安",
      "陕西西安"
    ]
  },
  {
    "id": "xiangtang",
    "types": ["grotto"],
    "initialStatus": "wishlist",
    "placeKey": "fengfeng",
    "name": "响堂山石窟",
    "short": "响堂山",
    "sub": "北响堂 · 大佛洞",
    "dyn": "beiqi",
    "tag": "北齐",
    "era": "北齐 · 约550年代",
    "year": 555,
    "yearLabel": "约550年代",
    "yearApprox": true,
    "place": "河北邯郸 · 峰峰",
    "lede": "圆阔的佛面、宽厚的肩背与细密衣纹，被火焰形背光围拢。北响堂大佛洞在鼓山石壁间保存北齐造像的沉静体量，残缺处也留下了漫长的流传痕迹。",
    "facts": [
      "<b>北齐早期</b>：大佛洞为北响堂开凿较早的大窟，研究通常置于北齐文宣帝时期、约550年代，确切创建题记已失。",
      "<b>中心柱窟</b>：第9窟采用中心方柱塔庙窟形制，柱上三面雕三世佛；图版取正面主尊，高约3.5米。",
      "<b>残损现状</b>：主尊的双手与部分衣纹已残，圆形头光与火焰背光仍可辨认；窟群雕刻经历风化、盗凿和后世修补。"
    ],
    "caption": [
      "响堂山石窟 · 北响堂大佛洞主尊",
      "北齐 · 约550年代（推定）"
    ],
    "legacyNames": [
      "响堂山石窟",
      "北响堂山石窟",
      "北响堂石窟",
      "响堂山"
    ],
    "legacyPlaces": [
      "河北邯郸",
      "邯郸",
      "峰峰",
      "峰峰矿区"
    ],
    "tall": true
  },
  {
    "id": "zhaoling",
    "types": ["hall"],
    "initialStatus": "wishlist",
    "placeKey": "xianyou",
    "name": "仙游昭灵宫",
    "short": "昭灵宫",
    "sub": "仙游 · 东湖昭灵宫",
    "dyn": "ming",
    "tag": "明",
    "era": "明代 · 具体纪年待考",
    "year": 1500,
    "yearLabel": "明代（待考）",
    "yearApprox": true,
    "place": "福建 · 莆田 · 仙游西苑乡顶东湖村",
    "lede": "昭灵宫的歇山屋顶低低展开，石台上三间木殿的正面与侧面设护栏，栏上雨披顺着屋檐延伸，把通行、停坐和避雨的需要结合起来。县政府文物公告记其始建于明代中期，后经重修，殿内仍保留明代石柱础。它没有以高墙包住殿身，梁架、栏杆与挡雨构件共同形成轻巧外观，适合近看仙游山村木构怎样回应地形与气候。",
    "facts": [
      "单体木殿建在石构平台上，正殿面阔三间、进深五檩，采用歇山顶及抬梁、穿斗混合梁架；正面和侧面护栏上设雨披，将屋盖与廊边细部连在一起。",
      "县政府二〇二四年文物公告记载，昭灵宫始建于明代中期，一九八四年十二月重修；初建确年仍待考，现存构件跨越不同阶段，不能一概视为明代原材。",
      "宫内保留明代素覆盆石柱础，与木梁架、护栏和雨披组成不同材料的接合；这座县级文保建筑，提供了观察地方小型木殿及山村适应性营造的具体实物。"
    ],
    "caption": [
      "仙游昭灵宫 · 单殿正面",
      "明代（待考） · 单檐歇山"
    ],
    "legacyNames": [
      "仙游昭灵宫",
      "东湖昭灵宫",
      "顶东湖昭灵宫"
    ],
    "legacyPlaces": [
      "仙游",
      "莆田",
      "福建莆田",
      "顶东湖",
      "西苑乡"
    ],
    "tall": false
  },
  {
    "id": "horyuji",
    "name": "法隆寺",
    "short": "法隆寺",
    "sub": "金堂",
    "initialStatus": "wishlist",
    "country": "JP",
    "types": [
      "hall"
    ],
    "placeKey": "jp_ikaruga",
    "place": "日本 · 奈良县 · 斑鸠",
    "dyn": "jp_asuka",
    "tag": "飞鸟",
    "era": "飞鸟时代 · 7世纪后半叶",
    "year": 690,
    "yearLabel": "7世纪后半叶",
    "yearApprox": true,
    "lede": "两重瓦顶之下，又有一圈较低的板葺裳阶，法隆寺金堂以深远檐影展现飞鸟时代的木构气息。略带鼓胀的圆柱托起云形斗栱，上层几何栏杆使厚重屋顶之间仍有细巧变化。现存金堂属于七世纪后半叶的西院重建，与寺院早期创建不同；它和五重塔相对的安排，也留下早期佛寺布局的线索。",
    "facts": [
      "金堂主体面阔五间、进深四间，二重入母屋瓦顶下围以板葺裳阶。云形斗栱带卷曲轮廓，略鼓的圆柱与上层栏杆相互衬托，使深檐之下仍有精细节奏。",
      "寺院早期创建约在七世纪初，史书记六七〇年火灾，现存西院随后重建。金堂断为七世纪后半叶，不能把寺院六〇七年的初创纪年直接当作今日殿堂落成年。",
      "西院中金堂居东、五重塔居西，并在回廊围合的空间内相对。建筑组合与云形构件保留早期东亚佛寺的线索，近看一殿也可联系更大的文化交流背景。"
    ],
    "caption": [
      "法隆寺 · 金堂正面",
      "飞鸟时代 · 二重入母屋造与裳阶"
    ],
    "legacyNames": [
      "法隆寺",
      "Horyuji",
      "Hōryū-ji",
      "法隆寺金堂"
    ],
    "legacyPlaces": [
      "日本",
      "斑鸠",
      "奈良县",
      "日本斑鸠",
      "日本奈良县"
    ],
    "tall": false
  },
  {
    "id": "toshodaiji",
    "name": "唐招提寺",
    "short": "唐招提寺",
    "sub": "金堂",
    "initialStatus": "wishlist",
    "country": "JP",
    "types": [
      "hall"
    ],
    "placeKey": "jp_nara",
    "place": "日本 · 奈良县 · 奈良",
    "dyn": "jp_nara",
    "tag": "奈良",
    "era": "奈良时代 · 8世纪后半叶",
    "year": 780,
    "yearLabel": "8世纪后半叶",
    "yearApprox": true,
    "lede": "八根圆柱撑起唐招提寺金堂宽展的单檐屋顶，殿前敞廊把庭院与佛像所在的内室隔出一层安静的过渡。鉴真创寺之后，弟子们在8世纪后半叶完成这座金堂。",
    "facts": [
      "鉴真于759年开创唐招提寺，现存金堂则建于8世纪后半叶；寺院官方将其营建与弟子如宝联系起来。",
      "金堂正面七间、进深四间，采用寄栋造（庑殿顶），铺本瓦葺，前面一间敞开形成柱廊。",
      "檐下三手先组物承托深远屋檐，屋脊两端的鸱尾与宽阔单檐共同构成外观特征。"
    ],
    "caption": [
      "唐招提寺 · 金堂正面",
      "奈良时代 · 七间寄栋造"
    ],
    "legacyNames": [
      "唐招提寺",
      "Toshodaiji",
      "Tōshōdai-ji",
      "唐招提寺金堂"
    ],
    "legacyPlaces": [
      "日本",
      "奈良",
      "奈良县",
      "日本奈良",
      "日本奈良县"
    ],
    "tall": false
  },
  {
    "id": "byodoin",
    "name": "平等院",
    "short": "平等院",
    "sub": "凤凰堂",
    "initialStatus": "wishlist",
    "country": "JP",
    "types": [
      "hall"
    ],
    "placeKey": "jp_uji",
    "place": "日本 · 京都府 · 宇治",
    "dyn": "jp_heian",
    "tag": "平安",
    "era": "平安时代 · 凤凰堂",
    "year": 1053,
    "yearLabel": "1053年",
    "yearApprox": false,
    "lede": "阿字池对岸，中堂与两翼廊如振翅的鸟展开，屋脊双凤相望。藤原赖通于1053年营造的阿弥陀堂，把平安时代的净土想象安放在宇治水面之上。",
    "facts": [
      "<b>平安遗构</b>：凤凰堂建于1053年，由藤原赖通营造，现存中堂与翼廊体现平安时代后期的阿弥陀堂布局。",
      "<b>双凤与两翼</b>：左右翼廊围合中堂，屋脊上立一对凤凰；凤凰堂之名在江户时代逐渐通行，屋顶现置凤凰为1968年换置品。",
      "<b>隔池礼佛</b>：建筑坐西朝东，参拜者在阿字池东岸面向西方礼佛，庭园与佛堂共同表达西方净土的意象。"
    ],
    "caption": [
      "平等院 · 凤凰堂正面与两翼",
      "平安时代 · 1053年"
    ],
    "legacyNames": [
      "平等院",
      "Byodoin",
      "Byōdō-in",
      "平等院鳳凰堂",
      "平等院凤凰堂"
    ],
    "legacyPlaces": [
      "日本",
      "宇治",
      "京都府",
      "日本宇治",
      "日本京都府"
    ],
    "tall": false
  },
  {
    "id": "todaiji",
    "name": "东大寺",
    "short": "东大寺",
    "sub": "南大门",
    "initialStatus": "wishlist",
    "country": "JP",
    "types": [
      "gate"
    ],
    "placeKey": "jp_nara",
    "place": "日本 · 奈良县 · 奈良",
    "dyn": "jp_kamakura",
    "tag": "镰仓",
    "era": "镰仓时代",
    "year": 1203,
    "yearLabel": "1199—1203",
    "yearApprox": false,
    "lede": "南大门以贯通高处的圆柱和层层横贯的梁木显出大佛样的结构力量。三条通道穿过宽阔的两重屋檐下，两侧仁王像守住通往东大寺的入口。",
    "facts": [
      "现存南大门由重源主持重建，1199年上梁，1203年与门内金刚力士像同时竣工。",
      "山门采用入母屋造（歇山顶），正面五间、中央三户，具有两重屋檐，是大佛样建筑的重要遗存。",
      "全门共有18根大圆柱，正面六柱划分五间；据寺院资料，门高自基坛以上为25.46米。"
    ],
    "caption": [
      "东大寺 · 南大门正面",
      "镰仓时代 · 1199—1203年重建"
    ],
    "legacyNames": [
      "东大寺",
      "Todaiji",
      "Tōdai-ji",
      "東大寺",
      "东大寺南大门",
      "東大寺南大門"
    ],
    "legacyPlaces": [
      "日本",
      "奈良",
      "奈良县",
      "日本奈良",
      "日本奈良县"
    ],
    "tall": false
  },
  {
    "id": "kiyomizu",
    "name": "清水寺",
    "short": "清水寺",
    "sub": "本堂 · 清水舞台",
    "initialStatus": "wishlist",
    "country": "JP",
    "types": [
      "hall"
    ],
    "placeKey": "jp_kyoto",
    "place": "日本 · 京都府 · 京都",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "江户时代 · 宽永十年",
    "year": 1633,
    "yearLabel": "1633 重建",
    "yearApprox": false,
    "lede": "先看舞台底下：十二米长的榉木柱与横贯木纵横咬合，不用一根钉子，把一座九间七间的大堂托出音羽山的崖壁。这是1629年火灾后、德川家光于1633年出资重建的本堂，寄栋造、桧皮葺的大屋顶两端伸出入母屋造翼廊，舞台铺在前面。文化厅称它为江户初期和样复古建筑的杰作，1952年指定国宝，1994年随古都京都列入世界遗产。",
    "facts": [
      "<b>形制</b>：悬造（懸造）本堂，桁行九间、梁间七间，一重寄栋造、桧皮葺，东西北三面加裳阶，正面左右各出一座入母屋造翼廊，中间铺约二百平方米的舞台；含裳阶与翼廊，平面约36米×31米。",
      "<b>沿革</b>：寺传778年创建，伽蓝屡毁；现存本堂为宽永六年（1629）火灾后、宽永十年（1633）德川家光出资重建，1897年列为特别保护建筑，1952年指定国宝；2008年起历时十二年的大修理更换了舞台全部桧木地板。",
      "<b>价值</b>：文化厅评为江户初期和样复古建筑的杰作，屋面带起翘，细部留有桃山遗风；舞台由榉木长柱与贯穿横木榫接而成，不用钉子，最前排柱长约12米；观音灵场长谷寺、石山寺的本堂也用同类悬造。"
    ],
    "caption": [
      "清水寺 · 本堂与清水舞台",
      "南面近正视 · 江户宽永十年（1633）"
    ],
    "legacyNames": [
      "清水寺",
      "Kiyomizu-dera",
      "京都清水寺",
      "清水寺本堂"
    ],
    "legacyPlaces": [
      "日本",
      "京都",
      "京都府",
      "日本京都",
      "日本京都府"
    ],
    "tall": false
  },
  {
    "id": "toji",
    "name": "东寺",
    "short": "东寺",
    "sub": "五重塔",
    "initialStatus": "wishlist",
    "country": "JP",
    "types": [
      "pagoda"
    ],
    "placeKey": "jp_kyoto",
    "place": "日本 · 京都府 · 京都",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "江户时代 · 宽永二十一年",
    "year": 1644,
    "yearLabel": "1644 重建",
    "yearApprox": false,
    "lede": "54.8米，现存木造塔日本第一高。东寺五重塔自826年空海发愿起四次毁于雷火与火灾，眼前这座是第五代：1641年烧毁后，德川家光出资，大工栋梁中井正纯主持，1644年七月完工。五层皆方三间、本瓦葺，不设栏杆，斗栱三手先而没有一处木鼻装饰——文化厅称之为江户初期京都复古和样的杰作，1952年指定国宝。",
    "facts": [
      "<b>形制</b>：三间五重塔婆，本瓦葺，总高54.8米，立于坛正积基坛上；各层均为方三间，不设回缘栏杆，斗栱三手先、中备用间斗束，心柱贯通至初层，细部不加木鼻等装饰，是木割粗壮的纯粹和样。",
      "<b>沿革</b>：塔传创于天长年间（824—834），实际建成约在九世纪末，此后四度毁于雷火或火灾。现存塔为宽永十八年（1641）烧毁后重建，同年十二月动工、宽永二十一年（1644）七月落成；1897年列特别保护建筑，1952年指定国宝。",
      "<b>密教空间</b>：初层以心柱象征大日如来，心柱四面安置金刚界四佛与八大菩萨，壁柱绘两界曼荼罗与真言八祖像，诸像为1643—44年所造；塔所属的东寺（教王护国寺）1994年列入世界遗产古都京都的文化财。"
    ],
    "caption": [
      "东寺 · 五重塔",
      "近正视 · 江户宽永二十一年（1644）"
    ],
    "legacyNames": [
      "东寺",
      "Toji",
      "Tō-ji",
      "東寺",
      "教王护国寺",
      "教王護国寺",
      "东寺五重塔"
    ],
    "legacyPlaces": [
      "日本",
      "京都",
      "京都府",
      "日本京都",
      "日本京都府"
    ],
    "tall": true
  },
];

SITES.push({
  "name": "闸口白塔",
  "short": "闸口白塔",
  "sub": "杭州 · 吴越石塔",
  "dyn": "zhou",
  "tag": "吴越",
  "era": "五代十国 · 吴越",
  "year": 960,
  "yearLabel": "吴越晚期",
  "yearApprox": true,
  "place": "浙江 · 杭州 · 白塔岭",
  "placeKey": "hangzhou",
  "lede": "梁思成说它与其说是建筑，不如说是一件雕塑、一座模型。闸口白塔用六十一块白色太湖石，把八面九层楼阁木塔的倚柱、阑额、斗栱、平座与出檐按比例缩刻下来，通高只有14.4米。它立在钱塘江边、大运河入江的闸口，文物部门断在五代吴越晚期；有学者据南宋史料考证，它就是后周显德四年（957）钱弘俶所建安吴塔院里的安吴塔，“白塔”是护塔建筑毁后才有的俗名。",
  "id": "zhakoubaita",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "闸口白塔",
    "九层仿木石塔 · 五代吴越"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：八面九层仿木楼阁式石塔，高14.4米，六十一块白石拼砌，逐层收分；基座刻山峰海浪，上立须弥座，象征“九山八海”，束腰刻经；每层由塔身、塔檐、平座组成，每面两槏柱分三间，四面明间辟壶门，阑额刻“七朱八白”；现存造像133尊，塔刹相轮已毁。",
    "<b>断代</b>：文物部门断在五代吴越晚期，不定确年。据《咸淳临安志》等南宋史料考证，后周显德四年（957）钱弘俶于龙山南麓建安吴塔院，塔即安吴塔；“白塔”之名南宋初才出现，当是护塔建筑毁后石面褪色所致。1988年列为全国重点文物保护单位。",
    "<b>价值</b>：钱弘俶时期是吴越建塔的鼎盛期，其构造技术后来被《营造法式》吸纳。20世纪30年代梁思成来杭测绘，发现它“作风规制几乎与灵隐双塔完全相同”，撰《闸口白塔及灵隐寺双石塔》，稿成于1937年，因战事迟至1986年才刊出。"
  ],
  "legacyNames": [
    "闸口白塔"
  ],
  "legacyPlaces": [
    "浙江 · 杭州 · 白塔岭",
    "浙江",
    "杭州"
  ]
},
{
  "name": "飞英塔",
  "short": "飞英塔",
  "sub": "湖州 · 塔中塔",
  "dyn": "song",
  "tag": "南宋",
  "era": "南宋 · 外塔重建",
  "year": 1220,
  "yearLabel": "南宋重建",
  "yearApprox": true,
  "place": "浙江 · 湖州 · 吴兴",
  "placeKey": "huzhou",
  "lede": "飞英塔的特别之处藏在内部：七层楼阁式外塔把一座独立石塔包在其中，形成罕见的塔中塔。外塔的砖壁与木檐层层收分，内塔则以石雕承载佛教图像。今日形貌主要延续南宋重建，经历元明清及现代修缮；两座塔的建造经历各不相同，不能从外观的完整推定它们都是同一时期的原物。",
  "id": "feiying",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "飞英塔 · 外塔",
    "完整外立面 · 南宋重建"
  ],
  "tall": true,
  "facts": [
    "形制：七层外塔以砖壁与木檐相结合，内部另立石塔，彼此并非一座塔的内外墙。两重塔体共用一处空间，构成楼阁外壳包护舍利石塔的特殊布局。",
    "断代：外塔南宋重建有嘉泰年间与端平初年两种记载，尚不能据此确立唯一建年。北宋开宝年间形成塔中塔的说法，与今日外塔的重建断代应分别理解。",
    "价值：石塔的雕刻与外塔的砖木营造在这里并置，展示江南佛塔不同材料的组合方式。历代修护使独特布局得以延续，也留下了辨认不同阶段的实物线索。"
  ],
  "legacyNames": [
    "飞英塔"
  ],
  "legacyPlaces": [
    "浙江 · 湖州 · 吴兴",
    "浙江",
    "湖州"
  ]
},
{
  "name": "松阳延庆寺塔",
  "short": "延庆寺塔",
  "sub": "松阳 · 六面七级砖木塔",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋 · 咸平年间",
  "year": 999,
  "yearLabel": "999—1002",
  "yearApprox": false,
  "place": "浙江 · 丽水 · 松阳",
  "placeKey": "songyang",
  "lede": "塔身向东北倾斜2.38度，塔刹偏出1.76米，清代县志已经记着它是斜的；1980年代大修时专家组最终决定不扶正，只加固。延庆寺塔是浙西南保存最完整的北宋楼阁式砖木塔：北宋咸平二年（999）为藏行达禅师带回的舍利动工，咸平五年（1002）建成，六面七级，通高38.32米，底层加一圈副阶重檐，所以从外面能数到八层檐，二层以上每层都有平座回廊可以绕行。",
  "id": "songyangyanqing",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "松阳 · 延庆寺塔",
    "六面七级 · 底层副阶重檐"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：六面七级楼阁式砖木塔，高38.32米；底层副阶重檐，二至七层塔壁外设平座回廊，各面辟壶门可逐层登临；全塔126攒斗拱皆五铺作偷心造，塔檐平缓舒展；塔刹铁制，由覆钵、宝珠、露盘、七级套筒与相轮、葫芦组成。",
    "<b>纪年</b>：《松阳县志》与北宋朱琳《延庆寺塔记》载，行达禅师西行得舍利四十九粒，归国后在松阳与永嘉两地建塔，此塔咸平二年（999）动工、咸平五年建成；塔砖存“淳化五年”（994）铭文。塔壁留朱画飞天、墨画罗汉与宋元明游人题记。",
    "<b>修缮</b>：至1980年代木构腐朽、瓦面剥落，1983年浙江省决定抢救性修缮，1991年完工；扶正与否曾有“沉井扶正”与“静压桩加固”两案之争，最终保留倾斜原状，以静压桩加固基础、恢复檐廊。塔名取自原在塔旁、建于梁大宝年间的延庆寺。"
  ],
  "legacyNames": [
    "松阳延庆寺塔",
    "延庆寺塔"
  ],
  "legacyPlaces": [
    "浙江 · 丽水 · 松阳",
    "浙江",
    "松阳"
  ]
},
{
  "name": "虎丘云岩寺塔",
  "short": "虎丘塔",
  "sub": "苏州 · 七层斜塔",
  "dyn": "zhou",
  "tag": "吴越",
  "era": "五代十国 · 吴越",
  "year": 960,
  "yearLabel": "959—961",
  "yearApprox": true,
  "place": "江苏 · 苏州 · 虎丘",
  "placeKey": "suzhou",
  "lede": "塔顶偏离中轴两米多，倾角近四度，却已经站了一千多年——虎丘云岩寺塔是国内倾斜最厉害的古塔之一。后周显德六年（959）动工、北宋建隆二年（961）落成，七层八面，高 47.7 米，砖砌塔身用倚柱、阑额和斗栱仿出木楼阁的样子。明末重修第七层时已经发现塔身倾斜，1957 年加固地基时在塔内找到了纪年石函。",
  "id": "huqiuta",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "虎丘 · 云岩寺塔",
    "近正面 · 五代吴越（959—961）"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：七层八面仿木楼阁式砖塔，残高 47.7 米；塔身以砖砌出倚柱、阑额、斗栱与平座，各层木檐早已毁失，今存砖檐。塔基一半坐在岩石、一半坐在填土上，是倾斜的根源。",
    "<b>纪年</b>：建于后周显德六年至北宋建隆二年（959—961）；1957 年加固时在一、二层间发现石函，内藏经箧，题记为建隆二年十二月十七日，与落成年相合。明崇祯十一年（1638）重修时已发现塔身向东北倾斜，遂将第七层重心南移。",
    "<b>倾斜</b>：塔顶向北偏东倾斜约 2.3 米，最大倾角 3 度 59 分，倾斜始于明代；1957 年向地基注浆加固，此后倾斜得到控制。塔内曾出土越窑秘色瓷莲花碗等五代文物，现藏苏州博物馆。"
  ],
  "legacyNames": [
    "虎丘云岩寺塔",
    "虎丘塔"
  ],
  "legacyPlaces": [
    "江苏 · 苏州 · 虎丘",
    "江苏",
    "苏州"
  ]
},
{
  "name": "栖霞寺舍利塔",
  "short": "栖霞寺塔",
  "sub": "南京 · 南唐石塔",
  "dyn": "zhou",
  "tag": "南唐",
  "era": "五代十国 · 南唐",
  "year": 960,
  "yearLabel": "南唐重建",
  "yearApprox": true,
  "place": "江苏 · 南京 · 栖霞",
  "placeKey": "nanjing",
  "lede": "密檐塔在江南本来就少见，这一座还是用石头整个雕出来的。栖霞寺舍利塔八角五层，高约 15 米：须弥座束腰上绕一圈释迦八相图，塔身第一层高高拔起，门侧立天王、力士，再往上五重石檐层层压紧，檐间每面两龛各坐一佛。隋仁寿元年（601）分舍利所建的木塔早已无存，今塔是南唐重建，1929 年由刘敦桢设计修复。",
  "id": "qixia",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "栖霞寺 · 舍利塔",
    "五层石塔 · 南唐重建"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：八角五层密檐式石塔，通高约 15 米；下为须弥座与三重仰莲，塔身八角雕倚柱，南北两面辟门，余面雕天王、力士；五层石檐挑出甚远，檐间每面开两龛，龛内各一坐佛，檐下刻飞天与供养天人。",
    "<b>年代</b>：相传隋仁寿元年（601）隋文帝分舍利于诸州建塔，栖霞木塔即其一，后毁；现存石塔为南唐（937—975）高越、林仁肇所建。1929 年何东夫妇出资、刘敦桢设计、叶恭绰主持修复，塔刹亦为近代补配。",
    "<b>雕刻</b>：须弥座束腰八面刻释迦八相，从乘象投胎到涅槃焚化顺时针排开，座下一周刻海水、鱼虾的“华严藏海”。它是中国现存最大的舍利石塔，被视为唐宋之际江南石刻的代表作；1993 年将脱落的八块石构件归位。"
  ],
  "legacyNames": [
    "栖霞寺舍利塔",
    "栖霞寺塔"
  ],
  "legacyPlaces": [
    "江苏 · 南京 · 栖霞",
    "江苏",
    "南京"
  ]
},
{
  "name": "海清寺阿育王塔",
  "short": "阿育王塔",
  "sub": "连云港 · 海清寺塔",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋 · 天圣元年",
  "year": 1023,
  "yearLabel": "1023 重建",
  "yearApprox": false,
  "place": "江苏 · 连云港 · 花果山麓",
  "placeKey": "lianyungang",
  "lede": "1668 年郯城大地震震级 8.5，震中就在北边不远，这座塔却没有歪。海清寺阿育王塔在花果山脚下的大村水库边，八角九层，高 40.58 米，是苏北现存最高、最早的塔。北宋天圣元年起建，天圣九年（1023—1031）完工，为供奉释迦真身舍利与阿育王灵牙而造；塔内所嵌刻石说，唐代这里已有一座号称“国之第二”的塔。寺早已不存，塔独自留下。",
  "id": "haiqing",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "海清寺 · 阿育王塔",
    "八面九级砖塔 · 北宋天圣元年重建"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：八角九层楼阁式砖塔，高 40.58 米；塔身东、西、南、北四面辟券门，砖檐层层叠涩出挑，塔内可以登临。它是苏北现存最高的古塔。",
    "<b>年代</b>：北宋天圣元年至九年（1023—1031）建成；据建塔时嵌于塔内壁的碑文，此地前已有塔，唐代号称全国第二，今塔是在旧址上重建。1956 年列为江苏省文物保护单位，2006 年列入全国重点文物保护单位。",
    "<b>命名</b>：塔旁原有海清寺，是花果山主庙三元宫的下院，寺毁塔存，俗称大村塔；因供养释迦真身舍利与阿育王灵牙而称阿育王塔。明代“古塔穿云”、清代“塔影团圆”都以它为云台山一景。"
  ],
  "legacyNames": [
    "海清寺阿育王塔",
    "阿育王塔"
  ],
  "legacyPlaces": [
    "江苏 · 连云港 · 花果山麓",
    "江苏",
    "连云港"
  ]
},
{
  "name": "玄妙观三清殿",
  "short": "玄妙观",
  "sub": "苏州 · 南宋九间大殿",
  "dyn": "song",
  "tag": "南宋",
  "era": "南宋 · 淳熙六年",
  "year": 1179,
  "yearLabel": "1179",
  "yearApprox": false,
  "place": "江苏 · 苏州 · 观前街",
  "placeKey": "suzhou",
  "lede": "面阔九间、四十五米长的一座大殿立在苏州最热闹的观前街上，南宋淳熙六年（1179）重建，是江南少见的大型南宋木构殿堂。三清殿重檐歇山，黑色筒瓦，正脊中央立铁铸的“平升三戟”，两端砖雕龙首。殿前一圈“钉钉石栏杆”是五代遗物，殿内西墙嵌着吴道子画、颜真卿书的老子像碑宋代复刻。图版只画三清殿单体，不含山门与香炉亭。",
  "id": "xuanmiao",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "hall"
  ],
  "caption": [
    "玄妙观 · 三清殿正面",
    "南宋淳熙六年（1179） · 九间重檐歇山"
  ],
  "tall": false,
  "facts": [
    "<b>形制</b>：坐北朝南，面阔九间 45 米，进深六间 25 米，建筑面积约 1100 平方米；重檐歇山顶覆黑色筒瓦，正脊中央铁铸“平升三戟”，两端砖刻大龙头，殿前围五代遗存的石栏杆。",
    "<b>年代</b>：观创于西晋咸宁二年（276），初名真庆道院；南宋毁于兵火，三清殿于淳熙六年（1179）重建，元元贞元年（1295）改称玄妙观，清康熙年间因避讳一度名圆妙观。1999 年维修时在殿前轴线上发现一口五代古井。",
    "<b>碑刻与劫难</b>：殿内西墙嵌老子画像石碑，吴道子作画、颜真卿书、唐玄宗御赞，宋代复刻；文革中“玉清”像头部被砍，殿一度改作展览场所，两廊配殿改为商店、仓库与菜场，1982 年列入全国重点文物保护单位。"
  ],
  "legacyNames": [
    "玄妙观三清殿",
    "玄妙观"
  ],
  "legacyPlaces": [
    "江苏 · 苏州 · 观前街",
    "江苏",
    "苏州"
  ]
},
{
  "name": "虎丘二山门",
  "short": "断梁殿",
  "sub": "苏州 · 虎丘断梁殿",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 至元四年重建",
  "year": 1338,
  "yearLabel": "1338",
  "yearApprox": false,
  "place": "江苏 · 苏州 · 虎丘",
  "placeKey": "suzhou",
  "lede": "正梁是“断”的——准确说，脊檩不是一根整木，而是两段圆木在中间对接，靠下面的斗栱和梁架把力分到两边，六百多年没出过事。虎丘二山门因此得名断梁殿，元至元四年（1338）重建，面阔三间、进深两间，单檐歇山，正面中央一道圆拱门洞。它和太湖东山的轩辕宫正殿同年建成，是苏州两座年代明确的元代木构。",
  "id": "duanliang",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "gate"
  ],
  "caption": [
    "虎丘二山门 · 断梁殿正面",
    "元至元四年（1338）重建 · 三间单檐歇山"
  ],
  "tall": false,
  "facts": [
    "<b>形制</b>：面阔三间、进深两间，单檐歇山顶；正面中央开圆拱门洞。脊檩由两段圆木对接而成，不用整料，故称“断梁”，并非整殿无梁，更不是梁断后悬空。",
    "<b>年代</b>：现存二山门为元至元四年（1338）重建，与东山轩辕宫正殿同年；虎丘山寺自五代、北宋屡有兴废，殿宇多毁于 1860 年太平天国战火，二山门幸存，是山上仅次于五代云岩寺塔的早期建筑。",
    "<b>价值</b>：断梁常被说成木构“奇迹”，实际是利用两侧梁架与斗栱分担荷载的拼接工艺，反映江南匠作就材取用的智慧；它与山顶 959—961 年建成的云岩寺塔一起，构成虎丘从五代到元代的早期建筑序列。"
  ],
  "legacyNames": [
    "虎丘二山门",
    "断梁殿",
    "断梁殿",
    "虎丘断梁殿"
  ],
  "legacyPlaces": [
    "江苏 · 苏州 · 虎丘",
    "江苏",
    "苏州"
  ]
},
{
  "name": "寂鉴寺石殿",
  "short": "寂鉴寺",
  "sub": "苏州 · 天池山西天寺",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 至正十七年",
  "year": 1357,
  "yearLabel": "1357",
  "yearApprox": false,
  "place": "江苏 · 苏州 · 天池山",
  "placeKey": "tianchishan",
  "lede": "一座用石头照着木构盖出来的小殿：石柱、石枋、石檩，连屋面都是石板，后墙直接贴着天池山的岩壁。寂鉴寺（旧称西天寺）石殿建于元至正十七年（1357），面阔三间 7.64 米、进深两间 5.52 米，单檐歇山，屋面低缓紧凑。殿东西两侧还有两座依着佛龛造的小石屋，一题“兜率宫”，一题“极乐园”，龛内立像也都是元代原物。",
  "id": "jijian",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "hall"
  ],
  "caption": [
    "寂鉴寺 · 西天寺石殿正面",
    "元至正十七年（1357） · 三间石构仿木"
  ],
  "tall": false,
  "facts": [
    "<b>形制</b>：石殿坐北朝南，面阔三间 7.64 米，进深二间 5.52 米，单檐歇山顶；柱、枋、檩与屋面均以石材仿木雕凿，殿后紧挨天然岩壁。图版所绘为石殿正面。",
    "<b>年代</b>：元至正十七年（1357）建寂鉴庵，明以后改为寺；现存石殿、佛龛及造像均为元代所建，2006 年列入全国重点文物保护单位。",
    "<b>附属石屋</b>：石殿东西各有一座依佛龛而建的仿木抱厦式石屋，面阔一间、进深半跨：西屋重檐歇山，龛内阿弥陀佛立像，题“极乐园”；东屋单檐歇山，龛内弥勒佛立像，题“兜率宫”。元代石仿木殿宇在江南少见，这是保存完整的一组。"
  ],
  "legacyNames": [
    "寂鉴寺石殿",
    "寂鉴寺"
  ],
  "legacyPlaces": [
    "江苏 · 苏州 · 天池山",
    "江苏",
    "天池山"
  ]
},
{
  "name": "轩辕宫正殿",
  "short": "轩辕宫",
  "sub": "苏州 · 东山杨湾",
  "dyn": "yuan",
  "tag": "元",
  "era": "元代 · 历代重修",
  "year": 1350,
  "yearLabel": "元代·历代重修",
  "yearApprox": true,
  "place": "江苏 · 苏州 · 东山杨湾",
  "placeKey": "dongshan_suzhou",
  "lede": "太湖东山杨湾的一座小殿，三间见方，歇山屋顶压得很低，檐口出得很远；它原来叫胥王庙，祭的是伍子胥，民国时才改祀黄帝、改名轩辕宫。正殿建于元至元四年（1338），与虎丘二山门同年，面阔 13.74 米、进深 11.43 米，脊高十米多。清顺治年间大修过一次，所以元代构架和明清修缮的痕迹留在同一座殿上。",
  "id": "xuanyuan",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "hall"
  ],
  "caption": [
    "东山杨湾 · 轩辕宫正殿",
    "三间单檐歇山 · 元代特征与明清修建并存"
  ],
  "tall": false,
  "facts": [
    "<b>形制</b>：正殿面阔三间 13.74 米，进深三间九檩 11.43 米，单檐歇山顶，脊高 10 米余；殿身近于方形，屋面坡度平缓，檐口深远。图版所绘为正殿正面。",
    "<b>年代</b>：始建年代不详，南宋绍兴年间重修并更名胥王庙，正殿为元至元四年（1338）所建；清顺治六年至十二年（1649—1655）再次大修，今日所见并非未经改动的元代原状。2006 年列入全国重点文物保护单位。",
    "<b>沿革</b>：此处最初是祭祀伍子胥的祠庙。伍子胥相传受吴王阖闾之命筑阖闾大城，苏州胥门、胥口都因他得名，端午赛龙舟在江浙一带也被视为纪念他；民国年间庙改祀黄帝，始称轩辕宫。"
  ],
  "legacyNames": [
    "轩辕宫正殿",
    "轩辕宫"
  ],
  "legacyPlaces": [
    "江苏 · 苏州 · 东山杨湾",
    "江苏",
    "东山"
  ]
},
{
  "name": "凤凰寺礼拜殿",
  "short": "凤凰寺",
  "sub": "杭州 · 元代砖券穹顶殿",
  "dyn": "yuan",
  "tag": "元",
  "era": "元代重建 · 历代修缮",
  "year": 1281,
  "yearLabel": "元代重建",
  "yearApprox": true,
  "place": "浙江 · 杭州 · 中山中路",
  "placeKey": "hangzhou",
  "lede": "杭州凤凰寺礼拜殿从外面看是三座并立的攒尖屋顶，走入殿内却能看到砖砌拱券与圆穹顶。较高的中央屋顶和两侧较小屋顶，把西亚礼拜空间与江南的瓦顶、翘角结合起来。现存核心是元代阿老丁资助重建的殿堂，明清与近现代又有修缮。它所保存的建筑语言，记录了杭州穆斯林社群长期在地生活的历史。",
  "id": "fenghuangsi",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "hall"
  ],
  "caption": [
    "凤凰寺礼拜殿 · 实景可见屋顶群",
    "元代核心殿，历代修缮 · 三攒尖顶与上部墙身"
  ],
  "tall": false,
  "facts": [
    "形制：礼拜殿以砖墙和拱券构成主体，内部横向分为三间，每间覆盖穹顶。外部另作攒尖瓦顶，中央较高且为重檐，使内部圆顶与外部屋面呈现不同形态。",
    "断代：礼拜殿为元代阿老丁主持资助重建的遗存，早于现存的其他寺内建筑。明清及新中国成立后多次修葺，不能把今日所有屋面装饰都视作元代原物。",
    "价值：砖券、穹顶与本地瓦顶在同一殿堂相接，见证不同营造传统的融合。它也是杭州穆斯林礼拜活动的历史空间，其意义同时存在于建筑和社群延续之中。"
  ],
  "legacyNames": [
    "凤凰寺礼拜殿",
    "凤凰寺"
  ],
  "legacyPlaces": [
    "浙江 · 杭州 · 中山中路",
    "浙江",
    "杭州"
  ]
},
{
  "name": "灵谷寺无梁殿",
  "short": "无梁殿",
  "sub": "南京 · 砖券大殿",
  "dyn": "ming",
  "tag": "明",
  "era": "明 · 洪武时期",
  "year": 1381,
  "yearLabel": "明洪武时期",
  "yearApprox": true,
  "place": "江苏 · 南京 · 钟山",
  "placeKey": "nanjing",
  "lede": "没有一根木头：灵谷寺无梁殿全部用砖砌成，三道东西并列的筒拱扛起屋顶，中拱跨十一米半、高十四米，前后檐墙厚达四米。它建于明洪武十四年（1381），原供无量寿佛，“无量殿”叫成了“无梁殿”，是全国同类砖殿里最大的一座。咸丰年间灵谷寺在战火中几乎夷平，只有这座砖殿挺了下来；1931 年它被改作国民革命军阵亡将士公墓的祭堂。",
  "id": "linggu",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "hall"
  ],
  "caption": [
    "灵谷寺无梁殿 · 砖券大殿正面",
    "明代遗构 · 重檐九脊与三塔脊饰"
  ],
  "tall": false,
  "facts": [
    "<b>形制</b>：殿内东西阔五间 53.8 米、南北深三间 37.85 米，殿顶高 22 米；重檐歇山、灰琉璃瓦，正脊立三座白琉璃喇嘛塔，中央塔座中空与殿内藻井相通可漏光。东西并列三道拱券，中券跨 11.5 米、高 14 米，侧券跨 5 米、高 7.4 米；前后檐墙各开三门，厚约 4 米。",
    "<b>年代</b>：灵谷寺于洪武十四年（1381）从独龙阜迁至此处，无梁殿同年建成；正统年间殿内祀三大佛、两侧列二十四诸天并藏经，清嘉庆、道光多次修葺；咸丰年间寺院殿宇大多毁于清军与太平军战火，仅此砖殿幸存。",
    "<b>改作祭堂</b>：1928 年国民政府在灵谷寺旧址建国民革命军阵亡将士公墓，1931 年无梁殿修葺后改为祭堂“正气堂”；四壁嵌太湖青石碑 110 块，刻北伐及淞沪、华北抗战阵亡将士名单 33224 人；1981 年南京市政府再次整修。"
  ],
  "legacyNames": [
    "灵谷寺无梁殿",
    "无梁殿"
  ],
  "legacyPlaces": [
    "江苏 · 南京 · 钟山",
    "江苏",
    "南京"
  ]
},
{
  "name": "飞来峰造像",
  "short": "飞来峰",
  "sub": "第68龛 · 布袋弥勒",
  "dyn": "song",
  "tag": "南宋",
  "era": "南宋 · 第68龛（传统断代）",
  "year": 1200,
  "yearLabel": "南宋（传统断代）",
  "yearApprox": true,
  "yearNote": "1200仅为南宋传统断代的时间轴约略位置，不是开凿年份。该龛无纪年题记，研究亦有元初说；不用966年附会纪年。",
  "place": "浙江杭州",
  "placeKey": "hangzhou",
  "lede": "冷泉溪畔，布袋弥勒依着布袋开怀而笑，罗汉们在岩龛里各具神情。第68龛把佛教造像带入生动的人间情态，也是飞来峰最熟悉的一幅面孔。",
  "id": "feilaifeng",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "grotto"
  ],
  "caption": [
    "飞来峰第68龛 · 布袋弥勒与邻近罗汉（局部）",
    "南宋（传统断代，亦有元初说）"
  ],
  "tall": false,
  "facts": [
    "<b>一龛群像</b> 完整第68龛以布袋弥勒为中心，左右各列九尊罗汉；本图仅取主尊与邻近四尊罗汉。",
    "<b>布袋与念珠</b> 主尊袒胸露腹，右手按布袋、左手执念珠，以布袋和尚形象表现弥勒信仰。",
    "<b>年代有争议</b> 通行介绍采用南宋断代，也有研究主张元初；该龛未留确切纪年，不能用单一年份概括全山造像。"
  ],
  "legacyNames": [
    "飞来峰造像",
    "飞来峰"
  ],
  "legacyPlaces": [
    "浙江杭州",
    "浙江",
    "杭州"
  ]
},
{
  "name": "新昌大佛寺",
  "short": "新昌大佛",
  "sub": "石弥勒像 · 南朝造像",
  "dyn": "nan",
  "tag": "南朝",
  "era": "南朝齐梁 · 石弥勒像",
  "year": 516,
  "yearLabel": "486—516年",
  "yearApprox": false,
  "yearNote": "516为梁天监十五年成像；486为僧护相关发愿起源纪年，具体开凿另有齐建武年间说。区分寺院东晋创建和后代重修。",
  "place": "浙江绍兴 · 新昌",
  "placeKey": "xinchang",
  "lede": "石城山仙髻岩的石窟里，石弥勒结跏趺坐，佛身高13.74米，两膝相距10.61米，是江南现存最大的南朝石刻造像，也是南方仅存的早期大型石窟造像。齐永明四年（486）僧护在崖壁下发愿开凿，身后僧淑接手，梁天监六年（507）建安王萧伟又遣僧祐主持，到天监十五年（516）像成——三代僧人、三十年工期，刻的只是一尊弥勒。殿阁只是罩在洞前的外壳，图版画的是石像本体。",
  "id": "xinchangdafo",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "grotto"
  ],
  "caption": [
    "新昌大佛寺 · 石弥勒像",
    "南朝齐梁 · 486—516年"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：依崖凿成的弥勒坐像，结跏趺坐，两手置于膝间；佛身高13.74米，佛座高1.91米，头高4.87米，两膝相距10.61米。像身藏在大殿后的石窟中，人在殿内只能仰视，窟内潮湿，像身易生冷凝水。",
    "<b>纪年</b>：齐永明四年（486）僧护发愿开凿，未成而卒，僧淑续凿；梁天监六年（507）建安王萧伟遣僧祐主持，天监十五年（516）告成，寺中存《梁建安王造剡山石城寺石像碑》记其事。开凿起始另有齐建武年间一说，年表以486为发愿起点。",
    "<b>价值</b>：江南第一大佛，与北方石窟同期而在南方几乎孤立；像身经历代妆饰修补，2021年4月起作三十年来首次大修，处理裂缝、积水与起皮剥落。寺院东晋初创、清光绪重建的殿阁与景区新造卧佛都不在图版范围。"
  ],
  "legacyNames": [
    "新昌大佛寺",
    "新昌大佛"
  ],
  "legacyPlaces": [
    "浙江绍兴 · 新昌",
    "浙江",
    "新昌"
  ]
},
{
  "name": "紫金庵",
  "short": "紫金庵",
  "sub": "罗汉塑像 · 半托迦",
  "dyn": "song",
  "tag": "宋",
  "era": "宋—明 · 罗汉塑像",
  "year": 1200,
  "yearLabel": "宋—明",
  "yearApprox": true,
  "yearNote": "1200仅为宋代罗汉艺术传统的时间轴约略定位，非确切塑造年；文保名录时代为宋—明，雷潮夫妇为相传作者。",
  "place": "江苏苏州 · 东山",
  "placeKey": "dongshan_suzhou",
  "lede": "十六尊罗汉分坐大殿两侧，个个只有一米出头，却像十六个有脾气的人：有的垂目，有的侧耳，有的手指轻轻搭在一起。紫金庵的罗汉相传是南宋雷潮夫妇所塑，文物名录定为宋至明；殿里连三世佛、观音、二十诸天、四大天王共五十多尊塑像，殿宇本身却是明清重建。图版取的是半托迦尊者的上半身。",
  "id": "zijinan",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "sculpture"
  ],
  "caption": [
    "紫金庵 · 半托迦尊者（上身局部）",
    "宋—明 · 历代修护"
  ],
  "tall": true,
  "facts": [
    "<b>塑像</b>：大殿内存三世佛、观音、十六罗汉、二十诸天、四大天王等塑像五十余尊；十六罗汉分列两侧，高约 1.13 米，坐姿、衣纹与神情各不相同。图版所绘为其中的半托迦尊者上身局部。",
    "<b>年代</b>：庵的始建有南朝、唐代两说；现存大殿、净因堂、听松堂、白云居等均为明清所建。罗汉据载为南宋雷潮夫妇所作，但作者无定论，2006 年列入全国重点文物保护单位时时代定为宋至明。",
    "<b>比较</b>：苏州吴中有两处宋代罗汉名作：甪直保圣寺只剩九尊，嵌在山水塑壁里；紫金庵十六尊齐全，独立列坐，彩绘与修补含不同时期的痕迹，是观察宋以来江南罗汉造像的完整样本。"
  ],
  "legacyNames": [
    "紫金庵"
  ],
  "legacyPlaces": [
    "江苏苏州 · 东山",
    "江苏",
    "东山"
  ]
},
{
  "name": "保圣寺",
  "short": "保圣寺",
  "sub": "罗汉塑像 · 山水塑壁",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋 · 罗汉塑像",
  "year": 1050,
  "yearLabel": "北宋",
  "yearApprox": true,
  "yearNote": "1050仅作北宋年代的时间轴约略定位，非确切塑造年；原始1961国保名单列北宋，传为唐杨惠之作不作作者定论。",
  "place": "江苏苏州 · 甪直",
  "placeKey": "luzhi",
  "lede": "墙不是背景，而是山：罗汉嵌在起伏的塑壁里，山石、云气、洞窟和人物一起从墙面上塑出来，九尊各据一处。保圣寺这半堂罗汉，1918 年被顾颉刚在甪直小镇上撞见，日本学者大村西崖专程来看，称为“吴郡奇迹”。旧传出自唐代“塑圣”杨惠之之手，1961 年文物名录定为北宋；1928 年大殿半塌，十八尊只剩九尊，如今安置在 1930 年代为它们新建的古物馆里。图版取其中一尊。",
  "id": "baosheng",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "sculpture"
  ],
  "caption": [
    "保圣寺 · 罗汉塑像与山石塑壁（局部）",
    "北宋 · 后世修补"
  ],
  "tall": true,
  "facts": [
    "<b>塑壁</b>：现存罗汉九尊，依附于一整面山水塑壁，山石、云气、洞窟穿插其间，人物坐姿与神情各异，衣纹宽博、面容清瘦；原为十八尊，1928 年大殿半塌时毁去九尊。图版所绘为其中一尊。",
    "<b>年代</b>：寺建于梁天监二年（503），北宋大中祥符六年（1013）重建；塑像旧传为唐杨惠之作，清《吴门表隐》即持此说，1961 年首批全国重点文物保护单位名单将其定为北宋，作者归属不作定论。",
    "<b>抢救</b>：1922 年顾颉刚撰文为“一千年的美术品”呼救，大村西崖 1926 年出版《吴郡奇迹塑壁残影》；1929 年蔡元培等组成唐塑罗汉保存会，范文照设计的古物馆于 1930 年代初落成安置余像。梁思成称其“实我国美术造物中最可贵者”。"
  ],
  "legacyNames": [
    "保圣寺"
  ],
  "legacyPlaces": [
    "江苏苏州 · 甪直",
    "江苏",
    "甪直"
  ]
},
{
  "name": "如龙桥",
  "short": "如龙桥",
  "sub": "月山木拱廊桥",
  "dyn": "ming",
  "tag": "明",
  "era": "明 · 天启五年",
  "year": 1625,
  "yearLabel": "1625年",
  "yearApprox": false,
  "yearNote": "据县志为1625修造，后世修理不等于整桥构件均为明代原件。",
  "place": "浙江丽水 · 庆元",
  "placeKey": "qingyuan_zj",
  "lede": "长廊横过溪水，桥头高楼抬起屋脊，木拱在板壁下留下宽阔的折线。如龙桥把渡溪的道路与可停留的廊屋连在一起，是月山村的明代木拱廊桥。",
  "id": "rulong",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "bridge"
  ],
  "caption": [
    "如龙桥 · 木拱桥廊与桥头楼阁",
    "明 · 天启五年（1625）修造"
  ],
  "tall": false,
  "facts": [
    "<b>天启修造</b> 县志载如龙桥于明天启五年（1625）修造，是庆元现存明代木拱廊桥之一。",
    "<b>木拱承重</b> 桥身以木拱架跨溪，两端落在石砌桥台上；防护板保护拱架，廊屋为行人遮风避雨。",
    "<b>高低错落</b> 北端三重檐歇山顶钟楼高起，与中部屋顶、南端入口形成有层次的长桥轮廓。"
  ],
  "legacyNames": [
    "如龙桥"
  ],
  "legacyPlaces": [
    "浙江丽水 · 庆元",
    "浙江",
    "庆元"
  ]
},
{
  "name": "八字桥",
  "short": "八字桥",
  "sub": "三街三河 · 石梁古桥",
  "dyn": "song",
  "tag": "南宋",
  "era": "南宋 · 宝祐四年",
  "year": 1256,
  "yearLabel": "1256年重建",
  "yearApprox": false,
  "yearNote": "1256为地方志所载重建年，另有1783年重修；今日所见含历代修缮，不表示每块石构件均为1256年原件。",
  "place": "浙江绍兴",
  "placeKey": "shaoxing",
  "lede": "八字桥把绍兴水城的复杂路口化为一组错落石阶。主桥跨过河道，两端向不同方向分出踏跺，让沿河街巷与过桥道路相接，也为舟船和河岸通行留下空间。桥名来自相对斜出的八字形布局。南宋宝祐四年的重建记载为它提供了年代依据，今日石构又包含后世修护，是观察古城水陆交通的实物窗口。",
  "id": "baziqiao",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "bridge"
  ],
  "caption": [
    "八字桥 · 南侧石梁桥与沿河石阶",
    "南宋 · 宝祐四年（1256）重建"
  ],
  "tall": false,
  "facts": [
    "形制：桥的主体为石梁结构，石墩承托梁石，两头踏跺顺应街道与河岸转折。它的特色在于多方向落坡的组合，不是以一座高大的圆拱解决全部交通。",
    "断代：地方记载与桥柱题记指向南宋宝祐四年重建，即一二五六年。此后清代和近现代继续修缮，重建纪年说明重要营造阶段，并非所有现存石料的生产年份。",
    "价值：桥、街、河彼此嵌合，把步行、沿岸往来和水运置于同一节点。保留下来的石梁与踏跺，使人能直接理解绍兴依水设街、借桥联巷的城市组织方式。"
  ],
  "legacyNames": [
    "八字桥"
  ],
  "legacyPlaces": [
    "浙江绍兴",
    "浙江",
    "绍兴"
  ]
},
{
  "name": "杭州龙兴寺经幢",
  "short": "龙兴寺经幢",
  "sub": "唐代石幢 · 幢身局部",
  "dyn": "tang",
  "tag": "唐",
  "era": "开成二年 · 上部清修",
  "year": 837,
  "yearLabel": "837年",
  "place": "浙江杭州 · 延安路",
  "placeKey": "hangzhou",
  "lede": "延安路与凤起路口的车流旁，立着浙江现存最早的石经幢。它建于唐开成二年（837），原是龙兴寺的东西两幢之一，寺在1959年拓路时拆尽，只剩下这一根。幢身八面刻《佛顶尊胜陀罗尼经》，书迹出自唐人胡季良，清代阮元称之为“杭州金石之冠”。图版所绘为八角幢身的局部，石上的裂缝与补缝都照实留着——一千一百多年的保存与修护叠在同一块石头上。",
  "id": "longxingchuang",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pillar"
  ],
  "caption": [
    "龙兴寺经幢 · 幢身局部",
    "唐开成二年 · 837年"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：石幢通高约4.2米，由须弥座、磐石、幢身、腰檐、短柱、上檐、宝幢顶叠成；八角磐石每面雕勾栏、云拱，华板刻菱形规矩纹，是唐代建筑构件难得的实物；短柱雕四佛、八胁侍、四力士共十六尊。图版只取幢身及其承托石。",
    "<b>题记</b>：幢身额题篆书“佛顶尊胜陀罗尼经微妙救危济急之宝幢”，八面每面十列、第四面十一列，前为经序行书，后为经文与题记正书。《龙兴尊胜幢记》载“石高五尺六寸，八面，周广六尺四寸”。开成二年（837）立，书迹出自胡季良。",
    "<b>价值</b>：龙兴寺创于梁大同二年（536），盛时“广袤九里有余”，或为杭州历史上最大的佛寺，今寺废幢存。胡季良书迹传世极少，《宣和书谱》称其字体温润，阮元《两浙金石志》誉此幢为“武林城中罕见的唐人遗迹”。"
  ],
  "legacyNames": [
    "杭州龙兴寺经幢",
    "龙兴寺经幢"
  ],
  "legacyPlaces": [
    "浙江杭州 · 延安路",
    "浙江",
    "杭州"
  ]
},
{
  "name": "杭州灵隐寺石塔与经幢",
  "short": "灵隐石塔经幢",
  "sub": "九层石塔 · 陀罗尼经幢",
  "dyn": "zhou",
  "tag": "吴越",
  "era": "吴越 · 960年石塔、969年经幢",
  "year": 960,
  "yearLabel": "960 · 969",
  "place": "浙江杭州 · 灵隐寺",
  "placeKey": "hangzhou",
  "lede": "灵隐寺今天的殿堂都是清代以后重建的，真正的老物件只有大雄宝殿前的两座石塔和天王殿前的两座经幢。石塔八面九层、高11米，实心，把木塔的平座、塔身、塔檐一层层照搬到石头上，平座用四铺作、檐下五铺作，与《营造法式》所载一致，建于北宋建隆元年（960），仍在钱氏治下；经幢建于开宝二年（969），原在钱氏家庙奉先寺，北宋景祐二年（1035）才迁来。图版各取一座并置。",
  "id": "lingyin",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda",
    "pillar"
  ],
  "caption": [
    "石塔与经幢 · 对照线稿",
    "吴越 · 960 · 969年"
  ],
  "tall": false,
  "facts": [
    "<b>石塔</b>：双塔高11米，八面九层，实心，东西相距42米；塔基雕“九山八海”，束腰八面满刻《大佛顶陀罗尼经》；塔身四面隐出槏柱分三间，中间作壶门，雕门钉与铺首，另四面浮雕佛、菩萨与佛教故事；平座四铺作，塔檐五铺作，塔刹已毁。",
    "<b>经幢</b>：双幢以太湖石雕成，相距74米，东幢残高9.46米、西幢13.2米；三层须弥座分别雕四龙、十六龛菩萨、八龛五身像；幢身八面，七面刻经一面刻幢记，两幢所刻经文不同。开宝二年（969）钱弘俶建于奉先寺，景祐二年（1035）迁建于此。",
    "<b>价值</b>：灵隐寺相传创于东晋咸和元年（326），钱弘俶时增至殿宇一千三百间，今存建筑皆清代以后陆续重建，双塔双幢是寺中最古的实物。梁思成1930年代测绘后指出，灵隐双塔与闸口白塔规制几乎相同，很可能出自同一批工匠。"
  ],
  "legacyNames": [
    "杭州灵隐寺石塔与经幢",
    "灵隐石塔经幢"
  ],
  "legacyPlaces": [
    "浙江杭州 · 灵隐寺",
    "浙江",
    "杭州"
  ]
},
{
  "name": "苏州罗汉院双塔及正殿遗址",
  "short": "罗汉院双塔",
  "sub": "七级八面双塔 · 宋代石柱",
  "dyn": "song",
  "tag": "北宋",
  "era": "太平兴国七年起建",
  "year": 982,
  "yearLabel": "982年起建",
  "place": "江苏苏州 · 定慧寺巷",
  "placeKey": "suzhou",
  "lede": "两座一模一样的砖塔并肩站着，细高的铁刹差不多占了塔高的四分之一，是已知最早的大型铁塔刹。北宋太平兴国七年（982）王文罕兄弟捐建，八角七层，通高 33.3 米；塔室除第二层外全是方形，一层一层转着 45 度叠上去，外观仍是八角。塔北二十一米是 1860 年毁于战火的正殿，十六根雕花石柱还立在原位。",
  "id": "luohanshuangta",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "罗汉院双塔 · 石柱遗迹",
    "北宋 · 太平兴国七年始建"
  ],
  "tall": false,
  "facts": [
    "<b>形制</b>：两塔规模结构相同，八角七层楼阁式砖塔，通高 33.3 米，底层每边 5.5 米；每层四面辟门、四面隐刻直棂窗，檐以砖叠涩挑出；塔室除二层为八角外均为方形，逐层错转 45 度；铁刹高约 8 米。",
    "<b>年代</b>：寺前身为唐咸通年间的般若院，吴越时改称罗汉院，北宋太平兴国七年（982）王文罕三兄弟建双塔，分名舍利塔与功德舍利塔；清咸丰十年（1860）正殿毁于战火，仅存遗址。",
    "<b>正殿遗址</b>：殿基在双塔北 21 米，方形、面阔进深各三间；存石柱 16 根、高约 4 米，有雕花圆柱、瓜棱柱、八角柱三式，覆盆柱础 30 个，前檐六柱通体浮雕牡丹、莲、葵与婴戏，是宋代建筑石雕的精品。"
  ],
  "legacyNames": [
    "苏州罗汉院双塔及正殿遗址",
    "罗汉院双塔",
    "苏州双塔",
    "罗汉院双塔"
  ],
  "legacyPlaces": [
    "江苏苏州 · 定慧寺巷",
    "江苏",
    "苏州"
  ]
},
{
  "name": "苏州瑞光塔",
  "short": "瑞光塔",
  "sub": "盘门 · 七级八面楼阁式塔",
  "dyn": "song",
  "tag": "北宋",
  "era": "景德元年至天圣八年营建",
  "year": 1004,
  "yearLabel": "1004—1030",
  "place": "江苏苏州 · 盘门",
  "placeKey": "suzhou",
  "lede": "1978 年，几个爬塔玩的孩子在第三层塔心的天宫里撞见一只木函，里面是镶着四万多颗珍珠的真珠舍利宝幢——瑞光塔因此出名。塔立在盘门内，七级八面，砖身外加木檐回廊，高约 43 米；塔砖、函匣、石佛上的纪年题记，把现存塔身的营造定在北宋景德元年至天圣八年（1004—1030）之间。寺传始于东吴，只是沿革。",
  "id": "ruiguang",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "瑞光塔 · 七级八面",
    "北宋塔身 · 木檐后修"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：七级八面楼阁式砖木塔，高约 43 米；砖砌塔身承重，外加木构腰檐与平座回廊，塔基有简朴的佛教雕刻。寺院殿堂早已荒废，盘门内只剩此塔。",
    "<b>纪年</b>：塔内先后发现的宝幢木函、佛经、石佛、石础、塔砖上的纪年文字，把今塔定为北宋景德元年至天圣八年（1004—1030）所建；盛宝幢的木函内壁墨书“大中祥符六年（1013）四月十八日记”。南宋淳熙以降历代修葺，1860 年寺毁塔存。",
    "<b>天宫</b>：1978 年 4 月在第三层天宫发现五代至北宋初文物一批，以真珠舍利宝幢最精：通高 122.6 厘米，楠木为骨，分须弥座、佛宫、塔刹三部分，集木雕、描金、玉雕与金银细工于一身，嵌珍珠四万余颗，现藏苏州博物馆。"
  ],
  "legacyNames": [
    "苏州瑞光塔",
    "瑞光塔"
  ],
  "legacyPlaces": [
    "江苏苏州 · 盘门",
    "江苏",
    "苏州"
  ]
},
{
  "name": "东台海春轩塔",
  "short": "海春轩塔",
  "sub": "西溪 · 广福寺塔",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐建宋修 · 始建确年待考",
  "year": 750,
  "yearLabel": "唐建宋修",
  "yearApprox": true,
  "yearNote": "750仅作唐代中段的年表约略定位，不代表有证据的营建年；尉迟敬德监造仅作为传说沿革。",
  "place": "江苏东台 · 西溪",
  "placeKey": "dongtai",
  "lede": "两座塔套在一起：外层是宋代砖身，里面包着一座更早的塔，当地叫“塔抱塔”。它立在西溪运盐河边，七层八角、密檐收分，高 20.8 米。地方传说唐代这里紧挨大海，塔原是给盐船指路的灯塔，海岸线东退后才成了广福寺的佛塔。文物名录定为唐代，尉迟敬德监造只是沿革传说，始建确年仍待考。",
  "id": "haichunxuan",
  "country": "CN",
  "initialStatus": "wishlist",
  "types": [
    "pagoda"
  ],
  "caption": [
    "海春轩塔 · 七级八角",
    "唐代古塔 · 宋代修葺"
  ],
  "tall": true,
  "facts": [
    "<b>形制</b>：七层八角砖砌密檐塔，高 20.8 米，底层直径 7.2 米；塔身由内外两层砖壁套叠而成，俗称“塔抱塔”，外层属宋代修葺、内层更早，上部各层壁面开小龛。",
    "<b>年代</b>：地方相传唐贞观年间由尉迟敬德监造，故又名尉迟塔，但无文献确证；文物名录列为唐代，宋代修葺有据，始建年只能约略定在唐。1982 年列为江苏省文物保护单位，2013 年列入全国重点文物保护单位。",
    "<b>功能</b>：塔址原在海边，传说最初是导航的灯塔，随黄河夺淮、海岸东移，塔离今日海岸已约 75 公里，才改作广福寺佛塔；地方资料称它是江苏现存塔龄最长的砖塔，见证了两淮盐场与海岸的变迁。"
  ],
  "legacyNames": [
    "东台海春轩塔",
    "海春轩塔"
  ],
  "legacyPlaces": [
    "江苏东台 · 西溪",
    "江苏",
    "东台"
  ]
});

// 河南、河北、山西补遗：82处均完成实拍参考与 image_gen 图版。
SITES.push({
  "name": "少林寺初祖庵",
  "short": "初祖庵",
  "sub": "初祖庵大殿正面",
  "dyn": "song",
  "tag": "宋",
  "era": "宋 · 1125",
  "year": 1125,
  "yearLabel": "1125",
  "yearApprox": false,
  "yearNote": "采用所绘主体或本条明列营建阶段的纪年，后世修缮另述。",
  "place": "河南 · 登封",
  "lede": "一座只有三间见方的小殿，却是研究《营造法式》最好的实物教材：它建于北宋宣和七年（1125），比《营造法式》刊行晚二十余年，斗拱、梁架、雕饰多与书中规定相合。前檐六根石柱满雕卷草飞禽，殿内四根石柱刻天王盘龙，石柱撑着深远的木檐和硕大的铺作。这是为纪念达摩面壁而建的庵院，大殿是河南现存最早的木构之一。图版所绘为大殿正面。",
  "id": "hn_chuzu",
  "country": "CN",
  "province": "河南",
  "placeName": "登封",
  "placeKey": "dengfeng",
  "lat": 34.50899167,
  "lon": 112.92960278,
  "initialStatus": "unvisited",
  "caption": [
    "少林寺初祖庵 · 初祖庵大殿正面",
    "宋 · 1125"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：大殿面阔三间、进深三间，单檐歇山顶，绿琉璃瓦剪边，出檐深远，檐下置硕大斗拱；明间安板门两扇，两次间辟直棂窗。前檐立六根满雕卷草、飞禽的石柱，殿内石柱四根雕天王、盘龙，梁架彻上明造，三面山墙有彩画。",
    "<b>纪年</b>：建于北宋宣和七年（1125），后世多次重修，主要构件仍为宋代原物；殿内群肩石、檐柱、内柱与须弥座束腰的浮雕均为创建时所刻。壁画存二十余幅禅宗祖师像，约绘于明末。庵前千佛阁为明代所建，山门1986年按旧制重建。",
    "<b>价值</b>：与济渎庙寝宫并列为河南仅存的两座宋代木构，建造年代与《营造法式》成书相近，斗拱、梁架、雕饰多与书中做法相符，是宋代官式木构技术的重要例证。庵院为纪念少林寺初祖达摩面壁而建，2010年随少林寺建筑群列入“天地之中”世界遗产。"
  ],
  "legacyNames": [
    "少林寺初祖庵",
    "初祖庵",
    "少林初祖庵",
    "少林寺初祖庵大殿"
  ],
  "legacyPlaces": [
    "河南",
    "登封",
    "河南 · 登封"
  ],
  "tall": false
},
{
  "name": "嵩山中岳庙",
  "short": "中岳庙",
  "sub": "峻极殿中央立面局部",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 清代",
  "year": 1750,
  "yearLabel": "清代",
  "yearApprox": true,
  "yearNote": "1750为清代现貌约略排序，非峻极殿确切重建年；1986年曾大修。",
  "place": "河南 · 登封",
  "lede": "中岳庙峻极殿立在高台上，中央门窗和石阶在古树之间显露，重檐庑殿向两翼延展。全殿九间的规模属于祭祀中岳神的礼仪核心，眼前中央部分只是宽阔正面的一个片段。庙宇历史远早于今日殿貌，清代复建和后来的修缮把古老山岳信仰落实为可见的官式建筑，也使轴线的层层递进有了终点。",
  "id": "hn_zhongyue",
  "country": "CN",
  "province": "河南",
  "placeName": "登封",
  "placeKey": "dengfeng",
  "lat": 34.459167,
  "lon": 113.067778,
  "initialStatus": "unvisited",
  "caption": [
    "嵩山中岳庙 · 峻极殿中央立面局部",
    "清 · 清代"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "峻极殿全殿面阔九间、进深五间，重檐庑殿覆黄琉璃瓦，前设高台与月台；中央五间的门窗和石阶，在古树掩映中显出主殿的中轴与尺度。",
    "现存建筑多复建于清代，并经后世修缮；约一七五〇年是现貌的近似定位，尚非峻极殿确切重建年，早期太室祠沿革也不等于这座殿的建造年代。",
    "中岳庙沿山势向北逐级升高，门、坊、亭与殿组织连续院落，至峻极殿形成祭祀中心；这种官式轴线将登临路径与山岳崇拜的礼仪秩序结合起来。"
  ],
  "legacyNames": [
    "嵩山中岳庙",
    "中岳庙"
  ],
  "legacyPlaces": [
    "河南",
    "登封",
    "河南 · 登封"
  ],
  "tall": false
},
{
  "name": "登封观星台",
  "short": "观星台",
  "sub": "台体与石圭正面",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 1276",
  "year": 1276,
  "yearLabel": "1276",
  "yearApprox": false,
  "yearNote": "采用所绘主体或本条明列营建阶段的纪年，后世修缮另述。",
  "place": "河南 · 登封",
  "lede": "登封观星台把测量日影的仪器放大成一座砖石建筑。方形台身向上收拢，北侧狭槽对准伸向地面的石圭，台旁阶梯通向高处。郭守敬主持的元代观测在这里留下了具体尺度：观星并非只仰望夜空，太阳正午的影长也能用来判断节气与一年长短。",
  "id": "hn_guanxing",
  "country": "CN",
  "province": "河南",
  "placeName": "登封",
  "placeKey": "dengfeng",
  "lat": 34.402406,
  "lon": 113.140711,
  "initialStatus": "unvisited",
  "caption": [
    "登封观星台 · 台体与石圭正面",
    "元 · 1276"
  ],
  "types": [
    "observatory"
  ],
  "facts": [
    "台体用砖石砌成，上部较窄，北面留有贯通的测影槽；东西两侧阶梯登台，槽下的石圭向北延伸，使高处投下的日影落在可测量的平面上。",
    "观星台建于元至元十三年，即一二七六年，与郭守敬主持的测天工作相联系；附近周公测景台属于另一处遗存，不能把两者的建造年代混用。",
    "石圭两侧水渠和水池帮助校平，减少测影误差；这种建筑与仪器相结合的办法，展示了传统历法如何依靠反复观测，而非仅凭抽象推算。"
  ],
  "legacyNames": [
    "登封观星台",
    "观星台"
  ],
  "legacyPlaces": [
    "河南",
    "登封",
    "河南 · 登封"
  ],
  "tall": false
},
{
  "name": "登封会善寺",
  "short": "会善寺",
  "sub": "元代大殿正面",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 元代",
  "year": 1300,
  "yearLabel": "元代",
  "yearApprox": true,
  "yearNote": "所绘主体按元代断代；数值年份仅为约略排序。",
  "place": "河南 · 登封",
  "lede": "会善寺的五间大殿在嵩山南麓展开宽阔正面，歇山屋顶由层叠斗栱托起，中央门道与两旁窗间排列分明。寺院沿革远早于眼前的元代木构，碑刻与后世修缮又为它添上不同年代的痕迹。走近檐下，可以从宽屋盖、较少的内柱和外露梁架，理解佛殿如何获得开敞的礼佛空间。",
  "id": "hn_huishan",
  "country": "CN",
  "province": "河南",
  "placeName": "登封",
  "placeKey": "dengfeng",
  "lat": 34.49306,
  "lon": 112.99889,
  "initialStatus": "unvisited",
  "caption": [
    "登封会善寺 · 元代大殿正面",
    "元 · 元代"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "大殿面阔五间、进深三间，采用单檐歇山顶和五铺作双下昂斗栱；殿内减柱的处理扩大了礼佛空间，使外部宽阔屋盖与内部梁架相互呼应。",
    "寺院创建与重修跨越多个时期，现存大殿按元代木构断代，确切建年尚未明确；年表约一三〇〇年只是定位，不能代替营建题记或实测证据。",
    "寺内碑刻保存着不同阶段的佛教活动和修寺记录，与大殿的结构证据互相补充；这处遗存适合观察寺院悠久历史与单座现存建筑之间的区别。"
  ],
  "legacyNames": [
    "登封会善寺",
    "会善寺"
  ],
  "legacyPlaces": [
    "河南",
    "登封",
    "河南 · 登封"
  ],
  "tall": false
},
{
  "name": "开封铁塔",
  "short": "开封铁塔",
  "sub": "祐国寺琉璃塔",
  "dyn": "song",
  "tag": "宋",
  "era": "宋 · 1049",
  "year": 1049,
  "yearLabel": "1049",
  "yearApprox": false,
  "yearNote": "采用所绘主体或本条明列营建阶段的纪年，后世修缮另述。",
  "place": "河南 · 开封",
  "lede": "它不是铁的。褐色琉璃砖远看像铁锈，元代起开封人就叫它铁塔。北宋皇祐元年（1049），仁宗在雷火焚毁的灵感木塔原址改建砖塔，八角十三层，高55.88米，是中国现存最早、最高的琉璃砖塔。塔身满砌花纹砖，立佛、飞天、麒麟、乐伎五十余种；九百多年里经地震数十次、黄河水患多回，塔身未倒。图版所绘为全塔立面。",
  "id": "hn_tieta",
  "country": "CN",
  "province": "河南",
  "placeName": "开封",
  "placeKey": "hn_开封",
  "lat": 34.816667,
  "lon": 114.364889,
  "initialStatus": "unvisited",
  "caption": [
    "开封铁塔 · 祐国寺琉璃塔",
    "宋 · 1049"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：等边八角十三层楼阁式砖塔，高55.88米，底层每面宽4.16米，向上逐层递减；外壁镶嵌红、褐、蓝、绿琉璃砖，花纹砖图案五十余种，檐下悬风铃。层层平座兼作排水，减轻雨水对塔身的冲刷。",
    "<b>纪年</b>：原址为吴越名匠喻浩所建开宝寺灵感木塔，北宋庆历四年（1044）遭雷火焚毁；仁宗下令改以砖石重建，皇祐元年（1049）建成，初称开宝寺塔，明代随寺更名祐国寺塔。抗战时曾遭日军炮击，1956年修葺后开放。",
    "<b>价值</b>：琉璃砖首次用于造塔，“铁塔”之名自元代流行。塔身历经数十次地震与多次黄河水患而不倒，1847年黄河决口冲毁祐国寺，塔独存。1961年列入第一批全国重点文物保护单位。"
  ],
  "legacyNames": [
    "开封铁塔",
    "祐国寺塔"
  ],
  "legacyPlaces": [
    "河南",
    "开封",
    "河南 · 开封"
  ],
  "tall": true
},
{
  "name": "开封繁塔",
  "short": "繁塔",
  "sub": "现存三层主体与小塔",
  "dyn": "song",
  "tag": "宋",
  "era": "宋 · 974 · 后世修补",
  "year": 974,
  "yearLabel": "974 · 后世修补",
  "yearApprox": false,
  "yearNote": "974为宋代主体创建年；顶部小塔和修补细部不使用此年断代。",
  "place": "河南 · 开封",
  "lede": "“铁塔高，铁塔高，铁塔只搭繁塔腰”——开封人这样唱，因为繁塔原是六角九层，北宋开宝七年（974）起建，是开封第一座佛塔。现在只剩三层粗壮的塔身，顶上却坐着一座清初加筑的小塔，远看像一口编钟。通高36.68米，塔身内外一砖一佛，近七千尊。图版所绘为现存三层主体与顶部小塔，不复原九层旧貌。",
  "id": "hn_fanta",
  "country": "CN",
  "province": "河南",
  "placeName": "开封",
  "placeKey": "hn_开封",
  "lat": 34.770613,
  "lon": 114.358728,
  "initialStatus": "unvisited",
  "caption": [
    "开封繁塔 · 现存三层主体与小塔",
    "宋 · 974 · 后世修补"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：六角形楼阁式砖塔，现存三层，通高36.68米，塔基面积501.6平方米，残塔顶上加筑六级小塔。塔身内外遍嵌造像砖，佛、菩萨、乐伎等110余种、近7000尊；塔内存碑刻200余方，其中宋代佛经碑184块，多为赵安仁所书。",
    "<b>纪年</b>：北宋开宝七年（974）始建，原名兴慈塔，因在天清寺内又称天清寺塔，边募资边建，约淳化元年（990）后竣工。明嘉靖六年（1527）李梦阳《国相寺重修记》称“国初铲王气，塔七级去其四”；清初僧人在残塔上封顶加筑小塔。",
    "<b>价值</b>：繁塔是开封地面现存最老的建筑，登塔须穿壁绕平座、里攀外旋。它的造型至今有争议：传统说法认为是明初拆毁所致，宋喜信则主张现状即宋代原型，“九层”本就是三层大塔加六级小塔。"
  ],
  "legacyNames": [
    "开封繁塔",
    "繁塔",
    "天清寺塔"
  ],
  "legacyPlaces": [
    "河南",
    "开封",
    "河南 · 开封"
  ],
  "tall": false
},
{
  "name": "开封山陕甘会馆",
  "short": "山陕甘会馆",
  "sub": "木牌楼正面",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 清代",
  "year": 1780,
  "yearLabel": "清代",
  "yearApprox": true,
  "yearNote": "所绘主体按清代断代；数值年份仅为约略排序。",
  "place": "河南 · 开封",
  "lede": "开封山陕甘会馆的木牌楼以高低错落的五座屋顶迎接来客，中央通道宽敞，两组前后伸展的柱簇在石础上托住繁密木雕。它既是会馆院落中的门面，也是关公祭祀的一部分。乾隆时期三省商人在此联络乡谊、救济同乡，牌楼上的故事与吉祥纹样，将财富、道德愿望和来自家乡的记忆一同展示出来。",
  "id": "hn_kfhuiguan",
  "country": "CN",
  "province": "河南",
  "placeName": "开封",
  "placeKey": "hn_开封",
  "lat": 34.798411,
  "lon": 114.347419,
  "initialStatus": "unvisited",
  "caption": [
    "开封山陕甘会馆 · 木牌楼正面",
    "清 · 清代"
  ],
  "types": [
    "gate"
  ],
  "facts": [
    "木牌楼为三间六柱五楼，六柱分成两组三柱支撑，平面前后展开如鸡爪；中央楼顶高起，两侧依次降低，抱鼓石与高石础衬托通透的门道。",
    "会馆由山西、陕西、甘肃商人在清乾隆四十一年即一七七六年聚资创建；牌楼属于清代遗构，约一七八〇年只作定位，不直接认作单体竣工年。",
    "会馆兼顾关公祭祀、同乡联络及救济事务，牌楼木石雕刻把人物故事与吉祥图案放在入口处；它说明商帮建筑也承担道德表达和乡土认同的功能。"
  ],
  "legacyNames": [
    "开封山陕甘会馆",
    "山陕甘会馆"
  ],
  "legacyPlaces": [
    "河南",
    "开封",
    "河南 · 开封"
  ],
  "tall": false
},
{
  "name": "巩县石窟",
  "short": "巩县石窟",
  "sub": "第一窟 · 中心柱造像",
  "dyn": "bei",
  "tag": "北魏",
  "era": "北魏晚期",
  "year": 520,
  "yearLabel": "北魏晚期",
  "yearApprox": true,
  "yearNote": "520仅作北魏晚期造像阶段的近似排序点，不视为窟龛确切题记年。",
  "place": "河南 · 巩义 · 河洛镇寺湾村",
  "lede": "北魏迁都洛阳后开凿的皇家石窟，除龙门之外还有这一处。巩县石窟五窟之中四窟采用中心柱，礼佛者绕柱而行，正是龙门没有的窟形。第一窟窟高6米，中心方柱边宽2.8米，四面各开一龛，龛内一佛二菩萨二弟子，佛座两侧蹲狮；门内两壁的三层帝后礼佛图，是全国石窟中少见的完整作品。图版取中心柱一面的主像与胁侍，不含邻壁浮雕。",
  "id": "hn_gongyi",
  "country": "CN",
  "province": "河南",
  "placeName": "巩义",
  "placeKey": "hn_gongyi",
  "lat": 34.81317222,
  "lon": 113.02405,
  "initialStatus": "unvisited",
  "caption": [
    "巩县石窟第一窟 · 中心柱主像与胁侍",
    "北魏晚期 · 石窟造像轮廓"
  ],
  "types": [
    "grotto",
    "sculpture"
  ],
  "facts": [
    "<b>第一窟</b>：平面方形，窟高6米；中心方柱边宽2.8米，四面各雕一龛，内为一佛、二菩萨、二弟子，佛座两侧各雕一狮，基座刻力士与神王。东、西、北三壁各列四大龛，南壁门内东西两侧的千佛龛下各雕三层礼佛图，东为皇帝、西为皇后。",
    "<b>年代</b>：唐龙朔二年（662）碑记北魏孝文帝在此创建希玄寺；明弘治七年（1494）碑记宣武帝景明年间（500—503）凿石造像，此后东魏、北齐、唐、宋续有开凿。1907年沙畹拍下十八幅照片，其后多窟遭盗凿，1954年清淤整理。",
    "<b>规模</b>：现存洞窟5个、千佛龛1个、摩崖造像3尊、摩崖像龛328个、佛像7743尊。中心方柱窟近于敦煌而异于云冈的塔柱式，并影响稍晚的响堂山、须弥山石窟；第一、三、四窟的帝后礼佛图是全国石窟中罕见的完整作品。"
  ],
  "legacyNames": [
    "巩县石窟"
  ],
  "legacyPlaces": [
    "河南",
    "巩义",
    "河南 · 巩义 · 河洛镇寺湾村"
  ],
  "tall": false
},
{
  "name": "康百万庄园",
  "short": "康百万",
  "sub": "窑楼宅院",
  "dyn": "ming",
  "tag": "明清",
  "era": "明末清初 · 历代续建",
  "year": 1700,
  "yearLabel": "明末清初起",
  "yearApprox": true,
  "yearNote": "郑州市文物局整体断代明末清初，后世持续营建。1700 仅为庄园明清遗构的近似排序点；照片所示窑楼尚无单体确切营建年，不将康氏迁居或个人生卒年当建筑纪年。",
  "place": "河南 · 郑州市巩义市",
  "lede": "康百万庄园的窑楼与两侧房屋围出深长内院，拱形洞口上下排列，把依崖筑窑与楼房住宅结合起来。庄园不是一次完成的宅第，而是康氏家族多代经营逐渐积累的居住与生产空间。木、砖、石雕细部之间，也能看到商人家庭的礼制和生活安排，河洛地区利用地形建屋的经验由此变得清楚可读。",
  "id": "hn_kangbaiwan",
  "country": "CN",
  "province": "河南",
  "placeName": "巩义",
  "placeKey": "hn_gongyi",
  "lat": 34.764285,
  "lon": 112.947189,
  "initialStatus": "unvisited",
  "caption": [
    "康百万庄园 · 窑楼与内院局部",
    "明清宅院遗构 · 依实景保留楼窑组合"
  ],
  "types": [
    "residence"
  ],
  "facts": [
    "庄园靠崖筑窑、临街建楼，住宅院落采用四合院格局；窑楼拱形开口与两侧向内的房屋围合庭院，使地下空间、楼层与地面生活联系在一起。",
    "郑州市文物局将庄园整体断代为明末清初，后续仍不断营建；约一七〇〇年是明清遗构的近似定位，窑楼单体尚无经核定的确切营建纪年。",
    "庄园同时包含住宅、作坊、仓储等功能，院落中的木砖石雕也承担装饰与家训表达；它保存的不只是富商宅院，还包括家族经营与地方居住方式。"
  ],
  "legacyNames": [
    "康百万庄园",
    "康百万"
  ],
  "legacyPlaces": [
    "河南",
    "巩义",
    "河南 · 郑州市巩义市"
  ],
  "tall": false
},
{
  "name": "白马寺齐云塔",
  "short": "齐云塔",
  "sub": "白马寺 · 金代砖塔",
  "dyn": "liao",
  "tag": "金",
  "era": "金 · 大定十五年",
  "year": 1175,
  "yearLabel": "1175",
  "yearApprox": false,
  "yearNote": "金代重建碑记明确1175年，非白马寺创建的68年。",
  "place": "河南 · 洛阳 · 白马寺东塔院",
  "lede": "白马寺建寺的东汉永平十一年（68）常被挂在齐云塔头上，但眼前这座塔是金代的：寺旁金碑《重修河南府左街东白马寺释迦舍利塔记》把重建年份写得明白——大定十五年（1175）。方形十三层密檐砖塔，轮廓作抛物线，第六层以上逐级内收，顶置宝瓶塔刹，是洛阳一带现存最早的地面建筑。原称释迦舍利塔，清康熙年间住持如琇依明帝建塔旧说改称齐云塔。图版所绘为塔身全貌。",
  "id": "hn_baima",
  "country": "CN",
  "province": "河南",
  "placeName": "洛阳",
  "placeKey": "luoyang",
  "lat": 34.72187,
  "lon": 112.60412,
  "initialStatus": "unvisited",
  "caption": [
    "白马寺齐云塔 · 方形十三层密檐塔",
    "金大定十五年（1175）重建"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：四方形叠涩密檐式砖塔，十三层，通高约25米（一说35米）；底部为束腰须弥座，每边长7.80米，束腰处边长6.76米。塔身自下而上逐层内收，外轮廓呈抛物线，塔顶置宝瓶式塔刹。",
    "<b>纪年</b>：前身为白马寺释迦舍利塔，相传为东汉明帝时所建，北宋末年毁于金兵；现存塔为金大定十五年（1175）重修，金碑《重修河南府左街东白马寺释迦舍利塔记》记其事。清代住持如琇据明帝创塔的记载改称齐云塔。",
    "<b>价值</b>：齐云塔是洛阳一带现存最早的金代地面建筑，塔形仍带唐塔的抛物线轮廓。塔院在白马寺山门外东南约200米，1990年扩建为占地15亩的齐云塔院，是河南唯一的比丘尼道场；白马寺本身1961年列入第一批全国重点文物保护单位。"
  ],
  "legacyNames": [
    "白马寺齐云塔",
    "齐云塔"
  ],
  "legacyPlaces": [
    "河南",
    "洛阳",
    "河南 · 洛阳 · 白马寺东塔院"
  ],
  "tall": true
},
{
  "name": "洛阳关林",
  "short": "关林",
  "sub": "千秋舞楼",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 乾隆五十六年",
  "year": 1791,
  "yearLabel": "1791",
  "yearApprox": false,
  "yearNote": "图版选千秋鉴舞楼，按其 1791 年营建断代；关林殿群明万历年间沿革不用于此舞楼配色。",
  "place": "河南 · 洛阳市洛龙区",
  "lede": "关林大门前的千秋鉴舞楼，把演剧空间抬在高台上，向广场和祠庙敞开。前台歇山屋顶与后台硬山屋顶组合，远看仿佛重檐楼阁，近看却能辨认不同功能的相接。舞楼的乾隆纪年晚于关林主要殿群的明代沿革，说明祭祀院落也会随活动需要不断增建；戏曲在这里与关公信仰共同构成公共生活。",
  "id": "hn_guanlin",
  "country": "CN",
  "province": "河南",
  "placeName": "洛阳",
  "placeKey": "luoyang",
  "lat": 34.60861111,
  "lon": 112.47722222,
  "initialStatus": "unvisited",
  "caption": [
    "洛阳关林 · 千秋鉴舞楼正面",
    "清乾隆五十六年 · 前歇山与后硬山组合"
  ],
  "types": [
    "stage"
  ],
  "facts": [
    "舞楼平面作凸字形，前台歇山、后台硬山相接，屋面层次形成类似重檐楼阁的外观；高台正对关林大门，两者之间的广场为演剧与观看提供空间。",
    "千秋鉴舞楼建于清乾隆五十六年，即一七九一年；关林殿群另有明万历年间的扩建沿革，应把这座清代舞楼与更早的祭祀建筑分别理解。",
    "舞楼处在关林中轴线的前端，与门、殿和后部墓冢形成不同用途的空间序列；酬神演剧把祠庙祭祀延伸为可供人群聚集观看的公共文化活动。"
  ],
  "legacyNames": [
    "洛阳关林",
    "关林"
  ],
  "legacyPlaces": [
    "河南",
    "洛阳",
    "河南 · 洛阳市洛龙区"
  ],
  "tall": false
},
{
  "name": "灵泉寺石窟",
  "short": "灵泉寺",
  "sub": "隋代窟门两侧的披甲护法",
  "dyn": "sui",
  "tag": "隋",
  "era": "隋 · 开皇九年",
  "year": 589,
  "yearLabel": "589",
  "yearApprox": false,
  "yearNote": "取大住圣窟开凿纪年，非灵泉寺诸窟统一年代。",
  "place": "河南 · 安阳市龙安区善应镇",
  "lede": "窟门两侧各站一位护法神王，披甲执兵，脚下踏着牛羊——这是灵泉寺大住圣窟的门面。隋开皇九年（589），高僧灵裕在宝山南麓开此窟，窟不大，高2.6米、面阔进深各3.4米，却刻满经文与佛名。图版所绘为门外东西两龛的迦毗罗、那罗延神王浅浮雕，窟门与窟内三壁造像不在画内。",
  "id": "hn_lingquan",
  "country": "CN",
  "province": "河南",
  "placeName": "安阳",
  "placeKey": "anyang",
  "lat": 36.04222222,
  "lon": 114.07305556,
  "initialStatus": "unvisited",
  "caption": [
    "灵泉寺大住圣窟 · 门侧成对护法局部",
    "隋开皇九年（589） · 迦毗罗与那罗延神王"
  ],
  "types": [
    "grotto",
    "sculpture"
  ],
  "facts": [
    "<b>形制</b>：窟门朝南，圆拱门、尖拱门楣，门外东西各开一拱形浅龛，内浮雕神王像一尊，高约1.8米：东为那罗延、西为迦毗罗，手持剑、叉等法器，脚踏牛羊。两尊题材出自《大方等大集经·月藏分》。",
    "<b>纪年</b>：那罗延神王像上方刻开窟题记，记开皇九年（589）开凿、用工数目与窟内造像。窟内北壁卢舍那、西壁阿弥陀、东壁弥勒，入口东侧刻二十四传法圣师像；三主尊的头部与手部已被凿去。",
    "<b>价值</b>：灵泉寺前身宝山寺建于东魏武定四年（546），寺周现存隋至宋摩崖塔龛二百余处，是中国规模最大、年代最早的摩崖塔林。此窟形制上承北齐响堂山，窟内传法圣师像又影响了武周时期龙门擂鼓台中洞的祖师像。"
  ],
  "legacyNames": [
    "灵泉寺石窟",
    "灵泉寺"
  ],
  "legacyPlaces": [
    "河南",
    "安阳",
    "河南 · 安阳市龙安区善应镇"
  ],
  "tall": false
},
{
  "name": "小南海石窟",
  "short": "小南海",
  "sub": "残刻留痕",
  "dyn": "beiqi",
  "tag": "北齐",
  "era": "北齐 · 天保年间",
  "year": 553,
  "yearLabel": "550—555",
  "yearApprox": true,
  "yearNote": "故宫博物院记开凿于北齐天保元年至六年；553 仅作为这一时间区间的近似排序点，不指某一窟的确切竣工年。",
  "place": "河南 · 安阳市龙安区",
  "lede": "三座石窟都只有一人多高——中窟高1.78米、宽1.19米——却是中国最早把大段佛经刻上崖壁的地方。北齐天保元年（550），灵山寺的方法师等人在龟盖山南麓开窟，纪念禅僧僧稠，此后数年续凿而成；窟内三壁三佛，窟顶作覆斗。图版所绘为窟门崖面的局部，门侧雕刻已残，只能从裂隙间辨出轮廓。",
  "id": "hn_xiaonanhai",
  "country": "CN",
  "province": "河南",
  "placeName": "安阳",
  "placeKey": "anyang",
  "lat": 36.03916667,
  "lon": 114.10638889,
  "initialStatus": "unvisited",
  "caption": [
    "小南海石窟 · 窟门崖面局部",
    "北齐天保年间开凿 · 保留门侧残损雕刻"
  ],
  "types": [
    "grotto",
    "sculpture"
  ],
  "facts": [
    "<b>形制</b>：东、中、西三窟均为方形平面、覆斗顶、三壁三龛的小禅窟。中窟坐北朝南，高1.78米、宽1.19米、深1.36米，窟前原有木构已毁；东窟原在中窟东约500米，1999年迁至中窟东侧8米处。",
    "<b>纪年</b>：中窟题记纪北齐天保元年（550），记灵山寺方法师、云阳公子林等人开窟，以纪念国师僧稠；研究者据此把三窟定在550—560年间。石窟1983年经调查，1988年刊于《文物》。",
    "<b>价值</b>：窟外崖面刻有大段经文，是中国石窟中最早的刻经实例；造像题材与风格同河北邯郸响堂山石窟相近，被视为北齐禅观窟的代表。三窟中以中窟内容最丰富、保存最好。"
  ],
  "legacyNames": [
    "小南海石窟",
    "小南海"
  ],
  "legacyPlaces": [
    "河南",
    "安阳",
    "河南 · 安阳市龙安区"
  ],
  "tall": false
},
{
  "name": "大伾山摩崖大佛",
  "short": "大伾山",
  "sub": "依崖而坐的浚县大石佛",
  "dyn": "beiqi",
  "tag": "北朝",
  "era": "开凿年代有争议",
  "year": 560,
  "yearLabel": "后赵／北齐等说",
  "yearApprox": true,
  "yearNote": "断代有后赵、北齐等说。此处560仅按文物出版社2004年资料所载北齐始凿说作排序点，不表示确定始凿年；2026年河南日报文保现场报道采用后赵说。保留分歧，勿解读为已定北齐。",
  "place": "河南 · 鹤壁市浚县",
  "lede": "大佛坐在崖壁里，楼却只到它的肩——浚县人说“八丈佛爷七丈楼”。这尊善跏趺坐的弥勒高22.29米，右手举掌施无畏印，左手扶膝，双足踏覆莲；开凿年代至今无定论，有后赵、北齐等说，面层又叠着历代修补与彩绘。图版所绘为头部至双膝的可见部分，护佛的大佛楼与埋在地下的双脚不在画内。",
  "id": "hn_dapishan",
  "country": "CN",
  "province": "河南",
  "placeName": "浚县",
  "placeKey": "hn_xunxian",
  "lat": 35.663,
  "lon": 114.55676111,
  "initialStatus": "unvisited",
  "caption": [
    "大伾山摩崖大佛 · 头部至双膝可见部分",
    "开凿年代有争议 · 依2024年实拍现状绘制"
  ],
  "types": [
    "grotto",
    "sculpture"
  ],
  "facts": [
    "<b>形制</b>：依大伾山东麓崖壁凿出的善跏趺坐弥勒像，高22.29米（另一记载为21.33米）；螺髻，粗颈刻三道纹，左手扶膝，右手肘前伸、掌心向外，双腿下垂踏重层覆莲。佛脚以上约3米已埋入地下。",
    "<b>断代</b>：浚县文物部门主张始凿于十六国后赵，文物出版社2004年资料记北齐始凿、唐初竣工，两说并存。护佛的大佛楼高29米，为明正统十年（1445）重建；寺院始建于北魏太和年间，明代改称天宁寺。",
    "<b>保护</b>：当地称其为“全国最早、北方最大”的摩崖大佛，比龙门卢舍那高出5米余。因表层粉化剥落、开裂、渗水、盐害严重，2025年3月起与中国文化遗产研究院合作修缮，预计2028年3月完成后重新开放。"
  ],
  "legacyNames": [
    "大伾山摩崖大佛",
    "大伾山"
  ],
  "legacyPlaces": [
    "河南",
    "浚县",
    "河南 · 鹤壁市浚县"
  ],
  "tall": true
},
{
  "name": "比干庙",
  "short": "比干庙",
  "sub": "庙与墓相连的忠谏纪念地",
  "dyn": "ming",
  "tag": "明清",
  "era": "明清 · 历代续修",
  "year": 1600,
  "yearLabel": "明清重建",
  "yearApprox": true,
  "yearNote": "1600仅为明清遗构近似排序点。明弘治七年1494扩建是庙群沿革，不径作所绘享殿前部每一构件建造年。",
  "place": "河南 · 卫辉市比干庙镇",
  "lede": "比干庙的享殿在古柏间展开五间正面，殿后的墓冢把祭祀空间延伸到纪念地深处。这里追怀的是商代人物，眼前建筑却主要属于明清重建与续修。山门、碑廊和享殿串起一条从礼拜到墓前的道路，历代碑刻又记录后人如何理解忠谏，使人物记忆与建筑历史交织在同一院落中。",
  "id": "hn_bigan",
  "country": "CN",
  "province": "河南",
  "placeName": "卫辉",
  "placeKey": "hn_weihui",
  "lat": 35.46338889,
  "lon": 114.08061111,
  "initialStatus": "unvisited",
  "caption": [
    "比干庙享殿 · 前部可见立面",
    "明清重建、续修 · 依据2024年正面实拍"
  ],
  "types": [
    "hall",
    "tomb"
  ],
  "facts": [
    "享殿面阔五间、进深三间，前部门窗与柱列形成宽阔立面；山门、碑廊、享殿和后方墓冢沿轴线衔接，庙与墓共同组织祭祀行进的次序。",
    "庙群沿革可追溯至北魏，明弘治七年即一四九四年曾扩建；现存建筑主要经明清重建续修，约一六〇〇年仅为定位，享殿各构件不必同年。",
    "古柏、碑刻和前庙后墓的布局，共同保存历代纪念比干的方式；其中的忠谏观念与姓氏寻根活动属于后世文化记忆，不能直接作为商代史实证据。"
  ],
  "legacyNames": [
    "比干庙"
  ],
  "legacyPlaces": [
    "河南",
    "卫辉",
    "河南 · 卫辉市比干庙镇"
  ],
  "tall": false
},
{
  "name": "潞简王墓",
  "short": "潞王陵",
  "sub": "潞藩佳城 · 明代石坊",
  "dyn": "ming",
  "tag": "明",
  "era": "明 · 万历时期",
  "year": 1615,
  "yearLabel": "明万历时期",
  "yearApprox": true,
  "yearNote": "1615仅作万历晚期陵墓营建阶段的约略排序；不把网络所称“万历四十年（1615）”的换算错误沿用为石坊确切建年。",
  "place": "河南 · 新乡 · 凤泉区凤凰山南麓",
  "lede": "潞简王墓神道前的“潞藩佳城”石坊，以中高侧低的三道开口标出陵园起点。四根主柱之外，两侧独立望柱与之呼应，云龙纹刻入额枋和柱面，厚重石材由此获得向上的动势。它属于明代万历晚期的陵墓营建环境，既是可穿行的入口，也是把访客引向石像生、陵门与后方墓园的礼仪标志。",
  "id": "hn_luwang",
  "country": "CN",
  "province": "河南",
  "placeName": "新乡",
  "placeKey": "hn_xinxiang",
  "lat": 35.41921,
  "lon": 113.92035,
  "initialStatus": "unvisited",
  "caption": [
    "潞简王墓 · 潞藩佳城石坊",
    "明万历时期 · 三门石坊与双石柱"
  ],
  "types": [
    "tomb",
    "gate"
  ],
  "facts": [
    "外石坊为三间四柱冲天式，明间高于两侧，额上题“潞藩佳城”；两旁另立望柱，柱与额枋遍刻云龙宝珠，柱前后抱鼓石帮助稳定高起的结构。",
    "陵园属于明代潞简王朱翊镠的墓葬遗存，石坊按万历晚期定位；约一六一五年是排序参考点，缺少可确认的独立纪年时，不据此认定石坊完工年。",
    "神道从明间穿过，向北连接成列石像生与陵园门庭；这座没有楼顶的冲天式石坊，可与园内带檐牌坊比较，理解同一陵园入口形式的变化。"
  ],
  "legacyNames": [
    "潞简王墓",
    "潞王陵"
  ],
  "legacyPlaces": [
    "河南",
    "新乡",
    "河南 · 新乡 · 凤泉区凤凰山南麓"
  ],
  "tall": false
},
{
  "name": "济渎庙",
  "short": "济渎庙",
  "sub": "济水之源的一座宋代寝宫",
  "dyn": "song",
  "tag": "宋",
  "era": "北宋 · 开宝六年",
  "year": 973,
  "yearLabel": "973",
  "yearApprox": false,
  "yearNote": "以寝宫木构年代为准；不把济渎庙隋代创建史代入宋殿。",
  "place": "河南 · 济源市",
  "lede": "济水早已湮没，四渎之中只有济渎庙还完整地站着。庙里最老的一座殿是寝宫：北宋开宝六年（973）所建，面阔五间，单檐歇山，檐柱粗矮，斗拱雄巨疏朗，屋顶坡度平缓——刘敦桢1936年来看过，说这是他所知河南最早的木构。图版所绘即寝宫正立面；它前面原有的渊德大殿清同治年间被焚，只剩基址。",
  "id": "hn_jidu",
  "country": "CN",
  "province": "河南",
  "placeName": "济源",
  "placeKey": "hn_jiyuan",
  "lat": 35.10916667,
  "lon": 112.57638889,
  "initialStatus": "unvisited",
  "caption": [
    "济渎庙寝宫 · 正立面",
    "北宋开宝六年（973） · 面阔五间歇山顶"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：寝宫面阔五间，进深四架椽，单檐歇山顶；檐柱粗矮，柱上施雄巨疏朗的斗拱，屋面坡度平缓。它原与前面的渊德大殿以连廊相接成“工”字形平面，是宋代“前殿后寝”的典型格局。",
    "<b>纪年</b>：寝宫建于北宋开宝六年（973），是河南现存最早的木构建筑，也是河南仅存的两座宋代木构之一（另一座为少林寺初祖庵大殿）。渊德大殿清同治年间毁于捻军，基址上留存直径60厘米的柱础。",
    "<b>价值</b>：济渎庙始建于隋开皇二年（582），唐贞元十二年（796）增建北海祠，成为历代官方祭祀济水与北海之处。庙内现存宋至清建筑23幢，占地8.6万平方米，是四渎庙中唯一完整留存者，罗哲文称之为“四渎遗珍”。"
  ],
  "legacyNames": [
    "济渎庙"
  ],
  "legacyPlaces": [
    "河南",
    "济源",
    "河南 · 济源市"
  ],
  "tall": false
},
{
  "name": "济源奉仙观",
  "short": "奉仙观",
  "sub": "三清殿 · 金代木构",
  "dyn": "liao",
  "tag": "金",
  "era": "金 · 大定二十四年",
  "year": 1184,
  "yearLabel": "1184",
  "yearApprox": false,
  "yearNote": "采用现存三清殿金代纪年，不沿用唐垂拱元年建观年代。",
  "place": "河南 · 济源 · 荆梁北街",
  "lede": "一座五间大殿，殿里只用两根后金柱撑起整个屋顶——这是中国“减柱造”最典型的例子之一。济源奉仙观三清大殿建于金大定二十四年（1184），面阔五间，进深七架椽，单檐悬山顶；乾隆《济源县志》说它“荆木、柿木为梁，桑木、枣木为柱”，所以又叫荆梁观。刘敦桢来看过，评它“手法豪放与乎运思奇特”。图版所绘为大殿正面，观内明代玉皇殿与清代山门不在画内。",
  "id": "hn_fengxian",
  "country": "CN",
  "province": "河南",
  "placeName": "济源",
  "placeKey": "hn_jiyuan",
  "lat": 35.10027778,
  "lon": 112.57361111,
  "initialStatus": "unvisited",
  "caption": [
    "奉仙观三清殿 · 五间悬山大殿",
    "金大定二十四年（1184）"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：三清大殿面阔五间，进深七架椽，单檐悬山顶；平面采用减柱造，殿内仅立两根后金柱承托屋架，是中国减柱造建筑的典型。清乾隆《济源县志》记此殿“荆木、柿木为梁，桑木、枣木为柱，皆合两三围，长两丈许”。",
    "<b>纪年</b>：奉仙观始建于唐垂拱元年（685），唐代二鲁真人、宋代贺兰栖真曾在此修道。三清大殿为金大定二十四年（1184）所建；观内现存金、明、清建筑十座，玉皇殿为明代、面阔三间悬山顶，山门为清代、面阔三间悬山顶。",
    "<b>价值</b>：大殿以荆、柿、桑、枣四种少用于栋梁的木材为梁柱，当地因此称之为“荆梁观”；刘敦桢评其“手法豪放与乎运思奇特”。它是河南现存金代木构中最重要的一座，常与山西大同善化寺三圣殿相提并论。"
  ],
  "legacyNames": [
    "济源奉仙观",
    "奉仙观"
  ],
  "legacyPlaces": [
    "河南",
    "济源",
    "河南 · 济源 · 荆梁北街"
  ],
  "tall": false
},
{
  "name": "风穴寺",
  "short": "风穴寺",
  "sub": "九重密檐下的盛唐塔影",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐 · 开元二十六年",
  "year": 738,
  "yearLabel": "738",
  "yearApprox": false,
  "yearNote": "按七祖塔现存唐代主体年代登记，不混宋代悬钟阁和金代中佛殿。",
  "place": "河南 · 汝州市骑岭乡",
  "lede": "寺院正中立着一座唐塔：方形九层密檐，高24.17米，轮廓微微鼓起成一道抛物线，每层四角还挂着铃铎。唐开元二十六年（738），玄宗为天台宗七祖贞禅师建此舍利塔，赐名“七祖”。塔刹的覆钵、相轮、宝珠都在，这在现存唐塔里并不多见。图版只画这座塔，寺内宋代悬钟阁、金代中佛殿不在画内。",
  "id": "hn_fengxue",
  "country": "CN",
  "province": "河南",
  "placeName": "汝州",
  "placeKey": "hn_ruzhou",
  "lat": 34.22785,
  "lon": 112.89092,
  "initialStatus": "unvisited",
  "caption": [
    "风穴寺七祖塔 · 西南近正面",
    "唐开元二十六年（738） · 方形九层密檐砖塔"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：方形九层密檐式砖塔，高24.17米，第一层设塔心室，以上各层实心；外轮廓呈梭形曲线，每层四角悬风铎。塔刹由覆钵、相轮、宝盖与火焰组成，与塔身一并保存完整。",
    "<b>纪年</b>：建于唐开元二十六年（738），供奉贞禅师舍利，唐玄宗赐名“七祖”。大中十三年（859）禅主道源重修寺院时，在塔内塑释迦像并藏舍利于佛心，故又称七祖舍利塔。",
    "<b>价值</b>：寺始建于北魏，原名香积寺，隋改千峰寺，唐称白云寺；现存唐至清历代建筑140余间，七祖塔、宋代悬钟阁、金代中佛殿并称“三大国宝”。寺周塔林存元、明、清砖石塔83座，数量居全国第三。"
  ],
  "legacyNames": [
    "风穴寺"
  ],
  "legacyPlaces": [
    "河南",
    "汝州",
    "河南 · 汝州市骑岭乡"
  ],
  "tall": true
},
{
  "name": "香山寺观音大士塔",
  "short": "香山寺塔",
  "sub": "九级宋塔",
  "dyn": "song",
  "tag": "宋",
  "era": "北宋 · 熙宁元年重建",
  "year": 1068,
  "yearLabel": "1068",
  "yearApprox": false,
  "yearNote": "取市文旅局记载的宋熙宁元年重建年；寺塔原始创建年代不详，后世继续修葺。",
  "place": "河南 · 平顶山市香山",
  "lede": "塔前有一通碑，蒋之奇撰文、蔡京书丹，讲楚庄王三女妙善在此修成观音——汉化观音传说最早的实物，就立在这座塔下。塔是北宋熙宁元年（1068）神宗敕赐重建的八角九级密檐砖塔，首层以红石垒砌，二、三层开满数百小龛，再往上收成八棱锥体。图版依现状画出可见塔身，底层被邻殿遮住的部分留白。",
  "id": "hn_xiangshan",
  "country": "CN",
  "province": "河南",
  "placeName": "平顶山",
  "placeKey": "hn_pingdingshan",
  "lat": 33.813056,
  "lon": 113.192931,
  "initialStatus": "unvisited",
  "caption": [
    "香山寺大悲观音大士塔 · 现状可见塔身",
    "北宋熙宁元年重建 · 下部遮挡处留白"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：八角九级楼阁式密檐砖石塔，首层高8米、全用红石垒砌，二至九层青砖，层高逐层递减成八棱锥体；二、三层塔身列壁龛数百，四层辟壶门，六至九层辟拱券门，每层叠涩出檐、檐上砌平座。塔刹为覆盆、宝珠、相轮。",
    "<b>纪年</b>：北宋熙宁元年（1068）敕赐重建，熙宁四年（1071）修第五层；明隆庆五年（1571）修台阶、加栏杆，崇祯三年（1630）修塔体，清光绪三十三年（1907）更换刹杆、重修相轮。2020—2023年完成最近一次整体修缮。",
    "<b>价值</b>：塔前《汝州香山大悲菩萨传》碑由蒋之奇撰、蔡京书，宋刻元重刊，通高2.66米，是国内所见最早记述汉化观音（妙善）传说的实物；塔后另有金大定二十五年（1185）《重建汝州香山观音禅院记》碑。寺内宋至清碑刻共十余通。"
  ],
  "legacyNames": [
    "香山寺观音大士塔",
    "香山寺塔"
  ],
  "legacyPlaces": [
    "河南",
    "平顶山",
    "河南 · 平顶山市香山"
  ],
  "tall": true
},
{
  "name": "赊店山陕会馆",
  "short": "赊店会馆",
  "sub": "悬鉴楼 · 商帮戏台",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 嘉庆至道光时期",
  "year": 1800,
  "yearLabel": "清嘉庆至道光",
  "yearApprox": true,
  "yearNote": "1800为悬鉴楼所属清代营建阶段的约略排序点。官方转载有“嘉庆元年=1786”换算错误，故不沿用该数值作为精确竣工年；会馆1756—1892为全组建造阶段。",
  "place": "河南 · 南阳 · 社旗县赊店镇",
  "lede": "赊店山陕会馆的悬鉴楼，以中央三重檐和两侧楼阁组成高起的戏台，繁密木雕与石雕围绕舞台展开。水陆商旅汇集的古镇，需要祭祀关公，也需要同乡聚会与酬神演剧。会馆经过多次营建，戏楼属于前期形成的建筑；它把商帮财力转化为公共空间，层叠屋顶和开敞台口共同保留清代会馆生活的尺度。",
  "id": "hn_shedian",
  "country": "CN",
  "province": "河南",
  "placeName": "社旗",
  "placeKey": "hn_sheqi",
  "lat": 33.05755833,
  "lon": 112.939975,
  "initialStatus": "unvisited",
  "caption": [
    "赊店山陕会馆 · 悬鉴楼戏台正面",
    "清嘉庆至道光时期 · 三重檐楼阁"
  ],
  "types": [
    "pavilion"
  ],
  "facts": [
    "悬鉴楼主体为三重檐歇山顶，与两侧楼阁对称相接；高台与台口服务演剧，梁枋木雕和石栏雕刻围绕戏楼功能展开，丰富屋面与下部空间的层次。",
    "会馆自一七五六年至一八九二年分期营建，悬鉴楼属于前期工程；约一八〇〇年只为定位，现有不同资料尚不足以落实其独立竣工纪年。",
    "会馆由山陕商人集资，兼具关公祠与商业同乡组织用途；戏楼及雕刻中的历史、戏剧故事，把交易之外的祭祀、娱乐与尊儒观念带进商人聚会之所。"
  ],
  "legacyNames": [
    "赊店山陕会馆",
    "赊店会馆"
  ],
  "legacyPlaces": [
    "河南",
    "社旗",
    "河南 · 南阳 · 社旗县赊店镇"
  ],
  "tall": false
},
{
  "name": "南阳武侯祠",
  "short": "武侯祠",
  "sub": "檐下追贤",
  "dyn": "ming",
  "tag": "清",
  "era": "清代遗构 · 历代修缮",
  "year": 1711,
  "yearLabel": "清代遗构",
  "yearApprox": true,
  "yearNote": "1711 取官方记载的清康熙五十年全祠重修作为近似排序点，不据此断言现存大拜殿全部建于该年。明弘治十一年正殿营建与其后清代、近现代修缮分别记录，所绘檐下具体构件年代尚须实测文档细分。",
  "place": "河南 · 南阳市卧龙区",
  "lede": "南阳武侯祠大拜殿的檐下，柱梁、门扇和层层匾额围出追怀诸葛亮的祭祀空间。它位于祠院前部，与后方草庐、亭台等纪念性建筑形成不同氛围。明清营修及近现代修缮都参与了今日面貌，匾联和石刻更让历代文人的评价留在建筑之中；观看这片檐下，需要把人物时代与祠宇年代分别理解。",
  "id": "hn_wuhou",
  "country": "CN",
  "province": "河南",
  "placeName": "南阳",
  "placeKey": "hn_nanyang",
  "lat": 32.98019167,
  "lon": 112.50157778,
  "initialStatus": "unvisited",
  "caption": [
    "南阳武侯祠 · 大拜殿檐下局部",
    "清代遗构、历代修缮 · 柱梁与门扇空间"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "大拜殿是祠院前部的主要祭祀建筑，柱梁下悬挂多幅匾联，两壁嵌石刻；殿内奉诸葛亮坐像及诸葛瞻、诸葛尚立像，门前空间连接进入祠院的道路。",
    "地方记载明弘治十一年曾建正殿，清康熙五十年即一七一一年又重修全祠；此后还有多次修缮，不能将这一年视作现存檐下全部构件的建造年。",
    "前部祭殿与后部草庐亭台结合，使武侯祠兼具祠庙和纪念园林的特点；匾联、碑刻记录持续的追贤活动，所反映的是后世对诸葛亮的文化记忆。"
  ],
  "legacyNames": [
    "南阳武侯祠",
    "武侯祠"
  ],
  "legacyPlaces": [
    "河南",
    "南阳",
    "河南 · 南阳市卧龙区"
  ],
  "tall": false
},
{
  "name": "崇法寺塔",
  "short": "崇法塔",
  "sub": "层层平座与莲瓣托起的宋塔",
  "dyn": "song",
  "tag": "宋",
  "era": "北宋 · 绍圣五年",
  "year": 1098,
  "yearLabel": "1098",
  "yearApprox": false,
  "yearNote": "按塔竣工年1098；建地宫1093、起塔身1095见基金会资料，部分二手来源误把1093写作绍圣元年，未采此错误换算。",
  "place": "河南 · 永城市老城",
  "lede": "每一层檐下都托着一圈仰莲，九层叠上去像九朵莲花在开。这座永城老城里的砖塔八角九层、高34.6米，北宋元祐八年（1093）起建地宫，绍圣二年（1095）起塔身，绍圣五年（1098）落成——地宫石匣与塔内五块塔铭把过程记得清楚。塔内蹬道一二层穿心、三层带回廊，研究者把它看作南北造塔手法的合流。崇法寺本身早已不存。",
  "id": "hn_chongfa",
  "country": "CN",
  "province": "河南",
  "placeName": "永城",
  "placeKey": "hn_yongcheng",
  "lat": 33.942175,
  "lon": 116.37317694,
  "initialStatus": "unvisited",
  "caption": [
    "崇法寺塔 · 近正面",
    "北宋绍圣五年（1098）竣工 · 八角九层楼阁式砖塔"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：八角九层楼阁式砖塔，高34.6米，底层直径7.7米、高5米；每层四面开门，檐下以仰莲承托，各层平座上原有示意性栏杆，转角石雕龙头下系铁铃。塔刹由覆钵、相轮、伞盖、宝瓶组成，以铁链系于塔顶。",
    "<b>纪年</b>：元祐八年（1093）建地宫，绍圣二年（1095）起塔身，绍圣五年（1098）竣工；塔内五块塔铭刻于绍圣二年，地宫石匣铭文记建塔始末。20世纪50年代与80年代两次维修，清理地宫时出宋代铜钱。",
    "<b>价值</b>：塔内壁嵌黄绿釉佛像砖651块，构图为一佛二胁侍；登塔蹬道一二层穿心式、三层穿心带回廊、上部壁内折上，几种做法集于一塔。永城市博物馆馆长李俊山认为它融合了南北两地的造塔艺术；“宝塔盘云”旧为永城八景之一。"
  ],
  "legacyNames": [
    "崇法寺塔",
    "崇法塔"
  ],
  "legacyPlaces": [
    "河南",
    "永城",
    "河南 · 永城市老城"
  ],
  "tall": true
},
{
  "name": "周口关帝庙",
  "short": "周口关庙",
  "sub": "商埠会馆",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 雍正十三年",
  "year": 1735,
  "yearLabel": "1735",
  "yearApprox": false,
  "yearNote": "取所绘山门建造年 1735；不使用会馆整体始建于 1693 或全部落成于 1852 的纪年替代。",
  "place": "河南 · 周口市川汇区",
  "lede": "周口关帝庙山门以三道门洞和两侧圆窗展开五间正面，歇山顶下的斗栱、匾额与朱漆门扇层次分明。门后不是一次建成的庙宇，而是山陕商人在周家口多朝扩修的会馆。山门自身的雍正纪年提供清楚的起点，沿轴线向内，祭祀、演剧和同乡往来的空间又共同讲述这座商埠的兴盛。",
  "id": "hn_zkguandi",
  "country": "CN",
  "province": "河南",
  "placeName": "周口",
  "placeKey": "hn_zhoukou",
  "lat": 33.63326111,
  "lon": 114.64011111,
  "initialStatus": "unvisited",
  "caption": [
    "周口关帝庙 · 山门正面",
    "清雍正十三年 · 五间单檐歇山顶"
  ],
  "types": [
    "hall",
    "gate"
  ],
  "facts": [
    "山门面阔五间、进深三间，单檐歇山顶，屋脊使用琉璃构件；三道门洞与两侧圆窗分列正面，檐下斗栱、金字匾额和朱漆门扇组成会馆入口。",
    "山门建于清雍正十三年，即一七三五年；会馆整体始建于一六九三年，历经扩建至一八五二年落成，这些全组沿革年不代替山门自己的纪年。",
    "关帝庙由山西、陕西旅周商人集资兴建，兼有祭祀与同乡会馆用途；山门后殿阁和戏楼沿轴线展开，显示商人交往、酬神与城市生活的联系。"
  ],
  "legacyNames": [
    "周口关帝庙",
    "周口关庙"
  ],
  "legacyPlaces": [
    "河南",
    "周口",
    "河南 · 周口市川汇区"
  ],
  "tall": false
},
{
  "name": "禹州天宁万寿寺",
  "short": "天宁万寿寺",
  "sub": "校园中保存的元代三间佛殿",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 大德三年",
  "year": 1299,
  "yearLabel": "1299",
  "yearApprox": false,
  "yearNote": "取大殿重建纪年；此后明清重修，2013年落架修缮。山门为明代风格，非本图主体。",
  "place": "河南 · 禹州市古钧台街",
  "lede": "禹州天宁万寿寺大殿藏在旧校园中，三间灰瓦歇山顶覆在砖墙与石柱之上。檐下斗栱层层承托，殿内梁架则保留自然木材的弯曲形态。元代重建、明清修葺和近年的保护，使这座小佛殿成为观察地方木构延续的入口；寺院初创的不同说法，与眼前大殿的纪年需要分别理解。",
  "id": "hn_yuzhoutianning",
  "country": "CN",
  "province": "河南",
  "placeName": "禹州",
  "placeKey": "hn_yuzhou",
  "lat": 34.16734,
  "lon": 113.46337,
  "initialStatus": "unvisited",
  "caption": [
    "禹州天宁万寿寺大殿 · 现状近正面",
    "元大德三年（1299）重建 · 三间单檐歇山顶"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "大殿面阔、进深各三间，单檐歇山灰瓦顶，檐下使用四铺作单下昂斗栱；梁架露明，不以天花遮蔽，石柱、砖墙与自然曲材共同形成承重空间。",
    "现殿取元大德三年即一二九九年的重建纪年，明弘治、嘉靖及清道光年间又有修葺；二〇一三年的落架大修属于保护工程，并非首次建造。",
    "大殿曾作为学校用房，与寺内山门一起保存至今；它的曲材梁架和地方做法，为比较宋金木构与后来的明清建筑提供了可见的中间环节。"
  ],
  "legacyNames": [
    "禹州天宁万寿寺",
    "天宁万寿寺"
  ],
  "legacyPlaces": [
    "河南",
    "禹州",
    "河南 · 禹州市古钧台街"
  ],
  "tall": false
},
{
  "name": "宝轮寺塔",
  "short": "宝轮塔",
  "sub": "十三重檐收成修长塔影",
  "dyn": "liao",
  "tag": "金",
  "era": "金 · 大定十七年",
  "year": 1177,
  "yearLabel": "1177",
  "yearApprox": false,
  "yearNote": "按现存金代重建塔登记，不以唐代旧寺创建年代代替塔年代。",
  "place": "河南 · 三门峡市湖滨区",
  "lede": "在塔下击掌，塔会用蛤蟆叫回应你——陕州人叫它蛤蟆塔，与北京天坛回音壁、永济莺莺塔同列中国四大回音建筑，而且是其中最早的一座。金大定十七年（1177），僧人智秀在隋代木塔的旧址上重建这座砖塔：方形十三级叠涩密檐，高26.5米，下有台基、台座，每层开拱券门、佛龛或窗洞，角下悬风铃。陕州故城早已荒废，塔独自立在高台上。图版所绘为塔身南面。",
  "id": "hn_baolun",
  "country": "CN",
  "province": "河南",
  "placeName": "三门峡",
  "placeKey": "hn_sanmenxia",
  "lat": 34.79166667,
  "lon": 111.14861111,
  "initialStatus": "unvisited",
  "caption": [
    "宝轮寺塔 · 南立面",
    "金大定十七年（1177） · 方形十三层密檐砖塔"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：平面近正方形的十三级叠涩密檐式砖塔，青灰砖垒砌，高26.5米（一说27.2米），底部周长21.6米，下有台基与台座；各层塔身分别辟半圆拱券门、佛龛或窗洞，塔内设塔心室与梯道可登，翼角下悬风铃。",
    "<b>纪年</b>：全称宝轮寺三圣舍利宝塔。寺塔据称始于隋仁寿元年（601），由尼道秀主持建木塔；金大定十七年（1177）僧人智秀重建为砖塔，即现存之塔。塔历经十余次地震，至今略有倾斜而未倒。",
    "<b>价值</b>：塔内回声似蛙鸣，俗称蛤蟆塔，与天坛回音壁、永济莺莺塔、潼南大佛寺石琴并称中国四大回音建筑，且年代最早。宝轮寺已毁，塔今立于陕州故城遗址内的陕州公园宝塔苑中。"
  ],
  "legacyNames": [
    "宝轮寺塔",
    "宝轮塔"
  ],
  "legacyPlaces": [
    "河南",
    "三门峡",
    "河南 · 三门峡市湖滨区"
  ],
  "tall": true
},
{
  "name": "小商桥",
  "short": "小商桥",
  "sub": "敞肩石拱",
  "dyn": "song",
  "tag": "宋",
  "era": "宋代主体 · 历代修缮",
  "year": 1100,
  "yearLabel": "宋代主体",
  "yearApprox": true,
  "yearNote": "1100 仅为宋代现存主体的近似排序点。县志记隋开皇四年建桥，茅以升认为隋初创建可信而现存桥式尚待考证；罗哲文将现存桥身风格及雕刻判断为宋代遗存。",
  "place": "河南 · 漯河市临颍县",
  "lede": "一座低缓的红砂岩拱桥，主拱两肩各开一个小拱——与赵州桥同一种“敞肩”做法，而县志说它建于隋开皇四年（584），比赵州桥还早。茅以升认为隋初创建可信，但现存桥身是否即初建原式尚待考证；罗哲文1992年来看，把桥身风格与雕刻判为宋代。桥长20.87米，宽6.67米，主拱净跨11.6米。图版所绘为桥的侧立面：一主拱、两腹拱与桥上栏板。",
  "id": "hn_xiaoshang",
  "country": "CN",
  "province": "河南",
  "placeName": "临颍",
  "placeKey": "hn_linying",
  "lat": 33.71833333,
  "lon": 113.96166667,
  "initialStatus": "unvisited",
  "caption": [
    "小商桥 · 石拱桥侧立面",
    "宋代主体、历代修缮 · 一主拱与左右各一腹拱"
  ],
  "types": [
    "bridge"
  ],
  "facts": [
    "<b>形制</b>：单孔敞肩坦拱石桥，红砂岩砌筑，南北走向跨小商河（古颍河）。桥长20.87米、宽6.67米、高4米，主拱净跨11.6米、矢高2.13米，矢跨比1：5，拱石间以咬铁相连；两肩各一小拱，净跨2.13米。券面浮雕天马、狮子、莲花，拱顶伸出螭首。",
    "<b>纪年</b>：《临颍县志》记“隋开皇四年建，元大德间重修”，明正德、清康熙十四年（1675）再修。1982年茅以升派三人考察后认为“桥建于隋初，自属可信”，而现存桥式“尚有待进一步考证”；1992年罗哲文判现存桥身为宋代遗存。1994—1995年国家拨款大修。",
    "<b>价值</b>：如创建年代成立，小商桥是比赵州桥更早的敞肩圆弧石拱桥，茅以升据此推知这一桥式在赵州桥之前已有发展。桥北200米有岳飞部将杨再兴墓，南宋绍兴十年（1140）他在此与金军激战阵亡。"
  ],
  "legacyNames": [
    "小商桥"
  ],
  "legacyPlaces": [
    "河南",
    "临颍",
    "河南 · 漯河市临颍县"
  ],
  "tall": false
},
{
  "name": "临济寺澄灵塔",
  "short": "澄灵塔",
  "sub": "八角九级密檐塔",
  "dyn": "liao",
  "tag": "金",
  "era": "金 · 1185大修",
  "year": 1185,
  "yearLabel": "1185大修",
  "yearApprox": false,
  "yearNote": "采用所绘主体或本条明列营建阶段的纪年，后世修缮另述。",
  "place": "河北 · 正定",
  "lede": "澄灵塔把繁密砖雕集中在基座与高首层，再用逐层收束的密檐将视线引向塔刹。它是正定临济寺纪念宗祖义玄的塔，现貌主要延续金代大修后的形式，而不是把唐代建塔故事原封不动留到今天。八角形塔身上的假门、假窗和斗拱，既表现宗教纪念，也保存了当时木构装饰转译成砖作的细节。",
  "id": "hb_linji",
  "country": "CN",
  "province": "河北",
  "placeName": "正定",
  "placeKey": "zhengding",
  "lat": 38.134761,
  "lon": 114.567231,
  "initialStatus": "unvisited",
  "caption": [
    "临济寺澄灵塔 · 八角九级密檐塔",
    "金 · 1185大修"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "八角九级密檐砖塔，下设双重须弥座与仰莲座；四正面刻门券，四隅刻假窗，首层上方密檐层层叠置，以实心砖体呈现仿木楼阁的外部构件。",
    "早期建塔是为纪念临济宗开创者义玄，现存外观主要沿袭金大定二十五年大修后的形制；此后元明清均维修，一九六六年地震损刹，一九八五年重装。",
    "门扇、勾栏和斗拱的砖雕保留了细密的构件分层，塔身可作为金代装饰与小木作的参照；把这些细部同上部密檐比较，能看出庄重体量与精巧工艺如何结合。"
  ],
  "legacyNames": [
    "临济寺澄灵塔",
    "澄灵塔"
  ],
  "legacyPlaces": [
    "河北",
    "正定",
    "河北 · 正定"
  ],
  "tall": true
},
{
  "name": "正定县文庙大成殿",
  "short": "正定县文庙",
  "sub": "大成殿正面",
  "dyn": "zhou",
  "tag": "五代",
  "era": "五代 · 晚唐—五代",
  "year": 930,
  "yearLabel": "晚唐—五代",
  "yearApprox": true,
  "yearNote": "所绘主体按晚唐—五代断代；数值年份仅为约略排序。",
  "place": "河北 · 正定",
  "lede": "一座县城文庙的正殿，却是中国现存最早的文庙大成殿：梁思成1933年见到它，说拿它的外表与敦煌壁画里的建筑相比，“很疑心它是唐末五代遗物”。五间三进、单檐歇山，屋面低缓，檐下斗拱硕大而简洁，柱头铺作双杪偷心、不用补间，比曲阜孔庙大成殿早了几百年。县志说文庙建于洪武七年（1374），那是文庙建置的年份，不是这座殿的。",
  "id": "hb_zdwenmiao",
  "country": "CN",
  "province": "河北",
  "placeName": "正定",
  "placeKey": "zhengding",
  "lat": 38.142889,
  "lon": 114.561278,
  "initialStatus": "unvisited",
  "caption": [
    "正定县文庙大成殿 · 大成殿正面",
    "五代 · 晚唐—五代"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：面阔五间、进深三间，建筑面积约650平方米，单檐歇山顶；柱头铺作双杪偷心，不施补间铺作，斗拱直接坐于柱头之上，保持早期木构的做法。",
    "<b>断代</b>：县志记文庙建于明洪武七年（1374），梁思成1933年据形制判为唐末五代遗构；1991年罗哲文考察后认为其为国内现存最早的文庙大成殿，国保名录将年代列为五代。",
    "<b>修缮</b>：1956年列为河北省文物保护单位；1997年政府投资70余万元抢救性加固，2015年国家文物局拨款修缮台基、瓦顶与木构件。本条为县文庙，与正定府文庙是两处。"
  ],
  "legacyNames": [
    "正定县文庙大成殿",
    "正定县文庙"
  ],
  "legacyPlaces": [
    "河北",
    "正定",
    "河北 · 正定"
  ],
  "timelineLane": "north",
  "tall": false
},
{
  "name": "赵州桥（安济桥）",
  "short": "赵州桥",
  "sub": "敞肩石拱桥侧立面",
  "dyn": "sui",
  "tag": "隋",
  "era": "隋 · 隋代",
  "year": 610,
  "yearLabel": "隋代",
  "yearApprox": true,
  "yearNote": "省文物局简介为605—616，另有595—605说法；610仅在隋代范围内作约略排序，不表示确切竣工年。",
  "place": "河北 · 赵县",
  "lede": "大拱两肩各开两个小拱——这种敞肩做法，欧洲到十九世纪末才出现，赵州桥在隋代就做成了。单孔坦弧，净跨37.02米，矢高只有7.23米，桥面因此平缓如缓坡。唐张嘉贞《赵州桥铭》记为“隋匠李春之迹”；1950年代大修更换了绝大部分石料，今天簇新的外貌是那次工程留下的，梁思成为此惋惜多年。",
  "id": "hb_anjibridge",
  "country": "CN",
  "province": "河北",
  "placeName": "赵县",
  "placeKey": "hb_赵县",
  "lat": 37.720167,
  "lon": 114.76325,
  "initialStatus": "unvisited",
  "caption": [
    "赵州桥（安济桥） · 敞肩石拱桥侧立面",
    "隋 · 隋代"
  ],
  "types": [
    "bridge"
  ],
  "facts": [
    "<b>形制</b>：单孔敞肩坦弧石拱桥，全长50.82米，宽约9米；主拱由28道并列石券组成，净跨37.02米、矢高7.23米，两肩各开两个小拱以泄洪、减重，这是敞肩拱的最早实例。",
    "<b>年代</b>：唐开元年间张嘉贞《赵州桥铭》称“隋匠李春之迹”；1933年梁思成实测并发表《赵县大石桥即安济桥》。隋代具体建成年各资料不一，本条只作隋代约略排序。",
    "<b>修缮</b>：1952—1956年大修拆除重砌，灌注水泥砂浆，约87%石料为新购，梁思成1963年撰文惋惜其“焕然一新”；1991年美国土木工程师学会列其为国际土木工程历史古迹。"
  ],
  "legacyNames": [
    "赵州桥（安济桥）",
    "赵州桥",
    "安济桥"
  ],
  "legacyPlaces": [
    "河北",
    "赵县",
    "河北 · 赵县"
  ],
  "tall": false
},
{
  "name": "赵州陀罗尼经幢",
  "short": "赵州经幢",
  "sub": "七级石经幢",
  "dyn": "song",
  "tag": "宋",
  "era": "宋 · 1038",
  "year": 1038,
  "yearLabel": "1038",
  "yearApprox": false,
  "yearNote": "采用所绘主体或本条明列营建阶段的纪年，后世修缮另述。",
  "place": "河北 · 赵县",
  "lede": "16.44米，现存最高的经幢，立在赵县城里两条大街的交会处，像一座用经文和雕刻叠起来的石塔。北宋景祐五年（1038）知州王德成督造，七层幢身每层整石雕出，层间华盖、仰莲、八角城郭、力士轮番出现，第三层檐上刻释迦太子游四门，第五层八面力士用手或头顶着上层。原开元寺早已无存，经幢仍立原处；1983年雷击毁坏三至五层，1990年修复。",
  "id": "hb_tuoluoni",
  "country": "CN",
  "province": "河北",
  "placeName": "赵县",
  "placeKey": "hb_赵县",
  "lat": 37.74738889,
  "lon": 114.76869444,
  "initialStatus": "unvisited",
  "caption": [
    "赵州陀罗尼经幢 · 七级石经幢",
    "宋 · 1038"
  ],
  "types": [
    "pillar"
  ],
  "facts": [
    "<b>形制</b>：通高16.44米，坐北朝南。方形台基高1.9米、底边7.35米，上承两层八角须弥座；幢身七层，每层整石雕成，逐层内收，刹顶为桃形铜制火焰宝珠。",
    "<b>题记</b>：首层南面篆书“奉为大地水陆苍生敬造佛顶尊胜陀罗尼幢”，各层刻陀罗尼经文及题名；第六层有“隆庆五年辛未九月”重修题刻，记明代一次整修。",
    "<b>雕刻</b>：第三层檐作八角城，正四面组成“释迦太子游四门”；第五层八面各雕力士托檐；台基四角刻力士、三面刻“妇女掩门”。1983年遭雷击，1990年修复并建保护池。"
  ],
  "legacyNames": [
    "赵州陀罗尼经幢",
    "赵州经幢",
    "赵县陀罗尼经幢"
  ],
  "legacyPlaces": [
    "河北",
    "赵县",
    "河北 · 赵县"
  ],
  "tall": true
},
{
  "name": "龙兴观道德经幢",
  "short": "道德经幢",
  "sub": "幢身与莲座局部",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐 · 738",
  "year": 738,
  "yearLabel": "738",
  "yearApprox": false,
  "yearNote": "采用所绘主体或本条明列营建阶段的纪年，后世修缮另述。",
  "place": "河北 · 易县",
  "lede": "唐玄宗开元二十一年（733）令各州在大道观立石刻《道德经》，易县这一座是全国唯一保存较完整的实例。八角汉白玉幢身高4.29米，刻御注《道德经》八十一章和二百余字敕文，落款“易州刺史兼高阳军使田仁琬奉敕立”，开元二十六年（738）十月建。书者无署名，自钱大昕以来多归于苏灵芝。图版所绘为幢身与莲座局部。",
  "id": "hb_daodejing",
  "country": "CN",
  "province": "河北",
  "placeName": "易县",
  "placeKey": "hb_易县",
  "lat": 39.34241,
  "lon": 115.49158,
  "initialStatus": "unvisited",
  "caption": [
    "龙兴观道德经幢 · 幢身与莲座局部",
    "唐 · 738"
  ],
  "types": [
    "pillar"
  ],
  "facts": [
    "<b>形制</b>：通高6米，分顶、身、座三部分。幢身八角柱形，高4.29米、直径90厘米，由上下两石拼成；下承直径1.10米的仰莲座，2001年修缮时又在座下发现原有的莲纹须弥座。",
    "<b>题记</b>：幢身上部刻“太上玄元皇帝道德经大唐开元神武皇帝注”十八字与敕文205字，下部刻玄宗注《道德经》全文，文尾纪年开元二十六年十月；经文后有翁方纲等历代题记。",
    "<b>遭遇</b>：同治十二年（1873）暴风雨吹倒，重修时幢身装错方向，经文从东北面起，直到2001年才纠正；书者传为苏灵芝，出自钱大昕《金石文跋尾》的推断，幢上并无署名。"
  ],
  "legacyNames": [
    "龙兴观道德经幢",
    "道德经幢"
  ],
  "legacyPlaces": [
    "河北",
    "易县",
    "河北 · 易县"
  ],
  "tall": true
},
{
  "name": "清西陵",
  "short": "清西陵",
  "sub": "泰陵隆恩殿正立面",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 1730—1736",
  "year": 1736,
  "yearLabel": "清 · 1730—1736",
  "yearApprox": false,
  "yearNote": "全陵群一条，以泰陵隆恩殿为代表；故宫称1736建成，与1737入葬分别记载。",
  "place": "河北 · 易县",
  "lede": "泰陵隆恩殿以黄琉璃重檐和开阔月台，标明清西陵最早帝陵的祭祀中心。五间殿身与左右配殿相接成院，前方礼拜空间和后方埋葬区沿中轴递进。泰陵在雍正朝开工，到乾隆初建成；隆恩殿显示的是供奉与行礼的场所，不能将它同地宫混为一体，也不能把入葬日期直接当作所有殿宇的竣工纪年。",
  "id": "hb_qingxiling",
  "country": "CN",
  "province": "河北",
  "placeName": "易县",
  "placeKey": "hb_易县",
  "lat": 39.36927617,
  "lon": 115.34505665,
  "initialStatus": "unvisited",
  "caption": [
    "清西陵 · 泰陵隆恩殿",
    "五间重檐歇山殿与完整石台基"
  ],
  "types": [
    "tomb",
    "hall"
  ],
  "facts": [
    "隆恩殿面阔五间、进深三间，重檐歇山顶覆黄琉璃瓦，殿前设月台，左右为配殿；宽阔正面和层叠檐口把祭祀建筑的主从关系明确地呈现出来。",
    "故宫博物院记泰陵于雍正八年始建、乾隆元年建成，对应一七三〇至一七三六年；其后奉安入葬是另一节点，殿宇营建与葬事分别记录，不互相替代。",
    "隆恩殿之后依次还有三座门、祭台、方城与明楼，最后连接宝城和地宫；从一殿理解这条序列，能看出祭祀活动与埋葬空间如何在帝陵中分区衔接。"
  ],
  "legacyNames": [
    "清西陵"
  ],
  "legacyPlaces": [
    "河北",
    "易县",
    "河北 · 易县"
  ],
  "tall": false
},
{
  "name": "义慈惠石柱",
  "short": "义慈惠石柱",
  "sub": "北齐石柱及柱顶三间石殿",
  "dyn": "beiqi",
  "tag": "北齐",
  "era": "北齐 · 562",
  "year": 562,
  "yearLabel": "北齐 · 562",
  "yearApprox": false,
  "yearNote": "现址定兴县高里乡石柱村；旧国保所在地易县是旧行政标注。北魏木柱前身与北齐石构分开。",
  "place": "河北 · 定兴",
  "lede": "柱子不稀奇，稀奇的是柱顶那座三间两进的小石殿：檐椽、角梁、斗栱、阑额、柱子和窗框全用石头刻出，等于一件北齐人留下的木构模型。石柱通高约7米，八角柱身刻了四千余字，记北魏末年杜洛周、葛荣起义失败后乡人收葬遗骨、立柱标义的经过；柱顶题记写明大齐大宁二年（562）。",
  "id": "hb_yicihui",
  "country": "CN",
  "province": "河北",
  "placeName": "定兴",
  "placeKey": "hb_dingxing",
  "lat": 39.3113806,
  "lon": 115.6619306,
  "initialStatus": "unvisited",
  "caption": [
    "定兴 · 义慈惠石柱",
    "北齐石构 · 柱顶石殿"
  ],
  "types": [
    "stele"
  ],
  "facts": [
    "<b>形制</b>：石灰岩制，通高约7米。方形基石上置覆莲柱础，八角柱身高4.5米、向上微收；柱顶盖板上刻面阔三间、进深两间的单檐庑殿小石屋，前后正中各刻佛像一尊。",
    "<b>题记</b>：柱身刻“标异乡义慈惠石柱颂”九个大字、三千余字颂文与近千字题名，内有“大齐大宁二年四月十七日”纪年；1990年文物部门修复风化与裂痕，2011年加固翻修保护亭。",
    "<b>由来</b>：北魏孝昌元年至永安元年（525—528）杜洛周、葛荣起义失败，乡人收葬义军遗骨并立木柱为标，北齐改为石柱并刻颂；北魏木柱前身与现存北齐石构应分开看。"
  ],
  "legacyNames": [
    "义慈惠石柱"
  ],
  "legacyPlaces": [
    "河北",
    "定兴",
    "河北 · 定兴"
  ],
  "tall": true
},
{
  "name": "慈云阁",
  "short": "慈云阁",
  "sub": "现存两层三间楼阁",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 1306",
  "year": 1306,
  "yearLabel": "元 · 1306",
  "yearApprox": false,
  "yearNote": "原大悲阁群只存此阁；元大德十年重建。",
  "place": "河北 · 定兴",
  "lede": "慈云阁的体量不大，却把上下两层的支承安排得十分紧凑。近方形的三间木阁，以舒展檐口包住内部梁架，垂柱与抹角梁让转角处的力量得到传递。它原称大悲阁，现存主体为元代重建，周围原有建筑多已消失；在这座孤存的小阁上，仍能读到元代木构如何用有限空间组织复杂承托。",
  "id": "hb_ciyunge",
  "country": "CN",
  "province": "河北",
  "placeName": "定兴",
  "placeKey": "hb_dingxing",
  "lat": 39.27236111,
  "lon": 115.77352778,
  "initialStatus": "unvisited",
  "caption": [
    "定兴 · 慈云阁",
    "两层三间 · 元大德十年重建"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "阁体面阔、进深各三间，为近方形两层楼阁；檐口外伸而殿身紧凑，上下层不是简单重复，外部轮廓与内部承托共同形成小体量中的丰富层次。",
    "原名大悲阁，以阁内大悲佛铜像得名，现存建筑重建于元大德十年，即一三〇六年；原寺多座建筑只剩此阁，其后修缮不能替代元代主体的断代。",
    "梁架以山面上檐昂尾承托平梁，并在转角施垂柱与抹角梁；这些不易从远处看清的连接方式，是认识元代木构结构安排和制作手法的重要细部。"
  ],
  "legacyNames": [
    "慈云阁"
  ],
  "legacyPlaces": [
    "河北",
    "定兴",
    "河北 · 定兴"
  ],
  "tall": false
},
{
  "name": "北岳庙",
  "short": "北岳庙",
  "sub": "德宁之殿正立面（含回廊、台基）",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 1347重建",
  "year": 1347,
  "yearLabel": "元代",
  "yearApprox": true,
  "yearNote": "省文物局以至正七年1347列现殿；县方志有至元七年1270完工记载，需并记营建阶段。",
  "place": "河北 · 曲阳",
  "lede": "德宁之殿最值得看的，是两重庑殿屋面与周围回廊共同铺开的尺度。高台和中央踏道把祭祀空间抬起，殿内元代壁画又将山岳神灵铺展在墙上。北岳庙曾是遥祭恒山的场所，现殿营建记载存在不同阶段的说法；把殿宇、壁画与院中碑刻联系起来，能看到皇家岳祭在地方留下的层层痕迹。",
  "id": "hb_beiyue",
  "country": "CN",
  "province": "河北",
  "placeName": "曲阳",
  "placeKey": "hb_quyang",
  "lat": 38.622,
  "lon": 114.69115,
  "initialStatus": "unvisited",
  "caption": [
    "曲阳 · 北岳庙德宁之殿",
    "元代木构 · 重檐庑殿"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "德宁之殿整体面阔九间、进深六间，重檐庑殿顶外绕回廊，高台前设中央踏道；殿身、环廊和台基合成的宽阔立面，是理解其祭祀等级的入口。",
    "现殿按元代遗构登记，省文物局记至正七年重建，地方方志另有至元七年营建说；这些记载可能涉及不同阶段，保留并列，不把庙的北魏沿革移作殿年。",
    "这里遥祭的是北岳恒山，殿内东西壁保存元代壁画，院中又有历代祭祀碑刻；木构、绘画与文字互相补充，使祭岳制度具有可见、可读的空间证据。"
  ],
  "legacyNames": [
    "北岳庙"
  ],
  "legacyPlaces": [
    "河北",
    "曲阳",
    "河北 · 曲阳"
  ],
  "tall": false
},
{
  "name": "修德寺塔",
  "short": "修德寺塔",
  "sub": "现存楼阁与花塔混合式砖塔",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋 · 约1020",
  "year": 1020,
  "yearLabel": "北宋 · 约1020",
  "yearApprox": true,
  "yearNote": "县方志称1020塔落成；省文物局只定宋且记六级/刹无存，后续实照核对现存层位，不能照七层通说补造。",
  "place": "河北 · 曲阳",
  "lede": "下面是素净的楼阁式塔身，中间忽然鼓起一段布满小塔龛的花塔，上面又收回楼阁式——两种塔式接在一座塔上，曲阳这座32米的砖塔是花塔中少见的变体。塔身嵌碑记“大宋天禧三年四月八日，水斗岩等村邑众共修舍利塔一级”，县志称次年（1020）塔成；地宫石函则说舍利塔始建于隋仁寿元年（601）。1953年塔基下出土大批北朝至隋唐白石造像，今分藏故宫与河北省博物馆。",
  "id": "hb_xiude",
  "country": "CN",
  "province": "河北",
  "placeName": "曲阳",
  "placeKey": "hb_quyang",
  "lat": 38.61735,
  "lon": 114.6891806,
  "initialStatus": "unvisited",
  "caption": [
    "曲阳 · 修德寺塔",
    "现状塔身 · 楼阁与花塔合构"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：八角砖塔，高32米。第二层塔身特别高大，周身砌小型塔龛110座，呈花塔样式；其下与其上均作楼阁式，通说七层，省文物局记六级，塔刹已失。",
    "<b>年代</b>：塔身嵌碑“大宋天禧三年（1019）四月八日……共修舍利塔一级”，县志记1020年落成；地宫石函铭文称始建于隋仁寿元年（601），塔北的修德寺创建于北宋元祐年间，今已无存。",
    "<b>出土</b>：1953年塔基下出土北魏至唐代汉白玉造像，其中隋大业年间48躯、北齐天保年间33躯，分藏故宫博物院与河北省博物馆；1994年又发现塔基地宫。"
  ],
  "legacyNames": [
    "修德寺塔"
  ],
  "legacyPlaces": [
    "河北",
    "曲阳",
    "河北 · 曲阳"
  ],
  "tall": true
},
{
  "name": "定州贡院",
  "short": "定州贡院",
  "sub": "魁阁号舍完整正立面",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 1738始建、1834扩建",
  "year": 1834,
  "yearLabel": "清 · 1738始建、1834扩建",
  "yearApprox": true,
  "yearNote": "拟用现存魁阁号舍所呈清代扩建形制；独栋精确创建年需在照片阶段进一步核定。",
  "place": "河北 · 定州",
  "lede": "魁阁号舍的正面像一列逐层降低的山峰，中央高起，两侧屋顶依次展开。它不是七座独立小楼，而是考场号舍与前贴魁阁组合出的立面，长窗又给内部带来采光。定州贡院始建于乾隆年间，道光时扩建形成现有规模；科举考试在这里留下的不只制度名称，还有供考生、考官和祭祀使用的具体空间。",
  "id": "hb_dzgongyuan",
  "country": "CN",
  "province": "河北",
  "placeName": "定州",
  "placeKey": "dingzhou",
  "lat": 38.51376,
  "lon": 115.00128,
  "initialStatus": "unvisited",
  "caption": [
    "魁阁号舍",
    "中央魁阁与两侧号舍七组屋顶的正面组合"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "魁阁贴建在号舍南面，沿号舍山面组织七组高低屋顶，中央最高、两侧递降；号舍以山墙为正面，上部通长直棂窗采光，屋面轮廓并非独立七楼相排。",
    "贡院于清乾隆三年始建，道光十四年修葺扩建，对应一七三八与一八三四年；现存规模主要与后期扩建相关，不能据组群纪年认定每一独栋同年营成。",
    "魁阁供奉魁星，号舍服务考试，北侧大堂又用于交卷和封卷，后楼供考官使用；不同职能紧密相接，把读书功名、礼仪象征与考试管理落实为院落和房间。"
  ],
  "legacyNames": [
    "定州贡院"
  ],
  "legacyPlaces": [
    "河北",
    "定州",
    "河北 · 定州"
  ],
  "tall": false
},
{
  "name": "承德避暑山庄",
  "short": "承德避暑山庄",
  "sub": "澹泊敬诚殿正立面",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 1754楠木改建",
  "year": 1754,
  "yearLabel": "清 · 1754楠木改建",
  "yearApprox": false,
  "yearNote": "山庄整组一条，1711殿创建与1754现主体改建分开。",
  "place": "河北 · 承德",
  "lede": "澹泊敬诚殿的看点，是宫殿尺度与朴素材质之间的平衡。横向展开的卷棚歇山屋面之下，楠木柱梁、门窗与天花保留木材本色，少了浓重彩饰，却不减正宫主殿的秩序。它先在康熙年间建成，又于乾隆朝以楠木改建；眼前这座接见王公、使节和举行庆典的殿堂，将山庄的山水趣味带进了皇家礼仪。",
  "id": "hb_bishushanzhuang",
  "country": "CN",
  "province": "河北",
  "placeName": "承德",
  "placeKey": "hb_chengde",
  "lat": 40.9817,
  "lon": 117.93531,
  "initialStatus": "unvisited",
  "caption": [
    "承德避暑山庄 · 澹泊敬诚殿",
    "七间单檐卷棚歇山楠木殿正面"
  ],
  "types": [
    "palace",
    "hall"
  ],
  "facts": [
    "主殿面阔七间，单檐卷棚歇山屋面向两侧舒展，柱梁、隔扇与天花以楠木本色为主；没有尖锐正脊的卷棚形式，使宽阔立面呈现较柔和的屋顶线条。",
    "景区资料记康熙五十年始建、乾隆十九年用楠木改建，分别为一七一一年与一七五四年；现存主体按改建阶段定位，不能将初建年当作今日楠木殿的全部年代。",
    "这里曾举行重大庆典、接受百官朝觐并接见各族首领和外国使节；以较朴素的木色承载正式礼仪，体现避暑山庄宫殿与北京宫廷在材质观感上的不同取向。"
  ],
  "legacyNames": [
    "承德避暑山庄"
  ],
  "legacyPlaces": [
    "河北",
    "承德",
    "河北 · 承德"
  ],
  "tall": false
},
{
  "name": "普宁寺",
  "short": "普宁寺",
  "sub": "大乘阁完整立面",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 1755—1758",
  "year": 1758,
  "yearLabel": "清 · 1755—1758",
  "yearApprox": false,
  "yearNote": "汉藏建筑群一条，不另拆大佛；大乘阁为代表。",
  "place": "河北 · 承德",
  "lede": "大乘阁正面的六道檐口并不对应六层楼面，这是普宁寺最值得读清的结构关系。高阁依山势起伏，容纳巨大的木雕千手千眼观音，正面、两侧与背面的层次又各不相同。寺院在乾隆朝营建，前部沿汉式佛寺轴线，后部借鉴藏传佛教布局；大乘阁将造像尺度、山地空间与汉式木构楼阁集中在一起。",
  "id": "hb_puning",
  "country": "CN",
  "province": "河北",
  "placeName": "承德",
  "placeKey": "hb_chengde",
  "lat": 41.01444444,
  "lon": 117.94611111,
  "initialStatus": "unvisited",
  "caption": [
    "普宁寺大乘阁",
    "六重檐高阁及正面石台阶"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "大乘阁南面显出六重檐，东西两侧五重、北面四重，内部实际分三层；檐层随山势与外观变化，不能当作一致的楼层数，巨大的观音像居于阁内中心。",
    "普宁寺建于清乾隆二十年至二十三年，即一七五五至一七五八年，后部布局参照西藏桑耶寺；这段营建史对应清代寺院，不是借用所参照寺院的早期年代。",
    "阁外汉式木楼与周围藏式殿台共同组成礼佛空间，内部木雕观音又要求贯通的高度；从檐层与内部楼面之差，可见造像、象征布局和营造技术之间的协调。"
  ],
  "legacyNames": [
    "普宁寺"
  ],
  "legacyPlaces": [
    "河北",
    "承德",
    "河北 · 承德"
  ],
  "tall": false
},
{
  "name": "普陀宗乘之庙",
  "short": "普陀宗乘之庙",
  "sub": "大红台完整正面及上部实存屋顶",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 1767—1771",
  "year": 1771,
  "yearLabel": "清 · 1767—1771",
  "yearApprox": false,
  "yearNote": "独立寺庙群一条，不与须弥福寿之庙混作一条或拆院凑数。",
  "place": "河北 · 承德",
  "lede": "大红台的巨大墙面与顶部显露的屋檐，让普陀宗乘之庙呈现殿宇包在高台中的格局。白台顺山势逐层抬升，红台在高处形成中心，内部礼佛建筑却并不直接露出完整正面。乾隆年间营建的寺院以布达拉宫为重要参照，又把汉式屋顶纳入藏式台体；这里值得看的，正是厚重外壳与内部院殿之间的关系。",
  "id": "hb_putuozongcheng",
  "country": "CN",
  "province": "河北",
  "placeName": "承德",
  "placeKey": "hb_chengde",
  "lat": 41.0125,
  "lon": 117.92777778,
  "initialStatus": "unvisited",
  "caption": [
    "普陀宗乘之庙大红台",
    "南侧大红台及紧邻白台的外观"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "大红台是寺院的核心台体，前方白台逐层承托，宽墙上的方窗与中央装饰带分出尺度；顶部可见屋檐，殿堂主要藏在台内，外墙并非普通大殿的正立面。",
    "寺院于清乾隆三十二年开工，至三十六年完成，对应一七六七至一七七一年，形制借鉴布达拉宫；这是一座清代新建寺院，不因参照对象古老而改变主体年代。",
    "万法归一殿位于大红台中部，汉式重檐屋顶与藏式台体共同组织礼佛空间；顺山抬升的外观与内部围合的殿院并读，才能理解这座寺院的汉藏营造结合。"
  ],
  "legacyNames": [
    "普陀宗乘之庙"
  ],
  "legacyPlaces": [
    "河北",
    "承德",
    "河北 · 承德"
  ],
  "tall": false
},
{
  "name": "清东陵",
  "short": "清东陵",
  "sub": "孝陵神道石牌坊",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 1672石牌坊落成",
  "year": 1672,
  "yearLabel": "清 · 康熙十一年（1672）",
  "yearApprox": false,
  "yearNote": "按所绘石牌坊采用1672：王其亨据《孝陵图样》及运石档案考证1671年底运输构件、1672初落成。孝陵1663—1664早期主体工程与传统1668附属工程记载不作为此石牌坊年。",
  "place": "河北 · 遵化",
  "lede": "孝陵神道石牌坊以五个开间和一连串石屋顶，先把清东陵的礼仪尺度展开。屋檐、额枋与柱头虽像木构，却由石材雕成，高低错落的十一楼将入口组织得既宽阔又有中心。它不是孝陵最早完成的部分，档案与图样研究将落成年份放在康熙十一年；从这座坊向北，才逐步进入陵寝的祭祀序列。",
  "id": "hb_qingdongling",
  "country": "CN",
  "province": "河北",
  "placeName": "遵化",
  "placeKey": "hb_zunhua",
  "lat": 40.146,
  "lon": 117.6815,
  "initialStatus": "unvisited",
  "caption": [
    "清东陵 · 孝陵石牌坊",
    "五间六柱十一楼正立面"
  ],
  "types": [
    "tomb",
    "gate"
  ],
  "facts": [
    "石坊为五间六柱十一楼的仿木石构，中央通道与两侧开间按高低递进；柱、枋和楼顶连续相接，使人首先感到横向规制，而不是单独一座狭窄门洞。",
    "王其亨据孝陵图样与运石档案考证，牌坊石材于康熙十年陆续运抵，十一年初落成；采用一六七二年纪年，与孝陵较早的主体完工和入葬阶段分别说明。",
    "牌坊位于孝陵礼仪轴线的南端，随后依次展开门户、碑楼与祭祀建筑；石构仿照木屋面的做法，把陵寝等级转化为持久的材质，也让行进过程从入口开始有序。"
  ],
  "legacyNames": [
    "清东陵"
  ],
  "legacyPlaces": [
    "河北",
    "遵化",
    "河北 · 遵化"
  ],
  "tall": false
},
{
  "name": "净觉寺",
  "short": "净觉寺",
  "sub": "香阜宫与前出卷棚抱厦",
  "dyn": "ming",
  "tag": "清",
  "era": "清代重修遗构",
  "year": 1800,
  "yearLabel": "清代重修遗构",
  "yearApprox": true,
  "yearNote": "省文物局以清代认定现存寺院建筑；1800仅为清代约值排序，未找到香阜宫单栋精确营建年，不使用唐代创建传说作现构纪年。",
  "place": "河北 · 玉田",
  "lede": "香阜宫前出的卷棚抱厦，使正殿像向院中伸出一段较低的屋面。高低屋顶、石柱与木架相接，比单一平直立面更有进深感。净觉寺现存建筑主要属清代重修，正殿又采用悬梁吊柱的结构做法；它与后院重檐大雄宝殿各有形制，在连续院落中近看屋面如何相接，比只记寺院的早期创建传说更有收获。",
  "id": "hb_jingjue",
  "country": "CN",
  "province": "河北",
  "placeName": "玉田",
  "placeKey": "hb_yutian",
  "lat": 39.81121,
  "lon": 117.92016,
  "initialStatus": "unvisited",
  "caption": [
    "玉田净觉寺 · 香阜宫",
    "正殿与前出卷棚抱厦正面"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "香阜宫为歇山屋顶的木构正殿，前出卷棚抱厦，柱列将前廊与殿身连接；主屋顶与较低抱厦形成前后层次，不与后院重檐歇山的大雄宝殿混作同一建筑。",
    "省文物局将现存寺院列为清代，记多次重修，尚无香阜宫单栋精确营建年；早期建寺沿革与今日梁架分开理解，正文保留清代遗构的约略断代。",
    "正殿梁架以悬梁吊柱处理承托，寺内砖、石、木雕又呈现不同材料的工艺；抱厦和殿身相接的地方，是观察地方寺院如何调整空间与支承关系的具体入口。"
  ],
  "legacyNames": [
    "净觉寺"
  ],
  "legacyPlaces": [
    "河北",
    "玉田",
    "河北 · 玉田"
  ],
  "tall": false
},
{
  "name": "南安寺塔",
  "short": "南安寺塔",
  "sub": "十三层密檐砖塔",
  "dyn": "liao",
  "tag": "辽",
  "era": "辽代",
  "year": 1100,
  "yearLabel": "辽 · 年代约值",
  "yearApprox": true,
  "yearNote": "省文物局根据外观形式推定辽代；1100只作辽代约值排序。1706为清代包砌塔座与重修，1986修补局部炮损檐角。",
  "place": "河北 · 蔚县",
  "lede": "高首层、仰莲座与密密叠起的十三道砖檐，构成南安寺塔最鲜明的比例。它在蔚州旧城中以八角轮廓升起，塔身没有可攀登的内部楼层，门窗却以砖雕留在外壁。现存形制被推定为辽代，准确创建年尚无定论；清代包砌的塔座和近代炮损后的补檐，让一座古塔同时显露不同年代的维护痕迹。",
  "id": "hb_nanansi",
  "country": "CN",
  "province": "河北",
  "placeName": "蔚县",
  "placeKey": "yuxian",
  "lat": 39.8369444,
  "lon": 114.5641667,
  "initialStatus": "unvisited",
  "caption": [
    "蔚县南安寺塔",
    "八角十三层密檐塔与仰莲塔座"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "八角实心塔以仰莲座托起高大的首层，上部十三重密檐逐级收分；四正面做门券，四隅面做盲窗，砖雕门窗并不表示塔内存在相应的居住或登临空间。",
    "河北省文物局依据外观形制推定它始建于辽代，未给出确定创建年；清康熙四十五年包砌塔座并重修，东侧早年受炮击的三层檐角又在一九八六年修补。",
    "塔身以砖砌出木构斗拱、门扇和倚柱，门券上还见二龙戏珠装饰；观察莲座、仿木构件与密檐的衔接，可以读出辽代砖塔如何把雕饰集中在下部。"
  ],
  "legacyNames": [
    "南安寺塔"
  ],
  "legacyPlaces": [
    "河北",
    "蔚县",
    "河北 · 蔚县"
  ],
  "tall": true
},
{
  "name": "释迦寺",
  "short": "释迦寺",
  "sub": "三间单檐歇山大雄宝殿",
  "dyn": "yuan",
  "tag": "元",
  "era": "元代",
  "year": 1300,
  "yearLabel": "元代",
  "yearApprox": true,
  "yearNote": "元殿结构断代，其他明代殿宇不混入主体。",
  "place": "河北 · 蔚县",
  "lede": "释迦寺中殿的宽阔明间，隐藏在看似朴素的三间屋面之下。单檐歇山顶覆着近方形殿身，低展屋面与梁架被用来判断这座大雄宝殿的元代年代。寺院后来扩建，前后殿以屋面相互呼应，屋脊与天花也经历修配；眼前既有元代构架的骨干，也有明清时期不断塑造的礼佛空间。",
  "id": "hb_shijia",
  "country": "CN",
  "province": "河北",
  "placeName": "蔚县",
  "placeKey": "yuxian",
  "lat": 39.83389,
  "lon": 114.56389,
  "initialStatus": "unvisited",
  "caption": [
    "释迦寺中殿",
    "元代三间单檐歇山大雄宝殿正面"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "中殿即大雄宝殿，面阔与进深各三间，单檐歇山顶，立在砖砌月台上；宽大的中央开间使殿内空间集中，不宜仅凭外观三间便把它理解为狭小佛堂。",
    "省文物局根据梁架形式与建筑外观推断大殿为元代遗构，寺中碑记也证明元代已有释迦禅寺；明洪武年间扩建，现存屋面和殿内天花另有后世修配。",
    "前后相邻殿宇虽然采用硬山屋顶，却在朝向中殿处加柱披檐，形成近似歇山的立面；这种呼应把中殿纳入完整寺院空间，也显示建筑群并非同年营成。"
  ],
  "legacyNames": [
    "释迦寺"
  ],
  "legacyPlaces": [
    "河北",
    "蔚县",
    "河北 · 蔚县"
  ],
  "tall": false
},
{
  "name": "宣化清远楼",
  "short": "宣化清远楼",
  "sub": "十字歇山三重檐钟楼及砖台",
  "dyn": "ming",
  "tag": "明",
  "era": "明 · 1482",
  "year": 1482,
  "yearLabel": "明 · 1482",
  "yearApprox": false,
  "yearNote": "仅选宣化城楼代表一条，不再增加镇朔楼、五龙壁。",
  "place": "河北 · 宣化",
  "lede": "街道穿过高大砖台的券洞，清远楼则在其上向四方展开十字形屋面。三道檐口彼此穿插，中央和两翼的高低关系比普通钟楼复杂，却并不杂乱。它始建于明成化年间，处在宣化古城的中轴线上；从街心抬头，琉璃上檐、布瓦腰檐和各向匾额把报时、地标与边城记忆集中在同一座楼中。",
  "id": "hb_xuanhuaqingyuan",
  "country": "CN",
  "province": "河北",
  "placeName": "宣化",
  "placeKey": "hb_xuanhua",
  "lat": 40.6125,
  "lon": 115.05611,
  "initialStatus": "unvisited",
  "caption": [
    "清远楼南面",
    "三重檐十字歇山顶与砖台券洞"
  ],
  "types": [
    "pavilion"
  ],
  "facts": [
    "楼为三层、三重檐，十字形平面配十字歇山顶，下承砖砌墩台；底层周设围廊，上层设隔扇，交错屋面将四向立面联系起来，而非普通楼顶的简单叠加。",
    "清远楼始建于明成化十八年，即一四八二年，后经历代维修；现貌延续明代钟楼的布局与形式，创建时间与后来更换修补的屋面、木件应分别理解。",
    "上檐使用琉璃瓦，腰檐和下檐用布瓦，四向匾额又各有题名；材质分层与方向标识共同强化街心地标，让钟楼既组织城市视线，也保存宣化边城的文化记忆。"
  ],
  "legacyNames": [
    "宣化清远楼"
  ],
  "legacyPlaces": [
    "河北",
    "宣化",
    "河北 · 宣化"
  ],
  "tall": false
},
{
  "name": "鸡鸣驿城",
  "short": "鸡鸣驿城",
  "sub": "东门城台与两翼古城墙",
  "dyn": "ming",
  "tag": "明",
  "era": "明 · 1420起建",
  "year": 1420,
  "yearLabel": "明 · 1420起建",
  "yearApprox": true,
  "yearNote": "1420为省文物局认定的明代驿城创建年，明清续修；本图包含近现代修复城楼，木屋顶不声称明代原物。",
  "place": "河北 · 怀来",
  "lede": "东门的券洞先把来往道路收成狭窄入口，砖台与两翼城墙又将视线展开。鸡鸣驿城服务的是明清邮传与军驿，城内不仅有住户，还曾布置驿署、马号和驿仓。现存东门让这套交通制度有了可见的边界；城垣的明代沿革与后来修复的木城楼分属不同层次，不能因为轮廓完整就认作同年原构。",
  "id": "hb_jimingyi",
  "country": "CN",
  "province": "河北",
  "placeName": "怀来",
  "placeKey": "hb_huailai",
  "lat": 40.45135,
  "lon": 115.3088,
  "initialStatus": "unvisited",
  "caption": [
    "怀来鸡鸣驿城 · 东门",
    "门台与两翼墙段；城楼为修复现状"
  ],
  "types": [
    "wall",
    "gate"
  ],
  "facts": [
    "驿城平面近方形，东西各开一门，城墙外包砖、内筑夯土；东门城台与连接墙段组成入口，两翼的厚重墙体比上部木楼更直接显示驿城的防护结构。",
    "省文物局将城的创建记为明永乐十八年，此后明清均有续修；现状木城楼包含近现代修复部分，初建纪年说明驿城沿革，并不证明所有木构仍为明代原件。",
    "城中原设驿署、马号和驿仓，兼有庙宇、商店与民居，体现驿站作为交通节点的多种功能；东门既是防守界面，也是官文、马匹与旅人进入驿城的通道。"
  ],
  "legacyNames": [
    "鸡鸣驿城"
  ],
  "legacyPlaces": [
    "河北",
    "怀来",
    "河北 · 怀来"
  ],
  "tall": false
},
{
  "name": "娲皇宫及石刻",
  "short": "娲皇宫",
  "sub": "贴崖娲皇阁正面",
  "dyn": "ming",
  "tag": "明清",
  "era": "明清阁楼主体",
  "year": 1600,
  "yearLabel": "明清 · 年代约值",
  "yearApprox": true,
  "yearNote": "河北省文物局将山上娲皇阁等列明清遗物；邯郸文旅记明代于石券上增建三层木阁。1600仅作明清阁体的约值排序，未据北齐刻经年为阁体断代。",
  "place": "河北 · 涉县",
  "lede": "娲皇阁最特别的地方，是石窟、石券和木阁顺着崖面层层叠起。下部依山而筑，上部三层木构以连续檐线拉出高耸轮廓，与普通平地寺院的殿堂很不相同。现存阁体属于明清营建与修缮，旁侧摩崖刻经却早至北齐；建筑与经文近在一处，并不意味着同时诞生，而是不同年代在山崖上的叠合。",
  "id": "hb_wahuang",
  "country": "CN",
  "province": "河北",
  "placeName": "涉县",
  "placeKey": "hb_shexian",
  "lat": 36.643333,
  "lon": 113.617222,
  "initialStatus": "unvisited",
  "caption": [
    "涉县娲皇宫 · 娲皇阁",
    "三层木阁与下层前廊的四道檐线"
  ],
  "types": [
    "pavilion",
    "grotto"
  ],
  "facts": [
    "下层天然石窟外筑石券，再在其上立三层木阁，构成四层主体；娲皇阁沿崖布置，前面檐口、柱列和廊部向外展开，山体与石木结构共同决定建筑形态。",
    "省文物局将山上娲皇阁等列为明清遗构，具体单栋创建年尚未确认；北侧北齐摩崖刻经是更早的遗存，因此不能用刻经纪年替代现存木阁的营建年代。",
    "娲皇宫将山下宫院与山上阁群通过山路串联，女娲祭祀与石刻佛经在同一山地保存；观察贴崖建筑及邻近刻经，可以理解这里跨时代、跨信仰的文化层次。"
  ],
  "legacyNames": [
    "娲皇宫及石刻",
    "娲皇宫"
  ],
  "legacyPlaces": [
    "河北",
    "涉县",
    "河北 · 涉县"
  ],
  "tall": false
},
{
  "name": "邢台开元寺",
  "short": "邢台开元寺",
  "sub": "古开元寺菩萨殿（第三殿/释迦牟尼殿），完整正面及四根滚龙石柱",
  "dyn": "ming",
  "tag": "明",
  "era": "明 · 1518重修",
  "year": 1518,
  "yearLabel": "明 · 1518重修",
  "yearApprox": false,
  "yearNote": "毗卢殿1988火毁、1997重修，不选。改用明正德十三年重修的菩萨殿及四根有1518铭文的滚龙石柱。须与东侧2013新寺区分。",
  "place": "河北 · 邢台",
  "lede": "菩萨殿最引人靠近的，不只是五间屋面，而是前檐四根浮雕滚龙石柱。龙身从整块石材中突出，花叶与云纹围着柱身旋转，使承重构件也成为雕刻的主角。这座古开元寺第三殿延续明代重修的形制，石柱上的正德纪年又把观感落实到文字证据；早期建寺沿革与后来重修殿宇在这里各有位置。",
  "id": "hb_xtkaiyuan",
  "country": "CN",
  "province": "河北",
  "placeName": "邢台",
  "placeKey": "hb_xingtai",
  "lat": 37.0736,
  "lon": 114.50577,
  "initialStatus": "unvisited",
  "caption": [
    "邢台开元寺 · 菩萨殿",
    "五间硬山殿与四根滚龙石柱正面"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "菩萨殿又称释迦牟尼殿，位于古寺中轴第三殿位置，面阔五间、硬山屋顶；前檐四根滚龙石柱承担屋面并展示浮雕，石雕的深浅变化使立面富有层次。",
    "现殿采用明正德十三年重修阶段的断代，滚龙柱刻有该年七月建立题记；寺院更早的沿革不等于现殿创建年，毗卢殿火毁后重建也属另一座建筑的历史。",
    "柱上龙纹与云气、花叶相配，下部又保留捐献人的籍贯和姓名；雕刻艺术和营建题记同处一件石构，既能近看工艺，也能追索地方社会参与佛寺营造的痕迹。"
  ],
  "legacyNames": [
    "邢台开元寺"
  ],
  "legacyPlaces": [
    "河北",
    "邢台",
    "河北 · 邢台"
  ],
  "tall": false
},
{
  "name": "普利寺塔",
  "short": "普利寺塔",
  "sub": "方形七层塔身与平坐檐",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋 · 1051",
  "year": 1051,
  "yearLabel": "北宋 · 1051",
  "yearApprox": false,
  "yearNote": "省文物局明确皇祐三年；保留现存七层，不误用其他同名塔。",
  "place": "河北 · 临城",
  "lede": "方形平面的北宋塔，全国只保存了这一座——唐以后砖塔多转为八角，临城的普利寺塔还守着方形。塔高33米，外壁嵌满千佛砖雕，二层下出一圈平坐，再往上檐层紧密收束。层数各说不一：省文物局记七层，国保名录记八层，方志称九层，差别在于平坐檐算不算一层。河北省文物局定为皇祐三年（1051）建，寺院早废，塔独存于高台之上。",
  "id": "hb_puli",
  "country": "CN",
  "province": "河北",
  "placeName": "临城",
  "placeKey": "hb_lincheng",
  "lat": 37.43778,
  "lon": 114.50167,
  "initialStatus": "unvisited",
  "caption": [
    "临城普利寺塔",
    "方形七层塔身与平坐檐；不绘外围高台全貌"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：方形砖塔，高33米，仿木构密檐式。外壁砖雕佛像974尊、内壁40尊，故又称万佛塔；二层以下为较高塔身并出平坐，以上各层檐密集叠置，逐层收分。",
    "<b>年代</b>：河北省文物局记为北宋皇祐三年（1051）建；《全国重点文物保护单位》名录记皇祐四年（1052），地方志另有宋徽宗督建之说。普利寺始建于北朝，今仅余此塔。",
    "<b>层数</b>：现存层数因平坐檐是否计入而有七、八、九层三说，本条取省文物局的七层。塔每层四角原悬铁钟，晚风中作响，旧称“普利晚钟”。"
  ],
  "legacyNames": [
    "普利寺塔"
  ],
  "legacyPlaces": [
    "河北",
    "临城",
    "河北 · 临城"
  ],
  "tall": true
},
{
  "name": "沧州铁狮子",
  "short": "沧州铁狮子",
  "sub": "旧州现存铁狮原物（保留残缺）",
  "dyn": "zhou",
  "tag": "后周",
  "era": "后周 · 953",
  "year": 953,
  "yearLabel": "后周 · 953",
  "yearApprox": false,
  "yearNote": "不使用狮城公园2011放大复制品；真实残缺、背负莲盆和必要支撑状态按实照。",
  "place": "河北 · 沧县",
  "lede": "后周广顺三年（953）铸，身长6.26米、通高5.47米、重32吨，现存最大的古代铸铁器物。狮身铭“山东李云造”，背负莲盆，腹内似刻金刚经——它更像一座寺院里文殊菩萨的坐骑，而不是传说中的“镇海吼”。千年里被风刮倒、被砸、被灌硫磺、被填腿，如今四足失去承重，全靠钢架撑着站立；图版照原物画，连残缺和支架一起留下。",
  "id": "hb_cangzhoulion",
  "country": "CN",
  "province": "河北",
  "placeName": "沧县",
  "placeKey": "hb_cangxian",
  "lat": 38.20605556,
  "lon": 117.0158889,
  "initialStatus": "unvisited",
  "caption": [
    "沧州铁狮原物",
    "依2020年实拍保留残损与保护支架"
  ],
  "types": [
    "sculpture"
  ],
  "facts": [
    "<b>形制</b>：身长6.264米、宽2.981米、通高5.47米，腹中空，重32吨，估原重40吨以上；采用分截叠铸法，泥范约500块；昂首张口，前胸与臀部束带，背负巨大铁莲盆。",
    "<b>铭文</b>：颈右及牙边铸“大周广顺三年铸”，左肋铸“山东李云造”，头顶与颈下有“狮子王”，腹内疑为金刚经文；用途有镇城、镇海与寺院文殊坐骑三说，至今未有定论。",
    "<b>修缮</b>：嘉庆八年（1803）被大风刮倒，光绪十九年（1893）扶正；1983年整体北移8米，1987年灌硫磺合剂、1994—1995年填充腿部均加速损坏，四肢失去承重后仅靠外加钢柱支撑。"
  ],
  "legacyNames": [
    "沧州铁狮子"
  ],
  "legacyPlaces": [
    "河北",
    "沧县",
    "河北 · 沧县"
  ],
  "timelineLane": "north",
  "tall": false
},
{
  "name": "开福寺舍利塔",
  "short": "开福寺舍利塔",
  "sub": "八角十三层楼阁式塔",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋 · 1079",
  "year": 1079,
  "yearLabel": "北宋 · 1079",
  "yearApprox": false,
  "yearNote": "省局公元1079与元丰三年并列有纪年笔误，正确应元丰二年；以1079为准并核碑记来源。",
  "place": "河北 · 景县",
  "lede": "沧州狮子、赵州桥、正定菩萨、景州塔——河北古代四宝里，景州塔是唯一一座高塔。八角十三层，通高63.85米，塔顶五个铜葫芦叠成塔刹，外罩3.3米高的铁刹网，四面铁匾有三面铸着“齐隋重修”。现存塔身按北宋元丰二年（1079）重建，依据是塔内一层的碑刻；塔刹里发现的题记又记下金天眷二年（1139）和明正德十二年（1517）两次重修。",
  "id": "hb_jingzhouta",
  "country": "CN",
  "province": "河北",
  "placeName": "景县",
  "placeKey": "hb_jingxian",
  "lat": 37.69258,
  "lon": 116.26308,
  "initialStatus": "unvisited",
  "caption": [
    "景州塔正面",
    "十三层八角塔身与铁刹网、铜葫芦"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：八角十三层楼阁式砖石塔，通高63.85米，底座周长50.5米；塔基以巨型青石铺砌，塔身砖砌，各层正四面辟券门，二层以上设拱形走廊，内有砖梯可登顶，塔室为穿心式。",
    "<b>年代</b>：塔内一层碑刻记北宋元丰二年（1079）重建，省文物局名录“元丰三年”与1079并列系笔误；塔上铁匾铸“齐隋重修”，塔刹题记记金天眷二年（1139）与明正德十二年（1517）重修，始建或可追至北魏。",
    "<b>塔刹</b>：由五个大小不同的青铜葫芦叠成，高2.05米，下罩3.3米高铁刹网；1973年重修时在刹内发现明代木版佛经九册及释迦涅槃铜像。明永乐五年（1407）塔旁建开福寺，塔因得今名。"
  ],
  "legacyNames": [
    "开福寺舍利塔"
  ],
  "legacyPlaces": [
    "河北",
    "景县",
    "河北 · 景县"
  ],
  "tall": true
},
{
  "name": "云冈石窟",
  "short": "云冈",
  "sub": "第20窟 · 露天大佛",
  "dyn": "bei",
  "tag": "北魏",
  "era": "北魏 · 昙曜五窟时期",
  "year": 465,
  "yearLabel": "约460—470",
  "yearApprox": true,
  "yearNote": "以第20窟所属昙曜五窟约460—470年的营造阶段定位，465只用于排序。",
  "place": "山西 · 大同",
  "lede": "云冈最有名的一张脸，其实是一场坍塌的结果：第20窟的前壁早已崩落，十三点七米高的释迦坐像便露天而坐，成了整座石窟的象征。它属于和平初年（约460年）昙曜主持开凿的五座大像窟，宽肩厚胸、袒右袈裟，犍陀罗的异域气息与拓跋鲜卑的体魄合在同一尊像上。图版所绘即这尊主尊。",
  "id": "sx_yungang",
  "country": "CN",
  "province": "山西",
  "placeName": "大同",
  "placeKey": "datong",
  "lat": 40.109722,
  "lon": 113.122222,
  "initialStatus": "unvisited",
  "caption": [
    "云冈第20窟 · 主尊坐像",
    "北魏 · 约460—470"
  ],
  "types": [
    "grotto"
  ],
  "facts": [
    "<b>形制</b>：主尊结跏趺坐，高约13.7米，高肉髻、面相方圆、双耳垂肩；袒右式袈裟厚重，右肩却被斜搭的衣角遮住，被视为对西域披法的改良。东侧立佛尚存，西侧立佛与菩萨仅余残迹。",
    "<b>年代</b>：《魏书·释老志》记和平初年（460）沙门统昙曜奏请开窟五所，即今第16—20窟；五窟皆为穹隆顶、马蹄形平面的大像窟，第20窟与18、19窟属较早一组。1992年窟前发掘出西立佛衣纹残石130余块。",
    "<b>价值</b>：五窟大像象征北魏五帝、“令如帝身”，是皇家开窟的起点；云冈现存窟龛252个、造像五万一千余尊，2001年列入世界遗产，第20窟大佛是其中流传最广的一尊。"
  ],
  "legacyNames": [
    "云冈石窟",
    "云冈"
  ],
  "legacyPlaces": [
    "山西",
    "大同",
    "山西 · 大同"
  ],
  "tall": true
},
{
  "name": "天龙山石窟",
  "short": "天龙山",
  "sub": "第16窟 · 仿木构前廊",
  "dyn": "beiqi",
  "tag": "北齐",
  "era": "北齐 · 第16窟",
  "year": 560,
  "yearLabel": "北齐",
  "yearApprox": true,
  "yearNote": "所绘第16窟前廊属北齐（550—577），560为约略排序点；不套用其他窟的隋唐纪年。",
  "place": "山西 · 太原",
  "lede": "在天龙山，北齐人把一座木构佛殿的门脸刻进了山岩。第16窟前廊三间，两根八角石柱立在覆莲柱础上，柱头栌斗托着阑额，阑额上一斗三升与人字叉手交替排开，再往上是替木与檐枋——北朝的木构建筑一座也没有留下来，这片石刻前廊成了那个时代屋檐少有的实证。图版所绘即此前廊。",
  "id": "sx_tianlongshan",
  "country": "CN",
  "province": "山西",
  "placeName": "太原",
  "placeKey": "taiyuan",
  "lat": 37.737231,
  "lon": 112.378697,
  "initialStatus": "unvisited",
  "caption": [
    "天龙山第16窟 · 石刻前廊",
    "北齐 · 仿木构局部"
  ],
  "types": [
    "grotto"
  ],
  "facts": [
    "<b>形制</b>：前廊三开间，两根八角形石柱有收分，下为方形柱基与覆莲柱础；柱头栌斗承阑额，阑额上雕两组人字形叉手，补间作一斗三升，其上承替木与撩檐枋，顶上出檐。东柱保存较好，西柱表面已剥落。",
    "<b>年代</b>：天龙山石窟始凿于东魏，第1、10、16窟学界公认为北齐（550—577）所开；前廊右壁原有功德碑，碑文风化，纪年已不可辨，故无确切年份。窟门两侧的护法像与窟内多数造像头部在20世纪20年代遭盗凿。",
    "<b>价值</b>：天龙山现存25窟，研究者视第16窟为其中最重要的北齐窟，窟内三壁三龛、一佛二弟子二菩萨的格局与前廊一同保存，是了解北朝佛殿式石窟与木构外观的难得样本；2014年起的数字复原已为该窟接回7处流失造像。"
  ],
  "legacyNames": [
    "天龙山石窟",
    "天龙山"
  ],
  "legacyPlaces": [
    "山西",
    "太原",
    "山西 · 太原"
  ],
  "tall": false
},
{
  "name": "龙山石窟",
  "short": "龙山石窟",
  "sub": "三天大法师窟 · 主尊",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐代龛像 · 后有元代扩凿",
  "year": 800,
  "yearLabel": "唐代",
  "yearApprox": true,
  "yearNote": "三天大法师龛依现场标识及晋源文旅资料采用唐代断代，800仅约略定位；石窟群元代主体另述。",
  "place": "山西 · 太原",
  "lede": "太原龙山是中国现存规模最大的道教石窟，主体由元初全真道士宋德方（披云子）主持开凿；但山上最早的两龛——玄真龛与三天大法师龛——现场标识与地方文旅资料断为唐代。图版所绘即三天大法师龛的中央坐像：束高髻、着宽袍，面部已风化，道像朴素收敛的气质与佛窟大像截然不同。",
  "id": "sx_longshan",
  "country": "CN",
  "province": "山西",
  "placeName": "太原",
  "placeKey": "taiyuan",
  "lat": 37.732073,
  "lon": 112.429659,
  "initialStatus": "unvisited",
  "caption": [
    "龙山三天大法师窟 · 主尊局部",
    "唐代龛像 · 原物残貌"
  ],
  "types": [
    "grotto"
  ],
  "facts": [
    "<b>形制</b>：所绘为三天大法师龛主尊，盘坐，束高髻、着宽袍，衣褶以简洁的平行线刻出；面部风化，轮廓含蓄。图版只取中央一尊，自发髻至双膝，不代表龛内全部造像。",
    "<b>年代</b>：石窟群共八窟：虚皇、三清、卧如、玄真、三天大法师、七真及两处辩道龛，主体由丘处机弟子宋德方于元初主持开凿；玄真龛与三天大法师龛依现场标识及晋源文旅资料断为唐代，元代在其旁扩凿。本条年代即据此。",
    "<b>价值</b>：国内规模最大、保存最完整的纯道教石窟，石雕像六十余尊，衣饰简洁、神态庄重，有别于佛教造像；元代开凿与全真道在山西的传播直接相关，窟中并有王重阳等全真祖师像。"
  ],
  "legacyNames": [
    "龙山石窟"
  ],
  "legacyPlaces": [
    "山西",
    "太原",
    "山西 · 太原"
  ],
  "tall": true
},
{
  "name": "朔州崇福寺",
  "short": "崇福寺",
  "sub": "弥陀殿 · 金代木构",
  "dyn": "liao",
  "tag": "金",
  "era": "金 · 皇统三年",
  "year": 1143,
  "yearLabel": "1143",
  "yearApprox": false,
  "yearNote": "采用现存弥陀殿营建纪年；殿内彩绘、塑像与后世修缮另有分期。",
  "place": "山西 · 朔州",
  "lede": "七间大殿立在两米多高的月台上，面阔41米，在现存金代佛殿里仅次于大同华严寺大雄宝殿。檐下七铺作双抄双下昂，当心间加斜栱；殿内前排金柱减去两根、移动两根，让出横跨五间的佛坛。梁下墨书“皇统三年（1143）……特建”，匾额、隔扇、琉璃、塑像、壁画都还是金代原物。",
  "id": "sx_chongfu",
  "country": "CN",
  "province": "山西",
  "placeName": "朔州",
  "placeKey": "sx_shuozhou",
  "lat": 39.3131,
  "lon": 112.425739,
  "initialStatus": "unvisited",
  "caption": [
    "崇福寺弥陀殿 · 正面",
    "七间单檐歇山 · 金"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：面阔七间、进深四间（八椽），单檐歇山，通高21米，面阔41.32米、进深22.7米；前檐柱头七铺作双抄双下昂、单栱偷心造，施斜栱；前排金柱减二根、移二根，佛坛横跨五间；前檐五间装隔扇，棂花多达十五种。",
    "<b>年代</b>：明间攀间枋下金代墨书“皇统三年（1143）……特建”，稍间白垩题记贞元元年（1153）记油饰粉刷，施工延续十年以上；殿前竖匾高4.2米，为大定二十四年（1184）原物；1987—1991年落架大修，补塑补绘。",
    "<b>价值</b>：飞椽上铺金代栈砖不施望板，为现存辽金建筑孤例；鸱吻高3.2米，背兽张口为同期仅见；坛上九尊金塑，阿弥陀佛高8米，背光高14米直达脊槫；壁画327平方米，南壁千手千眼观音高4.68米，是现存最高大的千手观音壁画。"
  ],
  "legacyNames": [
    "朔州崇福寺",
    "崇福寺"
  ],
  "legacyPlaces": [
    "山西",
    "朔州",
    "山西 · 朔州"
  ],
  "tall": false
},
{
  "name": "平遥镇国寺",
  "short": "镇国寺",
  "sub": "万佛殿 · 北汉遗构",
  "dyn": "zhou",
  "tag": "北汉",
  "era": "北汉 · 天会七年",
  "year": 963,
  "yearLabel": "963",
  "yearApprox": false,
  "yearNote": "北汉天会七年纪年；963年虽已进入北宋纪年，山西此地仍属北汉，不改归宋构。",
  "place": "山西 · 平遥",
  "lede": "北汉只存在了二十八年，它留在地面上的建筑只剩这一座殿。天会七年（963）的万佛殿三间见方，檐柱才三米四高，柱头上的斗拱却有一米七，七铺作双杪双下昂把屋檐托出近两米——斗拱几乎占了柱高的六成，这是唐以来“大斗拱、小殿身”做法的最后一次放大。殿内十一尊五代彩塑与殿同龄。",
  "id": "sx_zhenguo",
  "country": "CN",
  "province": "山西",
  "placeName": "平遥",
  "placeKey": "pingyao",
  "lat": 37.2856,
  "lon": 112.271,
  "initialStatus": "unvisited",
  "caption": [
    "镇国寺万佛殿 · 正面",
    "北汉天会七年 · 963"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：面阔、进深各三间，平面近方形，11.58米×10.78米，殿高8.8米，单檐歇山；十二根檐柱高3.42米，无普拍枋，阑额不出头；柱头七铺作双杪双下昂重栱偷心造，补间五铺作双杪，斗拱高1.74米、出檐1.94米。",
    "<b>年代</b>：殿内脊槫下题记记北汉天会七年（963）建，清嘉庆二十四年（1819）碑亦载此年；寺原名京城寺，明嘉靖十九年（1540）改名镇国寺，碑记另载金、明、清历次修缮。",
    "<b>价值</b>：北汉传世的唯一建筑，也是最早的五代—宋初木构之一；佛坛上一佛、二弟子、二菩萨、二胁侍、二天王、二供养童子共十一尊为五代原塑，是莫高窟之外仅存的五代殿堂彩塑。1997年与平遥古城、双林寺一同列入世界遗产。"
  ],
  "legacyNames": [
    "平遥镇国寺",
    "镇国寺"
  ],
  "legacyPlaces": [
    "山西",
    "平遥",
    "山西 · 平遥"
  ],
  "timelineLane": "north",
  "tall": false
},
{
  "name": "平遥文庙",
  "short": "平遥文庙",
  "sub": "大成殿正面",
  "dyn": "liao",
  "tag": "金",
  "era": "金 · 1163",
  "year": 1163,
  "yearLabel": "1163",
  "yearApprox": false,
  "yearNote": "采用所绘主体或本条明列营建阶段的纪年，后世修缮另述。",
  "place": "山西 · 平遥",
  "lede": "全国的文庙里，只有这一座大成殿是金代木构：金大定三年（1163）重建，至今保持原貌。殿身五间，单檐歇山，檐下斗栱用的是中国少见的独立昂做法；殿前月台围青石栏杆，正中踏道雕二龙戏珠。文庙相传始建于唐贞观初年，1997年随平遥古城一并列入世界遗产。图版所绘为大成殿正面，院内后世建筑不在其内。",
  "id": "sx_pingyaowenmiao",
  "country": "CN",
  "province": "山西",
  "placeName": "平遥",
  "placeKey": "pingyao",
  "lat": 37.200278,
  "lon": 112.183889,
  "initialStatus": "unvisited",
  "caption": [
    "平遥文庙 · 大成殿正面",
    "金 · 1163"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：大成殿面阔五间，单檐歇山顶，立于月台之上；月台围青石雕栏，中央嵌刻“寿”字的“拜石”，前方与左右设石砌缓坡，正前缓坡雕二龙戏珠；檐下斗栱采用独立昂结构，在中国现存木构中少见。",
    "<b>年代</b>：平遥文庙始建于唐贞观初年，大成殿重建于金大定三年（1163），是全国各地文庙中唯一的金代建筑；“大成殿”之名始于北宋崇宁三年（1104）诏改文宣王殿，此殿重建距此不过六十年。1997年文庙随平遥古城、镇国寺、双林寺列入世界文化遗产。",
    "<b>价值</b>：全国文庙现存殿宇以此为最早；平遥古城“城左文庙、城右武庙，东道观西佛寺”的对称格局，文庙据其一端。殿前月台与东西各九楹的两庑围成正院，两庑供历代先贤先儒，是县级学宫规制保存较全的实例。"
  ],
  "legacyNames": [
    "平遥文庙"
  ],
  "legacyPlaces": [
    "山西",
    "平遥",
    "山西 · 平遥"
  ],
  "tall": false
},
{
  "name": "平遥城墙",
  "short": "平遥城墙",
  "sub": "迎薰门及相邻墙段",
  "dyn": "ming",
  "tag": "明清",
  "era": "明清 · 明清",
  "year": 1370,
  "yearLabel": "明清",
  "yearApprox": true,
  "yearNote": "1370用于城垣扩建阶段排序；门楼与现存墙面包含后世修缮。",
  "place": "山西 · 平遥",
  "lede": "明洪武三年（1370）扩筑包砖之后，平遥这圈周长六千余米、高约十二米的城墙再没有被拆过：六门四角楼、七十二座马面与三千余垛口至今可数，是中国保存最完整的县城城垣，也是1997年“一城两寺”世界遗产的主体。图版取南门迎薰门，券洞、城台与重檐门楼叠成一组，两侧垛口墙向东西延展；门楼与墙面都含后世修缮。",
  "id": "sx_pingyaowall",
  "country": "CN",
  "province": "山西",
  "placeName": "平遥",
  "placeKey": "pingyao",
  "lat": 37.198185,
  "lon": 112.181053,
  "initialStatus": "unvisited",
  "caption": [
    "平遥城墙 · 迎薰门及相邻墙段",
    "明清 · 明清"
  ],
  "types": [
    "wall"
  ],
  "facts": [
    "<b>墙体</b>：周长约6.4公里，墙高约12米，内为夯土、外包青砖，顶部墁砖、内侧设马道；每隔约50米出一马面并建敌楼，共72座，垛口三千余，墙外护城河宽、深各约4米。",
    "<b>沿革</b>：相传始筑于周宣王时，现存城垣为明洪武三年（1370）在旧城基础上扩建包砌，此后数十次修补仍保持明初格局；南门部分墙段2004年坍塌，2005年修复。",
    "<b>遗产</b>：1997年平遥古城连同双林寺、镇国寺列入世界遗产，城墙圈定225公顷的遗产区；城内近四千处明清店铺与民居，见证19世纪至20世纪初这里作为全国金融中心的岁月。"
  ],
  "legacyNames": [
    "平遥城墙"
  ],
  "legacyPlaces": [
    "山西",
    "平遥",
    "山西 · 平遥"
  ],
  "tall": false
},
{
  "name": "太原永祚寺双塔",
  "short": "永祚寺双塔",
  "sub": "文峰塔与宣文塔",
  "dyn": "ming",
  "tag": "明",
  "era": "明 · 明万历",
  "year": 1612,
  "yearLabel": "明万历",
  "yearApprox": true,
  "yearNote": "1612仅作双塔形成时期的约略排序；两塔营造有先后，不将此年同时标为两座的始建年。",
  "place": "山西 · 太原",
  "lede": "太原城东南的高岗上两座十三层砖塔并肩而立，相距四十六米，高都在五十四米上下，是中国现存最高的一对双塔。东塔文峰塔先建，万历二十七年（1599）由傅霖、傅之谟父子主持，是补城市文运的风水塔；西塔宣文塔晚十余年，万历四十年（1612）由五台山高僧妙峰为晋王建成，檐口全用孔雀蓝琉璃，以万历帝生母的尊号命名。图版并绘两塔，塔刹与收分各依原状。",
  "id": "sx_yongzuo",
  "country": "CN",
  "province": "山西",
  "placeName": "太原",
  "placeKey": "taiyuan",
  "lat": 37.846825,
  "lon": 112.590339,
  "initialStatus": "unvisited",
  "caption": [
    "太原永祚寺双塔 · 文峰塔与宣文塔",
    "明 · 明万历"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>双塔</b>：均为八角十三层楼阁式砖塔，内外双筒空心结构，内设盘旋楼梯；西塔宣文塔高54.78米、东塔文峰塔高53.3米，两塔相距46米，宣文塔十三层塔檐边沿皆用孔雀蓝琉璃瓦。",
    "<b>纪年</b>：万历二十五年（1597）创建永明寺，二十七年（1599）建成东塔；万历三十六年（1608）晋王朱敏淳延请妙峰禅师扩建，四十年（1612）西塔与无梁殿落成，寺改名永祚寺；清顺治、康熙年间续建成今貌。",
    "<b>修护</b>：东塔曾倾斜达2.87米，1995至1996年纠偏加固，西塔1981至1984年加固，现仅开放西塔登临；双塔1985年起成为太原市徽图案，寺内另存明代砖砌无梁殿与碑碣二百六十余通。"
  ],
  "legacyNames": [
    "太原永祚寺双塔",
    "永祚寺双塔",
    "双塔寺",
    "永祚寺",
    "文峰塔",
    "宣文塔"
  ],
  "legacyPlaces": [
    "山西",
    "太原",
    "山西 · 太原"
  ],
  "tall": false
},
{
  "name": "太原崇善寺",
  "short": "崇善寺",
  "sub": "大悲殿 · 明初官式木构",
  "dyn": "ming",
  "tag": "明",
  "era": "明洪武 · 大悲殿",
  "year": 1385,
  "yearLabel": "明洪武",
  "yearApprox": true,
  "yearNote": "1385仅为洪武朝的时间轴约略定位，不作为精确竣工年。寺院沿革和清代山门不代替所绘明代主体的年代。",
  "place": "山西太原 · 迎泽",
  "lede": "洪武十四年（1381）晋恭王朱棡为亡母马皇后扩建此寺，占地十四万平方米、中轴六重大殿的规模曾居山西之首；同治三年（1864）一场大火之后，只剩下中轴第五殿大悲殿。七间重檐、高近二十米的殿身，连同殿内三尊八米多高的洪武彩塑，是太原城里最可靠的一处明初官式佛殿样本。图版所绘即大悲殿正面。",
  "id": "sx_chongshan",
  "country": "CN",
  "province": "山西",
  "placeName": "太原",
  "placeKey": "taiyuan",
  "lat": 37.8664611,
  "lon": 112.5736806,
  "initialStatus": "unvisited",
  "caption": [
    "崇善寺 · 大悲殿",
    "明洪武 · 七间重檐庑殿"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>大悲殿</b>：面阔七间、进深四间，重檐歇山顶，通高近20米；殿内正中千手千眼十一面观音，左右千钵文殊与普贤，三像均为明洪武年间原塑，高8米余。",
    "<b>沿革</b>：据道光《阳曲县志》，寺址原为隋炀帝行宫，唐初称白马寺；洪武十四年至二十四年（1381—1391）扩建完备，嘉靖间改今名；1864年火后，光绪八年（1882）张之洞将前部废址改建为太原府文庙。",
    "<b>规模</b>：明代全寺殿宇近千间，中轴依次为金刚、天王、大雄宝、毗卢、大悲、金灵六殿，大悲殿仅次于九开间的大雄宝殿；今寺东西长119.2米、南北宽71.7米，占地8547平方米。"
  ],
  "legacyNames": [
    "太原崇善寺",
    "崇善寺"
  ],
  "legacyPlaces": [
    "山西",
    "太原",
    "山西太原 · 迎泽"
  ],
  "tall": false
},
{
  "name": "介休后土庙",
  "short": "后土庙",
  "sub": "三清楼 · 殿台合一",
  "dyn": "ming",
  "tag": "明清",
  "era": "明清 · 三清楼戏台",
  "year": 1519,
  "yearLabel": "明正德 · 清代修缮",
  "yearApprox": true,
  "yearNote": "约以正德时期三清楼与献楼营建作为排序点；碑记及来源1516、1519各有所指，不将1519强作所绘全部构件竣工年。",
  "place": "山西介休 · 庙底街",
  "lede": "介休后土庙把殿、台、楼三样东西叠成了一座建筑：三清楼下层是三清殿，上层三面围廊，背面却是朝向后土大殿的戏台，台高十三米，是现存最高的明代戏楼；两侧重檐八字影壁用砖檐加木檐硬是把高度顶了上去。介休市文物部门记它创建于正德十四年（1519），全庙屋顶除后土大殿用黄琉璃外一律五彩，琉璃在此是主角而非点缀。图版所绘为三清楼北面戏台与八字影壁。",
  "id": "sx_jiexiu_houtu",
  "country": "CN",
  "province": "山西",
  "placeName": "介休",
  "placeKey": "jiexiu",
  "lat": 37.02972,
  "lon": 111.91111,
  "initialStatus": "unvisited",
  "caption": [
    "介休后土庙 · 三清楼北面戏台",
    "明清 · 戏台与八字影壁"
  ],
  "types": [
    "pavilion",
    "stage"
  ],
  "facts": [
    "<b>三清楼</b>：二层三檐歇山顶，总高15.2米，前出二层三檐十字歇山抱厦与献殿相连；背面戏楼高13米，下层仅容一人站立；两侧八字影壁重檐悬山，下为砖雕檐、上为木作檐，博风板饰紫白琉璃“老鼠偷葡萄”。",
    "<b>纪年</b>：介休市文物局记三清楼创建于明正德十四年（1519）；正德十一年（1516）重修时将真武殿、三官祠并入，清雍正八年（1730）建土神庙后形成八庙相连的格局，道光十五年（1835）补葺。",
    "<b>琉璃</b>：全庙29座建筑屋顶皆覆琉璃，除后土大殿一组用黄色外，余为黄、绿、蓝、白、赭五彩，多为清代重葺时更换，三清楼上尚存个别宋代瓦件；殿内千余尊明代道教彩塑同属罕见。"
  ],
  "legacyNames": [
    "介休后土庙",
    "后土庙"
  ],
  "legacyPlaces": [
    "山西",
    "介休",
    "山西介休 · 庙底街"
  ],
  "tall": false
},
{
  "name": "介休城隍庙",
  "short": "城隍庙",
  "sub": "倒座戏台 · 琉璃屋脊",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 倒座戏台",
  "year": 1750,
  "yearLabel": "清 · 历次修复",
  "yearApprox": true,
  "yearNote": "1750仅为清代建筑的约略年表位置，不是戏台确切竣工年；庙宇创建及现存明代正殿另有年代。",
  "place": "山西介休 · 东大街",
  "lede": "介休城隍庙的戏台倒座在山门一侧，朝院内伸出一座歇山抱厦作台口，身后是卷棚硬山的后台；屋面满铺蓝绿琉璃，正脊上楼阁、宝瓶、吻兽一字排开，台基下留出门道，人从戏台底下进庙。介休市文物局记此庙创建年代不详，明弘治八年（1495）以后四次重修见于碑记，屋顶琉璃为介休现存不多的明代遗物。图版所绘为戏台朝院一面与琉璃屋脊。",
  "id": "sx_jiexiu_chenghuang",
  "country": "CN",
  "province": "山西",
  "placeName": "介休",
  "placeKey": "jiexiu",
  "lat": 37.03,
  "lon": 111.91925,
  "initialStatus": "unvisited",
  "caption": [
    "介休城隍庙 · 倒座戏台",
    "清代 · 历次修复"
  ],
  "types": [
    "stage"
  ],
  "facts": [
    "<b>戏台</b>：主体卷棚硬山顶，向院内与向外各出歇山抱厦三间，内侧抱厦即舞台；台基高起，前沿石栏，台下辟门道；两侧钟鼓楼夹峙，图版所见檐下雀替满雕花卉。",
    "<b>纪年</b>：碑记载明弘治八年（1495）、隆庆六年（1572）、清雍正二年（1724）、嘉庆十九年（1814）重修；维基百科另记始建于明洪武三年（1370）。2013年列为第七批全国重点文物保护单位。",
    "<b>琉璃</b>：屋顶琉璃脊瓦、鸱吻、仙人走兽、楼阁宝瓶属明代遗物，釉色与造型俱全；正殿面阔七间、重檐歇山，柱与斗栱纤细，明代风格明显，图版未绘。"
  ],
  "legacyNames": [
    "介休城隍庙",
    "城隍庙"
  ],
  "legacyPlaces": [
    "山西",
    "介休",
    "山西介休 · 东大街"
  ],
  "tall": false
},
{
  "name": "太谷无边寺",
  "short": "无边寺",
  "sub": "白塔 · 太谷古城",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋 · 元祐五年",
  "year": 1090,
  "yearLabel": "1090",
  "yearApprox": false,
  "place": "山西太谷 · 南寺街",
  "lede": "太谷老城里最高的东西是一座宋塔。元祐五年（1090）寺院续修时建起这座八角白塔，外看七层，里面却有九层，砖砌的檩枋、斗拱和平座一层层模仿木楼阁，总高四十三米，塔身收分舒缓，塔内有木梯可登。清同治年间一场大火把寺院烧光，只剩这座塔立在灰烟里；光绪年间重修的殿宇，都是围着它重新长出来的。",
  "id": "sx_wubian",
  "country": "CN",
  "province": "山西",
  "placeName": "太谷",
  "placeKey": "sx_taigu",
  "lat": 37.42222,
  "lon": 112.55167,
  "initialStatus": "unvisited",
  "caption": [
    "无边寺 · 白塔",
    "北宋元祐五年 · 八角楼阁塔"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：八角楼阁式空心砖塔，外观七层、内部九层，总高43米；每层出檐，檐下以砖雕模仿木构斗拱，形成重檐效果，塔身收分和缓，塔内设木质楼梯可登临。塔位于寺的第二进院，是全寺的视觉中心。",
    "<b>年代</b>：光绪《太谷县志》记寺创于西晋泰始八年（272），北宋重修后称普慈寺，元祐五年（1090）续修并建塔；清同治年间大火后仅存白塔，光绪三十年至三十二年（1904—1906）重修殿宇，复称无边寺。塔的年代以1090年为据，不取寺院创建传说。",
    "<b>价值</b>：现存寺院占地3960平方米，三进院落，中轴上山门、倒座戏台、四明亭、白塔、天王殿、大雄宝殿依次排列，保留了以塔为中心的早期寺院格局；国务院名单将全寺定为宋至清，塔是其中唯一的宋代遗构。图版单取白塔。"
  ],
  "legacyNames": [
    "太谷无边寺",
    "无边寺"
  ],
  "legacyPlaces": [
    "山西",
    "太谷",
    "山西太谷 · 南寺街"
  ],
  "tall": true
},
{
  "name": "榆次城隍庙",
  "short": "城隍庙",
  "sub": "玄鉴楼 · 乐楼戏台",
  "dyn": "ming",
  "tag": "明",
  "era": "明 · 玄鉴楼与乐楼",
  "year": 1497,
  "yearLabel": "1497—约1523",
  "yearApprox": true,
  "yearNote": "玄鉴楼1497及乐楼1511有碑记依据；前侧戏台约1523为文物普查据影壁纪年的推断。",
  "place": "山西榆次 · 东大街",
  "lede": "玄鉴楼不是一座楼，而是三代人叠出来的一组：弘治十年（1497）先在正殿之南立起五间、二层三重檐、通高十七米的玄鉴楼，其后乐楼贴着它的北檐接上，两檐之间不足一米，再向北伸出一间卷棚歇山的过路戏台，两侧配明代琉璃八字影壁。孔雀蓝的琉璃屋面高低错落，院里看去浑然一体。图版所绘为北侧这一组，正殿显佑殿与山门不在画中。",
  "id": "sx_yuci_chenghuang",
  "country": "CN",
  "province": "山西",
  "placeName": "榆次",
  "placeKey": "sx_yuci",
  "lat": 37.67881,
  "lon": 112.746,
  "initialStatus": "unvisited",
  "caption": [
    "榆次城隍庙 · 玄鉴楼北侧",
    "明代 · 乐楼与过路戏台"
  ],
  "types": [
    "pavilion",
    "stage"
  ],
  "facts": [
    "<b>玄鉴楼</b>：面阔五间、进深四椽，二层三重檐歇山顶，通高17米，孔雀蓝琉璃屋面，楼内三个空心藻井；北接进深二椽的乐楼，再北为面阔一间、单檐卷棚歇山的过路戏台，两侧立歇山顶琉璃八字影壁。",
    "<b>纪年</b>：庙创建于元至正二十二年（1362），宣德六年（1431）迁建今址，成化、弘治间扩建；弘治十年（1497）建玄鉴楼，正德四年（1509）建山门，乐楼与戏台至嘉靖初（1523年前后）建成，形成今日规模。",
    "<b>价值</b>：三个时期的屋檐相互穿插，影壁与乐楼围出回音区，是明代城隍庙“楼—乐楼—戏台”复合布局的样本；1996年列为全国重点文物保护单位，2000年入选世界文化遗产基金会（WMF）观察名单。"
  ],
  "legacyNames": [
    "榆次城隍庙",
    "城隍庙"
  ],
  "legacyPlaces": [
    "山西",
    "榆次",
    "山西榆次 · 东大街"
  ],
  "tall": false
},
{
  "name": "汾阳太符观",
  "short": "太符观",
  "sub": "昊天殿 · 杏花村",
  "dyn": "liao",
  "tag": "金",
  "era": "金 · 昊天玉皇上帝殿",
  "year": 1200,
  "yearLabel": "金",
  "yearApprox": true,
  "yearNote": "1200为承安五年醮坛记所示时代的约略排序点；正殿依建筑与文保资料断为金代，不将醮坛纪年强作殿堂精确竣工年。",
  "place": "山西汾阳 · 上庙村",
  "lede": "太符观昊天殿把三间见方的格局放在歇山屋顶下，正面的板门与直棂窗，让供奉玉皇上帝的空间显得紧凑而清楚。它是观内保存金代木构形制的正殿，殿中绘塑和其他建筑则多有明清层次。承安五年的碑记记的是创建醮坛，不能直接当作大殿竣工证书。看这座道观，木构、碑记与绘塑各有年代，恰好能读出一处信仰场所长期营建的过程。",
  "id": "sx_taifu",
  "country": "CN",
  "province": "山西",
  "placeName": "汾阳",
  "placeKey": "sx_fenyang",
  "lat": 37.344444,
  "lon": 111.9175,
  "initialStatus": "unvisited",
  "caption": [
    "太符观 · 昊天玉皇上帝殿",
    "金代 · 三间单檐歇山"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "格局：昊天殿面阔、进深各三间，平面近方，单檐歇山顶；中央板门与两侧直棂窗分出正面节奏，殿内供奉昊天玉皇上帝，小尺度正殿仍完整表达道教祭祀空间。",
    "碑记：金承安五年碑记涉及观内创建醮坛，现存正殿则按木构形制归为金代；坛的设置与殿堂建造是不同事件，不能将同一碑上的年份当作全部构件的确切营建年。",
    "层次：观内其他殿宇多属明代，绘塑与壁画也有明清营造和修整；金代正殿与后世神像、配殿同处一院，说明道观的完整现貌是历代增加、修复与使用累积的结果。"
  ],
  "legacyNames": [
    "汾阳太符观",
    "太符观"
  ],
  "legacyPlaces": [
    "山西",
    "汾阳",
    "山西汾阳 · 上庙村"
  ],
  "tall": false
},
{
  "name": "解州关帝庙",
  "short": "关帝庙",
  "sub": "崇宁殿 · 关帝祖庙",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 崇宁殿",
  "year": 1725,
  "yearLabel": "清 · 康熙火后重建",
  "yearApprox": true,
  "yearNote": "1725仅作18世纪前期重建阶段的约略排序，不是崇宁殿精确竣工年；1702是庙宇火灾年份。",
  "place": "山西运城 · 解州镇",
  "lede": "全国关帝庙的祖庙，正殿崇宁殿以宋徽宗崇宁三年（1104）封关羽“崇宁真君”为名。七间重檐歇山的大殿立在前朝中轴的尽端，殿周回廊一圈蟠龙石柱，檐下悬着康熙“义炳乾坤”、乾隆“神勇”、咸丰“万世人极”、慈禧“威灵震叠”四朝御匾。庙创建于隋开皇九年（589），现存建筑是清康熙四十一年（1702）大火后重建的格局。图版单取崇宁殿，殿后春秋楼不在画中。",
  "id": "sx_jiezhou_guandi",
  "country": "CN",
  "province": "山西",
  "placeName": "运城",
  "placeKey": "sx_yuncheng",
  "lat": 34.91056,
  "lon": 110.84333,
  "initialStatus": "unvisited",
  "caption": [
    "解州关帝庙 · 崇宁殿",
    "清代 · 七间重檐大殿"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>崇宁殿</b>：面阔七间、进深六间，重檐歇山顶，殿周设回廊并立蟠龙石柱；殿前东西分列钟亭与碑亭，为清代增设；殿内外悬康熙、乾隆、咸丰、慈禧题匾及清末民国题匾数十方。",
    "<b>纪年</b>：庙创建于隋开皇九年（589），宋大中祥符七年（1014）重建，此后屡毁屡建；清康熙四十一年（1702）火灾后重建，形成今日前朝后寝的格局，1988年列为全国重点文物保护单位。",
    "<b>格局</b>：全庙占地22万平方米，南为明万历四十八年（1620）所建结义园，北为正庙：前院中轴依次为照壁、端门、雉门、午门、御书楼、崇宁殿，后宫以春秋楼居中、刀楼印楼对峙，殿宇百余间，称“武庙之冠”。"
  ],
  "legacyNames": [
    "解州关帝庙",
    "关帝庙"
  ],
  "legacyPlaces": [
    "山西",
    "运城",
    "山西运城 · 解州镇"
  ],
  "tall": false
},
{
  "name": "新绛龙兴寺",
  "short": "龙兴寺",
  "sub": "龙兴宝塔 · 绛州城",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 乾隆重修增层",
  "year": 1784,
  "yearLabel": "1784重修",
  "yearApprox": false,
  "yearNote": "此年为现存十三层外观的清代重修增层纪年；不将寺院唐代沿革或塔内早期遗存直接等同于外观年代。",
  "place": "山西新绛 · 北大街",
  "lede": "绛州城北高岗上的龙兴宝塔八角十三级，通高四十二米余，是全城最高处。塔原本八层，清乾隆四十二年（1777）坍塌，四十九年（1784）重建时外包青砖、增至十三层，今日平直的叠涩砖檐与收分即由此定形。寺创建于唐初，原名碧落观，咸亨元年（670）改名龙兴寺；塔内早期遗存不等于外观年代。图版所绘为宝塔全身。",
  "id": "sx_xinjiang_longxing",
  "country": "CN",
  "province": "山西",
  "placeName": "新绛",
  "placeKey": "sx_xinjiang",
  "lat": 35.618123,
  "lon": 111.21962,
  "initialStatus": "unvisited",
  "caption": [
    "新绛龙兴寺 · 龙兴宝塔",
    "清乾隆重修 · 八角十三级"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>形制</b>：八角楼阁式砖塔，青砖砌筑，十三级逐层收分，层间以叠涩砖檐分隔，底层檐下砌砖雕斗栱；塔高一说42.4米、一说43.7米，每层嵌匾一方，自“一柱擎天”至“十州三岛”。",
    "<b>纪年</b>：塔原八层，清乾隆四十二年（1777）圮，四十九年（1784）重建增为十三层，另说1777年重修时包镶外皮增高；1941年重修，有《重修新绛龙兴寺碑记》。2006年全寺列为全国重点文物保护单位。",
    "<b>异事</b>：县志与碑记载塔顶多次“腾烟”，光绪元年（1875）、1937、1971、1976、1993年均有记录，1971年一次持续十余天，成因未明；寺内另有元代大雄宝殿与唐《碧落碑》，图版未绘。"
  ],
  "legacyNames": [
    "新绛龙兴寺",
    "龙兴寺"
  ],
  "legacyPlaces": [
    "山西",
    "新绛",
    "山西新绛 · 北大街"
  ],
  "tall": true
},
{
  "name": "绛州大堂",
  "short": "绛州大堂",
  "sub": "州署正堂 · 七间悬山",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 州署正堂",
  "year": 1300,
  "yearLabel": "元代",
  "yearApprox": true,
  "yearNote": "1300仅为元代遗构的年表约略定位，并非确切竣工年。",
  "place": "山西新绛 · 绛州署",
  "lede": "绛州大堂的七间殿面把州署正堂铺得格外宽，殿内又借减柱和大额枋腾出空间，官署的尺度因此不只表现在屋顶上。现存主体按元代遗构认识，创建确年尚不明，明清屡经维修。单檐悬山顶下的粗大梁柱与前檐斗栱，留下地方行政建筑的承重逻辑。堂前原有抱厦已经毁失；今日开阔的殿面，仍能用来理解官署正堂与一般民宅不同的公共空间。",
  "id": "sx_jiangzhou_datang",
  "country": "CN",
  "province": "山西",
  "placeName": "新绛",
  "placeKey": "sx_xinjiang",
  "lat": 35.61444,
  "lon": 111.21472,
  "initialStatus": "unvisited",
  "caption": [
    "绛州大堂 · 州署正堂",
    "元代 · 七间悬山"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "形制：大堂面阔七间、进深八椽，单檐悬山顶，前檐施十七朵斗栱；宽阔殿面由柱、额枋与梁架组织，两端墙面和中央开口形成疏密不同的空间节奏。",
    "沿革：大堂创建年不详，现存主体为元代遗构，明洪武、清乾隆与光绪年间均有维修；原来突出堂前的三间抱厦已毁，今日所见不等同某次营建的完整原貌。",
    "减柱：堂内采用减柱造，以纵向的大内额、由额配合横向梁架承重，减少内柱对空间的分隔；这类官署遗存使人能从梁柱安排，而非只从装饰，理解元代公共建筑。"
  ],
  "legacyNames": [
    "绛州大堂"
  ],
  "legacyPlaces": [
    "山西",
    "新绛",
    "山西新绛 · 绛州署"
  ],
  "tall": false
},
{
  "name": "新绛福胜寺",
  "short": "福胜寺",
  "sub": "光村 · 弥陀殿",
  "dyn": "yuan",
  "tag": "元",
  "era": "元 · 弥陀殿",
  "year": 1300,
  "yearLabel": "元代 · 明代修缮",
  "yearApprox": true,
  "yearNote": "1300仅作元代遗构约略排序，不声称该年建成。",
  "place": "山西新绛 · 泽掌镇光村",
  "lede": "光村福胜寺依地势层层展开，弥陀殿以重檐和围廊安顿内外空间。元代木构与殿内彩塑相互依存，北立面更能看清屋檐、后墙与廊柱的层次。",
  "id": "sx_fusheng",
  "country": "CN",
  "province": "山西",
  "placeName": "新绛",
  "placeKey": "sx_xinjiang",
  "lat": 35.7525,
  "lon": 111.16778,
  "initialStatus": "unvisited",
  "caption": [
    "福胜寺 · 弥陀殿北立面",
    "元代遗构 · 明代修缮"
  ],
  "types": [
    "hall",
    "sculpture"
  ],
  "facts": [
    "<b>元代殿宇</b> 弥陀殿保存元代木构，明弘治年间重修；寺院创建沿革不能直接替代现存殿宇年代。",
    "<b>重檐围廊</b> 弥陀殿五间见方，重檐歇山顶，四周围廊；南面高台与北面后院高差各异。",
    "<b>彩塑遗存</b> 殿内保存弥陀佛、胁侍菩萨与渡海观音等彩塑，不同塑像经历后世修补；本图绘殿宇北面。"
  ],
  "legacyNames": [
    "新绛福胜寺",
    "福胜寺"
  ],
  "legacyPlaces": [
    "山西",
    "新绛",
    "山西新绛 · 泽掌镇光村"
  ],
  "tall": false
},
{
  "name": "稷山青龙寺",
  "short": "青龙寺",
  "sub": "腰殿 · 水陆壁画",
  "dyn": "yuan",
  "tag": "元",
  "era": "元末—明初 · 腰殿壁画",
  "year": 1360,
  "yearLabel": "约1356—1368",
  "yearApprox": true,
  "yearNote": "所绘为腰殿壁画，采用运城博物馆援引的孙博断代范围；1360仅为排序坐标。并非1289木构竣工年，壁画断代仍有不同研究意见。",
  "place": "山西稷山 · 稷峰镇马村",
  "lede": "中国现存最早的一铺水陆画壁画就在马村青龙寺的腰殿里：佛、道、儒三教诸神分层列队，三世佛高踞画幅上方，与一山之隔的永乐宫同出晋南粉本，却另成一路。腰殿梁下有至元二十六年（1289）大木匠题记，壁画本身的年代则有“与木构同时”和“元末明初补绘”两说，年表取后者。图版转绘西壁上部三世佛一段，不代表全殿壁画与彩塑。",
  "id": "sx_jishan_qinglong",
  "country": "CN",
  "province": "山西",
  "placeName": "稷山",
  "placeKey": "sx_jishan",
  "lat": 35.58878,
  "lon": 110.92185,
  "initialStatus": "unvisited",
  "caption": [
    "青龙寺 · 腰殿西壁三世佛局部",
    "元末—明初 · 壁画线描转绘"
  ],
  "types": [
    "mural",
    "hall"
  ],
  "facts": [
    "<b>画幅</b>：腰殿“三界诸神图”每铺纵223厘米、横773厘米，上层主佛、中下层众神按尊卑分层，以云气串联；线描以铁线描、钉头鼠尾描为主，设色以石青、石绿为底，兼施朱黄白赤。",
    "<b>纪年</b>：寺创建于唐龙朔二年（662），元明屡修；腰殿脊砖攀间枋下有墨书“大元国至元贰拾陆年中秋……上大木行……谨志”，即1289年木构落成；孙博2010年论文以来，壁画被定为元代，另有元末明初之说。",
    "<b>价值</b>：全寺元明壁画196.38平方米，腰殿一铺被视为现存最早的水陆画实例，三教合一的神系下启明代毗卢寺等水陆画；与永乐宫三清殿、水神庙明应王殿同属晋南元代壁画群。"
  ],
  "legacyNames": [
    "稷山青龙寺",
    "青龙寺"
  ],
  "legacyPlaces": [
    "山西",
    "稷山",
    "山西稷山 · 稷峰镇马村"
  ],
  "tall": false
},
{
  "name": "稷山稷王庙",
  "short": "稷王庙",
  "sub": "献殿 · 钟鼓楼",
  "dyn": "ming",
  "tag": "清",
  "era": "清 · 道光重建",
  "year": 1843,
  "yearLabel": "1843重建",
  "yearApprox": false,
  "yearNote": "所绘献殿、钟鼓楼与后稷楼为清代重建建筑，寺内元代姜嫄殿未绘。",
  "place": "山西稷山 · 县城西大街",
  "lede": "稷王庙献殿前檐的雀替不雕龙凤，雕的是后稷教民稼穑、春耕播种与收获谷物。这座三间小殿两翼各立一座四米见方、重檐十字歇山的钟鼓楼，身后是三十米高的后稷楼，三座琉璃屋顶挤在一处。庙创建于元至正五年（1345），清道光年间毁于火，道光二十三年（1843）由知县李景椿倡捐重建，所绘三座建筑皆属此次。图版所绘为献殿与钟鼓楼，后稷楼只露上檐。",
  "id": "sx_jishan_jiwang",
  "country": "CN",
  "province": "山西",
  "placeName": "稷山",
  "placeKey": "sx_jishan",
  "lat": 35.60139,
  "lon": 110.9725,
  "initialStatus": "unvisited",
  "caption": [
    "稷山稷王庙 · 献殿与钟鼓楼",
    "清道光重建 · 后稷楼上檐"
  ],
  "types": [
    "hall",
    "pavilion"
  ],
  "facts": [
    "<b>献殿</b>：面阔三间、宽14米，进深10米，覆彩色琉璃瓦，屋顶一说悬山、一说硬山；前后檐下雀替为木雕农事图，明间后稷教稼，东次间春耕，西次间收获。钟鼓二楼长宽各4米，重檐十字歇山顶。",
    "<b>纪年</b>：庙创建于元至正五年（1345），道光十年（一说十六年）失火焚尽，道光二十三年（1843）知县李景椿倡捐重建；西山墙嵌其告成七言古诗石刻，东山墙刻稷山八景。2006年列为全国重点文物保护单位。",
    "<b>比较</b>：稷王庙以琉璃、木雕、石雕合称“三绝”，后稷楼回廊立二十根石雕擎檐柱、五十二块雕花栏板；庙内姜嫄殿为元构，国家文物局登记时代“元至清”，图版所绘皆为清代部分。"
  ],
  "legacyNames": [
    "稷山稷王庙",
    "稷王庙"
  ],
  "legacyPlaces": [
    "山西",
    "稷山",
    "山西稷山 · 县城西大街"
  ],
  "tall": false
},
{
  "name": "马村砖雕墓",
  "short": "马村砖雕墓",
  "sub": "一号墓 · 妇人启门",
  "dyn": "liao",
  "tag": "金",
  "era": "金代 · 仿木砖雕墓室",
  "year": 1150,
  "yearLabel": "金代前期",
  "yearApprox": true,
  "yearNote": "1150仅作金代前期的约略排序点，不是某墓确切入葬年；墓群整体跨北宋晚期至金代。",
  "place": "山西稷山 · 稷峰镇马村",
  "lede": "一号墓是这片地下宅院里雕得最细的一座：砖砌的四合院，上层双重斗栱，中间一圈围廊，正面门楼中央一扇门半开，侍女探身向外；后壁则是一台杂剧。墓群属稷山段氏，据《段楫预修墓记》为金大定以前的家族墓地，整体跨北宋晚期至金代前期，单座墓没有确切入葬年。图版所绘只是一号墓的妇人启门一角。",
  "id": "sx_macun",
  "country": "CN",
  "province": "山西",
  "placeName": "稷山",
  "placeKey": "sx_jishan",
  "lat": 35.58738,
  "lon": 110.92073,
  "initialStatus": "unvisited",
  "caption": [
    "马村砖雕墓 · 一号墓妇人启门",
    "金代 · 墓室砖雕局部线描"
  ],
  "types": [
    "tomb"
  ],
  "facts": [
    "<b>形制</b>：墓室砖仿木构，模拟地上四合院，方形覆斗顶，一般长约2.5米、宽约2.1米、高3.5—4米；门楼或设重台勾栏、或雕武士镇兽，四壁下部砌束腰须弥座，雕飞马奔鹿；一号墓上层双重斗栱、中设围廊，正面门楼中央为妇人启门，后侧雕戏剧演出。",
    "<b>年代</b>：墓地东西160米、南北140米，共发现墓葬14座，1978—1979年山西省考古研究所清理9座；据《段楫预修墓记》与墓葬形制，定为金大定以前的段氏家族墓地，总体跨北宋晚期至金代前期；出土熙宁元宝、天圣元宝等。1996年在墓地上成立山西省金墓博物馆。",
    "<b>价值</b>：妇人启门是汉代以来的墓葬题材，宋辽金最盛，马村砖雕为其代表；各墓中的杂剧乐队、“开芳宴”与二十四孝，把段氏“孝养家、食养生、戏养神”刻进墓中，金代杂剧砖雕也把戏曲实物史料推到元代以前。砖上还刻有“鹿茸三钱”的食补汤方，段氏为行医世家。"
  ],
  "legacyNames": [
    "马村砖雕墓"
  ],
  "legacyPlaces": [
    "山西",
    "稷山",
    "山西稷山 · 稷峰镇马村"
  ],
  "tall": false
},
{
  "name": "丁村民居",
  "short": "丁村民居",
  "sub": "丁坤大院 · 晋南宅院",
  "dyn": "ming",
  "tag": "清",
  "era": "清乾隆时期 · 丁坤大院",
  "year": 1760,
  "yearLabel": "清乾隆时期",
  "yearApprox": true,
  "yearNote": "1760仅供乾隆时期约略排序。丁坤家族三代营建历时约50年，不给所绘厅堂虚构精确竣工年。",
  "place": "山西襄汾 · 新城镇丁村",
  "lede": "丁村在汾河东岸，留着二十余座明清宅院：北片是明万历以来的单进四合院，中、南两片是清雍正至咸丰年间的二进院。丁坤大院即今一号院，辟为丁村民俗博物馆，创建于清乾隆十年（1745）；宅主丁坤、丁嘉伦父子皆捐纳监生，孙辈丁溪连乾隆六十年（1795）又捐得州同，门前因此立起“宣德郎”牌坊。图版所绘为院内三间厅堂与两侧厢房。",
  "id": "sx_dingcun",
  "country": "CN",
  "province": "山西",
  "placeName": "襄汾",
  "placeKey": "sx_xiangfen",
  "lat": 35.84111,
  "lon": 111.41333,
  "initialStatus": "unvisited",
  "caption": [
    "丁村民居 · 丁坤大院院内厅堂",
    "清乾隆时期 · 庭院视角"
  ],
  "types": [
    "residence"
  ],
  "facts": [
    "<b>院落</b>：图版所见厅堂三间带前廊，两侧厢房围出狭长院心；丁村宅院为砖、石、木构的北方四合院，檐枋花板、雀替、柱础、门墩石上雕刻尤多，一栋乾隆年间民居的中厅栏板刻有“宁武关”“岳母刺字”百戏图。",
    "<b>纪年</b>：丁村北组最早者为明万历二十一年（1593），中、南两组建于清雍正至咸丰年间；一号院创建于乾隆十年（1745），“宣德郎”牌坊为乾隆六十年（1795）丁溪连捐官后所立。丁村民宅1988年列为全国重点文物保护单位。",
    "<b>价值</b>：丁村是同一家族在同一村落连续营建两百余年的宅院群，1985年建成的丁村民俗博物馆是中国第一座汉民族民俗博物馆；村旁汾河阶地上的丁村遗址为旧石器时代遗址，与民居分属两处保护单位。"
  ],
  "legacyNames": [
    "丁村民居"
  ],
  "legacyPlaces": [
    "山西",
    "襄汾",
    "山西襄汾 · 新城镇丁村"
  ],
  "tall": false
},
{
  "name": "泽州玉皇庙",
  "short": "玉皇庙",
  "sub": "府城 · 二十八宿彩塑",
  "dyn": "yuan",
  "tag": "元",
  "era": "元代 · 二十八宿彩塑",
  "year": 1300,
  "yearLabel": "元代",
  "yearApprox": true,
  "yearNote": "1300仅作元代彩塑约略排序点。官方资料未给所选单尊确切制作年；1076属寺庙重建，不能代作塑像年代。",
  "place": "山西泽州 · 金村镇府城村",
  "lede": "二十八宿到了泽州玉皇庙，不只是一组天上的名称，还化成姿态、衣袍与动物相伴的人物彩塑。虚日鼠是其中一尊，人的神情与鼠的形象相互配合，把抽象星宿变为可辨认的神像。官方资料将这组造像归入元代，具体单尊制作年未定；北宋重建寺庙的纪年不能代替塑像年代。看一尊像的细部，也能理解整组星神如何把天文分类、宗教观念与人物塑造连接起来。",
  "id": "sx_zezhou_yuhuang",
  "country": "CN",
  "province": "山西",
  "placeName": "泽州",
  "placeKey": "sx_zezhou",
  "lat": 35.54639,
  "lon": 112.93667,
  "initialStatus": "unvisited",
  "caption": [
    "泽州玉皇庙 · 虚日鼠",
    "元代 · 二十八宿代表彩塑"
  ],
  "types": [
    "sculpture"
  ],
  "facts": [
    "造型：虚日鼠将人物与鼠的形象结合，衣袍、手势和神态共同表现星神性格；它属于二十八宿组像的一部分，不能将单尊的特征泛作全部星神统一的造型模式。",
    "断代：这组二十八宿彩塑按官方资料归入元代，所选虚日鼠具体制作年尚未确认；寺庙北宋熙宁年间的重建属于建筑沿革，不应直接转作这尊造像的制作时间。",
    "星象：二十八宿分属青龙、白虎、朱雀、玄武四象，彩塑又以人物和动物把名称具象化；天文秩序与不同神情并置，使整组作品既可按星宿读，也可按人物形象看。"
  ],
  "legacyNames": [
    "泽州玉皇庙",
    "玉皇庙"
  ],
  "legacyPlaces": [
    "山西",
    "泽州",
    "山西泽州 · 金村镇府城村"
  ],
  "tall": true
},
{
  "name": "阳城海会寺双塔",
  "short": "海会寺",
  "sub": "六角砖塔 · 八角琉璃塔",
  "dyn": "ming",
  "tag": "明",
  "era": "明嘉靖—隆庆 · 琉璃大塔",
  "year": 1565,
  "yearLabel": "嘉靖—隆庆",
  "yearApprox": true,
  "yearNote": "1565仅为明代大塔营建时段排序点；资料有1561与1565—1568说法。小塔属五代创建、宋代改修，双塔并非同年营建。",
  "place": "山西阳城 · 大桥村海会寺塔院",
  "lede": "两座塔前后站着，隔了六百多年：前面的小塔六角十级，后梁龙德二年（922）为顺敏禅师建的舍利塔，满身小龛，微微西倾；后面的大塔八角十三级、高约五十七米，明嘉靖、隆庆间（1565—1568）富商李思孝捐银两千余两建成，底下三层包成城堡般的垛墙，第十层却向外挑出一圈琉璃悬阁。北方的楼阁式塔里找不出第二例。图版并绘两塔。",
  "id": "sx_haihui",
  "country": "CN",
  "province": "山西",
  "placeName": "阳城",
  "placeKey": "sx_yangcheng",
  "lat": 35.50167,
  "lon": 112.56,
  "initialStatus": "unvisited",
  "caption": [
    "海会寺 · 小砖塔与琉璃大塔",
    "五代—宋小塔 · 明嘉靖至隆庆大塔"
  ],
  "types": [
    "pagoda"
  ],
  "facts": [
    "<b>双塔</b>：小塔青砖六角十级，叠涩出檐，高约20米，外壁遍布佛龛；大塔八角十三级，高约57米，底部三层以砖石围成城垛式外墙，第十层伸出琉璃平座悬阁，每面三间、共二十四间，檐柱、栏板、雀替皆琉璃。",
    "<b>纪年</b>：寺内后周显德三年（956）《龙泉禅院后记》碑记小塔建于后梁龙德二年（922）；明礼部尚书王国光《龙泉寺重修宝塔佛殿记》碑记大塔建于嘉靖、隆庆年间（1565—1568），另有嘉靖四十年（1561）之说。",
    "<b>评价</b>：大塔因檐牙与悬阁用琉璃又称琉璃塔，张驭寰称之为“上党名塔之冠”；寺院明清时附设海会书院，1965年列为山西首批省级文物保护单位，2006年与双塔同列全国重点文物保护单位。"
  ],
  "legacyNames": [
    "阳城海会寺双塔",
    "海会寺"
  ],
  "legacyPlaces": [
    "山西",
    "阳城",
    "山西阳城 · 大桥村海会寺塔院"
  ],
  "tall": true
},
{
  "name": "高平开化寺",
  "short": "开化寺",
  "sub": "大雄宝殿 · 宋代壁画",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋熙宁六年 · 大雄宝殿",
  "year": 1073,
  "yearLabel": "1073",
  "yearApprox": false,
  "place": "山西高平 · 陈区镇王村舍利山",
  "lede": "开化寺大雄宝殿是一座能同时看到三样宋物的殿：熙宁六年（1073）的木构，梁枋斗拱上宋代“五彩遍装”的彩画，以及东西北三壁八十八平方米的北宋壁画——画工榜题记绍圣三年（1096），佛经故事里穿插着渔翁、农夫、楼阁与船只，有“壁画界的清明上河图”之称。三间六椽的歇山殿，当心间的檐柱是方的。",
  "id": "sx_kaihua",
  "country": "CN",
  "province": "山西",
  "placeName": "高平",
  "placeKey": "gaoping",
  "lat": 35.8703,
  "lon": 113.037,
  "initialStatus": "unvisited",
  "caption": [
    "开化寺 · 大雄宝殿",
    "北宋熙宁六年 · 1073"
  ],
  "types": [
    "hall",
    "mural"
  ],
  "facts": [
    "<b>形制</b>：面阔三间、进深六椽，平面近方形，单檐歇山，琉璃脊饰；当心间前后檐柱为方柱，柱上施阑额与普拍枋；柱头五铺作单杪单下昂，昂与耍头皆作锐利的批竹式，重栱计心造。梁架四椽栿对后乳栿用三柱，彻上露明。",
    "<b>年代</b>：檐柱上有“宋熙宁六年”题记，大殿定为熙宁六年（1073）所建；壁画据画工榜题为绍圣三年（1096）绘成，与木构年代分别记录。寺初名清凉寺，碑铭追至晚唐昭宗时，北宋天圣八年（1030）改额“开化禅院”。",
    "<b>价值</b>：殿内东、西、北三壁满绘宋代壁画，总面积88.68平方米，西壁为《大方便佛报恩经》、东壁为《华严经》等经变，是现存面积最大的北宋寺观壁画；梁架斗拱上的宋代彩画属最高等级的“五彩遍装”，纹样与《营造法式》所载相近，为古建中保存最完整的宋代彩绘。"
  ],
  "legacyNames": [
    "高平开化寺",
    "开化寺"
  ],
  "legacyPlaces": [
    "山西",
    "高平",
    "山西高平 · 陈区镇王村舍利山"
  ],
  "tall": false
},
{
  "name": "高平游仙寺",
  "short": "游仙寺",
  "sub": "毗卢殿 · 牛山",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋淳化时期 · 毗卢殿",
  "year": 990,
  "yearLabel": "约990—994",
  "yearApprox": true,
  "yearNote": "地方文旅记述990，前殿未见同期创建题记，采用990—994时段约略定位，不冒认精确竣工年。",
  "place": "山西高平 · 河西镇宰李村牛山",
  "lede": "牛山上的毗卢殿，碑文记寺创于北宋淳化元年（990），殿身断在淳化年间。三间六椽、平面近方，厚墙把檐柱裹在里面，深远的出檐压在墙身上；柱头五铺作单杪单昂，昂与耍头都是锋利的批竹式，普拍枋与阑额都不出头。殿内梁架彻上露明，丁栿干脆用一根天然弯材锯开做成——地方匠作的随手之妙。",
  "id": "sx_youxian",
  "country": "CN",
  "province": "山西",
  "placeName": "高平",
  "placeKey": "gaoping",
  "lat": 35.74028,
  "lon": 112.92944,
  "initialStatus": "unvisited",
  "caption": [
    "游仙寺 · 毗卢殿",
    "北宋淳化时期 · 约990—994"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：面阔三间、进深六椽，平面近方形，单檐歇山，筒板布瓦、砖雕脊饰；柱头五铺作单杪单昂偷心造，补间每间一朵五铺作双杪，耍头作批竹昂形；柱上普拍枋与阑额均不出头。梁架四椽栿后压乳栿用三柱，彻上露明。",
    "<b>年代</b>：据寺内碑文，寺创建于北宋淳化元年（990），原名慈教院，金、元、明、清历代重修；毗卢殿定为北宋原构，年代以淳化年间（990—994）约略定位，未见本殿同期题记；三佛殿为金代遗构，其余为明清所建。",
    "<b>价值</b>：丁栿以自然弯曲的木材锯开制成，保留了晋东南宋代地方匠作的做法；殿内宋代须弥座式佛台雕束腰壶门与花草，是现存少数宋代佛台原物。寺以碑刻丰富与“游仙晓钟”的景致为地方所记。"
  ],
  "legacyNames": [
    "高平游仙寺",
    "游仙寺"
  ],
  "legacyPlaces": [
    "山西",
    "高平",
    "山西高平 · 河西镇宰李村牛山"
  ],
  "tall": false
},
{
  "name": "高平姬氏民居",
  "short": "姬氏民居",
  "sub": "中庄村 · 元代民宅",
  "dyn": "yuan",
  "tag": "元",
  "era": "元至元三十一年",
  "year": 1294,
  "yearLabel": "1294",
  "yearApprox": false,
  "place": "山西高平 · 陈区镇中庄村",
  "lede": "姬氏民居没有庙宇式的宏大殿面，只有三间浅进深的正房，中央入口退后形成一段小廊。它的分量却在门边：青石门墩刻着“大元国至元三十一年”，让普通民宅也有了明确的纪年。低缓悬山屋顶下，粗朴斗栱与自然弯材保存元代营造特点，方格窗则是后来的改制。年代确切的木构与持续使用留下的门窗变化，共同说明古民居并非凝固的原样。",
  "id": "sx_jishi",
  "country": "CN",
  "province": "山西",
  "placeName": "高平",
  "placeKey": "gaoping",
  "lat": 35.86583,
  "lon": 113.06333,
  "initialStatus": "unvisited",
  "caption": [
    "姬氏民居 · 三间元代正房",
    "至元三十一年 · 1294"
  ],
  "types": [
    "residence"
  ],
  "facts": [
    "布局：正房面阔三间、进深六椽，悬山顶举折平缓，中央入口后退设前廊，平面因此略呈凹形；低缓屋盖、浅廊与小尺度开间，显示民居不同于寺庙的空间需求。",
    "纪年：青石门墩题“大元国至元三十一年岁次甲午”，对应一二九四年，是民宅断代的直接证据；门墩题记与木构特征相互印证，不宜错用其他至元年号的年份。",
    "构件：前檐柱头斗栱为四铺作，部分构件使用自然弯材，现窗棂已改成方格窗；元代承重木构与后改装修并存，正好展示一座住宅在长期使用中留下的时间层次。"
  ],
  "legacyNames": [
    "高平姬氏民居",
    "姬氏民居"
  ],
  "legacyPlaces": [
    "山西",
    "高平",
    "山西高平 · 陈区镇中庄村"
  ],
  "tall": false
},
{
  "name": "陵川西溪二仙庙",
  "short": "西溪二仙庙",
  "sub": "后殿 · 二仙信仰",
  "dyn": "liao",
  "tag": "金",
  "era": "金代 · 后殿",
  "year": 1142,
  "yearLabel": "1142年起重建",
  "yearApprox": true,
  "yearNote": "1142为碑记重建起始纪年，并非后殿精确竣工年；现存主体按金代风格断代。",
  "place": "山西陵川 · 崇文镇岭常村西",
  "lede": "后殿是全庙最老的一座：三间六椽的歇山殿立在石砌高台上，檐下五铺作双下昂，昂面作琴面式，前檐三间满装隔扇。碑记金皇统二年（1142）扩建，殿身按金代风格断代，1142只是重建的起点而非竣工年。庙祀乐氏二姐妹，是晋东南二仙信仰里创建最早、规模最大的一处。",
  "id": "sx_xixi_erxian",
  "country": "CN",
  "province": "山西",
  "placeName": "陵川",
  "placeKey": "sx_lingchuan",
  "lat": 35.76389,
  "lon": 113.25222,
  "initialStatus": "unvisited",
  "caption": [
    "西溪二仙庙 · 后殿",
    "金代 · 1142年起重建"
  ],
  "types": [
    "hall"
  ],
  "facts": [
    "<b>形制</b>：后殿石砌高台，面阔三间、进深六椽，单檐歇山顶；梁架四椽栿前压乳栿用三柱，柱头铺作五铺作双下昂计心造，昂为琴面式，当心间补间两朵，里转设挑斡；前檐三间装六抹隔扇门，屋顶琉璃脊饰多为明代构件。",
    "<b>年代</b>：碑记称庙创建于唐乾元年间（一说北宋中晚期），崇宁年间加封“真泽宫”，金皇统二年（1142）扩建；后殿前廊下金大定五年（1165）状元赵安时撰的重修碑是庙内最早碑刻，元定宗二年（1247）、明洪武十五年（1382）又有修葺。",
    "<b>价值</b>：后殿与东、西梳妆楼三座定为金构（西楼经民国重修），两层三重檐的梳妆楼是早期楼阁实例；庙内16座建筑自金至明清，碑刻29通，元好问延祐四年（1317）诗碑嵌于中殿后墙。图版所绘为后殿正面，梳妆楼不在其内。"
  ],
  "legacyNames": [
    "陵川西溪二仙庙",
    "西溪二仙庙"
  ],
  "legacyPlaces": [
    "山西",
    "陵川",
    "山西陵川 · 崇文镇岭常村西"
  ],
  "tall": false
},
{
  "name": "长子法兴寺",
  "short": "法兴寺",
  "sub": "圆觉殿 · 宋塑主尊",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋 · 政和元年宋塑",
  "year": 1111,
  "yearLabel": "1111 · 宋塑",
  "yearApprox": false,
  "yearNote": "取所绘中央释迦牟尼宋塑制作年1111，非寺院创建年或圆觉殿1081扩建年。现址1984—1996迁建，彩塑历代有修补重饰；不把现殿复制外檐当作1081原物。",
  "place": "山西 · 长子 · 慈林镇翠云山",
  "lede": "圆觉殿中央的释迦牟尼坐像在莲座上结跏而坐，衣褶与手势仍保留宋塑的从容。图版依现状单绘主尊及台座，记录这批随寺迁移保存的彩塑。",
  "id": "sx_faxing",
  "country": "CN",
  "province": "山西",
  "placeName": "长子",
  "placeKey": "sx_zhangzi",
  "lat": 35.98444444,
  "lon": 112.90666667,
  "initialStatus": "unvisited",
  "caption": [
    "法兴寺圆觉殿 · 释迦牟尼坐像",
    "北宋政和元年（1111）宋塑 · 随寺迁建现状"
  ],
  "types": [
    "sculpture"
  ],
  "facts": [
    "<b>宋塑纪年</b> 殿内宋塑记年为1111年，文献记塑匠冯宗本及画匠陈道荣、吕荣；本图只取中央释迦牟尼像。",
    "<b>殿与像分期</b> 圆觉殿于1081年落架扩建，早于宋塑制作。殿宇、造像与后世重饰各有年代。",
    "<b>迁建保护</b> 寺院1984—1996年迁至翠云山；圆觉殿外檐据北宋遗构推想复制，不能将今天全部外观视为宋代原物。"
  ],
  "legacyNames": [
    "长子法兴寺",
    "法兴寺"
  ],
  "legacyPlaces": [
    "山西",
    "长子",
    "山西 · 长子 · 慈林镇翠云山"
  ],
  "tall": true
},
{
  "name": "长子崇庆寺",
  "short": "崇庆寺",
  "sub": "千佛殿 · 紫云山",
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋大中祥符九年 · 千佛殿",
  "year": 1016,
  "yearLabel": "1016",
  "yearApprox": false,
  "place": "山西长子 · 色头镇琚村紫云山",
  "lede": "崇庆寺千佛殿坐落在紫云山坡，宽檐覆住朴素的三间厚墙。北宋木构与寺中宋代罗汉彩塑相邻，让建筑与塑像的不同纪年可以在一座小寺中对读。",
  "id": "sx_chongqing",
  "country": "CN",
  "province": "山西",
  "placeName": "长子",
  "placeKey": "sx_zhangzi",
  "lat": 35.98056,
  "lon": 112.95972,
  "initialStatus": "unvisited",
  "caption": [
    "崇庆寺 · 千佛殿",
    "北宋大中祥符九年 · 1016"
  ],
  "types": [
    "hall",
    "sculpture"
  ],
  "facts": [
    "<b>1016年宋构</b> 千佛殿始于北宋大中祥符九年，面阔三间、进深六椽，单檐歇山顶，现存主体按宋构登记。",
    "<b>宽檐厚墙</b> 墙面紧贴檐柱平面，中央木门与两侧直棂窗收在大屋檐之下，檐下斗栱粗壮清楚。",
    "<b>宋塑相邻</b> 寺内大士殿与十八罗汉有1079年纪年，墙体和其他殿宇另有后修；本图仅描绘千佛殿。"
  ],
  "legacyNames": [
    "长子崇庆寺",
    "崇庆寺"
  ],
  "legacyPlaces": [
    "山西",
    "长子",
    "山西长子 · 色头镇琚村紫云山"
  ],
  "tall": false
});

SITES.find(site => site.id === 'gugong').types.push('palace');

SITES.push({
  "id": "sd_pizhi",
  "types": [
    "pagoda"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "placeKey": "sd_changqing",
  "name": "济南灵岩寺辟支塔",
  "short": "辟支塔",
  "sub": "八角九层 · 十二重檐砖塔",
  "dyn": "song",
  "tag": "北宋",
  "era": "淳化五年重建 · 嘉祐年间告成",
  "year": 1057,
  "yearLabel": "北宋 · 嘉祐年间",
  "yearApprox": true,
  "yearNote": "塔铭记淳化五年（994）重建；1057—1058 年造像题记提供嘉祐年间落成的依据，1057 用于年表约略定位。",
  "place": "山东济南 · 长清灵岩寺",
  "lede": "辟支塔立在灵岩寺山色之间，八角塔身逐层收分。下三层各有两重砖檐，上六层各出一檐，九层塔身叠出十二重檐影；铁刹与细链在塔顶收住轮廓。",
  "facts": [
    "现存塔为北宋重建。塔铭记淳化五年（994）开工，嘉祐年间的造像题记为落成年代提供依据。",
    "八角九层，下三层重檐、上六层单檐，共十二重檐；砖砌檐部以仿木构细节组织轮廓。",
    "图版依据现存塔的日间照片绘制，保留灰褐砖石、深色檐部和局部赭红门窗框，不作历史彩绘复原。"
  ],
  "tall": true,
  "caption": [
    "八角九层 · 下三层重檐",
    "北宋重建 · 现存砖塔"
  ],
  "legacyNames": [
    "辟支塔",
    "灵岩寺辟支塔",
    "济南灵岩寺"
  ],
  "legacyPlaces": [
    "济南",
    "长清"
  ]
});

// 山西增补：现存元代木构与明代琉璃照壁，默认未到访。
SITES.push({
  id: 'sx_doudafu', types: ['hall'], initialStatus: 'unvisited', country: 'CN',
  name: '太原窦大夫祠', short: '窦大夫祠', sub: '献亭与大殿 · 上兰村',
  dyn: 'yuan', tag: '元', era: '至正三年重建', year: 1343,
  yearLabel: '1343', yearNote: '按现存献亭与大殿的元至正三年重建纪年定位，不以所祀人物的春秋年代或早期建祠沿革作为木构年代。',
  place: '山西太原 · 尖草坪上兰村', placeKey: 'taiyuan',
  lede: '粗壮木柱托起深远的檐口，献亭与后方大殿相接。灰褐旧木之间，暗绿琉璃勾出屋脊与瓦当的轮廓；窦大夫祠把祭祀空间收在一组紧密的木构之中。',
  facts: [
    '祠庙奉祀晋国大夫窦犨，又称烈石神祠、英济祠；早期建祠沿革与现存建筑年代分别记述。',
    '现存山门、献亭与大殿为元至正三年（1343）重建。图版选取献亭与大殿，不将两侧清代配房一并归为元构。',
    '献亭以歇山顶与后方悬山顶大殿勾连，粗柱与硕大斗栱形成鲜明尺度对比；设色依据现存旧木、灰瓦与琉璃，不作历史彩绘复原。'
  ],
  caption: ['太原窦大夫祠 · 献亭与大殿正面', '元 · 至正三年（1343）重建'],
  legacyNames: ['窦大夫祠', '窦犨祠', '烈石神祠', '英济祠'], legacyPlaces: ['太原', '上兰村'], tall: false
}, {
  id: 'sx_jiulongbi', types: ['screen'], initialStatus: 'unvisited', country: 'CN',
  name: '大同九龙壁', short: '九龙壁', sub: '代王府琉璃照壁 · 九龙浮雕',
  dyn: 'ming', tag: '明', era: '洪武二十五年', year: 1392,
  yearLabel: '1392', yearNote: '采用故宫博物院所列洪武二十五年（1392）纪年；图版只绘现存九龙壁，不绘当代复建代王府。',
  place: '山西大同 · 古城和阳街', placeKey: 'datong',
  lede: '九条龙在蓝绿琉璃之间翻卷，云气与水浪沿着长壁铺开。大同九龙壁以低矮壁顶与层叠须弥座收住繁密浮雕，留下明初藩王府邸的一道屏障。',
  facts: [
    '九龙壁原为代王朱桂府邸前的琉璃照壁。故宫博物院记其建于明洪武二十五年（1392），按所绘照壁主体归入明代。',
    '壁长约45.5米、高约8米，九条主龙布列于连续壁身；庑殿式壁顶与琉璃须弥座构成上下边界。',
    '照壁用于建筑前的屏障与装饰，并非城墙城防。图版移除围栏、树木与倒影池，简化云龙浮雕细节，保留实物琉璃的多色分布。'
  ],
  caption: ['大同九龙壁 · 九龙琉璃照壁正面', '明 · 洪武二十五年（1392）'],
  legacyNames: ['大同九龙壁', '代王府九龙壁', '大同九龍壁'], legacyPlaces: ['大同', '和阳街'], tall: false
});
SITES.push(
{
  "id": "bj_miaoying",
  "types": [
    "pagoda"
  ],
  "name": "北京妙应寺白塔",
  "short": "妙应寺白塔",
  "sub": "藏式白塔 · 现存塔身",
  "dyn": "yuan",
  "tag": "元",
  "era": "至元八年至十六年营建",
  "year": 1279,
  "yearLabel": "1271—1279",
  "place": "北京西城 · 阜成门内",
  "placeKey": "beijing",
  "lede": "大都城里最早立起来的东西之一：至元八年（1271）忽必烈请尼泊尔工匠阿尼哥主持造塔，八十五人干了八年，至元十六年（1279）完工，是中国现存年代最早、体量最大的藏式佛塔。塔高 51 米，亚字形的三层塔座上托一只直径 18.4 米的覆钵塔身，再上十三天、直径 9.7 米的铜华盖和一座四吨重的鎏金铜小塔做塔刹。1368 年雷火烧掉整座大圣寿万安寺，只有白塔没事。图版只画塔，不含前面的殿宇。",
  "facts": [
    "<b>形制</b>：藏式砖塔，高 51 米，通体白色，分塔座、塔身、相轮、华盖、塔刹五部分；塔座三层、平面亚字形，面积 810 平方米、高 9 米；覆莲座上缠五道金刚圈，覆钵塔身直径 18.4 米、外箍七道铁箍；相轮十三层，华盖直径 9.7 米、悬 36 片风铃，塔刹为高 5 米、重 4 吨的鎏金铜塔。",
    "<b>年代</b>：至元八年（1271）开工，阿尼哥主持，至元十六年（1279）建成，以塔为中心的大圣寿万安寺随后营建；至正二十八年（1368）寺遭雷火焚毁，塔独存。明宣德八年（1433）重修，天顺元年（1457）寺改名妙应寺，成化元年（1465）座周安 108 座铁灯龛，清康熙、乾隆、嘉庆亦屡修。",
    "<b>修缮与出土</b>：1978 年修缮时在塔顶发现乾隆十八年（1753）装藏的龙藏《大藏经》724 函、乾隆手书经咒、佛像与舍利等；2013—2015 年大修拆换表面约八成青砖、补砖近万块。初建时塔座与覆钵上的护法神像、五方佛标志等雕饰，如今已风化殆尽。"
  ],
  "tall": true,
  "legacyNames": [
    "白塔寺",
    "妙应寺",
    "妙應寺白塔"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "北京妙应寺白塔 · 覆钵式塔",
    "元 · 1271—1279"
  ]
},
{
  "id": "bj_zhenjue",
  "types": [
    "pagoda"
  ],
  "name": "北京真觉寺金刚宝座",
  "short": "真觉寺",
  "sub": "金刚宝座 · 五塔寺",
  "dyn": "ming",
  "tag": "明",
  "era": "成化九年建成",
  "year": 1473,
  "yearLabel": "1473",
  "place": "北京海淀 · 五塔寺",
  "placeKey": "beijing",
  "lede": "五座小塔没有各自落地，而是共同立在一座高大的石砌宝座上，这便是真觉寺金刚宝座的特别之处。宝座内砌砖、外包青白石，顶部的密檐塔彼此呼应，寺院也因此俗称五塔寺。宝座建成于明成化九年，形式借鉴印度佛陀伽耶的佛寺建筑；石面上的佛像、梵文经咒与藏文祝辞，又把远来的形制转化成明代北京的佛教艺术。",
  "facts": [
    "形制：高大的宝座内部用砖砌筑、外部包砌青白石，台上立五座密檐小塔；宝座内设通向顶部的通道，把承托塔群的台体也变成可以进入和登临的建筑。",
    "年代：真觉寺创建于永乐年间，现存金刚宝座至成化九年建成，两者并非同一营建时间；清乾隆年间修缮并改称正觉寺，寺名变化与宝座年代应分别理解。",
    "交流：塔群借鉴印度佛陀伽耶的建筑形式，石面又刻有佛像、梵文经咒和藏文祝辞；不同语言与造像共同构成宗教空间，也留下明代汉藏佛教艺术交流的证据。"
  ],
  "tall": false,
  "legacyNames": [
    "五塔寺",
    "真覺寺",
    "真觉寺金刚宝座塔"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "北京真觉寺金刚宝座 · 南面",
    "明 · 1473"
  ]
},
{
  "id": "bj_zhihua",
  "types": [
    "hall",
    "pavilion"
  ],
  "name": "北京智化寺",
  "short": "智化寺",
  "sub": "如来殿 · 万佛阁",
  "dyn": "ming",
  "tag": "明",
  "era": "正统年间创建 · 现存明代殿阁",
  "year": 1444,
  "yearLabel": "1443—1444始建",
  "yearApprox": true,
  "yearNote": "官方介绍分别采用1443和1444为智化寺始建年。1444用于约略排序，不能把寺院初创年直接视为每个现存构件的精确制作年。",
  "place": "北京东城 · 禄米仓胡同",
  "placeKey": "beijing",
  "lede": "黑琉璃瓦下，如来殿与万佛阁叠成一座两层佛殿：下层面阔五间，上层收为三间，屋顶与殿身的退让比一般单层大殿更鲜明。智化寺由明代宦官王振营建，官方资料分别使用正统八年始建与正统九年建成的记述。佛龛密布的殿内、保存下来的明代木构，让这座藏在胡同里的寺院，不只是一处黑瓦古建，也是一份观察明代佛殿的实物资料。",
  "facts": [
    "层次：如来殿在下、万佛阁在上，两层分别得名却组成同一座建筑；下层面阔五间、进深三间，上层三间见方，逐层收缩的殿面与屋檐构成清楚的高低关系。",
    "沿革：智化寺由王振营建为家庙，北京市政府资料记正统八年始建，文物局研究介绍记正统九年建成；这两个年份指向营建过程，不宜视为每座殿阁的独立断代。",
    "看点：黑琉璃瓦与殿内密布的佛龛是这里醒目的特征；保存的明代殿阁木构、彩画与斗栱，又为研究宋元建筑向明清建筑的变化提供实物，可以从细部读出时代。"
  ],
  "tall": false,
  "legacyNames": [
    "智化寺万佛阁",
    "如来殿",
    "萬佛閣"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "北京智化寺 · 如来殿与万佛阁",
    "明 · 1443—1444始建"
  ]
},
{
  "id": "bj_lugou",
  "types": [
    "bridge"
  ],
  "name": "北京卢沟桥",
  "short": "卢沟桥",
  "sub": "十一孔石拱桥 · 狮子栏柱",
  "dyn": "liao",
  "tag": "金",
  "era": "金代建成 · 明清修缮",
  "year": 1192,
  "yearLabel": "1192建成",
  "place": "北京丰台 · 永定河",
  "placeKey": "beijing",
  "lede": "数不清的狮子：281 根望柱，柱头大狮带小狮，加上华表和桥头的，一说 498 只，一说 501 只，连统计都没有定数。卢沟桥金大定二十九年（1189）开工、明昌三年（1192）建成，11 孔联拱石桥横在永定河上，全长 268 米、宽 9.4 米，桥墩迎水面砌出分水尖，尖上立铁柱破冰。1937 年 7 月 7 日的枪声在这里响起；1967 年它被改成公路桥，1987 年才恢复石桥原貌。图版从浅斜侧面看桥，十一孔都透空。",
  "facts": [
    "<b>形制</b>：11 孔联拱石桥，东西走向，桥身与引桥总长 268 米（桥身 212.75 米），宽 9.4 米，各孔跨度 11.4 至 13.45 米；10 座桥墩迎水面砌分水尖并立三棱铁柱御冰。桥面两侧 281 根望柱、279 块石栏，望柱高约 1.4 米、柱头雕狮；两端各有华表一对，东端伏狮、西端伏象抵住栏杆。",
    "<b>年代</b>：金大定二十九年（1189）金章宗下令建石桥，明昌三年（1192）完工，初名广利桥；明、清两代有记录的维修 12 次，乾隆十六年（1751）立“卢沟晓月”碑。桥基、桥身部分构件与部分石雕仍为金代原物，望柱与栏板则历代更换。",
    "<b>事件与价值</b>：1937 年 7 月 7 日日军在桥北演习后进攻宛平城与卢沟桥，卢沟桥事变成为全面抗战的起点；1967—1968 年桥面加铺钢筋混凝土改为公路桥，1987 年恢复石桥并停止通车。它是北京现存最古老的大型联拱石桥，“卢沟晓月”列燕京八景。"
  ],
  "tall": false,
  "legacyNames": [
    "盧溝橋",
    "Marco Polo Bridge"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "北京卢沟桥 · 十一孔石拱",
    "金 · 1192建成，明清修缮"
  ]
},
{
  "id": "bj_juyong_yuntai",
  "types": [
    "gate",
    "grotto"
  ],
  "name": "北京居庸关云台",
  "short": "居庸关云台",
  "sub": "元代过街塔基 · 半六角券洞",
  "dyn": "yuan",
  "tag": "元",
  "era": "至正二年至五年营建",
  "year": 1345,
  "yearLabel": "1342—1345",
  "place": "北京昌平 · 居庸关",
  "placeKey": "beijing",
  "lede": "一座塔基，上面的塔没了：居庸关云台原是元至正二年至五年（1342—1345）建的过街塔，台顶三座藏式白塔明初就毁了，后来改建的佛殿也在康熙四十一年（1702）烧光，只剩这座汉白玉石台。台高约 10 米，底边 26.84 米、顶边 24.04 米，上收下大；南北正中一道券洞贯通，洞顶折成半六角形，洞内壁满刻四天王、千佛和曼陀罗，还有梵、藏、汉、八思巴、回鹘、西夏六种文字的经咒——元代多民族文字的一部石头字典。",
  "facts": [
    "<b>形制</b>：汉白玉石台座，上小下大，高约 10 米，底部东西 26.84 米、南北 17.57 米，顶部 24.04 米、14.73 米；南北两面正中开相通的券门，高 7.27 米、宽 6.32 米。台顶四面挑出两层石平盘，刻如意云、兽面与缨络垂珠，上安石栏，望柱下与四角出螭首排水。",
    "<b>年代</b>：元至正二年（1342）动工，顺帝指定四名藏族人设计督工，至正五年（1345）建成，台上原立三座藏式白塔；明初三塔先后毁，改建五间佛殿，正统八年至十三年（1443—1448）重建；清康熙四十一年（1702）台上建筑全部毁于火，此后再无建筑。1993 年起整修，1998 年开放。",
    "<b>雕刻与文字</b>：券洞内顶刻五个曼陀罗，斜顶刻十方佛，其间满布千佛；两侧壁各刻天王两尊，四天王之间刻梵、藏、汉、八思巴、回鹘、西夏六体《陀罗尼经咒》与五体《造塔功德记》；券门外侧刻大鹏金翅鸟与鲸鱼、龙子、童男骑兽、象等“六拏具”，均为藏式风格。"
  ],
  "tall": false,
  "legacyNames": [
    "居庸关过街塔",
    "云台",
    "居庸關雲台"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "居庸关云台 · 现存过街塔基",
    "元 · 1342—1345营建"
  ]
},
{
  "id": "bj_changling",
  "types": [
    "hall",
    "tomb"
  ],
  "name": "北京长陵祾恩殿",
  "short": "长陵祾恩殿",
  "sub": "九间楠木大殿 · 重檐庑殿",
  "dyn": "ming",
  "tag": "明",
  "era": "永乐至宣德营建 · 历代修缮",
  "year": 1420,
  "yearLabel": "1416—1427营建沿革",
  "yearApprox": true,
  "yearNote": "故宫资料记1416年享殿建成、1427年陵园殿宇告竣，其他介绍采用1427年殿堂竣工说。1420只是所绘大殿明前期营建沿革的约略排序点，不采用陵园1409年初建作为殿堂竣工年。",
  "place": "北京昌平 · 明十三陵",
  "placeKey": "beijing",
  "lede": "长陵祾恩殿的尺度，走进殿内才更容易体会：六十根楠木柱撑起九间宽的大殿，中央四柱尤其粗壮。这里供奉明成祖朱棣及皇后的牌位，是陵园祭祀的中心。殿宇与陵园并非同时告竣，故宫资料分别记载享殿在永乐十四年建成、陵园殿宇至宣德二年完成；今日的重檐庑殿与石台基，仍让人看见明代皇家陵寝的礼仪等级。",
  "facts": [
    "形制：大殿面阔九间、进深五间，重檐庑殿顶下由六十根整材楠木柱承重；中央四柱直径约一米一二，粗大的柱身与宽阔殿面共同显示其木构尺度。",
    "营建：陵园于永乐七年开始兴建，故宫资料记享殿在永乐十四年建成、陵园殿宇至宣德二年告竣；殿与整个陵园的完成时间，应分层理解而非归作一年。",
    "祭祀：此殿原称享殿，用于供奉帝后牌位与举行上陵祭礼；嘉靖十七年改名祾恩殿，“祾”取祭而受福之意，“恩”指父母之恩，名称本身便是礼制的一部分。"
  ],
  "tall": false,
  "legacyNames": [
    "长陵",
    "祾恩殿",
    "棱恩殿",
    "明长陵"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "长陵 · 九开间祾恩殿",
    "明永乐至宣德 · 1416—1427营建沿革"
  ]
},
{
  "id": "tj_jizhou_baita",
  "types": [
    "pagoda"
  ],
  "name": "天津蓟县白塔",
  "short": "蓟县白塔",
  "sub": "八角砖塔 · 覆钵式塔身",
  "dyn": "liao",
  "tag": "辽至清",
  "era": "辽代形制 · 明清修缮",
  "year": 1100,
  "yearLabel": "辽至清",
  "yearApprox": true,
  "yearNote": "国保名录时代为辽至清。1100仅作辽代形制的年表约略定位，不代表确切初创、重建或现存全部构件的制作年；所绘为历代修缮后的现貌。",
  "place": "天津蓟州 · 白塔寺街",
  "placeKey": "jizhou",
  "lede": "蓟州白塔的轮廓由不同形制层层相接：八角下部向上收出密檐，再托起鼓圆的覆钵和细长塔刹。砖砌外表模拟楼阁，却没有普通木楼的开敞层面。国保资料将它的时代列为辽至清，今日形貌包含长期修缮；从下部的棱角转向上部的圆曲，能直观看到佛塔形制在同一建筑中的组合。",
  "facts": [
    "砖塔以八角下部为基础，上接数重低檐、覆钵式塔身和环状塔刹。下部近似楼阁，上部转为圆曲的佛塔轮廓，棱角与曲面沿垂直方向连续转换，区别于一般密檐塔。",
    "天津文物主管部门登记时代为辽至清，辽代形制与后世修缮共同构成现貌。整塔的初创确年仍待考，旧有形制的年代也不能直接代表今天所有构件的制作时间。",
    "同一塔体结合仿楼阁、密檐与覆钵等形式，为比较北方佛塔提供具体实例。历代修缮留下的层次也提示，建筑的历史年代与今天所见表面并不完全相同。"
  ],
  "tall": true,
  "legacyNames": [
    "蓟州白塔",
    "观音寺白塔",
    "渔阳郡塔",
    "薊縣白塔"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "蓟县白塔 · 楼阁与覆钵形制",
    "辽至清 · 历代修缮现貌"
  ]
},
{
  "id": "tj_wenmiao",
  "types": [
    "hall"
  ],
  "name": "天津文庙",
  "short": "天津文庙",
  "sub": "府庙大成殿 · 中部立面与丹陛",
  "dyn": "ming",
  "tag": "明清",
  "era": "正统元年初创 · 明清修缮现貌",
  "year": 1650,
  "yearLabel": "明清遗构",
  "yearApprox": true,
  "yearNote": "1436是文庙初创年，不直接作为所绘大成殿全部现存构件的制作年。1650仅为明清修缮现貌的约略排序点，非大成殿确切竣工年。",
  "place": "天津南开 · 老城厢东门内",
  "placeKey": "tianjin",
  "lede": "府庙大成殿的中部入口由黄琉璃瓦、彩画与暗红门窗层层围合，石质丹陛把殿前地面引向祭祀空间。文庙与学宫相连，清代又形成府县两庙并列的格局，祭孔与地方教育在同一处展开。一四三六年记载的是天津卫学初创，今日殿堂承接明清多次修缮；这一段入口可作为理解庙学关系的起点。",
  "facts": [
    "府庙大成殿中部以琉璃瓦檐、彩画梁枋和门窗形成层次，前接石质丹陛。入口与露台共同组织祭祀进出，中央立面只是殿堂的一部分，不能代替全殿的开间数。",
    "天津卫学初创于明正统元年一四三六年，后来营建殿堂，并经明清增修形成现状。学宫的创建与殿堂的形成各有阶段，不能据初创纪年判断每根现存梁柱的年龄。",
    "大成殿是祭孔的核心，府县两庙与明伦堂的并列体现地方建制与庙学关系。殿前台阶和门窗把日常教育、礼仪行进与圣贤祭祀联结在可见的建筑空间中。"
  ],
  "tall": false,
  "legacyNames": [
    "天津孔庙",
    "天津府学文庙",
    "天津文庙博物馆"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "天津文庙 · 大成殿中部与丹陛",
    "明清遗构 · 1436为文庙初创"
  ]
},
{
  "id": "tj_guangdonghuiguan",
  "types": [
    "stage"
  ],
  "name": "天津广东会馆",
  "short": "广东会馆",
  "sub": "戏台 · 鸡笼式藻井局部",
  "dyn": "ming",
  "tag": "清末",
  "era": "光绪三十三年落成",
  "year": 1907,
  "yearLabel": "1907",
  "place": "天津南开 · 南门里大街",
  "placeKey": "tianjin",
  "lede": "广东会馆戏台向观众席伸出，台上高悬的鸡笼式藻井从方形外框旋转收向圆心，木雕与梁栱在头顶形成层层回响。两层看台围着表演空间布置，观众可从三面看戏。会馆落成于清光绪三十三年，曾供旅津广东人集会和赏戏，后来成为戏剧博物馆；戏台让同乡生活与天津的戏曲记忆相遇。",
  "facts": [
    "戏台为伸出式，三面朝向观众，台前不设遮挡视线的落地木柱。上方鸡笼式藻井外方内圆，斗栱接榫螺旋收拢，与两层看台共同围合表演和观看的空间。",
    "广东会馆于清光绪三十三年一九〇七年落成，属于清末同乡会馆建筑。一九八六年修复后辟作戏剧博物馆，建筑初建、修复和博物馆利用是不同的历史阶段。",
    "藻井的收拢形态兼顾木作装饰与声音传播，伸出式舞台则加强演员和观众的联系。广东同乡的集会场所保存于天津，留下商旅组织、戏曲演出与城市文化相交的历史。"
  ],
  "tall": false,
  "legacyNames": [
    "广东会馆戏楼",
    "天津戏剧博物馆",
    "廣東會館"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "广东会馆 · 戏台与鸡笼式藻井局部",
    "清末 · 1907年落成"
  ]
},
{
  "id": "tj_shijia",
  "types": [
    "residence",
    "gate"
  ],
  "name": "天津杨柳青石家大院",
  "short": "石家大院",
  "sub": "内院门楼 · 纵深门院",
  "dyn": "ming",
  "tag": "清末",
  "era": "光绪初年大规模营建 · 后续修缮",
  "year": 1875,
  "yearLabel": "清末 · 1875起营建",
  "yearApprox": true,
  "yearNote": "1875为石家大院宅第大规模营建起点，所绘内院门楼的独立构件制作年未确认，不把该排序点称作门楼精确竣工年。",
  "place": "天津西青 · 杨柳青镇",
  "placeKey": "yangliuqing",
  "lede": "灰砖门楼沿着套院轴线逐重退远，暗红木框与浅色抱鼓石收住入口。这里选择内院门楼与纵深门院，不把另一处外部门楼的石狮与檐饰拼进同一图版。",
  "facts": [
    "现存石家大院为尊美堂宅第，大规模营建始于清光绪初年（1875）；后世保护修缮另有年代。",
    "图版依据内院门楼实拍，保留浅瓦顶、灰砖门墩、两侧短墙、抱鼓石与后方套院门。",
    "灰砖灰瓦、近黑红褐门框、暗红嵌板与少量赭金边线按现貌区分，不绘整宅鸟瞰或混接外部门楼。"
  ],
  "tall": true,
  "legacyNames": [
    "石家大院",
    "尊美堂",
    "杨柳青石家大院"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "石家大院 · 内院门楼与纵深门院",
    "清末 · 1875为宅第大规模营建起点"
  ]
}
);

// Northeast: only reference-backed paired plates that passed structural review.
SITES.push(
{
  "id": "ln_dazheng",
  "name": "沈阳故宫大政殿",
  "short": "大政殿",
  "sub": "八角重檐攒尖殿",
  "dyn": "ming",
  "tag": "清初",
  "era": "清初现存主体",
  "year": 1625,
  "yearApprox": true,
  "yearLabel": "清初",
  "yearNote": "1625为清初营建的约略排序点，不把故宫建筑群整体营建区间当作单殿精确竣工年。",
  "place": "辽宁沈阳 · 沈阳故宫",
  "placeKey": "shenyang",
  "types": [
    "hall"
  ],
  "lede": "八角大政殿以重檐攒尖顶收成尖点，正面盘龙柱却把观看引回到檐下。它没有一般大殿那样的长方形外观，八面门扇环绕木架，须弥座又抬高了整座殿堂。建筑在后金迁都沈阳时始建，是故宫东路的重要早期遗存；与十王亭相望的格局，将八旗政治和多种装饰传统带进宫廷空间。",
  "facts": [
    "八角平面上叠起两层檐，攒尖屋顶汇向中央，殿身各面以门扇围合。檐下盘龙柱、斗拱与柱头装饰彼此衔接，须弥座则使轻巧木架获得庄重的基底。",
    "大政殿始建于后金天命十年，属于努尔哈赤迁都沈阳后的早期营建。故宫随后仍不断扩建，清代宫殿群的完整格局不能统称为这一年一次建成。",
    "大政殿与十王亭的组织回应八旗制度，装饰又呈现多种文化传统。近年修缮通过史料恢复栱眼壁火焰宝珠纹，使建筑细节也成为理解清初宫廷的线索。"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "caption": [
    "沈阳故宫 · 大政殿",
    "清初 · 八角重檐攒尖"
  ],
  "tall": false
},
{
  "id": "ln_liaoyang",
  "name": "辽阳白塔",
  "short": "辽阳白塔",
  "sub": "八角十三层密檐砖塔",
  "dyn": "liao",
  "tag": "辽",
  "era": "辽代 · 建年未详",
  "year": 1100,
  "yearApprox": true,
  "yearLabel": "辽代",
  "yearNote": "1100仅为辽代传统断代的排序定位，非确切建年；不以初创传说或辽金异说强定竣工年份。",
  "place": "辽宁辽阳 · 白塔公园",
  "placeKey": "liaoyang",
  "types": [
    "pagoda"
  ],
  "lede": "白色塔壁上，佛龛、飞天与仿木斗拱在第一层最为舒展，往上则是十三道越来越紧的塔檐。辽阳白塔的八角体量由高基座托起，砖石实体保留了木楼的形象，也在城中留下鲜明轮廓。现存塔的形制与砖雕支持辽代断代，具体始建年份仍有讨论；历次修护也刻进了塔的历史。",
  "facts": [
    "八角塔身立于石台与砖砌须弥座上，第一层各面设佛龛和胁侍、飞天雕饰。砖雕斗拱承托首层出檐，上部密檐逐级收缩，将复杂下层与简洁上部连成一体。",
    "建塔年代曾有多种说法，文物部门依据形制、砖材与雕刻归为辽代中晚期。明代重修铜牌还记下元代维修信息，但不能据此推出一个无争议的始建年份。",
    "佛龛、莲瓣与仿木斗拱把宗教图像和建筑形式编在同一座砖塔上。白灰表面形成醒目的城景，细看其下的构件，又能读到东北辽塔共有的艺术语言。"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "caption": [
    "辽阳白塔 · 八角十三层密檐",
    "辽代 · 塔身佛教浮雕"
  ],
  "tall": true
},
{
  "id": "ln_chongxing",
  "name": "崇兴寺双塔",
  "short": "崇兴寺双塔",
  "sub": "西塔与东塔 · 各十三层密檐",
  "dyn": "liao",
  "tag": "辽",
  "era": "辽代晚期 · 约略定位",
  "year": 1100,
  "yearApprox": true,
  "yearLabel": "辽代晚期",
  "yearNote": "1100为辽晚期的约略排序点；文保资料推测道宗至天祚帝时期，不表示确定建于1100年。",
  "place": "辽宁北镇 · 崇兴寺",
  "placeKey": "beizhen",
  "types": [
    "pagoda"
  ],
  "lede": "两座八角砖塔东西并立，近似的十三层密檐让人先看到对称，再发现各自砖雕与修补的差别。崇兴寺双塔以高塔身承接渐密的檐层，佛龛、飞天与力士布满下部；后方寺院的名称后来也成为塔名。现存形制归入辽代晚期，确年待考，元明清修护则留下了可辨认的后世层次。",
  "facts": [
    "双塔均为八角十三层实心密檐式砖塔，东西相对而高度略有不同。基座有莲瓣与负重力士，塔身各面设佛龛、胁侍及飞天，首层檐下又以砖雕模仿木构斗拱。",
    "营建年代缺少明确记载，文物部门从结构、砖雕与装饰判断为辽代晚期。塔后崇兴寺另有明清历史，塔上的重修题记也不能当作两塔的初建纪年。",
    "元明以来维修曾更换部分造像，清代又加固塔基，今日双塔因而包含长期修护的痕迹。两座塔并读，既能看出相近的建筑规制，也能辨认不同的保存经历。"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "caption": [
    "崇兴寺 · 辽代双塔",
    "西塔与东塔 · 各十三层密檐"
  ],
  "tall": false
},
{
  "id": "jl_nongan",
  "name": "农安辽塔",
  "short": "农安辽塔",
  "sub": "八角十三层密檐塔",
  "dyn": "liao",
  "tag": "辽",
  "era": "辽代 · 约10—11世纪",
  "year": 1000,
  "yearApprox": true,
  "yearLabel": "辽代",
  "yearNote": "1000仅为排序点。吉林地方志资料给出983—1030年区间；不把有年号混用问题的1023年说作为确切建年。",
  "place": "吉林农安 · 黄龙府故城",
  "placeKey": "nongan",
  "types": [
    "pagoda"
  ],
  "lede": "灰砖塔身上，十三层密檐紧紧叠起，向上收分的轮廓仍标识着黄龙府故城的历史。农安辽塔以八角实心塔体和檐部仿木细节形成自己的节奏，不靠满壁造像取胜。地方志采用九八三至一〇三〇年的营建区间，现貌又经历现代维修；远看的古塔形制与近看的修缮痕迹，需要一并理解。",
  "facts": [
    "辽塔为八角十三层密檐实心砖塔，檐部使用砖作斗栱与各式瓦件，塔角悬铃；塔身和密集檐带逐级收分，与可逐层进入的楼阁式塔在结构上有别。",
    "吉林地方志记营建于九八三至一〇三〇年间，未提供单一确年；主体可按辽代范围理解，现代又曾拨款修复，现貌不能全部归作辽代原材。",
    "塔位于旧黄龙府城附近，成为辨识地方历史的遗存；看塔身、出檐与塔顶的连续比例，可以理解辽代密檐塔的体量，而不必把它套成另一座辽塔的装饰样式。"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "caption": [
    "农安辽塔 · 八角十三层密檐",
    "辽代遗存 · 现貌历经现代修缮"
  ],
  "tall": true
},
{
  "id": "jl_jiangjunfen",
  "name": "集安将军坟",
  "short": "将军坟",
  "sub": "七级方坛阶梯石室墓",
  "dyn": "goguryeo",
  "tag": "高句丽",
  "era": "约5世纪",
  "year": 450,
  "yearApprox": true,
  "yearLabel": "约5世纪",
  "yearNote": "450为约5世纪石室墓遗存的排序定位，非精确建年；不将墓主相传认定作为确定事实。",
  "place": "吉林集安 · 龙山南麓",
  "placeKey": "jian_jilin",
  "types": [
    "tomb"
  ],
  "lede": "七级石阶坛从宽阔方基逐层升起，巨石接缝让将军坟的重量与秩序同时显现。墓室藏在阶坛上部，外缘精加工花岗岩与内部填石共同支撑这座高句丽石室墓。它约属五世纪遗存，墓主身份仍有不同认定；比起直接冠以某位君王之名，更值得看的是阶坛与墓室的营造关系。",
  "facts": [
    "墓体为七级方坛阶梯石室墓，精琢花岗岩砌筑外缘、内部填河卵石；上部石室设两座棺床，大石板覆盖墓室，阶坛级数与砌石排数须分开辨认。",
    "吉林地方志把将军坟断在五世纪初，其年代可按约五世纪的范围理解；墓主存在不同认定，不能把长寿王陵之说当成已经由墓内题记证实的事实。",
    "方坛、墓室与巨型盖石展示高句丽积石墓营造的发展，墓顶发现瓦片和建筑构件又提示曾有地上建筑；今天所见石墓并非古代全部设施的完整外观。"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "caption": [
    "集安将军坟 · 七级方坛石室墓",
    "高句丽 · 约5世纪"
  ],
  "tall": false
},
{
  "id": "jl_wenmiao",
  "name": "吉林文庙大成殿",
  "short": "吉林文庙",
  "sub": "十一开间大成殿",
  "dyn": "ming",
  "tag": "清末",
  "era": "宣统元年建成主体",
  "year": 1909,
  "yearLabel": "1909",
  "yearNote": "1909为现存主要建筑建成；1736为文庙初创，1920年代与近现代修缮另记，不混作同一年。",
  "place": "吉林吉林市 · 昌邑",
  "placeKey": "jilin",
  "types": [
    "hall"
  ],
  "lede": "十一开间的大成殿以宽阔正面展开，黄琉璃屋顶、双重飞檐与殿前石台把祭孔空间推向中轴线中心。吉林文庙的大殿不是一七三六年创庙时的旧堂，而是一九〇九年新址主要建筑完成时形成的主体。随后民国与现代的修缮继续叠加，让这座晚清礼制建筑同时保存地方教育的记忆。",
  "facts": [
    "大成殿面阔十一间，不把两侧回廊并入计数，正面立十二根柱，覆重檐黄琉璃瓦顶；殿前月台带石栏与中央云龙浮雕，突出中轴线上的礼仪等级。",
    "文庙一七三六年初创，一九〇七年易地兴建，一九〇九年完成大成殿等主要建筑；一九二〇年后又有重修，创庙、现存主体与维修应分别记录。",
    "殿宇处于三进院落的中心，是祭祀孔子的主要场所；前檐连续柱列与高敞月台把参拜者引向殿内，既表达儒家祀典，也保留吉林地方文教史的一段空间。"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "caption": [
    "吉林文庙 · 十一开间大成殿",
    "清末1909建成 · 后续修缮另记"
  ],
  "tall": false
},
{
  "id": "hlj_shideng",
  "name": "兴隆寺渤海石灯幢",
  "short": "石灯幢",
  "sub": "八角亭式石灯室",
  "dyn": "balhae",
  "tag": "渤海",
  "era": "渤海时期 · 建年未详",
  "year": 800,
  "yearApprox": true,
  "yearLabel": "渤海时期",
  "yearNote": "800仅为渤海时期石刻的排序定位，非确切制作年；现存修配构件与寺院后世建筑不一概认作渤海原件。",
  "place": "黑龙江宁安 · 渤海镇兴隆寺",
  "placeKey": "ningan",
  "types": [
    "sculpture"
  ],
  "lede": "九块玄武岩叠成一盏六米高的长明灯：八角基座，上承莲瓣覆盆，再立一根粗壮的圆柱，柱顶绽开一朵巨莲托起八角灯室，灯室上盖一顶带尖的亭式石盖。它立在渤海国上京城内的旧寺址上，是渤海时期（8至10世纪）留存至今最完整的大型石雕，形制与中原唐代石灯一脉相承。身后的兴隆寺是清康熙年间在渤海庙址上重建的，不与石灯同龄。图版只绘石灯本体。",
  "facts": [
    "<b>形制</b>：石灯幢通高约6米，由9块雕凿的玄武岩叠垒而成；自下而上为八角基座、莲瓣覆盆、圆形灯柱、仰莲座、八角形灯室与圆形尖顶盖，灯室开窗透光。整体比例匀称、体量硕壮，经千余年风雨仍大体完好。",
    "<b>断代</b>：石灯无纪年题记，因立于渤海国上京龙泉府城内的寺址，一般定为渤海时期（上京为都自755年至926年）。现存兴隆寺据《宁安县志》建于清康熙五十二年（1713），1848年部分焚毁，1861年重建；寺中大石佛、石龟趺亦为渤海遗物。",
    "<b>价值</b>：渤海国上京城仿唐长安格局，1961年列为第一批全国重点文物保护单位，石灯幢为其中的一级文物，是渤海接受中原佛教与建筑文化的直接物证。图版不绘现代围栏与寺院背景。"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "caption": [
    "兴隆寺石灯幢 · 八角亭式灯室",
    "渤海时期 · 现存石刻"
  ],
  "tall": true
},
{
  "id": "hlj_sofia",
  "name": "哈尔滨圣索菲亚教堂",
  "short": "圣索菲亚",
  "sub": "1932年现存砖砌教堂",
  "dyn": "modern",
  "tag": "近现代",
  "era": "现存砖砌主体1932年落成",
  "year": 1932,
  "yearLabel": "1932",
  "yearNote": "现存砖砌教堂于1923年开工、1932年落成；1907年早期木教堂不作为图版主体年代。",
  "place": "黑龙江哈尔滨 · 索菲亚广场",
  "placeKey": "harbin",
  "types": [
    "church"
  ],
  "lede": "一座红砖砌的拉丁十字教堂，十字交叉处四个砖垛托起外径十米的鼓座和巨大的洋葱头穹顶，正门上方是帐篷顶的钟楼，连十字架通高53.35米，是远东地区最大的东正教堂。1907年此处先建了一座随军木教堂，1912年外包砖墙；今所见砖砌主体1923年9月奠基，由俄国建筑师奥斯科尔科夫设计，仿圣彼得堡主显教堂，1932年11月落成。图版画1932年主体，不画现代售票附建。",
  "facts": [
    "<b>形制</b>：清水红砖砌筑，铁皮屋面刷绿漆；平面拉丁十字，南北宽约28米、东西长约42米，建筑面积721平方米，可容1500人。十字交叉处四砖垛承外径10米的鼓座与洋葱头穹顶，正门与两翼、后门各立一座帐篷顶尖塔，中央穹顶最高、钟楼次之。",
    "<b>断代</b>：1907年3月为俄国东西伯利亚第四步兵师所建随军木教堂，同年8月由茶商奇斯佳科夫出资扩建；1912年外包砖墙成砖木结构；1923年9月27日奠基重建，建筑师奥斯科尔科夫以科夏科夫设计的圣彼得堡主显教堂为原型，1932年11月25日竣工。",
    "<b>价值</b>：拜占庭式的集中穹顶与俄罗斯民间木建筑的洋葱头、帐篷顶合于一体，日本建筑史家西泽泰彦认为其规模与构思足与莫斯科圣瓦西里大教堂相比。1996年列为全国重点文物保护单位，1997年改作哈尔滨建筑艺术馆。"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "caption": [
    "圣索菲亚教堂 · 现存1932年主体",
    "红砖墙体 · 洋葱穹顶与钟楼"
  ],
  "tall": true
}
);

// 内蒙古、云南、贵州原型增补；逐项来源与待审状态见 assets/research/im-yn-gz-batch.json。
SITES.push(
{
  "id": "im_wuta",
  "name": "呼和浩特五塔寺",
  "short": "五塔寺",
  "sub": "慈灯寺 · 金刚座舍利宝塔",
  "dyn": "ming",
  "tag": "清",
  "era": "雍正五年至十年",
  "year": 1732,
  "yearLabel": "1727—1732",
  "yearApprox": false,
  "yearNote": "取塔的营建完成阶段1732年；1727为开建年份，复原的寺院殿堂不作为清代原构入录。",
  "place": "内蒙古呼和浩特 · 玉泉",
  "placeKey": "hohhot",
  "types": [
    "pagoda"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "lede": "一座宽阔金刚座上升起五座小塔，呼和浩特五塔寺的核心不是高塔竞相拔起，而是共同台座与塔群形成的紧密组合。金刚座舍利宝塔在一七二七至一七三二年间修建，砖石外壁刻满佛像与经文。塔后石刻又保存蒙文天文图，让佛教宇宙观与对星空的认识在寺院遗存中相遇。",
  "facts": [
    "塔由台基、金刚座与顶部五座小塔组成，中央较高、四角较低，共用砖石台座；拱门匾额以蒙、藏、汉文字题名，外壁以佛像、经文和法器雕刻铺陈。",
    "内蒙古资料记金刚座舍利宝塔于雍正五年至十年，即一七二七至一七三二年间修建；这段营建年代属于古塔，后来复原的寺院殿堂不作为同一批清代原构。",
    "这种五塔共座形式承接印度佛陀迦耶的建筑传统，又融入本地砖石雕刻；塔后照壁石刻蒙文天文图、须弥山图与轮回图，体现寺院知识与信仰的并置。"
  ],
  "caption": [
    "呼和浩特五塔寺金刚座舍利宝塔 · 线稿",
    "清 · 1727—1732"
  ],
  "legacyNames": [
    "慈灯寺",
    "呼和浩特五塔寺金刚座舍利宝塔"
  ],
  "tall": true
},
{
  "id": "im_dazhao",
  "name": "呼和浩特大召寺",
  "short": "大召",
  "sub": "无量寺 · 大雄宝殿",
  "dyn": "ming",
  "tag": "明清",
  "era": "明代创建 · 清代改修",
  "year": 1600,
  "yearLabel": "明清",
  "yearApprox": true,
  "yearNote": "1600仅作明清主体的约略排序点，不宣称大雄宝殿精确竣工年；寺院1580建成，清代扩建及改铺黄琉璃瓦分别记录。",
  "place": "内蒙古呼和浩特 · 玉泉",
  "placeKey": "hohhot",
  "types": [
    "hall"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "lede": "大召大雄宝殿位于寺院中轴线上，宽阔屋顶、层叠檐口与厚重殿身构成庄严的正面。大召也称无量寺，始建于明代，清代又有扩建与改修。眼前大殿的意义，既在于汉藏建筑形式的结合，也在于它与山门、天王殿等空间共同组成的礼佛次序，不能把寺院创立之年直接当作全部现存构件的年代。",
  "facts": [
    "大雄宝殿是寺院中轴线上的主要殿堂，前方依次安排山门、天王殿和菩提过殿；宽阔殿身与屋顶统合为一体，体现汉藏结合的建筑形式。",
    "大召始建于明万历七年，清崇德五年重修后定名无量寺；现存殿堂经过明清时期营建与改修，约十七世纪的定位不代表大殿确切竣工之年。",
    "从大殿向前回望，可读出寺院由入口逐步进入核心礼佛空间的秩序；它也是认识呼和浩特召庙文化与汉藏建筑交流的一处重要实物。"
  ],
  "caption": [
    "呼和浩特大召寺大雄宝殿 · 线稿",
    "明清 · 明清"
  ],
  "legacyNames": [
    "大召",
    "呼和浩特无量寺",
    "呼和浩特大召寺大雄宝殿"
  ]
},
{
  "id": "im_wudang",
  "name": "五当召",
  "short": "五当召",
  "sub": "广觉寺 · 苏古沁殿",
  "dyn": "ming",
  "tag": "清",
  "era": "清乾隆时期",
  "year": 1755,
  "yearLabel": "乾隆时期",
  "yearApprox": true,
  "yearNote": "苏古沁殿为清乾隆时期建筑，资料存在1755/1757说法差异，1755只作约略排序；不使用1749扩寺年强定所绘殿堂竣工。",
  "place": "内蒙古包头 · 石拐",
  "placeKey": "baotou",
  "types": [
    "hall"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "lede": "阴山沟谷里的五当召，以白墙和平顶的藏式殿堂层层顺山展开。苏古沁殿位于寺院前部，是全寺集会诵经的空间；它宽阔而沉稳的体量，与中原木殿的曲线屋面形成鲜明区别。",
  "facts": [
    "<b>所绘主体</b> 苏古沁殿，又称苏古沁独宫，不把整个寺院或2005年重建的努尼殿混为一座建筑。",
    "<b>年代</b> 寺院乾隆十四年（1749）扩建；苏古沁殿按乾隆时期约略定位，单殿营建年份资料存在差异。",
    "<b>形制</b> 藏式平顶、白色墙身、层层退台与深色檐带，1996年五当召列入全国重点文物保护单位。"
  ],
  "caption": [
    "五当召苏古沁殿 · 线稿",
    "清 · 乾隆时期"
  ],
  "legacyNames": [
    "广觉寺",
    "苏古沁殿",
    "五当召苏古沁独宫"
  ]
},
{
  "id": "yn_jindian",
  "name": "昆明金殿",
  "short": "金殿",
  "sub": "太和宫 · 铜殿",
  "dyn": "ming",
  "tag": "清",
  "era": "康熙十年重铸",
  "year": 1671,
  "yearLabel": "1671",
  "yearApprox": false,
  "yearNote": "所绘现存铜殿为1671年吴三桂重建；1602年初建铜殿及其迁移沿革另记，不误用武当山金殿参考。",
  "place": "云南昆明 · 鸣凤山",
  "placeKey": "kunming",
  "types": [
    "hall"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "屋面、柱梁和门窗看似木殿，走近却能发现它们由铜铸成。昆明鸣凤山太和宫的金殿以金属重现传统殿宇的细部，石台托起深暗的铜色，双重檐口又让小殿显得庄重。眼前铜殿为清康熙十年吴三桂重建，明代初建铜殿另有迁移历史，不能将两次营造合成一座从未改变的建筑。",
  "facts": [
    "铜铸柱梁、斗拱、格扇与瓦屋面组合成仿木结构殿堂，双重屋檐立在石台上。材料虽换成金属，构件关系仍沿用木构语汇，细部并非简单的一块铜壳。",
    "现存铜殿按清康熙十年，即一六七一年吴三桂重建定位，梁上铸有对应纪年。明万历三十年初建的铜殿后来迁走，不能把其创建时间用作眼前铜殿的年份。",
    "金殿是道教太和宫的一部分，也保存了铜铸工艺与殿宇形制结合的实例。它与武当山金殿有历史上的仿建联系，但两地现存建筑的形制、材料处理和沿革应分别理解。"
  ],
  "caption": [
    "昆明太和宫现存铜金殿 · 线稿",
    "清 · 1671"
  ],
  "legacyNames": [
    "昆明太和宫金殿",
    "昆明铜金殿"
  ]
},
{
  "id": "yn_jianshui",
  "name": "建水文庙",
  "short": "建水文庙",
  "sub": "先师殿 · 大成殿",
  "dyn": "ming",
  "tag": "明",
  "era": "明弘治年间",
  "year": 1495,
  "yearLabel": "弘治年间",
  "yearApprox": true,
  "yearNote": "1495仅为弘治年间1488—1505的约略排序，按所绘先师殿断代，不以文庙1285始建年代代替。",
  "place": "云南建水 · 临安古城",
  "placeKey": "jianshui",
  "types": [
    "hall"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "大成门之后，先师殿立在文庙中轴线后部的高台上，一片舒展的单檐歇山屋面覆盖五间正面。青石外柱与雕花格扇使这座祭孔正殿显出建水的工艺细节，石与木并非彼此分离。文庙虽初建于元代，眼前主殿则按明弘治年间断代，沿轴线行走，可以分清整庙沿革与一座殿堂的历史。",
  "facts": [
    "先师殿即大成殿，面阔五间，单檐歇山屋面下由石柱与木架共同承托。外檐柱和格扇雕饰细密，柱材、门扇与梁架之间的差别值得靠近辨认。",
    "文庙初建于元至元二十二年，先师殿则归于明弘治年间的营建。殿堂确切竣工年尚不能确定，整庙初创与主殿后来的建造属于不同阶段，应沿轴线分别阅读。",
    "先师殿是祭祀孔子的正殿，位居后部高台以突出礼仪中心。青石柱、雕花木门与彩绘共同呈现地方工艺，说明儒学礼制建筑也会在各地形成不同的细部表达。"
  ],
  "caption": [
    "建水文庙先师殿 · 线稿",
    "明 · 弘治年间"
  ],
  "legacyNames": [
    "建水先师殿",
    "建水文庙先师殿"
  ]
},
{
  "id": "yn_jingzhen",
  "name": "景真八角亭",
  "short": "八角亭",
  "sub": "傣族南传佛寺 · 戒堂",
  "dyn": "ming",
  "tag": "清",
  "era": "康熙四十年",
  "year": 1701,
  "yearLabel": "1701",
  "yearApprox": false,
  "yearNote": "1701为八角亭创建年；1978、1993等后世修缮另记，已毁景真寺其余建筑不虚构入画。",
  "place": "云南勐海 · 景真",
  "placeKey": "menghai",
  "types": [
    "pavilion"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "层层屋面朝八个方向展开，又向尖顶收拢，景真八角亭以砖砌亭身和木构屋顶形成轻巧的轮廓。名字像一座游园小亭，它的实际用途却是南传佛寺的戒堂，用于僧团的宗教仪式。建于清康熙四十年的建筑经历近现代修缮，装饰和构件包含延续与修复，不能把今天每一处细节都看成初建原件。",
  "facts": [
    "砖砌亭身上架木构屋面，檐口沿八个方向层叠上升，至顶端集中收束。墙面与屋檐的装饰共同围绕中心组织，使体量不大的建筑呈现丰富的层次。",
    "八角亭创建于清康熙四十年，即一七〇一年，后来多次修缮。初建年代与修复工作应分开叙述，现存构件的保存与更替不等于整座建筑在近现代重新创建。",
    "它在傣族南传佛寺中承担授戒、布萨等僧团仪式，不是主要供游人赏景的亭子。将宗教用途与八向屋面一起理解，才能看出地方佛寺建筑的空间特点。"
  ],
  "caption": [
    "景真八角亭现存戒堂 · 线稿",
    "清 · 1701"
  ],
  "legacyNames": [
    "景真寺八角亭",
    "景真八角亭戒堂"
  ],
  "tall": true
},
{
  "id": "gz_jiaxiu",
  "name": "贵阳甲秀楼",
  "short": "甲秀楼",
  "sub": "南明河 · 三层三檐",
  "dyn": "ming",
  "tag": "清",
  "era": "宣统元年重建 · 后世修缮",
  "year": 1909,
  "yearLabel": "1909",
  "yearApprox": false,
  "yearNote": "现貌按1909重修式样，并经1981等后世修缮；明代创建年代不替代现存楼体形制年代。",
  "place": "贵州贵阳 · 南明河",
  "placeKey": "guiyang",
  "types": [
    "pavilion"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "甲秀楼立在南明河中的石基上，三层楼身配三道屋檐，四角攒尖顶在河面上形成醒目的轮廓。浮玉桥把它与两岸相连，楼、桥和水面共同构成贵阳城南的景观。它始创于明代，历经损毁与重建；今日形制以清宣统元年重修为基础，又在二十世纪修复，既保留旧楼的格局，也记录了城市延续地标的努力。",
  "facts": [
    "楼身为三层三檐四角攒尖顶，红棂雕窗、托檐石柱与石栏相互映衬；建筑以河中鳌矶石为基，浮玉桥将独立楼阁接入两岸的步行空间。",
    "甲秀楼始创于明万历年间，历代屡毁屡修；现状依一九〇九年重修式样，于一九八一年再次修复，不能把今日全部材料都认作明代原物。",
    "甲秀之名寄托科甲挺秀、人才辈出的愿望，历来吸引题咏；楼阁与河流、桥梁的结合，使地方文教理想成为贵阳城中可亲近的历史景观。"
  ],
  "caption": [
    "贵阳甲秀楼现存楼体 · 线稿",
    "清 · 1909"
  ],
  "legacyNames": [
    "甲秀楼"
  ]
},
{
  "id": "gz_wenchang",
  "name": "贵阳文昌阁",
  "short": "文昌阁",
  "sub": "旧城东 · 三层三檐",
  "dyn": "ming",
  "tag": "清",
  "era": "康熙八年重建",
  "year": 1669,
  "yearLabel": "1669",
  "yearApprox": false,
  "yearNote": "1609为初建；按贵阳市官方资料1669重建及后续修缮所成的现存阁体定位，不以初创年份代替现存主体。",
  "place": "贵州贵阳 · 文昌街",
  "placeKey": "guiyang",
  "types": [
    "pavilion"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "九角屋面在三重檐之间反复舒展，贵阳文昌阁的轮廓有别于常见四面楼阁，也有别于身旁的城防建筑。它最初供奉文昌帝君，一六〇九年初建，一六六九年重建成为今日断代的主要依据。清代此后仍屡有维修扩充，三层阁体既保留旧城东部地景，也见证文教信仰怎样进入城市空间。",
  "facts": [
    "文昌阁为三层三檐、九角屋面的楼阁，屋檐在多个转角上反复起伏，层叠楼身与罕见平面共同形成识别特征；附近城楼并非这座阁体的一部分。",
    "贵阳市官方资料记一六〇九年初建、一六六九年重建，雍正、乾隆、嘉庆、道光时期又有修葺与扩建；现存主体按重建阶段理解，不把初创年当成全部构件年代。",
    "阁内原供奉文昌帝君，体现与科举和文教相连的城市信仰；九角屋面的地方特色与旧城墙、城门环境相互映照，使它成为理解贵阳旧城格局的一处遗存。"
  ],
  "caption": [
    "贵阳文昌阁现存阁体 · 线稿",
    "清 · 1669"
  ],
  "legacyNames": [
    "贵阳九角文昌阁"
  ]
}
);

SITES.push(
{
  "id": "fj_zhenguo",
  "name": "泉州开元寺镇国塔",
  "short": "镇国塔",
  "sub": "东塔 · 八角五层石塔",
  "dyn": "song",
  "tag": "南宋",
  "era": "嘉熙二年至淳祐十年",
  "year": 1250,
  "yearLabel": "1238—1250",
  "yearApprox": false,
  "yearNote": "年份取现存花岗岩石塔的竣工年1250；865年为木塔始建，1227年砖塔不等于现存五层石塔。",
  "place": "福建泉州 · 开元寺东塔院",
  "placeKey": "quanzhou",
  "types": [
    "pagoda"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "中国现存最高的一对宋代石塔里的东塔，通高48.27米。花岗岩在这里完全照着木楼阁来做：每面塔壁都刻出立柱、额枋和斗拱，每层绕一圈带石栏的檐廊，每个柱头一组、柱间两组斗拱，层层如此。塔心是一根直径约四米、从底直通塔顶的八角花岗岩柱，外圈两米厚的筒状塔体靠横梁和楼板与它拉结——万历三十二年（1604）泉州大地震，它靠这套结构站住了。",
  "facts": [
    "<b>形制</b>：五层八角仿楼阁式石塔，通高48.27米，底层面积255平方米；八角塔心柱直径约4米贯通上下，外筒厚约2米，每层以横梁、斗拱、楼板横向拉接，塔室可登临；一层四面开门，二层起门龛逐层错位，外壁每层雕佛像16尊，五层共80尊。",
    "<b>断代</b>：唐咸通六年（865）初建为五级木塔，南宋宝庆三年（1227）改七级砖塔，今石塔为嘉熙二年至淳祐十年（1238—1250）所建；1604年泉州八级地震及数百年台风均未使其倾倒。年份取现存石塔竣工之1250。",
    "<b>比较</b>：与西塔同为东西塔院格局的遗存，这种做法14世纪后已少见；东塔每层柱头一组、柱间两组斗拱，西塔三至五层补间仅一组。外壁80尊像自下而上为天神、罗汉、高僧、菩萨、佛，须弥座40幅雕刻中37幅为佛经故事。"
  ],
  "caption": [
    "泉州开元寺镇国塔（东塔）整塔 · 线稿",
    "南宋 · 1238—1250"
  ],
  "legacyNames": [
    "泉州开元寺镇国塔",
    "镇国塔"
  ],
  "tall": true
},
{
  "id": "fj_renshou",
  "name": "泉州开元寺仁寿塔",
  "short": "仁寿塔",
  "sub": "西塔 · 八角五层石塔",
  "dyn": "song",
  "tag": "南宋",
  "era": "绍定元年至嘉熙元年",
  "year": 1237,
  "yearLabel": "1228—1237",
  "yearApprox": false,
  "yearNote": "现存石塔在1228—1237年营建，取竣工1237年；五代木塔为前身，不作为现存构筑物年份。",
  "place": "福建泉州 · 开元寺西塔院",
  "placeKey": "quanzhou",
  "types": [
    "pagoda"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "西塔比东塔早十余年完成，也略矮——45.06米，绍定元年至嘉熙元年（1228—1237）由砖塔改建为石塔。两塔的形制与做法几乎相同，细看却有三处不同：西塔三、四、五层每间只用一组补间斗拱；外壁八十尊像不按修行等级排列，而是一视同仁的佛教人物；须弥座刻的是花卉走兽而非佛经故事。第四层还刻着一尊印度式的男身观音和一位腰系《孔雀王咒》的猴行者。",
  "facts": [
    "<b>形制</b>：五层八角仿楼阁式花岗岩石塔，通高45.06米，底层面积270平方米；造型与工艺做法与东塔相同，塔心柱贯通、外筒分层拉结，每层外绕檐廊、护以石栏，外壁每层雕16尊、共80尊石刻造像。",
    "<b>断代</b>：五代梁贞明二年（916）初建为七级木塔，名无量寿塔；南宋淳熙年间改砖塔并易今名；现存石塔为绍定元年至嘉熙元年（1228—1237）所建，比东塔早动工十年、早完工十三年。年份取石塔竣工之1237。",
    "<b>异同</b>：与东塔相比，西塔三至五层补间铺作仅一组斗拱；80尊造像为众生佛性平等的佛教人物而非五级阶次；须弥座石刻为花兽图案。第四层的印度式男性观音与腰系《孔雀王咒》的猴行者，是外来宗教图像落地泉州的例子。"
  ],
  "caption": [
    "泉州开元寺仁寿塔（西塔）整塔 · 线稿",
    "南宋 · 1228—1237"
  ],
  "legacyNames": [
    "泉州开元寺仁寿塔",
    "仁寿塔"
  ],
  "tall": true
},
{
  "id": "fj_chongwu",
  "name": "崇武古城南门",
  "short": "崇武南门",
  "sub": "花岗岩城台 · 南门段城墙",
  "dyn": "ming",
  "tag": "明",
  "era": "洪武二十年筑城，后世修缮",
  "year": 1387,
  "yearLabel": "始建1387 · 历代修缮",
  "yearApprox": true,
  "yearNote": "1387为崇武石城始建时间及时间轴约略定位，现存南门段经历后世修缮，照片所见上部门楼不标为1387年原构。",
  "place": "福建泉州 · 惠安崇武",
  "placeKey": "huian_chongwu",
  "types": [
    "wall",
    "gate"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "中国现存最完整的花岗石滨海石城。洪武二十年（1387）江夏侯周德兴奉命在惠安海角筑崇武千户所城防倭，城周两千五百余米，墙高七米，四面开门而东西二门加筑月城。图版所绘是南门一段：低矮厚重的花岗岩城台，券门开在正中；上面的门楼是1980年代按原貌全面维修后的样子，不能当作明初原物。",
  "facts": [
    "<b>尺度</b>：城墙全用花岗石垒砌，周长2567米，南北约500米、东西约300米，基宽5米、墙高7米；原设窝铺26座、城堞1304个、箭窗1300个，城上有二至三层跑马道。南门城台与券门是其中一段。",
    "<b>沿革</b>：洪武二十年（1387）始筑，二十七年建成；嘉靖三十七年（1558）倭寇围攻六昼夜城陷，隆庆元年（1567）戚继光在此屯兵整饬城防；明永乐至清道光间五次大修，1983—1987年国家文物局分三期拨款，按原貌复城墙2517米。",
    "<b>比较</b>：崇武是明初福建沿海卫所体系中的千户所城，因石材就地取自惠安花岗岩而整体留存至今；半平方公里的城内还保留二十余座寺庵、几十座宗祠和两百多座古厝，是认识闽南军事城堡社会结构的实例。"
  ],
  "caption": [
    "崇武古城南门及相邻短段城墙 · 线稿",
    "明 · 始建1387 · 历代修缮"
  ],
  "legacyNames": [
    "崇武古城南门",
    "崇武南门"
  ]
},
{
  "id": "fj_chengqi",
  "name": "永定承启楼",
  "short": "承启楼",
  "sub": "高北土楼群 · 圆形夯土民居",
  "dyn": "ming",
  "tag": "清",
  "era": "康熙四十八年建成",
  "year": 1709,
  "yearLabel": "1709",
  "yearApprox": false,
  "yearNote": "取承启楼建成1709年；明代开建与清代落成分别叙述，图版为现存外观，不依据邮票重构内部。",
  "place": "福建龙岩 · 永定高北村",
  "placeKey": "yongding_gaobei",
  "types": [
    "residence"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "south",
  "lede": "“高四层，楼四圈，上上下下四百间；圆中圆，圈套圈，历经沧桑三百年。”顺口溜说的就是承启楼：直径七十三米的圆楼里套着三圈环楼和一座祖堂，外环四层、每层七十二间，二环两层、三环一层，一层层向内递低。江氏一族据传在崇祯年间动土，到康熙四十八年（1709）才建成，鼎盛时住过六百多人。图版只画它完整的外观，不做剖切。",
  "facts": [
    "<b>形制</b>：四环同心圆土楼，直径73米，占地5376.17平方米；外环四层高16.4米，每层72间；二环两层，每层40间；三环单层32间；中心为祖堂，全楼四百余间，设3座大门、2口水井。夯土外墙底厚1.5米、顶厚1米，屋檐外挑近4米。",
    "<b>断代</b>：据传明崇祯年间破土奠基，至清康熙四十八年（1709）竣工，历三代人、约半个世纪。鼎盛时楼内住过六百余人，今仍有江姓三百余人居住；1986年中国民居系列邮票中的福建民居图案即取自此楼。",
    "<b>比较</b>：高北土楼群以承启楼为核心，另有五云楼、世泽楼、侨福楼，是永定江氏的聚居地；承启楼以体量与环数居现存圆楼前列，有“土楼王”之称。2008年高北土楼群作为“福建土楼”六群四楼的一部分列入世界遗产。"
  ],
  "caption": [
    "永定承启楼完整外观 · 线稿",
    "清 · 1709"
  ],
  "legacyNames": [
    "永定承启楼",
    "承启楼",
    "永定土楼王"
  ]
},
{
  "id": "sd_simen",
  "name": "济南神通寺四门塔",
  "short": "四门塔",
  "sub": "隋代单层石塔 · 四面券门",
  "dyn": "sui",
  "tag": "隋",
  "era": "大业七年",
  "year": 611,
  "yearLabel": "611",
  "yearApprox": false,
  "yearNote": "取石塔内部题记“大业七年造”对应611年，不把塔内东魏544年佛像题记等同塔体年代。",
  "place": "山东济南 · 柳埠神通寺",
  "placeKey": "jinan_liubu",
  "types": [
    "pagoda"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "lede": "四门塔把四个方向都变成入口：方形石室的每一面开着券门，中央石柱面向四方安置佛像，屋顶则以石块层层收拢。塔顶内部的大业七年题记，将塔体定位在隋代，而室内东魏造像比塔更早。这座单层石塔的可贵，在于留下了石材承重、佛像安置与礼拜空间相互配合的早期建筑实例。",
  "facts": [
    "形制：石塔平面方正，四面各开一道券门，中央塔心柱与四尊佛像对应。石梁和厚实墙体承托顶盖，屋面逐层收拢，构成单层亭阁式的完整体量。",
    "断代：塔顶内部的大业七年造题记对应六一一年，是塔体断代的重要依据。塔内造像另有东魏武定二年题记，早于隋塔，造像年代与建筑年代须分别理解。",
    "价值：四向开门使礼拜围绕中央佛像展开，石梁与石砌顶又保留了早期营造方法。它让空间、结构和信仰在同一座小型建筑里交汇，提供研究隋代佛塔的实物。"
  ],
  "caption": [
    "济南神通寺四门塔整塔 · 线稿",
    "隋 · 611"
  ],
  "legacyNames": [
    "济南神通寺四门塔",
    "四门塔"
  ]
},
{
  "id": "sd_longhu",
  "name": "济南神通寺龙虎塔",
  "short": "龙虎塔",
  "sub": "唐代雕刻塔身 · 后世补建塔顶",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐代塔身，塔顶后世修补",
  "year": 800,
  "yearLabel": "唐代 · 年代未确",
  "yearApprox": true,
  "yearNote": "塔基与雕刻塔身按形制归于唐代，始建确年无考；800只作唐代时间轴约略定位，砖砌塔顶属后世补建，不能称整塔同年原构。",
  "place": "山东济南 · 柳埠神通寺",
  "placeKey": "jinan_liubu",
  "types": [
    "pagoda"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "lede": "龙虎塔的石壁像一卷向四面展开的雕刻：龙、虎、飞天和护法围着门洞排列，厚重塔基托起密集图像。塔身通常按营造与雕刻风格归入唐代，确切建年尚不清楚；上方的砖砌塔顶又是后世补建。观察石身与砖顶的接合，比把全塔归成一个年份，更能理解这座佛塔如何经历修护而存续。",
  "facts": [
    "形制：方形石室的四面开门，下承层叠须弥座，门周布满龙、虎及佛教人物雕刻。石塔身上接砖砌仿木塔顶，材质与构造的变化使上下两部分清楚可辨。",
    "断代：塔基与雕刻塔身通常归于唐代，尚无可靠的确切建年。砖砌顶属后世补建，年表上的约略定位不能视为全塔完工日期，石身与塔顶需要分别断代。",
    "价值：浮雕把护法、飞天等图像嵌入塔门和塔壁，显示佛教雕刻与建筑的结合。唐代石身与后补砖顶并置，也使修护留下的层次成为理解古塔历史的线索。"
  ],
  "caption": [
    "济南神通寺龙虎塔整塔 · 线稿",
    "唐 · 唐代 · 年代未确"
  ],
  "legacyNames": [
    "济南神通寺龙虎塔",
    "龙虎塔"
  ],
  "tall": true
},
{
  "id": "sd_mengmiao",
  "name": "邹城孟庙亚圣殿",
  "short": "孟庙亚圣殿",
  "sub": "七间重檐歇山 · 绿琉璃瓦",
  "dyn": "ming",
  "tag": "清",
  "era": "康熙十二年重建，后世修缮",
  "year": 1673,
  "yearLabel": "1673重建 · 后世修缮",
  "yearApprox": false,
  "yearNote": "以1668年震损后五年重建的1673年为现存殿堂定位，1736年全面维修及现代整修另述；不是北宋初创殿堂原构。",
  "place": "山东济宁 · 邹城孟庙",
  "placeKey": "zoucheng",
  "types": [
    "hall"
  ],
  "initialStatus": "unvisited",
  "country": "CN",
  "timelineLane": "north",
  "lede": "亚圣殿的七间殿身被两重绿琉璃瓦檐包围，宽阔屋面把祭祀孟子的主殿从周围建筑中凸显出来。它延续孟庙的礼制位置，却不是北宋创建时留下的原殿：一六六八年地震毁损后重建，清代和现代又继续维修。殿堂的体量、屋顶等级与孟子的亚圣身份相互对应，呈现儒家祭祀落实为空间的方式。",
  "facts": [
    "形制：大殿面阔七间，重檐歇山顶覆绿琉璃瓦，檐下柱列围合宽阔殿身。它与单檐的附属殿堂形成层级差异，主殿的体量和屋顶共同标明祭祀中心。",
    "断代：一六六八年地震毁损亚圣殿，五年后重建，取一六七三年作现存殿堂定位。乾隆元年孟庙全面维修，此后仍有整修，不能把今日建筑当作北宋初创原物。",
    "价值：屋顶形式、瓦色和开间尺度把孟子的礼遇等级转化为建筑秩序。主殿与周围不同规格建筑的关系，提供观察儒家圣贤祭祀和传统等级营造的具体实例。"
  ],
  "caption": [
    "邹城孟庙亚圣殿整殿 · 线稿",
    "清 · 1673重建 · 后世修缮"
  ],
  "legacyNames": [
    "邹城孟庙亚圣殿",
    "孟庙亚圣殿"
  ]
}
);

SITES.push(
{
  "initialStatus": "unvisited",
  "id": "sn_xingjiao",
  "types": [
    "pagoda"
  ],
  "name": "兴教寺玄奘塔",
  "short": "玄奘塔",
  "sub": "方形五层砖塔 · 玄奘舍利塔",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐总章二年",
  "year": 669,
  "yearLabel": "669",
  "yearNote": "669取玄奘塔营建年；兴教寺另两座弟子塔各有沿革，图版不把三塔作为同年主体。",
  "place": "陕西西安 · 长安兴教寺",
  "placeKey": "sn_changan_xingjiao",
  "country": "CN",
  "lede": "砖砌塔壁却有柱额和斗拱，兴教寺玄奘塔把木楼的骨架留在了坚实的砖石中。这座方形五层塔是玄奘的舍利塔，建于唐总章二年，逐层收束的轮廓与简洁墙面值得近看。中央高塔所纪念的是取经与译经的僧人，左右弟子塔各有自己的营建历史。",
  "facts": [
    "方形塔身共五层，檐下砖砌柱额和斗拱模仿木构楼阁。由下而上收减的墙面与向外挑出的砖檐交替，使承重实体也呈现出层层架起的节奏。",
    "玄奘圆寂后先葬白鹿原，唐总章二年迁葬少陵原畔并营建舍利塔。这一纪年属于中央玄奘塔，旁边两座弟子塔的沿革不能一并归入这次营建。",
    "这里的塔承担纪念高僧和安放舍利的功能，与大雁塔保存经卷的缘起相互呼应。两处遗存把玄奘生前的译经事业和身后的佛教纪念连接起来。"
  ],
  "caption": [
    "兴教寺玄奘塔（中央高塔）整塔 · 线稿",
    "唐 · 669"
  ],
  "tall": true,
  "timelineLane": "north",
  "legacyNames": [
    "兴教寺玄奘塔",
    "玄奘塔"
  ]
},
{
  "initialStatus": "unvisited",
  "id": "sn_xiangji",
  "types": [
    "pagoda"
  ],
  "name": "香积寺善导塔",
  "short": "善导塔",
  "sub": "唐代方塔 · 残顶现貌",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐初营建，历代修护",
  "year": 706,
  "yearLabel": "唐代 · 营建年代有异说",
  "yearApprox": true,
  "yearNote": "文献有681营建、706修缮及706营建的不同解释；706沿故宫院刊表一作排序参考，不认定今塔全部同年原构。保留残顶，不复原原十三层。",
  "place": "陕西西安 · 长安香积寺",
  "placeKey": "sn_changan_xiangji",
  "country": "CN",
  "lede": "善导塔的残顶比完整塔刹更能让人意识到时间：方形砖身仍向上收束，原有十三层只留下十一层。它为纪念净土宗僧人善导而建，塔壁以砖模仿柱额，直棂窗与叠檐显出唐塔的简朴。建塔与修缮有六八一年和七〇六年等不同记载，今日所见则是经历历代修护的遗存。",
  "facts": [
    "方形砖塔原有十三层，现存十一层，顶端残损。墙面隐出柱与阑额，部分层次设直棂窗，叠涩砖檐逐级挑出，实体砖身仍呈现木构建筑的分段方式。",
    "地方志的沿革与大事记对六八一年、七〇六年的记述并不完全一致，研究表格亦列七〇六年。建塔与修缮的阶段仍须辨清，现存全塔不能判作同年原构。",
    "这是一座纪念善导的塔，寺院又与净土宗传统相连。与保存经卷的大雁塔相比，它更突出对高僧的追念；残损和修护也成为观察建筑持续使用的线索。"
  ],
  "caption": [
    "西安香积寺善导塔现存整塔 · 线稿",
    "唐 · 唐代 · 营建年代有异说"
  ],
  "tall": true,
  "timelineLane": "north",
  "legacyNames": [
    "香积寺善导塔",
    "善导塔"
  ]
},
{
  "initialStatus": "unvisited",
  "id": "sn_chongwen",
  "types": [
    "pagoda"
  ],
  "name": "泾阳崇文塔",
  "short": "崇文塔",
  "sub": "明代八角十三层砖塔",
  "dyn": "ming",
  "tag": "明",
  "era": "万历年间营建",
  "year": 1608,
  "yearLabel": "1591—1608",
  "yearNote": "据公开报告引用的《铁佛崇文塔寺常住田供众记》，1591始建、1608竣工；其他介绍存在不同纪年。本图按现存照片绘制，不补早期塔刹。",
  "place": "陕西咸阳 · 泾阳崇文镇",
  "placeKey": "sn_jingyang",
  "country": "CN",
  "lede": "崇文塔的十三层砖身把向上攀登的尺度拉得很长，八个方向的门龛交错布置，窄檐不断向上收束。塔在明万历年间营建，碑记所述缘起与劝学有关，而佛龛又保留宗教意味。泾阳这座高塔因此让读书的愿望与佛塔的形式相遇；现存截顶和修护痕迹也提醒人们，眼前面貌不等于早期全貌。",
  "facts": [
    "塔为八角十三层楼阁式砖塔，内部中空并设砖梯。除顶层外，门与佛龛沿八面分布，层间错位安排，叠檐和塔身逐级收束，形成细长而清晰的节奏。",
    "公开报告引用常住田碑记，记万历十九年始建、三十六年竣工，即一五九一年至一六〇八年。另有不同纪年流传，碑记提供了营建线索，现状仍包含后来修护。",
    "碑记把营建与鼓励当地学童向学相连，塔中又安排石佛龛像，文教愿望与佛教形制在此结合。理解这一双重语境，比单用高度来衡量崇文塔更有内容。"
  ],
  "caption": [
    "泾阳崇文塔现存整塔 · 线稿",
    "明 · 1591—1608"
  ],
  "tall": true,
  "timelineLane": "north",
  "legacyNames": [
    "泾阳崇文塔",
    "崇文塔"
  ]
},
{
  "initialStatus": "unvisited",
  "id": "sn_qianling",
  "types": [
    "stele",
    "tomb"
  ],
  "name": "乾陵无字碑",
  "short": "无字碑",
  "sub": "螭首石碑 · 后世题刻",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐代乾陵营建时期",
  "year": 700,
  "yearLabel": "唐代 · 立碑确年未定",
  "yearApprox": true,
  "yearNote": "立碑时间与动因存在不同解释；700仅作唐代近似排序点，非经考定立碑年。碑并非今日完全无字，宋金以后已有题刻。",
  "place": "陕西咸阳 · 乾县乾陵",
  "placeKey": "sn_qianling",
  "country": "CN",
  "lede": "无字碑如今并不无字：原本没有正文的碑面，后来被宋金以来的题刻层层占据。乾陵司马道旁，这块整石雕成的唐代碑以螭首和升龙纹显出帝陵的尺度，也留下后人阅读历史的痕迹。它为何不刻原文、究竟何年树立，仍有不同解释，空白本身不能替武则天的意图作证。",
  "facts": [
    "碑身由一块石灰岩雕成，碑首八条螭垂向两侧，侧面刻云纹与升龙。长方形石座托住高大碑身，正面的后世文字与原有雕饰属于不同层次。",
    "立碑属于唐代乾陵营建时期，确年和初无正文的原因未定。宋金以后陆续增加题刻，所以无字碑的名称描述的是最初状态，不能照字面理解现貌。",
    "后世题刻使帝陵纪念物又成为历史阅读的载体，不同字体与文字记录后来者的观看。比较最初留白与后来书写，比把无字原因化成单一传说更有意味。"
  ],
  "caption": [
    "乾陵无字碑正面及碑座 · 线稿",
    "唐 · 唐代 · 立碑确年未定"
  ],
  "tall": true,
  "timelineLane": "north",
  "legacyNames": [
    "乾陵无字碑",
    "无字碑"
  ]
},
{
  "initialStatus": "unvisited",
  "id": "sn_hancheng",
  "types": [
    "hall"
  ],
  "name": "韩城文庙大成殿",
  "short": "韩城文庙",
  "sub": "五间大殿 · 前廊木构",
  "dyn": "ming",
  "tag": "明",
  "era": "洪武年间重建，历代修护",
  "year": 1371,
  "yearLabel": "1371重建 · 后世修护",
  "yearApprox": true,
  "yearNote": "1371是文庙在元代旧址重建的记载；大成殿保留元代建筑手法，且历代修护，不能认定每个现存构件都属1371。",
  "place": "陕西渭南 · 韩城古城",
  "placeKey": "sn_hancheng",
  "country": "CN",
  "lede": "韩城文庙大成殿的前廊看似三间，殿身梁架却分为五间，宽阔檐下因此呈现开敞与细分并存的秩序。文庙在洪武年间利用元代旧址重建，这座单檐歇山大殿仍延续较早的移柱做法。与其把整座殿堂归给一个年份，不如从屋顶、廊柱和内部空间读出明代重建与历代修护的层次。",
  "facts": [
    "大成殿面阔五间，前廊为三大间，单檐歇山顶覆盖殿身与廊部。檐柱上的大额承接上部结构，前方开敞廊间与后部细分梁架构成不同的空间节奏。",
    "地方志据旧志记文庙于洪武四年在元代旧址重建，后来多次重修。现存大殿保留元代建筑手法，初次重建纪年不能等同于今天每件梁柱的制作年代。",
    "殿内部分金柱移位，使主要空间不受常规柱网平均分割。作为祭孔主殿，它把礼仪的轴线秩序与实际使用空间结合，木构细节比单看屋面更能说明营造方法。"
  ],
  "caption": [
    "韩城文庙大成殿整殿 · 线稿",
    "明 · 1371重建 · 后世修护"
  ],
  "timelineLane": "north",
  "legacyNames": [
    "韩城文庙大成殿",
    "韩城文庙"
  ]
},
{
  "initialStatus": "unvisited",
  "id": "sn_daqin",
  "types": [
    "pagoda"
  ],
  "name": "周至大秦寺塔",
  "short": "大秦寺塔",
  "sub": "宋代七层八角砖塔",
  "dyn": "song",
  "tag": "宋",
  "era": "现存塔体按宋代断代",
  "year": 1100,
  "yearLabel": "宋代 · 确年未定",
  "yearApprox": true,
  "yearNote": "第六批国保名录将现存大秦寺塔列为宋代；1100仅为宋代近似排序点。寺院或景教源流讨论不等于今塔唐代建成的证明。",
  "place": "陕西西安 · 周至楼观附近",
  "placeKey": "sn_daqin",
  "country": "CN",
  "lede": "八角七层的砖塔立在终南山北麓，层间券门上下错开，简洁檐线与略倾的塔身留下修护后的现貌。大秦寺塔的名称容易把目光引向唐代景教，但寺院源流并不能证明眼前砖塔就是唐代建筑。现存塔体沿文保资料列入宋代，营建确年未定，值得看的首先是砖塔本身的结构证据。",
  "facts": [
    "塔为八角七层楼阁式空心砖塔，转角砌出隐柱，檐下有阑额和简朴斗拱。中间各层的券门上下错置，叠涩与菱角牙子共同组织层间的檐线。",
    "文保资料将现存塔体列为宋代，建筑研究亦依据构造特征倾向宋塔，确切建年仍未确定。寺院可能更早的历史及景教关联，不能直接转作今塔纪年。",
    "砖砌柱额、斗拱和交错券门提供了比较古塔的实物线索。面对带有传奇的地名，先分辨建筑形制与文献指向，可以更清楚地理解一处遗存的不同历史层次。"
  ],
  "caption": [
    "周至大秦寺塔现存整塔 · 线稿",
    "宋 · 宋代 · 确年未定"
  ],
  "tall": true,
  "timelineLane": "north",
  "legacyNames": [
    "周至大秦寺塔",
    "大秦寺塔"
  ]
},
{
  "initialStatus": "unvisited",
  "id": "sn_yanan",
  "types": [
    "pagoda"
  ],
  "name": "延安宝塔（岭山寺塔）",
  "short": "延安宝塔",
  "sub": "八角九层砖塔 · 明代现存形制",
  "dyn": "ming",
  "tag": "明",
  "era": "唐宋沿革，明代重修",
  "year": 1500,
  "yearLabel": "明代重修 · 确年未定",
  "yearApprox": true,
  "yearNote": "国保合并名录标宋；教育资料称现存塔为明代建筑。图版与年表按现存重修形制列明代，1500仅为排序近似点，不是确认重建年。",
  "place": "陕西延安 · 宝塔山",
  "placeKey": "sn_yanan",
  "country": "CN",
  "lede": "延安宝塔的八角九层轮廓既属于古塔，也进入了近现代城市的共同记忆。高大的下层向上逐级收减，砖檐把山顶上的竖直体量分成清楚层次。岭山寺塔有唐宋沿革，今日所见则按明代重修形制理解；它不是用一个初创年便能概括的建筑，邮票上的宝塔形象又记录了后来的象征意义。",
  "facts": [
    "塔为八角九层楼阁式砖塔，高大底层托住逐层收减的上部，檐线一道道向外挑出。实心墙面与层间开口互相衬托，远处也能辨出紧凑的竖向轮廓。",
    "早期沿革涉及唐宋，国保名录列宋，教育资料则说明现存塔为明代建筑。眼前轮廓因此按明代重修形制理解，确切年份未定，不能只凭早期创建年判断现貌。",
    "宝塔山的轮廓后来多次出现在革命纪念地邮票上，古代建筑获得新的象征含义。砖塔的营造史与近现代图像传播史叠在一起，使它既是遗构，也是城市标识。"
  ],
  "caption": [
    "延安宝塔（岭山寺塔）现存整塔 · 线稿",
    "明 · 明代重修 · 确年未定"
  ],
  "tall": true,
  "timelineLane": "north",
  "legacyNames": [
    "延安宝塔（岭山寺塔）",
    "延安宝塔"
  ]
}
);

// 两广增量：图版按现存主体；新增条目默认未到访。
SITES.push(
{
  "name": "广州陈家祠",
  "short": "陈家祠",
  "sub": "头门 · 岭南陶塑与石雕",
  "place": "广东广州 · 荔湾",
  "placeKey": "gd_guangzhou",
  "types": [
    "hall",
    "gate"
  ],
  "dyn": "ming",
  "tag": "清",
  "era": "清光绪十九年",
  "year": 1893,
  "yearLabel": "1893",
  "yearNote": "1893为陈家祠落成年；图版取中央头门现状，修护后的构件不全部视为同年原作。",
  "lede": "陈家祠中央头门以灰砖墙、石柱和屋脊人物陶塑组成层次细密的入口，硬山屋面将丰富装饰汇聚在横向立面上。陈氏书院由广东各地陈氏宗族合资兴建，既用于宗族事务，也为赴广州办事和应试的族人提供住处。十九世纪末落成后的修护延续至今，入口仍是理解岭南工艺与宗族组织的起点。",
  "id": "gd_chen",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "陈家祠中央头门立面 · 线稿",
    "清 · 1893"
  ],
  "facts": [
    "中央头门以硬山屋面覆盖入口，石柱石梁与灰砖墙相接，屋脊布置陶塑，墙面和檐下另有砖雕、木雕。不同材料集中在门前，形成可逐层细看的装饰立面。",
    "陈氏书院于一八八八年筹建，楹联将主体落成记在一八九三年，部分屋脊题款又见次年工程。头门及附属装饰经历后续修护，不宜全部视为同一年原作。",
    "各地陈氏宗族共同兴建书院，为族人到省城应试、候任和办事提供居所。头门汇集岭南雕塑工艺，其公共入口也呈现宗族如何组织跨地方的支持网络。"
  ]
},
{
  "name": "经略台真武阁",
  "short": "真武阁",
  "sub": "容县木阁 · 三重檐",
  "place": "广西容县 · 经略台",
  "placeKey": "gx_rongxian",
  "types": [
    "pavilion"
  ],
  "dyn": "ming",
  "tag": "明",
  "era": "明万历年间",
  "year": 1573,
  "yearLabel": "1573",
  "yearNote": "1573取真武阁营建年代；经略台的较早历史与现存阁体分列，后世修护不等于重建整阁。",
  "lede": "真武阁的三重宽檐层层向外挑出，阁身坐在较早的经略台上，木柱和梁枋在开放的下层清楚相接。最特别的细节藏在二层：四根内柱的柱脚悬起，荷载通过穿接木构传向外侧支点。阁体建于明万历元年，台基历史与楼阁分别理解；细看承托关系，比只数屋檐更能认识这座容县木阁。",
  "id": "gx_zhenwu",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "经略台真武阁完整阁体 · 线稿",
    "明 · 1573"
  ],
  "facts": [
    "阁体以格木榫卯相接，宽檐与梁枋相互承托。二层四根内柱柱脚不落到楼板上，挑枋利用外柱作支点，把屋檐和上部荷载联系起来，形成有别于普通直落柱的构架。",
    "现存阁体营建于明万历元年一五七三年，供奉真武大帝。经略台有更早历史，不能用台基年代统领楼阁；后世修护延续木构，也不等于另造一座全新的阁。",
    "柱脚悬起并非装饰奇观，而与整组梁枋的受力关系相连。木构把宽檐、内柱和上下楼层组织成整体，为观察明代南方楼阁如何平衡出挑与承重提供具体实例。"
  ]
},
{
  "name": "合浦永安大士阁",
  "short": "大士阁",
  "sub": "前低后高 · 相连木阁",
  "place": "广西合浦 · 永安",
  "placeKey": "gx_hepu_yongan",
  "types": [
    "pavilion"
  ],
  "dyn": "ming",
  "tag": "明",
  "era": "明代 · 确年未定",
  "year": 1500,
  "yearApprox": true,
  "yearLabel": "明代",
  "yearNote": "第三批国保名单列明代；1500仅作明代近似排序点，不是经考定的营建年。图版绘前后相连阁体，外围香炉亭不属于所绘主体。",
  "lede": "大士阁由前低后高的两座木阁相连，下层敞开，上层木板围合，柱、梁与挑檐之间的关系几乎直接呈现在眼前。屋脊灰塑和檐口彩绘把神话人物与花鸟带入坚实的木构框架。建筑归于明代，清道光时又经重修，确切营建年尚未确认；供奉观音大士的历史，也留在这座永安古阁的名字中。",
  "id": "gx_dashi",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "合浦永安大士阁前阁及相连后阁 · 线稿",
    "明 · 明代"
  ],
  "facts": [
    "两座亭阁相接，下层无墙围护，上层以木板围合并设门窗。木柱立在莲花石垫上，梁枋通过榫卯相连，挑梁承托宽檐；开放的底层让内部构架易于辨认。",
    "大士阁列为明代建筑，清道光年间有重修记录，今天所见承接后世修护。具体营建年份尚待进一步考证，早期木作手法与后来的修补也须分别理解。",
    "柱础、梁架和挑檐保留较早的南方木构手法，屋脊人物灰塑与彩绘又展现地方装饰。阁中曾供奉观音大士而得名，宗教使用与结构传统在同一建筑中相互延续。"
  ]
},
{
  "name": "佛山祖庙三门",
  "short": "祖庙三门",
  "sub": "三座券门 · 陶塑花脊",
  "place": "广东佛山 · 禅城",
  "placeKey": "gd_foshan",
  "types": [
    "gate"
  ],
  "dyn": "ming",
  "tag": "明清",
  "era": "明清修建",
  "year": 1600,
  "yearApprox": true,
  "yearLabel": "明清",
  "yearNote": "1600仅是明清现存主体的近似排序点，不是三门确切建成年。祖庙北宋创建、明洪武重建与三门现状年代不能混为一谈。",
  "lede": "佛山祖庙三门以三个拱券门洞迎接入庙者，上方连续陶塑花脊将人物故事铺陈成热闹的屋顶长卷。门体的横向尺度与密集装饰相互衬托，使入口兼具礼仪界限与工艺展示的作用。祖庙从北宋创建到明清修建，三门又经过近现代维修，眼前形貌须从不同阶段的积累来理解。",
  "id": "gd_zumiao",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "佛山祖庙三门立面 · 线稿",
    "明清 · 明清"
  ],
  "facts": [
    "三门中央开三个拱券门洞，长陶塑花脊横跨屋面，檐下又有金漆木雕。坚实门墙与密集人物装饰上下相接，使入口成为层次丰富的横向立面。",
    "祖庙创建于北宋，明代重修，三门属于其明清修建与后世修护的遗存。二〇〇七至二〇一〇年修缮亦涉及三门，现状不宜只以寺庙初创年或单一年份概括。",
    "陶塑与木雕以民间故事装饰祭祀入口，体现佛山地方工艺与北帝信仰的联系。建筑既是进入神庙的门槛，也让工匠、故事与社区礼仪汇集在日常可见的位置。"
  ]
},
{
  "name": "开平瑞石楼",
  "short": "瑞石楼",
  "sub": "锦江里碉楼 · 中西合璧",
  "place": "广东开平 · 锦江里",
  "placeKey": "gd_jinjiangli",
  "types": [
    "residence",
    "pavilion"
  ],
  "dyn": "modern",
  "tag": "民国",
  "era": "1923开工 · 1925落成",
  "year": 1925,
  "yearLabel": "1925",
  "yearNote": "1925取瑞石楼落成年，非开平全部碉楼年代；国保归属“开平碉楼”，世界遗产认定另属一种制度。",
  "lede": "瑞石楼在锦江里村以方整的钢筋混凝土楼身向上升起，柱廊、圆形瞭望楼和装饰山花组成复杂的顶部轮廓。它在一九二三至一九二五年间营建，将居住与防卫结合，也把香港的材料供应和西式建筑趣味带回乡村。细看灰塑里的传统吉祥题材，可以发现侨乡生活如何容纳多种建筑语言。",
  "tall": true,
  "id": "gd_ruishi",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "开平锦江里瑞石楼完整楼体 · 线稿",
    "民国 · 1925"
  ],
  "facts": [
    "瑞石楼为九层钢筋混凝土碉楼，上部设柱廊与瞭望楼，窗楣、山花带有西式装饰。方整楼身和复杂顶部既服务居住，也提供观察与防卫的位置。",
    "地方政府资料记瑞石楼在一九二三至一九二五年间营建，由在香港经营致富的黄璧秀兴建，附近工匠施工。竣工年与开工年须分开，不代表其他碉楼的年代。",
    "建楼材料经香港输入，灰塑又融入福禄喜寿等传统题材。建筑把防卫需求、海外商业联系和本地工艺结合起来，是理解开平侨乡社会的一处具体入口。"
  ]
},
{
  "name": "程阳永济桥",
  "short": "程阳桥",
  "sub": "侗族风雨桥 · 五亭木廊",
  "place": "广西三江 · 程阳",
  "placeKey": "gx_sanjiang",
  "types": [
    "bridge",
    "pavilion"
  ],
  "dyn": "modern",
  "tag": "民国",
  "era": "20世纪初营建",
  "year": 1924,
  "yearLabel": "1924竣工",
  "yearNote": "沿《三江文史资料》第七辑取1924竣工；1911倡修或1912开工不等于竣工年。桥经历后世维修，图版按实拍现状绘完整五亭全桥。",
  "lede": "程阳永济桥以连续木廊连接五座楼亭，石砌墩台托起桥面，亭子的重檐把河上的通路变成一列起伏的屋顶。两旁栏杆和长凳供行人停留，风雨桥因此兼有交通、遮雨与相聚的用途。文史资料记载一九二四年竣工，与此前倡修、开工分别计年；历经维修的全桥，也延续了侗寨共同营造的木作传统。",
  "id": "gx_chengyang",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "程阳永济桥全桥与五座楼亭 · 线稿",
    "民国 · 1924竣工"
  ],
  "facts": [
    "石砌墩台承托木质桥面，五座楼亭由瓦顶长廊连通，栏杆和长凳沿两侧设置。亭阁的重檐高出桥廊，墩台、梁架与屋顶沿河流上下分层，形成完整的跨水通道。",
    "《三江文史资料》第七辑记一九一一年倡修、一九二四年竣工，另有资料记一九一二年开工。这些年份分别指发起、施工和完成，桥上后世维修也不改变这一分期。",
    "长廊为过河者遮雨，长凳把交通空间转为休息与交往的场所。木构榫卯连接桥面和亭阁，展现侗族营造将日常通行、共同生活与屋顶形象结合的传统。"
  ]
},
{
  "name": "肇庆梅庵大雄宝殿",
  "short": "梅庵",
  "sub": "宋代木架 · 现状硬山顶",
  "place": "广东肇庆 · 端州",
  "placeKey": "gd_zhaoqing",
  "types": [
    "hall"
  ],
  "dyn": "song",
  "tag": "宋",
  "era": "北宋遗构 · 后世修护",
  "year": 1000,
  "yearApprox": true,
  "yearLabel": "北宋",
  "yearNote": "梅庵创建于996；1000仅为宋代遗构的近似排序点，不认定现存殿每一构件同年完工。大雄宝殿保留宋代木构特征，屋顶经后世修缮改为硬山，图版按现状。",
  "lede": "梅庵大雄宝殿以五间木构殿身保存宋代营造特征，屋顶却在后世由歇山改为硬山，形成早期构架与后来屋面的组合。寺院创建于北宋，但现存建筑经历多次修护，不能将所有部件归于同一个年份。走近檐下斗栱与梁架，比单看屋顶更能理解这座岭南古殿的技术与历史。",
  "id": "gd_meian",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "梅庵大雄宝殿完整殿体 · 线稿",
    "宋 · 北宋"
  ],
  "facts": [
    "大雄宝殿面阔五间、进深三间，现为硬山屋顶，柱头斗栱向外层层伸展。殿身与梁架保留宋代特征，檐柱略向内倾，构架细节比外部体量更丰富。",
    "梅庵于北宋至道二年，即九九六年创建，大殿保留宋代遗构，并经明清及近现代多次修理。原有歇山屋顶后来改为硬山，创建年不能直接统领现状全部构件。",
    "斗栱中的拱栓与斗底皿板等做法，为研究宋代木构在岭南的保存提供实物。观察旧木架与改造屋面并存的关系，也能理解古建筑在使用中不断调整的历史。"
  ]
},
{
  "name": "恭城文庙大成殿",
  "short": "恭城文庙",
  "sub": "重檐歇山 · 孔庙主殿",
  "place": "广西恭城 · 西山",
  "placeKey": "gx_gongcheng",
  "types": [
    "hall"
  ],
  "dyn": "ming",
  "tag": "明清",
  "era": "明清营建 · 后世修护",
  "year": 1700,
  "yearApprox": true,
  "yearLabel": "明清",
  "yearNote": "第六批国保名录将恭城古建筑群列为明至清。1700仅是明清现存主体的近似排序点；创建、历代重修和今殿构件年代不混作一个精确年份。",
  "lede": "恭城文庙大成殿位于逐级升高的祭祀轴线上，重檐歇山屋面与棱角上扬的檐口，在高台上展开主殿的轮廓。脊上的人物塑像、彩画与门窗木雕，使礼制建筑同时成为地方工艺的载体。文庙创建于明代，现存殿堂经过清代重建和后世修护；创庙历史不能直接当作今日全部梁柱的制作年代。",
  "id": "gx_gongcheng",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "恭城文庙大成殿 · 线稿",
    "明清 · 明清"
  ],
  "facts": [
    "大成殿坐落高台，屋顶为重檐歇山，门窗和檐口饰木雕，屋脊排列人物塑像与彩画。台阶与前方祭祀平台相接，主殿的高度、屋面和装饰共同形成轴线上的中心。",
    "文庙于明永乐八年一四一〇年初创，清道光年间重建后又屡次修护。国保建筑群的时代列为明至清，初创与重建必须分别理解，后来的修补也使现存部材各有年龄。",
    "大成殿奉祀孔子，轴线和台地把圣贤祭祀转为有秩序的空间。人物脊饰与木雕彩画融入礼制框架，为理解儒家庙制在广西的地方表达及工匠传统提供实物。"
  ]
}
);

// 湖南、湖北增量：默认未到访，图版待用户人眼验收。
SITES.push(
{
  "id": "hu_yueyang",
  "name": "岳阳楼",
  "short": "岳阳楼",
  "sub": "三层楼阁 · 盔顶",
  "place": "湖南岳阳 · 洞庭湖畔",
  "placeKey": "hu_yueyang_city",
  "types": [
    "pavilion"
  ],
  "dyn": "ming",
  "tag": "清",
  "era": "清光绪六年重建",
  "year": 1880,
  "yearLabel": "1880",
  "yearNote": "按清光绪六年（1880）重建所形成的现存楼阁形制定年；1984年落架大修延续旧制，不以三国阅军楼传说或北宋重修年为本图年代。",
  "lede": "三层楼身逐层伸出飞檐，最上方的盔顶又向内拱起，岳阳楼的轮廓因此轻快而不失稳重。洞庭湖畔，这座木楼以梁柱和榫卯托住屋顶，外廊把登临的空间向湖面打开。今日形制由清光绪六年重建形成，现代落架大修延续旧制；诗文赋予楼阁的声名，还须与现存建筑的年代分开看。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "岳阳楼三层主体楼阁 · 线稿",
    "清 · 1880"
  ],
  "facts": [
    "楼为三层木构，层层飞檐与顶部盔式屋面相接，梁柱借榫卯组成承重骨架。环绕的明廊、栏杆和翘起的檐角，使厚重屋顶下仍有通透而可登临的空间。",
    "现存形制来自清光绪六年重建，后经现代修缮，落架大修于一九八四年完成并沿袭旧制。更早的楼阁历史与文学记忆，不代表今天每件木构的实际年代。",
    "登楼望湖与阅读岳阳楼记，使建筑成为风景和文学相遇的场所。清代形制保存了这种登临经验，但范仲淹文章的北宋年代不能直接用来标定现存楼体。"
  ]
},
{
  "id": "hu_nanyue",
  "name": "南岳大庙",
  "short": "南岳大庙",
  "sub": "圣帝殿 · 重檐歇山",
  "place": "湖南衡阳 · 南岳",
  "placeKey": "hu_nanyue",
  "types": [
    "hall"
  ],
  "dyn": "ming",
  "tag": "清",
  "era": "清光绪年间重建",
  "year": 1882,
  "yearLabel": "1882 · 后世修护",
  "yearNote": "1882取南岳大庙现存主体重建年代；圣帝殿后有修护、换柱等变化，图绘实拍现状，不将全庙唐代初创年当作本殿年代。",
  "lede": "七间殿身铺展在重檐歇山顶下，南岳大庙圣帝殿的石柱外廊把深深的檐影撑开。宫殿式轴线在这里抵达主要祭祀空间，木构、石柱与雕饰一同形成端整的立面。今日主体取清光绪年间重建的年代，后世修护又不断改变局部；山岳祭祀的悠久历史，并不等于殿上每一件构件的年龄。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "南岳大庙圣帝殿 · 线稿",
    "清 · 1882 · 后世修护"
  ],
  "facts": [
    "圣帝殿面阔七间，重檐歇山屋顶下有石柱外廊。上层屋顶、斗拱与下层檐线连续展开，殿前列柱把宽阔立面分成节奏清楚的开间，雕饰又丰富檐下细部。",
    "大庙现存主体在清光绪八年重建后形成，圣帝殿后来仍经历修缮。寺庙早期沿革、清代重建与局部修护属于不同阶段，不能把殿堂现貌直接称为唐代原构。",
    "作为南岳主要祭祀空间，殿堂把登山之前的礼拜集中到山麓。中轴宫殿式建筑与大庙两侧佛道院落相邻，呈现国家祭祀和地方信仰长期交织的场所格局。"
  ]
},
{
  "id": "hu_zhanggu",
  "name": "张谷英村古建筑群",
  "short": "张谷英村",
  "sub": "明清民居 · 连甍天井",
  "place": "湖南岳阳县 · 张谷英镇",
  "placeKey": "hu_zhanggu",
  "types": [
    "residence"
  ],
  "dyn": "ming",
  "tag": "明 · 清",
  "era": "明清累世营建",
  "year": 1700,
  "yearLabel": "明—清",
  "yearNote": "现存民居是明清多期续建的建筑群；1700仅作宽泛年代排序点，不指某栋宅院的准确建造年。图绘实拍可见屋面群局部，不称全村复原，也不把张氏定居年代等同于现存房屋年代。",
  "yearApprox": true,
  "lede": "一片灰瓦屋面接着另一片，张谷英村的天井与山墙藏在连续的屋脊之间。眼前只是民居群的一角，却能看出房屋并非各自孤立：堂屋、厢房与檐廊组成相连单元，围合空间又借天井采光排水。现存建筑由明清多期续建而成，家族生活的延展也留在了复杂而有序的屋面中。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "张谷英村明清民居屋面群局部 · 线稿",
    "明 · 清 · 明—清"
  ],
  "facts": [
    "民居以天井、堂屋和两侧厢房组成基本单元，檐廊与巷道把单元相连。局部屋面上的硬山山墙、瓦脊和天井开口，正是下方生活空间组织的外在表现。",
    "建筑群在明代开始营建，清代继续扩充，现存面貌包含多期建筑。张氏先祖的定居历史与房屋实际建造时间各不相同，不能替某栋宅院指定统一始建年。",
    "连通的廊道让家与家保持联系，天井则带入光线并配合排水。房屋的聚合展示了家族共居的方式，也使日常通行、邻里往来与建筑结构紧密结合。"
  ]
},
{
  "id": "hu_tianhou",
  "name": "芷江天后宫",
  "short": "天后宫",
  "sub": "天后宫门楼 · 青石浮雕",
  "place": "湖南芷江 · 潕水河西",
  "placeKey": "hu_zhijiang",
  "types": [
    "gate",
    "sculpture"
  ],
  "dyn": "ming",
  "tag": "清",
  "era": "清乾隆十三年",
  "year": 1748,
  "yearLabel": "1748",
  "yearNote": "按1748年现存青石门坊营建年代定位；1684年的福建会馆历史分列。图绘石坊及紧邻台阶，不是天后宫全院。",
  "lede": "青石雕成的屋檐与斗拱上，人物、禽兽和花木还在层层展开，芷江天后宫石坊像把一段旅途刻进了门楼。高起的中段与两侧较低的檐线组织立面，浮雕中的桥梁、城镇又与福建客商的来路相连。现存石坊属于乾隆十三年的营建，既是妈祖信仰的入口，也留存了沿海文化进入湘西的痕迹。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "芷江天后宫石坊完整立面 · 线稿",
    "清 · 1748"
  ],
  "facts": [
    "石坊以青石构成门楼，重檐歇山和石刻斗拱模仿木构形式。中央门洞上方的匾额与密集浮雕相接，高低错落的檐线使细部雕饰有了清楚的建筑框架。",
    "天后宫有康熙时期福建会馆的前史，乾隆十三年客商在原址重新营建，石坊属于这一阶段。早期会馆与现存门坊应分别理解，不把全院都当成同年原件。",
    "石雕中的洛阳桥与武汉三镇，记录客商故乡和途中见闻，民间故事又与龙凤花木并列。小幅浮雕由此承载了贸易迁徙的记忆，也说明妈祖信仰如何跨越地域。"
  ],
  "tall": true
},
{
  "id": "hb_jindian",
  "name": "武当山金殿",
  "short": "武当金殿",
  "sub": "铜铸鎏金 · 重檐庑殿",
  "place": "湖北十堰 · 武当天柱峰",
  "placeKey": "hb_wudang",
  "types": [
    "hall"
  ],
  "dyn": "ming",
  "tag": "明",
  "era": "明永乐十四年",
  "year": 1416,
  "yearLabel": "1416",
  "yearNote": "绘天柱峰现存明代金殿，按永乐十四年（1416）定位；不与移置转运殿内的元代古铜殿混同。国保正式单位含元明铜殿，本图只画明殿。",
  "lede": "武当山天柱峰金殿看似一座重檐小木殿，实际从梁柱、斗栱到瓦面和门窗都以铜铸构件组合，再覆以鎏金。它建于明永乐十四年，位居山顶宫观的核心。现存明殿与移置别处的元代古铜殿须分别看待；沿细部辨认金属如何模仿木作，便能看到皇家道教营建与铸造技术的结合。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "武当山天柱峰明代金殿 · 线稿",
    "明 · 1416"
  ],
  "facts": [
    "金殿面阔、进深各三间，采用重檐庑殿式仿木形制。铜铸立柱、梁枋、斗栱、瓦面与门窗组合为完整殿堂，金属构件仍保留传统木建筑的细节。",
    "天柱峰现存金殿建于明永乐十四年，即一四一六年，构件在北京制作后运至武当组装。早先的元代铜殿后来移置，不应与眼前明代重檐殿混作同一主体。",
    "金殿位于武当山顶的祭祀核心，体现明代皇室扶持道教的营建规模。把金属铸件组织为仿木殿堂，也为理解古代运输、装配与建筑工艺提供实物。"
  ]
},
{
  "id": "hb_zixiao",
  "name": "紫霄宫",
  "short": "紫霄宫",
  "sub": "紫霄大殿 · 重檐歇山",
  "place": "湖北十堰 · 武当山",
  "placeKey": "hb_wudang",
  "types": [
    "hall"
  ],
  "dyn": "ming",
  "tag": "明",
  "era": "明永乐年间营建",
  "year": 1413,
  "yearLabel": "明永乐年间",
  "yearNote": "紫霄大殿按明永乐年间营建定位，1413是宫观本期营建的排序参照，不伪装成本殿确切竣工年；后有修缮，图绘研究照片所示现状。宋代创建史与所绘明殿分列。",
  "yearApprox": true,
  "lede": "紫霄宫大殿以五间木构殿身和绿色重檐屋顶立在三层石台上，殿前阶梯将山地的高差转化为庄严的进殿路线。宫观的历史早于明代，眼前主体则属于永乐时期皇家大规模营建，并经过后世修护。近看檐下斗栱与台基的关系，可以理解武当道教礼仪如何借山势形成建筑秩序。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "紫霄宫紫霄大殿与正面台基 · 线稿",
    "明 · 明永乐年间"
  ],
  "facts": [
    "紫霄大殿面阔五间、进深五间，采用重檐歇山屋顶与木构梁架。三层石台把殿堂托高，阶梯通向月台，屋檐、柱列和台基形成层层上升的空间。",
    "紫霄宫在宋代已有创建史，明永乐时期又奉敕大规模营建，现存大殿属于这一阶段。宫观后来扩修，梁架题记与不同营建记录须分开，不能用初创年统领现状。",
    "大殿供奉玄天上帝，是武当皇家祈福体系中的重要殿堂。顺应地形的高台与严整木构结合，既组织朝拜路线，也展现道教宫观的礼仪和营造技术。"
  ]
},
{
  "id": "hb_yuquan",
  "name": "玉泉寺铁塔",
  "short": "玉泉铁塔",
  "sub": "北宋铁塔 · 八角十三级",
  "place": "湖北当阳 · 玉泉寺",
  "placeKey": "hb_dangyang",
  "types": [
    "pagoda"
  ],
  "dyn": "song",
  "tag": "北宋",
  "era": "北宋嘉祐六年",
  "year": 1061,
  "yearLabel": "1061 · 塔刹后配",
  "yearNote": "铁塔身按北宋嘉祐六年（1061）铸造年代定位，顶部塔刹为清代后配；图中两期构件分列，不把现代寺院建筑一并定为宋。",
  "lede": "玉泉寺铁塔以八角十三层逐级收分，铁铸柱、斗栱和檐口却细致模仿木造楼阁。塔身与基座以北宋铸造年代为主要依据，顶部铜制塔刹为清代后配，现貌也经过近现代保护。层层小檐之间保留佛像、纹饰和铭文，使这座塔同时成为佛教纪念物、铸造工艺与宋代建筑形式的实物资料。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "当阳玉泉寺十三层铁塔 · 线稿",
    "北宋 · 1061 · 塔刹后配"
  ],
  "facts": [
    "铁塔为八角十三层楼阁式，塔身逐层收分，各层平座与斗栱承托檐口，基部有须弥座。柱、角梁和浮雕均以金属铸成，保留仿木构的细致形态。",
    "塔身铭文记铸造年代为北宋嘉祐六年，即一〇六一年；塔刹在清代道光年间以铜重配。近现代修理另有防护处理，塔身与顶部不属于同一制作阶段。",
    "佛像、浮雕和建造铭文把宗教供奉与工匠技艺联结在一起。观察铁铸斗栱如何转译木结构，可以理解宋代金属铸造与建筑传统之间的交流。"
  ],
  "tall": true
},
{
  "id": "hb_xianling",
  "name": "明显陵",
  "short": "明显陵",
  "sub": "棂星门 · 龙凤门",
  "place": "湖北钟祥 · 显陵",
  "placeKey": "hb_zhongxiang",
  "types": [
    "gate",
    "tomb"
  ],
  "dyn": "ming",
  "tag": "明",
  "era": "明嘉靖年间",
  "year": 1540,
  "yearLabel": "明嘉靖年间",
  "yearNote": "现存棂星门属于显陵明代石构遗存；1540仅作嘉靖期宽泛排序点，不是此石坊准确竣工年。只绘石坊及相连琉璃影壁，不画1990年复原的明楼，也不以帝陵初建年统领全部建筑。",
  "yearApprox": true,
  "lede": "棂星门以六根石柱分出三道门，柱顶的犼、宝珠与两侧黄琉璃影壁，把神道上的开口变成陵寝礼制的标志。石坊仿照木构雕出额枋和花板，石材的坚实与屋面形象并置。它属于显陵明代遗存，确切竣工年仍待考；一九九六年的修复归安散落构件，也让今日形貌保留了保护工程的痕迹。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "明显陵棂星门石坊及相连琉璃影壁 · 线稿",
    "明 · 明嘉靖年间"
  ],
  "facts": [
    "石坊为三门六柱四楼冲天式，柱上设云版、莲座、朝天犼与火焰宝珠，额枋花板仿木雕成。相连影壁立于须弥座上，黄色琉璃瓦把门坊与墙体连成一道界面。",
    "棂星门属于显陵明代石构，嘉靖时期为其历史背景，尚无确切竣工年可据。一九九六年维修归安原件、补配缺损并恢复夹墙，现貌包含这些保护修复的成果。",
    "神道中部的门坊把连续行进的道路转为有等级的礼仪门槛。仿木石雕与黄釉影壁呈现帝陵的材料组合，原件和修补痕迹又帮助理解陵寝遗存如何得到延续。"
  ]
}
);

// 甘肃增量图版：原型稿集中待用户验收。
SITES.push(
{
  "id": "gs_jiayuguan",
  "name": "嘉峪关",
  "short": "嘉峪关",
  "sub": "西关楼 · 门台",
  "place": "甘肃嘉峪关 · 明长城",
  "placeKey": "gs_jiayu",
  "types": [
    "gate"
  ],
  "dyn": "ming",
  "tag": "明",
  "era": "明弘治至正德营建",
  "year": 1500,
  "yearLabel": "弘治—正德",
  "yearNote": "图绘西侧嘉峪关楼与门台。关楼在明弘治至正德年间营建，后世持续修缮；1500仅为约略排序，不等于竣工年份，也不以1372年始置关替代楼的年代。",
  "yearApprox": true,
  "lede": "一道拱券穿过厚实门台，三层三檐的嘉峪关楼在上方舒展。它位于关城西侧罗城的正门，既是远望时的高点，也是进入层层防线的一道关口。关城始置与这座楼的营建相隔百余年，眼前木楼、门台与短墙的组合，应放在明代不断加强边防的过程中理解。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "西侧嘉峪关楼与门台 · 线稿",
    "明 · 弘治—正德"
  ],
  "facts": [
    "西关楼立在罗城门台上，下方开一道向西的拱券。三层楼阁各有屋檐，柱列与回廊减轻了上部的视觉重量，厚门台则把入口与城墙连成整体。",
    "关城始置于明洪武五年，西侧关楼则属弘治至正德时期的营建，并经历后世修缮。关城与关楼并非同年形成，宽泛的时代定位也不能替代确切营建证据。",
    "西关楼、柔远楼与光化楼沿中轴依次相连，却分处不同的城门。辨清三座楼的位置，才能看出关城以罗城、瓮城和内城层层组织通行与防御的方式。"
  ],
  "tall": false
},
{
  "id": "gs_dafo_tuta",
  "name": "张掖大佛寺土塔",
  "short": "大佛寺土塔",
  "sub": "覆钵塔 · 上部",
  "place": "甘肃张掖 · 大佛寺",
  "placeKey": "gs_zhangye",
  "types": [
    "pagoda"
  ],
  "dyn": "ming",
  "tag": "明",
  "era": "明代营建 · 后世修复",
  "year": 1500,
  "yearLabel": "明代",
  "yearNote": "土塔约建于明代，1500仅为明代约略排序。1927年地震损毁顶部，1986年修复；本图取实拍可见的上部塔身与塔刹，不虚构被前殿和院墙遮住的下部基座。",
  "yearApprox": true,
  "lede": "粗大的覆钵托起一段带佛龛的塔身，相轮与宝顶又把轮廓向上拉长。张掖大佛寺土塔也叫弥陀千佛塔，周围的小塔使它与寺内平展的大佛殿形成鲜明对照。这里看到的是前殿和院墙上方露出的塔体，约建于明代；顶部曾遭地震损毁，今日形貌包含修复后的部分。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "弥陀千佛塔露明塔身与塔刹 · 线稿",
    "明 · 明代"
  ],
  "facts": [
    "可见上部由覆钵、须弥座式佛龛段、相轮和宝顶连续组成，旁有小塔呼应。圆鼓的主体与方整的龛座转换，展现了这种佛塔不同于楼阁式塔的轮廓。",
    "地方志资料将土塔约定为明代建筑，具体营建年份未明。一九二七年地震损毁顶部，一九八六年修复，现存塔刹于是包含修补，不能全视为初建原件。",
    "土塔与大佛殿同处一寺，却采用不同的建筑语言：一者以覆钵和相轮向上收束，一者以木构大殿包容卧佛。只看露出的上部，也能辨认寺院内佛塔的独立角色。"
  ],
  "tall": true
},
{
  "id": "gs_fuxi",
  "name": "天水伏羲庙",
  "short": "伏羲庙",
  "sub": "仪门 · 五间",
  "place": "甘肃天水 · 秦州",
  "placeKey": "gs_tianshui",
  "types": [
    "gate"
  ],
  "dyn": "ming",
  "tag": "清",
  "era": "清嘉庆十年扩建",
  "year": 1805,
  "yearLabel": "1805",
  "yearNote": "仪门1523年始建，1805年重修时由三间改为五间；图绘现存五间仪门，以1805年形制定年，不把整庙1483—1484年初建当成此门年代。2026年初完成包括仪门在内的屋面与檐部修缮。",
  "lede": "红色柱列撑起一座横向展开的五间仪门，中部通道把前院与祭祀主院连接起来。在天水伏羲庙，牌坊、大门、仪门与殿堂沿轴线逐次递进，门的作用不只是出入，还让参拜的节奏慢慢展开。眼前仪门由明代三间形制扩为清代五间，今天的宽度保存了这次变化的线索。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "伏羲庙仪门 · 线稿",
    "清 · 1805"
  ],
  "facts": [
    "仪门位于大门之后、先天殿之前，五间立面在中央留下通道。单檐屋面与红色柱列向两侧延展，作为院落之间的第二重门，尺度小于主要祭祀殿堂。",
    "仪门始建于明嘉靖二年，清嘉庆十年开始的重修将原来三间扩为五间。今日宽展形制属于后一次改变，整座庙的明成化初建历史不能直接用作这座门的年代。",
    "连续的门与院落把伏羲祭祀组织成层层深入的空间，仪门是其中重要的转折。它的扩建说明礼仪建筑也会随使用而调整，而不是初建之后就固定不变。"
  ],
  "tall": false
},
{
  "id": "gs_bingling",
  "name": "炳灵寺石窟",
  "short": "炳灵寺",
  "sub": "第171龛 · 弥勒大佛",
  "place": "甘肃永靖 · 炳灵寺",
  "placeKey": "gs_yongjing",
  "types": [
    "grotto",
    "sculpture"
  ],
  "dyn": "tang",
  "tag": "唐",
  "era": "唐开元十九年开凿",
  "year": 731,
  "yearLabel": "731",
  "yearNote": "图绘第171龛大佛，按保护研究所专家所述唐开元十九年（731）雕凿定年；上半身石雕、腹部以下泥塑，后世修护，不以西秦早期洞窟纪年替代此像年代。",
  "lede": "巨大的弥勒坐在黄河岸边的岩壁中，卷发、长耳与宽展的袈裟，使炳灵寺第171龛在密集小龛之间格外醒目。上半身顺山雕石，腹部以下则以泥塑接续，石与泥共同支撑这尊唐代大像。现存手部的残损也留在眼前，不能把它想象成未经岁月改变的开元原貌。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "第171龛弥勒大佛 · 线稿",
    "唐 · 731"
  ],
  "facts": [
    "大佛上半身依山石雕，腹部以下为泥塑，宽阔衣纹连接两种材料。卷发与长耳围住面容，垂足坐姿和岩壁形成紧密关系，现存两侧手部保存程度不同。",
    "保护研究所据考证将第171龛大佛定为唐开元十九年雕凿，现状还含后世修护。炳灵寺早期洞窟的西秦题记，不能用来替代这尊唐代大像的年代。",
    "炳灵寺保存多时期的佛教艺术，这尊大佛展示其中唐代宏大的造像尺度。与小型石龛并观，既能感受佛像体量的变化，也能理解石雕与泥塑如何配合。"
  ],
  "tall": true
}
);

SITES.push(...[
  {
    "id": "sh_tangchuang",
    "name": "松江唐经幢",
    "short": "唐经幢",
    "sub": "佛顶尊胜陀罗尼经幢",
    "dyn": "tang",
    "tag": "唐",
    "era": "大中十三年",
    "year": 859,
    "yearLabel": "859",
    "place": "上海松江 · 中山小学",
    "placeKey": "sh_songjiang",
    "types": [
      "pillar"
    ],
    "initialStatus": "unvisited",
    "country": "CN",
    "tall": true,
    "lede": "层层石座托起修长的八角幢身，刻经与莲瓣、盘龙、佛像浮雕交错叠置。唐大中十三年留下的这座经幢，今天仍立在松江老城的校园里。",
    "facts": [
      "建于唐大中十三年（859），是上海现存最古老的地面文物；1988年列为全国重点文物保护单位。",
      "通高约9.3米，现存21级石构件；幢身为八角柱形，镌刻《佛顶尊胜陀罗尼经》及捐建题记。",
      "台座、束腰、华盖和腰檐交替叠合，雕刻有莲花、盘龙与佛教人物。图版简化风化浮雕与经文，不作为碑文摹本。"
    ],
    "caption": [
      "八角石幢 · 层叠雕刻",
      "唐 · 大中十三年（859）"
    ],
    "legacyNames": [
      "唐陀罗尼经幢",
      "松江唐代陀罗尼经石幢",
      "佛顶尊胜陀罗尼经幢"
    ],
    "legacyPlaces": [
      "上海松江",
      "松江"
    ]
  },
  {
    "id": "sh_longhuata",
    "name": "龙华塔",
    "short": "龙华塔",
    "sub": "八面七层 · 砖木楼阁塔",
    "dyn": "song",
    "tag": "宋 · 吴越",
    "era": "太平兴国二年 · 吴越钱俶重建",
    "year": 977,
    "yearLabel": "977",
    "yearNote": "现存塔主体按太平兴国二年（977）吴越钱俶重建纪年定位；国保年代列宋。木檐、栏杆等历代修缮，不把三国始建传说作为现存塔年代。",
    "place": "上海徐汇 · 龙华",
    "placeKey": "shanghai",
    "types": [
      "pagoda"
    ],
    "initialStatus": "unvisited",
    "country": "CN",
    "tall": true,
    "lede": "八角塔身逐层收窄，七道楼层带着木檐和平座栏杆，在上海街区中仍显出修长轮廓。龙华塔现存主体按九七七年吴越王钱俶重建纪年定位，而三国初创只属传说层次。砖砌塔身与历代修换的外部木构共同组成现貌，登临想象与近看材料，都能帮助理解这座楼阁式塔的时间积累。",
    "facts": [
      "龙华塔为八面七层楼阁式砖木塔，高约四十米，自第二层起高度与面积逐层缩小；塔身设壶门，外部木檐和平座使砖塔具有木楼般的层次。",
      "徐汇区档案资料记现存结构由吴越王钱俶于北宋太平兴国二年，即九七七年重建；三国始建为相传说法，不能据此把今日塔体断为三国遗存。",
      "古老砖塔与多次维修的木檐、栏杆一起构成今天的外观，材料并非全部同龄；在近代高楼出现以前，它曾长期成为当地地景中醒目的高度标志。"
    ],
    "caption": [
      "八面七层 · 砖木楼阁式",
      "吴越重建 · 北宋纪年（977）"
    ],
    "legacyNames": [
      "龙华寺塔",
      "上海龙华塔"
    ],
    "legacyPlaces": [
      "上海徐汇",
      "龙华"
    ]
  },
  {
    "id": "sh_fangta",
    "name": "松江兴圣教寺塔",
    "short": "松江方塔",
    "sub": "方塔园 · 九层方塔",
    "dyn": "song",
    "tag": "北宋",
    "era": "熙宁、元祐年间",
    "year": 1080,
    "yearLabel": "1068—1093",
    "yearApprox": true,
    "yearNote": "采用松江年鉴2019记载的1068—1093年建造范围；1080只用于年表约略定位，不作为确定落成年。寺院949年创建与塔的北宋建造分开记录。",
    "place": "上海松江 · 方塔园",
    "placeKey": "sh_songjiang",
    "types": [
      "pagoda"
    ],
    "initialStatus": "unvisited",
    "country": "CN",
    "tall": true,
    "lede": "方形塔身上，九层木檐如层层张开的翼。兴圣教寺已不复原来的规模，这座北宋砖木塔仍以修长的比例立在松江老城，被当地人直接称作“方塔”。",
    "facts": [
      "兴圣教寺创建于五代后汉乾祐二年（949），塔则建于北宋熙宁、元祐年间（1068—1093），两者不混作同一年代。",
      "塔平面正方形，砖木结构，楼阁式九层，通高约42.65米；砖壁以仿木柱划分三间，中间开壶门。",
      "各层有木构腰檐、平座与栏杆，顶立铁刹。元、明、清及近现代历经修缮，图版表现现存形貌。"
    ],
    "caption": [
      "方形九层 · 砖木塔",
      "北宋 · 熙宁、元祐年间"
    ],
    "legacyNames": [
      "兴圣教寺塔",
      "松江方塔",
      "上海方塔",
      "方塔"
    ],
    "legacyPlaces": [
      "上海松江",
      "松江方塔园"
    ]
  },
  {
    "id": "sh_zhenru",
    "name": "真如寺大殿",
    "short": "真如寺",
    "sub": "三间单檐歇山 · 元代木构",
    "dyn": "yuan",
    "tag": "元",
    "era": "延祐七年",
    "year": 1320,
    "yearLabel": "1320",
    "yearNote": "1320对应大殿木构建造题记；现貌经1963年等修缮恢复，后添下檐被去除。其他寺院建筑与殿后新塔不纳入本条元构图版。",
    "place": "上海普陀 · 真如",
    "placeKey": "shanghai",
    "types": [
      "hall"
    ],
    "initialStatus": "unvisited",
    "country": "CN",
    "tall": false,
    "lede": "宽阔的灰瓦屋顶压在三间木殿之上，两端鸱吻向天卷起。真如寺大殿把元代江南木构保存在今日城区中，梁枋间的题记仍能读出延祐七年的营造时间。",
    "facts": [
      "大殿内额题记记元延祐七年（1320）鼎建，殿中保留元代木构件，是上海的重要元代建筑遗存。",
      "面阔三间，单檐歇山顶；正面四柱组织中央格扇门与两侧开窗，屋顶两端立鸱吻。",
      "1963年修缮去除后世添建的下檐，恢复单檐面貌。图版仅绘大殿，殿后新塔和两侧后世建筑另有年代。"
    ],
    "caption": [
      "大殿正立面 · 面阔三间",
      "元 · 延祐七年（1320）"
    ],
    "legacyNames": [
      "上海真如寺",
      "真如寺大雄宝殿"
    ],
    "legacyPlaces": [
      "上海普陀",
      "真如镇"
    ]
  }
]);

SITES.sort((a, b) => Object.keys(DYN).indexOf(a.dyn) - Object.keys(DYN).indexOf(b.dyn) || a.year - b.year);

// 山东补充：所绘主体、现存年代与个人默认状态分别登记。
SITES.push(
  {
    id: 'sd_guangyue', name: '光岳楼', short: '光岳楼', sub: '聊城 · 整楼与台基', types: ['pavilion'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '明', era: '明洪武七年建成', year: 1374, yearNote: '年代对应现存光岳楼；历代修缮与明洪武七年（1374）建成分别说明。', place: '山东聊城 · 东昌府古城', placeKey: 'sd_liaocheng',
    lede: '光岳楼让高台和木楼共同成为古城中心：台基四面券洞连接街路，四层檐口向上变化，最高处以十字屋脊收束。楼建成于明洪武七年，此后经历多次修护，仍保存宋元楼阁传统向明代营造过渡的特征。它的看点不仅在高度，更在沉实台基与轻巧围廊之间，城市交通和登临空间如何彼此配合。',
    facts: ['形制：砖石方台上立四层木楼，楼身设围廊，层层出檐，顶部采用十字脊。台基四面开半圆券洞，街路在下方相通，登楼阶道另从台基内组织。', '断代：光岳楼建成于一三七四年，即明洪武七年，历代又多次维修。地方志记主要构件仍保留初建遗存，现貌也有修护成果，不能将每块木料都当作明初原物。', '价值：高台、围廊、重檐与内部结构延续宋元楼阁的营造传统，同时呈现明代特征。建筑占据古城街路交点，把更鼓、瞭望和登临的用途落实为城市中心的形体。'],
    caption: ['光岳楼 · 整楼与台基', '四层木楼 · 明洪武七年（1374）'], tall: false,
  },
  {
    id: 'sd_yantai_huiguan', name: '烟台福建会馆', short: '福建会馆', sub: '天后行宫 · 沿街外观', types: ['hall'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '清', era: '清光绪十年始建 · 三十二年落成', year: 1906, yearNote: '1884年始建、1906年落成；所绘为2023年实拍中的沿街外观，照片早于2025年修缮。', place: '山东烟台 · 芝罘区', placeKey: 'sd_yantai',
    lede: '福建会馆的沿街墙门，把闽南建筑的轮廓带到烟台港城：红墙、风火墙和燕尾屋脊相接，石木雕饰在入口处聚拢。福建船商集资兴建天后行宫，用从泉州一带精选加工的材料跨海营造，至光绪三十二年落成。外观所见只是院落的街面，却足以提示妈祖信仰、海上贸易和南北工匠往来的密切关系。',
    facts: ['形制：沿街外观以墙门和屋面组成连续界面，风火墙与燕尾脊显出闽南特色，入口的石木雕饰层层展开。墙内另有戏台及大殿，街面并不呈现全部院落布局。', '断代：会馆于一八八四年动工、一九〇六年落成，由福建船帮商贾集资，后来又有维护与修缮。落成纪年说明初建工程完成，不能将沿街墙门的所有构件与表面都认作未经改变的原物。', '价值：会馆供奉海神妈祖，砖瓦木石多在泉州一带选料加工后运来，工艺随海路移植北方。入口雕饰与屋脊形态，留下船商组织、信仰和跨地域营造交流的线索。'],
    legacyNames: ['烟台天后行宫', '烟台民俗博物馆'], caption: ['烟台福建会馆 · 沿街外观', '闽南会馆 · 清光绪三十二年（1906）'], tall: false,
  },
  {
    id: 'sd_jiuding', name: '九顶塔', short: '九顶塔', sub: '济南 · 灵鹫山', types: ['pagoda'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'tang', tag: '唐', era: '唐代遗塔 · 后世维修', year: 750, yearLabel: '唐代', yearApprox: true, yearNote: '750仅用于唐代的年表约略定位，不是确切建年；现存塔包括后世维修，不将民俗园的年代计为古塔年代。', place: '山东济南 · 柳埠灵鹫山', placeKey: 'jinan_liubu',
    lede: '九顶塔最醒目的轮廓来自塔顶：八座小方塔环列八角，一座较高的小塔立在中央，单层砖塔因此像把多座塔聚在一处。砖檐层层叠涩，先向外挑再向内收，为这组小塔组成托座。塔的主体通常依形制与遗物归入唐代，具体建年尚无定论；今日完整轮廓也经历后世维修，不能视作从未改变的唐代原貌。',
    facts: ['形制：主体为单层八角砖塔，檐部叠涩外挑后再内收，形成八角平座。座上八角各立一座三层小方塔，中央另立较高的小塔，合为塔名所指的九顶。', '断代：塔的唐代归属依据营造形制、雕像风格及相关遗物等，确切建年尚未证实。现存主体也经后世维修，年表的约略年份只帮助定位，不能替代营造题记。', '价值：一座塔身承托九座小塔，使通常集中于中央的塔顶分成环列与居中的两层关系。密集小塔与单层塔室的组合，提供观察佛塔形制变化和砖砌技术的实例。'],
    caption: ['九顶塔 · 八角砖塔', '九座小塔 · 唐代遗塔'], tall: true,
  },
  {
    id: 'sd_hongjialou', name: '洪家楼天主教堂', short: '洪楼教堂', sub: '耶稣圣心主教座堂 · 正立面', types: ['church'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '清', era: '清光绪三十一年竣工', year: 1905, yearNote: '年代对应1905年竣工的现存教堂，区分此前洪家楼的旧教堂与后来的修缮。', place: '山东济南 · 洪家楼', placeKey: 'sd_jinan',
    lede: '洪家楼教堂的正立面把视线不断向上引：两座尖塔夹住中央玫瑰窗，尖券门和细长窗洞逐层呼应，砖石扶壁又把轮廓稳住。今日耶稣圣心主教座堂于一九〇五年竣工，区别于此前遭毁的旧堂及后来的修缮。它把欧洲教堂的空间和装饰语汇带入济南，也让近代宗教建筑成为城市轮廓的一部分。',
    facts: ['形制：正立面以双尖塔对称展开，中央设玫瑰窗，下方三组尖券入口与上部窗洞相接。砖石墙面与扶壁组成垂直线条，突出哥特式建筑向上的视觉节奏。', '断代：洪家楼较早的教堂在一九〇〇年遭破坏，现存教堂重建后于一九〇五年完工。这个年代对应今日主教座堂，不能移用于先前旧堂，也不包含后来的修缮工程。', '价值：双塔、尖券与玫瑰窗把欧洲宗教建筑的形式组合在济南的城市环境中。正立面同时承担入口与信仰标识的作用，反映近代地方营造与跨地域建筑文化的接触。'],
    legacyNames: ['洪家楼教堂', '洪楼教堂', '洪家楼耶稣圣心主教座堂'], caption: ['洪家楼天主教堂 · 正立面', '双尖塔 · 清光绪三十一年（1905）'], tall: true,
  },
  {
    id: 'sd_qingdao_catholic', name: '青岛天主教堂', short: '圣弥厄尔', sub: '圣弥厄尔教堂 · 西立面', types: ['church'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'modern', tag: '民国', era: '1934年建成', year: 1934, yearNote: '1932年动工、1934年建成；年代对应现存圣弥厄尔教堂，不沿用附近德国建筑的清代年代。', place: '山东青岛 · 浙江路', placeKey: 'sd_qingdao',
    lede: '圣弥厄尔教堂的西立面由两座钟塔和中央玫瑰窗组织，米黄色墙面与红瓦尖顶之间，券门、窗洞和十字架层层对应。它于一九三二年动工、一九三四年建成，属于青岛近代宗教建筑的发展阶段，不能沿用附近德占时期建筑的建年。双塔的对称轮廓，也与江苏路基督教堂主堂和单钟楼的组合明显不同。',
    facts: ['形制：教堂平面呈十字形，西立面两侧钟塔对称升起，尖顶各立十字架。中央圆形玫瑰窗位于入口之上，红瓦与浅色墙面把塔身、屋面和门窗分出层次。', '断代：现存教堂营建于一九三二至一九三四年，后一年为建成纪年。它处于民国时期，不能因为邻近德占时期街区，就将本堂与清末的德国建筑视为同一年代。', '价值：双塔与中央窗门的轴线把礼拜堂入口塑成城市地标，欧洲宗教建筑语汇在港城形成鲜明街景。与江苏路教堂并观，可看到不同年代和构图的近代教堂形式。'],
    legacyNames: ['圣弥厄尔教堂', '圣弥厄尔大教堂', '圣弥爱尔大教堂', '圣弥额尔教堂'], caption: ['青岛天主教堂 · 西立面', '双钟塔 · 1934年建成'], tall: true,
  },
  {
    id: 'sd_qingdao_christ', name: '青岛基督教堂', short: '基督教堂', sub: '江苏路 · 主堂与钟楼', types: ['church'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '清', era: '1908—1910年建造', year: 1910, yearNote: '年代对应1908—1910年建造的主堂与钟楼；与1934年建成的青岛天主教堂分开。', place: '山东青岛 · 江苏路', placeKey: 'sd_qingdao',
    lede: '江苏路教堂的主堂与钟楼采用不对称组合：一侧钟楼高起，钟面和绿色尖顶成为远处的标识，另一侧红瓦屋面落向较低的殿身。粗面花岗岩框住窗洞与墙角，使砖石建筑具有古堡般的厚重感。教堂于一九〇八至一九一〇年营建，是德占时期的单体；其构图和年代都与浙江路双塔天主教堂分别可辨。',
    facts: ['形制：主堂与单座钟楼并置，钟楼立面以粗面花岗岩和半圆拱形窗框处理，上部设大钟面。陡斜红瓦屋面与绿色尖顶分属不同体量，形成高低错落的轮廓。', '断代：教堂于一九〇八年动工、一九一〇年建成，后来历经修护，二十世纪末又经修复开放。营建年代对应主堂与钟楼，不与一九三四年建成的另一所教堂混同。', '价值：石材的粗糙表面、红瓦坡顶与钟楼把德国建筑语汇带入青岛街景。主堂与高塔的不对称关系，使宗教空间和城市报时标识在同一座建筑中相互联系。'],
    legacyNames: ['江苏路基督教堂', '青岛德国礼拜堂'], caption: ['青岛基督教堂 · 主堂与钟楼', '不对称立面 · 1910年建成'], tall: false,
  },
  {
    id: 'sd_yanmiao', name: '曲阜颜庙', short: '颜庙', sub: '复圣殿 · 七间重檐', types: ['hall'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '明', era: '明正德二年复圣殿重建', year: 1507, yearNote: '图版对应1507年重建后的七间复圣殿，明清及1934、1978、2006年继续修缮；不采用颜庙元代迁址年代或1509年碑亭建年代表本殿。', place: '山东曲阜 · 陋巷', placeKey: 'qufu',
    lede: '复圣殿用七间宽面与两重绿瓦檐，标明颜回在儒家祭祀中的位置。前檐四根深雕龙柱与其他八角石柱相对，露台和回廊把殿前仪式空间展开。今日殿堂承接明正德二年重建后的规模，经过明清及近现代多次修理；七间主殿与更早五间殿的区别，说明礼遇的变化也会进入建筑的尺度与装饰。',
    facts: ['形制：大殿正面七间，重檐绿瓦歇山顶，周围设回廊、前面接露台。前檐四根石柱深雕龙，其他十八根八角柱浅刻龙凤花卉，雕刻层次与殿堂轮廓相互衬托。', '断代：明正德二年一五〇七年重建将原五间殿扩为七间，此后明清屡修。一九三四年、七八年及二〇〇六年起的工程继续修护并更换部分木构，现状不能视作完整未动的明代原物。', '价值：复圣殿祭祀颜回，殿名与建筑等级共同表达其礼遇。由五间到七间的规模变化及龙柱装饰，提供理解圣贤崇祀和庙制演变的实物，不与祭孔的大成殿混同。'],
    legacyNames: ['复圣庙', '颜子庙', '颜庙复圣殿'], caption: ['曲阜颜庙 · 复圣殿', '七间重檐 · 明正德二年（1507）重建'], tall: false,
  },
  {
    id: 'sd_chongjue', name: '崇觉寺铁塔', short: '济宁铁塔', sub: '九层塔身与上部台座', types: ['pagoda'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'song', tag: '宋 · 明', era: '宋崇宁四年建七层 · 明万历九年增两层', year: 1105, yearLabel: '1105 · 1581', yearNote: '1105对应宋代七层铁铸主体；1581增建两层并加塔刹，现存九层不能全部标作宋建。图版仅绘照片可见塔身及上部台座。', place: '山东济宁 · 崇觉寺', placeKey: 'sd_jining',
    lede: '崇觉寺铁塔以铁铸外壳模拟木楼：斗栱、腰檐和栏杆一层层上收，佛像与盲门交替分布在八角塔壁。塔内是砖心，外观虽像楼阁，却没有供人登临的空间。下部七层始于北宋崇宁四年，明万历九年又补两层与塔刹，今日九层轮廓因此跨越两个时代；材料与年代的叠合是这座塔最值得辨认的部分。',
    facts: ['形制：八角九层塔采用铁壳砖心，层层铸出仿木斗栱、腰檐与栏杆，塔壁分饰盲门和佛像。它是楼阁外观的铸铁塔，内部没有楼梯，不能按可登临木楼理解。', '断代：北宋崇宁四年一一〇五年起铸七层，至明万历九年一五八一年增补两层并加塔刹。塔身铸铭与增建层的纪年遗物相互印证，九层现状不全属宋代营造。', '价值：铸铁构件把木建筑的檐廊和斗栱转成金属表面，兼有佛教图像装饰。宋、明分期又显示愿塔工程跨代续成，修护后仍能从构件和铭文辨认营造的历史。'],
    legacyNames: ['济宁铁塔', '崇觉寺释迦塔'], caption: ['崇觉寺铁塔 · 塔身与上部台座', '宋建七层 · 明增两层与塔刹'], tall: true,
  }
);

// 第一批国保补录；现存图版的主体与初创年代分开说明。
SITES.push(
  {
    id: 'sd_xiaotang_shrine', name: '孝堂山郭氏墓石祠', short: '孝堂山石祠', sub: '东汉石室 · 不含现代罩屋', types: ['hall'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'han', tag: '东汉', era: '东汉早期 · 约一世纪', year: 50, yearApprox: true, yearLabel: '约一世纪', yearNote: '图版绘罩屋内的东汉石祠本体；约一世纪是考古断代，并非精确建年。', place: '山东济南 · 长清孝堂山', placeKey: 'sd_xiaoli',
    lede: '孝堂山石祠像把汉代小屋转成了石头：巨石板构成墙和坡顶，中央石柱把敞开的前面分为两间，屋面又刻出瓦垄的形状。内壁画像与历代题记留在建筑自身，使小祠堂同时保存营造和观看它的人。主体通常断为东汉早期，约一世纪并非确切建年；传统的郭巨归属也只是传说，不能当成已证实的墓主身份。',
    facts: ['形制：石祠面阔两间、进深一间，前面敞开，中央柱和石梁支承坡顶，墙及屋面由大石板组成。悬山顶的石面模仿瓦垄，以石材保留汉代房屋的轮廓。', '断代：建筑通常根据形制、画像和题记归于东汉早期，约一世纪只代表考古判断。永建四年一二九年的游人题记证明此前已存在，后世添柱加固又留下不同年代。', '价值：祠内画像呈现出行、生活和神话等内容，历代题记则记录后来人对古祠的观看与维护。传统郭巨传说与实物断代须区分，不能据祠名认定未经证实的主人身份。'],
    legacyNames: ['孝堂山汉石室', '孝堂山石祠', '郭氏墓石祠'], caption: ['孝堂山郭氏墓石祠 · 石室本体', '东汉早期 · 现状意写'],
  },
  {
    id: 'fj_qingjing_gate', name: '泉州清净寺', short: '清净寺', sub: '入口石门楼 · 尖拱', types: ['mosque', 'gate'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'song', tag: '北宋', era: '大中祥符二年始建', year: 1009, yearNote: '1009年为清净寺始建年，现存门楼经历元至大三年（1310）重修及后世维修；图版是现状，不宣称每块石料都为宋构。', place: '福建泉州 · 涂门街', placeKey: 'quanzhou',
    lede: '从涂门街走进寺门，要穿过三层逐层缩小的尖拱——这是中国大陆仅存的一座石构清真寺门楼。寺创于北宋大中祥符二年（1009），阿拉伯文原名“艾苏哈卜寺”；门楼上方两行阿拉伯碑文记着来自设拉子的穆斯林商人在1310年重修此寺，今天看到的辉绿岩与花岗岩门楼，主体就是那次重修留下的。图版所绘是门楼与相连石墙，寺内礼拜堂不在其中。',
    facts: ['<b>形制</b>：门楼通高12.3米、基宽6.6米，以辉绿岩与白花岗岩砌筑；由三层四道相连的尖拱门组成，前两道门道为尖拱、顶作半穹顶，第三道为穹顶，拱下支撑构件带有中国雀替的意味。门楼顶部为斋月望月的平台，砖砌部分系17—18世纪重修。', '<b>碑文</b>：尖拱门上方阿拉伯文碑记寺建于回历400年（1009—1010），为当地第一座礼拜寺；三百余年后设拉子人艾哈迈德·本·穆罕默德·古德斯修复更新，建穹顶、加阔甬道、重修寺门，回历710年（1310—1311）竣工。北墙另嵌明永乐五年（1407）敕谕碑。', '<b>价值</b>：中国现存最古老的伊斯兰教寺院之一，门楼呈西亚清真寺形制，是宋元泉州波斯、阿拉伯穆斯林商人聚居区的物证；寺存元至正十年（1350）吴鉴碑是中国清真寺可考最早的汉文碑记之一。2021年列入世界遗产。'],
    legacyNames: ['艾苏哈卜寺', '泉州清净寺门楼'], caption: ['泉州清净寺 · 入口石门楼', '北宋始建 · 元代重修'],
  },
  {
    id: 'fj_anping_bridge', name: '安平桥', short: '五里桥', sub: '石板桥面与桥墩局部', types: ['bridge'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'song', tag: '南宋', era: '绍兴八年始建 · 约绍兴二十二年建成', year: 1152, yearNote: '1138年始建；泉州市文旅局记1152年建成，另有资料记1151年续成。图版仅画现存桥面的一段，不以局部代替全长。', place: '福建泉州 · 安海—水头', placeKey: 'fj_anhai',
    lede: '“天下无桥长此桥”。绍兴八年（1138）安海人黄护与僧智渊各捐钱万缗，由僧祖派主持在海湾上架桥；中途二人相继去世，工程停了十多年，直到绍兴二十一年（1151）郡守赵令衿到任接手，次年才建成。桥长约2255米，俗称五里桥，是中国现存最长的跨海梁式石桥。图版只画一段桥面与近处几座桥墩，不以局部代表全桥。',
    facts: ['<b>形制</b>：梁式石桥，东西走向，长约2255米，桥面宽2.9—4米，条石铺面、花岗岩栏杆；石砌桥墩360座，按港道深浅与水流分作长方形、单尖船形、双尖船形三式，墩间横架长5—11米的巨型石板为桥面。', '<b>工艺</b>：桥墩基础用“睡木沉基”法——先在海底打木桩，上面横卧一层木桩，再砌石墩，比洛阳桥抛石筏形基础省料省工；桥中水心亭周围保存历代修桥碑记16方，最早为明天顺三年（1459）《重修安平桥记》。', '<b>价值</b>：安平桥是泉州与南侧漳州、广州方向陆运的节点，由官方、僧侣、商人与民众合力建成，桥东瑞光塔、桥中水心亭和两端望高楼、听潮楼仍在；2021年作为“泉州：宋元中国的世界海洋商贸中心”遗产点之一列入世界遗产。'],
    legacyNames: ['安海五里桥', '五里桥'], caption: ['安平桥 · 石板桥面与桥墩局部', '南宋始建 · 现状意写'],
  },
  {
    id: 'bj_yunju_north', name: '房山云居寺塔及石经', short: '云居寺北塔', sub: '辽代北塔 · 罗汉塔', types: ['pagoda'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'liao', tag: '辽', era: '辽代始建 · 明代修葺', year: 1100, yearApprox: true, yearLabel: '辽代', yearNote: '北塔始建于辽代，确切建年未核定，后经明代及其他时期修葺；此处不以云居寺隋代刻经的开端作为北塔年代。', place: '北京房山 · 云居寺', placeKey: 'bj_yunju',
    lede: '云居寺北塔的轮廓很难用一种塔型概括：下部像楼阁，中段鼓起如覆钵，上部又收成钟形，因此也被称为罗汉塔或舍利塔。它始建于辽代，明代又有修葺，与寺院自隋代开始的刻经事业并非同一年代。塔体在近代战火中保存下来，砖面上的佛教偈语又让建筑与经文彼此相连；看这座北塔，既要辨认形制，也要把辽塔与更早的石经史分开阅读。',
    facts: ['轮廓：北塔下部为楼阁式塔身，中段呈鼓形，上部收为钟形，几种轮廓层层叠合；它又称罗汉塔或舍利塔，与常见的多层密檐塔相比，体量变化更为突出。', '年代：北塔始建于辽代，明代有过修葺，具体创建年尚不确定；云居寺刻经始于隋代静琬，其后延续多个朝代，刻经开端不能直接用来给这座辽塔标注年代。', '遗存：寺院在近代战火中受损，北塔则保存下来，塔砖刻有佛教偈语；这些文字使砖砌塔体也成为佛教文献的载体，与寺内石经共同留下不同材质的经文遗存。'],
    legacyNames: ['云居寺罗汉塔', '云居寺舍利塔', '云居寺塔及石经'], caption: ['云居寺塔及石经 · 辽代北塔', '辽代始建 · 后世修葺'], tall: true,
  },
  {
    id: 'xz_jokhang', name: '大昭寺', short: '大昭寺', sub: '现状正立面 · 多期建筑', types: ['hall'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'tubo', tag: '吐蕃', era: '七世纪中叶始建', year: 647, yearNote: '647年是寺院始建的传统记载；图版绘现存正立面，包含历代扩建和维修，不把整面金顶与外墙认作七世纪原构。', place: '西藏拉萨 · 八廓街', placeKey: 'xz_lhasa',
    lede: '大昭寺面向八廓街展开正立面，白墙、深色墙带与上方金顶在城市核心形成醒目的层次。寺院始于七世纪吐蕃时期，历代扩建、修缮后才形成今天的建筑群。眼前正面并非初创时所有构件的完整原貌；它的价值还在于周围持续的朝拜与转经活动，建筑与街道共同维系了拉萨老城的宗教和社会生活。',
    facts: ['大昭寺主殿坐东面西，配殿围绕核心佛殿组织空间；正面墙体、檐口与金顶形成垂直层次，白墙和深色墙带使宫殿式寺院轮廓更为清楚。', '寺院始于七世纪吐蕃时期，官方介绍采用六四七年创建记年；此后历代扩建与修缮，现存立面是多期历史叠加，不能全部归为七世纪原物。', '寺院受藏传佛教各教派共同尊崇，外围八廓转经路线与老城街道相连；礼拜活动使其意义超越单一建筑，也是理解拉萨城市生活的中心。'],
    legacyNames: ['觉康寺', '祖拉康'], caption: ['大昭寺 · 现状正立面', '吐蕃始建 · 历代增修'],
  },
);

const CHAPTERS = [
  { key: 'han', years: '25 — 220 · 东汉', blurb: '以石仿木，阙立神道。石块叠出檐、枋与柱的轮廓，车马、百戏与神兽刻在其间；登封与蜀地的石阙，让汉代建筑和生活留下了可读的片段。' },
  { key: 'goguryeo', years: '约5世纪 · 集安现存遗迹', blurb: '巨大的石块逐级收分，护坟石抵住方坛底层。将军坟属于高句丽石室墓遗存，墓主认定与现存形制分开记录；这里的年代说明所收古迹，不借中原朝代替换其所属时期。' },
  { key: 'bei', years: '386 — 534 · 北魏', blurb: '佛塔在中原生根。嵩岳寺塔以十二边平面、层层密檐和收分塔身，把早期佛教建筑的独特形制留在嵩山南麓。' },
  { key: 'qiuci', years: '约3 — 9世纪 · 龟兹', blurb: '克孜尔与库木吐喇的洞窟沿西域河谷展开；图版采用现存窟口局部，未给未编号洞窟臆定精确年代。' },
  { key: 'xiyu', years: '约公元前2世纪 — 14世纪 · 西域古城', blurb: '交河故城叠合车师、高昌与唐代等多个阶段；图版记录大佛寺现存生土遗址，不把约略年表位置当作单体建筑的建造年份。' },
  { key: 'nan', years: '420 — 589 · 南朝', blurb: '石城山的岩壁化为一尊安坐的大佛。齐梁僧人接续开凿，新昌石弥勒以宽阔双膝与沉静衣纹，留下江南早期大型造像的轮廓。' },
  { key: 'beiqi', years: '550 — 577 · 北齐', blurb: '鼓山石壁间，佛像衣纹渐趋简洁，身躯饱满而安静。响堂山留下北齐造像、刻经与石窟建筑的片段，也见证了这一时期佛教艺术的变化。' },
  { key: 'sui', years: '581 — 618 · 隋', blurb: '洨河上的石桥与崖壁间的石窟，留下隋代的两种尺度。赵州桥以大拱和四座腹拱跨水，灵泉寺的大住圣窟则把造像与刻铭留在山中。' },
  { key: 'tubo', years: '七世纪 — 九世纪 · 吐蕃', blurb: '大昭寺始建于吐蕃时期，现存正立面汇合后世扩建与修缮。图版按今日可见外观绘制，始建年代与所见建筑层次分开说明。' },
  { key: 'tang', years: '618 — 907', blurb: '雄大疏朗。斗拱可达柱高之半，屋面平缓，出檐深远，柱有侧脚生起——盛唐的尺度感，后世再未复现。' },
  { key: 'balhae', years: '渤海时期 · 宁安现存石刻', blurb: '莲座擎起石柱，八角灯室与攒尖盖顶把木构殿堂缩成一座石雕长明灯。兴隆寺石灯幢按渤海时期独立入册，寺院后世重建的殿堂不作为渤海原构。' },
  { key: 'zhou', years: '907 — 979 · 五代十国', blurb: '中原五代更迭之际，吴越、南唐等国留下石塔、经幢与佛教造像，北汉留下镇国寺万佛殿。北宋立国后，南北诸国仍延续了一段时间；这些古迹按所属政权与现存主体分别纪年。' },
  { key: 'song', years: '960 — 1279', blurb: '两宋三百年：摩尼殿早《营造法式》半个世纪已见其规制；砖塔在定州砌到八十三米，到江南又与木檐混构。' },
  { key: 'dali', years: '937 — 1253 · 大理', blurb: '段氏与三十七部会盟碑刻于大理国明政三年，碑文留下滇东会盟的记录。' },
  { key: 'liao', years: '907 — 1234', blurb: '契丹与女真承唐制而益壮：减柱、移柱以扩展佛殿空间，斜拱如花，殿阁之巨为北地独有；金人重修的华塔，则把一座砖塔堆成一束花。' },
  {"key":"xixia","years":"1038 — 1227 · 西夏","blurb":"贺兰山下的陵塔与黄河岸边的佛塔，留下西夏的两种轮廓。陵园以现存夯土遗址入册，塔群注明始建说与后世重修，不以复原想象代替现存形态。"},
  { key: 'yuan', years: '1271 — 1368', blurb: '元人用材粗放，梁架常见弯木，村庙里的正殿与戏台却把日常的信仰和娱乐搭在了一个院子里。' },
  { key: 'ming', years: '1368 — 1912', blurb: '官式定型，琉璃盛行：砖塔披上五色琉璃，圆殿以蓝瓦象天，彩塑在晋中的小寺里达到极盛。' },
  { key: 'modern', years: '1912 — 至今', blurb: '红砖教堂与重建古楼留下近现代的不同建筑轮廓。这里按现存主体的年代入册，初创建筑、后世重建与修缮沿革分别说明，不借古老名称替换眼前建筑的年龄。' },
  { key: 'jp_asuka', years: '538 — 710 · 日本', blurb: '法隆寺金堂的深檐、云形斗栱与层叠屋顶，留下早期佛教木构的轮廓。经历火灾、重建与修理，西院伽蓝仍让七世纪的建筑形制可见。' },
  { key: 'jp_nara', years: '710 — 794 · 日本', blurb: '鉴真东渡后，唐招提寺在平城京西部建立。金堂以七间柱廊展开，宽阔屋顶下的空间开敞而安定，保存奈良时代的殿堂形制。' },
  { key: 'jp_heian', years: '794 — 1185 · 日本', blurb: '宇治池畔，凤凰堂的中堂与翼廊向两侧展开。平等院把净土信仰安放在建筑、佛像与水庭之间，留下平安时代的轻盈比例。' },
  { key: 'jp_kamakura', years: '1185 — 1333 · 日本', blurb: '东大寺南大门以贯穿上下的巨柱和层叠梁栱显露结构。重源主持的复兴将宋代营造经验带入奈良，形成鲜明的大佛样建筑。' },
  { key: 'jp_muromachi', years: '1336 — 1573 · 日本', blurb: '银阁寺观音殿保留室町时代的楼阁形制。上下两层比例克制，今日所见建筑与东山山庄的营建沿革分开记录。' },
  { key: 'jp_momoyama', years: '1573 — 1615 · 日本', blurb: '飞云阁与仁和寺金堂留下桃山时期楼阁和宫殿建筑的不同形态。飞云阁建造年未详，仁和寺金堂则由旧紫宸殿移建，年表分别标明约值与迁建沿革。' },
  { key: 'jp_edo', years: '1603 — 1867 · 日本', blurb: '京都的古寺在江户时代迎来多次重建。清水寺的山坡舞台与东寺的五重塔各有鲜明轮廓，现存建筑年代与寺院初创沿革分别入册。' },
  { key: 'jp_showa', years: '1926 — 1989 · 日本', blurb: '金阁与浅草寺本堂都经历二十世纪火灾与重建。图版按今天可见的昭和建筑入册，同时交代更早的寺院与原构历史。' },
];

// 河北原型增补；真实参考、所绘范围与待审状态见 assets/research/hebei-20260917-batch.json。
SITES.push(
{
  "id": "hb_shanhaiguan",
  "name": "山海关镇东楼",
  "short": "镇东楼",
  "sub": "东门箭楼 · 城台与短墙段",
  "dyn": "ming",
  "tag": "明",
  "era": "明代建楼 · 近现代维修",
  "year": 1400,
  "yearLabel": "明代",
  "yearApprox": true,
  "yearNote": "山海卫1381年设立，河北文物局记翌年筑关城；本图绘现存镇东楼与城台，1400仅作明代约略排序，不是木楼确切建年。近现代多次修缮另行说明。",
  "place": "河北秦皇岛 · 山海关",
  "placeKey": "hb_shanhaiguan",
  "types": [
    "wall",
    "pavilion"
  ],
  "lede": "镇东楼立在关城东门的高大城台上，楼下券门承担通行，楼上箭楼负责观察与防守。两层楼体和两翼短墙让入口显得宽厚，“天下第一关”匾额则把这处防线变成城市标志。山海关在明初兴筑，此后楼体多次维修；眼前完整轮廓包含近现代保护成果，理解它需要同时看到边防选址与修缮延续。",
  "facts": [
    "镇东楼是关城东门箭楼，城台券洞通行，上部两层楼体俯瞰关外，相邻墙段横向延展；门楼与城墙共同构成防御界面，不能只把它看作一座独立观景楼。",
    "明洪武十四年设山海卫，翌年筑关城，现楼按明代遗构及后世维修理解；一九七八年后楼墙持续修缮，一九九八年又大修，建城与修楼纪年分别记录。",
    "关城处在山海之间的交通狭口，与周围瓮城、罗城和长城组成防线；镇东楼只是其中一个关键节点，从楼、门、墙的联系可读出防守如何控制日常通行。"
  ],
  "legacyNames": [
    "天下第一关",
    "山海关东门",
    "镇东门"
  ],
  "caption": [
    "山海关 · 镇东楼与城台",
    "明代箭楼 · 历代及近现代修缮"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_pule",
  "name": "普乐寺",
  "short": "普乐寺",
  "sub": "旭光阁 · 上层台基",
  "dyn": "ming",
  "tag": "清",
  "era": "清乾隆三十一年",
  "year": 1766,
  "yearNote": "1766对应普乐寺兴建及旭光阁；本图仅绘圆阁与直接承托的上层台基，不展示完整坛城。",
  "place": "河北承德 · 武烈河东",
  "placeKey": "hb_chengde",
  "types": [
    "pavilion"
  ],
  "lede": "旭光阁以两道圆形檐口与黄琉璃屋面，将普乐寺后部的坛城中心标示出来。圆阁立在方形高台上，圆与方、轻展屋檐与厚重石台形成鲜明对照。寺院建于乾隆年间，前部常见的殿堂序列与后部曼荼罗空间并置；这里只看圆阁和直接承托的上层台基，也能读出汉式木构与藏传礼仪的相遇。",
  "facts": [
    "圆形旭光阁用重檐攒尖屋顶覆黄琉璃瓦，下接石台，檐口沿圆周连续展开；所见上层台基承托圆阁，不能仅凭这一局部推算完整坛城的台层或建筑数量。",
    "普乐寺建于清乾隆三十一年，即一七六六年，前部为殿堂院落，后部设坛城；旭光阁属后部核心，营建年代与前后两种空间组织共同说明清代寺院的布局。",
    "阁内立体曼荼罗与顶部圆形藻井，使外部圆亭和内部礼佛象征彼此关联；形制可与天坛圆殿比较，但这里承担的是佛教礼仪，不能因外形相似便等同用途。"
  ],
  "caption": [
    "普乐寺 · 旭光阁与上层台基",
    "双重圆檐 · 清乾隆三十一年（1766）"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_anyuan",
  "name": "安远庙",
  "short": "安远庙",
  "sub": "普度殿 · 三重檐方殿",
  "dyn": "ming",
  "tag": "清",
  "era": "清乾隆二十九年",
  "year": 1764,
  "yearNote": "1764对应安远庙创建及普度殿；现存殿体包括后世修缮。普度殿亦写作普渡殿，保留搜索别名。",
  "place": "河北承德 · 武烈河东",
  "placeKey": "hb_chengde",
  "types": [
    "hall",
    "pavilion"
  ],
  "lede": "普度殿的黑琉璃屋面以黄边勾出三重檐，方形高殿因而显得稳重而层次分明。安远庙建在武烈河东山岗，以伊犁寺院为参照，将远方的宗教建筑记忆带到承德。现存殿体经历后世修缮，创建年说明清代营建的开端；在这个七间见方的空间上，看屋檐如何连续绕行，比把它误读成普通狭长大殿更有意义。",
  "facts": [
    "普度殿亦写作普渡殿，平面近方，面阔、进深各七间，三重檐歇山顶；黑琉璃瓦配黄色剪边，檐口绕殿展开，宽深接近的体量与普通横向大殿不同。",
    "安远庙建于清乾隆二十九年，即一七六四年，为迁居承德的达什达瓦部众参照伊犁固尔扎庙营建；现存主体包含后世修缮，初建纪年不证明构件从未更换。",
    "如今留下内山门、普度殿与御制诗碑等遗存，建筑所参照的伊犁记忆与承德山地环境相结合；方殿及三重檐的形态，是理解清代跨地域宗教营造的实物线索。"
  ],
  "legacyNames": [
    "伊犁庙",
    "安远庙普渡殿"
  ],
  "caption": [
    "安远庙 · 普度殿",
    "三重檐方殿 · 清乾隆二十九年（1764）"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_zhili",
  "name": "直隶总督署",
  "short": "总督署",
  "sub": "大堂 · 五间官署正堂",
  "dyn": "ming",
  "tag": "清",
  "era": "清雍正年间现存主体",
  "year": 1730,
  "yearLabel": "清雍正年间",
  "yearApprox": true,
  "yearNote": "河北文物局将现存主要建筑定为雍正年间（1723—1735）；1730仅作该范围的排序点，不称为大堂确切竣工年。",
  "place": "河北保定 · 莲池区",
  "placeKey": "hb_baoding",
  "types": [
    "hall"
  ],
  "lede": "直隶总督署大堂用五间正堂、前廊与开阔院落表达官署秩序，灰瓦与较克制的装饰让空间关系比繁丽屋面更突出。这里是重大政务和礼仪的场所，前部公署与后部居住院落沿轴线区分。现存主要建筑属清雍正年间，经过历次增修；看懂大堂在整组院落中的位置，也就能理解官员如何以建筑安排公务与生活。",
  "facts": [
    "大堂为中轴上的五间正堂，前设廊部与月台，左右房屋围合院落；总督署主要建筑用硬山布瓦顶，较平直的屋面把视线引向门、堂与院的前后次序。",
    "署址在明清至民国初年长期作官署，现存主要建筑为清雍正年间遗存，即一七二三至一七三五年范围；年表用约值定位，不将一七三〇写成大堂确切竣工年。",
    "大堂用于重大政务与庆典礼仪，轴线后段另有官邸、上房等生活空间；公署和内宅通过院落逐步转换，比单看一栋大厅更能说明清代地方官署的使用秩序。"
  ],
  "legacyNames": [
    "保定直隶总督署",
    "直隶省衙"
  ],
  "caption": [
    "直隶总督署 · 大堂",
    "五间正堂 · 清雍正年间"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_yongtong",
  "name": "永通桥",
  "short": "小石桥",
  "sub": "赵县 · 单孔敞肩石拱桥",
  "dyn": "liao",
  "tag": "金",
  "era": "金明昌年间",
  "year": 1192,
  "yearLabel": "1190—1195",
  "yearApprox": true,
  "yearNote": "按河北文物局记载金明昌年间（1190—1195）建桥；1192为范围排序点，不将更早传说作为现存主体纪年。",
  "place": "河北赵县 · 赵州镇",
  "placeKey": "hb_赵县",
  "types": [
    "bridge"
  ],
  "lede": "永通桥把一孔大石拱与四个敞肩小券组合成轻巧的过水轮廓。桥面起伏不大，石栏与望柱沿弧线排开，厚重石材因开口而显得通透。它建于金明昌年间，结构与赵县安济桥相近却尺度较小，因此又称小石桥；看大拱如何承托桥面、小券如何腾出空间，比只将它当作安济桥的缩影，更能读出自己的构造特点。",
  "facts": [
    "主拱单孔跨河，约二十六米，拱肩上开四个小券，以减少实体石作并留下过水空间；桥由并列石券构成，上部望柱和栏板顺着桥面弧线连续相接。",
    "省文物局将建造定在金明昌年间，即一一九〇至一一九五年，现存主体按此范围理解；更早的创建传说不作现桥确年，年表约值也不等于单年竣工证据。",
    "永通桥与安济桥都采用敞肩石拱，尺度和所跨河道却不同，俗称小石桥正来自这种比较；桥上浮雕又将工程构造与装饰结合，值得连同拱券近看。"
  ],
  "legacyNames": [
    "赵县小石桥",
    "永通桥（小石桥）"
  ],
  "caption": [
    "赵县 · 永通桥整桥侧立面",
    "单孔四小券 · 金明昌年间"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_tiangong",
  "name": "天宫寺塔",
  "short": "天宫寺塔",
  "sub": "丰润 · 八角十三层密檐砖塔",
  "dyn": "liao",
  "tag": "辽",
  "era": "辽清宁八年始建 · 后世维修",
  "year": 1062,
  "yearNote": "1062为辽代始建纪年；现存塔经过明清及近现代修护，本图按所保存的辽塔形制登记。",
  "place": "河北唐山 · 丰润",
  "placeKey": "hb_fengrun",
  "types": [
    "pagoda"
  ],
  "tall": true,
  "lede": "天宫寺塔将最丰富的砖雕留在高首层，向上则用十三道密檐连续收分。八角转角处盘龙倚柱，假门和斗拱把塔身装点得像一座木构楼阁，内部却是实心砖体。寺院已毁，古塔仍留在丰润旧址高台上；辽代创建、明清维修与塔内出土的经卷文物，让外部形制和内部历史资料在这里互相补充。",
  "facts": [
    "塔为八角十三级密檐实心砖塔，须弥座上接仰莲，高首层设假门和盘龙倚柱，檐下砖雕斗拱托出连续砖檐；外部仿木并不意味着内部存在可登楼层。",
    "天宫寺塔始建于辽清宁八年，即一〇六二年，明清多次维修，现貌又包含近现代修护；沿用所保存的辽塔形制断代，而不声称今天所有砖石均未更换。",
    "塔内曾出土辽代经卷、造像和明代器物，提供宗教与印刷技术的实物资料；看外部砖作同时留意这些出土记录，可使一座孤存塔与原寺历史重新建立联系。"
  ],
  "legacyNames": [
    "丰润天宫寺塔"
  ],
  "caption": [
    "天宫寺塔 · 整塔",
    "八角十三层 · 辽清宁八年（1062）始建"
  ],
  "country": "CN",
  "initialStatus": "unvisited"
},
{
  "id": "hb_shien",
  "name": "时恩寺",
  "short": "时恩寺",
  "sub": "大殿 · 清代卷棚抱厦",
  "dyn": "ming",
  "tag": "明",
  "era": "明成化六年始建 · 清增抱厦",
  "year": 1470,
  "yearNote": "1470为时恩寺始建年，现存大殿保留明代特征；前出五间卷棚抱厦为清代增建，不把整组外观都定为1470年原构。",
  "place": "河北张家口 · 宣化",
  "placeKey": "hb_xuanhua",
  "types": [
    "hall"
  ],
  "lede": "时恩寺大殿的两种屋面，一高一低地说明了营建的不同阶段。后部单檐庑殿保留明代特点，前方五间卷棚抱厦则是清代增建，使宽阔前檐向院中延伸。寺院其余建筑多已不存，孤存大殿却不是未经变化的完整明初形象；从屋顶接缝、柱列和前后空间的关系，可看出后人怎样给旧殿增加遮蔽与使用余地。",
  "facts": [
    "大殿面阔五间、进深三间，单檐庑殿布瓦顶，前接五间卷棚抱厦；高殿与低抱厦重叠的两道屋面，是不同体量连接，不能笼统称整殿为重檐庑殿。",
    "时恩寺始建于明成化六年，即一四七〇年，现殿保留明代特征，卷棚抱厦则属清代增建；创建年与前部扩展分开理解，不把整组现貌都写成当年原构。",
    "抱厦为殿前空间增加一段遮蔽，柱列与屋檐使大殿和庭院之间有了过渡；在其他殿宇已毁的情况下，这种增建痕迹仍能说明寺院建筑如何随使用需求调整。"
  ],
  "legacyNames": [
    "宣化时恩寺大殿"
  ],
  "caption": [
    "时恩寺 · 大殿与卷棚抱厦",
    "明代殿体 · 清代增建抱厦"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_dajingmen",
  "name": "大境门",
  "short": "大境门",
  "sub": "张家口 · 券门与短墙段",
  "dyn": "ming",
  "tag": "清",
  "era": "清顺治元年开辟建门",
  "year": 1644,
  "yearNote": "1644对应大境门开辟建门；相接墙段属于跨时代长城遗存，本图不将整段山地城墙一并归为1644年建造。",
  "place": "河北张家口 · 桥西",
  "placeKey": "hb_zhangjiakou",
  "types": [
    "wall",
    "gate"
  ],
  "lede": "大境门没有高大的木楼，靠厚实砖台和一道券洞把山地通道收紧。条石基础与砖墙相接，门额以上的题字又将关口的军事尺度转化为城市记忆。它在清顺治元年正式开辟，连接的长城墙体却有更早沿革；门与短墙合看，既能读出控制往来的边界，也能看出长城并非只有封闭防守，还容纳通行与贸易。",
  "facts": [
    "大境门为条石基础上的砖砌券门，洞口以多重砖券组织，内设两扇木制包铁门；门台与短墙段相接，厚墙和拱洞形成完整关口，不依赖木城楼表现高度。",
    "清顺治元年，即一六四四年，正式在此开辟建门；相连长城和此前通道另有营建沿革，因此门年只说明这一入口阶段，不将整条山地墙体一并定在清初。",
    "这里既是关防入口，也与边外贡市和后来的商路往来相连；券门把防御、检查与交通放在同一空间，较开阔的门洞显示长城边界还承担交换和通行职能。"
  ],
  "legacyNames": [
    "张家口大境门",
    "大境门长城"
  ],
  "caption": [
    "张家口 · 大境门与短墙段",
    "清顺治元年（1644）建门"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
}
);

const PLACES = [
  { key: 'sd_xiaoli', name: '孝里', prov: '山东', lat: 36.3983, lon: 116.6018, coordinate_note: '孝堂山石祠附近显示点，非测绘坐标。' },
  { key: 'fj_anhai', name: '安海', prov: '福建', lat: 24.70659, lon: 118.44462, coordinate_note: '安平桥中段近似显示点，非所绘桥段实测坐标。' },
  { key: 'bj_yunju', name: '云居寺', prov: '北京', lat: 39.60806, lon: 115.76778, coordinate_note: '云居寺地区显示点，非北塔实测坐标。' },
  { key: 'xz_lhasa', name: '拉萨', prov: '西藏', lat: 29.653, lon: 91.132, coordinate_note: '大昭寺附近显示点，非单体测绘坐标。' },
  {"key":"hohhot","name":"呼和浩特","prov":"内蒙古","lat":40.8,"lon":111.65,"source_page":"https://commons.wikimedia.org/wiki/File:大召大雄宝殿.jpg","coordinate_note":"旧城近似显示点，参考大召实拍定位；非古迹实测坐标。"},
  {"key":"baotou","name":"包头·石拐","prov":"内蒙古","lat":40.791111,"lon":110.308472,"source_page":"https://zh.wikipedia.org/wiki/五當召","coordinate_note":"五当召附近的地区代表点，非城市中心或单殿实测坐标。"},
  {"key":"kunming","name":"昆明","prov":"云南","lat":25.090311,"lon":102.769311,"source_page":"https://zh.wikipedia.org/wiki/太和宫金殿","coordinate_note":"金殿所在地的近似地区显示点，非城市中心。"},
  {"key":"jianshui","name":"建水","prov":"云南","lat":23.618111,"lon":102.81975,"source_page":"https://zh.wikipedia.org/wiki/建水文庙","coordinate_note":"文庙所在地的近似县城显示点，非殿堂实测。"},
  {"key":"menghai","name":"勐海·景真","prov":"云南","lat":21.9575,"lon":100.303769,"source_page":"https://zh.wikipedia.org/wiki/景真八角亭","coordinate_note":"景真所在地的近似地区显示点，非县城中心。"},
  {"key":"guiyang","name":"贵阳","prov":"贵州","lat":26.57856,"lon":106.71564,"source_page":"https://zh.wikipedia.org/wiki/甲秀楼","coordinate_note":"甲秀楼与文昌街间城区近似显示点，非单一古迹坐标。"},
  {"key":"shenyang","name":"沈阳","prov":"辽宁","lat":41.79556,"lon":123.44806,"source_page":"https://zh.wikipedia.org/wiki/沈阳市","coordinate_note":"城市／县城代表点，非古迹实测坐标。"},
  {"key":"liaoyang","name":"辽阳","prov":"辽宁","lat":41.2673,"lon":123.237,"source_page":"https://zh.wikipedia.org/wiki/辽阳市","coordinate_note":"城市／县城代表点，非古迹实测坐标。"},
  {"key":"beizhen","name":"北镇","prov":"辽宁","lat":41.59611,"lon":121.79278,"source_page":"https://zh.wikipedia.org/wiki/北镇市","coordinate_note":"城市／县城代表点，非古迹实测坐标。"},
  {"key":"nongan","name":"农安","prov":"吉林","lat":44.4309,"lon":125.17216,"source_page":"https://zh.wikipedia.org/wiki/农安县","coordinate_note":"城市／县城代表点，非古迹实测坐标。"},
  {"key":"jian_jilin","name":"集安","prov":"吉林","lat":41.12313,"lon":126.18146,"source_page":"https://zh.wikipedia.org/wiki/集安市","coordinate_note":"城市／县城代表点，非古迹实测坐标。"},
  {"key":"jilin","name":"吉林","prov":"吉林","lat":43.836,"lon":126.55,"source_page":"https://zh.wikipedia.org/wiki/吉林市","coordinate_note":"城市／县城代表点，非古迹实测坐标。"},
  {"key":"ningan","name":"宁安","prov":"黑龙江","lat":44.3433,"lon":129.4617,"source_page":"https://zh.wikipedia.org/wiki/宁安市","coordinate_note":"城市／县城代表点，非古迹实测坐标。"},
  {"key":"harbin","name":"哈尔滨","prov":"黑龙江","lat":45.80139,"lon":126.52917,"source_page":"https://zh.wikipedia.org/wiki/哈尔滨市","coordinate_note":"城市／县城代表点，非古迹实测坐标。"},
  { key: 'datong', name: '大同', lat: 40.094, lon: 113.287, prov: '山西' },
  { key: 'yingxian', name: '应县', lat: 39.554, lon: 113.187, prov: '山西', dy: 5 },
  { key: 'wutai', name: '五台', lat: 38.75, lon: 113.25, prov: '山西', side: 'l' },
  { key: 'pingyao', name: '平遥', lat: 37.20, lon: 112.18, prov: '山西', side: 'r' },
  { key: 'hongtong', name: '洪洞', lat: 36.30, lon: 111.80, prov: '山西', side: 'r', dy: -14 },
  { key: 'pingshun', name: '平顺', lat: 36.20, lon: 113.44, prov: '山西', side: 'l', dy: 14 },
  { key: 'gaoping', name: '高平', lat: 35.76581, lon: 112.96838, prov: '山西', side: 'r' },
  { key: 'jincheng', name: '晋城', lat: 35.458056, lon: 112.989167, prov: '山西', side: 'l', dy: 22 },
  { key: 'luoyang', name: '洛阳', lat: 34.556, lon: 112.473, prov: '河南', side: 'r' },
  { key: 'beijing', name: '北京', lat: 39.88, lon: 116.41, prov: '北京', side: 'r' },
  { key: 'tianjin', name: '天津', lat: 39.14, lon: 117.18, prov: '天津', side: 'r' },
  { key: 'yangliuqing', name: '杨柳青', lat: 39.1274, lon: 117.00885, prov: '天津', side: 'l' },
  { key: 'gaobeidian', name: '高碑店', lat: 39.33, lon: 115.87, prov: '河北', side: 'r', dy: 5 },
  { key: 'dingzhou', name: '定州', lat: 38.516, lon: 114.990, prov: '河北', side: 'r' },
  { key: 'zhengding', name: '正定', lat: 38.146, lon: 114.574, prov: '河北', side: 'l' },
  { key: 'anyang', name: '安阳', lat: 36.096, lon: 114.352, prov: '河南', side: 'r' },
  { key: 'xian', name: '西安', lat: 34.26, lon: 108.94, prov: '陕西', side: 'r' },
  { key: 'nanjing', name: '南京', lat: 32.04, lon: 118.79, prov: '江苏', side: 'r' },
  { key: 'hangzhou', name: '杭州', lat: 30.198, lon: 120.130, prov: '浙江', side: 'r' },
  { key: 'linan', name: '临安', lat: 30.23, lon: 119.72, prov: '浙江', side: 'l' },
  { key: 'ningbo', name: '宁波', lat: 29.94, lon: 121.55, prov: '浙江', side: 'l', dy: 15 },
  { key: 'ninghai', name: '宁海', lat: 29.29, lon: 121.43, prov: '浙江', side: 'l', dy: 12 },
  {"key": "yixian", "name": "义县", "lat": 41.542778, "lon": 121.2425, "prov": "辽宁"},
  {"key": "zhuozhou", "name": "涿州", "lat": 39.49806, "lon": 115.96528, "prov": "河北"},
  {"key": "laiyuan", "name": "涞源", "lat": 39.352778, "lon": 114.681944, "prov": "河北"},
  {"key": "dazu", "name": "大足", "lat": 29.75482, "lon": 105.793991, "prov": "重庆"},
  {"key": "anyue", "name": "安岳", "lat": 29.926055, "lon": 105.62103889, "prov": "四川"},
  {"key": "yuxian", "name": "蔚县", "lat": 39.8486583, "lon": 114.56389, "prov": "河北"},
  {"key": "taiyuan", "name": "太原", "lat": 37.709, "lon": 112.434906, "prov": "山西"},
  {"key": "qingzhou", "name": "庆州", "lat": 44.204372, "lon": 118.520645, "prov": "内蒙古"},
  {"key": "fuzhou", "name": "福州", "lat": 26.103214, "lon": 119.292097, "prov": "福建"},
  {"key": "xixian", "name": "隰县", "lat": 36.70158611, "lon": 110.92665889, "prov": "山西"},
  {"key": "hunyuan", "name": "浑源", "lat": 39.700833, "lon": 113.685833, "prov": "山西"},
  {"key": "jingning", "name": "景宁", "prov": "浙江", "lat": 27.80944, "lon": 119.58722},
  {"key": "dingxiang", "name": "定襄", "prov": "山西", "lat": 38.629167, "lon": 113.055278},
  {"key": "wuyi", "name": "武义", "prov": "浙江", "lat": 28.712177, "lon": 119.601982},
  {"key": "jinhua", "name": "金华", "prov": "浙江", "lat": 29.102694, "lon": 119.654278},
  {"key": "dengfeng", "name": "登封", "prov": "河南", "lat": 34.5016111, "lon": 113.0159167},
  {"key": "ruicheng", "name": "芮城", "prov": "山西", "lat": 34.723333, "lon": 110.6875},
  {"key": "wanrong", "name": "万荣", "prov": "山西", "lat": 35.4166667, "lon": 110.8291667},
  {"key": "chaoyang", "name": "朝阳", "prov": "辽宁", "lat": 41.443889, "lon": 120.115111},
  {"key": "fanshi", "name": "繁峙", "prov": "山西", "lat": 39.148056, "lon": 113.374167},
  {"key": "quanzhou", "name": "泉州", "prov": "福建", "lat": 24.90889, "lon": 118.58556},
  {"key": "changzhi", "name": "长治", "prov": "山西", "lat": 36.22785, "lon": 113.076681},
  {"key": "yongji", "name": "永济", "prov": "山西", "lat": 34.84, "lon": 110.265},
  {"key": "jiexiu", "name": "介休", "prov": "山西", "lat": 37.03417, "lon": 111.92444},
  {"key": "dali", "name": "大理", "prov": "云南", "lat": 25.7084889, "lon": 100.1459389},
  {"key": "jizhou", "name": "蓟州", "prov": "天津", "lat": 40.044167, "lon": 117.396667},
  {"key": "qufu", "name": "曲阜", "prov": "山东", "lat": 35.595844, "lon": 116.984863},
  {"key": "yaan", "name": "雅安", "prov": "四川", "lat": 30.02333, "lon": 103.05278},
  {"key": "zitong", "name": "梓潼", "prov": "四川", "lat": 31.624175, "lon": 105.15345},
  {"key": "taian", "name": "泰安", "prov": "山东", "lat": 36.195, "lon": 117.125},
  {"key": "fengfeng", "name": "峰峰", "prov": "河北", "lat": 36.53295, "lon": 114.15928},
  {"key": "xianyou", "name": "仙游", "prov": "福建", "lat": 25.662222, "lon": 118.591944},
  {"key": "jp_ikaruga", "name": "斑鸠", "prov": "奈良县", "country": "JP", "lat": 34.614261, "lon": 135.7344},
  {"key": "jp_nara", "name": "奈良", "prov": "奈良县", "country": "JP", "lat": 34.680654, "lon": 135.8123},
  {"key": "jp_uji", "name": "宇治", "prov": "京都府", "country": "JP", "lat": 34.889283, "lon": 135.80765},
  {"key": "jp_kyoto", "name": "京都", "prov": "京都府", "country": "JP", "lat": 34.987344, "lon": 135.7668},
];

PLACES.push({"key": "huzhou", "name": "湖州", "prov": "浙江", "lat": 30.875, "lon": 120.101611},
{"key": "songyang", "name": "松阳", "prov": "浙江", "lat": 28.456769, "lon": 119.453211},
{"key": "suzhou", "name": "苏州", "prov": "江苏", "lat": 31.318172, "lon": 120.603622},
{"key": "lianyungang", "name": "连云港", "prov": "江苏", "lat": 34.64917, "lon": 119.25556},
{"key": "tianchishan", "name": "天池山", "prov": "江苏", "lat": 31.2983, "lon": 120.474},
{"key": "dongshan_suzhou", "name": "东山", "prov": "江苏", "lat": 31.058611, "lon": 120.368887},
{"key": "xinchang", "name": "新昌", "prov": "浙江", "lat": 29.496669, "lon": 120.895556},
{"key": "luzhi", "name": "甪直", "prov": "江苏", "lat": 31.275428, "lon": 120.878178},
{"key": "qingyuan_zj", "name": "庆元", "prov": "浙江", "lat": 27.493889, "lon": 119.175667},
{"key": "shaoxing", "name": "绍兴", "prov": "浙江", "lat": 30.002247, "lon": 120.587772},
{"key": "dongtai", "name": "东台", "prov": "江苏", "lat": 32.834004, "lon": 120.283357});

PLACES.push({"key": "hn_开封", "name": "开封", "prov": "河南", "lat": 34.79523, "lon": 114.357012},
{"key": "hn_gongyi", "name": "巩义", "prov": "河南", "lat": 34.788729, "lon": 112.985619},
{"key": "hn_xunxian", "name": "浚县", "prov": "河南", "lat": 35.663, "lon": 114.556761},
{"key": "hn_weihui", "name": "卫辉", "prov": "河南", "lat": 35.463389, "lon": 114.080611},
{"key": "hn_xinxiang", "name": "新乡", "prov": "河南", "lat": 35.41921, "lon": 113.92035},
{"key": "hn_jiyuan", "name": "济源", "prov": "河南", "lat": 35.104722, "lon": 112.575},
{"key": "hn_ruzhou", "name": "汝州", "prov": "河南", "lat": 34.22785, "lon": 112.89092},
{"key": "hn_pingdingshan", "name": "平顶山", "prov": "河南", "lat": 33.813056, "lon": 113.192931},
{"key": "hn_sheqi", "name": "社旗", "prov": "河南", "lat": 33.057558, "lon": 112.939975},
{"key": "hn_nanyang", "name": "南阳", "prov": "河南", "lat": 32.980192, "lon": 112.501578},
{"key": "hn_yongcheng", "name": "永城", "prov": "河南", "lat": 33.942175, "lon": 116.373177},
{"key": "hn_zhoukou", "name": "周口", "prov": "河南", "lat": 33.633261, "lon": 114.640111},
{"key": "hn_yuzhou", "name": "禹州", "prov": "河南", "lat": 34.16734, "lon": 113.46337},
{"key": "hn_sanmenxia", "name": "三门峡", "prov": "河南", "lat": 34.791667, "lon": 111.148611},
{"key": "hn_linying", "name": "临颍", "prov": "河南", "lat": 33.718333, "lon": 113.961667},
{"key": "hb_赵县", "name": "赵县", "prov": "河北", "lat": 37.733778, "lon": 114.765972},
{"key": "hb_易县", "name": "易县", "prov": "河北", "lat": 39.355843, "lon": 115.418318},
{"key": "hb_dingxing", "name": "定兴", "prov": "河北", "lat": 39.291871, "lon": 115.717729},
{"key": "hb_quyang", "name": "曲阳", "prov": "河北", "lat": 38.619675, "lon": 114.690165},
{"key": "hb_chengde", "name": "承德", "prov": "河北", "lat": 41.002881, "lon": 117.9364},
{"key": "hb_zunhua", "name": "遵化", "prov": "河北", "lat": 40.146, "lon": 117.6815},
{"key": "hb_yutian", "name": "玉田", "prov": "河北", "lat": 39.81121, "lon": 117.92016},
{"key": "hb_xuanhua", "name": "宣化", "prov": "河北", "lat": 40.6125, "lon": 115.05611},
{"key": "hb_huailai", "name": "怀来", "prov": "河北", "lat": 40.45135, "lon": 115.3088},
{"key": "hb_shexian", "name": "涉县", "prov": "河北", "lat": 36.643333, "lon": 113.617222},
{"key": "hb_xingtai", "name": "邢台", "prov": "河北", "lat": 37.0736, "lon": 114.50577},
{"key": "hb_lincheng", "name": "临城", "prov": "河北", "lat": 37.43778, "lon": 114.50167},
{"key": "hb_cangxian", "name": "沧县", "prov": "河北", "lat": 38.206056, "lon": 117.015889},
{"key": "hb_jingxian", "name": "景县", "prov": "河北", "lat": 37.69258, "lon": 116.26308},
{"key": "sx_shuozhou", "name": "朔州", "prov": "山西", "lat": 39.3131, "lon": 112.425739},
{"key": "sx_taigu", "name": "太谷", "prov": "山西", "lat": 37.42222, "lon": 112.55167},
{"key": "sx_yuci", "name": "榆次", "prov": "山西", "lat": 37.67881, "lon": 112.746},
{"key": "sx_fenyang", "name": "汾阳", "prov": "山西", "lat": 37.344444, "lon": 111.9175},
{"key": "sx_yuncheng", "name": "运城", "prov": "山西", "lat": 34.91056, "lon": 110.84333},
{"key": "sx_xinjiang", "name": "新绛", "prov": "山西", "lat": 35.661688, "lon": 111.200707},
{"key": "sx_jishan", "name": "稷山", "prov": "山西", "lat": 35.592517, "lon": 110.93836},
{"key": "sx_xiangfen", "name": "襄汾", "prov": "山西", "lat": 35.84111, "lon": 111.41333},
{"key": "sx_zezhou", "name": "泽州", "prov": "山西", "lat": 35.54639, "lon": 112.93667},
{"key": "sx_yangcheng", "name": "阳城", "prov": "山西", "lat": 35.50167, "lon": 112.56},
{"key": "sx_lingchuan", "name": "陵川", "prov": "山西", "lat": 35.76389, "lon": 113.25222},
{"key": "sx_zhangzi", "name": "长子", "prov": "山西", "lat": 35.982502, "lon": 112.933193});

PLACES.push({ key: "sd_changqing", name: "长清", prov: "山东", country: "CN", lat: 36.364722, lon: 116.979722 });

PLACES.push(
{"key":"huian_chongwu","name":"惠安·崇武","prov":"福建","country":"CN","lat":24.87917,"lon":118.93056,"source_page":"https://zh.wikipedia.org/wiki/崇武古城","coordinate_note":"崇武古城附近地区的近似显示点，非南门楼实测坐标。"},
{"key":"yongding_gaobei","name":"永定·高北","prov":"福建","country":"CN","lat":24.66306,"lon":117.00417,"source_page":"https://zh.wikipedia.org/wiki/承启楼","coordinate_note":"高北土楼群的近似地区显示点，非各楼实测坐标。"},
{"key":"jinan_liubu","name":"济南·柳埠","prov":"山东","country":"CN","lat":36.4529389,"lon":117.1298194,"source_page":"https://zh.wikipedia.org/wiki/四门塔","coordinate_note":"柳埠神通寺附近的地区代表点，非全部塔体实测坐标。"},
{"key":"zoucheng","name":"邹城","prov":"山东","country":"CN","lat":35.3905389,"lon":116.9683111,"source_page":"https://zh.wikipedia.org/wiki/孟庙","coordinate_note":"孟庙所在城区的近似显示点，非城市中心或单殿实测坐标。"}
);

PLACES.push(
{"key":"sn_changan_xingjiao","name":"长安·兴教寺","lat":34.0913889,"lon":109.0338889,"source_page":"https://zh.wikipedia.org/wiki/兴教寺塔","prov":"陕西","country":"CN","coordinate_note":"来源条目所列地点的近似显示点，非本项目实测坐标。"},
{"key":"sn_changan_xiangji","name":"长安·香积寺","lat":34.12457,"lon":108.888,"source_page":"https://zh.wikipedia.org/wiki/香积寺_(西安)","prov":"陕西","country":"CN","coordinate_note":"来源条目所列地点的近似显示点，非本项目实测坐标。"},
{"key":"sn_jingyang","name":"泾阳","lat":34.53056,"lon":108.83525,"source_page":"https://zh.wikipedia.org/wiki/泾阳县","prov":"陕西","country":"CN","coordinate_note":"县市城区近似显示点，非塔体实测坐标。"},
{"key":"sn_qianling","name":"乾县·乾陵","lat":34.5731583,"lon":108.2185944,"source_page":"https://zh.wikipedia.org/wiki/乾陵","prov":"陕西","country":"CN","coordinate_note":"来源条目所列地点的近似显示点，非本项目实测坐标。"},
{"key":"sn_hancheng","name":"韩城","lat":35.4605556,"lon":110.4352778,"source_page":"https://zh.wikipedia.org/wiki/韩城文庙","prov":"陕西","country":"CN","coordinate_note":"来源条目所列地点的近似显示点，非本项目实测坐标。"},
{"key":"sn_daqin","name":"周至·大秦寺","lat":34.0589089,"lon":108.3077711,"source_page":"https://zh.wikipedia.org/wiki/大秦寺塔","prov":"陕西","country":"CN","coordinate_note":"来源条目所列地点的近似显示点，非本项目实测坐标。"},
{"key":"sn_yanan","name":"延安","lat":36.5855,"lon":109.4897,"source_page":"https://zh.wikipedia.org/wiki/延安市","prov":"陕西","country":"CN","coordinate_note":"县市城区近似显示点，非塔体实测坐标。"}
);

PLACES.push(
{"key":"gd_guangzhou","name":"广州·陈家祠","prov":"广东","lat":23.1297583,"lon":113.2405,"source_page":"https://zh.wikipedia.org/wiki/陈家祠","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"gd_foshan","name":"佛山·祖庙","prov":"广东","lat":23.03139,"lon":113.10833,"source_page":"https://zh.wikipedia.org/wiki/佛山祖庙","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"gd_zhaoqing","name":"肇庆·梅庵","prov":"广东","lat":23.05306,"lon":112.44222,"source_page":"https://zh.wikipedia.org/wiki/梅庵_(肇庆)","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"gd_jinjiangli","name":"开平·锦江里","prov":"广东","lat":22.261781,"lon":112.520761,"source_page":"https://commons.wikimedia.org/wiki/Category:Ruishi_Lou","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"gx_rongxian","name":"容县·真武阁","prov":"广西","lat":22.85834111,"lon":110.55625111,"source_page":"https://zh.wikipedia.org/wiki/经略台真武阁","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"gx_sanjiang","name":"三江·程阳","prov":"广西","lat":25.90056,"lon":109.63778,"source_page":"https://zh.wikipedia.org/wiki/程阳永济桥","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"gx_hepu_yongan","name":"合浦·永安","prov":"广西","lat":21.5541056,"lon":109.6791528,"source_page":"https://zh.wikipedia.org/wiki/大士阁","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"gx_gongcheng","name":"恭城·文庙","prov":"广西","lat":24.834444,"lon":110.822639,"source_page":"https://zh.wikipedia.org/wiki/恭城文庙","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"}
);

PLACES.push(
{"key":"hu_yueyang_city","name":"岳阳·岳阳楼","prov":"湖南","lat":29.3847306,"lon":113.0883389,"source_page":"https://zh.wikipedia.org/wiki/岳阳楼","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"hu_nanyue","name":"衡阳·南岳","prov":"湖南","lat":27.2485194,"lon":112.7288611,"source_page":"https://zh.wikipedia.org/wiki/南岳大庙","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"hu_zhanggu","name":"岳阳县·张谷英","prov":"湖南","lat":29.00626,"lon":113.48145,"source_page":"https://zh.wikipedia.org/wiki/张谷英镇","coordinate_note":"镇级近似地图显示点，不代表所绘各栋民居的实测坐标。","country":"CN"},
{"key":"hu_zhijiang","name":"芷江·天后宫","prov":"湖南","lat":27.44,"lon":109.67861,"source_page":"https://zh.wikipedia.org/wiki/芷江天后宫","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"},
{"key":"hb_wudang","name":"十堰·武当山","prov":"湖北","lat":32.40083,"lon":111.00389,"source_page":"https://zh.wikipedia.org/wiki/武当山","coordinate_note":"武当山地点的近似地图显示点，金殿与紫霄宫共用地域点，不代表两殿坐标相同。","country":"CN"},
{"key":"hb_dangyang","name":"当阳·玉泉寺","prov":"湖北","lat":30.790278,"lon":111.680556,"source_page":"https://commons.wikimedia.org/wiki/File:%E5%BD%93%E9%98%B3%E7%8E%89%E6%B3%89%E5%AF%BA%E9%93%81%E5%A1%94.jpg","coordinate_note":"参考照片拍摄点的近似显示位置，非铁塔测绘坐标。","country":"CN"},
{"key":"hb_zhongxiang","name":"钟祥·显陵","prov":"湖北","lat":31.205675,"lon":112.62976,"source_page":"https://zh.wikipedia.org/wiki/明显陵","country":"CN","coordinate_note":"来源地点的近似地图显示点，非本项目实测坐标。"}
);

PLACES.push(
{"key":"gs_jiayu","name":"嘉峪关·关城","lat":39.801042,"lon":98.214256,"source_page":"https://commons.wikimedia.org/wiki/File:Jiayuguan_Gatetower_(20230919150124).jpg","coordinate_note":"参考照片拍摄点的近似显示位置，非关楼测绘坐标。","prov":"甘肃","country":"CN"},
{"key":"gs_zhangye","name":"张掖·大佛寺","lat":38.93,"lon":100.45472,"source_page":"https://zh.wikipedia.org/wiki/张掖大佛寺","coordinate_note":"寺院地点的近似显示点，非所绘土塔的实测坐标。","prov":"甘肃","country":"CN"},
{"key":"gs_tianshui","name":"天水·伏羲庙","lat":34.578737,"lon":105.704117,"source_page":"https://commons.wikimedia.org/wiki/File:%E4%BC%8F%E7%BE%B2%E5%BA%99%E5%86%85_01.jpg","coordinate_note":"参考照片拍摄点的近似显示位置，非仪门测绘坐标。","prov":"甘肃","country":"CN"},
{"key":"gs_yongjing","name":"永靖·炳灵寺","lat":35.810403,"lon":103.048592,"source_page":"https://commons.wikimedia.org/wiki/File:Bingling_Temple_03.jpg","coordinate_note":"参考照片拍摄点的近似显示位置，非大佛测绘坐标。","prov":"甘肃","country":"CN"}
);

PLACES.push(
  { key: 'sd_liaocheng', name: '聊城', prov: '山东', country: 'CN', lat: 36.4571, lon: 115.9863, source_page: 'https://zh.wikipedia.org/wiki/聊城市', coordinate_note: '城市近似地图显示点，非光岳楼实测坐标。' },
  { key: 'sd_yantai', name: '烟台', prov: '山东', country: 'CN', lat: 37.4644, lon: 121.4478, source_page: 'https://zh.wikipedia.org/wiki/烟台市', coordinate_note: '城市近似地图显示点，非福建会馆实测坐标。' },
  { key: 'sd_jinan', name: '济南', prov: '山东', country: 'CN', lat: 36.63333, lon: 117.01667, source_page: 'https://zh.wikipedia.org/wiki/济南市', coordinate_note: '城市近似地图显示点，非洪家楼教堂实测坐标；柳埠古塔另用地区代表点。' },
  { key: 'sd_qingdao', name: '青岛', prov: '山东', country: 'CN', lat: 36.083, lon: 120.333, source_page: 'https://zh.wikipedia.org/wiki/青岛市', coordinate_note: '城市近似地图显示点，两座教堂共用地域点，不代表单体坐标相同。' },
  { key: 'sd_jining', name: '济宁', prov: '山东', country: 'CN', lat: 35.415, lon: 116.587, source_page: 'https://zh.wikipedia.org/wiki/济宁市', coordinate_note: '城市近似地图显示点，非铁塔实测坐标。' }
);

PLACES.push(
{"key": "hb_shanhaiguan", "name": "山海关", "prov": "河北", "lat": 40.012, "lon": 119.754, "country": "CN", "coordinate_note": "地区近似地图显示点，非所绘主体实测坐标。"},
{"key": "hb_baoding", "name": "保定", "prov": "河北", "lat": 38.86, "lon": 115.49, "country": "CN", "coordinate_note": "地区近似地图显示点，非所绘主体实测坐标。"},
{"key": "hb_fengrun", "name": "丰润", "prov": "河北", "lat": 39.8227, "lon": 118.1166, "country": "CN", "coordinate_note": "地区近似地图显示点，非所绘主体实测坐标。"},
{"key": "hb_zhangjiakou", "name": "张家口", "prov": "河北", "lat": 40.842, "lon": 114.877, "country": "CN", "coordinate_note": "地区近似地图显示点，非所绘主体实测坐标。"}
);

PLACES.push(...[
  {
    "key": "sh_songjiang",
    "name": "松江",
    "prov": "上海",
    "country": "CN",
    "lat": 31.0065,
    "lon": 121.2417
  },
  {
    "key": "shanghai",
    "name": "上海",
    "prov": "上海",
    "country": "CN",
    "lat": 31.2304,
    "lon": 121.4737
  }
]);

// 安徽补遗：以现存所绘主体断代，新增条目默认未到访。
SITES.push({
  id: 'ah_xuguo', name: '许国石坊', short: '许国石坊', sub: '大学士坊 · 正立面',
  dyn: 'ming', tag: '明', era: '万历十二年', year: 1584, yearLabel: '1584', yearApprox: false,
  yearNote: '采用石坊营建年；图版只绘八柱四面石坊的一侧正立面。',
  place: '安徽 · 黄山 · 歙县', placeKey: 'ah_shexian', country: 'CN', types: ['gate'], initialStatus: 'unvisited',
  legacyNames: ['大学士坊', '八脚牌楼', '许国牌坊'],
  lede: '八根石柱围起四面牌坊，许国石坊把一座平面的门楼变成可穿行的石构空间。梁枋、斗栱与石狮都从同一种灰石中雕出，仍立在徽州古城的街口。',
  facts: [
    '建于明万历十二年（1584），为大学士许国而立，又称大学士坊；1988年列为全国重点文物保护单位。',
    '四面八柱，前后为三间四柱三楼，左右为单间双柱三楼，共同围成长方形；石构仿木的梁枋与斗栱之间遍饰雕刻。',
    '图版仅绘一侧正立面，呈现四根前柱与三处通道，不把八根柱子排成一列；省略铭文与街市背景。'
  ],
  caption: ['许国石坊 · 一侧正立面', '明 · 1584 · 四面八柱石坊'],
}, {
  id: 'ah_zhenfeng', name: '安庆振风塔', short: '振风塔', sub: '迎江寺 · 七层八角砖石塔',
  dyn: 'ming', tag: '明', era: '隆庆年间 · 后世修缮', year: 1570, yearLabel: '约1570', yearApprox: true,
  yearNote: '按明隆庆年间所绘塔身断代，以通行建成纪年1570定位；地方文献另有1572年建成说。附檐、屋面与塔刹呈现照片中的修缮后状态。',
  place: '安徽 · 安庆 · 迎江寺', placeKey: 'ah_anqing', country: 'CN', types: ['pagoda'], initialStatus: 'unvisited',
  legacyNames: ['振风塔', '迎江寺塔', '安庆万佛塔'], tall: true,
  lede: '振风塔从安庆迎江寺内拔起，七层八角的楼阁轮廓逐层收分，檐口与平座让砖石塔身有了层次。它临近长江，既是佛教寺院中的高塔，也是辨认城市滨江景观的地标。常用建成记年为明隆庆四年，塔体后来又经历维修；观察层层转折与内外交通，比只记一个高度数字，更能理解这座晚明古塔的建筑特点。',
  facts: [
    '塔为七层八角楼阁式砖石建筑，层高与平面逐级收分，腰檐和平座分隔塔身；内设石阶盘旋而上，外部轮廓与登临路线彼此呼应。',
    '通行资料记振风塔于明隆庆四年建成，现存主体也经历后世维修；这一晚明定位应与寺院沿革区别，不能理解为今日每处构件均未更换。',
    '塔内佛像和碑刻使寺院信仰与地方历史保留在同一建筑中，临江的位置又令其成为安庆地标；从塔的比例和层次可读出楼阁式古塔的特点。'
  ],
  caption: ['振风塔 · 七层八角塔身与底层附檐', '明 · 隆庆年间 · 后世修缮现状'],
}, {
  id: 'ah_huaxilou', name: '亳州花戏楼', short: '花戏楼', sub: '大关帝庙 · 院内戏台',
  dyn: 'ming', tag: '清', era: '康熙十五年', year: 1676, yearLabel: '1676', yearApprox: false,
  yearNote: '采用院内戏台增建年1676，不以大关帝庙始建年1656代替；木雕、彩绘与屋面经历后续重修。',
  place: '安徽 · 亳州 · 谯城', placeKey: 'ah_bozhou', country: 'CN', types: ['stage'], initialStatus: 'unvisited',
  legacyNames: ['亳州大关帝庙', '亳州山陕会馆'],
  lede: '亳州花戏楼的中央戏台立在大关帝庙内，开敞台口、屋檐与雕刻木构把演出空间集中在观众面前。这里原是山陕商人营建的会馆，祭祀关帝、同乡聚议与戏曲娱乐相互联系。寺庙初建和增建戏楼属于不同年代，后世也不断修饰；今天看戏台及其装饰，能理解商贸社群如何把信仰、交往和工艺留在建筑里。',
  facts: [
    '戏台以开敞台口面向院内观演空间，屋顶与檐下木雕集中表现装饰层次；其位置在大关帝庙内，与会馆其他建筑共同组成祭祀和聚会场所。',
    '大关帝庙始建于清顺治十三年，康熙十五年的创建戏楼题名碑记下增建戏台的经过；此后仍有重修，不能将寺庙初创当作戏楼建成年。',
    '山西、陕西商人营建会馆，既奉祀关帝，也为同乡提供聚议与安身空间；戏曲和雕刻装饰使商业往来的社会关系，转化为可以共同观看的文化。'
  ],
  caption: ['花戏楼 · 院内中央戏台', '清 · 1676增建 · 后世重修'],
});

PLACES.push(
  { key: 'ah_shexian', name: '歙县', prov: '安徽', country: 'CN', lat: 29.867639, lon: 118.430556 },
  { key: 'ah_anqing', name: '安庆', prov: '安徽', country: 'CN', lat: 30.503631, lon: 117.049300 },
  { key: 'ah_bozhou', name: '亳州', prov: '安徽', country: 'CN', lat: 33.886389, lon: 115.767500 }
);

// 河南补遗：新增条目默认未到访，保持旧条目与个人记录关联。
SITES.push({
  "id": "hn_miaole",
  "name": "妙乐寺塔",
  "short": "妙乐寺塔",
  "sub": "后周重修 · 方形密檐砖塔",
  "dyn": "zhou",
  "tag": "五代",
  "era": "后周 · 显德二年重修",
  "year": 955,
  "yearLabel": "955",
  "yearApprox": false,
  "yearNote": "采用后周显德二年（955）重修纪年，塔的早期沿革另述，不按传说年代定位。",
  "place": "河南 · 焦作 · 武陟县",
  "placeKey": "hn_wuzhi",
  "placeName": "武陟",
  "types": [
    "pagoda"
  ],
  "tall": true,
  "timelineLane": "north",
  "legacyNames": [
    "妙乐寺真身舍利塔",
    "佛祖真身舍利塔"
  ],
  "lede": "妙乐寺塔在武陟平原上保持方正塔身与层层收拢的十三重砖檐，顶端塔刹和细链又把沉稳轮廓引向高处。寺院旧貌虽已改变，古塔仍能让人辨认五代砖作的组织方式。后周重修的纪年有明确记载，早期寺塔与舍利传说则属于更长的沿革；洪水淤积留下的地面变化，也提醒人们古建筑经历的不只是年月。",
  "facts": [
    "塔为方形中空砖塔，十三级密檐用叠涩砖作逐层外挑，轮廓向上收分；南面小龛与下部砖雕形成不同节奏，顶部塔刹不计入十三层檐数。",
    "现存塔取后周显德二年即九五五年的重修纪年，资料记在隋唐塔基础上修建；早期寺塔沿革与舍利传说，不能替代现存主体的可核定年代。",
    "历次洪水淤积改变周边地面，塔基曾被掩埋，而密檐与塔刹仍保留高处轮廓；它把砖塔技术、地方水文环境和寺院兴衰放在同一处遗存中。"
  ],
  "caption": [
    "武陟妙乐寺塔 · 十三级密檐",
    "后周 · 955年重修"
  ],
  "country": "CN",
  "province": "河南",
  "initialStatus": "unvisited"
},
{
  "id": "hn_fawang",
  "name": "法王寺塔",
  "short": "法王寺塔",
  "sub": "唐代大塔 · 上部局部",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐代 · 具体建塔年未定",
  "year": 750,
  "yearLabel": "唐代",
  "yearApprox": true,
  "yearNote": "750仅为唐代遗存的约略年表定位，不代表确切建塔年；不采用东汉建寺年。图版不含树木遮挡的下部塔身与券门。",
  "place": "河南 · 登封 · 嵩山",
  "placeKey": "dengfeng",
  "placeName": "登封",
  "types": [
    "pagoda"
  ],
  "tall": true,
  "legacyNames": [
    "法王寺大塔",
    "法王寺舍利塔",
    "法王寺一号塔"
  ],
  "lede": "法王寺唐代大塔的上部，以十五重密檐向上收出柔和曲线，叠涩砖层的明暗把方形塔体分成连续节奏。现状塔顶的残损仍可见，昔日塔刹没有完整保存。寺院内还分布不同时代的塔，眼前大塔是其中的唐代遗存；从高处轮廓辨认其形制，比把寺院初创传说当作建塔年代更能接近这座古塔的真实历史。",
  "facts": [
    "大塔为方形十五级密檐式砖塔，塔身以上砖檐层层外叠并向上收分，整体轮廓近似抛物线；上部小孔与叠涩砖层可见，顶端宝刹已损毁。",
    "郑州市文物局将这座密檐大塔列为唐代遗存，确切建年尚未明确；约七五〇年只是年表定位，不能将法王寺更早的建寺年直接作为建塔纪年。",
    "塔群另有单层砖塔以及元、清遗塔，形制与年代各不相同；大塔的十五重密檐和方形轮廓，为比较嵩山佛教建筑长期使用的不同塔式提供参照。"
  ],
  "caption": [
    "法王寺塔 · 十五重密檐与塔顶局部",
    "唐代 · 建塔确年未定"
  ],
  "country": "CN",
  "province": "河南",
  "initialStatus": "unvisited"
},
{
  "id": "hn_songling",
  "name": "北宋皇陵",
  "short": "北宋皇陵",
  "sub": "永昭陵 · 文官石像",
  "dyn": "song",
  "tag": "宋",
  "era": "北宋 · 嘉祐八年",
  "year": 1063,
  "yearLabel": "1063",
  "yearApprox": false,
  "yearNote": "1063为永昭陵营建纪年，所绘为陵前原存文官石像；不表示宋陵各陵同年建成，也不将现代复建门阙归为宋构。",
  "place": "河南 · 巩义 · 永昭陵",
  "placeKey": "hn_gongyi",
  "placeName": "巩义",
  "types": [
    "tomb",
    "sculpture"
  ],
  "tall": true,
  "legacyNames": [
    "宋陵",
    "巩义宋陵",
    "永昭陵",
    "宋仁宗永昭陵"
  ],
  "lede": "长袍垂落，双手执笏，文官石像以肃立的姿态守在永昭陵神道旁。风化削弱了细部，却没有抹去北宋陵寝仪仗中庄重而安静的人物轮廓。",
  "facts": [
    "<b>陵墓年代</b> 永昭陵为宋仁宗赵祯陵墓，始建于1063年；本条以它的原存石刻代表北宋皇陵，不拆分各陵计数。",
    "<b>石刻遗存</b> 宋陵神道以人物与动物石像组织仪仗秩序，石雕是研究宋代雕塑和皇家丧葬制度的实物资料。",
    "<b>图版范围</b> 选永昭陵东列自南数第一件文官石像，依据2025年实拍保留冠顶残损、执笏姿态与石座，不收录现代复建门阙。"
  ],
  "caption": [
    "永昭陵 · 文官石像（东列南一）",
    "北宋 · 1063年营陵"
  ],
  "country": "CN",
  "province": "河南",
  "initialStatus": "unvisited"
},
{
  "id": "hn_bixia",
  "name": "浚县碧霞宫",
  "short": "碧霞宫",
  "sub": "正殿前部 · 拜殿立面",
  "dyn": "ming",
  "tag": "明清",
  "era": "明 · 嘉靖二十一年始建，后世续修",
  "year": 1542,
  "yearLabel": "1542起",
  "yearApprox": false,
  "yearNote": "1542为资料记载的正殿始建纪年，明清历次重修形成现貌；图版仅为前部拜殿，不把未见的后殿屋面纳入绘制。",
  "place": "河南 · 鹤壁 · 浚县浮丘山",
  "placeKey": "hn_xunxian",
  "placeName": "浚县",
  "types": [
    "hall"
  ],
  "tall": false,
  "legacyNames": [
    "浮丘山碧霞宫",
    "碧霞元君行宫",
    "浚县圣母庙"
  ],
  "lede": "卷棚屋面舒展在木雕和彩绘之上，红色门柱围住深暗的殿门。浮丘山上的碧霞宫，以拜殿与正殿相连的布局保存了明清民间宫观的繁密工艺。",
  "facts": [
    "<b>营建与续修</b> 资料将正殿始建记为明嘉靖二十一年（1542），此后明清多次修缮扩建；现貌不等于全部构件均为初建原件。",
    "<b>殿堂组合</b> 前部卷棚歇山拜殿与后部悬山正殿相连，前檐木雕、透雕窗和彩绘构成丰富的立面。",
    "<b>取景说明</b> 依2024年正面实拍绘前部拜殿，省略邻殿、树木、供具及文字；台缘与侧阶作概括，不复原被遮挡的中部御路雕刻。"
  ],
  "caption": [
    "碧霞宫 · 正殿前部拜殿立面",
    "明代始建 · 明清续修"
  ],
  "country": "CN",
  "province": "河南",
  "initialStatus": "unvisited"
});
PLACES.push({
  "key": "hn_wuzhi",
  "name": "武陟",
  "prov": "河南",
  "country": "CN",
  "lat": 35.074947,
  "lon": 113.320503
});

// 宁夏补遗：默认未到访；局部主体与约略断代在各条目明确说明。
SITES.push({
  "id": "nx_xumishan",
  "name": "须弥山石窟",
  "short": "须弥山",
  "sub": "第5窟弥勒大佛 · 胸膝局部",
  "dyn": "tang",
  "tag": "唐",
  "era": "唐代造像 · 石窟北魏始凿",
  "year": 750,
  "yearLabel": "唐代",
  "yearApprox": true,
  "yearNote": "750仅作第5窟唐代大佛的约略年表定位，不是确切开凿年；不以石窟北魏初创年代代替所绘主体。",
  "place": "宁夏固原 · 原州区 · 须弥山",
  "placeKey": "nx_guyuan",
  "types": [
    "grotto",
    "sculpture"
  ],
  "initialStatus": "unvisited",
  "legacyNames": [
    "须弥山大佛",
    "须弥山弥勒大佛"
  ],
  "lede": "须弥山第五窟的大佛从山崖中雕出，丰厚胸膛与端坐膝部使石壁有了人体的尺度。它是唐代弥勒坐像，属于一个自北魏开始、经过多个朝代继续营造的石窟群。近看衣纹与体量的关系，比单记石窟初创年代更能理解这尊大佛；现状中的风化、残损与修缮痕迹，也记录了石雕在露天环境中的漫长经历。",
  "facts": [
    "第五窟在大型石龛内雕出约二十米高的弥勒坐像，胸膛与膝部形成饱满体块；贴体袈裟和自然衣纹，使巨大的造像仍保有柔和的人体感。",
    "须弥山石窟始凿于北魏，第五窟大佛则属唐代大型造像；约八世纪的定位只表示其营造阶段，不能沿用石窟群初创年代为这尊佛像断代。",
    "固原处于丝绸之路东段北道，石窟反映了佛教艺术在当地的传播与变化；这尊大佛以圆润体量体现唐代风格，其保存也依赖历次修缮。"
  ],
  "caption": [
    "须弥山第5窟 · 弥勒大佛胸膝局部",
    "唐代造像 · 依实拍保留风化"
  ],
  "tall": true
},
{
  "id": "nx_xixialing",
  "name": "西夏陵",
  "short": "西夏陵",
  "sub": "3号陵 · 现存夯土陵塔",
  "dyn": "xixia",
  "tag": "西夏",
  "era": "11—13世纪 · 西夏陵墓遗址",
  "year": 1100,
  "yearLabel": "11—13世纪",
  "yearApprox": true,
  "yearNote": "1100仅为西夏时期的约略排序点，不是3号陵的确切营建年；3号陵一般被认为是李元昊泰陵，墓主归属不作为已证实结论。",
  "place": "宁夏银川 · 西夏区 · 贺兰山东麓",
  "placeKey": "nx_yinchuan",
  "types": [
    "tomb"
  ],
  "initialStatus": "unvisited",
  "legacyNames": [
    "西夏王陵",
    "西夏帝陵",
    "泰陵"
  ],
  "lede": "西夏三号陵的陵塔如今呈高大的黄土体，表面层层收束，风雨侵蚀留下深浅不一的沟痕。它是十一至十三世纪西夏陵园的地面遗存，而不是一座保存完整屋檐的楼阁。陵塔之外，城墙、阙台与祭祀建筑遗址共同构成陵园；三号陵常被推测为李元昊之陵，但这一归属仍应与确证的身份区别来看。",
  "facts": [
    "三号陵现存陵塔以黄土混合砾石夯筑，塔体向上收束；今天可见的是失去外部装饰后的土体，需与周围陵城、献殿等遗址一起理解。",
    "西夏陵园形成于十一至十三世纪，三号陵常被推测为开国皇帝李元昊的陵墓；陵主尚不能作为确定结论，约年也不是陵塔的精确施工日期。",
    "陵园布局与出土西夏文、汉文碑片及建筑构件相互印证，反映党项传统与中原礼制、佛教文化的交流；残存夯土仍保有这种复杂历史的线索。"
  ],
  "caption": [
    "西夏陵3号陵 · 现存夯土陵塔",
    "西夏遗址 · 非原貌复原"
  ]
},
{
  "id": "nx_108towers",
  "name": "青铜峡一百零八塔",
  "short": "一百零八塔",
  "sub": "塔群最上三行 · 七塔局部",
  "dyn": "xixia",
  "tag": "西夏",
  "era": "西夏始建说 · 后世重修",
  "year": 1150,
  "yearLabel": "西夏始建",
  "yearApprox": true,
  "yearNote": "1150仅按青铜峡市政府的西夏始建说作约略定位，非确切建造年。1988年国保名录登记时代为元；始建、后世重修与现存砖砌外观须分别看待。",
  "place": "宁夏吴忠 · 青铜峡 · 黄河西岸",
  "placeKey": "nx_qingtongxia",
  "types": [
    "pagoda"
  ],
  "initialStatus": "unvisited",
  "legacyNames": [
    "108塔",
    "一百〇八塔",
    "青铜峡塔群"
  ],
  "lede": "一百零八塔沿黄河岸边的山坡逐层展开，单座塔体不大，整齐的排列却形成鲜明的三角形轮廓。最上方三行共七座塔，分别是一座、三座、三座，是理解全群秩序的入口。塔群与西夏时期的佛教遗存有关，创建确年仍待考；今天的表面与构件也经过修缮，不能把每座塔的现状都视为同一时期的原物。",
  "facts": [
    "塔群顺山势分为十二行，依奇数序列由顶端向下扩大，总计一百零八座；最上三行共七塔，塔座、塔身与塔刹的叠置构成共同的轮廓。",
    "官方地方介绍将塔群联系于西夏时期，但创建确年尚待考，既有登记年代也有不同口径；约十二世纪的定位不代表全部现存塔体同时建成。",
    "覆钵、葫芦等不同塔身形式与有序排列同时存在，使这里适合比较单塔形制和塔群组织；山坡上的整体秩序，比只看一座塔更能体现其特点。"
  ],
  "caption": [
    "一百零八塔 · 最上三行七塔局部",
    "西夏始建说 · 后世重修现貌"
  ]
});
PLACES.push({
  "key": "nx_yinchuan",
  "name": "银川",
  "prov": "宁夏",
  "country": "CN",
  "lat": 38.485,
  "lon": 106.225
},
{
  "key": "nx_qingtongxia",
  "name": "青铜峡",
  "prov": "宁夏",
  "country": "CN",
  "lat": 38.020939,
  "lon": 106.069089
},
{
  "key": "nx_guyuan",
  "name": "固原",
  "prov": "宁夏",
  "country": "CN",
  "lat": 36.008011,
  "lon": 106.278161
});





// 第一批国保补遗：石窟寺、石刻及同组铜铸文物。
SITES.push(...[
  {
    "id": "gs_mogao",
    "name": "莫高窟",
    "short": "莫高窟",
    "sub": "第96窟外部九层楼",
    "dyn": "tang",
    "tag": "唐",
    "era": "第96窟唐代开凿；现见九层楼为后世保护建筑",
    "year": 700,
    "yearLabel": "唐代",
    "place": "甘肃敦煌 · 鸣沙山东麓",
    "placeKey": "gs_dunhuang",
    "types": [
      "grotto"
    ],
    "initialStatus": "unvisited",
    "lede": "九道屋檐沿莫高窟崖面逐层升起，朱红楼柱把岩壁与木构连在一起。这座醒目的九层楼是第96窟大佛的保护楼阁，所护弥勒像始于唐代，眼前楼的九层外形却形成于后世。先分清佛像与保护建筑的年代，再看层层屋面如何回应崖壁高度，才不会把今日外观误认成唐代楼阁。",
    "facts": [
      "楼阁紧贴崖面，九层屋檐在窟口上方逐级展开，承担保护洞窟和大像的作用。第96窟内弥勒像为依崖塑造的巨像，外部楼阁与内部造像是相互关联的两部分。",
      "第九十六窟始建于唐代，保护楼阁则反复改建，二十世纪由五层增建为九层。唐代大像与今日九层木楼各有沿革，不能把早期佛像的年代直接用于外部建筑。",
      "这处地标展示石窟保护建筑怎样随历史改变：楼层增加，佛像仍在原来的岩体中。它的轮廓便于辨认莫高窟，也提醒人们将窟内遗存与窟外现貌分别理解。"
    ],
    "caption": [
      "第96窟外观 · 线稿",
      "现见保护楼阁 · 非唐代原构"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "700仅是第96窟唐代大像的约略年表位置；图绘现见的后世保护楼阁，不能据外观认作唐代楼阁。"
  },
  {
    "id": "gs_yulin",
    "name": "榆林窟",
    "short": "榆林窟",
    "sub": "榆林河谷 · 石窟入口局部",
    "dyn": "tang",
    "tag": "唐",
    "era": "唐代起持续开凿",
    "year": 800,
    "yearLabel": "唐代起",
    "place": "甘肃瓜州 · 榆林河谷",
    "placeKey": "gs_guazhou",
    "types": [
      "grotto"
    ],
    "initialStatus": "unvisited",
    "lede": "榆林河谷的直立崖壁上，窟口沿岩层接续排列，入口周围的岩面把洞窟与山体的关系直接显露出来。窟内壁画和塑像经历唐、五代、宋、西夏、元等时期的营造，窟外入口又有后世变化。这里未指认某一编号洞窟，只看现状窟口，不能据门洞的外形推定一个统一的开凿年代。",
    "facts": [
      "榆林窟分布于榆林河两岸崖壁，洞窟从岩体内开出，窟口面向河谷。入口附近的岩面与洞口相连，显示其依山开凿的方式，而不是独立于山体的地面建筑。",
      "研究院记载早期创建时间尚无定论，现存遗迹跨越唐至后世多个时期。眼前入口尚未确认窟号，因此只按洞窟群的宽泛年代理解，不给这一窟口赋予确切建年。",
      "榆林窟与莫高窟同属敦煌艺术的重要部分，洞窟、壁画和造像共同保存丝路文化的痕迹。入口只是认识这处遗址的起点，窟内不同年代的艺术不能由外观一概而论。"
    ],
    "caption": [
      "河谷窟口局部 · 线稿",
      "唐代起 · 现状意写"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "图绘未编号的现状窟口，不能据外观判定单窟开凿年；800只供跨朝代洞窟群约略排序。"
  },
  {
    "id": "gs_maijishan",
    "name": "麦积山石窟",
    "short": "麦积山",
    "sub": "第13窟 · 东崖大佛局部",
    "dyn": "sui",
    "tag": "隋",
    "era": "第13窟隋代开凿",
    "year": 600,
    "yearLabel": "隋代",
    "place": "甘肃天水 · 麦积山",
    "placeKey": "gs_tianshui",
    "types": [
      "grotto",
      "sculpture"
    ],
    "initialStatus": "unvisited",
    "lede": "东崖大佛的面容和衣纹紧贴麦积山岩壁展开，体量虽大，表面的细部却来自泥塑。第13窟主尊以石作胎、外覆塑泥，体现雕石与塑土结合的办法。它始于隋代，后来又经修缮，现存表面包含不同时期的工作；眼前局部让人近看大像的神情，不等于整窟造像组合的全貌。",
    "facts": [
      "第13窟主尊为石胎泥塑，先借岩体形成基础，再以泥塑表现面容与衣纹。崖壁支撑大像，塑泥处理细部，两种材料使巨大体量仍保有柔和而细致的表情。",
      "东崖大佛的开凿定为隋代，第十三窟又列入五代至两宋修缮的重要洞窟。造像初创与后续修护形成不同层次，今日可见的每层塑泥和表面色彩并不都属于隋代。",
      "麦积山以塑像见长，这尊大佛展示其中依崖营造的大尺度做法。主尊原与两侧菩萨组成一组，局部观看可以体会塑艺，却仍需区别一尊像与整组龛像的关系。"
    ],
    "caption": [
      "第13窟东崖大佛局部 · 线稿",
      "隋代 · 现状意写"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "第13窟东崖大佛为隋代石胎泥塑；现状经历后代修缮。"
  },
  {
    "id": "xj_kizil",
    "name": "克孜尔千佛洞",
    "short": "克孜尔",
    "sub": "石窟崖壁 · 入口局部",
    "dyn": "qiuci",
    "tag": "龟兹",
    "era": "龟兹时期洞窟群",
    "year": 600,
    "yearLabel": "龟兹时期",
    "place": "新疆拜城 · 木扎提河谷",
    "placeKey": "xj_baicheng",
    "types": [
      "grotto"
    ],
    "initialStatus": "unvisited",
    "lede": "克孜尔石窟的洞口开在山崖上，岩层、窟口与窟前空间共同组成外部景观。这里是古代龟兹佛教艺术的重要遗存，石窟群从约三世纪延续到八至九世纪，内部曾有壁画与泥塑。眼前这一段未明确编号的崖壁，只能联系石窟群的多期历史理解；约六世纪的定位并不等于这些洞口已获得逐窟的精确断代。",
    "facts": [
      "洞窟直接开凿在明屋塔格山的断崖上，入口随岩壁分布；从外部能看见石窟与山体的关系，内部的壁画、泥塑则属于另外一层艺术空间。",
      "官方资料将石窟群营造范围置于约三世纪至八、九世纪；这一未编号崖面局部的确年尚待考，约六世纪只是群体多期历史中的概略定位。",
      "洞窟形制和壁画使克孜尔成为龟兹佛教艺术的代表，也留下佛教沿丝绸之路传播的线索；窟壁的损失提醒人们，洞窟与壁画原本不可分割。"
    ],
    "caption": [
      "崖壁入口局部 · 线稿",
      "龟兹时期洞窟群 · 现状窟口"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "图绘未编号的现状窟口，无法据入口确定具体洞窟年代；600仅作洞窟群的约略年表位置。"
  },
  {
    "id": "xj_kumtura",
    "name": "库木吐喇千佛洞",
    "short": "库木吐喇",
    "sub": "河谷石窟 · 崖面局部",
    "dyn": "qiuci",
    "tag": "龟兹",
    "era": "龟兹时期洞窟群",
    "year": 700,
    "yearLabel": "龟兹时期",
    "place": "新疆库车 · 渭干河谷",
    "placeKey": "xj_kuqa",
    "types": [
      "grotto"
    ],
    "initialStatus": "unvisited",
    "lede": "库木吐喇石窟开在渭干河东岸山崖上，河谷与岩壁为佛教洞窟提供了相连的空间，也给遗址保护带来持续的水害压力。崖面局部显示洞口与岩层的关系，不能代替窟内壁画与题记。石窟群从五世纪延续到十四世纪，留下不同阶段的宗教活动痕迹；约七世纪的时间定位，只概括这一多期遗址的一段历史。",
    "facts": [
      "石窟群沿却勒塔格山崖壁开凿，脚下为渭干河河谷；洞口嵌入砂砾岩层，部分洞窟以走廊相连，外部崖面与内部礼佛空间共同构成遗址。",
      "官方保护报道将开凿年代概括为五世纪至十四世纪；眼前未具体编号的崖面不能逐窟确年，约七世纪的定位也不等同于全群初创之年。",
      "壁画、彩塑与不同文字题记记录了长期佛教活动和文化交流；河水冲刷及岩体脆弱性又使遗址依赖加固和水位管理，山水环境也是理解它的关键。"
    ],
    "caption": [
      "河谷崖面局部 · 线稿",
      "龟兹时期洞窟群 · 现状窟口"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "图绘未编号的现状窟口，无法据入口确定具体洞窟年代；700仅作洞窟群的约略年表位置。"
  },
  {
    "id": "sc_huangze",
    "name": "皇泽寺摩崖造像",
    "short": "皇泽寺",
    "sub": "摩崖五尊像局部",
    "dyn": "tang",
    "tag": "唐",
    "era": "唐代摩崖造像",
    "year": 700,
    "yearLabel": "唐代",
    "place": "四川广元 · 嘉陵江西岸",
    "placeKey": "sc_guangyuan",
    "types": [
      "grotto",
      "sculpture"
    ],
    "initialStatus": "unvisited",
    "lede": "嘉陵江西岸的崖壁上，一佛居中、弟子与菩萨左右侍立的“一铺五尊”是皇泽寺最常见的组合，图版截取的正是这样一龛的局部，具体龛号未经核对。这片造像始凿于北魏晚期，经西魏、北周、隋，至初唐、盛唐达到高潮，今存57龛、1200余尊。寺名因武则天而来，先开窟、后建寺。所绘以唐代龛像为据，不画说明牌与现代护栏。",
    "facts": [
      "<b>形制</b>：龛内主尊居中，两侧依次为弟子与菩萨，合成一铺五尊；规模最大的28号大佛窟即以阿弥陀佛为主尊，像高约6米，再加二力士，背壁刻天龙八部。图版所绘五尊像为其中一龛的局部，龛号与尺寸未据照片确认。",
      "<b>断代</b>：造像始凿于北魏晚期，历西魏、北周、隋，初唐、盛唐为高潮，中唐以后衰落；隋文帝之子蜀王杨秀曾在此开龛造像。1961年列为第一批全国重点文物保护单位，与千佛崖同为四川最早的一批石窟。",
      "<b>价值</b>：皇泽寺与敦煌一样先开窟、后建寺，寺以武则天得名，寺内有被称为武则天“真容”的石刻像。各家统计的龛数不一（47、50、57），本条取四川省文物考古研究院调查的57龛、1200余尊；题材有经幢、一铺多身像、三世佛与释迦多宝并坐。"
    ],
    "caption": [
      "摩崖五尊像局部 · 线稿",
      "唐代 · 现状意写"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "皇泽寺摩崖造像以唐代作品为主要特征；所选龛的精确开凿年未据图像确定。"
  },
  {
    "id": "sc_qianfo",
    "name": "广元千佛崖摩崖造像",
    "short": "千佛崖",
    "sub": "崖壁佛龛局部",
    "dyn": "tang",
    "tag": "唐",
    "era": "唐代造像局部",
    "year": 700,
    "yearLabel": "唐代约略",
    "place": "四川广元 · 嘉陵江东岸",
    "placeKey": "sc_guangyuan",
    "types": [
      "grotto",
      "sculpture"
    ],
    "initialStatus": "unvisited",
    "lede": "沿嘉陵江东岸三百八十八米的崖面，大小龛窟上下相叠，像一面蜂巢。这是四川最早的石窟群之一，北魏晚期开凿，唐代最盛；1935年修川陕公路时炸去崖像约三分之二，仍存950余龛、7900余尊。崖上146则题记从武周一直刻到民国，开元十年（722）剑南道按察使韦抗的功德窟是其中最有名的一处。图版截取一处坐佛与侍者的龛像，不代表整段崖壁。",
    "facts": [
      "<b>形制</b>：崖面南北长388米，龛窟上下密布，现存950余龛、7900余尊，题材有阿弥陀佛、卢舍那佛、释迦佛与菩萨等。图版所绘为一处坐佛与两侧侍者的龛像局部，具体龛号未据照片确认。",
      "<b>断代</b>：始凿于北魏晚期，北朝至唐代为开凿主期，唐代最盛，五代、宋、元、清主要为装彩。崖上题记146则，最早为武周（696–697）；513号韦抗窟题记署“开元十年六月七日”，211号为苏颋所造。唐代称柏堂寺，元代改称千佛崖。",
      "<b>价值</b>：原有造像一万七千余尊，1935年修川陕公路炸毁崖面百余米，梁思成当年即向政府报告“毁去约三分之二”。1961年列为第一批全国重点文物保护单位。它是西南地区最早的石窟，也是四川规模最大的石窟群。"
    ],
    "caption": [
      "崖壁佛龛局部 · 线稿",
      "唐代约略 · 现状意写"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "千佛崖营造跨越多个朝代；所绘龛位未据照片确认为特定编号。"
  },
  {
    "id": "sc_beishan",
    "name": "北山摩崖造像",
    "short": "大足北山",
    "sub": "北山石龛 · 菩萨造像局部",
    "dyn": "song",
    "tag": "宋",
    "era": "北山唐末开凿 · 五代宋续造",
    "year": 1100,
    "yearLabel": "宋代约略",
    "place": "重庆大足 · 北山",
    "placeKey": "dazu",
    "types": [
      "grotto",
      "sculpture"
    ],
    "initialStatus": "unvisited",
    "lede": "中央坐像与左右随侍藏在北山岩龛内，衣纹、姿态和面容在近距离形成细密的对话。与宝顶山宏大的崖面叙事相比，北山常让目光停在一处龛像和它的细节上。这里的营造始于晚唐，又延续至五代、两宋；所见龛尚未确认编号与确年，不能将整个山的初创时间直接当作这组像的年代。",
    "facts": [
      "本处是一龛中央坐像与随侍的局部，人物在有限岩面中形成层次，衣纹和身姿连接彼此。它属于北山摩崖造像，不能与宝顶山的千手观音局部混作一处。",
      "北山开凿始于唐景福元年，即八九二年，五代至南宋继续营造。眼前龛像尚未确认编号和确年，不能将整座山的初创纪年直接用于这里的每一组造像。",
      "北山以细腻雕刻和人物形象见长，保存晚唐至两宋佛教艺术的发展线索。近看一龛可体会衣纹与表情的处理，完整的断代仍需题记、形制和相关研究共同支持。"
    ],
    "caption": [
      "北山石龛局部 · 线稿",
      "宋代约略 · 现状意写"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "北山始于892年，五代至南宋续凿；所绘龛未据照片确认精确纪年。"
  },
  {
    "id": "yn_shizhong",
    "name": "石钟山石窟",
    "short": "石钟山",
    "sub": "南诏王像龛局部",
    "dyn": "nanzhao",
    "tag": "南诏",
    "era": "南诏时期造像",
    "year": 850,
    "yearLabel": "约9世纪",
    "place": "云南剑川 · 石钟山",
    "placeKey": "yn_jianchuan",
    "types": [
      "grotto",
      "sculpture"
    ],
    "initialStatus": "unvisited",
    "lede": "一位王者袖手端坐，官员与随侍聚在两旁，石钟山石窟将人间朝廷的场面留在佛教石窟之中。这一龛传统称为异牟寻坐朝图，圆领宽袖、座椅和人物之间的高低关系都值得细看。南诏王像的理解较为稳固，具体是哪一位王却仍待新证据，不能由通行名称反推确凿身份。",
    "facts": [
      "主像端坐于龛内，左右官员和侍从组成有秩序的人物群。圆领宽袖衣袍、袖手姿态与座椅，既刻画个人形象，也让朝会中的身份差别呈现在石面上。",
      "石窟群在南诏至大理国时期陆续开凿，所见龛传统称异牟寻坐朝图。研究指出具体王名依早期调查和地方传说命名，通称并不证明人物身份或单龛确年已经确定。",
      "这里的石刻不只塑造佛与菩萨，也容纳王者和世俗生活。服饰、座具与随侍关系，为研究南诏政治文化提供图像材料，但其史料价值与身份尚待考证并不矛盾。"
    ],
    "caption": [
      "南诏王像龛局部 · 线稿",
      "约9世纪 · 现状意写"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "所绘龛传统称异牟寻坐朝图；学术研究指出该身份依早期调查和地方传说确定，仍需审慎。"
  },
  {
    "id": "sn_beilin",
    "name": "西安碑林",
    "short": "西安碑林",
    "sub": "石台孝经碑",
    "dyn": "tang",
    "tag": "唐",
    "era": "石台孝经碑唐天宝四载",
    "year": 745,
    "yearLabel": "745",
    "place": "陕西西安 · 碑林",
    "placeKey": "xian",
    "types": [
      "stele"
    ],
    "initialStatus": "unvisited",
    "lede": "石台孝经碑让一部书变成可以环绕观看的石头：四面碑身刻着经文，雕饰碑首与高石台共同托出它的礼仪尺度。唐玄宗为孝经作序、注释并以隶书书写，碑于天宝四载立石，后来迁入碑林。这里可看文字如何被朝廷固定成范本，也可看书法、经学与石雕在同一件文物中相遇。",
    "facts": [
      "四块巨石组成四面碑身，上承雕饰碑首，下立石台，经文沿各面展开。它需要绕行才能完整观看，方整碑体与经文的文字行列共同形成严整的阅读秩序。",
      "唐玄宗撰序作注并以隶书书丹，太子李亨题写篆额，天宝四载立于长安太学。碑后经迁移进入今日碑林，七四五年对应这件碑，而非全部碑林的形成。",
      "刻石把儒家经典固定为可传拓的文本，同时保存帝王书写的风格。经学、书法与权力共同进入碑面，这也是它与记录个人生平的墓志和一般题名碑不同之处。"
    ],
    "caption": [
      "石台孝经碑 · 线稿",
      "745 · 现状意写"
    ],
    "tall": true
  },
  {
    "id": "yn_cuanbaozi",
    "name": "爨宝子碑",
    "short": "小爨碑",
    "sub": "东晋爨宝子碑",
    "dyn": "jin",
    "tag": "东晋",
    "era": "东晋义熙元年",
    "year": 405,
    "yearLabel": "405",
    "place": "云南曲靖 · 麒麟区",
    "placeKey": "yn_qujing",
    "types": [
      "stele"
    ],
    "initialStatus": "unvisited",
    "lede": "圆弧碑首下，紧密而古拙的字形布满一块长方石碑。爨宝子碑纪念东晋建宁太守爨宝子，碑名之外还留下职官与地方社会的线索。它立于义熙元年，文字介于隶楷演变之间，既可从石面体会笔画的不同，也可与年代稍晚、体量更大的爨龙颜碑相互参看。",
    "facts": [
      "石碑有圆弧形碑首和长方碑身，碑额、正文及末尾职官题名分成不同部分。朴拙字形紧密排列，文字的线条与布局使它同时具有书法和记事的意义。",
      "碑内写大亨四年乙巳，折合东晋义熙元年，即四〇五年。它属于东晋碑刻，清代重新出土后几经迁置保护，不能因今日陈列地点而改写其时代归属。",
      "爨宝子碑因体量较小而俗称小爨碑，与刘宋爨龙颜碑合称二爨。两碑保存地方人物和官职信息，也让观者在不同石面之间比较隶书向楷书过渡的形态。"
    ],
    "caption": [
      "爨宝子碑 · 线稿",
      "405 · 现状意写"
    ],
    "tall": true
  },
  {
    "id": "yn_cuanyan",
    "name": "爨龙颜碑",
    "short": "大爨碑",
    "sub": "南朝爨龙颜碑",
    "dyn": "nan",
    "tag": "南朝",
    "era": "刘宋大明二年",
    "year": 458,
    "yearLabel": "458",
    "place": "云南陆良 · 薛官堡",
    "placeKey": "yn_luliang",
    "types": [
      "stele"
    ],
    "initialStatus": "unvisited",
    "lede": "爨龙颜碑的碑首浮雕与密集文字，把雕饰、书法和人物记事聚在一块石上。它立于刘宋大明二年，体量大于爨宝子碑，因而俗称大爨碑。石面风化并没有抹去碑额和正文的层次，字形在隶楷之间的变化仍值得细看；追溯爨氏家族与南中地方历史，也需要把碑文与其他资料相互核对。",
    "facts": [
      "弧形碑额刻有动物与日月纹样，下接宽阔的文字碑身。浮雕和字行各占位置，碑首穿孔也是形制的一部分，风化后的起伏仍显示石雕与文字的结合。",
      "碑立于刘宋大明二年，即四五八年，记述爨龙颜的家族和生平。其年代晚于东晋爨宝子碑，属于南朝刘宋，不能把两通碑因同姓同地域合成同一时期。",
      "大爨碑在书法上展示隶楷过渡的雄健形态，在史料上保存家族世系和地方仕历。与小爨碑并读，可同时比较字形、规模与记事内容，理解二爨之名背后的区别。"
    ],
    "caption": [
      "爨龙颜碑 · 线稿",
      "458 · 现状意写"
    ],
    "tall": true
  },
  {
    "id": "sn_yaowang",
    "name": "药王山石刻",
    "short": "药王山",
    "sub": "摩崖石造像一龛",
    "dyn": "tang",
    "tag": "唐",
    "era": "北朝至唐代多期石刻",
    "year": 700,
    "yearLabel": "唐代约略",
    "place": "陕西铜川 · 耀州药王山",
    "placeKey": "sn_tongchuan",
    "types": [
      "sculpture",
      "stele"
    ],
    "initialStatus": "unvisited",
    "lede": "药王山的石刻并不只有药方和纪念孙思邈的文字，岩壁上的佛教造像还保存着更早的信仰层次。眼前一龛立像的人物从岩面凸起，龛内的衣纹与外侧粗石形成鲜明对照。山上造像和碑刻跨越北朝至隋唐等时期，这一局部尚无可确认的精确纪年，不能把周边文物的年代直接移到它身上。",
    "facts": [
      "这里是一处依岩壁开凿的一龛立像，人体、衣纹与龛壁属于同一石材的凿刻关系。突出的人物与内凹空间互相衬托，岩面粗细变化也参与观看时的明暗层次。",
      "药王山保存北朝至隋唐等时期造像及后来碑刻，遗存并非同年完成。所选单龛尚未确认具体编号与精确纪年，因此只保留宽泛时代定位，不借其他龛的题记定年。",
      "摩崖造像留在原岩上，造像碑则可独立移动，两种石刻呈现不同的观看方式。在药王山并看宗教造像与后来药王题材，可以分辨同一地点逐渐累积的信仰记忆。"
    ],
    "caption": [
      "石造像一龛 · 线稿",
      "唐代约略 · 现状意写"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "石刻跨越北朝、隋唐等时期；本图所选单龛缺少可确认的精确纪年，700只作约略定位。"
  },
  {
    "id": "yn_duanshi",
    "name": "段氏与三十七部会盟碑",
    "short": "会盟碑",
    "sub": "大理国会盟碑",
    "dyn": "dali",
    "tag": "大理",
    "era": "大理国明政三年",
    "year": 971,
    "yearLabel": "971",
    "place": "云南曲靖 · 麒麟区",
    "placeKey": "yn_qujing",
    "types": [
      "stele"
    ],
    "initialStatus": "unvisited",
    "lede": "长方碑身上的文字，记录大理国段氏与三十七部在石城会盟的事情。这通碑立于明政三年，既写征战后的盟誓，也记颁赐职赏，保存了十世纪地方政治联系的细节。如今石碑与石座构成朴素的陈列主体，读它不只是看字形，还能理解一块石头怎样把一次政治事件留给后世核对。",
    "facts": [
      "现存碑身和石座承托一片密集文字，形式朴素而以记事为重。题名与正文共同保存参与者和会盟内容，石材的实物形态与碑文的信息应相互参看。",
      "碑立于大理国明政三年，即九七一年，又称石城碑或石城盟誓碑。清代出土后迁入保护设施，现存陈列环境不属于会盟时的原始地点与建筑。",
      "碑文记述段氏联合三十七部出战、会盟立誓及颁赐职赏，提供大理国与地方势力关系的资料。它与曲靖所藏早期爨碑并存，却记录不同政权和时代的历史。"
    ],
    "caption": [
      "段氏与三十七部会盟碑 · 线稿",
      "971 · 现状意写"
    ],
    "tall": true
  },
  {
    "id": "gs_xixia_stele",
    "name": "重修护国寺感应塔碑",
    "short": "西夏碑",
    "sub": "西夏文与汉文碑面",
    "dyn": "xixia",
    "tag": "西夏",
    "era": "天祐民安五年",
    "year": 1094,
    "yearLabel": "1094",
    "place": "甘肃武威 · 西夏博物馆",
    "placeKey": "gs_wuwei",
    "types": [
      "stele"
    ],
    "initialStatus": "unvisited",
    "lede": "同一块石碑的一面刻西夏文，另一面刻汉文，两种文字把护国寺感应塔重修的事情保存下来。武威这通西夏碑立于天祐民安五年，碑首与长方碑身仍能辨认，风化则使石面显出历史的厚度。它既是寺塔沿革的记事，也是阅读党项文字的实物线索，两种碑文可以相互参照，却仍需专业释读。",
    "facts": [
      "碑身呈长方形，碑首与密集行列的文字组成完整碑面；两面分别刻西夏文和汉文。文字布局是这件文物的重要部分，不能把两种书写混作同一套汉字。",
      "碑刻于西夏天祐民安五年，即一〇九四年，记录护国寺感应塔的重修。这里的纪年对应立碑与记事，不直接证明寺院最早创建或今日相关建筑的年代。",
      "汉文与西夏文能相互对照，使碑石成为研究西夏文字、佛教和地方历史的重要材料。除了书法形态，碑文内容也让一项修塔活动进入可核对的历史记录。"
    ],
    "caption": [
      "西夏碑碑身 · 线稿",
      "1094 · 现状意写"
    ],
    "tall": true
  },
  {
    "id": "js_suzhou_song",
    "name": "苏州文庙内宋代石刻",
    "short": "苏州宋碑",
    "sub": "平江图碑",
    "dyn": "song",
    "tag": "宋",
    "era": "南宋绍定二年",
    "year": 1229,
    "yearLabel": "1229",
    "place": "江苏苏州 · 文庙",
    "placeKey": "suzhou",
    "types": [
      "stele"
    ],
    "initialStatus": "unvisited",
    "lede": "一张刻在石头上的城市地图：2.84 米高的碑面上，南宋平江府城的城墙、五座水陆城门、三百五十九座桥、六十一个坊和两百六十四条巷全用单线阴刻画出，河道与街道平行，是双棋盘格局。碑刻于绍定二年（1229），是中国现存最早的城市平面图；拿今天的苏州古城对照，玄妙观、罗汉院双塔都还在图上标出的位置。图版只概括地图结构，不充当可阅读的复制品。",
    "facts": [
      "<b>形制</b>：碑高 2.84 米、宽 1.46 米、厚 30 厘米，单线阴刻；比例约为南北 1:2500、东西 1:3000，城墙、桥梁与建筑物用简洁的立面形象画在各自的平面位置上，原碑存苏州文庙（今苏州碑刻博物馆）。",
      "<b>年代</b>：碑上未镌刻年代，近代学者王謇据《吴郡志》所记绍定二年重建城市的事项逐一核对，凡当年春夏以前所建者图中均有，秋冬以后所建者均无，由此断定刻于南宋绍定二年（1229）。",
      "<b>内容与价值</b>：城呈南北长的长方形，齐、娄、葑、盘、阊五门各绘水陆门，府治居中偏东南；图上标出桥 359 座、坊 61、巷 264、弄 24、寺观 67 座，许多名称沿用至今。与考古和现存建筑对照，它证明苏州是在原址上不断重建的城市。"
    ],
    "caption": [
      "平江图碑 · 线稿",
      "1229 · 现状意写"
    ],
    "tall": true
  },
  {
    "id": "hn_xizhou",
    "name": "溪州铜柱",
    "short": "溪州铜柱",
    "sub": "五代盟约铜柱",
    "dyn": "zhou",
    "tag": "五代",
    "era": "后晋天福五年左右",
    "year": 940,
    "yearLabel": "940",
    "place": "湖南永顺 · 王村",
    "placeKey": "hn_yongshun",
    "types": [
      "column",
      "stele"
    ],
    "initialStatus": "unvisited",
    "lede": "狭长的铜柱把一场战争后的盟誓留在了金属表面。溪州铜柱八棱八面，文字绕柱连续排列，今天顶部残损的轮廓也保留着它的保存经历。柱铭与史籍将其联系到后晋天福五年的楚与溪州议和，它不仅是一件大型铸造物，也是理解地方政治、盟约和不同群体关系的重要实物。",
    "facts": [
      "柱身为八角棱柱，文字沿八个面前后相接，顶部已有残损。细长金属体并非普通屋宇的承重柱，其形制、铸造和表面铭文共同构成了这件纪念物的特征。",
      "柱铭与史籍记载，后晋天福五年楚与溪州议和并立柱刻铭。原刻包含记、颂与盟誓等内容，另有北宋加刻文字，所以柱面的书写也需要分辨时代层次。",
      "盟誓记下政治关系和双方约定，为研究湘西历史提供实物材料。它后来离开原有河岸而获保存，今日观看铜柱，需要把器物本身与旧址环境的历史相连。"
    ],
    "caption": [
      "溪州铜柱 · 线稿",
      "940 · 现状意写"
    ],
    "tall": true
  },
  {
    "id": "sc_emei_buddha",
    "name": "峨眉山圣寿万年寺铜铁佛像",
    "short": "万年寺铜佛",
    "sub": "普贤菩萨骑白象铜像",
    "dyn": "song",
    "tag": "宋",
    "era": "北宋太平兴国年间",
    "year": 980,
    "yearLabel": "约980",
    "place": "四川峨眉山 · 万年寺",
    "placeKey": "sc_emei",
    "types": [
      "sculpture"
    ],
    "initialStatus": "unvisited",
    "lede": "一头铜铸的六牙白象驮着普贤菩萨，象比真象还高，连像带座通高7.85米、重约62吨。这是北宋太平兴国五年（980）宋太宗赐金、遣内侍张仁赞到成都监铸的，分块铸就再运上海拔千米的山寺，如何搬运至今是谜。像外原有木阁，万历二十七年（1599）焚毁，两年后罩上了至今仍在的无梁砖殿。图版画殿内这尊铜像，不画金顶的现代巨像。",
    "facts": [
      "<b>形制</b>：铜铸普贤骑象像，通高7.85米，重约62吨；菩萨像高3.64米，头戴双层花冠，趺坐于象背莲座上，莲座高1.39米、直径2.22米；六牙白象四足各踏一朵莲花。莲台以上为黄铜，白象为青铜，分块铸成，象腹与像身中空以置经卷。",
      "<b>断代</b>：南宋志磐《佛祖统纪》记太平兴国五年（980）正月敕张仁赞往成都铸金铜普贤像；《峨眉山志》称白水寺僧茂真奉诏入朝后得赐黄金三千两铸像。1961年以“峨眉山圣寿万年寺铜铁佛像”列为全国重点文物保护单位。",
      "<b>价值</b>：铜像所在的无梁砖殿为万历二十九年（1601）慈圣太后赐金所建，仿印度寺院以砖砌穹顶，不用一木；1946年万年寺大火，全寺仅此殿幸存，铜像因此得全。保护单位名称还包括寺内其他铜铁佛像，均不在图版之内。"
    ],
    "caption": [
      "普贤铜像 · 线稿",
      "约980 · 现状意写"
    ],
    "tall": true,
    "yearApprox": true,
    "yearNote": "铜铸普贤骑象像为北宋遗物；保护单位名称还包括寺内其他铜铁佛像。"
  }
]);
PLACES.push(...[
  {
    "key": "gs_dunhuang",
    "name": "敦煌",
    "prov": "甘肃",
    "country": "CN",
    "lat": 40.14,
    "lon": 94.66
  },
  {
    "key": "gs_guazhou",
    "name": "瓜州",
    "prov": "甘肃",
    "country": "CN",
    "lat": 40.52,
    "lon": 95.78
  },
  {
    "key": "xj_baicheng",
    "name": "拜城",
    "prov": "新疆",
    "country": "CN",
    "lat": 41.8,
    "lon": 81.87
  },
  {
    "key": "xj_kuqa",
    "name": "库车",
    "prov": "新疆",
    "country": "CN",
    "lat": 41.72,
    "lon": 82.96
  },
  {
    "key": "sc_guangyuan",
    "name": "广元",
    "prov": "四川",
    "country": "CN",
    "lat": 32.44,
    "lon": 105.84
  },
  {
    "key": "yn_jianchuan",
    "name": "剑川",
    "prov": "云南",
    "country": "CN",
    "lat": 26.54,
    "lon": 99.91
  },
  {
    "key": "yn_qujing",
    "name": "曲靖",
    "prov": "云南",
    "country": "CN",
    "lat": 25.49,
    "lon": 103.8
  },
  {
    "key": "yn_luliang",
    "name": "陆良",
    "prov": "云南",
    "country": "CN",
    "lat": 25.03,
    "lon": 103.66
  },
  {
    "key": "sn_tongchuan",
    "name": "铜川",
    "prov": "陕西",
    "country": "CN",
    "lat": 34.9,
    "lon": 108.95
  },
  {
    "key": "gs_wuwei",
    "name": "武威",
    "prov": "甘肃",
    "country": "CN",
    "lat": 37.93,
    "lon": 102.64
  },
  {
    "key": "hn_yongshun",
    "name": "永顺",
    "prov": "湖南",
    "country": "CN",
    "lat": 28.98,
    "lon": 109.85
  },
  {
    "key": "sc_emei",
    "name": "峨眉山",
    "prov": "四川",
    "country": "CN",
    "lat": 29.6,
    "lon": 103.48
  }
]);

// 首批国保八处增补；所绘主体与史料见 assets/research/first-batch-eight-20260925-plan.md。
SITES.push(...[
  {
    id: 'qh_taer', name: '塔尔寺', short: '塔尔寺', sub: '大金瓦殿 · 现状', dyn: 'ming', tag: '明 · 清', era: '明代始建 · 清代扩建', year: 1700, yearLabel: '清代', yearApprox: true,
    yearNote: '1379是寺院初建说，1700仅为清代现存大金瓦殿的约略年表位置，不是殿宇确切建年。', place: '青海西宁 · 湟中', placeKey: 'qh_huangzhong', types: ['hall'], initialStatus: 'unvisited',
    lede: '塔尔寺的大金瓦殿以金色屋顶标示全寺的宗教中心，厚重殿身与汉式歇山屋顶相结合。寺院与宗喀巴的诞生地相联系，而眼前殿堂的体量经过清代扩建和后续修缮逐步形成。走近殿前，可以从屋顶、墙体与殿内银塔理解建筑形式和格鲁派信仰如何交织。',
    facts: ['大金瓦殿的金铜屋顶覆盖在厚重殿身之上，重檐歇山的轮廓带有汉式建筑特征。屋顶与藏式殿体相结合，构成寺院中醒目的中心殿堂。', '相关维修史记载大殿在清代先后扩建，康熙四十七年扩充、五十年改为三层，之后又有重修。现状属于多期营建，不宜用一个年份概括全部构件。', '塔尔寺是格鲁派重要寺院，宗喀巴诞生地的记忆与殿内银塔构成大金瓦殿的信仰核心。其价值同时存在于建筑形制、宗教活动与持续修缮之中。'],
    caption: ['大金瓦殿 · 现状线稿', '明代始建 · 清代增修'], legacyNames: ['塔尔寺大金瓦殿', '大金瓦寺'],
  },
  {
    id: 'jx_nanchang_uprising', name: '南昌起义总指挥部旧址', short: '江西大旅社', sub: '江西大旅社旧楼外立面', dyn: 'modern', tag: '近现代', era: '1924年建成 · 1927年起义', year: 1924,
    place: '江西南昌 · 中山路', placeKey: 'jx_nanchang', types: ['residence'], initialStatus: 'unvisited',
    lede: '南昌八一起义纪念馆旧址原为江西大旅社，一座四层砖混楼房围绕内院展开，临街立面以连续窗列和弧形装饰呈现近代旅馆的面貌。建筑于一九二四年落成，三年后成为起义总指挥部。旧楼把城市商业生活与革命事件联结在一起，纪念馆的身份建立在真实的旅社空间之上。',
    facts: ['原江西大旅社为四层砖混建筑，平面围绕内院呈回字形，正面门窗排列整齐，窗门上方有西式弧形水泥浮雕，体现近代中西合璧的旅馆建筑。', '旅社于一九二二年开工、一九二四年竣工。一九二七年起义筹备期间，部队以第二十军第一师名义包租旅社，使其成为起义总指挥部。', '旧址的意义既来自八一起义，也来自保存下来的近代旅馆。商业楼房转为军事指挥场所的经历，让城市日常空间与重大历史事件之间的联系具体可见。'],
    caption: ['江西大旅社 · 旧楼外立面', '1924年建成 · 1927年起义'], legacyNames: ['八一起义总指挥部旧址', '江西大旅社'], tall: true,
  },
  {
    id: 'xj_jiaohe', name: '交河故城', short: '交河故城', sub: '大佛寺现存生土遗址', dyn: 'xiyu', tag: '西域', era: '车师至唐等多期遗址', year: 700, yearLabel: '多期', yearApprox: true,
    yearNote: '交河故城长期使用，遗址包含多个阶段；700仅为年表约略定位，不能据此断定图中大佛寺残墙的营建年。', place: '新疆吐鲁番 · 交河', placeKey: 'xj_jiaohe', types: ['ruins'], initialStatus: 'unvisited',
    lede: '交河故城大佛寺如今留下生土墙体、高台与佛龛的残迹，屋顶和多数造像已经不存。它位于古城北部寺院区，沿中央道路走近，可感受到宗教空间在城市中的位置。交河曾经历车师、唐代等不同历史阶段，现存城市格局大体体现唐代发展；约七世纪的定位并不表示眼前每一段墙体都能精确归于同一年。',
    facts: ['大佛寺以高台、中央大塔及壁龛等生土遗迹显示旧日规模，佛像多已不存；中央道路通向北部寺院区，寺院与城市街道的关系仍可辨认。', '交河从古代车师都城发展为唐代县城，现存城市规模大体为唐代遗存；大佛寺经历多期使用，约七世纪定位不意味着全部现存土墙同年建成。', '交河采用夯筑、土坯、掏挖留墙等多种生土技法，不能将所有遗迹都称为夯土；大佛寺使城市生活中的佛教信仰，在残存空间里仍然可读。'],
    caption: ['交河故城 · 大佛寺遗址', '多期城址 · 现状残墙'], legacyNames: ['交河古城', '雅尔湖故城'],
  },
  {
    id: 'xz_potala', name: '布达拉宫', short: '布达拉宫', sub: '现状西南侧白宫与红宫', dyn: 'ming', tag: '清', era: '白宫1648年 · 红宫1694年', year: 1694,
    yearNote: '年表采用红宫竣工的1694年；图版绘今日所见多期白宫、红宫及山体台阶，不是七世纪红山宫复原。', place: '西藏拉萨 · 红山', placeKey: 'xz_potala', types: ['palace'], initialStatus: 'unvisited',
    lede: '布达拉宫沿红山抬升，白宫展开两翼，红宫在中心高处形成深色体量，阶梯与厚墙把建筑接入山势。今日这座宫堡的主要规模形成于十七世纪，不能仅以七世纪初创概括。白宫的居住和政教空间、红宫的佛堂与灵塔殿各有功能；从山下看层层墙面和屋顶，也能理解建筑如何把地形、宗教与历史权力结合起来。',
    facts: ['红宫居中、白宫分布两翼，厚重墙体和层叠空间随山势上升；山地阶梯衔接不同高度，使宫殿、佛堂与附属建筑组成连续的宫堡整体。', '白宫主体于一六四八年建成，红宫在一六九〇年开建、一六九四年竣工；现存主要规模属十七世纪重建及后续扩建，早于此的初创应另行理解。', '白宫曾承担达赖喇嘛居住与政教活动，红宫包括佛堂和灵塔殿；两种功能在红山上相互衔接，使宫堡成为藏族建筑与宗教历史的重要见证。'],
    caption: ['布达拉宫 · 西南侧现状', '白宫1648 · 红宫1694'], legacyNames: ['布达拉宫红宫', '布达拉宫白宫'],
  },
  {
    id: 'js_zhuozheng', name: '拙政园', short: '拙政园', sub: '远香堂现状', dyn: 'ming', tag: '明 · 清', era: '1509年建园 · 现存建筑多为清代', year: 1860, yearLabel: '清代', yearApprox: true,
    yearNote: '1509是建园年代，现存建筑多数在清咸丰十年后重建；1860只为清代园林现状的约略排序，不是远香堂确切建年。', place: '江苏苏州 · 东北街', placeKey: 'js_suzhou', types: ['garden', 'hall'], initialStatus: 'unvisited',
    lede: '远香堂是一座四面厅：四面不砌墙，全装落地长窗，坐在堂里，荷池、山岛和两座小亭都成了窗里的画。它站在明代若墅堂的旧址上，面阔三间，北面出宽阔的月台临水，是拙政园中部的主厅。园子始于正德四年（1509），但今天的厅堂大多是 1860 年之后重建——同治年间这里先做过忠王府，再改成八旗奉直会馆，1887 年又修过一次，格局保持到今天。1997 年列入世界遗产。',
    facts: ['<b>形制</b>：四面厅，面阔三间，建于明王氏拙政园若墅堂旧址；四周装落地长窗，可环视四面景色，北面出宽阔月台临池，隔水与雪香云蔚亭、待霜亭所在的两座山岛相望。匾额原为清沈德潜所书，文革中毁，今为张辛稼补书。', '<b>年代</b>：拙政园始建于明正德四年（1509）；中部是晚清八旗奉直会馆（1872 年改设、1887 年修葺）的遗存，现存建筑多在清咸丰十年（1860）之后重建。1937 年远香堂遭轰炸震损，1980 年大修。', '<b>价值</b>：中部约 18.5 亩，以水池为中心，水面约占三分之一，亭榭皆临水而建，总体仍保持明代园林浑厚疏朗的格局；1961 年列为首批全国重点文物保护单位，1997 年与其他苏州古典园林一同列入世界文化遗产。'],
    caption: ['远香堂 · 现状线稿', '明代建园 · 清代建筑'], legacyNames: ['拙政园远香堂'],
  },
  {
    id: 'sc_luding', name: '泸定桥', short: '泸定桥', sub: '铁索桥身与两岸桥台', dyn: 'ming', tag: '清', era: '康熙年间建桥 · 1935年战斗', year: 1706,
    place: '四川甘孜 · 泸定', placeKey: 'sc_luding', types: ['bridge'], initialStatus: 'unvisited',
    lede: '十三根铁索横跨大渡河，九根铺底、四根作栏，一万二千余个扁铁环扣成，每根长127米余、重约两吨半，两头没入两岸石砌桥台后深六米的落井，锁在铸铁的地龙桩与卧龙桩上。康熙四十四年（1705）御批开工，次年建成，此前过河只能靠竹索、藤索或渡船。1935年5月29日红军二十二名勇士攀索夺桥，桥由此进入另一部历史。图版绘铁索桥身与两岸桥台。',
    facts: ['<b>形制</b>：铁索吊桥，跨度101.6米、宽2.8米，桥面距枯水面约14.5米；13根铁索中9根为底索、4根为扶栏，底索间距33厘米，上铺横木与八道纵木板；每索长127.45米、重约2.5吨，由八九百个扁环扣成。两岸桥台以条石砌筑，高20米，台上建木构桥亭。', '<b>断代</b>：清康熙四十四年（1705）动工，四十五年（1706）竣工，因系康熙御批建造，旧称“皇桥”；东桥亭内有康熙《御制泸定桥碑》记建桥始末，西侧立康熙手书“泸定桥”碑。1950年川藏公路新桥建成后不再承担交通，1977年整桥重修。', '<b>价值</b>：铁索锚固在桥台后深6米落井内的七八根地龙桩与一根重1800斤的卧龙桩上，以桥台与桩重承受拉力，是清代铁索桥的成熟做法。1935年5月29日中央红军“飞夺泸定桥”，桥与战斗一同于1961年列为第一批全国重点文物保护单位。'],
    caption: ['泸定桥 · 铁索与桥台', '清康熙年间建成'], legacyNames: ['大渡河泸定桥', '泸定铁索桥'],
  },
  {
    id: 'bj_guozijian', name: '国子监', short: '国子监', sub: '辟雍殿与环水石桥', dyn: 'ming', tag: '清', era: '乾隆四十九年建成', year: 1784,
    place: '北京东城 · 国子监街', placeKey: 'bj_guozijian', types: ['school', 'hall'], initialStatus: 'unvisited',
    lede: '一座方殿被圆形水池环绕，四座石桥从四面接入，这就是国子监辟雍最容易辨认的布局。黄琉璃瓦重檐之上立鎏金宝顶，殿身与环水共同构成整齐的几何秩序。国子监的办学历史早于这座建筑，辟雍则在乾隆四十九年建成，供皇帝临雍讲学使用。它把古代学校的礼制观念落实为殿、池与桥，也让国家教育与帝王仪式在同一个空间相遇。',
    facts: ['布局：辟雍殿为方形，四面开门并设廊，四周环以圆形水池和汉白玉栏杆；四座石桥分别接入四面，重檐黄琉璃瓦顶上立鎏金宝顶，水与桥共同组织出入次序。', '营建：辟雍殿于乾隆四十九年建成，国子监本身的历史则可追溯到元代；建殿之前，皇帝在彝伦堂讲学，因此教育机构的沿革与现存辟雍的建造时间不能混为一谈。', '讲学：辟雍承担皇帝临雍讲学的仪式功能，环水形式追溯古代学校礼制；方殿、圆池与四桥既形成可辨认的空间秩序，也把尊师重教的观念转化为可行走的建筑。'],
    caption: ['国子监 · 辟雍与环水', '清乾隆四十九年 · 1784'], legacyNames: ['北京国子监', '辟雍殿'],
  },
  {
    id: 'zj_yuefei', name: '岳飞墓', short: '岳飞墓', sub: '墓冢、墓碑与祭台', dyn: 'song', tag: '宋', era: '南宋绍兴年间迁葬 · 后世修葺', year: 1163,
    yearNote: '1163按杭州官方迁葬记载定位；图版画今日所见墓冢、碑与祭台，石构件历经后世修葺，不认作全为南宋原物。', place: '浙江杭州 · 栖霞岭', placeKey: 'zj_yuefei', types: ['tomb'], initialStatus: 'unvisited',
    lede: '栖霞岭下的岳飞墓以墓冢、墓碑和祭台构成肃静的纪念空间。这里的意义来自南宋平反后的迁葬，也来自后世持续的修葺与祭祀。墓与一旁纪念岳飞的祠庙相关，却有各自的形成过程，不能混为一座建筑。今日石构的整齐外观不是南宋原物完整保存的证明，真正延续的是墓址及其承载的历史记忆。',
    facts: ['形制：墓冢隆起，前设墓碑与祭台，以石构界定拜谒的中心。墓葬空间和纪念祠庙相邻而有区别，墓前的石碑、台面与周围构筑也各有修护经历。', '断代：杭州官方资料记一一六三年岳飞平反后迁葬现址，一二二一年建立纪念祠。迁葬与建祠是两件事，今日墓碑和祭台经过后世修葺，不宜全部断为南宋。', '价值：墓址把文献中的人物经历落实到可以拜谒的地点，后世祭祀又持续赋予它公共记忆。看待这处遗存，既要尊重迁葬史实，也要辨明各次重修留下的物质层次。'],
    caption: ['岳飞墓 · 墓前现状', '1163年迁葬 · 后世修葺'], legacyNames: ['岳王墓', '岳坟'],
  },
]);
PLACES.push(...[
  { key: 'qh_huangzhong', name: '湟中', prov: '青海', lat: 36.4906, lon: 101.5685, coordinate_note: '塔尔寺附近显示点，非单体测绘坐标。' },
  { key: 'jx_nanchang', name: '南昌', prov: '江西', lat: 28.675, lon: 115.88, coordinate_note: '南昌市中心显示点，非旧楼测绘坐标。' },
  { key: 'xj_jiaohe', name: '交河', prov: '新疆', lat: 42.9526, lon: 89.0631, coordinate_note: '交河故城台地显示点，非大佛寺测绘坐标。' },
  { key: 'xz_potala', name: '拉萨 · 布达拉宫', prov: '西藏', lat: 29.656, lon: 91.118, coordinate_note: '布达拉宫附近显示点，非单体测绘坐标。' },
  { key: 'js_suzhou', name: '苏州', prov: '江苏', lat: 31.325, lon: 120.628, coordinate_note: '拙政园附近显示点，非远香堂测绘坐标。' },
  { key: 'sc_luding', name: '泸定', prov: '四川', lat: 29.914, lon: 102.23, coordinate_note: '泸定桥附近显示点，非桥台测绘坐标。' },
  { key: 'bj_guozijian', name: '北京 · 国子监', prov: '北京', lat: 39.9453, lon: 116.4068, coordinate_note: '辟雍附近显示点，非单体测绘坐标。' },
  { key: 'zj_yuefei', name: '杭州 · 岳飞墓', prov: '浙江', lat: 30.253, lon: 120.142, coordinate_note: '岳飞墓附近显示点，非单体测绘坐标。' },
]);

// 日本古建筑六处增补；现存主体断代及实拍见 assets/research/japan-six-20260925-plan.md。
SITES.push(...[
  {
    id: 'jp_kinkaku', name: '金阁寺', short: '金阁', sub: '鹿苑寺舍利殿 · 现存复建', country: 'JP', types: ['pavilion', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_showa', tag: '昭和', era: '室町原构 · 1955年复建', year: 1955, yearNote: '年表采用现存舍利殿1955年复建年份；足利义满时期的原构于1950年烧毁。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '三层三种做法：底层寝殿造的素木，中层武家造，顶层禅宗佛殿造，上两层通体贴金箔，宝形造柿葺屋顶上立铜凤凰。足利义满北山山庄的舍利殿1950年被放火烧毁，国宝指定随之解除；现存金阁依1904—06年解体修理图纸于1955年复建，1987年又重贴五倍厚的金箔。它是一次忠实的复原，不是室町原构，年表因此记1955年。',
    facts: ['<b>形制</b>：木造三层楼阁，南面镜湖池，为二重三阁（初层与二层之间不出屋檐）；初、二层正面五间、侧面四间，三层方三间，宝形造、柿葺，顶立铜凤凰；一层法水院为寝殿造素木，二层潮音洞与三层究竟顶外壁满贴金箔。', '<b>沿革</b>：1897年列特别保护建筑、1929年旧国宝；1950年7月2日学僧放火全毁；1952年依明治解体修理图纸复建，1955年10月落庆；1986—87年“昭和大修复”重涂漆、重贴约20万枚五倍箔并换新凤凰。庭园1956年指定特别史迹·特别名胜。', '<b>辨析</b>：烧毁前仅三层残存金箔，二层原本是否贴金学界有争议（宫上茂隆持否定说），复建时把二层也全部贴金；复建金阁本身不是指定文化财，1994年作为鹿苑寺的构成部分列入世界遗产古都京都的文化财。'],
    caption: ['金阁寺 · 舍利殿现状', '昭和三十年（1955）复建'], legacyNames: ['鹿苑寺', '舍利殿金阁', '金閣寺', 'Kinkaku-ji', 'Rokuon-ji'],
  },
  {
    id: 'jp_ginkaku', name: '银阁寺', short: '银阁', sub: '慈照寺观音殿', country: 'JP', types: ['pavilion', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '1489年上梁 · 其后完成', year: 1489, yearLabel: '1489年上梁',
    yearNote: '寺院记载观音殿于1489年上梁、足利义政1490年去世时尚未完工；年表点标可考的上梁年份，不推定竣工年份。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '没有一片银箔。慈照寺观音殿是足利义政东山山庄留下的两栋房子之一，1489年三月立柱上梁，义政次年去世时尚未完工。两层宝形造、柿葺，底层心空殿是住宅式的书院风，上层潮音阁开花头窗、安桟唐户，像一座小禅宗佛殿；外廓约8米见方，比祖父义满的金阁小而收敛，却是室町时代唯一原构的楼阁庭园建筑。',
    facts: ['<b>形制</b>：两层楼阁，东面锦镜池，东西面8.2米、北面7.0米、南面5.9米，二重宝形造、柿葺，顶立铜凤凰（18世纪后半以前为宝珠）；下层心空殿用腰高障子，上层潮音阁三间见方，南北开桟唐户、东西设花头窗，四周绕缘与高栏，内安观音坐像。', '<b>沿革</b>：足利义政1482年起营建东山殿，观音殿于长享三年（1489）三月立柱上梁；1550年兵火中山庄建筑仅此与东求堂幸存；1900年列特别保护建筑，1951年指定国宝；2009年发掘确认其下有室町时代整地层，支持其为原地原构。', '<b>比较</b>：文化厅记其模仿西芳寺琉璃殿，寺方亦称承袭鹿苑寺舍利殿；上层四面做法不一、东正面无门，推测原本从南侧隔池礼佛；上层创建时内外黑漆并有彩色。“银阁”是江户时代对金阁的类比称呼，并非贴银。'],
    caption: ['银阁寺 · 观音殿现状', '室町时代 · 1489年上梁'], legacyNames: ['慈照寺', '观音殿银阁', '銀閣寺', 'Ginkaku-ji', 'Jisho-ji'],
  },
  {
    id: 'jp_sensoji', name: '浅草寺', short: '浅草寺', sub: '本堂 · 观音堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_showa', tag: '昭和', era: '旧本堂1945年烧毁 · 1958年重建', year: 1958,
    yearNote: '年表标今日所见钢筋混凝土本堂的1958年完成，不以寺院创建传说或江户时代旧本堂替代。',
    place: '日本 · 东京都 · 浅草', placeKey: 'jp_tokyo_asakusa',
    lede: '浅草寺本堂的大屋面保留了江户时代观音堂的印象，支撑它的却是战后钢筋混凝土结构。旧堂在东京空袭中焚毁，今日建筑于一九五八年完成，后来又换用较轻的钛瓦。沿中央台阶走近深檐，可见宗教用途与传统外形如何在新材料中延续；本堂的年代须与浅草寺更早的创建传说分开。',
    facts: ['本堂采用钢筋混凝土结构，入母屋屋顶高起，中央向拜伸至台阶上方。内部划分内阵与外阵，供奉空间和参拜空间各有位置，并非只为维持一座古式外壳。', '江户时代旧本堂于一九四五年东京空袭中烧毁，现堂在一九五八年完成。二〇一〇年屋顶改葺钛瓦，属于安全与维护工程，不能据传统轮廓把现堂写成江户原构。', '重建以旧堂形象为基础，让观音信仰继续拥有熟悉的中心。这里同时显示形式传承和材料变化，比较旁侧保留江户木构的浅草神社，可辨两种不同的存续路径。'],
    caption: ['浅草寺 · 现存本堂', '昭和三十三年（1958）重建'], legacyNames: ['浅草寺本堂', '观音堂', '浅草観音', 'Sensō-ji', 'Sensoji'],
  },
  {
    id: 'jp_himeji', name: '姬路城', short: '姬路城', sub: '大天守与石垣', country: 'JP', types: ['castle'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1609年大天守建成', year: 1609,
    place: '日本 · 兵库县 · 姬路', placeKey: 'jp_himeji',
    lede: '白漆喰的墙面与层叠破风把大天守的重量化成向上舒展的轮廓，下方高石垣则牢牢托住木构。姬路城大天守在一六〇九年完成，外观五重屋顶，内部另有地下一层。它既是城郭防御体系的一环，也是近世木构规模与技术的展示；今日洁白表层还记录昭和、平成两次大修。',
    facts: ['大天守外观五重，内部地上六层、地下一层，白漆喰墙与瓦屋面交替展开；石垣承托巨大木构，屋顶层数不能直接当作室内楼层数来计算。', '池田辉政于一六〇一年开始大规模改筑，连立式天守在一六〇九年完成；昭和解体修理与平成保存修理另属保护工程，现存屋面和墙面并非全是当年表层。', '大天守与其他天守、渡橹共同构成城的防御核心，其中的大天守立在高大石垣上；复杂破风和白墙所见的轻盈外观，仍建立在厚重城防设施之上。'],
    caption: ['姬路城 · 大天守与石垣', '江户庆长十四年（1609）'], legacyNames: ['姫路城', 'Himeji Castle', 'Himeji-jō', '白鹭城'], tall: true,
  },
  {
    id: 'jp_itsukushima', name: '严岛神社', short: '严岛神社', sub: '本社临海社殿与回廊', country: 'JP', types: ['shrine'], initialStatus: 'unvisited',
    dyn: 'jp_kamakura', tag: '镰仓', era: '十二世纪营建 · 主要现存建筑1241年重建', year: 1241, yearApprox: true, yearLabel: '约1241年',
    yearNote: 'UNESCO评估记主要幸存社殿于1241年重建；本社群有历次修理与增补，年表点只表示主要存世主体的重建阶段。',
    place: '日本 · 广岛县 · 宫岛', placeKey: 'jp_miyajima',
    lede: '严岛神社的本社沿海展开，朱色柱廊把祭祀殿堂、临海平台与舞台连接成连续的空间。潮水涨落改变柱脚周围的景象，山岛与海面共同成为神社的背景。十二世纪营建奠定布局，主要现存社殿在十三世纪火灾后重建，并历经修理；这组建筑的魅力来自祭祀、行走路线与海景的结合。',
    facts: ['本社的祓殿、拜殿、币殿与本殿沿祭祀方向相接，东西回廊连接殿堂和临海平台。架高的木地板、朱柱与连续屋檐，使行走路线与海面紧密相连。', '一一六八年的营建确立主要布局，后经两次火灾与重建。世界遗产评估将一二四一年记为主要幸存建筑的重建阶段，个别部分另有后世修缮增补。', '社殿与回廊带有平安贵族寝殿造的影响，却置于山岛与海水之间的祭祀环境。随潮汐变化的景观，使自然崇拜、仪式活动与建筑体验相互交融。'],
    caption: ['严岛神社 · 本社临海社殿', '镰仓时代重建 · 现状意写'], legacyNames: ['厳島神社', 'Itsukushima Shrine', 'Miyajima Shrine'],
  },
  {
    id: 'jp_nikko_toshogu', name: '日光东照宫', short: '东照宫', sub: '阳明门', country: 'JP', types: ['gate', 'shrine'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1636年大造替', year: 1636,
    place: '日本 · 栃木县 · 日光', placeKey: 'jp_nikko',
    lede: '日光东照宫的阳明门以双层门楼、曲线唐破风和密集雕刻构成华丽的入口，白色柱身与彩饰、金属装饰彼此映衬。现存门楼建于一六三六年，是德川家光大规模营建东照宫时的作品。近看人物、动物与植物题材，可以理解江户早期木工、雕刻与装饰工艺如何汇集在一座门上。',
    facts: ['阳明门为三间一户的双层楼门，采用入母屋屋顶，四面檐部设唐破风，左右连接袖墙。柱、斗栱与屋顶之间的层层装饰，形成向上展开的门楼轮廓。', '文化厅建筑记录将阳明门断定为宽永十三年，即一六三六年，属于江户前期营建。建筑本体年代与后来修理过的彩饰应分别理解，不能把现状全视为初建原貌。', '门上五百余件雕刻涵盖人物故事、儿童游戏与圣贤题材，结合漆工、彩绘和金属装饰。它展示东照宫纪念德川家康的政治意义，也集中呈现江户早期工艺。'],
    caption: ['日光东照宫 · 阳明门正面', '江户宽永十三年（1636）'], legacyNames: ['日光東照宮', '陽明門', 'Nikko Toshogu', 'Yomeimon'], tall: true,
  },
]);
PLACES.push(...[
  { key: 'jp_tokyo_asakusa', name: '东京 · 浅草', prov: '东京都', country: 'JP', lat: 35.7148, lon: 139.7967, coordinate_note: '浅草寺附近地图示意点，非本堂测绘坐标。' },
  { key: 'jp_himeji', name: '姬路', prov: '兵库县', country: 'JP', lat: 34.8394, lon: 134.6939, coordinate_note: '姬路城附近地图示意点，非大天守测绘坐标。' },
  { key: 'jp_miyajima', name: '宫岛', prov: '广岛县', country: 'JP', lat: 34.296, lon: 132.3198, coordinate_note: '严岛神社附近地图示意点，非单体测绘坐标。' },
  { key: 'jp_nikko', name: '日光', prov: '栃木县', country: 'JP', lat: 36.758, lon: 139.599, coordinate_note: '日光东照宫附近地图示意点，非阳明门测绘坐标。' },
]);

// 京都、奈良、大阪十二处增补；主体、年代与图版来源见 assets/research/kansai-twelve-20260925-plan.md。
SITES.push(...[
  {
    id: 'jp_daigoji_tower', name: '醍醐寺五重塔', short: '醍醐寺', sub: '五重塔', country: 'JP', types: ['pagoda'], initialStatus: 'unvisited',
    dyn: 'jp_heian', tag: '平安', era: '951年建成', year: 951,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '京都府境内最老的木构建筑。醍醐寺五重塔为醍醐天皇追福而建，朱雀天皇起工，承平年间（931—938）即已规划，拖了二十年，到村上天皇天历五年（951，文化厅登录作952年竣工）才落成。应仁之乱烧尽下醍醐，只有它还站着。木割粗壮，斗栱尚未演成定型的三手先，初层壁画被视为日本密教绘画的源头。',
    facts: ['<b>形制</b>：三间五重塔婆，本瓦葺；用材断面粗大，手法雄浑。昭和二十九至三十四年度（1954—59）解体修理复原各部后，确认其斗栱仍停留在尚未定型的三手先形态，是平安中期塔婆做法的实证。', '<b>沿革</b>：为醍醐天皇冥福而建，与已毁的金堂同在承平年间规划，天历五年（951）落成，寺方与文化厅分别记作951与952年。应仁之乱中下醍醐几乎全毁，仅此塔幸存；1897年列特别保护建筑，1951年指定国宝。', '<b>壁画</b>：初层内部的两界曼荼罗与真言八祖像另列国宝，被称为日本密教绘画的源流，其中的空海像是现存最早的空海肖像；1995年阪神淡路大地震曾使塔身灰泥剥落。塔所属的醍醐寺1994年列入世界遗产。'],
    caption: ['醍醐寺 · 五重塔', '平安时代 · 951年'], legacyNames: ['醍醐寺', '醍醐寺五重塔', 'Daigo-ji Pagoda'], tall: true,
  },
  {
    id: 'jp_sanjusangendo', name: '三十三间堂', short: '三十三间堂', sub: '莲华王院本堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_kamakura', tag: '镰仓', era: '1266年重建', year: 1266,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '118米长的一列屋檐。莲华王院本堂1164年由平清盛为后白河上皇所建，1249年焚毁，1266年在后嵯峨上皇主持下重建，是洛中仅存的两栋镰仓时代建筑之一。外观三十五间，内部身舍三十三间，故称三十三间堂；堂内十级台阶上排着一千零一尊千手观音。江户时代各藩弓手在西侧檐下比射“通矢”，比的就是这一百二十米。',
    facts: ['<b>形制</b>：桁行三十五间、梁间五间，一重入母屋造（文化厅登录字段作切妻造）、本瓦葺，实长118.2米×16.4米；身舍三十三间、四面各绕一间庇，四周设缘，正面全为板扉，侧背面用连子窗；正面七间向拜为1649—51年大修时改造。', '<b>沿革</b>：长宽二年（1164）创建，建长元年（1249）大火焚毁，文永三年（1266）重建供养；1930年修理时在虹梁下发现极彩色纹样，证明初建时内外皆有彩绘；1897年列特别保护建筑，1952年指定国宝。', '<b>价值</b>：文化厅评为京都镰仓时代和样的代表，细长平面专为安置千体佛而设，在现存日本建筑中罕见；2016年京都市埋藏文化财研究所发现地基由砂与黏土分层夯筑，有类似免震的效果；通矢最高纪录为1686年和佐大八郎的8133支。'],
    caption: ['三十三间堂 · 本堂', '镰仓时代 · 1266年重建'], legacyNames: ['莲华王院', '蓮華王院', 'Sanjusangendo'],
  },
  {
    id: 'jp_nijo_ninomaru', name: '二条城二之丸御殿', short: '二条城', sub: '车寄及远侍外观', country: 'JP', types: ['palace'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1602—03年营建 · 1626年前后大改修', year: 1626,
    yearNote: '年表按现存御殿群的1626年前后大改修定位；图版取车寄及远侍外观，不表示整个城郭同年建成。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '车寄的唐破风门脸之后，是六栋御殿雁行排开的第一栋——远侍，二之丸御殿里最大的一栋，来客在“虎之间”候见。二条城1603年由德川家康建成；为迎后水尾天皇1626年行幸，御殿在1624—26年经历了近乎新建的大改修，今日所见即寛永年间的面貌。江户、大坂、名古屋的城郭御殿都已不存，这里是日本城郭中唯一留存的御殿群，六栋皆为国宝。',
    facts: ['<b>形制</b>：车寄是玄关，远侍是来客候见与勅使对面之所，为二之丸御殿六栋中最大的一栋，内有“虎之间”等；其后式台、大广间、苏铁之间、黑书院、白书院自东南向西北雁行排列，以入侧廊与缘侧相连。', '<b>沿革</b>：德川家康1603年筑城；为迎接后水尾天皇寛永三年（1626）九月行幸，御殿自1624年起大改修，川上贡等人的调查表明近于新建，内部狩野派障壁画亦为寛永期所作。屋顶原为柿葺，1686年以前已改瓦葺；1939年由宫内省移交京都市。', '<b>价值</b>：远侍及车寄计为一栋，与其余五栋同列国宝，为江户初期书院造的代表；江户、大坂、名古屋诸城御殿均已不存，二条城是日本城郭中唯一留存的御殿群。障壁画954面另列重要文化财，远侍占273面。1994年列入世界遗产。'],
    caption: ['二条城 · 二之丸御殿车寄', '江户时代 · 1626年前后'], legacyNames: ['元离宫二条城', '二条城', 'Nijo Castle Ninomaru Palace'],
  },
  {
    id: 'jp_yasaka_honden', name: '八坂神社本殿', short: '八坂神社', sub: '祇园造本殿', country: 'JP', types: ['shrine', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1654年造营', year: 1654,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '本殿和拜殿（礼堂）收在同一个桧皮葺大屋顶下，这就是只有八坂神社才有的“祇园造”。1646年刚修完的本殿当年冬天失火烧毁，1654年由四代将军德川家纲出资重建——幕府直接营建社寺的最后一例。平面七间六间，三面再加庇，撑出社殿建筑里最大的一片屋顶；文化厅认定这种以庇扩张的做法是平安时代的方法，形制在镰仓时代已定型，2020年升格国宝。',
    facts: ['<b>形制</b>：桁行七间、梁间六间，入母屋造、桧皮葺，正面向拜三间，两侧与背面各加庇，背面三间突出；身舍分内内阵与内阵，各设三间通长的棚，外阵环绕身舍一周，正面接礼堂，全部收在一个大屋顶下，侧面的庇隔成小室。', '<b>沿革</b>：社方据九条道家日记所载承久二年（1220）火灾查验文，推定久安四年（1148）重建的本殿已近今制；正保三年（1646）幕府修理后于当年十一月失火，承应三年（1654）由德川家纲重建；1911年列特别保护建筑，2020年12月指定国宝。', '<b>价值</b>：以庇层层扩大规模是平安时代的手法，此形制在镰仓时代已成立，江户前期按旧制重建，保存了平安时代的空间构成与中世祭祀仪礼的关系；文化厅指出它由承担祇园祭的町众维护至今，床面积为社殿建筑之最。'],
    caption: ['八坂神社 · 本殿', '江户时代 · 1654年'], legacyNames: ['祇园社', '八坂神社', 'Yasaka Shrine'],
  },
  {
    id: 'jp_yakushiji_east', name: '药师寺东塔', short: '药师寺', sub: '东塔 · 三重六檐', country: 'JP', types: ['pagoda'], initialStatus: 'unvisited',
    dyn: 'jp_nara', tag: '奈良', era: '约730年建成', year: 730, yearApprox: true, yearLabel: '约730年',
    yearNote: '寺方以天平二年（730）为东塔建成时间；年表为现存主体的约略落成点。',
    place: '日本 · 奈良县 · 奈良', placeKey: 'jp_nara',
    lede: '药师寺东塔看似有六层屋檐，实际却是三重塔：每层主屋檐下都多一圈较小的裳阶。大小檐交替，使逐层收束的木塔呈现独特节奏，顶部相轮的水烟还刻着飞舞天人。寺方记录将其建成时间指向天平二年前后，这座奈良时代遗存又历经修理；今天的保存面貌，延续了古塔也包含现代修护。',
    facts: ['三层塔身各附一圈裳阶，从下向上形成六道大小交替的檐线。小屋檐不是新增楼层，而是围绕主层的附属屋面，屋顶之间的比例构成了东塔鲜明的外观。', '寺方以天平二年为东塔建立记录，约对应七三〇年。塔曾多次局部维修，近年又完成全面解体修理，所以奈良时代主体与现代修护应作为相接的两层历史。', '相轮顶部水烟以奏乐、持花的天人表现佛教赞颂，与下方木构的节奏互相呼应。东塔保存古代形制，而同寺西塔有另行重建的历史，二者不能互换年代。'],
    caption: ['药师寺 · 东塔', '奈良时代 · 约730年'], legacyNames: ['薬師寺東塔', 'Yakushiji East Pagoda'], tall: true,
  },
  {
    id: 'jp_gangoji_gokuraku', name: '元兴寺极乐坊本堂', short: '元兴寺', sub: '极乐坊本堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_kamakura', tag: '镰仓', era: '约1244年改建', year: 1244, yearApprox: true, yearLabel: '约1244年',
    yearNote: '现存本堂由旧僧房改建，年代按文化遗产数据库的镰仓时代中期记载约略定位。',
    place: '日本 · 奈良县 · 奈良', placeKey: 'jp_nara',
    lede: '低缓的大瓦顶和连续柱列，让元兴寺极乐坊本堂保留着僧房改作佛堂的尺度。这里的建筑历史藏在旧材和空间中：原来的僧侣住处因智光曼荼罗信仰发展，逐渐成为礼拜场所，镰仓时代再改造成今日主要形态。相邻禅室有自己的保存身份，本堂则让古代生活建筑与中世纪信仰空间相遇。',
    facts: ['本堂是单层寄栋瓦屋顶建筑，正面附一间通长的庇，木柱连续支撑宽展檐面。低缓屋顶与开间组织仍可联系原有僧房，礼拜空间则在旧格局中重新形成。', '现存本堂被认为在宽元二年前后改建，约为一二四四年；内阵及屋架还利用更早的僧房材料。因此镰仓时期形制与奈良时代旧材并存，不能给所有部件同一年龄。', '智光曼荼罗信仰使僧房的一部分转为佛堂，剩余部分另成禅室。两座建筑各有独立身份，这段用途变化显示寺院如何在衰兴之间延续信仰并重新组织空间。'],
    caption: ['元兴寺 · 极乐坊本堂', '镰仓时代 · 约13世纪中叶'], legacyNames: ['元興寺極楽坊本堂', 'Gangoji Gokurakubo Hondo'],
  },
  {
    id: 'jp_kofukuji_hokuen', name: '兴福寺北圆堂', short: '北圆堂', sub: '八角圆堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_kamakura', tag: '镰仓', era: '约1210年重建', year: 1210, yearApprox: true, yearLabel: '约1210年',
    place: '日本 · 奈良县 · 奈良', placeKey: 'jp_nara',
    lede: '兴福寺北圆堂以八角平面和紧凑屋顶围合佛像空间，深出檐下的斗栱让小型佛堂显得庄重而有力量。它原为纪念藤原不比等而建，现存堂在十二世纪火灾后约于一二一〇年重建。堂内弥勒如来、无著与世亲诸像，使建筑、纪念仪礼和镰仓雕刻汇聚在同一处殿堂之中。',
    facts: ['北圆堂采用八角平面，屋顶向各面均衡展开，檐下以三手先斗栱承托深檐。内阵天花与彩色装饰围绕佛像布置，紧凑体量中包含层层构架细节。', '北圆堂初建于七二一年，用以纪念藤原不比等逝世一周年；一一八〇年受灾后，约于一二一〇年重建。现存木构属于镰仓时期，并非奈良时代原堂。', '堂内以弥勒如来为中心，安置无著、世亲等雕像。八角佛堂延续对兴福寺创建者的纪念，也保存镰仓时期佛教雕刻与建筑相互配合的空间。'],
    caption: ['兴福寺 · 北圆堂', '镰仓时代 · 约1210年'], legacyNames: ['興福寺北円堂', 'Kofukuji Hokuendo'],
  },
  {
    id: 'jp_kasuga_honden', name: '春日大社四座本殿', short: '春日大社', sub: '四座春日造本殿', country: 'JP', types: ['shrine'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '现存本殿1863年造替', year: 1863,
    place: '日本 · 奈良县 · 奈良', placeKey: 'jp_nara',
    lede: '春日大社的四座本殿以小巧的春日造形制并列，朱柱、白壁与檜皮屋顶构成重复而有节奏的祭祀空间。四殿分别奉祀不同神明，形式却共同延续古老的神社建筑传统。现存本殿为一八六三年造替，后世修理继续维护旧有形制；理解这一点，便能分清神社历史与眼前建筑的年代。',
    facts: ['四座本殿均为一间社春日造，采用檜皮葺屋顶，殿间与两侧有围墙相接。重复的小体量、朱色木构与白壁共同形成有秩序的神圣内院。', '文化遗产记录将现存本殿定位为文久三年，即一八六三年造替。神社的创立传统追溯至七六八年，定期修理与造替使旧形式延续，却不等于原件一直未变。', '四殿分别奉祀武甕槌命、经津主命、天儿屋根命与比卖神。春日造从这里成为广泛传播的神社形式，建筑的重复与神明的分祀共同表达春日信仰的组织。'],
    caption: ['春日大社 · 四座本殿示意', '江户时代 · 1863年造替'], legacyNames: ['春日大社本社本殿', 'Kasuga Taisha Honden'],
  },
  {
    id: 'jp_sumiyoshi_honden', name: '住吉大社四座本殿', short: '住吉大社', sub: '四座住吉造本殿', country: 'JP', types: ['shrine'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1810年造替', year: 1810,
    place: '日本 · 大阪府 · 大阪', placeKey: 'jp_osaka_city',
    lede: '四座同样大小的社殿一齐朝西，却没有排成一列：三座前后相继，第四座落在第三座南侧。住吉大社以这种少见布局保存住吉造的古朴形式。现存四座本殿都是一八一〇年造替的江户建筑，直线山墙、低矮地板和前后相隔的两室，使古老的祭祀空间仍可从外观读出。',
    facts: ['四座本殿均为檜皮葺的切妻屋顶，入口开在山面，室内分前后两室；第一至第三本宫纵向排列，第四本宫位于第三本宫南侧，四座皆朝西。', '文化财数据库将四座现存本殿定为文化七年造替，即一八一〇年；式年迁宫曾因战乱中断，十七世纪初恢复，古式并不代表木材从未更换。', '住吉造的辨识处在直线破风、较低的地板与不设周边缘廊，板壁包围两室，圆柱立于础石；与檐角曲线鲜明的社殿相比，这里保留简朴的轮廓。'],
    caption: ['住吉大社 · 四座本殿示意', '江户时代 · 1810年'], legacyNames: ['住吉大社本殿', 'Sumiyoshi Taisha Honden'],
  },
  {
    id: 'jp_osaka_sengan', name: '大阪城千贯橹', short: '千贯橹', sub: '现存橹与石垣', country: 'JP', types: ['castle'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1620年建成', year: 1620,
    place: '日本 · 大阪府 · 大阪', placeKey: 'jp_osaka_city',
    lede: '大手口的石垣转角上，一座白壁黑瓦的双层橹将视线引向护城河与城门。千贯橹的体量不及天守，却承担守护入口的实际任务。它在一六二〇年德川幕府重筑大阪城时建成，修理中发现的土台墨书又留下立柱日期，让这座现存橹的年龄有了直接的木材证据。',
    facts: ['千贯橹是两重两层的瓦葺隅橹，立在大手口石垣上，面对城门与壕沟；两层内部都由回廊围绕四间房室，外部轮廓体现入口防守的需要。', '现存橹于一六二〇年在小堀政一监督下建立；一九六〇年起解体修理时，土台木材发现元和六年九月十三日立柱墨书，为营建年代提供实物依据。', '千贯之名相传来自攻打石山本愿寺时难以攻取的角橹，不能据此把眼前建筑认作本愿寺遗存；现存橹与乾橹共同保存德川重筑初期的城防形态。'],
    caption: ['大阪城 · 千贯橹与石垣', '江户时代 · 1620年'], legacyNames: ['千貫櫓', 'Sengan Yagura'],
  },
  {
    id: 'jp_jigenin_tahoto', name: '慈眼院多宝塔', short: '慈眼院', sub: '多宝塔', country: 'JP', types: ['pagoda'], initialStatus: 'unvisited',
    dyn: 'jp_kamakura', tag: '镰仓', era: '1271年建成', year: 1271,
    place: '日本 · 大阪府 · 泉佐野', placeKey: 'jp_izumisano',
    lede: '方形下层托着圆形上层，两道檜皮屋檐在小小塔身上展开，慈眼院多宝塔的精巧首先在这种方圆转换中显现。现存塔按一二七一年断代，文化财资料也以构件样式印证这一营建时期。上层层叠斗栱、下层细致蟇股与室内佛坛，共同保存镰仓时期多宝塔的丰富细节。',
    facts: ['多宝塔下层为三间方形平面，上层为圆形塔身，两层屋面覆檜皮；上层四手先、下层二手先斗栱承托出檐，紧凑体量中仍有丰富的构造层次。', '文化财数据库登记文永八年，即一二七一年，并认为建筑样式与这一年代相符；明治时期修理移位后另设基坛，现存塔基不能直接认作镰仓原状。', '塔内不设常见的四天柱，形成完整一室，仏坛与塔的营建时期相同；檐下蟇股的鳍状花纹显示装饰变化，是观察镰仓木构细部的一处实例。'],
    caption: ['慈眼院 · 多宝塔', '镰仓时代 · 1271年'], legacyNames: ['慈眼院多宝塔', 'Jigenin Tahoto'], tall: true,
  },
  {
    id: 'jp_kanshinji_kondo', name: '观心寺金堂', short: '观心寺', sub: '金堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '14世纪中叶营建', year: 1355, yearApprox: true, yearLabel: '14世纪中叶',
    yearNote: '文化财资料将金堂定在1346—1369年之间；1355仅为年表中的约略位置，不是精确建成年。',
    place: '日本 · 大阪府 · 河内长野', placeKey: 'jp_kawachinagano',
    lede: '七间正面的大殿覆以单层歇山瓦顶，三间向拜向前伸出，把参拜者引向深处的内阵。观心寺金堂的看点并非一种纯粹样式，而是和样木构中融入大佛样与禅宗样的组合。文化财资料把现存殿定在一三四六至一三六九年之间；今日所见还包含此后历次修理的层次。',
    facts: ['金堂面阔七间、进深七间，单檐歇山屋顶前设三间向拜；室内严格区分内外阵，以菱格栏间和格子门隔开，体现密教佛殿对礼拜空间的组织。', '文化财资料登记正平年间的一三四六至一三六九年营建范围，详解也说明现殿在十四世纪后期以前再兴；以后多次修理，不能指定一个未经确认的竣工年。', '殿宇以和样为基础，同时吸收大佛样的双斗与禅宗样的构造手法；看柱础、向拜和内部梁架的差异，比将全殿归为单一样式更能理解其中的交流。'],
    caption: ['观心寺 · 金堂', '室町初期 · 14世纪中叶'], legacyNames: ['観心寺金堂', 'Kanshinji Kondo'],
  },
]);
PLACES.push(...[
  { key: 'jp_osaka_city', name: '大阪', prov: '大阪府', country: 'JP', lat: 34.68, lon: 135.5, coordinate_note: '大阪市内两处古迹地图示意点，非单体测绘坐标。' },
  { key: 'jp_izumisano', name: '泉佐野', prov: '大阪府', country: 'JP', lat: 34.375, lon: 135.317, coordinate_note: '慈眼院附近地图示意点，非多宝塔测绘坐标。' },
  { key: 'jp_kawachinagano', name: '河内长野', prov: '大阪府', country: 'JP', lat: 34.43, lon: 135.57, coordinate_note: '观心寺附近地图示意点，非金堂测绘坐标。' },
]);

// 京都及近郊十处增补；年代、所绘范围与实拍来源见逐图 research JSON。
SITES.push(...[
  {
    id: 'jp_tofukuji_sanmon', name: '东福寺三门', short: '东福寺', sub: '现存三门', country: 'JP', types: ['gate'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '1425年建成', year: 1425,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '现存最早的禅寺三门，却不是禅宗样：文化厅指出它的构造其实近于大佛样，木割粗壮，有东大寺南大门式的气派。东福寺1236年由九条道家创建，三门在1319、1334、1336年三度火灾后重建，寺传1384年动工、1425年完成；1969—77年解体修理发现的墨书表明，瓦顶与二层做工在1405—13年前后施作，文化厅据此登录为1405年。足利义持所题“玅云阁”匾仍挂在上层。',
    facts: ['<b>形制</b>：五间三户二阶二重门，入母屋造、本瓦葺，南面；两侧附切妻造本瓦葺山廊。“五间三户”即正面五间、中央三间为通道，“二重门”指上下两层均出屋檐；上层安释迦如来与十六罗汉，天井与柱有明兆师徒的极彩画。', '<b>沿革</b>：寺创于嘉祯二年（1236），门在1319、1334、1336年三次火灾后重建，寺传1384年起工、应永三十二年（1425）完成；1969—77年解体修理发现墨书，证明瓦葺与二层造作延续至1405—13年前后；1585年地震倾斜由秀吉修复，1792年再修；1897年列特别保护建筑，1952年指定国宝。', '<b>价值</b>：现存最古的禅寺三门，结构却不取纯粹禅宗样而近于大佛样，用材粗大、气势雄浑，文化厅称其在日本建筑中别具一格；上层“玅云阁”匾为足利义持所书。知恩院、南禅寺的江户三门与它同属五间三户二重门一系。'],
    caption: ['东福寺 · 三门', '室町时代 · 1425年'], legacyNames: ['東福寺三門', 'Tofukuji Sanmon'],
  },
  {
    id: 'jp_fushimi_inari_honden', name: '伏见稻荷大社本殿', short: '伏见稻荷', sub: '稻荷造本殿', country: 'JP', types: ['shrine', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '1499年再建', year: 1499,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '先看屋顶：桧皮葺的大屋面从正脊一路流到前檐，把五间宽的身舍与前廊盖在同一片斜坡下——这就是“流造”。所绘为伏见稻荷大社本殿。应仁之乱中社殿全毁，乱后由社僧劝进重建，文化厅依明应三年（1494）断代，明应八年（1499）举行迁宫。它是全国约三万座稻荷神社总本宫的正殿；千本鸟居之外，这座朱红木构才是建筑的主角。',
    facts: ['<b>形制</b>：五间社流造、桧皮葺，正面五间，前坡屋面延伸覆住阶前；殿内一宇相殿并祀五柱：下社宇迦之御魂、中社佐田彦、上社大宫能卖，加上1499年合祀的田中大神与四大神。', '<b>沿革</b>：和铜四年（711）稻荷大神镇座稻荷山；旧社殿毁于应仁之乱（1467—77），乱后劝进重建，1494年成本殿，1499年迁宫。1909年指定重要文化财，2014年权殿、楼门等7栋追加指定。', '<b>价值</b>：流造是日本分布最广的本殿形式，五间规模已属大型。本殿后方的权殿（1635）、丰臣秀吉1589年所建楼门与南北回廊共同构成社头；千本鸟居是信众奉纳，建筑核心仍是这座室町后期的本殿。'],
    caption: ['伏见稻荷大社 · 本殿', '室町时代 · 1499年再建'], legacyNames: ['伏見稲荷大社本殿', 'Fushimi Inari Taisha Honden'],
  },
  {
    id: 'jp_kitano_honden', name: '北野天满宫本殿', short: '北野天满宫', sub: '本殿、石之间与拜殿', country: 'JP', types: ['shrine', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1607年造营 · 桃山样式', year: 1607,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '本殿与拜殿之间夹着一段地面低下去的“石之间”，连成一栋；拜殿两侧再接乐之间，于是桧皮葺的屋脊、千鸟破风、轩唐破风层层交错——所以叫“八栋造”。这组社殿是丰臣秀赖1607年以片桐且元为奉行所建，日光东照宫那类“权现造”的源头就在这里。石之间上方架大虹梁、立大瓶束托起化妆栋木，是文化厅眼中最该看的部分，1959年指定国宝。',
    facts: ['<b>形制</b>：本殿桁行五间、梁间四间，入母屋造，右侧面附三间庇；石之间桁行三间、梁间一间，两下造；拜殿桁行七间、梁间三间，入母屋造，正面千鸟破风，向拜七间带轩唐破风；东西乐之间各接拜殿两端。全部桧皮葺，合计为一栋。', '<b>沿革</b>：社传天历元年（947）创立，天德三年（959）藤原师辅增建，其后屡遭火灾；现存社殿为庆长十二年（1607）丰臣秀赖造营，片桐且元任奉行；1897年列特别保护建筑，1959年指定国宝。', '<b>价值</b>：以石之间连接本殿与拜殿的权现造在此成形，石之间上大虹梁、大瓶束、蟇股托化妆栋木的架构是精华；文化厅评其兼有平安古制平面与近世初期神社建筑的代表性，维基称其为唯一保持原规模的桃山神社建筑。'],
    caption: ['北野天满宫 · 本殿建筑群', '江户初期 · 1607年'], legacyNames: ['北野天満宮本殿', 'Kitano Tenmangu Honden'],
  },
  {
    id: 'jp_ninnaji_kondo', name: '仁和寺金堂', short: '仁和寺', sub: '旧宫中紫宸殿移建', country: 'JP', types: ['hall', 'palace'], initialStatus: 'unvisited',
    dyn: 'jp_momoyama', tag: '桃山', era: '1613年原构 · 江户初期移建', year: 1613,
    yearNote: '年表采用文化遗产数据库所列1613年原构年代；寺方记载于1624—1643年间移建为金堂，现存屋面亦有改变。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '一座宫殿改成了佛堂。仁和寺金堂原是京都御所的正殿紫宸殿，庆长十八年（1613）建成；1634年门迹觉深法亲王向德川家光请求复兴应仁之乱后荒废的伽蓝，正值御所改建，旧紫宸殿被赐予寺院，1643年在此上梁。桧皮屋顶换成本瓦，西庇拆除，格子蔀户与金色饰件却留了下来——这是现存唯一一座由紫宸殿移建而来的建筑，1953年指定国宝。',
    facts: ['<b>形制</b>：桁行七间、梁间五间，一重入母屋造，向拜一间，本瓦葺；身舍以虹梁与蟇股承化妆屋根裏，向拜施雕刻，正面格子蔀户与宫殿式金色饰件俱存。移建时拆去西庇，桧皮葺改为本瓦葺，建具隔间略有调整，结构未变。', '<b>沿革</b>：仁和寺886年着手、888年建成，应仁之乱中全毁；寛永十一年（1634）觉深法亲王请德川家光复兴，适逢御所改建，庆长十八年（1613）落成的紫宸殿与清凉殿等被下赐移建，金堂于寛永二十年（1643）上梁，伽蓝1646年完成；1900年列特别保护建筑，1953年指定国宝。', '<b>价值</b>：现存唯一由紫宸殿移建而来的遗构，也是最古的紫宸殿实例，近世寝殿造的研究标本；今日京都御所的紫宸殿为1855年重建，比它晚两个多世纪。文化厅解说文记原殿为庆长十六年（1611）造营，详细解说作1613年完成，年表取后者。'],
    caption: ['仁和寺 · 金堂', '桃山原构 · 江户初期移建'], legacyNames: ['仁和寺金堂', 'Ninnaji Kondo'],
  },
  {
    id: 'jp_hongwanji_hiunkaku', name: '西本愿寺飞云阁', short: '飞云阁', sub: '滴翠园三层楼阁', country: 'JP', types: ['pavilion'], initialStatus: 'unvisited',
    dyn: 'jp_momoyama', tag: '桃山', era: '桃山时期 · 建造年代未详', year: 1600, yearApprox: true, yearLabel: '桃山时期',
    yearNote: '1600仅供年表约略定位，并非确切建造年；聚乐第旧构移建说有传承但未获证实。文化遗产数据库将其归为桃山时期。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '三层楼阁逐层缩小，重心一层层往东偏，屋顶一层一种：底层入母屋造加唐破风与千鸟破风，二层寄栋造三面小轩唐破风，三层寄栋造。柱子细、障子多，像浮在滴翠园沧浪池上的一片云——“飞云阁”由此得名。寺传它是丰臣秀吉聚乐第的遗构，寛永年间移来，但文化厅注明“详情不明”，建筑史界多持怀疑；桃山时代的年代判断只能到此为止。',
    facts: ['<b>形制</b>：三重柿葺楼阁，南北面25.8米、东面11.8米、西面12.5米，北面沧浪池；一层有招贤殿、八景之间、船入之间及后增茶室憶昔，二层歌仙之间绘三十六歌仙，三层摘星楼四面开花头窗；船可由池直接驶入船入之间，是它唯一的正式入口。', '<b>年代</b>：文化厅归入桃山时代（1573—1614）。寺藏1638年成书的《紫云殿由缘记》称为秀吉遗构，由此流传聚乐第（1589—90年建，1595年拆毁）移建之说，但无确证，样式亦偏晚；另有寛永年间本愿寺自建说与自京都新城移筑说。1897年列特别保护建筑，1951年指定国宝。', '<b>价值</b>：文化厅称其木割纤细、形态轻快奇拔，是庭园建筑的典型；与金阁、银阁并称京都三名阁。茶室憶昔席为宽政七年（1795）薮内竹阴等增建，年代明确；西侧以渡廊连接兼作浴室的黄鹤台，与阁同为滴翠园的一体设计。'],
    caption: ['西本愿寺 · 飞云阁', '桃山时期 · 年代未详'], legacyNames: ['本願寺飛雲閣', 'Hiunkaku', 'Hiyunkaku'],
  },
  {
    id: 'jp_manpukuji_daiou', name: '万福寺大雄宝殿', short: '万福寺', sub: '黄檗宗大雄宝殿', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1668年建成', year: 1668,
    place: '日本 · 京都府 · 宇治', placeKey: 'jp_uji',
    lede: '进殿先抬头：正面一间的轩下垂木做成半圆拱形，寺中称“黄檗天井”；门扇上刻桃形“桃符”，两侧开圆窗——都是日本其他寺院见不到的明末做法。所绘为万福寺大雄宝殿。隐元隆琦1661年在宇治开山，宝殿宽文八年（1668）建成，桁行三间、梁间三间带裳阶，入母屋造、本瓦葺，殿前设月台。日本唯一以柚木建成的历史建筑，2024年12月与法堂、天王殿一同升格国宝。',
    facts: ['<b>形制</b>：桁行三间、梁间三间，一重带裳阶（もこし），外观如两层；入母屋造、本瓦葺，正面附月台。上层匾“大雄宝殿”隐元书，下层匾“万德尊”木庵书。木料为暹罗柚木，由居士胜性因与幕府捐施。', '<b>沿革</b>：隐元1654年应请东渡，1661年得寺地创建；伽蓝1661年起营建，1679年大体完成；大雄宝殿1668年建，本尊释迦像1669年京大佛师兵部作。1913年指定重要文化财，2024年12月9日指定国宝。', '<b>价值</b>：文化厅称其伽蓝配置与样式受明末清初佛教建筑影响；殿内依明代寺院之制安置十八罗汉（范道生1663年作），而非日本惯见的十六罗汉。黄檗天井、卍崩栏杆、桃符、圆窗构成一套完整的中国意匠。'],
    caption: ['万福寺 · 大雄宝殿', '江户时代 · 1668年'], legacyNames: ['萬福寺大雄寶殿', 'Manpukuji Daiouhouden'],
  },
  {
    id: 'jp_iwashimizu_honden', name: '石清水八幡宫本社', short: '石清水八幡宫', sub: '楼门与回廊正面局部', country: 'JP', types: ['shrine', 'gate'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1634年完成现存社殿群', year: 1634,
    place: '日本 · 京都府 · 八幡', placeKey: 'jp_yawata',
    lede: '正面看到的是朱漆楼门：一间一户、入母屋造，前方伸出两间拜所，罩着向唐破风，桧皮葺屋顶下塞满极彩色栏间雕刻；两侧回廊本瓦葺、各十三间，把本社围成一圈。所绘为石清水八幡宫本社的楼门与回廊正面。贞观二年（860）创建，现存社殿群是宽永十一年（1634）德川家光造替。回廊后面藏着现存最古、最大的八幡造本殿，2016年本社十栋一并指定国宝。',
    facts: ['<b>形制</b>：楼门一间一户、入母屋造，正面拜所桁行二间、梁间一间、向唐破风造，桧皮葺；左右回廊各桁行十三间、梁间二间，外侧附一间通庇，入母屋造、本瓦葺，与东门、西门、背面回廊合围本殿。', '<b>沿革</b>：860年创建，屡毁屡兴；1580年织田信长修复社殿，1598年起丰臣秀赖再兴，1634年幕府造替成今貌。1897年列特别保护建筑，2016年2月9日本社十栋附栋札三枚指定国宝。', '<b>价值</b>：围墙里的本殿由前后并列的内殿与外殿组成“八幡造”，各十一间，为同形式中现存最古、规模最大；文化厅称整组社殿“保持古代成立的庄严形式，兼具近世装饰”。与伊势神宫并称二所宗庙。'],
    caption: ['石清水八幡宫 · 本社正面局部', '江户时代 · 1634年'], legacyNames: ['石清水八幡宮本社', 'Iwashimizu Hachimangu'],
  },
  {
    id: 'jp_ishiyamadera_tahoto', name: '石山寺多宝塔', short: '石山寺', sub: '多宝塔', country: 'JP', types: ['pagoda'], initialStatus: 'unvisited',
    dyn: 'jp_kamakura', tag: '镰仓', era: '1194年建成', year: 1194,
    place: '日本 · 滋贺县 · 大津', placeKey: 'jp_otsu',
    lede: '两重檜皮屋檐之间，方形下层转为圆形塔身，石山寺多宝塔把轻重与曲直安排得均衡。它的建年并不只靠寺传：须弥坛构件上的墨书记录一一九四年，成为断代依据。塔内大日如来与四天柱上的佛画又把建筑、雕像和绘画连在一起；现貌屋面经历后世修护。',
    facts: ['塔以方形下层承托圆形上层，两重屋顶覆檜皮，出檐舒展；室内中央供奉金刚界大日如来，周围四天柱承托空间，方圆平面组合是多宝塔的基本特征。', '下层须弥坛上框背面的墨书记建久五年，即一一九四年；现存塔属建年有据的早期多宝塔，檜皮屋面后来重新修葺，不把表层材料全视为当年原件。', '本尊被认定为快庆作品，四天柱还绘金刚界诸尊与五大尊；建筑与同时期佛教艺术相互呼应，让塔不仅有可辨的外形，也保存内部礼拜的视觉秩序。'],
    caption: ['石山寺 · 多宝塔', '镰仓时代 · 1194年'], legacyNames: ['石山寺多宝塔', 'Ishiyamadera Tahoto'], tall: true,
  },
  {
    id: 'jp_ishiyamadera_hondo', name: '石山寺本堂', short: '石山寺本堂', sub: '正堂与礼堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_heian', tag: '平安', era: '1096年正堂再建 · 1602年礼堂增建', year: 1096,
    yearNote: '年表采用现存正堂1096年再建年份；前方礼堂于1602年增建，图版所见屋面与外观包含两个时期。',
    place: '日本 · 滋贺县 · 大津', placeKey: 'jp_otsu',
    lede: '向岩坡外挑出的礼堂与后方正堂相接，石山寺本堂的连体屋面将两个年代收进同一轮廓。正堂在火灾后于一〇九六年再建，前方礼堂于一六〇二年增建，之间以相之间衔接。这里适合细看屋顶如何跨过山地高差，也提醒人们，一座古殿的现貌常由不同时代共同构成。',
    facts: ['本堂由后方正堂、前方礼堂与连接两者的相之间组成，礼堂以悬造木架支承在岩坡外；连续檜皮屋顶把祭祀内阵与礼拜外阵纳入同一建筑轮廓。', '一〇七八年火灾烧毁旧堂，一〇九六年再建的正堂保留至今；一六〇二年淀殿捐建礼堂形成今日组合，两段营建必须分别说明，不能把整座建筑视为同年完成。', '悬造利用岩盘高差安排佛殿与参拜空间，连屋面的变化可以读出旧堂与增建部分的关系；建筑本身就呈现平安晚期与近世营造相接的历史层次。'],
    caption: ['石山寺 · 本堂', '平安正堂 · 江户初期礼堂'], legacyNames: ['石山寺本堂', 'Ishiyamadera Hondo'],
  },
  {
    id: 'jp_chionin_sanmon', name: '知恩院三门', short: '知恩院', sub: '现存三门', country: 'JP', types: ['gate'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1621年建成', year: 1621,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '高24米，现存最大的二阶二重门，比东大寺南大门还高大。德川秀忠1619年发愿，1621年秋基本完工，由幕府御用的中井家栋梁营建；1992年平成大修理时在上层屋顶的土居葺板上找到元和七年（1621）的墨书，年代由此坐实。1633年大火几乎烧尽知恩院，三门、经藏、势至堂幸免，所以它比院内绝大多数建筑都老。2002年与御影堂一同指定国宝。',
    facts: ['<b>形制</b>：五间三户二阶二重门，入母屋造、本瓦葺，西面，高24米；两侧山廊各三间二间，切妻造本瓦葺。细部以禅宗样为基调：组物密排为诘组，圆柱带粽立于础盘，上层用扇垂木；上层内安释迦如来与十六罗汉，天井绘龙，满施极彩色。', '<b>沿革</b>：元和五年（1619）德川秀忠下令营建三门与经藏，元和七年（1621）秋大体完工，栋梁出自中井家；1992年完成的平成大修理在上层土居葺板上发现元和七年墨书。寛永十年（1633）大火中与经藏、势至堂幸存；1902年列特别保护建筑，2002年指定国宝。', '<b>价值</b>：文化厅评为江户初期建筑技术发挥至极、完成度极高的遗构，现存最大的二阶二重门，装饰亦极庄严，是净土宗总本山的象征；“三门”取三解脱门之义。南禅寺三门（1628）营造前曾专门调查过它，两者同为德川时代东山巨门。'],
    caption: ['知恩院 · 三门', '江户时代 · 1621年'], legacyNames: ['知恩院三門', 'Chionin Sanmon'],
  },
]);
PLACES.push(...[
  { key: 'jp_yawata', name: '八幡', prov: '京都府', country: 'JP', lat: 34.8793, lon: 135.6995, coordinate_note: '石清水八幡宫附近地图示意点，非本殿测绘坐标。' },
  { key: 'jp_otsu', name: '大津', prov: '滋贺县', country: 'JP', lat: 34.9699, lon: 135.9035, coordinate_note: '石山寺附近地图示意点，非单体测绘坐标。' },
]);

// 京都及周边十三处增补；图版取景、断代及许可详见同 ID 的逐图研究记录。
SITES.push(...[
  {
    id: 'jp_nanzenji_sanmon', name: '南禅寺三门', short: '南禅寺', sub: '现存三门', country: 'JP', types: ['gate'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1628年再建', year: 1628,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '歌舞伎里石川五右卫门在这座门楼上喊出“绝景かな”，其实他死后三十多年门才建起来。南禅寺三门1295年初建，1447年烧毁，现存者是1628年津藩主藤堂高虎为大坂夏之阵阵亡的部下所建，别号“天下龙门”。营造前以心崇传特意派人调查相国寺与知恩院的三门作参考，所以它和知恩院三门同属五间三户二重门一系，高约22米；上层五凤楼天井的凤凰天人为狩野探幽等所绘。',
    facts: ['<b>形制</b>：五间三户二阶二重门，入母屋造、本瓦葺，西面，高约22米；两侧山廊各桁行三间、梁间二间，切妻造本瓦葺。上层名五凤楼，安宝冠释迦坐像、十六罗汉及德川家康、藤堂高虎等像，天井凤凰与天人图传为狩野探幽、土佐德悦所绘。', '<b>沿革</b>：永仁三年（1295）西园寺实兼捐建初代三门，应安年间改建，文安四年（1447）大火焚毁；寛永五年（1628）藤堂高虎为大坂夏之阵战死的家臣祈福再建，吉田贞右卫门任总奉行，以心崇传指示参考相国寺、知恩院三门；1899年指定重要文化财。', '<b>价值</b>：与知恩院三门、东本愿寺御影堂门并称京都三大门，禅宗样的厚重量感与列柱是特色；门前高六米余的石灯笼为1628年佐久间胜之奉献。石川五右卫门“绝景かな”的台词出自歌舞伎《楼门五三桐》，虽非史实，却使此门广为人知。'],
    caption: ['南禅寺 · 三门', '江户时代 · 1628年'], legacyNames: ['南禅寺三門', 'Nanzenji Sanmon'],
  },
  {
    id: 'jp_ujigami_honden', name: '宇治上神社本殿', short: '宇治上神社', sub: '本殿外护屋', country: 'JP', types: ['shrine', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_heian', tag: '平安', era: '平安后期现存社殿', year: 1100, yearApprox: true, yearLabel: '11世纪末',
    yearNote: '1100仅供年表约略定位；本殿一般断为11世纪末，外护屋内还有三座内殿。',
    place: '日本 · 京都府 · 宇治', placeKey: 'jp_uji',
    lede: '外面看是一栋五间三间的流造长屋，其实它是三座一间社流造内殿的“外罩”——侧墙、后坡屋顶与左右两殿共用，中殿略小，整个缩在里面。文化厅据细部手法断为12世纪前期，2004年奈良文化财研究所的年轮年代测定把木料推到1060年前后，与隔河相望的平等院凤凰堂（1053）同期：现存最古的神社建筑。年表只取“11世纪末”的约略定位。',
    facts: ['<b>形制</b>：覆屋桁行五间、梁间三间，一重流造、桧皮葺，内藏三座一间社流造内殿；覆屋侧面、背面的墙柱与后坡屋顶同左右殿共用，可知内殿与覆屋自始一体；中殿小于左右殿，用舟肘木、无蟇股；向右的左殿以两板拼成的蟇股最古。', '<b>年代</b>：文化厅据细部推定为12世纪前期（平安后期）；2004年2月奈良文化财研究所与宇治市年轮年代测定得1060年前后，并指出与1052年创建的平等院关系密切。1902年列特别保护建筑，1952年指定国宝；左右殿扉内侧童子、随身彩绘另为重文。', '<b>价值</b>：被认定为现存最古的神社建筑，内殿是遍及全国的流造的早期典型；三殿分祀菟道稚郎子、应神天皇、仁德天皇，左殿年代最早；1994年与平等院同列世界遗产古都京都文化财，所在仏德山一带2018年又指定为名胜宇治山。'],
    caption: ['宇治上神社 · 本殿', '平安后期 · 约11世纪末'], legacyNames: ['宇治上神社本殿', 'Ujigami Shrine Honden'],
  },
  {
    id: 'jp_ujigami_haiden', name: '宇治上神社拜殿', short: '宇治上神社', sub: '拜殿', country: 'JP', types: ['shrine', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_kamakura', tag: '镰仓', era: '镰仓初期现存拜殿', year: 1210, yearApprox: true, yearLabel: '13世纪初',
    yearNote: '1210只供年表约略定位，非确切建成年；拜殿一般断为镰仓初期。',
    place: '日本 · 京都府 · 宇治', placeKey: 'jp_uji',
    lede: '一座住宅，不是一座庙。拜殿的切妻主屋两端各接一间庇，用縋破风把屋檐折下去，远看像入母屋造；四周绕高栏缘，正面中央一间向拜带踏步，墙面满用蔀户——文化厅说它“在一切方面都近于住宅建筑”，常被称作寝殿造的遗构。镰仓前期所造，殿内保存的旧蟇股与桟唐户属14世纪前半，可能曾在那时重建或大改。它是本殿之外宇治上神社的另一件国宝。',
    facts: ['<b>形制</b>：桁行六间、梁间三间，一重切妻造、桧皮葺，两妻各附一间通庇，向拜一间；主屋实为五间，左端加一短间入庇；四周高栏缘，主屋圆柱、庇与向拜面取方柱，舟肘木，正背面中央板扉，余蔀户；主屋二轩疏垂木，向拜繁垂木；内三室。', '<b>年代</b>：文化厅断为镰仓前期（1185—1274），1902年列特别保护建筑，1952年11月指定国宝。殿内保存一组古蟇股与桟唐户，年代约14世纪前半，推测当时曾重建或近于重建的大改造；“由宇治离宫建筑移筑”之说，文化厅认为是近代才出现的附会。', '<b>价值</b>：切妻主屋两端以縋破风接庇屋顶，外观近似入母屋，是其最独特处；板床、天井与大量蔀户近于中世住宅，是寝殿造研究的重要参照。与平安后期的本殿分属两个时代，不可合并断代；两者同为1994年世界遗产的构成要素。'],
    caption: ['宇治上神社 · 拜殿', '镰仓初期 · 约13世纪初'], legacyNames: ['宇治上神社拝殿', 'Ujigami Shrine Haiden'],
  },
  {
    id: 'jp_kozanji_sekisuiin', name: '高山寺石水院', short: '高山寺', sub: '石水院开放廊内景', country: 'JP', types: ['hall', 'residence'], initialStatus: 'unvisited',
    dyn: 'jp_kamakura', tag: '镰仓', era: '镰仓前期原构 · 明治移筑', year: 1230, yearApprox: true, yearLabel: '13世纪前期',
    yearNote: '1230只供年表约略定位；石水院属镰仓前期建筑，现址为1889年移筑后的位置。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '开敞的一间通庇朝向山谷，木格栏板之外就是栂尾的树海——画的正是这一段。石水院原是明惠上人1206年重兴高山寺时的东经藏，1228年洪水冲走了最初的石水院，它便顶替了这个名字，兼祀春日、住吉两明神，1889年才从金堂东侧搬到现址。改动很多，却是明惠时代留下的唯一建筑；室内“日出先照高山之寺”匾传为后鸟羽上皇所书。',
    facts: ['<b>形制</b>：桁行正面三间、背面四间，梁间三间，正面再出一间通庇，一重入母屋造、妻入，庇自主屋葺下，向拜一间，柿葺。据寛永十四年（1637）古图，东侧今座敷原为显经藏，西侧长室安春日、住吉两明神，北侧方一间为密经藏，柱上痕迹可证。', '<b>沿革</b>：高山寺传为天台僧尊意所开，建永元年（1206）明惠得后鸟羽上皇赐地重兴；最初的石水院毁于安贞二年（1228）洪水，此后这座东经藏改称石水院，传为明惠住房；明治二十二年（1889）由金堂东方移至现址；1898年列特别保护建筑，1953年指定国宝。', '<b>价值</b>：文化厅断为镰仓前期，指出虽经大幅改造，仍是明惠重兴期唯一遗构；外观如住宅而本为经藏，是镰仓初期寺院建筑向住宅风过渡的实例。寺藏《鸟兽人物戏画》等国宝今多寄存东京、京都国立博物馆；1994年列入世界遗产。'],
    caption: ['高山寺 · 石水院开放廊', '镰仓前期 · 明治移筑'], legacyNames: ['高山寺石水院', 'Kozanji Sekisuiin'],
  },
  {
    id: 'jp_kamigamo_honden', name: '上贺茂神社本殿与权殿', short: '上贺茂神社', sub: '本殿与权殿前部', country: 'JP', types: ['shrine', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1863年现存社殿', year: 1863,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '两座一模一样的三间社流造并排立在高台上：东（右）为本殿，西（左）为权殿，式年迁宫时权殿充当临时本殿——“一正一备”的配置本身就是看点。所绘为上贺茂神社（贺茂别雷神社）本殿与权殿的前部。现存二殿为文久三年（1863）造替，文化厅认为与嘉元年间（约1303）的造替相差无几，是流造的典型，1953年指定国宝；两殿檐下各有狩野派所绘的一对“影狛”。',
    facts: ['<b>形制</b>：本殿、权殿同为三间社流造、桧皮葺：桁行三间、梁间二间的身舍前接三间庇，屋面从后坡一直缓缓流到前檐，“流造”即由此得名。二殿正面各绘一对狛犬，称“影狛”，出自江户时代狩野派之手。', '<b>沿革</b>：社史溯至天武朝（673—686）造替；平安末至室町中期约每二十余年式年造替，江户再兴此制；现存二殿1863年造替。1901年列特别保护建筑，1953年3月31日指定国宝，1994年列入世界遗产。', '<b>价值</b>：流造是日本分布最广的本殿形式，官网称占全国神社约六成；文化厅称此本殿与1303年前后造替者“相差无几，善传古制”。上贺茂社有国宝2栋、重要文化财41栋，与下鸭神社同为平安京的皇城镇护之社。'],
    caption: ['上贺茂神社 · 本殿与权殿', '江户时代 · 1863年'], legacyNames: ['賀茂別雷神社本殿・権殿', 'Kamigamo Honden and Gonden'],
  },
  {
    id: 'jp_shimogamo_honden', name: '下鸭神社东西本殿', short: '下鸭神社', sub: '东西本殿前部示意', country: 'JP', types: ['shrine', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1863年现存本殿', year: 1863,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '深处并立两座本殿：西本殿祀贺茂建角身命，东本殿祀其女玉依媛命——母神与外祖父神各占一殿，这正是“御祖”之名的由来。所绘为下鸭神社（贺茂御祖神社）东西本殿的前部。二殿同为三间社流造、桧皮葺，文久三年（1863）造替，与上贺茂神社本殿形式完全一致，1953年指定国宝。长元九年（1036）定下的二十一年一度式年迁宫，至今仍在延续，只是改建已变成修理。',
    facts: ['<b>形制</b>：东、西本殿均为三间社流造、桧皮葺，桁行三间、梁间二间的身舍前接一间庇，前坡屋面长长流下；二殿并列于高台，前有阶与前廊，外观大半被回廊遮挡，参拜者只能看到前部构件。', '<b>沿革</b>：白凤六年（677）造营有记录，长元九年（1036）定二十一年一度式年造替，室町中衰、宽永以后复兴；现存二殿1863年造替。1901年列特别保护建筑，1953年指定国宝，1994年列入世界遗产。', '<b>价值</b>：文化厅称其“与上贺茂神社形式完全相同，是流造的典型”。因本殿2栋为国宝、社殿53栋为重要文化财，第34回式年迁宫（2015）以修理替代重建，是古制与文物保护的折中。'],
    caption: ['下鸭神社 · 东西本殿前部', '江户时代 · 1863年'], legacyNames: ['賀茂御祖神社東本殿・西本殿', 'Shimogamo East and West Honden'],
  },
  {
    id: 'jp_enryakuji_komponchudo', name: '延历寺根本中堂', short: '延历寺', sub: '现存根本中堂外观', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1640年再建', year: 1640,
    place: '日本 · 滋贺县 · 大津（比叡山）', placeKey: 'jp_hieizan',
    lede: '深檐下展开十一间正面，延历寺根本中堂将宽阔外观与内部高低不同的礼拜空间连在一起。今天的主堂是一六四〇年再建的江户木构，并非最澄开创比叡山寺时的原殿。外阵和中阵铺木板，内阵却下降到石铺地面，三座佛龛在其中安置，空间等级比外面的屋顶更耐人细看。',
    facts: ['根本中堂面阔十一间、进深六间，内部由外阵、中阵与内阵构成；前部两阵铺板，后部内阵为石铺土地面，三座宫殿式佛龛组织核心礼拜区域。', '延历寺起于最澄在八世纪末开创的比叡山寺，伽蓝历经火灾与兵火；现存根本中堂于一六四〇年再建，寺院创立与今日主堂年代须分开理解。', '前部地板和后部石地面在同一大屋顶下形成空间差异，体现天台寺院对仪礼的安排；与仅看外观体量相比，理解内外阵关系更能读出这座主堂的性质。'],
    caption: ['延历寺 · 根本中堂', '江户时代 · 1640年再建'], legacyNames: ['延暦寺根本中堂', 'Enryakuji Konponchudo'],
  },
  {
    id: 'jp_katsura_koshoin', name: '桂离宫古书院', short: '桂离宫', sub: '古书院', country: 'JP', types: ['palace', 'residence'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '17世纪初营建', year: 1615, yearApprox: true, yearLabel: '17世纪初',
    yearNote: '1615仅为年表约略定位；宫内厅将古书院归于约17世纪初，不把书院整体视为同年一次建造。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '先看那片伸向池面的竹缘——月见台。古书院的广缘再向外探出一块露台，正对池东的松琴亭；1933年布鲁诺·陶特就是站在这里为桂离宫落泪。所绘为桂离宫古书院，八条宫智仁亲王别业中最早的一栋。昭和大修理（1976—82）的调查推定它约建于元和元年（1615）前后，起初是一座独立建筑；中书院约1641年、新御殿约1662年才陆续接上，三栋雁行排开。宫内厅只把它归于十七世纪初，不给确切年份。',
    facts: ['<b>形制</b>：东西向入母屋造、柿葺（こけら葺），平面东西七间半、南北五间半，实测15.8米×10.9米，山面朝池，妻饰木连格子；用松木方柱、省去长押，白灰泥壁；内分大小八室，一之间十叠；东侧一间宽广缘，再外接月见台。', '<b>沿革</b>：下桂村为八条宫领地，1616年已有迎女御到桂的记录；古书院推定1615年前后建成；智忠亲王续建中书院（约1641）、新御殿（约1662）；1883年归宫内省管辖始称桂离宫；1976—82年书院群大修理。', '<b>价值</b>：以书院造为骨、数寄屋为肌，创建以来未遭火灾，是江户初期庭园与建筑保存最完整的一组；古书院与中书院接合部留有改造痕迹，证明三期分建。陶特、格罗皮乌斯都把它推为简素之美的典范。'],
    caption: ['桂离宫 · 古书院', '江户初期 · 约17世纪初'], legacyNames: ['桂離宮古書院', 'Katsura Imperial Villa Old Shoin'],
  },
  {
    id: 'jp_joruriji_hondo', name: '净琉璃寺本堂', short: '净琉璃寺', sub: '九体阿弥陀堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_heian', tag: '平安', era: '平安后期现存本堂', year: 1150, yearApprox: true, yearLabel: '12世纪中叶',
    yearNote: '1150仅供年表约略定位；本堂属平安后期遗构。',
    place: '日本 · 京都府 · 木津川', placeKey: 'jp_kizugawa',
    lede: '十一间长、只有四间深，一列木格门后面并坐着九尊阿弥陀——这是平安贵族竞相营建的“九体阿弥陀堂”今天仅存的一座。寺传1047年重兴，1107年造新堂并塑像，次年开眼；1157年（保元二年）把堂拆开搬到池西岸，即今址，文化厅因此以1157年前后断代。缓坡寄栋造、本瓦葺，斗栱只在四角用舟肘木，中尊上方天井抬高一级：朴素到近乎简陋，却是净土信仰最完整的空间标本。',
    facts: ['<b>形制</b>：桁行十一间、梁间四间，一重寄栋造、本瓦葺，向拜一间为江户时代增补；斗栱仅四隅用舟肘木，内阵九间二间，设九间通长佛坛，一列安置九尊阿弥陀坐像（国宝）；内外阵均作化妆屋根裏，中尊上方天井抬高一段。', '<b>沿革</b>：寺传行基草创，永承二年（1047）僧义明重兴；嘉承二年（1107）拆旧堂造新堂与佛像，天仁元年（1108）开眼；保元二年（1157）移建于池西岸即今址；嘉历三年（1328）修理，江户时代加向拜。1897年列特别保护建筑，1952年指定国宝，庭园1965年指定特别名胜·史迹。', '<b>价值</b>：九体阿弥陀堂在平安后期曾大量建造，此为唯一遗构；文化厅称其细长平面专为一列九佛而设，样式手法亦合平安后期。堂、塔隔池东西相望，构成净土式庭园的典型格局；堂内另有四天王立像（国宝）与吉祥天立像（重文）。'],
    caption: ['净琉璃寺 · 本堂', '平安后期 · 约12世纪'], legacyNames: ['浄瑠璃寺本堂', 'Joruriji Hondo'],
  },
  {
    id: 'jp_joruriji_tower', name: '净琉璃寺三重塔', short: '净琉璃寺', sub: '三重塔', country: 'JP', types: ['pagoda'], initialStatus: 'unvisited',
    dyn: 'jp_heian', tag: '平安', era: '平安后期原构 · 1178年移筑', year: 1150, yearApprox: true, yearLabel: '12世纪',
    yearNote: '1150只供年表约略定位，非精确原构年；1178年是现址移筑年份，不是建造年份。',
    place: '日本 · 京都府 · 木津川', placeKey: 'jp_kizugawa',
    lede: '池东岸一座三层小塔：木割纤细，各层三手先斗栱托出深远的檐，桧皮葺屋面坡度极缓，檐口“真反”——这是平安时代三重塔的气质。所绘为净琉璃寺三重塔。寺记载治承二年（1178）自京都一条大宫移建而来，建造必在此之前，文化厅断为“1178年以前”，1952年指定国宝。它与池西的九体阿弥陀堂东西相望：东岸药师，西岸阿弥陀，一池水便是此岸与彼岸的分界。',
    facts: ['<b>形制</b>：三间三重塔婆、桧皮葺，各层皆以三手先斗栱承深檐，垂木坡度平缓；初层内部不立柱，心柱自初层天井以上立起；初层设佛坛安置药师如来坐像（重要文化财，像高85.7厘米，秘佛），壁面绘十六罗汉。', '<b>沿革</b>：1178年自京都一条大宫移建，原属何寺不明；露盘铭记正应五年（1292）修理，细部留有镰仓时代补修。1897年列特别保护建筑，1952年3月29日指定国宝；庭园1965年指定史迹名胜，1985年升为特别名胜。', '<b>价值</b>：文化厅称其斗栱、垂木与檐的构造“可见藤原时代样式”，初层内部的极彩色是了解平安装饰绘画的重要资料。塔在东、堂在西，隔池相对，是平安后期净土式庭园的典型格局。'],
    caption: ['净琉璃寺 · 三重塔', '平安后期原构 · 1178年移筑'], legacyNames: ['浄瑠璃寺三重塔', 'Joruriji Three-Storey Pagoda'], tall: true,
  },
  {
    id: 'jp_ryoanji_garden', name: '龙安寺石庭', short: '龙安寺', sub: '方丈枯山水石庭', country: 'JP', types: ['garden'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '室町时代作庭 · 年代未详', year: 1500, yearApprox: true, yearLabel: '室町时代',
    yearNote: '1500仅供年表约略定位；石庭作者和具体造成年代仍有争议，不把该排序点当作确切年代。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '宽约25米、深约10米的长方形白砂里只有十五块石头，自东分作五、二、三、二、三五组，不种一棵树。所绘为龙安寺方丈前的枯山水石庭。细川胜元宝德二年（1450）创寺，寺传石庭作于明应八年（1499）方丈上梁前后，但作者、年代、寓意皆无定论；塀边一块细长石上刻着“小太郎·□二郎”，也只能推测是参与者。1797年全寺大火时石庭幸存，1924年指定史迹名胜，后升为特别名胜。',
    facts: ['<b>形制</b>：方丈南庭，东西约25米、南北约10米，约75坪；白砂耙出波纹，十五石自东依五、二、三、二、三布列，三面围以油土塀，塀外树木作背景。石材分三类：寺后山所出的燧石、丹波一带山石与绿色片岩。', '<b>沿革</b>：胜元1450年得德大寺家山庄创寺，1468年应仁之乱焚毁，1488年其子政元再建，1499年方丈上梁；1797年大火烧毁方丈等主要堂舍而石庭尚存，今方丈为1606年所建西源院方丈移建。1924年12月9日指定史迹名胜。', '<b>价值</b>：文化厅定为“方丈庭园的典型”，别称“虎子渡”。1951年暴雨后山崩塌，泥水曾一度覆盖石庭；1975年英国女王伊丽莎白二世来访参观，使它的国际知名度大增。寺方自己把刻印、作庭、远近、土塀列为石庭四谜。'],
    caption: ['龙安寺 · 石庭局部', '室町时代 · 年代未详'], legacyNames: ['龍安寺石庭', 'Ryoanji Rock Garden'],
  },
  {
    id: 'jp_tenryuji_garden', name: '天龙寺曹源池庭园', short: '天龙寺', sub: '曹源池庭园', country: 'JP', types: ['garden'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '14世纪中叶作庭', year: 1340, yearApprox: true, yearLabel: '14世纪中叶',
    yearNote: '1340仅为年表约略定位；庭园在1339年创寺前后由梦窗疏石整修，现景有后世维护变化。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '站在方丈西缘看出去：曹源池对岸立着两块巨岩为龙门瀑，一块鲤鱼石不在瀑下而横在瀑旁，寓意鲤鱼化龙正在半途；再远是龟山与大堰川对岸的岚山，全被借入庭中。所绘为天龙寺曹源池庭园。足利尊氏1339年（历应二年）为后醍醐天皇建寺，开山梦窗疏石作庭。寺院八遭火灾，殿堂多为1899年再建，唯独这片池与石组仍留开山时的面貌，1923年成为日本最早一批史迹·特别名胜。',
    facts: ['<b>形制</b>：池泉回游式，以曹源池为中心，借景岚山、龟山；池西岸龙门瀑用两枚巨岩立成，鲤鱼石置于瀑旁，池汀与瀑头石组环池布置，另有石桥与三尊石；文化厅称“瀑头石组尤为优秀，最能表现当时景观”。', '<b>沿革</b>：1339年尊氏奏请光严上皇，将龟山殿改为禅寺，梦窗疏石开山并作庭；贞和二年（1346）定“天龙寺十境”，曹源池居其一。寺遭八次火灾，1864年禁门之变后大半焚毁，1899年法堂、大方丈再建。1923年3月7日指定史迹名胜。', '<b>价值</b>：禅寺前庭与内庭同时保存完好者极少，文化厅因此评价甚高；池名得于疏石掘池时出土刻“曹源一滴”的石碑。1994年随古都京都列入世界遗产。'],
    caption: ['天龙寺 · 曹源池庭园', '室町初期 · 约14世纪中叶'], legacyNames: ['天龍寺曹源池庭園', 'Tenryuji Sogenchi Garden'],
  },
  {
    id: 'jp_saihoji_garden', name: '西芳寺庭园', short: '西芳寺', sub: '黄金池与苔庭', country: 'JP', types: ['garden'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '14世纪中叶整修', year: 1340, yearApprox: true, yearLabel: '14世纪中叶',
    yearNote: '1340仅供年表约略定位；梦窗疏石于14世纪中叶整修庭园，今日广布的苔地是后来逐渐形成的景观。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '下段庭园里，黄金池岸线曲折，池中朝日岛、夕日岛、长岛三岛，池周一百二十余种苔藓铺成绿毯。所绘为西芳寺庭园的黄金池一角。寺传行基开山，历应二年（1339）梦窗疏石中兴，改宗临济并造庭，上段枯山水石组被视为日本最早的枯山水。但今日满眼的苔并非十四世纪原貌：江户宽永、元禄两度洪水使庭园荒废，苔庭要到江户末期才形成。1923年指定史迹名胜，今为特别名胜。',
    facts: ['<b>形制</b>：分上下两段：下段以黄金池（心字池）为中心的池泉回游式，三岛铺白砂植松，池畔有湘南亭（重文）等茶室；上段洪隐山麓为枯山水，指东庵旁留三段瀑布石组；文化厅记载两段以向上关小门相连。', '<b>沿革</b>：天平三年（731）行基开基之传，1339年梦窗疏石住持再兴堂宇、筑林泉，命名“黄金池十境”“洪隐山十境”；1469年应仁之乱焚毁，宽永、元禄洪水再荒；1923年3月7日指定史迹名胜，1977年起预约参拜。', '<b>价值</b>：足利义满、义政先后在此坐禅，鹿苑寺、慈照寺庭园皆仿此而建，文化厅称慈照寺庭园“构想取自西芳寺”；池畔曾有二层舍利殿瑠璃殿，正是银阁的原型。苔是后来者，骨架却是十四世纪的。'],
    caption: ['西芳寺 · 黄金池与苔庭', '室町初期 · 后世形成苔地'], legacyNames: ['西芳寺庭園', 'Saihoji Moss Garden'],
  },
]);
PLACES.push(...[
  { key: 'jp_hieizan', name: '大津 · 比叡山', prov: '滋贺县', country: 'JP', lat: 35.069, lon: 135.843, coordinate_note: '延历寺根本中堂附近地图示意点，非单体测绘坐标。' },
  { key: 'jp_kizugawa', name: '木津川', prov: '京都府', country: 'JP', lat: 34.713, lon: 135.868, coordinate_note: '净琉璃寺附近地图示意点，非单体测绘坐标。' },
]);

// 京都建筑单体九处增补；现存主体、断代与实拍见同 ID 的逐图研究记录。
SITES.push(...[
  {
    id: 'jp_hokanji_tower', name: '法观寺八坂塔', short: '八坂塔', sub: '现存五重塔', country: 'JP', types: ['pagoda'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '1440年再建', year: 1440,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '塔高约46米，五层本瓦屋面层层收小，只有最上一层带缘与栏杆——这在五重塔里极少见。所绘为法观寺五重塔，俗称八坂塔。现存塔为永享十二年（1440）足利义教援建，是治承三年（1179）以来第三次焚毁后的再建，1897年指定重要文化财。寺传圣德太子创建，2009年的调查出土七世纪塼佛与瓦，证实寺院确可上溯飞鸟时代；塔下心础仍是古代地下式礎石，历代塔都在同一塔基上重建。',
    facts: ['<b>形制</b>：三间五重塔婆、本瓦葺，纯和样，高约46米，仅次于东寺、兴福寺五重塔；初层安置以大日如来为中心的五智如来像，心柱立于创建时的地下式心础上；缘与高栏仅设于第五层，内部可登至第二层。', '<b>沿革</b>：1179年清水寺与祇园社争斗中焚毁，1191年源赖朝援建；1291年雷击，1309年后宇多天皇援建；1436年东山大火再毁，1440年义教再建即今塔。1897年12月28日指定重要文化财。', '<b>价值</b>：京都现存最古寺院之一，境内为京都市指定史迹；塔矗立于东山西麓台地，是八坂神社至清水寺之间约一公里路上的地标，也是日本唯一可登入内部的重要文化财五重塔。'],
    caption: ['法观寺 · 八坂塔', '室町时代 · 1440年再建'], legacyNames: ['法観寺五重塔', '八坂の塔', 'Yasaka Pagoda'], tall: true,
  },
  {
    id: 'jp_gosho_shishinden', name: '京都御所紫宸殿', short: '紫宸殿', sub: '现存正殿', country: 'JP', types: ['palace', 'hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1855年重建', year: 1855,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '正面九间、素木、桧皮葺，母屋四周绕一圈廂，再外是带高栏的簀子缘；殿前十八级“南阶”直落到白砂南庭，左近之樱、右近之橘分立两侧。所绘为京都御所紫宸殿，天皇即位等大礼之殿。现存建筑为安政元年（1854）内里烧毁后、安政二年（1855）依宽政度规模再建；而宽政二年（1790）那次造营已按裏松固禅《大内裏图考证》复原平安形式。所以它是十九世纪的建筑，却刻意长成平安时代的样子。',
    facts: ['<b>形制</b>：木造桧皮葺平屋，正面九间、侧面三间的母屋四周附廂，外侧簀子缘设高栏；外围建具用蔀户与唐户，内部化妆屋根里、拭板敷；母屋中央置高御座，母屋与北廂间以贤圣障子分隔，南廂中央设十八级阶。', '<b>沿革</b>：土御门东洞院内里自南北朝起成为定居皇居；天明八年（1788）大火后，松平定信依裏松固禅考证于1790年复古再建承明门、紫宸殿、清凉殿；1854年再毁，1855年同规模重建即今殿。宫内厅归为“安政度内里”。', '<b>价值</b>：大极殿废绝后即位礼移至此殿，自大永元年（1521）后柏原天皇以来成为惯例，东京奠都后至昭和天皇仍在此举行；宫内厅称其“传承平安时代的建筑样式”，是今日仅存的内里正殿形制。'],
    caption: ['京都御所 · 紫宸殿', '江户时代 · 1855年'], legacyNames: ['京都御所紫宸殿', 'Kyoto Imperial Palace Shishinden'],
  },
  {
    id: 'jp_daitokuji_karamon', name: '大德寺唐门', short: '大德寺', sub: '本坊唐门', country: 'JP', types: ['gate'], initialStatus: 'unvisited',
    dyn: 'jp_momoyama', tag: '桃山', era: '桃山时代 · 具体年未详', year: 1590, yearApprox: true, yearLabel: '桃山时代',
    yearNote: '1590仅供年表约略定位，不是建造纪年；聚乐第旧构迁来的说法仍属传说。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '先看雕刻：前后轩唐破风之下，龙、鱼、花草填满每一处构件，有处干脆以雕刻代替斗栱——文化厅形容为“极尽丰丽，却无形式上的夸张，自由奔放”。所绘为大德寺本坊唐门，四脚门、切妻造、桧皮葺，样式属桃山时代。寺传它原是丰臣秀吉聚乐第之门，经村上周防守捐入，文化厅注明“无确实资料”；2003年解体修理在饰金具上发现“天正”刻铭，传说因此多了几分可信，仍非定论。1952年指定国宝。',
    facts: ['<b>形制</b>：四脚门，切妻造，前后各附轩唐破风，桧皮葺；通体施高浮雕装饰，龙、鲤鱼随处可见，部分构件以雕刻取代组物。因看一天也看不够而俗称“日暮门”，与西本愿寺、丰国神社唐门并称桃山三唐门。', '<b>沿革</b>：明治二十四年（1891）图上它在勅使门之西、东向而立；1886年明智门售予金地院后，移至其址作为方丈表门南向。2003年修理发现“天正”刻铭金具与庆长八年（1603）栋札，记村上周防守赖胜寄付。1897年列特别保护建筑。', '<b>价值</b>：文化厅定为“代表桃山时代的建筑”。若聚乐第传说成立，它便是秀吉那座早已拆毁的城郭所剩极少的遗构之一；方丈南庭即以此门为南界，与庭中立石、白砂同为一组。'],
    caption: ['大德寺 · 唐门', '桃山时代 · 年代未详'], legacyNames: ['大徳寺唐門', 'Daitokuji Karamon'],
  },
  {
    id: 'jp_daitokuji_hojo', name: '大德寺方丈', short: '大德寺', sub: '本坊方丈', country: 'JP', types: ['residence'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '约1635—1636年建成', year: 1636, yearApprox: true, yearLabel: '约1635—1636年',
    yearNote: '文化遗产数据库列表作1635年，建筑说明作1636年；年表采用后者约略定位。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '一座方丈通常六室，这座有八室：桁行29.8米、梁间17米，灰瓦屋顶下一列木格门横向展开，右数第二列前后两室是开山宗峰妙超的塔所云门庵，还向北突出到广缘之外。所绘为大德寺本坊方丈。宽永十三年（1636）因旧方丈狭小，豪商后藤益胜出资新建，与西南角伸出六间长的玄关同时落成；云门庵贴付壁画有1641年墨书，稍晚于方丈。1957年方丈与玄关二栋指定国宝。',
    facts: ['<b>形制</b>：桁行29.8米、梁间17.0米，一重入母屋造、栈瓦葺（原为桧皮葺），背面附云门庵；平面前后二列、左右四列共八室，异于常见六室；玄关桁行六间、梁间一间，唐破风造，为长长突出的土间廊。障壁画84面为狩野探幽作。', '<b>沿革</b>：方丈几经火灾，文明十年（1478）泰叟再建；1636年后藤益胜新筑今方丈，纪念开山三百年远忌；1909年列特别保护建筑，1957年6月18日指定国宝；方丈南庭1924年指定史迹名胜，后升特别名胜，为天祐和尚作庭。', '<b>价值</b>：文化厅评其“各部样式手法谨守方丈建筑规范，简素明快，是近世初期大型禅宗方丈的佳例”；南庭白砂立石作枯瀑，远借比叡山，同为方丈庭园的典型。'],
    caption: ['大德寺 · 本坊方丈', '江户初期 · 约1635—1636年'], legacyNames: ['大徳寺方丈', 'Daitokuji Hojo'],
  },
  {
    id: 'jp_jishoji_togudo', name: '慈照寺东求堂', short: '东求堂', sub: '现存东求堂', country: 'JP', types: ['hall', 'residence'], initialStatus: 'unvisited',
    dyn: 'jp_muromachi', tag: '室町', era: '约1485—1486年建成', year: 1486, yearApprox: true, yearLabel: '约1485—1486年',
    yearNote: '文化遗产数据库列表作1485年，说明作1486年；年表取后者约略定位。',
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '东北角那间四叠半的“同仁斋”才是重点：北面半间违棚加一间付书院，是现存最早的座敷饰，书院造的源头就在这里；解体修理时又在构件上发现“いろりの间”墨书，说明室内原来切有炉，义政在此点茶。所绘为慈照寺东求堂，足利义政的持佛堂，文明十八年（1486）仿西芳寺西来堂建于池北。桁行、梁间各6.9米，一重入母屋造、桧皮葺，木割细、角柱面取、舟肘木、疎垂木，一派清楚。1951年指定国宝。',
    facts: ['<b>形制</b>：方三间半，四面各6.9米，一重入母屋造、桧皮葺，南面；内分四室：西南佛间八叠，板敷、折上小组格天井，正面桟唐户，安置阿弥陀立像与义政像；东南纵四叠，西北六叠，东北同仁斋四叠半；西外壁一段后退成腰挂。', '<b>沿革</b>：义政1482年起营东山殿，1486年建东求堂为持佛堂；1550年中尾城之战全寺焚毁，仅银阁与东求堂幸存；1742年、文政年间修理曾改佛坛与北室，1964—65年解体修理全部复原。1903年列特别保护建筑，1951年指定国宝。', '<b>价值</b>：同仁斋的违棚与付书院是此类座敷饰现存最古之例，被视为书院造定型前的源流，茶道史上又传为四叠半茶室之始；匾额“东求堂”为义政亲笔，堂名出自《六祖坛经》“东方人念求生西方”。'],
    caption: ['慈照寺 · 东求堂', '室町时代 · 约1485—1486年'], legacyNames: ['慈照寺東求堂', 'Ginkakuji Togudo'],
  },
  {
    id: 'jp_toji_kondo', name: '东寺金堂', short: '东寺', sub: '现存金堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_momoyama', tag: '桃山', era: '1603年再建', year: 1603,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '屋顶中段那一截被抬高的裳阶最好认：下层裳阶正中一间高出一级，开着两扇门，法会时打开可向外散华——同样的做法见于东大寺大佛殿与平等院凤凰堂。所绘为东寺金堂，796年创寺时最早动工的本堂，1486年土一揆中焚毁，近百年未复，庆长八年（1603）丰臣秀赖出资再建，有栋札可证。桁行五间、梁间三间带裳阶，入母屋造、本瓦葺，和样、禅宗样、大佛样三样式并用，1953年指定国宝。',
    facts: ['<b>形制</b>：桁行五间、梁间三间的母屋附一重裳阶，外观如重层；入母屋造、本瓦葺。裳阶用大佛样三手先斗栱，中央一间屋面抬高；内部以贯与插肘木撑起高敞空间，兼用禅宗样手法。本尊药师三尊像高近2.9米，康正1603年作。', '<b>沿革</b>：796年随寺创建，823年空海受赐东寺前已建成；1486年焚毁；1603年再建（栋札）。1897年列特别保护建筑，1953年3月31日指定国宝；1940年解体修理在基础下发现创建时礎石与须弥坛残部，证明位置、规模与平安时代大体相同。', '<b>价值</b>：文化厅评为“融合三种样式、统一出色的桃山佛寺建筑优作”。寺传它仿秀吉方广寺大佛殿而建，《都名所图会》亦称“洛东大佛殿之模形”；栋札上“国家太平 臣民快乐”与引发大坂之阵的方广寺钟铭句式相近。'],
    caption: ['东寺 · 金堂', '桃山时代 · 1603年再建'], legacyNames: ['東寺金堂', 'Toji Kondo'],
  },
  {
    id: 'jp_daigoji_sanboin', name: '醍醐寺三宝院表书院', short: '三宝院', sub: '表书院', country: 'JP', types: ['residence'], initialStatus: 'unvisited',
    dyn: 'jp_momoyama', tag: '桃山', era: '1598年建成', year: 1598,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '长长的书院面向庭园完全打开：正面一列广缘，左端突出一座切妻造的泉殿探向池边，西面接着唐破风的车寄——文化厅说这是书院造的通行手法，也是寝殿造以来的传统。所绘为醍醐寺三宝院表书院。庆长三年（1598）丰臣秀吉为“醍醐花见”亲自指图再兴三宝院，表书院即其时所建，手法简素而尺度宏大。1954年指定国宝，前方庭园为特别名胜·特别史迹。',
    facts: ['<b>形制</b>：一重入母屋造、栈瓦葺，泉殿切妻造，西面车寄唐破风造、桧皮葺；内部为上段之间十五叠（二间床、一间违棚）、十八叠、二十七叠三室，四面入侧；寺传下段揭起榻榻米即成能舞台，故又称“扬舞台之间”。', '<b>沿革</b>：三宝院文明二年（1470）以后久未重建，1598年秀吉来寺赏花、亲自指图再兴，现存诸堂多属此时；1897年列特别保护建筑，1954年3月20日指定国宝。庭园1927年指定名胜，秀吉自定缩张、三名庭奉行施工，后由义演补修。', '<b>价值</b>：文化厅称其“最能体现桃山时代书院造特质，住宅史上价值极高”；障壁画为长谷川等伯一派与石田幽汀作。庭中名石“藤户石”自聚乐第运来，池设三岛、架九桥，秀吉的审美与权力在同一处显形。'],
    caption: ['醍醐寺 · 三宝院表书院', '桃山时代 · 1598年'], legacyNames: ['醍醐寺三宝院表書院', 'Daigoji Sanboin Omote Shoin'],
  },
  {
    id: 'jp_hongwanji_goeido', name: '西本愿寺御影堂', short: '西本愿寺', sub: '现存御影堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1636年再建', year: 1636,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '先看柱子：外阵441叠的空间里粗柱林立，上架虹梁，为的是让成千门徒同时听法。所绘为西本愿寺御影堂，桁行62.1米、梁间48.3米、高29米，江户时代现存规模最大的建筑之一，比北侧的本堂阿弥陀堂还大——真宗本山以祖师堂为主、佛堂为次。元和三年（1617）失火后，宽永十三年（1636）上梁再建，中央安置亲鸾圣人木像。1999—2009年历十年解体大修，2014年9月指定国宝。',
    facts: ['<b>形制</b>：桁行62.1米、梁间48.3米，一重入母屋造、向拜三间、本瓦葺，面东，与北邻阿弥陀堂以渡廊相连；外阵441叠，内阵饰金箔、雕刻栏间、障壁画；文化厅特别指出建登柱、轩支柱与多样虹梁等江户前期高超架构。', '<b>沿革</b>：本愿寺1591年移至堀川六条；1617年御影堂等焚毁，1636年再建；宽政十二年至文化七年（1800—1810）、1999—2009年两次解体大修。1913年列重要文化财，2014年9月18日指定国宝，1994年随境内列入世界遗产。', '<b>价值</b>：文化厅定位为“从小道场出发而达广壮佛堂的真宗本堂顶点”。正面两只天水桶由八尊约38厘米高的“天邪鬼”自1636年起一直托着；广缘与走廊的补木（埋木）雕成鱼、茄子、酒壶等形，是修理匠人留下的趣味。'],
    caption: ['西本愿寺 · 御影堂', '江户时代 · 1636年再建'], legacyNames: ['西本願寺御影堂', 'Nishi Honganji Goeido'],
  },
  {
    id: 'jp_chionin_mieido', name: '知恩院御影堂', short: '知恩院', sub: '现存御影堂', country: 'JP', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'jp_edo', tag: '江户', era: '1639年再建', year: 1639,
    place: '日本 · 京都府 · 京都', placeKey: 'jp_kyoto',
    lede: '桁行十一间、梁间九间，正面向拜五间，入母屋造、本瓦葺——间口44.8米的大殿压在伽蓝中段，前面一道五间宽的廊檩把参拜者整个罩住。所绘为知恩院御影堂，因供奉宗祖法然像而得名。宽永十年（1633）大火后，德川家光于宽永十六年（1639）再建；文化厅称它“外观以和样统摄，内部驱使禅宗样技法，柱林立如林”，是江户初期德川家大造营的代表，2002年与三门同时指定国宝。',
    facts: ['<b>形制</b>：桁行十一间、梁间九间，一重入母屋造，正面向拜五间、背面向拜三间，本瓦葺；间口44.8米、进深34.5米。前三间为叠敷外阵，内阵五间见方，最奥立四天柱为内内阵，宫殿形厨子内安置法然木像。', '<b>沿革</b>：家康1603年定知恩院为永代菩提所，秀忠1621年建三门、经藏；1633年火灾仅三门、经藏、势至堂幸免，家光主持再建，1639年成御影堂。1910年列特别保护建筑，2002年5月23日指定国宝；2011—2019年大修理，2020年4月13日落庆。', '<b>价值</b>：文化厅评为“意匠技术极优、完成度极高，建筑史上价值极高”，净土宗总本山本堂的巅峰。境内分下、中、上三段，御影堂居中段，上段才是法然草庵旧地；与西本愿寺一样，祖师堂大于阿弥陀堂，宗派格局一目了然。'],
    caption: ['知恩院 · 御影堂', '江户时代 · 1639年再建'], legacyNames: ['知恩院御影堂', 'Chionin Mieido'],
  },
]);

// 江浙国保增补；保护单位、图版主体和参考见同 ID 研究记录。
PLACES.push(...[
  {
    "key": "zj_anji",
    "name": "安吉",
    "prov": "浙江",
    "lat": 30.638,
    "lon": 119.682,
    "coordinate_note": "安吉县城示意点，非塔测绘坐标。"
  },
  {
    "key": "zj_yiwu",
    "name": "义乌",
    "prov": "浙江",
    "lat": 29.306,
    "lon": 120.075,
    "coordinate_note": "义乌市区示意点，非单体测绘坐标。"
  },
  {
    "key": "zj_yuyao",
    "name": "余姚",
    "prov": "浙江",
    "lat": 30.038,
    "lon": 121.154,
    "coordinate_note": "余姚城区示意点，非桥测绘坐标。"
  },
  {
    "key": "js_zhenjiang",
    "name": "镇江",
    "prov": "江苏",
    "lat": 32.206,
    "lon": 119.449,
    "coordinate_note": "镇江西津渡附近示意点，非塔测绘坐标。"
  },
  {
    "key": "js_yangzhou",
    "name": "扬州",
    "prov": "江苏",
    "lat": 32.394,
    "lon": 119.418,
    "coordinate_note": "扬州城区示意点，非园林单体测绘坐标。"
  }
]);
SITES.push(...[
  {
    "id": "zj_tianyige",
    "name": "天一阁",
    "short": "天一阁",
    "sub": "藏书楼",
    "country": "CN",
    "types": [
      "residence"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "明",
    "era": "明嘉靖四十五年建阁",
    "year": 1566,
    "place": "浙江 · 宁波",
    "placeKey": "ningbo",
    "lede": "天一阁藏书楼以白墙、黛瓦和整齐窗格隐在宁波园林之中，朴素的两层小楼曾容纳范钦搜集的典籍。楼上贯通、楼下分间的格局与楼前水池，都关联藏书防火的愿望。明嘉靖年间的营建奠定了书楼的身份，后世修护则使建筑与书籍一同延续。它的价值不仅在楼阁外形，更在私家藏书如何成为长久保存的文化事业。",
    "facts": [
      "形制：书楼为两层建筑，上层为一通间，下层分为六间，前后开窗。楼前天一池与书楼相配，空间安排借天一生水、地六成之的寓意表达防火保存的愿望。",
      "断代：范钦在明嘉靖年间营建藏书楼，官方介绍以一五六一年至一五六六年概括工程阶段。建阁纪年和后来的园林增修、楼宇维修应区分，现存构件并非全为初建原物。",
      "价值：书楼、藏书和范氏保存制度共同构成天一阁的历史。它为后来的藏书建筑提供了参考，也保留私家搜集地方文献、科举录等书籍并代际传承的实物空间。"
    ],
    "yearNote": "1566为建阁纪年，不将今日所见每一处构件视作明代原物。",
    "caption": [
      "天一阁",
      "明嘉靖 · 藏书楼"
    ]
  },
  {
    "id": "zj_qinganhui",
    "name": "庆安会馆",
    "short": "庆安会馆",
    "sub": "前戏台局部",
    "country": "CN",
    "types": [
      "stage",
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "清",
    "era": "清咸丰三年建",
    "year": 1853,
    "place": "浙江 · 宁波",
    "placeKey": "ningbo",
    "lede": "庆安会馆前戏台以木柱、斗栱和回廊围出富有层次的演剧空间，台顶藻井向内盘旋，梁枋上的朱金木雕使细小构件也充满故事。会馆由宁波航运商人集资兴建，既祭祀天后妈祖，也供同行议事和聚会。戏台因此不只是看戏的设施，还连接祈求航海平安的仪式与港城的日常生活，留下清代浙东木作的鲜明印记。",
    "facts": [
      "形制：前戏台以木构架托起屋顶，台内设穹窿状藻井，狭长花板接榫叠合。柱、梁枋和斗栱与邻接回廊共同围合空间，朱金木雕多取人物故事和戏曲题材。",
      "断代：庆安会馆于清道光三十年兴建、咸丰三年落成，即一八五零年至一八五三年。现存建筑经过后来的保护维修，前戏台与整组会馆的建设及修护应联系理解。",
      "价值：会馆把妈祖祭祀和航运商人的行业活动结合起来，演剧也融入这一社会网络。戏台的木雕与藻井保存宁波地方工艺，体现港口贸易如何支持精细的建筑装饰。"
    ],
    "caption": [
      "庆安会馆",
      "清咸丰 · 前戏台局部"
    ]
  },
  {
    "id": "zj_yongan",
    "name": "安吉永安寺塔",
    "short": "永安寺塔",
    "sub": "灵芝塔现存塔身",
    "country": "CN",
    "types": [
      "pagoda"
    ],
    "initialStatus": "unvisited",
    "dyn": "song",
    "tag": "宋",
    "era": "五代至南宋遗构",
    "year": 1100,
    "place": "浙江 · 湖州 · 安吉",
    "placeKey": "zj_anji",
    "lede": "安吉永安寺塔又称灵芝塔，密集砖檐沿塔身层层向上收拢，成为西苕溪附近延续至今的古塔。寺院名称和塔的称呼曾随时代变化，塔刹题记及出土供养物则留下北宋、南宋修护的证据。五代至南宋的宽泛断代体现它累积形成的历史，今日所见又包含现代修缮。观察这座塔，既能看轮廓，也能追索隐藏在构件中的记忆。",
    "facts": [
      "形制：砖砌塔身以密集出檐逐层收分，顶部塔刹成为竖向轮廓的收束。塔体上部曾设收藏供养物的空间，砖石外观之外还保存与舍利供奉相关的内部结构线索。",
      "断代：国保公布时代为五代至南宋，不能缩成一个确定建年。塔刹套筒题记及供养物铭文涉及北宋庆历七年、南宋景定元年的修护，今塔又经过现代维修。",
      "价值：铭文与出土器物使古塔的修建史不只依赖外观判断，也能联系出资者和信仰活动。寺院虽发生变迁，古塔及其保存的证据仍展示当地佛教空间的长期延续。"
    ],
    "yearApprox": true,
    "yearLabel": "五代至南宋",
    "yearNote": "1100仅为年表约略定位；建筑断代范围为五代至南宋。",
    "tall": true,
    "caption": [
      "安吉永安寺塔",
      "五代至南宋 · 砖塔"
    ]
  },
  {
    "id": "zj_daan",
    "name": "义乌大安寺塔",
    "short": "大安寺塔",
    "sub": "六面五层塔身",
    "country": "CN",
    "types": [
      "pagoda"
    ],
    "initialStatus": "unvisited",
    "dyn": "song",
    "tag": "宋",
    "era": "北宋塔",
    "year": 1110,
    "place": "浙江 · 金华 · 义乌",
    "placeKey": "zj_yiwu",
    "lede": "大安寺塔立在义乌绣湖边，六面五层塔身以砖砌壁面和出檐形成向上收分的节奏。原来所属的寺院已发生变迁，古塔仍保存仿木柱、枋与斗栱的细部，把楼阁建筑转化为砖塔。现存主体登记为北宋，明代及现代又有重修，不能把每层屋檐与塔顶都当作同一次工程的遗物。它留下了当地寺院与城市空间相伴生长的痕迹。",
    "facts": [
      "形制：古塔为六面五层的楼阁式砖木结构，转角设倚柱，壁面以砖仿木构柱枋和斗栱。门洞与壁龛分布在各面，出檐和平座把塔身逐层划分，形成分明的竖向层次。",
      "断代：国保名录列北宋，地方资料记大观年间营建，也记录明永乐时期的重修。现存塔身及后来修护的檐部、塔顶应分层理解，年表定位不是全部构件的统一建年。",
      "价值：砖材模仿木构的细部，使塔成为观察宋代楼阁形式的重要实例。原寺院与绣湖环境虽有变化，古塔仍保留历史位置，为理解义乌旧城的佛教与公共景观提供依据。"
    ],
    "yearApprox": true,
    "yearLabel": "北宋",
    "yearNote": "1110为北宋约略定位点，并非确证的建造纪年。",
    "tall": true,
    "caption": [
      "义乌大安寺塔",
      "北宋 · 六面五层砖木塔"
    ]
  },
  {
    "id": "zj_dashan",
    "name": "绍兴大善寺塔",
    "short": "大善寺塔",
    "sub": "六面七层塔身",
    "country": "CN",
    "types": [
      "pagoda"
    ],
    "initialStatus": "unvisited",
    "dyn": "song",
    "tag": "宋",
    "era": "南宋塔",
    "year": 1250,
    "place": "浙江 · 绍兴",
    "placeKey": "shaoxing",
    "lede": "绍兴大善寺塔以六面七层的砖塔轮廓立在旧城之中，旧日外檐与登塔木构损毁后，砖壁、门龛和层间出挑成为最清楚的结构线索。塔的现存主体属南宋重建，后来又有明清和现代修护；南朝寺院的创建不能直接用来说明今塔年龄。寺已变迁而塔仍可辨，使一座独存古塔继续记录城市宗教空间的变化。",
    "facts": [
      "形制：塔身为六面七层，砖砌门洞与壁龛分层布置，层间以出挑构件表现楼阁节奏。旧木檐与内部木梯已经损毁，今日砖塔外观保留着原有砖木混合结构的痕迹。",
      "断代：塔内砖铭有南宋绍定戊子重修的记载，对应一二二八年。此前寺塔曾毁于火，之后历代继续修缮，今塔主体的南宋断代应与南朝寺院初创分别理解。",
      "价值：残留的门龛、砖砌仿木构和重修铭文，使损毁后的塔仍可用于研究宋代楼阁式佛塔。它也以位置与轮廓延续旧城记忆，让寺院变迁有了可见的物质标记。"
    ],
    "yearApprox": true,
    "yearLabel": "南宋",
    "yearNote": "1250仅供南宋阶段年表约略定位。",
    "tall": true,
    "caption": [
      "绍兴大善寺塔",
      "南宋 · 六面七层"
    ]
  },
  {
    "id": "zj_chaoyin",
    "name": "湖州潮音桥",
    "short": "潮音桥",
    "sub": "三孔石拱桥",
    "country": "CN",
    "types": [
      "bridge"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "明",
    "era": "明万历重建",
    "year": 1605,
    "place": "浙江 · 湖州",
    "placeKey": "huzhou",
    "lede": "潮音桥在湖州旧城以三孔石拱横跨霅溪，桥面隆起，两端石阶顺势落向河岸街巷。桥址原为渡口，明代营建与重建把摆渡交通变成可以日常步行的连接。西侧桥孔下曾另设便于沿岸通行的小桥，因此留下桥下桥的地方称呼。古桥经过后世修护，今日轮廓仍让人看见水路、街路在同一处相遇的江南城市景象。",
    "facts": [
      "形制：桥为三孔石拱结构，中间桥面抬高，两端以阶梯衔接岸边。石墩与拱券共同构成侧面轮廓，桥上过河与桥下沿岸通行相交，是其布局的重要特色。",
      "断代：明嘉靖年间由渡口改建石桥，万历年间又重建，今日桥体包含后世修护。早期渡口、明代桥梁和后来添修的构筑各属不同阶段，不应看作一次完成。",
      "价值：桥下桥的称呼对应水城中多条通行路径的叠合，并非单为造型奇特。古桥与河岸街巷相接，保留湖州居民过河、沿岸往来和河道交通共同组织的历史经验。"
    ],
    "caption": [
      "湖州潮音桥",
      "明代重建 · 三孔桥"
    ]
  },
  {
    "id": "zj_yuyaotongji",
    "name": "余姚通济桥",
    "short": "通济桥",
    "sub": "三孔石拱桥",
    "country": "CN",
    "types": [
      "bridge"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "清",
    "era": "清雍正年间重建",
    "year": 1731,
    "place": "浙江 · 宁波 · 余姚",
    "placeKey": "zj_yuyao",
    "lede": "余姚通济桥以高大的主拱和两侧较小的拱孔跨过姚江，把南北两城连接起来。石阶沿着桥身上升，桥洞则为行船保留高度，水陆交通因此在同一个节点交汇。桥址可追溯到北宋，现存石桥主要是清雍正年间重建的结果。它与北岸舜江楼共同形成旧城标志，但单看桥体，也能理解余姚依江而建的城市格局。",
    "facts": [
      "形制：通济桥为三孔两墩的陡拱石桥，中央拱高起，两侧小拱过渡至岸边。台阶将步行路线引上桥顶，桥下航道与两岸街巷共同围绕这处过江通道组织。",
      "断代：北宋已有桥址与早期木桥，元代改为三孔石桥，现存之桥又于清雍正年间重建。桥的创建、改材与重建是不同事件，不能以宋代起源替代现存石构断代。",
      "价值：这座跨江桥长期联系两城，也记录木桥向石拱桥转变的营造史。与舜江楼相配的历史景观，使古桥同时成为交通设施和余姚旧城记忆的重要坐标。"
    ],
    "yearApprox": true,
    "yearLabel": "清雍正年间",
    "yearNote": "1731为雍正年间重建的年表约略定位。",
    "caption": [
      "余姚通济桥",
      "清代现存桥 · 三孔"
    ]
  },
  {
    "id": "zj_guyue",
    "name": "古月桥",
    "short": "古月桥",
    "sub": "单孔石拱桥",
    "country": "CN",
    "types": [
      "bridge"
    ],
    "initialStatus": "unvisited",
    "dyn": "song",
    "tag": "宋",
    "era": "南宋嘉定六年建",
    "year": 1213,
    "place": "浙江 · 金华 · 义乌",
    "placeKey": "zj_yiwu",
    "lede": "古月桥跨过义乌雅治街村旁的龙溪，远看像一道高拱，细看却能发现拱底不是连续圆弧，而是长条石搭接形成的五折轮廓。六列并行的石拱共同承托桥面，展示一种与常见楔形拱石不同的营造方法。桥侧纪年题刻把建桥落实到南宋嘉定六年，后世保护仍尊重这一结构，使古桥成为可以直接阅读的营造史料。",
    "facts": [
      "形制：单孔桥以六列平行的折边石拱承托桥身，每列由五段长条石搭接，横锁石联系交接处。桥面与侧墙在其上叠砌，五折轮廓比远望时的弧线更能说明结构。",
      "断代：桥侧题刻记皇宋嘉定癸酉建造，对应一二一三年，提供了可以核验的建桥纪年。现存桥后来经历保护修缮，题记年份与各次加固、修补的阶段应分别理解。",
      "价值：长石肋拱与横向锁石把承重方式清楚显露出来，为研究古代折边石拱提供实物依据。可靠题刻又使结构有明确年代，可与文献及其他宋代桥梁进行比较。"
    ],
    "caption": [
      "义乌古月桥",
      "宋代石桥 · 单孔"
    ]
  },
  {
    "id": "zj_library_old",
    "name": "浙江图书馆旧址",
    "short": "浙江图书馆",
    "sub": "孤山馆舍红楼",
    "country": "CN",
    "types": [
      "school"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "清",
    "era": "清末至民国馆舍",
    "year": 1909,
    "place": "浙江 · 杭州 · 孤山",
    "placeKey": "hangzhou",
    "lede": "孤山馆舍红楼以红砖墙面和拱廊面向西湖，西式两层楼身与杭州的藏书史相遇。它原为清末筹备接待外宾而建的馆舍，后来转入图书馆用途，曾安置文澜阁藏书。建筑身份的转变提醒人们，旧图书馆并非一次营建完成的整组建筑。红楼、邻近白楼与其他馆舍各有年代，而古籍保存使这些空间形成新的共同记忆。",
    "facts": [
      "形制：红楼为两层西式馆舍，砖墙与廊柱形成有节奏的立面，拱形装饰连接柱间空间。前廊和主楼是同一建筑的组成，邻近的白楼及山上馆舍则属于其他单体。",
      "断代：红楼建于清光绪三十二年，即一九零六年，原作接待馆舍，民国时期转为藏书用途。一九一六年正式由图书馆接收，与一九一二年落成的白楼并非同年建造。",
      "价值：建筑从接待外宾到保存古籍的用途变化，体现近代公共文化空间的形成。文澜阁书籍的迁存与整理使红楼和西湖藏书传统相连，价值既在建筑，也在护书活动。"
    ],
    "yearApprox": true,
    "yearLabel": "清末至民国",
    "yearNote": "1909仅为馆舍阶段约略定位；国保单元包括多个建筑。",
    "caption": [
      "浙江图书馆旧址",
      "孤山红楼 · 近代"
    ]
  },
  {
    "id": "zj_shinantang",
    "name": "石楠塘徐氏宗祠",
    "short": "徐氏宗祠",
    "sub": "门楼与白墙",
    "country": "CN",
    "types": [
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "明清",
    "era": "明清宗祠",
    "year": 1700,
    "place": "浙江 · 金华",
    "placeKey": "jinhua",
    "lede": "石楠塘徐氏宗祠的门楼与两侧白墙，在金华武义江畔界定出一处宗族共同祭祀的入口。整座大宗祠联系附近多个徐氏聚落，门内的天井、厅堂与梁柱承载共同出资和修葺的历史。建筑初创于明代，清代及近现代又有修护，现状不能简单等同万历初建。白墙黛瓦的外观之外，这里还保存着族群如何借祭祀组织往来的记忆。",
    "facts": [
      "形制：入口以门楼和连贯墙面界定前部空间，门内沿中轴展开厅堂与天井。外部的简洁墙面与内部较复杂的构架相对，门厅既连接院落，也形成进入祭祀场所的界面。",
      "断代：调查研究记宗祠始建于明万历二十七年，此后多次修葺，清代更换部分梁柱，现代又作保护维修。国保时代概括为明清，不能把现状全部视作明代一次建成。",
      "价值：大宗祠由武义江流域多个徐氏村落共同祭祖，选址兼顾各支族人的交通。出资、修祠和节令祭祀使建筑成为跨村联系的载体，保留地方社会的组织经验。"
    ],
    "yearApprox": true,
    "yearLabel": "明清",
    "yearNote": "1700仅供明清阶段年表约略定位。",
    "caption": [
      "石楠塘徐氏宗祠",
      "明清宗祠 · 门楼"
    ]
  },
  {
    "id": "js_mingxiao",
    "name": "明孝陵方城明楼",
    "short": "明孝陵",
    "sub": "方城明楼",
    "country": "CN",
    "types": [
      "tomb",
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "明",
    "era": "明初陵寝建筑",
    "year": 1398,
    "place": "江苏 · 南京",
    "placeKey": "nanjing",
    "lede": "一座方城、上头一座明楼，这个组合从这里开始，以后北京十三陵、清东西陵的每座帝陵都照着做。明孝陵的方城用巨石砌筑，顶上明楼砖砌，东西阔 39.25 米、南北深 18.4 米，重檐歇山、黄琉璃瓦；中央券门通向后面的宝顶，朱元璋和马皇后葬在那座山里。明楼屋顶 1853 年毁于战火，一百五十多年只剩四壁，现在的顶是 2009 年补上的，所以图版画的是今日所见，不等同明初原件。",
    "facts": [
      "<b>形制</b>：明楼砖砌，东西阔 39.25 米，南北深 18.4 米，黄琉璃瓦重檐歇山顶，外墙涂红、内墙涂黄；南面辟券门三道，东、西、北各一道。楼下方城以巨石砌筑，中央券门通向宝顶前的内院，院内有礓磋上达明楼。",
      "<b>年代</b>：孝陵洪武十四年（1381）动工，十六年（1383）享殿等主体完工，永乐三年（1405）全部建成；1853 年清军与太平军交战，享殿、明楼屋顶等木构全部焚毁。2007 年中山陵园管理局决定复建明楼屋顶，2008 年获国家文物局批准，2009 年 7 月竣工。",
      "<b>价值</b>：方城明楼与宝城的组合在孝陵定型，明清两代五百多年的帝陵都循此规制；宝顶是玩珠峰山体中开凿的玄宫，上覆卵石黄土成直径约 400 米的圆丘，1998 年磁测显示入口隧道在明楼东侧、长约 120 米。2003 年明孝陵列入世界遗产。"
    ],
    "yearApprox": true,
    "yearLabel": "明初",
    "yearNote": "1398为明初陵寝阶段定位，不代表明楼所有现存构件的建造年。",
    "caption": [
      "明孝陵方城明楼",
      "明代陵寝 · 方城明楼"
    ]
  },
  {
    "id": "js_zhongshan",
    "name": "中山陵祭堂",
    "short": "中山陵",
    "sub": "祭堂与主要石阶",
    "country": "CN",
    "types": [
      "tomb",
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "modern",
    "tag": "民国",
    "era": "1929年建成",
    "year": 1929,
    "place": "江苏 · 南京",
    "placeKey": "nanjing",
    "lede": "从博爱坊走到祭堂，七百米、七十三米落差，整个陵园的平面是一口钟。吕彦直 1925 年以这个方案拿下设计竞赛首奖，1926 年开工，1929 年春祭堂建成，当年 6 月 1 日孙中山灵柩奉安。祭堂是仿木构的石造宫殿：长 28 米、宽 22.5 米、高 26 米，重檐歇山顶覆蓝色琉璃瓦，正面三道拱门上刻“民族、民权、民生”，四角是堡垒式的方屋——中国大屋顶与西方三段式构图叠在同一座建筑上。",
    "facts": [
      "<b>形制</b>：祭堂坐北朝南，石造仿木宫殿式，长 28 米、宽 22.5 米、高 26 米；重檐歇山顶覆蓝琉璃瓦，檐下两层石斗栱；正立面三座拱门装镂空梅花紫铜门，门楣刻张静江篆书“民族”“民权”“民生”，重檐间嵌孙中山题“天地正气”，四角各一堡垒式方屋。",
      "<b>年代</b>：1925 年葬事筹备委员会悬奖征求图案，吕彦直方案获首奖；第一部工程含祭堂、墓室、平台与石阶，1926 年 1 月 15 日开工，1929 年春完工，吕彦直于当年 3 月病逝；6 月 1 日举行奉安大典，全部工程至 1931 年底告成。",
      "<b>内部与价值</b>：堂内 12 根石柱，钢筋混凝土为心、外包青岛黑花岗石；中央偏北为保罗·兰多斯基所作孙中山大理石坐像，高 4.6 米；堂后墓室是直径 18 米、高 11 米的半球形。全陵平面呈钟形，牌坊至祭堂距离 700 米、落差 73 米，被视为近代中国融合中西的代表作。"
    ],
    "caption": [
      "中山陵祭堂",
      "民国 · 1929年"
    ]
  },
  {
    "id": "js_nanjingwall",
    "name": "南京城墙中华门",
    "short": "中华门",
    "sub": "中华门城门局部",
    "country": "CN",
    "types": [
      "wall",
      "gate"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "明",
    "era": "明初营建",
    "year": 1393,
    "place": "江苏 · 南京",
    "placeKey": "nanjing",
    "lede": "进了第一道门，前面还有三道门：中华门城堡南北 128 米、东西 118.5 米，三重瓮城、四道券门层层套叠，墙体里掏出 27 个藏兵洞，能藏三千兵。它在南唐都城南门的旧址上拓建，是明洪武年间南京京城十三门里最宏大的一座，原名聚宝门，1931 年改今名，被认为是现存规模最大的瓮城式城门。图版只画中华门中央城门与相连墙体，不把整座南京城墙画作一个单体。",
    "facts": [
      "<b>形制</b>：城堡平面呈“目”字形，东西宽 118.5 米、南北长 128 米，占地 15168 平方米；一道城门、三道瓮城由四道券门贯通，首道城门高 21.45 米；各门原设可升降的千斤闸与双扇木门，今存闸槽与门位，两侧有马道可骑马登城。",
      "<b>年代</b>：朱元璋自 1366 年起修筑南京城垣，聚宝门在南唐江宁府、南宋建康府城南门旧址上于洪武年间拓建而成，传说门下埋有沈万三的聚宝盆；1931 年改名中华门，门额为蒋中正当年双十节前所题。",
      "<b>藏兵洞</b>：瓮城上下设藏兵洞 13 个、左右马道下设 14 个，共 27 个，战时储备军资、埋伏士卒，估计可容三千人；它被认为是中国现存最大、结构最复杂的城堡式瓮城，“三道瓮城、四道券门”的形制在明代城门中独一无二。"
    ],
    "yearApprox": true,
    "yearLabel": "明初",
    "yearNote": "1393为南京明城墙营建时期约略定位。",
    "caption": [
      "南京城墙 · 中华门",
      "明代城门 · 局部"
    ]
  },
  {
    "id": "js_chaotiangong",
    "name": "朝天宫大成殿",
    "short": "朝天宫",
    "sub": "清代大成殿",
    "country": "CN",
    "types": [
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "清",
    "era": "清同治年间重建",
    "year": 1870,
    "place": "江苏 · 南京",
    "placeKey": "nanjing",
    "lede": "太平天国战火之后，南京把江宁府学和文庙搬进了毁掉的道观：朝天宫现存的大成殿是清同治五年（1866）重建，重檐殿顶立在高大的台基上，正中石阶直上殿前。此前这里是明洪武十七年（1384）敕建的道教宫观，兼管全国道教，文武官员在此演习朝见天子的礼仪，“朝天”二字由此而来。大成殿如今是南京市博物馆的展厅。图版只绘大成殿与前方台阶。",
    "facts": [
      "<b>形制</b>：大成殿是朝天宫中轴线上的主体建筑，重檐殿顶覆琉璃瓦，坐于高台基上，正中设石阶；同治重建时木材采自海外，琉璃瓦产自江西景德镇。图版所绘为大成殿本体与台阶。",
      "<b>年代</b>：明洪武十七年（1384）重建赐名朝天宫、设道录司，二十八年（1395）建成，为朝廷习仪之所；太平天国期间建筑被毁。同治四年（1865）江宁府学、文庙迁入，五年（1866）九月建成大成殿、棂星门、戟门、两庑，六年至八年又在曾国藩主导下增建崇圣殿、明伦堂等。",
      "<b>价值</b>：朝天宫被称为江南规模最大、保存最完好的明清官式建筑群，从道教宫观到府学文庙的转换记录了晚清南京的重建；1936 年故宫博物院在府学旧址建南京分院及保存库安置南迁文物，今为南京市博物馆。"
    ],
    "yearApprox": true,
    "yearLabel": "清同治",
    "yearNote": "1870为同治年间重建约略定位。",
    "caption": [
      "朝天宫大成殿",
      "清同治 · 大成殿"
    ]
  },
  {
    "id": "js_liuyuan",
    "name": "留园冠云峰",
    "short": "留园",
    "sub": "冠云峰局部",
    "country": "CN",
    "types": [
      "garden"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "清",
    "era": "清代园林格局",
    "year": 1873,
    "place": "江苏 · 苏州",
    "placeKey": "suzhou",
    "lede": "一块石头做一座院子的主角：冠云峰高约 6.5 米，是江南最大的湖石，瘦、透、皱、漏俱全，相传为北宋花石纲遗物。它立在留园东部林泉耆宿之馆的北院，前有浣云沼，后有冠云楼，左右陪着瑞云、岫云两峰，整组院落就是为看石头而造。留园始于明万历二十一年（1593）的东园，今天的格局来自同治十二年（1873）盛康购园后的改建，1876 年落成，以“刘园”谐音改名留园。",
    "facts": [
      "<b>形制</b>：冠云峰为太湖石，高约 6.5 米，亭亭独立，兼具漏、瘦、透、皱、秀，是江南最大的湖石；与瑞云、岫云合称留园三峰，居中而立，前临水池浣云沼，后有冠云楼可登临俯瞰全园。图版绘峰石与相邻亭阁局部。",
      "<b>年代</b>：园始建于明万历二十一年（1593），为太仆寺少卿徐泰时的东园；清嘉庆三年（1798）刘恕改建为寒碧庄，俗称刘园；同治十二年（1873）湖北布政使盛康购得，历时三年大规模改修增建，光绪二年（1876）落成改名留园。1873 只供清代园林阶段定位。",
      "<b>价值</b>：留园分中、东、西、北四部，以建筑变化多样、奇石众多著称，曲廊全长七百余米，廊壁嵌历代碑刻三百余方；三任主要园主徐泰时、刘恕、盛康皆好石。1961 年列入首批全国重点文物保护单位，1997 年列入世界文化遗产。"
    ],
    "yearApprox": true,
    "yearLabel": "清代园林",
    "yearNote": "1873是园林阶段约略定位，不是冠云峰形成或安放的确切年。",
    "caption": [
      "留园冠云峰",
      "清代园林 · 局部"
    ]
  },
  {
    "id": "js_baodai",
    "name": "宝带桥",
    "short": "宝带桥",
    "sub": "连续石拱桥",
    "country": "CN",
    "types": [
      "bridge"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "清",
    "era": "清同治年间修复",
    "year": 1872,
    "place": "江苏 · 苏州",
    "placeKey": "suzhou",
    "lede": "五十三孔，318 米，一座桥把宽阔的澹台湖口拉成一条低平的石带——宝带桥是中国现存孔数最多的连拱石桥。它本是运河纤道的一段，所以桥栏不设挡板，纤夫可以一路拉着船走过去。唐元和十一年至十四年（816—819）始建，相传苏州刺史王仲舒捐出宝带助资，桥也像一条宝带；此后重建四五次，现存桥体为清代所建，近现代又经修复，年表只取修复阶段，不称整桥为唐物。",
    "facts": [
      "<b>形制</b>：联拱 53 孔石桥，全长 318 米，宽 4.1 米，跨澹台湖口玳玳河；作为纤道桥，桥栏不设挡板；两端各有石狮一对，北端尚存，南端石狮曾被日军炸毁，1956 年冬修复。",
      "<b>年代</b>：始建于唐元和十一年至十四年（816—819），相传苏州刺史王仲舒捐出宝带资助，桥形亦似宝带而得名；此后重建四五次，现存桥体为清代所建，近现代又经修复。",
      "<b>价值</b>：江苏现存最长的多孔古石拱桥，也是中国孔数最多的连拱石桥，位于京杭大运河旁，历代为纤道所经，是运河航运的实物遗存；常与赵州安济桥、都江堰珠浦桥、三江程阳桥并称中国四大古桥。"
    ],
    "yearApprox": true,
    "yearLabel": "清同治修复",
    "yearNote": "1872供修复阶段约略定位，非整桥原建年代。",
    "caption": [
      "苏州宝带桥",
      "明清重修 · 多孔石桥"
    ]
  },
  {
    "id": "js_zhaoguan",
    "name": "昭关石塔",
    "short": "昭关石塔",
    "sub": "过街石塔",
    "country": "CN",
    "types": [
      "pagoda",
      "gate"
    ],
    "initialStatus": "unvisited",
    "dyn": "yuan",
    "tag": "元",
    "era": "元代过街塔",
    "year": 1311,
    "place": "江苏 · 镇江 · 西津渡",
    "placeKey": "js_zhenjiang",
    "lede": "从塔下走过就是礼佛——元代人造过街塔的用意就在这里。昭关石塔立在镇江西津渡古街的最高处，四根石柱撑起方形青石盖板，上面坐一座喇嘛塔：双层须弥座、扁鼓形塔身、十三天、塔顶，全塔东西长 3.8 米，下面的通道正好跨住窄街。元至元年间刘高始建，至大四年（1311）竣工，明万历十年（1582）重修时在门额上刻了“昭关”二字；2000 年修塔，塔心室里发现两件曼荼罗。",
    "facts": [
      "<b>形制</b>：青石砌筑的喇嘛塔式过街塔，东西长 3.80 米、南北宽 3.20 米；四根石柱承方形青石盖板，柱板间以八对青石雀替缩短跨度，东西通行，南北以砖封闭。塔分塔座、塔身、塔颈、十三天、塔顶五部分，塔身扁鼓形、高 4.69 米，刻十三圈带形浮雕。",
      "<b>年代</b>：元至元年间刘高始建，至大四年（1311）竣工；明万历十年（1582）镇江知府王事圣等重修，门洞额石刻“昭关”二字，边款刻修塔官员姓名与“万历十年壬午十月重修”募缘僧名。1980 年、2000 年两次重修，2001 年获教科文组织亚太地区文化遗产保护奖。",
      "<b>价值</b>：石柱内侧刻“南无大方佛华严经”，塔上刻梵文六字真言；2000 年在塔心室发现两件曼荼罗，各有黄财神九尊、观音九尊，定为国家一级文物。它是江苏仅存的三座喇嘛塔之一，也被认为是中国保存最完好的过街石塔。"
    ],
    "yearApprox": true,
    "yearLabel": "元代",
    "yearNote": "1311为元代约略定位，非确证营建年。",
    "tall": true,
    "caption": [
      "昭关石塔",
      "元代 · 过街石塔"
    ]
  },
  {
    "id": "js_geyuan",
    "name": "个园假山",
    "short": "个园",
    "sub": "假山与园亭局部",
    "country": "CN",
    "types": [
      "garden"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "清",
    "era": "清嘉庆年间营建",
    "year": 1818,
    "place": "江苏 · 扬州",
    "placeKey": "js_yangzhou",
    "lede": "一座园子里走完四季：春山是竹丛里插着的石笋，夏山用青灰太湖石叠出云翻雾卷，秋山是粗犷的黄石，山顶一座四方亭，冬山倚墙堆雪白的宣石，墙上凿两排圆孔，北风吹过有声。个园由两淮盐商黄至筠于嘉庆二十三年（1818）在明代寿芝园旧址上重建，“个”是半个“竹”字；七楹长楼抱山楼两臂张开，把夏山、秋山收在怀里。图版取一处假山与相邻园亭，不当作全园。",
    "facts": [
      "<b>四季假山</b>：春山以竹丛插石笋状“雨后春笋”；夏山以青灰太湖石叠成，似云翻雾卷，下有细流；秋山以黄石叠成，山势最高、面积最大，内有洞穴石室，顶立四方亭；冬山倚墙叠色白圆浑的宣石，南墙开四行圆孔作风音洞。",
      "<b>年代</b>：清嘉庆二十三年（1818），两淮盐业商总黄至筠在明代寿芝园旧址上扩建为私家园林，园名取“月映竹成千个字”之意；同治初年（1862）售予镇江丹徒盐商李文安，李家经营约六十年，多以船队压舱石叠山，1949 年后收归国有。",
      "<b>价值</b>：抱山楼为七楹长楼，两侧长廊东西延伸，分别环抱秋山与夏山；以不同石材分造四季假山的手法，陈从周称为“国内孤例”。1988 年列入全国重点文物保护单位，据介绍又作为大运河扬州段的组成部分列入世界遗产。"
    ],
    "caption": [
      "个园假山",
      "清嘉庆 · 园林局部"
    ]
  },
  {
    "id": "js_heyuan",
    "name": "何园船厅",
    "short": "何园",
    "sub": "船厅与回廊局部",
    "country": "CN",
    "types": [
      "garden",
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "ming",
    "tag": "清",
    "era": "清光绪年间营建",
    "year": 1883,
    "place": "江苏 · 扬州",
    "placeKey": "js_yangzhou",
    "lede": "没有水，却是一条船：船厅四面回廊，形似舟舱，厅外地面用鹅卵石和瓦片铺成一圈水波纹，人站在廊下像站在船舷边。它是何园东园最精致的一座建筑，面阔 15.65 米、进深 9.5 米，单檐歇山，抱柱上刻着“月做主人梅做客，花为四壁船为家”。何园原名寄啸山庄，同治元年（1862）由何芷舠动工、光绪元年（1875）建成，1883 年并入片石山房，1500 米的复道回廊把前宅后园串成一体。图版只绘船厅与相连回廊局部。",
    "facts": [
      "<b>形制</b>：船厅面阔 15.65 米，进深 9.50 米，单檐歇山顶，四周带回廊，整体形似船舱；周围地面以鹅卵石、瓦片铺成水波纹，花窗嵌通透玻璃，抱柱楹联“月做主人梅做客，花为四壁船为家”。图版绘船厅与相连回廊局部。",
      "<b>年代</b>：何园始建于清同治元年（1862），光绪元年（1875）建成，历时十三年，为湖北汉黄德道道台何芷舠的私家园林，取陶渊明“倚南窗以寄傲”“登东皋以舒啸”之意名寄啸山庄；光绪九年（1883）又将吴氏片石山房并入园内。",
      "<b>价值</b>：全园以 1500 米复道回廊串联住宅、后花园、片石山房与祠堂，被称为“天下第一廊”，在中国园林中仅此一例；片石山房传为石涛叠石。童寯、刘敦桢、陈从周等皆推重其造园手法，罗哲文题为“晚清第一园”。"
    ],
    "yearApprox": true,
    "yearLabel": "清光绪",
    "yearNote": "1883为园林营建阶段约略定位，非船厅确证独立建年。",
    "caption": [
      "何园船厅",
      "清光绪 · 船厅局部"
    ]
  },
  {
    "id": "js_nanchao_stone",
    "name": "南朝陵墓石刻·萧景墓东辟邪",
    "short": "萧景墓石刻",
    "sub": "东辟邪",
    "country": "CN",
    "types": [
      "sculpture",
      "tomb"
    ],
    "initialStatus": "unvisited",
    "dyn": "nan",
    "tag": "南朝",
    "era": "南朝梁石刻",
    "year": 523,
    "place": "江苏 · 南京",
    "placeKey": "nanjing",
    "lede": "南京的市标就是从这头石兽身上描下来的。萧景墓东辟邪昂首、挺胸、张口吐舌，肩生双翼，四足迈开，整块石头雕成一股向前的劲。它原本有一对，西侧那只碎得无法修复，1956 年和 2009 年两次埋回土里，地面上只剩它。萧景是梁武帝的从兄，死于普通四年（523）；神道上还立着一根石柱，柱额二十三字用罕见的反左书阴刻，墓主与年代都写在上面。",
    "facts": [
      "<b>形制</b>：东辟邪为整石雕成的有翼神兽，昂首挺胸、张口吐舌，肩部刻双翼，四足前后错开作行进之姿；原为一对立于神道两侧，西辟邪因破碎无法修复，于 1956 年和 2009 年两次埋入原土，今地面仅存东辟邪。图版所绘即东辟邪。",
      "<b>年代</b>：萧景（477—523）为梁武帝萧衍叔父萧崇之之子，封吴平忠侯，卒于普通四年（523）；神道石柱柱额阴刻反左书“梁故侍中中抚将军开府仪同三司吴平忠侯萧公之神道”二十三字，是墓主与年代的直接依据，石刻应在其卒后不久完成。",
      "<b>价值</b>：南京及丹阳、句容现存南朝陵墓石刻 33 处，其中萧梁 13 处最多；萧景墓辟邪被视为南京的标志，是该市官方标志图形的取样原版。2014 年萧景、萧憺墓石刻遭非法拓印后，南京才开始为露天石刻加装监控、亭罩等保护设施。"
    ],
    "yearApprox": true,
    "yearLabel": "南朝梁",
    "yearNote": "523仅供南朝梁阶段年表约略定位，非此石兽确证刻造年。",
    "caption": [
      "萧景墓石刻",
      "南朝梁 · 东辟邪"
    ]
  }
]);

// 福建国保增补（2026-09-30）。图版、来源与国保登记见同 ID 记录。
PLACES.push(...[
  {
    "key": "fj_zhangzhou",
    "name": "漳州",
    "prov": "福建",
    "country": "CN",
    "lat": 24.5093,
    "lon": 117.6516,
    "coordinate_note": "漳州市区近似地图显示点，非各图版主体实测坐标。"
  },
  {
    "key": "fj_dongshan",
    "name": "东山",
    "prov": "福建",
    "country": "CN",
    "lat": 23.7048,
    "lon": 117.4308,
    "coordinate_note": "东山铜陵附近近似地图显示点，非门楼实测坐标。"
  },
  {
    "key": "fj_huaan",
    "name": "华安",
    "prov": "福建",
    "country": "CN",
    "lat": 25.0236,
    "lon": 117.6867,
    "coordinate_note": "华安大地村附近近似地图显示点，非二宜楼实测坐标。"
  },
  {
    "key": "fj_nanjing",
    "name": "南靖",
    "prov": "福建",
    "country": "CN",
    "lat": 24.6591,
    "lon": 117.1849,
    "coordinate_note": "南靖璞山村附近近似地图显示点，非和贵楼实测坐标。"
  },
  {
    "key": "fj_xiamen",
    "name": "厦门",
    "prov": "福建",
    "country": "CN",
    "lat": 24.4413,
    "lon": 118.0848,
    "coordinate_note": "厦门胡里山附近近似地图显示点，非炮位实测坐标。"
  }
]);
SITES.push(...[
  {
    "id": "fj_luoyang",
    "name": "洛阳桥",
    "short": "万安桥",
    "sub": "石梁桥 · 连续桥墩局部",
    "place": "福建泉州 · 洛阳江口",
    "placeKey": "quanzhou",
    "types": [
      "bridge"
    ],
    "dyn": "song",
    "tag": "北宋",
    "era": "嘉祐四年建成",
    "year": 1059,
    "lede": "宋人在洛阳江口做了三件后来者反复称道的事：先沿桥的中线抛石成矮堤作“筏形基础”，再在基石上养牡蛎让它们把石块黏成一体，最后趁潮水涨落用木排把十几吨的石梁浮运架上桥墩。皇祐五年（1053）王实等人起造，嘉祐四年（1059）在泉州知州蔡襄主持下建成，是中国现存最早的跨海石桥。图版取连续几座船形桥墩与石梁的一段。",
    "facts": [
      "<b>形制</b>：石梁桥，东北—西南走向，现存全长约731米、宽约4.5米，主体47孔、石墩45座，中段依托江心小岛中洲分两段建造；石墩朝上游一侧均作船形分水尖；桥面石梁为整块条石，最长达11米、宽0.98米、厚0.8米，重十余吨。",
      "<b>断代</b>：皇祐五年（1053）王实、卢锡等十五人合力建石桥，三年不成；嘉祐元年至四年（1056—1059）蔡襄两任泉州太守主持建成，亲撰153字《万安桥记》刻碑。此后至1993年共27次维修，明万历三十二年（1604）泉州大地震桥仍无恙。",
      "<b>价值</b>：中国现存最早的跨海石桥，开启宋元泉州三百年的造桥运动；筏形基础、种蛎固基与浮运架梁三项技术为后来的安平桥等所承袭。桥上及中洲存宋以来石塔7座、护桥石将军4尊，2021年列入世界遗产。"
    ],
    "caption": [
      "洛阳桥 · 石梁与桥墩",
      "北宋 · 嘉祐四年建成"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "1053年始建、1059年建成；图版仅取一段，不以局部表现全桥。",
    "legacyNames": []
  },
  {
    "id": "fj_tianhou",
    "name": "泉州天后宫",
    "short": "天后宫",
    "sub": "正殿 · 闽南翘脊",
    "place": "福建泉州 · 天后路",
    "placeKey": "quanzhou",
    "types": [
      "hall"
    ],
    "dyn": "song",
    "tag": "南宋",
    "era": "庆元二年始建",
    "year": 1196,
    "lede": "出泉州城南门德济门，先到天后宫再下晋江出海——这是宋元时期出海人祭拜妈祖的第一站。宫建于庆元二年（1196），初名顺济宫；绍定五年（1232）太守真德秀亲临祭祀，妈祖从此进入官方祭典，至元十五年（1278）朝廷封“天妃”。图版所绘正殿面阔五间、重檐歇山，屋脊高翘，现存主体结构形成于19世纪，坐在一米高的花岗岩台基上。",
    "facts": [
      "<b>形制</b>：正殿面阔五间24.6米、进深五间23米，重檐歇山顶，闽南式高翘屋脊；殿身坐于高出地面1米的花岗岩台基上，四面围堵浮雕鲤鱼化龙、神驹飞驰、鹤舞祥云等题材。现存主体结构形成于19世纪。",
      "<b>沿革</b>：南宋庆元二年（1196）始建，称顺济宫；1232年真德秀祭祀后纳入官方祭典，1278年敕封天妃，1281年由市舶司提举蒲师文主持敕封仪式；永乐五年（1407）郑和奏请修缮，康熙二十三年（1684）施琅奏请封“天后”；1815、1821年两次按原规制修缮。",
      "<b>格局</b>：宫址在古城南端，内通城区、外连港口，保存16世纪前已形成的前殿后寝布局，山门、戏台、拜庭、正殿、寝殿、梳妆楼沿中轴排列，占地约6800平方米；寝殿内留有一对移用的元代印度教十六角辉绿岩石柱。2021年列入世界遗产。"
    ],
    "caption": [
      "泉州天后宫 · 正殿",
      "南宋始建 · 后世修缮"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "1196年为天后宫始建年；正殿经历历代修缮，图版绘现状。",
    "legacyNames": []
  },
  {
    "id": "fj_zhangzhou_paifang",
    "name": "漳州石牌坊·三世宰贰坊",
    "short": "三世宰贰坊",
    "sub": "三世宰贰坊 · 单体",
    "place": "福建漳州 · 芗城香港路",
    "placeKey": "fj_zhangzhou",
    "types": [
      "gate"
    ],
    "dyn": "ming",
    "tag": "明",
    "era": "万历年间营建",
    "year": 1619,
    "lede": "漳州老城香港路上，两座明代石坊隔着28.5米南北对望，这是靠北的一座。万历四十七年（1619），朝廷为南京吏部右侍郎蒋孟育和他的父亲、祖父三代立坊，匾额两面分别刻“三世宰贰”与“两京敭历”。坊宽8.09米、高11米，三间五楼十二柱，青白两色石料相间砌筑，是闽南石雕工艺用在旌表建筑上的代表。",
    "facts": [
      "<b>形制</b>：三间、五楼、十二柱石坊，宽8.09米、高11米，南北向；以青石与白石相间建造，楼顶置鱼形脊饰，翼角起翘，正匾以下用梁、枋逐层分隔，斗拱、雀替、花版、垂柱皆为石雕。",
      "<b>纪年</b>：据福建省文物局记录，坊立于明万历四十七年（1619），旌表南京吏部右侍郎蒋孟育及其父、祖；正楼匾额两面刻楷书“三世宰贰”“两京敭历”。同街南侧的“尚书探花”坊早它14年，为林士章而立。",
      "<b>一组四坊</b>：漳州石牌坊国保单位含香港路两座明坊与岳口街两座清康熙武将坊，后两座花板上还雕有卷发戴帽的外国人形象，映照漳州月港时期的海外贸易。图版只取三世宰贰坊一座。"
    ],
    "caption": [
      "三世宰贰坊",
      "明万历 · 漳州石牌坊局部"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "三世宰贰坊确切建年资料有异说，以万历年间约略定位；图版仅画此坊，不代表四坊全组。",
    "yearApprox": true,
    "yearLabel": "明万历",
    "legacyNames": [
      "漳州石牌坊"
    ]
  },
  {
    "id": "fj_jiangdong",
    "name": "江东桥",
    "short": "江东桥",
    "sub": "石梁桥 · 局部",
    "place": "福建漳州 · 九龙江北溪",
    "placeKey": "fj_zhangzhou",
    "types": [
      "bridge"
    ],
    "dyn": "song",
    "tag": "南宋",
    "era": "嘉熙年间建成",
    "year": 1241,
    "lede": "每条石梁长二十二三米、重近二百吨——八百年前的工匠如何把它们架到急流上的桥墩之上，茅以升到1962年还说“至今还不完全知道”。江东桥旧名虎渡桥，嘉熙元年（1237）木桥毁于火，漳州郡守李韶倡议改建石桥，用时三年多建成。如今古桥只剩西岸五座完整桥墩、两跨桥面和九处残墩基，上面架着1970年的公路桥。图版取尚存的一段石梁与桥墩。",
    "facts": [
      "<b>形制</b>：多孔梁式石桥。现存完整桥墩5座、原桥面两跨、残墩基9座及东西金刚墙，残长100.35米；桥墩以0.35×0.4×5.2米条石交错叠砌成舰首形，通长11.4米、宽5.3米；每跨铺3至5条石梁，梁长22—23米、宽1.15—1.5米、厚1.3—1.6米，重近200吨。",
      "<b>断代</b>：绍熙元年（1190）此处架浮桥，嘉定年间郡守庄夏改为石墩木桥；嘉熙元年（1237）木桥毁于火，郡守李韶倡议改建石桥，用时三年余建成。《龙溪县志》记“广二十尺，长二千尺”，桥孔十五道。1970年在古桥上加高架设钢筋混凝土公路桥。",
      "<b>价值</b>：与洛阳桥、安平桥、龙江桥并称福建四大石桥，石梁之巨为中外桥梁史所罕见，李约瑟《中国科学技术史》称之为“有趣的历史性问题”；1652年郑成功在此击败清军，抗战中桥身遭日军轰炸，仅西岸五墩幸存。"
    ],
    "caption": [
      "江东桥 · 石梁局部",
      "南宋 · 嘉熙年间"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "1237—1241年营建；桥梁后世屡修，图版绘现存一段石梁与桥墩。",
    "legacyNames": []
  },
  {
    "id": "fj_dongshan_guandi",
    "name": "东山关帝庙",
    "short": "铜陵关帝庙",
    "sub": "门楼 · 闽南剪瓷雕屋脊",
    "place": "福建漳州 · 东山铜陵",
    "placeKey": "fj_dongshan",
    "types": [
      "gate",
      "hall"
    ],
    "dyn": "ming",
    "tag": "明",
    "era": "洪武二十年始建",
    "year": 1387,
    "lede": "庙门不是一堵墙，而是六根石柱擎起的一座亭，当地叫太子亭。左右各三柱向中间微微倾斜成三角受力，柱上密叠斗栱，再托起宫殿式的亭顶，脊上满是剪瓷雕：彩瓷片剪贴出八仙过海、瑞兽与唐宋人物，历久不褪色。庙始建于明洪武二十年（1387），正德、康熙两度扩建重修，今为台湾众多关帝庙分香的祖庙。图版所绘为这座门楼与门前石阶。",
    "facts": [
      "<b>形制</b>：门楼为牌楼式，六根圆石柱托起层叠斗栱与宫殿式亭顶，左右各三柱向中倾斜成三角受力；亭顶与屋脊满布剪瓷雕，正面为八仙过海与麒麟、象、狮等瑞兽，背面为唐宋人物故事。全庙面阔三间、进深六间，占地680余平方米。",
      "<b>断代</b>：明洪武二十年（1387）始建，正德三年（1508）动工扩建、七年（1512）落成，清康熙十九年（1680）重建；此后屡经增修，木构部分为明代、部分为清代与近代。殿内尚存黄道周所撰木刻楹联与清咸丰御书“万世人极”匾。",
      "<b>价值</b>：东山关帝庙与山西运城、河南洛阳、湖北当阳三处并称中国四大关帝庙，是台湾近千座关帝庙分香的祖庙。太子亭以斜柱与斗栱在海岛台风、地震中屹立数百年，是闽南匠人把力学与剪瓷雕合为一体的代表作。"
    ],
    "caption": [
      "东山关帝庙 · 门楼",
      "明洪武始建 · 现存立面"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "1387年为庙宇始建年；图版取现存门楼与入口，屋脊装饰和建筑曾修缮。",
    "legacyNames": []
  },
  {
    "id": "fj_eryi",
    "name": "华安二宜楼",
    "short": "二宜楼",
    "sub": "圆土楼 · 外立面",
    "place": "福建漳州 · 华安大地村",
    "placeKey": "fj_huaan",
    "types": [
      "residence"
    ],
    "dyn": "ming",
    "tag": "清",
    "era": "乾隆五年建",
    "year": 1740,
    "lede": "一座外径73.4米、四层高16米的巨圆，外墙底部厚2.53米，却不是客家人常见的通廊式圆楼，而是闽南式的单元楼：十六个单元各有自己的楼梯，从底层直通顶层，彼此以墙隔开，只在靠外墙一侧留隐通廊相连。蒋氏十四世蒋士熊自乾隆五年（1740）起建，历时三十年。楼内还留着二百余幅壁画与二百余幅彩绘。图版所绘为外环夯土立面。",
    "facts": [
      "<b>形制</b>：双环圆楼，外环四层、通高16米、外径73.4米，外墙最厚处2.53米；分16个单元、共213间，各单元自设楼梯，不设通层的前廊，而在靠外墙一侧设隐通廊；内环单层，经廊道与各单元相接。",
      "<b>断代</b>：乾隆五年（1740）由蒋氏十四世、“乡饮大宾”蒋士熊始建，至乾隆三十四年前后（约1770）落成，历时三十年。楼内保存壁画226幅、彩绘228幅、木雕349件、楹联163副，是断定其清中叶装修年代的直接物证。",
      "<b>比较</b>：二宜楼兼有客家内通廊式与闽南单元式土楼的特点，1996年成为第一座列为全国重点文物保护单位的土楼；2008年与永定、南靖诸楼一同作为“福建土楼”列入世界遗产，是其中单体面积最大的一座。"
    ],
    "caption": [
      "华安二宜楼 · 外立面",
      "清乾隆五年 · 圆土楼"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "legacyNames": [
      "二宜楼"
    ]
  },
  {
    "id": "fj_hegui",
    "name": "南靖和贵楼",
    "short": "和贵楼",
    "sub": "方土楼 · 五层正面",
    "place": "福建漳州 · 南靖璞山村",
    "placeKey": "fj_nanjing",
    "types": [
      "residence"
    ],
    "dyn": "ming",
    "tag": "清",
    "era": "雍正年间营建",
    "year": 1732,
    "lede": "一座五层方楼，高21.5米，是福建土楼里最高的一座，却盖在沼泽地上。雍正十年（1732）长教简氏建楼时，先在软地里打下两百多根松木桩，上铺木料，再砌卵石墙基，夯起土墙；两百多年过去，楼身仍然平稳。方楼每层28间，共140间，正面只开一门。图版取正面五层土墙与前方低矮的围墙，不表现内院。",
    "facts": [
      "<b>形制</b>：内通廊式方形土楼，五层，高21.5米，占地1547平方米，建筑面积3574平方米；每层28间、全楼140间，正中开一门，东西南北各设楼梯；厚实夯土外墙上密排小窗，与圆楼的防御形制不同。",
      "<b>断代</b>：清雍正十年（1732）由长教简氏十三世简次屏兴建，耗银一万五千两；始建为四层，重建时加高一层成今日五层。楼建于沼泽地上，以二百余根松木打桩铺垫作基，墙基用卵石垒砌，故历二百余年仍坚固稳定。",
      "<b>比较</b>：和贵楼在福建土楼中以“最高”见称，又名山脚楼，是少数单独列名世界遗产的单体土楼之一；2008年与怀远楼及田螺坑、河坑两处土楼群一同作为“福建土楼”南靖部分列入《世界遗产名录》。"
    ],
    "caption": [
      "南靖和贵楼 · 正面",
      "清雍正 · 五层方楼"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "以清雍正年间约略定位，不将传述的年份当作经核定的每层建年。",
    "yearApprox": true,
    "yearLabel": "清雍正",
    "legacyNames": [
      "福建土楼"
    ]
  },
  {
    "id": "fj_hulishan",
    "name": "胡里山炮台",
    "short": "胡里山炮台",
    "sub": "克虏伯炮位 · 局部",
    "place": "福建厦门 · 胡里山",
    "placeKey": "fj_xiamen",
    "types": [
      "wall"
    ],
    "dyn": "ming",
    "tag": "清",
    "era": "光绪年间建成",
    "year": 1894,
    "lede": "一门二百八十毫米口径的克虏伯后膛海岸炮，炮身十三米、重五十吨，还架在它一百多年前的炮位上——这是世界上现存最大的十九世纪海岸炮。胡里山炮台由福建水师提督彭楚汉、闽浙总督卞宝第题奏兴建，光绪二十年（1894）三月动工，二十二年（1896）十月竣工，半地堡半城垣，扼守厦门港入口。图版只取东炮台的克虏伯炮与炮位，不画整座炮台。",
    "facts": [
      "<b>形制</b>：炮台为半地堡半城垣式，设东、西两炮台安放主炮与护炮，总面积7万余平方米，其中城堡1.3万余平方米；台面用乌樟树汁、糯米、石灰、纸筋、砂石拌和的三合土夯筑。现存东炮口径280毫米，炮长13.13米、重50吨，可360度旋转，射程16000米。",
      "<b>断代</b>：光绪二十年（1894）三月初八动工，二十二年（1896）十月初八竣工，工期两年八个月；东炮编号“28 cm K.L/40 C/87”，为德国克虏伯厂1887年所产；西炮1958年在大炼钢铁运动中被拆毁，两门150毫米副炮1938年被占领厦门的日军运走。",
      "<b>价值</b>：清末为加强东南海防从克虏伯购入四门280毫米海岸炮，闽江口电光山的两门已无存，胡里山仅余此一门，2000年经鉴定列为世界现存最大的19世纪海岸炮；它与对岸屿仔尾炮台交叉封锁航道，是洋务运动海防体系的实物。"
    ],
    "caption": [
      "胡里山炮台 · 克虏伯炮位",
      "清光绪 · 海防遗存"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "图版绘现存克虏伯炮位局部；1894为炮台晚清建设阶段约略定位，不表示所有设施同年安装。",
    "yearApprox": true,
    "yearLabel": "清光绪",
    "legacyNames": []
  },
  {
    "id": "fj_laojun",
    "name": "清源山老君岩造像",
    "short": "老君岩",
    "sub": "老君坐像 · 宋代石刻",
    "place": "福建泉州 · 清源山",
    "placeKey": "quanzhou",
    "types": [
      "sculpture"
    ],
    "dyn": "song",
    "tag": "宋",
    "era": "宋代造像",
    "year": 1150,
    "lede": "整块天然花岗岩顺着石头的形状略加雕琢，就成了一位席地凭几、长髯垂胸的老子——《泉州府志》说得直白：“石像天成，好事者为略施雕琢。”像高5.63米，是中国现存最大的宋代道教石造像。清源山下原有真君殿、北斗殿一组道观，如今殿宇全无，只剩这尊老君坐在山麓，向南望着泉州城和晋江。",
    "facts": [
      "<b>形制</b>：由一块独立的天然花岗岩巨石雕成，高5.63米、宽8.01米、厚6.85米；老君秃顶高额、双耳垂肩、长髯飘动，身着对衽道袍席地而坐，右手凭几、左手扶膝、双腿盘屈，衣褶线条简约分明。所凭石几造型带元代家具特征，应为后配。",
      "<b>断代</b>：何乔远《闽书》记朱熹曾游此地“羽仙岩”，可知12世纪已有造像；造像周边出土的带靴楔栌斗、券门楔石等石构件，与南宋开元寺东西塔、六胜塔做法相同，是其为宋代遗物的考古依据。",
      "<b>价值</b>：中国现存最大的宋代道教石雕，与府文庙一道代表宋元泉州港背后的本土主流文化；在清源山宋元七处九尊石造像中体量最大，2021年作为“泉州：宋元中国的世界海洋商贸中心”22处遗产点之一列入世界遗产。"
    ],
    "caption": [
      "清源山老君岩 · 坐像",
      "宋代石刻 · 第三批国保"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "1150仅为宋代年表约略定位，不是老君岩确证开凿年；主体按第三批老君岩造像登记。",
    "yearApprox": true,
    "yearLabel": "宋代",
    "legacyNames": [
      "老君岩造像"
    ]
  },
  {
    "id": "fj_fuzhou_wenmiao",
    "name": "福州文庙",
    "short": "福州文庙",
    "sub": "大成殿 · 七开间",
    "place": "福建福州 · 圣庙路",
    "placeKey": "fuzhou",
    "types": [
      "hall",
      "school"
    ],
    "dyn": "ming",
    "tag": "清",
    "era": "咸丰年间现构",
    "year": 1852,
    "lede": "咸丰元年（1851）八月一场火把福州文庙烧尽，当年十二月便动工重建，到咸丰四年六月落成，今天所见就是这一次的格局。大成殿面阔七间、进深四间，重檐歇山，坐在一米半高的石台基上；下檐一圈二十二根石檐柱，殿内八根石内柱每根重约九吨，石柱头上再接木柱，是闽地石木混用的做法。2025年底，它完成了重建以来一百七十多年的首次大修。",
    "facts": [
      "<b>形制</b>：面阔七间、进深四间，重檐歇山顶，高19.6米，坐于高出殿前地面1.46米的石台基上；穿斗式木构架下部用石柱——石檐柱22根、石内柱8根，柱头以上接落地木柱18根；上下檐之间施五跳八铺作铺作42攒，藻井顶部绘星象图。",
      "<b>断代</b>：唐大历八年（773）观察使李椅移州学于此，宋太平兴国间始作孔庙，明洪武七年（1374）构大成殿；咸丰元年（1851）八月初三遭火，现存庙宇建于咸丰元年十二月至四年六月。2024—2025年历时一年余的大修，是重建后170多年来首次。",
      "<b>格局</b>：现存文庙占地7552平方米、建筑面积约4000平方米，中轴自南向北为外门埕、棂星门、泮池、大成门、月台、大成殿，两侧廊庑、官厅、乡贤祠对列；大成殿建筑面积在全国同类建筑中名列前茅，殿内置青石孔子及四配坐像与七十二贤石雕。"
    ],
    "caption": [
      "福州文庙 · 大成殿",
      "清咸丰 · 七开间"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "yearNote": "文庙起源较早；大成殿按1851—1854年修建阶段约略定位，图版为2026年修缮后现状。",
    "yearApprox": true,
    "yearLabel": "清咸丰",
    "legacyNames": []
  }
]);

// 台湾：依现存主体及当地文资资料分别注明初创、修护与所绘范围。
PLACES.push(
  { key: 'tw_tainan', name: '台南', prov: '台湾', country: 'CN', lat: 22.99046, lon: 120.20410, source_page: 'https://commons.wikimedia.org/wiki/File:Confucius_Temple_Tainan_-_Ta_Cheng_Hall_%E8%87%BA%E5%8D%97%E5%AD%94%E5%BB%9F%E5%A4%A7%E6%88%90%E6%AE%BF_(2026)_-_img_06.jpg', coordinate_note: '孔子庙附近的地图显示点，非大成殿测绘坐标。' },
  { key: 'tw_lukang', name: '鹿港', prov: '台湾', country: 'CN', lat: 24.05147, lon: 120.43618, source_page: 'https://commons.wikimedia.org/wiki/File:%E9%B9%BF%E6%B8%AF%E9%BE%8D%E5%B1%B1%E5%AF%BA%E4%BA%94%E9%96%80%E6%AE%BF.jpg', coordinate_note: '龙山寺附近的地图显示点，非五门殿测绘坐标。' },
  { key: 'tw_taipei', name: '台北', prov: '台湾', country: 'CN', lat: 25.04794, lon: 121.51106, source_page: 'https://commons.wikimedia.org/wiki/File:North_Gate_of_Taipei_City,_2023_(01).jpg', coordinate_note: '北门附近的地图显示点，非城门测绘坐标。' },
);
SITES.push(
  {
    id: 'tw_tainan_confucius', name: '台南孔子庙大成殿', short: '台南孔庙', sub: '大成殿正面', country: 'CN', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'modern', tag: '近代', era: '1665年创庙 · 1917年解体修护', year: 1917,
    yearNote: '1665年为庙学初创，1712年扩修大成殿；现存大成殿在1917年经解体修护与重建，年表按现状主体最近一次大规模修护定位。',
    place: '台湾 · 台南 · 中西区', placeKey: 'tw_tainan',
    lede: '台南孔庙大成殿以宽阔屋顶和重檐形成肃穆的正面，殿前露台、低墙与中轴台阶把祭孔空间层层展开。孔庙始于明郑时期，大成殿在清代重建中确立重要形制，日治时期的大修又影响今日面貌。这里不仅是一座古殿，也是教育与礼仪相连的场所；屋脊上的通天筒和定期祭典，使文教传统留在可见的建筑与仪式中。',
    facts: ['大成殿的屋顶约占建筑总高的一半，重檐与圆脊强调殿堂的中心地位；前方露台和中轴台阶组织祭祀空间，屋脊两侧另立通天筒装饰。', '孔庙于一六六五年形成，清康熙五十一年重建大成殿并确立重檐屋顶；日治时期又大修，现状不能只以明郑创建年代概括全部建筑材料。', '大成殿供祭孔之用，露台中轴与两侧通道呈现礼仪位阶；孔庙把学校与祭祀相结合，延续的祭典使建筑仍与地方文教生活保持联系。'],
    caption: ['台南孔子庙 · 大成殿正面', '1665年创庙 · 1917年解体修护'],
    legacyNames: ['臺南孔子廟大成殿', '臺南孔廟大成殿', '台南孔庙大成殿'],
  },
  {
    id: 'tw_lukang_longshan', name: '鹿港龙山寺五门殿', short: '鹿港龙山寺', sub: '五门殿正面', country: 'CN', types: ['hall'], initialStatus: 'unvisited',
    dyn: 'ming', tag: '清', era: '1786年迁建 · 1831年重修', year: 1831,
    yearNote: '1786年迁至现址，1831年重修奠定寺院规模；图版是历经1960年代构件替换与后来修复的五门殿现状，不将每根柱梁都断为清构。',
    place: '台湾 · 彰化 · 鹿港', placeKey: 'tw_lukang',
    lede: '鹿港龙山寺五门殿面对内埕，以门洞、龙柱和层叠屋檐形成通往寺内的正面。它同时连接戏台，兼有通行、礼拜与酬神演出的作用。寺院在清乾隆年间迁到现址，道光时期重修奠定今日格局，其后又有地震修复和构件替换。看门前石雕与檐下木作，可以感受泉州移民信仰如何在鹿港转化为地方建筑传统。',
    facts: ['五门殿与戏台相连，位于山门之后、正殿之前；重檐歇山屋顶的前面另加一道檐，形成三重屋檐，门洞、龙柱与两侧雕刻共同组织正面。', '龙山寺于清乾隆五十一年迁建，道光十一年重修形成主要格局；二十世纪五门殿又有彩绘与柱梁替换，现状不能视为清代材料完整未变。', '门前成对龙柱与龙、虎石雕采用精细雕刻，寺院由泉州移民及鹿港商民参与营建；通行与酬神戏台共处，表现信仰、商业社群和工艺的联系。'],
    caption: ['鹿港龙山寺 · 五门殿正面', '1786年迁建 · 1831年重修'],
    legacyNames: ['鹿港龍山寺五門殿', '鹿港龍山寺'],
  },
  {
    id: 'tw_taipei_northgate', name: '台北府城北门', short: '台北北门', sub: '承恩门 · 现存城门本体', country: 'CN', types: ['gate', 'wall'], initialStatus: 'unvisited',
    dyn: 'ming', tag: '清', era: '光绪十年（1884）建成', year: 1884,
    place: '台湾 · 台北 · 中正区', placeKey: 'tw_taipei',
    lede: '台北北门又名承恩门，厚实砖墙立在石砌门座上，顶部的单檐歇山顶与燕尾屋脊为堡垒般的门体添上轻巧线条。它是清末台北府城的城门，曾连接城内与大稻埕方向。城墙和瓮城后来拆除，北门留在现代街道之中；今天读它，既能看到晚清防御建筑的封闭形态，也能追寻旧城交通与城市变化的关系。',
    facts: ['北门以石条和砖墙组成封闭门体，内部有双层墙壁，顶部仍用传统木屋架；单檐歇山顶配燕尾起翘，与厚墙和石拱门形成鲜明的轻重对比。', '台北府城在清光绪八年动工、光绪十年完工，北门门额另刻光绪八年；城门先建、城墙续筑，一八八四年表示府城工程完成的历史节点。', '北门曾是城内通往大稻埕的交通孔道，其封闭形态反映火器时代的防御需求；城墙拆除后仍保留旧有外观，是阅读台北城发展的一处实物。'],
    caption: ['台北府城北门 · 承恩门', '清光绪十年（1884）'],
    legacyNames: ['臺北府城北門', '承恩門', '台北府城北门（承恩门）'],
  },
);

// 四川、重庆十处国保：按所绘主体断代，个人记录默认未到访。
PLACES.push(
  {"key": "sc_leshan", "name": "乐山", "prov": "四川", "country": "CN", "lat": 29.55, "lon": 103.77, "source_page": "https://commons.wikimedia.org/wiki/File:Leshan_Giant_Buddha_%282%29.jpg", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "sc_pingwu", "name": "平武", "prov": "四川", "country": "CN", "lat": 32.41, "lon": 104.53, "source_page": "https://commons.wikimedia.org/wiki/File:%E5%B9%B3%E6%AD%A6%E6%8A%A5%E6%81%A9%E5%AF%BA%E5%A4%A7%E9%9B%84%E5%AE%9D%E6%AE%BF%E7%85%A7%E7%89%87.jpg", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "sc_nanchong", "name": "南充", "prov": "四川", "country": "CN", "lat": 30.79, "lon": 106.1, "source_page": "https://commons.wikimedia.org/wiki/File:%E6%97%A0%E9%87%8F%E5%AE%9D%E5%A1%94%E7%85%A7%E7%89%87.JPG", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "sc_langzhong", "name": "阆中", "prov": "四川", "country": "CN", "lat": 31.58, "lon": 105.96, "source_page": "https://commons.wikimedia.org/wiki/File:Zfm001.jpg", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "sc_luodai", "name": "洛带", "prov": "四川", "country": "CN", "lat": 30.64, "lon": 104.33, "source_page": "https://commons.wikimedia.org/wiki/File:%E6%B4%9B%E5%B8%A6%E4%BC%9A%E9%A6%86%E7%85%A7%E7%89%87.JPG", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "sc_quxian", "name": "渠县", "prov": "四川", "country": "CN", "lat": 31.06, "lon": 107.0, "source_page": "https://commons.wikimedia.org/wiki/File:%E6%B8%A0%E7%B8%A3%E6%BC%A2%E9%97%95%E5%8F%8A%E7%9F%B3%E7%8D%B8_06.jpg", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "cq_zhongxian", "name": "忠县", "prov": "重庆", "country": "CN", "lat": 30.42, "lon": 108.18, "source_page": "https://commons.wikimedia.org/wiki/File:Shibaozhai_2016_1.jpg", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "cq_yuzhong", "name": "渝中", "prov": "重庆", "country": "CN", "lat": 29.56, "lon": 106.58, "source_page": "https://commons.wikimedia.org/wiki/File:%E9%87%8D%E5%BA%86%E6%B9%96%E5%B9%BF%E4%BC%9A%E9%A6%86%E6%88%8F%E6%A5%BC.jpg", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "cq_hechuan", "name": "合川", "prov": "重庆", "country": "CN", "lat": 30.01, "lon": 106.31, "source_page": "https://commons.wikimedia.org/wiki/File:Fishingtown.jpg", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"},
  {"key": "cq_tongnan", "name": "潼南", "prov": "重庆", "country": "CN", "lat": 30.18, "lon": 105.83, "source_page": "https://www.thepaper.cn/newsDetail_forward_27110662", "coordinate_note": "古迹附近的地图显示点，非主体测绘坐标。"}
);
SITES.push(
  {
    "id": "sc_leshan",
    "name": "乐山大佛",
    "dyn": "tang",
    "tag": "唐",
    "era": "713年始凿 · 803年完成",
    "year": 803,
    "yearApprox": false,
    "yearNote": "年表按大佛造像完成年803定位。图版选取现存头部至胸腹，不代表完整71米坐像。",
    "placeKey": "sc_leshan",
    "types": [
      "sculpture"
    ],
    "lede": "头高14.7米，耳长7米，1021个螺髻排成18层，第4、9、18层各藏一道横向排水沟，耳后还凿有左右相通的洞穴——唐人把排水系统做进了佛的头里，让这尊71米的弥勒倚坐像在崖壁上撑过了一千二百年。开元元年（713）僧海通发愿开凿，中经章仇兼琼，至贞元十九年（803）韦皋主持完工，前后约九十年。图版取现存头部至胸腹，不画双腿与底座。",
    "facts": [
      "<b>形制</b>：依凌云山崖壁开凿的倚坐弥勒像，露顶开龛，双手扶膝，总高71米；头宽10米、高14.7米，耳长7米，鼻长5.6米，眼、嘴各长3.3米，肩宽24米；头顶1021个螺髻分18层。右耳与鼻为后世维修时以木构涂灰补配，非原石。",
      "<b>断代</b>：开元元年（713）海通开凿，海通殁后停工；开元二十七年（739）剑南节度使章仇兼琼捐俸续凿，至746年凿到膝部再停；贞元元年（785）韦皋捐俸第三次开工，贞元十九年（803）完成，韦皋撰《嘉州凌云寺大弥勒石像记》刻于龛右崖壁。",
      "<b>价值</b>：建成时佛身施彩贴金，外罩木阁，北宋初已毁，仁宗朝重修后木阁终失；1925年一度被加红砂石面罩，1930年代拆去。大佛区及周边尚存龛窟206处、造像约452尊。1982年列为全国重点文物保护单位，1996年与峨眉山同列世界文化与自然双重遗产。"
    ],
    "short": "乐山大佛",
    "sub": "头部至胸腹",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "四川 · 乐山",
    "caption": [
      "乐山大佛 · 头部至胸腹",
      "713年始凿 · 803年完成"
    ]
  },
  {
    "id": "sc_baoen",
    "name": "平武报恩寺",
    "dyn": "ming",
    "tag": "明",
    "era": "明正统至天顺（1439—1460）",
    "year": 1450,
    "yearApprox": true,
    "yearNote": "寺院1439年动工，1446年主体建筑形成，1460年整体完成。大雄宝殿按这一营建期约1450定位，不给未确认的单殿竣工日。",
    "placeKey": "sc_pingwu",
    "types": [
      "hall"
    ],
    "lede": "川西北深山里，平武土官王玺父子建的一座寺院，却用了琉璃瓦顶、满堂楠木与两千余朵斗栱，处处是北方官式做法，因而有“深山故宫”之称。大雄宝殿是全寺主殿，绿琉璃瓦覆顶，殿内三尊金身坐佛，四壁绘明代壁画。正统五年（1440）动工，正统十一年（1446）主体殿宇建成，塑像、壁画至天顺四年（1460）完工。图版只画大雄宝殿正面，不画山门与配殿。",
    "facts": [
      "<b>形制</b>：大雄宝殿为寺中主殿，顶覆绿琉璃瓦，殿内天花施彩画，前部供三尊金身坐佛，四壁绘明代壁画；全寺木构件均为楠木，共用斗栱两千余朵、四十余种（各家统计36至48种不一），有“斗栱博物馆”之称。",
      "<b>断代</b>：明正统五年（1440）平武土官王玺父子动工，正统十一年（1446）主体殿宇建成，塑像、壁画等装饰至天顺四年（1460）完工；殿内大钟亦铸于1446年。寺坐西朝东，东西长278米、南北宽100米，建筑面积3518平方米。",
      "<b>价值</b>：琉璃瓦顶与遍布殿宇的龙纹本是明代北方官式建筑的做法，出现在川西北山区少见，寺名“报恩”即为感谢朝廷允建而取。寺内另有楠木千手观音与转轮经藏，不在图版之内。1996年列为全国重点文物保护单位。"
    ],
    "short": "平武报恩寺",
    "sub": "大雄宝殿",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "四川 · 平武",
    "caption": [
      "平武报恩寺 · 大雄宝殿",
      "明正统至天顺（1439—1460）"
    ]
  },
  {
    "id": "sc_wuliang",
    "name": "无量宝塔",
    "dyn": "song",
    "tag": "宋",
    "era": "宋代 · 建造年份未定",
    "year": 1000,
    "yearApprox": true,
    "yearNote": "国务院第六批名单断代为宋。年表约1000用于朝代内定位，非确定竣工年；不将传称建隆年间写成已证实的精确年代。",
    "placeKey": "sc_nanchong",
    "types": [
      "pagoda"
    ],
    "lede": "塔身东面第十级嵌着一方“建隆万寿之塔”匾，让它长期被认作北宋建隆年间（960–963）之物；可塔形方正、斗栱硕大，又像唐塔，近年也有人据仿木构细节推至南宋嘉定。无论哪一说，它都是四川年代最早的宋塔之一。方形十三层楼阁式砖塔，高39.56米，壁面以砖砌出柱、枋、斗栱，第一层还做出普拍枋与驼峰。图版按现存白塔绘制。",
    "facts": [
      "<b>形制</b>：方形十三层仿木楼阁式砖塔，通高39.56米，条石台基原为须弥座并浮雕龙鳞；每面砌四柱三间，共有小龛93个、门10道、窗9眼；斗栱为四铺作单杪或单昂，下三层阑额作圆木状，仅第一层施普拍枋与驼峰，塔刹为铁铸磨盘形。",
      "<b>断代</b>：塔无建造纪年，第十级东面匾额刻“建隆万寿之塔”，《新编南充县志》据此定为北宋建隆年间；另有晚唐五代与南宋嘉定两说，2006年公布为全国重点文物保护单位时断代为宋。崇祯十四年（1641）重修塔基，1981、1995年维修基座与塔身裂缝。",
      "<b>价值</b>：塔内下部四级有实心塔心柱，沿柱外砖阶盘旋可上，五级以上以叠涩相连，是研究唐塔向宋塔过渡的实例，被称为“四川宋代第一塔”。塔身通体裱糊灰白，故名白塔；仿木构件施土黄色，图版按现状设色，不复原历史颜色。"
    ],
    "short": "南充白塔",
    "sub": "十三层砖塔",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "四川 · 南充",
    "caption": [
      "无量宝塔 · 十三层砖塔",
      "宋代 · 建造年份未定"
    ]
  },
  {
    "id": "sc_zhanghuan",
    "name": "张桓侯祠",
    "dyn": "ming",
    "tag": "明清",
    "era": "现存明清建筑 · 年份约略",
    "year": 1600,
    "yearApprox": true,
    "yearNote": "敌万楼属于现存明清祠庙建筑群；约1600仅是年表定位，不认定所有构件建于同一年，更不按张飞卒年定位。",
    "placeKey": "sc_langzhong",
    "types": [
      "hall"
    ],
    "lede": "祠里最抢眼的不是大殿，而是山门后这座高十余米的敌万楼：重檐歇山，檐下斗栱一律斜出四十五度的昂，像张开的戈矛。楼名取张飞“力敌万人”之意，匾题“万夫莫敌”。张飞章武元年（221）死于阆中、葬于此，乡人于墓前立庙；现存建筑为明清屡毁屡建后的格局，敌万楼属明代。图版只取敌万楼及相连的前檐，不含大殿、墓亭与墓。",
    "facts": [
      "<b>形制</b>：敌万楼高十余米，重檐歇山顶，上层为楼阁、下层出宽展的前檐，檐下斗栱皆沿45度出斜昂；楼居祠庙中轴第二座，山门在前，左右牌坊与大殿在后，图版所绘红柱与柱间门窗即其下层前檐。",
      "<b>断代</b>：祠因张飞死后追谥桓侯得名；章武元年（221）张飞被部将所杀葬于阆中，墓上立庙已一千七百余年；现存为明、清重建的多重四合院建筑群，敌万楼为明代遗构。1991年列为四川省文物保护单位，1996年列为全国重点文物保护单位。",
      "<b>价值</b>：全祠占地6600余平方米、建筑面积2400余平方米，中轴依次为山门、敌万楼、牌坊、大殿、后殿、墓亭与张飞墓，墓封土高8米、东西25米、南北42米。阆中古城为中国四大古城之一，这组祠庙是城内重要的三国文化遗迹。"
    ],
    "short": "张桓侯祠",
    "sub": "敌万楼",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "四川 · 阆中",
    "caption": [
      "张桓侯祠 · 敌万楼",
      "现存明清建筑 · 年份约略"
    ]
  },
  {
    "id": "sc_luodai",
    "name": "洛带会馆",
    "dyn": "modern",
    "tag": "近代",
    "era": "清代初建 · 1913年重建",
    "year": 1913,
    "yearApprox": false,
    "yearNote": "禹王宫初建于清乾隆时期，1912年火灾后于1913年重建。年表采用现存主体的重建年，不按母单位“清”把现状门楼直接标作乾隆原构。",
    "placeKey": "sc_luodai",
    "types": [
      "hall"
    ],
    "lede": "三道拱门并列，中间一道最高，门上风火墙的轮廓起伏翻卷，墙头塑云纹与龙——这是洛带湖广会馆的门楼。会馆供大禹，故又名禹王宫，是清代“湖广填四川”的移民在成都东山聚会议事、祀神听戏的地方。乾隆十一年（1746）建，咸丰十年（1860）重建，1912年毁于火，次年再建，今所见门楼即1913年之物。镇上广东、江西、川北三馆相邻，合称洛带会馆。图版只画门楼。",
    "facts": [
      "<b>形制</b>：门楼为牌楼式，开三道拱门，明间高、次间低；门上以起伏的风火墙收顶，墙头塑云纹与龙饰。门内为戏台、天井与正殿，中庭以楠木构架；天井无下水道却从不积水，当地传为禹王庇佑。",
      "<b>断代</b>：湖广会馆为湖广籍移民捐建于清乾隆十一年（1746），咸丰十年（1860）重建；1912年毁于火灾，1913年重建，现存门楼属此次重建。2002年列为四川省文物保护单位，2006年与广东、江西、川北会馆合称“洛带会馆”列为全国重点文物保护单位。",
      "<b>价值</b>：洛带镇居民八成以上为客家人后裔，广东、江西、湖广、川北四座会馆并存一镇，被称为“会馆之乡”，是清代移民社会留在四川的一组实物见证。川北会馆原在成都卧龙桥，1998年迁建至此。图版不绘街边商铺与现代招牌。"
    ],
    "short": "洛带会馆",
    "sub": "禹王宫门楼",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "四川 · 洛带",
    "caption": [
      "洛带会馆 · 禹王宫门楼",
      "清代初建 · 1913年重建"
    ]
  },
  {
    "id": "sc_shenque",
    "name": "沈府君阙",
    "dyn": "han",
    "tag": "东汉",
    "era": "东汉石阙 · 年份约略",
    "year": 150,
    "yearApprox": true,
    "yearNote": "阙为东汉遗物；约150为年表朝代内定位，不作铭文纪年的精确建造年。图版只画一座现存主阙，不补已失副阙。",
    "placeKey": "sc_quxian",
    "types": [
      "que"
    ],
    "lede": "渠县七座汉阙里，只有沈府君阙双阙俱全，东西相对，相距二十一米余，各高4.84米。阙身正中一行隶书：东阙“汉谒者北屯司马左都侯沈府君神道”，西阙“汉新丰令交趾都尉沈府君神道”，笔势飘逸，不守绳墨，在汉隶中别为一格。阙身上端浮雕朱雀，下端饕餮，内侧东刻青龙、西刻白虎。约建于东汉延光年间（122–125）。图版只画其中一座主阙，子阙均已不存。",
    "facts": [
      "<b>形制</b>：砂石仿木构子母阙，两座主阙均高4.84米，阙身宽1.10米、厚0.76米，由阙基、阙身、阙楼、阙顶四部分叠成，阙身侧脚收分；楼部斗栱中出现的华栱为四川诸阙仅见。两阙外侧石面粗糙无饰，可证原有子阙，今已不存。",
      "<b>断代</b>：阙身无纪年，形制与建光元年（121）前后所建的冯焕阙相近而略晚，一般定为东汉安帝延光年间（122–125）；阙主沈氏生平不可考。清道光二十九年（1849）知县王椿源立《沈府君神道碑亭记》于西阙后。1961年列为第一批全国重点文物保护单位。",
      "<b>价值</b>：阙身浮雕朱雀、饕餮、青龙、白虎、铺首、力士，另有骑鹿、戏虎、董永侍父、养由基射猿等故事，内侧的玉璧与白虎构图尤佳。渠县六处七尊汉阙占全国现存近四分之一，2019年起每阙外加钢架玻璃棚保护，图版不绘棚架。"
    ],
    "short": "沈府君阙",
    "sub": "一座现存主阙",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "四川 · 渠县",
    "caption": [
      "沈府君阙 · 一座现存主阙",
      "东汉石阙 · 年份约略"
    ]
  },
  {
    "id": "cq_shibao",
    "name": "石宝寨",
    "dyn": "ming",
    "tag": "明清",
    "era": "明代始建 · 清代扩修",
    "year": 1800,
    "yearApprox": true,
    "yearNote": "明万历始建，清康熙至同治多次扩修；约1800用于现存寨楼的朝代内定位。上三层形成时间资料存在差异，不给整座现状楼定1956年。",
    "placeKey": "cq_zhongxian",
    "types": [
      "pavilion"
    ],
    "lede": "朱红木楼贴着玉印山的陡壁向上攀升，层层屋檐逐渐收窄，上接三层奎星阁，组成石宝寨十二层的轮廓。木楼并不独自站立，而是借山体承托，楼梯也把崖下与山顶相连。它在明清多次营建中形成现貌，老照片已能看到上部楼阁，楼层之多不等于一次建成，更不能随意给整楼套上近代扩建年。",
    "facts": [
      "下部九层寨楼依崖逐层内收，上部三层奎星阁与之相接。穿斗木架通过榫卯连接，部分柱子插入岩体，圆窗与方形木窗交错，楼与山共同形成承托关系。",
      "石宝寨明万历时期始建，清康熙至同治多次扩修，现貌由不同阶段共同形成。上三层形成时间资料有差异，一九〇九年档案照片已见，不能将全楼定为一九五六年。",
      "寨楼既是建筑，也是登山通道，让人在陡崖旁逐层接近山顶。它以木构适应地形的方式区别于独立宝塔，山体并非背景，而是理解楼阁稳定和空间的关键。"
    ],
    "short": "石宝寨",
    "sub": "十二层寨楼",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "重庆 · 忠县",
    "caption": [
      "石宝寨 · 十二层寨楼",
      "明代始建 · 清代扩修"
    ]
  },
  {
    "id": "cq_huguang",
    "name": "重庆湖广会馆",
    "dyn": "ming",
    "tag": "清",
    "era": "清代会馆 · 道光年间扩修",
    "year": 1846,
    "yearApprox": true,
    "yearNote": "会馆建筑群清代形成并于道光年间扩修，约1846用于清代现存主体定位；图版画历经2003—2005年维修的戏楼，不认定每根梁柱均为1846原构。",
    "placeKey": "cq_yuzhong",
    "types": [
      "stage"
    ],
    "lede": "雕木栏板横在高起的戏台前，柱与梁枋围出开敞舞台，细部把人物故事留在观戏人的视线里。重庆湖广会馆的戏楼属于移民聚会空间，祭祀、议事与听戏在同一院落体系中发生。会馆现存建筑在清代扩修中形成，又经历现代保护维修；眼前一座戏楼正面，不能代表全部公所都在同一年建成。",
    "facts": [
      "戏楼以高起舞台、柱列和雕花栏板组织正面，屋檐下木雕与梁枋相互连接。它面对会馆院落，与看厅和侧廊共同服务观演，眼前只是其中一座戏楼的正面。",
      "湖广会馆建筑群在清代逐步形成，道光年间有重要扩修，各公所的沿革并不完全相同。现状又经过现代保护维修，建筑形成的时期不能直接当作每根梁柱的年龄。",
      "移民会馆让同乡在异地建立祭祀、商议和交往的共同场所，戏楼使这些活动也具有公共表演的一面。木雕故事和观戏空间共同保存巴渝移民社会的文化生活。"
    ],
    "short": "湖广会馆",
    "sub": "戏楼正面",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "重庆 · 渝中",
    "caption": [
      "重庆湖广会馆 · 戏楼正面",
      "清代会馆 · 道光年间扩修"
    ]
  },
  {
    "id": "cq_diaoyu",
    "name": "钓鱼城遗址",
    "dyn": "song",
    "tag": "南宋",
    "era": "1243年筑城扩建 · 门楼后修",
    "year": 1243,
    "yearApprox": false,
    "yearNote": "1243年为南宋钓鱼城防御体系营建的重要节点，年表按遗址定位。护国门上部木构门楼为后修，不把照片中全部结构认作宋代原构。",
    "placeKey": "cq_hechuan",
    "types": [
      "gate"
    ],
    "lede": "厚石墙开一道拱洞，门前石阶贴着山崖转折，护国门让钓鱼城的防御直接借助险要地形。门台上还有后修的木构门楼，现状并不是全部宋代原构。南宋在这里逐步建立山城防御体系，一二四三年是重要营建节点；走近一处城门，也能理解城墙、山崖与通路怎样彼此配合。",
    "facts": [
      "护国门石砌门洞与城墙连成一体，前方石阶贴崖上行，入口受地势约束。现状上部有后修木构门楼，坚实的石体与较轻的楼阁构成不同历史层次。",
      "一二四三年是南宋钓鱼城防御体系营建的重要节点，随后仍有扩筑和修缮。纪年对应遗址历史，不证明护国门全部现存构件都在当年完成，尤其不能统领后修门楼。",
      "山城把天然山险和城垣结合，将有限通路纳入防御组织，护国门是其中直观的一处。遗址也保存生活与行政设施，守城并不只有城门，还依赖长期居住和供给。"
    ],
    "short": "钓鱼城",
    "sub": "护国门",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "重庆 · 合川",
    "caption": [
      "钓鱼城遗址 · 护国门",
      "1243年筑城扩建 · 门楼后修"
    ]
  },
  {
    "id": "cq_tongnan",
    "name": "潼南大佛寺摩崖造像",
    "dyn": "song",
    "tag": "南宋",
    "era": "唐代凿首 · 1151年全像完成",
    "year": 1151,
    "yearApprox": false,
    "yearNote": "佛首在唐代开凿，佛身北宋续凿，1151年全像完成；现存金箔含2010年代保护修复成果，年表不按寺院初建年定位。",
    "placeKey": "cq_tongnan",
    "types": [
      "sculpture"
    ],
    "lede": "深色螺发衬着金色面容，袈裟衣纹铺在宽阔身躯上，潼南大佛的现状把石雕与饰金结合在一起。它先凿佛首，再续佛身，经历唐宋才完成大像；金色又包含历代重装和现代保护成果。看面容、手势与衣纹，也要分清造像本体和表面装饰的不同历史，不能将闪亮金箔都当作宋代遗存。",
    "facts": [
      "大佛以岩壁为胎体，螺发和高肉髻围住面容，袈裟披覆身躯。现状右手仰掌置腹前、左手扶膝，金色表面与深色发髻相对，石雕体量与背后岩壁相互联系。",
      "佛首在唐代开凿，北宋续凿佛身，一一五一年完成全像，随后饰金。大像的完成与寺院初创各有年代，不能混为一谈；现存发髻和金箔还包含后世修护。",
      "修复研究显示石体、塑补发髻、漆层与金箔需要分别保护，今日形貌正由这些层次组成。大佛既见证唐宋造像延续，也保存装金传统在现代维护中的发展。"
    ],
    "short": "潼南大佛",
    "sub": "现存饰金大佛",
    "country": "CN",
    "initialStatus": "unvisited",
    "place": "重庆 · 潼南",
    "caption": [
      "潼南大佛寺摩崖造像 · 现存饰金大佛",
      "唐代凿首 · 1151年全像完成"
    ]
  }
);

// 山西国保十处原型增补：所绘范围与来源见 assets/research/shanxi-national-20261002-plan.md。
SITES.push(
{
  "id": "sx_zishou",
  "name": "灵石资寿寺",
  "short": "资寿寺",
  "sub": "天王殿正面",
  "dyn": "ming",
  "tag": "明清",
  "era": "明代殿宇 · 后世修缮",
  "year": 1500,
  "yearLabel": "明代殿宇 · 后世修缮",
  "yearApprox": true,
  "yearNote": "1500仅作所绘天王殿正面的约略年表排序位置，不是确切建年；初创、扩建与后世修缮分别记载。",
  "place": "山西灵石",
  "placeKey": "sx_lingshi",
  "types": [
    "hall"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "资寿寺天王殿的正面不是槅扇，而是一堵青砖实墙，只在正中开一道门，门上悬“山林幽趣”匾；灰瓦屋面镶蓝绿琉璃剪边，正脊满布琉璃楼阁与走兽。寺在灵石静升镇苏溪村，碑记创建于唐咸通十一年（870），金末焚毁，明成化三年（1467）重建，正德十六年（1521）大规模补葺，天启二年（1622）形成现有规模，现存殿宇均为明代建筑。图版所绘为天王殿正面。",
  "facts": [
    "<b>天王殿</b>：图版所见为单檐殿宇，正面砌砖墙不设槅扇，中央一门，门前石狮一对，檐下施斗栱，屋面灰瓦、琉璃剪边与琉璃正脊；殿两侧为钟楼、鼓楼，殿内两侧列四尊高约3米的天王像。",
    "<b>纪年</b>：寺创建于唐咸通十一年（870），金末毁于火，元重修，明成化三年（1467）重建，正德十六年（1521）补葺，天启二年（1622）定型；总面积约17000平方米，前后两院。2001年列为全国重点文物保护单位。",
    "<b>劫难</b>：寺以明代彩塑与壁画著称，各殿壁画248.34平方米，塑像百余尊；1993年寺内十八罗汉的头像被整体盗割卖往海外，后由台湾商人陈永泰购回捐还，成为山西流失文物回归的一例。"
  ],
  "caption": [
    "灵石资寿寺 · 天王殿正面",
    "明代殿宇 · 后世修缮"
  ]
},
{
  "id": "sx_ruicheng_chenghuang",
  "name": "芮城城隍庙",
  "short": "芮城城隍庙",
  "sub": "大殿山面",
  "dyn": "song",
  "tag": "宋",
  "era": "宋代原构 · 历代修葺",
  "year": 1100,
  "yearLabel": "宋代原构 · 历代修葺",
  "yearApprox": true,
  "yearNote": "1100仅作所绘大殿山面的约略年表排序位置，不是确切建年；初创、扩建与后世修缮分别记载。",
  "place": "山西芮城",
  "placeKey": "ruicheng",
  "types": [
    "hall"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "山西现存年代最早的城隍庙。大殿为宋构，单檐歇山，前檐柱头五铺作双下昂，昂作劈竹式；从山面看，歇山山花嵌一块明代“二龙戏珠”琉璃悬板，脊上鸱吻、脊饰皆琉璃，下面却是素朴红墙。庙俗称“南庙”，民国《芮城县志》记始建于北宋大中祥符年间（1008–1016），元、明、清重修；中轴上享亭元构，献殿、寝殿清构，一院之内四朝木作并存。图版所绘为大殿山面。",
  "facts": [
    "<b>大殿</b>：面阔五间、进深三间，单檐歇山顶；前檐柱头五铺作双下昂，昂为劈竹式，耍头作蚂蚱形；歇山山花饰明代“二龙戏珠”琉璃悬板，琉璃鸱吻与脊饰色彩鲜明，红墙下砌青砖裙墙。",
    "<b>纪年</b>：据民国《芮城县志》，庙创建于北宋大中祥符年间（1008–1016），元、明、清皆有修葺；大殿为宋代原构，享亭元代，献殿与寝殿清代，山门、戏台、钟鼓楼为近年重建。2001年列为全国重点文物保护单位。",
    "<b>碑刻</b>：庙内碑廊陈列北魏至明清碑刻、造像碑98通，其中唐贞元十四年（798）《中条山靖院道堂并序》为虢州刺史王颜撰、袁滋书；享亭四架椽屋通檐用二柱，额枋粗大、角柱歪斜，元构特征典型，图版未绘。"
  ],
  "caption": [
    "芮城城隍庙 · 大殿山面",
    "宋代原构 · 历代修葺"
  ]
},
{
  "id": "sx_qiao",
  "name": "乔家大院",
  "short": "乔家大院",
  "sub": "在中堂院内楼与两侧廊房",
  "dyn": "ming",
  "tag": "明清",
  "era": "清代院落 · 分期扩建",
  "year": 1800,
  "yearLabel": "清代院落 · 分期扩建",
  "yearApprox": true,
  "yearNote": "1800仅作所绘在中堂院内楼与两侧廊房的约略年表排序位置，不是确切建年；初创、扩建与后世修缮分别记载。",
  "place": "山西祁县",
  "placeKey": "sx_qixian",
  "types": [
    "residence"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "乔家大院正名“在中堂”，是晋商乔致庸的宅第。一条八十米长的石甬道把六座大院分成南北两排，俯视整座宅子像一个“囍”字；每座大院都是这样的狭长院落，两侧廊房夹出院心，尽端是二层楼房的正房。宅子始建于清乾隆二十年（1755），同治、光绪年间几度增修扩建，民国初年才成今日规模，单座院落只能约略系年。图版所绘为在中堂一座院内的尽端楼房与两侧廊房。",
  "facts": [
    "<b>院落</b>：在中堂占地10642平方米，六个大院、二十个小院、三百一十三间房；大门坐西向东，拱券门洞上建顶楼。图版所见两侧为单层廊房，尽端正房二层、上层出廊，灰砖墙、木槅扇与檐下砖雕彩绘层层相叠。",
    "<b>纪年</b>：始建于清乾隆二十年（1755），同治、光绪年间增修扩建，民国初年建成；院落分期营造，单座院落无确切竣工年。2001年列为全国重点文物保护单位，1985年辟为祁县民俗博物馆，次年开放。",
    "<b>家世</b>：乔家自乔贵发乾隆初年“走西口”到包头起家，创“复盛公”商号，有“先有复盛公，后有包头城”之谚，至乔致庸一代商号遍布各地。德兴堂、宁守堂、保元堂与花园系近年于原址恢复，图版不涉。"
  ],
  "caption": [
    "乔家大院 · 在中堂院内楼与两侧廊房",
    "清代院落 · 分期扩建"
  ]
},
{
  "id": "sx_wang",
  "name": "王家大院",
  "short": "王家大院",
  "sub": "红门堡院墙与屋顶局部",
  "dyn": "ming",
  "tag": "明清",
  "era": "清代宅院 · 约略年表定位",
  "year": 1750,
  "yearLabel": "清代宅院 · 约略年表定位",
  "yearApprox": true,
  "yearNote": "1750仅作所绘红门堡院墙与屋顶局部的约略年表排序位置，不是确切建年；初创、扩建与后世修缮分别记载。",
  "place": "山西灵石",
  "placeKey": "sx_lingshi",
  "types": [
    "residence"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "王家大院的红门堡是一座真正的堡：高八米、厚两米的堡墙围出六百多米周长，堡内八十八座院落顺坡分四层排列，中间一条主街直上，平面像一个“王”字。从高处看，灰瓦屋顶、砖院墙、镂空花墙与小门楼层层相叠，即图版所取的一角。红门堡又名恒贞堡，建于清乾隆年间，静升王氏第十四至二十一代共八代人住在这里；整座王家大院则是康熙至嘉庆近九十年间陆续建成。",
  "facts": [
    "<b>堡</b>：红门堡即恒贞堡，为王家大院西大院，依山由低到高分四层院落，左右对称，共88座院落、776间房；堡墙高8米、宽2米、周长600余米，南堡门嵌“恒贞”石匾。图版所见为堡内屋顶、花墙与院门的层叠。",
    "<b>纪年</b>：红门堡建于清乾隆年间，东侧高家崖建于嘉庆年间，由十七世王汝聪、王汝成兄弟修建；王家大院集中建于清康熙至嘉庆近90年间，共123座院落、1118间房。2006年列为全国重点文物保护单位。",
    "<b>家世</b>：静升王氏元皇庆二年（1313）迁来务农，明代经商，清代以盐、茶起家，咸丰三年（1853）扬州失陷后衰落。全院总面积一说15万、一说25万平方米，为山西规模最大的清代民居建筑群之一。"
  ],
  "caption": [
    "王家大院 · 红门堡院墙与屋顶局部",
    "清代宅院 · 约略年表定位"
  ]
},
{
  "id": "sx_daixian_wenmiao",
  "name": "代县文庙",
  "short": "代县文庙",
  "sub": "大成殿正面与台基",
  "dyn": "ming",
  "tag": "明清",
  "era": "明清建筑 · 历代维修",
  "year": 1500,
  "yearLabel": "明清建筑 · 历代维修",
  "yearApprox": true,
  "yearNote": "1500仅作所绘大成殿正面与台基的约略年表排序位置，不是确切建年；初创、扩建与后世修缮分别记载。",
  "place": "山西代县",
  "placeKey": "sx_daixian",
  "types": [
    "school"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "华北现存规模最大的州文庙。大成殿面阔七间、进深十椽，单檐歇山，整片屋面铺孔雀蓝琉璃瓦，檐下九踩斗栱单翘三下昂，前檐一排槅扇棂花有十二种花样；殿立在汉白玉台基上，三面石栏，正中雕龙御路。文庙相传创于唐，元至正二十七年（1367）重建、明洪武二年（1369）完工，成化、嘉靖扩建，清代屡修，现存主体为明代建筑。图版所绘为大成殿正面与月台，前景碑石略去。",
  "facts": [
    "<b>大成殿</b>：面阔七间（代县政府网页作五间）、进深十椽，单檐歇山顶，孔雀蓝琉璃瓦；檐下九踩单翘三下昂斗栱；前檐槅扇棂花十二种；殿内藻井八卦攒顶，方、八角、圆三层由四层斗栱挑起。",
    "<b>纪年</b>：相传唐代创建，元末毁于兵火，至正二十七年（1367）重建，明洪武二年（1369）完工，成化、嘉靖年间扩建，清代屡经修葺，1949年后作粮库得以保存。国家文物局登记时代为明至清，2006年列为全国重点文物保护单位。",
    "<b>格局</b>：庙占地约14400平方米，四进院落，中轴依次为万仞坊、棂星门、泮池、戟门、大成殿、敬一亭，泮池东西为名宦祠、乡贤祠；棂星门六柱五楼，夹楼嵌琉璃团龙壁心。图版只取大成殿。"
  ],
  "caption": [
    "代县文庙 · 大成殿正面与台基",
    "明清建筑 · 历代维修"
  ],
  "legacyNames": [
    "代州文庙"
  ]
},
{
  "id": "sx_ciyun",
  "name": "天镇慈云寺",
  "short": "慈云寺",
  "sub": "大雄宝殿正面",
  "dyn": "ming",
  "tag": "明清",
  "era": "明代殿堂 · 后世维修",
  "year": 1450,
  "yearLabel": "明代殿堂 · 后世维修",
  "yearApprox": true,
  "yearNote": "1450仅作所绘大雄宝殿正面的约略年表排序位置，不是确切建年；初创、扩建与后世修缮分别记载。",
  "place": "山西天镇",
  "placeKey": "sx_tianzhen",
  "types": [
    "hall"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "慈云寺大雄宝殿只有三间见方，单檐歇山，檐下斗栱层层出跳，殿内留着五十多平方米的明代壁画：正壁十二圆觉，两侧二十四诸天与天龙八部。寺在天镇县城西街，原名法华寺，光绪《天镇县志》记唐时建，辽开泰八年（1019）重修，明宣德三年至五年（1428–1430）再修，千户熊亮奏请赐额，始名慈云寺，号“关北巨刹”；今日格局即宣德大修所留。图版所绘为大雄宝殿正面与殿前台阶。",
  "facts": [
    "<b>大雄宝殿</b>：一名释迦殿，面阔、进深各三间，单檐歇山顶，立于高台基上，中央石阶登殿，图版所见檐下斗栱密布；殿内明代壁画50余平方米，塑释迦佛坐像，两侧药师、阿弥陀。",
    "<b>纪年</b>：光绪《天镇县志》载寺“唐时建，寺原名法华”，辽开泰八年（1019）修，明宣德三年至五年（1428–1430）重修赐额“慈云寺”，明嘉靖十八年（1539）、清乾隆二十六年（1761）续修。2006年列为全国重点文物保护单位。",
    "<b>钟鼓楼</b>：天王殿前的钟楼、鼓楼平面八角、顶作圆形穹庐，下层砖室外绕八柱，上层敞开设栏，是山西元明钟鼓楼中仅见的形制，钟楼悬明宣德七年（1432）铁钟；寺现存单体建筑31座，占地约1.6公顷。"
  ],
  "caption": [
    "天镇慈云寺 · 大雄宝殿正面",
    "明代殿堂 · 后世维修"
  ],
  "legacyNames": [
    "慈云寺大雄宝殿"
  ]
},
{
  "id": "sx_wuyue",
  "name": "介休五岳庙",
  "short": "介休五岳庙",
  "sub": "戏楼正面",
  "dyn": "ming",
  "tag": "明清",
  "era": "清代建筑 · 后世维修",
  "year": 1750,
  "yearLabel": "清代建筑 · 后世维修",
  "yearApprox": true,
  "yearNote": "1750仅作所绘戏楼正面的约略年表排序位置，不是确切建年；初创、扩建与后世修缮分别记载。",
  "place": "山西介休",
  "placeKey": "jiexiu",
  "types": [
    "stage"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "介休五岳庙把山门、戏楼、钟鼓楼合成一座楼，当地叫“海蜃楼”。朝院一面上层五间，明间向前突出一间作台口，歇山小顶压在中央，两翼山花朝前；下层砖券五洞，正中一洞是进庙的通道。屋面用孔雀蓝琉璃，介休号称琉璃之乡，此处釉色尤纯。庙创建于明景泰七年（1456），清乾隆十五年（1750）毁，二十八年（1763）重建，现存建筑属清代。图版所绘为戏楼朝院正面。",
  "facts": [
    "<b>戏楼</b>：建于高台之上，面阔五间，明间向北突出一间，檐下斗栱繁复；上层台口设木栏，两侧山花向前，下层中央通道与四个侧拱洞并列；山门、戏楼与钟鼓楼合为一体，称海蜃楼。",
    "<b>纪年</b>：据庙碑，创建于明景泰七年（1456），清乾隆十五年（1750）被毁、二十八年（1763）重建，2001年维修；国家文物局登记时代为清，2006年列为全国重点文物保护单位。",
    "<b>琉璃</b>：屋顶孔雀蓝琉璃饰件色泽纯正、造型精美，介休市文物局称之为“琉璃之乡”又一处精品；庙坐北朝南，二进院落，占地4149平方米，现存影壁、献亭、正殿、后寝殿等13座建筑，正殿五间硬山顶。"
  ],
  "caption": [
    "介休五岳庙 · 戏楼正面",
    "清代建筑 · 后世维修"
  ]
},
{
  "id": "sx_pingyao_chenghuang",
  "name": "平遥城隍庙",
  "short": "平遥城隍庙",
  "sub": "戏楼昭格楼南面",
  "dyn": "ming",
  "tag": "明清",
  "era": "清代建筑 · 后世维修",
  "year": 1750,
  "yearLabel": "清代建筑 · 后世维修",
  "yearApprox": true,
  "yearNote": "1750仅作所绘前殿正面的约略年表排序位置，不是确切建年；初创、扩建与后世修缮分别记载。",
  "place": "山西平遥",
  "placeKey": "pingyao",
  "types": [
    "hall"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "进平遥城隍庙，先要从一座楼底下低矮的门道穿过，门道上悬“敢入”二字，“入”字写得像一把刀。这座楼就是戏楼“昭格楼”，重檐歇山、面阔三间，朝南一面在门道上方挑出一座歇山抱厦，斗栱繁密，两侧钟楼、鼓楼相连。庙创建年代不详，明嘉靖三十三年（1554）火后重修，清咸丰九年（1859）再遭火灾仅剩寝殿，现存建筑多为同治三年至八年（1864–1869）重建。图版所绘为此楼朝南一面与门道。",
  "facts": [
    "<b>戏楼</b>：二层，重檐歇山顶，面阔三间，琉璃瓦；南面匾“敢入”、北面匾“昭格楼”，台下门道通入前院；舞台方砖下埋陶瓮十口，与天花共鸣。东西两侧钟鼓楼与之相连，图版所绘为南面及抱厦。",
    "<b>纪年</b>：始建年代不详，明嘉靖三十三年（1554）火后重修，清咸丰九年（1859）火灾仅存寝殿，同治三年至八年（1864–1869）重建，正殿《城隍出巡图》成于同治七年（1868）。2006年列为全国重点文物保护单位。",
    "<b>格局</b>：庙与平遥县衙分列南大街两侧，东西对称；三进院落，占地7302平方米，中轴依次为牌坊、山门、戏楼、献殿、正殿、寝殿，东西配六曹府、土地祠，后院东西为灶君庙与财神庙，“诸神共居一庙”。"
  ],
  "caption": [
    "平遥城隍庙 · 戏楼昭格楼南面",
    "清代建筑 · 后世维修"
  ]
},
{
  "id": "sx_rishengchang",
  "name": "日昇昌旧址",
  "short": "日昇昌旧址",
  "sub": "临街门面",
  "dyn": "ming",
  "tag": "明清",
  "era": "清代票号旧址 · 现存临街门面",
  "year": 1823,
  "yearLabel": "清代票号旧址 · 现存临街门面",
  "yearApprox": true,
  "yearNote": "1823年是票号开设的常用纪年；现存门面的单体建造年未确定，年表以该时期作约略定位。",
  "place": "山西平遥",
  "placeKey": "pingyao",
  "types": [
    "residence"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "平遥西大街路南这排临街门面，是中国第一家票号的总号。门面一色深色木板门，门楣上一溜彩绘小格，再上是灰瓦坡顶，低调得像任何一家铺子；门内坐南朝北并列两进院，建筑面积一千七百多平方米。日昇昌由西裕成颜料庄改组而来，通行纪年是清道光三年（1823），改组时间据碑刻只能定在1819至1838年之间，门面本身的建造年份未见记载。图版所绘为临街门面。",
  "facts": [
    "<b>门面</b>：总号在西大街路南，坐南朝北，并列两院，占地2324平方米，建筑面积1700余平方米；图版所见门面一层，木板门扇连排，上方一列彩绘小窗，檐下悬“日昇昌记”匾。",
    "<b>纪年</b>：日昇昌由达蒲李氏的西裕成颜料庄改组，财东李大全出资三十万两、雷履泰出资两万两；嘉庆二十四年（1819）碑尚列西裕成，道光十八年（1838）碑已无，改组当在其间，通称道光三年（1823）。2006年列为全国重点文物保护单位。",
    "<b>影响</b>：日昇昌首创异地汇兑，分号遍及汉口、天津、上海、广州等地，光绪十七年（1891）年汇兑额达三千万两；1914年因担保案被查封，1932年歇业。平遥城因此成为十九世纪全国金融中心，1997年列入世界遗产。"
  ],
  "caption": [
    "日昇昌旧址 · 临街门面",
    "清代票号旧址 · 现存临街门面"
  ],
  "legacyNames": [
    "日升昌",
    "日升昌票号"
  ]
},
{
  "id": "sx_pujiu",
  "name": "普救寺塔",
  "short": "普救寺塔",
  "sub": "莺莺塔现存全塔",
  "dyn": "ming",
  "tag": "明清",
  "era": "明嘉靖年间重建 · 十三层砖塔",
  "year": 1560,
  "yearLabel": "明嘉靖年间重建 · 十三层砖塔",
  "yearApprox": true,
  "yearNote": "现存塔于明嘉靖年间震后重建；具体重修年份资料有差异，年表采用1560年前后约值。",
  "place": "山西永济",
  "placeKey": "yongji",
  "types": [
    "pagoda"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "lede": "《西厢记》里张生“登了宝塔，将回廊绕遍”，塔就是这座。方形十三级密檐砖塔，高39.5米，底边8.3米，叠涩出檐、收分很小，形制近于西安大雁塔。明嘉靖三十四年（1555）蒲州大地震，寺塔俱毁；嘉靖四十三年（1564）知州张佳胤捐俸倡建，塔比唐塔增高六层成十三级，即今莺莺塔。寺中其余殿宇后毁于火，1986至1990年重建，塔是唯一的明代旧物。图版所绘为塔身全貌。",
  "facts": [
    "<b>形制</b>：方形平面，十三级密檐式砖塔，高39.5米，边长8.3米，南面辟门；一层无窗、北壁佛龛，二层至九层有砖阶沿塔身盘旋，每层开窗洞；塔周回廊方形，每边十一间，为1986年后重建。",
    "<b>纪年</b>：寺内明碑称普救寺“创自隋唐”，出土经幢刻唐咸通十三年（872）；明嘉靖三十四年（1555）地震塔毁，四十三年（1564）张佳胤重建，塔前存其诗碑。塔1965年列为省保，2019年列为全国重点文物保护单位。",
    "<b>回音</b>：塔前以石击地，塔中应以蛙鸣，被称为中国四大回音建筑之一；山西大学丁士章等测得其成因在各层塔檐长短不一且内凹、塔身表面光滑，声波在塔周往复反射而成共振。"
  ],
  "caption": [
    "普救寺塔 · 莺莺塔现存全塔",
    "明嘉靖年间重建 · 十三层砖塔"
  ],
  "tall": true,
  "legacyNames": [
    "莺莺塔",
    "普救寺莺莺塔"
  ]
}
);
PLACES.push(
{
  "key": "sx_lingshi",
  "name": "灵石",
  "prov": "山西",
  "lat": 36.85,
  "lon": 111.78
},
{
  "key": "sx_qixian",
  "name": "祁县",
  "prov": "山西",
  "lat": 37.36,
  "lon": 112.34
},
{
  "key": "sx_daixian",
  "name": "代县",
  "prov": "山西",
  "lat": 39.07,
  "lon": 112.96
},
{
  "key": "sx_tianzhen",
  "name": "天镇",
  "prov": "山西",
  "lat": 40.42,
  "lon": 114.09
}
);

// 河北国保增量 · 2026-10-02；主体范围与年代见逐图研究记录。
SITES.push(
{
  "id": "hb_bailinta",
  "name": "柏林寺塔",
  "short": "柏林寺塔",
  "sub": "七层八角砖塔",
  "dyn": "yuan",
  "tag": "元",
  "era": "元代 · 1330年建",
  "year": 1330,
  "yearApprox": false,
  "yearLabel": "1330",
  "yearNote": "1330对应现存元代柏林寺塔建造；不以寺院相传始建年代定位。",
  "place": "河北 · 赵县",
  "placeKey": "hb_赵县",
  "types": [
    "pagoda"
  ],
  "lede": "柏林寺塔以层层莲瓣托起高首层，上方七级密檐收束成挺拔轮廓。砖作把栏杆、平座和斗拱组织得像木构楼阁，塔刹却由铁铸成，石、砖、铁的接合十分鲜明。现塔建于元代，不宜以寺院相传的早期创建代替；近看莲座和檐下构件，比只从远处数塔层更能理解这座塔如何在厚重体量上营造精巧尺度。",
  "facts": [
    "塔为八角七级密檐砖塔，石台上设砖砌须弥座、仿木平座和多层仰莲，首层以上密檐间距较近；铁刹由覆钵、莲座、相轮与宝珠等构件叠成。",
    "省文物局记元天历三年九月建造，即一三三〇年，现存塔体按元代登记；寺院的更早创建传说与此塔不是同一纪年，后世修护也不改变两者的区分。",
    "仿木平座、斗拱与砖雕椽飞将木构语汇转入砖石表面，莲瓣又把宗教装饰置于承托位置；不同材质和不同构件之间的衔接，是观察元代砖塔营造的细部入口。"
  ],
  "caption": [
    "柏林寺塔 · 七层八角砖塔",
    "元代 · 1330年建"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": true
},
{
  "id": "hb_zdfuwenmiao",
  "name": "正定府文庙",
  "short": "正定府文庙",
  "sub": "戟门",
  "dyn": "yuan",
  "tag": "元",
  "era": "元代遗构",
  "year": 1300,
  "yearApprox": true,
  "yearLabel": "元（约）",
  "yearNote": "现存戟门为元代遗构，具体建造年未详，1300仅作年表约略定位；府文庙创建于北宋熙宁三年（1070），两者分开记载。",
  "place": "河北 · 正定",
  "placeKey": "zhengding",
  "types": [
    "gate"
  ],
  "lede": "正定府文庙戟门以五间低展屋面，把通向祭孔空间的入口收在朴素木构中。悬山屋顶伸过山墙，前后两间的进深又使它兼具门与殿的尺度。文庙沿革始于北宋，现存戟门却属元代，不能把创建年直接搬到眼前梁架上；在这座入口建筑中，柱网和屋檐比繁多装饰更能显出北方元代木构的组织方式。",
  "facts": [
    "戟门面阔五间、进深两间，单檐悬山布瓦顶，屋檐越过两侧山墙；内部以分心用柱承托六架椽屋，浅进深与宽正面共同构成祭孔院落的门殿尺度。",
    "府文庙创建于北宋熙宁三年，即一〇七〇年，元明清均有修葺扩建；现存戟门单独定为元代遗构，具体创建年未详，不能按文庙的宋代初创给木构纪年。",
    "相较以高屋顶显示核心地位的大成殿，戟门着重区分院落入口和通行方向；保留下来的元代柱网与梁架，说明礼制建筑中的门也能成为营造史的重要实物。"
  ],
  "caption": [
    "正定府文庙 · 戟门",
    "元代遗构"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_lingyan",
  "name": "蔚州灵岩寺",
  "short": "蔚州灵岩寺",
  "sub": "大雄宝殿",
  "dyn": "ming",
  "tag": "明",
  "era": "明正统六年重建",
  "year": 1441,
  "yearApprox": false,
  "yearLabel": "1441",
  "yearNote": "1441为明正统六年寺院重建纪年，所绘大殿为现存明代主体；不是以辽代初创记载作为现存殿体年代。",
  "place": "河北 · 蔚县",
  "placeKey": "yuxian",
  "types": [
    "hall"
  ],
  "lede": "灵岩寺大雄宝殿以舒缓屋面和深远出檐，展开五间明代殿堂的尺度。庑殿顶将四面屋坡统一，檐下成组斗拱又将木柱与屋顶连接成清楚的层次。寺院在明正统年间重建，现存殿内还保存天花彩绘与精致藻井；外部构架和内部装饰合看，能够理解明代地方寺院如何在继承早期做法时形成自己的面貌。",
  "facts": [
    "大雄宝殿面阔五间、进深四间，单檐庑殿顶，檐下施双昂斗拱，屋面坡度较缓、出檐深远；殿身和檐下承托的关系，是外观庄重而不显陡峭的原因。",
    "省文物局记寺院毁于元末，明正统六年敕赐重建，即一四四一年，现存大殿属明代主体；未知的更早创建年不作殿年，后世修缮与这一阶段分开记录。",
    "殿内藻井和明代天花彩绘保留精细装饰，寺内天王殿又见较早营造手法；不同建筑及室内外细部共同显示地方工匠如何延续传统，而不是突然改用全新样式。"
  ],
  "caption": [
    "蔚州灵岩寺 · 大雄宝殿",
    "明正统六年重建"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_zhenwu",
  "name": "蔚州真武庙",
  "short": "蔚州真武庙",
  "sub": "山门与石阶",
  "dyn": "ming",
  "tag": "明清",
  "era": "明清建筑 · 山门具体年代未详",
  "year": 1700,
  "yearApprox": true,
  "yearLabel": "明清（约）",
  "yearNote": "国保单位断代为明，寺院1720年曾修；所绘山门具体营建年未详，1700仅作明清建筑的约略定位，不把1720当作山门确切建造年。",
  "place": "河北 · 蔚县",
  "placeKey": "yuxian",
  "types": [
    "gate"
  ],
  "lede": "真武庙的山门与石阶把进入院落的过程抬到建筑之前，先登阶，再穿门，祭祀空间因此与街道拉开距离。它属于蔚州保存的明清寺庙环境，具体山门建年尚未确认。庙群的明代登记和清康熙修缮记载，说明这里的历史并非单一阶段；门前高差与门后院落，又让平常街巷和礼拜场所形成清楚分界。",
  "facts": [
    "入口由山门、门前石阶和连接院落的通道组成，门洞将内外空间收在一处；台阶的上升和门洞的收束共同改变行进节奏，使礼拜场所与外部街巷拉开距离。",
    "真武庙按明代遗存登记，清康熙五十九年有重修记录，即一七二〇年；山门单体的营建年仍未详，不能把庙群断代或全庙重修年直接认作门的确切创建年。",
    "庙内殿堂与附属房舍组成封闭院落，门和石阶控制由街道进入祭祀空间的路径；将入口与院落联系起来，能理解地方寺庙如何以有限空间建立仪式性的分界。"
  ],
  "caption": [
    "蔚州真武庙 · 山门与石阶",
    "明清建筑 · 山门具体年代未详"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_dzwenmiao",
  "name": "定州文庙",
  "short": "定州文庙",
  "sub": "大成殿",
  "dyn": "ming",
  "tag": "清",
  "era": "清代现存主体",
  "year": 1750,
  "yearApprox": true,
  "yearLabel": "清（约）",
  "yearNote": "现存主体按国保清代断代登记，1750只是清代约略定位；不把文庙唐代初创或宋代重建纪年当作照片中大殿确切建造年。",
  "place": "河北 · 定州",
  "placeKey": "dingzhou",
  "types": [
    "hall"
  ],
  "lede": "定州文庙大成殿以五间正面和前方月台组织祭孔的中心空间，左右配房又把主殿纳入院落秩序。文庙早期沿革可追到唐代，眼前主要建筑却以清代复建面貌保存，不能把祭祀传统的年岁直接当作木柱的年岁。这里既有礼仪殿堂，也有讲学空间；从大成殿的位置入手，能看出文庙如何把祭祀与教育分区联系。",
  "facts": [
    "大成殿面阔五间、进深三间，殿前月台连接院中行进路线，左右房舍围合中院；正面柱间、前坛与两侧建筑的关系，使祭孔的主要空间保持清楚的中心。",
    "文庙唐代改祀孔子，宋代扩建，明末火毁后清代复建，现存主体按清代登记；大殿单栋精确营建年未定，年表约值不以唐代初创或宋代重建替代。",
    "中路以大成殿为祭祀中心，西路设置明伦堂等教学空间，东路另有崇圣祠和魁星阁；这种分区将尊孔、讲学和功名信仰联系起来，大殿只是全组功能的一部分。"
  ],
  "caption": [
    "定州文庙 · 大成殿",
    "清代现存主体"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_xumifushou",
  "name": "须弥福寿之庙",
  "short": "须弥福寿之庙",
  "sub": "妙高庄严殿金顶与大红台上部",
  "dyn": "ming",
  "tag": "清",
  "era": "清乾隆四十五年",
  "year": 1780,
  "yearApprox": false,
  "yearLabel": "1780",
  "yearNote": "1780为须弥福寿之庙及主体建筑群营建年代；本图仅表现妙高庄严殿金顶和大红台上部，不展示下部台基或完整寺院。",
  "place": "河北 · 承德",
  "placeKey": "hb_chengde",
  "types": [
    "hall"
  ],
  "lede": "妙高庄严殿的金顶从大红台上部浮现，让藏式厚墙与汉式屋檐形成鲜明对照。鎏金铜瓦随屋坡展开，屋脊上的龙饰又把礼佛殿堂装点为远望可辨的中心。须弥福寿之庙为迎接六世班禅而建，参照其西藏居所；这里仅见金顶和台体上部，虽不足以说明全寺，却足以读出清代皇家礼仪与藏传佛教建筑的结合。",
  "facts": [
    "妙高庄严殿藏在大红台内，金色屋面露出台体上缘，攒尖顶以鎏金铜瓦和脊上龙饰形成辨识特征；厚重台墙与外露屋檐相接，显出包容殿宇的空间层次。",
    "须弥福寿之庙建于清乾隆四十五年，即一七八〇年，为前来祝寿的六世班禅参照日喀则扎什伦布寺营建；沿用清代主体年代，不借西藏参照建筑的早期纪年。",
    "大红台内部殿宇与上部金顶将围合空间和外部标识结合，前部又采用汉式轴线建筑；从局部屋面即可看到材质与形式的汇合，但完整寺群布局仍需分开理解。"
  ],
  "caption": [
    "须弥福寿之庙 · 妙高庄严殿金顶与大红台上部",
    "清乾隆四十五年"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_changping",
  "name": "蔚州常平仓",
  "short": "蔚州常平仓",
  "sub": "仓神庙与相连戏楼",
  "dyn": "ming",
  "tag": "明清",
  "era": "明代仓制 · 现存庙台具体年代未详",
  "year": 1650,
  "yearApprox": true,
  "yearLabel": "明清（约）",
  "yearNote": "常平仓按明代国保单位登记；仓神庙和戏楼具体营建年未详，1650仅作明清约略定位，不把粮仓管理制度年代当作两个单体的确切建造年。",
  "place": "河北 · 蔚县",
  "placeKey": "yuxian",
  "types": [
    "hall"
  ],
  "lede": "常平仓的仓神庙与相连戏楼，让粮仓里看似只有存粮的空间，多出祭祀与演剧的用途。庙在北侧仓廒之间，戏楼朝向院中，生产管理与信仰活动因而共享一个建筑环境。蔚州仓廒保留明代木构，庙台单体建年却未确认；从这个局部组合看整体，能理解古代仓储制度不只依靠粮廒，也伴随着守护仓粮的仪式。",
  "facts": [
    "仓神庙布置在北侧两座仓廒之间，前方连接戏楼，庙台彼此相对组织院中空间；这种组合区别于普通粮廒，以祭祀和演剧功能补充粮仓的实用建筑。",
    "常平仓作为明代粮仓遗存登记，部分仓廒大木架保留明代原构，创建确年未详；仓神庙和戏楼单栋年代也未定，不将仓储制度年代直接当成两栋建筑的年岁。",
    "庙与戏楼提醒人们，粮仓除了储备和管理，也容纳与仓粮安全有关的信仰活动；把祭祀空间放在仓廒之间，使日常使用、地方仪式与建筑组织保持紧密联系。"
  ],
  "caption": [
    "蔚州常平仓 · 仓神庙与相连戏楼",
    "明代仓制 · 现存庙台具体年代未详"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_daci",
  "name": "大慈阁",
  "short": "大慈阁",
  "sub": "阁体与石台阶",
  "dyn": "ming",
  "tag": "清",
  "era": "清乾隆间重建",
  "year": 1760,
  "yearApprox": true,
  "yearLabel": "清（约）",
  "yearNote": "现存阁体为清乾隆间重建，1760仅作1736—1795年范围的约略定位；寺阁初创的1227—1232年不作为照片中阁体年代。",
  "place": "河北 · 保定",
  "placeKey": "hb_baoding",
  "types": [
    "pavilion"
  ],
  "lede": "大慈阁从高石台上展开三道檐口，台阶使进入阁内的过程具有鲜明的上升感。五间下层承托歇山屋顶，上下空间分别容纳造像与藏经，楼阁因而不是只有外观的城市标志。它的初创早于眼前阁体，现存主体为清乾隆年间重建；石台、木阁与礼佛空间的结合，记录的是持续修护后的面貌，而非一座原封未动的早期建筑。",
  "facts": [
    "阁为三重檐歇山顶，下层面阔五间、进深三间，立于高石台上，栏杆围合台边；楼阁体量由台基抬起，台阶和层层檐口共同组织由院中进入高阁的路径。",
    "阁有十三世纪初创沿革，现存阁体则在清乾隆年间重建，具体单年未确定；年表按清代约略定位，不以初创时期替代现存木构，也不把约值当作竣工证据。",
    "首层供观音、上层有佛像及藏经用途，屋内礼佛活动与楼阁层次相对应；高台和重檐一方面强化城市地标，另一方面使不同宗教空间在同一栋建筑内叠置。"
  ],
  "caption": [
    "大慈阁 · 阁体与石台阶",
    "清乾隆间重建"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": true
},
{
  "id": "hb_puren",
  "name": "溥仁寺",
  "short": "溥仁寺",
  "sub": "主殿山花与侧面檐下局部",
  "dyn": "ming",
  "tag": "清",
  "era": "清康熙五十二年创建",
  "year": 1713,
  "yearApprox": false,
  "yearLabel": "1713",
  "yearNote": "溥仁寺创建于1713年，所绘为现存清代主殿屋顶山花及檐下局部；该纪年对应寺院营建，图版不表现完整殿体。",
  "place": "河北 · 承德",
  "placeKey": "hb_chengde",
  "types": [
    "hall"
  ],
  "lede": "溥仁寺主殿的山花与侧面檐下，把一座大殿的宏大尺度收成可以近看的木作细节。歇山屋顶上部的三角山花、檐下承托与黄色琉璃瓦相接，使屋顶不再只是远处的一条轮廓。寺院创建于康熙年间，主殿处在汉式院落轴线中；从这处局部仍可看到早期承德皇家佛寺如何以传统木构承载礼佛与营造工艺。",
  "facts": [
    "主殿慈王普荫殿面阔七间、进深五间，单檐歇山黄琉璃顶；侧面山花位于上部山面，檐下木构承托外挑屋檐，三角山花与斜坡屋面共同组织殿侧的形状。",
    "溥仁寺创建于清康熙五十二年，即一七一三年，现存主殿为清代遗构并经后世维修；此年说明寺院营建阶段，不能由局部木件反推所有可见材质都属初建。",
    "寺院沿中轴设置山门、天王殿和主后殿，采用汉式佛寺院落组织；山花与檐下局部可用来观察琉璃瓦、木构和殿宇空间的连接，理解皇家寺院的具体营造。"
  ],
  "caption": [
    "溥仁寺 · 主殿山花与侧面檐下局部",
    "清康熙五十二年创建"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": false
},
{
  "id": "hb_xingwen",
  "name": "涞源兴文塔",
  "short": "涞源兴文塔",
  "sub": "五层八角砖塔塔身与塔刹",
  "dyn": "liao",
  "tag": "辽",
  "era": "辽代形制 · 后世修缮",
  "year": 1050,
  "yearApprox": true,
  "yearLabel": "辽（约）",
  "yearNote": "现存塔按形制归辽代，1050仅为约略定位；资料记唐天宝三年（744）初建、明1539年重修及现代修缮，不将初创纪年当作现存塔形确切年代。",
  "place": "河北 · 涞源",
  "placeKey": "laiyuan",
  "types": [
    "pagoda"
  ],
  "lede": "兴文塔的五层砖檐，比高耸密檐塔更清楚地分出楼阁节奏。八角塔身和檐下斗拱模仿木作，实心内部却不能像楼阁那样逐层登临。它与邻近泰山宫同立在高台上，佛塔和道教建筑共享场地；文献中的唐代初创、明代重修，与现存辽代形制各有含义，不能把最早出现的年代直接当作眼前塔体的确年。",
  "facts": [
    "塔为八角五级楼阁式实心砖塔，由须弥座、塔身和塔刹组成，各层外檐模仿木构斗拱；层次分明的外观与内部实心并存，五级并不是五层可使用的楼面。",
    "嵌碑记有唐代初建和明嘉靖十八年重修，即七四四与一五三九年，省文物局又按形制归辽代；不同证据分别记录，现塔确年未定，不以早期初创替代现存断代。",
    "兴文塔与明清泰山宫同建在高台，历史上又有佛道共同修造的记录；一座佛塔置于这样的环境，可以看到地方宗教空间的共存，而不只是一处孤立建筑。"
  ],
  "caption": [
    "涞源兴文塔 · 五层八角砖塔塔身与塔刹",
    "辽代形制 · 后世修缮"
  ],
  "country": "CN",
  "initialStatus": "unvisited",
  "tall": true
}
);

// 河南国保 · 2026-10-02，图版均待用户验收。
PLACES.push(...[
  {
    "key": "hn_tangyin",
    "name": "汤阴",
    "prov": "河南",
    "lat": 35.92,
    "lon": 114.35
  },
  {
    "key": "hn_zhengzhou",
    "name": "郑州",
    "prov": "河南",
    "lat": 34.75,
    "lon": 113.68
  },
  {
    "key": "hn_jiaxian",
    "name": "郏县",
    "prov": "河南",
    "lat": 33.97,
    "lon": 113.21
  }
]);
SITES.push(...[
  {
    "id": "hn_yanqing",
    "name": "延庆观",
    "short": "延庆观",
    "sub": "玉皇阁现存主体",
    "dyn": "yuan",
    "tag": "元",
    "era": "元代现存玉皇阁；年表为约略定位",
    "year": 1280,
    "yearApprox": true,
    "yearNote": "元代现存玉皇阁；年表为约略定位",
    "yearLabel": "元约略",
    "placeKey": "hn_开封",
    "place": "河南 · 开封",
    "types": [
      "pavilion"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "延庆观玉皇阁从方形砖体向上收成八角阁顶，琉璃构件与层叠檐口模仿木构楼阁的外观，内部承重却依靠砖砌。它是观内保存的元代主体，也见证了开封古建保护面对地下水与地基病害的难题。整体顶升工程让建筑升高而保留元代地层，使今日所见的高阁同时包含古代营造和现代保护两条历史线索。",
    "facts": [
      "玉皇阁全用青砖砌成，不靠木梁承重，外观分三层，下部方形、上部八角；琉璃装饰与砖砌檐部形成仿木楼阁的层次，材料与外形之间别具关系。",
      "现存玉皇阁按元代建筑定位，约一二八〇年是排序参考点而非确切完工年；延庆观曾改名并历经修葺，观名沿革与阁体建造年代需要分别理解。",
      "因裂缝与地基病害实施的整体顶升，将阁体抬高三点一米，并保留元代地层；这项保护展示了在改善环境时，如何兼顾古建筑本体与地下历史信息。"
    ],
    "caption": [
      "延庆观 · 玉皇阁现存主体",
      "元 · 现存主体"
    ]
  },
  {
    "id": "hn_yuefei",
    "name": "汤阴岳飞庙",
    "short": "汤阴岳飞庙",
    "sub": "二殿正面",
    "dyn": "ming",
    "tag": "明清",
    "era": "明清建筑与后世修缮；二殿确切营建年未详",
    "year": 1650,
    "yearApprox": true,
    "yearNote": "明清建筑与后世修缮；二殿确切营建年未详",
    "yearLabel": "明清约略",
    "placeKey": "hn_tangyin",
    "place": "河南 · 汤阴",
    "types": [
      "hall"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "汤阴岳飞庙二殿的五间正面，以红色门窗和青灰屋面围出庄重的纪念空间。庙宇在岳飞故乡延续追怀活动，现存殿堂属于明清营建和后世修缮，并非南宋人物生活时的住宅。沿院落前行，可以把殿宇、碑刻与历代题咏联系起来，理解英雄形象如何由不同年代的人持续表达，也看到纪念建筑自身独立的历史。",
    "facts": [
      "二殿正面展开五间，门窗排在柱间，单层屋檐覆盖青灰屋面，红色木构与灰色砖瓦形成对比；它处在多进院落的祭祀序列中，与前后殿宇衔接。",
      "县政府将现存庙群介绍为明清古建筑群，并记明景泰元年曾改建；二殿的确切营建年尚未确认，约一六五〇年是近似定位，不能代替单体纪年。",
      "岳飞庙是故乡纪念英雄的公共场所，殿堂、碑刻与题咏积累了后世的追怀表达；建筑年代与岳飞生平相距数百年，二者共同构成纪念地的历史。"
    ],
    "caption": [
      "汤阴岳飞庙 · 二殿正面",
      "明清 · 现存主体"
    ]
  },
  {
    "id": "hn_songyang",
    "name": "嵩阳书院",
    "short": "嵩阳书院",
    "sub": "清代大门正面",
    "dyn": "ming",
    "tag": "清",
    "era": "现存大门属清代并经修缮；康熙时期约略定位",
    "year": 1680,
    "yearApprox": true,
    "yearNote": "现存大门属清代并经修缮；康熙时期约略定位",
    "yearLabel": "清约略",
    "placeKey": "dengfeng",
    "place": "河南 · 登封",
    "types": [
      "gate",
      "school"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "嵩阳书院的大门用低缓卷棚屋面覆盖三间入口，石柱与灰砖显得平实。穿过这道门，先圣殿、讲堂、道统祠和藏书楼沿中轴依次展开，把尊师、讲学与藏书安排在连续院落中。书院因宋代讲学而闻名，眼前门与布局却主要延续清代营修；朴素入口让人先从日常尺度走近，随后再理解这处教育遗存的历史层次。",
    "facts": [
      "大门正面三间，卷棚屋面不设突出的正脊，石柱和灰砖墙围出入口；其后中轴依次通向先圣殿、讲堂、道统祠与藏书楼，组成多进的书院院落。",
      "此地早有寺观，北宋景祐二年赐名嵩阳书院，现存布局和建筑主要属清代；大门约一六八〇年仅为近似定位，不能以北魏创寺年或宋代赐名年取代。",
      "书院院落把祭祀先贤、讲授学问与收藏典籍联系起来，保存传统教育制度的空间线索；从朴素大门向内，建筑的功能次序比豪华装饰更能说明书院特色。"
    ],
    "caption": [
      "嵩阳书院 · 清代大门正面",
      "清 · 现存主体"
    ]
  },
  {
    "id": "hn_xiangguo",
    "name": "大相国寺",
    "short": "大相国寺",
    "sub": "大雄宝殿正面",
    "dyn": "ming",
    "tag": "清",
    "era": "清乾隆重建阶段，不是北齐建寺年",
    "year": 1766,
    "yearApprox": false,
    "yearNote": "清乾隆重建阶段，不是北齐建寺年",
    "yearLabel": "1766",
    "placeKey": "hn_开封",
    "place": "河南 · 开封",
    "types": [
      "hall"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "崇祯十五年（1642）黄河决口，开封城连同相国寺一起埋进泥沙；今天的殿宇是顺治十八年（1661）重建、乾隆三十一年（1766）重修后定下的格局。图版所绘的大雄宝殿居第二进院正中，面阔七间，重檐歇山，坐在须弥座月台上，一圈石栏望柱雕满小狮——北宋六十四院的旧观早已不存，清代官修大寺的尺度还在。",
    "facts": [
      "<b>形制</b>：大雄宝殿面阔七间、进深五间，重檐歇山顶覆黄绿琉璃瓦，通高约13米；殿前须弥座月台，殿与月台周围白石栏杆，望柱头雕小狮五十余只，形态各异。",
      "<b>沿革</b>：唐延和元年（712）睿宗赐名相国寺；1642年黄河水毁后，顺治十八年（1661）重建山门、天王殿、大雄宝殿，乾隆三十一年（1766）再修，现存殿宇定型于此，乾隆题“敕建相国寺”额。",
      "<b>际遇</b>：1927年冯玉祥部捣毁寺内除千手观音外的全部佛像，寺改作中山市场，大殿此后长期空置作陈列之用。北宋时寺辖六十四院、占地五百四十亩，今日所见只是当年核心的一角。"
    ],
    "caption": [
      "大相国寺 · 大雄宝殿正面",
      "清 · 现存主体"
    ]
  },
  {
    "id": "hn_zzchenghuang",
    "name": "郑州城隍庙",
    "short": "郑州城隍庙",
    "sub": "山门正面",
    "dyn": "ming",
    "tag": "明清",
    "era": "现存明清古建筑；单体确切营建年未详",
    "year": 1650,
    "yearApprox": true,
    "yearNote": "现存明清古建筑；单体确切营建年未详",
    "yearLabel": "明清约略",
    "placeKey": "hn_zhengzhou",
    "place": "河南 · 郑州",
    "types": [
      "hall"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "郑州老城里保存最完整的一组明清建筑不是衙署，是这座城隍庙。民国《郑县志》记下从弘治十四年（1501）到光绪十六年（1890）七任知州主持的重修，山门、过庭、戏楼、大殿、寝宫至今排在一条中轴上。图版所绘的三间殿面——绿琉璃瓦悬山顶、明间四根小八角石柱、三合实榻红门——按志书描述对应的是庙前的山门；正殿在戏楼之北，单檐歇山。",
    "facts": [
      "<b>形制</b>：图版所绘殿面面阔三间、进深两间，绿琉璃瓦悬山顶，檐下三昂七踩斗拱，昂嘴作三幅云、耍头作象鼻；明间前后立四根小八角形石柱，三合实榻大门装在通柱上，门前砌六级扇面形踏跺，左右各一石狮。",
      "<b>沿革</b>：庙原名城隍灵佑侯庙，祀汉将纪信，明初创建；据民国《郑县志》，弘治十四年（1501）知州石纯粹、嘉靖六年刘汝、隆庆四年李时选及康熙、乾隆、光绪间知州屡加重修，庙内尚存明初同知张大猷草书《福赞》碑。",
      "<b>比较</b>：中轴上戏楼为歇山双层楼阁，十九条屋脊纵横错落；大殿面阔进深各三间，单檐歇山，明间施溜金斗拱；寝宫五间悬山，前接卷棚拜厦。门、楼、殿、寝四种屋顶齐备，是河南现存规模较大、保存较完整的城隍庙之一。"
    ],
    "caption": [
      "郑州城隍庙 · 山门正面",
      "明清 · 现存主体"
    ]
  },
  {
    "id": "hn_jiawenmiao",
    "name": "郏县文庙",
    "short": "郏县文庙",
    "sub": "大成殿正面",
    "dyn": "ming",
    "tag": "明清",
    "era": "现存大成殿与明清修缮；不采用五代创庙年",
    "year": 1650,
    "yearApprox": true,
    "yearNote": "现存大成殿与明清修缮；不采用五代创庙年",
    "yearLabel": "明清约略",
    "placeKey": "hn_jiaxian",
    "place": "河南 · 郏县",
    "types": [
      "hall",
      "school"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "大成殿前檐四根柱子通体透雕盘龙、柱头刻虎首，而且龙柱是木头的——清代木雕龙柱，河南只有这一例。殿面阔五间、单檐歇山、绿琉璃瓦，月台前一方龙陛石雕的是二龙戏“蜘蛛”而非火珠。文庙由后周显德元年（954）的孔氏家庙起家，金泰和六年（1206）改为官方文庙，图版所绘的大成殿是明清屡次重修后留下的清代木构。",
    "facts": [
      "<b>形制</b>：大成殿面阔五间、进深三间，单檐歇山顶覆绿琉璃瓦，高15.5米、面阔19.7米；前檐四根木檐柱通体透雕盘龙，柱头雕獠牙虎面俯视腾龙，柱础满雕吉祥故事，额枋、斗拱、雀替亦透雕人物车马、花鸟云气。",
      "<b>沿革</b>：后周显德元年（954）孔子后裔建孔氏家庙，金泰和六年（1206）知县张志行在原址扩建为官方文庙；明英宗时（1459）修复大成殿并雕龙陛石，历代修建十一次，现存大成殿、戟门、两庑均为清代木构。",
      "<b>比较</b>：木雕龙柱时代晚于晋祠圣母殿的宋代龙柱，却是河南仅存的一例；外檐斗拱、檩枋尚留原构彩画，既非北京“殿式”也非苏杭“苏式”，是中原地方做法。全庙现存建筑22栋71间，左学右庙，兼为孔氏家庙与县学。"
    ],
    "caption": [
      "郏县文庙 · 大成殿正面",
      "明清 · 现存主体"
    ]
  },
  {
    "id": "hn_jiahuiguan",
    "name": "郏县山陕会馆",
    "short": "郏县山陕会馆",
    "sub": "门楼与钟鼓楼组合",
    "dyn": "ming",
    "tag": "清",
    "era": "清代建筑，现存组合单体确年未详",
    "year": 1700,
    "yearApprox": true,
    "yearNote": "清代建筑，现存组合单体确年未详",
    "yearLabel": "清约略",
    "placeKey": "hn_jiaxian",
    "place": "河南 · 郏县",
    "types": [
      "gate",
      "stage",
      "pavilion"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "从街上看，三间门楼夹在钟、鼓二楼之间；门楼的二层就是戏楼，戏台朝北对着院子，看戏的人站满中庭。郏县山陕会馆创建于康熙三十二年（1693），是山西、陕西商人在宛洛、许洛两条古道交汇处设的驿站与商会。图版所绘为门楼与两侧钟鼓楼：二楼各立十二根圆木柱托起十字架梁、双层飞檐，坐在四米高的楼基上，高过门楼的屋脊。",
    "facts": [
      "<b>形制</b>：门楼三间，中门通行，两次间为门卫与接待之所；二楼三间敞通，面北为戏楼，砖雕楼脊正中以麒麟驮宝瓶作脊刹。两侧钟楼、鼓楼楼基高4米，各以12根圆木立柱承托十字架梁，双层飞檐，斗拱端庄。",
      "<b>沿革</b>：会馆创建于清康熙三十二年（1693），由山西、陕西客商捐资兴建，又称山陕庙、关帝庙；坐北面南，占地6300平方米，门临河道，门前镇河照壁宽8米、高7米、厚1米，红石基座上砖雕团龙。",
      "<b>比较</b>：院内东西廊房各11间，中庭可容千人观戏，北为面阔五间的关公殿，再北为后殿春秋楼。郏县处宛洛、许洛古道交汇，茶路由南阳北上在此分支入晋，会馆被视为清代“万里茶道”河南段的实物遗存。"
    ],
    "caption": [
      "郏县山陕会馆 · 门楼与钟鼓楼组合",
      "清 · 现存主体"
    ]
  },
  {
    "id": "hn_linfeng",
    "name": "临沣寨",
    "short": "临沣寨",
    "sub": "西门及相连红石寨墙",
    "dyn": "ming",
    "tag": "清",
    "era": "同治元年红石寨墙重建",
    "year": 1862,
    "yearApprox": false,
    "yearNote": "同治元年红石寨墙重建",
    "yearLabel": "1862",
    "placeKey": "hn_jiaxian",
    "place": "河南 · 郏县",
    "types": [
      "gate",
      "wall"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "寨门上方的红石门额刻着“临沣”二字，门扇铁皮上錾着“同治元年”“岁在壬戌”——这道墙把自己的生日写在了脸上。临沣寨原是明末的土寨，同治元年（1862）由本村人朱紫峰倡建，改以紫红色条石砌筑：椭圆形一圈1100米，高6.6米，五座哨楼、八百个垛口，三座寨门按八卦方位开在西北、西南、东南。图版所绘为西侧的临沣门及相连寨墙。",
    "facts": [
      "<b>形制</b>：寨墙外石内土，以紫红色条石砌筑，平面椭圆，周长1100米、高6.6米，上设哨楼五座、垛口800个；寨门为拱券洞，各装两扇包10厘米厚铁皮的榆木大门，门外另设防洪闸与排水暗道，寨外护寨河宽13米环绕一周。",
      "<b>沿革</b>：朱姓相传明万历间自山西洪洞迁来，先筑土寨；清同治元年（1862）由议叙监知县事朱紫峰倡建红石寨，西北门铁皮上錾刻“同治元年”“岁在壬戌”至今可识；寨内尚存明代民居一院、清代建筑百余栋四百余间。",
      "<b>比较</b>：新中国成立后各地拆除寨墙，临沣寨因地势低洼、防汛需要得以保全，被罗哲文称为“中原第一红石古寨”；2005年列为中国历史文化名村，2012年入选首批中国传统村落，2014年起国家文物局拨专款整体维修。"
    ],
    "caption": [
      "临沣寨 · 西门及相连红石寨墙",
      "清 · 现存主体"
    ]
  },
  {
    "id": "hn_gaoge",
    "name": "高阁寺",
    "short": "高阁寺",
    "sub": "阁楼及高台上部",
    "dyn": "ming",
    "tag": "明",
    "era": "明代建筑及后世修缮；年表为约略定位",
    "year": 1500,
    "yearApprox": true,
    "yearNote": "明代建筑及后世修缮；年表为约略定位",
    "yearLabel": "明约略",
    "placeKey": "anyang",
    "place": "河南 · 安阳",
    "types": [
      "pavilion"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "一座明代亲王府里剩下的唯一一座殿阁。永乐二年（1404）成祖封第三子朱高燧为赵王，洪熙元年（1425）就藩彰德，把府署改作赵王府；王府在1644年随明亡而废，到民国只剩这座大士阁，因为建在约8米高的砖台上，俗称高阁寺。现存阁为成化六年（1470）重建，重檐歇山、琉璃瓦顶，图版所绘是高台石栏以上的阁身与两重屋檐。",
    "facts": [
      "<b>形制</b>：高台楼阁式，通高20余米；砖砌方台高约8米、边长13米，南面32级石阶，阶侧与台上均围汉白玉栏并雕石狮。阁面阔、进深各三间，各约9米，重檐九脊歇山顶覆琉璃瓦，内以四根圆木通柱直达顶梁。",
      "<b>沿革</b>：永乐二年（1404）封朱高燧为赵王，洪熙元年（1425）就藩彰德，以府署改建赵王府，大士阁为府内一殿；现存建筑为成化六年（1470）重建。赵藩传十一代，至崇祯十七年（1644）王府废，民国时府内建筑倾圮仅存此阁。",
      "<b>比较</b>：明代亲王府多在明亡后拆毁，今存者如桂林靖江王府城门、开封周王府龙亭、新乡潞王府望京楼都只是片段，高阁寺是赵王府留下的唯一建筑；阁壁外侧石雕游龙二十五尾，间刻梵文，是王府殿阁罕见的装饰。"
    ],
    "caption": [
      "高阁寺 · 阁楼及高台上部",
      "明 · 现存主体"
    ]
  },
  {
    "id": "hn_wenzhige",
    "name": "浚县文治阁",
    "short": "浚县文治阁",
    "sub": "十字街钟鼓楼现存主体",
    "dyn": "ming",
    "tag": "清",
    "era": "现存楼阁据研究为康熙时期复建，年表约略定位；国保名单所列明代为城墙及文治阁整体时代",
    "year": 1680,
    "yearApprox": true,
    "yearNote": "现存楼阁据研究为康熙时期复建，年表约略定位；国保名单所列明代为城墙及文治阁整体时代",
    "yearLabel": "清约略",
    "placeKey": "hn_xunxian",
    "place": "河南 · 浚县",
    "types": [
      "pavilion",
      "gate"
    ],
    "country": "CN",
    "initialStatus": "unvisited",
    "lede": "浚县老城的东西、南北两条大街在这里交叉，楼座下四面开券洞，车马行人从阁底穿过——它既是街心的钟鼓楼，也是一座过街门楼。阁原名中心阁，始建年代失考，万历四十三年（1615）后移钟于阁上，自此俗称钟鼓楼；顺治六年（1649）毁于火，康熙四十八年（1709）知县梁通洛重修，改名“文治阁”。图版所绘为砖台与台上两层重檐攒尖阁的现存主体。",
    "facts": [
      "<b>形制</b>：通高约20米，分台、楼两部分：方形砖台每边约12米，四面中部各开拱形券洞，东西南北相对通行；台上建两层方阁，高约10米，重檐四角攒尖顶，挑角花脊，琉璃瓦剪边，下层四面开门，平台绕以回廊和一米高的方孔女墙。",
      "<b>沿革</b>：嘉庆《浚县志》载“万历乙卯后，始移钟于中心阁”；顺治六年（1649）火毁，康熙四十八年（1709）知县梁通洛重修，取“以文为治”改名文治阁，有张皙《重修文治阁记》；今楼阁即此次复建后的主体，后世续有修缮。",
      "<b>比较</b>：四面券门上嵌清人青石横额，东“丹流东壁”、西“碧泻西山”为赵素庐书，南“清环黎水”、北“黛护伾岚”为张哲书；阁与卫河畔洪武三年（1370）始建的城墙残段同列一处文物，也是大运河浚县段的遗产点之一。"
    ],
    "caption": [
      "浚县文治阁 · 十字街钟鼓楼现存主体",
      "清 · 现存主体"
    ]
  }
]);

// 东南亚首批；主体、来源及待审状态见 assets/research/southeast-asia-20261002-batch.json。
PLACES.push(...[
  {
    "key": "kh_angkor_wat_place",
    "name": "吴哥",
    "prov": "暹粒省",
    "country": "KH",
    "lat": 13.41,
    "lon": 103.87,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://apsaraauthority.gov.kh/2021/06/14/angkor-wat/"
  },
  {
    "key": "kh_bayon_place",
    "name": "吴哥通",
    "prov": "暹粒省",
    "country": "KH",
    "lat": 13.44,
    "lon": 103.86,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://www.unesco.org/en/articles/unesco-celebrates-30-years-safeguarding-bayon-temple-angkor-thom-project"
  },
  {
    "key": "kh_banteay_srei_place",
    "name": "女王宫",
    "prov": "暹粒省",
    "country": "KH",
    "lat": 13.6,
    "lon": 103.96,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://apsaraauthority.gov.kh/2021/08/04/banteay-srei/"
  },
  {
    "key": "id_borobudur_place",
    "name": "马格朗",
    "prov": "中爪哇省",
    "country": "ID",
    "lat": -7.61,
    "lon": 110.2,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://whc.unesco.org/en/list/592/"
  },
  {
    "key": "id_prambanan_shiva_place",
    "name": "普兰巴南",
    "prov": "日惹特区",
    "country": "ID",
    "lat": -7.75,
    "lon": 110.49,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://whc.unesco.org/en/list/642/"
  },
  {
    "key": "th_sukhothai_mahathat_place",
    "name": "素可泰",
    "prov": "素可泰府",
    "country": "TH",
    "lat": 17.02,
    "lon": 99.7,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://www.thailandtravel.or.jp/wat-mahathat-sukhothai/"
  },
  {
    "key": "th_chaiwatthanaram_place",
    "name": "大城",
    "prov": "大城府",
    "country": "TH",
    "lat": 14.34,
    "lon": 100.54,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://seaarts.sac.or.th/artwork/34?lang=en"
  },
  {
    "key": "mm_ananda_place",
    "name": "蒲甘",
    "prov": "曼德勒省",
    "country": "MM",
    "lat": 21.17,
    "lon": 94.87,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://www.pib.gov.in/newsite/PrintRelease.aspx?lang=2&reg=48&relid=170572"
  },
  {
    "key": "la_xieng_thong_sim_place",
    "name": "琅勃拉邦",
    "prov": "琅勃拉邦省",
    "country": "LA",
    "lat": 19.9,
    "lon": 102.14,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://tourismluangprabang.org/things-to-do/buddhism/wat-xiengthong/"
  },
  {
    "key": "vn_po_klong_garai_place",
    "name": "潘朗—塔占",
    "prov": "庆和省",
    "country": "VN",
    "lat": 11.6,
    "lon": 108.94,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://khanhhoa.gov.vn/vi/di-tich-lich-su/nhon-nhip-khach-tham-quan-di-tich-quoc-gia-dac-biet-thap-po-klong-garai-dip-le-2-9"
  },
  {
    "key": "vn_hue_ngo_mon_place",
    "name": "顺化",
    "prov": "顺化市",
    "country": "VN",
    "lat": 16.47,
    "lon": 107.58,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://huetourism.gov.vn/ngo-mon-bieu-tuong-vinh-hang-cua-co-do-hue/?pid=MjM3NTN8Y3NkbGRs0"
  },
  {
    "key": "ph_manila_san_agustin_place",
    "name": "马尼拉",
    "prov": "马尼拉大都会",
    "country": "PH",
    "lat": 14.59,
    "lon": 120.98,
    "coordinate_note": "古迹附近的约略地区显示点，精度约0.01度；不作为单体测绘坐标。",
    "source_page": "https://www.nationalmuseum.gov.ph/2023/05/11/san-agustin-church/"
  }
]);
CHAPTERS.push(...[
  {
    "key": "kh_angkor",
    "years": "10—13世纪 · 柬埔寨",
    "blurb": "砂岩寺山与面像塔群在吴哥展开，女王宫则以小尺度雕饰呈现另一种细密轮廓。各图限定所绘中央主体，年代依据分别说明。"
  },
  {
    "key": "id_java_classical",
    "years": "8—10世纪 · 印度尼西亚",
    "blurb": "婆罗浮屠以宽阔台层组织礼拜路径，普兰巴南以高耸主庙聚合塔饰。这里记录爪哇古典寺庙的两种尺度，也说明近现代保护与复原修复。"
  },
  {
    "key": "th_sukhothai",
    "years": "素可泰时期 · 泰国",
    "blurb": "莲苞形主塔从层叠砖石台基上升起。玛哈泰寺按现存主塔入册，单体确切营建年未详，年表位置保留约略说明。"
  },
  {
    "key": "th_ayutthaya",
    "years": "阿瑜陀耶时期 · 泰国",
    "blurb": "红砖主塔与四角小塔围合成寺山式组合。柴瓦塔那兰寺以现存中央塔群入册，寺院建置纪年与前期构筑、后世修缮分开说明。"
  },
  {
    "key": "mm_bagan",
    "years": "11—13世纪 · 缅甸",
    "blurb": "蒲甘寺身与塔冠彼此叠起，突出入口把有内室的佛寺显露在外。阿难陀寺按12世纪初约略定位，保护修缮另记。"
  },
  {
    "key": "la_lan_xang",
    "years": "澜沧时期 · 老挝",
    "blurb": "香通寺主佛殿以低垂层叠屋面、木构金饰和细小檐端展开琅勃拉邦传统。创建年代与后世装饰修缮分别入册。"
  },
  {
    "key": "vn_champa",
    "years": "13—14世纪 · 越南",
    "blurb": "砖塔层层收分，门框石雕嵌在红砖之中。波克朗加莱只绘主祠塔，明确区别门塔与火塔，所祭国王生卒年不作为营建纪年。"
  },
  {
    "key": "vn_nguyen",
    "years": "1802—1945 · 越南阮朝",
    "blurb": "午门以U形砖石城台承托五凤楼，黄绿琉璃瓦铺出屋顶层次。1833年营建纪年与现存修缮外观分别说明。"
  },
  {
    "key": "ph_spanish",
    "years": "1565—1898 · 菲律宾西班牙殖民时期",
    "blurb": "马尼拉旧城中，石造教堂以柱式、山墙和钟塔展开正立面。圣奥古斯丁教堂按1607年现存石教堂建成纪年入册，不复原遗失钟塔。"
  }
]);
SITES.push(...[
  {
    "id": "kh_angkor_wat",
    "name": "吴哥窟",
    "short": "吴哥窟",
    "sub": "中央五塔及紧邻台基回廊",
    "dyn": "kh_angkor",
    "tag": "吴哥时期",
    "era": "12世纪上半叶",
    "year": 1125,
    "yearApprox": true,
    "yearLabel": "12世纪上半叶",
    "yearNote": "苏利耶跋摩二世时期；1125仅为12世纪上半叶的年表约略定位，后世保护修复另记。",
    "placeKey": "kh_angkor_wat_place",
    "place": "暹粒省 · 吴哥",
    "country": "KH",
    "initialStatus": "unvisited",
    "types": [
      "temple"
    ],
    "legacyNames": [
      "Angkor Wat",
      "吴哥寺"
    ],
    "lede": "中央高塔与四角塔从层叠台基上升起，吴哥窟的五塔把石构建筑化作象征神山的秩序。中央塔区及紧邻回廊组成内层的礼拜空间，并不代表外墙与护城河围合的全部寺域。它在十二世纪上半叶苏利耶跋摩二世时期营建，原为毗湿奴神庙，后来延续佛教礼拜；同一建筑的使用也跨过宗教转换。",
    "facts": [
      "中央塔与四角四塔组成五塔格局，台基与回廊层层上升，外侧空间通向最高塔区；侧向观察时塔身互相遮挡，眼前所见数量不等于平面上的全部五座。",
      "吴哥管理机构把营建定在十二世纪上半叶、苏利耶跋摩二世时期，原奉毗湿奴；确切竣工年尚无定论，之后的佛教使用与保护修复各属不同历史阶段。",
      "寺山式层台与五塔表现神圣中心，长期佛教礼拜又让旧神庙继续成为活的宗教场所；理解这种持续使用，比把吴哥窟看成一次废弃后才被发现的遗迹更准确。"
    ],
    "caption": [
      "吴哥窟 · 中央五塔及紧邻台基回廊",
      "12世纪上半叶"
    ],
    "tall": false
  },
  {
    "id": "kh_bayon",
    "name": "巴戎寺",
    "short": "巴戎寺",
    "sub": "中央面像塔群与直接支承台基",
    "dyn": "kh_angkor",
    "tag": "吴哥时期",
    "era": "12世纪末—13世纪初",
    "year": 1200,
    "yearApprox": true,
    "yearLabel": "12世纪末—13世纪初",
    "yearNote": "吴哥时期；1200为12—13世纪之交的约略定位，现存塔群经历修缮，不按单一年份视为完整原构。",
    "placeKey": "kh_bayon_place",
    "place": "暹粒省 · 吴哥通",
    "country": "KH",
    "initialStatus": "unvisited",
    "types": [
      "temple"
    ],
    "legacyNames": [
      "Bayon",
      "巴扬寺"
    ],
    "lede": "巨大的石面像从高低错落的塔身转向四方，巴戎寺中央塔群让同一张面容在步行间不断显现与隐去。它在十二世纪末至十三世纪初逐步形成，与阇耶跋摩七世的佛教王权相连。现存面像塔和支承台基经过长期保护，密集的体量与不断变化的视角，是区别于吴哥窟整齐五塔的观看经验。",
    "facts": [
      "中央面像塔群由高低不同的石塔与直接支承台基组成，塔面的大型面像朝向不同方向；塔身彼此紧邻、遮挡，宜看空间关系而非以某个理论塔数代替现貌。",
      "APSARA记寺院在阇耶跋摩七世统治的十二世纪末建立，后续营建与改动使塔群面貌逐渐形成，可按十二至十三世纪之交理解；现存塔群的保护修缮与最初营建另行区分。",
      "面像把建筑本身变成雕塑，观看方向一变，面容与塔身的关系也随之改变；寺院与佛教王权相联，面像具体身份仍有讨论，不直接把每张面容断作国王肖像。"
    ],
    "caption": [
      "巴戎寺 · 中央面像塔群与直接支承台基",
      "12世纪末—13世纪初"
    ],
    "tall": false
  },
  {
    "id": "kh_banteay_srei",
    "name": "女王宫",
    "short": "女王宫",
    "sub": "中央三祠塔与共同台基",
    "dyn": "kh_angkor",
    "tag": "吴哥时期",
    "era": "967年奉献",
    "year": 967,
    "yearApprox": false,
    "yearLabel": "967年奉献",
    "yearNote": "967为碑铭所记奉献纪年，不等同于每块石构件的施工完成年；现存形态亦含保护修复。",
    "placeKey": "kh_banteay_srei_place",
    "place": "暹粒省 · 女王宫",
    "country": "KH",
    "initialStatus": "unvisited",
    "types": [
      "temple"
    ],
    "legacyNames": [
      "Banteay Srei",
      "班迭斯雷"
    ],
    "lede": "细密花纹在粉红砂岩上交织，女王宫中央三祠塔以较小尺度容纳了格外繁复的门楣与壁面雕刻。三塔共同立在台基上，侧向观看时彼此遮挡，雕刻的近距离层次比高大的体量更引人停留。碑铭所记九六七年奉献提供了营建时期的线索，并不意味着每块石材都在同一年施工完成。",
    "facts": [
      "中央三座祠塔共用台基，塔身门框、壁面与叠层塔顶密布砂岩雕刻；它们属于寺院核心区，外围库房与门楼另成空间，不能把三塔局部理解为全寺布局。",
      "APSARA记九六七年四月二十二日奉献，并以中央塔区门柱铭文说明建寺者及其家族参与；奉献纪年与各石构的施工阶段仍有区别，后来保护修复又形成另一层历史。",
      "寺庙由高级官员营建而非直接以国王建寺定义，精细砂岩雕刻显示宫廷艺术向其他施主的传播；女王宫是通行名称，并不证明这里曾是女王居住的宫殿。"
    ],
    "caption": [
      "女王宫 · 中央三祠塔与共同台基",
      "967年奉献"
    ],
    "tall": false
  },
  {
    "id": "id_borobudur",
    "name": "婆罗浮屠",
    "short": "婆罗浮屠",
    "sub": "现存主体与完整基座",
    "dyn": "id_java_classical",
    "tag": "爪哇古典时期",
    "era": "8—9世纪",
    "year": 825,
    "yearApprox": true,
    "yearLabel": "8—9世纪",
    "yearNote": "UNESCO记8—9世纪；825仅为所述时期的约略年表位置。现存石构经过20世纪保护修复。",
    "placeKey": "id_borobudur_place",
    "place": "中爪哇省 · 马格朗",
    "country": "ID",
    "initialStatus": "unvisited",
    "types": [
      "temple",
      "pagoda"
    ],
    "legacyNames": [
      "Borobudur",
      "波罗浮屠"
    ],
    "lede": "方形台层上，石刻回廊逐级引人升高，直到三层圆台与镂空小塔围住中央大塔。婆罗浮屠把绕行的过程变成佛教世界观的空间表达，宽阔基座与上部塔群须一起观看。建筑在八至九世纪营建，现存石构又经历二十世纪保护修复；今天的完整轮廓既是古代设计，也是持续保护的结果。",
    "facts": [
      "主体由五层方形台层、上方三层圆台与中央大塔组成，圆台列置七十二座镂空小塔，各含佛像；下部回廊有浮雕，完整基座承托逐层上升的礼拜路线。",
      "UNESCO把营建定为八至九世纪夏连特拉王朝时期，未给出单一确切建年；二十世纪曾进行大规模保护修复，现存石构的复位与修护不能忽略。",
      "从基座到方台再到圆台，对应佛教宇宙观中不同境界；雕刻叙事与上部简洁塔群形成变化，参拜者的行进同时成为由繁复形象走向开阔空间的过程。"
    ],
    "caption": [
      "婆罗浮屠 · 现存主体与完整基座",
      "8—9世纪"
    ],
    "tall": false
  },
  {
    "id": "id_prambanan_shiva",
    "name": "普兰巴南湿婆主庙",
    "short": "普兰巴南湿婆主庙",
    "sub": "单座湿婆主庙与台阶",
    "dyn": "id_java_classical",
    "tag": "爪哇古典时期",
    "era": "9—10世纪",
    "year": 900,
    "yearApprox": true,
    "yearLabel": "9—10世纪",
    "yearNote": "UNESCO同页简述作10世纪、详细说明作9世纪；900仅作约略排序。现存主庙经过近现代复原修复。",
    "placeKey": "id_prambanan_shiva_place",
    "place": "日惹特区 · 普兰巴南",
    "country": "ID",
    "initialStatus": "unvisited",
    "types": [
      "temple"
    ],
    "legacyNames": [
      "Prambanan",
      "Candi Shiva",
      "Candi Siwa",
      "普兰巴南湿婆庙"
    ],
    "lede": "高耸塔冠一层层收紧，湿婆主庙以约四十七米的高度立在普兰巴南寺群中央，入口台阶把人引入密集石饰之间。从主庙及其台基便能读出爪哇印度教建筑对神圣中心的强调。营建年代以九至十世纪范围说明，现存主体包含近现代复原修复，不把今日整齐石构当成未经干预的遗存。",
    "facts": [
      "湿婆主庙是寺群中央最高的主祠，高约四十七米，塔身、层叠塔冠和入口阶梯连成竖向轮廓；两侧梵天与毗湿奴庙属于另外单体，与中央主祠各有自己的位置。",
      "UNESCO简述采用十世纪、详细说明又提九世纪，现存主体可按九至十世纪范围理解，尚不能指定确年；现存主庙经过近现代复原修复，建筑材料与整体形式应分别理解。",
      "寺群围绕湿婆、毗湿奴和梵天组织祭祀空间，主庙高度强调湿婆在中心的地位；与附近婆罗浮屠的横向层台相比，这座石祠以陡升轮廓表达不同的宗教空间。"
    ],
    "caption": [
      "普兰巴南湿婆主庙 · 单座湿婆主庙与台阶",
      "9—10世纪"
    ],
    "tall": true
  },
  {
    "id": "th_sukhothai_mahathat",
    "name": "素可泰玛哈泰寺主塔",
    "short": "素可泰玛哈泰寺主塔",
    "sub": "莲苞形主塔及直接支承台基",
    "dyn": "th_sukhothai",
    "tag": "素可泰时期",
    "era": "素可泰时期 · 约略定位",
    "year": 1350,
    "yearApprox": true,
    "yearLabel": "素可泰时期 · 约略定位",
    "yearNote": "可靠资料确认素可泰时期及莲苞主塔形制，单体精确改建年未详；1350仅用于年表排序，不采用寺院初创年来替代现存主塔年龄。",
    "placeKey": "th_sukhothai_mahathat_place",
    "place": "素可泰府 · 素可泰",
    "country": "TH",
    "initialStatus": "unvisited",
    "types": [
      "pagoda"
    ],
    "legacyNames": [
      "Wat Mahathat Sukhothai",
      "素可泰玛哈泰寺"
    ],
    "lede": "莲苞形塔顶在层叠台基上收成细长塔尖，玛哈泰寺主塔以这一轮廓体现素可泰艺术的地方特色。残存砖石与灰泥装饰让人看到古塔的实质，而非已经消失的殿顶。中央主塔及支承台基构成礼拜空间的核心；它属于素可泰时期，单体精确改建年未定，不能用寺院创建年份替代眼前形制的年代。",
    "facts": [
      "主塔由层叠台基承托，顶部作莲苞形并伸出细长尖顶，是素可泰塔的重要特征；邻近殿柱与独立小塔另成布局，不属于这座中央主塔的直接塔体。",
      "泰国文物部门说明主塔可能由早期斯里兰卡式改为莲苞形，确切单体改建年尚未核定；主体因此按素可泰时期宽泛断代，并与寺院初创及后来修护区分。",
      "主塔基座的灰泥浮雕表现合掌礼敬的佛教弟子，使礼拜动作也进入建筑表面；莲苞顶与这类装饰相合，可见素可泰对外来佛塔传统的地方化表达。"
    ],
    "caption": [
      "素可泰玛哈泰寺主塔 · 莲苞形主塔及直接支承台基",
      "素可泰时期 · 约略定位"
    ],
    "tall": true
  },
  {
    "id": "th_chaiwatthanaram",
    "name": "柴瓦塔那兰寺",
    "short": "柴瓦塔那兰寺",
    "sub": "中央主塔、四角小塔及共同台基",
    "dyn": "th_ayutthaya",
    "tag": "阿瑜陀耶时期",
    "era": "1630年建置",
    "year": 1630,
    "yearApprox": false,
    "yearLabel": "1630年建置",
    "yearNote": "1630为史料所记寺院建置年；图版是现存中央主塔与四角塔组合，前期构筑讨论及现代修复不等同于全部砖石同年营建。",
    "placeKey": "th_chaiwatthanaram_place",
    "place": "大城府 · 大城",
    "country": "TH",
    "initialStatus": "unvisited",
    "types": [
      "temple",
      "pagoda"
    ],
    "legacyNames": [
      "Wat Chaiwatthanaram",
      "柴瓦塔那兰寺",
      "阿瑜陀耶"
    ],
    "lede": "一座高大主塔与四角小塔共同立在红砖台基上，柴瓦塔那兰寺的中央组群把神圣中心组织成层层上升的寺山。寺院据编年史于一六三〇年建置，现存砖石又经历现代保护修复。从主塔及四角塔的共同关系，可以理解阿瑜陀耶佛寺怎样借用高棉式塔形表达佛教宇宙观。",
    "facts": [
      "中央主塔较高，四角各置一座小塔，五塔同立宽阔共同台基，层层收分的塔身突出中心；外围回廊与八座塔式殿宇属于另一圈布局，与中央五塔的位置和组合有别。",
      "泰国人类学中心引多种阿瑜陀耶编年史记一六三〇年建置，现代一九八七至一九九二年又有考古与修复；建寺日期不能直接证明所有现存砖石同时完成。",
      "研究资料把主塔解释为须弥山、四角塔与回廊组成周边世界，体现佛教与印度教宇宙观的相通图式；这种组群关系比单看高塔更加说明寺院设计。"
    ],
    "caption": [
      "柴瓦塔那兰寺 · 中央主塔、四角小塔及共同台基",
      "1630年建置"
    ],
    "tall": false
  },
  {
    "id": "mm_ananda",
    "name": "蒲甘阿难陀寺",
    "short": "蒲甘阿难陀寺",
    "sub": "完整寺身、中央塔冠及突出入口",
    "dyn": "mm_bagan",
    "tag": "蒲甘时期",
    "era": "12世纪初",
    "year": 1110,
    "yearApprox": true,
    "yearLabel": "12世纪初",
    "yearNote": "印度政府保护工程介绍记12世纪初；1110仅为该时期的约略定位，不选择未经核实的1090、1091或1105确年。现存形态含后世修护。",
    "placeKey": "mm_ananda_place",
    "place": "曼德勒省 · 蒲甘",
    "country": "MM",
    "initialStatus": "unvisited",
    "types": [
      "temple"
    ],
    "legacyNames": [
      "Ananda Temple",
      "阿南达寺"
    ],
    "lede": "宽阔寺身向四面突出入口，层叠平台将中央金色塔冠托高，阿难陀寺的外形把内部礼拜与登高般的视线联系起来。它属于十二世纪初的蒲甘大型佛寺，现存墙面、屋面与塔冠含有后世修护。完整寺身比单独截取金顶更能说明这种建筑：佛像与行进空间藏在墙内，石砖体量只是它的外层。",
    "facts": [
      "寺身以十字形平面向四方伸出入口，上方层台围绕中央塔冠收起，内部有朝向四个方位的立佛；主塔冠与寺身相连，并非独立建在旁边的一座佛塔。",
      "印度政府保护介绍采用十二世纪初的营建范围，主体可据此采用宽泛断代，尚不能确认单一建年；二〇一六年地震后又开展保护修复，现貌包含后世修护。",
      "与只能围绕外部礼拜的实心塔相比，阿难陀寺用有内室的宽阔寺身容纳佛像与绕行空间；四向入口和四尊立佛把参拜路线与方位联系，形成蒲甘佛寺的独特体验。"
    ],
    "caption": [
      "蒲甘阿难陀寺 · 完整寺身、中央塔冠及突出入口",
      "12世纪初"
    ],
    "tall": false
  },
  {
    "id": "la_xieng_thong_sim",
    "name": "香通寺主佛殿",
    "short": "香通寺主佛殿",
    "sub": "主佛殿sim与支承台基",
    "dyn": "la_lan_xang",
    "tag": "澜沧时期",
    "era": "约1560年",
    "year": 1560,
    "yearApprox": true,
    "yearLabel": "约1560年",
    "yearNote": "官方资料记约1560年创建；主佛殿经历1928年、1952—1960年等修缮，不能将现存装饰全部视为16世纪原作。",
    "placeKey": "la_xieng_thong_sim_place",
    "place": "琅勃拉邦省 · 琅勃拉邦",
    "country": "LA",
    "initialStatus": "unvisited",
    "types": [
      "hall",
      "temple"
    ],
    "legacyNames": [
      "Wat Xieng Thong",
      "香通寺",
      "寮国"
    ],
    "lede": "三层屋面向低处舒展，香通寺主佛殿的曲线像将礼拜空间轻轻覆盖，檐下金饰与玻璃镶嵌又带来近看的光彩。寺院约于一五六〇年创建，主殿此后多次维修，今日装饰不宜全部认作十六世纪原作。这里的主体是佛殿及台基，低垂屋顶与内部中厅的关系，体现琅勃拉邦佛殿的地方形式。",
    "facts": [
      "主佛殿称为sim，内部中厅与两侧空间收在低垂屋面下，三层屋顶逐层舒展，入口有四根装饰柱；支承台基与殿体相连，王室葬车殿是另外建筑。",
      "琅勃拉邦官方旅游资料记约一五六〇年创建，主殿及寺域历经一九二八年、一九五二至一九六〇年等维修；营建时期与今日玻璃镶嵌、金饰的材料年龄应分别看待。",
      "下垂檐口与上扬脊饰形成琅勃拉邦佛殿的辨识轮廓，玻璃镶嵌又把日常生活与宗教图像带入墙面；传统屋面与后世装饰共同延续寺院的礼拜功能。"
    ],
    "caption": [
      "香通寺主佛殿 · 主佛殿sim与支承台基",
      "约1560年"
    ],
    "tall": false
  },
  {
    "id": "vn_po_klong_garai",
    "name": "波克朗加莱主塔",
    "short": "波克朗加莱主塔",
    "sub": "现存主祠塔与入口、台基",
    "dyn": "vn_champa",
    "tag": "占婆时期",
    "era": "13世纪末—14世纪初",
    "year": 1300,
    "yearApprox": true,
    "yearLabel": "13世纪末—14世纪初",
    "yearNote": "庆和省官方资料记13世纪末—14世纪初；1300仅作约略排序，不以所祭国王生卒年断定塔的营建年。",
    "placeKey": "vn_po_klong_garai_place",
    "place": "庆和省 · 潘朗—塔占",
    "country": "VN",
    "initialStatus": "unvisited",
    "types": [
      "temple"
    ],
    "legacyNames": [
      "Po Klong Garai",
      "Pô Klong Garai",
      "宁顺省",
      "Ninh Thuan",
      "潘朗",
      "占婆塔"
    ],
    "lede": "红砖壁柱将塔身分出节奏，层叠塔顶逐渐收窄，波克朗加莱主塔从山丘上保留占婆祠塔的竖向轮廓。主祠与门塔、火塔各自独立，主塔入口与台基共同形成中心的礼拜空间。它在十三世纪末至十四世纪初营建，后来与当地尊奉的君王相联系；持续举行的占族祭典，使这座古塔仍处在社区生活之中。",
    "facts": [
      "主祠塔位于塔群中心，方形外部与层叠四层塔身相合，入口朝东，砖壁的壁柱与龛饰划分节奏；门塔和长脊顶火塔是另外两座建筑，不并入主祠单体。",
      "庆和省文化旅游资料将塔群营建定在十三世纪末至十四世纪初，各塔的确切营建年仍须分别考证；所祭君王生活于更早时期，不能用君王生卒年替代砖塔建造年代。",
      "主塔祭祀把湿婆信仰与地方王者记忆结合，至今仍举行开塔、祈雨与卡特节等占族仪礼；建筑遗存和持续祭祀一起解释它对社区的意义，而非只看砖饰。"
    ],
    "caption": [
      "波克朗加莱主塔 · 现存主祠塔与入口、台基",
      "13世纪末—14世纪初"
    ],
    "tall": true
  },
  {
    "id": "vn_hue_ngo_mon",
    "name": "顺化皇城午门",
    "short": "顺化皇城午门",
    "sub": "午门完整城台与五凤楼",
    "dyn": "vn_nguyen",
    "tag": "阮朝",
    "era": "1833年 · 明命帝时期",
    "year": 1833,
    "yearApprox": false,
    "yearLabel": "1833年 · 明命帝时期",
    "yearNote": "1833为午门营建纪年；现存木楼、屋面和城台经历后世修缮，另有现代修缮记录。",
    "placeKey": "vn_hue_ngo_mon_place",
    "place": "顺化市 · 顺化",
    "country": "VN",
    "initialStatus": "unvisited",
    "types": [
      "gate",
      "pavilion",
      "palace"
    ],
    "legacyNames": [
      "Ngo Mon",
      "Ngọ Môn",
      "午门",
      "五凤楼"
    ],
    "lede": "顺化皇城的午门以厚重的城台和上方五凤楼组成皇家入口，五条通道与层叠屋顶共同显示严格的通行秩序。午门于一八三三年在明命帝时期建成，属于阮朝都城的礼仪核心。站在门前，既能看到城防入口的坚实尺度，也能理解皇帝、官员与随从如何通过不同路线进入皇城。",
    "facts": [
      "午门的砖石城台平面呈凹形，设五条通道，上方五凤楼为双层木构，多个屋顶以黄绿琉璃瓦覆盖。沉重城台与轻巧楼阁形成上下分明的入口。",
      "现存午门建于一八三三年明命帝时期，替代此前的南阙台。这个年份对应午门的营建阶段，不等于整座顺化皇城的始建年；建筑后来亦经历修复。",
      "中央门道专供皇帝，其他通道分别服务文武官员与兵马随从。建筑既承担出入，也供皇室举行仪式，通道的分配使阮朝礼仪等级成为可见的空间秩序。"
    ],
    "caption": [
      "顺化皇城午门 · 午门完整城台与五凤楼",
      "1833年 · 明命帝时期"
    ],
    "tall": false
  },
  {
    "id": "ph_manila_san_agustin",
    "name": "马尼拉圣奥古斯丁教堂",
    "short": "马尼拉圣奥古斯丁教堂",
    "sub": "现存教堂正立面与钟塔",
    "dyn": "ph_spanish",
    "tag": "西班牙殖民时期",
    "era": "1607年石教堂建成",
    "year": 1607,
    "yearApprox": false,
    "yearLabel": "1607年石教堂建成",
    "yearNote": "1607为现存石教堂建成纪年，区别于更早木教堂。钟塔与后世维修有各自沿革，不将整座现状断作同年原构。",
    "placeKey": "ph_manila_san_agustin_place",
    "place": "马尼拉大都会 · 马尼拉",
    "country": "PH",
    "initialStatus": "unvisited",
    "types": [
      "church"
    ],
    "legacyNames": [
      "San Agustin Church",
      "Intramuros",
      "圣奥古斯丁教堂"
    ],
    "lede": "石造立面由层叠柱式分出门窗，三角山墙上留有圆窗和十字架，现存钟塔附接在右侧。圣奥古斯丁教堂保留马尼拉旧城的另一种建筑传统。",
    "facts": [
      "图版绘现存正立面与单座右侧钟塔，左侧遗失钟塔的低矮残部保留，不复原为对称双塔。",
      "菲律宾国家博物馆记现存石教堂于1607年建成；初创木教堂与后世修缮分别说明，修道院全体不入图。",
      "1607为现存石教堂建成纪年，区别于更早木教堂。钟塔与后世维修有各自沿革，不将整座现状断作同年原构。"
    ],
    "caption": [
      "马尼拉圣奥古斯丁教堂 · 现存教堂正立面与钟塔",
      "1607年石教堂建成"
    ],
    "tall": true
  }
]);

// 韩国与朝鲜古建筑；来源和真实生成记录见 assets/research/korea-20261002-batch.json。
PLACES.push(
  {
    "key": "kr_yesan",
    "name": "礼山",
    "prov": "忠清南道",
    "country": "KR",
    "lat": 36.701,
    "lon": 126.622
  },
  {
    "key": "kr_yeongju",
    "name": "荣州",
    "prov": "庆尚北道",
    "country": "KR",
    "lat": 36.805,
    "lon": 128.624
  },
  {
    "key": "kr_gyeongju",
    "name": "庆州",
    "prov": "庆尚北道",
    "country": "KR",
    "lat": 35.856,
    "lon": 129.224
  },
  {
    "key": "kr_seoul",
    "name": "首尔",
    "prov": "首尔特别市",
    "country": "KR",
    "lat": 37.566,
    "lon": 126.978
  },
  {
    "key": "kp_kaesong",
    "name": "开城",
    "prov": "开城市",
    "country": "KP",
    "lat": 37.97,
    "lon": 126.554
  },
  {
    "key": "kp_pyongyang",
    "name": "平壤",
    "prov": "平壤市",
    "country": "KP",
    "lat": 39.039,
    "lon": 125.763
  }
);
CHAPTERS.push(
  {
    "key": "ko_silla",
    "years": "668 — 935 · 统一新罗",
    "blurb": "多宝塔的方形与八角石构件层层转换，留下统一新罗佛教石作的细密轮廓；具体建塔纪年与佛国寺创建分开说明。"
  },
  {
    "key": "ko_goryeo",
    "years": "918 — 1392 · 高丽",
    "blurb": "修德寺与浮石寺的木殿保存高丽晚期梁架，开城善竹桥则以石墩石梁跨沟；约略年代与后添栏杆在各条目内分别说明。"
  },
  {
    "key": "ko_joseon",
    "years": "1392 — 1910 · 朝鲜王朝",
    "blurb": "仁政殿的双层屋檐、普通门的城台与崧阳书院讲堂，呈现宫殿、城防和儒学空间；朝鲜王朝是历史时期，国别由古迹今日所在地派生。"
  }
);
SITES.push(...[
  {
    "id": "kr_sudeoksa_daeungjeon",
    "name": "修德寺大雄殿",
    "short": "修德寺大雄殿",
    "sub": "单座大雄殿与石台基",
    "dyn": "ko_goryeo",
    "tag": "高丽",
    "era": "1308年建殿；寺院初创年代另计。",
    "year": 1308,
    "yearLabel": "1308年",
    "yearApprox": false,
    "yearNote": "1308年建殿；寺院初创年代另计。",
    "place": "韩国 · 礼山",
    "placeKey": "kr_yesan",
    "country": "KR",
    "types": [
      "hall"
    ],
    "initialStatus": "unvisited",
    "timelineLane": "korea",
    "lede": "修德寺大雄殿以正面三间的简洁木构立在山寺院落中，双坡屋顶下的柱头斗栱与侧面梁架清楚显露。修理时发现的墨书将殿堂建造年代确定在一三〇八年，使它成为有明确年代依据的高丽木建筑。与华丽装饰相比，这座殿堂更适合从柱、梁和屋顶的直接关系中细看古代营造。",
    "facts": [
      "大雄殿正面三间、侧面四间，采用双坡悬山屋顶。斗栱主要安置在柱头，侧立面露出梁架层次，柱、梁与屋顶之间的承重关系容易辨认。",
      "一九三七年修理时发现的墨书记录，将大雄殿建造时间确定为一三〇八年。这个确年属于现存殿堂，寺院本身的创立传说与后世修理另须分别看待。",
      "简洁的柱头斗栱和开阔梁架保留高丽时期木构特点，明确年代使其成为比较早期建筑的重要依据。由侧面观察结构，比只看正面更能体会工匠的营造方法。"
    ],
    "caption": [
      "修德寺大雄殿 · 单座大雄殿与石台基",
      "高丽 · 1308年"
    ],
    "legacyNames": [
      "수덕사 대웅전",
      "Sudeoksa Daeungjeon",
      "修德寺"
    ]
  },
  {
    "id": "kr_buseoksa_muryangsujeon",
    "name": "浮石寺无量寿殿",
    "short": "浮石寺无量寿殿",
    "sub": "单座无量寿殿与台阶",
    "dyn": "ko_goryeo",
    "tag": "高丽",
    "era": "现存无量寿殿于1376年重建；676年为寺院创建。",
    "year": 1376,
    "yearLabel": "1376年",
    "yearApprox": false,
    "yearNote": "现存无量寿殿于1376年重建；676年为寺院创建。",
    "place": "韩国 · 荣州",
    "placeKey": "kr_yeongju",
    "country": "KR",
    "types": [
      "hall"
    ],
    "initialStatus": "unvisited",
    "timelineLane": "korea",
    "lede": "浮石寺无量寿殿以正面五间的舒展比例、略向中部鼓起的圆柱和简洁柱头斗栱著称。宽阔的歇山屋顶覆盖供奉阿弥陀佛的殿内空间，形成沉稳而有弹性的轮廓。殿堂有一三七六年重修记录，但结构形式亦保留更早传统；现存建筑与后来多次修理共同构成它的历史层次。",
    "facts": [
      "无量寿殿正面五间、进深三间，采用单层歇山屋顶与柱头斗栱。圆柱中部略鼓起，配合柱间开阔尺度，使沉重屋顶在视觉上显得柔和而稳定。",
      "记载称殿堂在十四世纪受损后于一三七六年重修，后世又有修理与拆修。部分结构形式承袭更早传统，故不能把现存所有构件都断为同一重修年份。",
      "殿内供奉阿弥陀佛，建筑是浮石寺的主要佛殿。柱形、斗栱与屋面之间的协调关系，让访客从具体构件理解高丽木构传统及佛寺空间的长期延续。"
    ],
    "caption": [
      "浮石寺无量寿殿 · 单座无量寿殿与台阶",
      "高丽 · 1376年"
    ],
    "legacyNames": [
      "부석사 무량수전",
      "Buseoksa Muryangsujeon",
      "浮石寺"
    ]
  },
  {
    "id": "kr_bulguksa_dabotap",
    "name": "佛国寺多宝塔",
    "short": "佛国寺多宝塔",
    "sub": "多宝塔完整石塔与四向台阶",
    "dyn": "ko_silla",
    "tag": "统一新罗",
    "era": "官方断代为统一新罗8世纪；751年为佛国寺兴建相关纪年，塔的排序年约略取751。",
    "year": 751,
    "yearLabel": "约751年",
    "yearApprox": true,
    "yearNote": "官方断代为统一新罗8世纪；751年为佛国寺兴建相关纪年，塔的排序年约略取751。",
    "place": "韩国 · 庆州",
    "placeKey": "kr_gyeongju",
    "country": "KR",
    "types": [
      "pagoda"
    ],
    "initialStatus": "unvisited",
    "timelineLane": "korea",
    "lede": "方形石柱托起层层变化的塔身，栏杆与八角盖顶在上部转换尺度。多宝塔用花岗岩雕出近似木构的复杂轮廓，与常见叠檐石塔迥然不同。",
    "facts": [
      "韩国官方将多宝塔定为统一新罗8世纪；751年为佛国寺兴建相关纪年，排序取约值，不声明塔的精确完工年。",
      "下部方形石柱、四向台阶与上部八角构件组合，官方资料说明其层数难以按一般楼阁塔方式计数。",
      "按现状保留仅存的一尊石狮，不补回失去的石狮，也不绘邻近释迦塔。"
    ],
    "caption": [
      "佛国寺多宝塔 · 多宝塔完整石塔与四向台阶",
      "统一新罗 · 约略定位"
    ],
    "legacyNames": [
      "불국사 다보탑",
      "Dabotap",
      "佛国寺"
    ]
  },
  {
    "id": "kr_changdeokgung_injeongjeon",
    "name": "昌德宫仁政殿",
    "short": "昌德宫仁政殿",
    "sub": "仁政殿单殿与月台",
    "dyn": "ko_joseon",
    "tag": "朝鲜王朝",
    "era": "所绘现存仁政殿为1804年重建，宫殿创建与历次火灾另计。",
    "year": 1804,
    "yearLabel": "1804年",
    "yearApprox": false,
    "yearNote": "所绘现存仁政殿为1804年重建，宫殿创建与历次火灾另计。",
    "place": "韩国 · 首尔",
    "placeKey": "kr_seoul",
    "country": "KR",
    "types": [
      "palace",
      "hall"
    ],
    "initialStatus": "unvisited",
    "timelineLane": "korea",
    "lede": "昌德宫仁政殿立在两层石台上，正面五间的重层屋顶统摄前方朝廷院落，室内却上下贯通为一个高大空间。眼前木构是一八〇四年火灾后重建的正殿，内饰又保留二十世纪初改造。它既展示朝鲜王朝朝会礼仪，也以叠加的修建阶段讲述王宫适应时代变化的过程。",
    "facts": [
      "仁政殿正面五间、侧面四间，重层歇山屋顶配以密集斗栱，立于两层月台之上。内部不以楼板分层，高柱和上层屋架共同围成贯通的正殿空间。",
      "正殿于一八〇三年火灾中烧毁，次年重建完成，石台沿用既有设施。现存木构以一八〇四年为主要年代，内部地板与部分装饰又有二十世纪初改造。",
      "仁政殿用于朝贺、册封及重要政治仪式，前庭品阶石组织官员的位置。建筑背靠低丘、廊庑顺应地势，显示宫廷礼制与实际地形之间的协调。"
    ],
    "caption": [
      "昌德宫仁政殿 · 仁政殿单殿与月台",
      "朝鲜王朝 · 1804年"
    ],
    "legacyNames": [
      "창덕궁 인정전",
      "Changdeokgung Injeongjeon",
      "仁政殿"
    ]
  },
  {
    "id": "kp_kaesong_namdaemun",
    "name": "开城南大门",
    "short": "开城南大门",
    "sub": "石门台与战后复建门楼",
    "dyn": "modern",
    "tag": "战后复建",
    "era": "内城门始建于1391—1393年；门楼1950年毁于战火，1954年起复建，申遗档案图注记1955年恢复，年表按现存门楼定位。",
    "year": 1955,
    "yearLabel": "1955年",
    "yearApprox": false,
    "yearNote": "内城门始建于1391—1393年；门楼1950年毁于战火，1954年起复建，申遗档案图注记1955年恢复，年表按现存门楼定位。",
    "place": "朝鲜 · 开城",
    "placeKey": "kp_kaesong",
    "country": "KP",
    "types": [
      "gate",
      "wall"
    ],
    "initialStatus": "unvisited",
    "timelineLane": "korea",
    "lede": "开城南大门以花岗石城台和中央拱洞承托一座单层木楼，是昔日内城南入口的遗存。城门始建于十四世纪末，但木楼在朝鲜战争中毁坏，眼前部分于一九五五年依据旧图像和建筑资料重建。石基与重建门楼共同保留城门形象，也让这处古迹呈现战争损毁与修复的历史。",
    "facts": [
      "城台由花岗石砌成，中央开拱券通道，上方木楼正面三间、侧面两间。宽大的屋顶与低厚石基形成鲜明对照，入口、城台和门楼的层次清晰可辨。",
      "南大门始建于一三九一至一三九三年。木楼在朝鲜战争中烧毁，一九五五年依旧照片、图纸与原有基础重建，现存木构须与早期石基分别理解。",
      "城门见证开城作为高丽都城的城市格局，也保存了战后保护古迹的经历。辨认早期基础与重建上部，有助于理解建筑延续不只依靠原件，也依靠可信的历史记录。"
    ],
    "caption": [
      "开城南大门 · 石门台与战后复建门楼",
      "战后复建 · 1955年"
    ],
    "legacyNames": [
      "개성 남대문",
      "Kaesong Namdae Gate",
      "Kaesong Namdaemun",
      "开城南门"
    ]
  },
  {
    "id": "kp_pothong_gate",
    "name": "平壤普通门",
    "short": "平壤普通门",
    "sub": "普通门城台与双层檐门楼",
    "dyn": "ko_joseon",
    "tag": "朝鲜王朝",
    "era": "现存普通门据金日成大学资料于1473年大修，后来仍有维修扩建；不把高句丽城址起源作为现存门楼年代。",
    "year": 1473,
    "yearLabel": "1473年",
    "yearApprox": false,
    "yearNote": "现存普通门据金日成大学资料于1473年大修，后来仍有维修扩建；不把高句丽城址起源作为现存门楼年代。",
    "place": "朝鲜 · 平壤",
    "placeKey": "kp_pyongyang",
    "country": "KP",
    "types": [
      "gate",
      "wall"
    ],
    "initialStatus": "unvisited",
    "timelineLane": "korea",
    "lede": "平壤普通门以拱洞石台承托双层木楼，宽大的重檐屋顶曾标示古城向西通行的入口。城门的历史可追溯至高句丽时期，但现存形制主要关联一四七三年的大规模修缮及后续扩修。今天孤立可见的门楼，把城防、出行与送别的城市记忆浓缩在石基和木构相接的轮廓中。",
    "facts": [
      "普通门以花岗石城台为基，中央设拱券通道，上方木楼正面三间、侧面三间，双层屋檐逐级展开。石台的厚重与木楼的舒展形成鲜明层次。",
      "城门初建传统追溯至六世纪中叶的高句丽时期，现存形制则经历一四七三年的大修及后续增修。古城门的起源不能直接作为眼前木楼全部构件的年代。",
      "普通门曾是平壤西部对外交通的重要入口，既服务防御，也与出行送别相联系。城墙格局改变后，留存门楼仍能提示古城边界和居民往来生活的记忆。"
    ],
    "caption": [
      "平壤普通门 · 普通门城台与双层檐门楼",
      "朝鲜王朝 · 1473年"
    ],
    "legacyNames": [
      "보통문",
      "Pothong Gate",
      "Potong Gate",
      "普通门"
    ]
  },
  {
    "id": "kp_sungyang_hall",
    "name": "崧阳书院讲堂",
    "short": "崧阳书院讲堂",
    "sub": "书院五间讲堂单体",
    "dyn": "ko_joseon",
    "tag": "朝鲜王朝",
    "era": "书院于1573年设立，讲堂经历17、19世纪维修；现存木构确切建年未定，约1600仅为朝鲜王朝时期的年表位置。",
    "year": 1600,
    "yearLabel": "约1600年",
    "yearApprox": true,
    "yearNote": "书院于1573年设立，讲堂经历17、19世纪维修；现存木构确切建年未定，约1600仅为朝鲜王朝时期的年表位置。",
    "place": "朝鲜 · 开城",
    "placeKey": "kp_kaesong",
    "country": "KP",
    "types": [
      "school",
      "hall"
    ],
    "initialStatus": "unvisited",
    "timelineLane": "korea",
    "lede": "崧阳书院的讲堂位于层层升高的院地上，宽阔的五间正面面向讲学庭院，后方则通往祭祀空间。书院在十六世纪设立于郑梦周故居旧址，兼有儒学教育与纪念功能。现存院落经过多次修理，讲堂的具体建造年代仍须谨慎看待；建筑布局比一个孤立年份更能说明它的用途。",
    "facts": [
      "讲学区域分为三层台地，讲堂位于最高一层，正面五间、进深三间；较低台地两侧布置学生居住的东西斋，后方另以围墙和门分隔祭祀区域。",
      "书院于一五七三年在郑梦周故居旧址设立，记录又见一六三三年修理讲堂及一八二三年整体修缮。创建年不等于现存讲堂所有构件的建造年。",
      "前方讲学、后方祭祀的安排，把儒学教育与对郑梦周的纪念结合起来。沿台地向上，可以理解书院如何以庭院、斋舍和讲堂组织学习与礼仪生活。"
    ],
    "caption": [
      "崧阳书院讲堂 · 书院五间讲堂单体",
      "朝鲜王朝 · 约略定位"
    ],
    "legacyNames": [
      "숭양서원",
      "Sungyang Sowon",
      "Sungyang Seowon",
      "崧阳书院",
      "松阳书院"
    ]
  },
  {
    "id": "kp_sonjuk_bridge",
    "name": "开城善竹桥",
    "short": "开城善竹桥",
    "sub": "旧石梁桥与1780年石栏",
    "dyn": "ko_goryeo",
    "tag": "高丽",
    "era": "申遗档案称桥自高丽早期使用，确年不详；约1100为排序位置，1392年为郑梦周遇害事件，1780年增设石栏。",
    "year": 1100,
    "yearLabel": "约1100年",
    "yearApprox": true,
    "yearNote": "申遗档案称桥自高丽早期使用，确年不详；约1100为排序位置，1392年为郑梦周遇害事件，1780年增设石栏。",
    "place": "朝鲜 · 开城",
    "placeKey": "kp_kaesong",
    "country": "KP",
    "types": [
      "bridge"
    ],
    "initialStatus": "unvisited",
    "timelineLane": "korea",
    "lede": "短短的花岗岩梁桥跨过浅沟，圆顶石柱与横栏围住桥面。善竹桥因郑梦周遇害而成为纪念场所，后添的栏杆也记录了它退出日常交通的过程。",
    "facts": [
      "申遗档案称石桥自高丽早期使用，确切建年未确认；约1100是排序位置，1392年为遇害事件年代。",
      "桥长8.35米、宽3.36米，石墩承石梁、上铺石板；不是拱桥。现存两侧石栏于1780年增设。",
      "仅绘旧善竹桥与后添石栏；旁边另建的通行桥、碑亭和碑刻不包含在主体内。"
    ],
    "caption": [
      "开城善竹桥 · 旧石梁桥与1780年石栏",
      "高丽 · 约略定位"
    ],
    "legacyNames": [
      "선죽교",
      "Sonjuk Bridge",
      "Seonjukgyo",
      "善竹桥"
    ]
  }
]);

// 东京古建增补：年代对应所绘现存主体；图版等待用户验收。
PLACES.push(...[
  {
    "key": "jp_tokyo_ueno",
    "name": "东京 · 上野",
    "prov": "东京都",
    "country": "JP",
    "lat": 35.715,
    "lon": 139.773,
    "coordinate_note": "古迹邻近地区地图示意点，非建筑测绘坐标。"
  },
  {
    "key": "jp_tokyo_nezu",
    "name": "东京 · 根津",
    "prov": "东京都",
    "country": "JP",
    "lat": 35.72,
    "lon": 139.7608,
    "coordinate_note": "古迹邻近地区地图示意点，非建筑测绘坐标。"
  },
  {
    "key": "jp_tokyo_shiba",
    "name": "东京 · 芝公园",
    "prov": "东京都",
    "country": "JP",
    "lat": 35.6575,
    "lon": 139.748,
    "coordinate_note": "古迹邻近地区地图示意点，非建筑测绘坐标。"
  },
  {
    "key": "jp_tokyo_otsuka",
    "name": "东京 · 大塚",
    "prov": "东京都",
    "country": "JP",
    "lat": 35.7195,
    "lon": 139.7274,
    "coordinate_note": "古迹邻近地区地图示意点，非建筑测绘坐标。"
  },
  {
    "key": "jp_tokyo_ikegami",
    "name": "东京 · 池上",
    "prov": "东京都",
    "country": "JP",
    "lat": 35.5786,
    "lon": 139.7059,
    "coordinate_note": "古迹邻近地区地图示意点，非建筑测绘坐标。"
  },
  {
    "key": "jp_higashimurayama",
    "name": "东村山",
    "prov": "东京都",
    "country": "JP",
    "lat": 35.759,
    "lon": 139.4656,
    "coordinate_note": "古迹邻近地区地图示意点，非建筑测绘坐标。"
  }
]);
SITES.push(...[
  {
    "id": "jp_ueno_toshogu_karamon",
    "name": "上野东照宫唐门",
    "short": "上野东照宫唐门",
    "sub": "唐门单体",
    "country": "JP",
    "types": [
      "gate"
    ],
    "initialStatus": "unvisited",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "1651年建立",
    "year": 1651,
    "yearNote": "年表依据所绘现存主体的1651年建立年代，不以寺社初创传说替代。",
    "place": "日本 · 东京都 · 上野",
    "placeKey": "jp_tokyo_ueno",
    "lede": "上野东照宫唐门把华丽集中在一处狭小入口：起伏唐破风覆在门扉上，金箔与雕刻沿柱枋密集展开。现存单体属于一六五一年社殿改建，桁行与梁间都只有一间，却以复杂曲线形成强烈的仪礼边界。看它时可先辨屋顶和开间，再近看龙与禽鸟装饰，后世修缮恢复的表面并非全部初建原物。",
    "facts": [
      "唐门桁行一间、梁间一间，是正面以唐破风迎人的向唐门，屋面覆铜瓦。小尺度结构承接繁密雕饰，弯曲破风和直立柱扉构成入口最醒目的对比。",
      "文化财资料记现存唐门为一六五一年建立，社方亦将它与当期社殿改建相连。后世持续修缮和表面维护，因此眼前金箔彩绘不能全部作为初建时原物判断。",
      "柱旁雕龙与周围禽鸟、花卉使门成为观看的焦点，也宣示祭祀场所的等级。单间门的装饰密度说明，仪礼建筑的分量有时来自细部而非横向尺度。"
    ],
    "caption": [
      "上野东照宫唐门 · 唐门单体",
      "江户时代 · 1651年"
    ],
    "legacyNames": [
      "上野東照宮",
      "上野東照宮唐門",
      "Ueno Toshogu",
      "Ueno Tōshō-gū Karamon"
    ]
  },
  {
    "id": "jp_nezu_romon",
    "name": "根津神社楼门",
    "short": "根津神社楼门",
    "sub": "三间一户楼门",
    "country": "JP",
    "types": [
      "gate"
    ],
    "initialStatus": "unvisited",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "1706年建立",
    "year": 1706,
    "yearNote": "年表依据所绘现存主体的1706年建立年代，不以寺社初创传说替代。",
    "place": "日本 · 东京都 · 根津",
    "placeKey": "jp_tokyo_nezu",
    "lede": "根津神社楼门只有中央一条通道，左右实体把入口收得庄重，上层栏杆则在大屋顶下打开轻盈横线。这是一座三间一户楼门，双层楼身由上方单道主屋檐统摄，和有上下两道大檐的二重门不同。现存门楼建于一七〇六年，朱红柱架与瓦顶让江户神社入口的秩序清晰可读。",
    "facts": [
      "三间一户指正面三个柱间中仅中央供通行，楼门上层带栏杆，整体覆入母屋瓦顶。这里有两层楼身却只有一道主要屋檐，不能把楼层和檐层混为一数。",
      "文化财资料将现存楼门记为一七〇六年，属于根津神社江户时期的建筑群。这个日期对应门楼主体，而神社的早期传承与后来维修应作为另外的历史层次。",
      "入口以中央通行、两侧收束和上层围栏建立内外边界，比连续鸟居的参道呈现另一种节奏。柱间比例与屋顶形式共同说明，神社空间也依靠门的体量组织。"
    ],
    "caption": [
      "根津神社楼门 · 三间一户楼门",
      "江户时代 · 1706年"
    ],
    "legacyNames": [
      "根津神社",
      "根津神社楼門",
      "Nezu Shrine",
      "Nezu-jinja Romon"
    ]
  },
  {
    "id": "jp_asakusa_jinja",
    "name": "浅草神社",
    "short": "浅草神社",
    "sub": "拜殿正面",
    "country": "JP",
    "types": [
      "shrine"
    ],
    "initialStatus": "unvisited",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "1649年建立",
    "year": 1649,
    "yearNote": "年表依据所绘现存主体的1649年建立年代，不以寺社初创传说替代。",
    "place": "日本 · 东京都 · 浅草",
    "placeKey": "jp_tokyo_asakusa",
    "lede": "浅草神社拜殿以较低而横展的木构迎接参拜者，和旁边战后重建的浅草寺本堂形成鲜明对照。现存社殿由德川家光在一六四九年建立寄进，历经火灾、地震和战争仍保留江户初期面貌。正面彩绘灵兽与朱色柱架值得细看，神社纪念的三位人物又把它和浅草寺的观音起源传说相连。",
    "facts": [
      "社殿由本殿、幣殿与拜殿组成，建筑之间以廊连接，眼前是参拜者面对的拜殿正面。低阔檐口、柱间门窗和彩绘共同形成礼拜入口，廊道向后连接更深的祭祀空间。",
      "社方记现存社殿于一六四九年由德川家光建立寄进，并避过后来的灾害与战火。表面彩漆仍经历后世修补，因此建筑年代和当前涂层年代需要分别理解。",
      "神社奉祀的三位人物与浅草寺观音缘起传说有关，神佛信仰因而在邻接地点相互关联。拜殿的灵兽装饰表达吉祥愿望，既服务仪礼，也提供细部观看的线索。"
    ],
    "caption": [
      "浅草神社 · 拜殿正面",
      "江户时代 · 1649年"
    ],
    "legacyNames": [
      "浅草神社拝殿",
      "三社様",
      "三社权现",
      "Asakusa Shrine",
      "Asakusa-jinja"
    ]
  },
  {
    "id": "jp_zojoji_sangedatsumon",
    "name": "增上寺三解脱门",
    "short": "增上寺三解脱门",
    "sub": "五间三户二重门",
    "country": "JP",
    "types": [
      "gate"
    ],
    "initialStatus": "unvisited",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "1622年建立",
    "year": 1622,
    "yearNote": "年表依据所绘现存主体的1622年建立年代，不以寺社初创传说替代。",
    "place": "日本 · 东京都 · 芝公园",
    "placeKey": "jp_tokyo_shiba",
    "lede": "三解脱门用两重深檐与五间门面把进入寺院变成庄重的一步，中央三条通道并列，上层却是安置佛像的空间。增上寺将现存门记作一六二二年再建，它保存了江户初期大寺院的尺度，也把净土宗离开贪、嗔、痴的寓意赋予通行。完整门楼的轮廓之外还有修护历史，寺方已从二〇二五年开始保存修理。",
    "facts": [
      "门为五间三户的二层二重门，正面五个柱间中三间通行，上部覆入母屋顶。楼层外缘有栏杆，两重屋檐分别强调下层通道和楼上佛像空间的层次。",
      "寺方记早期门在一六二一年风灾中倒坏，翌年再建；文化财数据库另列一六二一年。寺方再建纪年与官方记录并存，保留资料差异，并区分正在进行的保存修理。",
      "三解脱的门名关联摆脱贪、嗔、痴的宗教寓意，通行因而也成为由日常走向寺院的象征。上层供像与下层入口并置，使同一门楼兼有交通和礼拜的功能。"
    ],
    "caption": [
      "增上寺三解脱门 · 五间三户二重门",
      "江户时代 · 1622年"
    ],
    "legacyNames": [
      "増上寺",
      "増上寺三解脱門",
      "三缘山",
      "Zojoji",
      "Zōjō-ji",
      "Sangedatsumon"
    ]
  },
  {
    "id": "jp_kaneiji_kiyomizu",
    "name": "宽永寺清水观音堂",
    "short": "宽永寺清水观音堂",
    "sub": "观音堂与前方舞台",
    "country": "JP",
    "types": [
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "1631年建立 · 1694年移建",
    "year": 1631,
    "yearNote": "年表依据所绘现存主体的1631年建立年代，不以寺社初创传说替代。1694年移至现址，1996年完成保存修理。",
    "place": "日本 · 东京都 · 上野",
    "placeKey": "jp_tokyo_ueno",
    "lede": "清水观音堂的木舞台伸向上野坡地，让参拜与远眺在堂前相遇。这座观音堂借鉴京都清水寺的构想，却拥有自己的江户历史：天海在一六三一年建立，随后为宽永寺的大规模营建迁到现址。朱柱和前方舞台应作为同一建筑观看，今天的面貌又经过保存修理，不能把京都的大型高架舞台直接套在这里。",
    "facts": [
      "本堂前设木舞台，栏杆与承托结构将堂内空间延伸至坡地边缘。入母屋顶下的朱色柱架与开放平台相连，礼拜入口和观景位置因此靠得很近。",
      "天海于一六三一年建立观音堂，一六九四年因宽永寺根本中堂工程迁至现址。一九九六年完成保存修理，寺方说明恢复移筑时面貌，初建、移筑与修理应分列。",
      "观音堂借京都清水寺来组织江户的寺院景观，舞台形式也随当地地势调整。它显示名所意象可以跨城市传递，同时提醒观看者辨认每座建筑自己的结构和沿革。"
    ],
    "caption": [
      "宽永寺清水观音堂 · 观音堂与前方舞台",
      "江户时代 · 1631年"
    ],
    "legacyNames": [
      "寛永寺",
      "清水観音堂",
      "上野清水观音堂",
      "Kiyomizu Kannondo",
      "Kaneiji"
    ]
  },
  {
    "id": "jp_gokokuji_hondo",
    "name": "护国寺本堂",
    "short": "护国寺本堂",
    "sub": "本堂 · 观音堂",
    "country": "JP",
    "types": [
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "1697年建立",
    "year": 1697,
    "yearNote": "年表依据所绘现存主体的1697年建立年代，不以寺社初创传说替代。",
    "place": "日本 · 东京都 · 大塚",
    "placeKey": "jp_tokyo_otsuka",
    "lede": "护国寺本堂的宽阔铜板屋面转成青绿，下面仍是元禄时代的木构观音堂。寺院先于一六八一年创建，眼前七间见方的大殿则在一六九七年建成，两种纪年不能相互替代。三间向拜突出于正面，访客沿台阶接近檐廊时，可从近乎方整的体量与弯曲屋面读出江户祈愿寺的大堂尺度。",
    "facts": [
      "本堂桁行七间、梁间七间，单层入母屋造，正面伸出三间向拜，屋面覆瓦棒铜板。方整平面与宽大檐口相配，向拜把正面中央的礼拜入口进一步强调。",
      "寺院创建于一六八一年，现存观音堂由元禄十年的营建完成，即一六九七年。寺史与本堂建造年分开，后来屋面和构件维修也不能直接归为创寺时原物。",
      "宽大的本堂满足观音礼拜与法会的共同空间需求，传统木构并非只有小巧精致的一面。沿七间殿身观察柱网，再看三间向拜，可以理解宏大体量怎样集中礼拜方向。"
    ],
    "caption": [
      "护国寺本堂 · 本堂 · 观音堂",
      "江户时代 · 1697年"
    ],
    "legacyNames": [
      "護国寺",
      "護國寺",
      "护国寺观音堂",
      "Gokokuji",
      "Gokoku-ji Hondo"
    ]
  },
  {
    "id": "jp_ikegami_pagoda",
    "name": "池上本门寺五重塔",
    "short": "池上本门寺五重塔",
    "sub": "现存五重木塔",
    "country": "JP",
    "types": [
      "pagoda"
    ],
    "initialStatus": "unvisited",
    "dyn": "jp_edo",
    "tag": "江户",
    "era": "1608年建立",
    "year": 1608,
    "yearNote": "年表依据所绘现存主体的1608年建立年代，不以寺社初创传说替代。",
    "place": "日本 · 东京都 · 池上",
    "placeKey": "jp_tokyo_ikegami",
    "lede": "池上本门寺五重塔的深色瓦檐层层收分，五道横线托着顶上的相轮，木塔的竖向轮廓因此显得清晰。寺方记一六〇七年上梁、翌年举行落成供养，眼前这座塔属于江户初期营建。它还经历移筑与近代解体修理，完整外形不意味着每件材料都未更换，也不能以寺院更早的沿革替代塔的年代。",
    "facts": [
      "木塔以五重屋檐逐级收小，上承相轮，台基托住底层。宽檐与较窄塔身交替，立面首先呈现的是木架与屋面的层次，不等同于内部有五层可通行的楼板。",
      "寺方记庆长十二年上梁、十三年落成供养，即一六〇七至一六〇八年。塔在元禄时期曾移到现址，又有现代解体修理，主体纪年与移筑修护历史应分开阅读。",
      "五重木塔与中国砖塔都以层叠形成竖向标记，但前者更强调大屋檐和细密木架。把池上塔的檐深与砖塔短檐比较，可见材料和营造方式如何改变同类宗教建筑。"
    ],
    "caption": [
      "池上本门寺五重塔 · 现存五重木塔",
      "江户时代 · 1608年"
    ],
    "legacyNames": [
      "池上本門寺",
      "本門寺五重塔",
      "Ikegami Honmonji",
      "Honmonji Pagoda"
    ],
    "tall": true
  },
  {
    "id": "jp_shofukuji_jizodo",
    "name": "正福寺地藏堂",
    "short": "正福寺地藏堂",
    "sub": "单层裳阶禅宗佛殿",
    "country": "JP",
    "types": [
      "hall"
    ],
    "initialStatus": "unvisited",
    "dyn": "jp_muromachi",
    "tag": "室町",
    "era": "1407年建立",
    "year": 1407,
    "yearNote": "年表依据所绘现存主体的1407年建立年代，不以寺社初创传说替代。",
    "place": "日本 · 东京都 · 东村山",
    "placeKey": "jp_higashimurayama",
    "lede": "正福寺地藏堂看似有上下两层屋顶，实际是一层主屋外加低矮裳阶，方形堂身因此在紧凑体量中形成高低两圈檐线。保存修理时发现的一四〇七年墨书，让这座关东禅宗佛殿拥有明确年代。主屋木片屋面与裳阶铜板覆盖相互区别，屋顶之下又以精密木架把视线引向上方，值得从外与内两次阅读。",
    "facts": [
      "堂身三间见方，单层带裳阶，主屋入母屋顶以木片覆盖，裳阶现覆铜板。两圈檐线来自主屋和外围附加空间，不能把外观两道屋檐理解为两层楼。",
      "保存修理在尾垂木承托处发现应永十四年墨书，即一四〇七年，文化财资料据此确定建立年代。明确题记比创寺传说更直接，所记对象就是现存地藏堂。",
      "文化财研究将它与镰仓圆觉寺舍利殿比较，指出室町时期禅宗佛殿的形式高度规范。密集组物与向中央升起的内部构架，使小尺度空间也呈现精练的秩序。"
    ],
    "caption": [
      "正福寺地藏堂 · 单层裳阶禅宗佛殿",
      "室町时代 · 1407年"
    ],
    "legacyNames": [
      "正福寺",
      "正福寺地蔵堂",
      "千体地蔵堂",
      "Shofukuji",
      "Shōfuku-ji",
      "Higashimurayama"
    ]
  }
]);
