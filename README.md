# tree-sitter-rifleconf

This is a [`tree-sitter`](https://tree-sitter.github.io/tree-sitter/) grammar for your [`rifle config`](https://github.com/ranger/ranger/blob/master/ranger/config/rifle.conf) file. `rifle` is a file-launcher for [`ranger`](https://github.com/ranger/ranger/) (a terminal filemanager).

This successfully parses the default config, my config and anything else I can think to throw at it, but if you notice errors please create an issue!

This parses the config file into conditions/expressions, and highlights the buffer:

![image](https://github.com/purarue/tree-sitter-rifleconf/assets/7804791/739bde0c-1907-41cc-a6ec-7cc3abf96dea)

### Neovim

Install [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter), and then add this to your config:

```lua
local parser_config = require("nvim-treesitter.parsers").get_parser_configs()
parser_config.rifleconf = {
    install_info = {
        url = "https://github.com/purarue/tree-sitter-rifleconf",
        files = {"src/parser.c"},
        branch = "main"
    }
}

-- then setup like normal...
-- require('nvim-treesitter.configs').setup({
```

To automatically set the filetype to `rifleconf`:

- add `vim.filetype.add({filename = {['rifle.conf'] = 'rifleconf'}})` to your startup script
- or set the modeline (`:help modeline`) by adding `# vim: ft=rifleconf` to the top of your config file.

_close nvim and open your rifle.conf_

- `:TSInstall rifleconf`
- `:edit`
- `:InspectTree`

For syntax highlighting and `commenting` support, you can copy the files in `queries` and `after` to your `runtimepath`, or just install this repository with your plugin manager. E.g. for [`lazy`](https://github.com/folke/lazy.nvim):

```lua
{
    'purarue/tree-sitter-rifleconf',
    ft = 'rifleconf',
}
```

If you want to highlight the commands in each rule with the `bash` tree-sitter parser, `:TSInstall bash`, and then copy this into your `~/.config/nvim/queries/rifleconf/injections.scm`:

```lisp
; extends

(command_list
  (command) @injection.content
  (#set! injection.include-children)
  (#set! injection.language "bash"))
```
