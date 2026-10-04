import Foundation

enum CatalogSearch {
    static let regionNames = ["north": "华北", "northeast": "东北", "east": "华东", "central": "华中", "south": "华南", "southwest": "西南", "northwest": "西北", "jp_kinki": "近畿", "kr_capital": "韩国首都圈", "kr_chungcheong": "忠清地区", "kr_gyeongsang": "庆尚地区", "kp_pyongyang": "平壤地区", "kp_kaesong": "开城地区", "jp_kanto": "关东", "jp_chugoku": "中国地方", "kh_angkor": "吴哥地区", "id_java": "爪哇", "th_north": "泰国北部", "th_central": "泰国中部", "mm_central": "缅甸中部", "la_north": "老挝北部", "vn_central": "越南中部", "ph_luzon": "吕宋"]
    static let countryNames = ["CN": "中国", "JP": "日本", "KR": "韩国", "KP": "朝鲜", "KH": "柬埔寨", "ID": "印度尼西亚", "TH": "泰国", "MM": "缅甸", "LA": "老挝", "VN": "越南", "PH": "菲律宾"]
    static let typeAliases = ["sculpture": "彩塑悬塑 造像 雕塑", "gate": "山门 牌坊 牌楼", "screen": "影壁 琉璃照壁"]
    static func terms(_ query: String) -> [String] {
        query.split(whereSeparator: \.isWhitespace).map(String.init)
    }

    static func matches(_ site: Monument, terms: [String]) -> Bool {
        guard !terms.isEmpty else { return true }
        let protection = site.protection.flatMap {
            [$0.unitName, $0.scope, $0.batchLabel, "第\($0.batch)批国保", "国保", "全国重点文物保护单位"]
        }
        let fields = [site.name, site.short, site.sub, site.place, site.province, site.dynastyName,
                      countryNames[site.country] ?? site.country, regionNames[site.region] ?? site.region]
            + site.typeNames + site.types.compactMap { typeAliases[$0] }
            + site.legacyNames + site.legacyPlaces + protection
        return terms.allSatisfy { term in fields.contains { $0.localizedCaseInsensitiveContains(term) } }
    }
}
