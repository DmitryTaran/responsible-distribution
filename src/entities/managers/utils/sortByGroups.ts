import { GROUPS } from 'shared/consts/AMO.consts';
import { SortedGroup } from 'shared/types/AMO.types';
import { ManagerDTO, RenderingManager } from '../types/ManagerDTO';

export const sortByGroups = (
	managers: RenderingManager[] | undefined,
): SortedGroup[] => {
	if (!managers) {
		return [];
	}
	return Object.entries(GROUPS).map(([id, name], index) => {
			const managersFromGroup = managers.filter((manager) => manager.group === id);
			return {
				id,
				name: name as string,
				managers: managersFromGroup,
				managersIds: managersFromGroup.map((manager) => manager.userId),
				mongoIds: managersFromGroup.map((manager) => manager.id),
				colorIndex: index,
			};
		}).filter((group) => Boolean(group.managers.length));
};
