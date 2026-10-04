import XCTest

final class UIUXFixTests: XCTestCase {
    /// A single stable catalogue entry avoids the default wishlist order changing after a visit.
    /// Detail and review tests deep-link to it; the search route itself is covered by
    /// `FangguUITests.testTokyoCatalogFilterAliasAndDetailReturn`.
    private let site = "jp_nezu_romon"

    override func setUpWithError() throws {
        continueAfterFailure = false
    }
    func testMultiwordSearchAndIndependentClear() {
        let app = XCUIApplication()
        app.launchForTest()
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
        let app = XCUIApplication()
        app.launchForTest(site: site)
        XCTAssertTrue(app.buttons["edit-visit"].waitForExistence(timeout: 10))
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
        let app = XCUIApplication()
        app.launchForTest(site: site, review: true)
        app.waitForReviewEditor()
        let era = app.descendants(matching: .any)["radar-axis-eraRarity"].firstMatch
        XCTAssertTrue(era.waitForExistence(timeout: 5))
        let start = era.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
        start.press(forDuration: 0.1, thenDragTo: start.withOffset(CGVector(dx: 0, dy: -120)))
        XCTAssertEqual(era.value as? String, "A，卓越")
        app.buttons["reset-dimensions"].tap()
        XCTAssertEqual(era.value as? String, "—，未评分")
        app.buttons["undo-change"].tap()
        XCTAssertEqual(era.value as? String, "A，卓越")

        let field = app.textViews["review-text"]
        app.reveal(field)
        field.tap()
        field.typeText("\nundo-includes-latest-text\n")
        let expectedText = field.value as? String
        XCTAssertTrue(expectedText?.contains("undo-includes-latest-text") == true)
        let clear = app.buttons["清除评价"]
        app.reveal(clear)
        clear.tap()
        XCTAssertEqual(field.value as? String, "")
        app.buttons["undo-change"].tap()
        XCTAssertEqual(field.value as? String, expectedText)
        XCTAssertEqual(era.value as? String, "A，卓越")
        app.buttons["完成"].tap()
        app.relaunch()
        app.waitForReviewEditor()
        XCTAssertEqual(field.value as? String, expectedText)
        XCTAssertEqual(era.value as? String, "A，卓越")
    }

    func testMaximumAccessibilitySizeSupportsAllSixRatingsAndText() {
        let app = XCUIApplication()
        app.launchForTest(site: site, review: true,
                          arguments: ["-UIPreferredContentSizeCategoryName", "UICTContentSizeCategoryAccessibilityXXXL"])
        app.waitForReviewEditor()
        let keys = ["eraRarity", "authenticity", "construction", "art", "scale", "setting"]
        let values = ["A · 卓越", "E · 较弱", "B · 突出", "C · 有看点", "D · 平常", "未评分"]
        XCTAssertTrue(app.descendants(matching: .any)["dimension-picker-eraRarity"].firstMatch.waitForExistence(timeout: 5))
        XCTAssertFalse(app.descendants(matching: .any)["radar-axis-eraRarity"].firstMatch.exists)
        capture(app, "accessible-rating-first-dimension")
        for (index, key) in keys.enumerated() {
            let picker = app.descendants(matching: .any)["dimension-picker-\(key)"].firstMatch
            app.reveal(picker, attempts: 15)
            XCTAssertTrue(picker.isHittable)
            XCTAssertGreaterThanOrEqual(picker.frame.height, 44)
            picker.tap()
            app.buttons[values[index]].tap()
            XCTAssertEqual(picker.value as? String, values[index])
        }
        let field = app.textViews["review-text"]
        app.reveal(field, attempts: 12)
        XCTAssertTrue(field.isHittable)
        capture(app, "accessible-rating-last-dimension-and-text")
        app.buttons["完成"].tap()
        openReview(in: app)
        for (index, key) in keys.enumerated() {
            XCTAssertEqual(app.descendants(matching: .any)["dimension-picker-\(key)"].firstMatch.value as? String, values[index])
        }
    }

    func testLargeCardReviewHasOneWorkingUndo() {
        let app = XCUIApplication()
        app.launchForTest()
        app.buttons["大图"].tap()
        let entry = app.buttons["写短评 / 打分"].firstMatch
        app.reveal(entry)
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

    private func openReview(in app: XCUIApplication) {
        let button = app.buttons["edit-review"]
        app.reveal(button, attempts: 30)
        XCTAssertTrue(button.isHittable)
        button.tap()
        XCTAssertTrue(app.buttons["完成"].waitForExistence(timeout: 5))
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name; attachment.lifetime = .keepAlways
        add(attachment)
    }
}
