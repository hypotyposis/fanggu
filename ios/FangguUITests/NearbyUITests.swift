import CoreLocation
import XCTest

/// Distance features with an injected location. Permission alerts are answered when they appear;
/// a simulator that already granted location simply skips that step.
final class NearbyUITests: XCTestCase {
    override func setUpWithError() throws {
        continueAfterFailure = false
    }

    override func tearDownWithError() throws {
        XCUIDevice.shared.location = nil
    }

    private func allowLocationIfAsked() {
        let springboard = XCUIApplication(bundleIdentifier: "com.apple.springboard")
        let allow = springboard.buttons["Allow While Using App"]
        if allow.waitForExistence(timeout: 5) { allow.tap() }
    }

    func testDistanceSortPutsTheNearestMonumentFirstWithDistanceAndHereHint() {
        // 336 m from 少林寺初祖庵, which has its own coordinate; the next monument is over 6 km away.
        XCUIDevice.shared.location = XCUILocation(location: CLLocation(latitude: 34.512, longitude: 112.930))
        let app = XCUIApplication()
        app.launch()
        let sortMenu = app.buttons["心愿优先"]
        XCTAssertTrue(sortMenu.waitForExistence(timeout: 10))
        sortMenu.tap()
        app.buttons["按距离"].tap()
        allowLocationIfAsked()
        let rows = app.buttons.matching(NSPredicate(format: "label CONTAINS %@", "细读"))
        let first = rows.element(boundBy: 0)
        let nearest = NSPredicate(format: "label CONTAINS %@ AND label CONTAINS %@ AND label CONTAINS %@", "少林寺初祖庵", "距此地约", "就在附近")
        XCTAssertTrue(first.waitForExistence(timeout: 20))
        let sorted = expectation(for: nearest, evaluatedWith: first)
        wait(for: [sorted], timeout: 20)
        XCTAssertTrue(app.buttons["按距离"].exists, "the sort button now carries the chosen order")
        XCTAssertFalse(app.staticTexts["未授权定位，可在系统设置中开启；其他排序与筛选不受影响。"].exists)
        first.tap()
        XCTAssertTrue(app.descendants(matching: .any)["detail-here-hint"].firstMatch.waitForExistence(timeout: 10))
        app.buttons["返回"].tap()
        XCTAssertTrue(first.waitForExistence(timeout: 10))
        app.buttons["按距离"].tap()
        app.buttons["心愿优先"].tap()
        XCTAssertTrue(app.buttons["心愿优先"].waitForExistence(timeout: 5), "other orders remain available")
    }

    func testNearbyFilterShowsEmptyStateFarFromEveryMonumentAndClosesWithOneTap() {
        // Mid-Pacific: thousands of kilometres from every catalogued place.
        XCUIDevice.shared.location = XCUILocation(location: CLLocation(latitude: -40.0, longitude: -150.0))
        let app = XCUIApplication()
        app.launch()
        let count = app.staticTexts["catalog-result-count"]
        XCTAssertTrue(count.waitForExistence(timeout: 10))
        let before = count.label
        XCTAssertNotEqual(before, "共 0 处")
        app.buttons["nearby-filter"].tap()
        allowLocationIfAsked()
        XCTAssertTrue(app.staticTexts["30 公里内没有收录的古迹"].waitForExistence(timeout: 20))
        XCTAssertEqual(count.label, "共 0 处")
        app.buttons["close-nearby-filter"].tap()
        XCTAssertTrue(app.staticTexts[before].waitForExistence(timeout: 10), "closing the filter restores the full catalogue")
        XCTAssertFalse(app.staticTexts["30 公里内没有收录的古迹"].exists)
    }
}
