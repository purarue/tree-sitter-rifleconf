import XCTest
import SwiftTreeSitter
import TreeSitterRifleconf

final class TreeSitterRifleconfTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_rifleconf())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading rifleconf grammar")
    }
}
