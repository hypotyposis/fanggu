/* curations.js — editorial lists (专题): canons, routes and themes that group catalogue entries.
   Lists are catalogue metadata like national protection: they never carry personal records. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FangguCurations = factory();
})(typeof globalThis === 'object' ? globalThis : this, () => {
  'use strict';
  const kinds = { canon: '名录', route: '线路', theme: '专题', collection: '建筑群' };
  const curations = [
    {
      id: 'tang_timber', kind: 'canon', name: '三座半唐构', eyebrow: '唐代木构 · 山西',
      lede: '中国现存可确认的唐代木构建筑只剩山西的三座大殿；平顺天台庵弥陀殿长期被视为唐构，经近年研究多断为五代，爱好者因此合称“三座半”。',
      note: '四条对应“三座半”。天台庵在本库按现存研究归入五代，仍列入本名录以存其说。',
      items: ['nanchan', 'guangren', 'foguang', 'tiantai'],
    },
    {
      id: 'liao_eight', kind: 'canon', name: '八大辽构', eyebrow: '辽代木构 · 华北与东北',
      lede: '辽代木构存世稀少，爱好者习称“八大辽构”：独乐寺观音阁与山门、奉国寺大雄殿、开善寺大雄殿、阁院寺文殊殿、华严寺薄伽教藏殿、善化寺大雄宝殿与应县木塔。',
      note: '八条分别对应八座现存木构。另有说法将已毁的宝坻广济寺三大士殿列入，本名录不计。',
      items: ['geyuan', 'dule_guanyin', 'dule_gate', 'fengguo', 'kaishan', 'huayan_bojia', 'yingxian', 'shanhua_daxiong'],
    },
    {
      id: 'zhuozhang_valley', kind: 'route', name: '浊漳河谷', eyebrow: '晋东南 · 平顺与潞城',
      lede: '浊漳河穿过平顺、潞城一带的山谷，两岸村落里密集保存着从五代到元的小型寺庙与祠庙，是晋东南访古最经典的一条线路。',
      note: '只列本库已收录的河谷古迹，按年代排列；实际行程可沿河谷由西向东或反向安排。',
      items: ['longmen', 'tiantai', 'dayun', 'yuanqi_hall', 'fotou', 'yuanqi_qinglong', 'huilong', 'chunhua', 'jiutian', 'xiayu'],
    },
  ];
  curations.push(...[
  {
    "id": "chongsheng",
    "kind": "collection",
    "name": "崇圣寺三塔",
    "eyebrow": "云南 · 大理",
    "lede": "将崇圣寺三塔的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "chongsheng_north",
      "chongsheng_qianxun",
      "chongsheng_south"
    ],
    "legacySiteID": "chongsheng"
  },
  {
    "id": "ln_chongxing",
    "kind": "collection",
    "name": "崇兴寺双塔",
    "eyebrow": "辽宁北镇 · 崇兴寺",
    "lede": "将崇兴寺双塔的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "chongxing_east",
      "chongxing_west"
    ],
    "legacySiteID": "ln_chongxing"
  },
  {
    "id": "dule",
    "kind": "collection",
    "name": "独乐寺",
    "eyebrow": "天津 · 蓟州",
    "lede": "将独乐寺的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "dule_gate",
      "dule_guanyin"
    ],
    "legacySiteID": "dule"
  },
  {
    "id": "sx_haihui",
    "kind": "collection",
    "name": "海会寺双塔",
    "eyebrow": "山西阳城 · 大桥村海会寺塔院",
    "lede": "将海会寺双塔的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "haihui_large",
      "haihui_small"
    ],
    "legacySiteID": "sx_haihui"
  },
  {
    "id": "huayan",
    "kind": "collection",
    "name": "华严寺",
    "eyebrow": "山西大同 · 古城",
    "lede": "将华严寺的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "huayan_bojia",
      "huayan_daxiong"
    ],
    "legacySiteID": "huayan"
  },
  {
    "id": "hn_jiahuiguan",
    "kind": "collection",
    "name": "郏县山陕会馆",
    "eyebrow": "河南 · 郏县",
    "lede": "将郏县山陕会馆的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "门楼兼戏楼保留为同一连体单元，两侧楼分别登记。东、西楼的钟鼓对应未详。",
    "items": [
      "jiahuiguan_east",
      "jiahuiguan_gate",
      "jiahuiguan_west"
    ],
    "legacySiteID": "hn_jiahuiguan"
  },
  {
    "id": "kaiyuan",
    "kind": "collection",
    "name": "正定开元寺",
    "eyebrow": "河北正定 · 古城",
    "lede": "将正定开元寺的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "kaiyuan_bell",
      "kaiyuan_xumi"
    ],
    "legacySiteID": "kaiyuan"
  },
  {
    "id": "lingyin",
    "kind": "collection",
    "name": "灵隐寺石塔与经幢",
    "eyebrow": "浙江杭州 · 灵隐寺",
    "lede": "将灵隐寺石塔与经幢的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "lingyin_east_pillar",
      "lingyin_east_tower",
      "lingyin_west_pillar",
      "lingyin_west_tower"
    ],
    "legacySiteID": "lingyin"
  },
  {
    "id": "longxing",
    "kind": "collection",
    "name": "隆兴寺",
    "eyebrow": "河北正定 · 古城",
    "lede": "将隆兴寺的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "当前收录摩尼殿与转轮藏殿，不以971年铜观音的年代替代1997—1999年复建大悲阁的年代。",
    "items": [
      "longxing_mani",
      "longxing_zhuanlun"
    ],
    "legacySiteID": "longxing"
  },
  {
    "id": "luohanshuangta",
    "kind": "collection",
    "name": "罗汉院双塔与正殿遗址",
    "eyebrow": "江苏苏州 · 定慧寺巷",
    "lede": "将罗汉院双塔与正殿遗址的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "luohan_east",
      "luohan_hall_ruins",
      "luohan_west"
    ],
    "legacySiteID": "luohanshuangta"
  },
  {
    "id": "shanhua",
    "kind": "collection",
    "name": "善化寺",
    "eyebrow": "山西大同 · 南门",
    "lede": "将善化寺的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "shanhua_daxiong",
      "shanhua_gate",
      "shanhua_puxian",
      "shanhua_sansheng"
    ],
    "legacySiteID": "shanhua"
  },
  {
    "id": "xianzhonggu",
    "kind": "collection",
    "name": "西安钟楼与鼓楼",
    "eyebrow": "陕西西安 · 府城中心",
    "lede": "将西安钟楼与鼓楼的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "xian_bell",
      "xian_drum"
    ],
    "legacySiteID": "xianzhonggu"
  },
  {
    "id": "xitai",
    "kind": "collection",
    "name": "宁海古戏台",
    "eyebrow": "浙江宁海 · 祠庙",
    "lede": "将宁海古戏台的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "当前收录岙胡胡氏宗祠与城隍庙戏台，不代表宁海全部古戏台。",
    "items": [
      "xitai_aohu",
      "xitai_chenghuang"
    ],
    "legacySiteID": "xitai"
  },
  {
    "id": "sx_yongzuo",
    "kind": "collection",
    "name": "永祚寺双塔",
    "eyebrow": "山西 · 太原",
    "lede": "将永祚寺双塔的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "yongzuo_wenfeng",
      "yongzuo_xuanwen"
    ],
    "legacySiteID": "sx_yongzuo"
  },
  {
    "id": "yuanqi",
    "kind": "collection",
    "name": "原起寺",
    "eyebrow": "山西潞城 · 浊漳河畔 · 辛安村",
    "lede": "将原起寺的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "yuanqi_hall",
      "yuanqi_qinglong"
    ],
    "legacySiteID": "yuanqi"
  },
  {
    "id": "zhuozhou",
    "kind": "collection",
    "name": "涿州双塔",
    "eyebrow": "河北涿州 · 古城",
    "lede": "将涿州双塔的已收录单体分别列出，各自保留年代、图版与到访记录。",
    "note": "只统计本名录列出的单体；拆分前的集合记录在本页独立保留，不计入单体进度。",
    "items": [
      "zhuozhou_yunju",
      "zhuozhou_zhidu"
    ],
    "legacySiteID": "zhuozhou"
  }
]);
  function validate(lists, siteIDs) {
    const ids = new Set();
    for (const list of lists) {
      if (!list.id || ids.has(list.id)) throw new Error(`专题 ID 重复或缺失：${list.id}`);
      ids.add(list.id);
      if (!kinds[list.kind]) throw new Error(`专题 ${list.id} 的类型无效：${list.kind}`);
      if (!list.name || !list.lede) throw new Error(`专题 ${list.id} 缺少名称或导语`);
      if (!Array.isArray(list.items) || list.items.length < 2) throw new Error(`专题 ${list.id} 至少需要两条古迹`);
      if (new Set(list.items).size !== list.items.length) throw new Error(`专题 ${list.id} 的古迹重复`);
      for (const id of list.items) if (!siteIDs.has(id)) throw new Error(`专题 ${list.id} 引用了未收录的古迹：${id}`);
      if (list.kind === 'collection' && (!list.legacySiteID || !siteIDs.has(list.legacySiteID) || list.items.includes(list.legacySiteID))) {
        throw new Error(`建筑群 ${list.id} 缺少有效的原集合记录 ID`);
      }
    }
    return lists;
  }
  return { kinds, curations, validate };
});
