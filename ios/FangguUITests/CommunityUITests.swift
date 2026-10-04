import XCTest

/// These tests exercise the actual HTTP service on 8787, not an in-app fake repository.
/// Start `python3 community/seed.py` and `python3 community/server.py --database community/data/prototype.sqlite` first.
final class CommunityUITests: XCTestCase {
    private func login(_ app: XCUIApplication, handle: String = "yanbei", password: String = "fanggu-demo-2026") {
        app.launch()
        app.buttons["我的"].tap()
        app.buttons["community-account-entry"].tap()
        let logout = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "退出账号")).firstMatch
        if logout.exists {
            for _ in 0..<5 where !logout.isHittable { app.swipeUp() }
            logout.tap()
        }
        let field = app.textFields["community-handle"]
        XCTAssertTrue(field.waitForExistence(timeout: 10))
        field.tap(); field.typeText(handle)
        let passwordField = app.secureTextFields["community-password"]
        passwordField.tap(); passwordField.typeText(password)
        app.swipeUp()
        let consent = app.switches["community-consent"]
        XCTAssertTrue(consent.waitForExistence(timeout: 5))
        if (consent.value as? String) != "1" { consent.tap() }
        let submit = app.buttons["community-auth-submit"]
        for _ in 0..<3 where !submit.isHittable { app.swipeUp() }
        submit.tap()
        XCTAssertTrue(app.buttons["切换到单机模式"].waitForExistence(timeout: 20), app.debugDescription)
    }

    func testCommunityFeedProfilesFollowAndModeSwitch() {
        let app = XCUIApplication()
        login(app)
        app.buttons["社区"].tap()
        XCTAssertTrue(app.staticTexts["同好之间"].waitForExistence(timeout: 10))
        XCTAssertTrue(app.staticTexts["此刻，大家在看"].waitForExistence(timeout: 15))
        capture(app, "community-feed-light")
        app.buttons["发现同好"].tap()
        XCTAssertTrue(app.textFields["community-people-search"].waitForExistence(timeout: 10))
        let field = app.textFields["community-people-search"]
        field.tap(); field.typeText("liangjian")
        let person = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "梁间一束光")).firstMatch
        XCTAssertTrue(person.waitForExistence(timeout: 10))
        person.tap()
        XCTAssertTrue(app.staticTexts["留下的亲见"].waitForExistence(timeout: 10))
        let follow = app.buttons["follow-liangjian"]
        XCTAssertTrue(follow.waitForExistence(timeout: 5))
        if follow.label.contains("已关注") || follow.label.contains("互相关注") { follow.tap() }
        follow.tap()
        let followed = XCTNSPredicateExpectation(predicate: NSPredicate(format: "label CONTAINS %@", "已关注"), object: follow)
        XCTAssertEqual(XCTWaiter.wait(for: [followed], timeout: 10), .completed)
        capture(app, "community-profile")
        // Dismiss the discovery sheet; the community root remains at its previous position.
        app.swipeDown(velocity: .fast)
        if !app.buttons["community-scope-following"].isHittable {
            let done = app.buttons["完成"].firstMatch
            if done.exists { done.tap() }
        }
        if !app.buttons["community-scope-following"].isHittable {
            app.navigationBars.buttons.element(boundBy: 0).tap()
            app.buttons["完成"].tap()
        }
        let following = app.buttons["community-scope-following"]
        XCTAssertTrue(following.waitForExistence(timeout: 5))
        following.tap()
        XCTAssertTrue(app.staticTexts["梁间一束光"].waitForExistence(timeout: 10))
        capture(app, "community-following")
        app.buttons["community-mode-toggle"].tap()
        XCTAssertFalse(app.buttons["社区"].exists)
        XCTAssertTrue(app.buttons["切换到联机模式"].exists)
        capture(app, "community-solo-mode")
        app.terminate(); app.launch()
        XCTAssertTrue(app.buttons["切换到联机模式"].waitForExistence(timeout: 10))
        app.buttons["community-mode-toggle"].tap()
        XCTAssertTrue(app.buttons["社区"].waitForExistence(timeout: 10))
        XCTAssertFalse(app.textFields["community-handle"].exists)
        app.buttons["社区"].tap()
        XCTAssertTrue(app.staticTexts["同好之间"].waitForExistence(timeout: 10))
    }

    func testRealRegistrationAndPublicReviewPersistsInSoloMode() {
        let app = XCUIApplication()
        login(app)
        app.buttons["我的"].tap()
        app.buttons["community-account-entry"].tap()
        let logout = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "退出账号")).firstMatch
        for _ in 0..<5 where !logout.isHittable { app.swipeUp() }
        logout.tap()
        XCTAssertTrue(app.textFields["community-handle"].waitForExistence(timeout: 10))
        app.segmentedControls.buttons["创建账号"].tap()
        let handle = "ui" + String(Int(Date().timeIntervalSince1970))
        app.textFields["community-handle"].tap(); app.textFields["community-handle"].typeText(handle)
        app.textFields["community-nickname"].tap(); app.textFields["community-nickname"].typeText("Prototype")
        app.secureTextFields["community-password"].tap(); app.secureTextFields["community-password"].typeText("prototype-test-pass")
        app.swipeUp()
        let consent = app.switches["community-consent"]
        if (consent.value as? String) != "1" { consent.tap() }
        app.buttons["community-auth-submit"].tap()
        XCTAssertTrue(app.buttons["切换到单机模式"].waitForExistence(timeout: 20))
        app.buttons["community-mode-toggle"].tap()
        app.buttons["图鉴"].tap()
        let search = app.textFields["搜索古迹、地点或时代"]
        search.tap(); search.typeText("佛光")
        let result = app.buttons.matching(NSPredicate(format: "label CONTAINS %@ AND label CONTAINS %@", "佛光寺", "细读")).firstMatch
        XCTAssertTrue(result.waitForExistence(timeout: 10)); result.tap()
        XCTAssertFalse(app.otherElements["community-site-section"].exists)
        let edit = app.buttons["edit-review"]
        for _ in 0..<12 where !edit.isHittable { app.swipeUp() }
        XCTAssertTrue(edit.isHittable); edit.tap()
        XCTAssertTrue(app.staticTexts["评分与短评自动公开同步。私人记录请写在到访笔记中。"].waitForExistence(timeout: 5))
        let text = app.textViews["review-text"]
        for _ in 0..<6 where !text.isHittable { app.swipeUp() }
        text.tap(); text.typeText("Test public review " + handle)
        app.buttons["完成"].tap()
        app.buttons["返回"].tap()
        app.buttons["community-mode-toggle"].tap()
        app.buttons["社区"].tap()
        app.swipeDown()
        XCTAssertTrue(app.staticTexts["Test public review " + handle].waitForExistence(timeout: 25))
        capture(app, "community-new-public-review")
        app.terminate(); app.launch()
        app.buttons["社区"].tap()
        XCTAssertTrue(app.staticTexts["Test public review " + handle].waitForExistence(timeout: 15))
    }

    func testCommunityDetailDarkModeAndReportFlow() {
        let app = XCUIApplication()
        login(app)
        app.buttons["我的"].tap()
        let appearance = app.segmentedControls["appearance-picker"]
        appearance.buttons["深色"].tap()
        app.buttons["社区"].tap()
        XCTAssertTrue(app.staticTexts["此刻，大家在看"].waitForExistence(timeout: 10))
        capture(app, "community-feed-dark")
        let temple = app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", "佛光寺东大殿")).firstMatch
        XCTAssertTrue(temple.waitForExistence(timeout: 10)); temple.tap()
        let communitySection = app.descendants(matching: .any)["community-site-section"].firstMatch
        for _ in 0..<7 where !communitySection.isHittable { app.swipeUp() }
        XCTAssertTrue(communitySection.exists)
        let complete = app.staticTexts.matching(NSPredicate(format: "label CONTAINS %@", "人完整评分")).firstMatch
        for _ in 0..<5 where !complete.isHittable { app.swipeUp() }
        XCTAssertTrue(complete.exists)
        capture(app, "community-monument-score-dark")
        let all = app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@ AND label CONTAINS %@", "全部", "份评价")).firstMatch
        for _ in 0..<8 where !all.isHittable { app.swipeUp() }
        XCTAssertTrue(all.isHittable); all.tap()
        XCTAssertTrue(app.segmentedControls.buttons["全部评价"].waitForExistence(timeout: 10))
        capture(app, "community-monument-reviews-dark")
        let menu = app.buttons["评价操作"].firstMatch
        XCTAssertTrue(menu.waitForExistence(timeout: 10)); menu.tap()
        app.buttons["举报评价"].tap()
        XCTAssertTrue(app.buttons["提交举报"].waitForExistence(timeout: 5)); app.buttons["提交举报"].tap()
        XCTAssertTrue(app.staticTexts["举报已提交，我们会核查这份评价。"].waitForExistence(timeout: 10))
        let firstReview = app.descendants(matching: .any).matching(NSPredicate(format: "identifier BEGINSWITH %@", "community-review-")).firstMatch
        let blockedReviewID = firstReview.identifier
        app.buttons["评价操作"].firstMatch.tap()
        app.buttons["屏蔽此用户"].tap()
        let blockedReview = app.descendants(matching: .any)[blockedReviewID].firstMatch
        let removed = XCTNSPredicateExpectation(predicate: NSPredicate(format: "exists == false"), object: blockedReview)
        XCTAssertEqual(XCTWaiter.wait(for: [removed], timeout: 10), .completed)
        app.buttons["community-mode-toggle"].tap()
        XCTAssertFalse(app.segmentedControls.buttons["全部评价"].exists)
        XCTAssertFalse(app.buttons["社区"].exists)
        capture(app, "community-detail-back-to-solo")
        // Restore light appearance for the reviewable prototype.
        if app.buttons["返回"].exists { app.buttons["返回"].tap() }
        app.buttons["我的"].tap()
        appearance.buttons["亮色"].tap()
        app.buttons["community-mode-toggle"].tap()
        app.buttons["社区"].tap()
        XCTAssertTrue(app.staticTexts["此刻，大家在看"].waitForExistence(timeout: 10))
        capture(app, "community-feed-final-light")
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name; attachment.lifetime = .keepAlways; add(attachment)
    }
}
