import SwiftUI

/// Sheet presentation belongs to the UI, never to the persisted library.
@MainActor final class UndoPresentation: ObservableObject {
    @Published var reviewIsPresented = false
    @Published var mapIsPresented = false
}

private struct MapSheetContextKey: EnvironmentKey { static let defaultValue = false }
extension EnvironmentValues {
    var inMapSheet: Bool {
        get { self[MapSheetContextKey.self] }
        set { self[MapSheetContextKey.self] = newValue }
    }
}

/// Shared by the detail page and large cards so every arrival entry has the same meaning.
struct VisitActions: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument
    @Binding var editingVisit: Bool

    private var status: VisitStatus { library.record(for: site).status }

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            ViewThatFits(in: .horizontal) {
                HStack(spacing: 10) { visitButtons }
                VStack(alignment: .leading, spacing: 10) { visitButtons }
            }
            if status == .visited {
                Menu {
                    Label("已到访", systemImage: "checkmark")
                    Button("改为未标记") { changeStatus(.unvisited) }
                    Button("移至心愿单") { changeStatus(.wishlist) }
                } label: {
                    Label("已到访 · 更改状态", systemImage: "chevron.down")
                }
                .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
                .accessibilityIdentifier("visit-status-menu")
            } else {
                Button(status == .wishlist ? "移出心愿单" : "加入心愿单") {
                    changeStatus(status == .wishlist ? .unvisited : .wishlist)
                }
                .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
            }
        }
    }

    @ViewBuilder private var visitButtons: some View {
        if status == .visited {
            Button("编辑到访记录") { editingVisit = true }
                .buttonStyle(FangguOutlineButton())
                .accessibilityIdentifier("edit-visit")
        } else {
            Button("记录今日到访") {
                if library.recordToday(for: site) { Haptics.success() }
                else { Haptics.error() }
            }
            .buttonStyle(FangguOutlineButton())
            .accessibilityHint("立即保存今天的到访日期，之后可以撤销")
            .accessibilityIdentifier("record-today")
            Button("补记到访") { editingVisit = true }
                .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
                .accessibilityIdentifier("edit-visit")
        }
    }

    private func changeStatus(_ next: VisitStatus) {
        if library.setStatus(next, for: site) { Haptics.soft() }
        else { Haptics.error() }
    }
}

/// The latest reversible change stays available until dismissed or superseded.
/// Keeping it visible avoids a time limit for readers using large text or VoiceOver.
struct UndoFeedback: View {
    @EnvironmentObject private var library: LibraryStore
    @EnvironmentObject private var presentation: UndoPresentation
    @Environment(\.inMapSheet) private var inMapSheet
    var inReviewEditor = false

    var body: some View {
        if let action = library.undoAction,
           inReviewEditor || !presentation.reviewIsPresented,
           inMapSheet || !presentation.mapIsPresented {
            VStack(alignment: .leading, spacing: 4) {
                Text(action.message).font(FangguFont.serif(14)).foregroundStyle(Palette.paper)
                    .fixedSize(horizontal: false, vertical: true)
                if let error = library.error {
                    Text(error).font(FangguFont.serif(12)).foregroundStyle(Palette.redText)
                }
                HStack {
                    Button {
                        if library.undoLastChange() { Haptics.soft() }
                        else { Haptics.error() }
                    } label: {
                        Text("撤销").frame(minWidth: 44, minHeight: 44).contentShape(Rectangle())
                    }
                    .accessibilityIdentifier("undo-change")
                    Spacer()
                    Button { library.dismissUndo(action.id) } label: {
                        Text("关闭提示").frame(minHeight: 44).contentShape(Rectangle())
                    }
                    .foregroundStyle(Palette.paper2)
                }
                .font(FangguFont.serif(14))
                .buttonStyle(.plain)
                .frame(minHeight: 44)
            }
            .padding(.horizontal, 16).padding(.top, 10)
            .background(Palette.ink3)
            .overlay(alignment: .top) { Rectangle().fill(Palette.goldDim).frame(height: 1) }
            .accessibilityElement(children: .contain)
        }
    }
}
