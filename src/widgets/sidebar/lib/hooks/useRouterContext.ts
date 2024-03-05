import { createContext, useContext } from 'react';
import { RouterStore } from '../store/RouterStore';

export const Router = createContext<RouterStore | null>(null);

export const useRouterContext = (): RouterStore => {
	const context = useContext(Router);
	if (!context) {
		throw new Error('RouterContext is not available');
	}
	return context;
}