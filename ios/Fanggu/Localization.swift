import Foundation

/// The app follows the language iOS resolves for it (Settings → 访古 → Language).
/// Changing it relaunches the app, so the choice is read once per process.
/// Only display text changes: monument IDs, filter keys and personal records stay language-independent.
enum AppLanguage: String, CaseIterable, Identifiable {
    case simplifiedChinese = "zh-Hans"
    case english = "en"
    case japanese = "ja"

    static let current = resolve(Bundle.main.preferredLocalizations)

    var id: String { rawValue }

    /// Each language ships a complete catalog exported by `ios/scripts/build-catalog.cjs`.
    var catalogResource: String {
        self == .simplifiedChinese ? "catalog" : "catalog-\(rawValue)"
    }

    /// Endonyms stay untranslated so every reader can find their own language.
    var displayName: String {
        switch self {
        case .simplifiedChinese: "简体中文"
        case .english: "English"
        case .japanese: "日本語"
        }
    }

    /// Separates names inside a sentence: "、" in Chinese and Japanese, a comma in English.
    var listSeparator: String { self == .english ? ", " : "、" }

    static func resolve(_ localizations: [String]) -> AppLanguage {
        for identifier in localizations {
            let code = identifier.lowercased()
            if code.hasPrefix("zh") { return .simplifiedChinese }
            if code.hasPrefix("ja") { return .japanese }
            if code.hasPrefix("en") { return .english }
        }
        return .simplifiedChinese
    }
}
