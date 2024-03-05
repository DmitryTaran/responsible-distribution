import { AlertColor } from '@mui/material';
import { AxiosError } from 'axios';

export type Notification = {
	id: string,
	title: string,
	text: string,
	type: AlertColor
}

export type MutationOptions = {
	onError: (error: AxiosError<{message?: string}>) => void
	onSuccess: () => void
}