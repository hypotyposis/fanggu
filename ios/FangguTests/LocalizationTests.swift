import XCTest
@testable import Fanggu

final class LocalizationTests: XCTestCase {
    func testLanguageResolutionFollowsBundleLocalizations() {
        XCTAssertEqual(AppLanguage.resolve(["en"]), .english)
        XCTAssertEqual(AppLanguage.resolve(["en-GB", "ja"]), .english)
        XCTAssertEqual(AppLanguage.resolve(["ja"]), .japanese)
        XCTAssertEqual(AppLanguage.resolve(["zh-Hans"]), .simplifiedChinese)
        XCTAssertEqual(AppLanguage.resolve(["fr"]), .simplifiedChinese, "The development language is the fallback")
        XCTAssertEqual(AppLanguage.resolve([]), .simplifiedChinese)
    }

    @MainActor func testEveryLanguageLoadsTheSameMonumentsWithTranslatedText() throws {
        let stores = AppLanguage.allCases.map { LibraryStore(fileURL: temporaryFile(), language: $0) }
        let chinese = stores[0].monuments
        XCTAssertFalse(chinese.isEmpty)
        for store in stores.dropFirst() {
            XCTAssertEqual(store.monuments.map(\.id), chinese.map(\.id))
            for (site, source) in zip(store.monuments, chinese) {
                // Keys used by filters, the timeline, artwork and personal records are language-independent.
                XCTAssertEqual(site.dynasty, source.dynasty)
                XCTAssertEqual(site.year, source.year)
                XCTAssertEqual(site.country, source.country)
                XCTAssertEqual(site.province, source.province)
                XCTAssertEqual(site.region, source.region)
                XCTAssertEqual(site.placeKey, source.placeKey)
                XCTAssertEqual(site.types, source.types)
                XCTAssertEqual(site.lineImage, source.lineImage)
                XCTAssertEqual(site.colorImage, source.colorImage)
                XCTAssertEqual(site.initialStatus, source.initialStatus)
                XCTAssertEqual(site.facts.count, source.facts.count)
                XCTAssertEqual(site.protection.map(\.batch), source.protection.map(\.batch))
            }
            XCTAssertEqual(store.timeline.sorted.map(\.id), stores[0].timeline.sorted.map(\.id))
        }
        let english = try XCTUnwrap(stores[1].monuments.first { $0.id == "liyeque" })
        let japanese = try XCTUnwrap(stores[2].monuments.first { $0.id == "liyeque" })
        XCTAssertEqual(english.provinceName, "Sichuan")
        XCTAssertEqual(english.countryName, "China")
        XCTAssertEqual(japanese.provinceName, "四川")
        XCTAssertNil(english.name.range(of: "\\p{Han}", options: .regularExpression), english.name)
        let source = try XCTUnwrap(chinese.first { $0.id == "liyeque" })
        XCTAssertNotEqual(japanese.name, source.name, "Japanese uses shinjitai rather than simplified forms")
    }

    @MainActor func testSearchFindsMonumentsByNamesInAnyCatalogLanguage() throws {
        let english = LibraryStore(fileURL: temporaryFile(), language: .english)
        let chinese = LibraryStore(fileURL: temporaryFile(), language: .simplifiedChinese)
        func ids(_ store: LibraryStore, _ query: String) -> Set<String> {
            Set(store.monuments.filter { CatalogSearch.matches($0, terms: CatalogSearch.terms(query)) }.map(\.id))
        }
        let source = try XCTUnwrap(chinese.monuments.first { $0.id == "liyeque" })
        let translated = try XCTUnwrap(english.monuments.first { $0.id == "liyeque" })
        XCTAssertTrue(ids(english, source.name).contains("liyeque"), "Chinese names still match in English")
        XCTAssertTrue(ids(chinese, translated.name).contains("liyeque"), "English names also match in Chinese")
        XCTAssertTrue(ids(english, "Sichuan").contains("liyeque"))
        XCTAssertTrue(ids(english, "四川").contains("liyeque"))
    }

    func testStatusAndDimensionLabelsAreLocalized() {
        XCTAssertFalse(VisitStatus.visited.title.isEmpty)
        XCTAssertEqual(Set(VisitStatus.allCases.map(\.title)).count, VisitStatus.allCases.count)
        XCTAssertEqual(Set(ReviewDimension.allCases.map(\.title)).count, ReviewDimension.allCases.count)
        let entry = ProtectionEntry(batch: 6, unitName: "", relation: "unit", scope: "", locator: "", note: "", sourceTitle: "", sourceURL: "")
        switch AppLanguage.current {
        case .simplifiedChinese: XCTAssertEqual(entry.batchLabel, "第六批国保")
        case .english, .japanese: XCTAssertTrue(entry.batchLabel.contains("6"), entry.batchLabel)
        }
    }

    private func temporaryFile() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("fanggu-l10n-\(UUID().uuidString)")
            .appendingPathComponent("library.json")
    }
}
