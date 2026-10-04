import SwiftUI
import UniformTypeIdentifiers

struct MyLibraryView: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    @Environment(\.openURL) private var openURL
    @AppStorage(AppAppearance.storageKey, store: AppAppearance.store) private var appearance = AppAppearance.system.rawValue
    @State private var importing = false
    @State private var exporting = false
    @State private var exportDocument: BackupDocument?
    @State private var message: String?

    private var visited: [Monument] { library.monuments.filter { library.record(for: $0).status == .visited } }
    private var wishes: [Monument] { library.monuments.filter { library.record(for: $0).status == .wishlist } }
    private var legacy: [LegacySite] { library.data.customSites.filter { library.data.links[$0.id] == nil } }

    var body: some View {
        let visited = visited
        let wishes = wishes
        let legacy = legacy
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 28) {
                FangguSectionTitle(eyebrow: "亲见 · 所愿 · 私人记录", title: "我的访古", subtitle: "把到访和心愿，慢慢写成自己的古迹图鉴。")
                if dynamicTypeSize.isAccessibilitySize {
                    VStack(spacing: 10) {
                        count("已到访", visited.count)
                        count("心愿单", wishes.count)
                        count("收录", library.monuments.count)
                    }
                } else {
                    HStack(spacing: 12) {
                        count("已到访", visited.count)
                        count("心愿单", wishes.count)
                        count("收录", library.monuments.count)
                    }
                }
                FangguRule()
                if !library.curations.isEmpty {
                    sectionTitle("专题进度")
                    ForEach(library.curations) { list in
                        NavigationLink(value: list) { CurationSummaryRow(curation: list) }
                            .buttonStyle(.plain)
                    }
                }
                NavigationLink { CollectionProgressView() } label: {
                    HStack {
                        Label("按时代、省份、类型看收集进度", systemImage: "chart.bar")
                        Spacer()
                        Image(systemName: "chevron.right").font(.system(size: 11))
                    }
                    .frame(maxWidth: .infinity)
                }
                .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
                .accessibilityIdentifier("collection-progress-link")
                FangguRule()
                VStack(alignment: .leading, spacing: 12) {
                    sectionTitle("外观")
                    Picker("外观模式", selection: $appearance) {
                        ForEach(AppAppearance.allCases) { mode in
                            Text(mode.title).tag(mode.rawValue)
                        }
                    }
                    .pickerStyle(.segmented)
                    .accessibilityIdentifier("appearance-picker")
                    Text("亮色如纸，深色如墨。跟随系统会随设备外观切换。")
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2).lineSpacing(5)
                }
                FangguRule()
                languageSection
                FangguRule()
                NearbyReminderSection()
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
                Button { importing = true } label: { Label("导入备份", systemImage: "square.and.arrow.down") }
                    .buttonStyle(FangguOutlineButton())
                Text("从 JSON 备份恢复记录；同一古迹以导入值覆盖，其余保留。")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineSpacing(5)
                Text("支持旧版备份；新版备份包含六维评价，可用于换机迁移。")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineSpacing(5)
                if let message { Text(message).font(FangguFont.serif(12)).foregroundStyle(Palette.redText) }
            }
            .padding(.horizontal, 24).padding(.top, 36).padding(.bottom, 70)
        }
        .background(Palette.ink.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
        .fileImporter(isPresented: $importing, allowedContentTypes: [.json]) { result in
            do {
                let url = try result.get()
                let access = url.startAccessingSecurityScopedResource()
                defer { if access { url.stopAccessingSecurityScopedResource() } }
                try library.importBackup(Data(contentsOf: url))
                message = String(localized: "备份已导入")
                Haptics.success()
            } catch {
                if !Self.isCancellation(error) { message = String(localized: "导入失败：\(error.localizedDescription)"); Haptics.error() }
            }
        }
        .fileExporter(isPresented: $exporting, document: exportDocument, contentType: .json, defaultFilename: String(localized: "访古备份")) { result in
            if case .failure(let error) = result, !Self.isCancellation(error) {
                message = String(localized: "导出失败：\(error.localizedDescription)")
                Haptics.error()
            }
        }
    }

    private var languageSection: some View {
        VStack(alignment: .leading, spacing: 12) {
            sectionTitle("语言")
            Button {
                if let url = URL(string: UIApplication.openSettingsURLString) { openURL(url) }
            } label: {
                HStack {
                    Text(verbatim: AppLanguage.current.displayName)
                    Spacer()
                    Text("在系统设置中更改")
                    Image(systemName: "arrow.up.forward")
                }
            }
            .buttonStyle(FangguOutlineButton())
            .accessibilityHint("打开系统设置，为访古选择语言")
            .accessibilityIdentifier("language-settings")
            Text("访古跟随系统语言，支持简体中文、English 与日本語。可在系统设置中为访古单独选择语言。")
                .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2).lineSpacing(5)
        }
    }

    private func count(_ title: LocalizedStringKey, _ number: Int) -> some View {
        Group {
            if dynamicTypeSize.isAccessibilitySize {
                HStack {
                    Text(title).font(FangguFont.serif(16)).foregroundStyle(Palette.paper2)
                    Spacer()
                    FangguMetricNumber(value: number, size: 20)
                }
            } else {
                VStack(spacing: 5) {
                    FangguMetricNumber(value: number, size: 31)
                    Text(title).font(FangguFont.mono(10)).foregroundStyle(Palette.paper2)
                }
            }
        }
        .frame(maxWidth: .infinity)
        .padding(dynamicTypeSize.isAccessibilitySize ? 16 : 0)
        .padding(.vertical, dynamicTypeSize.isAccessibilitySize ? 0 : 16)
        .background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
    }

    private func siteRow(_ site: Monument) -> some View {
        NavigationLink(value: site) {
            TimelineSiteRow(site: site)
        }
        .buttonStyle(.plain)
    }

    private func sectionTitle(_ text: LocalizedStringKey) -> some View {
        Text(text).font(FangguFont.serif(22)).foregroundStyle(Palette.paper)
    }

    private func empty(_ text: LocalizedStringKey) -> some View {
        Text(text).font(FangguFont.serif(13)).foregroundStyle(Palette.paper3)
            .frame(maxWidth: .infinity, minHeight: 100)
            .background(Palette.ink2)
            .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
    }

    private func prepareExport() {
        do { exportDocument = try library.backup(); exporting = true }
        catch { message = String(localized: "导出失败：\(error.localizedDescription)"); Haptics.error() }
    }

    private static func isCancellation(_ error: Error) -> Bool {
        let nsError = error as NSError
        return nsError.domain == NSCocoaErrorDomain && nsError.code == NSUserCancelledError
    }
}

/// Opt-in proximity reminders. The toggle is the only thing stored; location never is.
private struct NearbyReminderSection: View {
    @EnvironmentObject private var nearby: LocationCenter

    private var enabled: Binding<Bool> {
        Binding(get: { nearby.enabled }, set: { value in
            nearby.setEnabled(value)
            Haptics.selection()
        })
    }
    private var problem: Bool {
        nearby.enabled && (nearby.authorization == .denied || nearby.authorization == .restricted || nearby.notificationsAuthorized == false)
    }
    private var needsSettings: Bool {
        problem || (nearby.enabled && nearby.authorization == .authorizedWhenInUse)
    }
    private var status: String {
        guard nearby.enabled else { return "开启后会请求定位与通知权限。App 不在前台时也要提醒，需要把定位设为“始终允许”。" }
        let notifications = nearby.notificationsAuthorized == false ? " 通知权限已关闭，提醒无法显示。" : ""
        switch nearby.authorization {
        case .denied, .restricted: return "定位权限已关闭，请在系统设置中允许访古使用位置。" + notifications
        case .notDetermined: return "等待定位授权。" + notifications
        case .authorizedWhenInUse:
            return "目前只在使用 App 时定位。要在不打开 App 时也收到提醒，请在系统设置中改为“始终允许”。" + notifications
        case .authorizedAlways:
            return (nearby.monitoredIDs.isEmpty ? "已开启，等待首次定位后开始监控附近古迹。"
                    : "已监控最近的 \(nearby.monitoredIDs.count) 处未打卡古迹。") + notifications
        @unknown default: return notifications
        }
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("附近提醒").font(FangguFont.serif(22)).foregroundStyle(Palette.paper)
            Toggle(isOn: enabled) {
                Text("靠近未打卡的古迹时提醒我").font(FangguFont.serif(15)).foregroundStyle(Palette.paper)
            }
            .tint(Palette.gold)
            .accessibilityIdentifier("nearby-reminder-toggle")
            Text(status)
                .font(FangguFont.serif(12)).foregroundStyle(problem ? Palette.redText : Palette.paper2).lineSpacing(5)
                .accessibilityIdentifier("nearby-reminder-status")
            if needsSettings {
                Button { nearby.openSystemSettings() } label: { Label("打开系统设置", systemImage: "gear") }
                    .buttonStyle(FangguOutlineButton())
            }
            Text("只对登记了本体坐标的 \(nearby.targetCount) 处古迹提醒，范围 3 公里，同一处每天最多一次。位置只在本机比较距离，不保存，也不进入备份。")
                .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineSpacing(5)
        }
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
                ForEach(library.monuments) { site in Text(verbatim: "\(site.name) · \(site.place)").tag(site.id) }
            }
            Button("关联") {
                if let site = library.monuments.first(where: { $0.id == target }) {
                    if library.linkLegacy(item.id, to: site) { Haptics.soft() }
                    else { Haptics.error() }
                }
            }
            .disabled(target.isEmpty)
            .buttonStyle(FangguOutlineButton())
        }
        .padding(14).background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
    }
}
