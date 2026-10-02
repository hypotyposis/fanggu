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
                HStack(spacing: 10) {
                    Button(record.status == .visited ? "编辑到访记录" : "标记到访") { editingVisit = true }
                        .buttonStyle(FangguOutlineButton())
                    if record.status == .unvisited {
                        Button("加入心愿单") { setStatus(.wishlist) }
                            .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
                    } else if record.status == .wishlist {
                        Button("移出心愿单") { setStatus(.unvisited) }
                            .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
                    }
                }
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
                    Text(record.status.title + (record.visitedOn.isEmpty ? "" : " · " + record.visitedOn))
                        .font(FangguFont.mono(12)).foregroundStyle(record.status.textColor)
                    if record.status == .visited {
                        Button("移至心愿单") { setStatus(.wishlist) }
                            .buttonStyle(FangguOutlineButton())
                    }
                    if !record.note.isEmpty {
                        Text(record.note).font(FangguFont.serif(14)).foregroundStyle(Palette.paper)
                            .frame(maxWidth: .infinity, alignment: .leading).padding(12).background(Palette.ink2)
                    }
                }
                VStack(alignment: .leading, spacing: 8) {
                    Text("我的评价").font(FangguFont.serif(21)).foregroundStyle(Palette.paper)
                    if let rating = review.rating { Text(String(repeating: "★", count: rating) + String(repeating: "☆", count: 5 - rating)).foregroundStyle(Palette.gold) }
                    if !review.text.isEmpty { Text(review.text).font(FangguFont.serif(14)).foregroundStyle(Palette.paper2) }
                    Button(review.rating == nil && review.text.isEmpty ? "写短评 / 打分" : "编辑评价") { editingReview = true }
                        .buttonStyle(FangguOutlineButton())
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
    }

    private func setStatus(_ status: VisitStatus) {
        var next = record
        next.status = status
        if library.setRecord(next, for: site) { Haptics.soft() }
        else { Haptics.error() }
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
                Text(!colorReady ? "设色图暂未加载" : finished ? "已到访 · 留印" : progress >= 1 ? "松手 · 留印" : progress > 0 ? "慢慢为古迹添色" : "向右拖动 · 设色")
                    .font(FangguFont.serif(12)).foregroundStyle(Palette.paper2)
                    .frame(maxWidth: .infinity)
                Text("访").font(FangguFont.brush(29))
                    .foregroundStyle(Palette.paper)
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
            .accessibilityValue(finished ? "已完成设色，到访已保存" : "设色 \(Int(progress * 100))%")
            .accessibilityHint(colorReady ? "向右拖到底并松手，或使用完成到访操作" : "设色图暂未加载")
            .accessibilityAction(named: Text("完成到访")) { _ = checkIn() }
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
        var next = library.record(for: site)
        guard next.status != .visited else { return false }
        next.status = .visited
        next.visitedOn = Self.today()
        if library.setRecord(next, for: site) {
            finished = true
            progress = 1
            Haptics.success()
            onComplete()
            return true
        }
        Haptics.error()
        return false
    }

    static func today() -> String {
        let formatter = DateFormatter()
        formatter.dateFormat = "yyyy-MM-dd"
        return formatter.string(from: .now)
    }
}

struct VisitEditor: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let site: Monument
    @State private var date = ""
    @State private var note = ""
    @State private var error: String?

    var body: some View {
        NavigationStack {
            Form {
                Section("到访日期 · 可留空") {
                    TextField("YYYY-MM-DD", text: $date).keyboardType(.numbersAndPunctuation)
                }
                Section("到访笔记") {
                    TextEditor(text: $note).frame(minHeight: 160)
                    Text("\(note.utf16.count) / 12000").font(FangguFont.mono(11)).foregroundStyle(.secondary)
                }
                if let error { Text(error).foregroundStyle(Palette.redText) }
            }
            .navigationTitle("记录到访")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("取消") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) { Button("保存") { save() } }
            }
            .onAppear {
                let record = library.record(for: site)
                date = record.visitedOn
                note = record.note
            }
        }
    }

    private func save() {
        guard date.isEmpty || LibraryStore.validDate(date) else { error = "请输入有效且不晚于今天的日期"; Haptics.error(); return }
        guard note.utf16.count <= 12000 else { error = "笔记不能超过 12000 字"; Haptics.error(); return }
        let wasVisited = library.record(for: site).status == .visited
        if library.setRecord(VisitRecord(status: .visited, visitedOn: date, note: note), for: site) {
            if wasVisited { Haptics.soft() } else { Haptics.success() }
            dismiss()
        } else { error = library.error; Haptics.error() }
    }
}

struct ReviewEditor: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let site: Monument
    @State private var rating: Int?
    @State private var text = ""
    @State private var error: String?

    var body: some View {
        NavigationStack {
            Form {
                Section("我的评分") {
                    HStack {
                        ForEach(1...5, id: \.self) { value in
                            Button { if rating != value { rating = value; Haptics.selection() } } label: {
                                Image(systemName: value <= (rating ?? 0) ? "star.fill" : "star")
                                    .foregroundStyle(Palette.gold).font(.title2)
                                    .frame(minWidth: 44, minHeight: 44)
                            }
                            .buttonStyle(.plain)
                            .accessibilityLabel("\(value) 星")
                        }
                        Spacer()
                        Button("清空") { if rating != nil { rating = nil; Haptics.selection() } }
                    }
                }
                Section("短评") {
                    TextEditor(text: $text).frame(minHeight: 150)
                    Text("\(text.utf16.count) / 500").font(FangguFont.mono(11)).foregroundStyle(.secondary)
                }
                Button("清除评价", role: .destructive) { rating = nil; text = ""; save() }
                if let error { Text(error).foregroundStyle(Palette.redText) }
            }
            .navigationTitle("我的评价")
            .toolbar {
                ToolbarItem(placement: .cancellationAction) { Button("取消") { dismiss() } }
                ToolbarItem(placement: .confirmationAction) { Button("保存") { save() } }
            }
            .onAppear {
                let review = library.review(for: site)
                rating = review.rating
                text = review.text
            }
        }
    }

    private func save() {
        guard text.utf16.count <= 500 else { error = "短评不能超过 500 字"; Haptics.error(); return }
        if library.setReview(rating: rating, text: text, for: site) { Haptics.soft(); dismiss() }
        else { error = library.error; Haptics.error() }
    }
}
