import SwiftUI

struct TimelineView: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    @State private var lane = 0
    @State private var period = "all"
    @State private var selectedCluster: String?
    @State private var visibleCount = 8

    private var catalog: TimelineCatalog { library.timeline }
    private var periods: [(String, String)] {
        catalog.periods.filter { $0.0 == "all" || !catalog.sites(lane: lane, period: $0.0).isEmpty }
    }
    private var groups: [TimelineCluster] { catalog.groups(lane: lane, period: period) }
    private var currentGroup: TimelineCluster? { groups.first { $0.id == selectedCluster } }
    private var selected: [Monument] { currentGroup?.sites ?? catalog.sites(lane: lane, period: period) }
    private var visitedCount: Int { selected.filter { library.record(for: $0).status == .visited }.count }
    private var periodName: String { catalog.periods.first { $0.0 == period }?.1 ?? "全部时期" }
    private var range: ClosedRange<Int>? {
        guard let first = selected.first, let last = selected.last else { return nil }
        if currentGroup != nil || period == "all" { return first.year...last.year }
        return (selected.map(\.dynastyStart).min() ?? first.year)...(selected.map(\.dynastyEnd).max() ?? last.year)
    }
    private var rangeText: String {
        guard let range else { return "暂无古迹" }
        return range.lowerBound == range.upperBound ? "\(range.lowerBound) 年" : "\(range.lowerBound)–\(range.upperBound) 年"
    }
    private var focusYear: Int {
        // Center the first actual monument in the chosen era, not an empty interval.
        let year = currentGroup?.sites.first?.year ?? selected.first?.year ?? 0
        return max(0, min(2100, Int((Double(year) / 50).rounded()) * 50))
    }
    private func regionalTitle(_ title: String) -> String {
        let prefix = TimelineCatalog.tracks[lane] + " · "
        return title.hasPrefix(prefix) ? String(title.dropFirst(prefix.count)) : title
    }
    private var focusKey: String { "\(lane):\(period):\(selectedCluster ?? "all")" }

    private func selectPeriod(_ key: String) {
        if key != "all", catalog.sites(lane: lane, period: key).isEmpty,
           let site = catalog.sitesByPeriod[key]?.first { lane = TimelineCatalog.laneIndex(site) }
        period = key
        selectedCluster = nil
        visibleCount = 8
        Haptics.selection()
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                FangguSectionTitle(eyebrow: "东汉至今 · 东亚与东南亚", title: "年表", subtitle: "按地域与时期，细读现存主体的年代。")
                if dynamicTypeSize.isAccessibilitySize {
                    VStack(spacing: 10) { regionMenu; periodMenu }
                } else {
                    ViewThatFits(in: .horizontal) {
                        HStack(spacing: 10) { regionMenu; periodMenu }
                        VStack(spacing: 10) { regionMenu; periodMenu }
                    }
                }
                ScrollViewReader { proxy in
                    ScrollView(.horizontal) {
                        HStack(spacing: 8) {
                            ForEach(periods, id: \.0) { key, title in
                                Button(regionalTitle(title)) { selectPeriod(key) }
                                    .font(FangguFont.serif(14))
                                    .foregroundStyle(period == key ? Palette.ink : Palette.paper)
                                    .padding(.horizontal, 14).frame(minHeight: 44)
                                    .background(period == key ? Palette.gold : Palette.ink2)
                                    .overlay(Rectangle().stroke(Palette.gold.opacity(0.4), lineWidth: 1))
                                    .accessibilityAddTraits(period == key ? .isSelected : [])
                                    .accessibilityIdentifier("timeline-period-\(key)")
                                    .id(key)
                            }
                        }
                    }
                    .scrollIndicators(.hidden)
                    .onChange(of: period) { _, key in withAnimation { proxy.scrollTo(key, anchor: .center) } }
                    .onChange(of: lane) { _, _ in proxy.scrollTo(period, anchor: .center) }
                }
                VStack(alignment: .leading, spacing: 6) {
                    Text("\(TimelineCatalog.tracks[lane]) · \(currentGroup == nil ? regionalTitle(periodName) : rangeText)")
                        .font(FangguFont.serif(19)).foregroundStyle(Palette.paper)
                        .accessibilityIdentifier("timeline-selection-title")
                    Text("\(currentGroup == nil ? rangeText : Array(Set(selected.map(\.dynastyName))).sorted().joined(separator: "、")) · 已到访 \(visitedCount) / \(selected.count) 处")
                        .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2)
                        .accessibilityIdentifier("timeline-selection-summary")
                }
                timelineGraphic
                ViewThatFits(in: .horizontal) {
                    HStack(spacing: 14) { legends }
                    VStack(alignment: .leading, spacing: 6) { legends }
                }
                Text("等距时间轴 · 每格 100 年 · 左右滑动")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                FangguRule()
                HStack {
                    Text("对应古迹 · \(selected.count) 处").font(FangguFont.serif(18)).foregroundStyle(Palette.paper)
                    Spacer()
                    if currentGroup != nil {
                        Button("取消选点") { selectedCluster = nil; visibleCount = 8 }
                            .font(FangguFont.serif(13)).foregroundStyle(Palette.gold).frame(minHeight: 44)
                            .accessibilityIdentifier("timeline-clear-point")
                    }
                }
                ForEach(Array(selected.prefix(visibleCount))) { site in
                    NavigationLink(value: site) { TimelineSiteRow(site: site) }.buttonStyle(.plain)
                        .accessibilityIdentifier("timeline-site-\(site.id)")
                }
                if visibleCount < selected.count {
                    Button("显示更多 · 已显示 \(min(visibleCount, selected.count)) / \(selected.count)") { visibleCount += 12 }
                        .buttonStyle(FangguOutlineButton()).frame(maxWidth: .infinity)
                }
                DisclosureGroup("读图说明") {
                    Text("中国北方、中国南方、日本、东南亚与朝鲜半岛分别浏览。所有时期可从菜单切换；浅色带表示所选时期或年份范围，外圈表示选中圆点。数字是邻近年份的古迹数，半圆表示其中部分已到访。年代对应图版所绘主体，部分仅作约略定位，确切纪年与重修沿革以详情为准。")
                        .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2).lineSpacing(5)
                }
                .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
            }
            .padding(.horizontal, 24).padding(.top, 24).padding(.bottom, 24)
        }
        .background(Palette.ink.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }

    private var regionMenu: some View {
        Menu {
            ForEach(TimelineCatalog.tracks.indices, id: \.self) { index in
                Button(TimelineCatalog.tracks[index]) {
                    lane = index; period = "all"; selectedCluster = nil; visibleCount = 8
                    Haptics.selection()
                }
                .accessibilityIdentifier("timeline-region-choice-\(index)")
            }
        } label: { menuLabel(TimelineCatalog.tracks[lane]) }
        .accessibilityIdentifier("timeline-region-menu")
    }
    private var periodMenu: some View {
        Menu {
            ForEach(catalog.periods, id: \.0) { key, title in
                Button(title) { selectPeriod(key) }
                    .accessibilityIdentifier("timeline-period-choice-\(key)")
            }
        } label: { menuLabel(regionalTitle(periodName)) }
        .accessibilityLabel("选择时期，\(periodName)")
        .accessibilityIdentifier("timeline-period-menu")
    }
    private func menuLabel(_ title: String) -> some View {
        HStack(spacing: 10) { Text(title).fixedSize(horizontal: false, vertical: true); Spacer(minLength: 4); Image(systemName: "chevron.down") }
            .font(FangguFont.serif(15)).foregroundStyle(Palette.paper)
            .padding(12).frame(minHeight: 44).background(Palette.ink2)
            .overlay(Rectangle().stroke(Palette.paper.opacity(0.22), lineWidth: 1))
    }

    private var timelineGraphic: some View {
        ScrollViewReader { proxy in
            ScrollView(.horizontal) {
                ZStack(alignment: .topLeading) {
                    Palette.ink2
                    HStack(spacing: 0) {
                        Color.clear.frame(width: 24)
                        ForEach(Array(stride(from: 0, through: 2100, by: 50)), id: \.self) { year in
                            Color.clear.frame(width: 35, height: 150).id("year-\(year)")
                        }
                    }.accessibilityHidden(true)
                    if (period != "all" || currentGroup != nil), let range {
                        Rectangle().fill(Palette.gold.opacity(0.14))
                            .frame(width: max(4, TimelineCatalog.x(range.upperBound) - TimelineCatalog.x(range.lowerBound)), height: 90)
                            .offset(x: TimelineCatalog.x(range.lowerBound), y: 38)
                            .accessibilityHidden(true)
                    }
                    ForEach(Array(stride(from: 0, through: 2100, by: 100)), id: \.self) { year in
                        let x = TimelineCatalog.x(year)
                        Rectangle().fill(Palette.paper.opacity(0.15)).frame(width: 1, height: 95).offset(x: x, y: 34)
                        Text(String(year)).font(FangguFont.mono(11)).foregroundStyle(Palette.paper2).position(x: x, y: 19)
                    }.accessibilityHidden(true)
                    Rectangle().fill(Palette.goldDim).frame(width: TimelineCatalog.width - 48, height: 1).offset(x: 24, y: 94)
                        .accessibilityHidden(true)
                    ForEach(groups) { group in
                        let count = group.sites.filter { library.record(for: $0).status == .visited }.count
                        let isSelected = selectedCluster == group.id
                        Button {
                            selectedCluster = group.id; visibleCount = 8; Haptics.selection()
                        } label: {
                            TimelineMarker(visited: count, total: group.sites.count, selected: isSelected)
                                .frame(width: 44, height: 44)
                        }
                        .buttonStyle(.plain).position(x: group.x, y: 94)
                        .accessibilityLabel("\(group.sites.first?.year ?? 0)–\(group.sites.last?.year ?? 0) 年，\(group.sites.count) 处古迹")
                        .accessibilityValue("已到访 \(count) / \(group.sites.count)")
                        .accessibilityAddTraits(isSelected ? .isSelected : [])
                        .accessibilityIdentifier("timeline-marker-\(group.id)")
                    }
                }
                .frame(width: TimelineCatalog.width, height: 150)
            }
            .scrollIndicators(.visible)
            .overlay(Rectangle().stroke(Palette.goldDim.opacity(0.4), lineWidth: 1))
            .accessibilityIdentifier("timeline-graphic")
            .onAppear { proxy.scrollTo("year-\(focusYear)", anchor: .center) }
            .onChange(of: focusKey) { _, _ in
                withAnimation { proxy.scrollTo("year-\(focusYear)", anchor: .center) }
            }
        }
    }

    @ViewBuilder private var legends: some View {
        legend("circle.fill", "全部到访")
        legend("circle.lefthalf.filled", "部分到访")
        legend("circle", "尚未到访")
    }
    private func legend(_ symbol: String, _ title: String) -> some View {
        Label(title, systemImage: symbol).font(FangguFont.serif(11)).foregroundStyle(Palette.paper2)
    }
}

private struct TimelineMarker: View {
    let visited: Int
    let total: Int
    let selected: Bool
    var body: some View {
        ZStack {
            Circle().fill(Palette.ink).frame(width: 30, height: 30)
            Image(systemName: visited == 0 ? "circle" : visited == total ? "circle.fill" : "circle.lefthalf.filled")
                .font(.system(size: 30)).foregroundStyle(Palette.gold)
            if total > 1 {
                Text("\(total)").font(FangguFont.mono(11))
                    .foregroundStyle(visited == total ? Palette.ink : Palette.paper)
                    .padding(.horizontal, 3).background(visited == total ? Palette.gold : Palette.ink, in: Capsule())
            }
            if selected { Circle().stroke(Palette.paper, lineWidth: 2).frame(width: 40, height: 40) }
        }
    }
}
