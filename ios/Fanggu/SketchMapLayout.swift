import Foundation
import CoreGraphics

struct SketchMapPlace {
    let id: String
    let latitude: Double
    let longitude: Double
}

struct SketchMapCluster: Identifiable {
    let placeIDs: [String]
    let point: CGPoint
    var id: String { placeIDs[0] }
}

struct SketchMapProjection {
    let frame: CGRect
    let latitude: ClosedRange<Double>
    let longitude: ClosedRange<Double>
    let latScale: Double
    let lonScale: Double
    let centerLat: Double
    let centerLon: Double
    var latitudeStep: Double { Self.tickStep(span: latitude.upperBound - latitude.lowerBound, count: 4) }
    var longitudeStep: Double { Self.tickStep(span: longitude.upperBound - longitude.lowerBound, count: 4) }

    init(size: CGSize, places: [SketchMapPlace]) {
        // Use the actual available width, including on small phones and split views.
        let width = max(Double(size.width), 100)
        let height = max(Double(size.height), 100)
        frame = CGRect(x: 42, y: 24, width: width - 62, height: height - 54)
        // Keep recognizable coastlines in view even for a single inland visit.
        let lat0 = min(20, places.map(\.latitude).min() ?? 20)
        let lat1 = max(45, places.map(\.latitude).max() ?? 45)
        let lon0 = min(100, places.map(\.longitude).min() ?? 100)
        let lon1 = max(142, places.map(\.longitude).max() ?? 142)
        centerLat = (lat0 + lat1) / 2
        centerLon = (lon0 + lon1) / 2
        let cosLat = max(0.1, cos(centerLat * .pi / 180))
        // Leave room for the entire 44pt touch target at each geographic extreme.
        let scale = min((frame.height - 32) / max(4, lat1 - lat0),
                        (frame.width - 32) / (max(4, lon1 - lon0) * cosLat))
        latScale = scale
        lonScale = scale * cosLat
        latitude = (centerLat - frame.height / (2 * scale))...(centerLat + frame.height / (2 * scale))
        longitude = (centerLon - frame.width / (2 * lonScale))...(centerLon + frame.width / (2 * lonScale))
    }

    func point(latitude: Double, longitude: Double) -> CGPoint {
        CGPoint(x: frame.midX + (longitude - centerLon) * lonScale,
                y: frame.midY - (latitude - centerLat) * latScale)
    }

    func clusters(_ places: [SketchMapPlace]) -> [SketchMapCluster] {
        var result = places.sorted { $0.id < $1.id }.map {
            SketchMapCluster(placeIDs: [$0.id], point: point(latitude: $0.latitude, longitude: $0.longitude))
        }
        // Merge the nearest markers until their touch targets no longer overlap.
        // Weighted centroids preserve the geographic center of every group.
        while result.count > 1 {
            var closest: (Int, Int)?
            var distance = CGFloat.infinity
            for i in result.indices {
                for j in result.indices where j > i {
                    let delta = hypot(result[i].point.x - result[j].point.x, result[i].point.y - result[j].point.y)
                    // Named markers are 66 × 44pt, with space between labels.
                    if abs(result[i].point.x - result[j].point.x) < 76,
                       abs(result[i].point.y - result[j].point.y) < 50,
                       delta < distance { closest = (i, j); distance = delta }
                }
            }
            guard let (i, j) = closest else { break }
            let a = result[i], b = result[j]
            let countA = CGFloat(a.placeIDs.count), countB = CGFloat(b.placeIDs.count)
            let center = CGPoint(x: (a.point.x * countA + b.point.x * countB) / (countA + countB),
                                 y: (a.point.y * countA + b.point.y * countB) / (countA + countB))
            result[i] = SketchMapCluster(placeIDs: (a.placeIDs + b.placeIDs).sorted(), point: center)
            result.remove(at: j)
        }
        return result
    }

    private static func tickStep(span: Double, count: Double) -> Double {
        let target = span / count
        let base = pow(10, floor(log10(max(target, 0.01))))
        return ([1.0, 2, 5, 10].first { $0 * base >= target } ?? 10) * base
    }
}
