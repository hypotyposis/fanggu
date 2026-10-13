import XCTest

/// Browsing lists, progress and share previews must stay read-only; these flows never tap a record action.
final class CurationUITests: XCTestCase {
    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    func testEditorialReasonsLeadToRelatedDetailAndPreserveReturnPosition() {
        let app = XCUIApplication.isolated()
        app.launchForTest()
        let card = app.descendants(matching: .any)["curation-card-tang_timber"].firstMatch
        XCTAssertTrue(card.waitForExistence(timeout: 10))
        card.tap()
        let selection = app.descendants(matching: .any)["curation-selection-reason"].firstMatch
        XCTAssertTrue(selection.waitForExistence(timeout: 5))
        XCTAssertFalse(selection.label.isEmpty)
        editorialCapture(app, "zh-editorial-selection")

        let member = app.descendants(matching: .any)["curation-member-nanchan"].firstMatch
        XCTAssertTrue(app.reveal(member))
        XCTAssertTrue(app.descendants(matching: .any)["curation-reason-nanchan"].firstMatch.exists)
        editorialCapture(app, "zh-editorial-member")
        member.tap()
        XCTAssertTrue(app.buttons["detail-back"].waitForExistence(timeout: 5))
        let next = app.descendants(matching: .any)["related-site-foguang"].firstMatch
        XCTAssertTrue(app.reveal(next, attempts: 14), app.debugDescription)
        let before = next.frame.midY
        editorialCapture(app, "zh-editorial-next")
        next.tap()
        XCTAssertTrue(app.navigationBars["佛光寺"].waitForExistence(timeout: 5))
        app.buttons["detail-back"].tap()
        XCTAssertTrue(next.waitForExistence(timeout: 5))
        XCTAssertTrue(next.isHittable, "Returning from a recommendation keeps the source's reading position")
        XCTAssertEqual(next.frame.midY, before, accuracy: 40)
        app.buttons["detail-back"].tap()
        XCTAssertTrue(member.waitForExistence(timeout: 5))
        XCTAssertTrue(member.isHittable, "Returning to the topic keeps the selected member visible")
        XCTAssertFalse(app.buttons["undo-change"].exists, "Browsing never changes a visit record")
    }

    func testEditorialCopyIsLocalizedAndReadableWithLargeText() {
        for (language, locale) in [("en", "en_US"), ("ja", "ja_JP")] {
            let app = XCUIApplication.isolated(language: language, locale: locale)
            app.launchForTest(site: "nanchan", arguments: ["-UIPreferredContentSizeCategoryName", "UICTContentSizeCategoryAccessibilityXXXL"])
            let next = app.descendants(matching: .any)["related-site-foguang"].firstMatch
            XCTAssertTrue(app.reveal(next, attempts: 30), app.debugDescription)
            XCTAssertFalse(next.label.isEmpty)
            if language == "en" {
                XCTAssertNil(next.label.range(of: "\\p{Han}", options: .regularExpression))
            }
            XCTAssertFalse(next.label.contains("对照着看"))
            editorialCapture(app, "\(language)-editorial-next-large-text")
            let chip = app.descendants(matching: .any)["curation-chip-tang_timber"].firstMatch
            XCTAssertTrue(app.reveal(chip, up: false, attempts: 30))
            chip.tap()
            let selection = app.descendants(matching: .any)["curation-selection-reason"].firstMatch
            XCTAssertTrue(selection.waitForExistence(timeout: 5))
            XCTAssertFalse(selection.label.isEmpty)
            if language == "en" {
                XCTAssertNil(selection.label.range(of: "\\p{Han}", options: .regularExpression))
            }
            XCTAssertTrue(app.reveal(selection, attempts: 12))
            editorialCapture(app, "\(language)-editorial-selection-large-text")
            app.terminate()
        }
    }

    private func editorialCapture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }

    func testChongxingDetailJoinsTheThreeMemberNinghaiCollectionInEveryLanguage() {
        for (language, locale, name) in [
            ("zh-Hans", "zh_CN", "宁海崇兴庙戏台"),
            ("en", "en_US", "Ninghai Chongxing Temple Stage"),
            ("ja", "ja_JP", "寧海崇興廟戯台")
        ] {
            let app = XCUIApplication.isolated(language: language, locale: locale)
            app.launchForTest(site: "xitai_chongxing")
            XCTAssertTrue(app.staticTexts[name].firstMatch.waitForExistence(timeout: 10))
            let detail = XCTAttachment(screenshot: app.screenshot())
            detail.name = "\(language)-chongxing-detail"
            detail.lifetime = .keepAlways
            add(detail)
            let chip = app.descendants(matching: .any)["curation-chip-xitai"].firstMatch
            app.reveal(chip)
            XCTAssertTrue(chip.exists)
            chip.tap()
            let progress = app.descendants(matching: .any)["curation-progress"].firstMatch
            XCTAssertTrue(progress.waitForExistence(timeout: 5))
            for id in ["xitai_aohu", "xitai_chongxing", "xitai_chenghuang"] {
                XCTAssertTrue(app.descendants(matching: .any)["curation-member-\(id)"].firstMatch.exists)
            }
            XCTAssertTrue(app.descendants(matching: .any)["collection-legacy-record"].firstMatch.exists)
            let group = XCTAttachment(screenshot: app.screenshot())
            group.name = "\(language)-ninghai-three-members"
            group.lifetime = .keepAlways
            add(group)
            app.terminate()
        }
    }

    func testCatalogStripOpensCurationAndSharePreview() {
        let app = XCUIApplication.isolated()
        app.launchForTest()
        let strip = app.descendants(matching: .any)["curation-strip"].firstMatch
        XCTAssertTrue(strip.waitForExistence(timeout: 10))
        let card = app.descendants(matching: .any)["curation-card-liao_eight"].firstMatch
        XCTAssertTrue(card.exists)
        XCTAssertTrue(card.label.contains("八大辽构"))
        card.tap()
        let progress = app.descendants(matching: .any)["curation-progress"].firstMatch
        XCTAssertTrue(progress.waitForExistence(timeout: 5))
        XCTAssertTrue(progress.label.contains("共 8 处"))
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
        app.launchForTest()
        let strip = app.descendants(matching: .any)["curation-strip"].firstMatch
        XCTAssertTrue(strip.waitForExistence(timeout: 10))
        // The floating tab bar collapses while the keyboard is up, so visit 我的 before typing.
        app.buttons["我的"].tap()
        let row = app.descendants(matching: .any)["curation-row-tang_timber"].firstMatch
        XCTAssertTrue(row.waitForExistence(timeout: 5))
        XCTAssertTrue(row.label.contains("共 4 处"))
        let link = app.buttons["collection-progress-link"]
        app.reveal(link)
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

    func testCollectionVisitIsImmediatePersistsAndUndoRestoresAllMembers() {
        let app = XCUIApplication.isolated()
        func openCollection() {
            app.launchForTest(site: "kaiyuan_xumi")
            let chip = app.descendants(matching: .any)["curation-chip-kaiyuan"].firstMatch
            XCTAssertTrue(chip.waitForExistence(timeout: 10))
            app.reveal(chip)
            chip.tap()
        }
        openCollection()
        let progress = app.descendants(matching: .any)["curation-progress"].firstMatch
        XCTAssertTrue(progress.waitForExistence(timeout: 5))
        XCTAssertTrue(progress.label.contains("已到访 0 处"))
        let action = app.buttons["record-collection-today"]
        XCTAssertTrue(action.exists)
        action.tap()
        XCTAssertTrue(progress.label.contains("已到访 2 处"))
        XCTAssertFalse(action.isEnabled)
        let visitedScreenshot = XCTAttachment(screenshot: app.screenshot())
        visitedScreenshot.name = "collection-visited"
        visitedScreenshot.lifetime = .keepAlways
        add(visitedScreenshot)
        let undo = app.buttons["undo-change"]
        XCTAssertTrue(undo.waitForExistence(timeout: 5))
        undo.tap()
        XCTAssertTrue(progress.label.contains("已到访 0 处"))
        XCTAssertTrue(action.isEnabled)
        let undoneScreenshot = XCTAttachment(screenshot: app.screenshot())
        undoneScreenshot.name = "collection-undone"
        undoneScreenshot.lifetime = .keepAlways
        add(undoneScreenshot)
        action.tap()
        app.terminate()
        openCollection()
        XCTAssertTrue(progress.waitForExistence(timeout: 5))
        XCTAssertTrue(progress.label.contains("已到访 2 处"))
        XCTAssertTrue(app.descendants(matching: .any)["collection-legacy-record"].firstMatch.exists)
    }
}
