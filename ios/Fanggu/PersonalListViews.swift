import SwiftUI

struct PersonalListsView: View {
    @EnvironmentObject private var library: LibraryStore
    @State private var creating = false

    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 18) {
                Text("把你发现的关联，写成一份古建筑名单。")
                    .font(FangguFont.serif(16)).foregroundStyle(Palette.paper2).lineSpacing(6)
                Button { creating = true } label: { Label("创建名单", systemImage: "plus") }
                    .buttonStyle(FangguOutlineButton()).accessibilityIdentifier("create-personal-list")
                if library.data.personalLists.isEmpty {
                    ContentUnavailableView("还没有名单", systemImage: "list.bullet.rectangle", description: Text("一次旅行、一种形制，或只有你留意到的联系。"))
                }
                ForEach(library.data.personalLists) { list in
                    NavigationLink(value: PersonalListRoute(id: list.id)) {
                        VStack(alignment: .leading, spacing: 8) {
                            Text(verbatim: list.title).font(FangguFont.serif(22)).foregroundStyle(Palette.paper)
                            if !list.description.isEmpty {
                                Text(verbatim: list.description).font(FangguFont.serif(13)).foregroundStyle(Palette.paper2).lineLimit(3)
                            }
                            Text("\(list.items.count) 处古迹").font(FangguFont.mono(12)).foregroundStyle(Palette.gold)
                        }
                        .frame(maxWidth: .infinity, alignment: .leading).padding(16).background(Palette.ink2)
                        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
                    }
                    .buttonStyle(.plain).accessibilityIdentifier("personal-list-\(list.id)")
                }
            }.padding(24)
        }
        .background(Palette.ink.ignoresSafeArea())
        .navigationTitle("我的名单").navigationBarTitleDisplayMode(.inline)
        .toolbar(.visible, for: .navigationBar)
        .sheet(isPresented: $creating) { CreatePersonalListSheet() }
    }
}

struct PersonalListView: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let id: String
    @State private var editing = false
    @State private var adding = false
    @State private var editingItem: PersonalListItem?
    @State private var arranging = false
    @State private var deleting = false
    @State private var failed = false

    var body: some View {
        Group {
            if let list = library.personalList(id) {
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 20) {
                        Text(verbatim: list.title).font(FangguFont.serif(32, weight: .medium)).foregroundStyle(Palette.paper)
                        if !list.description.isEmpty {
                            Text(verbatim: list.description).font(FangguFont.serif(16)).foregroundStyle(Palette.paper2).lineSpacing(7)
                                .accessibilityIdentifier("personal-list-description")
                        }
                        Text("\(list.items.count) 处古迹").font(FangguFont.mono(12)).foregroundStyle(Palette.gold)
                        ViewThatFits(in: .horizontal) {
                            HStack { listActions(list) }.fixedSize(horizontal: true, vertical: false)
                            VStack(alignment: .leading) { listActions(list) }
                        }
                        if failed { ListSaveError() }
                        if list.items.isEmpty { Text("添加古迹，再写下它们之间的联系。").foregroundStyle(Palette.paper2) }
                        ForEach(Array(list.items.enumerated()), id: \.element.id) { index, item in
                            itemRow(item, index: index, total: list.items.count)
                        }
                    }.padding(24)
                }
                .navigationTitle(list.title)
                .toolbar {
                    ToolbarItem(placement: .topBarTrailing) {
                        Menu {
                            Button("编辑名单", systemImage: "pencil") { editing = true }
                            ShareLink(item: shareText(list)) { Label("分享名单", systemImage: "square.and.arrow.up") }
                            Button("删除名单", systemImage: "trash", role: .destructive) { deleting = true }
                        } label: { Label("名单操作", systemImage: "ellipsis.circle") }
                        .accessibilityIdentifier("personal-list-menu")
                    }
                }
            } else {
                ContentUnavailableView("名单已删除", systemImage: "list.bullet.rectangle")
            }
        }
        .background(Palette.ink.ignoresSafeArea())
        .navigationBarTitleDisplayMode(.inline).toolbar(.visible, for: .navigationBar)
        .toolbar(.hidden, for: .tabBar)
        .sheet(isPresented: $editing) {
            if let list = library.personalList(id) { PersonalListTextEditor(list: list) }
        }
        .sheet(item: $editingItem) { item in
            if let list = library.personalList(id) { PersonalListTextEditor(list: list, item: item) }
        }
        .sheet(isPresented: $adding) { PersonalListSitePicker(listID: id) }
        .confirmationDialog("删除这份名单？", isPresented: $deleting, titleVisibility: .visible) {
            Button("删除名单", role: .destructive) {
                if library.deletePersonalList(id) { dismiss() } else { failed = true }
            }
        } message: { Text("古迹的到访记录、心愿、笔记和评价都会保留。") }
    }

    @ViewBuilder private func listActions(_ list: PersonalList) -> some View {
        Button { adding = true } label: { Label("添加古迹", systemImage: "plus") }
            .buttonStyle(FangguOutlineButton()).accessibilityIdentifier("personal-list-add-sites")
        Button { arranging.toggle() } label: { Label(arranging ? "完成排序" : "调整顺序", systemImage: "arrow.up.arrow.down") }
            .buttonStyle(FangguOutlineButton(accent: Palette.paper2)).disabled(list.items.count < 2 && !arranging)
            .accessibilityIdentifier("personal-list-arrange")
    }

    private func itemRow(_ item: PersonalListItem, index: Int, total: Int) -> some View {
        VStack(alignment: .leading, spacing: 10) {
            Text(String(format: "%02d", index + 1)).font(FangguFont.mono(12)).foregroundStyle(Palette.gold)
            if let site = library.monument(item.siteID) {
                NavigationLink(value: site) {
                    if item.note.isEmpty { TimelineSiteRow(site: site) }
                    else { EditorialSiteRow(site: site, reason: item.note, reasonID: "personal-list-note-\(site.id)") }
                }.buttonStyle(.plain).accessibilityIdentifier("personal-list-member-\(item.siteID)")
            } else {
                Text("此古迹暂未收录于当前目录").foregroundStyle(Palette.paper2)
                Text(verbatim: item.siteID).font(FangguFont.mono(12))
                if !item.note.isEmpty { Text(verbatim: item.note) }
            }
            ViewThatFits(in: .horizontal) {
                HStack { itemActions(item) }.fixedSize(horizontal: true, vertical: false)
                VStack(alignment: .leading) { itemActions(item) }
            }
            if arranging {
                ViewThatFits(in: .horizontal) {
                    HStack { moveActions(item, index: index, total: total) }.fixedSize(horizontal: true, vertical: false)
                    VStack(alignment: .leading) { moveActions(item, index: index, total: total) }
                }
            }
        }
        .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
        .padding(.bottom, 12)
    }

    @ViewBuilder private func itemActions(_ item: PersonalListItem) -> some View {
        Button("写按语") { editingItem = item }.accessibilityIdentifier("edit-list-note-\(item.siteID)")
        Button("移出名单", role: .destructive) { failed = !library.removeFromPersonalList(id, siteID: item.siteID) }
            .accessibilityIdentifier("list-remove-\(item.siteID)")
    }

    @ViewBuilder private func moveActions(_ item: PersonalListItem, index: Int, total: Int) -> some View {
        Button { failed = !library.movePersonalListItem(item.siteID, in: id, by: -1) } label: { Label("上移", systemImage: "arrow.up") }
            .disabled(index == 0).accessibilityIdentifier("list-up-\(item.siteID)")
        Button { failed = !library.movePersonalListItem(item.siteID, in: id, by: 1) } label: { Label("下移", systemImage: "arrow.down") }
            .disabled(index == total - 1).accessibilityIdentifier("list-down-\(item.siteID)")
    }

    private func shareText(_ list: PersonalList) -> String {
        ([list.title, list.description].filter { !$0.isEmpty } + list.items.enumerated().map { index, item in
            let site = library.monument(item.siteID)
            return "\(index + 1). \(site?.name ?? item.siteID)\(site.map { " · " + $0.place } ?? "")" + (item.note.isEmpty ? "" : "\n" + item.note)
        }).joined(separator: "\n\n")
    }
}

struct CreatePersonalListSheet: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    var site: Monument? = nil
    @State private var title = ""
    @State private var description = ""
    @State private var failed = false

    var body: some View {
        NavigationStack {
            Form {
                Section("名单标题") { TextField("给名单起个名字", text: $title).accessibilityIdentifier("new-list-title") }
                Section("名单说明") {
                    TextField("这些古迹有什么联系？", text: $description, axis: .vertical).lineLimit(4...10)
                        .accessibilityIdentifier("new-list-description")
                }
                if failed { ListSaveError(retry: create) }
                Text("标题最多 120 字，说明最多 4000 字。")
            }
            .navigationTitle("创建名单").navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("取消") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button("创建", action: create)
                        .disabled(title.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty || title.utf16.count > 120 || description.utf16.count > 4000)
                        .accessibilityIdentifier("confirm-create-list")
                }
            }
        }.fangguAppearance()
    }

    private func create() {
        if library.createPersonalList(title: title, description: description, site: site) != nil { Haptics.success(); dismiss() }
        else { failed = true; Haptics.error() }
    }
}

/// Writes only the fields being edited, preserving any membership/order changed elsewhere.
private struct PersonalListTextEditor: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    @Environment(\.scenePhase) private var scenePhase
    let list: PersonalList
    let item: PersonalListItem?
    @State private var title: String
    @State private var text: String
    @State private var failed = false
    @State private var saveTask: Task<Void, Never>?
    @State private var abandoning = false
    @FocusState private var focused: Bool

    init(list: PersonalList, item: PersonalListItem? = nil) {
        self.list = list; self.item = item
        _title = State(initialValue: list.title)
        _text = State(initialValue: item?.note ?? list.description)
    }

    private var unsaved: Bool {
        guard let stored = library.personalList(list.id) else { return true }
        if let item { return stored.items.first { $0.siteID == item.siteID }?.note != text }
        return stored.title != title || stored.description != text
    }
    private var validation: String? {
        if item != nil { return text.utf16.count > 2000 ? String(localized: "按语不能超过 2000 字") : nil }
        return PersonalList(title: title, description: text).validationError
    }

    var body: some View {
        NavigationStack {
            Form {
                if item == nil {
                    Section("名单标题") { TextField("名单标题", text: $title).focused($focused).accessibilityIdentifier("list-edit-title") }
                }
                Section(item == nil ? "名单说明" : "入选按语") {
                    if let item, let site = library.monument(item.siteID) { Text(verbatim: site.name).font(.headline) }
                    TextEditor(text: $text).frame(minHeight: 180).focused($focused)
                        .accessibilityLabel(item == nil ? "名单说明" : "入选按语").accessibilityIdentifier("list-edit-text")
                    Text(item == nil ? "说明这些古迹为什么放在一起。" : "写下这一处为什么入选，以及它与其他古迹的联系。")
                }
                if let validation { Text(verbatim: validation).foregroundStyle(Palette.redText) }
                if failed { ListSaveError(retry: { _ = save() }) }
                Text(unsaved ? "修改尚未保存" : "修改自动保存").accessibilityIdentifier("list-autosave-status")
                if failed || validation != nil {
                    Button("放弃未保存的修改", role: .destructive) { abandoning = true; saveTask?.cancel(); dismiss() }
                }
            }
            .navigationTitle(item == nil ? "编辑名单" : "入选按语").navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) { Button("完成") { if save() { dismiss() } }.accessibilityIdentifier("list-editor-done") }
            }
            .onChange(of: title) { _, _ in schedule() }
            .onChange(of: text) { _, _ in schedule() }
            .onChange(of: focused) { _, value in if !value { _ = save() } }
            .onChange(of: scenePhase) { _, phase in if phase != .active { _ = save() } }
            .onDisappear { saveTask?.cancel() }
            .interactiveDismissDisabled(unsaved)
        }.fangguAppearance()
    }

    private func schedule() {
        saveTask?.cancel()
        saveTask = Task { @MainActor in
            do { try await Task.sleep(for: .milliseconds(450)) } catch { return }
            guard !Task.isCancelled else { return }
            _ = save()
        }
    }

    private func save() -> Bool {
        saveTask?.cancel()
        guard !abandoning, validation == nil else { return false }
        guard unsaved else { failed = false; return true }
        let success: Bool
        if let item { success = library.setPersonalListNote(text, siteID: item.siteID, listID: list.id) }
        else { success = library.updatePersonalList(list.id, title: title, description: text) }
        failed = !success
        if !success { Haptics.error() }
        return success
    }
}

private struct PersonalListSitePicker: View {
    @EnvironmentObject private var library: LibraryStore
    let listID: String
    @State private var query = ""
    @State private var failed = false
    @Environment(\.dismiss) private var dismiss

    var body: some View {
        NavigationStack {
            List {
                Text("点选即加入，再点一次移出。")
                if failed { ListSaveError() }
                let terms = CatalogSearch.terms(query)
                let matches = library.monuments.filter { CatalogSearch.matches($0, terms: terms) }
                if matches.isEmpty { Text("没有匹配的古迹") }
                ForEach(matches) { site in
                    let included = library.personalList(listID)?.items.contains { $0.siteID == site.id } == true
                    Button {
                        failed = !(included ? library.removeFromPersonalList(listID, siteID: site.id) : library.addToPersonalList(listID, site: site))
                    } label: {
                        HStack {
                            VStack(alignment: .leading) {
                                Text(verbatim: site.name)
                                Text(verbatim: site.place).font(.caption).foregroundStyle(Palette.paper2)
                            }
                            Spacer()
                            Image(systemName: included ? "checkmark.circle.fill" : "plus.circle").foregroundStyle(Palette.gold)
                        }.frame(minHeight: 44)
                    }
                    .accessibilityValue(included ? Text("已加入") : Text("未加入"))
                    .accessibilityIdentifier("list-pick-\(site.id)")
                }
            }
            .searchable(text: $query, prompt: "搜索古迹、地点或时代")
            .navigationTitle("添加古迹").navigationBarTitleDisplayMode(.inline)
            .safeAreaInset(edge: .bottom) {
                Button("完成") { dismiss() }
                    .buttonStyle(FangguOutlineButton())
                    .accessibilityIdentifier("list-picker-done")
                    .padding(16).frame(maxWidth: .infinity).background(Palette.ink)
            }
        }.fangguAppearance()
    }
}

struct AddToPersonalListSheet: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let site: Monument
    @State private var creating = false
    @State private var failed = false

    var body: some View {
        NavigationStack {
            List {
                Button { creating = true } label: { Label("创建名单", systemImage: "plus") }
                    .accessibilityIdentifier("create-list-from-site")
                if failed { ListSaveError() }
                ForEach(library.data.personalLists) { list in
                    let included = list.items.contains { $0.siteID == site.id }
                    Button {
                        failed = !(included ? library.removeFromPersonalList(list.id, siteID: site.id) : library.addToPersonalList(list.id, site: site))
                    } label: {
                        HStack {
                            Text(verbatim: list.title)
                            Spacer()
                            Image(systemName: included ? "checkmark.circle.fill" : "plus.circle")
                        }.frame(minHeight: 44)
                    }
                    .accessibilityValue(included ? Text("已加入") : Text("未加入"))
                    .accessibilityIdentifier("add-to-\(list.id)")
                }
                Text("点选即加入，再点一次移出。")
            }
            .navigationTitle("加入名单").navigationBarTitleDisplayMode(.inline)
            .toolbar { ToolbarItem(placement: .confirmationAction) { Button("完成") { dismiss() } } }
            .sheet(isPresented: $creating) { CreatePersonalListSheet(site: site) }
        }.fangguAppearance()
    }
}

private struct ListSaveError: View {
    @EnvironmentObject private var library: LibraryStore
    var retry: (() -> Void)? = nil
    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(verbatim: library.error ?? String(localized: "保存失败，请重试。")).foregroundStyle(Palette.redText)
            if let retry { Button("重试", action: retry) }
        }.accessibilityIdentifier("list-save-error")
    }
}
