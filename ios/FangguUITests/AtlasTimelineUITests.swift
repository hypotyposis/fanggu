import XCTest

final class AtlasTimelineUITests: XCTestCase {
    override func setUpWithError() throws { continueAfterFailure = false }

    func testEraSelectionLocatesNodesAndKeepsSelectionAfterDetail() {
        let app = XCUIApplication(); app.launch()
        app.buttons["年表"].tap()
        let menu = app.buttons["timeline-period-menu"]
        XCTAssertTrue(menu.waitForExistence(timeout: 10)); menu.tap()
        let ming = app.buttons["timeline-period-choice-ming"]
        for _ in 0..<7 where !ming.isHittable { app.swipeUp() }
        XCTAssertTrue(ming.isHittable); ming.tap(); waitForMenuToClose(app)
        capture(app, "timeline-after-ming-menu")
        let chosen = app.buttons["timeline-period-ming"]
        let visible = XCTNSPredicateExpectation(predicate: NSPredicate(format: "hittable == true"), object: chosen)
        XCTAssertEqual(XCTWaiter.wait(for: [visible], timeout: 5), .completed, "Chosen era must be scrolled into view")
        XCTAssertTrue(app.staticTexts["timeline-selection-title"].label.contains("明 · 清"))
        let nodes = app.buttons.matching(NSPredicate(format: "identifier BEGINSWITH %@", "timeline-marker-"))
        guard let node = nodes.allElementsBoundByIndex.first(where: { visibleNode($0, in: app) }) else {
            XCTFail("Selecting Ming must reveal its time-axis nodes without manual scrolling"); return
        }
        XCTAssertTrue(node.label.contains("年")); XCTAssertTrue((node.value as? String)?.contains("已到访") == true)
        node.tap(); XCTAssertTrue(node.isSelected)
        let title = app.staticTexts["timeline-selection-title"].label
        XCTAssertTrue(title.contains("年")); XCTAssertFalse(title.contains("全部时期"))
        capture(app, "timeline-ming-selected")
        let rows = app.buttons.matching(NSPredicate(format: "identifier BEGINSWITH %@", "timeline-site-"))
        for _ in 0..<5 where !rows.firstMatch.isHittable { app.swipeUp() }
        rows.firstMatch.tap()
        XCTAssertTrue(app.staticTexts["我的访古记"].waitForExistence(timeout: 5))
        app.buttons["返回"].tap()
        for _ in 0..<5 where !app.staticTexts["timeline-selection-title"].isHittable { app.swipeDown() }
        XCTAssertEqual(app.staticTexts["timeline-selection-title"].label, title)
        XCTAssertTrue(node.isSelected)
        app.buttons["timeline-clear-point"].tap()
        XCTAssertTrue(app.staticTexts["timeline-selection-title"].label.contains("明 · 清"))
    }

    func testAllRegionsAndCrossRegionEraAreReachable() {
        let app = XCUIApplication(); app.launch(); app.buttons["年表"].tap()
        let region = app.buttons["timeline-region-menu"]
        XCTAssertTrue(region.waitForExistence(timeout: 10))
        for (index, title) in [(2, "日本"), (3, "东南亚"), (4, "朝鲜半岛"), (1, "中国南方"), (0, "中国北方")] {
            region.tap(); app.buttons["timeline-region-choice-\(index)"].tap(); waitForMenuToClose(app)
            XCTAssertTrue(app.staticTexts["timeline-selection-title"].label.hasPrefix(title))
            XCTAssertTrue(app.buttons.matching(NSPredicate(format: "identifier BEGINSWITH %@", "timeline-marker-")).allElementsBoundByIndex.contains { visibleNode($0, in: app) })
        }
        app.buttons["timeline-period-menu"].tap()
        let japan = app.buttons["timeline-period-choice-jp_nara"]
        for _ in 0..<7 where !japan.isHittable { app.swipeUp() }
        XCTAssertTrue(japan.isHittable); japan.tap(); waitForMenuToClose(app)
        XCTAssertTrue(app.staticTexts["timeline-selection-title"].label.hasPrefix("日本"))
        XCTAssertTrue(app.buttons["timeline-period-jp_nara"].isSelected)
        capture(app, "timeline-japan")
    }

    func testMapDetailStatusCorrectionHasOneWorkingUndo() {
        let app = XCUIApplication(); app.launch(); app.buttons["足迹"].tap()
        let marker = app.buttons.matching(NSPredicate(format: "identifier BEGINSWITH %@", "map-marker-")).firstMatch
        XCTAssertTrue(marker.waitForExistence(timeout: 10)); marker.tap()
        let site = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "细读")).firstMatch
        XCTAssertTrue(site.waitForExistence(timeout: 5)); site.tap()
        let status = app.buttons["visit-status-menu"]
        XCTAssertTrue(status.waitForExistence(timeout: 5)); status.tap()
        app.buttons["改为未标记"].tap()
        let undo = app.buttons.matching(identifier: "undo-change")
        XCTAssertEqual(undo.count, 1, "The presenting map must not expose a duplicate undo behind its detail sheet")
        undo.firstMatch.tap()
        XCTAssertTrue(status.waitForExistence(timeout: 5))
        app.buttons["返回"].tap(); app.buttons["关闭"].tap()
        XCTAssertTrue(marker.isSelected)
        XCTAssertTrue(app.staticTexts["map-selected-places"].exists)
        capture(app, "map-selected-range")
    }

    private func waitForMenuToClose(_ app: XCUIApplication) {
        let gone = XCTNSPredicateExpectation(predicate: NSPredicate(format: "exists == false"), object: app.buttons["Dismiss context menu"])
        XCTAssertEqual(XCTWaiter.wait(for: [gone], timeout: 5), .completed)
    }

    private func visibleNode(_ node: XCUIElement, in app: XCUIApplication) -> Bool {
        let graphic = app.descendants(matching: .any)["timeline-graphic"].firstMatch.frame
        let intersection = node.frame.intersection(graphic).intersection(app.frame)
        return !intersection.isNull && intersection.width >= 24 && intersection.height >= 24 && node.isHittable
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot()); attachment.name = name
        attachment.lifetime = .keepAlways; add(attachment)
    }
}
