import { HUNDRED_PERCENT } from 'shared/consts/const';
import { DIGITS_AFTER_COMMA } from '../consts';
import { UserSettingRDO, UserSettingDTO } from '../types';
import { roundForTwoDigits } from 'entities/templates';

export const recountPercentWeight = (users: UserSettingRDO[]): UserSettingRDO[] => {
	return users.map(({ user }) => ({
			user,
			weight: Number((HUNDRED_PERCENT / users.length).toFixed(DIGITS_AFTER_COMMA)),
		}),
	);
};

export const recountPercentWeightNew = (users: UserSettingDTO[]): UserSettingDTO[] => {
	return users.map(({ user }) => ({
			user,
			weight: roundForTwoDigits(Number((HUNDRED_PERCENT / users.length)))
		}),
	);
};