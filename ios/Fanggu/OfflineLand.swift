import Foundation

/// Natural Earth 1:110m land, v5.1.2. See Resources/MAP-SOURCES.md.
struct OfflineLand: Decodable {
    struct Feature: Decodable {
        struct Geometry: Decodable { let coordinates: [[[Double]]] }
        let geometry: Geometry
    }
    let features: [Feature]
    static let shared: OfflineLand? = {
        guard let url = Bundle.main.url(forResource: "ne_110m_land", withExtension: "geojson"),
              let data = try? Data(contentsOf: url) else { return nil }
        return try? JSONDecoder().decode(OfflineLand.self, from: data)
    }()
}
