import SwiftUI

struct FangguSeal: View {
    var size: CGFloat = 42

    var body: some View {
        VStack(spacing: 0) {
            Text("访古")
            Text("之印")
        }
        .font(FangguFont.brush(size * 0.25))
        .lineSpacing(-2)
        .foregroundStyle(Palette.paper)
        .frame(width: size, height: size)
        .background(Palette.red)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.65), lineWidth: 0.7).padding(3))
        .rotationEffect(.degrees(-6))
        .accessibilityHidden(true)
    }
}

struct FangguSectionTitle: View {
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
            Text(subtitle)
                .font(FangguFont.serif(13))
                .foregroundStyle(Palette.paper2)
                .lineSpacing(4)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
    }
}

struct FangguRule: View {
    var body: some View {
        Rectangle().fill(Palette.paper.opacity(0.13)).frame(height: 1)
    }
}

struct FangguOutlineButton: ButtonStyle {
    var accent: Color = Palette.gold

    func makeBody(configuration: Configuration) -> some View {
        configuration.label
            .font(FangguFont.serif(14))
            .foregroundStyle(configuration.isPressed ? Palette.ink : accent)
            .padding(.horizontal, 16)
            .frame(minHeight: 42)
            .background(configuration.isPressed ? accent : Palette.ink2)
            .overlay(Rectangle().stroke(accent.opacity(0.65), lineWidth: 1))
            .animation(.easeOut(duration: 0.18), value: configuration.isPressed)
    }
}

struct FangguField: View {
    let placeholder: String
    @Binding var text: String

    var body: some View {
        HStack(spacing: 10) {
            Image(systemName: "magnifyingglass")
                .foregroundStyle(Palette.gold)
            TextField(placeholder, text: $text)
                .font(FangguFont.serif(15))
                .tint(Palette.gold)
                .foregroundStyle(Palette.paper)
                .autocorrectionDisabled()
        }
        .padding(.horizontal, 14)
        .frame(height: 46)
        .background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.23), lineWidth: 1))
    }
}
