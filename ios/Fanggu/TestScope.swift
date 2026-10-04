import Foundation

/// Parallel test sessions set FANGGU_LIBRARY_SCOPE so that runs sharing one simulator never read
/// or overwrite each other's personal records or appearance. Release builds ignore the variable.
enum TestScope {
    static let environmentKey = "FANGGU_LIBRARY_SCOPE"
    static let current = name(in: ProcessInfo.processInfo.environment)

    static func name(in environment: [String: String]) -> String? {
        #if DEBUG
        guard let raw = environment[environmentKey] else { return nil }
        let allowed = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "-_"))
        var cleaned = ""
        for scalar in raw.unicodeScalars { cleaned.unicodeScalars.append(allowed.contains(scalar) ? scalar : "-") }
        let name = String(cleaned.prefix(64))
        return name.contains(where: { $0.isLetter || $0.isNumber }) ? name : nil
        #else
        return nil
        #endif
    }

    /// Scoped records live beside the real library, so the default file is never touched by tests.
    static func libraryFileURL(for scope: String?) -> URL {
        let base = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("Fanggu", isDirectory: true)
        guard let scope else { return base.appendingPathComponent("library.json") }
        return base.appendingPathComponent("scopes", isDirectory: true)
            .appendingPathComponent(scope, isDirectory: true)
            .appendingPathComponent("library.json")
    }

    static func defaults(for scope: String?) -> UserDefaults {
        scope.flatMap { UserDefaults(suiteName: "com.fanggu.app.scope.\($0)") } ?? .standard
    }
}
