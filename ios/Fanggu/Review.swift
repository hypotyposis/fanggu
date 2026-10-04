import Foundation

enum ReviewDimension: String, CaseIterable, Identifiable, Codable {
    case eraRarity, authenticity, construction, art, scale, setting

    var id: String { rawValue }
    var index: Int { Self.allCases.firstIndex(of: self)! }
    var title: String {
        switch self {
        case .eraRarity: return "年代稀缺"
        case .authenticity: return "原真完整"
        case .construction: return "结构营造"
        case .art: return "艺术遗存"
        case .scale: return "规制体量"
        case .setting: return "环境格局"
        }
    }
    var hint: String {
        switch self {
        case .eraRarity: return "在同类古迹中，年代与存世数量有多难得"
        case .authenticity: return "原始构件、整体形制与历史痕迹保留了多少"
        case .construction: return "结构、工艺与营造做法有多出色"
        case .art: return "塑像、壁画、彩画与装饰有多打动你"
        case .scale: return "建筑的等级、规模与气势有多突出"
        case .setting: return "选址、群体布局与山水关系有多精彩"
        }
    }

    static func grade(_ value: Int?) -> String {
        guard let value, (1...5).contains(value) else { return "—" }
        return ["E", "D", "C", "B", "A"][value - 1]
    }
    static func description(_ value: Int?) -> String {
        guard let value, (1...5).contains(value) else { return "未评分" }
        return ["较弱", "平常", "有看点", "突出", "卓越"][value - 1]
    }
}

/// Missing keys mean unrated, never a zero or an inferred middle grade.
struct DimensionScores: Codable, Equatable {
    private var values: [String: Int] = [:]

    init() {}
    subscript(_ dimension: ReviewDimension) -> Int? {
        get { values[dimension.rawValue] }
        set { values[dimension.rawValue] = newValue }
    }
    var isEmpty: Bool { values.isEmpty }
    var count: Int { values.count }

    /// Equal weight for each rated axis. Missing dimensions never count as zero.
    /// Derived on read so edits, resets and imports cannot leave a stale total.
    var aggregateScore: Double? {
        guard !isEmpty, isValid else { return nil }
        return Double(values.values.reduce(0, +)) / Double(count)
    }
    var aggregateScoreLabel: String? {
        aggregateScore.map { String(format: "%.2f", locale: Locale(identifier: "en_US_POSIX"), $0) }
    }
    var isValid: Bool {
        values.allSatisfy { ReviewDimension(rawValue: $0.key) != nil && (1...5).contains($0.value) }
    }
    init(from decoder: Decoder) throws {
        values = try decoder.singleValueContainer().decode([String: Int].self)
        guard isValid else {
            throw DecodingError.dataCorrupted(.init(codingPath: decoder.codingPath, debugDescription: "六维评分无效"))
        }
    }
    func encode(to encoder: Encoder) throws {
        var container = encoder.singleValueContainer()
        try container.encode(values)
    }
}

struct Review: Codable, Equatable {
    // Preserve an imported five-star score without converting it to six dimensions.
    var rating: Int? = nil
    var dimensions = DimensionScores()
    var text: String = ""
    var updatedAt: String = ""

    enum CodingKeys: String, CodingKey { case rating, dimensions, text, updatedAt }
    init(rating: Int? = nil, dimensions: DimensionScores = DimensionScores(), text: String = "", updatedAt: String = "") {
        self.rating = rating
        self.dimensions = dimensions
        self.text = text
        self.updatedAt = updatedAt
    }
    init(from decoder: Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        rating = try container.decodeIfPresent(Int.self, forKey: .rating)
        dimensions = try container.decodeIfPresent(DimensionScores.self, forKey: .dimensions) ?? DimensionScores()
        text = try container.decode(String.self, forKey: .text)
        updatedAt = try container.decode(String.self, forKey: .updatedAt)
    }
}

enum RadarInteraction {
    static func clamped(_ value: Double) -> Double { min(5, max(1, value)) }

    // Small hysteresis prevents a finger resting on a boundary from buzzing.
    static func grade(for value: Double, previous: Int) -> Int {
        let value = clamped(value)
        if value > Double(previous) + 0.58 || value < Double(previous) - 0.58 {
            return Int(value.rounded())
        }
        return previous
    }
    static func value(start: Double, dx: Double, dy: Double, axis: ReviewDimension, radius: Double) -> Double {
        let angle = Double(axis.index) * .pi / 3 - .pi / 2
        // Project translation onto the chosen axis; sideways movement cannot edit a neighbour.
        return clamped(start + (dx * cos(angle) + dy * sin(angle)) / max(1, radius) * 5)
    }

    static func nearestAxis(dx: Double, dy: Double, values: [Double], radius: Double) -> ReviewDimension {
        ReviewDimension.allCases.min { first, second in
            func distance(_ axis: ReviewDimension) -> Double {
                let angle = Double(axis.index) * .pi / 3 - .pi / 2
                let length = radius * values[axis.index] / 5
                return pow(dx - cos(angle) * length, 2) + pow(dy - sin(angle) * length, 2)
            }
            return distance(first) < distance(second)
        }!
    }
}
