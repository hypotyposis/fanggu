import XCTest

final class PersonalListUITests: XCTestCase {
    override func setUpWithError() throws { continueAfterFailure = false }

    func testCreateFromDetailWriteNotesReorderAndPersist() {
        let app = XCUIApplication.isolated()
        app.launchForTest(site: "nanchan")
        let add = app.buttons["add-site-to-list"]
        XCTAssertTrue(add.waitForExistence(timeout: 10))
        XCTAssertTrue(app.reveal(add))
        add.tap()
        app.buttons["create-list-from-site"].tap()
        let title = app.textFields["new-list-title"]
        XCTAssertTrue(title.waitForExistence(timeout: 5))
        title.tap(); title.typeText("建筑的回声")
        let description = app.textFields["new-list-description"]
        description.tap(); description.typeText("不同年代的联系")
        app.buttons["confirm-create-list"].tap()
        app.buttons["完成"].tap()
        let chip = app.buttons.matching(NSPredicate(format: "identifier BEGINSWITH 'personal-list-chip-'")).firstMatch
        XCTAssertTrue(chip.waitForExistence(timeout: 5))
        chip.tap()
        let addSites = app.buttons["personal-list-add-sites"]
        XCTAssertTrue(addSites.waitForExistence(timeout: 5))
        addSites.tap()
        let search = app.searchFields.firstMatch
        search.tap(); search.typeText("佛光寺")
        let pick = app.buttons["list-pick-foguang"]
        XCTAssertTrue(pick.waitForExistence(timeout: 5))
        pick.tap()
        XCTAssertEqual(pick.value as? String, "已加入")
        app.buttons["完成"].tap()
        let note = app.buttons["edit-list-note-nanchan"]
        XCTAssertTrue(app.reveal(note))
        note.tap()
        let text = app.textViews["list-edit-text"]
        XCTAssertTrue(text.waitForExistence(timeout: 5))
        text.tap(); text.typeText("从这里看见另一处的回声")
        let saved = app.staticTexts["list-autosave-status"]
        let predicate = NSPredicate(format: "label == %@", "修改自动保存")
        expectation(for: predicate, evaluatedWith: saved)
        waitForExpectations(timeout: 8)
        app.buttons["list-editor-done"].tap()
        app.reveal(app.buttons["personal-list-arrange"], up: false)
        app.buttons["personal-list-arrange"].tap()
        let move = app.buttons["list-up-foguang"]
        XCTAssertTrue(app.reveal(move))
        move.tap()
        let first = app.buttons["personal-list-member-foguang"]
        let second = app.buttons["personal-list-member-nanchan"]
        XCTAssertTrue(app.reveal(first, up: false))
        XCTAssertLessThan(first.frame.minY, second.frame.minY)
        capture(app, "personal-list-ordered")
        app.relaunch()
        XCTAssertTrue(chip.waitForExistence(timeout: 10))
        app.reveal(chip); chip.tap()
        XCTAssertTrue(first.waitForExistence(timeout: 5))
        XCTAssertLessThan(first.frame.minY, second.frame.minY)
        let storedNote = app.staticTexts["personal-list-note-nanchan"]
        XCTAssertTrue(app.reveal(storedNote))
        XCTAssertEqual(storedNote.label, "从这里看见另一处的回声")
        capture(app, "personal-list-reloaded-note")
        XCTAssertFalse(app.buttons["undo-change"].exists, "List actions do not mutate visits or reviews")
    }

    func testMyListsAllowsEmptyCreationEditRemoveAndDelete() {
        let app = XCUIApplication.isolated()
        app.launchForTest()
        app.buttons["我的"].tap()
        let link = app.buttons["personal-lists-link"]
        XCTAssertTrue(link.waitForExistence(timeout: 5)); app.reveal(link); link.tap()
        app.buttons["create-personal-list"].tap()
        let title = app.textFields["new-list-title"]
        title.tap(); title.typeText("旅行名单")
        app.buttons["confirm-create-list"].tap()
        let row = app.buttons.matching(NSPredicate(format: "identifier BEGINSWITH 'personal-list-list-'")).firstMatch
        XCTAssertTrue(row.waitForExistence(timeout: 5)); row.tap()
        app.buttons["personal-list-menu"].tap()
        app.buttons["编辑名单"].tap()
        let editTitle = app.textFields["list-edit-title"]
        XCTAssertTrue(editTitle.waitForExistence(timeout: 5))
        editTitle.tap(); editTitle.typeText("续篇")
        app.buttons["list-editor-done"].tap()
        XCTAssertTrue(app.navigationBars["旅行名单续篇"].waitForExistence(timeout: 5))
        app.buttons["personal-list-add-sites"].tap()
        let search = app.searchFields.firstMatch
        search.tap(); search.typeText("南禅寺")
        let pick = app.buttons["list-pick-nanchan"]
        XCTAssertTrue(pick.waitForExistence(timeout: 5)); pick.tap()
        app.buttons["完成"].tap()
        let remove = app.buttons["list-remove-nanchan"]
        XCTAssertTrue(app.reveal(remove)); remove.tap()
        XCTAssertFalse(app.buttons["personal-list-member-nanchan"].exists, "The only item can also be removed")
        app.buttons["personal-list-menu"].tap(); app.buttons["删除名单"].tap()
        app.buttons["删除名单"].tap()
        XCTAssertTrue(app.staticTexts["还没有名单"].waitForExistence(timeout: 5))
        app.relaunch(); app.buttons["我的"].tap(); app.reveal(link); link.tap()
        XCTAssertTrue(app.staticTexts["还没有名单"].waitForExistence(timeout: 5))
    }

    func testEnglishAndJapaneseListCreationAtLargeText() {
        for (language, locale, createTitle) in [("en", "en_US", "Create list"), ("ja", "ja_JP", "リストを作成")] {
            let app = XCUIApplication.isolated(language: language, locale: locale)
            app.launchForTest(site: "nanchan", arguments: ["-UIPreferredContentSizeCategoryName", "UICTContentSizeCategoryAccessibilityXXXL"])
            let add = app.buttons["add-site-to-list"]
            XCTAssertTrue(add.waitForExistence(timeout: 10)); XCTAssertTrue(app.reveal(add, attempts: 20)); add.tap()
            app.buttons["create-list-from-site"].tap()
            XCTAssertTrue(app.navigationBars[createTitle].waitForExistence(timeout: 5))
            XCTAssertTrue(app.textFields["new-list-title"].exists)
            capture(app, "\(language)-personal-list-large-text")
            app.terminate()
        }
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name; attachment.lifetime = .keepAlways; add(attachment)
    }
}
