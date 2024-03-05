import { TableHeaderValue } from 'shared/components/amo-table';
import { stringSort } from 'shared/components/table-filter-menu/lib/utils/sortCompareFuncs';
import FilterInput from 'shared/components/table-filter-menu/components/filter-input/FilterInput';
import { FilterMultiselect } from 'shared/components/table-filter-menu/components/filter-multiselect/FilterMultiselect';
import { statusConfig, StatusesSelectOptions } from 'entities/statuses/consts';
import { FilterSelect } from 'shared/components/table-filter-menu/components/filter-select/FilterSelect';
import { RolesNames, RolesSelectOptions } from 'entities/managers/consts';
import React from 'react';
import { RenderingManager } from 'entities/managers/types/ManagerDTO';
import { filterSelectValue, filterStringGroupedValue } from 'shared/components/table-filter-menu/lib/utils/filterFuncs';

export const statusTableHeaders: TableHeaderValue<RenderingManager> = {
	userName: {
		name: 'Отдел/Имя',
		sort: {
			asc: {
				label: 'По возрастанию',
				compareFunc: (a, b) =>
					stringSort(a.userName, b.userName),
			},
			desc: {
				label: 'По убыванию',
				compareFunc: (a, b) =>
					stringSort(b.userName, a.userName),
			},
		},
		filterConfig: {
			FilterType: FilterInput,
			customFilterFunc: (data, matchValue) =>
				filterStringGroupedValue(data, matchValue as string, 'userName', 'groupName'),
		},
		spacing: '50%',
	},
	status: {
		name: 'Статус',
		spacing: '25%',
		filterConfig: {
			FilterType: (props) =>
				<FilterMultiselect
					{...props}
					options={Object.entries(StatusesSelectOptions).map(([ id, name ]) => ({
						id,
						name
					}))}
				/>,
			customFilterFunc: (managers, matchValue) => managers.filter(({ status }) => matchValue.includes(status)),
		},
		renderCell: ({ status }) => {
			const { icon, name } = statusConfig[status];
			return (
				<>
					{icon}
					<span style={{ marginLeft: '10px' }}>
					{name}
					</span>
				</>
			);
		},
	},
	widgetRole: {
		name: 'Роль',
		spacing: '25%',
		renderCell: ({ widgetRole }) => <>{RolesNames[widgetRole]}</>,
		filterConfig: {
			FilterType: (props) => <FilterSelect {...props} options={RolesSelectOptions}/>,
			customFilterFunc: (data, matchValue) => filterSelectValue(data, matchValue as string, 'widgetRole'),
		},
	},

};