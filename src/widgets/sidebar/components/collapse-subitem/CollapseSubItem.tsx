import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useRouterContext } from '../../lib/hooks/useRouterContext';
import { itemSelected } from '../../styles';
import { Subtitle } from '../../lib/types';
import { CollapseSubItemStyle, CollapseSubItemText } from './styles';

type CollapseSubItemProps = {
	subtitle: Subtitle
}

const CollapseSubItem = observer(({ subtitle }: CollapseSubItemProps): JSX.Element => {

	const { title, pageKey } = subtitle;

	const routerStore = useRouterContext();

	return (
		<Box
			sx={CollapseSubItemStyle}
			onClick={() => routerStore.setSelectedItem(pageKey)}
		>
			<Typography sx={{
				...CollapseSubItemText,
				...(routerStore.selectedItem === pageKey && itemSelected),
			}}>
				{title}
			</Typography>
		</Box>
	);
});

export default CollapseSubItem;