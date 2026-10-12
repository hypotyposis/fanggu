import XCTest

final class LocalizationUITests: XCTestCase {
    override func setUpWithError() throws { continueAfterFailure = false }

    // Language names are endonyms, and the seals are brand marks; both keep their own script.
    private let endonyms = ["简体中文", "日本語"]
    private let brandMarks = ["访古", "之印", "访 古", "亲\\n见", "访"]

    func testEnglishInterfaceShowsNoChineseOnMainScreens() {
        let app = XCUIApplication.isolated(language: "en", locale: "en_US")
        app.launchForTest()
        XCTAssertTrue(app.staticTexts["Monument Catalog"].waitForExistence(timeout: 10))
        let search = app.textFields["Search monuments, places or periods"]
        XCTAssertTrue(search.exists)
        assertNoCharacters(matching: "\\p{Han}", in: app, screen: "catalog")
        capture(app, "en-catalog")

        // The floating tab bar collapses while the keyboard is up, so tour the tabs before typing.
        for (tab, title, screen) in [("Footprints", "My Footprints", "footprints"), ("Timeline", "Timeline", "timeline"), ("Me", "My Fanggu", "me")] {
            app.buttons[tab].tap()
            XCTAssertTrue(app.staticTexts[title].waitForExistence(timeout: 5), title)
            assertNoCharacters(matching: "\\p{Han}", in: app, screen: screen)
            capture(app, "en-\(screen)")
        }
        app.reveal(app.buttons["language-settings"], attempts: 40)
        XCTAssertTrue(app.buttons["language-settings"].exists)

        app.buttons["Catalog"].tap()
        XCTAssertTrue(search.waitForExistence(timeout: 5))
        let count = app.staticTexts["catalog-result-count"]
        let foguang = app.buttons["catalog-site-foguang"]
        search.tap(); search.typeText("Foguang")
        XCTAssertTrue(foguang.waitForExistence(timeout: 5), "The English name finds the monument")
        XCTAssertTrue(count.label.hasSuffix("monuments") || count.label.hasSuffix("monument"), count.label)
        XCTAssertNotEqual(count.label, "0 monuments")
        app.buttons["clear-catalog-search"].tap()
        search.tap(); search.typeText("佛光寺")
        XCTAssertTrue(foguang.waitForExistence(timeout: 5), "Chinese names still find monuments in English")
        XCTAssertNotEqual(count.label, "0 monuments")
    }

    func testJapaneseInterfaceUsesJapaneseLabels() {
        let app = XCUIApplication.isolated(language: "ja", locale: "ja_JP")
        app.launchForTest()
        XCTAssertTrue(app.staticTexts["古跡図鑑"].waitForExistence(timeout: 10))
        XCTAssertTrue(app.textFields["古跡・場所・時代を検索"].exists)
        let count = app.staticTexts["catalog-result-count"]
        XCTAssertTrue(count.label.hasPrefix("全") && count.label.hasSuffix("件"), count.label)
        // Simplified-only forms would mean an untranslated Chinese label slipped through.
        let simplified = "[这们为东门马长书车说贝见风鸟龙广实层庙图齐汉经阁乐县开关观觉记论设证译读贵资过还进远连选铁铜银钟镇间问阙陕顶须顺题飞驿鸡鹤龟时个发访迹录评维愿]"
        assertNoCharacters(matching: simplified, in: app, screen: "catalog")
        capture(app, "ja-catalog")
        for (tab, title, screen) in [("足跡", "わたしの足跡", "footprints"), ("年表", "年表", "timeline"), ("マイページ", "わたしの訪古", "me")] {
            app.buttons[tab].tap()
            XCTAssertTrue(app.staticTexts[title].waitForExistence(timeout: 5), title)
            assertNoCharacters(matching: simplified, in: app, screen: screen)
            capture(app, "ja-\(screen)")
        }
    }

    func testBuildingCollectionIsLocalizedInEnglishAndJapanese() {
        for (language, locale, actionTitle) in [
            ("en", "en_US", "Record today’s visit for the group"),
            ("ja", "ja_JP", "建築群をまとめて今日の訪問に記録")
        ] {
            let app = XCUIApplication.isolated(language: language, locale: locale)
            app.launchForTest(site: "kaiyuan_xumi")
            let chip = app.descendants(matching: .any)["curation-chip-kaiyuan"].firstMatch
            XCTAssertTrue(chip.waitForExistence(timeout: 10))
            app.reveal(chip)
            chip.tap()
            let action = app.buttons["record-collection-today"]
            XCTAssertTrue(action.waitForExistence(timeout: 5))
            XCTAssertEqual(action.label, actionTitle)
            if language == "en" { assertNoCharacters(matching: "\\p{Han}", in: app, screen: "collection") }
            capture(app, "\(language)-building-collection")
            action.tap()
            XCTAssertFalse(action.isEnabled, "One tap completes the catalogued collection")
            app.terminate()
        }
    }

    private func assertNoCharacters(matching pattern: String, in app: XCUIApplication, screen: String,
                                    file: StaticString = #filePath, line: UInt = #line) {
        var tree = app.debugDescription
        for name in endonyms { tree = tree.replacingOccurrences(of: name, with: "") }
        let found = tree.split(separator: "\n")
            .filter { line in !brandMarks.contains { line.hasSuffix("label: '\($0)'") } }
            .filter { $0.range(of: pattern, options: .regularExpression) != nil }
        XCTAssertTrue(found.isEmpty, "Untranslated text on \(screen):\n\(found.prefix(8).joined(separator: "\n"))", file: file, line: line)
    }

    private func capture(_ app: XCUIApplication, _ name: String) {
        let attachment = XCTAttachment(screenshot: app.screenshot())
        attachment.name = name
        attachment.lifetime = .keepAlways
        add(attachment)
    }
}
