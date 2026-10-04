import Foundation
import Security

struct CommunityAPI {
    private struct FailureBody: Decodable { let error: String; let current: CommunityReview? }
    let baseURL: URL
    var session: URLSession = .shared

    func request<T: Decodable>(_ path: String, method: String = "GET", token: String? = nil,
                               body: Data? = nil, query: [URLQueryItem] = []) async throws -> T {
        var components = URLComponents(url: baseURL.appendingPathComponent("v1/" + path), resolvingAgainstBaseURL: false)!
        if !query.isEmpty { components.queryItems = query }
        var request = URLRequest(url: components.url!)
        request.httpMethod = method
        request.timeoutInterval = 15
        request.cachePolicy = .reloadIgnoringLocalCacheData
        request.setValue("application/json", forHTTPHeaderField: "Accept")
        if let token { request.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization") }
        if let body { request.httpBody = body; request.setValue("application/json", forHTTPHeaderField: "Content-Type") }
        do {
            let (data, response) = try await session.data(for: request)
            guard let http = response as? HTTPURLResponse else { throw CommunityFailure(status: 0, message: "社区服务返回了无效响应。") }
            guard (200..<300).contains(http.statusCode) else {
                let failure = try? JSONDecoder().decode(FailureBody.self, from: data)
                throw CommunityFailure(status: http.statusCode, message: failure?.error ?? "社区暂时不可用，请稍后重试。", current: failure?.current)
            }
            return try JSONDecoder().decode(T.self, from: data)
        } catch let failure as CommunityFailure { throw failure }
        catch is CancellationError { throw CancellationError() }
        catch let error as URLError where error.code == .cancelled { throw CancellationError() }
        catch { throw CommunityFailure(status: 0, message: "暂时连接不上社区，请检查网络或服务地址后重试。") }
    }

    static func encode<T: Encodable>(_ value: T) throws -> Data { try JSONEncoder().encode(value) }
}

enum CommunityCredential {
    private static let service = "com.fanggu.community.session"
    static func read(server: String) -> String? {
        let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service, kSecAttrAccount as String: server,
            kSecReturnData as String: true, kSecMatchLimit as String: kSecMatchLimitOne]
        var result: CFTypeRef?
        guard SecItemCopyMatching(query as CFDictionary, &result) == errSecSuccess, let data = result as? Data else { return nil }
        return String(data: data, encoding: .utf8)
    }
    static func save(_ token: String?, server: String) throws {
        let query: [String: Any] = [kSecClass as String: kSecClassGenericPassword,
            kSecAttrService as String: service, kSecAttrAccount as String: server]
        guard let token else { SecItemDelete(query as CFDictionary); return }
        let values: [String: Any] = [kSecValueData as String: Data(token.utf8),
            kSecAttrAccessible as String: kSecAttrAccessibleAfterFirstUnlockThisDeviceOnly]
        let update = SecItemUpdate(query as CFDictionary, values as CFDictionary)
        if update == errSecItemNotFound {
            guard SecItemAdd(query.merging(values) { _, new in new } as CFDictionary, nil) == errSecSuccess else {
                throw CommunityFailure(status: 0, message: "无法安全保存登录状态，请重试。")
            }
        } else if update != errSecSuccess {
            throw CommunityFailure(status: 0, message: "无法安全保存登录状态，请重试。")
        }
    }
}
