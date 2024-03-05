import cn from 'classnames';
import React from 'react';
import AmoCheckbox from 'shared/components/amo-checkbox/AmoCheckbox';
import { TableHeaderValue } from 'shared/components/amo-table';
import cl from 'shared/components/amo-table/components/table-body/amoTableBody.module.scss';
import { TableData, TableId } from 'shared/components/amo-table/lib/types';
import { TableHeaderItem } from '../table-header-item/TableHeaderItem';

type AmoTableHeaderProps<T extends TableData<U>, U extends TableId> = {
	headers: TableHeaderValue<T>;
	data: T[]
	checkbox?: boolean
	selectedRows?: U[]
	onRowCheck?: (ids: U[]) => void
	onDelete?: (ids: U[]) => void
	totalCount?: number
	selectionField?: keyof T
}


const AmoTableHead = <T extends TableData<U>, U extends TableId>({
	headers,
	checkbox,
	selectedRows,
	data,
	onRowCheck,
	onDelete,
	totalCount,
	selectionField,
}: AmoTableHeaderProps<T, U>): JSX.Element => {

	const checkboxHandler = (): void => {
		if (onRowCheck) {
			const currentSelectedRows: U[] = Boolean(selectedRows?.length)
				? []
				: data.map<U>((dataItem) => dataItem[selectionField || 'id']);
			onRowCheck(currentSelectedRows);
		}
	};
	return (
		<thead>
		<tr>
			{checkbox &&
                <th
                    className={cn(cl['checkbox-cell-head'], cl['checkbox-cell'])}
                >
                    <AmoCheckbox
                        intermediate={Boolean(selectedRows?.length) && Number(selectedRows?.length) < Number(totalCount)}
                        checked={Number(selectedRows?.length) >= Number(totalCount) && Boolean(totalCount)}
                        onChange={checkboxHandler}
                    />
                </th>
			}
			{Object.entries(headers).map(([key, {
					spacing,
					name,
					sort,
					filterConfig,
				}], index, headers) => {
					const isTrashShow =
						onDelete
						&& index === headers.length - 1
						&& Boolean(selectedRows?.length);

					return (
						<TableHeaderItem
							onRowCheck={onRowCheck}
							key={name}
							spacing={spacing}
							name={name}
							field={key}
							sort={sort}
							Filter={filterConfig?.FilterType}
							trashShow={isTrashShow}
							onDelete={() => onDelete && onDelete(selectedRows!)}
						/>
					);
				},
			)}
		</tr>
		</thead>
	);
};

export default AmoTableHead;