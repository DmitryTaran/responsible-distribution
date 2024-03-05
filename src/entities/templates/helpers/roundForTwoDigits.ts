import { DIGITS_AFTER_COMMA } from '../consts';

export const roundForTwoDigits = (percent: number): number => {
	return Number(percent.toFixed(DIGITS_AFTER_COMMA));
};