import { useMemo } from 'react';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';

export const usePagedData = <T, >(data: T[]): T[] => {
	const { limit, page } = useFilterContext();

	const pagedData = useMemo<T[]>(() => {
		const firstPageIndex = (page - 1) * limit;
		const lastPageIndex = firstPageIndex + limit;
		return data.slice(firstPageIndex, lastPageIndex);
	}, [data, limit, page]);

	return pagedData;
};