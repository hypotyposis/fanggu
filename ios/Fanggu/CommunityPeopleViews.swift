import SwiftUI

struct CommunityPeopleView: View {
    @EnvironmentObject private var community: CommunityStore
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    var userID: String? = nil
    var kind: String? = nil
    @State private var query = ""
    @State private var people: [CommunityUser] = []
    @State private var loading = true
    @State private var error: String?
    private var title: String { kind == "followers" ? "粉丝" : kind == "following" ? "关注的人" : kind == "blocks" ? "已屏蔽" : "发现同好" }
    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 20) {
                if kind == nil { FangguField(placeholder: "搜索昵称或账号", text: $query).accessibilityIdentifier("community-people-search") }
                if loading && people.isEmpty { CommunityLoading() }
                if let error { CommunityError(message: error) { Task { await load() } } }
                if !loading && people.isEmpty {
                    CommunityEmpty(symbol: "person.2", title: query.isEmpty ? "这里还很安静" : "还没有找到这位同好", message: kind == "blocks" ? "屏蔽的用户会出现在这里，可以随时解除。" : "从古迹评价中，也能遇见与你趣味相投的人。")
                }
                ForEach(people) { person in
                    if kind == "blocks" {
                        HStack {
                            CommunityAvatar(user: person)
                            Text(person.nickname).font(FangguFont.serif(16))
                            Spacer()
                            Button("解除屏蔽") {
                                Task { do { try await community.block(person, enabled: false); await load() } catch { self.error = error.localizedDescription } }
                            }.font(FangguFont.serif(13)).foregroundStyle(Palette.gold).frame(minHeight: 44)
                        }
                    } else { CommunityPersonRow(person: person) }
                    FangguRule()
                }
            }.padding(24)
        }
        .background(Palette.ink).foregroundStyle(Palette.paper)
        .navigationTitle(title).navigationBarTitleDisplayMode(.inline)
        .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
        .toolbar { ToolbarItem(placement: .confirmationAction) { Button("完成") { dismiss() }.foregroundStyle(Palette.gold) } }
        .task(id: "\(query):\(community.revision)") {
            do { try await Task.sleep(for: .milliseconds(250)) } catch { return }
            await load()
        }
        .refreshable { await load() }
        .onChange(of: community.online) { _, online in if !online { dismiss() } }
        .fangguAppearance()
    }
    private func load() async {
        loading = true; defer { loading = false }
        do {
            let result: [CommunityUser]
            if kind == "blocks" { result = try await community.blockedUsers() }
            else if let userID, let kind { result = try await community.connections(userID, kind: kind) }
            else { result = try await community.searchPeople(query) }
            guard !Task.isCancelled else { return }
            people = result; error = nil
        } catch is CancellationError { }
        catch { self.error = error.localizedDescription }
    }
}

struct CommunityPersonRow: View {
    let person: CommunityUser
    var body: some View {
        HStack(spacing: 12) {
            NavigationLink { CommunityProfileView(userID: person.id) } label: {
                HStack(spacing: 12) {
                    CommunityAvatar(user: person)
                    VStack(alignment: .leading, spacing: 5) {
                        Text(person.nickname).font(FangguFont.serif(16, weight: .medium)).foregroundStyle(Palette.paper)
                        Text(person.bio.isEmpty ? "\(person.reviewCount) 份古迹评价" : person.bio)
                            .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineLimit(2)
                    }
                    Spacer(minLength: 0)
                }
            }.buttonStyle(.plain)
            CommunityFollowButton(person: person).id("\(person.id)-\(person.isFollowing)-\(person.followsYou)")
        }
    }
}

struct CommunityFollowButton: View {
    @EnvironmentObject private var community: CommunityStore
    @State var person: CommunityUser
    @State private var busy = false
    @State private var error: String?
    var body: some View {
        if person.id != community.user?.id {
            VStack(alignment: .trailing, spacing: 4) {
                Button {
                    busy = true
                    Task {
                        defer { busy = false }
                        do { person = try await community.follow(person); error = nil; Haptics.selection() }
                        catch { self.error = error.localizedDescription }
                    }
                } label: {
                    HStack(spacing: 4) {
                        if busy { ProgressView().controlSize(.small) }
                        Text(person.isFollowing ? (person.followsYou ? "互相关注" : "已关注") : "关注")
                    }
                    .font(FangguFont.serif(12, weight: .medium))
                    .foregroundStyle(person.isFollowing ? Palette.paper2 : Palette.sealPaper)
                    .padding(.horizontal, 16).frame(minHeight: 40)
                    .background(person.isFollowing ? Palette.ink2 : Palette.red, in: RoundedRectangle(cornerRadius: 7))
                }.buttonStyle(.plain).disabled(busy).accessibilityIdentifier("follow-\(person.handle)")
                if let error { Text(error).font(FangguFont.serif(10)).foregroundStyle(Palette.redText).frame(maxWidth: 130) }
            }
        }
    }
}

struct CommunityProfileView: View {
    @EnvironmentObject private var community: CommunityStore
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let userID: String
    @State private var person: CommunityUser?
    @State private var reviews: [CommunityReview] = []
    @State private var cursor: String?
    @State private var loading = true
    @State private var error: String?
    @State private var editing = false
    @State private var connections: String?
    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 24) {
                if let person {
                    HStack(alignment: .top, spacing: 17) {
                        CommunityAvatar(user: person, size: 68)
                        VStack(alignment: .leading, spacing: 7) {
                            Text(person.nickname).font(FangguFont.serif(27, weight: .medium))
                            Text("@\(person.handle)\(person.isDemo ? " · 示例账号" : "")").font(FangguFont.mono(11)).foregroundStyle(Palette.paper3)
                        }
                        Spacer(minLength: 0)
                    }
                    if !person.bio.isEmpty { Text(person.bio).font(FangguFont.serif(14)).foregroundStyle(Palette.paper2).lineSpacing(6) }
                    HStack(spacing: 26) {
                        metric(person.reviewCount, "评价")
                        Button { connections = "following" } label: { metric(person.followingCount, "关注") }.buttonStyle(.plain)
                        Button { connections = "followers" } label: { metric(person.followerCount, "粉丝") }.buttonStyle(.plain)
                        Spacer()
                        if person.id == community.user?.id {
                            Button("编辑资料") { editing = true }.font(FangguFont.serif(12)).foregroundStyle(Palette.gold).frame(minHeight: 44)
                        } else { CommunityFollowButton(person: person).id("\(person.id)-\(person.isFollowing)-\(person.followsYou)") }
                    }
                    FangguRule()
                    HStack {
                        Text("留下的亲见").font(FangguFont.serif(19, weight: .medium))
                        Spacer()
                        Text("公开评价").font(FangguFont.mono(10)).foregroundStyle(Palette.paper3)
                    }
                    if reviews.isEmpty && !loading {
                        CommunityEmpty(symbol: "pencil.line", title: "还没有留下评价", message: "读过的古迹，走过的山河，慢慢记下来。")
                    }
                    ForEach(reviews) { review in CommunityReviewCard(review: review); FangguRule() }
                    if cursor != nil { Button("继续翻阅") { Task { await loadMore() } }.disabled(loading).foregroundStyle(Palette.gold).frame(minHeight: 44) }
                } else if loading { CommunityLoading() }
                if let error { CommunityError(message: error) { Task { await load() } } }
            }.padding(24).padding(.bottom, 60)
        }
        .foregroundStyle(Palette.paper).background(Palette.ink)
        .navigationTitle("访古者").navigationBarTitleDisplayMode(.inline)
        .toolbar {
            if let person, person.id != community.user?.id {
                ToolbarItem(placement: .topBarTrailing) {
                    Menu {
                        Button("屏蔽此用户", role: .destructive) {
                            Task { do { try await community.block(person, enabled: true); dismiss() } catch { self.error = error.localizedDescription } }
                        }
                    } label: { Image(systemName: "ellipsis").foregroundStyle(Palette.gold) }
                }
            }
        }
        .task(id: community.revision) { await load() }
        .refreshable { await load() }
        .onChange(of: community.online) { _, online in if !online { dismiss() } }
        .sheet(isPresented: $editing) { if let person { CommunityProfileEditor(person: person) } }
        .sheet(isPresented: Binding(get: { connections != nil }, set: { if !$0 { connections = nil } })) {
            NavigationStack { CommunityPeopleView(userID: userID, kind: connections) }
        }
    }
    private func metric(_ value: Int, _ label: String) -> some View {
        VStack(alignment: .leading, spacing: 5) {
            Text("\(value)").font(FangguFont.serif(23, weight: .medium)).foregroundStyle(Palette.gold)
            Text(label).font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
        }
    }
    private func load() async {
        loading = true; defer { loading = false }
        do {
            async let person = community.profile(userID)
            async let page = community.reviews(author: userID)
            let (profile, result) = try await (person, page)
            self.person = profile; reviews = result.items; cursor = result.nextCursor; error = nil
        } catch {
            if let failure = error as? CommunityFailure, [403, 404].contains(failure.status) { self.person = nil; reviews = [] }
            self.error = error.localizedDescription
        }
    }
    private func loadMore() async {
        guard let cursor else { return }
        loading = true; defer { loading = false }
        do {
            let page = try await community.reviews(author: userID, before: cursor)
            let ids = Set(reviews.map(\.id)); reviews += page.items.filter { !ids.contains($0.id) }; self.cursor = page.nextCursor
        } catch { self.error = error.localizedDescription }
    }
}

struct CommunitySiteReviewsView: View {
    @EnvironmentObject private var community: CommunityStore
    @Environment(\.dismiss) private var dismiss
    let site: Monument
    @State private var scope = "latest"
    @State private var reviews: [CommunityReview] = []
    @State private var cursor: String?
    @State private var loading = true
    @State private var error: String?
    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 22) {
                Text(site.name).font(FangguFont.serif(26, weight: .medium))
                Picker("评价范围", selection: $scope) { Text("全部评价").tag("latest"); Text("我关注的人").tag("following") }.pickerStyle(.segmented)
                if loading && reviews.isEmpty { CommunityLoading() }
                if let error { CommunityError(message: error) { Task { await load() } } }
                if !loading && reviews.isEmpty {
                    CommunityEmpty(symbol: "text.bubble", title: "还没有评价", message: scope == "following" ? "你关注的人还没有评价这处古迹。" : "每一份认真的观察，都让这处古迹更清晰。")
                }
                ForEach(reviews) { review in CommunityReviewCard(review: review, showMonument: false); FangguRule() }
                if cursor != nil { Button("继续翻阅") { Task { await load(more: true) } }.disabled(loading).foregroundStyle(Palette.gold).frame(minHeight: 44) }
            }.padding(24).padding(.bottom, 50)
        }
        .foregroundStyle(Palette.paper).background(Palette.ink)
        .navigationTitle("古迹评价").navigationBarTitleDisplayMode(.inline)
        .task(id: "\(scope):\(community.revision)") { await load() }
        .refreshable { await load() }
        .onChange(of: community.online) { _, online in if !online { dismiss() } }
    }
    private func load(more: Bool = false) async {
        loading = true; defer { loading = false }
        let requestedScope = scope
        do {
            let page = try await community.reviews(site: site.id, scope: scope, before: more ? cursor : nil)
            guard scope == requestedScope, !Task.isCancelled else { return }
            if more { let ids = Set(reviews.map(\.id)); reviews += page.items.filter { !ids.contains($0.id) } }
            else { reviews = page.items }
            cursor = page.nextCursor; error = nil
        } catch is CancellationError { }
        catch { self.error = error.localizedDescription }
    }
}

struct CommunityReportView: View {
    @EnvironmentObject private var community: CommunityStore
    @Environment(\.dismiss) private var dismiss
    let review: CommunityReview
    let onReported: () -> Void
    @State private var reason = "广告或垃圾内容"
    @State private var detail = ""
    @State private var busy = false
    @State private var error: String?
    var body: some View {
        NavigationStack {
            Form {
                Section("举报原因") {
                    Picker("原因", selection: $reason) {
                        ForEach(["广告或垃圾内容", "侮辱或骚扰", "不实或无关内容", "其他问题"], id: \.self) { Text($0) }
                    }.pickerStyle(.inline).labelsHidden()
                }
                Section("补充说明（选填）") { TextEditor(text: $detail).frame(minHeight: 100) }
                if let error { Text(error).foregroundStyle(Palette.redText) }
                Button(busy ? "正在提交…" : "提交举报") {
                    busy = true
                    Task {
                        defer { busy = false }
                        do { try await community.report(review, reason: reason + (detail.isEmpty ? "" : "：" + detail)); onReported(); dismiss() }
                        catch { self.error = error.localizedDescription }
                    }
                }.disabled(busy || detail.utf16.count > 450).foregroundStyle(Palette.gold)
                Text("举报不会通知评价作者。屏蔽用户可立即隐藏对方的内容。")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
            }
            .scrollContentBackground(.hidden).background(Palette.ink).foregroundStyle(Palette.paper)
            .navigationTitle("举报评价").navigationBarTitleDisplayMode(.inline)
            .toolbar { ToolbarItem(placement: .cancellationAction) { Button("取消") { dismiss() } } }
        }.fangguAppearance()
    }
}

struct CommunityRulesView: View {
    @Environment(\.dismiss) private var dismiss
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 26) {
                FangguSectionTitle(eyebrow: "访古社区", title: "认真看，各有所见", subtitle: "评分帮助理解古迹，也留下不同的观看角度。")
                rule("五分制，六项等权", "六个维度各为 1–5 分。六项填全后取平均，形成个人综合分；社区总分为完整评价的平均值，保留一位小数。至少 5 人完整评分后展示社区总分与六维图。缺项评价仍然公开，但不参与总分。")
                rule("评分与短评公开，笔记私密", "开通联机后，现有与今后的评分、短评会自动公开同步。单机模式只隐藏社区界面，仍继续同步。到访状态、日期、心愿和个人笔记保留在本机，不上传至社区。")
                rule("每人一份评价，可以随时修改", "修改会更新原评价，不产生重复动态。清除评价后会从社区移除并重新计算评分。断网时先保存在本机，连接恢复后继续同步。多设备发生冲突时，由你选择保留的版本。")
                rule("尊重古迹，也尊重彼此", "欢迎具体、有依据的观察。请勿发布广告、骚扰、侮辱或与古迹无关的内容。评价菜单提供举报和屏蔽；账号页可查看屏蔽列表和删除账号。原型的举报由服务运行者通过审核工具处理。")
                rule("原型账号与数据", "本原型使用账号密码登录。密码在服务端加盐哈希保存；登录凭证保存在设备钥匙串。公开资料包括昵称、简介、头像样式、评分、短评与关注关系。删除账号会删除服务端资料、评价和关系，本机访古记录仍保留。")
            }.padding(24)
        }.background(Palette.ink).foregroundStyle(Palette.paper)
            .navigationTitle("社区说明").navigationBarTitleDisplayMode(.inline)
            .toolbar { ToolbarItem(placement: .confirmationAction) { Button("完成") { dismiss() } } }
            .fangguAppearance()
    }
    private func rule(_ title: String, _ body: String) -> some View {
        VStack(alignment: .leading, spacing: 9) {
            Text(title).font(FangguFont.serif(18, weight: .medium))
            Text(body).font(FangguFont.serif(14)).foregroundStyle(Palette.paper2).lineSpacing(6)
        }
    }
}
