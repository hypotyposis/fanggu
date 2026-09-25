import CoreText
import SwiftUI

@main struct FangguApp: App {
    @StateObject private var library = LibraryStore()

    init() {
        for name in ["MaShanZheng-Regular", "NotoSerifSC-wght"] {
            if let url = Bundle.main.url(forResource: name, withExtension: "ttf") {
                CTFontManagerRegisterFontsForURL(url as CFURL, .process, nil)
            }
        }
    }

    var body: some Scene {
        WindowGroup {
            ContentView()
                .environmentObject(library)
                .tint(Palette.gold)
        }
    }
}
