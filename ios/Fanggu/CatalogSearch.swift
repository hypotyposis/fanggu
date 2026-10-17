import Foundation

enum CatalogSearch {
    static let typeAliases = ["sculpture": "彩塑悬塑 造像 雕塑", "gate": "山门 牌坊 牌楼", "screen": "影壁 琉璃照壁", "ruins": "城址 土城", "garden": "园林 苏州园林", "school": "国学 书院", "castle": "天守 城堡", "shrine": "神社 神宫"]
    static func terms(_ query: String) -> [String] {
        query.split(whereSeparator: \.isWhitespace).map(String.init)
    }

    static func matches(_ site: Monument, terms: [String]) -> Bool {
        guard !terms.isEmpty else { return true }
        let protection = site.protection.flatMap(\.searchTerms)
        var fields: [String] = [site.name, site.short, site.sub, site.place, site.provinceName, site.province,
                                site.dynastyName, site.countryName, site.regionName]
        fields.append(contentsOf: site.typeNames)
        fields.append(contentsOf: site.types.compactMap { typeAliases[$0] })
        fields.append(contentsOf: site.legacyNames)
        fields.append(contentsOf: site.legacyPlaces)
        fields.append(contentsOf: site.searchAliases)
        fields.append(contentsOf: protection)
        return terms.allSatisfy { term in fields.contains { $0.localizedCaseInsensitiveContains(term) } }
    }
}
