import CoreText
import SwiftUI

@main struct FangguApp: App {
    @StateObject private var library: LibraryStore
    @StateObject private var nearby: LocationCenter
    @StateObject private var community: CommunityStore
    @Environment(\.scenePhase) private var scenePhase

    init() {
        UITestLaunch.applyAtLaunch()
        for name in ["MaShanZheng-Regular", "NotoSerifSC-wght"] {
            if let url = Bundle.main.url(forResource: name, withExtension: "ttf") {
                CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)
            }
        }
        let library = LibraryStore()
        _library = StateObject(wrappedValue: library)
        // Created at launch so a geofence or notification that relaunches the app is delivered.
        _nearby = StateObject(wrappedValue: LocationCenter(library: library, defaults: TestScope.defaults(for: TestScope.current)))
        // Community state sits beside the scoped library so parallel test runs never share accounts or queues.
        _community = StateObject(wrappedValue: CommunityStore(
            directory: TestScope.libraryFileURL(for: TestScope.current).deletingLastPathComponent(),
            defaults: TestScope.defaults(for: TestScope.current)))
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(library)
                .environmentObject(nearby)
                .environmentObject(community)
                .tint(Palette.gold)
                .task { community.attach(library) }
                .onChange(of: scenePhase) { _, phase in
                    if phase == .active { Task { await community.synchronize() } }
                }
        }
    }
}
