import dayjs from 'dayjs';
import { TABLE_DATE_FORMAT } from 'entities/report/consts/consts';
import { distributionTypesOptions, TemplateDTO } from 'entities/templates';
import React from 'react';
import { TableHeaderValue } from 'shared/components/amo-table';
import FilterDate from 'shared/components/table-filter-menu/components/filter-date/FilterDate';
import FilterInput from 'shared/components/table-filter-menu/components/filter-input/FilterInput';
import { dateSort, stringSort } from 'shared/components/table-filter-menu/lib/utils/sortCompareFuncs';
import {
	filterDateRangeValue,
	filterSelectValue,
	filterStringValue
} from 'shared/components/table-filter-menu/lib/utils/filterFuncs';
import { FilterSelect } from 'shared/components/table-filter-menu/components/filter-select/FilterSelect';
import TemplateInvalidCellWrapper
	from 'widgets/templates/template-list/components/template-invalid-cell-wrapper/TemplateInvalidCellWrapper';
import $dayjs from 'shared/config/dayjsConfig';
import { account } from 'shared/consts/AMO.consts';

export const templateListHeaders: TableHeaderValue<TemplateDTO> = {
	name: {
		name: 'Название',
		spacing: '40%',
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
		filterConfig: {
			FilterType: FilterInput,
			customFilterFunc: (data, matchValue) =>
				filterStringValue(data, matchValue as string, 'name')
		},
	},
	distributionTypeName: {
		name: 'Тип распределения',
		spacing: '20%',
		filterConfig: {
			FilterType: (props) => <FilterSelect {...props} options={distributionTypesOptions}/>,
			customFilterFunc: (data, matchValue) => filterSelectValue(data, matchValue as string, 'distributionType')
		},
	},
	createdAt: {
		name: 'Дата создания',
		spacing: '20%',
		sort: {
			asc: {
				label: 'Сначала старые',
				compareFunc: (a, b) => dateSort(a.createdAt, b.createdAt),
			},
			desc: {
				label: 'Сначала новые',
				compareFunc: (a, b) => dateSort(b.createdAt, a.createdAt),
			},
		},
		renderCell: ({ createdAt }) => <>{$dayjs(createdAt).tz(account.timezone).format(TABLE_DATE_FORMAT)}</>,
		filterConfig: {
			FilterType: FilterDate,
			customFilterFunc: (data, matchValue) => filterDateRangeValue(data, matchValue, 'createdAt')
		},
	},
	updatedAt: {
		name: 'Дата последнего изменения',
		spacing: '20%',
		sort: {
			asc: {
				label: 'Сначала старые',
				compareFunc: (a, b) => dateSort(a.updatedAt, b.updatedAt),
			},
			desc: {
				label: 'Сначала новые',
				compareFunc: (a, b) => dateSort(b.updatedAt, a.updatedAt),
			},
		},
		renderCell: ({ updatedAt, isValid }) => {

			return (
				<TemplateInvalidCellWrapper
					isValid={isValid}
				>
					{$dayjs(updatedAt).tz(account.timezone).format(TABLE_DATE_FORMAT)}
				</TemplateInvalidCellWrapper>
			);
		},
		filterConfig: {
			FilterType: FilterDate,
			customFilterFunc: (data, matchValue) => filterDateRangeValue(data, matchValue, 'updatedAt')
		},
	},
};
