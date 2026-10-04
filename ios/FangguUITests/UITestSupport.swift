import XCTest

/// Shared launch and scrolling helpers. Deep links and disabled transitions exist only in DEBUG
/// builds of the app; they skip the walk to a page, never the behaviour a test asserts.
///
/// Every launch here is isolated as well: `launchForTest` builds on `isolated()` (see
/// `IsolatedApp.swift`), so each test gets its own record and appearance scope and the speed-ups
/// never trade away the isolation that lets sessions share one simulator.
extension XCUIApplication {
    /// Launches in a fresh record scope with UIKit transitions off. Pass a monument id to start on
    /// its detail page, and `review: true` to have that page open its review editor immediately.
    func launchForTest(site: String? = nil, review: Bool = false, arguments: [String] = []) {
        isolate()
        var all = ["-uiTestDisableAnimations"]
        if let site { all += ["-uiTestOpenSite", site] }
        if review { all.append("-uiTestOpenReview") }
        launchArguments = all + arguments
        launch()
    }

    /// Kills the process and launches it again with the same arguments and scope, so a deep-linked
    /// test lands on the same page after a real restart. Persistence checks keep using this.
    func relaunch() {
        terminate()
        launch()
    }

    /// Waits for the review editor requested through `-uiTestOpenReview`.
    func waitForReviewEditor(file: StaticString = #filePath, line: UInt = #line) {
        XCTAssertTrue(buttons["完成"].waitForExistence(timeout: 10),
                      "The review editor must open from the launch argument", file: file, line: line)
    }

    /// One steady drag along the left margin. It moves about 60% of the screen and never starts
    /// on a radar handle, slider thumb or text editor. The default gesture speed releases without
    /// momentum, so the runner's idle wait returns at once; `swipeUp()` and fast drags fling the
    /// page and then wait about two seconds for it to stop.
    func dragPage(up: Bool = true) {
        // While the keyboard is up, start above it so the drag scrolls the page instead of landing on keys.
        var bottom: CGFloat = 0.76
        let keyboard = keyboards.firstMatch
        if keyboard.exists, frame.height > 0 {
            bottom = min(bottom, keyboard.frame.minY / frame.height - 0.04)
        }
        let start = coordinate(withNormalizedOffset: CGVector(dx: 0.025, dy: up ? bottom : 0.14))
        let end = coordinate(withNormalizedOffset: CGVector(dx: 0.025, dy: up ? 0.14 : bottom))
        start.press(forDuration: 0.02, thenDragTo: end)
    }

    /// Drags until the element can be tapped and reports whether it can. A tap lands on the frame
    /// centre, so the element also has to sit clear of the top bars and the bottom inset; a sliver
    /// peeking over the edge counts as hittable but does not take focus. Stops early once the page
    /// no longer moves.
    @discardableResult func reveal(_ element: XCUIElement, up: Bool = true, attempts: Int = 8) -> Bool {
        for _ in 0..<attempts {
            if isComfortablyVisible(element) { return true }
            let before = element.frame.midY
            dragPage(up: up)
            if element.exists, abs(element.frame.midY - before) < 1 { break }
        }
        return element.isHittable
    }

    private func isComfortablyVisible(_ element: XCUIElement) -> Bool {
        guard element.isHittable else { return false }
        let mid = element.frame.midY
        return mid >= frame.minY + 100 && mid <= frame.maxY - 150
    }
}
