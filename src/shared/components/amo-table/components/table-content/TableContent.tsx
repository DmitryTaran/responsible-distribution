import React from 'react';
import AmoTableBody from 'shared/components/amo-table/components/table-body/AmoTableBody';
import AmoTableHead from 'shared/components/amo-table/components/table-header/AmoTableHead';
import { TableData, TableHeaderValue, TableId } from '../../lib/types';
import AmoTableLayout from 'shared/components/amo-table/components/table-layout/AmoTableLayout';

type TableProps<T, U extends TableId> = {
	checkbox?: boolean
	headers: TableHeaderValue<T>
	data: T[]
	totalCount: number
	onRowClick?: (value: T) => void
	onRowCheck?: (ids: U[]) => void
	selectedRows?: U[]
	onDelete?: (ids: U[]) => void
}

export const TableContent = <T extends TableData<U>, U extends TableId>({
	headers,
	checkbox,
	data,
	totalCount,
	onRowClick,
	onRowCheck,
	selectedRows,
	onDelete,
}: TableProps<T, U>): JSX.Element => {

	return (
		<AmoTableLayout
			totalCount={totalCount}
		>
			<AmoTableHead
				totalCount={totalCount}
				headers={headers}
				checkbox={checkbox}
				selectedRows={selectedRows}
				data={data}
				onRowCheck={onRowCheck}
				onDelete={onDelete}
			/>
			<AmoTableBody
				totalCount={totalCount}
				headers={headers}
				checkbox={checkbox}
				selectedRows={selectedRows}
				data={data}
				onRowClick={onRowClick}
				onRowCheck={onRowCheck}
			/>
		</AmoTableLayout>
	);
};
