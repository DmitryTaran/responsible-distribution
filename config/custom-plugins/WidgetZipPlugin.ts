import path from 'path';
import { Zip } from 'zip-lib';
import fs from 'node:fs/promises';
import { Compiler } from 'webpack';

type ZipOptions = {
    outputFile: string
    targetDir: string
    exclude: (string | RegExp)[]
}

export default class ZipPlugin {

	public _options: ZipOptions;

	_name = 'ZipPlugin';

	constructor(options: ZipOptions) {
		this._options = options;
	}

	public apply(compiler: Compiler) {
		compiler.hooks.done.tapPromise(
			this._name,
			async (stats) => {
				try {
					const { outputFile, targetDir, exclude } = this._options;
					const dirFiles = await fs.readdir(targetDir, { withFileTypes: true });
					const zipArchive = new Zip();
					const includedFiles = dirFiles
						.filter(({ name }) => !exclude.find(excluded => name.match(excluded)));
					includedFiles.forEach(({ name }) => {
						name.match(/.*[.][a-z]+/mg)
							? zipArchive.addFile(path.resolve(targetDir, name))
							: zipArchive.addFolder(path.resolve(targetDir, name), name);
					});
					await zipArchive.archive(path.resolve(targetDir, outputFile));
					console.log('\nZip successfully created');
				} catch (e) {
					console.log(e);
				}
			},
		);
	}
}