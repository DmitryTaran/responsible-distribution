import { GROUPS } from 'shared/consts/AMO.consts';

export const getGroupColorIndex = (groupId: string): number => {
	return Object.keys(GROUPS).indexOf(groupId);
};