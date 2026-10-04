import XCTest

extension XCUIApplication {
    /// Interaction tests find controls by their Chinese labels, so they pin the app language
    /// rather than depend on the simulator's language.
    static func fanggu(language: String = "zh-Hans", locale: String = "zh_CN") -> XCUIApplication {
        let app = XCUIApplication()
        app.launchArguments += ["-AppleLanguages", "(\(language))", "-AppleLocale", locale]
        return app
    }
}
