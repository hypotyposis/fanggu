import XCTest
import CryptoKit
@testable import Fanggu

final class CommunityTests: XCTestCase {
    func testCompositeUsesFivePointScaleAndRequiresAllSixDimensions() {
        var dimensions = DimensionScores()
        dimensions[.art] = 5
        XCTAssertNil(Review(dimensions: dimensions).completeScore)
        for (dimension, value) in zip(ReviewDimension.allCases, [5, 4, 5, 4, 3, 4]) { dimensions[dimension] = value }
        XCTAssertEqual(Review(dimensions: dimensions).completeScore!, 25.0 / 6.0, accuracy: 0.00001)
        XCTAssertEqual(String(format: "%.1f", Review(dimensions: dimensions).completeScore!), "4.2")
        XCTAssertEqual(communityScoreText(4.25), "4.3")
        XCTAssertEqual(communityScoreText(5), "5.0")
        dimensions[.art] = nil
        XCTAssertNil(Review(dimensions: dimensions).completeScore)
    }

    func testLegacyStarIsNotPublishedOrUsedForComposite() {
        let review = Review(rating: 5)
        XCTAssertFalse(review.hasPublicContent)
        XCTAssertNil(review.completeScore)
        XCTAssertTrue(review.hasSamePublicContent(as: Review()))
    }

    func testSyncJournalRetainsRetryIdentityAndDeletedReview() throws {
        var journal = CommunityJournal()
        journal.pending["foguang"] = ReviewSyncPayload(dimensions: DimensionScores(), text: "", baseRevision: 8, mutationID: "same-retry-id")
        let data = try JSONEncoder().encode(journal)
        let restored = try JSONDecoder().decode(CommunityJournal.self, from: data)
        XCTAssertEqual(restored.pending["foguang"], journal.pending["foguang"])
        XCTAssertEqual(restored.pending["foguang"]?.baseRevision, 8)
        XCTAssertEqual(restored.pending["foguang"]?.text, "")
    }

    @MainActor func testInterruptedAccountSwitchRecoversBothCrashWindows() throws {
        for libraryAlreadySwitched in [false, true] {
            let root = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
            defer { try? FileManager.default.removeItem(at: root) }
            let library = LibraryStore(fileURL: root.appendingPathComponent("library.json"))
            let site = try XCTUnwrap(library.monuments.first)
            XCTAssertTrue(library.setRecord(VisitRecord(status: .wishlist, note: "private"), for: site))
            let stamp = "2026-10-03T12:00:00.000Z"
            let previous = [site.id: Review(text: "account-A", updatedAt: stamp)]
            let target = [site.id: Review(text: "account-B", updatedAt: stamp)]
            let newer = [site.id: Review(text: "account-B-newer-local-edit", updatedAt: stamp)]
            XCTAssertTrue(library.replaceCommunityReviews(libraryAlreadySwitched ? newer : previous))
            var disk = CommunityDisk()
            disk.owner = "account-B"
            var sourceJournal = CommunityJournal(); sourceJournal.reviews = previous
            var targetJournal = CommunityJournal(); targetJournal.reviews = target
            disk.accounts = ["account-A": sourceJournal, "account-B": targetJournal]
            disk.activation = CommunityActivation(previous: previous, target: target)
            let server = "https://activation.invalid"
            let hash = SHA256.hash(data: Data(server.utf8)).map { String(format: "%02x", $0) }.joined()
            let file = root.appendingPathComponent("community-\(hash.prefix(16)).json")
            try JSONEncoder().encode(disk).write(to: file, options: .atomic)
            let store = CommunityStore(directory: root, defaults: UserDefaults(suiteName: UUID().uuidString)!, serverURL: URL(string: server))
            store.attach(library)
            XCTAssertEqual(library.review(for: site).text, libraryAlreadySwitched ? "account-B-newer-local-edit" : "account-B")
            XCTAssertEqual(library.record(for: site).note, "private")
            let recovered = try JSONDecoder().decode(CommunityDisk.self, from: Data(contentsOf: file))
            XCTAssertNil(recovered.activation)
            XCTAssertEqual(recovered.accounts["account-A"]?.reviews[site.id]?.text, "account-A")
        }
    }

    func testServerDefaultsToProductionAndHonoursOverridesInOrder() {
        let production = CommunityStore.productionServer
        XCTAssertEqual(production, "https://fanggu-api.hypotyposis.xyz")
        XCTAssertEqual(CommunityStore.initialServer(explicit: nil, environment: [:], saved: nil), production)
        // Debug builds may keep a local or LAN service chosen in the connection settings.
        let lan = "http://192.168.1.20:8787"
        XCTAssertEqual(CommunityStore.initialServer(explicit: nil, environment: [:], saved: lan, allowsHTTP: true), lan)
        let env = ["FANGGU_COMMUNITY_URL": "http://127.0.0.1:8787"]
        XCTAssertEqual(CommunityStore.initialServer(explicit: nil, environment: env, saved: lan, allowsHTTP: true), "http://127.0.0.1:8787")
        XCTAssertEqual(CommunityStore.initialServer(explicit: URL(string: "https://test.invalid"), environment: env, saved: lan), "https://test.invalid")
        // Unusable values fall through instead of leaving the app without a service.
        XCTAssertEqual(CommunityStore.initialServer(explicit: nil, environment: ["FANGGU_COMMUNITY_URL": "not a url"], saved: "ftp://x.invalid"), production)
    }

    func testReleaseBuildNeverConnectsOverPlainHTTP() {
        // A TestFlight install keeps the defaults of an earlier debug build of the same app.
        let saved = "http://127.0.0.1:8787"
        XCTAssertEqual(CommunityStore.initialServer(explicit: nil, environment: [:], saved: saved, allowsHTTP: false), CommunityStore.productionServer)
        XCTAssertEqual(CommunityStore.initialServer(explicit: nil, environment: ["FANGGU_COMMUNITY_URL": saved], saved: "https://staging.invalid", allowsHTTP: false),
                       "https://staging.invalid")
    }

    @MainActor func testConnectionSettingsSaveALocalServerAndCanReturnToProduction() throws {
        let root = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: root) }
        let defaults = UserDefaults(suiteName: UUID().uuidString)!
        let store = CommunityStore(directory: root, defaults: defaults, serverURL: URL(string: CommunityStore.productionServer))
        try store.configureServer("http://127.0.0.1:8787/")
        XCTAssertEqual(store.server, "http://127.0.0.1:8787")
        let saved = defaults.string(forKey: "fanggu.community.server")
        XCTAssertEqual(CommunityStore.initialServer(explicit: nil, environment: [:], saved: saved, allowsHTTP: true), "http://127.0.0.1:8787")
        // The "restore default service" button configures the production address.
        try store.configureServer(CommunityStore.productionServer)
        XCTAssertEqual(store.server, CommunityStore.productionServer)
        XCTAssertEqual(defaults.string(forKey: "fanggu.community.server"), CommunityStore.productionServer)
    }

    @MainActor func testChangingServiceKeepsAnonymousAndAccountReviewsSeparate() throws {
        let root = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        defer { try? FileManager.default.removeItem(at: root) }
        let library = LibraryStore(fileURL: root.appendingPathComponent("library.json"))
        let site = try XCTUnwrap(library.monuments.first)
        XCTAssertTrue(library.setReviewText("anonymous-on-first-service", for: site))
        let first = "https://first.invalid", second = "https://second.invalid"
        let store = CommunityStore(directory: root, defaults: UserDefaults(suiteName: UUID().uuidString)!, serverURL: URL(string: first))
        store.attach(library)
        var disk = CommunityDisk(); disk.owner = "second-account"
        var journal = CommunityJournal()
        journal.reviews = [site.id: Review(text: "second-account-only", updatedAt: "2026-10-03T12:00:00.000Z")]
        disk.accounts["second-account"] = journal
        let hash = SHA256.hash(data: Data(second.utf8)).map { String(format: "%02x", $0) }.joined()
        try JSONEncoder().encode(disk).write(to: root.appendingPathComponent("community-\(hash.prefix(16)).json"), options: .atomic)
        try store.configureServer(second)
        XCTAssertEqual(library.review(for: site).text, "second-account-only")
        try store.configureServer(first)
        XCTAssertEqual(library.review(for: site).text, "anonymous-on-first-service")
    }

    @MainActor func testRemoteReviewReplacementPreservesPersonalRecords() throws {
        let file = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString).appendingPathComponent("library.json")
        defer { try? FileManager.default.removeItem(at: file.deletingLastPathComponent()) }
        let library = LibraryStore(fileURL: file)
        let site = try XCTUnwrap(library.monuments.first)
        XCTAssertTrue(library.setRecord(VisitRecord(status: .wishlist, note: "只属于我的私人笔记"), for: site))
        let stamp = "2026-10-03T12:00:00.000Z"
        XCTAssertTrue(library.replaceCommunityReviews([site.id: Review(text: "远端短评", updatedAt: stamp)]))
        XCTAssertEqual(library.record(for: site).note, "只属于我的私人笔记")
        XCTAssertEqual(library.record(for: site).status, .wishlist)
        XCTAssertEqual(library.review(for: site).text, "远端短评")
        XCTAssertFalse(library.replaceCommunityReviews([site.id: Review(text: String(repeating: "字", count: 501), updatedAt: stamp)]))
        XCTAssertEqual(library.review(for: site).text, "远端短评")
        let restored = LibraryStore(fileURL: file)
        XCTAssertEqual(restored.record(for: site).note, "只属于我的私人笔记")
        XCTAssertEqual(restored.review(for: site).text, "远端短评")
    }
}
