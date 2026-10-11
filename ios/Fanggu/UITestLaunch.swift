import UIKit

/// Launch arguments that only the UI tests pass. Everything here compiles away outside DEBUG,
/// so a Release build ignores the flags and behaves exactly as before.
///
/// - `-uiTestOpenSite <id>`: open that monument's detail page on launch instead of the catalog.
/// - `-uiTestOpenReview`: present the review editor as soon as that detail page appears, once per launch.
/// - `-uiTestDisableAnimations`: turn off UIKit transitions (navigation, sheets, tab bar, keyboard) so the
///   test runner's idle waits return sooner. SwiftUI state animations such as the radar's settle spring
///   and the arrival slider's reset are unaffected and stay testable.
enum UITestLaunch {
#if DEBUG
    private static let arguments = ProcessInfo.processInfo.arguments

    static let siteID: String? = {
        guard let index = arguments.firstIndex(of: "-uiTestOpenSite"), arguments.indices.contains(index + 1) else { return nil }
        return arguments[index + 1]
    }()

    @MainActor private static var pendingReview = siteID != nil && arguments.contains("-uiTestOpenReview")

    @MainActor static func applyAtLaunch() {
        if arguments.contains("-uiTestDisableAnimations") { UIView.setAnimationsEnabled(false) }
    }

    /// True only for the first detail page shown after launch; closing and reopening the editor then behaves normally.
    @MainActor static func consumeOpenReview() -> Bool {
        defer { pendingReview = false }
        return pendingReview
    }
#else
    static let siteID: String? = nil
    @MainActor static func applyAtLaunch() {}
    @MainActor static func consumeOpenReview() -> Bool { false }
#endif
}
