/* curations.js — editorial lists (专题): canons, routes and themes that group catalogue entries.
   Lists are catalogue metadata like national protection: they never carry personal records. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.FangguCurations = factory();
})(typeof globalThis === 'object' ? globalThis : this, () => {
  'use strict';
  const kinds = { canon: '名录', route: '线路', theme: '专题' };
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
      note: '独乐寺观音阁与山门在本库合为一条，故以七条对应八构。另有说法将已毁的宝坻广济寺三大士殿列入，本名录不计。',
      items: ['geyuan', 'dule', 'fengguo', 'kaishan', 'huayan', 'yingxian', 'shanhua'],
    },
    {
      id: 'zhuozhang_valley', kind: 'route', name: '浊漳河谷', eyebrow: '晋东南 · 平顺与潞城',
      lede: '浊漳河穿过平顺、潞城一带的山谷，两岸村落里密集保存着从五代到元的小型寺庙与祠庙，是晋东南访古最经典的一条线路。',
      note: '只列本库已收录的河谷古迹，按年代排列；实际行程可沿河谷由西向东或反向安排。',
      items: ['longmen', 'tiantai', 'dayun', 'yuanqi', 'fotou', 'huilong', 'chunhua', 'jiutian', 'xiayu'],
    },
  ];
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
    }
    return lists;
  }
  return { kinds, curations, validate };
});
