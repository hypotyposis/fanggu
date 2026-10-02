import SwiftUI

struct ContentView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var selectedTab = 0
    @State private var keyboardVisible = false

    var body: some View {
        Group {
            if #available(iOS 26.0, *) {
                tabs
                    .tabBarMinimizeBehavior(.onScrollDown)
            } else {
                tabs
            }
        }
        .fangguAppearance()
        .tint(Palette.gold)
        .overlay(alignment: .top) {
            if let error = library.error {
                Text(error)
                    .font(FangguFont.serif(13))
                    .padding(12)
                    .frame(maxWidth: .infinity)
                    .background(Palette.red)
                    .foregroundStyle(Palette.sealPaper)
                    .accessibilityAddTraits(.updatesFrequently)
            }
        }
        .onReceive(NotificationCenter.default.publisher(for: UIResponder.keyboardWillShowNotification)) { _ in
            keyboardVisible = true
        }
        .onReceive(NotificationCenter.default.publisher(for: UIResponder.keyboardWillHideNotification)) { _ in
            keyboardVisible = false
        }
    }

    private var tabs: some View {
        TabView(selection: $selectedTab) {
            NavigationStack {
                tabRoot(ExploreView())
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("图鉴", systemImage: "square.grid.2x2") }.tag(0)

            NavigationStack {
                tabRoot(AtlasMapView(onBrowse: { selectedTab = 0 }))
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("地图", systemImage: "map") }.tag(1)

            NavigationStack {
                tabRoot(TimelineView())
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("年表", systemImage: "circle.grid.cross") }.tag(2)

            NavigationStack {
                tabRoot(MyLibraryView())
                    .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            }
            .tabItem { Label("我的", systemImage: "seal") }.tag(3)
        }
    }

    @ViewBuilder private func tabRoot<Content: View>(_ content: Content) -> some View {
        if #available(iOS 26.0, *) {
            content
        } else {
            content
                .toolbar(.hidden, for: .tabBar)
                .safeAreaInset(edge: .bottom, spacing: 0) {
                    if !keyboardVisible { FrostedTabBar(selection: $selectedTab) }
                }
        }
    }
}

private struct FrostedTabBar: View {
    @Binding var selection: Int
    @Namespace private var selectionAnimation
    @Environment(\.accessibilityReduceTransparency) private var reduceTransparency
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    @Environment(\.colorScheme) private var colorScheme

    private let items: [(title: String, icon: String)] = [
        ("图鉴", "square.grid.2x2"),
        ("地图", "map"),
        ("年表", "circle.grid.cross"),
        ("我的", "seal")
    ]

    var body: some View {
        HStack(spacing: 3) {
            ForEach(items.indices, id: \.self) { index in
                Button {
                    guard selection != index else { return }
                    withAnimation(.spring(response: 0.34, dampingFraction: 0.82)) { selection = index }
                    Haptics.selection()
                } label: {
                    VStack(spacing: 3) {
                        Image(systemName: items[index].icon)
                            .font(.system(size: 20, weight: .medium))
                            .frame(height: 24)
                        Text(items[index].title)
                            .font(FangguFont.serif(11, weight: .medium))
                    }
                    .foregroundStyle(selection == index ? Palette.gold : Palette.paper2)
                    .frame(maxWidth: .infinity)
                    .frame(minHeight: dynamicTypeSize.isAccessibilitySize ? 80 : 56)
                    .background {
                        if selection == index {
                            RoundedRectangle(cornerRadius: 20, style: .continuous)
                                .fill(Palette.paper.opacity(colorScheme == .light ? 0.035 : 0.13))
                                .overlay {
                                    RoundedRectangle(cornerRadius: 20, style: .continuous)
                                        .strokeBorder(Palette.gold.opacity(0.24), lineWidth: 0.8)
                                }
                                .matchedGeometryEffect(id: "selectedTab", in: selectionAnimation)
                        }
                    }
                    .contentShape(Rectangle())
                }
                .buttonStyle(.plain)
                .accessibilityLabel(items[index].title)
                .accessibilityAddTraits(selection == index ? .isSelected : [])
            }
        }
        .padding(6)
        .background {
            let shape = RoundedRectangle(cornerRadius: 28, style: .continuous)
            shape
                .fill(reduceTransparency ? AnyShapeStyle(Palette.ink3) : AnyShapeStyle(.ultraThinMaterial))
                .overlay(shape.fill(Palette.ink.opacity(0.24)))
                .overlay {
                    shape.strokeBorder(
                        LinearGradient(colors: [Palette.paper.opacity(0.34), Palette.paper.opacity(0.06), Palette.gold.opacity(0.15)],
                                       startPoint: .topLeading, endPoint: .bottomTrailing),
                        lineWidth: 0.8
                    )
                }
                .shadow(color: Palette.shadow.opacity(0.45), radius: 22, y: 8)
        }
        .padding(.horizontal, 22)
        .padding(.bottom, 8)
    }
}

struct ExploreView: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    @State private var query = ""
    @State private var status = "all"
    @State private var country = "all"
    @State private var region = "all"
    @State private var province = "all"
    @State private var dynasty = "all"
    @State private var type = "all"
    @State private var sortOrder = "wishlist"
    @State private var showCards = false
    @State private var showingFilters = false
    @State private var showingAbout = false

    private let regionNames = ["north": "华北", "northeast": "东北", "east": "华东", "central": "华中", "south": "华南", "southwest": "西南", "northwest": "西北", "jp_kinki": "近畿", "kr_capital": "韩国首都圈", "kr_chungcheong": "忠清地区", "kr_gyeongsang": "庆尚地区", "kp_pyongyang": "平壤地区", "kp_kaesong": "开城地区", "jp_kanto": "关东", "jp_chugoku": "中国地方", "kh_angkor": "吴哥地区", "id_java": "爪哇", "th_north": "泰国北部", "th_central": "泰国中部", "mm_central": "缅甸中部", "la_north": "老挝北部", "vn_central": "越南中部", "ph_luzon": "吕宋"]
    private let countryNames = ["CN": "中国", "JP": "日本", "KR": "韩国", "KP": "朝鲜", "KH": "柬埔寨", "ID": "印度尼西亚", "TH": "泰国", "MM": "缅甸", "LA": "老挝", "VN": "越南", "PH": "菲律宾"]
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
                result[site.region] = country == "all" ? "\(countryNames[site.country] ?? site.country) · \(name)" : name
            }
    }
    private var provinceOptions: [String: String] {
        library.monuments.filter { (country == "all" || $0.country == country) && (region == "all" || $0.region == region) }
            .reduce(into: ["all": country == "JP" ? "全部都道府县" : country == "CN" ? "全部省份" : "全部行政区"]) { result, site in result[site.province] = site.province }
    }
    private var statusCounts: [String: Int] {
        let records = library.monuments.map { library.record(for: $0).status }
        return ["all": records.count,
                "wishlist": records.filter { $0 == .wishlist }.count,
                "visited": records.filter { $0 == .visited }.count,
                "unvisited": records.filter { $0 == .unvisited }.count]
    }
    private var activeFilterCount: Int {
        [country, region, province, dynasty, type].filter { $0 != "all" }.count
    }
    private var sortTitle: String {
        switch sortOrder {
        case "newest": "新到旧"
        case "name": "名称"
        case "oldest": "旧到新"
        default: "心愿优先"
        }
    }
    private var results: [Monument] {
        let sorted = library.monuments.enumerated().sorted {
            $0.element.year == $1.element.year ? $0.offset < $1.offset : $0.element.year < $1.element.year
        }.map(\.element)
        let search = query.trimmingCharacters(in: .whitespacesAndNewlines)
        let matches = sorted.filter { site in
            let record = library.record(for: site)
            let statusMatches = status == "all" || record.status.rawValue == status
            let protection = site.protection.flatMap { [$0.unitName, $0.scope, $0.batchLabel, "第\($0.batch)批国保", "国保", "全国重点文物保护单位"] }
            let haystack = ([site.name, site.short, site.sub, site.place, site.province, site.dynastyName,
                             countryNames[site.country] ?? site.country, regionNames[site.region] ?? site.region]
                + site.typeNames + site.types.compactMap { typeAliases[$0] }
                + site.legacyNames + site.legacyPlaces + protection).joined(separator: " ")
            return statusMatches && (country == "all" || site.country == country)
                && (region == "all" || site.region == region)
                && (province == "all" || site.province == province)
                && (dynasty == "all" || site.dynasty == dynasty)
                && (type == "all" || site.types.contains(type))
                && (search.isEmpty || haystack.localizedCaseInsensitiveContains(search))
        }
        switch sortOrder {
        case "wishlist":
            return matches.filter { library.record(for: $0).status == .wishlist }
                + matches.filter { library.record(for: $0).status != .wishlist }
        case "newest": return Array(matches.reversed())
        case "name": return matches.sorted { $0.name.localizedStandardCompare($1.name) == .orderedAscending }
        default: return matches
        }
    }

    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 0) {
                HStack(alignment: .top, spacing: 12) {
                    FangguSectionTitle(eyebrow: "访古 · \(library.monuments.count) 处收录", title: "古迹图鉴", subtitle: "寻古迹，记下亲见与心愿。")
                    Button { showingAbout = true } label: {
                        FangguSeal(size: 36).frame(width: 44, height: 44)
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel("关于访古")
                }
                .padding(.top, 28)
                .padding(.bottom, 20)
                FangguField(placeholder: "搜索古迹、地点或时代", text: $query)
                    .padding(.bottom, 18)
                statusTabs.padding(.bottom, 16)
                catalogControls
                .labelStyle(.titleOnly)
                .padding(.bottom, 20)
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
                        Button("清除筛选") { clearFilters() }
                            .buttonStyle(FangguOutlineButton())
                    }
                    .frame(maxWidth: .infinity, minHeight: 180, alignment: .leading)
                } else {
                    ForEach(results) { site in
                        if showCards {
                            MonumentCard(site: site).padding(.bottom, 18)
                        } else {
                            NavigationLink(value: site) { TimelineSiteRow(site: site) }
                                .buttonStyle(.plain)
                                .padding(.bottom, 10)
                        }
                    }
                }
            }
            .padding(.horizontal, 24)
        }
        .background(Palette.ink.ignoresSafeArea())
        .scrollDismissesKeyboard(.interactively)
        .toolbar(.hidden, for: .navigationBar)
        .sheet(isPresented: $showingFilters) { filtersSheet }
        .sheet(isPresented: $showingAbout) {
            NavigationStack {
                ScrollView { hero.padding(.horizontal, 24) }
                    .background(Palette.ink.ignoresSafeArea())
                    .navigationTitle("关于访古")
                    .toolbar { Button("关闭") { showingAbout = false } }
            }
            .fangguAppearance()
        }
        .onChange(of: country) { _, _ in
            region = "all"; province = "all"
            if dynastyOptions[dynasty] == nil { dynasty = "all" }
        }
        .onChange(of: region) { _, _ in province = "all" }
    }

    private var filtersSheet: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 14) {
                    Text("按地域、时代和建筑类型缩小范围。")
                        .font(FangguFont.serif(14)).foregroundStyle(Palette.paper2)
                    FilterMenu(title: "国家", value: $country, options: countryNames.merging(["all": "全部国家"]) { current, _ in current })
                    FilterMenu(title: "时代", value: $dynasty, options: dynastyOptions)
                    FilterMenu(title: "地区", value: $region, options: regionOptions)
                    FilterMenu(title: "省份", value: $province, options: provinceOptions)
                    FilterMenu(title: "建筑类型", value: $type, options: typeOptions)
                    Button("清除筛选") { clearFilters() }
                        .buttonStyle(FangguOutlineButton())
                }
                .padding(24)
            }
            .background(Palette.ink.ignoresSafeArea())
            .navigationTitle("筛选古迹")
            .toolbar { Button("完成") { showingFilters = false } }
        }
        .fangguAppearance()
        .presentationDetents([.large])
    }

    private var catalogControls: some View {
        Group {
            if dynamicTypeSize.isAccessibilitySize {
                VStack(alignment: .leading, spacing: 8) {
                    sortMenu
                    HStack(spacing: 8) { filterButton; displayButton }
                }
            } else {
                HStack(spacing: 8) { sortMenu; filterButton; displayButton }
            }
        }
    }

    private var sortMenu: some View {
        Menu {
            Button("心愿优先") { sortOrder = "wishlist" }
            Button("年代从早到晚") { sortOrder = "oldest" }
            Button("年代从晚到早") { sortOrder = "newest" }
            Button("名称") { sortOrder = "name" }
        } label: { Label(sortTitle, systemImage: "arrow.up.arrow.down") }
            .buttonStyle(FangguOutlineButton())
    }

    private var filterButton: some View {
        Button { showingFilters = true } label: {
            Label(activeFilterCount == 0 ? "筛选" : "筛选 \(activeFilterCount)", systemImage: "line.3.horizontal.decrease")
        }
        .buttonStyle(FangguOutlineButton())
    }

    private var displayButton: some View {
        Button { showCards.toggle() } label: {
            Label(showCards ? "列表" : "大图", systemImage: showCards ? "list.bullet" : "rectangle.stack")
        }
        .buttonStyle(FangguOutlineButton())
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
        Group {
            if dynamicTypeSize.isAccessibilitySize {
                LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 10) {
                    ForEach(statusOptions, id: \.0) { key, title in statusButton(key, title) }
                }
            } else {
                HStack(spacing: 0) {
                    ForEach(statusOptions, id: \.0) { key, title in statusButton(key, title) }
                }
            }
        }
        .overlay(alignment: .bottom) { FangguRule() }
    }

    private var statusOptions: [(String, String)] {
        [("all", "全部"), ("wishlist", "心愿单"), ("visited", "已到访"), ("unvisited", "未标记")]
    }

    private func statusButton(_ key: String, _ title: String) -> some View {
        Button {
            if status != key {
                withAnimation(.easeInOut(duration: 0.2)) { status = key }
                Haptics.selection()
            }
        } label: {
            VStack(spacing: 7) {
                Text(title)
                    .font(FangguFont.serif(12))
                    .lineLimit(dynamicTypeSize.isAccessibilitySize ? 2 : 1)
                    .minimumScaleFactor(0.8)
                Text("\(statusCounts[key] ?? 0)").font(FangguFont.mono(11))
                Rectangle().fill(status == key ? Palette.gold : .clear).frame(height: 1)
            }
            .foregroundStyle(status == key ? Palette.gold : Palette.paper2)
            .frame(maxWidth: .infinity, minHeight: 44)
        }
        .buttonStyle(.plain)
        .accessibilityAddTraits(status == key ? .isSelected : [])
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
                Button(options[key] ?? key) {
                    if value != key { value = key; Haptics.selection() }
                }
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
    @Environment(\.accessibilityReduceMotion) private var reduceMotion
    @Environment(\.colorScheme) private var colorScheme
    let site: Monument
    let visited: Bool
    var height: CGFloat = 220
    var reveal: CGFloat = 0

    private static let images = NSCache<NSString, UIImage>()

    static func artwork(_ name: String) -> UIImage? {
        if let image = images.object(forKey: name as NSString) { return image }
        guard let path = Bundle.main.path(forResource: name, ofType: nil, inDirectory: "Artwork") else { return nil }
        guard let image = UIImage(contentsOfFile: path) else { return nil }
        images.setObject(image, forKey: name as NSString)
        return image
    }

    var body: some View {
        let color = Self.artwork(site.colorImage)
        let progress = min(1, max(0, reveal))
        let lineOpacity = color == nil ? 1 : (visited ? 0 : progress <= 0.8 ? 1 : (1 - progress) / 0.2)
        return ZStack {
            Palette.ink2
            if let line = Self.artwork(site.lineImage) {
                Image(uiImage: line)
                    .renderingMode(colorScheme == .light ? .template : .original)
                    .resizable().scaledToFit().padding(14)
                    .foregroundStyle(site.accent)
                    .opacity(lineOpacity)
            } else {
                Text("图版待装入")
                    .font(FangguFont.serif(13))
                    .foregroundStyle(Palette.paper3)
            }
            if let color, visited || progress > 0 {
                Image(uiImage: color)
                    .resizable().scaledToFit().padding(14)
                    .opacity(visited ? 1 : progress)
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
                    .transition(reduceMotion ? .identity : .scale(scale: 1.18))
            }
        }
        .animation(reduceMotion ? nil : .spring(response: 0.32, dampingFraction: 0.78), value: visited)
        .frame(height: height)
        .accessibilityLabel("\(site.name)\(visited ? "设色图" : "线稿")")
    }
}

struct MonumentCard: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument
    @State private var editingVisit = false
    @State private var editingReview = false
    @State private var reveal: CGFloat = 0

    private var record: VisitRecord { library.record(for: site) }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            NavigationLink(value: site) {
                VStack(alignment: .leading, spacing: 0) {
                    ArtworkView(site: site, visited: record.status == .visited,
                                height: 240, reveal: reveal)
                    VStack(alignment: .leading, spacing: 9) {
                        HStack(spacing: 8) {
                            Text(record.status.title)
                                .foregroundStyle(record.status.textColor)
                            Text(site.dynastyName)
                                .foregroundStyle(site.accent)
                            if !site.displayYearLabel.isEmpty {
                                Text(site.displayYearLabel).foregroundStyle(Palette.paper3)
                            }
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
                VStack(alignment: .leading, spacing: 10) {
                    ArrivalSlider(site: site, progress: $reveal, onComplete: finishArrival)
                    Button("填写到访日期与笔记") { editingVisit = true }
                        .buttonStyle(FangguOutlineButton())
                }
                .padding(.horizontal, 17)
                .padding(.bottom, 12)
            } else {
                Text(record.visitedOn.isEmpty ? "已到访" : "已到访 · \(record.visitedOn)")
                    .font(FangguFont.mono(11))
                    .foregroundStyle(Palette.redText)
                    .padding(.horizontal, 17)
                    .padding(.bottom, 12)
            }
            HStack(spacing: 10) {
                if record.status != .visited {
                    Button(record.status == .wishlist ? "移出心愿单" : "加入心愿单") {
                        var next = record
                        next.status = record.status == .wishlist ? .unvisited : .wishlist
                        if library.setRecord(next, for: site) { Haptics.soft() }
                        else { Haptics.error() }
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
        .sheet(isPresented: $editingVisit) { VisitEditor(site: site) }
        .sheet(isPresented: $editingReview) { ReviewEditor(site: site) }
    }

    private func finishArrival() {
        reveal = 0
    }
}
