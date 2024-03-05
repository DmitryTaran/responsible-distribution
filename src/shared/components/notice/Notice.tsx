import CloseIcon from '@mui/icons-material/Close';
import { Alert, AlertTitle, IconButton } from '@mui/material';
import React from 'react';
import { notificationStore } from '../../store/NotificationStore';
import { Notification } from '../../types/notification';

const Notice = ({ id, title, type, text }: Notification): JSX.Element => {
	return (
		<Alert
			severity={type}
			action={<IconButton
				color="inherit"
				size="small"
				onClick={() => notificationStore.deleteNotification(id)}
			>
				<CloseIcon fontSize="inherit"/>
			</IconButton>}
		>
			<AlertTitle>{title}</AlertTitle>
			{text}
		</Alert>
	);
};

export default Notice;