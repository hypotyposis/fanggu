import Foundation

@MainActor final class LibraryStore: ObservableObject {
    @Published private(set) var data = LibraryData()
    @Published private(set) var error: String?
    let monuments: [Monument]
    private let ids: Set<String>
    private let fileURL: URL
    private var loadFailed = false

    init(fileURL suppliedURL: URL? = nil) {
        let url = Bundle.main.url(forResource: "catalog", withExtension: "json")!
        monuments = (try? JSONDecoder().decode([Monument].self, from: Data(contentsOf: url))) ?? []
        ids = Set(monuments.map(\.id))
        let directory = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("Fanggu", isDirectory: true)
        fileURL = suppliedURL ?? directory.appendingPathComponent("library.json")
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

    @discardableResult func setRecord(_ record: VisitRecord, for site: Monument) -> Bool {
        guard ids.contains(site.id) else { return false }
        return commit { $0.records[site.id] = record }
    }

    @discardableResult func setReview(dimensions: DimensionScores, text: String, for site: Monument, clearLegacyRating: Bool = false) -> Bool {
        guard ids.contains(site.id) else { return false }
        let formatter = ISO8601DateFormatter()
        formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
        return commit {
            let legacyRating = clearLegacyRating ? nil : $0.reviews[site.id]?.rating
            $0.reviews[site.id] = Review(rating: legacyRating, dimensions: dimensions, text: text, updatedAt: formatter.string(from: .now))
        }
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
    }

    @discardableResult func linkLegacy(_ oldID: String, to site: Monument) -> Bool {
        guard let old = data.customSites.first(where: { $0.id == oldID }), data.links[oldID] == nil else { return false }
        return commit { next in
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
        let formatter = DateFormatter()
        formatter.calendar = Calendar(identifier: .gregorian)
        formatter.locale = Locale(identifier: "en_US_POSIX")
        formatter.timeZone = .current
        formatter.dateFormat = "yyyy-MM-dd"
        formatter.isLenient = false
        guard let date = formatter.date(from: value), formatter.string(from: date) == value else { return false }
        return date <= .now
    }
}

enum StoreError: LocalizedError {
    case invalid(String)
    var errorDescription: String? { if case .invalid(let message) = self { message } else { nil } }
}
