import XCTest

/// Browsing lists, progress and share previews must stay read-only; these flows never tap a record action.
final class CurationUITests: XCTestCase {
    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    func testCatalogStripOpensCurationAndSharePreview() {
        let app = XCUIApplication.isolated()
        app.launch()
        let strip = app.descendants(matching: .any)["curation-strip"].firstMatch
        XCTAssertTrue(strip.waitForExistence(timeout: 10))
        let card = app.descendants(matching: .any)["curation-card-liao_eight"].firstMatch
        XCTAssertTrue(card.exists)
        XCTAssertTrue(card.label.contains("八大辽构"))
        card.tap()
        let progress = app.descendants(matching: .any)["curation-progress"].firstMatch
        XCTAssertTrue(progress.waitForExistence(timeout: 5))
        XCTAssertTrue(progress.label.contains("共 7 处"))
        XCTAssertTrue(app.descendants(matching: .any)["curation-member-yingxian"].firstMatch.exists)
        app.buttons["share-curation-card"].tap()
        XCTAssertTrue(app.images["share-card-preview"].waitForExistence(timeout: 10), "The card renders before any share action")
        XCTAssertTrue(app.buttons["share-card-link"].exists)
        XCTAssertTrue(app.buttons["share-card-save"].exists)
        XCTAssertTrue(app.buttons["share-card-copy"].exists)
        app.buttons["完成"].tap()
        XCTAssertTrue(progress.waitForExistence(timeout: 5))
        app.descendants(matching: .any)["curation-member-yingxian"].firstMatch.tap()
        let chip = app.descendants(matching: .any)["curation-chip-liao_eight"].firstMatch
        XCTAssertTrue(chip.waitForExistence(timeout: 5), "A member shows its list on the detail page")
        app.buttons["share-card"].tap()
        XCTAssertTrue(app.images["share-card-preview"].waitForExistence(timeout: 10))
        app.buttons["完成"].tap()
    }

    func testSearchHidesStripAndLibraryShowsProgress() {
        let app = XCUIApplication.isolated()
        app.launch()
        let strip = app.descendants(matching: .any)["curation-strip"].firstMatch
        XCTAssertTrue(strip.waitForExistence(timeout: 10))
        // The floating tab bar collapses while the keyboard is up, so visit 我的 before typing.
        app.buttons["我的"].tap()
        let row = app.descendants(matching: .any)["curation-row-tang_timber"].firstMatch
        XCTAssertTrue(row.waitForExistence(timeout: 5))
        XCTAssertTrue(row.label.contains("共 4 处"))
        let link = app.buttons["collection-progress-link"]
        if !link.isHittable { app.swipeUp() }
        link.tap()
        let summary = app.staticTexts["collection-summary"]
        XCTAssertTrue(summary.waitForExistence(timeout: 5))
        XCTAssertTrue(app.descendants(matching: .any)["collection-group-tang"].firstMatch.exists)
        app.segmentedControls["collection-facet"].buttons["省份"].tap()
        XCTAssertTrue(app.descendants(matching: .any)["collection-group-山西"].firstMatch.waitForExistence(timeout: 5))
        app.buttons["返回"].tap()
        app.buttons["图鉴"].tap()
        XCTAssertTrue(strip.waitForExistence(timeout: 5))
        let search = app.textFields["搜索古迹、地点或时代"]
        search.tap(); search.typeText("唐")
        XCTAssertFalse(strip.exists, "Results replace the strip while searching")
        app.buttons["clear-catalog-search"].tap()
        XCTAssertTrue(strip.waitForExistence(timeout: 5), "Clearing the search brings the lists back")
    }
}
