import XCTest
@testable import Fanggu

final class TestScopeTests: XCTestCase {
    func testScopeNameIsAbsentByDefaultAndSanitisedWhenSet() {
        XCTAssertNil(TestScope.name(in: [:]))
        XCTAssertEqual(TestScope.name(in: [TestScope.environmentKey: "uitest-ABC_1"]), "uitest-ABC_1")
        XCTAssertEqual(TestScope.name(in: [TestScope.environmentKey: "../other scope/"]), "---other-scope-")
        XCTAssertNil(TestScope.name(in: [TestScope.environmentKey: "./"]), "A scope without letters or digits must fall back to the real library")
        XCTAssertEqual(TestScope.name(in: [TestScope.environmentKey: String(repeating: "a", count: 100)])?.count, 64)
    }

    func testScopedLibraryAndDefaultsStayApartFromTheRealOnes() {
        let real = TestScope.libraryFileURL(for: nil)
        XCTAssertEqual(Array(real.pathComponents.suffix(2)), ["Fanggu", "library.json"])
        let scoped = TestScope.libraryFileURL(for: "unit-scope")
        XCTAssertEqual(Array(scoped.pathComponents.suffix(4)), ["Fanggu", "scopes", "unit-scope", "library.json"])
        XCTAssertIdentical(TestScope.defaults(for: nil), UserDefaults.standard)
        XCTAssertNotIdentical(TestScope.defaults(for: "unit-scope"), UserDefaults.standard)
    }

    @MainActor func testScopedStoreSavesIntoItsOwnFileOnly() throws {
        let scope = "unit-\(UUID().uuidString)"
        let url = TestScope.libraryFileURL(for: scope)
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let realBefore = try? Data(contentsOf: TestScope.libraryFileURL(for: nil))
        let store = LibraryStore(scope: scope)
        let site = try XCTUnwrap(store.monuments.first { $0.initialStatus == .unvisited })
        XCTAssertTrue(store.setStatus(.wishlist, for: site))
        XCTAssertTrue(FileManager.default.fileExists(atPath: url.path))
        XCTAssertEqual(LibraryStore(scope: scope).record(for: site).status, .wishlist, "The same scope must see its own saved record")
        XCTAssertEqual(LibraryStore(scope: "unit-\(UUID().uuidString)").record(for: site).status, .unvisited, "Another scope starts from the catalogue defaults")
        XCTAssertEqual(try? Data(contentsOf: TestScope.libraryFileURL(for: nil)), realBefore, "The real library must stay untouched")
    }
}
