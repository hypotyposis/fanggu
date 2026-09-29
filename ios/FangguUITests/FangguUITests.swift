import XCTest

final class FangguUITests: XCTestCase {
    func testWebSectionsStayAvailable() {
        let app = XCUIApplication()
        app.launch()
        app.buttons["地图"].tap()
        XCTAssertTrue(app.staticTexts["到访地图"].waitForExistence(timeout: 10))
        capture(app, "map")
        app.buttons["年表"].tap()
        XCTAssertTrue(app.staticTexts["东汉至今 · 中日对照"].waitForExistence(timeout: 10))
        capture(app, "timeline")
        app.buttons["我的"].tap()
        XCTAssertTrue(app.staticTexts["亲见 · 所愿 · 私人记录"].waitForExistence(timeout: 10))
        capture(app, "library")
    }

    func testCatalogOpensNativeDetail() {
        let app = XCUIApplication()
        app.launch()
        XCTAssertTrue(app.buttons["图鉴"].waitForExistence(timeout: 10))
        let firstSite = app.staticTexts["李业阙"].firstMatch
        for _ in 0..<4 where !firstSite.isHittable { app.swipeUp() }
        XCTAssertTrue(firstSite.isHittable)
        firstSite.tap()
        XCTAssertTrue(app.staticTexts["我的访古记"].waitForExistence(timeout: 10))
        XCTAssertTrue(app.staticTexts["我的评价"].exists)
        XCTAssertTrue(app.staticTexts["文物保护"].exists)
        capture(app, "detail")
    }

    func testArrivalOnlySavesAfterReleasingAtTheEnd() {
        let app = XCUIApplication()
        app.launch()
        let firstSite = app.staticTexts["李业阙"].firstMatch
        for _ in 0..<4 where !firstSite.isHittable { app.swipeUp() }
        XCTAssertTrue(firstSite.isHittable)
        firstSite.tap()

        let reset = app.buttons["改为想去"]
        if reset.exists {
            for _ in 0..<8 where !reset.isHittable { app.swipeUp() }
            XCTAssertTrue(reset.isHittable)
            reset.tap()
        }
        let slider = app.descendants(matching: .any)["到访打卡"].firstMatch
        for _ in 0..<8 where !slider.isHittable { app.swipeUp() }
        XCTAssertTrue(slider.isHittable)

        let thumb = slider.coordinate(withNormalizedOffset: CGVector(dx: 0.07, dy: 0.5))
        let nearEnd = slider.coordinate(withNormalizedOffset: CGVector(dx: 0.9, dy: 0.5))
        thumb.press(forDuration: 0.1, thenDragTo: nearEnd)
        Thread.sleep(forTimeInterval: 1.5)
        XCTAssertTrue(slider.exists, "Releasing before the end must leave the visit unchanged")

        let end = slider.coordinate(withNormalizedOffset: CGVector(dx: 0.99, dy: 0.5))
        thumb.press(forDuration: 0.1, thenDragTo: end)
        let visited = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "已到访")).firstMatch
        XCTAssertTrue(visited.waitForExistence(timeout: 5))
        XCTAssertTrue(app.buttons["改为想去"].waitForExistence(timeout: 5))
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
