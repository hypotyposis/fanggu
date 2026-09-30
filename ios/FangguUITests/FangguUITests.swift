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
        openFirstCatalogSite(in: app)
        XCTAssertTrue(app.staticTexts["我的访古记"].waitForExistence(timeout: 10))
        XCTAssertTrue(app.staticTexts["我的评价"].exists)
        XCTAssertTrue(app.buttons["标记到访"].exists || app.buttons["编辑到访记录"].exists)
        capture(app, "detail")
    }

    func testLargeCardShowsArrivalSlider() {
        let app = XCUIApplication()
        app.launch()
        let displayButton = app.buttons["大图"]
        XCTAssertTrue(displayButton.waitForExistence(timeout: 10))
        displayButton.tap()
        let slider = app.descendants(matching: .any)["到访打卡"].firstMatch
        for _ in 0..<8 where !slider.isHittable { app.swipeUp() }
        XCTAssertTrue(slider.isHittable)
    }

    func testArrivalOnlySavesAfterReleasingAtTheEnd() {
        let app = XCUIApplication()
        app.launch()
        openFirstCatalogSite(in: app)

        let reset = app.buttons["移至心愿单"]
        if reset.exists {
            for _ in 0..<8 where !reset.isHittable { app.swipeUp() }
            XCTAssertTrue(reset.isHittable)
            reset.tap()
        }
        let slider = app.descendants(matching: .any)["到访打卡"].firstMatch
        for _ in 0..<8 where !slider.isHittable { app.swipeUp() }
        XCTAssertTrue(slider.isHittable)
        let artwork = app.descendants(matching: .any)["detail-artwork"].firstMatch
        XCTAssertTrue(artwork.exists)
        XCTAssertEqual(slider.frame.minY - artwork.frame.maxY, 8, accuracy: 2,
                       "The reveal control should stay directly below its artwork")

        let thumb = slider.coordinate(withNormalizedOffset: CGVector(dx: 0.07, dy: 0.5))
        let nearEnd = slider.coordinate(withNormalizedOffset: CGVector(dx: 0.9, dy: 0.5))
        thumb.press(forDuration: 0.1, thenDragTo: nearEnd)
        Thread.sleep(forTimeInterval: 1.5)
        XCTAssertTrue(slider.exists, "Releasing before the end must leave the visit unchanged")

        let end = slider.coordinate(withNormalizedOffset: CGVector(dx: 0.99, dy: 0.5))
        thumb.press(forDuration: 0.1, thenDragTo: end)
        let visited = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "已到访")).firstMatch
        XCTAssertTrue(visited.waitForExistence(timeout: 5))
        XCTAssertTrue(app.buttons["移至心愿单"].waitForExistence(timeout: 5))
    }

    private func openFirstCatalogSite(in app: XCUIApplication) {
        let firstSite = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "细读")).firstMatch
        for _ in 0..<4 where !firstSite.isHittable { app.swipeUp() }
        XCTAssertTrue(firstSite.isHittable)
        firstSite.tap()
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
