import Foundation
import SwiftUI
import UIKit
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
    let siteLatitude: Double?
    let siteLongitude: Double?
    let siteCoordinateSource: String
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

    var accent: Color { Palette.dynasty(dynastyColor) }
    var displayYearLabel: String { yearLabel.trimmingCharacters(in: .whitespacesAndNewlines) }
    var periodLabel: String {
        displayYearLabel.isEmpty ? dynastyName : "\(dynastyName) · \(displayYearLabel)"
    }
    /// The monument's own point for proximity; nil when only the town-level map marker is recorded.
    var nearbyTarget: NearbyTarget? {
        guard let siteLatitude, let siteLongitude else { return nil }
        return NearbyTarget(id: id, name: name, latitude: siteLatitude, longitude: siteLongitude)
    }

    static func == (lhs: Monument, rhs: Monument) -> Bool { lhs.id == rhs.id }
    func hash(into hasher: inout Hasher) { hasher.combine(id) }
}

/// An editorial list (名录／线路／专题). Membership is catalogue metadata; progress is derived from personal records at runtime.
struct Curation: Decodable, Identifiable, Hashable {
    let id: String
    let kind: String
    let kindName: String
    let name: String
    let eyebrow: String
    let lede: String
    let note: String
    let items: [String]

    static func == (lhs: Curation, rhs: Curation) -> Bool { lhs.id == rhs.id }
    func hash(into hasher: inout Hasher) { hasher.combine(id) }
}

struct CurationProgress: Equatable {
    let visited: Int
    let total: Int
    var fraction: Double { total == 0 ? 0 : Double(visited) / Double(total) }
    var isComplete: Bool { total > 0 && visited == total }
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
        case .unvisited: "未标记"
        case .wishlist: "心愿单"
        case .visited: "已到访"
        }
    }
}

struct VisitRecord: Codable, Equatable {
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
    var version = 4
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
        reviews = version >= 3 ? (try values.decodeIfPresent([String: Review].self, forKey: .reviews) ?? [:]) : [:]
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
    // Keep the existing token names: ink is a surface, paper is foreground text.
    static let ink = adaptive(light: "#f6f1e7", dark: "#100f0d")
    static let ink2 = adaptive(light: "#fffcf5", dark: "#171512")
    static let ink3 = adaptive(light: "#eae2d3", dark: "#221f1a")
    static let paper = adaptive(light: "#302b23", dark: "#ebe2cc")
    static let paper2 = adaptive(light: "#675e50", dark: "#a89e88")
    static let paper3 = adaptive(light: "#766b5b", dark: "#928a79")
    static let gold = adaptive(light: "#866126", dark: "#d6ab5c")
    static let goldDim = adaptive(light: "#aa8b55", dark: "#8a6d3a")
    static let red = color("#c8442b")
    static let redText = adaptive(light: "#a53825", dark: "#df7059")
    static let sealPaper = color("#fff4de")
    static let shadow = adaptive(light: "#d8cbb6", dark: "#000000")

    static func adaptive(light: String, dark: String) -> Color {
        let lightColor = uiColor(light)
        let darkColor = uiColor(dark)
        return Color(uiColor: UIColor { traits in
            traits.userInterfaceStyle == .dark ? darkColor : lightColor
        })
    }

    static func dynasty(_ hex: String) -> Color {
        let original = uiColor(hex)
        var red: CGFloat = 0, green: CGFloat = 0, blue: CGFloat = 0, alpha: CGFloat = 0
        original.getRed(&red, green: &green, blue: &blue, alpha: &alpha)
        // Retain each era's hue while giving small labels contrast on warm paper.
        let lightColor = UIColor(red: red * 0.55, green: green * 0.55, blue: blue * 0.55, alpha: alpha)
        return Color(uiColor: UIColor { traits in
            traits.userInterfaceStyle == .dark ? original : lightColor
        })
    }

    static func color(_ hex: String) -> Color {
        Color(uiColor: uiColor(hex))
    }

    /// The light-scheme dynasty tint as a fixed colour, for artwork rendered on paper-coloured share cards.
    static func dynastyOnPaper(_ hex: String) -> Color {
        var red: CGFloat = 0, green: CGFloat = 0, blue: CGFloat = 0, alpha: CGFloat = 0
        uiColor(hex).getRed(&red, green: &green, blue: &blue, alpha: &alpha)
        return Color(uiColor: UIColor(red: red * 0.55, green: green * 0.55, blue: blue * 0.55, alpha: alpha))
    }

    private static func uiColor(_ hex: String) -> UIColor {
        let value = Int(hex.dropFirst(), radix: 16) ?? 0
        return UIColor(red: CGFloat((value >> 16) & 255) / 255,
                       green: CGFloat((value >> 8) & 255) / 255,
                       blue: CGFloat(value & 255) / 255, alpha: 1)
    }
}

enum FangguFont {
    static func serif(_ size: CGFloat, weight: Font.Weight = .regular) -> Font {
        .custom("NotoSerifSC-Regular", size: size).weight(weight)
    }
    static func brush(_ size: CGFloat) -> Font { .custom("MaShanZheng-Regular", size: size) }
    static func mono(_ size: CGFloat) -> Font { .system(size: max(11, size), design: .monospaced) }
}
