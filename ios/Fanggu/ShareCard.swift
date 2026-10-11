import Photos
import SwiftUI

/// Share cards are rendered as images on warm paper regardless of the live appearance.
/// They contain catalogue text, the artwork and only the personal fields the user chose; private notes never appear.
enum CardPalette {
    static let paper = Palette.color("#f6f1e7")
    static let paper2 = Palette.color("#fffcf5")
    static let ink = Palette.color("#302b23")
    static let ink2 = Palette.color("#675e50")
    static let ink3 = Palette.color("#766b5b")
    static let gold = Palette.color("#866126")
    static let goldDim = Palette.color("#aa8b55")
    static let red = Palette.color("#c8442b")
    static let redText = Palette.color("#a53825")
    static let rule = Palette.color("#302b23").opacity(0.14)
}

enum ShareCardContent: Identifiable {
    case monument(Monument)
    case curation(Curation)

    var id: String {
        switch self {
        case .monument(let site): "monument-\(site.id)"
        case .curation(let list): "curation-\(list.id)"
        }
    }
}

struct ShareCardOptions: Equatable {
    var includeReview = true
    var includeGrades = true
}

@MainActor enum ShareCardRenderer {
    static let size = CGSize(width: 360, height: 600)

    static func render<Content: View>(_ content: Content) -> UIImage? {
        let renderer = ImageRenderer(content: content
            .frame(width: size.width, height: size.height)
            .environment(\.colorScheme, .light)
            .environment(\.dynamicTypeSize, .large))
        renderer.scale = 3
        renderer.isOpaque = true
        renderer.proposedSize = ProposedViewSize(size)
        return renderer.uiImage
    }
}

private struct CardArrivalSeal: View {
    var size: CGFloat = 19
    var body: some View {
        // A seal impression, like the in-app stamp, keeps its Chinese characters.
        Text(verbatim: "亲\n见")
            .font(FangguFont.brush(size))
            .lineSpacing(-3)
            .foregroundStyle(CardPalette.red)
            .padding(size * 0.35)
            .overlay(Rectangle().stroke(CardPalette.red, lineWidth: 1.5))
            .rotationEffect(.degrees(-8))
            .accessibilityHidden(true)
    }
}

private struct CardArtwork: View {
    let site: Monument
    let visited: Bool
    var padding: CGFloat = 14

    var body: some View {
        ZStack {
            CardPalette.paper2
            if visited, let color = ArtworkView.artwork(site.colorImage) {
                Image(uiImage: color).resizable().scaledToFit().padding(padding)
            } else if let line = ArtworkView.artwork(site.lineImage) {
                Image(uiImage: line).renderingMode(.template).resizable().scaledToFit().padding(padding)
                    .foregroundStyle(Palette.dynastyOnPaper(site.dynastyColor))
            } else {
                Text("图版待装入").font(FangguFont.serif(12)).foregroundStyle(CardPalette.ink3)
            }
        }
        .overlay(Rectangle().stroke(CardPalette.rule, lineWidth: 1))
    }
}

private struct CardFooter: View {
    var body: some View {
        HStack(alignment: .lastTextBaseline) {
            Text("以细线描的笔意，记下走过与向往的古迹。")
                .font(FangguFont.mono(9)).foregroundStyle(CardPalette.ink3)
            Spacer()
            Text(verbatim: "访古").font(FangguFont.brush(17)).foregroundStyle(CardPalette.ink2)
        }
    }
}

struct MonumentShareCard: View {
    let site: Monument
    let record: VisitRecord
    let review: Review
    let options: ShareCardOptions

    private var visited: Bool { record.status == .visited }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 5) {
                    Text(visited ? "访古 · 亲见" : record.status == .wishlist ? "访古 · 心愿" : "访古 · 图鉴")
                        .font(FangguFont.mono(10)).tracking(2).foregroundStyle(CardPalette.gold)
                    Text(verbatim: "\(site.dynastyName) · \(site.era)").font(FangguFont.mono(10)).foregroundStyle(CardPalette.ink2)
                }
                Spacer()
                FangguSeal(size: 34)
            }
            Text(site.name)
                .font(FangguFont.serif(28, weight: .medium)).foregroundStyle(CardPalette.ink)
                .lineLimit(2).minimumScaleFactor(0.7)
                .padding(.top, 14)
            if !site.sub.isEmpty {
                Text(site.sub).font(FangguFont.serif(13)).foregroundStyle(CardPalette.gold).padding(.top, 4)
            }
            // The plate takes whatever height the optional review lines leave, so a bare card never ends in blank paper.
            ZStack(alignment: .bottomTrailing) {
                CardArtwork(site: site, visited: visited)
                if visited { CardArrivalSeal().padding(16) }
            }
            .frame(minHeight: 180, maxHeight: .infinity)
            .padding(.top, 14)
            Text(verbatim: "\(site.place) · \(site.typeNames.joined(separator: " · "))")
                .font(FangguFont.serif(11)).foregroundStyle(CardPalette.ink2).lineLimit(1)
                .padding(.top, 10)
            if visited {
                Text(record.visitedOn.isEmpty ? "亲见 · 日期不详" : "亲见 · \(record.visitedOn)")
                    .font(FangguFont.serif(12)).foregroundStyle(CardPalette.redText).padding(.top, 5)
            }
            if options.includeGrades && !review.dimensions.isEmpty {
                HStack(spacing: 0) {
                    ForEach(ReviewDimension.allCases) { axis in
                        VStack(spacing: 3) {
                            Text(ReviewDimension.grade(review.dimensions[axis]))
                                .font(FangguFont.mono(16)).foregroundStyle(review.dimensions[axis] == nil ? CardPalette.ink3 : CardPalette.gold)
                            Text(axis.title).font(FangguFont.serif(9)).foregroundStyle(CardPalette.ink2)
                                .lineLimit(1).minimumScaleFactor(0.6)
                        }
                        .frame(maxWidth: .infinity)
                    }
                }
                .padding(.vertical, 8)
                .overlay(alignment: .top) { Rectangle().fill(CardPalette.rule).frame(height: 1) }
                .padding(.top, 10)
            }
            if options.includeReview && !review.text.isEmpty {
                Text("“\(review.text)”")
                    .font(FangguFont.serif(13)).foregroundStyle(CardPalette.ink).lineSpacing(4).lineLimit(3)
                    .padding(.top, 10)
            }
            CardFooter().padding(.top, 14)
        }
        .padding(22)
        .frame(width: ShareCardRenderer.size.width, height: ShareCardRenderer.size.height, alignment: .top)
        .background(CardPalette.paper)
    }
}

struct CurationShareCard: View {
    let curation: Curation
    let members: [Monument]
    let visitedIDs: Set<String>

    private var progress: CurationProgress { CurationProgress(visited: members.filter { visitedIDs.contains($0.id) }.count, total: members.count) }
    private var shown: [Monument] { Array(members.prefix(9)) }

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            HStack(alignment: .top) {
                VStack(alignment: .leading, spacing: 5) {
                    Text("访古 · \(curation.kindName)").font(FangguFont.mono(10)).tracking(2).foregroundStyle(CardPalette.gold)
                    Text(curation.eyebrow).font(FangguFont.mono(10)).foregroundStyle(CardPalette.ink2)
                }
                Spacer()
                FangguSeal(size: 34)
            }
            // The card image has a fixed height, so long translated names shrink on one line instead of wrapping.
            Text(curation.name)
                .font(FangguFont.serif(30, weight: .medium)).foregroundStyle(CardPalette.ink)
                .lineLimit(1).minimumScaleFactor(0.5)
                .padding(.top, 14)
            Text(curation.lede)
                .font(FangguFont.serif(12)).foregroundStyle(CardPalette.ink2).lineSpacing(4).lineLimit(3)
                .padding(.top, 8)
            HStack(alignment: .lastTextBaseline, spacing: 6) {
                Text(verbatim: "\(progress.visited)")
                    .font(FangguFont.serif(40, weight: .medium)).monospacedDigit().foregroundStyle(CardPalette.gold)
                Text("/ \(progress.total) 已见").font(FangguFont.serif(14)).foregroundStyle(CardPalette.ink2)
                Spacer()
                if progress.isComplete {
                    Text("集齐").font(FangguFont.brush(18)).foregroundStyle(CardPalette.red)
                        .padding(.horizontal, 8).padding(.vertical, 2)
                        .overlay(Rectangle().stroke(CardPalette.red, lineWidth: 1.5))
                        .rotationEffect(.degrees(-6))
                }
            }
            .padding(.top, 12)
            CurationProgressBar(progress: progress, height: 4, tint: CardPalette.gold, track: CardPalette.rule)
                .padding(.top, 6)
            VStack(spacing: 10) {
                ForEach(Array(stride(from: 0, to: shown.count, by: 3)), id: \.self) { start in
                    HStack(alignment: .top, spacing: 10) {
                        ForEach(shown[start..<min(start + 3, shown.count)]) { site in
                            VStack(spacing: 4) {
                                ZStack(alignment: .bottomTrailing) {
                                    CardArtwork(site: site, visited: visitedIDs.contains(site.id), padding: 6)
                                    if visitedIDs.contains(site.id) { CardArrivalSeal(size: 9).padding(5) }
                                }
                                .frame(height: 74)
                                Text(site.short.isEmpty ? site.name : site.short)
                                    .font(FangguFont.serif(10)).foregroundStyle(CardPalette.ink)
                                    .lineLimit(1).minimumScaleFactor(0.65)
                            }
                            .frame(maxWidth: .infinity)
                        }
                        if shown[start..<min(start + 3, shown.count)].count < 3 {
                            ForEach(0..<(3 - shown[start..<min(start + 3, shown.count)].count), id: \.self) { _ in Color.clear.frame(maxWidth: .infinity) }
                        }
                    }
                }
            }
            .padding(.top, 14)
            if members.count > shown.count {
                Text("另有 \(members.count - shown.count) 处未在图中列出")
                    .font(FangguFont.mono(9)).foregroundStyle(CardPalette.ink3).padding(.top, 6)
            }
            Spacer(minLength: 8)
            CardFooter()
        }
        .padding(22)
        .frame(width: ShareCardRenderer.size.width, height: ShareCardRenderer.size.height, alignment: .top)
        .background(CardPalette.paper)
    }
}

struct ShareCardSheet: View {
    @EnvironmentObject private var library: LibraryStore
    @Environment(\.dismiss) private var dismiss
    let content: ShareCardContent
    @State private var options = ShareCardOptions()
    @State private var image: UIImage?
    @State private var message: String?
    @State private var messageIsError = false

    private var title: String {
        switch content {
        case .monument(let site): site.short.isEmpty ? site.name : site.short
        case .curation(let list): list.name
        }
    }
    private var review: Review? {
        if case .monument(let site) = content { return library.review(for: site) }
        return nil
    }

    var body: some View {
        NavigationStack {
            ScrollView {
                VStack(alignment: .leading, spacing: 18) {
                    if let image {
                        Image(uiImage: image)
                            .resizable().scaledToFit()
                            .frame(maxWidth: .infinity)
                            .overlay(Rectangle().stroke(Palette.paper.opacity(0.2), lineWidth: 1))
                            .accessibilityLabel("\(title) 访古卡预览")
                            .accessibilityIdentifier("share-card-preview")
                    } else {
                        Text("正在绘制访古卡…").font(FangguFont.serif(13)).foregroundStyle(Palette.paper2)
                            .frame(maxWidth: .infinity, minHeight: 200)
                    }
                    if let review {
                        if !review.text.isEmpty {
                            Toggle("附上短评", isOn: $options.includeReview)
                                .accessibilityIdentifier("share-include-review")
                        }
                        if !review.dimensions.isEmpty {
                            Toggle("附上六维评分", isOn: $options.includeGrades)
                                .accessibilityIdentifier("share-include-grades")
                        }
                    }
                    if let message {
                        Text(message).font(FangguFont.serif(13)).foregroundStyle(messageIsError ? Palette.redText : Palette.gold)
                            .accessibilityIdentifier("share-card-message")
                    }
                    if let image {
                        ShareLink(item: Image(uiImage: image), preview: SharePreview("\(title) · 访古卡", image: Image(uiImage: image))) {
                            Label("分享到微信、Line、X 等应用", systemImage: "square.and.arrow.up").frame(maxWidth: .infinity)
                        }
                        .buttonStyle(FangguOutlineButton())
                        .accessibilityIdentifier("share-card-link")
                        // Side by side while both labels fit on one line; stacked otherwise.
                        ViewThatFits(in: .horizontal) {
                            HStack(spacing: 10) { saveButton(image, singleLine: true); copyButton(image, singleLine: true) }
                            VStack(spacing: 10) { saveButton(image); copyButton(image) }
                        }
                    }
                    Text(footnote).font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineSpacing(5)
                    Text("分享面板会列出已安装的微信、Line、X 等应用；保存到相册只需要“添加照片”权限，不会读取相册。")
                        .font(FangguFont.serif(12)).foregroundStyle(Palette.paper3).lineSpacing(5)
                }
                .font(FangguFont.serif(14))
                .foregroundStyle(Palette.paper)
                .tint(Palette.gold)
                .padding(24)
            }
            .background(Palette.ink.ignoresSafeArea())
            .navigationTitle("访古卡")
            .navigationBarTitleDisplayMode(.inline)
            .toolbar { ToolbarItem(placement: .confirmationAction) { Button("完成") { dismiss() } } }
        }
        .fangguAppearance()
        .task(id: options) { message = nil; render() }
    }

    private func saveButton(_ image: UIImage, singleLine: Bool = false) -> some View {
        Button { save(image) } label: {
            Label("保存到相册", systemImage: "photo.on.rectangle")
                .fixedSize(horizontal: singleLine, vertical: false).frame(maxWidth: .infinity)
        }
        .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
        .accessibilityIdentifier("share-card-save")
    }

    private func copyButton(_ image: UIImage, singleLine: Bool = false) -> some View {
        Button { copy(image) } label: {
            Label("复制图片", systemImage: "doc.on.doc")
                .fixedSize(horizontal: singleLine, vertical: false).frame(maxWidth: .infinity)
        }
        .buttonStyle(FangguOutlineButton(accent: Palette.paper2))
        .accessibilityIdentifier("share-card-copy")
    }

    private var footnote: String {
        switch content {
        case .monument: String(localized: "卡片包含古迹资料、图版、到访日期和你选择附上的评价；私人笔记不会出现在卡片上。")
        case .curation: String(localized: "卡片包含专题说明、各处图版和你的到访进度；私人笔记与评价不会出现在卡片上。")
        }
    }

    private func copy(_ image: UIImage) {
        UIPasteboard.general.image = image
        messageIsError = false
        message = String(localized: "已复制，可直接粘贴到聊天窗口")
        Haptics.soft()
    }

    /// Add-only access writes the card without reading the library; a denied request leaves the sheet usable.
    private func save(_ image: UIImage) {
        PHPhotoLibrary.requestAuthorization(for: .addOnly) { status in
            DispatchQueue.main.async {
                guard status == .authorized || status == .limited else {
                    messageIsError = true
                    message = String(localized: "未获得添加照片的权限，可在系统设置中开启")
                    Haptics.error()
                    return
                }
                guard let data = image.pngData() else {
                    messageIsError = true
                    message = String(localized: "保存失败：无法编码图片")
                    Haptics.error()
                    return
                }
                // PNG keeps the fine line work and text crisp; the JPEG path would soften them.
                PHPhotoLibrary.shared().performChanges({
                    PHAssetCreationRequest.forAsset().addResource(with: .photo, data: data, options: nil)
                }) { saved, error in
                    DispatchQueue.main.async {
                        messageIsError = !saved
                        message = saved ? String(localized: "已保存到相册")
                            : String(localized: "保存失败：\(error?.localizedDescription ?? String(localized: "未知错误"))")
                        if saved { Haptics.success() } else { Haptics.error() }
                    }
                }
            }
        }
    }

    private func render() {
        switch content {
        case .monument(let site):
            image = ShareCardRenderer.render(MonumentShareCard(site: site, record: library.record(for: site), review: library.review(for: site), options: options))
        case .curation(let list):
            let members = library.members(of: list)
            let visited = Set(members.filter { library.record(for: $0).status == .visited }.map(\.id))
            image = ShareCardRenderer.render(CurationShareCard(curation: list, members: members, visitedIDs: visited))
        }
    }
}
