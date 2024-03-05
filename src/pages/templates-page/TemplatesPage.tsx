import React from 'react';
import { TemplateDrawerContext, templateDrawerStore } from 'entities/templates';
import TemplateList from 'widgets/templates/template-list/TemplateList';
import TemplatePageDrawer from './components/template-page-drawer/TemplatePageDrawer';

export const TemplatesPage = (): JSX.Element => {
	return (
		<TemplateDrawerContext.Provider value={templateDrawerStore}>
			<TemplateList/>
			<TemplatePageDrawer/>
		</TemplateDrawerContext.Provider>

	);
};

export default TemplatesPage;
