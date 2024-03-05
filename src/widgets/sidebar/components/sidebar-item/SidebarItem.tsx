import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouterContext } from '../../lib/hooks/useRouterContext';
import { itemSelected } from '../../styles';
import { PagesKeys } from '../../lib/types';
import { SidebarItemStyle, SidebarItemText } from './styles';

type SidebarItemProps = {
	title: string
	pageKey: PagesKeys
}

const SidebarItem = observer(({ title, pageKey }: SidebarItemProps): JSX.Element => {

	const routerStore = useRouterContext();

	return (
		<Box
			sx={{
				...SidebarItemStyle,
				...(routerStore.selectedItem === pageKey && itemSelected),
			}}
			onClick={() => routerStore.setSelectedItem(pageKey)}
		>
			<Typography sx={SidebarItemText}>
				{title}
			</Typography>
		</Box>
	);
});

export default SidebarItem;