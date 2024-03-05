import { Box, Collapse } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import Notice from 'shared/components/notice/Notice';
import { notificationStore } from 'shared/store/NotificationStore';
import { notificationsLayoutStyle } from './style';

export const NotificationsLayout = observer((): JSX.Element => {
	return (
		<Box sx={notificationsLayoutStyle}>
			<TransitionGroup>
				{notificationStore.getNotifications.map((notice) =>
					<Collapse key={notice.id} sx={{ margin: 1 }}>
						<Notice {...notice} />
					</Collapse>,
				)}
			</TransitionGroup>
		</Box>
	);
});
