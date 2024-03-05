import { useMemo } from 'react';
import { TableHeaderValue } from 'shared/components/amo-table';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';

export const useSortedData = <T, >(data: T[], headers: TableHeaderValue<T>): T[] => {

	const { sortType } = useFilterContext<T>();
	const sortedAndFilteredData = useMemo<T[]>(() => {
		if (sortType) {
			const selectedHeaderSort = headers[sortType.field]?.sort;
			const sortedData = [...data].sort(selectedHeaderSort && selectedHeaderSort[sortType.type]?.compareFunc);
			return sortedData;
		}
		return data;
	}, [data, sortType?.type, sortType?.field]);
	return sortedAndFilteredData;
};