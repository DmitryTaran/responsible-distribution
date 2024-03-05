import Box from '@mui/material/Box';
import React from 'react';
import { NotificationsLayout } from 'widgets/notifications-layout/NotificationsLayout';
import SideBar from 'widgets/sidebar/Sidebar';
import ContentOutlet from '../content-outlet/ContentOutlet';

const AppLayout = (): JSX.Element => {
	return (
		<Box display="flex" height="100vh">
			<SideBar/>
			<ContentOutlet/>
			<NotificationsLayout/>
		</Box>
	);
};

export default AppLayout;