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
    let dynastyGlyph: String
    let dynastyStart: Int
    let dynastyEnd: Int
    let dynastyColor: String
    let timelineLane: String
    let tag: String
    let era: String
    let year: Int
    let yearLabel: String
    let yearApprox: Bool
    let yearNote: String
    let place: String
    let placeKey: String
    let placeName: String
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
    let sourceLinks: [SourceLink]
    let protection: [ProtectionEntry]

    var accent: Color { Palette.color(dynastyColor) }

    static func == (lhs: Monument, rhs: Monument) -> Bool { lhs.id == rhs.id }
    func hash(into hasher: inout Hasher) { hasher.combine(id) }
}

struct SourceLink: Decodable, Hashable {
    let title: String
    let url: String
}

struct ProtectionEntry: Decodable, Hashable {
    let batch: Int
    let unitName: String
    let relation: String
    let scope: String
    let locator: String
    let note: String
    let sourceTitle: String
    let sourceURL: String

    var batchLabel: String {
        let numerals = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"]
        let number = batch < 10 ? numerals[batch] : "\(numerals[batch / 10])十\(batch % 10 == 0 ? "" : numerals[batch % 10])"
        return "第\(number)批国保"
    }
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
    static let ink = color("#100f0d")
    static let ink2 = color("#171512")
    static let ink3 = color("#221f1a")
    static let paper = color("#ebe2cc")
    static let paper2 = color("#a89e88")
    static let paper3 = color("#6b6356")
    static let gold = color("#d6ab5c")
    static let goldDim = color("#8a6d3a")
    static let red = color("#c8442b")

    static func color(_ hex: String) -> Color {
        let value = Int(hex.dropFirst(), radix: 16) ?? 0
        return Color(red: Double((value >> 16) & 255) / 255,
                     green: Double((value >> 8) & 255) / 255,
                     blue: Double(value & 255) / 255)
    }
}

enum FangguFont {
    static func serif(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        .custom("NotoSerifSC-Regular", size: size).weight(weight)
    }
    static func brush(_ size: CGFloat) -> Font { .custom("MaShanZheng-Regular", size: size) }
    static func mono(_ size: CGFloat) -> Font { .system(size: size, design: .monospaced) }
}
