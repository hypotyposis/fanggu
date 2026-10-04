import SwiftUI

enum AppAppearance: String, CaseIterable, Identifiable {
    static let storageKey = "fanggu.appearance"
    case system, light, dark

    var id: String { rawValue }
    var title: String {
        switch self {
        case .system: "跟随系统"
        case .light: "亮色"
        case .dark: "深色"
        }
    }
    var colorScheme: ColorScheme? {
        switch self {
        case .system: nil
        case .light: .light
        case .dark: .dark
        }
    }
}

private struct FangguAppearance: ViewModifier {
    @AppStorage(AppAppearance.storageKey) private var appearance = AppAppearance.system.rawValue

    func body(content: Content) -> some View {
        content.preferredColorScheme((AppAppearance(rawValue: appearance) ?? .system).colorScheme)
    }
}

extension View {
    func fangguAppearance() -> some View { modifier(FangguAppearance()) }
}

struct FangguSeal: View {
    var size: CGFloat = 42

    var body: some View {
        VStack(spacing: 0) {
            Text("访古")
            Text("之印")
        }
        .font(.custom("MaShanZheng-Regular", fixedSize: size * 0.25))
        .lineSpacing(-2)
        .foregroundStyle(Palette.sealPaper)
        .frame(width: size, height: size)
        .background(Palette.red)
        .overlay(Rectangle().stroke(Palette.sealPaper.opacity(0.65), lineWidth: 0.7).padding(3))
        .rotationEffect(.degrees(-6))
        .accessibilityHidden(true)
    }
}

struct FangguSectionTitle: View {
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    let eyebrow: String
    let title: String
    let subtitle: String

    var body: some View {
        VStack(alignment: .leading, spacing: 7) {
            Text(eyebrow)
                .font(FangguFont.mono(11))
                .tracking(2)
                .foregroundStyle(Palette.gold)
            Text(title)
                .font(FangguFont.serif(31, weight: .medium))
                .tracking(3)
                .foregroundStyle(Palette.paper)
                .lineLimit(1)
                .minimumScaleFactor(0.45)
            if !dynamicTypeSize.isAccessibilitySize {
                Text(subtitle)
                    .font(FangguFont.serif(13))
                    .foregroundStyle(Palette.paper2)
                    .lineSpacing(4)
            }
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct FangguRule: View {
    var body: some View {
        Rectangle().fill(Palette.paper.opacity(0.13)).frame(height: 1)
    }
}

/// Fine corner cuts echo the ruled borders of an album leaf.
struct FangguAlbumCorners: Shape {
    func path(in rect: CGRect) -> Path {
        let inset: CGFloat = 5
        let length: CGFloat = 10
        return Path { path in
            for x in [rect.minX + inset, rect.maxX - inset] {
                for y in [rect.minY + inset, rect.maxY - inset] {
                    let dx: CGFloat = x < rect.midX ? 1 : -1
                    let dy: CGFloat = y < rect.midY ? 1 : -1
                    path.move(to: CGPoint(x: x, y: y + dy * length))
                    path.addLine(to: CGPoint(x: x, y: y))
                    path.addLine(to: CGPoint(x: x + dx * length, y: y))
                }
            }
        }
    }
}

/// Deterministic, low-contrast fibres; no image asset or animated noise needed.
struct FangguPaperGrain: View {
    var body: some View {
        Canvas { context, size in
            var fibres = Path()
            for index in 0..<Int(size.width * size.height / 650) {
                let x = CGFloat((index * 73 + 19) % 997) / 997 * size.width
                let y = CGFloat((index * 137 + 47) % 991) / 991 * size.height
                fibres.move(to: CGPoint(x: x, y: y))
                fibres.addLine(to: CGPoint(x: x + CGFloat(2 + index % 4), y: y + 0.5))
            }
            context.stroke(fibres, with: .color(Palette.goldDim.opacity(0.09)), lineWidth: 0.5)
        }
        .allowsHitTesting(false)
        .accessibilityHidden(true)
    }
}

struct FangguMetricNumber: View {
    let value: Int
    let size: CGFloat

    var body: some View {
        Text(value.formatted())
            .font(FangguFont.serif(size, weight: .medium))
            .monospacedDigit()
            .foregroundStyle(Palette.gold)
    }
}

struct ReviewScoreLabel: View {
    let scores: DimensionScores
    var size: CGFloat = 18

    var body: some View {
        if let score = scores.aggregateScoreLabel {
            Text(score)
                .font(FangguFont.serif(size))
                .monospacedDigit()
                .tracking(-0.3)
                .foregroundStyle(Palette.gold)
                .fixedSize(horizontal: true, vertical: false)
                .accessibilityElement(children: .ignore)
                .accessibilityLabel("私人综合评分，\(score) 分")
        }
    }
}

extension VisitStatus {
    var textColor: Color {
        switch self {
        case .visited: Palette.redText
        case .wishlist: Palette.gold
        case .unvisited: Palette.paper2
        }
    }
}

struct FangguOutlineButton: ButtonStyle {
    var accent: Color = Palette.gold

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(FangguFont.serif(14))
            .foregroundStyle(configuration.isPressed ? Palette.ink : accent)
            .padding(.horizontal, 16)
            .frame(minHeight: 44)
            .background(configuration.isPressed ? accent : Palette.ink2)
            .overlay(Rectangle().stroke(accent.opacity(0.65), lineWidth: 1))
            .animation(.easeOut(duration: 0.18), value: configuration.isPressed)
    }
}

struct FangguField: View {
    let placeholder: String
    @Binding var text: String
    var showsClearButton = false

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: "magnifyingglass")
                .foregroundStyle(Palette.gold)
            TextField(placeholder, text: $text, prompt: Text(placeholder).foregroundStyle(Palette.paper3))
                .font(FangguFont.serif(15))
                .tint(Palette.gold)
                .foregroundStyle(Palette.paper)
                .autocorrectionDisabled()
            if showsClearButton && !text.isEmpty {
                Button { text = "" } label: {
                    Image(systemName: "xmark.circle.fill")
                        .frame(minWidth: 44, minHeight: 44)
                }
                .buttonStyle(.plain).foregroundStyle(Palette.paper2)
                .accessibilityLabel("清空搜索")
                .accessibilityIdentifier("clear-catalog-search")
            }
        }
        .padding(.horizontal, 14)
        .padding(.vertical, showsClearButton ? 0 : 10)
        .frame(minHeight: 46)
        .background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.23), lineWidth: 1))
    }
}
