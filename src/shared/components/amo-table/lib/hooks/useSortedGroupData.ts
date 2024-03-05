import { useMemo } from 'react';
import { TableHeaderValue } from 'shared/components/amo-table';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { groupBy } from 'shared/utils/helpers';

export const useSortedGroupData = <T>(data: T[], groupField: keyof T, headers: TableHeaderValue<T>): T[] => {

	const { sortType } = useFilterContext<T>();

	const sortedData = useMemo<T[]>(() => {

		const groupedData = groupBy(data, groupField);

		if (!sortType) {
			return Object.values(groupedData).flat();
		}

		const selectedHeaderSort = headers[sortType?.field]?.sort!;

		const { compareFunc } = selectedHeaderSort[sortType.type];

		return Object.values(groupedData).map(group => group.sort(compareFunc)).flat();

	}, [data, sortType?.type, sortType?.field, groupField]);

	return sortedData;

};