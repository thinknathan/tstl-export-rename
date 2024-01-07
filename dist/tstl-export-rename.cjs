'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
/**
 * Plugin definition for TypeScript-to-Lua
 */
const plugin = (options) => {
	return {
		afterEmit: (_program, _options, emitHost, result) => {
			if (!options.match) {
				// @ts-expect-error Missing console definition
				console.warn('`tstl-export-rename` is missing `match` in `tsconfig`');
				return;
			}
			if (!options.exportRename) {
				// @ts-expect-error Missing console definition
				console.warn(
					'`tstl-export-rename` is missing `exportRename` in `tsconfig`',
				);
				return;
			}
			for (const file of result) {
				const matchesFile = new RegExp(options.match);
				if (matchesFile.test(file.outputPath)) {
					file.code = file.code.replace(/____exports/g, options.exportRename);
					emitHost.writeFile(file.outputPath, file.code, false);
				}
			}
		},
	};
};
// Export the plugin for use in TypeScript-to-Lua
exports.default = plugin;
