import { Box, Drawer } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useTemplateDrawerContext } from 'entities/templates';
import TemplateForm from 'widgets/templates/template-form/TemplateForm';
import { TemplateDrawerLayoutStyle } from './styles';

const TemplatePageDrawer = observer((): JSX.Element => {

	const templateDrawerStore = useTemplateDrawerContext();
	const { isOpen } = templateDrawerStore;

	return (
		<Drawer
			anchor="right"
			open={isOpen}
			onClose={() => templateDrawerStore.setIsOpen(false)}
			sx={{ '& .MuiPaper-root': { overflow: 'hidden' } }}
		>
			<Box
				sx={TemplateDrawerLayoutStyle}>
				<TemplateForm/>
			</Box>
		</Drawer>
	);
});

export default TemplatePageDrawer;