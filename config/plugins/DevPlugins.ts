import webpack, { WebpackPluginInstance } from 'webpack';
import manifestJson from '../assets/manifestJson';
import scriptJs from '../assets/scriptJs';
import { GenerateTextAssetPlugin } from '../custom-plugins/GenerateTextAssetPlugin';
import ZipPlugin from '../custom-plugins/WidgetZipPlugin';
import { devEnv } from '../env-config/envs';
import { formatManifest } from '../lib/helpers';

const webhookUrl = String(`${process.env.SERVER_URL}/${process.env.WIDGET_API_ENDPOINT_DEV}/triggers/web-hooks`)

export default (zipName: string, bundlePath: string): WebpackPluginInstance[] => [
	new ZipPlugin({
		outputFile: zipName,
		targetDir: bundlePath,
		exclude: [/widget.zip/, /index[.]js.*/],
	}),
	new webpack.DefinePlugin(devEnv),
	new GenerateTextAssetPlugin({
		outputFile: 'script.js',
		content: scriptJs,
		args: [`${process.env.DEV_MODULE_URL}/index.js`],
	}),
	new GenerateTextAssetPlugin({
		outputFile: 'manifest.json',
		content: JSON.stringify(formatManifest(webhookUrl)),
	}),
]