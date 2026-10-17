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
      selectionReason: "把三座唐代殿堂与断代仍有讨论的天台庵放在一起，从三间小殿看到七间大殿：比较柱子如何安排、屋顶如何展开，也看题记怎样改变我们对年代的认识。",
      itemReasons: {
        "nanchan": "从三间、殿内无柱的小殿入门，看唐代木构怎样用简练的梁架腾出完整的礼佛空间。",
        "guangren": "把视线从佛寺移到龙王庙：同是唐代木构，五间而浅的正殿呈现另一种尺度与用途。",
        "foguang": "七间庑殿与内外两圈柱，把唐代大殿的体量和空间层次展开，适合与南禅寺的小殿对照。",
        "tiantai": "保留这座常被旧说列为唐构的小殿，看看后唐年号题记为何让断代转向五代；本库按五代收录，争议仍有记录。"
      },
      items: ['nanchan', 'guangren', 'foguang', 'tiantai'],
    },
    {
      id: 'liao_eight', kind: 'canon', name: '八大辽构', eyebrow: '辽代木构 · 华北与东北',
      lede: '辽代木构存世稀少，爱好者习称“八大辽构”：独乐寺观音阁与山门、奉国寺大雄殿、开善寺大雄殿、阁院寺文殊殿、华严寺薄伽教藏殿、善化寺大雄宝殿与应县木塔。',
      note: '八条分别对应八座现存木构。另有说法将已毁的宝坻广济寺三大士殿列入，本名录不计。',
      selectionReason: "同一份辽构名录里有山门、佛殿、藏经殿、楼阁和木塔。把用途与尺度不同的八座放在一起，看木构怎样容纳通行、礼佛、藏经与向上叠起的楼层。",
      itemReasons: {
        "geyuan": "三间近方形殿堂配上深远出檐，是观察小体量辽构的起点；现存门窗还保留不同时代的构件。",
        "dule_guanyin": "为高大的观音组织多层空间，外观两层、内部含暗层的差别，让楼阁的构造变得值得细看。",
        "dule_gate": "同在独乐寺，把通行的三间山门与供像的高阁并看，体会同次辽代重建中不同的空间任务。",
        "fengguo": "九间大殿容纳一列七佛，把殿外宽展的屋面与殿内造像排列连起来看，辽代大殿的尺度便有了参照。",
        "kaishan": "五间大殿只用四根内柱，把注意力从外观移向柱网，看减柱与移柱怎样让礼佛空间更通敞。",
        "huayan_bojia": "藏经的用途带来楼阁式壁藏与天宫楼阁，让这份以大木构为主的名录也能看到精细的室内木作。",
        "yingxian": "从横向展开的殿堂转向八角木塔，看明层与暗层如何相间，把木构的空间一层层向上叠起。",
        "shanhua_daxiong": "七间大殿保留辽代主体，又经历金代重修并留有金塑，提醒我们一座辽构也承载后世的营修与艺术。"
      },
      items: ['geyuan', 'dule_guanyin', 'dule_gate', 'fengguo', 'kaishan', 'huayan_bojia', 'yingxian', 'shanhua_daxiong'],
    },
    {
      id: 'zhuozhang_valley', kind: 'route', name: '浊漳河谷', eyebrow: '晋东南 · 平顺与潞城',
      lede: '浊漳河穿过平顺、潞城一带的山谷，两岸村落里密集保存着从五代到元的小型寺庙与祠庙，是晋东南访古最经典的一条线路。',
      note: '只列本库已收录的河谷古迹，按年代排列；实际行程可沿河谷由西向东或反向安排。',
      selectionReason: "沿同一条河谷，把五代小殿、宋金寺院与元代祠庙串起来。相近的三间尺度里，屋顶、柱子和院落用途各不相同，适合带着一个问题逐处比较。",
      itemReasons: {
        "longmen": "以五代西配殿的三间悬山作起点，再放回历代建筑共存的寺院，理解一座寺并非一次建成。",
        "tiantai": "河谷里的五代小殿，以近方平面和简练的承檐构造，和龙门寺、大云院形成易于比较的一组。",
        "dayun": "五代殿堂还保存五代壁画，把注意力从梁架延伸到墙面，看建筑与绘画怎样共同构成礼佛空间。",
        "yuanqi_hall": "宋代小殿与同寺青龙塔相伴，适合从单座木构进一步看一殿一塔如何组成寺院。",
        "fotou": "一座三间殿中叠着木构与后世壁画；分开看建筑年代和绘画年代，比给整座寺贴一个朝代标签更有意思。",
        "yuanqi_qinglong": "八角七层砖塔用砖雕表现木构斗栱，让这条以木殿为主的线路多了一个材料转换的观察点。",
        "huilong": "三间悬山正殿以前檐八角石柱见长，可以和同村夏禹神祠并看，找出小庙入口空间的不同处理。",
        "chunhua": "三间金代殿堂以整根长梁贯通前后檐，让不大的建筑也能提出一个结构问题：更深的殿，怎样少用内柱？",
        "jiutian": "所绘元代献殿四面开敞，位于戏楼与正殿之间；它让河谷之行从封闭佛殿转向祭祀与演剧相连的空间。",
        "xiayu": "元代正殿前有深廊，同院又有明代山门戏台和清代配房，是把建筑年代与院落用途一起看的收束点。"
      },
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
    "note": "当前收录岙胡胡氏宗祠、崇兴庙与城隍庙戏台，不代表宁海全部古戏台。",
    "items": [
      "xitai_aohu",
      "xitai_chongxing",
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
  // Directed editorial links: absence means no recommendation has been curated.
  const recommendations = {
    "nanchan": [
      {
        "siteID": "foguang",
        "kind": "comparison",
        "reason": "从三间无内柱小殿转到七间大殿，比较佛光寺内外两圈柱怎样组织更大的礼佛空间。"
      },
      {
        "siteID": "guangren",
        "kind": "comparison",
        "reason": "同是殿内无柱的唐代小殿，广仁王庙面阔五间而进深较浅，可对照两座殿的平面比例与不同用途。"
      }
    ],
    "guangren": [
      {
        "siteID": "nanchan",
        "kind": "comparison",
        "reason": "五间浅殿与三间近方小殿都不设内柱，看看相近的构架思路如何形成不同的空间比例。"
      },
      {
        "siteID": "foguang",
        "kind": "comparison",
        "reason": "从龙王庙的小殿看向佛光寺七间大殿，比较唐代木构在用途和体量变化后，柱网与屋顶怎样随之改变。"
      }
    ],
    "foguang": [
      {
        "siteID": "nanchan",
        "kind": "comparison",
        "reason": "看过七间大殿，再看三间、殿内无柱的南禅寺；同是唐构，支撑屋顶与安排礼佛空间的办法并不相同。"
      },
      {
        "siteID": "fengguo",
        "kind": "comparison",
        "reason": "从唐代七间庑殿到辽代九间庑殿，对照更宽的殿身与一列七佛，观察大殿和造像如何相互配合。"
      }
    ],
    "tiantai": [
      {
        "siteID": "nanchan",
        "kind": "comparison",
        "reason": "两座近方形三间小殿很适合并看：外形相近，年代却要结合题记判断，不能只凭古朴的样子认作唐构。"
      },
      {
        "siteID": "dayun",
        "kind": "comparison",
        "reason": "同属河谷五代小殿，大云院在柱间也布置斗拱并保存壁画，可以接着看檐下节奏与室内装饰的不同。"
      }
    ],
    "geyuan": [
      {
        "siteID": "kaishan",
        "kind": "comparison",
        "reason": "从三间近方殿到五间大殿，两处都减少或调整内柱，可把注意力放在柱子留在哪里、空地让给了哪里。"
      },
      {
        "siteID": "huayan_bojia",
        "kind": "comparison",
        "reason": "看过阁院寺留有旧构件的门窗，再看薄伽教藏殿的楼阁式壁藏，把辽构的观看从梁架延伸到室内木作。"
      }
    ],
    "dule_guanyin": [
      {
        "siteID": "dule_gate",
        "kind": "nearby",
        "reason": "同一寺院里就能接着看辽代山门；从围绕高大观音的楼阁回到三间入口，空间的尺度与用途形成直接对照。"
      },
      {
        "siteID": "yingxian",
        "kind": "comparison",
        "reason": "观音阁与应县木塔都含外面不易辨认的暗层，接着看八角木塔怎样把层间结构重复向上组织。"
      }
    ],
    "dule_gate": [
      {
        "siteID": "dule_guanyin",
        "kind": "nearby",
        "reason": "穿过同寺山门后看观音阁：两者同于984年重建，三间通道与多层供像空间各有不同的柱网安排。"
      },
      {
        "siteID": "foguang",
        "kind": "comparison",
        "reason": "同为庑殿顶，独乐寺三间山门与佛光寺七间佛殿的体量相差很大，适合观察相同屋顶形式如何服务不同建筑。"
      }
    ],
    "fengguo": [
      {
        "siteID": "foguang",
        "kind": "comparison",
        "reason": "九间辽殿与七间唐殿都以宽展庑殿覆盖佛坛，比较体量、柱网和造像排列，可看到不同年代大殿的空间组织。"
      },
      {
        "siteID": "shanhua_daxiong",
        "kind": "comparison",
        "reason": "接着看另一座辽代主体大殿：善化寺经历金代重修并留有金塑，可对照木构与造像是否属于同一时代。"
      }
    ],
    "kaishan": [
      {
        "siteID": "geyuan",
        "kind": "comparison",
        "reason": "五间殿内留四根柱，再对照阁院寺三间殿中的两根内柱，看看减柱之后梁架怎样接住屋顶。"
      },
      {
        "siteID": "fengguo",
        "kind": "comparison",
        "reason": "从五间庑殿转向九间庑殿，留意奉国寺更宽的正面如何对应殿内七佛排列，比单看建筑大小更有参照。"
      }
    ],
    "huayan_bojia": [
      {
        "siteID": "shanhua_daxiong",
        "kind": "nearby",
        "reason": "同在大同古城，可把藏经殿的精细壁藏与善化寺七间大殿、金代彩塑一起看，比较两座辽代主体建筑的用途与后世层次。"
      },
      {
        "siteID": "geyuan",
        "kind": "comparison",
        "reason": "从楼阁式藏经木作转到阁院寺门窗，比较室内陈设与建筑开口如何各自保存细部工艺和后世更换的痕迹。"
      }
    ],
    "yingxian": [
      {
        "siteID": "dule_guanyin",
        "kind": "comparison",
        "reason": "从明五暗四的木塔回看外二内三的观音阁，两座辽构都能帮助区分外观层数与实际结构层次。"
      },
      {
        "siteID": "yuanqi_qinglong",
        "kind": "comparison",
        "reason": "两座都是八角塔，一座用木构向上叠层，一座以砖雕仿木斗栱；可从材料差异看相近轮廓下不同的建造办法。"
      }
    ],
    "shanhua_daxiong": [
      {
        "siteID": "huayan_bojia",
        "kind": "nearby",
        "reason": "同在大同古城，从七间佛殿接着看五间藏经殿；壁藏与天宫楼阁会把注意力从大殿体量引向室内木作。"
      },
      {
        "siteID": "fengguo",
        "kind": "comparison",
        "reason": "善化寺辽代主体中留有金塑，奉国寺则以辽代大殿与七佛彩塑相配；对照两者，分别阅读建筑与造像的时间。"
      }
    ],
    "longmen": [
      {
        "siteID": "tiantai",
        "kind": "comparison",
        "reason": "同是河谷中的五代三间小殿，西配殿用悬山顶，天台庵用歇山顶，先从屋顶两端的不同轮廓看起。"
      },
      {
        "siteID": "dayun",
        "kind": "comparison",
        "reason": "看过西配殿简练的承檐构造，再看大云院柱间的斗拱与殿内壁画，同为五代遗构，檐下与室内各有不同层次。"
      }
    ],
    "dayun": [
      {
        "siteID": "tiantai",
        "kind": "comparison",
        "reason": "从有柱间斗拱的弥陀殿转向天台庵更简练的檐下，比较两座五代小殿怎样安排支撑与开间节奏。"
      },
      {
        "siteID": "fotou",
        "kind": "comparison",
        "reason": "大云院的五代殿与五代壁画之外，佛头寺展示木构和后世壁画叠加的情形，可练习分别看建筑与绘画的年代。"
      }
    ],
    "yuanqi_hall": [
      {
        "siteID": "yuanqi_qinglong",
        "kind": "nearby",
        "reason": "青龙塔就在同寺殿西，把木殿与八角砖塔一起看，可对照真实木构斗栱和砖雕仿木斗栱。"
      },
      {
        "siteID": "fotou",
        "kind": "comparison",
        "reason": "两处都按宋代小殿收录，面阔三间、进深四椽；在相近尺度下，接着看佛头寺的斗拱与后世壁画。"
      }
    ],
    "fotou": [
      {
        "siteID": "dayun",
        "kind": "comparison",
        "reason": "佛头寺壁画晚于木构，大云院则留有五代殿堂与五代壁画，适合对照同一空间里的不同年代层次。"
      },
      {
        "siteID": "chunhua",
        "kind": "comparison",
        "reason": "同是三间小殿，淳化寺用一根长梁贯通前后檐；从屋顶下面比较梁架，比只认宋金标签更能看出差异。"
      }
    ],
    "yuanqi_qinglong": [
      {
        "siteID": "yuanqi_hall",
        "kind": "nearby",
        "reason": "同寺大殿就在塔旁，回看木殿檐下的斗栱，再辨认塔檐砖雕怎样转译木构的形状。"
      },
      {
        "siteID": "yingxian",
        "kind": "comparison",
        "reason": "从八角砖塔转向八角木塔，比较仿木的外观细部与真正叠起楼层的木构架，分清形似和构造相同的差别。"
      }
    ],
    "huilong": [
      {
        "siteID": "xiayu",
        "kind": "nearby",
        "reason": "同在侯壁村，两座三间悬山殿可一起看；从回龙寺前檐石柱转到夏禹神祠的深廊，比较殿前空间。"
      },
      {
        "siteID": "chunhua",
        "kind": "comparison",
        "reason": "同按金代遗构认识，回龙寺的悬山小殿与淳化寺的歇山殿可以对照，留意屋顶形式和梁架安排的差别。"
      }
    ],
    "chunhua": [
      {
        "siteID": "fotou",
        "kind": "comparison",
        "reason": "从整根长梁贯通前后檐的做法，回看佛头寺的组合梁架；两座三间殿提供不同的屋顶支撑办法。"
      },
      {
        "siteID": "huilong",
        "kind": "comparison",
        "reason": "同属河谷金代小殿，回龙寺以前檐八角石柱和悬山顶形成另一种轮廓，可把目光从梁架移回入口与屋檐。"
      }
    ],
    "jiutian": [
      {
        "siteID": "xiayu",
        "kind": "comparison",
        "reason": "献殿把戏楼与正殿接在一起，夏禹神祠则由山门上层戏台面对正殿，可比较两座村庙怎样安排祭祀和演剧。"
      },
      {
        "siteID": "huilong",
        "kind": "comparison",
        "reason": "从四面开敞的献殿看向封闭的佛殿，两处都使用石柱，却因空间用途不同形成很不一样的内外关系。"
      }
    ],
    "xiayu": [
      {
        "siteID": "huilong",
        "kind": "nearby",
        "reason": "同在侯壁村，接着看回龙寺三间悬山正殿；把夏禹神祠的深廊与回龙寺前檐石柱对照，找出入口空间的差异。"
      },
      {
        "siteID": "jiutian",
        "kind": "comparison",
        "reason": "从山门戏台与正殿对望的院落，转到有开敞献殿居中的九天圣母庙，看祭祀与演剧怎样组合成不同的空间。"
      }
    ]
  };
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
  return { kinds, curations, validate, recommendations };
});
