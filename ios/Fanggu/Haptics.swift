import UIKit
import CoreHaptics

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

    static func beginRating() {
        softGenerator.impactOccurred(intensity: 0.35)
        selectionGenerator.prepare()
    }

    static func ratingStep() {
        selectionGenerator.selectionChanged()
        selectionGenerator.prepare()
    }

    static func success() {
        notificationGenerator.notificationOccurred(.success)
    }

    static func error() {
        notificationGenerator.notificationOccurred(.error)
    }
}

// Continuous friction follows travel in either direction, without progress detents.
struct ArrivalHapticMotion {
    struct Output {
        let intensity: Float
        let sharpness: Float
    }

    private var previousProgress: Double = 0

    mutating func update(progress: Double) -> Output? {
        guard progress.isFinite else { return nil }
        let next = min(1, max(0, progress))
        let moved = abs(next - previousProgress) > 0.0001
        previousProgress = next
        guard moved, next > 0, next < 1 else { return nil }
        return Output(intensity: Float(0.22 + 0.28 * next),
                      sharpness: Float(0.3 + 0.25 * next))
    }
}

@MainActor final class ArrivalDragHaptics {
    private var engine: CHHapticEngine?
    private var player: CHHapticAdvancedPatternPlayer?
    private var idleTask: Task<Void, Never>?
    private var motion = ArrivalHapticMotion()

    func begin() {
        end()
        motion = ArrivalHapticMotion()
        guard CHHapticEngine.capabilitiesForHardware().supportsHaptics else { return }
        do {
            if engine == nil {
                let engine = try CHHapticEngine()
                engine.playsHapticsOnly = true
                engine.isAutoShutdownEnabled = true
                // Interruptions and resets invalidate the player. A new gesture starts afresh.
                engine.stoppedHandler = { [weak self] _ in
                    Task { @MainActor [weak self] in self?.end() }
                }
                engine.resetHandler = { [weak self] in
                    Task { @MainActor [weak self] in self?.end() }
                }
                self.engine = engine
            }
            guard let engine else { return }
            try engine.start()
            let event = CHHapticEvent(eventType: .hapticContinuous, parameters: [
                CHHapticEventParameter(parameterID: .hapticIntensity, value: 1),
                CHHapticEventParameter(parameterID: .hapticSharpness, value: 0)
            ], relativeTime: 0, duration: 30)
            let pattern = try CHHapticPattern(events: [event], parameters: [])
            let player = try engine.makeAdvancedPlayer(with: pattern)
            player.loopEnabled = true
            player.isMuted = true
            self.player = player
            try player.start(atTime: CHHapticTimeImmediate)
        } catch {
            // Haptics are optional; engine failure must never affect saving a visit.
            end()
        }
    }

    func update(progress: Double) {
        idleTask?.cancel()
        idleTask = nil
        guard let output = motion.update(progress: progress), let player else {
            player?.isMuted = true
            return
        }
        do {
            try player.sendParameters([
                CHHapticDynamicParameter(parameterID: .hapticIntensityControl,
                                         value: output.intensity, relativeTime: 0),
                CHHapticDynamicParameter(parameterID: .hapticSharpnessControl,
                                         value: output.sharpness, relativeTime: 0)
            ], atTime: CHHapticTimeImmediate)
            player.isMuted = false
            // DragGesture stops sending changes when the finger rests. Silence friction
            // within 80 ms, while keeping the same player ready for the next movement.
            idleTask = Task { @MainActor [weak self] in
                try? await Task.sleep(for: .milliseconds(80))
                guard !Task.isCancelled else { return }
                self?.player?.isMuted = true
            }
        } catch {
            end()
        }
    }

    func end() {
        idleTask?.cancel()
        idleTask = nil
        player?.isMuted = true
        try? player?.stop(atTime: CHHapticTimeImmediate)
        player = nil
    }

    deinit {
        idleTask?.cancel()
        try? player?.stop(atTime: CHHapticTimeImmediate)
    }
}
