import Foundation

func communityScoreText(_ score: Double) -> String {
    String(format: "%.1f", (score * 10).rounded(.toNearestOrAwayFromZero) / 10)
}

struct CommunityUser: Codable, Identifiable, Equatable {
    let id: String
    var handle: String
    var nickname: String
    var bio: String
    var avatar: Int
    var isDemo: Bool
    var createdAt: String
    var reviewCount: Int
    var followingCount: Int
    var followerCount: Int
    var isFollowing: Bool
    var followsYou: Bool
    var isBlocked: Bool
}

struct CommunityReview: Codable, Identifiable, Equatable {
    let id: String
    let siteID: String
    let dimensions: DimensionScores
    let text: String
    let revision: Int
    let updatedAt: String
    let createdAt: String
    let deleted: Bool
    let hidden: Bool
    let score: Double?
    var author: CommunityUser

    var local: Review { Review(dimensions: dimensions, text: text, updatedAt: updatedAt) }
}

struct CommunitySummary: Codable, Identifiable {
    let siteID: String
    let reviewCount: Int
    let ratingCount: Int
    let textCount: Int
    let minimumRatings: Int
    let score: Double?
    let dimensions: [String: Double]
    var id: String { siteID }
}

struct CommunityPage: Decodable {
    var items: [CommunityReview]
    var nextCursor: String?
}
struct CommunityUsers: Decodable { let items: [CommunityUser] }
struct CommunityOwnReviews: Decodable { let items: [CommunityReview] }
struct CommunitySession: Codable { let token: String; let user: CommunityUser }
struct CommunityOK: Decodable { let ok: Bool }
struct CommunityDiscovery: Codable {
    var sites: [CommunitySummary]
    let memberCount: Int
    let reviewCount: Int
    let hasDemoContent: Bool
}

struct CommunityFailure: Error, LocalizedError {
    let status: Int
    let message: String
    var current: CommunityReview? = nil
    var errorDescription: String? { message }

    /// The service writes its errors in Chinese. Each message it can send has a catalog entry; an
    /// unknown one is shown as is in Chinese and as a general failure in English and Japanese.
    static func localized(_ serverMessage: String?) -> String {
        let fallback = String(localized: "社区暂时不可用，请稍后重试。")
        guard let serverMessage else { return fallback }
        let missing = "\u{1}"
        let translated = Bundle.main.localizedString(forKey: serverMessage, value: missing, table: nil)
        if translated != missing { return translated }
        return AppLanguage.current == .simplifiedChinese ? serverMessage : fallback
    }
}

struct ReviewSyncPayload: Codable, Equatable {
    var dimensions: DimensionScores
    var text: String
    var baseRevision: Int
    var mutationID: String
}

struct ReviewSyncConflict: Codable, Identifiable {
    let siteID: String
    let remote: CommunityReview
    var id: String { siteID }
}

struct CommunityJournal: Codable {
    var reviews: [String: Review] = [:]
    var revisions: [String: Int] = [:]
    var acknowledged: [String: Review] = [:]
    var pending: [String: ReviewSyncPayload] = [:]
    var conflicts: [String: ReviewSyncConflict] = [:]
}

struct CommunityDisk: Codable {
    var owner: String?
    var accounts: [String: CommunityJournal] = [:]
    var user: CommunityUser?
    var discovery: CommunityDiscovery?
    var cachedReviews: [CommunityReview] = []
    var cachedAt: Date?
    var activation: CommunityActivation?
}

/// Makes an account transition recoverable across the two atomic local files.
struct CommunityActivation: Codable {
    let previous: [String: Review]
    let target: [String: Review]
}

extension ReviewDimension {
    /// Two characters fit the six-column strips in Chinese and Japanese; the English titles are single words.
    var shortTitle: String { AppLanguage.current == .english ? title : String(title.prefix(2)) }
}

extension Review {
    /// The community score's input: only a complete six-axis review counts there, unlike the
    /// personal overall score, which averages whichever axes are rated.
    var completeScore: Double? {
        guard dimensions.count == ReviewDimension.allCases.count else { return nil }
        return Double(ReviewDimension.allCases.reduce(0) { $0 + (dimensions[$1] ?? 0) }) / 6
    }
    var hasPublicContent: Bool { !dimensions.isEmpty || !text.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty }
    func hasSamePublicContent(as other: Review) -> Bool { dimensions == other.dimensions && text == other.text }
}
