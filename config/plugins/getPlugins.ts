import { WebpackPluginInstance } from 'webpack';
import { EnvTypes } from '../lib/types';
import getDevPlugins from './DevPlugins';
import getProdPlugins from './ProdPlugins';
import getTestPlugins from './TestPlugins';
import getRebuildPlugins from './RebuildPlugins';

export const getPlugins = (mode: EnvTypes, zipName: string, bundlePath: string): WebpackPluginInstance[] => {
	switch (mode) {
		case EnvTypes.PROD:
			return getProdPlugins(zipName, bundlePath)
		case EnvTypes.DEV:
			return getDevPlugins(zipName, bundlePath)
		case EnvTypes.TEST:
			return getTestPlugins(zipName, bundlePath)
		case EnvTypes.REBUILD:
			return getRebuildPlugins()
	}
};
