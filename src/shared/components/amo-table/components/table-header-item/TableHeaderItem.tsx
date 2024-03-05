import Box from '@mui/material/Box';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { ComponentType, useRef, useState } from 'react';
import { TableMenuContainer } from 'shared/components/amo-table/components/table-header-item/TableHeaderItem.style';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { FilterMatchValues, SortConfig, TableId } from 'shared/components/amo-table/lib/types';
import CustomPopper from 'shared/components/custom-popper/CustomPopper';
import HeaderSort from 'shared/components/table-filter-menu/components/header-sort/HeaderSort';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';
import TableFilter from 'shared/components/table-filter-menu/TableFilter';
import CircleCrossSvg from 'shared/svg/circle-cross/CircleCrossSvg';
import TrashSvg from 'shared/svg/trash/TrashSvg';
import classes from './tableHeaderItem.module.scss';

type TableHeaderItem<T, U, V extends TableId> = {
	name: string
	spacing: string
	field: keyof T
	sort?: SortConfig<T>
	Filter?: ComponentType<FilterInputProps<U>>
	onDelete?: () => void
	trashShow?: boolean
	onRowCheck?: (ids: V[]) => void
}

export const TableHeaderItem = observer(<T, U extends FilterMatchValues, V extends TableId>({
	name,
	spacing,
	sort,
	field,
	Filter,
	onDelete,
	trashShow,
	onRowCheck,
}: TableHeaderItem<T, U, V>): JSX.Element => {

	const filterStore = useFilterContext<T>();
	const { sortType, filters } = filterStore;

	const [anchor, setAnchor] = useState<HTMLSpanElement | null>(null);
	const headerRef = useRef<HTMLTableCellElement>(null);

	const [isCrossShow, setIsCrossShow] = useState(false);

	const isHeaderSelected = sortType?.field === field;

	const handleFilterCrossClick = (): void => {
		if (filters.has(field)) {
			filterStore.removeFilter(field);
			filterStore.setPage(1);
		}
		if (isHeaderSelected) {
			filterStore.setSortType(null);
		}
		setAnchor(null);
		setIsCrossShow(false);
	};

	const hasFilters = Boolean(sort || Filter);

	const handleHeaderLabelClick = (): void => {
		if (hasFilters) {
			anchor
				? setAnchor(null)
				: setAnchor(headerRef.current);
		}
	};

	const popperLabelId = `reon-${String(field)}-label`;

	return (
		<>
			<th
				ref={headerRef}
				key={name}
				style={{ width: spacing }}
				className={classes['table-head']}
				onMouseEnter={() => {
					if (isHeaderSelected || filters.has(field)) {
						setIsCrossShow(true);
					}
				}}
				onMouseLeave={() => setIsCrossShow(false)}
			>
				<div
					className={classes['header-text-wrapper']}
				>
					<div
						id={popperLabelId}
						className={classes['title-with-cross']}
					>
						<div
							className={cn(
								classes['title-with-cross-text'],
								(isHeaderSelected || Boolean(anchor) || filters.has(field)) && classes['title-with-cross-text-selected'],
								hasFilters && classes['title-with-cross-text-selectable'],
							)}
							onClick={handleHeaderLabelClick}
						>
							{name}
						</div>
						{isCrossShow &&
                            <div
                                className={classes.cross}
                                onClick={handleFilterCrossClick}
                            >
                                <CircleCrossSvg/>
                            </div>
						}
					</div>
					{trashShow &&
                        <div
                            className={classes.trash}
                            onClick={onDelete}
                        >
                            <TrashSvg/>
                        </div>
					}
				</div>
			</th>
			<CustomPopper
				anchorId={popperLabelId}
				anchor={anchor}
				setAnchor={setAnchor}
			>
				<Box sx={TableMenuContainer}>
					{sort &&
                        <HeaderSort
                            field={field}
                            sort={sort}
                            onClose={() => setAnchor(null)}
                        />
					}
					{Filter &&
                        <TableFilter
                            Filter={Filter}
                            field={field}
                            onClose={() => setAnchor(null)}
                            onRowCheck={onRowCheck}
                        />
					}
				</Box>
			</CustomPopper>
		</>
	);
});

