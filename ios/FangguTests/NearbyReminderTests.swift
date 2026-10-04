import CoreLocation
import XCTest
@testable import Fanggu

final class NearbyReminderTests: XCTestCase {
    private let origin = CLLocation(latitude: 34.5, longitude: 112.9)

    /// One degree of latitude is about 111,195 m everywhere.
    private func target(_ id: String, metresNorth: Double) -> NearbyTarget {
        NearbyTarget(id: id, name: id, latitude: 34.5 + metresNorth / 111_195, longitude: 112.9)
    }

    private func temporaryLibrary() -> URL {
        let directory = FileManager.default.temporaryDirectory
            .appendingPathComponent("fanggu-nearby-\(UUID().uuidString)", isDirectory: true)
        try? FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
        return directory.appendingPathComponent("library.json")
    }

    func testHitsKeepOnlyTargetsInsideThreeKilometresNearestFirst() {
        let targets = [target("far", metresNorth: 3200), target("near", metresNorth: 800), target("edge", metresNorth: 2900)]
        let hits = NearbyPlanner.hits(targets, from: origin)
        XCTAssertEqual(hits.map(\.target.id), ["near", "edge"])
        XCTAssertEqual(hits[0].distance, 800, accuracy: 5)
        XCTAssertTrue(NearbyPlanner.hits([], from: origin).isEmpty)
    }

    func testPlanRegistersTheTwentyNearestAsEntryOnlyRegions() {
        let targets = (0..<30).map { target("t\($0)", metresNorth: Double(30 - $0) * 500) }
        let planned = NearbyPlanner.plan(targets, around: origin)
        XCTAssertEqual(planned.count, NearbyPlanner.regionLimit)
        XCTAssertEqual(planned.first?.id, "t29", "nearest first")
        XCTAssertEqual(planned.last?.id, "t10")
        XCTAssertFalse(planned.contains { $0.id == "t0" }, "the farthest targets wait until the user moves")
        let region = NearbyPlanner.region(for: planned[0])
        XCTAssertEqual(region.radius, 3000)
        XCTAssertTrue(region.notifyOnEntry)
        XCTAssertFalse(region.notifyOnExit)
        XCTAssertEqual(NearbyPlanner.targetID(of: region), "t29")
        let foreign = CLCircularRegion(center: origin.coordinate, radius: 10, identifier: "other-app-region")
        XCTAssertNil(NearbyPlanner.targetID(of: foreign), "only our own regions are ever touched")
    }

    func testReminderRepeatsOnlyAfterADay() {
        let now = Date()
        XCTAssertTrue(NearbyPlanner.shouldRemind("a", lastReminded: [:], now: now))
        XCTAssertFalse(NearbyPlanner.shouldRemind("a", lastReminded: ["a": now.addingTimeInterval(-3600)], now: now))
        XCTAssertTrue(NearbyPlanner.shouldRemind("a", lastReminded: ["a": now.addingTimeInterval(-NearbyPlanner.repeatInterval)], now: now))
        XCTAssertTrue(NearbyPlanner.shouldRemind("b", lastReminded: ["a": now], now: now))
    }

    @MainActor func testCatalogueTargetsExcludeVisitedAndTownLevelMarkers() throws {
        let url = temporaryLibrary()
        defer { try? FileManager.default.removeItem(at: url.deletingLastPathComponent()) }
        let store = LibraryStore(fileURL: url)
        let located = store.monuments.filter { $0.nearbyTarget != nil }
        XCTAssertFalse(located.isEmpty, "the exported catalogue carries monument-level coordinates")
        XCTAssertTrue(store.monuments.contains { $0.nearbyTarget == nil }, "town-level markers alone never qualify")
        for site in located {
            let marker = CLLocation(latitude: site.latitude, longitude: site.longitude)
            XCTAssertLessThan(site.nearbyTarget!.location.distance(from: marker), 60_000, site.id)
        }
        let isVisited: (Monument) -> Bool = { store.record(for: $0).status == .visited }
        let site = try XCTUnwrap(located.first { !isVisited($0) })
        let before = NearbyPlanner.targets(store.monuments, isVisited: isVisited)
        XCTAssertTrue(before.contains { $0.id == site.id })
        XCTAssertTrue(store.recordToday(for: site))
        let after = NearbyPlanner.targets(store.monuments, isVisited: isVisited)
        XCTAssertFalse(after.contains { $0.id == site.id }, "a visited monument stops being a reminder target")
        XCTAssertEqual(before.count - after.count, 1)
        XCTAssertEqual(store.record(for: site).visitedOn, LibraryStore.today(), "planning never alters the record it read")
    }
}
