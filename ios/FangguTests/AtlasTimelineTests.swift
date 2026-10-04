import XCTest
@testable import Fanggu

final class AtlasTimelineTests: XCTestCase {
    @MainActor func testEveryRegionalPeriodHasSeparatedNodesAndCompleteCoverage() throws {
        let url = FileManager.default.temporaryDirectory.appendingPathComponent("atlas-\(UUID().uuidString)/library.json")
        let store = LibraryStore(fileURL: url)
        let catalog = store.timeline
        var allSites: [String] = []
        for lane in TimelineCatalog.tracks.indices {
            allSites += catalog.sites(lane: lane, period: "all").map(\.id)
            for (period, _) in catalog.periods {
                let sites = catalog.sites(lane: lane, period: period)
                let groups = catalog.groups(lane: lane, period: period)
                XCTAssertEqual(groups.flatMap(\.sites).map(\.id), sites.map(\.id))
                for pair in zip(groups, groups.dropFirst()) {
                    XCTAssertGreaterThanOrEqual(pair.1.x - pair.0.x, 48, "44pt targets must never overlap, including after centroid shifts")
                }
                for group in groups {
                    XCTAssertTrue(group.sites.allSatisfy { TimelineCatalog.laneIndex($0) == lane })
                    XCTAssertTrue(period == "all" || group.sites.allSatisfy { $0.dynasty == period })
                    XCTAssertGreaterThanOrEqual(group.x, 22)
                    XCTAssertLessThanOrEqual(group.x, TimelineCatalog.width - 22)
                }
            }
        }
        XCTAssertEqual(allSites.sorted(), store.monuments.map(\.id).sorted())
        XCTAssertFalse(FileManager.default.fileExists(atPath: url.path), "Browsing the timeline must not create personal records")
    }

    func testTimelineScaleIsUniformAcrossAllCenturies() {
        for year in stride(from: 0, to: 2000, by: 100) {
            XCTAssertEqual(TimelineCatalog.x(year + 100) - TimelineCatalog.x(year), 70, accuracy: 0.001)
        }
    }

    func testOfflineLandIsBundledAndContainsValidClosedPolygons() throws {
        let land = try XCTUnwrap(OfflineLand.shared)
        XCTAssertEqual(land.features.count, 127)
        for feature in land.features {
            for ring in feature.geometry.coordinates {
                XCTAssertGreaterThanOrEqual(ring.count, 4)
                XCTAssertEqual(ring.first, ring.last)
                for point in ring {
                    XCTAssertEqual(point.count, 2)
                    XCTAssertTrue((-180...180).contains(point[0]))
                    XCTAssertTrue((-90...90).contains(point[1]))
                }
            }
        }
    }
}
