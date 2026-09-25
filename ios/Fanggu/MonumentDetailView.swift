import SwiftUI

struct MonumentDetailView: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument
    @State private var editingVisit = false
    @State private var editingReview = false

    private var record: VisitRecord { library.record(for: site) }
    private var review: Review { library.review(for: site) }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                ArtworkView(site: site, visited: record.status == .visited, height: 320)
                    .clipShape(RoundedRectangle(cornerRadius: 10))
                HStack {
                    Text(site.dynastyName).foregroundStyle(Palette.dynasty(site.dynasty))
                    Spacer()
                    Text(site.era).foregroundStyle(.secondary)
                }
                .font(.subheadline)
                VStack(alignment: .leading, spacing: 5) {
                    Text(site.name).font(.system(size: 32, weight: .semibold, design: .serif)).foregroundStyle(Palette.ink)
                    if !site.sub.isEmpty { Text(site.sub).font(.subheadline).foregroundStyle(Palette.gold) }
                    Text(site.place).font(.subheadline).foregroundStyle(.secondary)
                }
                Text(site.lede).font(.body).lineSpacing(6)
                VStack(alignment: .leading, spacing: 12) {
                    ForEach(site.facts, id: \.self) { fact in
                        HStack(alignment: .top, spacing: 10) {
                            Circle().fill(Palette.red).frame(width: 5, height: 5).padding(.top, 8)
                            Text(fact).lineSpacing(4)
                        }
                    }
                }
                if !site.quote.isEmpty { Text(site.quote).italic().foregroundStyle(.secondary) }
                Divider()
                VStack(alignment: .leading, spacing: 12) {
                    Text("我的访古记").font(.title3.weight(.semibold))
                    Text(record.status.title + (record.visitedOn.isEmpty ? "" : " · " + record.visitedOn))
                        .foregroundStyle(Palette.red)
                    if record.status != .visited { ArrivalSlider(site: site) }
                    HStack {
                        if record.status == .unvisited {
                            Button("加入心愿单") { setStatus(.wishlist) }.buttonStyle(.bordered)
                        } else if record.status == .wishlist {
                            Button("移出心愿单") { setStatus(.unvisited) }.buttonStyle(.bordered)
                        }
                        if record.status == .visited {
                            Button("改为想去") { setStatus(.wishlist) }.buttonStyle(.bordered)
                        }
                        Button(record.status == .visited ? "编辑到访记录" : "填写到访记录") { editingVisit = true }
                            .buttonStyle(.borderedProminent)
                    }
                    if !record.note.isEmpty { Text(record.note).frame(maxWidth: .infinity, alignment: .leading).padding(12).background(.white, in: RoundedRectangle(cornerRadius: 8)) }
                }
                VStack(alignment: .leading, spacing: 8) {
                    Text("我的评价").font(.title3.weight(.semibold))
                    if let rating = review.rating { Text(String(repeating: "★", count: rating) + String(repeating: "☆", count: 5 - rating)).foregroundStyle(Palette.gold) }
                    if !review.text.isEmpty { Text(review.text) }
                    Button(review.rating == nil && review.text.isEmpty ? "写短评 / 打分" : "编辑评价") { editingReview = true }
                        .buttonStyle(.bordered)
                }
                if let url = URL(string: site.sourceURL), !site.sourceURL.isEmpty {
                    Link("图版参考来源 ↗", destination: url).font(.footnote)
                }
            }
            .padding(20)
        }
        .background(Palette.paper.ignoresSafeArea())
        .navigationTitle(site.short.isEmpty ? site.name : site.short)
        .navigationBarTitleDisplayMode(.inline)
        .sheet(isPresented: $editingVisit) { VisitEditor(site: site) }
        .sheet(isPresented: $editingReview) { ReviewEditor(site: site) }
    }

    private func setStatus(_ status: VisitStatus) {
        var next = record
        next.status = status
        library.setRecord(next, for: site)
    }
}

struct ArrivalSlider: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument
    @State private var progress: CGFloat = 0

    var body: some View {
        GeometryReader { geometry in
            ZStack(alignment: .leading) {
                Capsule().fill(Palette.ink.opacity(0.1))
                Capsule().fill(Palette.red.opacity(0.25)).frame(width: max(56, geometry.size.width * progress))
                Text("向右拖动，记为今日到访 →")
                    .font(.subheadline).foregroundStyle(Palette.ink)
                    .frame(maxWidth: .infinity)
                Text("访").font(.system(size: 23, weight: .bold, design: .serif))
                    .foregroundStyle(.white)
                    .frame(width: 50, height: 50)
                    .background(Palette.red, in: Circle())
                    .offset(x: (geometry.size.width - 50) * progress)
            }
            .frame(height: 54)
            .contentShape(Rectangle())
            .gesture(DragGesture(minimumDistance: 5)
                .onChanged { progress = min(1, max(0, $0.translation.width / max(1, geometry.size.width - 50))) }
                .onEnded { _ in
                    if progress >= 0.95 { checkIn() }
                    withAnimation(.spring()) { progress = 0 }
                })
            .accessibilityElement()
            .accessibilityLabel("到访打卡")
            .accessibilityHint("向右拖到底并松手，或使用完成到访操作")
            .accessibilityAction(named: Text("完成到访")) { checkIn() }
        }
        .frame(height: 54)
    }

    private func checkIn() {
        var next = library.record(for: site)
        guard next.status != .visited else { return }
        next.status = .visited
        next.visitedOn = Self.today()
        library.setRecord(next, for: site)
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
                    Text("\(note.utf16.count) / 12000").font(.caption).foregroundStyle(.secondary)
                }
                if let error { Text(error).foregroundStyle(Palette.red) }
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
        guard date.isEmpty || LibraryStore.validDate(date) else { error = "请输入有效且不晚于今天的日期"; return }
        guard note.utf16.count <= 12000 else { error = "笔记不能超过 12000 字"; return }
        library.setRecord(VisitRecord(status: .visited, visitedOn: date, note: note), for: site)
        if library.error == nil { dismiss() } else { error = library.error }
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
                            Button { rating = value } label: {
                                Image(systemName: value <= (rating ?? 0) ? "star.fill" : "star")
                                    .foregroundStyle(Palette.gold).font(.title2)
                            }
                            .buttonStyle(.plain)
                            .accessibilityLabel("\(value) 星")
                        }
                        Spacer()
                        Button("清空") { rating = nil }
                    }
                }
                Section("短评") {
                    TextEditor(text: $text).frame(minHeight: 150)
                    Text("\(text.utf16.count) / 500").font(.caption).foregroundStyle(.secondary)
                }
                Button("清除评价", role: .destructive) { rating = nil; text = ""; save() }
                if let error { Text(error).foregroundStyle(Palette.red) }
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
        guard text.utf16.count <= 500 else { error = "短评不能超过 500 字"; return }
        library.setReview(rating: rating, text: text, for: site)
        if library.error == nil { dismiss() } else { error = library.error }
    }
}
