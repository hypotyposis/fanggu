import Combine
import CoreLocation
import Foundation
import UIKit
import UserNotifications

/// A monument with a recorded monument-level coordinate. Town-level map markers never qualify.
struct NearbyTarget: Equatable, Identifiable {
    let id: String
    let name: String
    let latitude: Double
    let longitude: Double

    var location: CLLocation { CLLocation(latitude: latitude, longitude: longitude) }
}

/// Pure planning rules for the opt-in reminder, kept apart from CoreLocation so they can be unit tested.
enum NearbyPlanner {
    static let radius: CLLocationDistance = 3000
    /// iOS lets one app monitor at most 20 regions at a time.
    static let regionLimit = 20
    static let repeatInterval: TimeInterval = 24 * 60 * 60
    static let regionPrefix = "fanggu.nearby."

    struct Hit: Equatable {
        let target: NearbyTarget
        let distance: CLLocationDistance
    }

    /// Unvisited monuments that carry their own coordinate.
    static func targets(_ monuments: [Monument], isVisited: (Monument) -> Bool) -> [NearbyTarget] {
        monuments.compactMap { isVisited($0) ? nil : $0.nearbyTarget }
    }

    /// Targets inside the radius, nearest first.
    static func hits(_ targets: [NearbyTarget], from location: CLLocation) -> [Hit] {
        targets.map { Hit(target: $0, distance: $0.location.distance(from: location)) }
            .filter { $0.distance <= radius }
            .sorted { $0.distance < $1.distance }
    }

    /// The nearest targets to keep registered as geofences around the current position.
    static func plan(_ targets: [NearbyTarget], around location: CLLocation) -> [NearbyTarget] {
        targets.map { ($0, $0.location.distance(from: location)) }
            .sorted { $0.1 < $1.1 }
            .prefix(regionLimit)
            .map(\.0)
    }

    static func region(for target: NearbyTarget) -> CLCircularRegion {
        let center = CLLocationCoordinate2D(latitude: target.latitude, longitude: target.longitude)
        let region = CLCircularRegion(center: center, radius: radius, identifier: regionPrefix + target.id)
        region.notifyOnEntry = true
        region.notifyOnExit = false
        return region
    }

    static func targetID(of region: CLRegion) -> String? {
        region.identifier.hasPrefix(regionPrefix) ? String(region.identifier.dropFirst(regionPrefix.count)) : nil
    }

    /// One reminder per monument per day.
    static func shouldRemind(_ id: String, lastReminded: [String: Date], now: Date = .now) -> Bool {
        guard let last = lastReminded[id] else { return true }
        return now.timeIntervalSince(last) >= repeatInterval
    }
}

/// Distance presentation for the catalogue: the 按距离 sort, the 附近 filter and the 就在附近 hint.
/// Everything is computed on device from bundled coordinates; no network is involved.
enum CatalogDistance {
    static let nearbyRadius: CLLocationDistance = 30_000
    static let hereRadius: CLLocationDistance = 2_000

    /// The monument's own point when recorded, otherwise its town-level map marker.
    static func location(of site: Monument) -> CLLocation {
        site.nearbyTarget?.location ?? CLLocation(latitude: site.latitude, longitude: site.longitude)
    }

    static func metres(from location: CLLocation, to site: Monument) -> CLLocationDistance {
        self.location(of: site).distance(from: location)
    }

    /// Always "约": both kinds of coordinate are display points, not survey results.
    static func label(_ metres: CLLocationDistance) -> String {
        if metres < 1000 {
            let tens: Int = Int((metres / 10).rounded()) * 10
            return "距此地约 \(max(10, tens)) m"
        }
        if metres < 100_000 {
            let kilometres: String = String(format: "%.1f", metres / 1000)
            return "距此地约 \(kilometres) km"
        }
        let whole: Int = Int((metres / 1000).rounded())
        return "距此地约 \(whole.formatted()) km"
    }

    /// Nearest first; equal distances keep the incoming order, which is the catalogue's year order.
    static func sorted(_ sites: [Monument], from location: CLLocation) -> [Monument] {
        struct Ranked {
            let offset: Int
            let site: Monument
            let metres: CLLocationDistance
        }
        var ranked: [Ranked] = []
        ranked.reserveCapacity(sites.count)
        for (offset, site) in sites.enumerated() {
            ranked.append(Ranked(offset: offset, site: site, metres: metres(from: location, to: site)))
        }
        ranked.sort { lhs, rhs in
            if lhs.metres == rhs.metres { return lhs.offset < rhs.offset }
            return lhs.metres < rhs.metres
        }
        return ranked.map(\.site)
    }

    /// Only a monument-level coordinate can say "right here"; a shared town marker would flag a whole city.
    static func isHere(_ site: Monument, from location: CLLocation) -> Bool {
        guard let target = site.nearbyTarget else { return false }
        return target.location.distance(from: location) <= hereRadius
    }

    /// Indoors or stale fixes are shown as approximate rather than hidden.
    static func isApproximate(_ location: CLLocation, now: Date = .now) -> Bool {
        location.horizontalAccuracy < 0 || location.horizontalAccuracy > 1000
            || now.timeIntervalSince(location.timestamp) > 300
    }

    /// What the catalogue says above the list while a distance feature is active; nil when nothing needs saying.
    static func note(authorization: CLAuthorizationStatus, hasLocation: Bool, failed: Bool,
                     approximate: Bool, precise: Bool) -> String? {
        switch authorization {
        case .denied, .restricted: return "未授权定位，可在系统设置中开启；其他排序与筛选不受影响。"
        case .notDetermined: return "正在请求定位权限…"
        default: break
        }
        if !hasLocation { return failed ? "暂时无法获取位置，已按原顺序显示。" : "正在获取位置…" }
        if !precise { return "系统已关闭精确位置，距离按大致位置计算。" }
        return approximate ? "位置约略，距离仅供参考。" : nil
    }
}

/// The app's single owner of CoreLocation.
///
/// Foreground use (distance sort, 附近, 就在附近) asks for "while using" only when the user first
/// picks one of those controls. The opt-in nearby reminder adds geofences, local notifications and
/// the "always" upgrade. The centre reads personal records and never writes them; it persists only
/// the reminder toggle and the last reminder time per monument, never a location.
@MainActor final class LocationCenter: NSObject, ObservableObject {
    static let enabledKey = "fanggu.nearbyReminder.enabled"
    static let remindedKey = "fanggu.nearbyReminder.reminded"
    static let foregroundWait: Duration = .seconds(10)

    @Published private(set) var enabled: Bool
    @Published private(set) var authorization: CLAuthorizationStatus
    /// nil until the system has answered; false means the user declined notifications.
    @Published private(set) var notificationsAuthorized: Bool?
    @Published private(set) var monitoredIDs: [String] = []
    /// Set when the user taps a reminder; the catalogue opens that monument and clears it.
    @Published var pendingMonumentID: String?
    /// Latest fix, memory only; nil until a distance feature or the reminder asked for one.
    @Published private(set) var currentLocation: CLLocation?
    /// True when a foreground request failed or produced no fix within the wait.
    @Published private(set) var locationFailed = false
    /// False when the user turned off Precise Location for the app; distances are then rough by design.
    @Published private(set) var preciseLocation = true

    private let library: LibraryStore
    private let manager: CLLocationManager
    private let defaults: UserDefaults
    private var lastReminded: [String: Date]
    private var foregroundWanted = false
    private var foregroundTimeout: Task<Void, Never>?
    private var cancellables: Set<AnyCancellable> = []

    init(library: LibraryStore, defaults: UserDefaults = .standard) {
        let manager = CLLocationManager()
        self.library = library
        self.manager = manager
        self.defaults = defaults
        enabled = defaults.bool(forKey: Self.enabledKey)
        lastReminded = (defaults.dictionary(forKey: Self.remindedKey) as? [String: Double] ?? [:])
            .mapValues(Date.init(timeIntervalSince1970:))
        authorization = manager.authorizationStatus
        preciseLocation = manager.accuracyAuthorization == .fullAccuracy
        super.init()
        manager.delegate = self
        manager.desiredAccuracy = kCLLocationAccuracyHundredMeters
        UNUserNotificationCenter.current().delegate = self
        refreshNotificationAuthorization()
        // A monument that becomes visited leaves the plan; nothing here writes back to the store.
        library.$data.dropFirst().sink { [weak self] _ in self?.replan() }.store(in: &cancellables)
        if enabled { startMonitoring() }
    }

    /// Monuments that carry their own coordinate, visited or not; the setting explains this scope.
    var targetCount: Int { library.monuments.filter { $0.nearbyTarget != nil }.count }

    var locationAllowed: Bool { authorization == .authorizedAlways || authorization == .authorizedWhenInUse }

    var locationDenied: Bool { authorization == .denied || authorization == .restricted }

    var isApproximate: Bool { currentLocation.map { CatalogDistance.isApproximate($0) } ?? false }

    // MARK: Foreground distance features

    /// Called when the user picks 按距离 or 附近, and again when the scene returns to the foreground.
    /// Prompts only while authorization is undetermined; a denied state never re-prompts.
    func requestForegroundLocation() {
        foregroundWanted = true
        locationFailed = false
        switch manager.authorizationStatus {
        case .notDetermined: manager.requestWhenInUseAuthorization()
        case .authorizedWhenInUse, .authorizedAlways: refreshLocation()
        default: break
        }
    }

    private func refreshLocation() {
        manager.requestLocation()
        foregroundTimeout?.cancel()
        foregroundTimeout = Task { [weak self] in
            try? await Task.sleep(for: Self.foregroundWait)
            guard !Task.isCancelled, let self, self.currentLocation == nil else { return }
            self.locationFailed = true
        }
    }

    // MARK: Opt-in reminder

    func setEnabled(_ value: Bool) {
        guard value != enabled else { return }
        enabled = value
        defaults.set(value, forKey: Self.enabledKey)
        if value { requestPermissions() } else { stopMonitoring() }
    }

    func openSystemSettings() {
        if let url = URL(string: UIApplication.openSettingsURLString) { UIApplication.shared.open(url) }
    }

    private func requestPermissions() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { [weak self] granted, _ in
            Task { @MainActor in self?.notificationsAuthorized = granted }
        }
        switch manager.authorizationStatus {
        case .notDetermined: manager.requestWhenInUseAuthorization()
        case .authorizedWhenInUse: manager.requestAlwaysAuthorization(); startMonitoring()
        case .authorizedAlways: startMonitoring()
        default: break
        }
    }

    private func refreshNotificationAuthorization() {
        UNUserNotificationCenter.current().getNotificationSettings { [weak self] settings in
            let status = settings.authorizationStatus
            Task { @MainActor in
                self?.notificationsAuthorized = status == .notDetermined ? nil : (status == .authorized || status == .provisional)
            }
        }
    }

    private func startMonitoring() {
        guard enabled, locationAllowed else { return }
        if CLLocationManager.significantLocationChangeMonitoringAvailable() {
            manager.startMonitoringSignificantLocationChanges()
        }
        manager.requestLocation()
        replan()
    }

    private func stopMonitoring() {
        manager.stopMonitoringSignificantLocationChanges()
        for region in manager.monitoredRegions where NearbyPlanner.targetID(of: region) != nil {
            manager.stopMonitoring(for: region)
        }
        monitoredIDs = []
    }

    private var targets: [NearbyTarget] {
        NearbyPlanner.targets(library.monuments) { library.record(for: $0).status == .visited }
    }

    /// Re-register the nearest geofences around the last known position.
    private func replan() {
        guard enabled, locationAllowed, CLLocationManager.isMonitoringAvailable(for: CLCircularRegion.self),
              let location = currentLocation else { return }
        let planned = NearbyPlanner.plan(targets, around: location)
        let wanted = Set(planned.map { NearbyPlanner.regionPrefix + $0.id })
        for region in manager.monitoredRegions
        where NearbyPlanner.targetID(of: region) != nil && !wanted.contains(region.identifier) {
            manager.stopMonitoring(for: region)
        }
        let existing = Set(manager.monitoredRegions.map(\.identifier))
        for target in planned {
            let region = NearbyPlanner.region(for: target)
            if !existing.contains(region.identifier) { manager.startMonitoring(for: region) }
            // Entering is only reported on crossing; ask once so a monument already inside counts.
            manager.requestState(for: region)
        }
        monitoredIDs = planned.map(\.id)
    }

    private func handle(location: CLLocation) {
        currentLocation = location
        locationFailed = false
        foregroundTimeout?.cancel()
        guard enabled else { return }
        replan()
        for hit in NearbyPlanner.hits(targets, from: location) { remind(hit.target.id) }
    }

    private func remind(_ id: String) {
        guard enabled, let target = targets.first(where: { $0.id == id }),
              NearbyPlanner.shouldRemind(id, lastReminded: lastReminded) else { return }
        lastReminded[id] = .now
        defaults.set(lastReminded.mapValues(\.timeIntervalSince1970), forKey: Self.remindedKey)
        let content = UNMutableNotificationContent()
        content.title = "附近有未打卡的古迹"
        content.body = "\(target.name) 就在 3 公里内，去看看吧。"
        content.sound = .default
        content.threadIdentifier = "fanggu.nearby"
        content.userInfo = ["monumentID": id]
        let request = UNNotificationRequest(identifier: "fanggu.nearby.\(id)", content: content, trigger: nil)
        UNUserNotificationCenter.current().add(request)
    }
}

extension LocationCenter: CLLocationManagerDelegate {
    nonisolated func locationManagerDidChangeAuthorization(_ manager: CLLocationManager) {
        let status = manager.authorizationStatus
        let precise = manager.accuracyAuthorization == .fullAccuracy
        Task { @MainActor in
            self.authorization = status
            self.preciseLocation = precise
            if self.foregroundWanted && self.locationAllowed { self.refreshLocation() }
            guard self.enabled else { return }
            if status == .authorizedWhenInUse { self.manager.requestAlwaysAuthorization() }
            self.startMonitoring()
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didUpdateLocations locations: [CLLocation]) {
        guard let last = locations.last else { return }
        let latitude = last.coordinate.latitude, longitude = last.coordinate.longitude
        let accuracy = last.horizontalAccuracy, timestamp = last.timestamp
        Task { @MainActor in
            self.handle(location: CLLocation(coordinate: CLLocationCoordinate2D(latitude: latitude, longitude: longitude),
                                             altitude: 0, horizontalAccuracy: accuracy, verticalAccuracy: -1, timestamp: timestamp))
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didEnterRegion region: CLRegion) {
        guard let id = NearbyPlanner.targetID(of: region) else { return }
        Task { @MainActor in
            self.remind(id)
            self.manager.requestLocation()
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didDetermineState state: CLRegionState, for region: CLRegion) {
        guard state == .inside, let id = NearbyPlanner.targetID(of: region) else { return }
        Task { @MainActor in self.remind(id) }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
        Task { @MainActor in
            if self.currentLocation == nil { self.locationFailed = true }
        }
    }

    nonisolated func locationManager(_ manager: CLLocationManager, monitoringDidFailFor region: CLRegion?, withError error: Error) {}
}

extension LocationCenter: UNUserNotificationCenterDelegate {
    nonisolated func userNotificationCenter(_ center: UNUserNotificationCenter,
                                            willPresent notification: UNNotification) async -> UNNotificationPresentationOptions {
        [.banner, .list, .sound]
    }

    nonisolated func userNotificationCenter(_ center: UNUserNotificationCenter,
                                            didReceive response: UNNotificationResponse) async {
        guard let id = response.notification.request.content.userInfo["monumentID"] as? String else { return }
        await MainActor.run { self.pendingMonumentID = id }
    }
}
