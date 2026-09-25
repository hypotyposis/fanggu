import Foundation
import SwiftUI
import UniformTypeIdentifiers

struct Monument: Decodable, Identifiable, Hashable {
    let id: String
    let name: String
    let short: String
    let sub: String
    let dynasty: String
    let dynastyName: String
    let tag: String
    let era: String
    let year: Int
    let yearLabel: String
    let yearApprox: Bool
    let place: String
    let placeKey: String
    let country: String
    let province: String
    let region: String
    let latitude: Double
    let longitude: Double
    let types: [String]
    let typeNames: [String]
    let lede: String
    let facts: [String]
    let quote: String
    let captions: [String]
    let lineImage: String
    let colorImage: String
    let initialStatus: VisitStatus
    let legacyNames: [String]
    let legacyPlaces: [String]
    let sourceURL: String

    static func == (lhs: Monument, rhs: Monument) -> Bool { lhs.id == rhs.id }
    func hash(into hasher: inout Hasher) { hasher.combine(id) }
}

enum VisitStatus: String, Codable, CaseIterable, Identifiable {
    case unvisited, wishlist, visited
    var id: String { rawValue }
    var title: String {
        switch self {
        case .unvisited: "未到访"
        case .wishlist: "心愿单"
        case .visited: "已到访"
        }
    }
}

struct VisitRecord: Codable {
    var status: VisitStatus = .unvisited
    var visitedOn: String = ""
    var note: String = ""

    enum CodingKeys: String, CodingKey { case status, visitedOn, note }
    init(status: VisitStatus = .unvisited, visitedOn: String = "", note: String = "") {
        self.status = status; self.visitedOn = visitedOn; self.note = note
    }
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        status = try values.decode(VisitStatus.self, forKey: .status)
        visitedOn = try values.decodeIfPresent(String.self, forKey: .visitedOn) ?? ""
        note = try values.decodeIfPresent(String.self, forKey: .note) ?? ""
    }
}

struct Review: Codable {
    var rating: Int? = nil
    var text: String = ""
    var updatedAt: String = ""
}

struct LegacySite: Codable, Identifiable {
    var id: String
    var name: String
    var place: String
    var dyn: String
    var description: String
    var custom: Bool

    enum CodingKeys: String, CodingKey { case id, name, place, dyn, description, custom }
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        id = try values.decode(String.self, forKey: .id)
        name = try values.decode(String.self, forKey: .name)
        place = try values.decode(String.self, forKey: .place)
        dyn = try values.decode(String.self, forKey: .dyn)
        description = try values.decodeIfPresent(String.self, forKey: .description) ?? ""
        custom = true
    }
}

struct LibraryData: Codable {
    var version = 3
    var customSites: [LegacySite] = []
    var records: [String: VisitRecord] = [:]
    var links: [String: String] = [:]
    var reviews: [String: Review] = [:]

    enum CodingKeys: String, CodingKey { case version, customSites, records, links, reviews }
    init() {}
    init(from decoder: Decoder) throws {
        let values = try decoder.container(keyedBy: CodingKeys.self)
        version = try values.decode(Int.self, forKey: .version)
        customSites = try values.decode([LegacySite].self, forKey: .customSites)
        records = try values.decode([String: VisitRecord].self, forKey: .records)
        links = version >= 2 ? (try values.decodeIfPresent([String: String].self, forKey: .links) ?? [:]) : [:]
        reviews = version == 3 ? (try values.decodeIfPresent([String: Review].self, forKey: .reviews) ?? [:]) : [:]
    }
}

struct BackupDocument: FileDocument {
    static var readableContentTypes: [UTType] { [.json] }
    var data: Data
    init(data: Data) { self.data = data }
    init(configuration: ReadConfiguration) throws {
        guard let data = configuration.file.regularFileContents else {
            throw CocoaError(.fileReadCorruptFile)
        }
        self.data = data
    }
    func fileWrapper(configuration: WriteConfiguration) throws -> FileWrapper {
        FileWrapper(regularFileWithContents: data)
    }
}

enum Palette {
    static let paper = Color(red: 0.95, green: 0.93, blue: 0.87)
    static let ink = Color(red: 0.13, green: 0.16, blue: 0.16)
    static let red = Color(red: 0.74, green: 0.23, blue: 0.17)
    static let gold = Color(red: 0.66, green: 0.48, blue: 0.25)
    static func dynasty(_ key: String) -> Color {
        switch key {
        case "han": .brown
        case "tang": gold
        case "song": .teal
        case "liao": red
        case "xixia": Color(red: 0.65, green: 0.51, blue: 0.34)
        case "ming": .indigo
        case "jp_asuka", "jp_nara", "jp_heian", "jp_kamakura", "jp_edo": .purple
        default: .gray
        }
    }
}
