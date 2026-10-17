import SwiftUI

struct CommunityAccountView: View {
    @EnvironmentObject private var community: CommunityStore
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    @State private var registering = false
    @State private var handle = ""
    @State private var password = ""
    @State private var nickname = ""
    @State private var busy = false
    @State private var agreed = false
    @State private var server = ""
    @State private var connectionError: String?
    @State private var deleting = false
    @State private var deletePassword = ""
    @State private var deleteError: String?
    @State private var editingProfile = false
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    if let user = community.user, community.isAuthenticated {
                        account(user)
                    } else { signIn }
                }.padding(24).padding(.bottom, 40)
            }
            .foregroundStyle(Palette.paper).background(Palette.ink)
            .navigationTitle(community.isAuthenticated ? "我的账号" : "加入访古")
            .navigationBarTitleDisplayMode(.inline)
            .navigationDestination(for: Monument.self) { MonumentDetailView(site: $0) }
            .toolbar { ToolbarItem(placement: .confirmationAction) { Button("完成") { dismiss() }.foregroundStyle(Palette.gold) } }
            .task { server = community.server; await community.refreshMe() }
            .sheet(isPresented: $deleting) { deleteSheet }
            .sheet(isPresented: $editingProfile) { if let user = community.user { CommunityProfileEditor(person: user) } }
        }.fangguAppearance()
    }
    private var signIn: some View {
        VStack(alignment: .leading, spacing: 22) {
            HStack(alignment: .top) {
                FangguSectionTitle(eyebrow: "从独行，到相逢", title: "与同好共读古迹", subtitle: "交换认真看过的细节，收藏下一次出发的理由。")
                FangguSeal(size: 45).padding(.top, 5)
            }
            Picker("账号操作", selection: $registering) { Text("登录").tag(false); Text("创建账号").tag(true) }.pickerStyle(.segmented)
            VStack(alignment: .leading, spacing: 14) {
                labeledField("账号", placeholder: "3–24 位字母、数字或下划线", text: $handle, id: "community-handle")
                if registering { labeledField("昵称", placeholder: "大家如何称呼你", text: $nickname, id: "community-nickname") }
                VStack(alignment: .leading, spacing: 8) {
                    Text("密码").font(FangguFont.serif(13)).foregroundStyle(Palette.paper2)
                    SecureField("至少 8 位", text: $password)
                        .textContentType(registering ? .newPassword : .password)
                        .padding(14).background(Palette.ink2).accessibilityIdentifier("community-password")
                }
            }
            VStack(alignment: .leading, spacing: 12) {
                Text("开通后，评价将公开").font(FangguFont.serif(16, weight: .medium))
                Text("全部历史评分、短评，以及之后的修改都会公开同步。切回单机仅隐藏社区。个人笔记、到访日期和心愿仍保留在本机。")
                    .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2).lineSpacing(6)
                Toggle("我已了解公开同步规则", isOn: $agreed)
                    .font(FangguFont.serif(13)).tint(Palette.gold).accessibilityIdentifier("community-consent")
            }.padding(16).background(Palette.gold.opacity(0.07))
            if let error = community.error { Text(error).font(FangguFont.serif(13)).foregroundStyle(Palette.redText).accessibilityIdentifier("community-auth-error") }
            Button {
                busy = true
                Task {
                    defer { busy = false }
                    if await community.authenticate(handle: handle, password: password, nickname: nickname, registering: registering) { dismiss() }
                }
            } label: {
                HStack { Spacer(); if busy { ProgressView().tint(Palette.sealPaper) }; Text(busy ? "正在连接…" : registering ? "创建账号并开启联机" : "登录并开启联机"); Spacer() }
                    .font(FangguFont.serif(15, weight: .medium)).foregroundStyle(Palette.sealPaper)
                    .frame(minHeight: 52).background(Palette.red.opacity(canAuthenticate ? 1 : 0.4), in: RoundedRectangle(cornerRadius: 8))
            }.buttonStyle(.plain).disabled(!canAuthenticate || busy).accessibilityIdentifier("community-auth-submit")
            NavigationLink { CommunityRulesView() } label: { Text("公开范围、数据与社区规则").font(FangguFont.serif(12)).foregroundStyle(Palette.gold) }
                .accessibilityIdentifier("community-sign-in-rules")
            DisclosureGroup("原型连接设置") {
                VStack(alignment: .leading, spacing: 12) {
                    Text("连接同一服务的设备可以互看评价、关注彼此。模拟器可使用本机服务；真机请填写可访问的服务地址。")
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                    TextField("社区服务地址", text: $server).textInputAutocapitalization(.never).autocorrectionDisabled().keyboardType(.URL)
                        .padding(12).background(Palette.ink2).accessibilityIdentifier("community-server-url")
                        .onSubmit { configureServer() }
                    Button("使用此地址") { configureServer() }.font(FangguFont.serif(13)).foregroundStyle(Palette.gold).frame(minHeight: 44)
                    if let connectionError { Text(connectionError).font(FangguFont.serif(12)).foregroundStyle(Palette.redText) }
                }.padding(.top, 12)
            }.font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
        }
    }
    private var canAuthenticate: Bool {
        handle.range(of: "^[a-zA-Z0-9_]{3,24}$", options: .regularExpression) != nil && password.count >= 8 && password.count <= 128 && agreed && (!registering || !nickname.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
    }
    private func labeledField(_ title: LocalizedStringKey, placeholder: LocalizedStringKey, text: Binding<String>, id: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title).font(FangguFont.serif(13)).foregroundStyle(Palette.paper2)
            TextField(placeholder, text: text).textInputAutocapitalization(.never).autocorrectionDisabled()
                .padding(14).background(Palette.ink2).accessibilityIdentifier(id)
        }
    }
    private func configureServer() {
        do { try community.configureServer(server); connectionError = nil; community.error = nil }
        catch { connectionError = error.localizedDescription }
    }
    private func account(_ user: CommunityUser) -> some View {
        VStack(alignment: .leading, spacing: 22) {
            if community.online {
                NavigationLink { CommunityProfileView(userID: user.id) } label: {
                HStack(spacing: 15) {
                    CommunityAvatar(user: user, size: 58)
                    VStack(alignment: .leading, spacing: 5) {
                        Text(verbatim: user.nickname).font(FangguFont.serif(24, weight: .medium)).foregroundStyle(Palette.paper)
                        Text("查看我的公开主页").font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                    }
                    Spacer(); Image(systemName: "chevron.right").foregroundStyle(Palette.gold)
                }
                }.buttonStyle(.plain)
            } else {
                HStack(spacing: 15) {
                    CommunityAvatar(user: user, size: 58)
                    VStack(alignment: .leading, spacing: 5) {
                        Text(verbatim: user.nickname).font(FangguFont.serif(24, weight: .medium))
                        Text(verbatim: "@\(user.handle)").font(FangguFont.mono(11)).foregroundStyle(Palette.paper3)
                    }
                    Spacer()
                    Button("编辑资料") { editingProfile = true }.font(FangguFont.serif(12)).foregroundStyle(Palette.gold)
                }
            }
            FangguRule()
            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    Image(systemName: community.syncError == nil ? "checkmark.icloud" : "icloud.slash").foregroundStyle(Palette.gold)
                    Text(community.syncLabel).font(FangguFont.serif(14))
                    Spacer()
                }
                if let last = community.lastSyncedAt { Text("最近同步 \(last.formatted(date: .omitted, time: .shortened))").font(FangguFont.mono(11)).foregroundStyle(Palette.paper3) }
                Text("单机模式下也会继续公开同步评分与短评。")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                if let error = community.syncError { Text(error).font(FangguFont.serif(12)).foregroundStyle(Palette.redText) }
                Button(community.syncing ? "正在同步…" : "立即同步") { Task { await community.synchronize() } }
                    .disabled(community.syncing).font(FangguFont.serif(13)).foregroundStyle(Palette.gold).frame(minHeight: 44)
            }
            if !community.conflicts.isEmpty {
                ForEach(community.conflicts) { conflict in
                    VStack(alignment: .leading, spacing: 12) {
                        Text(library.monuments.first(where: { $0.id == conflict.siteID })?.name ?? conflict.siteID)
                            .font(FangguFont.serif(17, weight: .medium))
                        Text("另一台设备也修改了评价。两个版本均已保留，请选择一个继续同步。")
                            .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
                        conflictVersion("本机", review: library.data.reviews[conflict.siteID] ?? Review())
                        conflictVersion("云端", review: conflict.remote.local)
                        HStack {
                            Button("保留本机版本") { Task { await community.resolve(conflict, useLocal: true) } }
                            Spacer()
                            Button("采用云端版本") { Task { await community.resolve(conflict, useLocal: false) } }
                        }.font(FangguFont.serif(12)).foregroundStyle(Palette.gold).frame(minHeight: 44)
                    }.padding(16).background(Palette.ink2)
                }
            }
            FangguRule()
            NavigationLink { CommunityPeopleView(kind: "blocks") } label: { accountLink("屏蔽列表", icon: "person.crop.circle.badge.minus") }
                .accessibilityIdentifier("community-block-list")
            NavigationLink { CommunityRulesView() } label: { accountLink("社区与数据说明", icon: "text.book.closed") }
            Button { busy = true; Task { await community.logout(); busy = false } } label: { accountLink("退出账号", icon: "rectangle.portrait.and.arrow.right") }.disabled(busy)
            Text("退出后停止账号同步，本机到访记录与评价保留。登录其他账号时会切换为该账号的评价。")
                .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineSpacing(5)
            Button("删除账号与公开内容", role: .destructive) { deleting = true }.font(FangguFont.serif(12)).foregroundStyle(Palette.redText).frame(minHeight: 44)
        }
    }
    /// The personal score averages the rated axes, as everywhere else in the app; the community
    /// score only takes complete six-axis reviews, so a partial version says it will not count there.
    private func conflictVersion(_ title: LocalizedStringKey, review: Review) -> some View {
        VStack(alignment: .leading, spacing: 6) {
            (Text(title) + Text(verbatim: " · ")
                + (review.dimensions.aggregateScoreLabel.map { Text("个人综合 \($0) / 5") } ?? Text("未评分")))
                .font(FangguFont.serif(13, weight: .medium))
            if !review.dimensions.isEmpty && review.completeScore == nil {
                Text("已评 \(review.dimensions.count)/6 项，不计入社区总分").font(FangguFont.serif(11)).foregroundStyle(Palette.paper3)
            }
            (review.text.isEmpty ? Text("（没有短评）") : Text(verbatim: review.text)).font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
            Text(verbatim: ReviewDimension.allCases.map { "\($0.shortTitle) \(ReviewDimension.grade(review.dimensions[$0]))" }.joined(separator: " · "))
                .font(FangguFont.mono(10)).foregroundStyle(Palette.paper3)
        }
    }
    private func accountLink(_ label: LocalizedStringKey, icon: String) -> some View {
        HStack { Image(systemName: icon).frame(width: 24); Text(label); Spacer(); Image(systemName: "chevron.right").font(.system(size: 11)) }
            .font(FangguFont.serif(14)).foregroundStyle(Palette.paper2).frame(minHeight: 44)
    }
    private var deleteSheet: some View {
        NavigationStack {
            Form {
                Section {
                    Text("删除后，服务端的账号、评分、短评和关注关系会被删除，社区总分会重新计算。本机到访记录、笔记和评价仍保留。")
                    SecureField("输入密码确认删除", text: $deletePassword).textContentType(.password)
                }
                if let deleteError { Text(deleteError).foregroundStyle(Palette.redText) }
                Button("永久删除账号", role: .destructive) {
                    busy = true
                    Task {
                        defer { busy = false }
                        do { try await community.deleteAccount(password: deletePassword); deleting = false; dismiss() }
                        catch { deleteError = error.localizedDescription }
                    }
                }.disabled(busy || deletePassword.count < 8)
            }.scrollContentBackground(.hidden).background(Palette.ink)
                .navigationTitle("删除账号").navigationBarTitleDisplayMode(.inline)
                .toolbar { ToolbarItem(placement: .cancellationAction) { Button("取消") { deleting = false } } }
        }.fangguAppearance()
    }
}

struct CommunityProfileEditor: View {
    @EnvironmentObject private var community: CommunityStore
    @Environment(\.dismiss) private var dismiss
    @State private var nickname: String
    @State private var bio: String
    @State private var avatar: Int
    @State private var saved: String
    @State private var error: String?
    @State private var saving = false
    private var snapshot: String { "\(nickname)|\(bio)|\(avatar)" }
    init(person: CommunityUser) {
        _nickname = State(initialValue: person.nickname); _bio = State(initialValue: person.bio); _avatar = State(initialValue: person.avatar)
        _saved = State(initialValue: "\(person.nickname)|\(person.bio)|\(person.avatar)")
    }
    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 24) {
                    Text("选一枚自己的印记").font(FangguFont.serif(19))
                    LazyVGrid(columns: Array(repeating: GridItem(.flexible()), count: 4), spacing: 18) {
                        ForEach(0..<8) { index in
                            Button { avatar = index } label: {
                                Text(verbatim: CommunityAvatar.glyphs[index])
                                    .font(FangguFont.brush(28)).foregroundStyle(avatar == index ? Palette.sealPaper : Palette.gold)
                                    .frame(width: 56, height: 56).background(avatar == index ? Palette.red : Palette.ink2, in: RoundedRectangle(cornerRadius: 12))
                            }.buttonStyle(.plain).accessibilityLabel(CommunityAvatar.names[index])
                        }
                    }
                    VStack(alignment: .leading, spacing: 8) {
                        Text("昵称").font(FangguFont.serif(14))
                        TextField("昵称", text: $nickname).padding(14).background(Palette.ink2)
                    }
                    VStack(alignment: .leading, spacing: 8) {
                        Text("简介").font(FangguFont.serif(14))
                        TextEditor(text: $bio).frame(height: 100).scrollContentBackground(.hidden).padding(10).background(Palette.ink2)
                        Text(verbatim: "\(bio.utf16.count) / 160").font(FangguFont.mono(11)).foregroundStyle(Palette.paper3)
                    }
                    if let error {
                        Text(error).font(FangguFont.serif(12)).foregroundStyle(Palette.redText)
                        Button("放弃未保存的修改") { dismiss() }.font(FangguFont.serif(12)).foregroundStyle(Palette.paper2).frame(minHeight: 44)
                    }
                    Text(saving ? "正在同步…" : saved == snapshot ? "修改已保存" : "修改待保存")
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                }.padding(24)
            }.background(Palette.ink).foregroundStyle(Palette.paper)
                .navigationTitle("编辑资料").navigationBarTitleDisplayMode(.inline)
                .toolbar { ToolbarItem(placement: .confirmationAction) { Button("完成") { Task { if await save() { dismiss() } } }.disabled(saving) } }
                .task(id: snapshot) {
                    do { try await Task.sleep(for: .milliseconds(700)) } catch { return }
                    _ = await save()
                }
                .interactiveDismissDisabled(saved != snapshot)
        }.fangguAppearance()
    }
    private func save() async -> Bool {
        guard saved != snapshot else { return true }
        guard !saving else { return false }
        let value = snapshot
        saving = true; defer { saving = false }
        do { try await community.saveProfile(nickname: nickname, bio: bio, avatar: avatar); saved = value; error = nil; return true }
        catch { self.error = error.localizedDescription; return false }
    }
}
