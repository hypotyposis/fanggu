import SwiftUI
import UniformTypeIdentifiers

struct MyLibraryView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var importing = false
    @State private var exporting = false
    @State private var exportDocument: BackupDocument?
    @State private var message: String?

    private var visited: [Monument] { library.monuments.filter { library.record(for: $0).status == .visited } }
    private var wishes: [Monument] { library.monuments.filter { library.record(for: $0).status == .wishlist } }
    private var legacy: [LegacySite] { library.data.customSites.filter { library.data.links[$0.id] == nil } }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 28) {
                FangguSectionTitle(eyebrow: "亲见 · 所愿 · 私人记录", title: "我的访古", subtitle: "把到访和心愿，慢慢写成自己的古迹图鉴。")
                HStack(spacing: 12) {
                    count("已到访", visited.count)
                    count("心愿", wishes.count)
                    count("收录", library.monuments.count)
                }
                FangguRule()
                sectionTitle("已到访")
                if visited.isEmpty { empty("还没有到访记录") }
                ForEach(visited) { site in siteRow(site) }
                FangguRule()
                sectionTitle("心愿单")
                if wishes.isEmpty { empty("还没有心愿") }
                ForEach(wishes) { site in siteRow(site) }
                if !legacy.isEmpty {
                    FangguRule()
                    sectionTitle("旧记录待关联")
                    ForEach(legacy) { item in LegacyLinkRow(item: item) }
                }
                FangguRule()
                sectionTitle("备份与迁移")
                Button { prepareExport() } label: { Label("导出访古备份", systemImage: "square.and.arrow.up") }
                    .buttonStyle(FangguOutlineButton())
                Button { importing = true } label: { Label("导入网页或 App 备份", systemImage: "square.and.arrow.down") }
                    .buttonStyle(FangguOutlineButton())
                Text("网页和 App 各自保存记录。网页先导出 JSON，再在这里导入；同一古迹以导入值覆盖，其余保留。")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineSpacing(5)
                if let message { Text(message).font(FangguFont.serif(12)).foregroundStyle(Palette.red) }
            }
            .padding(.horizontal, 24).padding(.top, 36).padding(.bottom, 70)
        }
        .background(Palette.ink.ignoresSafeArea())
        .navigationBarTitleDisplayMode(.inline)
        .toolbar { ToolbarItem(placement: .principal) { FangguBrand() } }
        .toolbarBackground(Palette.ink, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .fileImporter(isPresented: $importing, allowedContentTypes: [.json]) { result in
            do {
                let url = try result.get()
                let access = url.startAccessingSecurityScopedResource()
                defer { if access { url.stopAccessingSecurityScopedResource() } }
                try library.importBackup(Data(contentsOf: url))
                message = "备份已导入"
            } catch { message = "导入失败：\(error.localizedDescription)" }
        }
        .fileExporter(isPresented: $exporting, document: exportDocument, contentType: .json, defaultFilename: "访古备份") { result in
            if case .failure(let error) = result { message = "导出失败：\(error.localizedDescription)" }
        }
    }

    private func count(_ title: String, _ number: Int) -> some View {
        VStack(spacing: 5) {
            Text(number.formatted()).font(FangguFont.brush(31)).foregroundStyle(Palette.gold)
            Text(title).font(FangguFont.mono(10)).foregroundStyle(Palette.paper2)
        }
        .frame(maxWidth: .infinity)
        .padding(.vertical, 16)
        .background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
    }

    private func siteRow(_ site: Monument) -> some View {
        NavigationLink(value: site) {
            TimelineSiteRow(site: site)
        }
        .buttonStyle(.plain)
    }

    private func sectionTitle(_ text: String) -> some View {
        Text(text).font(FangguFont.serif(22)).foregroundStyle(Palette.paper)
    }

    private func empty(_ text: String) -> some View {
        Text(text).font(FangguFont.serif(13)).foregroundStyle(Palette.paper3)
            .frame(maxWidth: .infinity, minHeight: 100)
            .background(Palette.ink2)
            .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
    }

    private func prepareExport() {
        do { exportDocument = try library.backup(); exporting = true }
        catch { message = "导出失败：\(error.localizedDescription)" }
    }
}

private struct LegacyLinkRow: View {
    @EnvironmentObject private var library: LibraryStore
    let item: LegacySite
    @State private var target = ""

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(item.name).font(FangguFont.serif(16)).foregroundStyle(Palette.paper)
            Text(item.place).font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
            Picker("关联图版", selection: $target) {
                Text("选择古迹").tag("")
                ForEach(library.monuments) { site in Text("\(site.name) · \(site.place)").tag(site.id) }
            }
            Button("关联") {
                if let site = library.monuments.first(where: { $0.id == target }) { library.linkLegacy(item.id, to: site) }
            }
            .disabled(target.isEmpty)
            .buttonStyle(FangguOutlineButton())
        }
        .padding(14).background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
    }
}
