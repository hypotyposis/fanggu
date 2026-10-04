import XCTest

final class FangguUITests: XCTestCase {
    /// The catalogue's first wishlist entry on a fresh simulator. Review and arrival tests deep-link
    /// to it instead of walking there; catalog navigation keeps its own tests below.
    private let reviewSite = "liyeque"

    func testTabAndAppearanceSwitchingLatency() {
        let app = XCUIApplication()
        app.launchForTest()
        func switchTab(_ title: String, expected: String) {
            let start = ProcessInfo.processInfo.systemUptime
            app.buttons[title].tap()
            XCTAssertTrue(app.staticTexts[expected].waitForExistence(timeout: 5))
            let elapsed = ProcessInfo.processInfo.systemUptime - start
            print("SWITCH_LATENCY tab=\(title) seconds=\(elapsed)")
            XCTAssertLessThan(elapsed, 5, "Tab switching must not stall the main thread")
            if title == "年表" { capture(app, "switching-timeline") }
        }
        for _ in 0..<2 {
            switchTab("足迹", expected: "我的足迹")
            switchTab("年表", expected: "东汉至今 · 东亚与东南亚")
            switchTab("我的", expected: "亲见 · 所愿 · 私人记录")
            let appearance = app.segmentedControls["appearance-picker"]
            for mode in ["亮色", "深色", "跟随系统"] {
                let start = ProcessInfo.processInfo.systemUptime
                appearance.buttons[mode].tap()
                XCTAssertTrue(appearance.buttons[mode].isSelected)
                let elapsed = ProcessInfo.processInfo.systemUptime - start
                print("SWITCH_LATENCY appearance=\(mode) seconds=\(elapsed)")
                XCTAssertLessThan(elapsed, 5, "Appearance changes must not stall the main thread")
            }
            switchTab("图鉴", expected: "古迹图鉴")
        }
    }

    func testTokyoCatalogFilterAliasAndDetailReturn() {
        let app = XCUIApplication()
        app.launchForTest()
        app.buttons["筛选"].tap()
        app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "全部国家")).firstMatch.tap()
        app.buttons["日本"].tap()
        app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", "省份")).firstMatch.tap()
        app.buttons["东京都"].tap()
        app.buttons["完成"].tap()
        let search = app.textFields["搜索古迹、地点或时代"]
        XCTAssertTrue(search.waitForExistence(timeout: 10))
        search.tap()
        search.typeText("Nezu")
        let result = app.buttons.matching(NSPredicate(format: "label CONTAINS %@ AND label CONTAINS %@", "根津神社楼门", "细读")).firstMatch
        XCTAssertTrue(result.waitForExistence(timeout: 5))
        result.tap()
        XCTAssertTrue(app.buttons["补记到访"].waitForExistence(timeout: 5))
        XCTAssertTrue(app.staticTexts["根津神社楼门"].exists)
        XCTAssertTrue(app.descendants(matching: .any)["detail-artwork"].firstMatch.exists)
        capture(app, "tokyo-nezu-detail")
        app.buttons["返回"].tap()
        XCTAssertEqual(search.value as? String, "Nezu")
        XCTAssertTrue(result.exists)
        capture(app, "tokyo-filter-return")
    }

    func testAppearancePersistsAndCoversNativeScreens() {
        let app = XCUIApplication()
        app.launchForTest()
        app.buttons["我的"].tap()
        let appearance = app.segmentedControls["appearance-picker"]
        XCTAssertTrue(appearance.waitForExistence(timeout: 10))
        appearance.buttons["亮色"].tap()
        XCTAssertTrue(appearance.buttons["亮色"].isSelected)
        capture(app, "light-library")

        app.relaunch()
        app.buttons["我的"].tap()
        XCTAssertTrue(appearance.waitForExistence(timeout: 10))
        XCTAssertTrue(appearance.buttons["亮色"].isSelected, "Appearance must survive relaunch")

        app.buttons["足迹"].tap()
        XCTAssertTrue(app.staticTexts["我的足迹"].waitForExistence(timeout: 10))
        capture(app, "light-map")
        app.buttons["年表"].tap()
        capture(app, "light-timeline")
        app.buttons["图鉴"].tap()
        capture(app, "light-catalog")
        app.buttons["筛选"].tap()
        XCTAssertTrue(app.buttons["完成"].waitForExistence(timeout: 5))
        capture(app, "light-filters")
        app.buttons["完成"].tap()
        app.buttons["关于访古"].tap()
        XCTAssertTrue(app.buttons["关闭"].waitForExistence(timeout: 5))
        capture(app, "light-about")
        app.buttons["关闭"].tap()
        app.buttons.matching(NSPredicate(format: "label BEGINSWITH %@", "未标记")).firstMatch.tap()
        openFirstCatalogSite(in: app)
        capture(app, "light-detail")
        let visit = app.buttons["补记到访"].exists ? app.buttons["补记到访"] : app.buttons["编辑到访记录"]
        app.reveal(visit, up: false)
        visit.tap()
        XCTAssertTrue(app.buttons["取消"].waitForExistence(timeout: 5))
        capture(app, "light-visit-editor")
        app.buttons["取消"].tap()
        let review = app.buttons["edit-review"]
        app.reveal(review)
        review.tap()
        XCTAssertTrue(app.buttons["完成"].waitForExistence(timeout: 5))
        capture(app, "light-review-editor")
        app.buttons["完成"].tap()
        app.buttons["返回"].tap()
        app.buttons["我的"].tap()
        appearance.buttons["深色"].tap()
        XCTAssertTrue(appearance.buttons["深色"].isSelected)
        capture(app, "dark-library")
        appearance.buttons["跟随系统"].tap()
        XCTAssertTrue(appearance.buttons["跟随系统"].isSelected)
    }

    func testNativeSectionsStayAvailable() {
        let app = XCUIApplication()
        app.launchForTest()
        app.buttons["足迹"].tap()
        XCTAssertTrue(app.staticTexts["我的足迹"].waitForExistence(timeout: 10))
        capture(app, "map")
        app.buttons["年表"].tap()
        XCTAssertTrue(app.staticTexts["东汉至今 · 东亚与东南亚"].waitForExistence(timeout: 10))
        capture(app, "timeline")
        app.buttons["我的"].tap()
        XCTAssertTrue(app.staticTexts["亲见 · 所愿 · 私人记录"].waitForExistence(timeout: 10))
        app.reveal(app.buttons["导入备份"], attempts: 40)
        XCTAssertTrue(app.buttons["导入备份"].exists)
        XCTAssertFalse(app.buttons["导入网页或 App 备份"].exists)
        capture(app, "library")
    }

    func testSixDimensionReleaseAutosavesAndResets() {
        let app = XCUIApplication()
        app.launchForTest(site: reviewSite, review: true)
        app.waitForReviewEditor()
        // This test runs on a disposable simulator, with all changes made through the UI.
        let reset = app.buttons["reset-dimensions"]
        if reset.isEnabled { reset.tap() }
        let axes = ["eraRarity", "authenticity", "construction", "art", "scale", "setting"]
        func axis(_ key: String) -> XCUIElement { app.descendants(matching: .any)["radar-axis-\(key)"].firstMatch }
        let era = axis("eraRarity")
        XCTAssertTrue(era.waitForExistence(timeout: 5))
        XCTAssertFalse(app.buttons["保存"].exists)
        XCTAssertFalse(app.buttons["取消"].exists)
        for key in axes { XCTAssertEqual(axis(key).value as? String, "—，未评分") }
        capture(app, "six-dimension-empty")

        let anchoredVertex = axis("art")
        let chartY = anchoredVertex.frame.minY
        let start = era.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
        start.press(forDuration: 0.1, thenDragTo: start.withOffset(CGVector(dx: 0, dy: -100)))
        XCTAssertEqual(era.value as? String, "A，卓越")
        XCTAssertEqual(anchoredVertex.frame.minY, chartY, accuracy: 2, "Dragging a vertex must not scroll the sheet")
        for key in axes.dropFirst() { XCTAssertEqual(axis(key).value as? String, "—，未评分") }
        let sideStart = era.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
        sideStart.press(forDuration: 0.1, thenDragTo: sideStart.withOffset(CGVector(dx: 70, dy: 0)))
        XCTAssertEqual(era.value as? String, "A，卓越", "Sideways movement must stay on the selected axis")
        // Terminate while the editor is still open: release itself must have saved.
        app.relaunch()
        app.waitForReviewEditor()
        XCTAssertEqual(era.value as? String, "A，卓越", "Release must persist without closing or tapping Save")
        app.buttons["reset-dimensions"].tap()

        // Set a complete, deliberately uneven profile; other axes must remain independent.
        let translations: [(String, CGFloat, CGFloat)] = [
            ("eraRarity", 0, -90), ("authenticity", 90, -52),
            ("construction", -90, -52), ("art", 0, 24),
            ("scale", 0, 0), ("setting", 90, -52)
        ]
        for (key, dx, dy) in translations {
            let handle = axis(key)
            let origin = handle.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
            origin.press(forDuration: 0.1, thenDragTo: origin.withOffset(CGVector(dx: dx, dy: dy)))
        }
        let expected = axes.map { axis($0).value as? String }
        XCTAssertEqual(expected, ["A，卓越", "A，卓越", "E，较弱", "B，突出", "C，有看点", "E，较弱"])
        capture(app, "six-dimension-profile")
        app.buttons["完成"].tap()
        XCTAssertTrue(app.descendants(matching: .any)["radar-summary-eraRarity"].firstMatch.waitForExistence(timeout: 5))
        app.relaunch()
        app.waitForReviewEditor()
        for (index, key) in axes.enumerated() { XCTAssertEqual(axis(key).value as? String, expected[index]) }

        app.buttons["reset-dimensions"].tap()
        app.relaunch()
        app.waitForReviewEditor()
        for key in axes { XCTAssertEqual(axis(key).value as? String, "—，未评分") }
        let beforeScroll = era.frame.minY
        let center = era.coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
            .withOffset(CGVector(dx: 0, dy: (axis("art").frame.midY - era.frame.midY) / 2))
        center.press(forDuration: 0.1, thenDragTo: center.withOffset(CGVector(dx: 0, dy: -90)))
        XCTAssertLessThan(era.frame.minY, beforeScroll - 30, "Blank space in the chart must still let the page scroll")
        for key in axes { XCTAssertEqual(axis(key).value as? String, "—，未评分") }
        app.buttons["完成"].tap()
    }

    func testSixDimensionLowGradesStayIndividuallyDraggable() {
        let app = XCUIApplication()
        // Dark appearance comes from the defaults argument domain, so no walk through 我的 is needed.
        app.launchForTest(site: reviewSite, review: true, arguments: ["-fanggu.appearance", "dark"])
        app.waitForReviewEditor()
        if app.buttons["reset-dimensions"].isEnabled { app.buttons["reset-dimensions"].tap() }
        let axes = ["eraRarity", "authenticity", "construction", "art", "scale", "setting"]
        func handle(_ key: String) -> XCUIElement { app.descendants(matching: .any)["radar-axis-\(key)"].firstMatch }
        for (index, key) in axes.enumerated() {
            let angle = Double(index) * .pi / 3 - .pi / 2
            let origin = handle(key).coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
            origin.press(forDuration: 0.1, thenDragTo: origin.withOffset(CGVector(dx: -cos(angle) * 120, dy: -sin(angle) * 120)))
        }
        for key in axes { XCTAssertEqual(handle(key).value as? String, "E，较弱") }
        capture(app, "six-dimension-low-grades")
        for (index, key) in axes.enumerated() {
            let angle = Double(index) * .pi / 3 - .pi / 2
            let origin = handle(key).coordinate(withNormalizedOffset: CGVector(dx: 0.5, dy: 0.5))
            origin.press(forDuration: 0.1, thenDragTo: origin.withOffset(CGVector(dx: cos(angle) * 120, dy: sin(angle) * 120)))
            for (otherIndex, other) in axes.enumerated() {
                XCTAssertEqual(handle(other).value as? String, otherIndex <= index ? "A，卓越" : "E，较弱",
                               "Overlapping touch regions must not edit a neighbour")
            }
        }
        capture(app, "six-dimension-full-grades")
        app.buttons["完成"].tap()
    }

    func testReviewShortTextAutosavesAndClearIsImmediate() {
        let app = XCUIApplication()
        app.launchForTest(site: reviewSite, review: true)
        app.waitForReviewEditor()
        let field = app.textViews["review-text"]
        app.reveal(field, attempts: 6)
        XCTAssertTrue(field.isHittable)
        field.tap()
        if let existing = field.value as? String, !existing.isEmpty {
            field.typeText(String(repeating: XCUIKeyboardKey.delete.rawValue, count: existing.count))
        }
        field.typeText("auto-review")
        let status = app.staticTexts["review-autosave-status"]
        let saved = XCTNSPredicateExpectation(predicate: NSPredicate(format: "label == %@", "松手即保存，短评自动保存。"), object: status)
        XCTAssertEqual(XCTWaiter.wait(for: [saved], timeout: 5), .completed)
        // Do not use Complete: the text must survive termination by itself.
        app.relaunch()
        app.waitForReviewEditor()
        XCTAssertEqual(field.value as? String, "auto-review")
        app.reveal(field, attempts: 6)
        field.tap(); field.typeText("-extra")
        let editedText = field.value as? String
        XCTAssertTrue(editedText?.contains("-extra") == true)
        app.buttons["完成"].tap()
        openReview(in: app)
        XCTAssertEqual(field.value as? String, editedText, "Closing must flush any pending text debounce")
        let clear = app.buttons["清除评价"]
        app.reveal(clear, attempts: 6)
        clear.tap()
        app.relaunch()
        app.waitForReviewEditor()
        XCTAssertEqual(field.value as? String, "")
        let era = app.descendants(matching: .any)["radar-axis-eraRarity"].firstMatch
        XCTAssertEqual(era.value as? String, "—，未评分")
        XCTAssertFalse(app.buttons["保存"].exists)
        app.buttons["完成"].tap()
    }

    func testCatalogOpensNativeDetail() {
        let app = XCUIApplication()
        app.launchForTest()
        XCTAssertTrue(app.buttons["图鉴"].waitForExistence(timeout: 10))
        openFirstCatalogSite(in: app)
        XCTAssertTrue(app.staticTexts["我的访古记"].waitForExistence(timeout: 10))
        XCTAssertTrue(app.staticTexts["我的评价"].exists)
        XCTAssertTrue(app.buttons["补记到访"].exists || app.buttons["编辑到访记录"].exists)
        capture(app, "detail")
    }

    func testLargeCardShowsArrivalSlider() {
        let app = XCUIApplication()
        app.launchForTest()
        let displayButton = app.buttons["大图"]
        XCTAssertTrue(displayButton.waitForExistence(timeout: 10))
        displayButton.tap()
        let slider = app.descendants(matching: .any)["到访打卡"].firstMatch
        app.reveal(slider)
        XCTAssertTrue(slider.isHittable)
    }

    func testArrivalOnlySavesAfterReleasingAtTheEnd() {
        let app = XCUIApplication()
        app.launchForTest(site: reviewSite)
        XCTAssertTrue(app.buttons["edit-visit"].waitForExistence(timeout: 10))

        let statusMenu = app.buttons["visit-status-menu"]
        if statusMenu.exists {
            app.reveal(statusMenu, up: false)
            statusMenu.tap()
            app.buttons["改为未标记"].tap()
            app.buttons["关闭提示"].tap()
        }
        let slider = app.descendants(matching: .any)["到访打卡"].firstMatch
        app.reveal(slider)
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
        XCTAssertTrue(app.buttons["visit-status-menu"].waitForExistence(timeout: 5))
    }

    func testMapMarkersAndSearchOpenVisitedSites() {
        let app = XCUIApplication()
        app.launchForTest()
        app.buttons["足迹"].tap()
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
        app.reveal(search, attempts: 4)
        XCTAssertTrue(search.isHittable)
        search.tap()
        search.typeText("no-such-place")
        XCTAssertTrue(app.staticTexts["没有匹配的到访地点"].waitForExistence(timeout: 5))
        search.typeText(String(repeating: XCUIKeyboardKey.delete.rawValue, count: 13))
        app.dragPage()
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
        let sites = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "细读"))
        for _ in 0..<5 {
            if let visible = sites.allElementsBoundByIndex.first(where: { $0.isHittable }) {
                visible.tap()
                return
            }
            app.dragPage()
        }
        XCTFail("At least one catalog site must be reachable")
    }

    private func openReview(in app: XCUIApplication) {
        let button = app.buttons["edit-review"]
        app.reveal(button, attempts: 12)
        XCTAssertTrue(button.isHittable)
        button.tap()
        XCTAssertTrue(app.buttons["完成"].waitForExistence(timeout: 5))
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
