import webpack, { WebpackPluginInstance } from 'webpack';
import { devEnv } from '../env-config/envs';

export default (): WebpackPluginInstance[] => [
	new webpack.DefinePlugin(devEnv),
]