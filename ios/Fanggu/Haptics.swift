import UIKit

@MainActor enum Haptics {
    private static let selectionGenerator = UISelectionFeedbackGenerator()
    private static let softGenerator = UIImpactFeedbackGenerator(style: .soft)
    private static let notificationGenerator = UINotificationFeedbackGenerator()

    static func selection() {
        selectionGenerator.selectionChanged()
    }

    static func soft() {
        softGenerator.impactOccurred()
    }

    static func prepareArrival() {
        notificationGenerator.prepare()
    }

    static func success() {
        notificationGenerator.notificationOccurred(.success)
    }

    static func error() {
        notificationGenerator.notificationOccurred(.error)
    }
}
