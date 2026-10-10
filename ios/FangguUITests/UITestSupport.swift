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
    /// The language pinned by `isolated(language:locale:)` (Simplified Chinese by default) is kept.
    func launchForTest(site: String? = nil, review: Bool = false, arguments: [String] = []) {
        isolate()
        var all = languageArguments + ["-uiTestDisableAnimations"]
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
        let bottom = dragBottom
        let start = coordinate(withNormalizedOffset: CGVector(dx: 0.025, dy: up ? bottom : 0.14))
        let end = coordinate(withNormalizedOffset: CGVector(dx: 0.025, dy: up ? 0.14 : bottom))
        start.press(forDuration: 0.02, thenDragTo: end)
    }

    /// The lowest point, as a fraction of the height, where a drag still lands on the page. While the
    /// keyboard is up it sits above the keys and above the candidate bar on top of them, which the
    /// keyboard element's frame leaves out; a drag starting on that bar does not scroll the page.
    private var dragBottom: CGFloat {
        let keyboard = keyboards.firstMatch
        guard keyboard.exists, frame.height > 0 else { return 0.76 }
        return min(0.76, (keyboard.frame.minY - 64) / frame.height)
    }

    /// Drags until the element can be tapped and reports whether it can. A tap lands on the frame
    /// centre, so the element also has to sit clear of the top bars and the bottom inset; a sliver
    /// peeking over the edge counts as hittable but does not take focus. Stops early once the page
    /// no longer moves.
    @discardableResult func reveal(_ element: XCUIElement, up: Bool = true, attempts: Int = 8) -> Bool {
        for _ in 0..<attempts {
            // Lazy stacks build rows only near the viewport, and reading the frame of an element that
            // does not exist yet fails the test, so page on until it appears.
            guard element.exists else { dragPage(up: up); continue }
            if isComfortablyVisible(element) { return true }
            let before = element.frame.midY
            // A whole page would carry a tall card that is already on screen past the target band.
            if element.frame.intersects(frame) { settle(element) } else { dragPage(up: up) }
            if element.exists, abs(element.frame.midY - before) < 1 { break }
        }
        return element.exists && element.isHittable
    }

    /// Moves an on-screen element to the upper third with a slow drag that is held before release,
    /// so the page stops where the finger stops instead of coasting on. The upper third leaves room
    /// below a search field for its results once the keyboard is up.
    private func settle(_ element: XCUIElement) {
        guard frame.height > 0 else { return }
        let bottom = dragBottom
        let target = frame.minY + frame.height * 0.3
        let travel = max(-(bottom - 0.14), min(bottom - 0.14, (element.frame.midY - target) / frame.height))
        let from: CGFloat = travel > 0 ? bottom : 0.14
        let start = coordinate(withNormalizedOffset: CGVector(dx: 0.025, dy: from))
        let end = coordinate(withNormalizedOffset: CGVector(dx: 0.025, dy: from - travel))
        start.press(forDuration: 0.05, thenDragTo: end, withVelocity: XCUIGestureVelocity(rawValue: 300),
                    thenHoldForDuration: 0.2)
    }

    private func isComfortablyVisible(_ element: XCUIElement) -> Bool {
        guard element.isHittable else { return false }
        let mid = element.frame.midY
        return mid >= frame.minY + 100 && mid <= frame.maxY - 150
    }
}
