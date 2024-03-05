import cn from 'classnames';
import React, { ChangeEvent } from 'react';
import AmoCheckbox from 'shared/components/amo-checkbox/AmoCheckbox';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { TableData, TableHeaderValue, TableId } from '../../lib/types';
import cl from './amoTableBody.module.scss';

export type AmoTableBodyProps<T, U extends TableId> = {
	headers: TableHeaderValue<T>;
	data: T[]
	checkbox?: boolean
	onRowCheck?: (ids: U[]) => void
	onRowClick?: (value: T) => void
	selectedRows?: U[]
	totalCount: number
}

const AmoTableBody = <T extends TableData<U>, U extends TableId>({
	data,
	checkbox,
	headers,
	onRowClick,
	onRowCheck,
	selectedRows,
	totalCount,
}: AmoTableBodyProps<T, U>): JSX.Element => {

	const { initialLimit } = useFilterContext();

	const checkboxHandler = (event: ChangeEvent, id: U): void => {
		event?.stopPropagation();
		if (onRowCheck && selectedRows) {
			const currentSelectedRows = selectedRows.includes(id)
				? selectedRows.filter(includedId => includedId !== id)
				: [ id, ...selectedRows ];
			onRowCheck(currentSelectedRows);
		}
	};

	const hasPagination = totalCount > initialLimit;

	return (
		<tbody>
		{data.map(dataItem =>
			<tr
				key={dataItem.id}
				className={cn(
					cl['amo-table-row'],
					checkbox && selectedRows?.includes(dataItem.id) && cl['amo-table-row-selectable'],
					onRowClick && cl['amo-table-row-clickable'],
					hasPagination && cl['amo-table-row-without-border'],
					!hasPagination && cl['amo-table-row-with-border'],
				)}
				onClick={(event) => {
					event.stopPropagation();
					onRowClick && onRowClick(dataItem);
				}}
			>
				{checkbox &&
                    <td
                        className={cn(cl['checkbox-cell-body'], cl['checkbox-cell'])}
                    >
                        <AmoCheckbox
                            checked={selectedRows?.includes(dataItem.id)}
                            onChange={(event) => checkboxHandler(event, dataItem.id)}
                        />
                    </td>
				}
				{Object.entries<TableHeaderValue<T>>(headers).map(([ key, { renderCell } ]) =>
					<td
						key={String(key)}
						className={cl['amo-table-row-cell']}
					>
						<div className={cl['amo-table-row-cell-text-container']}>
							<div className={cl['amo-table-row-cell-text']}>
								{renderCell
									? renderCell(dataItem)
									: <>{dataItem[key]}</>
								}
							</div>
						</div>
					</td>,
				)}
			</tr>,
		)}
		</tbody>
	);
};
export default AmoTableBody;