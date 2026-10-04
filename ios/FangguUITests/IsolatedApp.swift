import XCTest

extension XCUIApplication {
    /// Each test owns a fresh record and appearance scope, so sessions sharing one simulator never
    /// read each other's data and every run starts from the catalogue defaults. Relaunching the same
    /// instance keeps the scope, which is what the persistence tests rely on.
    static func isolated() -> XCUIApplication {
        let app = XCUIApplication()
        app.launchEnvironment["FANGGU_LIBRARY_SCOPE"] = "uitest-\(UUID().uuidString)"
        return app
    }
}
