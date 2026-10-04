import Foundation

enum CatalogSearch {
    static let typeAliases = ["sculpture": "彩塑悬塑 造像 雕塑", "gate": "山门 牌坊 牌楼", "screen": "影壁 琉璃照壁"]
    static func terms(_ query: String) -> [String] {
        query.split(whereSeparator: \.isWhitespace).map(String.init)
    }

    static func matches(_ site: Monument, terms: [String]) -> Bool {
        guard !terms.isEmpty else { return true }
        let protection = site.protection.flatMap {
            [$0.unitName, $0.scope, $0.batchLabel, "第\($0.batch)批国保", "国保", "全国重点文物保护单位",
             String(localized: "全国重点文物保护单位")]
        }
        let fields = [site.name, site.short, site.sub, site.place, site.provinceName, site.province, site.dynastyName,
                      site.countryName, site.regionName]
            + site.typeNames + site.types.compactMap { typeAliases[$0] }
            + site.legacyNames + site.legacyPlaces + site.searchAliases + protection
        return terms.allSatisfy { term in fields.contains { $0.localizedCaseInsensitiveContains(term) } }
    }
}
