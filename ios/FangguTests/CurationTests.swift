import SwiftUI
import XCTest
@testable import Fanggu

final class CurationTests: XCTestCase {
    private func temporaryFile() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("curations-\(UUID().uuidString)/library.json")
    }

    @MainActor func testGroupVisitPersistsAtomicallyAndUndoRestoresAbsentRecords() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let list = try XCTUnwrap(store.curations.first { $0.id == "kaiyuan" })
        let members = store.members(of: list)
        XCTAssertEqual(members.count, 2)
        XCTAssertTrue(members.allSatisfy { store.record(for: $0).status == .unvisited })
        let original = try XCTUnwrap(store.legacySite(for: list))
        let oldVisit = VisitRecord(status: .visited, visitedOn: "2020-01-02", note: "当时只记了开元寺")
        XCTAssertTrue(store.setRecord(oldVisit, for: original))
        XCTAssertTrue(store.recordToday(for: list))
        let reloaded = LibraryStore(fileURL: url)
        XCTAssertEqual(reloaded.progress(of: list).visited, 2)
        XCTAssertEqual(reloaded.record(for: original), oldVisit)
        XCTAssertTrue(members.allSatisfy { reloaded.record(for: $0).visitedOn == LibraryStore.today() })
        XCTAssertTrue(store.undoLastChange())
        XCTAssertTrue(members.allSatisfy { store.data.records[$0.id] == nil })
        XCTAssertEqual(store.record(for: original), oldVisit)
        XCTAssertEqual(LibraryStore(fileURL: url).progress(of: list).visited, 0)
    }

    @MainActor func testGroupVisitPreservesVisitedDatesNotesReviewsAndOtherGroups() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let list = try XCTUnwrap(store.curations.first { $0.id == "kaiyuan" })
        let members = store.members(of: list)
        let prior = VisitRecord(status: .visited, visitedOn: "2020-01-02", note: "旧单体笔记")
        let wish = VisitRecord(status: .wishlist, note: "想再仔细看钟楼")
        XCTAssertTrue(store.setRecord(prior, for: members[0]))
        XCTAssertTrue(store.setRecord(wish, for: members[1]))
        XCTAssertTrue(store.setReviewText("原评价", for: members[1]))
        let review = store.review(for: members[1])
        let before = store.data.records
        XCTAssertTrue(store.recordToday(for: list))
        XCTAssertEqual(store.record(for: members[0]), prior)
        XCTAssertEqual(store.record(for: members[1]).note, wish.note)
        XCTAssertEqual(store.review(for: members[1]), review)
        XCTAssertEqual(Set(store.data.records.keys), Set(before.keys))
        XCTAssertTrue(store.recordToday(for: list), "Repeated action is a no-op and preserves the first undo")
        XCTAssertTrue(store.undoLastChange())
        XCTAssertEqual(store.data.records, before)
        XCTAssertEqual(store.review(for: members[1]), review)
    }

    @MainActor func testGroupSaveFailureDoesNotPartiallyPublishAndCanRetry() throws {
        let directory = temporaryFile().deletingLastPathComponent()
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        defer { try? FileManager.default.removeItem(at: directory) }
        let blocker = directory.appendingPathComponent("blocker")
        let url = blocker.appendingPathComponent("library.json")
        try Data("not a directory".utf8).write(to: blocker)
        let store = LibraryStore(fileURL: url)
        let list = try XCTUnwrap(store.curations.first { $0.id == "kaiyuan" })
        XCTAssertFalse(store.recordToday(for: list))
        XCTAssertEqual(store.progress(of: list).visited, 0)
        XCTAssertTrue(store.data.records.isEmpty)
        XCTAssertNil(store.undoAction)
        XCTAssertNotNil(store.error)
        try FileManager.default.removeItem(at: blocker)
        XCTAssertTrue(store.recordToday(for: list))
        XCTAssertEqual(LibraryStore(fileURL: url).progress(of: list).visited, 2)
    }

    @MainActor func testOldGroupBackupStaysInCollectionWithoutCopyingToChildren() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        var old = LibraryData()
        old.records["kaiyuan"] = VisitRecord(status: .visited, visitedOn: "2020-01-02", note: "旧寺院记录")
        old.reviews["kaiyuan"] = Review(text: "旧寺院评价", updatedAt: "2020-01-02T12:00:00.000Z")
        let store = LibraryStore(fileURL: url)
        try store.importBackup(JSONEncoder().encode(old))
        let reloaded = LibraryStore(fileURL: url)
        let list = try XCTUnwrap(reloaded.curations.first { $0.id == "kaiyuan" })
        let original = try XCTUnwrap(reloaded.legacySite(for: list))
        XCTAssertFalse(reloaded.monuments.contains(original))
        XCTAssertEqual(reloaded.record(for: original), old.records["kaiyuan"])
        XCTAssertEqual(reloaded.review(for: original), old.reviews["kaiyuan"])
        XCTAssertEqual(reloaded.progress(of: list).visited, 0)
        XCTAssertTrue(reloaded.members(of: list).allSatisfy { reloaded.data.records[$0.id] == nil })
        let exported = try JSONDecoder().decode(LibraryData.self, from: reloaded.backup().data)
        XCTAssertEqual(exported.records, old.records)
        XCTAssertEqual(exported.reviews, old.reviews)
    }

    @MainActor func testCurationsShipWithResolvedMembersAndStayReadOnly() throws {
        let url = temporaryFile()
        let store = LibraryStore(fileURL: url)
        XCTAssertGreaterThanOrEqual(store.curations.count, 3)
        XCTAssertEqual(Set(store.curations.map(\.id)).count, store.curations.count)
        for list in store.curations {
            let members = store.members(of: list)
            XCTAssertEqual(members.map(\.id), list.items, "Every shipped member must resolve, in editorial order")
            if list.kind == "route" {
                XCTAssertEqual(members.map(\.year), members.map(\.year).sorted(), "Route members stay chronological after a split")
            }
            XCTAssertFalse(list.kindName.isEmpty); XCTAssertFalse(list.lede.isEmpty)
            for site in members { XCTAssertTrue(store.curations(for: site).contains(list)) }
            let progress = store.progress(of: list)
            XCTAssertEqual(progress.total, members.count)
            XCTAssertEqual(progress.visited, members.filter { store.record(for: $0).status == .visited }.count)
        }
        let tang = try XCTUnwrap(store.curations.first { $0.id == "tang_timber" })
        XCTAssertEqual(store.members(of: tang).map(\.id), ["nanchan", "guangren", "foguang", "tiantai"])
        XCTAssertFalse(FileManager.default.fileExists(atPath: url.path), "Reading lists and progress must not create personal records")
    }

    @MainActor func testProgressFollowsPersonalRecordsAndUndo() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let list = try XCTUnwrap(store.curations.first { $0.id == "zhuozhang_valley" })
        let members = store.members(of: list)
        for site in members where store.record(for: site).status == .visited { XCTAssertTrue(store.setStatus(.unvisited, for: site)) }
        XCTAssertEqual(store.progress(of: list), CurationProgress(visited: 0, total: members.count))
        XCTAssertFalse(store.progress(of: list).isComplete)
        let first = try XCTUnwrap(members.first)
        XCTAssertTrue(store.recordToday(for: first))
        XCTAssertEqual(store.progress(of: list).visited, 1)
        XCTAssertTrue(store.undoLastChange())
        XCTAssertEqual(store.progress(of: list).visited, 0)
        for site in members { XCTAssertTrue(store.setStatus(.visited, for: site)) }
        XCTAssertTrue(store.progress(of: list).isComplete)
        XCTAssertEqual(LibraryStore(fileURL: url).progress(of: list).visited, members.count, "Progress is derived from persisted records")
    }

    @MainActor func testCollectionGroupsCoverTheWholeCatalogue() throws {
        let store = LibraryStore(fileURL: temporaryFile())
        let visitedTotal = store.monuments.filter { store.record(for: $0).status == .visited }.count
        for facet in [CollectionFacet.dynasty, .province] {
            let groups = store.collectionGroups(by: facet)
            XCTAssertEqual(groups.reduce(0) { $0 + $1.total }, store.monuments.count, "\(facet) partitions the catalogue")
            XCTAssertEqual(groups.reduce(0) { $0 + $1.visited }, visitedTotal)
            XCTAssertEqual(Set(groups.map(\.id)).count, groups.count)
            for group in groups { XCTAssertLessThanOrEqual(group.visited, group.total) }
        }
        let dynasties = store.collectionGroups(by: .dynasty)
        XCTAssertEqual(dynasties.map(\.total), dynasties.map(\.total).sorted(by: >), "Largest collections lead")
        XCTAssertTrue(dynasties.allSatisfy { $0.colorHex != nil })
        let types = store.collectionGroups(by: .type)
        XCTAssertEqual(types.reduce(0) { $0 + $1.total }, store.monuments.reduce(0) { $0 + $1.types.count }, "Multi-type entries count once per type")
        let shanxi = try XCTUnwrap(store.collectionGroups(by: .province).first { $0.id == "山西" })
        XCTAssertEqual(shanxi.total, store.monuments.filter { $0.province == "山西" }.count)
        let kyoto = try XCTUnwrap(store.collectionGroups(by: .province).first { $0.id == "京都府" })
        XCTAssertEqual(kyoto.name, "日本 · 京都府")
    }

    @MainActor func testShareCardsRenderAtExportSizeWithoutTouchingRecords() throws {
        let url = temporaryFile()
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first { $0.id == "foguang" })
        var scores = DimensionScores(); scores[.eraRarity] = 5
        let review = Review(dimensions: scores, text: "大殿如山", updatedAt: "")
        let visited = VisitRecord(status: .visited, visitedOn: "2024-05-01", note: "私人笔记不应出现")
        for options in [ShareCardOptions(), ShareCardOptions(includeReview: false, includeGrades: false)] {
            let image = try XCTUnwrap(ShareCardRenderer.render(MonumentShareCard(site: site, record: visited, review: review, options: options)))
            XCTAssertEqual(image.size.width * image.scale, ShareCardRenderer.size.width * 3, accuracy: 1)
            XCTAssertEqual(image.size.height * image.scale, ShareCardRenderer.size.height * 3, accuracy: 1)
        }
        let unvisited = try XCTUnwrap(ShareCardRenderer.render(MonumentShareCard(site: site, record: VisitRecord(), review: Review(), options: ShareCardOptions())))
        XCTAssertEqual(unvisited.size.height * unvisited.scale, ShareCardRenderer.size.height * 3, accuracy: 1)
        let list = try XCTUnwrap(store.curations.first { $0.id == "liao_eight" })
        let members = store.members(of: list)
        let card = try XCTUnwrap(ShareCardRenderer.render(CurationShareCard(curation: list, members: members, visitedIDs: Set(members.prefix(3).map(\.id)))))
        XCTAssertEqual(card.size.width * card.scale, ShareCardRenderer.size.width * 3, accuracy: 1)
        XCTAssertFalse(FileManager.default.fileExists(atPath: url.path), "Rendering a card never writes personal records")
    }
}
