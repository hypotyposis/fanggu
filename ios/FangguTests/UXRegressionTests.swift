import XCTest
@testable import Fanggu

final class UXRegressionTests: XCTestCase {
    @MainActor func testSearchMatchesEveryKeywordRegardlessOfOrderOrWhitespace() throws {
        let store = LibraryStore(fileURL: temporaryFile(), language: .simplifiedChinese)
        func matches(_ query: String) -> Set<String> {
            Set(store.monuments.filter { CatalogSearch.matches($0, terms: CatalogSearch.terms(query)) }.map(\.id))
        }
        let expected = Set(store.monuments.filter { $0.province == "山西" && $0.dynastyName == "唐" }.map(\.id))
        XCTAssertFalse(expected.isEmpty)
        XCTAssertEqual(matches("山西 唐"), expected)
        XCTAssertEqual(matches("唐 山西"), expected)
        XCTAssertEqual(matches("  唐\n\t山西　 "), expected)
        XCTAssertEqual(matches(""), Set(store.monuments.map(\.id)))
        XCTAssertEqual(matches("日本 nezu"), matches("NEZU 日本"))
        XCTAssertFalse(matches("日本 nezu").isEmpty, "Alias and country terms may match different fields")
        XCTAssertTrue(matches("唐 no-such-place").isEmpty, "Every keyword is required")
        XCTAssertTrue(matches("<script>").isEmpty, "Search remains plain text")
    }

    @MainActor func testTodayAndStatusCorrectionsUndoWithoutLosingNotesOrReviews() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first)
        let original = VisitRecord(status: .wishlist, visitedOn: "2020-03-04", note: "保留的笔记")
        XCTAssertTrue(store.setRecord(original, for: site))
        XCTAssertTrue(store.setReviewText("独立短评", for: site))
        let review = store.review(for: site)
        XCTAssertTrue(store.recordToday(for: site))
        XCTAssertEqual(store.record(for: site).visitedOn, LibraryStore.today())
        XCTAssertEqual(store.record(for: site).note, original.note)
        XCTAssertTrue(store.undoLastChange())
        XCTAssertEqual(LibraryStore(fileURL: url).record(for: site), original)
        XCTAssertEqual(store.review(for: site), review)

        XCTAssertTrue(store.setStatus(.visited, for: site))
        XCTAssertTrue(store.setStatus(.unvisited, for: site))
        XCTAssertEqual(store.record(for: site).status, .unvisited)
        XCTAssertEqual(store.record(for: site).visitedOn, original.visitedOn)
        XCTAssertEqual(store.record(for: site).note, original.note)
        XCTAssertTrue(store.undoLastChange())
        XCTAssertEqual(store.record(for: site).status, .visited)
        XCTAssertEqual(store.review(for: site), review)
    }

    @MainActor func testUndoFirstVisitRestoresAbsenceAndUnknownDateStaysEmpty() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first { $0.initialStatus == .unvisited })
        XCTAssertNil(store.data.records[site.id])
        XCTAssertTrue(store.recordToday(for: site))
        XCTAssertTrue(store.undoLastChange())
        XCTAssertNil(store.data.records[site.id])
        XCTAssertNil(LibraryStore(fileURL: url).data.records[site.id])
        XCTAssertTrue(store.setRecord(VisitRecord(status: .visited, note: "日期不详"), for: site))
        XCTAssertEqual(store.record(for: site).visitedOn, "")
        XCTAssertTrue(store.recordToday(for: site))
        XCTAssertEqual(store.record(for: site).visitedOn, "", "An existing visit must not be silently redated")
    }

    @MainActor func testReviewResetUndoPreservesNewTextAndClearUndoRestoresLegacyRating() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first)
        let backup = Data("{\"version\":3,\"customSites\":[],\"records\":{},\"links\":{},\"reviews\":{\"\(site.id)\":{\"rating\":5,\"text\":\"原短评\",\"updatedAt\":\"2026-09-17T08:00:00.000Z\"}}}".utf8)
        try store.importBackup(backup)
        var scores = DimensionScores(); scores[.art] = 5; scores[.setting] = 1
        XCTAssertTrue(store.setReviewDimensions(scores, for: site))
        let visit = store.record(for: site)
        XCTAssertTrue(store.resetReviewDimensions(for: site))
        XCTAssertTrue(store.setReviewText("重置后新写的短评", for: site))
        XCTAssertTrue(store.undoLastChange())
        XCTAssertEqual(store.review(for: site).dimensions, scores)
        XCTAssertEqual(store.review(for: site).text, "重置后新写的短评")
        XCTAssertEqual(store.review(for: site).rating, 5)

        XCTAssertTrue(store.clearReview(for: site))
        XCTAssertNil(store.review(for: site).rating)
        XCTAssertFalse(store.review(for: site).updatedAt.isEmpty)
        XCTAssertTrue(store.undoLastChange())
        let restored = LibraryStore(fileURL: url)
        XCTAssertEqual(restored.review(for: site).dimensions, scores)
        XCTAssertEqual(restored.review(for: site).rating, 5)
        XCTAssertEqual(restored.review(for: site).text, "重置后新写的短评")
        XCTAssertEqual(restored.record(for: site), visit)
    }

    @MainActor func testNewReviewEditInvalidatesClearUndoAndLatestVisitOwnsUndo() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let sites = Array(store.monuments.filter { $0.initialStatus != .visited }.prefix(2))
        XCTAssertEqual(sites.count, 2)
        XCTAssertTrue(store.setReviewText("清空前", for: sites[0]))
        XCTAssertTrue(store.clearReview(for: sites[0]))
        XCTAssertTrue(store.setReviewText("新评价", for: sites[0]))
        XCTAssertNil(store.undoAction)
        XCTAssertFalse(store.undoLastChange())
        XCTAssertEqual(store.review(for: sites[0]).text, "新评价")
        XCTAssertTrue(store.recordToday(for: sites[0]))
        XCTAssertTrue(store.recordToday(for: sites[1]))
        XCTAssertTrue(store.undoLastChange())
        XCTAssertEqual(store.record(for: sites[0]).status, .visited)
        XCTAssertEqual(store.record(for: sites[1]).status, sites[1].initialStatus)
    }

    @MainActor func testFailedUndoPreservesSavedRecordAndCanBeRetried() throws {
        let url = temporaryFile()
        let parent = url.deletingLastPathComponent()
        let moved = parent.appendingPathExtension("saved")
        defer {
            try? FileManager.default.removeItem(at: parent)
            try? FileManager.default.removeItem(at: moved)
        }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first { $0.initialStatus != .visited })
        XCTAssertTrue(store.recordToday(for: site))
        let saved = try Data(contentsOf: url)
        let actionID = store.undoAction?.id
        try FileManager.default.moveItem(at: parent, to: moved)
        try Data("block writes".utf8).write(to: parent)
        XCTAssertFalse(store.undoLastChange())
        XCTAssertEqual(store.undoAction?.id, actionID)
        XCTAssertEqual(store.record(for: site).status, .visited)
        XCTAssertEqual(try Data(contentsOf: moved.appendingPathComponent("library.json")), saved)
        XCTAssertNotNil(store.error)
        try FileManager.default.removeItem(at: parent)
        try FileManager.default.moveItem(at: moved, to: parent)
        XCTAssertTrue(store.undoLastChange())
        XCTAssertEqual(LibraryStore(fileURL: url).record(for: site).status, site.initialStatus)
        XCTAssertNil(store.error)
    }

    @MainActor func testUnreadableLibraryCannotReportAnUnchangedVisitAsSaved() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        try FileManager.default.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
        let original = Data("unreadable original".utf8)
        try original.write(to: url)
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first { $0.initialStatus == .visited })
        XCTAssertFalse(store.setRecord(store.record(for: site), for: site))
        XCTAssertFalse(store.recordToday(for: site))
        XCTAssertNil(store.undoAction)
        XCTAssertNotNil(store.error)
        XCTAssertEqual(try Data(contentsOf: url), original)
    }

    @MainActor func testTypeAliasSearchFindsRuinsGardensSchoolsCastlesAndShrines() throws {
        let store = LibraryStore(fileURL: temporaryFile())
        // One alias per type added alongside catalog.js; each term is absent from the
        // site's plain fields so only the typeAliases table can produce the match.
        let cases: [(type: String, alias: String, id: String)] = [
            ("ruins", "城址", "xj_jiaohe"),
            ("garden", "苏州园林", "js_liuyuan"),
            ("school", "国学", "bj_guozijian"),
            ("castle", "天守", "jp_osaka_sengan"),
            ("shrine", "神宫", "jp_kasuga_honden"),
        ]
        for item in cases {
            let site = try XCTUnwrap(store.monuments.first { $0.id == item.id }, "\(item.id) is in the bundled catalog")
            XCTAssertTrue(site.types.contains(item.type), "\(item.id) is typed \(item.type)")
            let plain = [site.name, site.short, site.sub, site.place] + site.legacyNames + site.typeNames
            XCTAssertFalse(plain.contains { $0.localizedCaseInsensitiveContains(item.alias) },
                           "\(item.alias) must reach \(item.id) only through the \(item.type) alias")
            XCTAssertTrue(CatalogSearch.matches(site, terms: CatalogSearch.terms(item.alias)),
                          "\(item.alias) should find \(item.id) via the \(item.type) alias")
        }
    }

    private func temporaryFile() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("fanggu-ux-\(UUID().uuidString)")
            .appendingPathComponent("library.json")
    }
}
