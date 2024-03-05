import Box from '@mui/material/Box';
import { RolesValues, useGetSingleManager } from 'entities/managers';
import { observer } from 'mobx-react-lite';
import React from 'react';
import Title from 'shared/components/title/Title';
import { useRouterContext } from 'widgets/sidebar/lib/hooks/useRouterContext';
import { SIDEBAR_WIDTH } from 'widgets/sidebar/lib/consts';
import { AppRoutes } from '../../lib/consts/AppRoutes';

const ContentOutlet = observer((): JSX.Element => {
	const { selectedItem } = useRouterContext();
	const { manager } = useGetSingleManager();
	return (
		<Box sx={{
			width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
			padding: '30px 30px 35px 30px',
			overflowY: 'auto',
			display: 'flex',
			flexDirection: 'column',
			gap: '30px',
		}}>
			{manager?.widgetRole === RolesValues.Admin &&
                <>
                    <Title {...AppRoutes[selectedItem].title}/>
					{AppRoutes[selectedItem].page}
                </>
			}
		</Box>
	);
});

export default ContentOutlet;