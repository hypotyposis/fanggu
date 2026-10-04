import Foundation

@MainActor final class LibraryStore: ObservableObject {
    @Published private(set) var data = LibraryData()
    @Published private(set) var error: String?
    @Published private(set) var undoAction: LibraryUndo?
    let monuments: [Monument]
    let timeline: TimelineCatalog
    let curations: [Curation]
    private let monumentsByID: [String: Monument]
    private let curationsBySite: [String: [Curation]]
    private let ids: Set<String>
    private let fileURL: URL
    private var loadFailed = false

    init(fileURL suppliedURL: URL? = nil, scope: String? = TestScope.current) {
        let url = Bundle.main.url(forResource: "catalog", withExtension: "json")!
        monuments = (try? JSONDecoder().decode([Monument].self, from: Data(contentsOf: url))) ?? []
        timeline = TimelineCatalog(monuments: monuments)
        let catalogIDs = Set(monuments.map(\.id))
        ids = catalogIDs
        monumentsByID = Dictionary(monuments.map { ($0.id, $0) }, uniquingKeysWith: { first, _ in first })
        // Lists ship with the catalogue; members that are missing from this build are dropped rather than shown empty.
        let lists = Bundle.main.url(forResource: "curations", withExtension: "json")
            .flatMap { try? JSONDecoder().decode([Curation].self, from: Data(contentsOf: $0)) } ?? []
        let available = lists.filter { list in list.items.contains { catalogIDs.contains($0) } }
        var bySite: [String: [Curation]] = [:]
        for list in available { for id in list.items where catalogIDs.contains(id) { bySite[id, default: []].append(list) } }
        curations = available
        curationsBySite = bySite
        fileURL = suppliedURL ?? TestScope.libraryFileURL(for: scope)
        do {
            if FileManager.default.fileExists(atPath: fileURL.path) {
                let loaded = try JSONDecoder().decode(LibraryData.self, from: Data(contentsOf: fileURL))
                try validate(loaded)
                data = loaded
            }
        } catch {
            loadFailed = true
            self.error = "已有记录无法读取，原文件已保留。请导入有效备份恢复。"
        }
    }

    func record(for site: Monument) -> VisitRecord {
        data.records[site.id] ?? VisitRecord(status: site.initialStatus)
    }

    func review(for site: Monument) -> Review { data.reviews[site.id] ?? Review() }

    func curations(for site: Monument) -> [Curation] { curationsBySite[site.id] ?? [] }

    /// Members in editorial order; IDs absent from this catalogue build are skipped.
    func members(of list: Curation) -> [Monument] { list.items.compactMap { monumentsByID[$0] } }

    func progress(of list: Curation) -> CurationProgress {
        let members = members(of: list)
        return CurationProgress(visited: members.filter { record(for: $0).status == .visited }.count, total: members.count)
    }

    /// Derived collection progress per dynasty, province or type; totals are catalogue counts, visited reads personal records.
    func collectionGroups(by facet: CollectionFacet) -> [CollectionGroup] {
        var totals: [String: CollectionGroup] = [:]
        var order: [String: Int] = [:]
        for site in monuments {
            let visited = record(for: site).status == .visited
            let keys: [(String, String, String?, Int)]
            switch facet {
            case .dynasty: keys = [(site.dynasty, site.dynastyName, site.dynastyColor, site.dynastyStart)]
            case .province:
                let country = CatalogSearch.countryNames[site.country] ?? site.country
                keys = [(site.province, site.country == "CN" ? site.province : "\(country) · \(site.province)", nil, 0)]
            case .type: keys = zip(site.types, site.typeNames).map { ($0, $1, nil, 0) }
            }
            for (key, name, color, start) in keys {
                let current = totals[key] ?? CollectionGroup(id: key, name: name, colorHex: color, total: 0, visited: 0)
                totals[key] = CollectionGroup(id: key, name: name, colorHex: color, total: current.total + 1, visited: current.visited + (visited ? 1 : 0))
                order[key] = min(order[key] ?? start, start)
            }
        }
        // Larger groups first so the main collections lead; ties fall back to chronology for dynasties and name otherwise.
        return totals.values.sorted { lhs, rhs in
            if lhs.total != rhs.total { return lhs.total > rhs.total }
            if facet == .dynasty, order[lhs.id] != order[rhs.id] { return (order[lhs.id] ?? 0) < (order[rhs.id] ?? 0) }
            return lhs.name.localizedStandardCompare(rhs.name) == .orderedAscending
        }
    }

    @discardableResult func setRecord(_ record: VisitRecord, for site: Monument) -> Bool {
        guard ids.contains(site.id), !loadFailed else { return false }
        guard record != self.record(for: site) else { return true }
        let previous = data.records[site.id]
        guard commit({ $0.records[site.id] = record }) else { return false }
        undoAction = LibraryUndo(message: "\(site.short.isEmpty ? site.name : site.short) · \(record.status.title)",
                                 change: .record(site.id, previous))
        return true
    }

    /// A status correction preserves the date and note; only an explicit today action supplies a date.
    @discardableResult func setStatus(_ status: VisitStatus, for site: Monument) -> Bool {
        var next = record(for: site)
        next.status = status
        return setRecord(next, for: site)
    }

    @discardableResult func recordToday(for site: Monument) -> Bool {
        var next = record(for: site)
        guard next.status != .visited else { return setRecord(next, for: site) }
        next.status = .visited
        next.visitedOn = Self.today()
        return setRecord(next, for: site)
    }

    @discardableResult func setReview(dimensions: DimensionScores, text: String, for site: Monument, clearLegacyRating: Bool = false) -> Bool {
        guard ids.contains(site.id) else { return false }
        let previous = review(for: site)
        let saved = commit {
            let legacyRating = clearLegacyRating ? nil : $0.reviews[site.id]?.rating
            $0.reviews[site.id] = Review(rating: legacyRating, dimensions: dimensions, text: text, updatedAt: Self.timestamp())
        }
        if saved, let action = undoAction {
            switch action.change {
            case .review(let id, _) where id == site.id: undoAction = nil
            case .dimensions(let id, _) where id == site.id && previous.dimensions != dimensions: undoAction = nil
            default: break
            }
        }
        return saved
    }

    @discardableResult func resetReviewDimensions(for site: Monument) -> Bool {
        let previous = review(for: site).dimensions
        guard !previous.isEmpty else { return true }
        guard setReviewDimensions(DimensionScores(), for: site) else { return false }
        undoAction = LibraryUndo(message: "\(site.short.isEmpty ? site.name : site.short) · 已重置六项评分", change: .dimensions(site.id, previous))
        return true
    }

    @discardableResult func clearReview(for site: Monument) -> Bool {
        let previous = review(for: site)
        guard previous.rating != nil || !previous.dimensions.isEmpty || !previous.text.isEmpty else { return true }
        guard setReview(dimensions: DimensionScores(), text: "", for: site, clearLegacyRating: true) else { return false }
        undoAction = LibraryUndo(message: "\(site.short.isEmpty ? site.name : site.short) · 已清除评价", change: .review(site.id, previous))
        return true
    }

    @discardableResult func undoLastChange() -> Bool {
        guard let action = undoAction else { return false }
        let saved = commit { next in
            switch action.change {
            case .record(let id, let previous): next.records[id] = previous
            case .dimensions(let id, let previous):
                var review = next.reviews[id] ?? Review()
                review.dimensions = previous
                review.updatedAt = Self.timestamp()
                next.reviews[id] = review
            case .review(let id, var previous):
                previous.updatedAt = Self.timestamp()
                next.reviews[id] = previous
            }
        }
        if saved { undoAction = nil }
        return saved
    }

    func dismissUndo(_ id: UUID) {
        if undoAction?.id == id { undoAction = nil }
    }

    @discardableResult func setReviewDimensions(_ dimensions: DimensionScores, for site: Monument) -> Bool {
        guard ids.contains(site.id) else { return false }
        let current = review(for: site)
        guard current.dimensions != dimensions else { return true }
        return setReview(dimensions: dimensions, text: current.text, for: site)
    }

    @discardableResult func setReviewText(_ text: String, for site: Monument) -> Bool {
        guard ids.contains(site.id) else { return false }
        let current = review(for: site)
        guard current.text != text else { return true }
        return setReview(dimensions: current.dimensions, text: text, for: site)
    }

    func backup() throws -> BackupDocument {
        if loadFailed { return BackupDocument(data: try Data(contentsOf: fileURL)) }
        let encoded = try JSONEncoder().encode(data)
        var object = try JSONSerialization.jsonObject(with: encoded) as! [String: Any]
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        object["exportedAt"] = formatter.string(from: .now)
        return BackupDocument(data: try JSONSerialization.data(withJSONObject: object, options: [.prettyPrinted, .sortedKeys]))
    }

    func importBackup(_ content: Data) throws {
        guard content.count <= 2_000_000 else { throw StoreError.invalid("备份不能超过 2 MB") }
        let imported = try JSONDecoder().decode(LibraryData.self, from: content)
        try validate(imported)
        var merged = loadFailed ? LibraryData() : data
        for site in imported.customSites {
            if let index = merged.customSites.firstIndex(where: { $0.id == site.id }) { merged.customSites[index] = site }
            else { merged.customSites.append(site) }
        }
        merged.records.merge(imported.records) { _, new in new }
        merged.links.merge(imported.links) { _, new in new }
        if imported.version >= 3 {
            merged.reviews.merge(imported.reviews) { old, new in
                var result = new
                // A web v3 backup cannot express or clear a six-dimensional profile.
                if imported.version == 3 { result.dimensions = old.dimensions }
                return result
            }
        }
        merged.version = 4
        try validate(merged)
        try save(merged)
        loadFailed = false
        error = nil
        data = merged
        undoAction = nil
    }

    @discardableResult func linkLegacy(_ oldID: String, to site: Monument) -> Bool {
        guard let old = data.customSites.first(where: { $0.id == oldID }), data.links[oldID] == nil else { return false }
        let saved = commit { next in
            let existing = next.records[site.id] ?? VisitRecord(status: site.initialStatus)
            let previous = next.records[oldID] ?? VisitRecord(status: .wishlist)
            let status: VisitStatus = existing.status == .visited || previous.status == .visited ? .visited :
                (existing.status == .wishlist || previous.status == .wishlist ? .wishlist : .unvisited)
            let note = [existing.note, previous.note, old.description].filter { !$0.isEmpty }
                .reduce(into: [String]()) { result, value in if !result.contains(value) { result.append(value) } }
                .joined(separator: "\n\n")
            next.records[site.id] = VisitRecord(status: status, visitedOn: existing.visitedOn.isEmpty ? previous.visitedOn : existing.visitedOn, note: note)
            next.links[oldID] = site.id
        }
        if saved { undoAction = nil }
        return saved
    }

    private func commit(_ change: (inout LibraryData) -> Void) -> Bool {
        guard !loadFailed else { return false }
        var next = data
        change(&next)
        next.version = 4
        do { try validate(next); try save(next); data = next; error = nil; return true }
        catch { self.error = "保存失败：\(error.localizedDescription)"; return false }
    }

    private func save(_ next: LibraryData) throws {
        let directory = fileURL.deletingLastPathComponent()
        try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        let encoder = JSONEncoder()
        encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
        try encoder.encode(next).write(to: fileURL, options: .atomic)
    }

    private func validate(_ value: LibraryData) throws {
        guard [1, 2, 3, 4].contains(value.version), value.customSites.count <= 2000,
              value.records.count <= 5000, value.reviews.count <= 5000 else { throw StoreError.invalid("备份格式不正确") }
        let customIDs = Set(value.customSites.map(\.id))
        guard customIDs.count == value.customSites.count, customIDs.isDisjoint(with: ids),
              value.customSites.allSatisfy({ $0.id.range(of: "^personal-[a-z0-9-]{6,80}$", options: .regularExpression) != nil && !$0.name.isEmpty && !$0.place.isEmpty }) else {
            throw StoreError.invalid("旧登记资料不完整")
        }
        for (id, record) in value.records {
            guard ids.contains(id) || customIDs.contains(id), record.note.utf16.count <= 12000,
                  record.visitedOn.isEmpty || Self.validDate(record.visitedOn) else { throw StoreError.invalid("到访记录无效") }
        }
        for (id, target) in value.links {
            guard customIDs.contains(id), ids.contains(target), value.records[target] != nil else { throw StoreError.invalid("旧记录关联无效") }
        }
        for (id, review) in value.reviews {
            guard ids.contains(id), review.rating.map({ (1...5).contains($0) }) ?? true, review.dimensions.isValid,
                  review.text.utf16.count <= 500,
                  Self.validTimestamp(review.updatedAt) else {
                throw StoreError.invalid("评价无效")
            }
        }
    }

    private static func validTimestamp(_ value: String) -> Bool {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter.date(from: value) != nil && formatter.string(from: formatter.date(from: value)!) == value
    }

    static func validDate(_ value: String) -> Bool {
        let formatter = dateFormatter()
        formatter.isLenient = false
        guard let date = formatter.date(from: value), formatter.string(from: date) == value else { return false }
        return date <= .now
    }

    static func today() -> String { dateFormatter().string(from: .now) }

    static func dateFormatter() -> DateFormatter {
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = .current
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter
    }

    private static func timestamp() -> String {
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return formatter.string(from: .now)
    }
}

enum CollectionFacet: String, CaseIterable, Identifiable {
    case dynasty, province, type
    var id: String { rawValue }
    var title: String {
        switch self {
        case .dynasty: "时代"
        case .province: "省份"
        case .type: "类型"
        }
    }
}

struct CollectionGroup: Identifiable, Equatable {
    let id: String
    let name: String
    let colorHex: String?
    let total: Int
    let visited: Int
    var progress: CurationProgress { CurationProgress(visited: visited, total: total) }
}

struct LibraryUndo: Identifiable {
    let id = UUID()
    let message: String
    let change: Change

    enum Change {
        case record(String, VisitRecord?)
        case dimensions(String, DimensionScores)
        case review(String, Review)
    }
}

enum StoreError: LocalizedError {
    case invalid(String)
    var errorDescription: String? { if case .invalid(let message) = self { message } else { nil } }
}
