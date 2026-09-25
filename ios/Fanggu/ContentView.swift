import MapKit
import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var selectedTab = 0

    var body: some View {
        TabView(selection: $selectedTab) {
            NavigationStack {
                ExploreView()
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("图鉴", systemImage: "books.vertical") }.tag(0)

            NavigationStack {
                AtlasMapView()
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("地图", systemImage: "map") }.tag(1)

            NavigationStack {
                TimelineView()
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("年表", systemImage: "calendar") }.tag(2)

            NavigationStack {
                MyLibraryView()
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("我的", systemImage: "seal") }.tag(3)
        }
        .preferredColorScheme(.light)
        .overlay(alignment: .top) {
            if let error = library.error {
                Text(error).font(.footnote).padding(12)
                    .frame(maxWidth: .infinity)
                    .background(Palette.red).foregroundStyle(.white)
                    .accessibilityAddTraits(.updatesFrequently)
            }
        }
    }
}

struct ExploreView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var query = ""
    @State private var status = "all"
    @State private var country = "all"
    @State private var region = "all"
    @State private var province = "all"
    @State private var dynasty = "all"
    @State private var type = "all"

    private let regionNames = ["north": "华北", "northeast": "东北", "east": "华东", "central": "华中", "south": "华南", "southwest": "西南", "northwest": "西北", "jp_kinki": "近畿"]

    private var dynastyOptions: [String: String] {
        library.monuments.reduce(into: ["all": "全部"]) { result, site in result[site.dynasty] = site.dynastyName }
    }
    private var typeOptions: [String: String] {
        library.monuments.reduce(into: ["all": "全部"]) { result, site in
            for index in site.types.indices { result[site.types[index]] = site.typeNames[index] }
        }
    }
    private var regionOptions: [String: String] {
        library.monuments.filter { country == "all" || $0.country == country }
            .reduce(into: ["all": "全部"]) { result, site in result[site.region] = regionNames[site.region] ?? site.region }
    }
    private var provinceOptions: [String: String] {
        library.monuments.filter { (country == "all" || $0.country == country) && (region == "all" || $0.region == region) }
            .reduce(into: ["all": "全部"]) { result, site in result[site.province] = site.province }
    }

    private var results: [Monument] {
        library.monuments.filter { site in
            let record = library.record(for: site)
            let statusMatches = status == "all" || (status == "unvisited" ? record.status != .visited : record.status.rawValue == status)
            let haystack = ([site.name, site.short, site.sub, site.place, site.province, site.dynastyName] + site.typeNames + site.legacyNames).joined(separator: " ")
            return statusMatches && (country == "all" || site.country == country)
                && (region == "all" || site.region == region)
                && (province == "all" || site.province == province)
                && (dynasty == "all" || site.dynasty == dynasty)
                && (type == "all" || site.types.contains(type))
                && (query.isEmpty || haystack.localizedCaseInsensitiveContains(query.trimmingCharacters(in: .whitespacesAndNewlines)))
        }
    }

    var body: some View {
        ScrollView {
            LazyVStack(spacing: 14) {
                VStack(alignment: .leading, spacing: 8) {
                    Text("访古").font(.system(size: 46, weight: .semibold, design: .serif)).foregroundStyle(Palette.ink)
                    Text("从汉阙到檐下，一部慢慢写满的古迹图鉴。")
                        .font(.subheadline).foregroundStyle(.secondary)
                    Text("收录 \(library.monuments.count) 处 · 显示 \(results.count) 处")
                        .font(.caption).foregroundStyle(Palette.gold)
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(.vertical, 12)

                HStack(spacing: 10) {
                    FilterMenu(title: "状态", value: $status, options: ["all": "全部", "unvisited": "未到访", "wishlist": "心愿", "visited": "已到访"])
                    FilterMenu(title: "国家", value: $country, options: ["all": "全部", "CN": "中国", "JP": "日本"])
                }
                HStack(spacing: 10) {
                    FilterMenu(title: "时代", value: $dynasty, options: dynastyOptions)
                    FilterMenu(title: "类型", value: $type, options: typeOptions)
                }
                HStack(spacing: 10) {
                    FilterMenu(title: "地区", value: $region, options: regionOptions)
                    FilterMenu(title: "省份", value: $province, options: provinceOptions)
                }

                if results.isEmpty {
                    ContentUnavailableView.search(text: query)
                        .padding(.top, 50)
                } else {
                    ForEach(results) { site in
                        NavigationLink(value: site) { MonumentCard(site: site) }
                            .buttonStyle(.plain)
                    }
                }
            }
            .padding(18)
        }
        .background(Palette.paper.ignoresSafeArea())
        .searchable(text: $query, prompt: "搜索名称、地点或建筑类型")
        .navigationTitle("图鉴")
        .navigationBarTitleDisplayMode(.inline)
        .onChange(of: country) { _, _ in region = "all"; province = "all" }
        .onChange(of: region) { _, _ in province = "all" }
    }
}

private struct FilterMenu: View {
    let title: String
    @Binding var value: String
    let options: [String: String]

    var body: some View {
        Menu {
            ForEach(options.keys.sorted(), id: \.self) { key in
                Button(options[key]!) { value = key }
            }
        } label: {
            HStack {
                Text("\(title) · \(options[value] ?? "全部")").lineLimit(1)
                Spacer(minLength: 2)
                Image(systemName: "chevron.down").font(.caption2)
            }
            .font(.caption)
            .foregroundStyle(Palette.ink)
            .padding(10)
            .background(.white.opacity(0.8), in: RoundedRectangle(cornerRadius: 8))
        }
        .frame(maxWidth: .infinity)
    }
}

struct ArtworkView: View {
    let site: Monument
    let visited: Bool
    var height: CGFloat = 210

    private var artwork: UIImage? {
        let names = visited ? [site.colorImage, site.lineImage] : [site.lineImage]
        for name in names {
            if let path = Bundle.main.path(forResource: name, ofType: nil, inDirectory: "Artwork"),
               let image = UIImage(contentsOfFile: path) { return image }
        }
        return nil
    }

    var body: some View {
        Group {
            if let image = artwork {
                Image(uiImage: image).resizable().scaledToFit().padding(12)
            } else {
                VStack(spacing: 8) {
                    Image(systemName: "photo.artframe").font(.largeTitle)
                    Text("图版待装入").font(.caption)
                }
                .foregroundStyle(.secondary)
            }
        }
        .frame(maxWidth: .infinity)
        .frame(height: height)
        .background(Color(red: 0.98, green: 0.97, blue: 0.94))
        .accessibilityLabel("\(site.name)\(visited ? "设色图" : "线稿")")
    }
}

struct MonumentCard: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            ArtworkView(site: site, visited: library.record(for: site).status == .visited)
            VStack(alignment: .leading, spacing: 6) {
                HStack {
                    Text(site.dynastyName).font(.caption).foregroundStyle(Palette.dynasty(site.dynasty))
                    Spacer()
                    Text(library.record(for: site).status.title).font(.caption).foregroundStyle(Palette.red)
                }
                Text(site.name).font(.title3.weight(.semibold)).foregroundStyle(Palette.ink)
                Text(site.place).font(.subheadline).foregroundStyle(.secondary).lineLimit(1)
            }
            .padding(14)
        }
        .background(.white, in: RoundedRectangle(cornerRadius: 12))
        .clipShape(RoundedRectangle(cornerRadius: 12))
    }
}

struct AtlasMapView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var selection: MapLocation?
    @State private var camera: MapCameraPosition = .region(MKCoordinateRegion(center: CLLocationCoordinate2D(latitude: 35.0, longitude: 110), span: MKCoordinateSpan(latitudeDelta: 31, longitudeDelta: 33)))

    private var locations: [MapLocation] {
        Dictionary(grouping: library.monuments, by: \.placeKey).compactMap { key, group in
            guard let first = group.first else { return nil }
            return MapLocation(id: key, sites: group, latitude: first.latitude, longitude: first.longitude)
        }
    }

    var body: some View {
        Map(position: $camera) {
            ForEach(locations) { location in
                Annotation(location.sites[0].place, coordinate: CLLocationCoordinate2D(latitude: location.latitude, longitude: location.longitude)) {
                    Button { selection = location } label: {
                        Image(systemName: location.sites.contains(where: { library.record(for: $0).status == .visited }) ? "seal.fill" : "circle.fill")
                            .font(.system(size: location.sites.contains(where: { library.record(for: $0).status == .visited }) ? 23 : 11))
                            .foregroundStyle(location.sites.contains(where: { library.record(for: $0).status == .visited }) ? Palette.red : Palette.gold)
                            .padding(8)
                    }
                    .accessibilityLabel("\(location.sites[0].place)，\(location.sites.count) 处古迹")
                }
            }
        }
        .navigationTitle("到访地图")
        .sheet(item: $selection) { location in
            NavigationStack {
                List(location.sites) { site in
                    NavigationLink(value: site) {
                        VStack(alignment: .leading) {
                            Text(site.name).font(.headline)
                            Text("\(site.dynastyName) · \(library.record(for: site).status.title)")
                                .font(.caption).foregroundStyle(.secondary)
                        }
                    }
                }
                .navigationTitle(location.sites[0].place)
                .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
                .toolbar { Button("完成") { selection = nil } }
            }
            .presentationDetents([.medium, .large])
        }
    }
}

private struct MapLocation: Identifiable {
    let id: String
    let sites: [Monument]
    let latitude: Double
    let longitude: Double
}

struct TimelineView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var period = "all"

    private var periods: [(key: String, value: String)] {
        library.monuments.reduce(into: [String: String]()) { result, site in result[site.dynasty] = site.dynastyName }
            .sorted { $0.key < $1.key }
    }

    private var ordered: [Monument] {
        library.monuments.filter { period == "all" || $0.dynasty == period }
            .sorted { $0.year == $1.year ? $0.name < $1.name : $0.year < $1.year }
    }

    var body: some View {
        List {
            Section {
                Picker("时代", selection: $period) {
                    Text("全部时期").tag("all")
                    ForEach(periods, id: \.key) { item in
                        Text(item.value).tag(item.key)
                    }
                }
            }
            ForEach(ordered) { site in
                NavigationLink(value: site) {
                    HStack(alignment: .top, spacing: 16) {
                        Text(site.yearLabel.isEmpty ? String(site.year) : site.yearLabel)
                            .font(.system(.subheadline, design: .monospaced))
                            .foregroundStyle(Palette.dynasty(site.dynasty))
                            .frame(width: 75, alignment: .leading)
                        VStack(alignment: .leading, spacing: 4) {
                            Text(site.name).font(.headline)
                            Text("\(site.dynastyName) · \(site.place)").font(.caption).foregroundStyle(.secondary)
                        }
                        Spacer()
                        if library.record(for: site).status == .visited { Image(systemName: "seal.fill").foregroundStyle(Palette.red) }
                    }
                    .padding(.vertical, 3)
                }
            }
        }
        .scrollContentBackground(.hidden)
        .background(Palette.paper)
        .navigationTitle("年表")
    }
}
