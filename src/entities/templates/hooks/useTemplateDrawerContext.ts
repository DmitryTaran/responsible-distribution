import { createContext, useContext } from 'react';
import { TemplateDrawerStore } from '../store/TemplateDrawerStore';

export const TemplateDrawerContext = createContext<TemplateDrawerStore | null>(null);

export const useTemplateDrawerContext = (): TemplateDrawerStore => {
	const context = useContext(TemplateDrawerContext);
	if (!context) {
		throw new Error('TemplateDrawerContext is not available');
	}
	return context;

};