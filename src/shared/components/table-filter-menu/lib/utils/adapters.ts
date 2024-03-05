import { FilterData } from 'shared/components/table-filter-menu/lib/types';
import { GROUPS, MANAGERS } from 'shared/consts/AMO.consts';

export const adaptedGroups = Object.entries(GROUPS).filter(([id, _]) => id.match(/\d+/)).map(([id, name]) => ({
	id: id.match(/\d+/gm)![0],
	name: name as string
}))

export const adaptedManagers = Object.entries(MANAGERS).map(([id, {title}]) => ({
	id,
	name: title
}))

export const getFilteredIds = (data: FilterData[], matchValue: string): (number | string)[] => {
	const filteredData = data.filter((item) => item.name.toLowerCase().match(matchValue.trim().toLowerCase()))
	return filteredData.map(({id}) => id)
}