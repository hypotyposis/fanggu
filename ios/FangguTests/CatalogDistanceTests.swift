import CoreLocation
import XCTest
@testable import Fanggu

final class CatalogDistanceTests: XCTestCase {
    private func temporaryLibrary() -> URL {
        let directory = FileManager.default.temporaryDirectory
            .appendingPathComponent("fanggu-distance-\(UUID().uuidString)", isDirectory: true)
        try? FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        return directory.appendingPathComponent("library.json")
    }

    func testLabelsUseMetresBelowOneKilometreAndWholeKilometresFarAway() {
        XCTAssertEqual(CatalogDistance.label(648), "距此地约 650 m")
        XCTAssertEqual(CatalogDistance.label(4), "距此地约 10 m")
        XCTAssertEqual(CatalogDistance.label(2_340), "距此地约 2.3 km")
        XCTAssertEqual(CatalogDistance.label(99_940), "距此地约 99.9 km")
        XCTAssertEqual(CatalogDistance.label(120_400), "距此地约 120 km")
        XCTAssertEqual(CatalogDistance.label(11_044_300), "距此地约 \(11_044.formatted()) km", "far distances group digits")
        XCTAssertTrue(CatalogDistance.label(5_000).contains("约"), "both coordinate kinds are display points")
    }

    func testApproximateFixesAreFlaggedNotHidden() {
        let now = Date()
        let coordinate = CLLocationCoordinate2D(latitude: 34.5, longitude: 112.9)
        let fresh = CLLocation(coordinate: coordinate, altitude: 0, horizontalAccuracy: 50, verticalAccuracy: -1, timestamp: now)
        let rough = CLLocation(coordinate: coordinate, altitude: 0, horizontalAccuracy: 2_500, verticalAccuracy: -1, timestamp: now)
        let stale = CLLocation(coordinate: coordinate, altitude: 0, horizontalAccuracy: 50, verticalAccuracy: -1, timestamp: now.addingTimeInterval(-900))
        XCTAssertFalse(CatalogDistance.isApproximate(fresh, now: now))
        XCTAssertTrue(CatalogDistance.isApproximate(rough, now: now))
        XCTAssertTrue(CatalogDistance.isApproximate(stale, now: now))
    }

    func testNotesExplainDeniedPendingFailedImpreciseAndApproximateStates() {
        let denied = "未授权定位，可在系统设置中开启；其他排序与筛选不受影响。"
        XCTAssertEqual(CatalogDistance.note(authorization: .denied, hasLocation: false, failed: false, approximate: false, precise: true), denied)
        XCTAssertEqual(CatalogDistance.note(authorization: .restricted, hasLocation: true, failed: false, approximate: false, precise: true), denied,
                       "a restricted device explains itself even if an old fix exists")
        XCTAssertEqual(CatalogDistance.note(authorization: .notDetermined, hasLocation: false, failed: false, approximate: false, precise: true), "正在请求定位权限…")
        XCTAssertEqual(CatalogDistance.note(authorization: .authorizedWhenInUse, hasLocation: false, failed: false, approximate: false, precise: true), "正在获取位置…")
        XCTAssertEqual(CatalogDistance.note(authorization: .authorizedWhenInUse, hasLocation: false, failed: true, approximate: false, precise: true), "暂时无法获取位置，已按原顺序显示。")
        XCTAssertEqual(CatalogDistance.note(authorization: .authorizedAlways, hasLocation: true, failed: false, approximate: false, precise: false), "系统已关闭精确位置，距离按大致位置计算。")
        XCTAssertEqual(CatalogDistance.note(authorization: .authorizedWhenInUse, hasLocation: true, failed: false, approximate: true, precise: true), "位置约略，距离仅供参考。")
        XCTAssertNil(CatalogDistance.note(authorization: .authorizedWhenInUse, hasLocation: true, failed: false, approximate: false, precise: true))
    }

    @MainActor func testSortIsNearestFirstAndKeepsCatalogueOrderForSharedTownMarkers() throws {
        let store = LibraryStore(fileURL: temporaryLibrary())
        let located = try XCTUnwrap(store.monuments.first { $0.nearbyTarget != nil })
        let here = CatalogDistance.location(of: located)
        let shared = try XCTUnwrap(Dictionary(grouping: store.monuments.filter { $0.nearbyTarget == nil }, by: \.placeKey)
            .values.first { $0.count >= 2 && $0[0].placeKey != located.placeKey })
        let pair = Array(shared.prefix(2))
        XCTAssertEqual(CatalogDistance.metres(from: here, to: pair[0]), CatalogDistance.metres(from: here, to: pair[1]), accuracy: 0.001,
                       "monuments on one town marker share a distance")
        let sorted = CatalogDistance.sorted([pair[1], pair[0], located], from: here)
        XCTAssertEqual(sorted.map(\.id), [located.id, pair[1].id, pair[0].id],
                       "nearest first; ties keep the incoming (year) order")
        XCTAssertEqual(CatalogDistance.metres(from: here, to: located), 0, accuracy: 0.001)
    }

    @MainActor func testHereNeedsAMonumentCoordinateWithinTwoKilometres() throws {
        let store = LibraryStore(fileURL: temporaryLibrary())
        let located = try XCTUnwrap(store.monuments.first { $0.nearbyTarget != nil })
        let at = CatalogDistance.location(of: located)
        XCTAssertTrue(CatalogDistance.isHere(located, from: at))
        let farther = CLLocation(latitude: at.coordinate.latitude + 0.03, longitude: at.coordinate.longitude) // about 3.3 km north
        XCTAssertFalse(CatalogDistance.isHere(located, from: farther))
        let townOnly = try XCTUnwrap(store.monuments.first { $0.nearbyTarget == nil })
        let marker = CLLocation(latitude: townOnly.latitude, longitude: townOnly.longitude)
        XCTAssertEqual(CatalogDistance.metres(from: marker, to: townOnly), 0, accuracy: 0.001, "the town marker still yields a distance")
        XCTAssertFalse(CatalogDistance.isHere(townOnly, from: marker), "a shared town marker never says 就在附近")
    }
}
