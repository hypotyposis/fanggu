import XCTest

final class UIUXFixTests: XCTestCase {
    override func setUpWithError() throws {
        continueAfterFailure = false
    }
    func testMultiwordSearchAndIndependentClear() {
        let app = XCUIApplication.isolated()
        app.launch()
        let search = app.textFields["搜索古迹、地点或时代"]
        XCTAssertTrue(search.waitForExistence(timeout: 10))
        search.tap(); search.typeText("山西 唐")
        let count = app.staticTexts["catalog-result-count"]
        XCTAssertTrue(count.waitForExistence(timeout: 5))
        let firstCount = count.label
        XCTAssertNotEqual(firstCount, "共 0 处")
        app.buttons["clear-catalog-search"].tap()
        search.tap(); search.typeText("唐 山西")
        XCTAssertEqual(count.label, firstCount)
        capture(app, "search-keywords")
        app.buttons["clear-catalog-search"].tap()
        let status = app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", "未标记")).firstMatch
        status.tap()
        search.tap(); search.typeText("no-such-place")
        XCTAssertEqual(count.label, "共 0 处")
        app.buttons["clear-catalog-search"].tap()
        XCTAssertTrue(status.isSelected, "Clearing text must retain the status filter")
        XCTAssertNotEqual(count.label, "共 0 处")
    }

    func testTodayUndoUnknownDateAndDirectStatusCorrection() {
        let app = XCUIApplication.isolated()
        app.launch()
        openFirstSite(in: app)
        let menu = app.buttons["visit-status-menu"]
        if menu.exists {
            menu.tap(); app.buttons["改为未标记"].tap()
            app.buttons["关闭提示"].tap()
        }
        let today = app.buttons["record-today"]
        XCTAssertTrue(today.isHittable)
        today.tap()
        XCTAssertTrue(menu.waitForExistence(timeout: 5))
        app.buttons["undo-change"].tap()
        XCTAssertTrue(today.waitForExistence(timeout: 5))

        app.buttons["edit-visit"].tap()
        XCTAssertTrue(app.switches["visit-date-known"].waitForExistence(timeout: 5))
        let known = app.switches["visit-date-known"]
        if known.value as? String == "1" { known.tap() }
        let note = app.textViews["visit-note"]
        note.tap()
        note.typeText("retained-visit-note")
        let expectedNote = note.value as? String
        XCTAssertTrue(expectedNote?.contains("retained-visit-note") == true)
        app.buttons["save-visit"].tap()
        XCTAssertTrue(menu.waitForExistence(timeout: 5))
        menu.tap(); app.buttons["改为未标记"].tap()
        XCTAssertTrue(today.waitForExistence(timeout: 5))
        app.buttons["undo-change"].tap()
        XCTAssertTrue(menu.waitForExistence(timeout: 5))
        app.buttons["edit-visit"].tap()
        XCTAssertEqual(known.value as? String, "0", "An unknown date must stay unknown")
        XCTAssertEqual(note.value as? String, expectedNote)
        capture(app, "unknown-date-and-retained-note")
        app.buttons["取消"].tap()
        capture(app, "arrival-status-and-undo")
    }

    func testReviewResetAndClearCanBeUndone() {
        let app = XCUIApplication.isolated()
        app.launch()
        openFirstSite(in: app); openReview(in: app)
        let era = app.descendants(matching: .any)["radar-axis-eraRarity"].firstMatch
        let start = era.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
        start.press(forDuration: 0.1, thenDragTo: start.withOffset(CGVector(dx: 0, dy: -120)))
        XCTAssertEqual(era.value as? String, "A，卓越")
        app.buttons["reset-dimensions"].tap()
        XCTAssertEqual(era.value as? String, "—，未评分")
        app.buttons["undo-change"].tap()
        XCTAssertEqual(era.value as? String, "A，卓越")

        let field = app.textViews["review-text"]
        for _ in 0..<8 where !field.isHittable { scrollSheet(in: app) }
        field.tap()
        field.typeText("\nundo-includes-latest-text\n")
        let expectedText = field.value as? String
        XCTAssertTrue(expectedText?.contains("undo-includes-latest-text") == true)
        let clear = app.buttons["清除评价"]
        for _ in 0..<8 where !clear.isHittable { scrollSheet(in: app) }
        clear.tap()
        XCTAssertEqual(field.value as? String, "")
        app.buttons["undo-change"].tap()
        XCTAssertEqual(field.value as? String, expectedText)
        XCTAssertEqual(era.value as? String, "A，卓越")
        app.buttons["完成"].tap()
        app.terminate(); app.launch()
        openFirstSite(in: app); openReview(in: app)
        XCTAssertEqual(field.value as? String, expectedText)
        XCTAssertEqual(era.value as? String, "A，卓越")
    }

    func testMaximumAccessibilitySizeSupportsAllSixRatingsAndText() {
        let app = XCUIApplication.isolated()
        app.launchArguments += ["-UIPreferredContentSizeCategoryName", "UICTContentSizeCategoryAccessibilityXXXL"]
        app.launch()
        openFirstSite(in: app); openReview(in: app)
        let keys = ["eraRarity", "authenticity", "construction", "art", "scale", "setting"]
        let values = ["A · 卓越", "E · 较弱", "B · 突出", "C · 有看点", "D · 平常", "未评分"]
        XCTAssertTrue(app.descendants(matching: .any)["dimension-picker-eraRarity"].firstMatch.waitForExistence(timeout: 5))
        XCTAssertFalse(app.descendants(matching: .any)["radar-axis-eraRarity"].firstMatch.exists)
        capture(app, "accessible-rating-first-dimension")
        for (index, key) in keys.enumerated() {
            let picker = app.descendants(matching: .any)["dimension-picker-\(key)"].firstMatch
            for _ in 0..<15 where !picker.isHittable { scrollSheet(in: app) }
            XCTAssertTrue(picker.isHittable)
            XCTAssertGreaterThanOrEqual(picker.frame.height, 44)
            picker.tap()
            app.buttons[values[index]].tap()
            XCTAssertEqual(picker.value as? String, values[index])
        }
        let field = app.textViews["review-text"]
        for _ in 0..<12 where !field.isHittable { scrollSheet(in: app) }
        XCTAssertTrue(field.isHittable)
        capture(app, "accessible-rating-last-dimension-and-text")
        app.buttons["完成"].tap()
        openReview(in: app)
        for (index, key) in keys.enumerated() {
            XCTAssertEqual(app.descendants(matching: .any)["dimension-picker-\(key)"].firstMatch.value as? String, values[index])
        }
    }

    func testLargeCardReviewHasOneWorkingUndo() {
        let app = XCUIApplication.isolated()
        app.launch()
        app.buttons["大图"].tap()
        let entry = app.buttons["写短评 / 打分"].firstMatch
        for _ in 0..<8 where !entry.isHittable { app.swipeUp() }
        XCTAssertTrue(entry.isHittable)
        entry.tap()
        let era = app.descendants(matching: .any)["radar-axis-eraRarity"].firstMatch
        XCTAssertTrue(era.waitForExistence(timeout: 5))
        let start = era.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
        start.press(forDuration: 0.1, thenDragTo: start.withOffset(CGVector(dx: 0, dy: -120)))
        app.buttons["reset-dimensions"].tap()
        XCTAssertEqual(app.buttons.matching(identifier: "undo-change").count, 1)
        app.buttons["undo-change"].tap()
        XCTAssertEqual(era.value as? String, "A，卓越")
    }

    private func openFirstSite(in app: XCUIApplication) {
        let search = app.textFields["搜索古迹、地点或时代"]
        XCTAssertTrue(search.waitForExistence(timeout: 10))
        // A single stable catalogue entry avoids the default wishlist order changing after a visit.
        search.tap(); search.typeText("Nezu\n")
        let result = app.buttons.matching(NSPredicate(format: "label CONTAINS %@ AND label CONTAINS %@", "根津神社楼门", "细读")).firstMatch
        for _ in 0..<12 where !result.isHittable { app.swipeUp() }
        XCTAssertTrue(result.isHittable)
        result.tap()
        XCTAssertTrue(app.buttons["edit-visit"].waitForExistence(timeout: 5))
    }

    private func openReview(in app: XCUIApplication) {
        let button = app.buttons["edit-review"]
        for _ in 0..<30 where !button.isHittable { app.swipeUp() }
        XCTAssertTrue(button.isHittable)
        button.tap()
        XCTAssertTrue(app.buttons["完成"].waitForExistence(timeout: 5))
    }

    private func scrollSheet(in app: XCUIApplication) {
        app.coordinate(withNormalizedOffset: CGVector(dx: 0.025, dy: 0.78))
            .press(forDuration: 0.05, thenDragTo: app.coordinate(withNormalizedOffset: CGVector(dx: 0.025, dy: 0.3)))
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name; attachment.lifetime = .keepAlways
        add(attachment)
    }
}
