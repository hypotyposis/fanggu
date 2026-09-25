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
            .tabItem { Label("图鉴", systemImage: "square.grid.2x2") }.tag(0)

            NavigationStack {
                AtlasMapView()
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("地图", systemImage: "map") }.tag(1)

            NavigationStack {
                TimelineView()
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("年表", systemImage: "circle.grid.cross") }.tag(2)

            NavigationStack {
                MyLibraryView()
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("我的", systemImage: "seal") }.tag(3)
        }
        .preferredColorScheme(.dark)
        .tint(Palette.gold)
        .toolbarBackground(Palette.ink2, for: .tabBar)
        .toolbarBackground(.visible, for: .tabBar)
        .overlay(alignment: .top) {
            if let error = library.error {
                Text(error)
                    .font(FangguFont.serif(13))
                    .padding(12)
                    .frame(maxWidth: .infinity)
                    .background(Palette.red)
                    .foregroundStyle(Palette.paper)
                    .accessibilityAddTraits(.updatesFrequently)
            }
        }
    }
}

struct FangguBrand: View {
    var body: some View {
        HStack(spacing: 9) {
            FangguSeal(size: 26)
            Text("访 古")
                .font(FangguFont.serif(15, weight: .medium))
                .tracking(3)
                .foregroundStyle(Palette.paper)
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
    private let typeAliases = ["sculpture": "彩塑悬塑 造像 雕塑", "gate": "山门 牌坊 牌楼", "screen": "影壁 琉璃照壁"]

    private var dynastyOptions: [String: String] {
        library.monuments.filter { country == "all" || $0.country == country }
            .reduce(into: ["all": "全部时代"]) { result, site in result[site.dynasty] = site.dynastyName }
    }
    private var typeOptions: [String: String] {
        library.monuments.reduce(into: ["all": "全部类型"]) { result, site in
            for index in site.types.indices { result[site.types[index]] = site.typeNames[index] }
        }
    }
    private var regionOptions: [String: String] {
        library.monuments.filter { country == "all" || $0.country == country }
            .reduce(into: ["all": "全部地区"]) { result, site in
                let name = regionNames[site.region] ?? site.region
                result[site.region] = country == "all" ? "\(site.country == "JP" ? "日本" : "中国") · \(name)" : name
            }
    }
    private var provinceOptions: [String: String] {
        library.monuments.filter { (country == "all" || $0.country == country) && (region == "all" || $0.region == region) }
            .reduce(into: ["all": country == "JP" ? "全部都道府县" : country == "CN" ? "全部省份" : "全部省份与府县"]) { result, site in result[site.province] = site.province }
    }
    private var statusCounts: [String: Int] {
        let records = library.monuments.map { library.record(for: $0).status }
        return ["all": records.count,
                "wishlist": records.filter { $0 == .wishlist }.count,
                "visited": records.filter { $0 == .visited }.count,
                "unvisited": records.filter { $0 != .visited }.count]
    }
    private var results: [Monument] {
        let sorted = library.monuments.enumerated().sorted {
            $0.element.year == $1.element.year ? $0.offset < $1.offset : $0.element.year < $1.element.year
        }.map(\.element)
        let search = query.trimmingCharacters(in: .whitespacesAndNewlines)
        return sorted.filter { site in
            let record = library.record(for: site)
            let statusMatches = status == "all" || (status == "unvisited" ? record.status != .visited : record.status.rawValue == status)
            let protection = site.protection.flatMap { [$0.unitName, $0.scope, $0.batchLabel, "第\($0.batch)批国保", "国保", "全国重点文物保护单位"] }
            let haystack = ([site.name, site.short, site.sub, site.place, site.province, site.dynastyName,
                             site.country == "JP" ? "日本" : "中国", regionNames[site.region] ?? site.region]
                + site.typeNames + site.types.compactMap { typeAliases[$0] }
                + site.legacyNames + site.legacyPlaces + protection).joined(separator: " ")
            return statusMatches && (country == "all" || site.country == country)
                && (region == "all" || site.region == region)
                && (province == "all" || site.province == province)
                && (dynasty == "all" || site.dynasty == dynasty)
                && (type == "all" || site.types.contains(type))
                && (search.isEmpty || haystack.localizedCaseInsensitiveContains(search))
        }
    }

    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 0) {
                hero
                FangguRule().padding(.bottom, 44)
                FangguSectionTitle(eyebrow: "我的收藏 · 尚有山河可访", title: "古迹图鉴", subtitle: "以线描寄心愿，以设色记到访。亲眼见过，为古迹添一重颜色。")
                    .padding(.bottom, 26)
                statusTabs.padding(.bottom, 24)
                VStack(alignment: .leading, spacing: 8) {
                    Text("寻一处古迹")
                        .font(FangguFont.mono(11))
                        .tracking(1)
                        .foregroundStyle(Palette.paper2)
                    FangguField(placeholder: "名称、地点或国保批次", text: $query)
                }
                .padding(.bottom, 14)
                LazyVGrid(columns: [GridItem(.flexible(), spacing: 12), GridItem(.flexible(), spacing: 12)], spacing: 13) {
                    FilterMenu(title: "国家", value: $country, options: ["all": "全部国家", "CN": "中国", "JP": "日本"])
                    FilterMenu(title: "时代", value: $dynasty, options: dynastyOptions)
                    FilterMenu(title: "地区", value: $region, options: regionOptions)
                    FilterMenu(title: "省份", value: $province, options: provinceOptions)
                    FilterMenu(title: "建筑类型", value: $type, options: typeOptions)
                }
                .padding(.bottom, 24)
                HStack {
                    Text("共 \(results.count) 处")
                        .font(FangguFont.mono(12))
                        .foregroundStyle(Palette.paper2)
                    Spacer()
                    if status != "all" || country != "all" || region != "all" || province != "all" || dynasty != "all" || type != "all" || !query.isEmpty {
                        Button("清除筛选") { clearFilters() }
                            .font(FangguFont.serif(12))
                            .foregroundStyle(Palette.gold)
                    }
                }
                .padding(.bottom, 14)
                if results.isEmpty {
                    VStack(alignment: .leading, spacing: 10) {
                        Text("暂无符合条件的古迹")
                            .font(FangguFont.serif(21))
                            .foregroundStyle(Palette.paper)
                        Text("试试其他时代、地区或搜索词。")
                            .font(FangguFont.serif(13))
                            .foregroundStyle(Palette.paper2)
                    }
                    .frame(maxWidth: .infinity, minHeight: 180, alignment: .leading)
                } else {
                    ForEach(results) { site in MonumentCard(site: site).padding(.bottom, 18) }
                }
            }
            .padding(.horizontal, 24)
        }
        .background(Palette.ink.ignoresSafeArea())
        .scrollDismissesKeyboard(.interactively)
        .navigationBarTitleDisplayMode(.inline)
        .toolbar { ToolbarItem(placement: .principal) { FangguBrand() } }
        .toolbarBackground(Palette.ink, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .onChange(of: country) { _, _ in
            region = "all"; province = "all"
            if dynastyOptions[dynasty] == nil { dynasty = "all" }
        }
        .onChange(of: region) { _, _ in province = "all" }
    }

    private var hero: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 7) {
                    Text("殿阁 · 古塔 · 石刻 · 山河之间")
                    Text("36 — 2002  /  \(library.monuments.count) 处收录")
                }
                .font(FangguFont.mono(10))
                .tracking(1)
                .foregroundStyle(Palette.paper2)
                Spacer()
                FangguSeal(size: 58)
            }
            Text("访 古")
                .font(FangguFont.brush(94))
                .tracking(5)
                .foregroundStyle(Palette.paper)
                .minimumScaleFactor(0.7)
                .lineLimit(1)
                .padding(.top, 8)
            Text("从汉阙到层叠殿阁，石与木记下漫长岁月。亲见的盖上印记，向往的收入心愿；一部慢慢写满的古迹图鉴。")
                .font(FangguFont.serif(16))
                .foregroundStyle(Palette.paper)
                .lineSpacing(8)
                .padding(.top, 12)
            HStack(spacing: 10) {
                Rectangle().fill(Palette.gold).frame(width: 1, height: 32)
                Text("向下 · 从一攒斗拱开始")
                    .font(FangguFont.mono(10))
                    .foregroundStyle(Palette.paper3)
            }
            .padding(.top, 28)
            if let path = Bundle.main.path(forResource: "hero.png", ofType: nil, inDirectory: "Artwork"),
               let image = UIImage(contentsOfFile: path) {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
                    .frame(maxWidth: .infinity)
                    .frame(height: 180)
                    .padding(.top, 20)
                    .accessibilityLabel("佛光寺东大殿柱头铺作 · 线稿")
            }
            Text("佛光寺东大殿 · 柱头铺作")
                .font(FangguFont.mono(10))
                .foregroundStyle(Palette.paper3)
                .padding(.top, 8)
        }
        .padding(.top, 35)
        .padding(.bottom, 58)
    }

    private var statusTabs: some View {
        HStack(spacing: 0) {
            ForEach([("all", "全部收录"), ("wishlist", "心愿单"), ("visited", "已到访"), ("unvisited", "未到访")], id: \.0) { key, title in
                Button {
                    withAnimation(.easeInOut(duration: 0.2)) { status = key }
                } label: {
                    VStack(spacing: 7) {
                        Text(title)
                            .font(FangguFont.serif(12))
                            .lineLimit(1)
                            .minimumScaleFactor(0.8)
                        Text("\(statusCounts[key] ?? 0)")
                            .font(FangguFont.mono(10))
                        Rectangle().fill(status == key ? Palette.gold : .clear).frame(height: 1)
                    }
                    .foregroundStyle(status == key ? Palette.gold : Palette.paper2)
                    .frame(maxWidth: .infinity)
                }
                .buttonStyle(.plain)
            }
        }
        .overlay(alignment: .bottom) { FangguRule() }
    }

    private func clearFilters() {
        query = ""; status = "all"; country = "all"; region = "all"
        province = "all"; dynasty = "all"; type = "all"
    }
}

private struct FilterMenu: View {
    let title: String
    @Binding var value: String
    let options: [String: String]

    var body: some View {
        Menu {
            ForEach(options.keys.sorted { a, b in a == "all" || (b != "all" && (options[a] ?? a) < (options[b] ?? b)) }, id: \.self) { key in
                Button(options[key] ?? key) { value = key }
            }
        } label: {
            VStack(alignment: .leading, spacing: 6) {
                Text(title)
                    .font(FangguFont.mono(10))
                    .foregroundStyle(Palette.paper3)
                HStack(spacing: 3) {
                    Text(options[value] ?? "全部")
                        .lineLimit(1)
                        .minimumScaleFactor(0.8)
                    Spacer(minLength: 2)
                    Image(systemName: "chevron.down").font(.system(size: 9))
                }
                .font(FangguFont.serif(13))
                .foregroundStyle(Palette.paper)
            }
            .padding(.horizontal, 12)
            .frame(maxWidth: .infinity, minHeight: 56, alignment: .leading)
            .background(Palette.ink2)
            .overlay(Rectangle().stroke(Palette.paper.opacity(0.2), lineWidth: 1))
        }
    }
}

struct ArtworkView: View {
    let site: Monument
    let visited: Bool
    var height: CGFloat = 220
    var reveal: CGFloat = 0

    private func artwork(_ name: String) -> UIImage? {
        guard let path = Bundle.main.path(forResource: name, ofType: nil, inDirectory: "Artwork") else { return nil }
        return UIImage(contentsOfFile: path)
    }

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                Palette.ink2
                if let line = artwork(site.lineImage) {
                    Image(uiImage: line).resizable().scaledToFit().padding(14)
                } else {
                    Text("图版待装入")
                        .font(FangguFont.serif(13))
                        .foregroundStyle(Palette.paper3)
                }
                if (visited || reveal > 0), let color = artwork(site.colorImage) {
                    Image(uiImage: color)
                        .resizable().scaledToFit().padding(14)
                        .mask(alignment: .leading) {
                            Rectangle().frame(width: geometry.size.width * (visited ? 1 : reveal))
                        }
                }
                if visited {
                    Text("亲\n见")
                        .font(FangguFont.brush(19))
                        .lineSpacing(-3)
                        .foregroundStyle(Palette.red)
                        .padding(7)
                        .overlay(Rectangle().stroke(Palette.red, lineWidth: 1.5))
                        .rotationEffect(.degrees(-8))
                        .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .bottomTrailing)
                        .padding(20)
                }
            }
        }
        .frame(height: height)
        .accessibilityLabel("\(site.name)\(visited ? "设色图" : "线稿")")
    }
}

struct MonumentCard: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument
    @State private var reveal: CGFloat = 0
    @State private var editingReview = false

    private var record: VisitRecord { library.record(for: site) }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            NavigationLink(value: site) {
                VStack(alignment: .leading, spacing: 0) {
                    ArtworkView(site: site, visited: record.status == .visited, height: 240, reveal: reveal)
                    VStack(alignment: .leading, spacing: 9) {
                        HStack(spacing: 8) {
                            Text(record.status == .wishlist ? "想去" : record.status.title)
                                .foregroundStyle(record.status == .visited ? Palette.red : Palette.gold)
                            Text(site.dynastyName)
                                .foregroundStyle(site.accent)
                            Text(site.yearLabel.isEmpty ? String(site.year) : site.yearLabel)
                                .foregroundStyle(Palette.paper3)
                        }
                        .font(FangguFont.mono(11))
                        Text(site.name)
                            .font(FangguFont.serif(22, weight: .medium))
                            .foregroundStyle(Palette.paper)
                        Text("\(site.place)  ·  \(site.typeNames.joined(separator: " · "))")
                            .font(FangguFont.serif(12))
                            .foregroundStyle(Palette.paper2)
                            .lineLimit(2)
                    }
                    .padding(17)
                }
            }
            .buttonStyle(.plain)
            if !site.protection.isEmpty {
                HStack(spacing: 8) {
                    ForEach(site.protection, id: \.self) { entry in
                        Text(entry.batchLabel)
                            .font(FangguFont.mono(10))
                            .foregroundStyle(Palette.gold)
                            .padding(.horizontal, 8)
                            .padding(.vertical, 4)
                            .overlay(Rectangle().stroke(Palette.goldDim.opacity(0.7), lineWidth: 1))
                    }
                }
                .padding(.horizontal, 17)
                .padding(.bottom, 14)
            }
            if record.status != .visited {
                ArrivalSlider(site: site, progress: $reveal)
                    .padding(.horizontal, 17)
                    .padding(.bottom, 12)
            } else {
                Text(record.visitedOn.isEmpty ? "已到访" : "已到访 · \(record.visitedOn)")
                    .font(FangguFont.mono(11))
                    .foregroundStyle(Palette.red)
                    .padding(.horizontal, 17)
                    .padding(.bottom, 12)
            }
            HStack(spacing: 10) {
                if record.status != .visited {
                    Button(record.status == .wishlist ? "移出心愿单" : "加入心愿单") {
                        var next = record
                        next.status = record.status == .wishlist ? .unvisited : .wishlist
                        library.setRecord(next, for: site)
                    }
                    .buttonStyle(FangguOutlineButton())
                }
                Button("写短评 / 打分") { editingReview = true }
                    .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
                Spacer(minLength: 0)
                NavigationLink(value: site) {
                    Text("细读 ↗")
                        .font(FangguFont.serif(12))
                        .foregroundStyle(Palette.gold)
                }
            }
            .padding(.horizontal, 17)
            .padding(.bottom, 18)
        }
        .background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
        .sheet(isPresented: $editingReview) { ReviewEditor(site: site) }
    }
}
