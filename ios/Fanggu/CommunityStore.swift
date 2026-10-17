import Combine
import CryptoKit
import Foundation

@MainActor final class CommunityStore: ObservableObject {
    @Published private(set) var online: Bool
    @Published private(set) var user: CommunityUser?
    @Published private(set) var discovery: CommunityDiscovery?
    @Published private(set) var feed: [CommunityReview] = []
    @Published private(set) var people: [CommunityUser] = []
    @Published private(set) var loading = false
    @Published private(set) var syncing = false
    @Published private(set) var pendingCount = 0
    @Published private(set) var conflicts: [ReviewSyncConflict] = []
    @Published private(set) var lastSyncedAt: Date?
    @Published private(set) var cachedAt: Date?
    @Published private(set) var nextCursor: String?
    @Published private(set) var feedScope = "latest"
    @Published private(set) var server: String
    @Published var error: String?
    @Published var syncError: String?
    @Published var showingAccount = false
    @Published private(set) var requiresLogin = false
    @Published var revision = 0

    private var api: CommunityAPI { CommunityAPI(baseURL: URL(string: server)!, session: transport) }
    private let transport: URLSession
    private var token: String?
    private var disk = CommunityDisk()
    private var library: LibraryStore?
    private var subscription: AnyCancellable?
    private var applyingLibraryChange = false
    private var syncTask: Task<Void, Never>?
    private var periodicTask: Task<Void, Never>?
    private var refreshGeneration = 0
    private var accountGeneration = 0
    private var storageFailed = false
    private let defaults: UserDefaults
    private let directory: URL
    private var diskURL: URL {
        let hash = SHA256.hash(data: Data(server.utf8)).map { String(format: "%02x", $0) }.joined()
        return directory.appendingPathComponent("community-\(hash.prefix(16)).json")
    }

    init(directory: URL? = nil, defaults: UserDefaults = .standard, serverURL: URL? = nil, transport: URLSession = .shared) {
        self.transport = transport
        self.defaults = defaults
        self.directory = directory ?? FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0].appendingPathComponent("Fanggu")
        server = serverURL?.absoluteString ?? ProcessInfo.processInfo.environment["FANGGU_COMMUNITY_URL"] ?? defaults.string(forKey: "fanggu.community.server") ?? "http://127.0.0.1:8787"
        online = defaults.bool(forKey: "fanggu.community.online")
        loadDisk()
        token = disk.user.flatMap { CommunityCredential.read(server: credentialKey($0.id)) }
        if token == nil { user = nil; online = false }
    }

    deinit { syncTask?.cancel(); periodicTask?.cancel() }

    var isAuthenticated: Bool { user != nil && token != nil && !requiresLogin }
    var syncLabel: String {
        if !conflicts.isEmpty { return String(localized: "\(conflicts.count) 份评价需要合并") }
        if syncing { return String(localized: "正在同步评价") }
        if syncError != nil { return String(localized: "已保存到本机 · 同步待重试") }
        if pendingCount > 0 { return String(localized: "\(pendingCount) 份评价待同步") }
        return isAuthenticated ? String(localized: "评分与短评已公开同步") : String(localized: "评分与短评仅保存在本机")
    }
    var ownerKey: String? { user.map { $0.id } }
    private func credentialKey(_ id: String) -> String { server + "|" + id }
    private var journal: CommunityJournal {
        get { disk.accounts[disk.owner ?? "__local__"] ?? CommunityJournal() }
        set { disk.accounts[disk.owner ?? "__local__"] = newValue }
    }

    private func loadDisk() {
        do {
            if FileManager.default.fileExists(atPath: diskURL.path) {
                disk = try JSONDecoder().decode(CommunityDisk.self, from: Data(contentsOf: diskURL))
            }
            user = disk.user; discovery = disk.discovery; feed = disk.cachedReviews; cachedAt = disk.cachedAt
            updateSyncState()
        } catch {
            storageFailed = true
            syncError = "同步记录无法读取，原文件已保留；本机访古记录仍可使用。"
        }
    }

    @discardableResult private func persist() -> Bool {
        guard !storageFailed else { return false }
        do {
            try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
            try JSONEncoder().encode(disk).write(to: diskURL, options: [.atomic, .completeFileProtectionUntilFirstUserAuthentication])
            updateSyncState()
            return true
        } catch {
            syncError = "同步记录保存失败，本机评价仍保留，请重试。"
            return false
        }
    }

    private func updateSyncState() {
        pendingCount = journal.pending.count
        conflicts = journal.conflicts.values.sorted { $0.siteID < $1.siteID }
    }

    func attach(_ library: LibraryStore) {
        guard self.library == nil else { return }
        self.library = library
        if let activation = disk.activation {
            // If the app exited before the library write, finish it. If it exited after
            // the write, preserve any newer local edits instead of replaying an old snapshot.
            if library.data.reviews == activation.previous {
                guard library.replaceCommunityReviews(activation.target) else {
                    storageFailed = true; syncError = library.error; return
                }
            }
            disk.activation = nil
            guard persist() else { storageFailed = true; return }
        }
        subscription = library.$data.dropFirst().sink { [weak self] data in
            guard let self, !self.applyingLibraryChange else { return }
            self.observeReviews(data.reviews)
        }
        if disk.owner != nil { observeReviews(library.data.reviews) }
        periodicTask = Task { [weak self] in
            while !Task.isCancelled {
                if self == nil { return }
                await self?.synchronize()
                do { try await Task.sleep(for: .seconds(20)) } catch { return }
            }
        }
    }

    private func observeReviews(_ reviews: [String: Review]) {
        guard disk.owner != nil, !storageFailed else { return }
        var next = journal
        next.reviews = reviews
        for (id, local) in reviews {
            let acknowledged = next.acknowledged[id] ?? Review()
            if !local.hasSamePublicContent(as: acknowledged) || next.pending[id] != nil {
                if next.pending[id].map({ $0.dimensions == local.dimensions && $0.text == local.text }) != true {
                    next.pending[id] = ReviewSyncPayload(dimensions: local.dimensions, text: local.text,
                        baseRevision: next.revisions[id] ?? 0, mutationID: UUID().uuidString)
                }
            } else if next.pending[id] == nil {
                next.conflicts.removeValue(forKey: id)
            }
        }
        journal = next
        if persist() { scheduleSync() }
    }

    private func scheduleSync() {
        guard isAuthenticated, syncTask == nil else { return }
        syncTask = Task { [weak self] in
            do { try await Task.sleep(for: .milliseconds(1000)) } catch { return }
            guard let self else { return }
            await self.synchronize()
            self.syncTask = nil
        }
    }

    func setOnline(_ value: Bool) {
        if value && !isAuthenticated { showingAccount = true; return }
        online = value
        defaults.set(value, forKey: "fanggu.community.online")
        if value { Task { await refresh() } }
    }

    func authenticate(handle: String, password: String, nickname: String, registering: Bool) async -> Bool {
        guard !storageFailed else { error = syncError; return false }
        error = nil
        struct Credentials: Encodable { let handle: String; let password: String; let nickname: String; let acceptPublicReviews = true }
        do {
            let session: CommunitySession = try await api.request("auth/\(registering ? "register" : "login")", method: "POST",
                body: CommunityAPI.encode(Credentials(handle: handle, password: password, nickname: nickname)))
            let own: CommunityOwnReviews = try await api.request("me/reviews", token: session.token)
            guard let library else { throw CommunityFailure(status: 0, message: "本机资料尚未就绪，请重试。") }
            let previous = disk
            if let owner = disk.owner { disk.accounts[owner, default: CommunityJournal()].reviews = library.data.reviews }
            let firstAccount = disk.owner == nil && disk.accounts.keys.allSatisfy { $0 == "__local__" }
            var next = disk.accounts[session.user.id] ?? CommunityJournal()
            if firstAccount { next.reviews = library.data.reviews }
            for remote in own.items where library.monuments.contains(where: { $0.id == remote.siteID }) {
                if let local = next.reviews[remote.siteID], !local.hasSamePublicContent(as: remote.local),
                   next.pending[remote.siteID] != nil || firstAccount {
                    next.conflicts[remote.siteID] = ReviewSyncConflict(siteID: remote.siteID, remote: remote)
                } else if next.pending[remote.siteID] == nil {
                    var value = remote.local
                    value.rating = next.reviews[remote.siteID]?.rating
                    next.reviews[remote.siteID] = value
                    next.acknowledged[remote.siteID] = value
                    next.revisions[remote.siteID] = remote.revision
                }
            }
            disk.owner = session.user.id
            disk.accounts[session.user.id] = next
            disk.user = session.user
            if previous.owner != session.user.id {
                disk.cachedReviews = []; disk.discovery = nil; disk.cachedAt = nil
                feed = []; discovery = nil; cachedAt = nil; nextCursor = nil; feedScope = "latest"
            }
            disk.activation = CommunityActivation(previous: library.data.reviews, target: next.reviews)
            try CommunityCredential.save(session.token, server: credentialKey(session.user.id))
            guard persist() else { disk = previous; return false }
            applyingLibraryChange = true
            let saved = library.replaceCommunityReviews(next.reviews)
            applyingLibraryChange = false
            guard saved else { disk = previous; _ = persist(); throw CommunityFailure(status: 0, message: library.error ?? "本机资料保存失败。") }
            disk.activation = nil
            guard persist() else { storageFailed = true; return false }
            accountGeneration += 1
            token = session.token; user = session.user
            requiresLogin = false
            observeReviews(next.reviews)
            setOnline(true)
            showingAccount = false
            await synchronize()
            return true
        } catch {
            self.error = error.localizedDescription
            return false
        }
    }

    func synchronize() async {
        guard isAuthenticated, !syncing, !storageFailed, let token, let library, disk.owner == user?.id else { return }
        syncing = true
        defer { syncing = false }
        let generation = accountGeneration
        var publicChanged = false
        do {
            // First deliver durable requests. A replay uses the same mutation ID after an uncertain response.
            for id in journal.pending.keys.sorted() {
                guard generation == accountGeneration else { return }
                guard journal.conflicts[id] == nil, let payload = journal.pending[id] else { continue }
                do {
                    let remote: CommunityReview = try await api.request("me/reviews/\(id)", method: "PUT", token: token, body: CommunityAPI.encode(payload))
                    guard generation == accountGeneration else { return }
                    var next = journal
                    next.revisions[id] = remote.revision
                    next.acknowledged[id] = remote.local
                    if next.pending[id]?.mutationID == payload.mutationID { next.pending.removeValue(forKey: id) }
                    else if var newer = next.pending[id] {
                        newer.baseRevision = remote.revision; newer.mutationID = UUID().uuidString; next.pending[id] = newer
                    }
                    journal = next
                    guard persist() else { return }
                    publicChanged = true
                } catch let failure as CommunityFailure where failure.status == 409 {
                    if let remote = failure.current {
                        var next = journal
                        next.conflicts[id] = ReviewSyncConflict(siteID: id, remote: remote)
                        journal = next
                        guard persist() else { return }
                    } else { throw failure }
                }
            }
            let own: CommunityOwnReviews = try await api.request("me/reviews", token: token)
            guard generation == accountGeneration else { return }
            var reviews = library.data.reviews
            var next = journal
            var changed = false
            for remote in own.items {
                let id = remote.siteID
                guard library.monuments.contains(where: { $0.id == id }) else { continue }
                if next.pending[id] != nil {
                    if remote.revision > (next.revisions[id] ?? 0), next.conflicts[id] == nil {
                        next.conflicts[id] = ReviewSyncConflict(siteID: id, remote: remote)
                    }
                    continue
                }
                if remote.revision > (next.revisions[id] ?? 0) {
                    var value = remote.local; value.rating = reviews[id]?.rating
                    reviews[id] = value
                    next.revisions[id] = remote.revision
                    next.acknowledged[id] = value
                    changed = true
                }
            }
            if changed {
                applyingLibraryChange = true
                let saved = library.replaceCommunityReviews(reviews)
                applyingLibraryChange = false
                guard saved else { throw CommunityFailure(status: 0, message: library.error ?? "远端评价尚未保存到本机。") }
            }
            next.reviews = reviews; journal = next
            guard persist() else { return }
            syncError = nil; lastSyncedAt = .now
            if publicChanged || changed { revision += 1 }
        } catch {
            guard generation == accountGeneration else { return }
            syncError = error.localizedDescription
            if let failure = error as? CommunityFailure, failure.status == 401 {
                requiresLogin = true
                self.error = "登录已过期，请在账号页重新登录。"
            }
        }
    }

    func resolve(_ conflict: ReviewSyncConflict, useLocal: Bool) async {
        guard let library else { return }
        var next = journal
        let id = conflict.siteID
        next.revisions[id] = conflict.remote.revision
        next.acknowledged[id] = conflict.remote.local
        if useLocal {
            let local = library.data.reviews[id] ?? Review()
            next.pending[id] = ReviewSyncPayload(dimensions: local.dimensions, text: local.text,
                baseRevision: conflict.remote.revision, mutationID: UUID().uuidString)
        } else {
            var reviews = library.data.reviews
            var remote = conflict.remote.local; remote.rating = reviews[id]?.rating
            reviews[id] = remote
            applyingLibraryChange = true
            let saved = library.replaceCommunityReviews(reviews)
            applyingLibraryChange = false
            guard saved else { return }
            next.reviews = reviews; next.pending.removeValue(forKey: id)
        }
        next.conflicts.removeValue(forKey: id); journal = next
        if persist() { await synchronize(); await refresh() }
    }

    func refresh(scope: String? = nil) async {
        guard online else { return }
        let targetScope = scope ?? feedScope
        if targetScope != feedScope {
            feed = []; nextCursor = nil; feedScope = targetScope
        }
        refreshGeneration += 1
        let generation = refreshGeneration
        let account = accountGeneration
        loading = true; error = nil
        defer { if generation == refreshGeneration { loading = false } }
        do {
            async let fetched: CommunityPage = api.request("reviews", token: token, query: [URLQueryItem(name: "scope", value: targetScope)])
            async let overview: CommunityDiscovery = api.request("discover", token: token)
            let (page, discovery) = try await (fetched, overview)
            guard generation == refreshGeneration, account == accountGeneration, online else { return }
            feed = page.items; nextCursor = page.nextCursor; feedScope = targetScope
            self.discovery = discovery; cachedAt = .now
            disk.discovery = discovery; disk.cachedAt = cachedAt
            if targetScope == "latest" { disk.cachedReviews = page.items }
            _ = persist()
        } catch is CancellationError { }
        catch { if generation == refreshGeneration { self.error = error.localizedDescription } }
    }

    func loadMore() async {
        guard let cursor = nextCursor, !loading else { return }
        let account = accountGeneration, scope = feedScope
        loading = true
        defer { loading = false }
        do {
            let page: CommunityPage = try await api.request("reviews", token: token,
                query: [URLQueryItem(name: "scope", value: scope), URLQueryItem(name: "before", value: cursor)])
            guard account == accountGeneration, scope == feedScope else { return }
            let known = Set(feed.map(\.id)); feed += page.items.filter { !known.contains($0.id) }; nextCursor = page.nextCursor
        } catch { self.error = error.localizedDescription }
    }

    func searchPeople(_ query: String) async throws -> [CommunityUser] {
        let result: CommunityUsers = try await api.request("users", token: token, query: [URLQueryItem(name: "q", value: query)])
        people = result.items
        return result.items
    }
    func profile(_ id: String) async throws -> CommunityUser { try await api.request("users/\(id)", token: token) }
    func reviews(site: String? = nil, author: String? = nil, scope: String = "latest", before: String? = nil) async throws -> CommunityPage {
        try await api.request("reviews", token: token, query: [URLQueryItem(name: "site", value: site), URLQueryItem(name: "user", value: author), URLQueryItem(name: "scope", value: scope), URLQueryItem(name: "before", value: before)].filter { $0.value != nil })
    }
    func summary(_ siteID: String) async throws -> CommunitySummary { try await api.request("sites/\(siteID)/community", token: token) }
    func connections(_ id: String, kind: String) async throws -> [CommunityUser] {
        let result: CommunityUsers = try await api.request("users/\(id)/\(kind)", token: token); return result.items
    }
    func follow(_ person: CommunityUser) async throws -> CommunityUser {
        let changed: CommunityUser = try await api.request("users/\(person.id)/follow", method: person.isFollowing ? "DELETE" : "PUT", token: token)
        for index in feed.indices where feed[index].author.id == person.id { feed[index].author = changed }
        revision += 1
        return changed
    }
    func block(_ person: CommunityUser, enabled: Bool) async throws {
        let _: CommunityUser = try await api.request("users/\(person.id)/block", method: enabled ? "PUT" : "DELETE", token: token)
        feed.removeAll { $0.author.id == person.id }; revision += 1
        disk.cachedReviews.removeAll { $0.author.id == person.id }
        _ = persist()
        await refresh()
    }
    func blockedUsers() async throws -> [CommunityUser] {
        let result: CommunityUsers = try await api.request("me/blocks", token: token); return result.items
    }
    func report(_ review: CommunityReview, reason: String) async throws {
        struct Report: Encodable { let reviewID: String; let reason: String }
        let _: CommunityOK = try await api.request("reports", method: "POST", token: token, body: CommunityAPI.encode(Report(reviewID: review.id, reason: reason)))
    }
    func saveProfile(nickname: String, bio: String, avatar: Int) async throws {
        struct Profile: Encodable { let nickname: String; let bio: String; let avatar: Int }
        let changed: CommunityUser = try await api.request("me", method: "PATCH", token: token, body: CommunityAPI.encode(Profile(nickname: nickname, bio: bio, avatar: avatar)))
        user = changed; disk.user = changed; _ = persist(); revision += 1
    }
    func refreshMe() async {
        guard isAuthenticated else { return }
        do {
            let current: CommunityUser = try await api.request("me", token: token)
            user = current; disk.user = current; _ = persist()
        } catch { self.error = error.localizedDescription }
    }
    func logout() async {
        let credential = token
        clearSession()
        if let credential { let _: CommunityOK? = try? await api.request("auth/logout", method: "POST", token: credential) }
    }
    func deleteAccount(password: String) async throws {
        struct Password: Encodable { let password: String }
        let _: CommunityOK = try await api.request("me", method: "DELETE", token: token, body: CommunityAPI.encode(Password(password: password)))
        if let owner = disk.owner { disk.accounts.removeValue(forKey: owner) }
        disk.owner = nil
        clearSession()
    }
    private func clearSession() {
        accountGeneration += 1; refreshGeneration += 1
        syncTask?.cancel(); syncTask = nil
        if let user { try? CommunityCredential.save(nil, server: credentialKey(user.id)) }
        token = nil; user = nil; disk.user = nil; requiresLogin = false
        feed = []; people = []; discovery = nil; disk.cachedReviews = []; disk.discovery = nil
        cachedAt = nil; disk.cachedAt = nil; feedScope = "latest"; nextCursor = nil
        error = nil; syncError = nil
        setOnline(false); _ = persist()
    }
    func configureServer(_ value: String) throws {
        let input = value.trimmingCharacters(in: .whitespacesAndNewlines).trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        guard let url = URL(string: input), let host = url.host, !host.isEmpty, url.user == nil, url.password == nil,
              url.query == nil, url.fragment == nil, ["https", "http"].contains(url.scheme ?? "") else {
            throw CommunityFailure(status: 0, message: "请输入完整的社区服务地址。")
        }
        #if !DEBUG
        guard url.scheme == "https" else { throw CommunityFailure(status: 0, message: "正式服务必须使用 HTTPS。") }
        #endif
        guard !isAuthenticated else { throw CommunityFailure(status: 0, message: "请先退出当前账号，再切换社区服务。") }
        guard input != server else { return }
        let previousDisk = disk
        let previousServer = server
        if let library {
            var next = journal; next.reviews = library.data.reviews; journal = next
            guard persist() else { throw CommunityFailure(status: 0, message: "请先保存当前账号的评价，再切换服务。") }
        }
        server = input
        disk = CommunityDisk(); storageFailed = false; loadDisk()
        if (previousDisk.owner != nil || disk.owner != nil), let library {
            disk.activation = CommunityActivation(previous: library.data.reviews, target: journal.reviews)
            guard persist() else {
                server = previousServer; disk = previousDisk
                throw CommunityFailure(status: 0, message: "新服务的本机记录无法保存，仍保留原服务。")
            }
            defaults.set(input, forKey: "fanggu.community.server")
            applyingLibraryChange = true
            let saved = library.replaceCommunityReviews(journal.reviews)
            applyingLibraryChange = false
            if !saved {
                server = previousServer; disk = previousDisk
                defaults.set(previousServer, forKey: "fanggu.community.server")
                throw CommunityFailure(status: 0, message: library.error ?? "无法切换本机评价。")
            }
            disk.activation = nil
            _ = persist()
        }
        defaults.set(input, forKey: "fanggu.community.server")
        accountGeneration += 1
        token = disk.user.flatMap { CommunityCredential.read(server: credentialKey($0.id)) }
        if token == nil { user = nil }
    }
}
