import XCTest
@testable import Fanggu

final class PersonalListTests: XCTestCase {
    private func temporaryFile() -> URL {
        FileManager.default.temporaryDirectory.appendingPathComponent("lists-\(UUID().uuidString)/library.json")
    }

    @MainActor func testListsPersistOrderedNotesWithoutChangingVisitsOrReviews() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let first = try XCTUnwrap(store.monuments.first)
        let second = try XCTUnwrap(store.monuments.dropFirst().first)
        let before = store.data
        let list = try XCTUnwrap(store.createPersonalList(title: "  建筑的回声  ", description: "形制上的联系", site: first))
        XCTAssertEqual(list.title, "建筑的回声")
        XCTAssertTrue(store.addToPersonalList(list.id, site: second))
        XCTAssertTrue(store.setPersonalListNote("<script>只是文本</script>", siteID: first.id, listID: list.id))
        let unchanged = try XCTUnwrap(store.personalList(list.id)).updatedAt
        XCTAssertTrue(store.addToPersonalList(list.id, site: first))
        XCTAssertEqual(store.personalList(list.id)?.updatedAt, unchanged, "Adding a duplicate does not rewrite the list")
        XCTAssertTrue(store.movePersonalListItem(second.id, in: list.id, by: -1))
        XCTAssertFalse(store.movePersonalListItem(second.id, in: list.id, by: -1))
        XCTAssertTrue(store.updatePersonalList(list.id, title: "九间大殿", description: "新说明"))
        let reloaded = LibraryStore(fileURL: url)
        let saved = try XCTUnwrap(reloaded.personalList(list.id))
        XCTAssertEqual(saved.items.map(\.siteID), [second.id, first.id])
        XCTAssertEqual(saved.items.last?.note, "<script>只是文本</script>")
        XCTAssertEqual(saved.title, "九间大殿")
        XCTAssertEqual(saved.description, "新说明")
        XCTAssertEqual(reloaded.data.records, before.records)
        XCTAssertEqual(reloaded.data.reviews, before.reviews)
        XCTAssertTrue(store.removeFromPersonalList(list.id, siteID: first.id))
        XCTAssertEqual(store.personalList(list.id)?.items.map(\.siteID), [second.id])
        XCTAssertTrue(store.deletePersonalList(list.id))
        XCTAssertNil(LibraryStore(fileURL: url).personalList(list.id))
        XCTAssertEqual(store.data.records, before.records)
        XCTAssertEqual(store.data.reviews, before.reviews)
    }

    @MainActor func testBackupRoundTripMergesListsByIDAndOldVersionsKeepThem() throws {
        let url = temporaryFile(), other = temporaryFile()
        defer {
            try? FileManager.default.removeItem(at: url.deletingLastPathComponent())
            try? FileManager.default.removeItem(at: other.deletingLastPathComponent())
        }
        let source = LibraryStore(fileURL: url)
        let list = try XCTUnwrap(source.createPersonalList(title: "第一份", site: source.monuments.first))
        let target = LibraryStore(fileURL: other)
        let local = try XCTUnwrap(target.createPersonalList(title: "本机保留"))
        try target.importBackup(source.backup().data)
        XCTAssertEqual(target.data.personalLists.count, 2)
        XCTAssertTrue(source.updatePersonalList(list.id, title: "导入更新", description: "新的说明"))
        try target.importBackup(source.backup().data)
        XCTAssertEqual(target.personalList(list.id)?.title, "导入更新")
        XCTAssertNotNil(target.personalList(local.id))
        for version in 1...4 {
            try target.importBackup(Data("{\"version\":\(version),\"customSites\":[],\"records\":{}}".utf8))
            XCTAssertEqual(target.data.personalLists.count, 2, "Old backups cannot clear lists")
        }
        let exported = try JSONDecoder().decode(LibraryData.self, from: target.backup().data)
        XCTAssertEqual(exported.version, 5)
        XCTAssertEqual(exported.personalLists, target.data.personalLists)
    }

    @MainActor func testValidationAndDiskFailurePreserveSavedLists() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let site = try XCTUnwrap(store.monuments.first)
        let list = try XCTUnwrap(store.createPersonalList(title: "保留", site: site))
        let original = try Data(contentsOf: url)
        XCTAssertFalse(store.updatePersonalList(list.id, title: " \n ", description: ""))
        XCTAssertFalse(store.updatePersonalList(list.id, title: String(repeating: "字", count: 121), description: ""))
        XCTAssertFalse(store.setPersonalListNote(String(repeating: "字", count: 2001), siteID: site.id, listID: list.id))
        XCTAssertNil(store.createPersonalList(title: "", description: ""))
        XCTAssertEqual(try Data(contentsOf: url), original)
        try FileManager.default.removeItem(at: url)
        try FileManager.default.createDirectory(at: url, withIntermediateDirectories: false)
        XCTAssertFalse(store.updatePersonalList(list.id, title: "写入失败", description: "草稿"))
        XCTAssertEqual(store.personalList(list.id), list)
        XCTAssertNotNil(store.error)
        try FileManager.default.removeItem(at: url)
        XCTAssertTrue(store.updatePersonalList(list.id, title: "重试成功", description: "草稿"))
        XCTAssertEqual(LibraryStore(fileURL: url).personalList(list.id)?.title, "重试成功")
    }

    @MainActor func testMalformedImportsAreAtomicAndUnknownMembersAreRetained() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let list = try XCTUnwrap(store.createPersonalList(title: "原名单"))
        let original = try Data(contentsOf: url)
        var imported = LibraryData()
        var incoming = PersonalList(title: "暂缺古迹", items: [PersonalListItem(siteID: "future_site", note: "保留解释")])
        imported.personalLists = [incoming]
        try store.importBackup(JSONEncoder().encode(imported))
        XCTAssertEqual(store.personalList(incoming.id)?.items.first?.note, "保留解释")
        XCTAssertNil(store.monument("future_site"))
        let good = try Data(contentsOf: url)
        incoming.items.append(incoming.items[0])
        imported.personalLists = [incoming]
        XCTAssertThrowsError(try store.importBackup(JSONEncoder().encode(imported)))
        imported.personalLists = [list, list]
        XCTAssertThrowsError(try store.importBackup(JSONEncoder().encode(imported)))
        incoming.items = []
        incoming.updatedAt = "invalid"
        imported.personalLists = [incoming]
        XCTAssertThrowsError(try store.importBackup(JSONEncoder().encode(imported)))
        XCTAssertEqual(try Data(contentsOf: url), good)
        XCTAssertNotEqual(good, original)
    }

    @MainActor func testReadFailureDoesNotOverwriteFileAndV4UpgradesOnlyOnWrite() throws {
        let url = temporaryFile()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        try FileManager.default.createDirectory(at: url.deletingLastPathComponent(), withIntermediateDirectories: true)
        let old = Data(#"{"version":4,"customSites":[],"records":{}}"#.utf8)
        try old.write(to: url)
        let store = LibraryStore(fileURL: url)
        XCTAssertEqual(store.data.version, 4)
        XCTAssertTrue(store.data.personalLists.isEmpty)
        XCTAssertEqual(try Data(contentsOf: url), old)
        XCTAssertNotNil(store.createPersonalList(title: "新名单"))
        XCTAssertEqual(LibraryStore(fileURL: url).data.version, 5)
        let broken = Data("broken".utf8)
        try broken.write(to: url)
        let failed = LibraryStore(fileURL: url)
        XCTAssertNil(failed.createPersonalList(title: "不能覆盖"))
        XCTAssertEqual(try Data(contentsOf: url), broken)
        try failed.importBackup(old)
        XCTAssertNotNil(failed.createPersonalList(title: "恢复成功"))
    }
}
