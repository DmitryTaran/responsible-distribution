import { Compiler } from 'webpack';

type Options = {
	content: string
	outputFile: string
	args?: string[]
}

export class GenerateTextAssetPlugin {
	private _options;

	constructor(options: Options) {
		this._options = options;
	}

	apply(compiler: Compiler) {
		const pluginName = GenerateTextAssetPlugin.name;
		const { webpack: { sources: { RawSource } } } = compiler;
		compiler.hooks.afterCompile.tap(pluginName, (compilation) => {
			const { args, outputFile, content } = this._options;
			const replacedContent = content.replace(/\{(\d+)\}/gm, (matchedString, matchedNumber) => {
				return (args && args[matchedNumber]) ?? matchedString;
			});
			compilation.emitAsset(
				outputFile,
				new RawSource(replacedContent),
			);
		});
	}
}
