import { AxiosError } from 'axios';
import { CSSProperties } from 'react';
import { Root } from 'react-dom/client';

export type WidgetSchema = {
	render: () => boolean;
	init: () => boolean;
	bind_actions: () => boolean;
	settings: () => boolean;
	advancedSettings: () => boolean;
	dpSettings: (
		formInput: HTMLInputElement,
		saveButton: HTMLButtonElement,
	) => boolean;
	onSave: () => boolean;
	initMenuPage: () => boolean;
	destroy?: () => void
};

export enum ReactRootIds {
	APP = 'app',
	DIGITAL_PIPELINE = 'dp',
	DEV = 'dev',
	REQUEST = 'request',
	SETTINGS = 'settings',
}

export type ReactRootStoreType = {
	[key in ReactRootIds]?: Root
}

export type SVGProps = {
	color?: string
	size?: string | number
	cx?: number
	cy?: number
	style?: CSSProperties
}

export type SWRError = AxiosError<{message?: string}>

export type PopulatedModel<T, U> = Omit<T, keyof U> & U;