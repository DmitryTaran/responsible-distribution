import { WorkSchedule } from 'entities/work-schedule';
import { RuWeekDays, weekDays } from 'shared/consts/const';

export const getWorkDays = (workSchedule: WorkSchedule): string[] => {
	return weekDays
		.filter(day => workSchedule[day])
		.map(filteredDay => RuWeekDays[filteredDay]);
};

export const getDetailedWorkDays = (workSchedule: WorkSchedule): { day: string, time: string }[] => {
	return weekDays.filter(day => workSchedule[day]).map(day => {

		const currentDay = workSchedule[day];

		return {
			day: RuWeekDays[day],
			time: currentDay
				? `${currentDay.dayBeginTime} - ${currentDay.dayEndTime}`
				: 'Выходной'
		};

	});
};