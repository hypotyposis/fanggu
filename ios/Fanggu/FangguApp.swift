import CoreText
import SwiftUI

@main struct FangguApp: App {
    @StateObject private var library: LibraryStore
    @StateObject private var nearby: LocationCenter

    init() {
        for name in ["MaShanZheng-Regular", "NotoSerifSC-wght"] {
            if let url = Bundle.main.url(forResource: name, withExtension: "ttf") {
                CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)
            }
        }
        let library = LibraryStore()
        _library = StateObject(wrappedValue: library)
        // Created at launch so a geofence or notification that relaunches the app is delivered.
        _nearby = StateObject(wrappedValue: LocationCenter(library: library, defaults: TestScope.defaults(for: TestScope.current)))
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(library)
                .environmentObject(nearby)
                .tint(Palette.gold)
        }
    }
}
