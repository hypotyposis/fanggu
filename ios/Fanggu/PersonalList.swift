import Foundation

/// A person's interpretation of a group of monuments, independent of visits and reviews.
struct PersonalList: Codable, Identifiable, Equatable {
    var id = "list-" + UUID().uuidString.lowercased()
    var title: String
    var description: String = ""
    var items: [PersonalListItem] = []
    var updatedAt: String = LibraryStore.timestamp()

    var validationError: String? {
        if title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || title.utf16.count > 120 {
            return String(localized: "名单标题须为 1–120 字")
        }
        if description.utf16.count > 4000 { return String(localized: "名单说明不能超过 4000 字") }
        return nil
    }
}

struct PersonalListItem: Codable, Identifiable, Equatable {
    let siteID: String
    var note: String = ""
    var id: String { siteID }
}

/// Navigation carries only identity, so edits and imports always render current stored content.
struct PersonalListRoute: Hashable {
    let id: String
}

struct PersonalListsRoute: Hashable {}
