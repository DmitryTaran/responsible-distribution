import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React, { ComponentType, useState } from 'react';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { FilterLabelStyle } from 'shared/components/table-filter-menu/styles';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';
import { FilterMatchValues, TableId } from 'shared/components/amo-table/lib/types';

type TableFilterProps<T, U, V extends TableId> = {
	field: keyof T
	onClose: () => void
	Filter: ComponentType<FilterInputProps<U>>
	onRowCheck?: (ids: V[]) => void
}
const TableFilter = <T, U extends FilterMatchValues, V extends TableId>({
	field,
	onClose,
	Filter,
	onRowCheck
}: TableFilterProps<T, U, V>): JSX.Element => {
	const filterStore = useFilterContext<T>();

	const [ match, setMatch ] = useState<U>((filterStore.filters.get(field) || ''));

	const handleConfirmClick = (matchValue: U): void => {
		if (matchValue) {
			filterStore.addFilter({ field, match: matchValue });
		} else {
			filterStore.removeFilter(field);
		}
		filterStore.setPage(1);
		onRowCheck && onRowCheck([]);
		onClose();
	};

	const handleCancelFilter = (): void => {
		filterStore.removeFilter(field);
		filterStore.setPage(1);
		onClose();
	};

	return (
		<Box
			display="flex"
			sx={{
				'&:focus': {
					outline: 'none',
				},
			}}
			flexDirection="column"
			tabIndex={-1}
			onKeyDown={(e) => {
				if (e.key === 'Enter') {
					handleConfirmClick(match);
				}
			}}
		>
			<Typography sx={FilterLabelStyle}>
				Фильтр
			</Typography>
			<Filter
				matchValue={match}
				onChange={(value) => setMatch(value)}
				handleConfirm={handleConfirmClick}
				handleCancel={handleCancelFilter}
			/>
		</Box>
	);
};

export default TableFilter;