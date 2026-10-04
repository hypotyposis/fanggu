import SwiftUI

struct CommunityAvatar: View {
    let user: CommunityUser
    var size: CGFloat = 44
    private let glyphs = ["山", "木", "石", "瓦", "云", "泉", "松", "月"]
    var body: some View {
        Text(glyphs[min(7, max(0, user.avatar))])
            .font(FangguFont.brush(size * 0.55))
            .foregroundStyle(user.avatar.isMultiple(of: 2) ? Palette.redText : Palette.gold)
            .frame(width: size, height: size)
            .background((user.avatar.isMultiple(of: 2) ? Palette.red : Palette.gold).opacity(0.09))
            .clipShape(RoundedRectangle(cornerRadius: size * 0.24))
            .overlay(RoundedRectangle(cornerRadius: size * 0.24).strokeBorder(Palette.gold.opacity(0.2), lineWidth: 0.7))
            .accessibilityHidden(true)
    }
}

struct CommunityModeBar: View {
    @EnvironmentObject private var community: CommunityStore
    var body: some View {
        HStack {
            HStack(spacing: 8) {
                Circle().fill(community.online ? Palette.gold : Palette.paper3).frame(width: 5, height: 5)
                Text(community.online ? "与同好共读" : "一人寻古")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
            }
            Spacer()
            Button { community.setOnline(!community.online); Haptics.selection() } label: {
                HStack(spacing: 7) {
                    Image(systemName: community.online ? "person.2" : "person")
                    Text(community.online ? "联机" : "单机")
                    Image(systemName: "arrow.left.arrow.right").font(.system(size: 10))
                }
                .font(FangguFont.serif(12, weight: .medium))
                .foregroundStyle(community.online ? Palette.gold : Palette.paper2)
                .padding(.horizontal, 13).frame(minHeight: 36)
                .background(Palette.ink2, in: Capsule())
                .overlay(Capsule().strokeBorder(Palette.gold.opacity(0.25), lineWidth: 0.7))
            }
            .buttonStyle(.plain)
            .accessibilityLabel(community.online ? "切换到单机模式" : "切换到联机模式")
            .accessibilityIdentifier("community-mode-toggle")
        }
        .padding(.horizontal, 24).padding(.vertical, 5)
        .background(Palette.ink)
    }
}

struct CommunityView: View {
    @EnvironmentObject private var community: CommunityStore
    @EnvironmentObject private var library: LibraryStore
    @State private var scope = "latest"
    @State private var findingPeople = false
    @State private var showingRules = false

    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 24) {
                HStack(alignment: .top) {
                    FangguSectionTitle(eyebrow: "同看山河 · 各有所见", title: "同好之间", subtitle: "让每一份亲见，成为下一次出发的线索。")
                    Button { findingPeople = true } label: {
                        Image(systemName: "person.crop.circle.badge.plus").font(.system(size: 23)).frame(width: 44, height: 44)
                    }.foregroundStyle(Palette.gold).accessibilityLabel("发现同好")
                }
                if let discovery = community.discovery {
                    if !discovery.sites.isEmpty {
                        VStack(alignment: .leading, spacing: 12) {
                            HStack {
                                Text("此刻，大家在看").font(FangguFont.serif(15, weight: .medium))
                                Spacer()
                                Text("\(discovery.reviewCount) 份评价").font(FangguFont.mono(11)).foregroundStyle(Palette.paper3)
                            }
                            ScrollView(.horizontal, showsIndicators: false) {
                                HStack(spacing: 14) {
                                    ForEach(discovery.sites) { summary in
                                        if let site = library.monuments.first(where: { $0.id == summary.siteID }) {
                                            NavigationLink(value: site) { CommunityMonumentTile(site: site, summary: summary) }
                                                .buttonStyle(.plain)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if discovery.hasDemoContent {
                        Text("原型社区含标注为「示例」的演示评价。你的操作会真实保存。")
                            .font(FangguFont.serif(11)).foregroundStyle(Palette.paper3)
                    }
                }
                HStack(spacing: 24) {
                    scopeButton("最新", value: "latest")
                    scopeButton("关注", value: "following")
                    Spacer()
                    Button { showingRules = true } label: { Image(systemName: "info.circle").frame(width: 44, height: 44) }
                        .foregroundStyle(Palette.paper3).accessibilityLabel("社区与评分说明")
                }
                if let error = community.error {
                    CommunityError(message: error) { Task { await community.refresh(scope: scope) } }
                    if !community.feed.isEmpty, let cachedAt = community.cachedAt {
                        Text("显示上次读取的内容 · \(cachedAt.formatted(date: .abbreviated, time: .shortened))")
                            .font(FangguFont.serif(11)).foregroundStyle(Palette.paper3)
                    }
                }
                if community.loading && community.feed.isEmpty { CommunityLoading() }
                else if community.feed.isEmpty {
                    CommunityEmpty(symbol: scope == "following" ? "person.2" : "text.bubble",
                        title: scope == "following" ? "从一位同好开始" : "第一份亲见，等你写下",
                        message: scope == "following" ? "关注喜欢的访古者，他们的新评价会出现在这里。" : "在古迹详情中写下评分与短评，会自动与大家分享。")
                    if scope == "following" { Button("发现同好") { findingPeople = true }.buttonStyle(FangguOutlineButton()) }
                } else {
                    ForEach(community.feed) { review in
                        CommunityReviewCard(review: review)
                        FangguRule()
                    }
                    if community.nextCursor != nil {
                        Button { Task { await community.loadMore() } } label: {
                            HStack { Spacer(); Text(community.loading ? "正在翻阅…" : "继续翻阅"); Spacer() }.frame(minHeight: 44)
                        }.disabled(community.loading).foregroundStyle(Palette.gold)
                    } else {
                        Text("已读到这里 · 不妨去看看古迹")
                            .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).frame(maxWidth: .infinity).padding(.vertical, 8)
                    }
                }
            }
            .padding(.horizontal, 24).padding(.top, 24).padding(.bottom, 90)
        }
        .background(Palette.ink)
        .foregroundStyle(Palette.paper)
        .toolbar(.hidden, for: .navigationBar)
        .refreshable { await community.synchronize(); await community.refresh(scope: scope) }
        .task { await community.refresh(scope: scope) }
        .onChange(of: scope) { _, value in Task { await community.refresh(scope: value) } }
        .sheet(isPresented: $findingPeople) { NavigationStack { CommunityPeopleView() } }
        .sheet(isPresented: $showingRules) { NavigationStack { CommunityRulesView() } }
    }
    private func scopeButton(_ title: String, value: String) -> some View {
        Button { scope = value; Haptics.selection() } label: {
            VStack(spacing: 10) {
                Text(title).font(FangguFont.serif(20, weight: scope == value ? .semibold : .regular))
                Rectangle().fill(scope == value ? Palette.red : .clear).frame(width: 22, height: 2)
            }
            .foregroundStyle(scope == value ? Palette.paper : Palette.paper3)
        }.buttonStyle(.plain).accessibilityIdentifier("community-scope-\(value)")
            .accessibilityAddTraits(scope == value ? .isSelected : [])
    }
}

struct CommunityMonumentTile: View {
    let site: Monument
    let summary: CommunitySummary
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            ArtworkView(site: site, visited: false, height: 122)
            Text(site.name).font(FangguFont.serif(14, weight: .medium)).lineLimit(1)
            HStack(alignment: .firstTextBaseline, spacing: 5) {
                Text(summary.score.map { communityScoreText($0) } ?? "—")
                    .font(FangguFont.serif(21, weight: .medium)).foregroundStyle(Palette.gold)
                Text(summary.score == nil ? "评分积累中" : "/ 5 · \(summary.ratingCount) 人")
                    .font(FangguFont.mono(10)).foregroundStyle(Palette.paper3)
            }
        }.frame(width: 160).foregroundStyle(Palette.paper)
    }
}

struct CommunityReviewCard: View {
    @EnvironmentObject private var library: LibraryStore
    @EnvironmentObject private var community: CommunityStore
    let review: CommunityReview
    var showMonument = true
    @State private var reporting = false
    @State private var actionError: String?
    @State private var reported = false

    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            HStack(spacing: 11) {
                NavigationLink { CommunityProfileView(userID: review.author.id) } label: {
                    HStack(spacing: 11) {
                        CommunityAvatar(user: review.author, size: 38)
                        VStack(alignment: .leading, spacing: 3) {
                            HStack(spacing: 6) {
                                Text(review.author.nickname).font(FangguFont.serif(14, weight: .medium)).foregroundStyle(Palette.paper)
                                if review.author.isDemo { Text("示例").font(FangguFont.mono(9)).foregroundStyle(Palette.paper3) }
                            }
                            Text(communityDate(review.createdAt)).font(FangguFont.mono(10)).foregroundStyle(Palette.paper3)
                        }
                    }
                }.buttonStyle(.plain)
                Spacer(minLength: 4)
                if let score = review.score {
                    Text(communityScoreText(score)).font(FangguFont.serif(23, weight: .medium)).foregroundStyle(Palette.gold)
                    Text("/ 5").font(FangguFont.mono(10)).foregroundStyle(Palette.paper3)
                } else if !review.dimensions.isEmpty {
                    Text("已评 \(review.dimensions.count)/6 项").font(FangguFont.mono(10)).foregroundStyle(Palette.paper3)
                }
                if review.author.id != community.user?.id {
                    Menu {
                        Button("举报评价", systemImage: "flag") { reporting = true }
                        Button("屏蔽此用户", systemImage: "person.crop.circle.badge.minus", role: .destructive) {
                            Task { do { try await community.block(review.author, enabled: true) } catch { actionError = error.localizedDescription } }
                        }
                    } label: {
                        Image(systemName: "ellipsis").frame(width: 32, height: 44).foregroundStyle(Palette.paper3)
                    }.accessibilityLabel("评价操作")
                }
            }
            if showMonument, let site = library.monuments.first(where: { $0.id == review.siteID }) {
                NavigationLink(value: site) {
                    HStack(spacing: 12) {
                        ArtworkView(site: site, visited: false, height: 66).frame(width: 80)
                        VStack(alignment: .leading, spacing: 5) {
                            Text(site.name).font(FangguFont.serif(16, weight: .medium)).foregroundStyle(Palette.paper)
                            Text("\(site.dynastyName) · \(site.place)").font(FangguFont.serif(11)).foregroundStyle(Palette.paper3)
                        }
                        Spacer()
                        Image(systemName: "arrow.up.right").font(.system(size: 12)).foregroundStyle(Palette.gold)
                    }.padding(10).background(Palette.ink2)
                }.buttonStyle(.plain)
            }
            if !review.text.isEmpty {
                Text(review.text).font(FangguFont.serif(15)).lineSpacing(6).foregroundStyle(Palette.paper2).textSelection(.enabled)
            }
            if !review.dimensions.isEmpty {
                ViewThatFits(in: .horizontal) {
                    dimensionStrip
                    dimensionStrip.font(FangguFont.mono(9)).minimumScaleFactor(0.7)
                }
            }
            if reported { Text("举报已提交，我们会核查这份评价。").font(FangguFont.serif(12)).foregroundStyle(Palette.gold) }
            if let actionError { Text(actionError).font(FangguFont.serif(12)).foregroundStyle(Palette.redText) }
        }
        .accessibilityElement(children: .contain)
        .accessibilityIdentifier("community-review-\(review.id)")
        .sheet(isPresented: $reporting) { CommunityReportView(review: review) { reported = true } }
    }
    private var dimensionStrip: some View {
        HStack(spacing: 12) {
            ForEach(ReviewDimension.allCases) { dimension in
                VStack(spacing: 4) {
                    Text(String(dimension.title.prefix(2))).font(FangguFont.serif(10)).foregroundStyle(Palette.paper3)
                    Text(ReviewDimension.grade(review.dimensions[dimension])).font(FangguFont.mono(11)).foregroundStyle(review.dimensions[dimension] == nil ? Palette.paper3 : Palette.gold)
                }.frame(maxWidth: .infinity)
            }
        }.padding(.vertical, 8)
    }
}

struct CommunitySiteSection: View {
    @EnvironmentObject private var community: CommunityStore
    let site: Monument
    @State private var summary: CommunitySummary?
    @State private var reviews: [CommunityReview] = []
    @State private var error: String?
    @State private var loading = true
    @State private var rules = false
    var body: some View {
        VStack(alignment: .leading, spacing: 20) {
            HStack {
                Text("同好眼中的\(site.short)").font(FangguFont.serif(21, weight: .medium))
                Spacer()
                Button { rules = true } label: { Image(systemName: "info.circle").frame(width: 44, height: 44) }.foregroundStyle(Palette.paper3)
                    .accessibilityLabel("评分规则")
            }
            if let summary {
                HStack(alignment: .firstTextBaseline, spacing: 8) {
                    Text(summary.score.map { communityScoreText($0) } ?? "—")
                        .font(FangguFont.serif(52, weight: .medium)).foregroundStyle(Palette.gold)
                    Text("/ 5").font(FangguFont.mono(14)).foregroundStyle(Palette.paper3)
                    Spacer()
                    VStack(alignment: .trailing, spacing: 6) {
                        Text("\(summary.ratingCount) 人完整评分").font(FangguFont.serif(12))
                        Text("\(summary.textCount) 条短评").font(FangguFont.mono(11)).foregroundStyle(Palette.paper3)
                    }
                }
                if summary.score != nil { CommunityRadar(dimensions: summary.dimensions) }
                else {
                    Text("满 \(summary.minimumRatings) 份完整六维评价后呈现社区评分。每一项都值得认真看。")
                        .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2).lineSpacing(5)
                }
                ForEach(reviews.prefix(2)) { review in
                    FangguRule()
                    CommunityReviewCard(review: review, showMonument: false)
                }
                NavigationLink { CommunitySiteReviewsView(site: site) } label: {
                    HStack { Text(summary.reviewCount == 0 ? "看看大家的评价" : "全部 \(summary.reviewCount) 份评价"); Spacer(); Image(systemName: "arrow.right") }
                        .font(FangguFont.serif(14)).foregroundStyle(Palette.gold).frame(minHeight: 44)
                }
            } else if loading { CommunityLoading() }
            if let error { CommunityError(message: error) { Task { await load() } } }
        }
        .accessibilityIdentifier("community-site-section")
        .task(id: community.revision) { await load() }
        .sheet(isPresented: $rules) { NavigationStack { CommunityRulesView() } }
    }
    private func load() async {
        loading = true; defer { loading = false }
        do {
            async let summary = community.summary(site.id)
            async let page = community.reviews(site: site.id)
            let (value, result) = try await (summary, page)
            self.summary = value; reviews = result.items; error = nil
        } catch { self.error = error.localizedDescription }
    }
}

struct CommunityRadar: View {
    let dimensions: [String: Double]
    private func point(_ index: Int, value: Double, center: CGPoint, radius: Double) -> CGPoint {
        let angle = Double(index) * .pi / 3 - .pi / 2
        return CGPoint(x: center.x + cos(angle) * radius * value / 5, y: center.y + sin(angle) * radius * value / 5)
    }
    var body: some View {
        VStack(spacing: 12) {
            Canvas { context, size in
                let center = CGPoint(x: size.width / 2, y: size.height / 2)
                let radius = min(size.width * 0.34, size.height * 0.34)
                for step in 1...5 {
                    var path = Path()
                    for index in 0...6 {
                        let p = point(index % 6, value: Double(step), center: center, radius: radius)
                        if index == 0 { path.move(to: p) } else { path.addLine(to: p) }
                    }
                    context.stroke(path, with: .color(Palette.gold.opacity(step == 5 ? 0.4 : 0.13)), lineWidth: 0.8)
                }
                var polygon = Path()
                for (index, dimension) in ReviewDimension.allCases.enumerated() {
                    let value = dimensions[dimension.rawValue] ?? 0
                    let p = point(index, value: value, center: center, radius: radius)
                    if index == 0 { polygon.move(to: p) } else { polygon.addLine(to: p) }
                    let labelPoint = point(index, value: 6.4, center: center, radius: radius)
                    context.draw(Text(String(dimension.title.prefix(2))).font(FangguFont.serif(11)).foregroundColor(Palette.paper2), at: labelPoint)
                }
                polygon.closeSubpath()
                context.fill(polygon, with: .color(Palette.gold.opacity(0.14)))
                context.stroke(polygon, with: .color(Palette.gold), lineWidth: 1.8)
                for (index, dimension) in ReviewDimension.allCases.enumerated() {
                    let p = point(index, value: dimensions[dimension.rawValue] ?? 0, center: center, radius: radius)
                    context.fill(Path(ellipseIn: CGRect(x: p.x - 3, y: p.y - 3, width: 6, height: 6)), with: .color(Palette.gold))
                }
            }.frame(height: 225).accessibilityHidden(true)
            HStack {
                ForEach(ReviewDimension.allCases) { dimension in
                    VStack(spacing: 5) {
                        Text(String(dimension.title.prefix(2))).font(FangguFont.serif(10)).foregroundStyle(Palette.paper3)
                        Text(communityScoreText(dimensions[dimension.rawValue] ?? 0)).font(FangguFont.mono(12)).foregroundStyle(Palette.gold)
                    }.frame(maxWidth: .infinity)
                }
            }
        }.padding(.bottom, 16).background(Palette.ink2)
    }
}

struct CommunityLoading: View {
    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            HStack { RoundedRectangle(cornerRadius: 10).frame(width: 38, height: 38); Rectangle().frame(width: 110, height: 10); Spacer() }
            Rectangle().frame(height: 60)
            Rectangle().frame(height: 10)
            Rectangle().frame(width: 180, height: 10)
        }.foregroundStyle(Palette.paper.opacity(0.07)).padding(.vertical, 10).accessibilityLabel("正在读取社区")
    }
}
struct CommunityEmpty: View {
    let symbol: String
    let title: String
    let message: String
    var body: some View {
        VStack(alignment: .leading, spacing: 14) {
            Image(systemName: symbol).font(.system(size: 28, weight: .light)).foregroundStyle(Palette.gold).padding(.bottom, 6)
            Text(title).font(FangguFont.serif(22, weight: .medium)).foregroundStyle(Palette.paper)
            Text(message).font(FangguFont.serif(14)).foregroundStyle(Palette.paper2).lineSpacing(6)
        }.frame(maxWidth: .infinity, alignment: .leading).padding(.vertical, 26)
    }
}
struct CommunityError: View {
    let message: String
    let retry: () -> Void
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(message).font(FangguFont.serif(13)).foregroundStyle(Palette.redText)
            Button("重试", action: retry).font(FangguFont.serif(13)).foregroundStyle(Palette.gold).frame(minHeight: 44)
        }.padding(14).frame(maxWidth: .infinity, alignment: .leading).background(Palette.red.opacity(0.05))
    }
}

func communityDate(_ value: String) -> String {
    let formatter = ISO8601DateFormatter(); formatter.formatOptions = [.withInternetDateTime, .withFractionalSeconds]
    guard let date = formatter.date(from: value) else { return "" }
    return date.formatted(.dateTime.month(.twoDigits).day(.twoDigits))
}
