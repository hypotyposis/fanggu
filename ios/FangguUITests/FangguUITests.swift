import XCTest

final class FangguUITests: XCTestCase {
    func testWebSectionsStayAvailable() {
        let app = XCUIApplication()
        app.launch()
        app.tabBars.buttons["地图"].tap()
        XCTAssertTrue(app.staticTexts["到访地图"].waitForExistence(timeout: 10))
        capture(app, "map")
        app.tabBars.buttons["年表"].tap()
        XCTAssertTrue(app.staticTexts["东汉至今 · 中日对照"].waitForExistence(timeout: 10))
        capture(app, "timeline")
        app.tabBars.buttons["我的"].tap()
        XCTAssertTrue(app.staticTexts["亲见 · 所愿 · 私人记录"].waitForExistence(timeout: 10))
        capture(app, "library")
    }

    func testCatalogOpensNativeDetail() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.tabBars.buttons["图鉴"].waitForExistence(timeout: 10))
        let firstSite = app.staticTexts["李业阙"].firstMatch
        for _ in 0..<4 where !firstSite.isHittable { app.swipeUp() }
        XCTAssertTrue(firstSite.isHittable)
        firstSite.tap()
        XCTAssertTrue(app.staticTexts["我的访古记"].waitForExistence(timeout: 10))
        XCTAssertTrue(app.staticTexts["我的评价"].exists)
        XCTAssertTrue(app.staticTexts["文物保护"].exists)
        capture(app, "detail")
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
