import { useMemo } from 'react';
import { TableHeaderValue } from 'shared/components/amo-table';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';

export const useSortedChartData = <T>(
	data: T[],
	sortableFields: (keyof T)[],
	headers: TableHeaderValue<T>,
): T[] => {
	const { sortType } = useFilterContext<T>();

	const sortedData = useMemo<T[]>(() => {
		if (sortType && sortableFields.includes(sortType?.field)) {
			const { compareFunc } = headers[sortType?.field]?.sort![sortType?.type!]!;
			return Array.from(data.sort(compareFunc))
		}
		return data;
	}, [ data, sortType?.type, sortType?.field ]);
	return sortedData;
};

