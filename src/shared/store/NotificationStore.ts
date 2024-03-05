import { AlertColor } from '@mui/material';
import { makeAutoObservable } from 'mobx';
import { v4 as uuid } from 'uuid';
import { NOTIFICATION_APPEAR_DELAY } from '../consts/const';
import { Notification } from '../types/notification';

export class NotificationStore {
	private _notifications: Notification[] = [];

	constructor() {
		makeAutoObservable(this);
	}

	public deleteNotification(id: string): void {
		this._notifications = this._notifications.filter(
			(notification) => notification.id !== id
		);
	}

	public addNotification(title: string, text: string, type: AlertColor): void {

		const id = uuid();
		const newNotification: Notification = {
			id,
			title,
			text,
			type,
		};
		setTimeout(() => {
			this.deleteNotification(id);
		}, NOTIFICATION_APPEAR_DELAY);
		this._notifications.push(newNotification);
	}

	get getNotifications(): Notification[] {
		return this._notifications;
	}
}

export const notificationStore = new NotificationStore();
