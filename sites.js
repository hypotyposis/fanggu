/* sites.js — heritage sites, their chapters, places and drawing parameters. */
const DYN = {
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
  jp_edo: { glyph: '江户', name: '日本 · 江户', acc: 'var(--jp-edo)', country: 'JP', start: 1603, end: 1867 },
};

const SITES = [
  {
    initialStatus: 'visited', id: 'kaiyuan', types: ["pagoda", "pavilion"], name: '正定开元寺', short: '开元寺', sub: '须弥塔 · 钟楼', dyn: 'tang', tag: '唐', era: '贞观十年始建', year: 636, place: '河北正定 · 古城', placeKey: 'zhengding',
    lede: '塔与钟楼在大殿前左右对峙，是唐代寺院从"以塔为中心"转向"以殿为中心"的过渡实例。这样的布局，全国只剩这一处。',
    facts: ['<b>须弥塔</b>：唐贞观十年（636）始建，方形九级密檐，通高 42.5 米，素面无饰，是唐代密檐方塔的典型。', '<b>钟楼</b>：中国现存唯一的唐代钟楼，两层三间，重檐歇山，高 14 米；下层砖墙，上层木构。', '1933 年梁思成、林徽因来正定，在这里判定钟楼下层为唐代遗构。'],
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
    initialStatus: 'visited', id: 'xian', types: ["pagoda"], name: '西安大雁塔 · 小雁塔', short: '雁塔', sub: '慈恩寺 · 荐福寺', dyn: 'tang', tag: '唐', era: '永徽三年始建 · 景龙年间', year: 704, yearLabel: '704 · 707', place: '陕西西安 · 长安城南', placeKey: 'xian',
    lede: '大雁塔与小雁塔隔着三公里对望：一座楼阁式，一座密檐式，唐塔的两种样子都在长安。大雁塔永徽三年（652）玄奘为藏经而建，武周长安年间（701–704）改为七层；小雁塔景龙年间（707–710）建于荐福寺，十五级密檐震落两级，剩十三级。',
    facts: ['<b>大雁塔</b>方形七层楼阁式砖塔，通高 64.5 米，底边 25.5 米；西门楣上的唐代佛殿线刻，是唐代建筑最可靠的图像之一。', '<b>小雁塔</b>方形密檐式，通高 43.4 米，原十五级；明成化地震塔身裂开，正德地震又复合，"三裂三合"之说由此而来。', '一为藏经、一为舍利，都在长安城南的寺院里，是唐长安城内仅存的两座塔。'],
    caption: ['立面示意 · 楼阁式与密檐式', '大雁塔 64.5 m · 小雁塔 43.4 m'],
    draw: () => Buildings.towerPair({ ax: 250, bx: 560,
      a: { sides: 4, base: [{ w: 230, h: 12 }], storeys: Array.from({ length: 7 }, (_, i) => ({ w: 196 * Math.pow(.9, i), wallH: 46 - i * 3.5, pil: i ? 5 : 9, lintel: true, door: 'arch', doorW: 12, doorH: 16, eave: 'brick', outStep: 5, outL: 4, inL: 3, courseH: 3.2, noteEave: i === 2 ? '叠涩檐 · 砖砌' : undefined, noteWall: i === 4 ? '砖柱 · 阑额' : undefined })), top: { type: 'pyramid', h: 34, w: 60, stupa: { bulbW: 18, bulbH: 16, rings: 2, ringW: 10, ringH: 5 } } },
      b: { sides: 4, base: [{ w: 170, h: 12 }], storeys: [{ w: 150, wallH: 70, door: 'arch', doorW: 18, doorH: 30, eave: 'brick', outStep: 5, outL: 4, inL: 3, courseH: 2.6 }, ...Array.from({ length: 12 }, (_, i) => ({ w: 150 * (1 - .0035 * (i + 1) * (i + 1)) * .98, wallH: 3, door: (i % 2) ? 'none' : 'arch', doorW: 8, doorH: 5, eave: 'brick', outStep: 5, outL: 4, inL: 3, courseH: 2.3 }))], top: { type: 'cap', w: 50, courses: 2, step: 6, stupa: null, note: '塔顶震毁' } },
      aNote: '大雁塔 · 楼阁式', bNote: '小雁塔 · 密檐式', aDim: '底边 25.5 m', aV: '64.5 m', bDim: '荐福寺塔', bV: '43.4 m' }),
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
    lede: '中国现存最早的木构建筑。唐武宗会昌灭法，天下寺院拆毁殆尽，它因为地处偏僻的小村而逃过一劫。',
    facts: ['<b>面阔三间</b>，单檐歇山，屋面平缓，出檐深远，是典型的唐代小殿。', '殿内<b>十七尊唐塑</b>与建筑同龄，是大陆唐塑最完整的一堂。', '现存唐代木构仅四座，皆在山西——此行见其二。'],
    caption: ['立面示意 · 面阔三间', '单檐歇山'],
    draw: () => Buildings.hall({ bays: 3, bw: 118, colH: 84, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.9, tiers: 2, interm: 0, overhang: 96, roofH: 150, ridgeRatio: .48, gableH: 54, platH: 18, platPad: 40, lift: 16, chiwen: 40, chiStyle: 'tang', puzuo: '五铺作 · 无补间', dimLabel: '面阔 11.62 m' }),
  },
  {
    initialStatus: 'visited', id: 'foguang', types: ["hall"], name: '佛光寺东大殿', short: '佛光寺', dyn: 'tang', tag: '唐', era: '大中十一年', year: 857, place: '山西五台 · 豆村', placeKey: 'wutai',
    lede: '1937 年 6 月，梁思成、林徽因在殿内梁下读出"女弟子宁公遇"的题记，日本学者"中国已无唐构"的断言就此作废。',
    facts: ['<b>面阔七间</b>，单檐庑殿。斗拱高度近柱高之半，出檐近四米——后世再没有这样的比例。', '唐代<b>建筑、塑像、壁画、题记</b>同存一殿，梁思成称之为"四绝"。', '殿前的经幢刻有"大中十一年"，是断代的另一件铁证。'],
    quote: '"这是我们这些年的搜寻中所遇到的唯一唐代木建筑……国内古建筑之第一瑰宝。" <b>——梁思成《记五台山佛光寺的建筑》</b>',
    caption: ['立面示意 · 面阔七间', '单檐庑殿'],
    draw: () => Buildings.hall({ bays: 7, bw: 80, colH: 96, fills: ['win', 'door', 'door', 'door', 'door', 'door', 'win'], roof: 'hip', bracketS: 2.2, tiers: 3, interm: 1, intermS: .5, intermTiers: 2, intermLudou: false, ang: 2, overhang: 96, roofH: 150, ridgeRatio: .62, ridgeOrn: true, platH: 20, platPad: 48, lift: 12, chiwen: 36, chiStyle: 'tang', puzuo: '七铺作 · 双杪双下昂 · 补间出双杪', dimLabel: '面阔 34.0 m' }),
  },
  {
    initialStatus: 'visited', id: 'gongchen', types: ["pagoda"], name: '临安功臣塔', short: '功臣塔', sub: '功臣山', dyn: 'zhou', tag: '五代', era: '后梁贞明元年', year: 915, place: '浙江临安 · 功臣山', placeKey: 'linan',
    lede: '后梁贞明元年（915），吴越王钱镠在自己发迹的功臣山上建塔。方形五层，砖砌仿木，浙江现存最早的方塔，样子还是唐人的。',
    facts: ['通高 25.3 米，塔身五层高 22.06 米；砖砌倚柱、阑额、斗拱，仿木构楼阁式。', '每层四面辟壶门，叠涩出檐；铁刹。', '钱镠生于临安，功臣山因他而得名；塔旁功臣寺仅存遗址。'],
    caption: ['立面示意 · 方形五层', '砖仿木 · 五代'],
    tall: true,
    draw: () => Buildings.tierTower({ w: 560, h: 800, sides: 4, base: [{ w: 240, h: 16 }, { w: 200, h: 10, stairs: false }],
      storeys: Array.from({ length: 5 }, (_, i) => ({ w: 176 * Math.pow(.93, i), wallH: 84 - i * 4, pil: 3, lintel: true, door: 'arch', doorW: 20, doorH: 30 - i * 2, bs: .6, tiers: 2, eave: 'brick', outStep: 5, outL: 3, inL: 2, courseH: 5, noteBs: i === 1 ? '砖砌斗拱 · 仿木' : undefined, noteWall: i === 3 ? '倚柱 · 阑额 · 壶门' : undefined })),
      top: { type: 'cap', w: 110, courses: 3, step: 12, stupa: { bulbW: 24, bulbH: 22, rings: 4, ringW: 14, ringH: 5 }, note: '铁刹' }, dimLabel: '方形 · 五层', vLabel: '通高 25.3 m' }),
  },
  {
    initialStatus: 'visited', id: 'longmen', types: ["hall"], name: '龙门寺西配殿', short: '龙门寺', dyn: 'zhou', tag: '五代', era: '后唐同光三年', year: 925, place: '山西平顺 · 浊漳河谷 · 源头村', placeKey: 'pingshun',
    lede: '五代十国五十三年，全国留下的木构只有五座，三座在浊漳河谷。龙门寺西配殿是其中最早的一座，也是唯一一座悬山顶——三间小殿，阑额不出头，柱上没有普拍枋，仍是唐人的做法。',
    facts: ['后唐同光三年（925）建，一说清泰二年（935）；<b>面阔三间</b>，进深四椽，单檐悬山。', '龙门寺一寺之内，五代、宋、金、元、明、清六朝建筑齐聚：大雄宝殿宋绍圣五年（1098），天王殿金，燃灯佛殿元。', '斗拱只在柱头，斗口跳，无补间——比南禅寺还要简省。'],
    caption: ['西配殿立面示意 · 面阔三间', '单檐悬山 · 五代'],
    draw: () => Buildings.hall({ bays: 3, bw: 100, colH: 84, fills: ['win', 'door', 'win'], roof: 'gable', bracketS: 1.4, tiers: 1, interm: 0, overhang: 52, roofH: 92, ridgeRatio: 1, chiwen: 16, ridgeOrn: true, lift: 4, platH: 14, platPad: 26, depth: 150, puzuo: '斗口跳 · 无补间', dimLabel: '面阔三间 · 进深四椽' }),
  },
  {
    initialStatus: 'visited', id: 'tiantai', types: ["hall"], name: '天台庵', short: '天台庵', sub: '王曲村', dyn: 'zhou', tag: '五代', era: '后唐长兴四年', year: 933, place: '山西平顺 · 浊漳河谷 · 王曲村', placeKey: 'pingshun',
    lede: '一座三间的小殿，长期被当作"四座唐构"之一。2014 年修缮时在梁上发现题记，才知它建于后唐长兴四年（933）——晚了唐朝二十六年，却仍是唐人的样子。',
    facts: ['<b>面阔三间</b>，单檐歇山，前檐四柱立在墙外，出檐深远，翘角高扬。', '斗拱极简，柱头只用斗口跳，没有补间；殿内彻上露明，梁架一目了然。', '殿前有唐代石幢、明清碑刻；殿身虽小，却是浊漳河谷三座五代建筑里最"唐"的一座。'],
    caption: ['立面示意 · 面阔三间', '单檐歇山 · 五代'],
    draw: () => Buildings.hall({ bays: 3, bw: 100, colH: 80, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.3, tiers: 1, interm: 0, overhang: 92, roofH: 122, ridgeRatio: .36, gableH: 42, lift: 22, chiwen: 24, ridgeOrn: true, platH: 24, platPad: 40, puzuo: '斗口跳 · 出檐深远', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'dayun', types: ["hall"], name: '大云院弥陀殿', short: '大云院', dyn: 'zhou', tag: '五代', era: '后晋天福五年', year: 940, place: '山西平顺 · 浊漳河谷 · 实会村', placeKey: 'pingshun',
    lede: '后晋天福五年（940）建的弥陀殿，殿内留着二十余平方米的五代壁画——中国现存寺观壁画里，五代的只此一处。',
    facts: ['<b>面阔三间</b>，进深六椽，单檐歇山；斗拱五铺作双杪，每间用补间一朵。', '殿内东壁与扇面墙背面的<b>五代壁画</b>《维摩经变》等，是唐宋之间壁画的孤本。', '寺前双林寺式的石经幢与山门皆为后代，但弥陀殿的梁架仍是五代原物。'],
    caption: ['弥陀殿立面示意 · 面阔三间', '单檐歇山 · 五代'],
    draw: () => Buildings.hall({ bays: 3, bw: 110, colH: 90, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.7, tiers: 2, interm: 1, intermS: .7, overhang: 80, roofH: 130, ridgeRatio: .42, gableH: 40, lift: 14, chiwen: 26, platH: 26, platPad: 44, puzuo: '五铺作 · 双杪 · 补间一朵', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'wenfeng', types: ["pagoda"], name: '文峰塔', sub: '原名天宁寺塔', dyn: 'zhou', tag: '周', era: '广顺二年', year: 952, place: '河南安阳 · 老城', placeKey: 'anyang',
    lede: '五代五十三年，中原少有木构留存，这座砖塔是那段乱世少见的遗存。它上大下小、形如伞盖，在中国古塔里几乎找不到第二例。',
    facts: ['<b>五层八角</b>，逐层外展，每层以叠涩砖檐挑出，最上一层最宽。', '塔顶不是寻常的塔刹，而是一座<b>藏式喇嘛塔</b>，高约十米。', '塔身八面砖雕佛传故事；塔内有梯，可登顶远望。', '清乾隆年间，彰德知府黄邦宁题"文峰耸秀"，塔由此改名。'],
    caption: ['立面示意 · 五层八角', '上大下小 · 砖构'],
    tall: true,
    draw: () => Buildings.brickPagoda({ storeys: 5, w0: 214, grow: .06, firstH: 188, wallH: 30, bs: .62, over: 30, band: 28, bulb: 92, cone: 60, dimLabel: '顶檐 : 底檐 ≈ 1.2 : 1', vLabel: '通高 38.65 m' }),
  },
  {
    initialStatus: 'visited', id: 'chongming', types: ["hall"], name: '高平崇明寺', short: '崇明寺', sub: '中佛殿 · 圣佛山', dyn: 'song', tag: '宋', era: '开宝四年', year: 971, place: '山西高平 · 河西镇 · 郭家庄村', placeKey: 'gaoping',
    lede: '圣佛山东麓，中佛殿低缓的屋面压在硕大的斗拱之上。北宋开宝四年（971）建成的三间小殿，殿内却没有一根内柱；抬头看梁架，短木在空中接成长梁，是古人用小材撑起大空间的办法。',
    facts: ['<b>面阔三间</b>，进深六椽，单檐歇山；中佛殿为北宋遗构，后殿则是后世建筑。', '柱头<b>七铺作，双杪双下昂</b>，出檐深远；不施普拍枋，阑额不出头，保留早期木构的做法。', '殿内以双栿系统承托屋架，部分梁材分段对接，俗称<b>“断梁”</b>；这套构造使三间殿堂内部通透无柱。'],
    caption: ['中佛殿线稿 · 面阔三间', '七铺作 · 单檐歇山 · 北宋'],
    draw: () => Buildings.hall({ bays: 3, bw: 108, colH: 88, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 2, tiers: 3, ang: 2, interm: 0, overhang: 94, roofH: 110, ridgeRatio: .5, gableH: 34, lift: 10, chiwen: 24, platH: 22, platPad: 40, puzuo: '七铺作 · 双杪双下昂', dimLabel: '面阔三间 · 进深六椽' }),
  },
  {
    initialStatus: 'visited', id: 'longxing', types: ["hall", "pavilion"], name: '隆兴寺', sub: '摩尼殿 · 大悲阁 · 转轮藏', dyn: 'song', tag: '宋', era: '开宝四年', year: 971, place: '河北正定 · 古城', placeKey: 'zhengding',
    lede: '隋开皇六年始建的龙藏寺，到宋太祖手里被敕令扩建，铸起二十一米的铜观音。它是北宋官式建筑保存最完整的一处。',
    facts: ['<b>摩尼殿</b>（皇祐四年，1052）平面十字形，四面出抱厦，山面朝前，重檐歇山——梁思成称"海内孤例"。', '<b>大悲阁</b>内千手千眼观音铜像高 21.3 米，四十二臂，宋开宝四年铸，宋代铜铸之最。', '<b>转轮藏</b>是现存最早的可转动藏经架，本身就是一座宋代小木作的楼阁。', '摩尼殿内明代悬塑<b>倒坐观音</b>，鲁迅曾把它的照片摆在案头，称为"东方美神"。'],
    caption: ['摩尼殿立面示意 · 面阔七间', '重檐歇山 · 抱厦四出'],
    draw: () => Buildings.crossHall({ bays: 7, bw: 74, colH: 84, fills: ['wall', 'win', 'door', 'door', 'door', 'win', 'wall'], fills2: ['wall', 'win', 'win', 'win', 'wall'], bracketS: 1.5, ang: 1, overhang: 62, skirtH: 56, colH2: 36, roofH: 142, gableH: 56, porchColH: 72, porchOver: 30, gableW: 132, porchRise: 44, gableRise: 56, chiwen: 30, platH: 22, platPad: 40, dimLabel: '面阔 35.0 m' }),
  },
  {
    initialStatus: 'visited', id: 'yuanqi', types: ["hall", "pagoda"], name: '潞城原起寺', short: '原起寺', sub: '大雄宝殿 · 青龙塔', dyn: 'song', tag: '宋', era: '唐天宝六年创建 · 现存宋构', year: 1000, yearLabel: '宋', place: '山西潞城 · 浊漳河畔 · 辛安村', placeKey: 'pingshun',
    lede: '寺在浊漳河边一座孤峰的顶上，唐天宝六年（747）创建。现存大雄宝殿与青龙塔都是宋代的：一殿一塔并立在崖顶，从河谷仰望，塔影先入眼。',
    facts: ['<b>大雄宝殿</b>面阔三间，单檐歇山，翘角高扬，是晋东南宋殿的典型。', '<b>青龙塔</b>八角七级楼阁式砖塔，宋构；塔与殿并列于寺东，不在中轴线上。', '寺内存唐代石经幢、北魏残碑，"悟空"游戏走红后，这里成了取景地之一。'],
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
    lede: '唐代宗年间始建，宋庆历五年（1045）在唐塔残址上重修，金皇统五年（1145）再修上部。下面四层是宋代的砖，上面五层是金代的砖木——它把两个朝代叠在了一座塔上。',
    facts: ['八角<b>九层</b>楼阁式，砖木混构，高 41 米，立于八角形台基之上。', '第四层中心竖一根直达塔顶的<b>木塔心柱</b>，各层以八根放射状扒梁与外檐相连，这种做法国内现存仅此一例。', '与开元寺须弥塔、广惠寺华塔、临济寺澄灵塔并称"正定四塔"，此行见其三。'],
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
    lede: '浊漳河南岸的一座小寺，只剩一座北宋佛殿。殿只有三间、一百三十一平方米，却完整地保留着宋代的梁架，殿内四壁是元代的二十四诸天。',
    facts: ['<b>面阔三间</b>，进深四椽，单檐歇山；柱头铺作四铺作，补间一朵。', '殿内<b>元代壁画</b>二十四诸天，是浊漳河谷少见的元代壁画。', '与淳化寺、九天圣母庙、回龙寺同为平顺境内的宋金庙宇。'],
    caption: ['佛殿立面示意 · 面阔三间', '单檐歇山 · 北宋'],
    draw: () => Buildings.hall({ bays: 3, bw: 100, colH: 84, fills: ['wall', 'door', 'wall'], roof: 'gablehip', bracketS: 1.5, tiers: 2, interm: 1, intermS: .8, overhang: 74, roofH: 122, ridgeRatio: .42, gableH: 38, lift: 16, chiwen: 22, platH: 16, platPad: 30, puzuo: '四铺作 · 补间一朵', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'liaodi', types: ["pagoda"], name: '定州开元寺塔', short: '料敌塔', sub: '料敌塔', dyn: 'song', tag: '宋', era: '咸平四年始建 · 至和二年成', year: 1055, place: '河北定州 · 古城', placeKey: 'dingzhou',
    lede: '宋真宗咸平四年（1001）开工，至和二年（1055）落成，前后五十四年。八十三米七，是中国现存最高的砖塔；定州地处宋辽边境，登塔可望契丹军情，故名"料敌"。',
    facts: ['八角<b>十一层</b>楼阁式砖塔，通高 <b>83.7 米</b>，逐层收分，塔内有梯可登顶。', '每层券门与假窗交错，叠涩砖檐之上再起平座，层层如此，全靠砖砌。', '清光绪十年（1884）东北面塔身坍塌，缺口豁开百余年，二十世纪末才修复完整，故有"缺憾之美"之说。'],
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
    lede: '现存八座辽代木构之一。它不大，却把辽代的手法都用上了：减柱、移柱，殿内只留四根柱子；斗拱硕大，高度近柱高的三分之一。',
    facts: ['<b>面阔五间</b> 25.8 米，进深三间 14.5 米，高 12.08 米，单檐庑殿。', '檐柱一周施斗拱三十朵：柱头十二、补间十四、转角四；斗拱总高 1.41 米，与柱高之比 1 : 3.41。', '殿内用<b>减柱造</b>与移柱造，仅立柱四根，空间因此开阔。'],
    caption: ['立面示意 · 面阔五间', '单檐庑殿 · 减柱造'],
    draw: () => Buildings.hall({ bays: 5, bw: 100, colH: 96, fills: ['wall', 'win', 'door', 'win', 'wall'], roof: 'hip', bracketS: 2.0, tiers: 2, interm: 1, overhang: 84, roofH: 156, ridgeRatio: .56, platH: 20, platPad: 46, lift: 14, chiwen: 30, puzuo: '五铺作 · 补间十四', dimLabel: '面阔 25.8 m' }),
  },
  {
    initialStatus: 'visited', id: 'huayan', types: ["hall"], name: '华严寺', sub: '薄伽教藏殿 · 大雄宝殿', dyn: 'liao', tag: '辽', era: '重熙七年', year: 1038, place: '山西大同 · 古城', placeKey: 'datong',
    lede: '契丹人拜日，所以整座寺院坐西朝东。辽代的薄伽教藏殿藏着壁藏与天宫楼阁，金代重建的大雄宝殿则是现存辽金佛殿里最大的一座。',
    facts: ['<b>大雄宝殿</b>（金天眷三年，1140 重建）面阔九间，五十三米，立在四米高的台基上；正脊鸱吻高 4.5 米，为中国古建之最。', '<b>薄伽教藏殿</b>（辽重熙七年，1038）内三十八间壁藏，中间以圜桥相连的"天宫楼阁"，梁思成誉为"海内孤品"。', '殿内辽塑<b>合掌露齿菩萨</b>，郑振铎称为"东方维纳斯"。'],
    caption: ['大雄宝殿立面示意 · 面阔九间', '单檐庑殿 · 高台'],
    draw: () => Buildings.hall({ bays: 9, bw: 64, colH: 92, fills: ['wall', 'wall', 'win', 'win', 'door', 'win', 'win', 'wall', 'wall'], roof: 'hip', bracketS: 1.6, tiers: 2, interm: 1, overhang: 62, roofH: 194, ridgeRatio: .6, platH: 46, platPad: 44, lift: 18, chiwen: 44, puzuo: '五铺作 · 双杪', dimLabel: '面阔 53.9 m' }),
  },
  {
    initialStatus: 'visited', id: 'yingxian', types: ["pagoda"], name: '应县木塔', short: '木塔', sub: '佛宫寺释迦塔', dyn: 'liao', tag: '辽', era: '清宁二年', year: 1056, place: '山西朔州 · 应县', placeKey: 'yingxian',
    lede: '六十七米、纯木、九百七十年。它是世界上现存最高、最古老的木塔，经历过多次地震与炮击，至今仍立在桑干河畔。',
    facts: ['八角五层六檐，<b>明五暗四</b>共九层；一层副阶周匝，外观六重檐。', '全塔用<b>五十四种斗拱</b>，被称为"斗拱博物馆"；各层以平座相接，逐层收分。', '一层释迦坐像高十一米；1974 年在塔内佛像中发现辽代<b>佛牙舍利</b>与经卷。', '通高 <b>67.31 米</b>，与意大利比萨斜塔、法国埃菲尔铁塔并称"世界三大奇塔"。'],
    caption: ['立面示意 · 八角五层', '楼阁式 · 六檐'],
    tall: true,
    draw: () => Buildings.woodPagoda({ storeys: [{ porch: 300, w: 232, colH: 42, bs: 1.05, over: 40, band: 26 }, { w: 214, colH: 28, bs: .95, over: 38, band: 22 }, { w: 197, colH: 27, bs: .9, over: 36, band: 21 }, { w: 181, colH: 26, bs: .85, over: 34, band: 20 }, { w: 167, colH: 25, bs: .8, over: 32, band: 20 }], topH: 50, shaH: 84, dimLabel: '底层直径 30.27 m', vLabel: '通高 67.31 m' }),
  },
  {
    initialStatus: 'visited', id: 'tianning', types: ["pagoda"], name: '北京天宁寺塔', short: '天宁寺塔', sub: '广安门外', dyn: 'liao', tag: '辽', era: '天庆九年至十年', year: 1120, place: '北京 · 广安门', placeKey: 'beijing',
    lede: '辽天庆九年至十年（1119–1120）建，八角十三层密檐，通高 57.8 米，北京城里最老的地上建筑。须弥座上三层仰莲托起高大的塔身，再往上十三层檐一层压一层，越收越紧。',
    facts: ['塔身八面：正四面券门，两侧砖雕金刚与菩萨；斜四面直棂窗。', '十三层密檐皆以砖仿木斗拱承托，檐距逐层缩短，梁思成说它"富有音乐的韵律"。', '实心砖塔，不可登临；辽南京城内唯一留存至今的辽代建筑。'],
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
    lede: '辽代的大雄宝殿，金代的三圣殿、山门和普贤阁，沿一条中轴线完整排开——这是现存规模最大、布局最完整的辽金寺院。',
    facts: ['<b>大雄宝殿</b>为辽构，面阔七间，殿内辽金彩塑三十三尊：五方佛端坐，二十四诸天分列两侧。', '<b>三圣殿</b>（金天会六年至皇统三年，1128–1143）减柱造，硕大的斜拱层层张开，如花绽放。', '<b>普贤阁</b>是金代的两层楼阁，平座勾阑，歇山顶，是研究辽金楼阁的少数实例。'],
    caption: ['普贤阁立面示意 · 面阔三间', '两层楼阁 · 平座 · 歇山'],
    draw: () => Buildings.pavilion({ bays: 3, bw: 80, colH: 84, fills: ['wall', 'door', 'wall'], fills2: ['wall', 'door', 'wall'], bracketS: 1.5, overhang: 54, skirtH: 44, inset: 14, colH2: 58, roofH: 126, gableH: 44, platH: 20, platPad: 36, dimLabel: '面阔 10.6 m' }),
  },
  {
    initialStatus: 'visited', id: 'chunhua', types: ["hall"], name: '平顺淳化寺', short: '淳化寺', sub: '正殿 · 阳高村', dyn: 'liao', tag: '金', era: '金大定九年前', year: 1160, yearLabel: '金', place: '山西平顺 · 浊漳河谷 · 阳高村', placeKey: 'pingshun',
    lede: '北齐创建的老寺，只剩一座金代正殿。殿前两座北宋开宝三年（970）的石经幢，刻着《尊胜陀罗尼经》与《金刚经》，比殿还老两百年。',
    facts: ['正殿<b>面阔三间</b>，进深六椽，单檐歇山，彻上露明造。', '斗拱<b>四铺作单杪</b>，昂作批竹式——宋金之际的做法。', '年代据碑记在金大定九年（1169）之前。'],
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
    lede: '浊漳河谷里祀大禹的小庙，元至元二年（1336）建。一进院落：山门上倒座着戏台，正殿三间是元代的，东西配殿明清补建——一座村庙的完整格局。',
    facts: ['正殿<b>面阔三间</b>，单檐悬山，元构；用材粗放，梁架多自然弯材，是元代地方做法。', '山门为明代建筑，上层倒座戏台面向正殿。', '俗称禹王庙，浊漳河屡有水患，祀禹以镇之。'],
    caption: ['正殿立面示意 · 面阔三间', '单檐悬山 · 元'],
    draw: () => Buildings.hall({ bays: 3, bw: 100, colH: 84, fills: ['win', 'door', 'win'], roof: 'gable', bracketS: 1.3, tiers: 1, interm: 1, intermS: .8, overhang: 50, roofH: 96, ridgeRatio: 1, chiwen: 18, lift: 5, platH: 16, platPad: 28, depth: 170, puzuo: '元 · 四铺作', dimLabel: '面阔三间' }),
  },
  {
    initialStatus: 'visited', id: 'jiutian', types: ["hall"], name: '九天圣母庙', short: '圣母庙', sub: '献殿 · 东河村', dyn: 'yuan', tag: '宋元', era: '宋建中靖国元年重修 · 献殿元构', year: 1300, yearLabel: '元', place: '山西平顺 · 浊漳河谷 · 东河村', placeKey: 'pingshun',
    lede: '唐代创建，圣母殿北宋初重建，建中靖国元年（1101）全庙重修。殿前的元代献殿最特别：进深五间比面阔三间还长，正脊顺着进深方向，顶上用的是等级最高的庑殿。从院里正面看到的是它的山面，所以这里画的是它的长边——正脊与两只鸱吻都在这一面。',
    facts: ['<b>献殿</b>元构，面阔三间、进深五间，四周十六根抹角砂石方柱，四面开敞；斗拱四铺作单杪，立在一米高的青石台基上。', '献殿、正殿、舞楼三座殿顶的角檐相互穿插，当地称"勾心斗角"。', '<b>圣母殿</b>宋构，面阔三间单檐歇山；一座村庙里宋、元、明、清四朝木构前后相接。'],
    caption: ['献殿侧立面示意 · 进深五间', '庑殿顶 · 正脊沿进深 · 元'],
    draw: () => Buildings.hall({ bays: 5, bw: 76, colH: 96, fills: ['open', 'open', 'open', 'open', 'open'], roof: 'hip', bracketS: 1.5, tiers: 1, interm: 1, intermS: .8, overhang: 72, roofH: 140, ridgeRatio: .5, lift: 16, chiwen: 26, platH: 30, platPad: 34, puzuo: '四铺作 · 单杪 · 石柱', ridgeNote: '正脊沿进深 · 院内正面见山面', dimLabel: '进深五间（面阔三间在另一面）' }),
  },
  {
    initialStatus: 'visited', id: 'shuanglin', types: ["hall"], name: '平遥双林寺', short: '双林寺', sub: '天王殿 · 彩塑', dyn: 'ming', tag: '明', era: '北齐武平二年重修 · 明初重建', year: 1400, yearLabel: '明初', place: '山西平遥 · 桥头村', placeKey: 'pingyao',
    lede: '北魏始建的中都寺，北齐武平二年（571）重修，现存殿宇多为明初重建。它以彩塑闻名：十座殿堂里两千余尊明代彩塑，被称为"东方彩塑艺术长廊"。',
    facts: ['寺外围墙为明代所筑，形如堡垒；内分三进院落、十座殿堂。', '<b>天王殿</b>前廊立四大金刚，各高三米余；<b>千佛殿</b>内的<b>韦驮</b>像扭身按剑，是明代彩塑的名作。', '全寺彩塑二千零五十二尊，完好者一千五百六十六尊，大者丈余、小者尺许。'],
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
    lede: '明永乐十年（1412）动工，宣德三年（1428）建成，九层八角，高 78.2 米，通体白瓷砖与五色琉璃，塔上百余盏灯夜夜长明——欧洲人叫它"南京瓷塔"，列入中世纪世界七大奇迹。1856 年毁于太平天国战火，如今原址上立着一座玻璃复原塔。',
    facts: ['琉璃塔九层八面，每层平座勾阑，檐角悬铃，通高 <b>78.2 米</b>，明代南京最高的建筑。', '塔身白瓷砖贴面，拱门用五色琉璃拼出狮象、飞羊、金翅鸟。', '毁后原址发掘出地宫与七宝阿育王塔；2015 年建成的复原塔用轻钢与玻璃，只取轮廓，不复砖身。'],
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
    lede: '明正德十年（1515）动工，嘉靖六年（1527）完成。八角十三级，通高 47.31 米，通体贴五色琉璃：赤橙黄绿青蓝紫，日光下如一道彩虹，故名飞虹。',
    facts: ['中国现存最大、最完整的<b>琉璃塔</b>；一层外有木构回廊，塔身逐层急剧收分。', '各层檐下琉璃仿木斗拱、佛龛、力士、盘龙，色彩至今未褪。', '1986 年版《西游记》"唐僧扫塔"一集即在此拍摄；下寺元代壁画则早年流散海外。'],
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
    "lede": "义县古城里，奉国寺大雄殿把九间立面铺展在一整片庑殿屋顶之下。七尊辽代彩塑佛像并坐殿内，与梁架上的飞天彩画相对；木构、塑像和彩绘共同保存了十一世纪的营造面貌。",
    "facts": [
      "奉国寺始建于辽开泰九年（1020），现存主体大雄殿为辽代建筑。",
      "大雄殿面阔九间、进深五间，单檐庑殿顶，殿前中央七间开门。",
      "1961年列入首批全国重点文物保护单位；殿内保存七尊辽代彩塑佛像及辽代梁架彩画。"
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
    "lede": "两座辽塔南北相望，把木构楼阁的柱、窗与斗拱凝固在砖中。北塔六层，南塔五层，高低不同的轮廓组成涿州古城的标志。",
    "facts": [
      "北为云居寺塔，六层；南为智度寺塔，五层。两塔同为八角楼阁式仿木构砖塔。",
      "智度寺塔建于辽太平十一年（1031），高44米；各正面为券门，斜面为假直棂窗。",
      "云居寺塔建造年代有重熙年间与大安八年等不同考证，本条保留十一世纪概称，不将争议年份写成定论。"
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
    "lede": "涞源县城里，阁院寺文殊殿以三间宽阔立面和低缓的歇山屋面保留着辽代木构的气度。檐下硕大斗栱与古老棂花窗相接，木构骨架之外，细小的门窗装修也延续着千年手艺。",
    "facts": [
      "文殊殿为辽代木构，文博资料通常定年于辽应历十六年（966）；元明曾有修葺。",
      "面阔与进深各三间，单檐歇山；殿内采用减柱做法，仅用两根内柱。",
      "阁院寺1996年列入第四批全国重点文物保护单位；文殊殿保存部分辽代棂花格子门窗。"
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
    "lede": "宝顶山的岩壁上，观音的手臂向四周展开。主尊低眉合十，密集手势与法器让南宋匠人的构思凝成一龛。",
    "facts": [
      "<b>所绘局部</b>：宝顶山大佛湾第8号龛千手观音主尊及邻近手臂；不是整龛全景。",
      "<b>南宋营造</b>：造像开凿于淳熙至淳祐年间，属于赵智凤主持营建的宝顶山石窟。",
      "<b>放射构图</b>：全龛占据约88平方米崖面，手臂向两侧和上方展开，手中各执器物。"
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
    "lede": "一膝翘起，一手轻撑石台。毗卢洞的水月观音以舒展的游戏坐，把宋代石刻的从容留在岩壁上。",
    "facts": [
      "<b>所绘主尊</b>：毗卢洞水月观音，俗称紫竹观音；并非安岳石刻全景。",
      "<b>游戏坐</b>：右膝屈起，右手垂膝；左手撑台，左足下垂于莲台，姿态舒展。",
      "<b>两宋遗珍</b>：毗卢洞造像开凿于两宋，延续至明清，2001年列入第五批全国重点文物保护单位。"
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
    "lede": "蔚州古城北墙上，靖边楼以三道檐口展开，却只有上下两层。上层回廊绕阁一周，城防楼阁与玉皇信仰在这里叠合。",
    "facts": [
      "明洪武十年（1377）建，又称靖边楼，是蔚州古城北城垣上的标志性楼阁。",
      "大殿面阔五间，三檐两层，歇山琉璃顶；一道腰檐使两层楼阁形成三檐外观。",
      "上层设围绕建筑的木构游廊，下层有围廊；现存建筑保存了明清多次修缮的历史层次。"
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
    "lede": "两重飞檐下，八条木雕龙盘绕前柱。圣母殿以深广的柱廊和层叠斗栱，留下北宋殿堂的空间秩序。",
    "facts": [
      "<b>七间重檐</b>：圣母殿面阔七间、进深六间，采用重檐歇山顶。",
      "<b>副阶周匝</b>：殿外四周围廊，前廊尤其深广；八根前檐柱上装饰木雕盘龙。",
      "<b>重修纪年</b>：北宋崇宁元年（1102）重修，现存主体格局由此形成；图示为圣母殿，不含鱼沼飞梁。"
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
    "lede": "辽庆州城的白塔立于草原，七级塔身以砖仿木。门窗、天王浮雕与层层斗拱交织，保存了契丹佛塔精细而华丽的面貌。",
    "facts": [
      "始建于重熙十六年（1047），重熙十八年（1049）竣工。",
      "八角七级楼阁式塔，砖雕斗拱上承木质檐椽。",
      "位于辽庆州城遗址西北部，亦称释迦佛舍利塔。"
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
    "lede": "屏山南麓，华林寺大殿以四根粗壮前檐柱托起宽阔屋面。北宋乾德二年，吴越郡守鲍修让营建这座寺院；硕大的斗栱与深远的出檐，留下唐五代木构和闽地营造的痕迹。",
    "facts": [
      "始建于964年，初名越山吉祥禅院，由吴越国福州郡守鲍修让营建；1444年改称华林寺。",
      "现存大殿正面三间、单檐歇山，18根木柱共同构成殿身，斗栱用材硕大。",
      "1982年列入第二批全国重点文物保护单位。"
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
    "lede": "主尊端坐，天宫从头顶层层展开。悬起的楼阁、群像与帷幔，把不足一百七十平方米的殿堂塑成了立体佛国。",
    "facts": [
      "<b>木骨泥塑</b>：大雄宝殿以木骨泥质悬塑构成群像，再贴金敷彩，人物、楼阁与装饰层层叠置。",
      "<b>方寸佛国</b>：殿堂面积约169.6平方米，容纳近两千尊彩塑；大小人物与天宫建筑共同营造纵深。",
      "<b>明末清初</b>：寺院创建于明代，现存悬塑属于明末清初营造阶段。图版取中央主龛及天宫楼阁局部。"
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
    "lede": "两座三层飞楼贴着绝壁渐次升高，狭窄栈道把殿阁串联起来。细长立柱与伸入山岩的构架，共同构成悬空寺轻巧而险峻的轮廓。",
    "facts": [
      "<b>明清遗构</b>：寺院有北魏创建的沿革，现存建筑则为历代重修后的明清遗构。图版按现存主体断代。",
      "<b>南北二楼</b>：南北两座三层楼阁高低错落，以贴崖栈道相连，左侧另有较低的寺院建筑。",
      "<b>三教同殿</b>：最高处的三教殿合祀释迦牟尼、老子与孔子，体现儒、释、道共处的寺院格局。"
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
    "lede": "永安禅寺的传法正宗殿以宽阔庑殿屋顶压住五间立面，脊饰与深檐相映。元延祐二年营建的殿堂内，水陆壁画汇集儒释道人物，木构与绘画共同构成浑源古城的珍贵遗存。",
    "facts": [
      "永安寺始建于金代；现存传法正宗殿由高璞在元延祐二年（1315）捐资营建。",
      "正殿面阔五间，单檐庑殿顶；中三间设门，两端实墙保留大型书法题刻。",
      "永安寺2001年列入第五批全国重点文物保护单位；传法正宗殿内保存水陆壁画。"
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
    "lede": "浑源古城中，圆觉寺留下了一座金代砖塔。高耸的首层托起九道渐次收分的密檐，砖雕模仿木构斗栱，纤细铁刹在顶端勾出独特的轮廓。",
    "facts": [
      "据《浑源州志》，现存砖塔建于金正隆三年（1158），明清多次修缮。",
      "塔为八角九级密檐式，高约30米；塔身及台座以砖雕表现仿木构斗栱和装饰。",
      "浑源圆觉寺塔于2013年列入第七批全国重点文物保护单位。"
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
    "lede": "浑源文庙的大成殿以五间立面承托宽阔屋顶，中央竖棂格扇与两侧砖墙相接。现存殿堂属于明代遗构，仍保留早期营造手法；御路龙纹石和殿后“忠孝节义”题刻，记录了这座州学的礼制功能。",
    "facts": [
      "官方资料记文庙在明成化八年（1472）大规模重建；现存建筑为明清遗构，大成殿精确落成年尚未核定。",
      "大成殿面阔五间、单檐庑殿顶，前檐中央三间设格扇，左右两端为砖墙。",
      "浑源文庙于2013年列入第七批全国重点文物保护单位。"
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
    "lede": "太和殿立在三层汉白玉台基上，以十一间面阔与重檐庑殿顶统领外朝。宽阔的丹陛将殿宇托向高处，今天的形制来自康熙年间的重建。",
    "facts": [
      "现存太和殿于康熙三十四年（1695）兴工，三十六年（1697）竣工。",
      "面阔十一间、进深五间，为紫禁城外朝三大殿之首。",
      "屋顶为重檐庑殿顶，檐角走兽增至十个；殿内曾举行即位、大婚等重要典礼。"
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
    "lede": "太庙享殿以十一间长檐铺展在三层白石台基上。这里曾是皇帝祭祖行礼之所，巨大的楠木柱与重檐庑殿顶共同撑起庄严的宗庙空间。",
    "facts": [
      "太庙初建于永乐十八年（1420）；本条按享殿嘉靖二十四年（1545）复建纪年。",
      "享殿面阔十一间、进深六间，采用黄琉璃瓦重檐庑殿顶。",
      "大殿立于三层汉白玉须弥座上，殿内保存六十八根整根楠木大柱。"
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
    "lede": "木塔东侧的小寺里，一座三间金代佛殿收藏着精巧的天宫楼阁与藻井；檐下疏朗的斗拱，承着起伏舒展的屋面。",
    "facts": [
      "大雄宝殿为金代原构，金大定二十四年（1184）重修。",
      "大殿面阔、进深各三间，采用单檐歇山顶。",
      "殿内藻井铺满天花，与沿墙天宫楼阁构成珍贵的金代小木作。"
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
    "lede": "两层飞檐之间，深远的斗栱在白壁上排开。时思寺大殿以轻巧的木构和低低的石阶，藏在大漈山村的古寺中。",
    "facts": [
      "<b>元代大殿</b>：大殿建于元至正十六年（1356），至今保留大量元代构件。",
      "<b>重檐歇山</b>：上下两层屋檐舒展，上檐斗栱露出完整层次，中央门洞与两侧窗形成简明立面。",
      "<b>多时并存</b>：寺内钟楼、三清殿与梅氏宗祠形成跨越元明清的建筑群，图版专取元代大殿。"
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
    "lede": "北社村高台上的金代大殿，以低缓悬山屋面、疏阔五间门窗和殿内彩塑，保留了五台山南麓古寺的气息。",
    "facts": [
      "现存大雄宝殿为金代遗构，确切建造年份尚无题记证实。",
      "正殿面阔五间，七檩六椽，采用单檐悬山顶。",
      "殿内保存九尊泥塑像；洪福寺于2001年列入全国重点文物保护单位。"
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
    "lede": "善文村的大佛殿把宽阔挑檐舒展到三间殿身之外，门侧两只兽面守着明间，金代梁架与后世装饰在这里相遇。",
    "facts": [
      "现存大佛殿为金代遗构，确切建造年不详。",
      "大殿面阔三间、进深六椽，单檐歇山顶，出檐宽大。",
      "内柱头保留清代兽面装饰；寺内另存宋代石经幢遗物。"
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
    "lede": "上下两层飞檐把殿身舒展开，宽阔明间与两侧花窗收成简净的正面。武义延福寺的元代大殿，仍保存着更早的木构记忆。",
    "facts": [
      "<b>元代重建</b>：现存大殿的重建始于元延祐四年（1317），由僧人怀法、德环募资兴修。",
      "<b>重檐歇山</b>：两层屋檐间露出木构斗栱，宽阔中央明间与两侧较窄间构成立面节奏。",
      "<b>宋元相接</b>：殿内保有宋代构件，所见形制与元代重建共同留下跨越时代的营造痕迹。"
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
    "lede": "一层长檐高挑，两侧收起轻快的翼角。金华天宁寺大殿只用三间尺度，把宽明间、花格窗与檐下斗栱组织得端正而舒展。",
    "facts": [
      "<b>墨书记年</b>：梁栿墨书留有元延祐五年（1318）重建题记，成为现存大殿定年的直接线索。",
      "<b>三间单檐</b>：大殿面阔三间，采用单檐歇山顶，宽明间与侧间窗格形成清晰层次。",
      "<b>国保元构</b>：天宁寺大殿于1988年列入第三批全国重点文物保护单位，是金华古城的重要元代遗构。"
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
    "lede": "中岳庙前的石阙把汉代屋宇凝固在石头里。母阙与子阙高低相接，残存的石檐和阙铭，仍指向两千年前的祭山礼仪。",
    "facts": [
      "建于东汉元初五年（118），为太室山庙前神道阙。",
      "东西两阙相对，每阙由高低相连的母阙和子阙组成。",
      "石块模拟木构屋顶，阙身留存画像石、乳钉纹及汉代铭文。"
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
    "lede": "少室山麓的双阙是古代祭山道路的遗存。石檐高低相接，画像中的车马、驯兽与蹴鞠，把东汉人的生活片段留在了庙门之外。",
    "facts": [
      "郑州市文物局记建于延光二年（123）；另有118至123年间的推定，故时间轴按约年。",
      "东西两阙均为二重子母阙，由阙基、阙身和石质阙顶组成。",
      "画像内容包括马戏、狩猎、驯象、蹴鞠等，是研究东汉生活与祭祀的实物。"
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
    "lede": "启母阙立在嵩山万岁峰下，通向早已不存的启母庙。残顶与不齐的石块保留了时间的痕迹，阙铭则把大禹治水的传说带入汉代人的祭祀世界。",
    "facts": [
      "东汉延光二年（123）由颍川太守朱宠建造，为启母庙前神道阙。",
      "通行名称为启母阙，也称开母阙；用户所写“后母阙”据地名语境校正于此。",
      "西阙北面保存启母阙铭与请雨铭；本图绘其南面，按现存残顶形态保留缺失。"
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
    "lede": "十五层砖檐沿曲线层层收起，使嵩岳寺塔的轮廓近于一支挺立的笔。十二边形塔身与火焰形门楣，保存着中国早期佛塔吸收多种造型语言的痕迹。",
    "facts": [
      "塔建于北魏晚期；2021年文保研究将营造期考定于511至520年之间，旧说常记523年。",
      "平面为十二边形，塔身上叠十五层密檐，轮廓曲线向上收分。",
      "底层四正面设券门，其余八面设塔形壁龛，塔顶有莲瓣与相轮组成的塔刹。"
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
    "lede": "古魏城旁的龙泉高台上，五龙庙以一座小巧的唐代木构正殿守着地方水神信仰；梁架简练，屋坡舒缓。",
    "facts": [
      "正殿为唐代木构遗存，通常据唐大和六年（832）碑与构架特征定年。",
      "大殿面阔五间、进深四椽，殿内无柱，梁架全部露明。",
      "斗拱只置柱头、不设补间；现状墙面、门窗及屋面有后世修缮。"
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
    "lede": "飞云楼的檐角向四面层层挑出，斗栱像云簇聚在楼身周围。登临仰望，三层楼阁、交错抱厦与十字歇山顶连成一幅轻盈而繁复的木构轮廓。",
    "facts": [
      "楼的始建年代未明，现貌经明清重修；本条以1746年乾隆重修纪年展示。",
      "底层面阔与进深各五间，明三层、暗五层，采用三层四滴水的十字歇山顶。",
      "全楼高23.19米，通天柱与层叠斗栱承托楼体；小沟滴与抱厦丰富了外轮廓。"
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
    "lede": "高台之上，三层楼阁以交叠的山花与飞檐向上舒展。秋风楼因收藏汉武帝《秋风辞》碑而得名，楼身的轻巧与台基的厚重形成鲜明呼应。",
    "facts": [
      "<b>清代重建</b>：现楼按清同治九年（1870）重建纪年；楼内汉代诗文、元代碑刻与建筑年代分别记录。",
      "<b>三层楼阁</b>：高约32.6米，木楼立于高大台基上，各层中央山花与飞檐层叠。",
      "<b>秋风辞碑</b>：楼内保存《秋风辞》刻石，延续了后土祠与汉代祭祀的历史联系。"
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
    "lede": "黄花滩塔立在大凌河畔的西塔山，隔田与辽代建州城遗址相望。八角塔身托起十三层密檐，券门上方的花篮与飞天仍显出辽代砖雕的细腻。",
    "facts": [
      "塔在辽宁朝阳市龙城区大平房镇，主体属辽代，具体建造年份未定。",
      "八角砖塔由高台基、双层须弥座、塔身和十三层密檐组成。",
      "2012年完成修缮并重立塔刹，本图按2023年实景照片绘修缮后现貌。"
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
    "lede": "秘魔岩下，文殊殿以宽阔而朴素的前廊面向山谷。木柱、格扇和檐下画板构成五间立面，清代彩绘保存着这一带的文殊信仰。",
    "facts": [
      "<b>五间硬山</b>：图版选取文殊殿，面阔五间，前设木构廊，中央台阶通向高起的殿基。",
      "<b>清代彩绘</b>：殿前廊木板画与殿内壁画呈现五台山信仰；按现存清代主体归类。",
      "<b>全国重点文保</b>：秘密寺于2006年列入第六批全国重点文物保护单位。"
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
    "lede": "公主村的院落深处，大雄宝殿以素墙和简洁梁枋收住庭院。明代水陆壁画藏在三间殿内，把四方神祇绘入同一场法会。",
    "facts": [
      "现存大雄宝殿为明代遗构，留有弘治十六年（1503）重修纪年，清康熙年间又有修葺。",
      "大雄宝殿面阔三间、进深六椽，单檐悬山顶，檐下不施斗栱。",
      "殿内保存明代水陆壁画，佛教与道教神祇共同构成分层而有秩序的法会图像。"
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
    "lede": "天岩村的文殊殿在山中收起院落喧声。宽阔素墙与平缓屋檐之内，金代壁画把佛传故事和人间市井留在同一面墙上。",
    "facts": [
      "现存文殊殿为金代遗构，梁下留有元延祐二年（1315）重修题记。",
      "文殊殿面阔五间、进深六椽，单檐歇山顶，斗拱为四铺作。",
      "殿内金代壁画完成于大定七年（1167），为画师王逵等人的作品。"
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
    "lede": "宽阔的双檐压住七间殿身，石雕龙柱在檐下舒展。泉州府文庙大成殿经清代重建，仍沿袭宋式庑殿的庄重骨架。",
    "facts": [
      "<b>清代现殿</b>：大成殿建成于清乾隆二十六年（1761），保留宋咸淳年间重建时的结构特点。",
      "<b>七间庑殿</b>：大成殿面阔七间、进深五间，采用重檐庑殿顶，殿前石雕龙柱是立面特征。",
      "<b>庙学一体</b>：泉州府文庙兼有祭孔与府学功能，见证古城的儒学教育传统；图版专取大成殿。"
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
    "lede": "长长的双檐横贯九间殿身，正脊的小塔与双龙在天际排开。开元寺大雄宝殿以明代重修的形制，延续着泉州千年佛寺的日常香火。",
    "facts": [
      "<b>明代重修</b>：大雄宝殿在明崇祯十年（1637）重修为现状形制，图版按现存主体定年。",
      "<b>九间百柱</b>：大殿面阔九间，通称百柱殿，实际以减柱做法留下86根柱，扩大殿内礼佛空间。",
      "<b>飞天乐伎</b>：梁架与石柱相接处有24尊木雕飞天乐伎，兼具结构支撑与装饰作用，是泉州多元文化的见证。"
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
    "lede": "花岗石叠成七层楼阁，每层都有窄窄的回廊和栏板。乌塔以深沉石色得名，与于山白塔相对，成为福州古城两座熟悉的地标。",
    "facts": [
      "<b>五代闽国</b>：941年兴建，原计划九层，944年王延羲遇害后停在七层；现塔按七层完成时登记。",
      "<b>石仿木构</b>：八角七层花岗石塔，高约32.86米，转角设倚柱，层层石檐外挑。",
      "<b>回廊与佛龛</b>：塔外栏板围合回廊，塔壁开门设龛，顶部以葫芦形塔刹收束。"
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
    "lede": "于山西麓的白塔以七层素白塔身向上收起，与乌山乌塔遥相对望。浅出檐口、细长壁柱和小小葫芦刹，让这座城市地标显得清朗而克制。",
    "facts": [
      "白塔正名报恩定光多宝塔，最初由王审知于唐天祐元年（904）兴建。",
      "现存塔身为明嘉靖二十七年（1548）重建，本条按这一现存主体年代分类。",
      "塔为七层八角砖塔，顶部葫芦状塔刹；1991年公布为福建省级文物保护单位。"
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
    "lede": "观音倚膝而坐，微缩天宫在身后层层展开，卷云与群像悬向梁架。长治观音堂把一个繁密的信仰世界，安放在三间小殿之中。",
    "facts": [
      "<b>明代遗塑</b>：观音堂建于明万历年间，现存彩塑、壁塑保留明代工艺；图版取中央观音与天宫局部。",
      "<b>圆塑悬塑</b>：主尊与低处群像多为圆塑，高处小像依附墙壁、梁架与门窗顶部，组成层叠空间。",
      "<b>三教共融</b>：小殿内约五百尊塑像汇集儒、释、道题材，大小错落，体现民间庙堂的复合信仰。"
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
    "lede": "街道从楼下穿过，戏台在门楼上展开。祆神楼把不同用途叠进相连的楼阁，琉璃重檐与山花交错，勾出介休城里特别的天际线。",
    "facts": [
      "<b>清初重建</b>：现存楼阁为顺治末至康熙初重建，后来又经修缮；楼名与早期祆神信仰的历史，不等同于现存木构年代。",
      "<b>三者合一</b>：过街楼、山门与乐楼组成凸字形建筑，前部通行、后部入庙，上层兼作戏台。",
      "<b>重檐交错</b>：相接的歇山屋顶、突出山花与层层挑檐形成复合轮廓，琉璃脊饰和木构铺作彼此映衬。"
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
    "lede": "苍山东麓，千寻塔与南北两座小塔鼎足而立。中央方塔挺拔，两侧八角小塔稍矮，留下南诏与大理国佛塔的不同轮廓。",
    "facts": [
      "千寻塔一般系于南诏劝丰佑时期（823—859），为方形十六层砖塔，高69.13米；图鉴以它的约年排序。",
      "南北两塔另系大理国时期，各为八角十层、高42.19米，不与千寻塔合记为同年建成。",
      "图版从东向组合三塔，中央为千寻塔，左为南塔、右为北塔；三座塔刹、塔身和基座均完整入画。"
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
    "lede": "蓟州老城里，观音阁以两重深檐和一道平座舒展立面。阁内暗层把梁柱连接在一起，楼阁的空间围绕高大的观音像展开。",
    "facts": [
      "现存观音阁重建于辽统和二年（984），与山门共同保存辽代木构形制。",
      "观音阁面阔五间、进深四间，外观两层，内部含暗层共三层。",
      "上层设内外平座回廊，梁枋和斗拱将两圈立柱联结成整体。"
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
    "lede": "大成殿居于曲阜孔庙中轴，两重歇山檐下立着盘龙石柱。殿前的露台与阶道，把祭孔仪式的行进和空间秩序连在一起。",
    "facts": [
      "现存大成殿在雍正二年（1724）火灾后重建，雍正八年（1730）竣工。",
      "大殿面阔九间、进深五间，采用重檐歇山顶，黄琉璃瓦覆顶。",
      "前檐十根石柱深雕盘龙，殿前石台阶与露台构成祭孔空间。"
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
    "lede": "山花朝前，一间小小戏台托起舒展的歇山顶。王报二郎庙把金代的演剧空间留在院落南端，台基上的大定纪年仍可追认。",
    "facts": [
      "<b>金代戏台</b>：须弥座台基题记记大定二十三年（1183），现存戏台的年代明确；庙内其余建筑多经明清重修。",
      "<b>山花朝前</b>：一间见方的戏台把歇山顶山花朝向观众，四根圆柱与粗壮铺作承托屋盖，形制颇有辨识度。",
      "<b>古台遗存</b>：官方介绍称其为国内现存最早的戏台实物，坐南朝北，见证早期乡村庙会与演剧空间。"
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
    "lede": "雅安汉碑路旁，高颐墓前的石阙将汉代木构形制凝在红砂岩中。西阙保存着主阙与耳阙相连的高低轮廓。",
    "facts": [
      "建于东汉建安十四年（209），为益州太守高颐墓前的仪仗建筑。",
      "原为东西双阙，西侧子母阙保存较完整；图版按实照绘西阙，不复原残损东阙。",
      "石阙以斗栱、楼部和屋檐模拟木构，雕刻中兼见历史故事、神兽与出行题材。"
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
    "lede": "长卿山麓一段收分的石阙身，承载着关于李业的记忆。古阙现仅存一座，所见阙顶为后世补配。",
    "facts": [
      "一般系于东汉初年，传统断代为建武十二年（36）；此处以约年登记，不把后配阙顶计为汉代原构。",
      "现存单体石阙，阙身约高2.45米；正南面原有题铭和清代《移阙记》，其余三面素面。",
      "清道光二十五年（1845），知县周树棠发现残阙身并移置李节士祠保护；图版按现存形态绘制。"
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
    "lede": "泰山脚下，天贶殿以两重宽檐展开祭岳礼制的尺度。从宋代创建到清代重修，梁架、门窗与壁画叠合着不同年代的记忆。",
    "facts": [
      "天贶殿是岱庙主殿，供奉泰山神，宋代创建后历经修葺。",
      "大殿面阔九间、进深五间，重檐庑殿顶，上覆黄琉璃瓦。",
      "现存木构架的尺度与构件做法体现清代特征，殿内壁画清初重绘。",
      "康熙碑记载1677年重修告成，大殿保留可用梁柱并更换损坏构件；年表据此作约略定位，后世修缮另计。"
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
    "lede": "厚重墙台托起宽阔箭楼，四排箭窗横向展开，一孔门洞穿过城防。安定门保留的西城门格局，让西安城墙的尺度与守御意图清晰可读。",
    "facts": [
      "<b>明代城垣</b>：现存城墙主体于洪武七至十一年（1374—1378）兴建，在早期城址基础上拓筑，后来逐步包砖加固。",
      "<b>安定门段</b>：图版取正西门箭楼与中央单券门洞；宽阔楼身设四排箭窗，厚墙与门楼共同构成防御空间。",
      "<b>历代修葺</b>：安定门历经明清及近现代多次整修，仍保存箭楼、城楼与瓮城相连的城防格局。"
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
    "lede": "钟楼以攒尖顶立在街道交会处，鼓楼的长屋脊横展于北院门南端。两座明代楼阁曾以钟鼓声报告城中时辰。",
    "facts": [
      "鼓楼始建于1380年，钟楼始建于1384年；钟楼于1582年迁至现址并另筑基座，不能把现址台基等同原址始建年代。",
      "钟楼为方台上的三重檐四角攒尖楼阁；鼓楼台基呈长方形，楼身面阔七间、有周廊，上层为重檐歇山顶。",
      "图版将钟楼与鼓楼分别取近正面并置，保留各自完整轮廓；这是双主体组合图，并非两楼实际相邻的景象。"
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
    "lede": "歇山屋顶低展，斜木挡雨板沿檐下回廊铺开。木栏与美人靠围出轻巧的殿身，石台基把这座小宫托在顶东湖村的山坡上。",
    "facts": [
      "<b>东湖古宫</b>：位于福建仙游县西苑乡顶东湖村，又称东湖昭灵宫。",
      "<b>檐下回廊</b>：单殿采用单檐歇山顶，檐下三面设回廊与美人靠，上覆斜木挡雨板。",
      "<b>纪年待考</b>：据现有实地记述，年代暂列明代，建造与修葺纪年仍待考。"
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
    "lede": "两重瓦顶下，法隆寺金堂以云形斗栱、上层栏杆和低矮裳阶组成鲜明轮廓。这座飞鸟时代木构与庭院西侧的五重塔相对，保留了早期东亚佛寺空间的线索。",
    "facts": [
      "寺院始建于607年；现存金堂属于670年火灾后重建的西院伽蓝，年代列7世纪后半叶。",
      "主体桁行五间、梁间四间，为二重入母屋造（歇山顶）；初重外围附板葺裳阶，形成下方较浅的檐线。",
      "云斗云肘木、略带鼓胀的圆柱与上层几何栏杆，是金堂外观的重要特征。"
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
    "lede": "清水寺本堂以宽大的桧皮屋顶覆在音羽山坡上，檐前的清水舞台向崖外伸出。舞台下成列的高木柱与横贯木交织，显露出日本悬造建筑的支撑方式。",
    "facts": [
      "寺院始建于778年；图中现存本堂与舞台重建于1633年，按江户时代登记。",
      "本堂为桧皮葺寄栋造，南面两侧的小破风与中央伸出的舞台构成主要轮廓。",
      "清水舞台距地面近13米，由18根榉木柱与横贯木连接支撑，原用于向观音奉献艺能表演。"
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
    "lede": "东寺五重塔以五层宽展的瓦檐逐级收分，细长相轮立在塔顶。约55米高的木塔是京都南部醒目的古建筑，其轮廓沿袭了日本佛塔的层层出檐与栏杆形式。",
    "facts": [
      "现存五重塔重建于1644年，为历经四次火灾后的第五代塔；不以寺院或初塔创建年代登记。",
      "塔为五层方形木构，本瓦葺，五层宽檐上立完整相轮，总高约55米。",
      "初层内部以贯通各层的心柱象征大日如来，周围配置如来与菩萨像，形成密教空间。"
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
  "lede": "闸口白塔把楼阁木塔的柱枋、斗栱和层檐缩刻进白石之中。九层塔身由须弥座向上收分，风化石檐与铁塔刹共同勾勒钱塘江畔的吴越遗构。",
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
    "文保资料将塔断在五代十国吴越后期，具体建造年尚不强定。",
    "塔为八面九层仿木楼阁式石塔，每层由平座、塔身和塔檐组成。",
    "基座刻九山八海与佛经，塔身有佛菩萨等浮雕；图版保留现状残损，未补成新塔。"
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
  "lede": "飞英塔外塔以七层八角木檐包裹内部石塔，宽大的底层廊檐托起逐级收分的塔身。层间栏杆与修长塔刹勾出湖州古城的标志性轮廓。",
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
    "图版聚焦外塔，按南宋重建登记；重建纪年有嘉泰年间与端平初两说，不强填某个确年。",
    "外塔为七层八角砖木楼阁式塔，内部保存独立石塔，形成著名的“塔中塔”。",
    "历代屡经修缮，1982—1987年的保护修理延续其砖木混合结构，不能将修缮年当作古塔初建年。"
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
  "lede": "延庆寺塔的六角塔身逐级收分，平座回廊绕塔而设，底层以两重宽檐展开。细长铁刹立在七级砖木结构之上，呈现浙西南早期楼阁塔的形态。",
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
    "塔于北宋咸平二年（999）动工，1002年完成；现条目按宋代砖砌核心登记。",
    "塔为六面七级楼阁式砖木结构，底层副阶重檐，因此完整外观可数到八条檐线。",
    "1983年启动重点维修、1991年竣工；今日木檐与回廊的维修历史须与北宋塔身区分。"
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
  "lede": "虎丘山顶的云岩寺塔层层砖檐逐级收分，七层塔身保留仿木构的柱、枋与斗栱痕迹。塔的倾斜与砖木结构的历次变化，共同构成苏州这座古塔的现貌。",
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
    "现塔始建于959年、落成于961年，国保年代列五代，历史归属吴越。",
    "塔为七层八面仿木楼阁式砖塔，木檐毁失后保留砖檐与平座结构。",
    "塔身长期向一侧倾斜；历代修缮及近现代加固与原塔建造年代分别记录。"
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
  "lede": "栖霞寺舍利塔以仰莲托起雕像塔身，五层石檐向上收分，顶端立雕刻塔刹。佛龛、力士与基座故事浮雕，让这座南唐石塔同时保留建筑与雕刻两种尺度。",
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
    "现存石塔为南唐重建，国保年代列五代；隋代木塔前身与今日石塔分开记录。",
    "塔为八角五层密檐式石塔，下承须弥座与仰莲，塔身上方叠出五重石檐。",
    "塔身雕有门与天王、力士等形象，基座刻佛教故事；图版将浮雕作简化线描。"
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
  "lede": "海清寺阿育王塔以九层叠涩砖檐向上收分，高大的首层塔室与层层券门形成清晰节奏。花果山脚下的砖塔保存着北宋时期的轮廓，外观简朴而挺拔。",
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
    "塔有唐代前身，现塔按北宋天圣元年（1023）重建登记，不取唐代沿革为主体年代。",
    "塔身八面九级，砖檐层层叠涩，券门与低矮塔顶构成现状轮廓。",
    "20世纪70年代维修在塔心发现石函、银棺、瓷瓶与舍利等物，现由连云港市博物馆保存。"
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
  "lede": "玄妙观三清殿以九间宽阔殿身托起两重歇山檐，长脊上的鸱吻与平升三戟将轮廓引向天空。这座南宋大殿仍是苏州古城中尺度醒目的早期木构。",
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
    "三清殿重建于南宋淳熙六年（1179），不能与玄妙观最初创建年代混为一谈。",
    "殿宇面阔九间、进深六间，重檐歇山，立于宽阔台基上。",
    "图版选取三清殿单体，保留重檐和长脊轮廓，排除观前山门与殿前香炉亭。"
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
  "lede": "虎丘二山门以一架横展的歇山屋顶覆盖三间门身，中央圆拱与两侧圆窗形成简练的正面。“断梁”之名来自分段对接的脊檩。",
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
    "据苏州市园林和绿化管理局记载，现存二山门于元至元四年（1338）重建。",
    "门身面阔三间，单檐歇山；中央圆拱门洞与左右圆窗构成正面开口。",
    "“断梁”指脊檩以两段圆木相接的构造，并非整殿没有梁，也不是断裂后悬空。"
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
  "lede": "寂鉴寺的西天寺石殿紧挨山岩，以石柱、石枋与大片石板摹写木构殿宇。浅缓的屋面和三间开口使这座元代石殿显得低平而紧凑。",
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
    "西天寺石殿建于元至正十七年（1357），与旁侧兜率宫、极乐园小石屋分别成体。",
    "正殿面阔三间约7.64米、进深两间约5.52米，单檐歇山，平面呈凸字形。",
    "除供出入的格扇门外，主要构件以石材仿木雕凿，后部紧靠天然山岩。"
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
  "lede": "东山杨湾的轩辕宫正殿以深远的歇山檐口覆盖三间殿身，左右窗棂嵌在起伏的壶门轮廓中。元代构架特征与明清修建痕迹共同留在这座小殿上。",
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
    "国保时代列元；现存正殿经历明清重建与修缮，不能把整体现貌视作未经改动的元代原状。",
    "殿身正面与进深均为三间，单檐歇山，中心四柱参与构成井字梁架。",
    "此处原为祭祀伍子胥的胥王庙，民国时期改祀黄帝并称轩辕宫。"
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
  "lede": "凤凰寺礼拜殿以砖券和穹顶构成三间内部空间，外覆相连的三座攒尖顶。图版取实拍可见的屋顶群，中央重檐高起，两侧较低，呈现杭州清真古寺的独特轮廓。",
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
    "现存核心礼拜殿源于元代阿老丁捐资重建，明清及近现代又多次修缮。",
    "殿内以砖砌拱券连接三个穹顶空间；外覆三座相连攒尖顶，中央较高且作重檐，两侧较低。",
    "本图只表现实景可核的礼拜殿屋顶与上部墙身，不复原被后加建筑遮挡的下半立面，也不画现代门厅。"
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
  "lede": "灵谷寺无梁殿用厚重砖墙和连续拱券承托屋面，正面三座拱门穿过宽阔墙身。两层浅檐上方的三枚塔形脊饰，标出了这座明代砖殿的轮廓。",
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
    "现存无梁殿为明代建筑，灵谷寺于洪武十四年（1381）迁建此处。",
    "殿体不用木梁，砖石砌筑的拱券承担结构；“无量殿”与“无梁殿”两名并存。",
    "据景区资料，殿宽约50米、深约34米，重檐九脊屋面上立三座塔形脊饰。"
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
  "lede": "宽阔双膝托起沉静身躯，石弥勒在石城山岩室中结跏而坐。南朝齐梁间几代僧人接续开凿，留下江南早期大型佛教造像的珍贵实物。",
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
    "<b>齐梁成像</b> 僧护发愿后，僧淑、僧祐接续营造，梁天监十五年（516）完成，旧称三世石佛。",
    "<b>依崖造像</b> 弥勒像凿自石城山岩壁，结跏趺坐，两手置于膝间，双膝相距约10.6米。",
    "<b>历代修护</b> 造像经历历代妆饰与修补，近现代多次保护修缮；图版取历史石像现状，不含景区现代卧佛。"
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
  "lede": "深藏东山坞中的十六尊罗汉，各有神情与姿态。倾首、垂目与轻轻交叠的手指，让安静的泥塑带着日常人物的生气。",
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
    "<b>宋明塑像</b> 文保名录将紫金庵罗汉塑像列为宋至明；相传出自南宋雷潮夫妇之手，作者并无定论。",
    "<b>十六罗汉</b> 罗汉列于殿内两侧，衣纹、坐姿和神情各异，本图选取半托迦尊者的上身局部。",
    "<b>历代修护</b> 塑像历经修护，今日所见包含不同时期的彩绘与修补；现存殿宇年代另计。"
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
  "lede": "罗汉坐在起伏的山石与云气之间，清瘦面容和宽袍衣纹仍有神采。保圣寺保存的半堂塑壁，把人物与山水一同塑进了墙面。",
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
    "<b>北宋塑像</b> 1961年首批国保名单将保圣寺罗汉塑像定为北宋；唐代杨惠之创作的说法属传统归属。",
    "<b>半堂九尊</b> 现存九尊罗汉坐像错落分布于塑壁，姿势和神情各异，本图选择其中一尊。",
    "<b>山水入壁</b> 山石、云气、洞窟等构成塑壁背景，人物嵌在山水之间；今日保护馆的建造年代另计。"
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
  "lede": "石阶沿着河岸升起，在水路上方交汇。八字桥用一孔石梁与几向踏步，接住了绍兴古城交错的街巷和河流。",
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
    "<b>宝祐重建</b> 桥始建于南宋嘉泰以前，宝祐四年（1256）冬重建，清乾隆四十八年再修。",
    "<b>石梁跨河</b> 主桥以石梁并列跨越水道，主孔净跨约4.5米；矩形梁孔与圆拱桥形制不同。",
    "<b>三街三河</b> 桥处三条街、三条河交错处，石阶向不同方向衔接街岸，名称取自形如八字的布局。"
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
  "lede": "繁华街边，一根八角石幢仍承载着唐人的刻经。裂缝穿过幢面，字迹与补缝相互交叠，让千余年的保存与修护都留在同一块石头上。",
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
    "<b>唐代纪年</b>经幢立于开成二年（837），幢上另见大中五年（851）题记，原有两座，现存一座。",
    "<b>后世修补</b>幢身、基座等保有唐代构件，上部为清代修补；现存整体不能笼统视为837年原貌。",
    "<b>局部图版</b>选取八角幢身与承托石，表现所见裂缝与残损；经文以稀疏笔痕概括，不作可读释文。"
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
  "lede": "石塔将层层木檐凝固为石，经幢则把经文与佛像叠置于长柱之上。灵隐寺留下的这组吴越遗存，年代跨过北宋立国，仍属于钱氏治下的江南。",
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
    "<b>石塔</b>建于960年，现存两座，八角九层，以石材表现楼阁的柱、枋、斗栱与出檐。",
    "<b>经幢</b>建于969年，亦存两座，幢身刻经，台座与上部构件层叠；与石塔分属不同营造纪年。",
    "<b>图版</b>从石塔与经幢各选一座，依据历史实拍并置对照；现寺内木构殿堂另有后世重建沿革。"
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
  "lede": "两座细长砖塔并立，长长的铁刹伸向天空。它们身旁的正殿已经消失，石柱与柱础仍在原址留下殿堂的尺度。",
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
    "<b>双塔</b>北宋太平兴国七年（982）起建，至雍熙年间完成，均为七级八面楼阁式塔。",
    "<b>砖仿木</b>塔身层层收分，以柱、枋、斗栱与砖檐表现楼阁形制，长塔刹形成鲜明轮廓。",
    "<b>正殿遗址</b>殿宇已毁，石柱与雕刻柱础留存；图版选取其中少量遗构，与双塔并置呈现。"
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
  "lede": "盘门旁，七级塔檐逐层收起，塔身与外部木构共同形成江南楼阁式塔的轮廓。它经历宋代改修和近现代复原，年代要从早期砖身读起。",
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
    "<b>北宋营造</b>景德元年（1004）奠基，天圣八年（1030）建成，其后又经改建与修缮。",
    "<b>七级八面</b>砖身承重，外部木檐与回廊展露楼阁形制；现状包含近现代修复部分。",
    "<b>塔藏珍宝</b>塔内出土的真珠舍利宝幢等文物现藏苏州博物馆，可与塔的营造沿革对照阅读。"
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
  "lede": "西溪水畔，七级砖檐层层收分，塔身轮廓简朴而陡峭。海春轩塔见证了江淮盐场与海岸变迁，也留下唐建宋修的长期累积。",
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
    "<b>断代</b>国保名录列为唐代，地方资料记宋代修葺；具体始建年尚不据传说定论。",
    "<b>形制</b>七层八角砖塔，高约20.8米，低层墙身高大，上层密集收分并设小龛。",
    "<b>名称</b>又称广福寺塔、尉迟塔；县志所记尉迟敬德监造为传说沿革，现存砖身与外部轮廓须结合历代修缮理解。"
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
  "lede": "石柱撑起深远的木檐，初祖庵大殿以小小三间保存宋代营造的层次。柱身雕刻与硕大的铺作，使这座纪念达摩的庵院有了独特面貌。",
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
    "大殿建于北宋宣和七年（1125），属于登封“天地之中”世界遗产的少林寺建筑群。",
    "三间单檐歇山顶，以雕刻石柱承托木构，柱头斗栱体量突出。",
    "图版以前立面为主体，参考另一角度核对屋面；只收初祖庵一处，不将少林塔林拆分计数。"
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
  "lede": "峻极殿以重檐庑殿和高台石阶形成中岳庙的中心。古树间显露的中央立面，让五岳祭祀建筑的尺度与礼序仍然可读。",
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
    "峻极殿全殿面阔九间、进深五间，现存面貌以清代营造和后世修缮为主。",
    "正面古树遮挡两翼，本图只取中央五间及石阶，屋檐向两侧淡出表示局部。",
    "中岳庙沿革可追溯到早期山岳祭祀，不能把建庙沿革年直接当成现存峻极殿年代。"
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
  "lede": "砖石台体分成两室，一线狭缝朝向延伸在地面的石圭。登封观星台把测影所需的高度、方向和刻度，组织成一座清楚可读的建筑。",
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
    "观星台始建于元至元十三年（1276），与郭守敬主持的大规模测天工作有关。",
    "台顶双室之间留出测影狭缝，北侧铺设石圭，台旁双梯可通台顶。",
    "图版只画观星台本体与石圭，附近周公测景台未另拆为条目。"
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
  "lede": "嵩山南麓的会善寺，留下了一座五间元代大殿。宽屋顶、外露铺作与三组中门，将寺院悠久沿革落实在一座可见的木构上。",
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
    "寺院创建远早于现殿，所绘大殿按元代现存木构登记。",
    "面阔五间，单檐歇山顶，中部三间设门，两侧设窗。",
    "图版只画现存大殿正面；屋面与门窗细部含历次修缮痕迹。"
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
  "lede": "十三层密集的檐线缓缓收向塔顶。开封铁塔并非铁铸，深褐色琉璃砖让这座宋塔获得了沿用至今的名字。",
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
    "祐国寺塔建于北宋皇祐元年（1049），为八角十三层琉璃砖塔。",
    "塔面以模制琉璃砖拼砌斗栱、门窗和装饰，密集檐口形成稳定的节奏。",
    "图版以完整塔身照片为主、底层近照为补充，保留十三层，不复原前身木塔。"
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
  "lede": "宽大的六角塔身只留下三层，却仍保有重叠的砖雕与佛龛。繁塔不完整的轮廓，记录着宋塔营建之后的拆毁与修补。",
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
    "繁塔建于北宋开宝七年（974），现存高大的下部三层。",
    "六角塔身遍布佛像砖与仿木构细部，顶部另有后世改筑的小塔。",
    "图版按现状画三层主体与顶部残存小塔，不将原九层复原为完整塔身。"
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
  "lede": "高低错落的五座屋顶压在两组柱簇上，木雕与石础把商帮会馆的门面装点得细密。中间开阔的通道，让这座牌楼显得繁而通透。",
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
    "会馆于清乾隆年间集资营建，1776是会馆创建沿革年，不直接认作牌楼确切完工年。",
    "牌楼三间六柱五楼，柱子分成两组前后错落的支撑，并非六柱一字排开。",
    "图版依2023年正面照片绘制木牌楼，后方殿宇与两侧廊房省略。"
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
  "lede": "巩县石窟的中心柱把礼佛路径环绕起来。第一窟中，主像与胁侍从石壁中凸出，垂衣、背光和安静的面相保存着北魏晚期造像的形迹。",
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
    "<b>开凿</b> 石窟始建于北魏时期，东魏、西魏、北齐、唐、宋等代续有营造。",
    "<b>窟室</b> 第一窟为方形中心柱窟，柱面开龛，四壁分布千佛与礼佛浮雕。",
    "<b>图像</b> 第一窟保存帝后礼佛浮雕；本图取中心柱一面主像及两侧胁侍，未把邻壁浮雕混入构图。"
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
  "lede": "窑楼立面与两侧楼房围成深长内院。康百万庄园把依崖筑窑与四合院住宅结合，留下河洛商人家族的居住空间。",
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
    "<b>庄园年代</b> 郑州市文物局将庄园断代为明末清初；它经过康氏家族多代营建，现存院落并非同年建成。",
    "<b>地方形制</b> 庄园靠崖筑窑洞、临街建楼房，住宅庭院采用四合院格局，结合木、砖、石构件。",
    "<b>图版范围</b> 以实拍内院为依据，表现上下拱形开口的窑楼正面与两侧内向房屋；周边不完整墙面留白收束，不补画隐蔽外观。"
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
  "lede": "白马寺东侧的齐云塔用十三重密檐收出柔和曲线。方形塔身层层内收，保留金代重建的砖塔形制，与寺院的东汉创建历史分别相承。",
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
    "<b>重建纪年</b> 塔旁金代《重修河南府左街东白马寺释迦舍利塔记》记载大定十五年（1175）重建。",
    "<b>形制</b> 四方形密檐式砖塔共十三层，自第六层起逐层内收，顶部置宝瓶式塔刹。",
    "<b>寺塔关系</b> 齐云塔院位于白马寺东南；现塔沿革与后世新建塔院殿宇分别记录。"
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
  "lede": "高台上的千秋鉴舞楼，正对关林大门。前台歇山与后台硬山叠合，留下清代祭祀戏曲空间的鲜明轮廓。",
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
    "<b>所绘舞楼</b> 舞楼又名千秋鉴，建于清乾隆五十六年（1791），与关林大门隔广场相对。",
    "<b>复合屋顶</b> 舞楼平面作凸字形，前台歇山、后台硬山结合，形成宛如重檐楼阁的外观。",
    "<b>关林格局</b> 关林以祠庙、墓冢等共同构成中轴线院落，现存建筑含明清多阶段遗构；本图仅取舞楼，不拆分重复入库。"
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
  "lede": "灵泉寺大住圣窟开凿于隋开皇九年。窟门两侧神王披甲执兵，长须垂胸，以浅浮雕留下北朝至隋代护法形象的延续。",
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
    "<b>大住圣窟</b> 此窟由灵裕主持开凿，纪年为隋开皇九年（589）；周边摩崖龛像年代各异。",
    "<b>成对护法</b> 门外两侧刻迦毗罗、那罗延神王；两尊姿势和持物不同，依各自实拍分别绘制。",
    "<b>局部图版</b> 图版选取两尊门侧浅浮雕，保留轮廓残损与岩体裂隙，不补造中间窟门或窟内佛像。"
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
  "lede": "崖面内的低小洞口，仍可辨认门楣雕饰与门侧残像。小南海三窟保存了北齐佛教造像与净土图像的重要线索。",
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
    "<b>开凿年代</b> 据故宫博物院，石窟开凿于北齐天保元年至六年（550—555），由僧稠最后完成。",
    "<b>三窟形制</b> 东、中、西三窟均为覆斗方形、三壁三龛窟，佛像组合包括卢舍那、阿弥陀与弥勒。",
    "<b>图版范围</b> 线稿取实拍中可见的窟门外立面局部，保留岩壁裂隙与门侧残损雕刻；不补绘窟内造像。"
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
  "lede": "大伾山大佛依山崖凿就，右手上举、左手抚膝。开凿年代存在后赵、北齐等不同判断，现存表层又叠加了后世修补与彩绘。",
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
    "<b>断代有异</b> 旧文保资料记北齐始凿、唐初完成；近期保护报道采用后赵说，本条保留不同判断。",
    "<b>依崖巨像</b> 造像为倚坐姿态，右手施无畏印，左手置膝；图版仅画照片中头部至双膝可见部分。",
    "<b>保护现状</b> 明正统十年曾修缮；2025年启动新一轮本体保护，线稿依据2024年修缮前实拍。"
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
  "lede": "比干庙以庙墓相连的格局纪念商代忠臣比干。现存建筑主要形成于明清时期，享殿前部在古柏间展开五间立面。",
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
    "<b>现存明清</b> 庙群历史可追溯至北魏，现存建筑为明清重建、续修，不能以祭祀人物年代为建筑年代。",
    "<b>前庙后墓</b> 中轴线由山门、碑廊、享殿通向后部墓冢，形成庙墓结合的布局。",
    "<b>享殿局部</b> 大殿面阔五间、进深三间；图版画照片可辨识的前部立面，不补造树后遮挡的殿顶。"
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
  "lede": "潞简王墓前的石坊以三座方门组织神道入口，中央高起，两侧立着独立石柱。细密龙纹刻进厚重石材，把明代藩王陵墓的仪式次序留在山前。",
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
    "<b>陵墓</b> 潞简王墓位于新乡凤凰山南麓，是明代藩王陵墓遗存。",
    "<b>石坊</b> 图版选择外部“潞藩佳城”石坊，三间四柱，两侧另立独立石柱，未与内侧带檐石坊混画。",
    "<b>构造</b> 石柱、额枋与抱鼓石构成入口，龙纹采用浮雕表现；图中按实物保留缺损与石构轮廓。"
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
  "lede": "济渎庙祭祀济水之神，寝宫保存着北宋开宝六年的木构。低缓屋顶下，粗大的斗栱与简洁柱网撑起五间立面。",
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
    "<b>北宋寝宫</b> 寝宫建于973年，是庙中具有明确宋代年代的主体木构。",
    "<b>五间歇山</b> 殿面阔五间，进深四椽，单檐歇山顶；前檐保留大型斗栱。",
    "<b>保护修缮</b> 近现代曾进行专业保护修缮，图版依修缮后的实拍现状绘制。"
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
  "lede": "奉仙观三清殿把宽大的悬山屋面托在六根前檐石柱上。厚重斗拱与清楚的五间柱网，使这座金代殿宇的结构在正面便能读出。",
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
    "<b>纪年</b> 三清殿建于金大定二十四年（1184），与奉仙观唐代创建的历史分别记录。",
    "<b>形制</b> 面阔五间，进深七架椽，单檐悬山顶；正面柱网和粗壮铺作保存金代建筑特征。",
    "<b>布局</b> 观内另存清代山门与明代玉皇殿；本图只表现现存金代三清殿。"
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
  "lede": "七祖塔居风穴寺中心，为纪念贞禅师而建。高耸的方形下层托起九重密檐，塔刹相轮仍保留清楚轮廓。",
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
    "<b>盛唐塔身</b> 七祖塔建于唐开元二十六年（738），为贞禅师舍利塔。",
    "<b>方形九层</b> 塔高24.17米，方形空心砖塔，外檐层层收分，轮廓略呈弧线。",
    "<b>时代并存</b> 寺内另有宋代悬钟阁、金代中佛殿；这张图版专绘唐塔。"
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
  "lede": "两层密集小龛托起逐层收分的八角塔身。香山寺的宋塔与蔡京书碑，把中原观音信仰留在了砖石之间。",
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
    "<b>现存宋塔</b> 据平顶山市文旅局，塔于 1068 年敕赐重建，八角九级、高 33 米，后世屡有修缮。",
    "<b>塔身形制</b> 砖砌叠涩出檐，檐上有平座；下部塔壁列小佛龛，上层辟门洞，逐级收分。",
    "<b>所绘范围</b> 图版依据两张实拍取现状可见塔身，底层被邻殿遮挡的部分以留白收束；不复原隐藏的塔基。"
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
  "lede": "赊店山陕会馆的悬鉴楼把戏台抬在院落上方，中央三重檐与两侧楼阁相接。商旅会馆中的酬神演剧，由层叠屋面和通透台口共同组织。",
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
    "<b>会馆</b> 山西、陕西商人集资兴建，会馆兼具同乡聚会与祭祀关公的用途。",
    "<b>分期</b> 全组会馆自1756年起分期营建至1892年，悬鉴楼属前期工程，未将全组始建年直接作为戏楼建年。",
    "<b>戏楼</b> 悬鉴楼为会馆戏台，以三重檐主体和两侧楼阁形成对称布局；本图剔除另立的两侧观戏长廊。"
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
  "lede": "大拜殿的柱梁深处，层层匾额围绕着祭祀空间。南阳武侯祠经历多次营修，如今的檐下仍保留着历代追怀诸葛亮的痕迹。",
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
    "<b>现存年代</b> 南阳市官方文保表将武侯祠列为清代；地方政府记载明代正殿营建及 1711 年全祠重修，此后多次修缮。",
    "<b>主体功能</b> 大拜殿是前部主要祭祀建筑，殿内供诸葛亮坐像及诸葛瞻、诸葛尚立像，殿前有多重匾额楹联。",
    "<b>图版范围</b> 线稿取有明确署名的实拍檐下局部，显示柱梁、门扇和月台；未补画照片外部屋顶或不清楚的塑像。"
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
  "lede": "崇法寺塔在永城老城中层层升起。八角九层的砖塔模仿木构楼阁，以密集出檐与平座勾出宋代塔身的节奏。",
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
    "<b>宋代塔身</b> 塔于北宋绍圣五年（1098）竣工，寺院沿革早于这座现存塔。",
    "<b>八角九层</b> 塔高34.6米，各层具有出檐、平座和门窗；檐与平座分别计数，塔身为九层。",
    "<b>砖作仿木</b> 塔以砖作表现柱、斗栱和栏杆，塔内还保存琉璃佛像砖等构件，后世曾修缮。"
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
  "lede": "三道门洞与两侧圆窗，收在一座五间歇山顶下。山门之后，是山陕商人在周家口持续营建的会馆院落。",
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
    "<b>所绘山门</b> 山门建于清雍正十三年（1735），面阔五间、进深三间，单檐歇山顶。",
    "<b>会馆沿革</b> 建筑群由山西、陕西旅周商人集资兴建，始建于 1693 年，后经多朝扩建与重修。",
    "<b>构图依据</b> 依据周口市政府公布的航拍正面取最前部山门，保留三门两圆窗；不把后院飨殿、戏楼叠入单体。"
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
  "lede": "天宁万寿寺大殿隐在禹州旧校舍之间。三间歇山屋顶覆在厚实砖墙之上，檐下斗栱与殿内自然曲材留下元代营造的痕迹。",
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
    "<b>元代重建</b> 金末兵火后，于元大德三年（1299）重建，明清多次修葺。",
    "<b>三间佛殿</b> 大殿面阔与进深均为三间，单檐歇山灰瓦顶，檐下施四铺作单下昂。",
    "<b>现状保护</b> 现存山门和大殿两座建筑，位于原禹州第一高中院内；大殿2013年进行过落架大修。"
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
  "lede": "金大定十七年，僧智秀重建宝轮寺塔。方形塔身层层收分，十三道密檐在古陕州城内勾出修长轮廓。",
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
    "<b>金代重建</b> 现存塔建于1177年；唐代寺塔沿革与这座金塔分别记录。",
    "<b>十三密檐</b> 塔高26.5米，砖檐以菱角牙子和叠涩出挑，底部另设台基、台座。",
    "<b>塔内通道</b> 塔内设塔心室及梯道；回声特点使其俗称蛤蟆塔。"
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
  "lede": "一座低缓的主拱，两肩各开一个小腹拱。红石桥身与历代栏板共同记录了小商河上的营建和修补。",
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
    "<b>断代区分</b> 桥的创建传统追溯至隋代；现存主体的建筑风格和饰面雕刻，罗哲文判断为宋代遗存。",
    "<b>结构形制</b> 桥长 21.3 米、宽 6.45 米，一座圆弧形主拱左右各有一座小腹拱，为敞肩石拱桥。",
    "<b>历代修缮</b> 1994—1995 年维修清理并归位多种构件，现有栏板、望柱包含宋、金、元、明、清时期遗物。"
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
  "lede": "密檐逐层向上收束，莲座与塔刹之间显出纤细挺拔的轮廓。澄灵塔保存金代大修后的砖塔形制，也标记着临济宗祖庭。",
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
    "现存塔貌采用金大定二十五年（1185）大修后的形制，不能以早期祖师建塔沿革代替现构年代。",
    "塔身八角九级密檐，下承雕饰基座与莲瓣。",
    "1985年重新安装塔刹；图版按现状绘制，修补部分与金代主体分别说明。"
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
  "lede": "低缓屋面覆盖着五间殿堂，粗大的梁栱在檐下显露。正定县文庙大成殿的年代，来自结构形制判断，而非后来文庙建置的纪年。",
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
    "大成殿通常断为晚唐至五代，全国重点文物保护单位年代列五代。",
    "面阔五间、进深三间，单檐歇山顶；外侧柱被墙体包裹，正面可见四根柱身。",
    "本条为县文庙大成殿，与正定府文庙不同；不采用明洪武年间的文庙建置年给古殿断代。"
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
  "lede": "一道低平大拱跨过洨河，两侧肩部再开四个小拱。赵州桥把受力与排水的需要化为明晰轮廓，桥面在其上轻轻隆起。",
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
    "安济桥即赵州桥，始建于隋代，传统记载与李春相关。",
    "一座主拱、两肩各两座小拱，构成敞肩式单孔石拱桥。",
    "桥面栏板与局部桥体历经修理，图版依据现状；隋代建造范围不同资料略异。"
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
  "lede": "八角幢身、华盖与莲瓣层层相叠，赵州经幢像一座用经文与雕刻组成的石塔。原开元寺已不存，经幢仍立在城中街口。",
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
    "经幢建于北宋景祐五年（1038），平面八角，共七级。",
    "幢身刻经文，盖、座之间布置佛像、飞天与莲瓣等雕刻。",
    "图版按现存石幢绘制，保留局部残损，不与赵县柏林寺塔或正定开元寺混为一处。"
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
  "lede": "八棱石柱上，经文随石面一行行展开，残裂穿过字迹与莲瓣。龙兴观虽已不存，这座唐代经幢仍把道教经典留在原来的县城中。",
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
    "经幢立于唐开元二十六年（738），刻《道德经》与唐玄宗注。",
    "八棱幢身下承莲座；书者传为苏灵芝，条目保留传称而不作确定署名。",
    "参考照片中上部被保护亭梁遮挡，本图只取可见幢身与莲座，不补绘幢顶或现代亭子。"
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
  "lede": "泰陵隆恩殿以重檐歇山顶和高石台基构成清西陵最早帝陵的礼仪中心。图版择这一殿代表整片陵区。",
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
    "<b>断代</b> 泰陵1730年动工、1736年建成；1737年入葬是另一时间节点。",
    "<b>殿制</b> 隆恩殿面阔五间、进深三间，重檐歇山顶，台前御路与两侧踏跺并列。",
    "<b>陵区</b> 清西陵作为一处陵寝群收录，本图仅绘泰陵隆恩殿，不等同全陵布局。"
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
  "lede": "义慈惠石柱以一根高大的石柱托起小小石殿，石上仿木构留下北齐建筑的细节。柱身长篇颂文讲述乱世中的义葬与救济，也使这座纪念物有了名字。",
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
    "<b>年代</b> 现存石构立于北齐大宁二年（562），更早的木柱前身属于北魏时期。",
    "<b>形制</b> 柱身上承石盘和三间石屋，屋顶、檐椽、斗栱等均以石雕表现。",
    "<b>铭刻</b> 柱颂记录北魏末年战乱及义葬、义食经过；原物在定兴石柱村。"
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
  "lede": "定兴旧城的慈云阁以两层木构托起舒展的重檐，阁内外仍保留元代构架的特点。原寺建筑多已消失，这座小阁独自记录着大悲阁的旧名。",
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
    "<b>年代</b> 现阁重建于元大德十年（1306），属于元代木构遗存。",
    "<b>格局</b> 面阔、进深各三间，平面近方，两层楼阁式。",
    "<b>构架</b> 梁架结合垂柱、抹角梁等做法，保留元代结构与制作手法。"
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
  "lede": "北岳庙的德宁之殿坐在高台上，两重庑殿檐口横向舒展。它曾是皇家遥祭北岳恒山的场所，元代木构、壁画与历代祭祀碑刻共同保存了这处古岳庙的记忆。",
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
    "<b>年代</b> 现殿属元代，资料分别记1270年营建完成与1347年重建，年表以元代约值登记。",
    "<b>殿宇</b> 重檐庑殿顶，周设回廊，整体面阔九间、进深六间，中央踏道登上高台。",
    "<b>祭祀</b> 北岳庙原为遥祭恒山的神庙，殿内保存元代壁画，院中汇集历代碑刻。"
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
  "lede": "修德寺早已不存，一座奇特的砖塔仍立在曲阳城南。素净下层承着布满小塔的中段，上部又收成楼阁式塔身，花塔与楼阁在同一轮廓中相接。",
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
    "<b>年代</b> 现存塔身定为宋代；县方志记1020年塔成，隋代寺院前身另作沿革。",
    "<b>形制</b> 八角砖塔结合楼阁与花塔两种做法，中段遍饰小塔形浮雕。",
    "<b>遗址</b> 寺址曾出土大量北朝至隋唐石造像，年代早于现存宋塔。"
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
  "lede": "七组屋顶如山势层层升起，中央魁阁与两侧号舍连为一体，留下清代地方科举的建筑记忆。",
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
    "<b>科举</b> 贡院始建于乾隆三年（1738），道光十四年（1834）扩建，现有规模主要由此次扩建形成。",
    "<b>形制</b> 图绘魁阁号舍正面：中央魁阁高起，两侧号舍逐次降低，七组屋顶构成鲜明的对称轮廓。",
    "<b>遗存</b> 院内保留号舍、魁阁与揽胜楼等建筑，属于少见的清代地方科举考场遗存。"
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
  "lede": "澹泊敬诚殿是避暑山庄正宫的主殿。卷棚歇山顶舒展开阔，未施浓重彩饰的楠木构架传达着山庄宫殿的朴素取向。",
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
    "<b>现存年代</b> 康熙五十年（1711）始建，乾隆十九年（1754）以楠木改建；图鉴按现存主体1754年定位。",
    "<b>形制</b> 面阔七间、进深三间，单檐卷棚歇山顶，殿前设开阔月台与踏跺。",
    "<b>收录范围</b> 避暑山庄全园作为一处收录；本图仅以正宫澹泊敬诚殿代表，不混入后期亭阁。"
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
  "lede": "大乘阁在六重檐与层层收分之间容纳巨大的千手千眼观音，将汉藏佛寺形制汇在同一座高阁。",
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
    "<b>年代</b> 普宁寺建于乾隆二十年至二十三年（1755—1758），大乘阁为后部核心建筑。",
    "<b>形制</b> 大乘阁外观六重檐，顶部由中央与四角屋顶组成，形成中央高起、四角拱卫的轮廓。",
    "<b>观音</b> 阁内供奉大型木雕千手千眼观音，建筑高度、层间结构与内部造像共同组织空间。"
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
  "lede": "巨大的大红台在层层白台上拔起，方窗、琉璃龛与顶部汉式屋檐，显出承德外八庙独特的汉藏结合。",
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
    "<b>年代</b> 普陀宗乘之庙建于乾隆三十二年至三十六年（1767—1771），以布达拉宫为主要建筑参照。",
    "<b>主体</b> 图绘核心大红台与紧邻白台，宽阔墙面上的方形盲窗和中央琉璃龛带是显著特征。",
    "<b>空间</b> 大红台内围合万法归一殿等礼佛空间；图版取南侧外观，不将山地寺群全景拆作多项。"
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
  "lede": "五间六柱十一楼的石牌坊立在孝陵神道南端，以一连串高低错落的石屋顶开启清东陵的礼仪序列。",
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
    "<b>营建</b> 建筑史学者王其亨据档案考证，石牌坊在康熙十一年（1672）初落成。",
    "<b>形制</b> 五个开间、六根石柱、十一座高低错落的楼顶，构成完整仿木石牌坊。",
    "<b>收录范围</b> 清东陵全陵区为一条记录；本图以孝陵神道石牌坊作代表，不把各帝陵拆分。"
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
  "lede": "玉田净觉寺的正殿香阜宫前出卷棚抱厦，石柱、木架与宽阔屋面相接，呈现清代重修寺院细致的装饰和构造。",
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
    "<b>断代</b> 现存主体按清代遗构收录，年代取约值；寺院早期创建记载不等于现殿营建年。",
    "<b>正殿</b> 所绘香阜宫为歇山顶木构正殿，前有卷棚抱厦，与后院重檐歇山大雄宝殿不同。",
    "<b>院落</b> 寺内山门、过门碑楼和钟鼓楼形制各异，本图只选正殿，不将碑楼误作塔或主殿。"
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
  "lede": "南安寺塔在蔚州旧城屋顶间升起。高首层立在仰莲座上，十三道密檐轻轻收分，铁刹将轮廓延向空中。",
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
    "<b>断代</b> 现存八角密檐砖塔按形制定为辽代，创建确年未明；图鉴用约值。",
    "<b>十三檐</b> 塔为实心，首层较高，四正面作假门、四隅作盲窗；上部十三道砖檐紧密叠置。",
    "<b>修缮层次</b> 现塔座有清康熙四十五年（1706）包砌，东侧受炮损的局部檐角于1986年修补。"
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
  "lede": "低展的单檐歇山屋顶与宽大的明间，勾勒出蔚州释迦寺中殿的元代格局。",
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
    "<b>主体</b> 所绘为寺内中殿，通常称大雄宝殿，为现存最早、体量最大的元代建筑。",
    "<b>形制</b> 大殿面阔、进深各三间，单檐歇山顶，檐下施四铺作单抄斗拱。",
    "<b>沿革</b> 寺院明洪武年间扩建，此后屡修；中殿屋脊、吻兽等有后世补配，殿内天花亦属后加。"
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
  "lede": "十字歇山顶层层交叠，钟楼立在宣化古城街心的高大砖台上，南北券洞让街道穿楼而过。",
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
    "<b>年代</b> 清远楼建于明成化十八年（1482），历代维修，现存主体沿袭明代形制。",
    "<b>结构</b> 楼为三层、三重檐十字歇山顶，中央与两翼屋面前后穿插，形成复杂而清晰的轮廓。",
    "<b>城楼</b> 巨大的砖砌台座中央辟拱券通道；本条以清远楼代表宣化城内楼阁，不另拆邻近楼宇。"
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
  "lede": "鸡鸣驿东门的砖台和两翼城墙保留了驿城入口的纵深。它连接的不只是一座城，也是一套明清邮传与军驿道路。",
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
    "<b>城址</b> 河北省文物局记鸡鸣驿城建于明永乐十八年（1420），明清均有续修。",
    "<b>城墙</b> 砖砌外皮、夯土内心，东西各开一门；本图选择东门门台与相接墙段。",
    "<b>修复区分</b> 图中城楼依现状实拍绘制，近现代修复木屋顶与明代城垣的年代分别说明。"
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
  "lede": "娲皇阁依着涉县凤凰山崖壁而立。石窟与石券上叠起三层木阁，层层檐线紧贴山势，北齐刻经与明清建筑在此相邻。",
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
    "<b>现存年代</b> 图中阁体按明清遗构收录；周边北齐摩崖刻经年代更早，二者不混作同一营建年。",
    "<b>四层关系</b> 底层天然石窟外作石券，上置三层木阁，组成四层主体；图版呈现可见阁面和下层前廊。",
    "<b>构图</b> 依2025年实拍绘贴崖正面与近前台地，略去遮挡的邻近亭阁，不重建未见的后部与高台剖面。"
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
  "lede": "古开元寺的菩萨殿以四根滚龙石柱托起前檐，宽阔硬山屋顶下仍可读出明代重修的层次。",
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
    "<b>现存主体</b> 所绘为古寺第三殿菩萨殿，亦称释迦牟尼殿；明正德十三年（1518）重修。",
    "<b>四柱</b> 殿面阔五间，前檐四根滚龙石柱有1518年铭文，是本图识别重点。",
    "<b>新旧区分</b> 不以1988年火毁后重修的毗卢殿或东侧新寺建筑代表明代原构。"
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
  "lede": "普利寺已不存，方形砖塔仍立在临城的高石台上。底层的千佛雕砖与第二层的立像带，使逐层收分的塔身有了鲜明层次。",
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
    "<b>纪年</b> 河北省文物局定为北宋皇祐三年（1051）；明嘉靖、万历修葺后仍保留宋塔形制。",
    "<b>层制</b> 塔身七层，二层下另设平坐，三层以上渐近密檐；辨层时不把平坐檐当成独立楼层。",
    "<b>砖雕</b> 首层墙面嵌方形佛像雕砖，二层设立佛及转角力士；本图简化密集纹饰以保留轮廓。"
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
  "lede": "千年铁铸巨狮背负莲盆，残损躯体与支撑钢架并存，记录后周冶铸工艺和漫长的保护历程。",
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
    "<b>纪年</b> 铁狮身有“大周广顺三年铸”铭文，对应953年，为后周大型铁铸遗存。",
    "<b>造型</b> 巨狮昂首张口、身披鞍饰，背负莲盆；现物头部、腿足等处存在明显断损。",
    "<b>现状</b> 图版依据2020年原物照片保留残损及钢管支撑，不采用2011年新铸复制品，也不补造缺失部位。"
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
  "lede": "十三层八角砖塔逐级收分，层层券窗与仿木斗拱檐带，在景州城中立起清楚的宋塔轮廓。",
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
    "<b>年代</b> 现存塔身按北宋元丰二年（1079）重建纪年，金、明及近现代均有维修。",
    "<b>层数</b> 塔为八角十三层楼阁式砖塔，高约63.85米，各层以券门和仿木斗拱檐带组织立面。",
    "<b>塔刹</b> 塔顶保留铁刹网与叠置铜葫芦，国保名称为开福寺舍利塔，俗称景州塔。"
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
  "lede": "第20窟前壁坍失后，主尊从洞窟中显露出来。宽肩、圆润面容与袒露右胸的袈裟，保留了北魏早期大像的庄重体量。",
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
    "第16至20窟通称昙曜五窟，是云冈最早的一组大窟。",
    "本图只取第20窟中央释迦牟尼坐像，保留臂部与膝前的实际残损。",
    "圆顶肉髻、长耳和不对称披衣是辨识主像的线索；两旁立像及龛壁未绘入。"
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
  "lede": "两根石柱与柱上的人字形构件，把北齐木构的痕迹留在山岩中。第16窟前廊让天龙山的价值从造像延伸到建筑形制。",
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
    "天龙山石窟分东魏、北齐、隋、唐等营造阶段，本图选北齐第16窟。",
    "前廊柱、莲瓣柱础与人字形铺作由岩石雕出，模仿当时的木构形式。",
    "图版保留入口的风化缺损，仅画前廊局部；不补绘流失造像或现代复原像。"
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
  "lede": "龙山以道教石窟著称，窟内高髻、宽袍的造像与佛教大像自有不同。本图选早期三天大法师窟的中央坐像，保留面部风化后的含蓄轮廓。",
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
    "石窟群中，三天大法师龛与玄真龛依地方文旅资料属唐代，其他主体多为元代营造。",
    "本图只画三天大法师窟主尊，从发髻至盘坐双膝，不代表完整三尊组合。",
    "元代扩凿与全真道有关；图版颜色依据所绘唐代龛像，不以整组国保断代替代单体年代。"
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
  "lede": "宽阔低缓的屋顶落在七间柱网上，檐下铺作疏朗而厚重。崇福寺弥陀殿将金代木构与殿内彩塑、壁画保存于同一空间。",
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
    "弥陀殿始建于金皇统三年（1143），图版按现存殿宇断代。",
    "面阔七间、进深四间，单檐歇山顶；正面八柱分出清楚的柱网。",
    "本图选弥陀殿正面，省去庭院供具与植被；殿内彩塑和壁画未绘入。"
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
  "lede": "万佛殿的屋顶显得格外宽大，巨大的斗拱将深檐托出。小小三间殿堂，留住了北汉时期木构的尺度与气息。",
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
    "万佛殿建于北汉天会七年（963），属于五代十国时期的现存木构。",
    "面阔三间，单檐歇山顶；硕大的铺作与深远出檐形成鲜明比例。",
    "镇国寺与平遥古城、双林寺共同构成世界遗产；图版选万佛殿一座。"
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
  "lede": "斜拱从柱头向两侧伸展，将五间大殿的深檐托起。平遥文庙大成殿的金代纪年，藏在梁架题记之中。",
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
    "大成殿以金大定三年（1163）的重建题记断代，文庙其余建筑另有营建分期。",
    "面阔五间，单檐歇山顶，柱头铺作与斜拱层叠出挑。",
    "图版保留五间六柱与殿前石栏、侧阶；不把院内后世建筑一并归为金构。"
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
  "lede": "迎薰门从南面打开古城的轮廓，券洞、城台与门楼上下叠合。沿着垛口展开的墙身，把街巷与田野分在城内城外。",
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
    "城墙于明洪武三年（1370）扩建并包砖，现貌经历明清及近现代修缮。",
    "图版选南门迎薰门和左右相邻墙段，保留门洞与上方重檐门楼。",
    "平遥古城与双林寺、镇国寺共同列入世界遗产；本条单记城墙，不与寺院重复计数。"
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
  "lede": "两座十三层砖塔立在太原东南，塔刹与砖砌细部各有差别。文峰塔与宣文塔并肩而立，让双塔成为辨认这座城市的轮廓。",
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
    "双塔分期营造于明万历年间，文峰塔较早，宣文塔于万历后期建成。",
    "两塔均为八角十三层；本图保留各自塔刹形状与逐层收分，不将两塔复制成相同轮廓。",
    "永祚寺还有明代无梁殿等建筑，本条以双塔为代表，塔基附近院落省略。"
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
  "lede": "七开间的大悲殿沿院落横向展开，重檐之下仍保存明初官式佛殿的尺度。经历寺院火灾与格局变迁，幸存的殿堂成为认识洪武建筑的重要实物。",
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
    "<b>洪武遗构</b> 现存大悲殿属明洪武朝官式高等级佛殿，木构与殿内造像均有重要研究价值。",
    "<b>七间重檐</b> 大殿面阔七间、进深四间，重檐庑殿顶，图版突出两重檐口与七间柱网。",
    "<b>火后幸存</b> 清同治三年大火后大悲殿幸存；后来重建的山门、钟鼓楼与原明代殿堂分别登记。"
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
  "lede": "三清楼背面兼作后土庙戏台，高高架起的舞台夹在两座八字影壁之间。层叠屋檐与琉璃脊饰，将供奉神祇和酬神演戏的空间紧密组合。",
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
    "<b>殿台合一</b> 三清楼集殿、楼、台于一体，北面戏台突出抱厦，与两侧八字影壁形成围合。",
    "<b>明清营建</b> 现存建筑格局主要形成于明清；元代创建三清观的记载不等于图中戏台全部为元构。",
    "<b>琉璃装饰</b> 屋脊与影壁广施彩色琉璃，线稿以细线保留主要轮廓和图案位置。"
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
  "lede": "卷棚硬山与向院内伸出的歇山抱厦组合成城隍庙倒座戏台，雕花雀替和琉璃脊饰连起祭祀、庙会与戏曲演出的空间。",
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
    "<b>五间戏台</b> 戏台整体面阔五间，前台明间、次间向外出歇山抱厦，形成三间开敞台口。",
    "<b>分辨年代</b> 庙宇起于明洪武年间，现存正殿为明代遗构；图中戏台按清代及后续修缮登记。",
    "<b>组合屋面</b> 卷棚硬山顶与前出歇山屋面并置，琉璃屋脊和木雕装饰是建筑的重要识别特征。"
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
  "lede": "太谷古城中的白塔收分舒缓，八角塔身以砖雕斗栱、出檐和平座模拟楼阁。宋代塔与后来重修的寺院，共同构成城市天际线中的旧地标。",
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
    "<b>元祐白塔</b> 现存白塔建于北宋元祐五年，即1090年，不能将寺院西晋创建传说作为塔的年代。",
    "<b>外七内九</b> 塔为八角楼阁式，文保资料记外观七层、内部九层，砖雕檐座模拟木构斗栱。",
    "<b>寺塔沿革</b> 寺院经明清修葺，晚清火灾后重修殿宇；图版单取保存宋代风格的白塔。"
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
  "lede": "高大的玄鉴楼与后接乐楼、过路戏台相互嵌合，院内望去，层层琉璃屋檐将舞台与楼阁连成一体。不同营建时期留下的空间组合，比一座孤立楼阁更耐看。",
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
    "<b>碑记年代</b> 文物普查据明代碑记核实，玄鉴楼建于1497年，乐楼建于1511年。",
    "<b>屋檐衔接</b> 玄鉴楼北接乐楼，前出过路戏台，屋面与平台形成层叠紧凑的组合。",
    "<b>图版取景</b> 所绘为北侧中央组合，戏台约1523为普查推定，未将元代建庙年作为现存楼阁年代。"
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
  "lede": "三间昊天殿立于月台上，粗壮斗栱托起单檐屋顶。正殿的金代木构、门上金瓜钉与后来殿内绘塑，记录了太符观延续的营建历史。",
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
    "<b>金代正殿</b> 现存昊天玉皇上帝殿属金代遗构，承安五年碑记记载观内创建醮坛。",
    "<b>三间格局</b> 大殿面阔、进深各三间，单檐歇山顶，中央板门两侧置直棂窗。",
    "<b>历代绘塑</b> 殿内造像及院中其他建筑多经历明清营建与重装，所绘主体年代按正殿木构判断。"
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
  "lede": "崇宁殿以七间大殿和环绕石柱廊承接祖庙的中轴，重檐之下龙柱、石栏与历代题匾共同展现关公信仰的礼仪空间。",
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
    "<b>现存清构</b> 庙宇历经重建，现存主殿按清代木构登记，早期建庙记载不作为这座大殿的年代。",
    "<b>七间大殿</b> 崇宁殿面阔七间、进深六间，重檐歇山，廊柱与石栏以龙纹装饰。",
    "<b>祖庙格局</b> 崇宁殿位于解州祖庙前朝区中轴，北面还有春秋楼；本图单取崇宁殿。"
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
  "lede": "龙兴宝塔以平直叠涩的砖檐逐级收束，十三层塔影立在绛州城北高地。现存包砖外观与增高层数，记录了清代对早期古塔的重修。",
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
    "<b>十三层塔</b> 宝塔平面八角，十三层逐渐缩短，塔身以叠涩砖檐分层，整体高约42米。",
    "<b>清代增修</b> 资料记乾隆四十九年1784重修时包青砖并由八级增至十三级，图版按这一现存外观断代。",
    "<b>古寺层积</b> 龙兴寺另存元代大殿、彩塑与碧落碑，各类遗存年代不同，本图只绘宝塔。"
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
  "lede": "绛州大堂以一条舒展的悬山屋脊统领七间立面。粗大的木柱、长额与不等宽的开间，留下元代州署正堂朴实而开阔的空间。",
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
    "<b>元代州署</b> 现存大堂主体为元代遗构，是地方官署正堂的珍贵实例，后世多次修缮。",
    "<b>七间悬山</b> 大堂面阔七间、进深八椽，单檐悬山顶；两端封墙，中部敞口呈不等宽柱网。",
    "<b>减柱大额</b> 前檐十七朵斗拱承托出檐，以减柱和长额获得宽阔空间；原有前抱厦已毁。"
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
  "lede": "马村青龙寺的腰殿把佛、道与世俗人物汇入一堂水陆画。西壁上部三世佛端坐云间，法衣与莲台的细线仍可辨认元明之际画工的手笔。",
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
    "<b>三教水陆</b> 腰殿壁画以佛、道与儒家相关人物共同构成水陆道场，西壁上方三世佛与下方众神分层排列。",
    "<b>分清纪年</b> 腰殿木构有1289年重建记录；壁画经历绘制、补绘，学者提出元末—明初等断代，不能全部套用木构年份。",
    "<b>局部转绘</b> 本图以文保中心公开实拍转绘腰殿西壁上部，保留三世佛和胁侍组合，不代表全殿壁画或彩塑。"
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
  "lede": "献殿与钟鼓楼在稷山城中展开一组玲珑屋檐，后稷楼从后方抬升。琉璃、木刻与石雕共同讲述祭祀后稷和重视农事的地方传统。",
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
    "<b>清代重建</b> 现存献殿、后稷楼和钟鼓楼属清代，1843年重建与后续修缮留下完整的祭祀建筑组合。",
    "<b>三绝相映</b> 稷王庙以琉璃、木刻、石雕见长，献殿梁枋上的农事雕刻表现耕作与收获。",
    "<b>分清遗构</b> 寺内姜嫄殿等另存元代主体；本图为献殿、钟鼓楼及后稷楼上檐，不按元代着色。"
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
  "lede": "砖砌墓室里，斗栱、门窗与栏槛组成地下宅院。一号墓的小侍女从半掩门后探身，身旁的故事浮雕把宋金生活留在细小的砖面上。",
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
    "<b>地下宅院</b> 墓室用砖雕模拟木构住宅，柱、斗栱、门窗与平台共同构成建筑空间。",
    "<b>妇人启门</b> 一号墓中央门扉半开，侍女从门后探身；两侧保留人物故事浮雕。",
    "<b>宋金墓群</b> 墓群整体年代涉及北宋晚期至金代，本图选择金代前期一号墓局部，不代表全部墓室。"
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
  "lede": "汾河东岸的丁村把晋南家族的生活收进一座座四合院。丁坤大院的三间厅堂以木雕和石础见长，两侧厢房围出深而安静的院心。",
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
    "<b>明清宅院</b> 丁村古建筑群现存院落跨明万历至民国，所绘丁坤大院属于清乾隆时期营建。",
    "<b>三代营建</b> 连达的现场记录指出，此院由丁坤、丁嘉伦、丁溪莲祖孙三代相继修建。",
    "<b>院内视角</b> 本图选三间厅堂和两侧厢房局部，保留木构廊柱与庭院关系，不代表完整村落总平面。"
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
  "lede": "府城玉皇庙把天空中的二十八宿塑成有性情的人物。虚日鼠衣袍层叠、神态安静，小鼠与人的组合让古代天文信仰有了可见的面貌。",
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
    "<b>星宿人形</b> 二十八宿彩塑把星宿、动物与人物形象结合，姿态和神情各不相同。",
    "<b>元代彩塑</b> 本图采用官方图集中定为元代的虚日鼠，不以北宋重建寺庙的年份代替彩塑年代。",
    "<b>单尊代表</b> 图版只转绘二十八宿中的虚日鼠，省略彩绘纹样与殿内背景，保留手势、衣袍和动物特征。"
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
  "lede": "海会寺的两座砖塔一高一低，像两段历史并肩而立。小塔布满佛龛，大塔在高处伸出琉璃悬阁，城堡状底座又给它格外稳重的轮廓。",
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
    "<b>小塔十级</b> 六角小砖塔为五代创建、宋代改修，塔身密布小龛，形制与大塔不同。",
    "<b>大塔十三级</b> 明代琉璃大塔为八角十三层，底部三层被城垛式外墙包砌，不能把外露檐数直接当作全部层数。",
    "<b>空中悬阁</b> 第十层向外挑出琉璃平座与围栏，其上仍有三层，构成海会双塔最鲜明的识别点。"
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
  "lede": "开化寺大雄宝殿在山腰展开宽阔的屋檐。三间宋殿内还保存着北宋彩画与经变壁画，木构和画工的笔迹在同一个空间里相遇。",
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
    "<b>熙宁宋殿</b> 大雄宝殿有熙宁六年1073营建依据，三间六椽、单檐歇山，明间檐柱呈方形。",
    "<b>宋代经变</b> 殿内壁画于北宋后期绘成，约1092—1096营绘；其纪年与木构1073分开记录。",
    "<b>木构彩画</b> 梁架上仍见宋代彩画遗存，与壁画共同保存了北宋寺院的室内装饰体系。"
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
  "lede": "游仙寺毗卢殿把宽屋檐压在厚实墙身之上，三间门窗收得紧凑。檐下斗栱与自然弯材构架，保留了北宋前期地方匠作的做法。",
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
    "<b>淳化宋构</b> 毗卢殿通常断于北宋淳化时期，金元以后屡修，寺内各殿并非同一年代。",
    "<b>厚墙深檐</b> 三间六椽、单檐歇山，出檐深远，砖墙贴近檐柱平面，与前廊式佛殿外观不同。",
    "<b>弯材成构</b> 丁栿用天然弯材加工，梁架保存地方匠作特点，另有元代维修题记。"
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
  "lede": "姬氏民居的三间正房以石柱和浅廊守住家门。门墩上的至元三十一年题记，让这座元代住宅有了清楚可读的时间坐标。",
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
    "<b>至元题记</b> 青石门墩题有大元国至元三十一年，即1294年，为民宅断代提供依据。",
    "<b>三间浅廊</b> 正房三间六椽、悬山屋顶，中央入口后退形成浅廊，整体低缓朴素。",
    "<b>现状门窗</b> 木构保留元代特征，方格窗为后世改制，图版按现状绘制并区分年代。"
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
  "lede": "西溪二仙庙的后殿用三间前廊托起宽阔屋檐，斗栱在檐下连续展开。正殿与两侧梳妆楼保留金代形制，也留下晋东南二仙信仰的建筑印记。",
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
    "<b>金代后殿</b> 碑记载1142年开始重建，现存正殿与梳妆楼保留金代风格；庙内其余建筑多属明清。",
    "<b>三间六椽</b> 后殿置于石台基上，面阔三间、进深六椽，单檐歇山顶，门前保留前廊。",
    "<b>二仙信仰</b> 庙宇祭祀二仙，正殿两旁另设二层三檐梳妆楼；本图仅转绘后殿正面。"
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
  "lede": "阜成门内的白塔，以宽阔塔座托起圆鼓塔身。十三天、铜制华盖与塔刹逐层收住轮廓，留下元代藏式佛塔在京城的鲜明形制。",
  "facts": [
    "白塔于1271—1279年营建，与阿尼哥参与元代营造的历史相联系；寺院后续殿宇与修缮另有年代。",
    "图版选择现存白塔全貌，保留塔座、覆钵式塔身、相轮与铜制华盖，不把前方殿宇并入主体。",
    "设色依据现貌区分灰白塔身、灰砖台座与铜盖、金属塔刹，不作全塔金色复原。"
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
  "lede": "五座密檐小塔立在一座石质宝座上。正面五排佛像、底层动物花纹与拱券入口层层叠置，构成北京五塔寺最醒目的石刻轮廓。",
  "facts": [
    "金刚宝座建成于明成化九年（1473），五塔与宝座为一组石质建筑，不是五座分立的砖塔。",
    "宝座立面有五层佛龛，底部另有动物和花纹带。正面视角中后侧两塔被遮挡，不强行把五塔横排展开。",
    "塔檐与龛像为石雕，现貌以灰米石色为主；小型登台亭的琉璃构件与石塔檐分别取色。"
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
  "lede": "黑灰琉璃瓦覆盖上下两层屋面，暗红柱廊与青蓝彩画收在深檐之下。下层如来殿五间、上层万佛阁三间，形成紧凑而清楚的殿阁层次。",
  "facts": [
    "本图只绘如来殿与上层万佛阁的南面，不以寺院总名混入智化殿等其他建筑。",
    "下层面阔五间，上层面阔三间；黑琉璃瓦屋面与檐下彩画分别保留现存材质颜色。",
    "智化寺创建于明正统年间，官方资料有1443、1444两种始建表述，时间轴保留说明而不伪作精确纪年。"
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
  "lede": "十一道石拱沿着低缓桥面展开，狮子栏柱连成一条细长的边线。图版从浅斜侧面看桥，逐孔保留透空，不把桥下阴影画成实体。",
  "facts": [
    "卢沟桥于金代1192年建成，此后历经明清修缮；时间轴采用建成纪年并另记后修。",
    "桥体为十一孔石拱，本图两端桥台、桥墩与连续石狮栏杆完整展示，区别于单大孔的赵州桥。",
    "设色按现貌采用灰石与较浅栏板，十一孔均为真实透空，石狮雕刻细部为艺术简化。"
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
  "lede": "一座白石高台横跨旧时通道，台身上收，顶栏平展。半六角券洞与门框浮雕留下元代过街塔的石质基础，台上已毁的塔殿不作复原。",
  "facts": [
    "云台为元代过街塔塔基，于1342—1345年营建；今日台上已无原塔殿。",
    "中央通道的内洞为半六角形，门框、洞壁有浮雕和多种文字刻经，图版仅以稀疏线条提示雕刻。",
    "现貌图保留空台、石栏、收分台身和券洞，移除现代围挡与外景，不补造历史三塔。"
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
  "lede": "九间大殿以长阔的重檐庑殿顶展开，楠木柱网承托屋面，石台与丹陛在前方层层相接。这里描绘祾恩殿，不以整个长陵陵园的初建年代替殿堂年代。",
  "facts": [
    "祾恩殿面阔九间、进深五间，是长陵祭祀空间的核心建筑；图版选择现存大殿与台基。",
    "故宫介绍记1416年享殿建成、1427年陵园殿宇告竣，营建沿革与后续修缮分别标注。",
    "黄琉璃瓦、暗红木构、檐下青蓝彩画与浅色石台按现貌分区，不把殿内楠木一律画成金色。"
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
  "lede": "八角下层与三重低檐托起圆鼓的覆钵式塔身，环状收分的塔刹在上方拉长轮廓。灰砖间残留浅色粉刷，让这座白塔保留了楼阁与佛塔两种形制的交汇。",
  "facts": [
    "天津国保查询将蓟县白塔时代登记为辽至清，现貌包含后世修缮，不以单一早期年份概括整塔。",
    "图版保留八角下层、三重低檐、覆钵式塔身与环状塔刹，区别于普通密檐塔或纯藏式白塔。",
    "设色保留灰砖、斑驳浅灰粉刷、暗红木门与较深塔刹，不重涂成通体洁白的新塔。"
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
  "lede": "橙黄琉璃瓦下，青蓝彩画与暗红门窗围住大成殿入口。图版聚焦中部立面、香炉与石质丹陛，明确是局部，不以近景照片补造未见的全殿。",
  "facts": [
    "天津文庙始建于1436年，保存府庙、县庙及学宫并列的格局；本图选择府庙大成殿中部。",
    "图版展示檐下三间中部立面、香炉和丹陛，不代表全殿开间数或整座文庙布局。",
    "现存黄琉璃瓦、青蓝彩画、暗红木构和浅灰石台按实拍取色，近现代修缮与初创建置分别说明。"
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
  "lede": "伸出的戏台与两层侧廊相接，方形罩棚内的鸡笼式藻井旋转收拢。图版选择戏台与藻井室内局部，让木雕、梁栱和现存彩绘的层次清楚可见。",
  "facts": [
    "广东会馆于1907年落成，属于清末会馆建筑，今日用作天津戏剧博物馆。",
    "戏台为伸出式，罩棚上方的鸡笼式藻井外方内圆；无落地支柱遮挡台前观看空间。",
    "图版不绘整座会馆外观，选择戏台、悬挂罩棚与短段两层侧廊；移除现代灯管、显示屏和观众桌椅。"
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
  "lede": "八角殿身与两层攒尖屋面，把清初宫廷的一座议政空间收束在黄瓦之下。正面盘龙柱与红色门窗按现貌绘出，不把整座故宫缩成一张单殿图。",
  "facts": [
    "图版主体为大政殿，八角平面、重檐攒尖屋面与正面盘龙柱是识别要点。",
    "按清初现存殿堂入册；沈阳故宫建筑群的营建沿革与单殿年代分别理解。",
    "屋面现存黄橙琉璃与绿边、门柱暗红，梁枋旧色依实拍保留，不作历史复原。"
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
  "lede": "十三层密檐逐级收分，宽阔的第一层塔身嵌满佛龛与造像。白塔的名字不是把砖石涂成纯白的指令，设色仍保留现貌灰褐风化层。",
  "facts": [
    "八角十三层密檐，第一层塔身有佛教浮雕与仿木构装饰。",
    "辽阳市博物馆资料采用辽代断代；具体建年不详，本条不使用有争议的精确纪年。",
    "参考照片下部被植物遮挡，图版仅作保守浅台基，不扩画未经证实的巨型阶台。"
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
  "lede": "两座八角砖塔并立，各有十三层密檐，却不是复制粘贴的同一座塔。西塔稍低，塔身浮雕与残存色彩分别参照两张实拍。",
  "facts": [
    "两塔均为八角十三层密檐，第一层塔身有佛龛、胁侍与飞天等装饰。",
    "文保资料推测建于辽晚期；东塔与西塔现貌还经历后世修缮。",
    "图版由两座单塔照片组织成左右对照，不作为现场塔距或实测比例依据。"
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
  "lede": "农安城里的辽塔以素砖塔身和密集檐带向上收分。它既是辽代遗存，也有现代修缮留下的现貌，两者都写在同一张图的来源记录里。",
  "facts": [
    "八角十三层密檐砖塔，图版保留较素的塔身，不移植辽阳白塔的满壁佛像。",
    "地方志采用辽代建造区间，时间轴为约略定位而非精确竣工纪年。",
    "现貌历经现代修缮；全身、檐部与航拍照片分别用于比例和细部校对。"
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
  "lede": "巨石垒成七级方坛，底层护坟石倚在阶坛前，墓室入口开在上部。将军坟属于高句丽遗存，不能因为年代相近就改挂北魏标签。",
  "facts": [
    "图版核验的是七级主要阶坛，不把每一排砌石都当作独立一级。",
    "墓主存在不同认定，本条不直接断言为长寿王陵，也不混用太王陵图像。",
    "现存灰褐石块、接缝与浅色护坟石取自同一张未数字修补的实拍；不是考古复原图。"
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
  "lede": "十一开间的长立面由十二根前廊柱展开，两层屋面压住红柱与蓝绿梁枋。这里收录的是清末迁建后的大成殿，不把早期文庙初创年贴到现存殿身上。",
  "facts": [
    "立面为十一开间，图版逐根核对十二前柱，并保留两道檐带。",
    "1909年主要建筑建成；后续重修不据此隐去，也不以1736年初创替代主体年代。",
    "黄色琉璃、暗红木构和浅灰石栏依2026年实拍现貌；临时横幅不入图。"
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
  "lede": "莲座、长石柱、八角灯室和亭式盖顶，组成一件独立的石雕长明灯。它按渤海时期入册，身后的后世寺院不随石灯一并变成古代原构。",
  "facts": [
    "石灯幢为独立石刻，图版只绘该主体，排除现代围栏与寺院背景。",
    "石材现貌灰色风化，盖顶与基座局部黄绿为地衣，不是琉璃瓦或木构彩绘。",
    "灯室可见透空窗与基座浅浮雕分别处理，后者保持实体；地图按宁安市代表点归并，不是石灯精确坐标。"
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
  "lede": "红砖钟楼与侧塔围绕巨大的绿金属洋葱穹顶展开。圣索菲亚的早期木教堂另有沿革，今天画下的是1932年落成的砖砌主体。",
  "facts": [
    "大穹顶、钟楼锥顶和侧塔按照真实建筑实拍组织；未使用同名冰雕作参考。",
    "现存砖砌主体1923年开工、1932年落成，不用1907年初建纪年替代。",
    "现貌为红褐砖墙与旧绿金属屋面，小金属顶和十字的浅金仅限照片可见处；现代售票附建不入图。"
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
  "lede": "五座小塔从一座金刚座上升起，中央高、四角低。慈灯寺的殿堂曾经消失，这座清雍正年间的宝塔留在旧城里，仍以砖雕与小型塔檐讲述另一种佛塔形制。",
  "facts": [
    "<b>所绘主体</b> 金刚座舍利宝塔，不包含后世复原的慈灯寺殿堂。",
    "<b>营建</b> 清雍正五年至十年（1727—1732）修建，塔座承托中央七级、四角五级的五座小塔。",
    "<b>形制</b> 砖石塔身与细小琉璃挑檐组合；蒙古文天文图为寺院重要石刻，图版不把它移到正面。"
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
  "lede": "在呼和浩特旧城，大召把藏传佛教的经堂与汉式殿宇连成一体。寺院因银佛得名，现存建筑还叠加着清代改修的痕迹；图版只画大雄宝殿，不把整座召庙压缩成一座山门。",
  "facts": [
    "<b>寺院沿革</b> 明代阿拉坦汗主持营建，1580年寺成；此后清代屡有改修。",
    "<b>所绘主体</b> 以明确标注的大雄宝殿实拍为准，保留汉藏结合的经堂、佛殿体量。",
    "<b>断代说明</b> 现貌包含明清营建与修缮层次；年表使用约略位置，不将寺院初建年等同每个现存构件的年代。"
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
  "lede": "远看像一座木殿，走近才发现屋面、柱梁与门窗都由铜铸成。鸣凤山上的现存金殿建于康熙十年，铜色在风雨中转暗，金属结构却仍保留传统殿宇的细部。",
  "facts": [
    "<b>现存主体</b> 清康熙十年（1671）吴三桂重建的铜殿。",
    "<b>沿革区分</b> 明万历三十年（1602）初建的铜殿后来迁走，不将其年份作为眼前铜殿的建造年。",
    "<b>材料</b> 铜铸屋面、柱梁和格扇立于石台上；设色依据昆明实拍，不能套用武当山金殿。"
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
  "lede": "学海与层层院落的尽头，先师殿以一片舒展的屋面面对古城。文庙始于元代，这座单檐歇山的主体殿堂则属于明弘治年间；石柱与格扇，把云南的工艺细节留在了儒学建筑里。",
  "facts": [
    "<b>所绘主体</b> 先师殿，即大成殿，面阔五间，单檐歇山顶。",
    "<b>年代</b> 殿堂建于明弘治年间（1488—1505）；1285年是文庙初建年代。",
    "<b>石作</b> 外檐青石柱与雕刻格扇为其特色，图版只画先师殿本体，不概括整个文庙。"
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
  "lede": "八角亭不是园林里的赏景小亭，而是傣族南传佛寺的戒堂。层叠屋面向八个方向展开，尖顶轻巧地收束；原来的景真寺大多不存，建于1701年的戒堂历经修缮延续至今。",
  "facts": [
    "<b>用途</b> 南传佛寺戒堂，亦为景真寺现存重要古建筑。",
    "<b>年代</b> 清康熙四十年（1701）创建，近现代多次修缮，不把修缮痕迹藏去。",
    "<b>形制</b> 八向展开的层叠屋面、装饰檐口与砖砌亭身，图版以现存实拍为准。"
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
  "lede": "南明河中的石台上，三层甲秀楼把红柱与三道屋檐叠成贵阳的剪影。它初建于明代，却在数次毁修中改变；今天的图版以宣统元年重修式样及后来修缮形成的现貌为准。",
  "facts": [
    "<b>所绘主体</b> 三层三檐楼体、石台及自有石栏，不把整条浮玉桥和河岸附楼作为一栋建筑。",
    "<b>沿革</b> 明代万历年间初创，多次毁修；现貌依清宣统元年（1909）重修式样。",
    "<b>后世修缮</b> 1981年等维修另记；年表不是明代原构认定，图版也不是文保实测。"
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
  "lede": "文昌阁从贵阳旧城东部升起，三层三檐的屋面却不是常见的四角或八角。九角的轮廓是它的识别特征；明代初建、清代重建与历次维修，共同塑造了今天的阁体。",
  "facts": [
    "<b>年代</b> 明万历三十七年（1609）初建，清康熙八年（1669）重建，随后屡经修缮。",
    "<b>形制</b> 三层、三重檐、九角屋面，图版不把旁边城楼混入文昌阁。",
    "<b>断代</b> 图鉴按现存重建阶段定位，创建年代另行说明。"
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
  "lede": "五重石檐一层层向外舒展，仿木斗拱却由花岗岩雕成。开元寺东塔在南宋完成，如今仍把泉州的石工传统立在西街天际。",
  "facts": [
    "<b>现存主体</b> 镇国塔（东塔），1238—1250年重建为花岗岩石塔；不是唐代木塔原构。",
    "<b>形制</b> 八角五层楼阁式，石柱、斗拱、平座与塔檐模仿木建筑，墙面嵌有佛教人物浮雕。",
    "<b>独立收录</b> 图版只绘东塔；西侧仁寿塔和大雄宝殿分别保留独立条目。"
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
  "lede": "比东塔更早完成的西塔，以五层石身承起细长塔刹。仁寿塔与镇国塔并立，却在斗拱与浮雕题材上各有自己的性格。",
  "facts": [
    "<b>现存主体</b> 仁寿塔（西塔），南宋1228—1237年改建为石塔。",
    "<b>同中有异</b> 与东塔同为八角五层；第三、四、五层的补间斗拱较少，须弥座侧重花兽纹样。",
    "<b>图版范围</b> 仅绘西塔整塔，不合并东塔或已有的大雄宝殿。"
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
  "lede": "海风吹过灰褐石墙，券门藏在低矮城台之下。崇武城以花岗岩筑成海防屏障，南门这一段仍保留着滨海石城的厚重尺度。",
  "facts": [
    "<b>沿革</b> 崇武千户所城始筑于1387年，为明代滨海防御体系一环，现存城墙经历历代维护。",
    "<b>所绘范围</b> 南门券洞、门上建筑与相邻短段城墙；不是整座古城或四座城门合集。",
    "<b>材料与年代</b> 城台由花岗岩砌筑；上部门楼依现状绘制，不能据筑城年份断言全部为明初原构。"
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
  "lede": "一圈黄褐夯土墙收拢数百间房，瓦檐沿圆周轻轻挑出。承启楼以四层外环与层层内院，容纳了永定山间的共同生活。",
  "facts": [
    "<b>营建</b> 明代开始兴建，1709年建成，位于永定高北村，是福建土楼遗产的组成部分。",
    "<b>空间</b> 外环四层，内部多重环形院落及中心祖堂；本图只表现完整外观，不做假想剖切。",
    "<b>材料</b> 夯土外墙、石质墙基、木构居住层与环形瓦顶共同构成土楼。"
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
  "lede": "没有层层楼阁，只有四面券门与一座石砌攒尖顶。四门塔以简洁而厚重的塔室，把隋代石建筑的轮廓留到今天。",
  "facts": [
    "<b>年代依据</b> 塔顶内部发现“大业七年造”题记，对应611年；塔内东魏造像早于塔体，不混为同一年。",
    "<b>形制</b> 单层亭阁式石塔，平面正方，四面辟门，塔心柱面向四方安置佛像。",
    "<b>图版范围</b> 绘整座石塔外观，塔内佛像不作为独立放大主体。"
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
  "lede": "龙、虎与飞天攀上石塔墙面，细密雕刻与厚重须弥座相互衬托。龙虎塔的唐代石身承接后世补建塔顶，一座塔里叠着不同年代的修护。",
  "facts": [
    "<b>断代</b> 塔基与塔身通常依建筑及雕刻风格归入唐代，确切始建年无考；800年仅为年表约略定位。",
    "<b>现存层次</b> 雕刻石身与后世补建的砖砌塔顶应分别看待，不能把全塔当作同年完工原构。",
    "<b>形制</b> 方形塔室、四面门洞及层叠须弥座；名为龙虎塔，不是高雄莲池潭双塔。"
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
  "lede": "双重绿檐铺开七间殿身，石柱与朱红门扇在檐下交错。孟庙亚圣殿经地震后的清代重建，仍是邹城祭祀孟子的中心。",
  "facts": [
    "<b>沿革</b> 1668年地震毁损主殿，五年后重建；1736年又经全面维修，现状也有现代整修。",
    "<b>形制</b> 面阔七间，重檐歇山顶覆绿琉璃瓦，外檐石柱与内檐木构共同承托殿身。",
    "<b>主体辨别</b> 绘孟庙亚圣殿，不是相邻孟府的大堂，也不混作曲阜孔庙大成殿。"
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
  "lede": "方形砖塔一层层收束，檐下以砖模拟木构柱额。这里安放玄奘舍利，兴教寺三塔之中，图版只取中央的玄奘塔。",
  "facts": [
    "<b>主体</b> 玄奘舍利塔，唐总章二年（669）营建；不是三座塔都建于同一年。",
    "<b>形制</b> 方形五层楼阁式砖塔，叠涩出檐，砖砌柱额模拟木建筑。",
    "<b>图版范围</b> 仅绘中央高塔，左右弟子塔不并入本图。"
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
  "lede": "层叠砖檐把方塔逐渐收紧，残缺塔顶仍保留着时间的痕迹。善导塔与香积寺的沿革相伴，现貌不按完整十三层复原。",
  "facts": [
    "<b>年代</b> 建塔与修缮年代有681、706两种文献解释；年表采用唐代约略定位。",
    "<b>形制</b> 方形砖塔，现存十一层，层叠出檐；塔顶已有残损。",
    "<b>现貌</b> 历代修护后的遗存，不补绘已消失的上部两层。"
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
  "lede": "八角砖身高高叠起，塔檐向上逐级收束。崇文塔立在泾阳，明代营建记录与今日的砖塔现貌在这里相遇。",
  "facts": [
    "<b>营建</b> 采用碑记所述1591—1608年，历年介绍有不同纪年，来源记录保留差异。",
    "<b>形制</b> 八角十三层楼阁式砖塔，券门与龛口随层次安排。",
    "<b>图版范围</b> 仅绘塔体与台基，现存截顶按照片保留，不复原早期塔刹。"
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
  "lede": "高大的石碑初立时未刻正文，螭首与整块石身显出庄重轮廓。宋金以后的游人题刻逐渐叠上碑面，无字之名并不意味着今日仍然空白。",
  "facts": [
    "<b>材质</b> 石灰岩一石雕成，碑首刻八条螭，碑座为长方形石座。",
    "<b>题刻</b> 初无正文，宋金以后陆续留下题词；名称不是现存碑面状态的字面描述。",
    "<b>年代</b> 唐代遗存，立碑确年未定；图版不把约略排序年当成史实。"
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
  "lede": "单檐歇山顶下，宽阔前廊托住五间大殿。韩城文庙在元代旧址上重建，柱额之间仍能看到较早木构做法的延续。",
  "facts": [
    "<b>重建</b> 地方志记1371年在元代旧址重建，之后多次修护。",
    "<b>主体</b> 大成殿面阔五间，前廊面阔三大间，单檐歇山顶。",
    "<b>断代</b> 保留元代建筑手法，不把整座文庙或全部构件等同于一个年份。"
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
  "lede": "七层八角砖身略有倾斜，层层叠涩檐向上收束。大秦寺塔的现存断代与寺院更早的源流应分开看，图版只记录今日塔体。",
  "facts": [
    "<b>断代</b> 第六批全国重点文物保护单位名录列为宋代，确切营建年未定。",
    "<b>形制</b> 八角七层楼阁式砖塔，现存塔身略倾斜。",
    "<b>历史区分</b> 寺院源流与景教关联的讨论，不直接作为现存塔体的唐代纪年。"
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
  "lede": "八角九层的砖塔立在宝塔山，轮廓已成为延安的标识。塔的唐宋沿革与明代重修层次并存，图版按今日所见形制绘制。",
  "facts": [
    "<b>形制</b> 八角九层楼阁式砖塔，下层高大，叠涩檐随塔身逐渐收分。",
    "<b>年代层次</b> 国保名录标宋，现存塔形资料记为明代；本条按明代重修现貌入年表，确年留待考。",
    "<b>图版范围</b> 仅绘塔体，不并入山上其他古迹或现代照明设施。"
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
  "lede": "灰砖、石柱与屋脊上的陶塑，把宗族祠堂的入口做成一面细密的岭南工艺展墙。图版只取中央头门，不拼接后部院落。",
  "id": "gd_chen",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "陈家祠中央头门立面 · 线稿",
    "清 · 1893"
  ],
  "facts": [
    "<b>主体</b> 陈家祠中央头门立面。",
    "<b>年代</b> 1893为陈家祠落成年；图版取中央头门现状，修护后的构件不全部视为同年原作。",
    "<b>图版范围</b> 中央头门及左右相接屋面的可见立面；硬山坡屋面、人物陶塑花脊、石柱石梁，中央门洞，不复原庭院后殿。"
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
  "lede": "三重檐向外伸展，下层木柱敞开，阁体稳稳坐在经略台上。木构的承托关系比楼层的高度更令人好奇。",
  "id": "gx_zhenwu",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "经略台真武阁完整阁体 · 线稿",
    "明 · 1573"
  ],
  "facts": [
    "<b>主体</b> 经略台真武阁完整阁体。",
    "<b>年代</b> 1573取真武阁营建年代；经略台的较早历史与现存阁体分列，后世修护不等于重建整阁。",
    "<b>图版范围</b> 三重檐与两层阁身、翘角、下层开放木柱，基台完整；不画周边仿古建筑。"
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
  "lede": "前阁低、后阁高，屋面逐次抬起，开放木柱之间能看到内部梁架。合浦永安的小阁，以相连体量和木构关系留下鲜明轮廓。",
  "id": "gx_dashi",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "合浦永安大士阁前阁及相连后阁 · 线稿",
    "明 · 明代"
  ],
  "facts": [
    "<b>主体</b> 合浦永安大士阁前阁及相连后阁。",
    "<b>年代</b> 第三批国保名单列明代；1500仅作明代近似排序点，不是经考定的营建年。图版绘前后相连阁体，外围香炉亭不属于所绘主体。",
    "<b>图版范围</b> 前低后高相连阁体，下层开敞木柱，灰瓦、蓝绿彩绘檐口，不把左右香炉亭并入。"
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
  "lede": "三座券门之上，陶塑花脊横向铺展；两端屋面抬起，入口像一条收拢的街景。图版取三门，不包含池岸和前方陈设。",
  "id": "gd_zumiao",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "佛山祖庙三门立面 · 线稿",
    "明清 · 明清"
  ],
  "facts": [
    "<b>主体</b> 佛山祖庙三门立面。",
    "<b>年代</b> 1600仅是明清现存主体的近似排序点，不是三门确切建成年。祖庙北宋创建、明洪武重建与三门现状年代不能混为一谈。",
    "<b>图版范围</b> 三座券门、长陶塑花脊和两端上层屋面；不画池岸栏杆、香炉和前方石狮。"
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
  "lede": "方整的居住楼体上，柱廊、穹顶与瞭望亭层层升起。乡土防卫与侨乡建筑趣味在一座九层碉楼上相遇。",
  "tall": true,
  "id": "gd_ruishi",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "开平锦江里瑞石楼完整楼体 · 线稿",
    "民国 · 1925"
  ],
  "facts": [
    "<b>主体</b> 开平锦江里瑞石楼完整楼体。",
    "<b>年代</b> 1925取瑞石楼落成年，非开平全部碉楼年代；国保归属“开平碉楼”，世界遗产认定另属一种制度。",
    "<b>图版范围</b> 九层碉楼体量，五层主体与上部柱廊、角亭、中央瞭望亭分开；保留照片轻微仰视，不变成中国 pagoda。"
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
  "lede": "五座楼亭沿连续木廊展开，石墩把长桥托在河面之上。它既是通路，也是遮雨、停留和相聚的地方。",
  "id": "gx_chengyang",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "程阳永济桥全桥与五座楼亭 · 线稿",
    "民国 · 1924竣工"
  ],
  "facts": [
    "<b>主体</b> 程阳永济桥全桥与五座楼亭。",
    "<b>年代</b> 沿《三江文史资料》第七辑取1924竣工；1911倡修或1912开工不等于竣工年。桥经历后世维修，图版按实拍现状绘完整五亭全桥。",
    "<b>图版范围</b> 五座楼亭、连续木廊与船形石墩，全桥而非端部局部；中央攒尖顶与两端歇山顶区分。"
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
  "lede": "五开间大殿的木架保留宋代建筑特征，屋面却留下后世修缮的改变。小庵不以规模取胜，值得看的正是木构与历史层累。",
  "id": "gd_meian",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "梅庵大雄宝殿完整殿体 · 线稿",
    "宋 · 北宋"
  ],
  "facts": [
    "<b>主体</b> 梅庵大雄宝殿完整殿体。",
    "<b>年代</b> 梅庵创建于996；1000仅为宋代遗构的近似排序点，不认定现存殿每一构件同年完工。大雄宝殿保留宋代木构特征，屋顶经后世修缮改为硬山，图版按现状。",
    "<b>图版范围</b> 现状硬山顶与五开间宋代木构殿身，三进深；不改为历史初建歇山顶，不画香炉与树。"
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
  "lede": "大成殿立在高台上，重檐与陶塑屋脊将视线向上牵引。图版只取文庙主殿，不把香炉亭、庑房或相邻武庙并入。",
  "id": "gx_gongcheng",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "恭城文庙大成殿 · 线稿",
    "明清 · 明清"
  ],
  "facts": [
    "<b>主体</b> 恭城文庙大成殿。",
    "<b>年代</b> 第六批国保名录将恭城古建筑群列为明至清。1700仅是明清现存主体的近似排序点；创建、历代重修和今殿构件年代不混作一个精确年份。",
    "<b>图版范围</b> 三开间重檐歇山大成殿，橙黄瓦面、灰石柱；不把前方香炉亭及两旁庑房画作主殿。"
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
  "lede": "三重檐层层伸展，最上层盔顶轻轻收拢。楼在洞庭湖边，图中只留这座清代形制的木楼。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "岳阳楼三层主体楼阁 · 线稿",
    "清 · 1880"
  ],
  "facts": [
    "<b>主体</b> 岳阳楼三层主体楼阁。",
    "<b>年代</b> 按清光绪六年（1880）重建所形成的现存楼阁形制定年；1984年落架大修延续旧制，不以三国阅军楼传说或北宋重修年为本图年代。",
    "<b>图版范围</b> 三层、三重檐、盔式屋顶；只画楼体、短石台基和栏杆，不画下方城门、左右石坊或附属亭。"
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
  "lede": "宽阔的重檐屋面覆住七间正殿，长列石柱把檐下的暗处撑开。南岳的祭祀空间，在这里收成一张殿堂图。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "南岳大庙圣帝殿 · 线稿",
    "清 · 1882 · 后世修护"
  ],
  "facts": [
    "<b>主体</b> 南岳大庙圣帝殿。",
    "<b>年代</b> 1882取南岳大庙现存主体重建年代；圣帝殿后有修护、换柱等变化，图绘实拍现状，不将全庙唐代初创年当作本殿年代。",
    "<b>图版范围</b> 完整圣帝殿、七间立面、重檐歇山、石柱外廊；现状照片主控，1909老照片只补被游客与树遮住的建筑轮廓；不画香炉亭。"
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
  "lede": "灰瓦屋脊彼此接续，天井与山墙藏在层层屋面之间。这里画的是古村一角，而不是把一千多间房屋压成同一座宅院。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "张谷英村明清民居屋面群局部 · 线稿",
    "明 · 清 · 明—清"
  ],
  "facts": [
    "<b>主体</b> 张谷英村明清民居屋面群局部。",
    "<b>年代</b> 现存民居是明清多期续建的建筑群；1700仅作宽泛年代排序点，不指某栋宅院的准确建造年。图绘实拍可见屋面群局部，不称全村复原，也不把张氏定居年代等同于现存房屋年代。",
    "<b>图版范围</b> 按现状照片保留相连民居屋面、硬山山墙和可见天井，采用高位斜视；明确局部，不编造全村鸟瞰布局或一座孤立宫殿。"
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
  "lede": "一座门坊的青石上，人物、禽兽、花木层层展开。高起的中段与两侧低檐，让雕刻也有了建筑的节奏。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "芷江天后宫石坊完整立面 · 线稿",
    "清 · 1748"
  ],
  "facts": [
    "<b>主体</b> 芷江天后宫石坊完整立面。",
    "<b>年代</b> 按1748年现存青石门坊营建年代定位；1684年的福建会馆历史分列。图绘石坊及紧邻台阶，不是天后宫全院。",
    "<b>图版范围</b> 中央高、左右低的石坊门楼，石雕面板与中央门洞；顶端鱼吻完整，底部石鼓与两侧近门石狮保留，不延伸整面围墙。"
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
  "lede": "瓦垄、梁柱、斗拱都不是木头，而是铜铸构件。双重屋面仍像一座小木殿，沉静的金色停在武当最高处。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "武当山天柱峰明代金殿 · 线稿",
    "明 · 1416"
  ],
  "facts": [
    "<b>主体</b> 武当山天柱峰明代金殿。",
    "<b>年代</b> 绘天柱峰现存明代金殿，按永乐十四年（1416）定位；不与移置转运殿内的元代古铜殿混同。国保正式单位含元明铜殿，本图只画明殿。",
    "<b>图版范围</b> 完整明金殿、两重檐、三间立面、铸铜仿木斗拱和门扇；不画左右铜鹤、香炉、蒲团、周边宫观；不是元代单檐古铜殿。"
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
  "lede": "绿色重檐覆着红色殿身，层叠石台把正殿托高。只留大殿与台阶，就能看见武当建筑顺着山势展开的方式。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "紫霄宫紫霄大殿与正面台基 · 线稿",
    "明 · 明永乐年间"
  ],
  "facts": [
    "<b>主体</b> 紫霄宫紫霄大殿与正面台基。",
    "<b>年代</b> 紫霄大殿按明永乐年间营建定位，1413是宫观本期营建的排序参照，不伪装成本殿确切竣工年；后有修缮，图绘研究照片所示现状。宋代创建史与所绘明殿分列。",
    "<b>图版范围</b> 五间紫霄大殿、重檐歇山、三层正面石台与中央台阶；不画左右庑房与远山，移除石碑、香炉、游客。"
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
  "lede": "十三层小小的檐口逐级收分，铁铸的斗拱也模仿木构。塔身的暗褐锈色，和顶端后来配上的塔刹并不相同。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "当阳玉泉寺十三层铁塔 · 线稿",
    "北宋 · 1061 · 塔刹后配"
  ],
  "facts": [
    "<b>主体</b> 当阳玉泉寺十三层铁塔。",
    "<b>年代</b> 铁塔身按北宋嘉祐六年（1061）铸造年代定位，顶部塔刹为清代后配；图中两期构件分列，不把现代寺院建筑一并定为宋。",
    "<b>图版范围</b> 八角十三层楼阁式铁塔、完整塔刹、逐级收分；只画铁塔和短基座，不画高大挡墙或周围树林。"
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
  "lede": "石柱立起三道门，黄釉影壁填入柱间。屋面般的石构退到两旁，中门向神道敞开，留下陵寝最清晰的一段轮廓。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "明显陵棂星门石坊及相连琉璃影壁 · 线稿",
    "明 · 明嘉靖年间"
  ],
  "facts": [
    "<b>主体</b> 明显陵棂星门石坊及相连琉璃影壁。",
    "<b>年代</b> 现存棂星门属于显陵明代石构遗存；1540仅作嘉靖期宽泛排序点，不是此石坊准确竣工年。只绘石坊及相连琉璃影壁，不画1990年复原的明楼，也不以帝陵初建年统领全部建筑。",
    "<b>图版范围</b> 三门六柱四楼的棂星门，中央与两侧冲天石柱、犼和宝珠，相连黄釉影壁；不并入前方文官石像、整条神道或复原明楼。"
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
  "lede": "三层关楼立在厚实门台上，一道拱券穿过黄土色城墙。只取西关楼，不把光化、柔远两楼拼入同一幅图。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "西侧嘉峪关楼与门台 · 线稿",
    "明 · 弘治—正德"
  ],
  "facts": [
    "<b>主体</b> 西侧嘉峪关楼与门台。",
    "<b>年代</b> 图绘西侧嘉峪关楼与门台。关楼在明弘治至正德年间营建，后世持续修缮；1500仅为约略排序，不等于竣工年份，也不以1372年始置关替代楼的年代。",
    "<b>图版范围</b> 三层三重檐楼阁；厚门台、正下方一处拱券和左右短雉堞城墙；完整屋角与台基，不画另外两座楼。"
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
  "lede": "粗大的覆钵托起细长相轮，周围小塔错落。图中保留土塔清楚可见的上部，省去前殿和院墙；不是大佛殿或木塔。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "弥陀千佛塔露明塔身与塔刹 · 线稿",
    "明 · 明代"
  ],
  "facts": [
    "<b>主体</b> 弥陀千佛塔露明塔身与塔刹。",
    "<b>年代</b> 土塔约建于明代，1500仅为明代约略排序。1927年地震损毁顶部，1986年修复；本图取实拍可见的上部塔身与塔刹，不虚构被前殿和院墙遮住的下部基座。",
    "<b>图版范围</b> 只画照片露明的土塔上部：局部方形须弥座、四角露明小塔、粗大覆钵、佛龛段、细长相轮与冠盖宝顶；不补画被遮住的双层回廊和完整大基座。"
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
  "lede": "五间仪门横在中轴线上，红柱间留出礼仪通道。它不是最前方的牌坊，也不是后面的先天殿。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "伏羲庙仪门 · 线稿",
    "清 · 1805"
  ],
  "facts": [
    "<b>主体</b> 伏羲庙仪门。",
    "<b>年代</b> 仪门1523年始建，1805年重修时由三间改为五间；图绘现存五间仪门，以1805年形制定年，不把整庙1483—1484年初建当成此门年代。2026年初完成包括仪门在内的屋面与檐部修缮。",
    "<b>图版范围</b> 五间单檐仪门与门前短台阶；红柱与通透的中央通道；不画后方先天殿、柏树和左右附属建筑；牌匾留白。"
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
  "lede": "大佛倚着石崖端坐，宽阔袈裟留出安静的大块面。一侧按膝手尚完整，另一侧保留现状残损，不把上方洞窟和栈道画进来。",
  "initialStatus": "unvisited",
  "country": "CN",
  "caption": [
    "第171龛弥勒大佛 · 线稿",
    "唐 · 731"
  ],
  "facts": [
    "<b>主体</b> 第171龛弥勒大佛。",
    "<b>年代</b> 图绘第171龛大佛，按保护研究所专家所述唐开元十九年（731）雕凿定年；上半身石雕、腹部以下泥塑，后世修护，不以西秦早期洞窟纪年替代此像年代。",
    "<b>图版范围</b> 完整弥勒坐像：卷发、长耳、宽袈裟、垂足；保留现状一侧完整按膝手与另一侧残损，不补成双手完好；仅留贴体短岩龛，不画第169窟和栈道。"
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
    "lede": "七层飞檐在塔心外逐级展开，木栏与黄墙绕塔相间。龙华塔沿袭吴越重建的古老塔体，又在历代修缮中保留砖木楼阁塔的层叠轮廓。",
    "facts": [
      "相传初建于三国，现存塔主体为吴越王钱俶于北宋太平兴国二年（977）重建；传说年代与现存主体分开记录。",
      "楼阁式砖木塔，八面七层，通高约40.4米；塔身向上逐级收分，外有木檐与平座栏杆。",
      "历经多次修缮，外部木构与古老砖塔主体并非全部同龄。图版依据日间实拍描绘现貌，仅收古塔，不包含寺内后世殿宇。"
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
    lede: '古城四条街在高大的砖台下交会，四层木楼向上收分。光岳楼将城中交通的交点，变成了一座层层出檐的地标。',
    facts: ['光岳楼建成于明洪武七年（1374），位于东昌府古城中心。', '图版绘整楼与砖台基，四层楼身、层叠屋檐与台基券洞构成主要轮廓。', '设色依据2024年实拍，保留灰瓦、朱红木壁与蓝绿彩画的材质区别。'],
    caption: ['光岳楼 · 整楼与台基', '四层木楼 · 明洪武七年（1374）'], tall: false,
  },
  {
    id: 'sd_yantai_huiguan', name: '烟台福建会馆', short: '福建会馆', sub: '天后行宫 · 沿街外观', types: ['hall'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '清', era: '清光绪十年始建 · 三十二年落成', year: 1906, yearNote: '1884年始建、1906年落成；所绘为2023年实拍中的沿街外观，照片早于2025年修缮。', place: '山东烟台 · 芝罘区', placeKey: 'sd_yantai',
    lede: '闽商把泉州的砖瓦木石与工艺带到烟台。红墙、风火墙和燕尾屋脊，让这座北方港城的会馆保留了鲜明的闽南面貌。',
    facts: ['福建会馆由闽商集资，1884年动工，1906年落成，又称天后行宫。', '砖瓦木石在泉州一带采办、加工，再运到烟台组装。', '图版取沿街可见的墙门与屋面，不展示整组院落平面；材质色依据2023年照片。'],
    legacyNames: ['烟台天后行宫', '烟台民俗博物馆'], caption: ['烟台福建会馆 · 沿街外观', '闽南会馆 · 清光绪三十二年（1906）'], tall: false,
  },
  {
    id: 'sd_jiuding', name: '九顶塔', short: '九顶塔', sub: '济南 · 灵鹫山', types: ['pagoda'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'tang', tag: '唐', era: '唐代遗塔 · 后世维修', year: 750, yearLabel: '唐代', yearApprox: true, yearNote: '750仅用于唐代的年表约略定位，不是确切建年；现存塔包括后世维修，不将民俗园的年代计为古塔年代。', place: '山东济南 · 柳埠灵鹫山', placeKey: 'jinan_liubu',
    lede: '单层八角砖塔的檐顶不是一座塔刹，而是九座小塔：八座环列，一座居中高起。塔名直接来自这组少见的轮廓。',
    facts: ['九顶塔位于九塔寺遗址，现存主体一般认定为唐代遗物，确切建年未在本批资料中确认。', '塔身为单层八角，檐部叠涩出挑，上承八座外围小塔与一座中央小塔。', '透视图仅绘该角度可见的小塔，背面不强行展开；1962年曾维修。'],
    caption: ['九顶塔 · 八角砖塔', '九座小塔 · 唐代遗塔'], tall: true,
  },
  {
    id: 'sd_hongjialou', name: '洪家楼天主教堂', short: '洪楼教堂', sub: '耶稣圣心主教座堂 · 正立面', types: ['church'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '清', era: '清光绪三十一年竣工', year: 1905, yearNote: '年代对应1905年竣工的现存教堂，区分此前洪家楼的旧教堂与后来的修缮。', place: '山东济南 · 洪家楼', placeKey: 'sd_jinan',
    lede: '两座高耸尖塔夹着玫瑰窗，尖券、扶壁与石饰连续铺展。洪楼教堂的正立面，用灰褐砖石组成济南近代宗教建筑的一张面孔。',
    facts: ['现存教堂于1905年竣工，坐东朝西，平面呈十字形。', '图版选正立面，保留双尖塔、中央玫瑰窗与三组尖券入口。', '灰色塔顶、灰褐砖石、深褐门与红褐百叶按实拍分别设色。'],
    legacyNames: ['洪家楼教堂', '洪楼教堂', '洪家楼耶稣圣心主教座堂'], caption: ['洪家楼天主教堂 · 正立面', '双尖塔 · 清光绪三十一年（1905）'], tall: true,
  },
  {
    id: 'sd_qingdao_catholic', name: '青岛天主教堂', short: '圣弥厄尔', sub: '圣弥厄尔教堂 · 西立面', types: ['church'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'modern', tag: '民国', era: '1934年建成', year: 1934, yearNote: '1932年动工、1934年建成；年代对应现存圣弥厄尔教堂，不沿用附近德国建筑的清代年代。', place: '山东青岛 · 浙江路', placeKey: 'sd_qingdao',
    lede: '黄米色墙面托起两座红瓦尖顶钟塔，中央玫瑰窗与三道券门层层对齐。教堂把哥特式与罗马式的构件，组合成青岛老城醒目的轮廓。',
    facts: ['教堂1934年建成，平面为拉丁十字形，两座钟塔左右对称。', '图版取西立面略带侧面的视角，保留圆形玫瑰窗、券门与侧部阶梯塔。', '两座红瓦尖顶与济南洪楼教堂的灰色尖塔分别呈现，名称也与青岛基督教堂分开登记。'],
    legacyNames: ['圣弥厄尔教堂', '圣弥厄尔大教堂', '圣弥爱尔大教堂', '圣弥额尔教堂'], caption: ['青岛天主教堂 · 西立面', '双钟塔 · 1934年建成'], tall: true,
  },
  {
    id: 'sd_qingdao_christ', name: '青岛基督教堂', short: '基督教堂', sub: '江苏路 · 主堂与钟楼', types: ['church'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '清', era: '1908—1910年建造', year: 1910, yearNote: '年代对应1908—1910年建造的主堂与钟楼；与1934年建成的青岛天主教堂分开。', place: '山东青岛 · 江苏路', placeKey: 'sd_qingdao',
    lede: '一侧钟楼高起，另一侧主堂以曲线山墙收束，构图并不对称。红瓦、黄墙、粗面石材与绿色铜顶，在这座教堂上各有自己的位置。',
    facts: ['教堂建于1908—1910年，由主堂与钟楼组成，位于江苏路15号。', '钟楼设大钟面，墙基与转角使用粗面花岗岩，屋顶覆红瓦，钟楼尖顶呈绿色。', '作为青岛德国建筑群的一部分于第六批并入第四批国保单位，单体入选批次与母单位首次批次分别记录。'],
    legacyNames: ['江苏路基督教堂', '青岛德国礼拜堂'], caption: ['青岛基督教堂 · 主堂与钟楼', '不对称立面 · 1910年建成'], tall: false,
  },
  {
    id: 'sd_yanmiao', name: '曲阜颜庙', short: '颜庙', sub: '复圣殿 · 七间重檐', types: ['hall'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'ming', tag: '明', era: '明正德二年复圣殿重建', year: 1507, yearNote: '图版对应1507年重建后的七间复圣殿，明清及1934、1978、2006年继续修缮；不采用颜庙元代迁址年代或1509年碑亭建年代表本殿。', place: '山东曲阜 · 陋巷', placeKey: 'qufu',
    lede: '颜庙奉祀颜回，正殿复圣殿以七间重檐歇山展开。殿前石雕龙柱与露台栏杆，把儒家庙宇的礼制落实在柱、阶与屋檐之间。',
    facts: ['复圣殿原为元代五间重檐，明正德二年（1507）重建后为七间，后经多次修缮。', '前廊四根石雕龙柱与其他八角石柱承托重檐绿瓦歇山顶，殿前设露台。', '颜庙为全国重点文物保护单位；图版仅取复圣殿，与曲阜孔庙大成殿分别建卡。'],
    legacyNames: ['复圣庙', '颜子庙', '颜庙复圣殿'], caption: ['曲阜颜庙 · 复圣殿', '七间重檐 · 明正德二年（1507）重建'], tall: false,
  },
  {
    id: 'sd_chongjue', name: '崇觉寺铁塔', short: '济宁铁塔', sub: '九层塔身与上部台座', types: ['pagoda'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'song', tag: '宋 · 明', era: '宋崇宁四年建七层 · 明万历九年增两层', year: 1105, yearLabel: '1105 · 1581', yearNote: '1105对应宋代七层铁铸主体；1581增建两层并加塔刹，现存九层不能全部标作宋建。图版仅绘照片可见塔身及上部台座。', place: '山东济宁 · 崇觉寺', placeKey: 'sd_jining',
    lede: '铁浇铸成楼阁的柱、枋、栏杆与飞檐，九层八角塔逐级收分。宋代开建、明代补齐上部，铁塔把仿木结构与铸造工艺结合在一起。',
    facts: ['北宋崇宁四年（1105）浇铸七层；明万历九年（1581）增建两层并加塔刹。', '铁铸塔身为八角九层，每层分塔身、平座、围栏与斗拱塔檐，具有仿木楼阁特征。', '参考照片未完整展示下部砖台座，图版保留完整塔身与可见上部台座，不补画被裁掉的基座。'],
    legacyNames: ['济宁铁塔', '崇觉寺释迦塔'], caption: ['崇觉寺铁塔 · 塔身与上部台座', '宋建七层 · 明增两层与塔刹'], tall: true,
  }
);

// 第一批国保补录；现存图版的主体与初创年代分开说明。
SITES.push(
  {
    id: 'sd_xiaotang_shrine', name: '孝堂山郭氏墓石祠', short: '孝堂山石祠', sub: '东汉石室 · 不含现代罩屋', types: ['hall'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'han', tag: '东汉', era: '东汉早期 · 约一世纪', year: 50, yearApprox: true, yearLabel: '约一世纪', yearNote: '图版绘罩屋内的东汉石祠本体；约一世纪是考古断代，并非精确建年。', place: '山东济南 · 长清孝堂山', placeKey: 'sd_xiaoli',
    lede: '一座小石室藏在后建的保护屋内。石板模仿汉代屋顶的瓦垄与出檐，室内画像让早期地面建筑与丧葬图像同时留存。',
    facts: ['石祠大致建于东汉早期，是现存很早的地面石筑石刻建筑。', '主体以青石板砌筑，单檐悬山顶，正面分两间；图版仅绘石祠，不把外部红柱罩屋当作汉代原构。', '“郭氏”是沿用的文物名称；墓主的具体身份仍有讨论，不据传说断定为郭巨。'],
    legacyNames: ['孝堂山汉石室', '孝堂山石祠', '郭氏墓石祠'], caption: ['孝堂山郭氏墓石祠 · 石室本体', '东汉早期 · 现状意写'],
  },
  {
    id: 'fj_qingjing_gate', name: '泉州清净寺', short: '清净寺', sub: '入口石门楼 · 尖拱', types: ['mosque', 'gate'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'song', tag: '北宋', era: '大中祥符二年始建', year: 1009, yearNote: '1009年为清净寺始建年，现存门楼经历元至大三年（1310）重修及后世维修；图版是现状，不宣称每块石料都为宋构。', place: '福建泉州 · 涂门街', placeKey: 'quanzhou',
    lede: '逐层内凹的尖拱从街面通向寺院，石门楼把西亚清真寺形制留在宋元泉州的港口城市。',
    facts: ['清净寺始建于北宋大中祥符二年（1009），元至大三年（1310）曾重修。', '现存门楼的第一、二进门道均呈尖拱，拱顶为半穹形。', '图版绘门楼与相连石墙，不把寺内礼拜堂或后建建筑并入这一张图。'],
    legacyNames: ['艾苏哈卜寺', '泉州清净寺门楼'], caption: ['泉州清净寺 · 入口石门楼', '北宋始建 · 元代重修'],
  },
  {
    id: 'fj_anping_bridge', name: '安平桥', short: '五里桥', sub: '石板桥面与桥墩局部', types: ['bridge'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'song', tag: '南宋', era: '绍兴八年始建 · 约绍兴二十二年建成', year: 1152, yearNote: '1138年始建；泉州市文旅局记1152年建成，另有资料记1151年续成。图版仅画现存桥面的一段，不以局部代替全长。', place: '福建泉州 · 安海—水头', placeKey: 'fj_anhai',
    lede: '巨大的花岗石板横压在石墩上，桥面绵延过旧海湾。五里长桥曾把安海与水头的商贸道路接在一起。',
    facts: ['安平桥始建于南宋绍兴八年（1138），现存桥长约2.25公里，是平梁式石桥。', '石梁架于桥墩之上，桥墩因水流与地势采用不同形制；图版选石板桥面、栏杆与近处桥墩的局部。', '现状经过历代修缮，局部示意不作为全桥测绘或精确桥墩计数。'],
    legacyNames: ['安海五里桥', '五里桥'], caption: ['安平桥 · 石板桥面与桥墩局部', '南宋始建 · 现状意写'],
  },
  {
    id: 'bj_yunju_north', name: '房山云居寺塔及石经', short: '云居寺北塔', sub: '辽代北塔 · 罗汉塔', types: ['pagoda'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'liao', tag: '辽', era: '辽代始建 · 明代修葺', year: 1100, yearApprox: true, yearLabel: '辽代', yearNote: '北塔始建于辽代，确切建年未核定，后经明代及其他时期修葺；此处不以云居寺隋代刻经的开端作为北塔年代。', place: '北京房山 · 云居寺', placeKey: 'bj_yunju',
    lede: '北塔下为层叠楼阁，中部圆鼓，上部高高收束为钟形；云居寺石经的千年刊刻史则在塔外延续。',
    facts: ['云居寺北塔又称罗汉塔、舍利塔，始建于辽代，明代曾修葺。', '下部楼阁、中部鼓形、上部钟形叠合，是北塔罕见的轮廓；图版只画北塔，不以近年重建的南塔替代。', '“云居寺塔及石经”是国保单位名；石经与塔的年代各有脉络，不能合成一个建年。'],
    legacyNames: ['云居寺罗汉塔', '云居寺舍利塔', '云居寺塔及石经'], caption: ['云居寺塔及石经 · 辽代北塔', '辽代始建 · 后世修葺'], tall: true,
  },
  {
    id: 'xz_jokhang', name: '大昭寺', short: '大昭寺', sub: '现状正立面 · 多期建筑', types: ['hall'], country: 'CN', initialStatus: 'unvisited',
    dyn: 'tubo', tag: '吐蕃', era: '七世纪中叶始建', year: 647, yearNote: '647年是寺院始建的传统记载；图版绘现存正立面，包含历代扩建和维修，不把整面金顶与外墙认作七世纪原构。', place: '西藏拉萨 · 八廓街', placeKey: 'xz_lhasa',
    lede: '金顶和深红墙面面对八廓街。寺院从吐蕃时期的核心扩展至今天，现存立面叠着多个时代的营建痕迹。',
    facts: ['大昭寺于七世纪中叶始建，拉萨官方资料记公元647年；后经历代扩建。', '图版选现状正立面，保留中央金顶、红墙与两侧建筑轮廓；它是多期叠合的外观，不是吐蕃原貌复原。', '寺院为各教派共尊的重要场所，八廓街围绕其周边形成。'],
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
  { key: 'jp_edo', years: '1603 — 1867 · 日本', blurb: '京都的古寺在江户时代迎来多次重建。清水寺的山坡舞台与东寺的五重塔各有鲜明轮廓，现存建筑年代与寺院初创沿革分别入册。' },
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
  "lede": "高大的城台托起两重檐箭楼，一道券门贯穿关城。镇东楼的横向展开，把山海之间的关隘凝成了最熟悉的轮廓。",
  "facts": [
    "图版取东门镇东楼、城台及两翼短墙段，不绘整座关城或老龙头。",
    "关城兴筑与现存楼体修缮分别记载，年表以明代约略定位。",
    "楼与相邻城墙在1978年以后持续修缮，镇东楼1998年曾进行大修。"
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
  "lede": "两层圆形黄瓦顶在石台上层层收束，圆阁与方坛相互衬托。旭光阁让承德寺庙群中多了一种鲜明的圆形轮廓。",
  "facts": [
    "普乐寺建于1766年，前部殿宇与后部坛城组成不同空间。",
    "本图绘旭光阁与上层台基，其他层级、配阁与小塔不在范围内。",
    "圆阁为双重圆檐，黄色琉璃瓦、朱红门窗和蓝绿色额枋按实拍设色。"
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
  "lede": "方形高殿用三层屋檐压住体量，黑瓦黄边的屋面与红色木壁相映。安远庙在承德留下一段与伊犁有关的建筑记忆。",
  "facts": [
    "安远庙建于1764年，设计借鉴伊犁固尔扎庙，又称伊犁庙。",
    "图版取普度殿整殿，方形平面、各面七间与三重檐为结构依据。",
    "普度殿2011年的修缮包括檐柱、地板及屋面，创建年代与修缮分开说明。"
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
  "lede": "灰瓦、白墙与深色廊柱之间，官署大堂保持着克制的尺度。总督在这里处理礼仪与重大政务，院落秩序比装饰更醒目。",
  "facts": [
    "所绘为中轴线上的大堂，前廊与五间室内正堂组成完整立面。",
    "总督署历经明清重修增建，现存主要建筑为清雍正年间遗存。",
    "大堂承担重要政务礼仪活动，与州县衙署的审案大堂用途有别。"
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
  "lede": "一孔低缓石拱的两肩各开两孔小券，桥面在石栏间轻轻隆起。赵县的小石桥以较小尺度，延续了敞肩石拱的结构语言。",
  "facts": [
    "本图绘永通桥整桥侧立面，包含主拱、四个敞肩小券与石栏。",
    "河北文物局将建桥年代列为金明昌年间（1190—1195）。",
    "官方记主跨约26米；与安济桥分立条目，避免同名或别名混用。"
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
  "lede": "高大的底层砖雕托起密集收分的十三层塔檐。天宫寺虽已不存，盘龙倚柱与层叠出檐仍让这座辽塔保留着细密的节奏。",
  "facts": [
    "塔位于丰润原天宫寺范围，辽清宁八年（1062）始建。",
    "图版绘八角十三层密檐塔整塔，保留须弥座、仰莲和盘龙倚柱。",
    "首层以砖雕模仿木构，盘龙倚柱、门券与斗拱共同装饰塔身。"
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
  "lede": "五间大殿在庑殿顶下展开，前面又接一层轻巧的卷棚抱厦。两个时期的屋面叠在一起，形成宣化古城中平稳而丰富的立面。",
  "facts": [
    "时恩寺始建于1470年，其他殿宇已毁，现存主体为大殿。",
    "大殿五间、单檐庑殿顶；前部五间卷棚抱厦是清代增建。",
    "图版绘整殿与抱厦、台基，前景供器、石象和城市楼房不在所绘范围内。"
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
  "lede": "没有木楼的砖券门直接嵌入城墙，城垛在门洞上方抬高。大境门既是长城的口门，也见证了张家口与草原间往来贸易。",
  "facts": [
    "清顺治元年（1644）正式开辟建门，之前墙体与通道另有沿革。",
    "图版取一道完整券门和两侧短墙段，不展示全线山地长城。",
    "2013年第七批将大境门纳入长城，归入第五批国保长城项目。"
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
  lede: '振风塔立在长江北岸的迎江寺内，七层白色塔身与深灰檐带逐层收分。楼层之间的平座和小券洞，让厚重的砖石有了层层向上的节奏。',
  facts: [
    '现存塔身为明隆庆年间营建，通行建成纪年为隆庆四年（1570）；后世屡经修缮，2006年列为全国重点文物保护单位。',
    '八角七层楼阁式砖石塔，檐下以砖石仿木构件出挑，各层设平座栏杆与券形开口；底层附檐不另计一层塔身。',
    '图版依据实拍核对塔身与底层轮廓，以较新照片取色；红色塔刹、深灰屋面与浅色墙面为修缮后现状，不作为明代原貌复原。'
  ],
  caption: ['振风塔 · 七层八角塔身与底层附檐', '明 · 隆庆年间 · 后世修缮现状'],
}, {
  id: 'ah_huaxilou', name: '亳州花戏楼', short: '花戏楼', sub: '大关帝庙 · 院内戏台',
  dyn: 'ming', tag: '清', era: '康熙十五年', year: 1676, yearLabel: '1676', yearApprox: false,
  yearNote: '采用院内戏台增建年1676，不以大关帝庙始建年1656代替；木雕、彩绘与屋面经历后续重修。',
  place: '安徽 · 亳州 · 谯城', placeKey: 'ah_bozhou', country: 'CN', types: ['stage'], initialStatus: 'unvisited',
  legacyNames: ['亳州大关帝庙', '亳州山陕会馆'],
  lede: '红柱托起青绿琉璃的屋顶，浅色木雕从檐下层层垂落。花戏楼把戏文刻进梁枋与挂落，是山陕药商在亳州留下的一座会馆戏台。',
  facts: [
    '大关帝庙始建于清顺治十三年（1656），山陕商人在康熙十五年（1676）增建戏楼，后又多次扩建重修；花戏楼1988年列为全国重点文物保护单位。',
    '戏台坐南朝北，舞台向院内突出，檐下木雕与彩绘多表现戏文故事；砖雕山门、铁旗杆与戏台木雕是不同部位。',
    '图版只绘院内中央戏台及台下通道，保留琉璃屋顶、红柱与挂落的材料颜色，不将山门牌坊或两侧看楼混入主体。'
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
  "lede": "十三重砖檐在方形塔身上逐级收分，环形塔刹与细链在高处连成轻巧的轮廓。妙乐寺已不复旧貌，古塔仍保留五代砖作的沉稳尺度。",
  "facts": [
    "<b>重修纪年</b> 现存塔按后周显德二年（955）重修登记；早期寺塔沿革不作为现存主体的精确竣工年。",
    "<b>形制</b> 方形中空砖塔，十三级密檐叠涩，南面各层小龛与下部砖雕形成疏密不同的层次。",
    "<b>图版范围</b> 依据2026年实拍保留塔身、密檐与塔刹，省略供台、人物和周边建筑；塔刹相轮不计入塔层。"
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
  "lede": "方形砖塔的十五重密檐层层外叠，向上收成柔和的曲线。图版截取法王寺唐塔的上部，留下砖檐、圆券小孔和残损塔顶之间的节奏。",
  "facts": [
    "<b>所绘主体</b> 选法王寺塔群中的十五级方形密檐大塔，按唐代遗存登记，不将附近元、清塔的纪年混入。",
    "<b>砖檐曲线</b> 塔身以上十五重叠涩密檐逐级收分，整体呈抛物线轮廓；塔顶宝刹已损毁。",
    "<b>局部取景</b> 实拍下部塔身被树木遮挡，图版只绘上部密檐及现状塔顶，不复原券门、台基或完整古代塔刹。"
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
  "lede": "六盘山北麓，石窟沿山势分布在起伏的岩壁间。第5窟的唐代弥勒大佛以宽肩、长耳和丰圆面庞迎向山谷，衣纹仍从胸前舒缓垂下。",
  "facts": [
    "<b>主体断代</b>：石窟始凿于北魏晚期，历经西魏、北周、隋唐营造；本图选第5窟唐代弥勒大佛，不将北朝洞窟混作唐代。",
    "<b>大佛造像</b>：为大型弥勒坐像。宁夏文旅厅资料记高约20.6米，另一介绍记20.06米；这里保留约数，不据介绍文字宣称实测精度。",
    "<b>所绘局部</b>：依据2017年实拍绘头部、胸前衣纹与双膝，保留风化残损；不补造未见的手、足或莲座，不复原彩绘。"
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
  "lede": "贺兰山东麓，夯土陵塔露出层层风化的肩线。原有的建筑外装已不存，留下的土芯却仍让这片帝王陵园具有鲜明的轮廓。",
  "facts": [
    "<b>陵园时代</b>：西夏陵形成于11至13世纪，是西夏皇室墓地；3号陵一般被认为与开国皇帝李元昊有关，图版不把推定墓主当成确定事实。",
    "<b>遗址形态</b>：本图仅绘3号陵现存夯土陵塔，按实拍保留收分、层带与不规则残损，不采用博物馆复原模型，也不补绘屋檐与塔刹。",
    "<b>世界遗产</b>：西夏陵于2025年列入《世界遗产名录》；遗产包括九座帝陵、陪葬墓及相关建筑、防洪遗存，本图不代表整座陵园。"
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
  "lede": "黄河西岸，砖塔依山势一行行排开，从顶端一塔向下展成三角形。每座塔都很小，合在一起却形成了宁夏佛教建筑极醒目的秩序。",
  "facts": [
    "<b>十二行塔群</b>：自上而下按1、3、3、5、5、7、9、11、13、15、17、19座排列，合计108座；单体塔座、塔身略有差异，不能当作一种塔型整齐复制。",
    "<b>断代与修缮</b>：青铜峡市政府介绍采用西夏始建说，1988年全国重点文物保护单位名录登记为元代；本条按始建说分类，并明列登记差异，不将现存全部砖砌外装视为西夏原物。",
    "<b>所绘范围</b>：图版仅取最上三行七座塔及承托台地，突出较大的顶塔和1、3、3排列；不以七塔局部冒充完整108塔全景。"
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
    "lede": "以第96窟外部九层楼辨认莫高窟。图版画的是现见保护性楼阁，其形制并非唐代原貌；年表约略定位第96窟唐代造像。",
    "facts": [
      "第96窟以巨型弥勒造像著称；楼阁经过后世多次改建。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "崖壁上一列洞窟入口面向榆林河谷。图版只绘入口和贴近的岩壁，不把不同洞窟画成同一时代。",
    "facts": [
      "榆林窟有跨越多个朝代的壁画和造像；所绘为入口现状。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "东崖大佛贴着山体高处的崖面。图版按照片取主尊局部，保留现存表面，不补绘视野外的佛足和两侧菩萨。",
    "facts": [
      "第13窟东崖大佛为隋代石胎泥塑；现状经历后代修缮。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "洞窟入口散布在龟兹旧地的崖壁。图版依现状照片概括窟口与岩体，未以外立面推定某窟壁画的年代。",
    "facts": [
      "克孜尔开凿历时较长；450仅是早期洞窟的约略年表位置。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "岩面洞口层层散开，洞窟与河谷相接。图版按照片取崖壁局部，窟门旁的后世加固不作为古代原构。",
    "facts": [
      "库木吐喇洞窟跨越多时期；500仅用于早期遗存的约略排序。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "五尊造像并列在石龛内。图版保留佛与侍者轮廓及岩龛，不画照片中的说明牌。",
    "facts": [
      "皇泽寺摩崖造像以唐代作品为主要特征；所选龛的精确开凿年未据图像确定。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "大大小小的佛龛在崖面上相续。图版截取一处坐佛与侍者，不代表整段千佛崖。",
    "facts": [
      "千佛崖营造跨越多个朝代；所绘龛位未据照片确认为特定编号。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "北山石刻的佛与菩萨像依岩壁层层凿成。图版选一龛的中央坐像与侍者，与已收录的宝顶山图版分开。",
    "facts": [
      "北山始于892年，五代至南宋续凿；所绘龛未据照片确认精确纪年。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "坐像与随侍刻在深龛内，呈现石钟山石窟的世俗人物题材。图版按实拍轮廓简化，不把人物身份当作绝对定论。",
    "facts": [
      "所绘龛传统称异牟寻坐朝图；学术研究指出该身份依早期调查和地方传说确定，仍需审慎。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "碑林石刻众多，本图选择石台孝经碑作代表。重檐式碑首与高碑身相接，碑面文字仅概括为线纹。",
    "facts": [
      "石台孝经于745年刻成；这是碑林藏石中的一件，不代表整个碑林同年形成。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "石碑边缘朴直，密布古拙碑文。图版只取现存碑身形态，细小文字作抽象纹理，不复刻碑文。",
    "facts": [
      "爨宝子碑立于东晋义熙元年405年；碑刻身世属东晋，不归作南朝碑刻。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "碑额浮雕与布满风化的碑身使它与小爨碑形成一对。图版概括残损和雕饰，不临摹可辨认碑字。",
    "facts": [
      "爨龙颜碑立于刘宋大明二年458年；今见石面经过长期风化。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "药王山摩崖与造像碑并存。图版从现状照片选取一龛立像，保留岩面轮廓。",
    "facts": [
      "石刻跨越北朝、隋唐等时期；本图所选单龛缺少可确认的精确纪年，700只作约略定位。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "碑文记录大理国段氏与三十七部会盟。图版画现存碑身和石座，碑文仅作非字形线纹。",
    "facts": [
      "碑立于971年，属大理国，记录段氏与三十七部会盟。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "高大的碑身留着西夏文与汉文。图版着重于风化后的外形和版面，不生成可误读的新碑文。",
    "facts": [
      "碑刻于西夏天祐民安五年1094年，记录护国寺感应塔重修。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "碑额下的城图以街河纵横标示南宋平江。图版概括地图结构，不充当可阅读的历史地图复制品。",
    "facts": [
      "平江图碑刻于1229年，是文庙宋代石刻的一件；国保单位范围不止此碑。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "一根铜柱刻录溪州盟约。图版依现状画狭长柱身与顶缘，除去玻璃展柜和室内陈设。",
    "facts": [
      "盟约与铜柱属于五代楚、溪州地方政权互动史；940用于约略定位。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    "lede": "普贤菩萨坐莲台，白象承托其下。图版画万年寺内现存铜像，不画金顶近代大型造像。",
    "facts": [
      "铜铸普贤骑象像为北宋遗物；保护单位名称还包括寺内其他铜铁佛像。",
      "图版依据现状照片作线描与设色意写，不作为实测图或碑文释读。"
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
    lede: '金色屋顶从塔尔寺的层层院落中升起。图版聚焦大金瓦殿现状，不把寺院初创年当作这座殿的建成年。',
    facts: ['塔尔寺为藏传佛教格鲁派重要寺院，大金瓦殿是其核心殿宇之一。', '现状建筑经过清代扩建和后世维修；图版记录金顶、围墙和檐下装饰的可见轮廓。'],
    caption: ['大金瓦殿 · 现状线稿', '明代始建 · 清代增修'], legacyNames: ['塔尔寺大金瓦殿', '大金瓦寺'],
  },
  {
    id: 'jx_nanchang_uprising', name: '南昌起义总指挥部旧址', short: '江西大旅社', sub: '江西大旅社旧楼外立面', dyn: 'modern', tag: '近现代', era: '1924年建成 · 1927年起义', year: 1924,
    place: '江西南昌 · 中山路', placeKey: 'jx_nanchang', types: ['residence'], initialStatus: 'unvisited',
    lede: '灰色的江西大旅社旧楼曾在1927年成为南昌起义总指挥部。连续的券窗和阳台保存着当年的城市建筑轮廓。',
    facts: ['江西大旅社1924年建成，1927年南昌起义期间作为总指挥部使用。', '图版绘旧楼外立面，不绘另建的纪念馆陈列建筑，也不混同贺龙指挥部等其他旧址。'],
    caption: ['江西大旅社 · 旧楼外立面', '1924年建成 · 1927年起义'], legacyNames: ['八一起义总指挥部旧址', '江西大旅社'], tall: true,
  },
  {
    id: 'xj_jiaohe', name: '交河故城', short: '交河故城', sub: '大佛寺现存生土遗址', dyn: 'xiyu', tag: '西域', era: '车师至唐等多期遗址', year: 700, yearLabel: '多期', yearApprox: true,
    yearNote: '交河故城长期使用，遗址包含多个阶段；700仅为年表约略定位，不能据此断定图中大佛寺残墙的营建年。', place: '新疆吐鲁番 · 交河', placeKey: 'xj_jiaohe', types: ['ruins'], initialStatus: 'unvisited',
    lede: '土崖上的街巷与佛寺化作一道道风化的生土墙。图版选择大佛寺现存残墙，不复原已经消失的屋顶和塑像。',
    facts: ['交河故城位于吐鲁番西侧河流夹持的台地，城址跨越车师、高昌及唐代等阶段。', '大佛寺遗址保留夯土残墙和佛龛轮廓；图版为现状意写，不能作为遗址实测图或单体精确断代。'],
    caption: ['交河故城 · 大佛寺遗址', '多期城址 · 现状残墙'], legacyNames: ['交河古城', '雅尔湖故城'],
  },
  {
    id: 'xz_potala', name: '布达拉宫', short: '布达拉宫', sub: '现状西南侧白宫与红宫', dyn: 'ming', tag: '清', era: '白宫1648年 · 红宫1694年', year: 1694,
    yearNote: '年表采用红宫竣工的1694年；图版绘今日所见多期白宫、红宫及山体台阶，不是七世纪红山宫复原。', place: '西藏拉萨 · 红山', placeKey: 'xz_potala', types: ['palace'], initialStatus: 'unvisited',
    lede: '白宫沿山坡层层升高，红宫立在中央。西南侧的现状轮廓记录的是十七世纪重建后不断维修的宫殿群。',
    facts: ['拉萨市政府记白宫于1648年建成，红宫1694年竣工。', '图版按现状西南侧照片绘白宫、红宫及山体阶梯；不以松赞干布时期的初创年代替代所见建筑年代。'],
    caption: ['布达拉宫 · 西南侧现状', '白宫1648 · 红宫1694'], legacyNames: ['布达拉宫红宫', '布达拉宫白宫'],
  },
  {
    id: 'js_zhuozheng', name: '拙政园', short: '拙政园', sub: '远香堂现状', dyn: 'ming', tag: '明 · 清', era: '1509年建园 · 现存建筑多为清代', year: 1860, yearLabel: '清代', yearApprox: true,
    yearNote: '1509是建园年代，现存建筑多数在清咸丰十年后重建；1860只为清代园林现状的约略排序，不是远香堂确切建年。', place: '江苏苏州 · 东北街', placeKey: 'js_suzhou', types: ['garden', 'hall'], initialStatus: 'unvisited',
    lede: '远香堂是拙政园中部的主要厅堂。轻巧的木柱和开敞长窗让建筑与水庭相接，图版选厅堂现状。',
    facts: ['拙政园始建于明正德四年（1509）；苏州官方资料记现存建筑大多在1860年后重建。', '远香堂面向中部水池，图版聚焦厅堂本体与石台，不把整个园林画成一座建筑。'],
    caption: ['远香堂 · 现状线稿', '明代建园 · 清代建筑'], legacyNames: ['拙政园远香堂'],
  },
  {
    id: 'sc_luding', name: '泸定桥', short: '泸定桥', sub: '铁索桥身与两岸桥台', dyn: 'ming', tag: '清', era: '康熙年间建桥 · 1935年战斗', year: 1706,
    place: '四川甘孜 · 泸定', placeKey: 'sc_luding', types: ['bridge'], initialStatus: 'unvisited',
    lede: '铁索在大渡河两岸的石台间悬成一道细线。古桥的交通史与1935年的泸定桥战斗在同一处相遇。',
    facts: ['清康熙年间修建铁索桥，常见记载为1705年开工、1706年建成。', '图版绘铁索、桥面和两岸桥台，省略现代河岸建筑；1935年的战斗年代不充作桥梁建年。'],
    caption: ['泸定桥 · 铁索与桥台', '清康熙年间建成'], legacyNames: ['大渡河泸定桥', '泸定铁索桥'],
  },
  {
    id: 'bj_guozijian', name: '国子监', short: '国子监', sub: '辟雍殿与环水石桥', dyn: 'ming', tag: '清', era: '乾隆四十九年建成', year: 1784,
    place: '北京东城 · 国子监街', placeKey: 'bj_guozijian', types: ['school', 'hall'], initialStatus: 'unvisited',
    lede: '辟雍立在环水中央，白石桥从岸边通向殿前。图版以清代增建的辟雍为主体，展示北京国子监最鲜明的一组建筑。',
    facts: ['国子监校址始于元代；辟雍殿由清乾隆时期增建，1784年建成。', '环水、石桥和重檐殿堂一起入图，年表标辟雍而非整个学府的始创年。'],
    caption: ['国子监 · 辟雍与环水', '清乾隆四十九年 · 1784'], legacyNames: ['北京国子监', '辟雍殿'],
  },
  {
    id: 'zj_yuefei', name: '岳飞墓', short: '岳飞墓', sub: '墓冢、墓碑与祭台', dyn: 'song', tag: '宋', era: '南宋绍兴年间迁葬 · 后世修葺', year: 1163,
    yearNote: '1163按杭州官方迁葬记载定位；图版画今日所见墓冢、碑与祭台，石构件历经后世修葺，不认作全为南宋原物。', place: '浙江杭州 · 栖霞岭', placeKey: 'zj_yuefei', types: ['tomb'], initialStatus: 'unvisited',
    lede: '栖霞岭下的墓冢与碑石保存着岳飞的身后记忆。图版聚焦墓前现状，不将整座岳王庙当作墓。',
    facts: ['杭州官方资料记岳飞平反后于1163年迁葬现址，1221年建祠。', '现状墓碑、祭台及石构历经后世修缮；图版不复制碑文，也不将祭台断为南宋原构。'],
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
