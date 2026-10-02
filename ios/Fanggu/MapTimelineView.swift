import SwiftUI

struct AtlasMapView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var selection: MapSelection?
    @State private var search = ""
    let onBrowse: () -> Void

    private var visited: [Monument] { library.monuments.filter { library.record(for: $0).status == .visited } }
    private var places: [String: [Monument]] { Dictionary(grouping: visited, by: \.placeKey) }
    private var coordinates: [SketchMapPlace] {
        places.keys.sorted().compactMap { key in
            guard let site = places[key]?.first else { return nil }
            return SketchMapPlace(id: key, latitude: site.latitude, longitude: site.longitude)
        }
    }
    private var matchingPlaces: [Monument] {
        let query = search.trimmingCharacters(in: .whitespacesAndNewlines)
        return places.values.compactMap(\.first).filter { site in
            query.isEmpty || [site.placeName, site.province, site.place]
                .contains { $0.localizedStandardContains(query) }
                || (places[site.placeKey] ?? []).contains { $0.name.localizedStandardContains(query) }
        }.sorted { $0.placeName.localizedStandardCompare($1.placeName) == .orderedAscending }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                FangguSectionTitle(eyebrow: "亲见 · 行迹所至", title: "到访地图", subtitle: "点亮已经到访的地方，点选地点细读古迹。")
                if visited.isEmpty {
                    VStack(alignment: .leading, spacing: 14) {
                        Text("地图上还没有足迹")
                            .font(FangguFont.serif(22)).foregroundStyle(Palette.paper)
                        Text("在图鉴中记录第一处到访，足迹就会出现在这里。")
                            .font(FangguFont.serif(15)).foregroundStyle(Palette.paper2)
                        Button("浏览图鉴") { onBrowse() }
                            .buttonStyle(FangguOutlineButton())
                    }
                    .frame(maxWidth: .infinity, alignment: .leading)
                    .padding(20)
                    .background(Palette.ink2)
                    .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
                } else {
                    ViewThatFits(in: .horizontal) {
                        HStack(alignment: .firstTextBaseline, spacing: 8) { visitCount }
                        VStack(alignment: .leading, spacing: 4) { visitCount }
                    }
                    GeometryReader { geometry in
                        let projection = SketchMapProjection(size: geometry.size, places: coordinates)
                        let clusters = projection.clusters(coordinates)
                        ZStack(alignment: .topLeading) {
                            SketchMapGrid(projection: projection)
                            ForEach(clusters) { cluster in
                                Button { openPlaces(cluster.placeIDs) } label: {
                                    Circle()
                                        .fill(cluster.placeIDs.count > 1 ? Palette.gold : accent(for: cluster))
                                        .frame(width: cluster.placeIDs.count > 1 ? 30 : 10,
                                               height: cluster.placeIDs.count > 1 ? 30 : 10)
                                        .overlay {
                                            if cluster.placeIDs.count > 1 {
                                                Text("\(cluster.placeIDs.count)")
                                                    .font(.system(size: 12, weight: .semibold, design: .monospaced))
                                                    .foregroundStyle(Palette.ink)
                                            }
                                        }
                                        .frame(width: 44, height: 44)
                                        .contentShape(Circle())
                                }
                                .buttonStyle(.plain)
                                .position(cluster.point)
                                .accessibilityLabel(cluster.placeIDs.count > 1
                                    ? "\(cluster.placeIDs.count) 个邻近到访地点，点选展开"
                                    : "\(places[cluster.id]?.first?.placeName ?? "地点")，点选查看古迹")
                                .accessibilityIdentifier("map-marker-\(cluster.id)")
                            }
                        }
                        .accessibilityElement(children: .contain)
                        .accessibilityIdentifier("visited-map")
                    }
                    .frame(height: 280)
                    Text("数字为邻近地点数 · 点选圆点查看古迹")
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
                    FangguRule()
                    Text("到访地点").font(FangguFont.serif(20)).foregroundStyle(Palette.paper)
                    FangguField(placeholder: "搜索地点、省份或古迹", text: $search)
                        .accessibilityIdentifier("map-place-search")
                    LazyVStack(spacing: 0) {
                        ForEach(matchingPlaces) { site in
                            Button { openPlaces([site.placeKey]) } label: {
                                HStack(spacing: 12) {
                                    VStack(alignment: .leading, spacing: 5) {
                                        Text(site.placeName).font(FangguFont.serif(16)).foregroundStyle(Palette.paper)
                                        Text(site.province).font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                                    }
                                    Spacer(minLength: 8)
                                    Text("\(places[site.placeKey]?.count ?? 0) 处")
                                        .font(FangguFont.mono(12)).foregroundStyle(Palette.gold)
                                    Image(systemName: "chevron.right").font(.system(size: 11)).foregroundStyle(Palette.paper3)
                                }
                                .padding(.vertical, 14).contentShape(Rectangle())
                            }
                            .buttonStyle(.plain)
                            .accessibilityIdentifier("map-place-\(site.placeKey)")
                            FangguRule()
                        }
                        if matchingPlaces.isEmpty {
                            Text("没有匹配的到访地点").font(FangguFont.serif(14))
                                .foregroundStyle(Palette.paper2).padding(.vertical, 20)
                        }
                    }
                }
            }
            .padding(.horizontal, 24).padding(.top, 24).padding(.bottom, 24)
        }
        .scrollDismissesKeyboard(.interactively)
        .background(Palette.ink.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
        .sheet(item: $selection) { selected in
            NavigationStack {
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 12) {
                        ForEach(selected.placeIDs, id: \.self) { key in
                            if let sites = places[key], let first = sites.first {
                                Text(first.placeName).font(FangguFont.serif(20)).foregroundStyle(Palette.gold)
                                    .padding(.top, 8)
                                ForEach(sites) { site in
                                    NavigationLink(value: site) { TimelineSiteRow(site: site) }.buttonStyle(.plain)
                                }
                            }
                        }
                    }.padding(20)
                }
                .background(Palette.ink)
                .navigationTitle(selected.placeIDs.count == 1
                    ? (places[selected.placeIDs[0]]?.first?.placeName ?? "到访地点") : "邻近到访地点")
                .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
                .toolbar { Button("关闭") { selection = nil } }
            }
            .fangguAppearance()
        }
    }

    @ViewBuilder private var visitCount: some View {
        FangguMetricNumber(value: visited.count, size: 38)
        Text("处已到访 · \(places.count) 个地点")
            .font(FangguFont.mono(12)).foregroundStyle(Palette.paper2)
    }

    private func accent(for cluster: SketchMapCluster) -> Color {
        places[cluster.id]?.first?.accent ?? Palette.gold
    }

    private func openPlaces(_ ids: [String]) {
        selection = MapSelection(placeIDs: ids)
        Haptics.selection()
    }
}

private struct MapSelection: Identifiable {
    let placeIDs: [String]
    var id: String { placeIDs.joined(separator: ".") }
}

private struct SketchMapGrid: View {
    let projection: SketchMapProjection

    var body: some View {
        Canvas { context, size in
            context.fill(Path(CGRect(origin: .zero, size: size)), with: .color(Palette.ink2))
            let frame = projection.frame
            context.stroke(Path(frame), with: .color(Palette.goldDim.opacity(0.35)), lineWidth: 1)
            let latStep = projection.latitudeStep
            let lonStep = projection.longitudeStep
            for lat in stride(from: ceil(projection.latitude.lowerBound / latStep) * latStep,
                              through: projection.latitude.upperBound, by: latStep) {
                let y = projection.point(latitude: lat, longitude: projection.centerLon).y
                var line = Path(); line.move(to: CGPoint(x: frame.minX, y: y)); line.addLine(to: CGPoint(x: frame.maxX, y: y))
                context.stroke(line, with: .color(Palette.paper.opacity(0.08)), style: StrokeStyle(lineWidth: 1, dash: [2, 5]))
                context.draw(Text("\(Int(abs(lat)))°\(lat < 0 ? "S" : "N")").font(FangguFont.mono(9)).foregroundColor(Palette.paper3),
                             at: CGPoint(x: frame.minX - 6, y: y), anchor: .trailing)
            }
            for lon in stride(from: ceil(projection.longitude.lowerBound / lonStep) * lonStep,
                              through: projection.longitude.upperBound, by: lonStep) {
                let x = projection.point(latitude: projection.centerLat, longitude: lon).x
                var line = Path(); line.move(to: CGPoint(x: x, y: frame.minY)); line.addLine(to: CGPoint(x: x, y: frame.maxY))
                context.stroke(line, with: .color(Palette.paper.opacity(0.08)), style: StrokeStyle(lineWidth: 1, dash: [2, 5]))
                context.draw(Text("\(Int(abs(lon)))°\(lon < 0 ? "W" : "E")").font(FangguFont.mono(9)).foregroundColor(Palette.paper3),
                             at: CGPoint(x: x, y: frame.maxY + 16))
            }
        }
        .accessibilityHidden(true)
    }
}

struct TimelineView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var period = "all"
    @State private var cluster: Set<String> = []
    @State private var visibleCount = 8

    private let tracks = ["北", "南", "日本", "东南亚", "朝鲜半岛"]
    private var sorted: [Monument] { library.monuments.sorted { $0.year == $1.year ? $0.id < $1.id : $0.year < $1.year } }
    private var periods: [(String, String)] {
        let names = Dictionary(sorted.map { ($0.dynasty, $0.dynastyName) }, uniquingKeysWith: { first, _ in first })
        return [("all", "全部时期")] + names.keys.sorted { a, b in
            (sorted.first { $0.dynasty == a }?.year ?? 0) < (sorted.first { $0.dynasty == b }?.year ?? 0)
        }.map { ($0, names[$0] ?? $0) }
    }
    private var selected: [Monument] {
        if !cluster.isEmpty { return sorted.filter { cluster.contains($0.id) } }
        return period == "all" ? sorted : sorted.filter { $0.dynasty == period }
    }
    private var visible: [Monument] { Array(selected.prefix(visibleCount)) }
    private var quickPeriods: [(String, String)] {
        Array(periods.dropFirst().sorted { lhs, rhs in
            sorted.filter { $0.dynasty == lhs.0 }.count > sorted.filter { $0.dynasty == rhs.0 }.count
        }.prefix(4))
    }

    private func selectPeriod(_ key: String) {
        guard period != key || !cluster.isEmpty else { return }
        period = key
        cluster = []
        visibleCount = 8
        Haptics.selection()
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 17) {
                FangguSectionTitle(eyebrow: "东汉至今 · 东亚与东南亚", title: "年表", subtitle: "沿现存主体的年代，细读石与木的足迹。")
                Menu {
                    ForEach(periods, id: \.0) { key, title in
                        Button("\(title) · \(key == "all" ? sorted.count : sorted.filter { $0.dynasty == key }.count) 处") {
                            selectPeriod(key)
                        }
                    }
                } label: {
                    HStack {
                        Text(periods.first { $0.0 == period }?.1 ?? "全部时期")
                        Spacer()
                        Image(systemName: "chevron.down")
                    }
                    .font(FangguFont.serif(15)).foregroundStyle(Palette.paper)
                    .padding(12).background(Palette.ink2)
                    .overlay(Rectangle().stroke(Palette.paper.opacity(0.22), lineWidth: 1))
                }
                ScrollView(.horizontal) {
                    HStack(spacing: 8) {
                        ForEach(quickPeriods, id: \.0) { key, title in
                            Button(title) { selectPeriod(key) }
                                .font(FangguFont.serif(13))
                                .foregroundStyle(period == key ? Palette.ink : Palette.paper)
                                .padding(.horizontal, 14)
                                .frame(minHeight: 44)
                                .background(period == key ? Palette.gold : Palette.ink2)
                                .overlay(Rectangle().stroke(Palette.gold.opacity(0.45), lineWidth: 1))
                                .accessibilityAddTraits(period == key ? .isSelected : [])
                        }
                    }
                }
                .scrollIndicators(.hidden)
                timelineGraphic
                HStack(spacing: 16) {
                    legend("●", "已到访")
                    legend("○", "尚未到访")
                    Text("← 左右滑动年表 →")
                        .font(FangguFont.mono(10)).foregroundStyle(Palette.paper3)
                }
                FangguRule()
                HStack {
                    VStack(alignment: .leading, spacing: 2) {
                        Text(cluster.isEmpty ? (periods.first { $0.0 == period }?.1 ?? "全部时期") : "选中年代")
                            .font(FangguFont.serif(18)).foregroundStyle(Palette.paper)
                        Text("\(selected.count) 处古迹")
                            .font(FangguFont.mono(11)).foregroundStyle(Palette.paper3)
                    }
                    Spacer()
                }
                .foregroundStyle(Palette.paper2)
                if period != "all" || !cluster.isEmpty {
                    Button("查看全部") { selectPeriod("all") }
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.gold)
                }
                ForEach(visible) { site in
                    NavigationLink(value: site) { TimelineSiteRow(site: site) }.buttonStyle(.plain)
                }
                if visibleCount < selected.count {
                    Button("显示更多 · 已显示 \(visible.count) / \(selected.count)") {
                        visibleCount += 12
                    }
                    .buttonStyle(FangguOutlineButton())
                    .frame(maxWidth: .infinity)
                }
                DisclosureGroup("读图说明") {
                    Text("中国部分按北、南两线排列，日本、东南亚与朝鲜半岛分别单列。点选圆点展开古迹；邻近年份合并为一个数字圆点。年代对应图版所绘主体，部分仅作约略定位，确切纪年与重修沿革以详情为准。")
                        .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2).lineSpacing(5)
                }
                .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                .padding(.top, 10)
            }
            .padding(.horizontal, 24).padding(.top, 36).padding(.bottom, 70)
        }
        .background(Palette.ink.ignoresSafeArea())
        .toolbar(.hidden, for: .navigationBar)
    }

    private var timelineGraphic: some View {
        ScrollView(.horizontal) {
            ZStack(alignment: .topLeading) {
                Palette.ink2
                ForEach([100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2000], id: \.self) { year in
                    let x = timelineX(year)
                    Rectangle().fill(Palette.paper.opacity(0.12)).frame(width: 1, height: 343).offset(x: x, y: 27)
                    Text(String(year)).font(FangguFont.mono(10)).foregroundStyle(Palette.paper3).offset(x: x - 12, y: 8)
                }
                ForEach(tracks.indices, id: \.self) { index in
                    Text(tracks[index])
                        .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2)
                        .offset(x: 12, y: CGFloat(74 + index * 63))
                }
                ForEach(periods.dropFirst(), id: \.0) { key, title in
                    let sites = sorted.filter { $0.dynasty == key }
                    if let first = sites.first, let last = sites.last, ["CN", "JP", "KR", "KP"].contains(first.country) {
                        let x = timelineX(first.dynastyStart)
                        let width = max(44, timelineX(last.dynastyEnd) - x)
                        let y = trackY(first)
                        Button {
                            selectPeriod(key)
                        } label: {
                            Rectangle().fill(first.accent.opacity(period == key ? 0.38 : 0.16))
                                .overlay(Rectangle().stroke(first.accent.opacity(0.6), lineWidth: 1))
                                .frame(width: width, height: 46)
                                .overlay(alignment: .topLeading) {
                                    Text(title).font(FangguFont.serif(11)).foregroundStyle(first.accent)
                                        .lineLimit(1).padding(3)
                                }
                        }
                        .buttonStyle(.plain)
                        .offset(x: x, y: y - 24)
                    }
                }
                ForEach(timelineClusters, id: \.id) { group in
                    Button {
                        let next = Set(group.sites.map(\.id))
                        if cluster != next || period != "all" {
                            cluster = next; period = "all"; visibleCount = 8
                            Haptics.selection()
                        }
                    } label: {
                        let allVisited = group.sites.allSatisfy { library.record(for: $0).status == .visited }
                        Circle()
                            .fill(allVisited ? group.sites[0].accent : Palette.ink)
                            .frame(width: group.sites.count > 1 ? 25 : 13, height: group.sites.count > 1 ? 25 : 13)
                            .overlay(Circle().stroke(group.sites[0].accent, lineWidth: 1.5))
                            .overlay {
                                if group.sites.count > 1 {
                                    Text("\(group.sites.count)").font(FangguFont.mono(10))
                                        .foregroundStyle(allVisited ? Palette.ink : group.sites[0].accent)
                                }
                            }
                            .frame(width: 44, height: 44)
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel("\(group.sites.count) 处古迹，\(group.sites.first?.year ?? 0) 年前后")
                    .offset(x: group.x, y: group.y)
                }
            }
            .frame(width: 1200, height: 380)
            .overlay(Rectangle().stroke(Palette.goldDim.opacity(0.4), lineWidth: 1))
        }
        .scrollIndicators(.visible)
    }

    private var timelineClusters: [TimelineCluster] {
        var groups: [TimelineCluster] = []
        for lane in tracks.indices {
            for site in sorted.filter({ laneIndex($0) == lane }) {
                let x = timelineX(site.year)
                if let index = groups.indices.last, groups[index].lane == lane, x - groups[index].x < 32 {
                    let count = groups[index].sites.count
                    groups[index].x = (groups[index].x * CGFloat(count) + x) / CGFloat(count + 1)
                    groups[index].sites.append(site)
                } else {
                    groups.append(TimelineCluster(lane: lane, x: x, y: CGFloat(80 + lane * 63), sites: [site]))
                }
            }
        }
        return groups
    }

    private func laneIndex(_ site: Monument) -> Int {
        if site.country == "KR" || site.country == "KP" { return 4 }
        if site.country == "JP" { return 2 }
        if ["KH", "ID", "TH", "MM", "LA", "VN", "PH"].contains(site.country) { return 3 }
        if site.timelineLane == "north" { return 0 }
        return ["han", "bei", "beiqi", "qiuci", "xiyu", "sui", "liao", "xixia", "yuan", "ming", "modern"].contains(site.dynasty) ? 0 : 1
    }
    private func trackY(_ site: Monument) -> CGFloat { CGFloat(57 + laneIndex(site) * 63) }
    private func timelineX(_ year: Int) -> CGFloat {
        let value = Double(year)
        let scaled = value <= 600 ? value / 600 * 0.18 : value <= 1250 ? 0.18 + (value - 600) / 650 * 0.54 : 0.72 + (value - 1250) / 776 * 0.28
        return CGFloat(76 + 1090 * scaled)
    }
    private func legend(_ symbol: String, _ title: String) -> some View {
        HStack(spacing: 4) {
            Text(symbol).foregroundStyle(Palette.gold)
            Text(title).foregroundStyle(Palette.paper2)
        }.font(FangguFont.mono(10))
    }
}

private struct TimelineCluster: Identifiable {
    var id: String { sites.map(\.id).joined(separator: ".") }
    let lane: Int
    var x: CGFloat
    let y: CGFloat
    var sites: [Monument]
}

struct TimelineSiteRow: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument

    private var status: VisitStatus { library.record(for: site).status }

    var body: some View {
        HStack(spacing: 12) {
            ArtworkView(site: site, visited: status == .visited, height: 92)
                .frame(width: 85)
            VStack(alignment: .leading, spacing: 5) {
                Text(site.periodLabel)
                    .font(FangguFont.mono(10)).foregroundStyle(site.accent)
                Text(site.name).font(FangguFont.serif(16)).foregroundStyle(Palette.paper)
                Text(site.place).font(FangguFont.serif(11)).foregroundStyle(Palette.paper3)
                HStack(spacing: 4) {
                    Text(status.title).foregroundStyle(status.textColor)
                    Text("· 细读 ↗").foregroundStyle(Palette.paper2)
                }
                .font(FangguFont.mono(10))
            }
            Spacer(minLength: 0)
        }
        .padding(10).background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
    }
}
