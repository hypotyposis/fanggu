import SwiftUI
import XCTest
@testable import Fanggu

final class CurationTests: XCTestCase {
    private func temporaryFile() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("curations-\(UUID().uuidString)/library.json")
    }

    @MainActor func testCurationsShipWithResolvedMembersAndStayReadOnly() throws {
        let url = temporaryFile()
        let store = LibraryStore(fileURL: url)
        XCTAssertGreaterThanOrEqual(store.curations.count, 3)
        XCTAssertEqual(Set(store.curations.map(\.id)).count, store.curations.count)
        for list in store.curations {
            let members = store.members(of: list)
            XCTAssertEqual(members.map(\.id), list.items, "Every shipped member must resolve, in editorial order")
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
