import SwiftUI

struct AtlasMapView: View {
    @EnvironmentObject private var library: LibraryStore
    @EnvironmentObject private var undoPresentation: UndoPresentation
    @State private var selection: MapSelection?
    @State private var search = ""
    @State private var highlighted: Set<String> = []
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
            query.isEmpty || [site.placeName, site.provinceName, site.province, site.place]
                .contains { $0.localizedStandardContains(query) }
                || (places[site.placeKey] ?? []).contains { $0.name.localizedStandardContains(query) }
        }.sorted { $0.placeName.localizedStandardCompare($1.placeName) == .orderedAscending }
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                FangguSectionTitle(eyebrow: "亲见 · 行迹所至", title: "我的足迹", subtitle: "只展示已经到访的地方，点选地名细读古迹。")
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
                            if !highlighted.isEmpty {
                                let points = coordinates.filter { highlighted.contains($0.id) }.map {
                                    projection.point(latitude: $0.latitude, longitude: $0.longitude)
                                }
                                if let first = points.first {
                                    let bounds = points.reduce(CGRect(origin: first, size: .zero)) {
                                        $0.union(CGRect(origin: $1, size: .zero))
                                    }.insetBy(dx: -16, dy: -16)
                                    RoundedRectangle(cornerRadius: 10)
                                        .fill(Palette.gold.opacity(0.12))
                                        .overlay(RoundedRectangle(cornerRadius: 10).stroke(Palette.gold, style: StrokeStyle(lineWidth: 1, dash: [3, 3])))
                                        .frame(width: bounds.width, height: bounds.height)
                                        .position(x: bounds.midX, y: bounds.midY)
                                        .allowsHitTesting(false).accessibilityHidden(true)
                                }
                            }
                            ForEach(clusters) { cluster in
                                let isSelected = !highlighted.isDisjoint(with: cluster.placeIDs)
                                Button { openPlaces(cluster.placeIDs) } label: {
                                    VStack(spacing: 2) {
                                        // English names are several times wider than Chinese ones; they get a
                                        // compact title over two lines instead of being cut off.
                                        Text(markerTitle(cluster.placeIDs))
                                            .font(FangguFont.serif(AppLanguage.current == .english ? 11 : 12))
                                            .lineLimit(AppLanguage.current == .english ? 2 : 1).minimumScaleFactor(0.7)
                                            .multilineTextAlignment(.center)
                                        Text("\(cluster.placeIDs.count) 地")
                                            .font(FangguFont.mono(10))
                                    }
                                    .foregroundStyle(isSelected ? Palette.ink : Palette.paper)
                                    .frame(width: 66, height: 44)
                                    .background(isSelected ? Palette.gold : Palette.ink.opacity(0.93), in: RoundedRectangle(cornerRadius: 7))
                                    .overlay(RoundedRectangle(cornerRadius: 7).stroke(Palette.gold.opacity(isSelected ? 1 : 0.65), lineWidth: 1))
                                }
                                .buttonStyle(.plain)
                                .position(cluster.point)
                                .accessibilityLabel("\(clusterTitle(cluster.placeIDs))，\(cluster.placeIDs.count) 个到访地点，点选查看古迹")
                                .accessibilityAddTraits(isSelected ? .isSelected : [])
                                .accessibilityIdentifier("map-marker-\(cluster.id)")
                            }
                        }
                        .accessibilityElement(children: .contain)
                        .accessibilityIdentifier("visited-map")
                    }
                    .frame(height: 280)
                    Text("邻近地点合并展示 · 点选地名展开")
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
                    Text("离线地理概览 · Natural Earth")
                        .font(FangguFont.mono(10)).foregroundStyle(Palette.paper3)
                    if !highlighted.isEmpty {
                        Text("已选：\(highlighted.sorted().compactMap { places[$0]?.first?.placeName }.joined(separator: AppLanguage.current.listSeparator))")
                            .font(FangguFont.serif(13)).foregroundStyle(Palette.gold)
                            .accessibilityIdentifier("map-selected-places")
                    }
                    FangguRule()
                    Text("到访地点").font(FangguFont.serif(20)).foregroundStyle(Palette.paper)
                    FangguField(placeholder: "搜索地点、省份或古迹", text: $search, showsClearButton: true)
                        .accessibilityIdentifier("map-place-search")
                    LazyVStack(spacing: 0) {
                        ForEach(matchingPlaces) { site in
                            Button { openPlaces([site.placeKey]) } label: {
                                HStack(spacing: 12) {
                                    VStack(alignment: .leading, spacing: 5) {
                                        Text(site.placeName).font(FangguFont.serif(16)).foregroundStyle(Palette.paper)
                                        Text(site.provinceName).font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
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
                        Text(clusterTitle(selected.placeIDs))
                            .font(FangguFont.serif(24)).foregroundStyle(Palette.paper)
                            .fixedSize(horizontal: false, vertical: true)
                        ForEach(selected.placeIDs, id: \.self) { key in
                            if let sites = places[key], let first = sites.first {
                                Text(verbatim: "\(first.provinceName) · \(first.placeName)").font(FangguFont.serif(20)).foregroundStyle(Palette.gold)
                                    .padding(.top, 8)
                                ForEach(sites) { site in
                                    NavigationLink(value: site) { TimelineSiteRow(site: site) }.buttonStyle(.plain)
                                }
                            }
                        }
                    }.padding(20)
                }
                .safeAreaInset(edge: .bottom, spacing: 0) { UndoFeedback() }
                .background(Palette.ink)
                .navigationTitle(markerTitle(selected.placeIDs))
                .navigationBarTitleDisplayMode(.inline)
                .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
                .toolbar { Button("关闭") { selection = nil }.accessibilityIdentifier("map-sheet-close") }
            }
            .fangguAppearance()
            .environment(\.inMapSheet, true)
            .onAppear { undoPresentation.mapIsPresented = true }
            .onDisappear { undoPresentation.mapIsPresented = false }
        }
    }

    @ViewBuilder private var visitCount: some View {
        FangguMetricNumber(value: visited.count, size: 38)
        Text("处已到访 · \(places.count) 个地点")
            .font(FangguFont.mono(12)).foregroundStyle(Palette.paper2)
    }

    private func clusterTitle(_ ids: [String]) -> String {
        let sites = ids.compactMap { places[$0]?.first }
        if sites.count == 1 { return sites.first?.placeName ?? String(localized: "到访地点") }
        let regions = Array(Set(sites.map(\.regionName))).sorted()
        let names = regions.prefix(2).joined(separator: AppLanguage.current.nameSeparator)
        return regions.count > 2 ? String(localized: "\(names)等") : names
    }

    /// The marker and the sheet's bar title; English uses the first place or region and a count.
    private func markerTitle(_ ids: [String]) -> String {
        guard AppLanguage.current == .english else { return clusterTitle(ids) }
        let sites = ids.compactMap { places[$0]?.first }
        if sites.count == 1 {
            let name = sites.first?.placeName ?? String(localized: "到访地点")
            return name.components(separatedBy: " · ").first ?? name
        }
        let regions = Array(Set(sites.map(\.regionName))).sorted()
        return regions.count > 1 ? "\(regions[0]) +\(regions.count - 1)" : regions.first ?? ""
    }

    private func openPlaces(_ ids: [String]) {
        highlighted = Set(ids)
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
            if let land = OfflineLand.shared {
                var landContext = context
                landContext.clip(to: Path(frame))
                for feature in land.features {
                    var shape = Path()
                    for ring in feature.geometry.coordinates {
                        for (index, coordinate) in ring.enumerated() where coordinate.count >= 2 {
                            let point = projection.point(latitude: coordinate[1], longitude: coordinate[0])
                            if index == 0 { shape.move(to: point) } else { shape.addLine(to: point) }
                        }
                        shape.closeSubpath()
                    }
                    landContext.fill(shape, with: .color(Palette.gold.opacity(0.13)), style: FillStyle(eoFill: true))
                    landContext.stroke(shape, with: .color(Palette.gold.opacity(0.5)), lineWidth: 0.8)
                }
            }
            context.stroke(Path(frame), with: .color(Palette.goldDim.opacity(0.35)), lineWidth: 1)
            let latStep = projection.latitudeStep
            let lonStep = projection.longitudeStep
            for lat in stride(from: ceil(projection.latitude.lowerBound / latStep) * latStep,
                              through: projection.latitude.upperBound, by: latStep) {
                let y = projection.point(latitude: lat, longitude: projection.centerLon).y
                var line = Path(); line.move(to: CGPoint(x: frame.minX, y: y)); line.addLine(to: CGPoint(x: frame.maxX, y: y))
                context.stroke(line, with: .color(Palette.paper.opacity(0.08)), style: StrokeStyle(lineWidth: 1, dash: [2, 5]))
                context.draw(Text(verbatim: "\(Int(abs(lat)))°\(lat < 0 ? "S" : "N")").font(FangguFont.mono(9)).foregroundColor(Palette.paper3),
                             at: CGPoint(x: frame.minX - 6, y: y), anchor: .trailing)
            }
            for lon in stride(from: ceil(projection.longitude.lowerBound / lonStep) * lonStep,
                              through: projection.longitude.upperBound, by: lonStep) {
                let x = projection.point(latitude: projection.centerLat, longitude: lon).x
                var line = Path(); line.move(to: CGPoint(x: x, y: frame.minY)); line.addLine(to: CGPoint(x: x, y: frame.maxY))
                context.stroke(line, with: .color(Palette.paper.opacity(0.08)), style: StrokeStyle(lineWidth: 1, dash: [2, 5]))
                context.draw(Text(verbatim: "\(Int(abs(lon)))°\(lon < 0 ? "W" : "E")").font(FangguFont.mono(9)).foregroundColor(Palette.paper3),
                             at: CGPoint(x: x, y: frame.maxY + 16))
            }
        }
        .accessibilityHidden(true)
    }
}

// The catalog is immutable for the lifetime of LibraryStore. Prepare its ordering,
// period counts and geometry once, rather than sorting inside view comparisons.
struct TimelineCatalog {
    // Period names for Japan and Korea start with the same words ("日本 · 奈良"), so the
    // timeline can drop the prefix inside a track. Keep the translations in step with the catalog.
    static let tracks = [String(localized: "中国北方"), String(localized: "中国南方"), String(localized: "日本"),
                         String(localized: "东南亚"), String(localized: "朝鲜半岛")]
    let sorted: [Monument]
    let sitesByPeriod: [String: [Monument]]
    let periods: [(String, String)]
    let quickPeriods: [(String, String)]
    let clusters: [TimelineCluster]

    init(monuments: [Monument]) {
        let sorted = monuments.sorted { $0.year == $1.year ? $0.id < $1.id : $0.year < $1.year }
        let sitesByPeriod = Dictionary(grouping: sorted, by: \.dynasty)
        let keys = sitesByPeriod.keys.sorted { a, b in
            let firstYear = sitesByPeriod[a]?.first?.year ?? 0
            let secondYear = sitesByPeriod[b]?.first?.year ?? 0
            return firstYear == secondYear ? a < b : firstYear < secondYear
        }
        let periods = [("all", String(localized: "全部时期"))] + keys.map { ($0, sitesByPeriod[$0]?.first?.dynastyName ?? $0) }
        let order = Dictionary(uniqueKeysWithValues: keys.enumerated().map { ($0.element, $0.offset) })
        let quickPeriods = Array(periods.dropFirst().sorted { lhs, rhs in
            let left = sitesByPeriod[lhs.0]?.count ?? 0
            let right = sitesByPeriod[rhs.0]?.count ?? 0
            return left == right ? (order[lhs.0] ?? 0) < (order[rhs.0] ?? 0) : left > right
        }.prefix(4))

        let groups = Self.tracks.indices.flatMap { lane in
            Self.makeClusters(sorted.filter { Self.laneIndex($0) == lane }, lane: lane)
        }
        self.sorted = sorted
        self.sitesByPeriod = sitesByPeriod
        self.periods = periods
        self.quickPeriods = quickPeriods
        self.clusters = groups
    }

    static func laneIndex(_ site: Monument) -> Int {
        if site.country == "KR" || site.country == "KP" { return 4 }
        if site.country == "JP" { return 2 }
        if ["KH", "ID", "TH", "MM", "LA", "VN", "PH"].contains(site.country) { return 3 }
        if site.timelineLane == "north" { return 0 }
        return ["han", "bei", "beiqi", "qiuci", "xiyu", "sui", "liao", "xixia", "yuan", "ming", "modern"].contains(site.dynasty) ? 0 : 1
    }
    static let pointsPerYear: CGFloat = 0.7
    static let width: CGFloat = 1518
    static func x(_ year: Int) -> CGFloat { 24 + CGFloat(year) * pointsPerYear }

    func sites(lane: Int, period: String) -> [Monument] {
        (period == "all" ? sorted : sitesByPeriod[period] ?? []).filter { Self.laneIndex($0) == lane }
    }

    func groups(lane: Int, period: String) -> [TimelineCluster] {
        period == "all" ? clusters.filter { $0.lane == lane } : Self.makeClusters(sites(lane: lane, period: period), lane: lane)
    }

    static func makeClusters(_ sites: [Monument], lane: Int) -> [TimelineCluster] {
        var groups = sites.map { TimelineCluster(lane: lane, x: x($0.year), y: 94, sites: [$0]) }
        // Merge adjacent touch targets until the final weighted centers are separated.
        var index = 0
        while index + 1 < groups.count {
            if groups[index + 1].x - groups[index].x < 48 {
                groups[index].sites += groups[index + 1].sites
                groups[index].x = groups[index].sites.map { x($0.year) }.reduce(0, +) / CGFloat(groups[index].sites.count)
                groups.remove(at: index + 1)
                index = max(0, index - 1)
            } else { index += 1 }
        }
        return groups
    }

}

struct TimelineCluster: Identifiable {
    var id: String { sites[0].id }
    let lane: Int
    var x: CGFloat
    let y: CGFloat
    var sites: [Monument]
}

struct TimelineSiteRow: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument
    /// Only the catalogue passes these; 足迹, 年表 and 我的 keep the row unchanged.
    var distance: String? = nil
    var here = false
    @ScaledMetric(relativeTo: .caption) private var distanceSize: CGFloat = 10
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize

    private var status: VisitStatus { library.record(for: site).status }

    var body: some View {
        // At accessibility sizes the plate moves above the text so names keep the full row width.
        let layout = dynamicTypeSize.isAccessibilitySize
            ? AnyLayout(VStackLayout(alignment: .leading, spacing: 10)) : AnyLayout(HStackLayout(spacing: 12))
        layout {
            ArtworkView(site: site, visited: status == .visited, height: 92)
                .frame(width: dynamicTypeSize.isAccessibilitySize ? nil : 85)
            VStack(alignment: .leading, spacing: 5) {
                Text(site.periodLabel)
                    .font(FangguFont.mono(10)).foregroundStyle(site.accent)
                HStack(alignment: .firstTextBaseline, spacing: 10) {
                    Text(site.name).font(FangguFont.serif(16)).foregroundStyle(Palette.paper)
                        .fixedSize(horizontal: false, vertical: true)
                    Spacer(minLength: 4)
                    ReviewScoreLabel(scores: library.review(for: site).dimensions)
                }
                Text(site.place).font(FangguFont.serif(11)).foregroundStyle(Palette.paper3)
                    .fixedSize(horizontal: false, vertical: true)
                if distance != nil || here {
                    HStack(spacing: 6) {
                        if here { Text("就在附近").foregroundStyle(Palette.gold) }
                        if let distance { Text(distance).foregroundStyle(Palette.paper2) }
                    }
                    .font(.system(size: distanceSize, design: .monospaced))
                }
                HStack(spacing: 4) {
                    Text(status.title).foregroundStyle(status.textColor)
                    Text("· 细读 ↗").foregroundStyle(Palette.paper2)
                }
                .font(FangguFont.mono(10))
            }
        }
        .padding(10).background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
    }
}
