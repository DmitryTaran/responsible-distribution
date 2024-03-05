import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { SortConfig } from 'shared/components/amo-table/lib/types';
import { SortHeader } from 'shared/components/table-filter-menu/components/header-sort/HeaderSort.style';
import { SortType } from 'shared/components/table-filter-menu/lib/store/FilterStore';
import classes from '../../lib/styles/filter.module.scss';
import cn from 'classnames';

type SortSelectProps<T> = {
	sort: SortConfig<T>
	field: keyof T
	onClose: () => void
}

const HeaderSort = observer(<T, >({ sort, field, onClose }: SortSelectProps<T>): JSX.Element => {

	const filterStore = useFilterContext<T>();

	const handleSortClick = (sort: SortType): void => {
		if (filterStore.sortType?.field === field && filterStore.sortType.type === sort) {
			filterStore.setSortType(null);
		} else {
			filterStore.setSortType({ field, type: sort });
		}
		onClose();
	};

	const isFieldSelected = field === filterStore.sortType?.field;

	return (
		<div>
			<Typography sx={SortHeader}>
				Сортировка
			</Typography>
			{Object.entries(sort).map(([sortType, { label }]) =>
				<div
					key={label}
					style={{ cursor: 'pointer' }}
					onClick={() => handleSortClick(sortType as SortType)}
				>
					<div
						className={cn(
							classes['select-item'],
							isFieldSelected && sortType === filterStore.sortType?.type && classes['select-item-selected'],
						)}
					>
						{label}
					</div>
				</div>,
			)}
		</div>
	);
});

export default HeaderSort;