# tstl-export-rename

TypeScriptToLua plugin that renames the `___exports` variable.

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
yarn add git+https://git@github.com/thinknathan/tstl-export-rename.git#^1.0.0 -D
# or
npm install git+https://git@github.com/thinknathan/tstl-export-rename.git#^1.0.0 --save-dev
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
