# tree-sitter-rifleconf

This is a [`tree-sitter`](https://tree-sitter.github.io/tree-sitter/) grammar for your [`rifle config`](https://github.com/ranger/ranger/blob/master/ranger/config/rifle.conf) file. `rifle` is a file-launcher for [`ranger`](https://github.com/ranger/ranger/) (a terminal filemanager).

This successfully parses the default config, my config and anything else I can think to throw at it, but if you notice errors please create an issue!

This parses the config file into conditions/expressions, and highlights the buffer:

![image](https://github.com/purarue/tree-sitter-rifleconf/assets/7804791/739bde0c-1907-41cc-a6ec-7cc3abf96dea)

### Neovim

Install [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter/blob/main) on the `main` branch [instructions here](https://github.com/nvim-treesitter/nvim-treesitter/tree/main?tab=readme-ov-file#installation):

You can then either run `:TSInstall rifleconf` or add it to your `config`:

```lua
    {
        "nvim-treesitter/nvim-treesitter",
        branch = "main",
        lazy = false,
        build = ":TSUpdate",
        config = function()
            require("nvim-treesitter").setup()
            require("nvim-treesitter").install({ "rifleconf" }) -- no-ops if already installed
        end,
    }
```

To automatically set the filetype to `rifleconf`:

- add `vim.filetype.add({filename = {['rifle.conf'] = 'rifleconf'}})` to your startup script
- or set the modeline (`:help modeline`) by adding `# vim: ft=rifleconf` to the top of your config file.

For `commenting` support, add the following to your config at `after/ftplugin/rifleconf.lua`:

```lua
vim.opt_local.commentstring = "# %s"
```
