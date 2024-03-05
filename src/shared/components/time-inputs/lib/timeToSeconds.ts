import { SECONDS_IN_HOUR, SECONDS_IN_MINUTE } from '../../../consts/const';

export const timeToSeconds = (time: string): number => {
	const [hours, minutes] = time.split(':');
	return Number(hours) * SECONDS_IN_HOUR + Number(minutes) * SECONDS_IN_MINUTE;
};