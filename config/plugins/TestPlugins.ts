import webpack, { WebpackPluginInstance } from 'webpack';
import scriptJs from '../assets/scriptJs';
import { GenerateTextAssetPlugin } from '../custom-plugins/GenerateTextAssetPlugin';
import ZipPlugin from '../custom-plugins/WidgetZipPlugin';
import { testEnv } from '../env-config/envs';
import { formatManifest } from '../lib/helpers';

const webhookUrl = String(`${process.env.SERVER_URL}/${process.env.WIDGET_API_ENDPOINT_TEST}/triggers/web-hooks`)

export default (zipName: string, bundlePath: string): WebpackPluginInstance[] => [
	new ZipPlugin({
		outputFile: zipName,
		targetDir: bundlePath,
		exclude: [zipName],
	}),
	new webpack.DefinePlugin(testEnv),
	new GenerateTextAssetPlugin({
		outputFile: 'script.js',
		content: scriptJs,
		args: ['./index.js'],
	}),
	new GenerateTextAssetPlugin({
		outputFile: 'manifest.json',
		content: JSON.stringify(formatManifest(webhookUrl)),
	}),
]