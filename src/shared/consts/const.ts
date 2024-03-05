import { AxiosError } from 'axios';
import { notificationStore } from '../store/NotificationStore';
import { MutationOptions } from '../types/notification';

export const WORK_AREA_ELEMENT_ID = '#list_page_holder';
export const REDISTRIBUTION_CONTAINER_ID = 'reon-redistribution-container';

export const INTEGRATION_NAME = ENV_INTEGRATION_NAME_PROD || ENV_INTEGRATION_NAME_DEV || ENV_INTEGRATION_NAME_TEST
export const WORK_AREA_NAME = `widget-page:${INTEGRATION_NAME}`;
export const AMO_DP_AREA = 'leads-dp';
export const DIGITAL_PIPELINE_CONTAINER_ID = 'reon-responsible-distribution-widget';

export const mutationOptions: MutationOptions = {
	onError: (error: AxiosError<{message?: string}>) => {
		notificationStore.addNotification(
			'Ошибка!',
			error?.response?.data?.message || 'Данные не сохранены',
			'error',
		);
	},
	onSuccess: () => notificationStore.addNotification('Успех', 'Данные сохранены', 'success'),
};

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const;

export const RuWeekDays = {
	Mon: 'Пн',
	Tue: 'Вт',
	Wed: 'Ср',
	Thu: 'Чт',
	Fri: 'Пт',
	Sat: 'Сб',
	Sun: 'Вс',
} as const;

export const NOTIFICATION_APPEAR_DELAY = 2000;
export const ONE_SECOND = 1000;
export const ONE_TENTH_OF_SECOND = 100;
export const SECONDS_IN_HOUR = 3600;
export const SECONDS_IN_MINUTE = 60;
export const HUNDRED_PERCENT = 100;




