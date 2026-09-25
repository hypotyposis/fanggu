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
        List {
            Section {
                HStack(spacing: 18) {
                    count("已到访", visited.count)
                    count("心愿", wishes.count)
                    count("收录", library.monuments.count)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 12)
            }
            Section("备份与迁移") {
                Button { prepareExport() } label: { Label("导出访古备份", systemImage: "square.and.arrow.up") }
                Button { importing = true } label: { Label("导入网页或 App 备份", systemImage: "square.and.arrow.down") }
                Text("网页和 App 各自保存记录。网页先导出 JSON，再在这里导入；同一古迹以导入值覆盖，其余保留。")
                    .font(.caption).foregroundStyle(.secondary)
                if let message { Text(message).font(.footnote).foregroundStyle(Palette.red) }
            }
            if !legacy.isEmpty {
                Section("旧记录待关联") {
                    ForEach(legacy) { item in LegacyLinkRow(item: item) }
                }
            }
            Section("已到访") {
                if visited.isEmpty { Text("还没有到访记录").foregroundStyle(.secondary) }
                ForEach(visited) { site in siteRow(site) }
            }
            Section("心愿单") {
                if wishes.isEmpty { Text("还没有心愿").foregroundStyle(.secondary) }
                ForEach(wishes) { site in siteRow(site) }
            }
        }
        .scrollContentBackground(.hidden)
        .background(Palette.paper)
        .navigationTitle("我的访古")
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
        VStack(spacing: 4) {
            Text(number.formatted()).font(.title.weight(.semibold)).foregroundStyle(Palette.red)
            Text(title).font(.caption).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity)
    }

    private func siteRow(_ site: Monument) -> some View {
        NavigationLink(value: site) {
            VStack(alignment: .leading, spacing: 3) {
                Text(site.name).font(.headline)
                Text(site.place).font(.caption).foregroundStyle(.secondary)
            }
        }
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
            Text(item.name).font(.headline)
            Text(item.place).font(.caption).foregroundStyle(.secondary)
            Picker("关联图版", selection: $target) {
                Text("选择古迹").tag("")
                ForEach(library.monuments) { site in Text("\(site.name) · \(site.place)").tag(site.id) }
            }
            Button("关联") {
                if let site = library.monuments.first(where: { $0.id == target }) { library.linkLegacy(item.id, to: site) }
            }
            .disabled(target.isEmpty)
        }
    }
}
