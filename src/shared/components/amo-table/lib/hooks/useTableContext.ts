import { Context, createContext, useContext } from 'react';
import { FilterStore } from 'shared/components/table-filter-menu/lib/store/FilterStore';
import { TableContextType } from '../types';

export const TableContext = createContext<null | unknown>(null);

export const useFilterContext = <T>(): FilterStore<T> => {
	const {filter} = useContext(TableContext as Context<TableContextType<T>>);
	if (!filter) {
		throw new Error('useTableContext is not available');
	}
	return filter
};