import { UserSettingDTO } from 'entities/templates/types';
import { roundForTwoDigits } from 'entities/templates';

export const getPercentWeightSum = (distributionSettings: UserSettingDTO[]): number => {
	const percentSum = distributionSettings.reduce((accum, { weight }) => accum + (weight || 0), 0);
	return roundForTwoDigits(percentSum);
};