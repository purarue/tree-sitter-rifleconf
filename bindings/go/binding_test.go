package tree_sitter_rifleconf_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_rifleconf "github.com/purarue/tree-sitter-rifleconf/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_rifleconf.Language())
	if language == nil {
		t.Errorf("Error loading rifleconf grammar")
	}
}
