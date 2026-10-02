import XCTest
@testable import Fanggu

final class ReviewTests: XCTestCase {
    func testOldReviewDoesNotInventDimensions() throws {
        let review = try JSONDecoder().decode(Review.self, from: Data(#"{"rating":5,"text":"旧短评","updatedAt":"2026-09-17T08:00:00.000Z"}"#.utf8))
        XCTAssertEqual(review.rating, 5)
        XCTAssertEqual(review.text, "旧短评")
        XCTAssertTrue(review.dimensions.isEmpty)
    }

    func testScoresRoundTripUnsetAndRejectInvalidGrades() throws {
        var scores = DimensionScores()
        scores[.eraRarity] = 5
        scores[.art] = 1
        let restored = try JSONDecoder().decode(DimensionScores.self, from: JSONEncoder().encode(scores))
        XCTAssertEqual(restored, scores)
        XCTAssertNil(restored[.authenticity])
        for invalid in [#"{"art":0}"#, #"{"art":6}"#, #"{"art":2.5}"#, #"{"art":"5"}"#, #"{"unknown":3}"#] {
            XCTAssertThrowsError(try JSONDecoder().decode(DimensionScores.self, from: Data(invalid.utf8)))
        }
    }

    func testRadialTranslationKeepsFingerOffsetAndIgnoresSidewaysMovement() {
        for axis in ReviewDimension.allCases {
            let angle = Double(axis.index) * .pi / 3 - .pi / 2
            XCTAssertEqual(RadarInteraction.value(start: 3, dx: 0, dy: 0, axis: axis, radius: 120), 3)
            XCTAssertEqual(RadarInteraction.value(start: 3, dx: -sin(angle) * 80, dy: cos(angle) * 80, axis: axis, radius: 120), 3, accuracy: 0.0001)
            XCTAssertEqual(RadarInteraction.value(start: 3, dx: cos(angle) * 24, dy: sin(angle) * 24, axis: axis, radius: 120), 4, accuracy: 0.0001)
            XCTAssertEqual(RadarInteraction.value(start: 3, dx: cos(angle) * 999, dy: sin(angle) * 999, axis: axis, radius: 120), 5)
        }
        XCTAssertEqual(RadarInteraction.value(start: 3, dx: 0, dy: 999, axis: .eraRarity, radius: 120), 1)
    }

    func testBoundaryHysteresisSuppressesRepeatedGradeChanges() {
        XCTAssertEqual(RadarInteraction.grade(for: 3.51, previous: 3), 3)
        XCTAssertEqual(RadarInteraction.grade(for: 3.59, previous: 3), 4)
        XCTAssertEqual(RadarInteraction.grade(for: 3.49, previous: 4), 4)
        XCTAssertEqual(RadarInteraction.grade(for: 3.41, previous: 4), 3)
        XCTAssertEqual(RadarInteraction.grade(for: 5, previous: 1), 5)
    }

    func testOverlappingTargetsChooseNearestVisibleVertex() {
        for axis in ReviewDimension.allCases {
            let angle = Double(axis.index) * .pi / 3 - .pi / 2
            let result = RadarInteraction.nearestAxis(dx: cos(angle) * 15, dy: sin(angle) * 15,
                                                      values: Array(repeating: 1, count: 6), radius: 75)
            XCTAssertEqual(result, axis, "Small screens must still distinguish neighbouring E grades")
        }
    }

    @MainActor func testPersistenceBackupClearAndVisitIndependence() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first)
        let visit = VisitRecord(status: .visited, visitedOn: "2026-09-01", note: "独立笔记")
        XCTAssertTrue(store.setRecord(visit, for: site))
        var scores = DimensionScores(); scores[.construction] = 5; scores[.setting] = 2
        XCTAssertTrue(store.setReview(dimensions: scores, text: "<b>照样作为文字</b>", for: site))
        let restored = LibraryStore(fileURL: url)
        XCTAssertEqual(restored.review(for: site).dimensions, scores)
        XCTAssertEqual(restored.record(for: site).note, "独立笔记")
        let backup = try restored.backup().data
        XCTAssertEqual(try JSONDecoder().decode(LibraryData.self, from: backup).version, 4)

        XCTAssertTrue(store.setReview(dimensions: DimensionScores(), text: "", for: site, clearLegacyRating: true))
        let cleared = store.review(for: site)
        XCTAssertTrue(cleared.dimensions.isEmpty)
        XCTAssertFalse(cleared.updatedAt.isEmpty)
        XCTAssertEqual(store.record(for: site).status, .visited)
        XCTAssertEqual(store.record(for: site).visitedOn, "2026-09-01")
        try restored.importBackup(store.backup().data)
        XCTAssertTrue(restored.review(for: site).dimensions.isEmpty, "A v4 clear must overwrite a previous profile")
    }

    @MainActor func testLegacyImportsPreserveNewProfileAndOriginalStars() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first)
        let old = Data("{\"version\":3,\"customSites\":[],\"records\":{},\"links\":{},\"reviews\":{\"\(site.id)\":{\"rating\":4,\"text\":\"旧短评\",\"updatedAt\":\"2026-09-17T08:00:00.000Z\"}}}".utf8)
        try store.importBackup(old)
        XCTAssertTrue(store.review(for: site).dimensions.isEmpty)
        var scores = DimensionScores(); scores[.art] = 5
        XCTAssertTrue(store.setReview(dimensions: scores, text: "新短评", for: site))
        XCTAssertEqual(store.review(for: site).rating, 4)
        try store.importBackup(old)
        XCTAssertEqual(store.review(for: site).dimensions, scores)
        XCTAssertEqual(store.review(for: site).text, "旧短评")
        for version in [1, 2] {
            try store.importBackup(Data("{\"version\":\(version),\"customSites\":[],\"records\":{},\"links\":{}}".utf8))
            XCTAssertEqual(store.review(for: site).dimensions, scores)
        }
        XCTAssertTrue(store.setReview(dimensions: DimensionScores(), text: "", for: site, clearLegacyRating: true))
        XCTAssertNil(store.review(for: site).rating)
    }

    @MainActor func testExistingV3FileOnlyUpgradesAfterSuccessfulSave() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let catalog = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(catalog.monuments.first)
        let original = Data("{\"version\":3,\"customSites\":[],\"records\":{},\"links\":{},\"reviews\":{\"\(site.id)\":{\"rating\":5,\"text\":\"原来的文字\",\"updatedAt\":\"2026-09-17T08:00:00.000Z\"}}}".utf8)
        try FileManager.default.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
        try original.write(to: url)
        let loaded = LibraryStore(fileURL: url)
        XCTAssertEqual(loaded.data.version, 3)
        XCTAssertEqual(try Data(contentsOf: url), original, "Opening a detail must never rewrite personal data")
        XCTAssertTrue(loaded.setReviewDimensions(DimensionScores(), for: site))
        XCTAssertEqual(try Data(contentsOf: url), original, "Releasing on the same grade must not rewrite the file")
        var scores = DimensionScores(); scores[.eraRarity] = 4
        XCTAssertTrue(loaded.setReview(dimensions: scores, text: loaded.review(for: site).text, for: site))
        let restored = LibraryStore(fileURL: url)
        XCTAssertEqual(restored.data.version, 4)
        XCTAssertEqual(restored.review(for: site).rating, 5)
        XCTAssertEqual(restored.review(for: site).dimensions, scores)
        XCTAssertEqual(restored.review(for: site).text, "原来的文字")
    }

    @MainActor func testIndependentAutosavesKeepLatestFieldsAndRejectInvalidText() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first)
        var scores = DimensionScores(); scores[.art] = 5
        XCTAssertTrue(store.setReviewDimensions(scores, for: site))
        XCTAssertTrue(store.setReviewText("自动保存的短评", for: site))
        scores[.eraRarity] = 4
        XCTAssertTrue(store.setReviewDimensions(scores, for: site))
        XCTAssertEqual(store.review(for: site).text, "自动保存的短评")
        XCTAssertEqual(store.review(for: site).dimensions, scores)
        let saved = try Data(contentsOf: url)
        XCTAssertTrue(store.setReviewText("自动保存的短评", for: site))
        XCTAssertTrue(store.setReviewDimensions(scores, for: site))
        XCTAssertEqual(try Data(contentsOf: url), saved, "Unchanged input must not write or change updatedAt")

        XCTAssertFalse(store.setReviewText(String(repeating: "字", count: 501), for: site))
        XCTAssertEqual(try Data(contentsOf: url), saved)
        // A bad text draft cannot block a separate rating save or overwrite valid text.
        scores[.setting] = 2
        XCTAssertTrue(store.setReviewDimensions(scores, for: site))
        let restored = LibraryStore(fileURL: url)
        XCTAssertEqual(restored.review(for: site).dimensions, scores)
        XCTAssertEqual(restored.review(for: site).text, "自动保存的短评")
        XCTAssertTrue(store.setReviewText("", for: site))
        XCTAssertEqual(store.review(for: site).dimensions, scores)
    }

    @MainActor func testFailedSaveAndInvalidImportRetainOriginalData() throws {
        let directory = temporaryFile().deletingLastPathComponent()
        defer { try? FileManager.default.removeItem(at: directory) }
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let blocker = directory.appendingPathComponent("blocked")
        try Data("original".utf8).write(to: blocker)
        let store = LibraryStore(fileURL: blocker.appendingPathComponent("library.json"))
        let site = try XCTUnwrap(store.monuments.first)
        var scores = DimensionScores(); scores[.art] = 5
        XCTAssertFalse(store.setReview(dimensions: scores, text: "不能丢失的草稿", for: site))
        XCTAssertFalse(store.setReviewDimensions(scores, for: site))
        XCTAssertFalse(store.setReviewText("仍须保留的输入", for: site))
        XCTAssertTrue(store.review(for: site).dimensions.isEmpty)
        XCTAssertEqual(try String(contentsOf: blocker, encoding: .utf8), "original")
        let invalid = Data("{\"version\":4,\"customSites\":[],\"records\":{},\"reviews\":{\"\(site.id)\":{\"dimensions\":{\"art\":9},\"text\":\"\",\"updatedAt\":\"2026-09-17T08:00:00.000Z\"}}}".utf8)
        XCTAssertThrowsError(try store.importBackup(invalid))
        XCTAssertTrue(store.review(for: site).dimensions.isEmpty)
    }

    @MainActor func testLegacyRecordsAndUnvisitedAdditionsSurviveNativeBackup() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let largePagoda = try XCTUnwrap(store.monuments.first { $0.id == "xian" })
        let smallPagoda = try XCTUnwrap(store.monuments.first { $0.id == "xian_small" })
        let oldWish = try XCTUnwrap(store.monuments.first { $0.id == "toji" })
        XCTAssertTrue(store.setRecord(VisitRecord(status: .unvisited), for: oldWish))
        let legacy = Data(#"{"version":2,"customSites":[],"links":{},"records":{"xian":{"status":"visited","visitedOn":"","note":"原有雁塔行记"}}}"#.utf8)
        try store.importBackup(legacy)
        XCTAssertEqual(store.record(for: largePagoda).status, .visited)
        XCTAssertEqual(store.record(for: largePagoda).note, "原有雁塔行记")
        XCTAssertEqual(store.record(for: smallPagoda).status, .unvisited)
        XCTAssertEqual(store.record(for: smallPagoda).visitedOn, "")
        XCTAssertEqual(store.record(for: oldWish).status, .unvisited, "Saved records override catalogue defaults")
        XCTAssertNil(store.data.records[smallPagoda.id], "Reading a new entry must not create a record")

        let restored = LibraryStore(fileURL: url.deletingLastPathComponent().appendingPathComponent("restored.json"))
        try restored.importBackup(store.backup().data)
        XCTAssertEqual(restored.record(for: largePagoda).status, .visited)
        XCTAssertEqual(restored.record(for: largePagoda).note, "原有雁塔行记")
        XCTAssertEqual(restored.record(for: largePagoda).visitedOn, "")
        XCTAssertEqual(restored.record(for: oldWish).status, .unvisited)
        XCTAssertEqual(restored.record(for: smallPagoda).status, .unvisited)
        XCTAssertNil(restored.data.records[smallPagoda.id])
    }

    private func temporaryFile() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("fanggu-review-\(UUID().uuidString)")
            .appendingPathComponent("library.json")
    }
}
