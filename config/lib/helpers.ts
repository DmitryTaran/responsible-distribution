import { Version } from './types';
import Manifest from '../../widget/manifest.json';

export const incrementVersion = (version: string, type: Version): string => {
	const [major, minor, patch] = version.split('.');
	switch (type) {
		case Version.Major:
			return `${Number(major) + 1}.0.0`;
		case Version.Minor:
			return `${major}.${Number(minor) + 1}.0`;
		case Version.Patch:
			return `${major}.${minor}.${Number(patch) + 1}`;
	}
};

export const formatManifest = (webHookUrl: string): typeof Manifest => {
	return {
		...Manifest,
		widget: {
			...Manifest.widget,
			version: incrementVersion(Manifest.widget.version, Version.Major),
		},
		dp: {
			...Manifest.dp,
			webhook_url: webHookUrl
		},
	};
};