import SwiftUI

@main struct FangguApp: App {
    @StateObject private var library = LibraryStore()

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(library)
                .tint(Palette.red)
        }
    }
}
