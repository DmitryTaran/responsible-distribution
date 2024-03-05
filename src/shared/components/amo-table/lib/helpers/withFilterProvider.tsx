import React, { ComponentType, Key } from 'react';
import { TableContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { FilterStore } from 'shared/components/table-filter-menu/lib/store/FilterStore';

const withFilterProvider = <T,>(Component: ComponentType<T>): (props: T & { key?: Key }) => JSX.Element => {

	return (props) => (
		<TableContext.Provider value={{
			filter: new FilterStore(),
		}}>
			<Component {...props}/>
		</TableContext.Provider>
	);
};

export default withFilterProvider;
