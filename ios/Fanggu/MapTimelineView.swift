import SwiftUI

struct AtlasMapView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var selectedPlace: String?

    private var visited: [Monument] { library.monuments.filter { library.record(for: $0).status == .visited } }
    private var places: [String: [Monument]] { Dictionary(grouping: visited, by: \.placeKey) }
    private var selectedSites: [Monument] { places[selectedPlace ?? ""] ?? [] }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                FangguSectionTitle(eyebrow: "亲见 · 行迹所至", title: "到访地图", subtitle: "点亮已经到访的地方，点选地点细读古迹。")
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Text("\(visited.count)").font(FangguFont.brush(38)).foregroundStyle(Palette.gold)
                    Text("处已到访 · \(places.count) 个地点")
                        .font(FangguFont.mono(12)).foregroundStyle(Palette.paper2)
                }
                GeometryReader { geometry in
                    let projection = SketchMapProjection(size: geometry.size, sites: visited)
                    let labels = SketchMapLabel.place(places, projection: projection)
                    ZStack(alignment: .topLeading) {
                        SketchMapGrid(projection: projection, labels: labels)
                        ForEach(labels) { label in
                            Button { selectedPlace = label.id } label: {
                                Text(label.site.placeName)
                                    .font(FangguFont.serif(11))
                                    .foregroundStyle(Palette.paper)
                                    .lineLimit(1)
                                    .minimumScaleFactor(0.8)
                                    .frame(width: label.rect.width, height: label.rect.height)
                            }
                            .buttonStyle(.plain)
                            .position(x: label.rect.midX, y: label.rect.midY)
                            .accessibilityLabel("\(label.site.place)，\(places[label.id]?.count ?? 1) 处已到访古迹")
                            Button { selectedPlace = label.id } label: {
                                Color.clear.frame(width: 28, height: 28).contentShape(Circle())
                            }
                            .buttonStyle(.plain)
                            .position(label.point)
                            .accessibilityLabel("\(label.site.place)，细读古迹")
                        }
                    }
                    .frame(width: geometry.size.width, height: geometry.size.height)
                }
                .frame(height: 640)
                Text("点亮已经到访的地方，点选地点细读古迹。")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
                if visited.isEmpty {
                    Text("尚无到访足迹。翻开图鉴，为亲见的古迹添上颜色。")
                        .font(FangguFont.serif(15)).foregroundStyle(Palette.paper2)
                        .padding(.vertical, 30)
                }
            }
            .padding(.horizontal, 24).padding(.top, 36).padding(.bottom, 70)
        }
        .background(Palette.ink.ignoresSafeArea())
        .navigationBarTitleDisplayMode(.inline)
        .toolbar { ToolbarItem(placement: .principal) { FangguBrand() } }
        .toolbarBackground(Palette.ink, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .sheet(item: Binding(get: { selectedPlace.map(SelectedPlace.init) }, set: { selectedPlace = $0?.id })) { place in
            NavigationStack {
                ScrollView {
                    VStack(spacing: 10) {
                        ForEach(selectedSites) { site in
                            NavigationLink(value: site) { TimelineSiteRow(site: site) }.buttonStyle(.plain)
                        }
                    }.padding(20)
                }
                .background(Palette.ink)
                .navigationTitle(selectedSites.first?.place ?? place.id)
                .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
                .toolbar { Button("关闭") { selectedPlace = nil } }
            }
            .preferredColorScheme(.dark)
        }
    }
}

private struct SelectedPlace: Identifiable { let id: String }

private struct SketchMapLabel: Identifiable {
    let id: String
    let site: Monument
    let point: CGPoint
    let rect: CGRect

    static func place(_ places: [String: [Monument]], projection: SketchMapProjection) -> [SketchMapLabel] {
        let sites = places.keys.sorted().compactMap { key -> (String, Monument)? in
            guard let site = places[key]?.first else { return nil }
            return (key, site)
        }
        let points = sites.map { projection.point($0.1) }
        var labels: [SketchMapLabel] = []
        let width = projection.size.width
        let height = projection.size.height
        for (index, pair) in sites.enumerated() {
            let point = points[index]
            var best: (CGRect, CGFloat)?
            var top: CGFloat = 31
            while top + 18 < height - 36 {
                var left: CGFloat = 45
                while left + 66 < width - 8 {
                    let rect = CGRect(x: left, y: top, width: 66, height: 18)
                    let blocked = labels.contains { $0.rect.insetBy(dx: -3, dy: -3).intersects(rect) }
                        || points.contains { rect.insetBy(dx: -5, dy: -5).contains($0) }
                    if !blocked {
                        let facing = point.x <= rect.midX ? rect.minX : rect.maxX
                        let score = abs(facing - point.x) + abs(rect.midY - point.y) * 1.3
                        if best == nil || score < best!.1 { best = (rect, score) }
                    }
                    left += 70
                }
                top += 23
            }
            let fallback = CGRect(x: min(width - 75, max(45, point.x + 10)), y: max(31, point.y - 9), width: 66, height: 18)
            labels.append(SketchMapLabel(id: pair.0, site: pair.1, point: point, rect: best?.0 ?? fallback))
        }
        return labels
    }
}

private struct SketchMapProjection {
    let size: CGSize
    let latitude: ClosedRange<Double>
    let longitude: ClosedRange<Double>
    let latScale: Double
    let lonScale: Double
    let centerLat: Double
    let centerLon: Double

    init(size: CGSize, sites: [Monument]) {
        // SwiftUI may evaluate GeometryReader once with a zero proposal.
        let width = max(Double(size.width), 320)
        let height = max(Double(size.height), 640)
        self.size = CGSize(width: width, height: height)
        let lat0 = min(28.8, sites.map { $0.latitude - 0.9 }.min() ?? 28.8)
        let lat1 = max(40.7, sites.map { $0.latitude + 0.9 }.max() ?? 40.7)
        let lon0 = min(108.2, sites.map { $0.longitude - 1.8 }.min() ?? 108.2)
        let lon1 = max(122.6, sites.map { $0.longitude + 1.8 }.max() ?? 122.6)
        let cosLat = cos((lat0 + lat1) / 2 * .pi / 180)
        let scale = min((height - 64) / (lat1 - lat0), (width - 72) / ((lon1 - lon0) * cosLat))
        latScale = scale
        lonScale = scale * cosLat
        centerLat = (lat0 + lat1) / 2
        centerLon = (lon0 + lon1) / 2
        latitude = (centerLat - (height - 64) / (2 * scale))...(centerLat + (height - 64) / (2 * scale))
        longitude = (centerLon - (width - 72) / (2 * lonScale))...(centerLon + (width - 72) / (2 * lonScale))
    }

    func point(latitude: Double, longitude: Double) -> CGPoint {
        CGPoint(x: CGFloat(Double(size.width) / 2 + (longitude - centerLon) * lonScale),
                y: CGFloat(Double(size.height) / 2 - (latitude - centerLat) * latScale))
    }
    func point(_ site: Monument) -> CGPoint { point(latitude: site.latitude, longitude: site.longitude) }
}

private struct SketchMapGrid: View {
    let projection: SketchMapProjection
    let labels: [SketchMapLabel]

    var body: some View {
        Canvas { context, size in
            guard size.width > 72, size.height > 64 else { return }
            context.fill(Path(CGRect(origin: .zero, size: size)), with: .color(Palette.ink2))
            let frame = CGRect(x: 44, y: 28, width: size.width - 72, height: size.height - 64)
            context.stroke(Path(frame), with: .color(Palette.goldDim.opacity(0.35)), lineWidth: 1)
            for lat in stride(from: ceil(projection.latitude.lowerBound / 4) * 4, through: projection.latitude.upperBound, by: 4) {
                let y = projection.point(latitude: lat, longitude: projection.centerLon).y
                var line = Path(); line.move(to: CGPoint(x: 44, y: y)); line.addLine(to: CGPoint(x: size.width - 28, y: y))
                context.stroke(line, with: .color(Palette.paper.opacity(0.1)), style: StrokeStyle(lineWidth: 1, dash: [2, 5]))
                context.draw(Text("\(Int(lat))°N").font(FangguFont.mono(9)).foregroundColor(Palette.paper3),
                             at: CGPoint(x: 21, y: y))
            }
            for lon in stride(from: ceil(projection.longitude.lowerBound / 4) * 4, through: projection.longitude.upperBound, by: 4) {
                let x = projection.point(latitude: projection.centerLat, longitude: lon).x
                var line = Path(); line.move(to: CGPoint(x: x, y: 28)); line.addLine(to: CGPoint(x: x, y: size.height - 36))
                context.stroke(line, with: .color(Palette.paper.opacity(0.1)), style: StrokeStyle(lineWidth: 1, dash: [2, 5]))
                context.draw(Text("\(Int(lon))°E").font(FangguFont.mono(9)).foregroundColor(Palette.paper3),
                             at: CGPoint(x: x, y: size.height - 21))
            }
            for (name, lat, lon) in [("山西", 39.75, 111.6), ("陕西", 36.2, 108.6), ("江苏", 33.2, 117.6),
                                     ("河北", 38.5, 117.2), ("河南", 33.5, 113.6), ("浙江", 31.4, 116.5)] {
                context.draw(Text(name).font(FangguFont.brush(26)).foregroundColor(Palette.paper.opacity(0.09)),
                             at: projection.point(latitude: lat, longitude: lon))
            }
            for label in labels {
                let target = CGPoint(x: label.point.x <= label.rect.midX ? label.rect.minX : label.rect.maxX,
                                     y: label.rect.midY)
                var leader = Path(); leader.move(to: label.point); leader.addLine(to: target)
                context.stroke(leader, with: .color(Palette.paper3.opacity(0.45)), lineWidth: 0.7)
                let core = CGRect(x: label.point.x - 4, y: label.point.y - 4, width: 8, height: 8)
                context.fill(Path(ellipseIn: core), with: .color(label.site.accent))
            }
        }
    }
}

struct TimelineView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var period = "all"
    @State private var cluster: Set<String> = []
    @State private var page = 0

    private let pageSize = 4
    private let tracks = ["北", "南", "日本"]
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
    private var pages: Int { max(1, Int(ceil(Double(selected.count) / Double(pageSize)))) }
    private var visible: [Monument] { Array(selected.dropFirst(page * pageSize).prefix(pageSize)) }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 17) {
                FangguSectionTitle(eyebrow: "东汉至今 · 中日对照", title: "年表", subtitle: "沿现存主体的年代，细读石与木的足迹。")
                Menu {
                    ForEach(periods, id: \.0) { key, title in
                        Button("\(title) · \(key == "all" ? sorted.count : sorted.filter { $0.dynasty == key }.count) 处") {
                            period = key; cluster = []; page = 0
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
                    Button("←") { page = max(0, page - 1) }.disabled(page == 0)
                    Text("\(page + 1) / \(pages)").font(FangguFont.mono(11))
                    Button("→") { page = min(pages - 1, page + 1) }.disabled(page + 1 == pages)
                }
                .foregroundStyle(Palette.paper2)
                if period != "all" || !cluster.isEmpty {
                    Button("查看全部") { period = "all"; cluster = []; page = 0 }
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.gold)
                }
                ForEach(visible) { site in
                    NavigationLink(value: site) { TimelineSiteRow(site: site) }.buttonStyle(.plain)
                }
                DisclosureGroup("读图说明") {
                    Text("中国部分按北、南两线排列，日本单列。点选圆点展开古迹；邻近年份合并为一个数字圆点。年代对应图版所绘主体，部分仅作约略定位，确切纪年与重修沿革以详情为准。")
                        .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2).lineSpacing(5)
                }
                .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                .padding(.top, 10)
            }
            .padding(.horizontal, 24).padding(.top, 36).padding(.bottom, 70)
        }
        .background(Palette.ink.ignoresSafeArea())
        .navigationBarTitleDisplayMode(.inline)
        .toolbar { ToolbarItem(placement: .principal) { FangguBrand() } }
        .toolbarBackground(Palette.ink, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
    }

    private var timelineGraphic: some View {
        ScrollView(.horizontal) {
            ZStack(alignment: .topLeading) {
                Palette.ink2
                ForEach([100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2000], id: \.self) { year in
                    let x = timelineX(year)
                    Rectangle().fill(Palette.paper.opacity(0.12)).frame(width: 1, height: 205).offset(x: x, y: 27)
                    Text(String(year)).font(FangguFont.mono(10)).foregroundStyle(Palette.paper3).offset(x: x - 12, y: 8)
                }
                ForEach(tracks.indices, id: \.self) { index in
                    Text(tracks[index])
                        .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2)
                        .offset(x: 12, y: CGFloat(74 + index * 63))
                }
                ForEach(periods.dropFirst(), id: \.0) { key, title in
                    let sites = sorted.filter { $0.dynasty == key }
                    if let first = sites.first, let last = sites.last {
                        let x = timelineX(first.dynastyStart)
                        let width = max(22, timelineX(last.dynastyEnd) - x)
                        let y = trackY(first)
                        Button { period = key; cluster = []; page = 0 } label: {
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
                        cluster = Set(group.sites.map(\.id)); period = "all"; page = 0
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
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel("\(group.sites.count) 处古迹，\(group.sites.first?.year ?? 0) 年前后")
                    .offset(x: group.x, y: group.y)
                }
            }
            .frame(width: 1200, height: 240)
            .overlay(Rectangle().stroke(Palette.goldDim.opacity(0.4), lineWidth: 1))
        }
        .scrollIndicators(.visible)
    }

    private var timelineClusters: [TimelineCluster] {
        var groups: [TimelineCluster] = []
        for lane in 0..<3 {
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
        if site.country == "JP" { return 2 }
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

    var body: some View {
        HStack(spacing: 12) {
            ArtworkView(site: site, visited: library.record(for: site).status == .visited, height: 92)
                .frame(width: 85)
            VStack(alignment: .leading, spacing: 5) {
                Text("\(site.dynastyName) · \(site.yearLabel)")
                    .font(FangguFont.mono(10)).foregroundStyle(site.accent)
                Text(site.name).font(FangguFont.serif(16)).foregroundStyle(Palette.paper)
                Text(site.place).font(FangguFont.serif(11)).foregroundStyle(Palette.paper3)
                Text("\(library.record(for: site).status.title) · 细读 ↗")
                    .font(FangguFont.mono(10)).foregroundStyle(Palette.paper2)
            }
            Spacer(minLength: 0)
        }
        .padding(10).background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
    }
}
