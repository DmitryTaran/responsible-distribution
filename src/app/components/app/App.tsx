import React from 'react';
import { Router } from 'widgets/sidebar/lib/hooks/useRouterContext';
import { RouterStore } from 'widgets/sidebar/lib/store/RouterStore';
import AppLayout from '../app-layout/AppLayout';

export const App = (): JSX.Element => {

	return (
		<Router.Provider value={new RouterStore()}>
			<AppLayout/>
		</Router.Provider>
	);
};
