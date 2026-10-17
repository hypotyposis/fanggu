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

    func testBackToTopIsLocalized() {
        for (language, locale, title, actionTitle) in [
            ("en", "en_US", "Monument Catalog", "Back to top"),
            ("ja", "ja_JP", "古跡図鑑", "先頭に戻る")
        ] {
            let app = XCUIApplication.isolated(language: language, locale: locale)
            app.launchForTest()
            let heading = app.staticTexts[title]
            XCTAssertTrue(heading.waitForExistence(timeout: 10))
            let backToTop = app.buttons["catalog-back-to-top"]
            for _ in 0..<8 where !backToTop.exists { app.dragPage() }
            XCTAssertTrue(backToTop.isHittable)
            XCTAssertEqual(backToTop.label, actionTitle)
            capture(app, "\(language)-back-to-top")
            backToTop.tap()
            XCTAssertTrue(backToTop.waitForNonExistence(timeout: 5))
            XCTAssertTrue(heading.isHittable)
            app.terminate()
        }
    }

    /// What one language calls the controls the community tour finds by label.
    private struct CommunityTour {
        let language, locale, pattern: String
        let me, community, heading, goSolo, createAccount, connectionSettings, guide, explorer: String
        let account, viewProfile, blocked, editProfile, report, cancel, done: String
    }

    /// Signs in for real and visits every community page in English and Japanese. Needs the sample
    /// service from community/README.md on 127.0.0.1:8787 (a scratch database is enough). Nicknames,
    /// bios and review texts are user content, so they are read from the service and left out.
    func testCommunityPagesAreLocalized() throws {
        let userContent = try communityUserContent()
        let tours = [
            CommunityTour(language: "en", locale: "en_US", pattern: "\\p{Han}", me: "Me", community: "Community",
                          heading: "Among Fellow Explorers", goSolo: "Switch to solo mode", createAccount: "Create Account",
                          connectionSettings: "Prototype Connection Settings",
                          guide: "Community Guide", explorer: "Explorer", account: "My Account", viewProfile: "View my public profile",
                          blocked: "Blocked", editProfile: "Edit Profile",
                          report: "Report Review", cancel: "Cancel", done: "Done"),
            CommunityTour(language: "ja", locale: "ja_JP", pattern: simplified, me: "マイページ", community: "コミュニティ",
                          heading: "仲間とともに", goSolo: "ひとりモードに切り替え", createAccount: "アカウント作成",
                          connectionSettings: "プロトタイプの接続設定",
                          guide: "コミュニティの説明", explorer: "訪古者", account: "マイアカウント", viewProfile: "公開プロフィールを見る",
                          blocked: "ブロック中", editProfile: "プロフィールを編集",
                          report: "評価を報告", cancel: "キャンセル", done: "完了")
        ]
        for tour in tours {
            let app = XCUIApplication.isolated(language: tour.language, locale: tour.locale)
            app.launchForTest(site: "foguang")
            let check = { (screen: String) in
                self.assertNoCharacters(matching: tour.pattern, in: app, screen: "\(tour.language) \(screen)", ignoring: userContent,
                                        citations: true)
            }
            let back = { app.navigationBars.buttons.element(boundBy: 0).tap() }

            // Signing in: both modes, the connection settings and the rules page.
            app.buttons["community-mode-toggle"].tap()
            let handle = app.textFields["community-handle"]
            XCTAssertTrue(handle.waitForExistence(timeout: 10))
            check("sign-in")
            app.segmentedControls.buttons[tour.createAccount].tap()
            XCTAssertTrue(app.textFields["community-nickname"].waitForExistence(timeout: 5))
            check("registration")
            app.segmentedControls.buttons.element(boundBy: 0).tap()
            let settings = app.buttons[tour.connectionSettings]
            XCTAssertTrue(app.reveal(settings)); settings.tap()
            XCTAssertTrue(app.textFields["community-server-url"].waitForExistence(timeout: 5))
            check("connection settings")
            let rulesLink = app.buttons["community-sign-in-rules"]
            XCTAssertTrue(app.reveal(rulesLink)); rulesLink.tap()
            XCTAssertTrue(app.navigationBars[tour.guide].waitForExistence(timeout: 5))
            check("rules")
            back()
            XCTAssertTrue(app.reveal(handle, up: false, attempts: 10))
            handle.tap(); handle.typeText("tingyu")
            let password = app.secureTextFields["community-password"]
            password.tap(); password.typeText("fanggu-demo-2026")
            let consent = app.switches["community-consent"]
            XCTAssertTrue(app.reveal(consent))
            if (consent.value as? String) != "1" { consent.tap() }
            let submit = app.buttons["community-auth-submit"]
            XCTAssertTrue(app.reveal(submit)); submit.tap()
            XCTAssertTrue(app.buttons[tour.goSolo].waitForExistence(timeout: 20), "Start the sample community service first")

            // The monument's community section, its review list, the review menu and the report sheet.
            let allReviews = app.buttons["community-all-reviews"]
            XCTAssertTrue(app.reveal(allReviews, attempts: 16))
            check("monument community")
            allReviews.tap()
            let actions = app.buttons["community-review-actions"].firstMatch
            XCTAssertTrue(actions.waitForExistence(timeout: 10))
            check("monument reviews")
            actions.tap()
            let report = app.buttons[tour.report]
            XCTAssertTrue(report.waitForExistence(timeout: 5))
            check("review menu")
            report.tap()
            let cancel = app.buttons[tour.cancel]
            XCTAssertTrue(cancel.waitForExistence(timeout: 5))
            check("report")
            cancel.tap()
            XCTAssertTrue(cancel.waitForNonExistence(timeout: 5))
            back()
            app.buttons["detail-back"].tap()

            // The community page, the following feed, people search and someone's profile.
            app.buttons[tour.community].tap()
            XCTAssertTrue(app.staticTexts[tour.heading].waitForExistence(timeout: 10))
            let firstReview = app.descendants(matching: .any)
                .matching(NSPredicate(format: "identifier BEGINSWITH %@", "community-review-")).firstMatch
            XCTAssertTrue(firstReview.waitForExistence(timeout: 15))
            check("feed")
            capture(app, "\(tour.language)-community-feed")
            for page in 1...3 { app.dragPage(); check("feed page \(page)") }
            for _ in 0..<4 { app.dragPage(up: false) }
            let following = app.buttons["community-scope-following"]
            XCTAssertTrue(app.reveal(following, up: false)); following.tap()
            XCTAssertTrue(following.isSelected)
            check("following feed")
            app.buttons["community-scope-latest"].tap()
            app.buttons["community-find-people"].tap()
            let search = app.textFields["community-people-search"]
            XCTAssertTrue(search.waitForExistence(timeout: 10))
            XCTAssertTrue(app.buttons["follow-songfeng"].waitForExistence(timeout: 10))
            check("people")
            search.tap(); search.typeText("songfeng")
            let person = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "松风")).firstMatch
            XCTAssertTrue(person.waitForExistence(timeout: 10)); person.tap()
            XCTAssertTrue(app.navigationBars[tour.explorer].waitForExistence(timeout: 10))
            XCTAssertTrue(app.buttons["follow-songfeng"].waitForExistence(timeout: 10))
            check("profile")
            capture(app, "\(tour.language)-community-profile")
            back()
            app.navigationBars.buttons[tour.done].tap()

            // The account page, its block list, the public profile and the profile editor.
            app.buttons[tour.me].tap()
            app.buttons["community-account-entry"].tap()
            XCTAssertTrue(app.navigationBars[tour.account].waitForExistence(timeout: 10))
            check("account")
            capture(app, "\(tour.language)-community-account")
            let blockList = app.buttons["community-block-list"]
            XCTAssertTrue(app.reveal(blockList))
            check("account, lower part")
            blockList.tap()
            XCTAssertTrue(app.navigationBars[tour.blocked].waitForExistence(timeout: 5))
            check("block list")
            back()
            let publicProfile = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", tour.viewProfile)).firstMatch
            XCTAssertTrue(app.reveal(publicProfile, up: false, attempts: 10)); publicProfile.tap()
            let edit = app.buttons[tour.editProfile]
            XCTAssertTrue(edit.waitForExistence(timeout: 10))
            check("own profile")
            edit.tap()
            let editor = app.navigationBars[tour.editProfile]
            XCTAssertTrue(editor.waitForExistence(timeout: 5))
            check("profile editor")
            editor.buttons[tour.done].tap()
            XCTAssertTrue(editor.waitForNonExistence(timeout: 5))
            app.terminate()
        }
    }

    private let simplified = "[这们为东门马长书车说贝见风鸟龙广实层庙图齐汉经阁乐县开关观觉记论设证译读贵资过还进远连选铁铜银钟镇间问阙陕顶须顺题飞驿鸡鹤龟时个发访迹录评维愿]"

    /// Nicknames, bios and review texts on the sample service, longest first so a nickname inside a
    /// review text never leaves a fragment behind.
    private func communityUserContent() throws -> [String] {
        func fetch(_ path: String, _ query: [URLQueryItem]) throws -> [String: Any] {
            var components = URLComponents(string: "http://127.0.0.1:8787/v1/" + path)!
            components.queryItems = query
            var body: Data?
            let done = expectation(description: path)
            URLSession.shared.dataTask(with: components.url!) { data, _, _ in body = data; done.fulfill() }.resume()
            wait(for: [done], timeout: 10)
            let data = try XCTUnwrap(body, "Start the sample community service on 127.0.0.1:8787 (community/README.md)")
            return try XCTUnwrap(JSONSerialization.jsonObject(with: data) as? [String: Any])
        }
        var texts = Set<String>()
        func add(_ user: Any?) {
            for key in ["nickname", "bio"] { if let value = (user as? [String: Any])?[key] as? String, !value.isEmpty { texts.insert(value) } }
        }
        for user in try fetch("users", [URLQueryItem(name: "q", value: "")])["items"] as? [[String: Any]] ?? [] { add(user) }
        var cursor: String?
        repeat {
            let page = try fetch("reviews", [URLQueryItem(name: "scope", value: "latest")] + (cursor.map { [URLQueryItem(name: "before", value: $0)] } ?? []))
            for review in page["items"] as? [[String: Any]] ?? [] {
                add(review["author"])
                if let text = review["text"] as? String, !text.isEmpty { texts.insert(text) }
            }
            cursor = page["nextCursor"] as? String
        } while cursor != nil
        return texts.sorted { $0.count > $1.count }
    }

    /// `citations` leaves out the source links on a monument page ("Title ↗"), whose titles are cited as published.
    private func assertNoCharacters(matching pattern: String, in app: XCUIApplication, screen: String, ignoring userContent: [String] = [],
                                    citations: Bool = false, file: StaticString = #filePath, line: UInt = #line) {
        var tree = app.debugDescription
        for name in endonyms + userContent { tree = tree.replacingOccurrences(of: name, with: "") }
        let found = tree.split(separator: "\n")
            .filter { line in !brandMarks.contains { line.hasSuffix("label: '\($0)'") } }
            .filter { line in !(citations && line.hasSuffix(" ↗'")) }
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
