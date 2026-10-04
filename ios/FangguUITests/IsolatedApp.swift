import XCTest

extension XCUIApplication {
    /// The app reads this environment variable in DEBUG builds; see `TestScope` in the app target.
    static let libraryScopeKey = "FANGGU_LIBRARY_SCOPE"

    /// Each test owns a fresh record and appearance scope, so sessions sharing one simulator never
    /// read each other's data and every run starts from the catalogue defaults. Relaunching the same
    /// instance keeps the scope, which is what the persistence tests rely on.
    /// Interaction tests find controls by their Chinese labels, so the app language is pinned here
    /// instead of inherited from the simulator; the localization tests pass another language.
    static func isolated(language: String = "zh-Hans", locale: String = "zh_CN") -> XCUIApplication {
        let app = XCUIApplication()
        app.isolate(language: language, locale: locale)
        return app
    }

    /// Gives this instance its own scope and a fixed language unless they were already assigned.
    /// `launchForTest` calls it, so no UI test can reach the simulator's real library or inherit the
    /// simulator's language even if it skipped `isolated()`.
    func isolate(language: String = "zh-Hans", locale: String = "zh_CN") {
        if launchEnvironment[Self.libraryScopeKey] == nil {
            launchEnvironment[Self.libraryScopeKey] = "uitest-\(UUID().uuidString)"
        }
        if !launchArguments.contains("-AppleLanguages") {
            launchArguments += ["-AppleLanguages", "(\(language))", "-AppleLocale", locale]
        }
    }

    /// The language pin written by `isolate`, so helpers that rebuild `launchArguments` keep it.
    var languageArguments: [String] {
        guard let index = launchArguments.firstIndex(of: "-AppleLanguages") else { return [] }
        return Array(launchArguments[index..<min(index + 4, launchArguments.count)])
    }
}
