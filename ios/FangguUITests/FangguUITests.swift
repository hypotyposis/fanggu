import XCTest

final class FangguUITests: XCTestCase {
    func testCatalogOpensNativeDetail() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.staticTexts["访古"].waitForExistence(timeout: 10))
        app.staticTexts["李业阙"].firstMatch.tap()
        XCTAssertTrue(app.staticTexts["我的访古记"].waitForExistence(timeout: 10))
        XCTAssertTrue(app.staticTexts["我的评价"].exists)
    }
}
