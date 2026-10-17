import XCTest
@testable import Fanggu

final class UXRegressionTests: XCTestCase {
    func testArrivalFrictionHasNoDetentAtTwentyPercentBoundaries() throws {
        var motion = ArrivalHapticMotion()
        for boundary in [0.2, 0.4, 0.6, 0.8] {
            let before = try XCTUnwrap(motion.update(progress: boundary - 0.001))
            let after = try XCTUnwrap(motion.update(progress: boundary + 0.001))
            XCTAssertGreaterThan(after.intensity, before.intensity)
            XCTAssertLessThan(after.intensity - before.intensity, 0.001)
            XCTAssertLessThan(after.sharpness - before.sharpness, 0.001)
        }
    }

    func testArrivalFrictionTracksReverseTravelAndSilencesRestAndEnds() throws {
        var motion = ArrivalHapticMotion()
        XCTAssertNil(motion.update(progress: 0))
        let forward = try XCTUnwrap(motion.update(progress: 0.7))
        XCTAssertNil(motion.update(progress: 0.7), "Holding still must not sustain vibration")
        let backward = try XCTUnwrap(motion.update(progress: 0.3))
        XCTAssertGreaterThan(backward.intensity, 0, "A zipper also moves smoothly backwards")
        XCTAssertLessThan(backward.intensity, forward.intensity)
        XCTAssertNil(motion.update(progress: 1))
        XCTAssertNil(motion.update(progress: 1.2))
        XCTAssertNotNil(motion.update(progress: 0.9), "Moving away from the end resumes friction")
        XCTAssertNil(motion.update(progress: -0.1))
        XCTAssertNil(motion.update(progress: .nan))
        XCTAssertNil(motion.update(progress: .infinity))
        motion = ArrivalHapticMotion()
        XCTAssertNotNil(motion.update(progress: 0.3), "A new gesture has no remembered detents")
    }

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

    @MainActor func testVisitDraftRestoresDateAndNoteWithoutChangingRecordsReviewsOrBackup() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first { $0.initialStatus == .unvisited })
        XCTAssertTrue(store.setReviewText("独立评价", for: site))
        let saved = try Data(contentsOf: url)
        let review = store.review(for: site)
        let draft = VisitDraft(originalRecord: store.record(for: site), dateKnown: true,
                               date: Date(timeIntervalSince1970: 1_600_000_000), note: "尚未保存的到访笔记")
        XCTAssertTrue(store.setVisitDraft(draft, for: site))
        let restored = LibraryStore(fileURL: url)
        XCTAssertEqual(try restored.visitDraft(for: site), draft)
        XCTAssertNil(restored.data.records[site.id])
        XCTAssertEqual(restored.review(for: site), review)
        XCTAssertEqual(try Data(contentsOf: url), saved)
        let backup = try JSONDecoder().decode(LibraryData.self, from: restored.backup().data)
        XCTAssertNil(backup.records[site.id])
        XCTAssertEqual(backup.version, 5)
        XCTAssertNil(store.undoAction)
    }

    @MainActor func testVisitDraftsStayIndependentAndDiscardPreservesSavedRecords() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let sites = Array(store.monuments.prefix(2))
        let record = VisitRecord(status: .visited, visitedOn: "2020-03-04", note: "正式笔记")
        XCTAssertTrue(store.setRecord(record, for: sites[0]))
        let actionID = store.undoAction?.id
        let first = VisitDraft(originalRecord: record, dateKnown: false, date: .now, note: "第一处草稿")
        let second = VisitDraft(originalRecord: store.record(for: sites[1]), dateKnown: false,
                                date: Date(timeIntervalSince1970: 1_600_000_000), note: "第二处草稿")
        XCTAssertTrue(store.setVisitDraft(first, for: sites[0]))
        XCTAssertTrue(store.setVisitDraft(second, for: sites[1]))
        XCTAssertEqual(try LibraryStore(fileURL: url).visitDraft(for: sites[0]), first)
        XCTAssertTrue(store.discardVisitDraft(for: sites[0]))
        let restored = LibraryStore(fileURL: url)
        XCTAssertNil(try restored.visitDraft(for: sites[0]))
        XCTAssertEqual(try restored.visitDraft(for: sites[1]), second)
        XCTAssertEqual(restored.record(for: sites[0]), record)
        XCTAssertEqual(store.undoAction?.id, actionID)
    }

    @MainActor func testVisitDraftCannotReplaceAnUpdatedRecord() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first { $0.initialStatus == .unvisited })
        let draft = VisitDraft(originalRecord: store.record(for: site), dateKnown: false, date: .now, note: "旧草稿")
        XCTAssertTrue(store.setVisitDraft(draft, for: site))
        XCTAssertTrue(store.recordToday(for: site))
        XCTAssertNil(try store.visitDraft(for: site), "A changed saved record takes precedence over an old draft")
        XCTAssertFalse(store.setVisitDraft(draft, for: site), "A stale editor cannot rewrite a newer draft")
        XCTAssertEqual(store.record(for: site).status, .visited)
    }

    @MainActor func testVisitDraftSurvivesWishlistChangesWithoutRevertingTheStatus() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first { $0.initialStatus == .unvisited })
        let draft = VisitDraft(originalRecord: store.record(for: site), dateKnown: false, date: .now, note: "尚未写完")
        XCTAssertTrue(store.setVisitDraft(draft, for: site))
        XCTAssertTrue(store.setStatus(.wishlist, for: site))
        let restored = LibraryStore(fileURL: url)
        XCTAssertEqual(try restored.visitDraft(for: site), draft, "A status-only change must not discard note or date edits")
        XCTAssertEqual(restored.record(for: site).status, .wishlist)
    }

    @MainActor func testVisitDraftFailurePreservesPreviousFileAndCanRetry() throws {
        let url = temporaryFile()
        let parent = url.deletingLastPathComponent()
        let moved = parent.appendingPathExtension("saved")
        defer {
            try? FileManager.default.removeItem(at: parent)
            try? FileManager.default.removeItem(at: moved)
        }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first)
        let original = VisitDraft(originalRecord: store.record(for: site), dateKnown: false, date: .now, note: "原草稿")
        XCTAssertTrue(store.setVisitDraft(original, for: site))
        try FileManager.default.moveItem(at: parent, to: moved)
        try Data("block writes".utf8).write(to: parent)
        var edited = original; edited.note = "修改保留在编辑器中"
        XCTAssertFalse(store.setVisitDraft(edited, for: site))
        XCTAssertNotNil(store.error)
        XCTAssertNil(store.data.records[site.id])
        try FileManager.default.removeItem(at: parent)
        try FileManager.default.moveItem(at: moved, to: parent)
        XCTAssertEqual(try LibraryStore(fileURL: url).visitDraft(for: site), original)
        XCTAssertTrue(store.setVisitDraft(edited, for: site))
        XCTAssertEqual(try LibraryStore(fileURL: url).visitDraft(for: site), edited)
        XCTAssertNil(store.error)
    }

    @MainActor func testCorruptVisitDraftIsNotOverwrittenByAnotherEdit() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first)
        let draft = VisitDraft(originalRecord: store.record(for: site), dateKnown: false, date: .now, note: "草稿")
        XCTAssertTrue(store.setVisitDraft(draft, for: site))
        let draftURL = url.deletingPathExtension().appendingPathExtension("visit-drafts")
            .appendingPathComponent(site.id).appendingPathExtension("json")
        let damaged = Data("unreadable draft".utf8)
        try damaged.write(to: draftURL)
        XCTAssertThrowsError(try LibraryStore(fileURL: url).visitDraft(for: site))
        XCTAssertFalse(store.setVisitDraft(draft, for: site))
        XCTAssertEqual(try Data(contentsOf: draftURL), damaged)
        XCTAssertTrue(store.discardVisitDraft(for: site), "An explicit cancel may discard the draft")
        XCTAssertNil(try store.visitDraft(for: site))
    }

    @MainActor func testInvalidVisitNoteStillSurvivesAsADraft() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first { $0.initialStatus == .unvisited })
        let draft = VisitDraft(originalRecord: store.record(for: site), dateKnown: false, date: .now,
                               note: String(repeating: "古", count: 12001))
        XCTAssertTrue(store.setVisitDraft(draft, for: site))
        XCTAssertFalse(store.setRecord(VisitRecord(status: .visited, note: draft.note), for: site))
        XCTAssertEqual(try LibraryStore(fileURL: url).visitDraft(for: site), draft)
        XCTAssertNil(store.data.records[site.id])
    }

    private func temporaryFile() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("fanggu-ux-\(UUID().uuidString)")
            .appendingPathComponent("library.json")
    }
}
