/* Geographic and architectural facets for the curated catalogue. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory(require('./protection.js'));
  else root.FangguCatalog = factory(root.FangguProtection);
})(typeof globalThis === 'object' ? globalThis : this, protection => {
  'use strict';
  const countries = { CN: '中国', JP: '日本' };
  const regions = {
    north: { name: '华北', provinces: ['北京', '天津', '河北', '山西', '内蒙古'] },
    northeast: { name: '东北', provinces: ['辽宁', '吉林', '黑龙江'] },
    east: { name: '华东', provinces: ['上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '台湾'] },
    central: { name: '华中', provinces: ['河南', '湖北', '湖南'] },
    south: { name: '华南', provinces: ['广东', '广西', '海南', '香港', '澳门'] },
    southwest: { name: '西南', provinces: ['重庆', '四川', '贵州', '云南', '西藏'] },
    northwest: { name: '西北', provinces: ['陕西', '甘肃', '青海', '宁夏', '新疆'] },
    jp_kinki: { name: '近畿', country: 'JP', provinces: ['京都府', '奈良县'] },
  };
  const types = {
    hall: '殿堂', pagoda: '古塔', pavilion: '楼阁', stage: '戏台',
    grotto: '石窟石刻', que: '石阙', wall: '城墙城防', sculpture: '彩塑雕塑', gate: '门坊', bridge: '桥梁', pillar: '经幢',
    tomb: '陵墓', residence: '宅第民居', mural: '壁画', observatory: '天文台', stele: '碑刻', column: '铜柱', palace: '宫苑', church: '教堂', mosque: '清真寺', screen: '照壁', ruins: '古城遗址', garden: '古典园林', school: '古代学府',
  };
  function classify(sites, places) {
    const geography = new Map(places.map(place => [place.key, place]));
    return sites.map(site => {
      const place = geography.get(site.placeKey), country = place?.country || 'CN', province = place?.prov;
      const region = Object.keys(regions).find(key => (regions[key].country || 'CN') === country && regions[key].provinces.includes(province));
      if (!region || !site.types?.length || site.types.some(type => !types[type])) throw new Error(`古迹 ${site.id} 缺少有效的地域或建筑类型`);
      return { ...site, country, province, region, protection: protection.forSite(site.id) };
    });
  }
  function matches(site, filters = {}) {
    const { status = 'all', dynasty = 'all', country = 'all', region = 'all', province = 'all', type = 'all', query = '' } = filters;
    const statusMatch = status === 'all' || (status === 'unvisited' ? site.record.status !== 'visited' : site.record.status === status);
    const typeAliases = { sculpture: '彩塑悬塑 造像 雕塑', gate: '山门 牌坊 牌楼', screen: '影壁 琉璃照壁', ruins: '城址 土城', garden: '园林 苏州园林', school: '国学 书院' };
    const search = [site.name, site.short, site.place, site.sub, ...(site.legacyNames || []), countries[site.country], site.province, regions[site.region]?.name, ...site.types.map(type => `${types[type]} ${typeAliases[type] || ''}`), protection.searchText(site.id)].join(' ').toLocaleLowerCase();
    return statusMatch && (dynasty === 'all' || site.dyn === dynasty)
      && (country === 'all' || site.country === country) && (region === 'all' || site.region === region) && (province === 'all' || site.province === province)
      && (type === 'all' || site.types.includes(type)) && search.includes(query.trim().toLocaleLowerCase());
  }
  function provinces(sites, region = 'all', country = 'all') {
    return Object.entries(regions).filter(([key, area]) => (region === 'all' || region === key) && (country === 'all' || (area.country || 'CN') === country))
      .flatMap(([, area]) => area.provinces).filter(province => sites.some(site => site.province === province));
  }
  return { countries, regions, types, classify, matches, provinces };
});
