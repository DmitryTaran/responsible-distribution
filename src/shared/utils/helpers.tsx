import { ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactRootStore } from '../store/AppStore';
import { AmoLightTheme } from '../theme/AmoLightTheme';
import { ReactRootIds } from '../types/Widget.types';

export const removeWidgetPageHeader = (): void => {
	const widgetPageHeader =
		document.querySelector<HTMLDivElement>('.content__top')!;
	const widgetPage = document.querySelector<HTMLDivElement>('.work-area')!;
	widgetPage.style.padding = '0';
	widgetPageHeader.style.display = 'none';
};

export const createReactRoot = (
	domElementQuerySelector: string,
	rootComponent: JSX.Element,
	rootId: ReactRootIds,
): void => {
	const modalRootDOMElement: HTMLElement | null = document.querySelector(domElementQuerySelector);
	if (modalRootDOMElement) {
		const modalRoot = ReactDOM.createRoot(modalRootDOMElement);
		ReactRootStore[rootId] = modalRoot;
		modalRoot.render(
			<ThemeProvider theme={AmoLightTheme}>{rootComponent}</ThemeProvider>,
		);
	}
};

export const capitalizeFirstLetter = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

const GENITIVE_PLURAL_CASE = [10, 20];
const GENITIVE_SINGULAR_CASE = [1, 5];
const NOMINATIVE_SINGULAR_CASE = 1;

export const getWordCase = (value: number, words: [string, string, string]): string => {
	value = Math.abs(value) % 100;
	const num = value % 10;

	if (value > GENITIVE_PLURAL_CASE[0] && value < GENITIVE_PLURAL_CASE[1]) {
		return words[2];
	}
	if (num > GENITIVE_SINGULAR_CASE[0] && num < GENITIVE_SINGULAR_CASE[1]) {
		return words[1];
	}
	if (num === NOMINATIVE_SINGULAR_CASE) {
		return words[0];
	}
	return words[2];
};

export type GroupedData<T> = { [key: string]: T[] }

export const groupBy = <T, >(data: T[], key: keyof T): GroupedData<T> => {
	return data.reduce((result, dataItem) => {
		(result[dataItem[key]] = result[dataItem[key]] || []).push(dataItem);
		return result;
	}, {});
};

export const normalizeString = (stringValue: string): string => stringValue.toLowerCase().trim();

export const normalizeUsername = (username: string): string => {
	const [firstName, surname] = username.split(' ');
	return surname
		? surname + ' ' + firstName.slice(0, 1) + '.'
		: firstName;
};

export const getTextSize = (text: string, font: string): { width: number, height: number } => {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d')!;
	context.font = font;
	const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } = context.measureText(text);
	return {
		width: width,
		height: actualBoundingBoxAscent + actualBoundingBoxDescent,
	};
};
