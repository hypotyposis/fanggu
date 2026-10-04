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
    /// A toggle that is currently on; drawn like the pressed state so the choice stays visible.
    var filled = false

    func makeBody(configuration: Configuration) -> some View {
        let active = configuration.isPressed || filled
        configuration.label
            .font(FangguFont.serif(14))
            .foregroundStyle(active ? Palette.ink : accent)
            .padding(.horizontal, 16)
            .frame(minHeight: 44)
            .background(active ? accent : Palette.ink2)
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
