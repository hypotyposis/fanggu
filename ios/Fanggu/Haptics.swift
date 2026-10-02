import UIKit

@MainActor enum Haptics {
    private static let selectionGenerator = UISelectionFeedbackGenerator()
    private static let softGenerator = UIImpactFeedbackGenerator(style: .soft)
    private static let arrivalGenerator = UIImpactFeedbackGenerator(style: .medium)
    private static let resistanceGenerator = UIImpactFeedbackGenerator(style: .rigid)
    private static let notificationGenerator = UINotificationFeedbackGenerator()

    static func selection() {
        selectionGenerator.selectionChanged()
    }

    static func soft() {
        softGenerator.impactOccurred()
    }

    static func beginArrival() {
        arrivalGenerator.impactOccurred(intensity: 0.65)
        resistanceGenerator.prepare()
        notificationGenerator.prepare()
    }

    // Sparse, increasingly firm breaks in the seal; never a continuous buzz.
    static func arrivalResistance(step: Int) {
        resistanceGenerator.impactOccurred(intensity: min(1, 0.3 + Double(step) * 0.14))
        resistanceGenerator.prepare()
        notificationGenerator.prepare()
    }

    static func success() {
        notificationGenerator.notificationOccurred(.success)
    }

    static func error() {
        notificationGenerator.notificationOccurred(.error)
    }
}
