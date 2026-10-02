import SwiftUI

private struct RadarLayout {
    let size: CGSize
    var center: CGPoint { CGPoint(x: size.width / 2, y: size.height / 2) }
    var radius: Double { max(40, min(120, (size.width - 126) / sqrt(3), (size.height - 90) / 2)) }

    func point(_ axis: ReviewDimension, value: Double) -> CGPoint {
        let angle = Double(axis.index) * .pi / 3 - .pi / 2
        return CGPoint(x: center.x + cos(angle) * radius * value / 5,
                       y: center.y + sin(angle) * radius * value / 5)
    }
    func label(_ axis: ReviewDimension) -> CGPoint {
        let angle = Double(axis.index) * .pi / 3 - .pi / 2
        return CGPoint(x: center.x + cos(angle) * (radius + 36),
                       y: center.y + sin(angle) * (radius + 36))
    }
}

/// Animates all six sides together when a free-moving vertex settles on its grade.
private struct RadarPolygon: Shape {
    var v0: Double, v1: Double, v2: Double, v3: Double, v4: Double, v5: Double
    typealias Pair = AnimatablePair<Double, Double>
    var animatableData: AnimatablePair<Pair, AnimatablePair<Pair, Pair>> {
        get { .init(.init(v0, v1), .init(.init(v2, v3), .init(v4, v5))) }
        set {
            v0 = newValue.first.first; v1 = newValue.first.second
            v2 = newValue.second.first.first; v3 = newValue.second.first.second
            v4 = newValue.second.second.first; v5 = newValue.second.second.second
        }
    }
    init(values: [Double]) {
        v0 = values[0]; v1 = values[1]; v2 = values[2]
        v3 = values[3]; v4 = values[4]; v5 = values[5]
    }
    func path(in rect: CGRect) -> Path {
        let layout = RadarLayout(size: rect.size)
        let values = [v0, v1, v2, v3, v4, v5]
        return Path { path in
            for axis in ReviewDimension.allCases {
                let point = layout.point(axis, value: values[axis.index])
                if axis.index == 0 { path.move(to: point) } else { path.addLine(to: point) }
            }
            path.closeSubpath()
        }
    }
}

struct ReviewRadar: View {
    @Binding var scores: DimensionScores
    var editable = true
    var onCommit: (DimensionScores) -> Bool = { _ in true }
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.scenePhase) private var scenePhase
    @State private var selected: ReviewDimension?
    @State private var drag: RatingDrag?
    @GestureState private var dragging = false

    private struct RatingDrag {
        let axis: ReviewDimension
        let start: Double
        var value: Double
        var grade: Int
    }

    var body: some View {
        VStack(spacing: 12) {
            GeometryReader { geometry in
                let layout = RadarLayout(size: geometry.size)
                ZStack {
                    grid(layout)
                    RadarPolygon(values: ReviewDimension.allCases.map { polygonValue($0) })
                        .fill(Palette.gold.opacity(0.15))
                    RadarPolygon(values: ReviewDimension.allCases.map { polygonValue($0) })
                        .stroke(Palette.gold, style: StrokeStyle(lineWidth: 1.8, lineJoin: .round))
                    ForEach(ReviewDimension.allCases) { axis in
                        axisLabel(axis).position(layout.label(axis))
                        if editable { handle(axis, layout: layout) }
                        else if let value = scores[axis] {
                            Circle().fill(Palette.gold).frame(width: 7, height: 7)
                                .position(layout.point(axis, value: Double(value)))
                                .accessibilityHidden(true)
                        }
                    }
                }
                .coordinateSpace(name: "review-radar")
            }
            .frame(height: 330)
            if editable {
                readout
                HStack(spacing: 0) {
                    ForEach(1...5, id: \.self) { value in
                        VStack(spacing: 3) {
                            Text(ReviewDimension.grade(value)).font(FangguFont.mono(12))
                            Text(ReviewDimension.description(value)).font(FangguFont.serif(11))
                        }
                        .foregroundStyle(Palette.paper2)
                        .frame(maxWidth: .infinity)
                    }
                }
                .accessibilityElement(children: .combine)
                Text("向外拉更高 · 松手即保存 · 不确定的项可以留空")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                    .multilineTextAlignment(.center)
            }
        }
        .onChange(of: dragging) { _, active in
            if !active, drag != nil { cancelDrag() }
        }
        .onChange(of: scenePhase) { _, phase in
            if phase != .active { cancelDrag() }
        }
    }

    private func grid(_ layout: RadarLayout) -> some View {
        ZStack {
            ForEach(1...5, id: \.self) { grade in
                RadarPolygon(values: Array(repeating: Double(grade), count: 6))
                    .stroke(Palette.paper.opacity(grade == 5 ? 0.22 : 0.1), lineWidth: 1)
            }
            Path { path in
                for axis in ReviewDimension.allCases {
                    path.move(to: layout.center)
                    path.addLine(to: layout.point(axis, value: 5))
                }
            }.stroke(Palette.paper.opacity(0.14), lineWidth: 1)
            if editable, let axis = selected {
                Path { path in
                    path.move(to: layout.center)
                    path.addLine(to: layout.point(axis, value: 5))
                }.stroke(Palette.gold.opacity(0.6), lineWidth: 1.5)
            }
        }
        .accessibilityHidden(true)
    }

    private func axisLabel(_ axis: ReviewDimension) -> some View {
        VStack(spacing: 2) {
            Text(axis.title).font(FangguFont.serif(12))
            Text(ReviewDimension.grade(displayGrade(axis))).font(FangguFont.mono(16))
        }
        .foregroundStyle(selected == axis && editable ? Palette.gold : Palette.paper2)
        .frame(width: 60)
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(axis.title)，\(ReviewDimension.grade(scores[axis]))，\(ReviewDimension.description(scores[axis]))")
        .accessibilityIdentifier("radar-summary-\(axis.rawValue)")
        .accessibilityHidden(editable)
    }

    private func handle(_ axis: ReviewDimension, layout: RadarLayout) -> some View {
        let active = drag?.axis == axis
        let hasValue = scores[axis] != nil || active
        return Circle()
            .fill(hasValue ? Palette.gold : Palette.ink2)
            .frame(width: active ? 20 : 12, height: active ? 20 : 12)
            .overlay(Circle().stroke(Palette.gold, lineWidth: 2))
            .frame(width: 44, height: 44)
            .contentShape(Circle())
            .position(layout.point(axis, value: handleValue(axis)))
            .highPriorityGesture(
                DragGesture(minimumDistance: 0, coordinateSpace: .named("review-radar"))
                    .updating($dragging) { _, state, _ in state = true }
                    .onChanged { value in
                        let target = drag?.axis ?? nearestAxis(to: value.startLocation, layout: layout)
                        updateDrag(target, translation: value.translation, radius: layout.radius)
                    }
                    .onEnded { value in
                        guard let target = drag?.axis else { return }
                        updateDrag(target, translation: value.translation, radius: layout.radius)
                        guard let current = drag else { return }
                        var next = scores
                        next[current.axis] = current.grade
                        let changed = next != scores
                        settle { scores = next; drag = nil }
                        if onCommit(next), changed { Haptics.soft() }
                    }
            )
            .accessibilityElement(children: .ignore)
            .accessibilityLabel(axis.title)
            .accessibilityValue("\(ReviewDimension.grade(scores[axis]))，\(ReviewDimension.description(scores[axis]))")
            .accessibilityHint("上下轻扫调整档位，也可清空这一项")
            .accessibilityAdjustableAction { direction in
                selected = axis
                let old = scores[axis]
                let value = old.map { $0 + (direction == .increment ? 1 : -1) } ?? 3
                let next = min(5, max(1, value))
                if old != next {
                    var changed = scores; changed[axis] = next
                    settle { scores = changed }
                    if onCommit(changed) { Haptics.ratingStep() }
                }
            }
            .accessibilityAction(named: "清空这一项") { clear(axis) }
            .accessibilityIdentifier("radar-axis-\(axis.rawValue)")
    }

    private var readout: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(selected?.title ?? "从任意圆点开始")
                    .font(FangguFont.serif(17)).foregroundStyle(Palette.paper)
                Spacer()
                if let axis = selected {
                    Text("\(ReviewDimension.grade(displayGrade(axis)))  \(ReviewDimension.description(displayGrade(axis)))")
                        .font(FangguFont.serif(14)).foregroundStyle(Palette.gold)
                        .accessibilityIdentifier("radar-active-grade")
                    Button { clear(axis) } label: {
                        Image(systemName: "arrow.uturn.backward").frame(width: 44, height: 44)
                    }
                    .buttonStyle(.plain).foregroundStyle(Palette.paper2)
                    .disabled(scores[axis] == nil || drag != nil)
                    .accessibilityLabel("清空\(axis.title)")
                }
            }
            Text(selected?.hint ?? "空心圆点还未评分。先拉一项，慢慢画出你的印象。")
                .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2).lineSpacing(4)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(14).background(Palette.ink3.opacity(0.6))
        // Keep the diagram still when a different explanation wraps onto two lines.
        .frame(minHeight: 100, alignment: .top)
    }

    private func displayGrade(_ axis: ReviewDimension) -> Int? {
        drag?.axis == axis ? drag?.grade : scores[axis]
    }
    private func nearestAxis(to point: CGPoint, layout: RadarLayout) -> ReviewDimension {
        // Near the centre, 44pt targets can overlap. Resolve the closest visible dot
        // instead of letting view order decide which dimension gets the gesture.
        RadarInteraction.nearestAxis(dx: point.x - layout.center.x, dy: point.y - layout.center.y,
                                     values: ReviewDimension.allCases.map { handleValue($0) }, radius: layout.radius)
    }
    private func handleValue(_ axis: ReviewDimension) -> Double {
        drag?.axis == axis ? drag!.value : Double(scores[axis] ?? 3)
    }
    private func polygonValue(_ axis: ReviewDimension) -> Double {
        drag?.axis == axis ? drag!.value : Double(scores[axis] ?? 0)
    }
    private func updateDrag(_ axis: ReviewDimension, translation: CGSize, radius: Double) {
        if drag == nil {
            let start = Double(scores[axis] ?? 3)
            drag = RatingDrag(axis: axis, start: start, value: start, grade: Int(start))
            selected = axis
            Haptics.beginRating()
        }
        guard var current = drag, current.axis == axis else { return }
        current.value = RadarInteraction.value(start: current.start, dx: translation.width, dy: translation.height,
                                               axis: axis, radius: radius)
        let grade = RadarInteraction.grade(for: current.value, previous: current.grade)
        if grade != current.grade { Haptics.ratingStep(); current.grade = grade }
        // No spring or easing under the finger; only the release is animated.
        var transaction = Transaction(); transaction.animation = nil
        withTransaction(transaction) { drag = current }
    }
    private func settle(_ change: () -> Void) {
        if reduceMotion { change() }
        else { withAnimation(.spring(duration: 0.26, bounce: 0.12), change) }
    }
    private func cancelDrag() { settle { drag = nil } }
    private func clear(_ axis: ReviewDimension) {
        selected = axis
        if scores[axis] != nil {
            var next = scores; next[axis] = nil
            settle { scores = next }
            if onCommit(next) { Haptics.ratingStep() }
        }
    }
}
