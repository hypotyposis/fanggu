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
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
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
        Group {
            if dynamicTypeSize.isAccessibilitySize { dimensionList }
            else { diagram }
        }
        .onChange(of: dynamicTypeSize) { _, _ in cancelDrag() }
    }

    private var dimensionList: some View {
        VStack(alignment: .leading, spacing: 24) {
            ForEach(ReviewDimension.allCases) { axis in
                VStack(alignment: .leading, spacing: 10) {
                    Text(axis.title).font(FangguFont.serif(17)).foregroundStyle(Palette.paper)
                        .accessibilityIdentifier("dimension-title-\(axis.rawValue)")
                    Text(axis.hint).font(FangguFont.serif(13)).foregroundStyle(Palette.paper2)
                    if editable {
                        Menu {
                            Button("未评分") { selectGrade(nil, for: axis) }
                            ForEach(1...5, id: \.self) { grade in
                                Button(gradeLabel(grade)) {
                                    selectGrade(grade, for: axis)
                                }
                            }
                        } label: {
                            Label(gradeTitle(axis), systemImage: "chevron.down")
                                .font(FangguFont.serif(16))
                                .frame(maxWidth: .infinity, minHeight: 44, alignment: .leading)
                                .padding(10).contentShape(Rectangle())
                                .overlay(Rectangle().stroke(Palette.goldDim, lineWidth: 1))
                        }
                        .foregroundStyle(Palette.gold)
                        .accessibilityLabel(axis.title)
                        .accessibilityValue(gradeTitle(axis))
                        .accessibilityHint("选择档位即保存；未评分会清空这一项")
                        .accessibilityIdentifier("dimension-picker-\(axis.rawValue)")
                    } else {
                        Text(gradeTitle(axis)).font(FangguFont.serif(16)).foregroundStyle(Palette.gold)
                            .accessibilityIdentifier("radar-summary-\(axis.rawValue)")
                    }
                }
                .fixedSize(horizontal: false, vertical: true)
                .frame(maxWidth: .infinity, alignment: .leading)
            }
            if editable {
                Text("选定档位即保存 · 不确定的项可以留空")
                    .font(FangguFont.serif(13)).foregroundStyle(Palette.paper3)
            }
        }
        .padding(.top, 12)
    }

    private func gradeTitle(_ axis: ReviewDimension) -> String {
        guard let grade = scores[axis] else { return String(localized: "未评分") }
        return gradeLabel(grade)
    }

    private func gradeLabel(_ grade: Int) -> String {
        "\(ReviewDimension.grade(grade)) · \(ReviewDimension.description(grade))"
    }

    private func selectGrade(_ grade: Int?, for axis: ReviewDimension) {
        guard scores[axis] != grade else { return }
        var next = scores
        next[axis] = grade
        scores = next
        if onCommit(next) { Haptics.ratingStep() }
    }

    private var diagram: some View {
        VStack(spacing: 12) {
            GeometryReader { geometry in
                let layout = RadarLayout(size: geometry.size)
                ZStack {
                    grid(layout)
                    RadarPolygon(values: ReviewDimension.allCases.map { polygonValue($0) })
                        .fill(LinearGradient(colors: [Palette.redText.opacity(0.18), Palette.redText.opacity(0.04)],
                                             startPoint: .top, endPoint: .bottom))
                    RadarPolygon(values: ReviewDimension.allCases.map { polygonValue($0) })
                        .stroke(Palette.redText.opacity(0.9), style: StrokeStyle(lineWidth: 1.5, lineJoin: .round))
                    ForEach(ReviewDimension.allCases) { axis in
                        axisLabel(axis).position(layout.label(axis))
                        if editable { handle(axis, layout: layout) }
                        else if let value = scores[axis] {
                            Circle().fill(Palette.redText).frame(width: 6, height: 6)
                                .overlay(Circle().stroke(Palette.ink2, lineWidth: 1))
                                .position(layout.point(axis, value: Double(value)))
                                .accessibilityHidden(true)
                        }
                    }
                }
                .coordinateSpace(name: "review-radar")
            }
            // Leave room for the top and bottom captions inside the album rules.
            .frame(height: 360)
            if editable {
                readout
                gradeLegend
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
                    .stroke(Palette.goldDim.opacity(grade == 5 ? 0.5 : 0.22),
                            lineWidth: grade == 5 ? 0.9 : 0.5)
            }
            Path { path in
                for axis in ReviewDimension.allCases {
                    path.move(to: layout.center)
                    path.addLine(to: layout.point(axis, value: 5))
                }
            }.stroke(Palette.goldDim.opacity(0.25), lineWidth: 0.5)
            // Short transverse marks make each grade read as an engraved scale.
            Path { path in
                for axis in ReviewDimension.allCases {
                    let angle = Double(axis.index) * .pi / 3
                    for grade in 1...5 {
                        let point = layout.point(axis, value: Double(grade))
                        let dx = cos(angle) * 2.5
                        let dy = sin(angle) * 2.5
                        path.move(to: CGPoint(x: point.x - dx, y: point.y - dy))
                        path.addLine(to: CGPoint(x: point.x + dx, y: point.y + dy))
                    }
                }
            }.stroke(Palette.goldDim.opacity(0.5), lineWidth: 0.7)
            Rectangle().fill(Palette.goldDim.opacity(0.6))
                .frame(width: 3, height: 3).rotationEffect(.degrees(45))
                .position(layout.center)
            if editable, let axis = selected {
                Path { path in
                    path.move(to: layout.center)
                    path.addLine(to: layout.point(axis, value: 5))
                }.stroke(Palette.redText.opacity(0.5), lineWidth: 1)
            }
        }
        .accessibilityHidden(true)
    }

    private func axisLabel(_ axis: ReviewDimension) -> some View {
        VStack(spacing: 4) {
            Text(axis.title).font(FangguFont.serif(12)).tracking(0.5)
                .lineLimit(1).minimumScaleFactor(0.7)
            Text(ReviewDimension.grade(displayGrade(axis)))
                .font(FangguFont.serif(16, weight: .medium)).monospacedDigit()
                .foregroundStyle(selected == axis && editable ? Palette.redText : Palette.gold)
        }
        .foregroundStyle(selected == axis && editable ? Palette.paper : Palette.paper2)
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
            .fill(Palette.ink2)
            .frame(width: active ? 22 : 16, height: active ? 22 : 16)
            .overlay(Circle().stroke(hasValue ? Palette.redText : Palette.goldDim, lineWidth: active ? 1.5 : 1))
            .overlay {
                if hasValue {
                    Circle().fill(Palette.redText).padding(active ? 5 : 4)
                }
            }
            .background {
                if active {
                    Circle().stroke(Palette.redText.opacity(0.16), lineWidth: 5)
                        .padding(-5)
                }
            }
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
                Text(selected?.title ?? String(localized: "从任意圆点开始"))
                    .font(FangguFont.serif(17)).foregroundStyle(Palette.paper)
                Spacer()
                if let axis = selected {
                    Text(verbatim: "\(ReviewDimension.grade(displayGrade(axis)))  \(ReviewDimension.description(displayGrade(axis)))")
                        .font(FangguFont.serif(14)).foregroundStyle(Palette.redText)
                        .accessibilityIdentifier("radar-active-grade")
                    Button { clear(axis) } label: {
                        Image(systemName: "arrow.uturn.backward").frame(width: 44, height: 44)
                    }
                    .buttonStyle(.plain).foregroundStyle(Palette.paper2)
                    .disabled(scores[axis] == nil || drag != nil)
                    .accessibilityLabel("清空\(axis.title)")
                }
            }
            Text(selected?.hint ?? String(localized: "空心圆点还未评分。先拉一项，慢慢画出你的印象。"))
                .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2).lineSpacing(4)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .padding(.horizontal, 14).padding(.vertical, 10)
        .background(Palette.ink3.opacity(0.35))
        .overlay(alignment: .leading) {
            Rectangle().fill(Palette.goldDim.opacity(0.5)).frame(width: 1)
        }
        // Keep the diagram still when a different explanation wraps onto two lines.
        .frame(minHeight: 100, alignment: .top)
    }

    private var gradeLegend: some View {
        HStack(spacing: 0) {
            ForEach(1...5, id: \.self) { value in
                let highlighted = selected.map { displayGrade($0) == value } ?? false
                VStack(spacing: 5) {
                    Text(ReviewDimension.grade(value))
                        .font(FangguFont.serif(13, weight: .medium))
                        .frame(width: 26, height: 26)
                        .background(Circle().fill(highlighted ? Palette.redText.opacity(0.08) : Color.clear))
                        .overlay(Circle().stroke(highlighted ? Palette.redText.opacity(0.6) : Palette.goldDim.opacity(0.3), lineWidth: 0.7))
                    Text(ReviewDimension.description(value)).font(FangguFont.serif(11))
                        .lineLimit(1).minimumScaleFactor(0.7)
                }
                .foregroundStyle(highlighted ? Palette.redText : Palette.paper2)
                .frame(maxWidth: .infinity)
            }
        }
        .padding(.vertical, 6)
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
