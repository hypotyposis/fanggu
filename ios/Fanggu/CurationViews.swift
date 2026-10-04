import SwiftUI

/// Editorial lists (名录／线路／专题) and derived collection progress. These views only read personal records.
struct CurationProgressBar: View {
    let progress: CurationProgress
    var height: CGFloat = 3
    var tint: Color = Palette.gold
    var track: Color = Palette.paper.opacity(0.12)

    var body: some View {
        GeometryReader { geometry in
            ZStack(alignment: .leading) {
                Rectangle().fill(track)
                Rectangle().fill(tint).frame(width: geometry.size.width * CGFloat(progress.fraction))
            }
        }
        .frame(height: height)
        .accessibilityHidden(true)
    }
}

struct CurationStrip: View {
    @EnvironmentObject private var library: LibraryStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack(alignment: .firstTextBaseline) {
                Text("专题").font(FangguFont.serif(14)).foregroundStyle(Palette.paper)
                Text("名录与线路 · 看看集齐了多少").font(FangguFont.serif(12)).foregroundStyle(Palette.paper3)
                Spacer()
            }
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 10) {
                    ForEach(library.curations) { list in
                        NavigationLink(value: list) { CurationCard(curation: list) }
                            .buttonStyle(.plain)
                    }
                }
                .padding(.vertical, 1)
            }
        }
        .accessibilityIdentifier("curation-strip")
    }
}

struct CurationCard: View {
    @EnvironmentObject private var library: LibraryStore
    let curation: Curation

    var body: some View {
        let progress = library.progress(of: curation)
        VStack(alignment: .leading, spacing: 6) {
            Text(verbatim: "\(curation.kindName) · \(curation.eyebrow)")
                .font(FangguFont.mono(10)).foregroundStyle(Palette.gold).lineLimit(1)
            Text(curation.name)
                .font(FangguFont.serif(18, weight: .medium)).foregroundStyle(Palette.paper).lineLimit(1)
            Spacer(minLength: 0)
            HStack(alignment: .firstTextBaseline, spacing: 4) {
                Text(verbatim: "\(progress.visited)")
                    .font(FangguFont.serif(18, weight: .medium)).monospacedDigit().foregroundStyle(Palette.gold)
                Text("/ \(progress.total) 已见").font(FangguFont.mono(11)).foregroundStyle(Palette.paper2)
                Spacer()
                if progress.isComplete {
                    Text("集齐").font(FangguFont.mono(10)).foregroundStyle(Palette.redText)
                }
            }
            CurationProgressBar(progress: progress)
        }
        .padding(14)
        .frame(width: 196, height: 116, alignment: .leading)
        .background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.15), lineWidth: 1))
        .contentShape(Rectangle())
        .accessibilityElement(children: .ignore)
        .accessibilityLabel("\(curation.kindName) \(curation.name)，已到访 \(progress.visited) 处，共 \(progress.total) 处")
        .accessibilityIdentifier("curation-card-\(curation.id)")
    }
}

/// Compact row for 我的 and other lists.
struct CurationSummaryRow: View {
    @EnvironmentObject private var library: LibraryStore
    let curation: Curation

    var body: some View {
        let progress = library.progress(of: curation)
        VStack(alignment: .leading, spacing: 8) {
            HStack(alignment: .firstTextBaseline, spacing: 8) {
                Text(curation.kindName).font(FangguFont.mono(10)).foregroundStyle(Palette.gold)
                    .padding(.horizontal, 6).padding(.vertical, 3)
                    .overlay(Rectangle().stroke(Palette.goldDim.opacity(0.7), lineWidth: 1))
                Text(curation.name).font(FangguFont.serif(16)).foregroundStyle(Palette.paper).lineLimit(1)
                Spacer(minLength: 8)
                if progress.isComplete {
                    Text("集齐").font(FangguFont.mono(10)).foregroundStyle(Palette.redText)
                }
                Text(verbatim: "\(progress.visited)").font(FangguFont.serif(16, weight: .medium)).monospacedDigit().foregroundStyle(Palette.gold)
                Text(verbatim: "/ \(progress.total)").font(FangguFont.mono(12)).foregroundStyle(Palette.paper2)
                Image(systemName: "chevron.right").font(.system(size: 11)).foregroundStyle(Palette.paper3)
            }
            CurationProgressBar(progress: progress)
        }
        .padding(.horizontal, 14).padding(.vertical, 12)
        .background(Palette.ink2)
        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
        .contentShape(Rectangle())
        .accessibilityElement(children: .ignore)
        .accessibilityLabel(progress.isComplete
            ? Text("\(curation.kindName) \(curation.name)，已到访 \(progress.visited) 处，共 \(progress.total) 处，已集齐")
            : Text("\(curation.kindName) \(curation.name)，已到访 \(progress.visited) 处，共 \(progress.total) 处"))
        .accessibilityIdentifier("curation-row-\(curation.id)")
    }
}

/// Lists a monument belongs to, shown on its detail page.
struct CurationChips: View {
    @EnvironmentObject private var library: LibraryStore
    let site: Monument

    var body: some View {
        let lists = library.curations(for: site)
        if !lists.isEmpty {
            VStack(alignment: .leading, spacing: 8) {
                ForEach(lists) { list in
                    let progress = library.progress(of: list)
                    NavigationLink(value: list) {
                        HStack(spacing: 8) {
                            Text(list.kindName).font(FangguFont.mono(10)).foregroundStyle(Palette.gold)
                                .padding(.horizontal, 6).padding(.vertical, 3)
                                .overlay(Rectangle().stroke(Palette.goldDim.opacity(0.7), lineWidth: 1))
                            Text(list.name).font(FangguFont.serif(14)).foregroundStyle(Palette.paper)
                            Spacer(minLength: 8)
                            Text(verbatim: "\(progress.visited) / \(progress.total)").font(FangguFont.mono(11)).foregroundStyle(Palette.gold)
                            Image(systemName: "chevron.right").font(.system(size: 11)).foregroundStyle(Palette.paper3)
                        }
                        .padding(.horizontal, 12).frame(minHeight: 44)
                        .background(Palette.ink2)
                        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityLabel("所属\(list.kindName) \(list.name)，已到访 \(progress.visited) 处，共 \(progress.total) 处")
                    .accessibilityIdentifier("curation-chip-\(list.id)")
                }
            }
        }
    }
}

struct CurationView: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let curation: Curation
    @State private var sharing = false

    var body: some View {
        let members = library.members(of: curation)
        let progress = library.progress(of: curation)
        ScrollView {
            VStack(alignment: .leading, spacing: 22) {
                Text(verbatim: "\(curation.kindName) · \(curation.eyebrow)")
                    .font(FangguFont.mono(11)).foregroundStyle(Palette.gold)
                Text(curation.name)
                    .font(FangguFont.serif(35, weight: .medium)).foregroundStyle(Palette.paper)
                Text(curation.lede).font(FangguFont.serif(16)).foregroundStyle(Palette.paper).lineSpacing(7)
                VStack(alignment: .leading, spacing: 10) {
                    HStack(alignment: .lastTextBaseline, spacing: 8) {
                        FangguMetricNumber(value: progress.visited, size: 44)
                        Text(verbatim: "/ \(progress.total)").font(FangguFont.serif(20)).foregroundStyle(Palette.paper2)
                        Text(progress.isComplete ? "已集齐" : "已到访").font(FangguFont.mono(11)).foregroundStyle(progress.isComplete ? Palette.redText : Palette.paper2)
                        Spacer()
                    }
                    .accessibilityElement(children: .ignore)
                    .accessibilityLabel(progress.isComplete
                        ? Text("已到访 \(progress.visited) 处，共 \(progress.total) 处，已集齐")
                        : Text("已到访 \(progress.visited) 处，共 \(progress.total) 处"))
                    .accessibilityIdentifier("curation-progress")
                    CurationProgressBar(progress: progress, height: 4)
                }
                if !curation.note.isEmpty {
                    Text("收录说明 · \(curation.note)").font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineSpacing(5)
                }
                FangguRule()
                ForEach(Array(members.enumerated()), id: \.element.id) { index, site in
                    NavigationLink(value: site) {
                        HStack(alignment: .center, spacing: 10) {
                            Text(String(format: "%02d", index + 1))
                                .font(FangguFont.mono(11)).foregroundStyle(Palette.paper3).frame(width: 22, alignment: .leading)
                            TimelineSiteRow(site: site)
                        }
                    }
                    .buttonStyle(.plain)
                    .accessibilityIdentifier("curation-member-\(site.id)")
                }
            }
            .padding(24)
        }
        .safeAreaInset(edge: .bottom, spacing: 0) { if !sharing { UndoFeedback() } }
        .background(Palette.ink.ignoresSafeArea())
        .navigationTitle(curation.name)
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarBackButtonHidden()
        .toolbar(.visible, for: .navigationBar)
        .toolbar(.hidden, for: .tabBar)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button { dismiss() } label: { Label("返回", systemImage: "chevron.left").font(FangguFont.serif(13)) }
            }
            ToolbarItem(placement: .topBarTrailing) {
                Button { sharing = true } label: { Label("分享专题卡", systemImage: "square.and.arrow.up") }
                    .accessibilityIdentifier("share-curation-card")
            }
            ToolbarItem(placement: .principal) {
                Text(curation.name).font(.headline).lineLimit(1).minimumScaleFactor(0.7)
                    .accessibilityAddTraits(.isHeader)
            }
        }
        .toolbarBackground(Palette.ink, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
        .sheet(isPresented: $sharing) { ShareCardSheet(content: .curation(curation)) }
    }
}

struct CollectionProgressView: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    @State private var facet: CollectionFacet = .dynasty

    var body: some View {
        let groups = library.collectionGroups(by: facet)
        ScrollView {
            VStack(alignment: .leading, spacing: 18) {
                FangguSectionTitle(eyebrow: "亲见 · 收集进度", title: "收集进度", subtitle: "按时代、省份或类型，看看图鉴写满了多少。")
                Picker("维度", selection: $facet) {
                    ForEach(CollectionFacet.allCases) { Text($0.title).tag($0) }
                }
                .pickerStyle(.segmented)
                .accessibilityIdentifier("collection-facet")
                let visited = groups.reduce(0) { $0 + $1.visited }
                let touched = groups.filter { $0.visited > 0 }.count
                Text("已到访 \(visited) 处，涉及 \(touched) 个\(facet.title)，共 \(groups.count) 个")
                    .font(FangguFont.mono(11)).foregroundStyle(Palette.paper2)
                    .accessibilityIdentifier("collection-summary")
                LazyVStack(spacing: 10) {
                    ForEach(groups) { group in
                        VStack(alignment: .leading, spacing: 8) {
                            HStack(alignment: .firstTextBaseline, spacing: 6) {
                                Text(group.name).font(FangguFont.serif(15))
                                    .foregroundStyle(group.colorHex.map { Palette.dynasty($0) } ?? Palette.paper)
                                Spacer(minLength: 8)
                                Text(verbatim: "\(group.visited)").font(FangguFont.serif(15, weight: .medium)).monospacedDigit().foregroundStyle(Palette.gold)
                                Text(verbatim: "/ \(group.total)").font(FangguFont.mono(12)).foregroundStyle(Palette.paper2)
                            }
                            CurationProgressBar(progress: group.progress)
                        }
                        .padding(.horizontal, 14).padding(.vertical, 12)
                        .background(Palette.ink2)
                        .overlay(Rectangle().stroke(Palette.paper.opacity(0.14), lineWidth: 1))
                        .accessibilityElement(children: .ignore)
                        .accessibilityLabel("\(group.name)，已到访 \(group.visited) 处，共 \(group.total) 处")
                        .accessibilityIdentifier("collection-group-\(group.id)")
                    }
                }
            }
            .padding(24)
        }
        .background(Palette.ink.ignoresSafeArea())
        .navigationTitle("收集进度")
        .navigationBarTitleDisplayMode(.inline)
        .navigationBarBackButtonHidden()
        .toolbar(.visible, for: .navigationBar)
        .toolbar(.hidden, for: .tabBar)
        .toolbar {
            ToolbarItem(placement: .topBarLeading) {
                Button { dismiss() } label: { Label("返回", systemImage: "chevron.left").font(FangguFont.serif(13)) }
            }
        }
        .toolbarBackground(Palette.ink, for: .navigationBar)
        .toolbarBackground(.visible, for: .navigationBar)
    }
}
