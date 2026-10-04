import XCTest
@testable import Fanggu

private final class OfflineCommunityProtocol: URLProtocol {
    private static let lock = NSLock()
    private static var offline = false
    static func setOffline(_ value: Bool) { lock.lock(); offline = value; lock.unlock() }
    override class func canInit(with request: URLRequest) -> Bool { lock.lock(); defer { lock.unlock() }; return offline }
    override class func canonicalRequest(for request: URLRequest) -> URLRequest { request }
    override func startLoading() { client?.urlProtocol(self, didFailWithError: URLError(.notConnectedToInternet)) }
    override func stopLoading() {}
}

/// Real-service integration. Only the transport's offline failure is simulated.
/// With no local service, this suite reports an explicit skip; start community/server.py to run it.
final class CommunitySyncTests: XCTestCase {
    @MainActor func testOfflineQueueConflictsAccountIsolationAndDeletion() async throws {
        let url = URL(string: "http://localhost:8787")!
        var health = URLRequest(url: url.appendingPathComponent("health")); health.timeoutInterval = 2
        do { _ = try await URLSession.shared.data(for: health) }
        catch { throw XCTSkip("Start the local community service to run synchronization integration tests") }
        let root = FileManager.default.temporaryDirectory.appendingPathComponent(UUID().uuidString)
        let defaults = UserDefaults(suiteName: UUID().uuidString)!
        let configuration = URLSessionConfiguration.ephemeral
        configuration.protocolClasses = [OfflineCommunityProtocol.self]
        let transport = URLSession(configuration: configuration)
        defer { OfflineCommunityProtocol.setOffline(false); transport.invalidateAndCancel(); try? FileManager.default.removeItem(at: root) }
        let library = LibraryStore(fileURL: root.appendingPathComponent("library.json"))
        let store = CommunityStore(directory: root, defaults: defaults, serverURL: url, transport: transport)
        store.attach(library)
        let site = try XCTUnwrap(library.monuments.first(where: { $0.id == "foguang" }))
        XCTAssertTrue(library.setRecord(VisitRecord(status: .wishlist, note: "PRIVATE-NOTE-NEVER-UPLOAD"), for: site))
        XCTAssertTrue(library.setReviewText("local-before-account", for: site))
        let handleA = "sync" + UUID().uuidString.replacingOccurrences(of: "-", with: "").prefix(16)
        let password = "integration-password"
        let registered = await store.authenticate(handle: handleA, password: password, nickname: "Sync test A", registering: true)
        XCTAssertTrue(registered, store.error ?? "")
        let accountA = try XCTUnwrap(store.user?.id)
        let api = CommunityAPI(baseURL: url)
        struct Credentials: Encodable { let handle: String; let password: String }
        let secondDevice: CommunitySession = try await api.request("auth/login", method: "POST", body: CommunityAPI.encode(Credentials(handle: handleA, password: password)))
        var remote: CommunityOwnReviews = try await api.request("me/reviews", token: secondDevice.token)
        XCTAssertEqual(remote.items.first?.text, "local-before-account")
        XCTAssertFalse(String(data: try CommunityAPI.encode(remote.items), encoding: .utf8)!.contains("PRIVATE-NOTE"))

        await store.refresh()
        OfflineCommunityProtocol.setOffline(true)
        await store.refresh(scope: "following")
        XCTAssertEqual(store.feedScope, "following")
        XCTAssertTrue(store.feed.isEmpty, "A failed scope change must not show the previous feed as followed content")
        store.setOnline(false)
        XCTAssertFalse(store.online)
        OfflineCommunityProtocol.setOffline(true)
        XCTAssertTrue(library.setReviewText("offline-edit", for: site))
        await store.synchronize()
        XCTAssertEqual(library.review(for: site).text, "offline-edit")
        XCTAssertEqual(store.pendingCount, 1)
        XCTAssertNotNil(store.syncError)
        let journals = try FileManager.default.contentsOfDirectory(at: root, includingPropertiesForKeys: nil).filter { $0.lastPathComponent.hasPrefix("community-") }
        let persisted = try JSONDecoder().decode(CommunityDisk.self, from: Data(contentsOf: XCTUnwrap(journals.first)))
        XCTAssertEqual(persisted.accounts[accountA]?.pending[site.id]?.text, "offline-edit")
        XCTAssertFalse(String(data: try Data(contentsOf: XCTUnwrap(journals.first)), encoding: .utf8)!.contains(secondDevice.token))

        // A second real session changes the same review while this device is offline.
        let original = try XCTUnwrap(remote.items.first)
        let external: CommunityReview = try await api.request("me/reviews/\(site.id)", method: "PUT", token: secondDevice.token,
            body: CommunityAPI.encode(ReviewSyncPayload(dimensions: DimensionScores(), text: "second-device", baseRevision: original.revision, mutationID: UUID().uuidString)))
        OfflineCommunityProtocol.setOffline(false)
        await store.synchronize()
        XCTAssertEqual(store.conflicts.count, 1)
        XCTAssertEqual(library.review(for: site).text, "offline-edit")
        XCTAssertEqual(store.conflicts.first?.remote.text, external.text)
        await store.resolve(try XCTUnwrap(store.conflicts.first), useLocal: true)
        remote = try await api.request("me/reviews", token: secondDevice.token)
        XCTAssertEqual(remote.items.first?.text, "offline-edit")
        XCTAssertEqual(store.conflicts.count, 0)
        XCTAssertEqual(store.pendingCount, 0)
        XCTAssertFalse(store.online, "Synchronization must not change the selected mode")

        // Clearing sends a tombstone and remains cleared after another synchronization.
        XCTAssertTrue(library.setReview(dimensions: DimensionScores(), text: "", for: site, clearLegacyRating: true))
        await store.synchronize()
        remote = try await api.request("me/reviews", token: secondDevice.token)
        XCTAssertTrue(try XCTUnwrap(remote.items.first).deleted)
        await store.synchronize()
        XCTAssertFalse(library.review(for: site).hasPublicContent)

        XCTAssertTrue(library.setReviewText("owned-only-by-A", for: site))
        await store.synchronize()
        let currentToken = try XCTUnwrap(CommunityCredential.read(server: url.absoluteString + "|" + accountA))
        let _: CommunityOK = try await api.request("auth/logout", method: "POST", token: currentToken)
        await store.synchronize()
        XCTAssertTrue(store.requiresLogin)
        XCTAssertEqual(library.review(for: site).text, "owned-only-by-A")
        await store.logout()
        let handleB = "sync" + UUID().uuidString.replacingOccurrences(of: "-", with: "").prefix(16)
        let switched = await store.authenticate(handle: handleB, password: password, nickname: "Sync test B", registering: true)
        XCTAssertTrue(switched)
        XCTAssertTrue(library.data.reviews.isEmpty, "A's reviews must not become B's public reviews")
        XCTAssertEqual(library.record(for: site).note, "PRIVATE-NOTE-NEVER-UPLOAD")
        XCTAssertEqual(library.record(for: site).status, .wishlist)
        try await store.deleteAccount(password: password)
        XCTAssertFalse(store.isAuthenticated)
        let _: CommunityOK = try await api.request("me", method: "DELETE", token: secondDevice.token, body: CommunityAPI.encode(["password": password]))
    }
}
