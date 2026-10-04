import XCTest

extension XCUIApplication {
    /// Each test owns a fresh record and appearance scope, so sessions sharing one simulator never
    /// read each other's data and every run starts from the catalogue defaults. Relaunching the same
    /// instance keeps the scope, which is what the persistence tests rely on.
    /// Interaction tests find controls by their Chinese labels, so the app language is pinned here
    /// instead of inherited from the simulator; the localization tests pass another language.
    static func isolated(language: String = "zh-Hans", locale: String = "zh_CN") -> XCUIApplication {
        let app = XCUIApplication()
        app.launchEnvironment["FANGGU_LIBRARY_SCOPE"] = "uitest-\(UUID().uuidString)"
        app.launchArguments += ["-AppleLanguages", "(\(language))", "-AppleLocale", locale]
        return app
    }
}
