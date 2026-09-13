/* sites.js — the seven sites, their chapters, places and drawing parameters. */
const DYN = {
  tang: { glyph: '唐', name: '唐', acc: 'var(--gold)' },
  zhou: { glyph: '周', name: '后周', acc: 'var(--ash)' },
  song: { glyph: '宋', name: '北宋', acc: 'var(--verdigris)' },
  liao: { glyph: '辽', name: '辽 · 金', acc: 'var(--cinnabar)' },
};

const SITES = [
  {
    id: 'nanchan', name: '南禅寺大殿', dyn: 'tang', tag: '唐', era: '建中三年', year: 782, place: '山西五台 · 李家庄', placeKey: 'wutai',
    lede: '中国现存最早的木构建筑。唐武宗会昌灭法，天下寺院拆毁殆尽，它因为地处偏僻的小村而逃过一劫。',
    facts: ['<b>面阔三间</b>，单檐歇山，屋面平缓，出檐深远，是典型的唐代小殿。', '殿内<b>十七尊唐塑</b>与建筑同龄，是大陆唐塑最完整的一堂。', '现存唐代木构仅四座，皆在山西——此行见其二。'],
    caption: ['立面示意 · 面阔三间', '单檐歇山'],
    draw: () => Buildings.hall({ bays: 3, bw: 118, colH: 84, fills: ['win', 'door', 'win'], roof: 'gablehip', bracketS: 1.9, tiers: 2, interm: 0, overhang: 96, roofH: 150, ridgeRatio: .48, gableH: 54, platH: 18, platPad: 40, lift: 16, chiwen: 40, chiStyle: 'tang', puzuo: '五铺作 · 无补间', dimLabel: '面阔 11.62 m' }),
  },
  {
    id: 'foguang', name: '佛光寺东大殿', dyn: 'tang', tag: '唐', era: '大中十一年', year: 857, place: '山西五台 · 豆村', placeKey: 'wutai',
    lede: '1937 年 6 月，梁思成、林徽因在殿内梁下读出"女弟子宁公遇"的题记，日本学者"中国已无唐构"的断言就此作废。',
    facts: ['<b>面阔七间</b>，单檐庑殿。斗拱高度近柱高之半，出檐近四米——后世再没有这样的比例。', '唐代<b>建筑、塑像、壁画、题记</b>同存一殿，梁思成称之为"四绝"。', '殿前的经幢刻有"大中十一年"，是断代的另一件铁证。'],
    quote: '"这是我们这些年的搜寻中所遇到的唯一唐代木建筑……国内古建筑之第一瑰宝。" <b>——梁思成《记五台山佛光寺的建筑》</b>',
    caption: ['立面示意 · 面阔七间', '单檐庑殿'],
    draw: () => Buildings.hall({ bays: 7, bw: 80, colH: 96, fills: ['win', 'door', 'door', 'door', 'door', 'door', 'win'], roof: 'hip', bracketS: 2.3, tiers: 2, interm: 1, overhang: 96, roofH: 150, ridgeRatio: .62, platH: 20, platPad: 48, lift: 12, chiwen: 36, chiStyle: 'tang', puzuo: '七铺作 · 双杪双下昂', dimLabel: '面阔 34.0 m' }),
  },
  {
    id: 'wenfeng', name: '文峰塔', sub: '原名天宁寺塔', dyn: 'zhou', tag: '周', era: '广顺二年', year: 952, place: '河南安阳 · 老城', placeKey: 'anyang',
    lede: '五代五十三年，中原少有木构留存，这座砖塔是那段乱世少见的遗存。它上大下小、形如伞盖，在中国古塔里几乎找不到第二例。',
    facts: ['<b>五层八角</b>，逐层外展，每层以叠涩砖檐挑出，最上一层最宽。', '塔顶不是寻常的塔刹，而是一座<b>藏式喇嘛塔</b>，高约十米。', '塔身八面砖雕佛传故事；塔内有梯，可登顶远望。', '清乾隆年间，彰德知府黄邦宁题"文峰耸秀"，塔由此改名。'],
    caption: ['立面示意 · 五层八角', '上大下小 · 砖构'],
    tall: true,
    draw: () => Buildings.brickPagoda({ storeys: 5, w0: 214, grow: .06, firstH: 188, wallH: 30, bs: .62, over: 30, band: 28, bulb: 92, cone: 60, dimLabel: '顶檐 : 底檐 ≈ 1.2 : 1', vLabel: '通高 38.65 m' }),
  },
  {
    id: 'longxing', name: '隆兴寺', sub: '摩尼殿 · 大悲阁 · 转轮藏', dyn: 'song', tag: '宋', era: '开宝四年', year: 971, place: '河北正定 · 古城', placeKey: 'zhengding',
    lede: '隋开皇六年始建的龙藏寺，到宋太祖手里被敕令扩建，铸起二十一米的铜观音。它是北宋官式建筑保存最完整的一处。',
    facts: ['<b>摩尼殿</b>（皇祐四年，1052）平面十字形，四面出抱厦，山面朝前，重檐歇山——梁思成称"海内孤例"。', '<b>大悲阁</b>内千手千眼观音铜像高 21.3 米，四十二臂，宋开宝四年铸，宋代铜铸之最。', '<b>转轮藏</b>是现存最早的可转动藏经架，本身就是一座宋代小木作的楼阁。', '摩尼殿内明代悬塑<b>倒坐观音</b>，鲁迅曾把它的照片摆在案头，称为"东方美神"。'],
    caption: ['摩尼殿立面示意 · 面阔七间', '重檐歇山 · 抱厦四出'],
    draw: () => Buildings.crossHall({ bays: 7, bw: 74, colH: 84, fills: ['wall', 'win', 'door', 'door', 'door', 'win', 'wall'], fills2: ['wall', 'win', 'win', 'win', 'wall'], bracketS: 1.5, overhang: 62, skirtH: 56, colH2: 36, roofH: 142, gableH: 56, porchColH: 72, porchOver: 30, gableW: 132, porchRise: 44, gableRise: 56, chiwen: 30, platH: 22, platPad: 40, dimLabel: '面阔 35.0 m' }),
  },
  {
    id: 'huayan', name: '华严寺', sub: '薄伽教藏殿 · 大雄宝殿', dyn: 'liao', tag: '辽', era: '重熙七年', year: 1038, place: '山西大同 · 古城', placeKey: 'datong',
    lede: '契丹人拜日，所以整座寺院坐西朝东。辽代的薄伽教藏殿藏着壁藏与天宫楼阁，金代重建的大雄宝殿则是现存辽金佛殿里最大的一座。',
    facts: ['<b>大雄宝殿</b>（金天眷三年，1140 重建）面阔九间，五十三米，立在四米高的台基上；正脊鸱吻高 4.5 米，为中国古建之最。', '<b>薄伽教藏殿</b>（辽重熙七年，1038）内三十八间壁藏，中间以圜桥相连的"天宫楼阁"，梁思成誉为"海内孤品"。', '殿内辽塑<b>合掌露齿菩萨</b>，郑振铎称为"东方维纳斯"。'],
    caption: ['大雄宝殿立面示意 · 面阔九间', '单檐庑殿 · 高台'],
    draw: () => Buildings.hall({ bays: 9, bw: 64, colH: 92, fills: ['wall', 'wall', 'win', 'win', 'door', 'win', 'win', 'wall', 'wall'], roof: 'hip', bracketS: 1.6, tiers: 2, interm: 1, overhang: 62, roofH: 194, ridgeRatio: .6, platH: 46, platPad: 44, lift: 18, chiwen: 44, puzuo: '五铺作 · 双杪', dimLabel: '面阔 53.9 m' }),
  },
  {
    id: 'yingxian', name: '应县木塔', sub: '佛宫寺释迦塔', dyn: 'liao', tag: '辽', era: '清宁二年', year: 1056, place: '山西朔州 · 应县', placeKey: 'yingxian',
    lede: '六十七米、纯木、九百七十年。它是世界上现存最高、最古老的木塔，经历过多次地震与炮击，至今仍立在桑干河畔。',
    facts: ['八角五层六檐，<b>明五暗四</b>共九层；一层副阶周匝，外观六重檐。', '全塔用<b>五十四种斗拱</b>，被称为"斗拱博物馆"；各层以平座相接，逐层收分。', '一层释迦坐像高十一米；1974 年在塔内佛像中发现辽代<b>佛牙舍利</b>与经卷。', '通高 <b>67.31 米</b>，与意大利比萨斜塔、法国埃菲尔铁塔并称"世界三大奇塔"。'],
    caption: ['立面示意 · 八角五层', '楼阁式 · 六檐'],
    tall: true,
    draw: () => Buildings.woodPagoda({ storeys: [{ porch: 300, w: 232, colH: 42, bs: 1.05, over: 40, band: 26 }, { w: 214, colH: 28, bs: .95, over: 38, band: 22 }, { w: 197, colH: 27, bs: .9, over: 36, band: 21 }, { w: 181, colH: 26, bs: .85, over: 34, band: 20 }, { w: 167, colH: 25, bs: .8, over: 32, band: 20 }], topH: 50, shaH: 84, dimLabel: '底层直径 30.27 m', vLabel: '通高 67.31 m' }),
  },
  {
    id: 'shanhua', name: '善化寺', sub: '大雄宝殿 · 三圣殿 · 普贤阁', dyn: 'liao', tag: '辽金', era: '辽 · 金天会六年', year: 1128, place: '山西大同 · 南门', placeKey: 'datong',
    lede: '辽代的大雄宝殿，金代的三圣殿、山门和普贤阁，沿一条中轴线完整排开——这是现存规模最大、布局最完整的辽金寺院。',
    facts: ['<b>大雄宝殿</b>为辽构，面阔七间，殿内辽金彩塑三十三尊：五方佛端坐，二十四诸天分列两侧。', '<b>三圣殿</b>（金天会六年至皇统三年，1128–1143）减柱造，硕大的斜拱层层张开，如花绽放。', '<b>普贤阁</b>是金代的两层楼阁，平座勾阑，歇山顶，是研究辽金楼阁的少数实例。'],
    caption: ['普贤阁立面示意 · 面阔三间', '两层楼阁 · 平座 · 歇山'],
    draw: () => Buildings.pavilion({ bays: 3, bw: 80, colH: 84, fills: ['wall', 'door', 'wall'], fills2: ['win', 'win', 'win'], bracketS: 1.5, overhang: 54, skirtH: 44, inset: 14, colH2: 58, roofH: 126, gableH: 44, platH: 20, platPad: 36, dimLabel: '面阔 10.6 m' }),
  },
];

const CHAPTERS = [
  { key: 'tang', years: '618 — 907', blurb: '雄大疏朗。斗拱可达柱高之半，屋面平缓，出檐深远，柱有侧脚生起——盛唐的尺度感，后世再未复现。' },
  { key: 'zhou', years: '951 — 960', blurb: '五代五十三年，中原少有木构留存。砖塔以它不易焚毁的身体，替这段乱世留下了记号。' },
  { key: 'song', years: '960 — 1127', blurb: '《营造法式》颁行于 1103 年，而摩尼殿早它半个世纪，已见其规制：平面可以出抱厦，木作走向精细。' },
  { key: 'liao', years: '907 — 1234', blurb: '契丹与女真承唐制而益壮：减柱、移柱以扩展佛殿空间，斜拱如花，殿阁之巨为北地独有。' },
];

const PLACES = [
  { key: 'datong', name: '大同', lat: 40.094, lon: 113.287, prov: '山西' },
  { key: 'yingxian', name: '应县', lat: 39.554, lon: 113.187, prov: '山西' },
  { key: 'wutai', name: '五台', lat: 38.75, lon: 113.25, prov: '山西' },
  { key: 'zhengding', name: '正定', lat: 38.146, lon: 114.574, prov: '河北' },
  { key: 'anyang', name: '安阳', lat: 36.096, lon: 114.352, prov: '河南' },
];

