import { RenderingGroup } from 'entities/report';
import { TableHeaderValue } from 'shared/components/amo-table';
import FilterInput from 'shared/components/table-filter-menu/components/filter-input/FilterInput';
import { numericSort, stringSort } from 'shared/components/table-filter-menu/lib/utils/sortCompareFuncs';
import { filterStringValue } from 'shared/components/table-filter-menu/lib/utils/filterFuncs';

export const groupReportTableHeaders: TableHeaderValue<RenderingGroup> = {
		name: {
			name: 'Отдел',
			spacing: '50%',
			filterConfig: {
				FilterType: FilterInput,
				customFilterFunc: (data, matchValue) =>
					filterStringValue(data, matchValue as string, 'name'),
			},
			sort: {
				asc: {
					label: 'По возрастанию',
					compareFunc: (a, b) => stringSort(a.name, b.name),
				},
				desc: {
					label: 'По убыванию',
					compareFunc: (a, b) => stringSort(b.name, a.name),
				},
			},
		},
		value: {
			name: 'Количество сделок',
			spacing: '50%',
			sort: {
				asc: {
					label: 'По возрастанию',
					compareFunc: (a, b) => numericSort(a.value, b.value),
				},
				desc: {
					label: 'По убыванию',
					compareFunc: (a, b) => numericSort(b.value, a.value),
				},
			},
		},
	}


;