import XCTest

extension XCUIApplication {
    /// The app reads this environment variable in DEBUG builds; see `TestScope` in the app target.
    static let libraryScopeKey = "FANGGU_LIBRARY_SCOPE"

    /// Each test owns a fresh record and appearance scope, so sessions sharing one simulator never
    /// read each other's data and every run starts from the catalogue defaults. Relaunching the same
    /// instance keeps the scope, which is what the persistence tests rely on.
    static func isolated() -> XCUIApplication {
        let app = XCUIApplication()
        app.isolate()
        return app
    }

    /// Gives this instance its own scope unless one was already assigned. `launchForTest` calls it,
    /// so no UI test can reach the simulator's real library even if it skipped `isolated()`.
    func isolate() {
        guard launchEnvironment[Self.libraryScopeKey] == nil else { return }
        launchEnvironment[Self.libraryScopeKey] = "uitest-\(UUID().uuidString)"
    }
}
