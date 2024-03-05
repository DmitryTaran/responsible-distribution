import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import { useMemo } from 'react';
import { TableHeaderValue } from 'shared/components/amo-table';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';

dayjs.extend(isBetween);

export const useFilteredData = <T, >(data: T[], headers: TableHeaderValue<T>): T[] => {

	const { filters } = useFilterContext<T>();
	const filteredData = useMemo<T[]>(() =>
			[...filters.entries()].reduce((accumData, [field, matchValue]) => {
				const { filterConfig } = headers[field]!;
				if (!filterConfig) {
					return accumData;
				}
				return filterConfig.customFilterFunc(accumData, matchValue);
			}, data),
		[data, [...filters.entries()]]);

	return filteredData;

};