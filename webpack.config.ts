import { EsbuildPlugin } from 'esbuild-loader';
import path from 'path';
import { WebpackConfiguration } from 'webpack-cli';
import cssLoader from './config/loaders/cssLoader';
import esbuildLoader from './config/loaders/esbuildLoader';
import fileLoader from './config/loaders/fileLoader';
import sassLoader from './config/loaders/sassLoader';
import { getPlugins } from './config/plugins/getPlugins';
import { ConfigEnvironment } from './config/lib/types';

export default (env: ConfigEnvironment): WebpackConfiguration => {
	const isDev = env.mode === 'development' || env.mode === 'rebuild';
	const excludedRegex = /(node_modules|bower_components)/;
	const bundlePath = path.resolve(__dirname, 'widget');
	const entryPath = path.resolve(__dirname, 'src', 'index.tsx');
	const srcPath = path.resolve(__dirname, 'src');
	const zipName = 'widget.zip';

	return ({
		mode: isDev ? 'development' : 'production',
		entry: entryPath,
		devtool: 'source-map',
		cache: {
			type: 'filesystem',
			allowCollectingMemory: true,
			buildDependencies: {
				config: [__filename],
			},
			memoryCacheUnaffected: true,
			store: 'pack',
			hashAlgorithm: 'md5',
		},
		experiments: {
			cacheUnaffected: true,
		},
		output: {
			filename: 'index.js',
			path: bundlePath,
			libraryTarget: 'amd',
		},
		optimization: {
			minimize: true,
			minimizer: [
				new EsbuildPlugin({
					minify: true,
					legalComments: 'none',
					exclude: excludedRegex,
					target: 'es2015',
				}),
			],
		},
		module: {
			rules: [
				esbuildLoader(excludedRegex),
				cssLoader(excludedRegex),
				sassLoader(excludedRegex),
				fileLoader(excludedRegex),
			],
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx'],
			preferAbsolute: true,
			modules: [
				srcPath,
				'node_modules',
			],
		},

		plugins: getPlugins(env.mode, zipName, bundlePath)
	});
};
