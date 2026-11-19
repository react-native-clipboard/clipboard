// swift-tools-version: 6.0
// Built through React Native's SwiftPM autolinker, which links this package at
// <app>/build/generated/autolinking/libs/RNCClipboard. The relative package paths
// resolve from there to the app's React Native xcframeworks and codegen output.
// This file has no scaffolder marker, so `react-native spm scaffold` leaves it alone.

import Foundation
import PackageDescription

// The target path is the package root, and SwiftPM scans all of it for implicit
// resources: example/'s .xib/.lproj, or any in node_modules/, would demand a
// defaultLocalization. So exclude every root entry the target does not use.
// Listing the entries, not naming them, works in a repo checkout and in an npm
// install alike; excluding a missing path makes SwiftPM warn.
// SwiftPM caches this manifest's result and does not see the listing change.
// When a root entry appears or disappears after the first resolve (for
// example node_modules/ from `yarn install` or `rm -rf`), reset the package
// cache: in Xcode, File > Packages > Reset Package Caches; for `swift build`,
// delete ~/Library/Caches/org.swift.swiftpm/manifests.
let usedRootEntries: Set<String> = ["ios", "include", "Package.swift"]
let unusedRootEntries = try! FileManager.default.contentsOfDirectory(atPath: Context.packageDirectory)
    .filter { !usedRootEntries.contains($0) }
    .sorted()

let package = Package(
    name: "RNCClipboard",
    platforms: [.iOS("15.1")],
    products: [
        .library(name: "RNCClipboard", targets: ["RNCClipboard"]),
    ],
    dependencies: [
        .package(name: "ReactNative", path: "../../../../xcframeworks"),
        .package(name: "React-GeneratedCode", path: "../../../ios"),
    ],
    targets: [
        .target(
            name: "RNCClipboard",
            dependencies: [.product(name: "ReactHeaders", package: "ReactNative"), .product(name: "ReactNativeHeaders", package: "ReactNative"), .product(name: "ReactNativeDependenciesHeaders", package: "ReactNative"), .product(name: "ReactAppHeaders", package: "React-GeneratedCode")],
            path: ".",
            exclude: ["ios/RNCClipboard.xcodeproj"] + unusedRootEntries,
            sources: ["ios"],
            // Not "ios": SwiftPM rejects ios/RNCClipboard.h as an umbrella header while
            // RNCClipboard.xcodeproj sits next to it. The shim also gives dependents the
            // CocoaPods spelling <RNCClipboard/RNCClipboard.h>.
            publicHeadersPath: "include",
            // CocoaPods gets RCT_NEW_ARCH_ENABLED from install_modules_dependencies;
            // without it RNCClipboard compiles as a legacy bridge module.
            cSettings: [.define("RCT_NEW_ARCH_ENABLED", to: "1")],
            cxxSettings: [.define("RCT_NEW_ARCH_ENABLED", to: "1"), .define("DEBUG", .when(configuration: .debug)), .define("NDEBUG", .when(configuration: .release))],
            linkerSettings: [.linkedFramework("UIKit"), .linkedFramework("Foundation"), .linkedFramework("CoreServices"), .linkedFramework("MobileCoreServices")]
        ),
    ],
    cxxLanguageStandard: .cxx20
)
