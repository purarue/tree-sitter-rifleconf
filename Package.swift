// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterRifleconf",
    products: [
        .library(name: "TreeSitterRifleconf", targets: ["TreeSitterRifleconf"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterRifleconf",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterRifleconfTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterRifleconf",
            ],
            path: "bindings/swift/TreeSitterRifleconfTests"
        )
    ],
    cLanguageStandard: .c11
)
