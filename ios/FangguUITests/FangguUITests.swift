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
        capture(app, "arrival-complete")
        XCTAssertTrue(artwork.label.contains("设色图"), "The completed artwork must appear promptly after a successful save")
        XCTAssertFalse(app.otherElements["detail-arrival-slider"].exists,
                       "The arrival control must not hold the UI for the old 1.35-second delay")
        let visited = app.staticTexts.matching(NSPredicate(format: "label BEGINSWITH %@", "已到访")).firstMatch
        XCTAssertTrue(visited.waitForExistence(timeout: 5))
        XCTAssertTrue(app.buttons["移至心愿单"].waitForExistence(timeout: 5))
    }

    func testMapMarkersAndSearchOpenVisitedSites() {
        let app = XCUIApplication()
        app.launch()
        app.buttons["地图"].tap()
        let map = app.descendants(matching: .any)["visited-map"].firstMatch
        XCTAssertTrue(map.waitForExistence(timeout: 10))
        XCTAssertEqual(map.frame.height, 280, accuracy: 2,
                       "Phone map must not become a 640pt label wall")
        capture(app, "compact-map")

        let marker = app.buttons.matching(NSPredicate(format: "identifier BEGINSWITH %@", "map-marker-")).firstMatch
        XCTAssertTrue(marker.isHittable)
        marker.tap()
        XCTAssertTrue(app.buttons["关闭"].waitForExistence(timeout: 5))
        let site = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "细读")).firstMatch
        XCTAssertTrue(site.waitForExistence(timeout: 5))
        site.tap()
        XCTAssertTrue(app.staticTexts["我的访古记"].waitForExistence(timeout: 5))
        app.buttons["返回"].tap()
        XCTAssertTrue(app.buttons["关闭"].waitForExistence(timeout: 5))
        app.buttons["关闭"].tap()

        let search = app.textFields["搜索地点、省份或古迹"]
        for _ in 0..<4 where !search.isHittable { app.swipeUp() }
        XCTAssertTrue(search.isHittable)
        search.tap()
        search.typeText("no-such-place")
        XCTAssertTrue(app.staticTexts["没有匹配的到访地点"].waitForExistence(timeout: 5))
        search.typeText(String(repeating: XCUIKeyboardKey.delete.rawValue, count: 13))
        app.swipeUp()
        let rows = app.buttons.matching(NSPredicate(format: "identifier BEGINSWITH %@", "map-place-"))
        guard let place = rows.allElementsBoundByIndex.first(where: { $0.isHittable }) else {
            XCTFail("At least one visited place must be reachable after dismissing search")
            return
        }
        place.tap()
        XCTAssertTrue(app.buttons["关闭"].waitForExistence(timeout: 5))
        XCTAssertTrue(app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "细读")).firstMatch.exists)
        capture(app, "map-place-sites")
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
