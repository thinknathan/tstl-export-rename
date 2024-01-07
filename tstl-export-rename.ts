import * as ts from 'typescript';
import * as tstl from 'typescript-to-lua';

interface PluginOptions {
	name: string;
	match?: string;
	exportRename?: string;
}

/**
 * Plugin definition for TypeScript-to-Lua
 */
const plugin = (options: PluginOptions): tstl.Plugin => {
	return {
		afterEmit: (
			_program: ts.Program,
			_options: tstl.CompilerOptions,
			emitHost: tstl.EmitHost,
			result: tstl.EmitFile[],
		) => {
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
export default plugin;
