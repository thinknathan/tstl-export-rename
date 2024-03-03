# tstl-export-rename

[![CI](https://github.com/thinknathan/tstl-export-rename/actions/workflows/ci.yml/badge.svg)](https://github.com/thinknathan/tstl-export-rename/actions/workflows/ci.yml) ![GitHub License](https://img.shields.io/github/license/thinknathan/tstl-export-rename)

TypeScriptToLua plugin that renames the `___exports` variable for cosmetic reasons.

:exclamation: Use this and any code transformation plugin with caution. Mistakes are possible.

## Example

```lua
local ____exports = {}
____exports.foo = 10
____exports.bar = function(self)
	...
end
return ____exports
```

Becomes:

```lua
local M = {}
M.foo = 10
M.bar = function(self)
	...
end
return M
```

## Installation

Requires TSTL >= 1.22.0.

1. Install this plugin

```bash
yarn add tstl-export-rename -D
# or
npm install tstl-export-rename --save-dev
```

2. Add `tstl-export-rename` to `tstl.luaPlugins` in `tsconfig.json`

3. Define `match`, which will only apply the transformation to files if their _output_ (Lua file) path matches.

4. Define `exportRename`, which will be used to replace `___exports`

```diff
{
	"tstl": {
		"luaPlugins": [
+			{
+				"name": "tstl-export-rename",
+				"match": ".*\\..*.lua$",
+				"exportRename": "M"
+			}
		],
	}
}
```

## License

CC0
