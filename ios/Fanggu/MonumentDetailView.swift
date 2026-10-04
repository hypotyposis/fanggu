import SwiftUI

struct MonumentDetailView: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let site: Monument
    @State private var editingVisit = false
    @State private var editingReview = false
    @State private var reveal: CGFloat = 0

    private var record: VisitRecord { library.record(for: site) }
    private var review: Review { library.review(for: site) }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                Text("图鉴  /  \(site.name)")
                    .font(FangguFont.mono(11)).foregroundStyle(Palette.gold)
                HStack {
                    Text(site.dynastyName).foregroundStyle(site.accent)
                    Spacer()
                    Text(site.era).foregroundStyle(Palette.paper2)
                }
                .font(FangguFont.mono(11))
                VStack(alignment: .leading, spacing: 5) {
                    Text(site.name).font(FangguFont.serif(35, weight: .medium)).foregroundStyle(Palette.paper)
                    if !site.sub.isEmpty { Text(site.sub).font(FangguFont.serif(15)).foregroundStyle(Palette.gold) }
                    Text("\(site.place) · \(site.typeNames.joined(separator: " · "))")
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
                }
                if !site.protection.isEmpty {
                    HStack(spacing: 8) {
                        ForEach(site.protection, id: \.self) { entry in
                            Text(entry.batchLabel).font(FangguFont.mono(10))
                                .foregroundStyle(Palette.gold).padding(6)
                                .overlay(Rectangle().stroke(Palette.goldDim, lineWidth: 1))
                        }
                    }
                }
                VisitActions(site: site, editingVisit: $editingVisit)
                VStack(spacing: 8) {
                    ArtworkView(site: site, visited: record.status == .visited,
                                height: 320, reveal: reveal)
                        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
                        .accessibilityIdentifier("detail-artwork")
                    if record.status != .visited {
                        ArrivalSlider(site: site, progress: $reveal, onComplete: finishArrival)
                            .accessibilityIdentifier("detail-arrival-slider")
                    }
                }
                if !site.captions.isEmpty {
                    Text(site.captions.joined(separator: " · "))
                        .font(FangguFont.mono(11)).foregroundStyle(Palette.paper3)
                }
                FangguRule()
                Text(site.lede).font(FangguFont.serif(17)).foregroundStyle(Palette.paper).lineSpacing(8)
                VStack(alignment: .leading, spacing: 12) {
                    ForEach(site.facts, id: \.self) { fact in
                        HStack(alignment: .top, spacing: 10) {
                            Rectangle().fill(Palette.red).frame(width: 5, height: 5).padding(.top, 8)
                            Text(fact).font(FangguFont.serif(14)).foregroundStyle(Palette.paper2).lineSpacing(6)
                        }
                    }
                }
                if !site.quote.isEmpty { Text(site.quote).font(FangguFont.serif(15)).foregroundStyle(Palette.gold) }
                if !site.yearNote.isEmpty {
                    Text("年代说明 · \(site.yearNote)").font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                }
                if !site.protection.isEmpty {
                    Text("文物保护").font(FangguFont.serif(21)).foregroundStyle(Palette.paper)
                    ForEach(site.protection, id: \.self) { entry in
                        VStack(alignment: .leading, spacing: 6) {
                            Text("\(entry.batchLabel) · \(entry.unitName)")
                                .font(FangguFont.serif(14)).foregroundStyle(Palette.paper)
                            if !entry.scope.isEmpty { Text(entry.scope).foregroundStyle(Palette.paper2) }
                            if !entry.note.isEmpty { Text(entry.note).foregroundStyle(Palette.paper3) }
                            if let url = URL(string: entry.sourceURL), !entry.sourceURL.isEmpty {
                                Link("\(entry.sourceTitle.isEmpty ? "保护信息来源" : entry.sourceTitle) ↗", destination: url)
                                    .foregroundStyle(Palette.gold)
                            }
                        }
                        .font(FangguFont.serif(12))
                        .frame(maxWidth: .infinity, alignment: .leading)
                        .padding(14).background(Palette.ink2)
                        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
                    }
                }
                FangguRule()
                VStack(alignment: .leading, spacing: 12) {
                    Text("我的访古记").font(FangguFont.serif(21)).foregroundStyle(Palette.paper)
                    Text(record.status.title + (record.status != .visited || record.visitedOn.isEmpty ? "" : " · " + record.visitedOn))
                        .font(FangguFont.mono(12)).foregroundStyle(record.status.textColor)
                    if record.status != .visited && !record.visitedOn.isEmpty {
                        Text("保留的原到访日期 · \(record.visitedOn)")
                            .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                    }
                    if !record.note.isEmpty {
                        Text(record.note).font(FangguFont.serif(14)).foregroundStyle(Palette.paper)
                            .frame(maxWidth: .infinity, alignment: .leading).padding(12).background(Palette.ink2)
                    }
                }
                VStack(alignment: .leading, spacing: 8) {
                    Text("我的评价").font(FangguFont.serif(21)).foregroundStyle(Palette.paper)
                    if !review.dimensions.isEmpty {
                        ReviewRadar(scores: .constant(review.dimensions), editable: false)
                    } else if let rating = review.rating {
                        Text("旧版评分 · \(rating) 星").font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                    }
                    if !review.text.isEmpty { Text(review.text).font(FangguFont.serif(14)).foregroundStyle(Palette.paper2) }
                    Button(review.rating == nil && review.dimensions.isEmpty && review.text.isEmpty ? "画六维图 / 写短评" : "编辑评价") { editingReview = true }
                        .buttonStyle(FangguOutlineButton())
                        .accessibilityIdentifier("edit-review")
                }
                Text("图版与资料来源").font(FangguFont.serif(21)).foregroundStyle(Palette.paper)
                ForEach(site.sourceLinks, id: \.self) { source in
                    if let url = URL(string: source.url) {
                        Link("\(source.title) ↗", destination: url)
                            .font(FangguFont.serif(12)).foregroundStyle(Palette.gold)
                    }
                }
                if let url = URL(string: site.sourceURL), !site.sourceURL.isEmpty {
                    Link("图版参考来源 ↗", destination: url)
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.gold)
                }
            }
            .padding(24)
        }
        .safeAreaInset(edge: .bottom, spacing: 0) {
            if !editingReview && !editingVisit { UndoFeedback() }
        }
        .background(Palette.ink.ignoresSafeArea())
        .navigationTitle(site.short.isEmpty ? site.name : site.short)
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarBackButtonHidden()
        .toolbar(.visible, for: .navigationBar)
        .toolbar(.hidden, for: .tabBar)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button { dismiss() } label: {
                    Label("返回", systemImage: "chevron.left")
                        .font(FangguFont.serif(13))
                }
            }
        }
        .toolbarBackground(Palette.ink, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .sheet(isPresented: $editingVisit) { VisitEditor(site: site) }
        .sheet(isPresented: $editingReview) { ReviewEditor(site: site) }
        .task {
            // A UI test may ask for the editor straight away; it is still this page's sheet.
            guard UITestLaunch.consumeOpenReview() else { return }
            try? await Task.sleep(for: .milliseconds(50))
            editingReview = true
        }
    }

    private func finishArrival() {
        reveal = 0
    }
}

struct ArrivalSlider: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument
    @Binding var progress: CGFloat
    let onComplete: () -> Void
    @State private var prepared = false
    @State private var finished = false
    @State private var furthestStep = 0
    @GestureState private var dragging = false

    var body: some View {
        GeometryReader { geometry in
            let colorReady = ArtworkView.artwork(site.colorImage) != nil
            ZStack(alignment: .leading) {
                Rectangle().fill(Palette.ink3).overlay(Rectangle().stroke(Palette.red.opacity(0.6), lineWidth: 1))
                Rectangle().fill(Palette.red.opacity(0.25)).frame(width: max(50, geometry.size.width * progress))
                Text(!colorReady ? "设色图暂未加载" : finished ? "已到访 · 留印" : progress >= 1 ? "松手记录今日到访" : "滑动记录今日到访")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
                    .frame(maxWidth: .infinity)
                Text("访").font(FangguFont.brush(29))
                    .foregroundStyle(Palette.sealPaper)
                    .frame(width: 50, height: 50)
                    .background(Palette.red)
                    .contentShape(Rectangle())
                    .gesture(DragGesture(minimumDistance: 5, coordinateSpace: .global)
                        .updating($dragging) { _, active, _ in active = true }
                        .onChanged {
                            guard !finished else { return }
                            if !prepared { Haptics.beginArrival(); prepared = true }
                            progress = min(1, max(0, $0.translation.width / max(1, geometry.size.width - 50)))
                            let step = Int(progress * 5)
                            if step > furthestStep {
                                furthestStep = step
                                Haptics.arrivalResistance(step: step)
                            }
                        }
                        .onEnded { value in
                            prepared = false
                            furthestStep = 0
                            if finished { return }
                            progress = min(1, max(0, value.translation.width / max(1, geometry.size.width - 50)))
                            if progress >= 1 && checkIn() { return }
                            withAnimation(.easeOut(duration: 0.38)) { progress = 0 }
                        })
                    .offset(x: (geometry.size.width - 50) * progress)
                    .allowsHitTesting(colorReady && !finished)
            }
            .frame(height: 54)
            .accessibilityElement()
            .accessibilityLabel("到访打卡")
            .accessibilityValue(finished ? "今日到访已保存" : "今日到访，拖动进度 \(Int(progress * 100))%")
            .accessibilityHint(colorReady ? "向右拖到底并松手，将保存今天的到访日期；也可使用记录今日到访操作" : "设色图暂未加载")
            .accessibilityAction(named: Text("记录今日到访")) { _ = checkIn() }
        }
        .frame(height: 54)
        .onChange(of: dragging) { _, active in
            // SwiftUI also resets GestureState when scrolling cancels the drag.
            if !active && prepared && !finished {
                prepared = false
                furthestStep = 0
                withAnimation(.easeOut(duration: 0.38)) { progress = 0 }
            }
        }
    }

    @discardableResult private func checkIn() -> Bool {
        guard !finished, ArtworkView.artwork(site.colorImage) != nil else { return false }
        guard library.record(for: site).status != .visited else { return false }
        if library.recordToday(for: site) {
            finished = true
            progress = 1
            Haptics.success()
            onComplete()
            return true
        }
        Haptics.error()
        return false
    }
}

struct VisitEditor: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let site: Monument
    @State private var date = Date()
    @State private var dateKnown = false
    @State private var loaded = false
    @State private var wasVisited = false
    @State private var note = ""
    @State private var error: String?

    var body: some View {
        NavigationStack {
            Form {
                Section("到访日期") {
                    Toggle("记得具体日期", isOn: $dateKnown)
                        .accessibilityIdentifier("visit-date-known")
                    if dateKnown {
                        DatePicker("选择日期", selection: $date, in: ...Date(), displayedComponents: .date)
                            .accessibilityIdentifier("visit-date")
                    } else {
                        Text("日期不详 · 留空保存，不自动填写今天")
                            .font(FangguFont.serif(13)).foregroundStyle(Palette.paper2)
                    }
                }
                .listRowBackground(Palette.ink2)
                Section("到访笔记") {
                    TextEditor(text: $note).frame(minHeight: 160)
                        .accessibilityLabel("到访笔记").accessibilityIdentifier("visit-note")
                    Text("\(note.utf16.count) / 12000").font(FangguFont.mono(11)).foregroundStyle(.secondary)
                }
                .listRowBackground(Palette.ink2)
                if let error { Text(error).foregroundStyle(Palette.redText) }
            }
            .foregroundStyle(Palette.paper)
            .scrollContentBackground(.hidden)
            .background(Palette.ink)
            .navigationTitle(wasVisited ? "编辑到访记录" : "补记到访")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("取消") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) {
                    Button(wasVisited ? "保存修改" : "记录到访") { save() }
                        .accessibilityIdentifier("save-visit")
                }
            }
            .onAppear {
                guard !loaded else { return }
                let record = library.record(for: site)
                wasVisited = record.status == .visited
                dateKnown = !record.visitedOn.isEmpty
                date = LibraryStore.dateFormatter().date(from: record.visitedOn) ?? .now
                note = record.note
                loaded = true
            }
        }
        .fangguAppearance()
    }

    private func save() {
        let dateText = dateKnown ? LibraryStore.dateFormatter().string(from: date) : ""
        guard dateText.isEmpty || LibraryStore.validDate(dateText) else { error = "请选择不晚于今天的日期"; Haptics.error(); return }
        guard note.utf16.count <= 12000 else { error = "笔记不能超过 12000 字"; Haptics.error(); return }
        let wasVisited = library.record(for: site).status == .visited
        if library.setRecord(VisitRecord(status: .visited, visitedOn: dateText, note: note), for: site) {
            if wasVisited { Haptics.soft() } else { Haptics.success() }
            dismiss()
        } else { error = library.error; Haptics.error() }
    }
}

struct ReviewEditor: View {
    @EnvironmentObject private var library: LibraryStore
    @EnvironmentObject private var undoPresentation: UndoPresentation
    @Environment(\.dismiss) private var dismiss
    @Environment(\.scenePhase) private var scenePhase
    @Environment(\.dynamicTypeSize) private var dynamicTypeSize
    let site: Monument
    @State private var dimensions = DimensionScores()
    @State private var legacyRating: Int?
    @State private var loaded = false
    @State private var text = ""
    @State private var error: String?
    @State private var textSaveTask: Task<Void, Never>?
    @FocusState private var editingText: Bool

    private var hasUnsavedChanges: Bool {
        let stored = library.review(for: site)
        return dimensions != stored.dimensions || text != stored.text
    }
    private var validationError: String? { text.utf16.count > 500 ? "短评不能超过 500 字" : nil }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 20) {
                    Text(site.name).font(FangguFont.serif(19)).foregroundStyle(Palette.paper)
                    if let message = validationError ?? error {
                        VStack(alignment: .leading, spacing: 8) {
                            Text(message).foregroundStyle(Palette.redText)
                            if hasUnsavedChanges {
                                Text("未保存的修改仍保留在这里。")
                                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
                                if validationError == nil {
                                    Button("重试保存") { _ = flushChanges() }
                                }
                                Button("放弃未保存的修改", role: .destructive) { discardUnsavedChanges() }
                            }
                        }
                        .accessibilityIdentifier("review-save-error")
                    }
                    VStack(spacing: 8) {
                        if dynamicTypeSize.isAccessibilitySize {
                            VStack(alignment: .leading, spacing: 8) { reviewHeading }
                                .frame(maxWidth: .infinity, alignment: .leading)
                        } else {
                            HStack { reviewHeading }
                        }
                        ReviewRadar(scores: $dimensions, onCommit: saveDimensions)
                    }
                    .padding(.horizontal, 12).padding(.bottom, 18)
                    .background(Palette.ink2)
                    .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
                    if let rating = legacyRating {
                        Text("旧版 \(rating) 星评分已保留。六个维度由你重新描画。")
                            .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                    }
                    VStack(alignment: .leading, spacing: 8) {
                        Text("短评").font(FangguFont.serif(17))
                        TextEditor(text: $text).frame(minHeight: 130)
                            .focused($editingText)
                            .scrollContentBackground(.hidden).padding(8).background(Palette.ink2)
                            .accessibilityLabel("短评").accessibilityIdentifier("review-text")
                        Text("\(text.utf16.count) / 500").font(FangguFont.mono(11)).foregroundStyle(Palette.paper3)
                    }
                    Button("清除评价", role: .destructive) {
                        guard flushChanges() else { return }
                        if library.clearReview(for: site) {
                            textSaveTask?.cancel()
                            dimensions = DimensionScores(); text = ""; legacyRating = nil; error = nil
                            Haptics.selection()
                        } else { showSaveError() }
                    }
                    .foregroundStyle(Palette.redText).frame(minHeight: 44)
                    .disabled(dimensions.isEmpty && text.isEmpty && legacyRating == nil)
                    Text(hasUnsavedChanges ? "修改尚未保存" : dynamicTypeSize.isAccessibilitySize ? "选定档位即保存，短评自动保存。" : "松手即保存，短评自动保存。")
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                        .accessibilityIdentifier("review-autosave-status")
                }
                .padding(18)
            }
            .foregroundStyle(Palette.paper)
            .background(Palette.ink)
            .scrollDismissesKeyboard(.interactively)
            .safeAreaInset(edge: .bottom, spacing: 0) { UndoFeedback(inReviewEditor: true) }
            .navigationTitle("我的评价")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar {
                ToolbarItem(placement: .confirmationAction) { Button("完成") { close() } }
            }
            .onAppear {
                undoPresentation.reviewIsPresented = true
                guard !loaded else { return }
                let review = library.review(for: site)
                dimensions = review.dimensions
                legacyRating = review.rating
                text = review.text
                loaded = true
            }
            .onChange(of: library.data.reviews[site.id]) { old, new in
                // Undo updates only fields which have no unsaved local edit.
                if dimensions == (old?.dimensions ?? DimensionScores()) { dimensions = new?.dimensions ?? DimensionScores() }
                if text == (old?.text ?? "") { text = new?.text ?? "" }
                legacyRating = new?.rating
            }
            .onChange(of: text) { _, _ in scheduleTextSave() }
            .onChange(of: editingText) { _, focused in
                if !focused { _ = saveText() }
            }
            .onChange(of: scenePhase) { _, phase in
                if phase != .active { _ = saveText() }
            }
            .onDisappear {
                textSaveTask?.cancel()
                undoPresentation.reviewIsPresented = false
            }
            .interactiveDismissDisabled(hasUnsavedChanges)
        }
        .fangguAppearance()
    }

    @ViewBuilder private var reviewHeading: some View {
        Text("我的六维图").font(FangguFont.serif(17))
        if !dynamicTypeSize.isAccessibilitySize { Spacer() }
        Button {
            if library.resetReviewDimensions(for: site) {
                dimensions = DimensionScores()
                if !hasUnsavedChanges { error = nil }
                Haptics.selection()
            } else { showSaveError() }
        } label: {
            Text("重置六项").font(FangguFont.serif(12))
                .frame(minHeight: 44).contentShape(Rectangle())
        }
        .disabled(dimensions.isEmpty)
        .accessibilityIdentifier("reset-dimensions")
    }

    private func saveDimensions(_ next: DimensionScores) -> Bool {
        let saved = library.setReviewDimensions(next, for: site)
        if saved { if !hasUnsavedChanges { error = nil } }
        else { showSaveError() }
        return saved
    }

    private func scheduleTextSave() {
        textSaveTask?.cancel()
        guard loaded, text != library.review(for: site).text else { return }
        textSaveTask = Task { @MainActor in
            do { try await Task.sleep(for: .milliseconds(450)) }
            catch { return }
            guard !Task.isCancelled else { return }
            _ = saveText()
        }
    }

    private func saveText() -> Bool {
        textSaveTask?.cancel()
        guard loaded else { return true }
        guard validationError == nil else { return false }
        let saved = library.setReviewText(text, for: site)
        if saved { if !hasUnsavedChanges { error = nil } }
        else { showSaveError() }
        return saved
    }

    private func flushChanges() -> Bool {
        let scoresSaved = saveDimensions(dimensions)
        let textSaved = saveText()
        return scoresSaved && textSaved
    }

    private func close() {
        if flushChanges() { dismiss() }
        else if validationError != nil { Haptics.error() }
    }

    private func showSaveError() {
        error = library.error ?? "保存失败，请重试。"
        Haptics.error()
    }

    private func discardUnsavedChanges() {
        textSaveTask?.cancel()
        let stored = library.review(for: site)
        dimensions = stored.dimensions; text = stored.text; error = nil
        dismiss()
    }
}
