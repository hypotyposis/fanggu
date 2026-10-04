const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync, spawnSync } = require('node:child_process');
const { mkdtempSync, writeFileSync, rmSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join, resolve } = require('node:path');

test('native map fits real phone widths and dense markers retain every place without overlapping touch targets', t => {
  if (process.platform !== 'darwin' || spawnSync('xcrun', ['--find', 'swiftc']).status !== 0) {
    t.skip('Native map geometry requires the macOS Swift toolchain');
    return;
  }
  const directory = mkdtempSync(join(tmpdir(), 'fanggu-map-test-'));
  try {
    writeFileSync(join(directory, 'main.swift'), `
import Foundation
import CoreGraphics
struct Site: Decodable { let placeKey: String; let latitude: Double; let longitude: Double }
let sites = try JSONDecoder().decode([Site].self, from: Data(contentsOf: URL(fileURLWithPath: CommandLine.arguments[1])))
let places = Dictionary(grouping: sites, by: \\.placeKey).map { key, sites in
    SketchMapPlace(id: key, latitude: sites[0].latitude, longitude: sites[0].longitude)
}
for width in [272.0, 327, 345, 354, 382, 720] {
    let projection = SketchMapProjection(size: CGSize(width: width, height: 280), places: places)
    precondition(projection.frame.maxX <= width)
    precondition(projection.latitude.lowerBound > -30 && projection.latitude.upperBound < 70, "Keep the China/Japan/Southeast Asia map within its regional latitude extent")
    precondition((projection.longitude.upperBound - projection.longitude.lowerBound) / projection.longitudeStep <= 4.1)
    for place in places {
        let point = projection.point(latitude: place.latitude, longitude: place.longitude)
        precondition(projection.frame.contains(point))
        precondition(point.x >= 22 && point.x <= width - 22)
        precondition(point.y >= 22 && point.y <= 280 - 22)
    }
    let clusters = projection.clusters(places)
    precondition(clusters.flatMap(\\.placeIDs).sorted() == places.map(\\.id).sorted(), "No visited place may disappear")
    precondition(clusters.map(\\.placeIDs) == projection.clusters(places.reversed()).map(\\.placeIDs), "Input order must not change groups")
    for i in clusters.indices {
        for j in clusters.indices where j > i {
            precondition(hypot(clusters[i].point.x - clusters[j].point.x, clusters[i].point.y - clusters[j].point.y) >= 46)
            precondition(abs(clusters[i].point.x - clusters[j].point.x) >= 76 || abs(clusters[i].point.y - clusters[j].point.y) >= 50, "Named map markers must not overlap")
        }
    }
    for cluster in clusters {
        precondition(cluster.point.x >= 33 && cluster.point.x <= width - 33, "Keep full 66pt labels inside the viewport")
    }
}
for subset in [[], Array(places.prefix(1)), Array(places.prefix(2))] {
    let projection = SketchMapProjection(size: CGSize(width: 272, height: 280), places: subset)
    precondition(projection.latScale.isFinite && projection.latScale > 0)
    precondition(projection.longitude.contains(142) && projection.longitude.contains(100), "Single inland visits still need coastal context")
    precondition(projection.clusters(subset).flatMap(\\.placeIDs).sorted() == subset.map(\\.id).sorted())
}
print("Map geometry and cluster coverage passed")
`);
    execFileSync('xcrun', ['swiftc', resolve('ios/Fanggu/SketchMapLayout.swift'), join(directory, 'main.swift'), '-o', join(directory, 'check')], { stdio: 'pipe' });
    const result = execFileSync(join(directory, 'check'), [resolve('ios/Fanggu/Resources/catalog.json')], { encoding: 'utf8' });
    assert.match(result, /coverage passed/);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});
