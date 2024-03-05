import cn from 'classnames';
import React, { Fragment, ReactNode, useMemo } from 'react';
import { TableHeaderValue } from 'shared/components/amo-table';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { TableData, TableId } from 'shared/components/amo-table/lib/types';
import { GroupsColors } from 'shared/theme/AmoLightTheme';
import { groupBy, GroupedData } from 'shared/utils/helpers';
import cl from './amoTableBody.module.scss';
import { usePagedData } from 'shared/components/amo-table/lib/hooks/usePagedData';
import { useSortedGroupData } from 'shared/components/amo-table/lib/hooks/useSortedGroupData';
import { observer } from 'mobx-react-lite';

type GroupedTableBodyProps<T, U extends TableId> = {
	data: T[]
	groupByField: keyof T
	headers: TableHeaderValue<T>
	checkbox?: boolean
	onRowClick?: (value: T) => void
	onGroupRowClick?: (group: T[]) => void
	selectedRows?: U[]
	totalCount: number
	renderGroupRow?: (groupId: string) => ReactNode
	colorIndexFunc?: (groupId: string) => number
	selectionField?: keyof T
}

const GroupedTableBody = observer(<T extends TableData<U>, U extends TableId>({
	data,
	groupByField,
	headers,
	onRowClick,
	selectedRows,
	totalCount,
	checkbox,
	renderGroupRow,
	colorIndexFunc,
	onGroupRowClick,
	selectionField,
}: GroupedTableBodyProps<T, U>): JSX.Element => {

	const { initialLimit } = useFilterContext<T>();

	const sortedAndFilteredManagers = useSortedGroupData(data, groupByField, headers);

	const groupedData = useMemo(() => groupBy(sortedAndFilteredManagers, groupByField), [ sortedAndFilteredManagers ]);

	const pagedData = usePagedData(sortedAndFilteredManagers || []);

	const renderingData = useMemo(() => groupBy(pagedData, groupByField), [ pagedData ]);

	const hasPagination = totalCount > initialLimit;

	return (
		<tbody>
		{Object.entries<GroupedData<T>>(renderingData).map(([ groupId, data ], index) => {

				const groupColorIndex = (colorIndexFunc
					? colorIndexFunc(String(groupId))
					: index) % GroupsColors.length;

				return (<Fragment key={groupId}>
					<tr
						className={cn(
							cl['amo-table-group-row'],
							(checkbox || onGroupRowClick) && cl['amo-table-group-row-selectable'],
							data.every((dataItem) => selectedRows?.includes(dataItem[selectionField || 'id'])) && cl['amo-table-group-row-selected']
						)}
						style={{ backgroundColor: GroupsColors[groupColorIndex] }}
						onClick={() => {
							onGroupRowClick && onGroupRowClick(groupedData[groupId]);
						}}
					>
						<td
							className={cl['amo-table-group-row-cell']}
							colSpan={checkbox
								? Object.keys(headers).length + 1
								: Object.keys(headers).length
							}
						>
							{renderGroupRow
								? renderGroupRow(String(groupId))
								: groupId
							}
						</td>
					</tr>
					{data.map((dataItem) => {
							const isRowSelected = checkbox && selectedRows?.includes(dataItem[selectionField || 'id']);
							return (
								<tr
									key={dataItem.id}
									className={cn(
										cl['amo-table-row'],
										isRowSelected && cl['amo-table-row-selectable'],
										onRowClick && cl['amo-table-row-clickable'],
										hasPagination && cl['amo-table-row-without-border'],
										!hasPagination && cl['amo-table-row-with-border'],
									)}
									onClick={(event) => {
										onRowClick && onRowClick(dataItem);
									}}
								>
									{checkbox &&
                                        <td
                                            className={cn(
												cl['checkbox-cell-body'],
												isRowSelected && cl['checkbox-cell-body-selected'],
											)}>
                                        </td>
									}
									{Object.entries<TableHeaderValue<T>>(headers).map(([ key, header ]) =>
										<td
											key={String(key)}
											className={cn(
												cl['amo-table-row-cell-group']
											)}
											valign="top"
										>
											<div className={cl['amo-table-row-cell-text-container']}>
												<div className={cl['amo-table-row-cell-text']}>
													{header?.renderCell
														? header?.renderCell(dataItem)
														: String(dataItem[key])
													}
												</div>
											</div>
										</td>,
									)}
								</tr>);
						},
					)}
				</Fragment>);
			},
		)}
		</tbody>
	);
});

export default GroupedTableBody;