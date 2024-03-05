import { DayWorkSchedule, WorkSchedule } from './types';

export const defaultEmptySchedule: WorkSchedule = {
	user: -1,
	Sun: null,
	Mon: null,
	Tue: null,
	Wed: null,
	Thu: null,
	Fri: null,
	Sat: null
}

export const defaultOfficeSchedule: WorkSchedule = {
	user: -1,
	Sun: {
		dayBeginTime: '00:00',
		dayEndTime: '23:59',
	},
	Mon: {
		dayBeginTime: '00:00',
		dayEndTime: '23:59',
	},
	Tue: {
		dayBeginTime: '00:00',
		dayEndTime: '23:59',
	},
	Wed: {
		dayBeginTime: '00:00',
		dayEndTime: '23:59',
	},
	Thu: {
		dayBeginTime: '00:00',
		dayEndTime: '23:59',
	},
	Fri: {
		dayBeginTime: '00:00',
		dayEndTime: '23:59',
	},
	Sat: {
		dayBeginTime: '00:00',
		dayEndTime: '23:59',
	},
};

export const defaultDayWorkSchedule: DayWorkSchedule = {
	dayEndTime: '18:00',
	dayBeginTime: '08:00',
};