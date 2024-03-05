import { ConversionReportRenderingItem } from 'entities/report/types/ConversionReportDTO';
import { DIGITS_AFTER_COMMA } from 'entities/templates';
import TemplateCell from 'features/templates/template-cell/TemplateCell';
import TemplateFilter from 'features/templates/template-filter/TemplateFilter';
import { TableHeaderValue } from 'shared/components/amo-table';
import FilterInput from 'shared/components/table-filter-menu/components/filter-input/FilterInput';
import { numericSort, stringSort } from 'shared/components/table-filter-menu/lib/utils/sortCompareFuncs';
import { filterStringValue } from 'shared/components/table-filter-menu/lib/utils/filterFuncs';

export const conversionReportTableHeaders: TableHeaderValue<ConversionReportRenderingItem> = {
	name: {
		name: 'Пользователь',
		spacing: '20%',
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
				filterStringValue(data, String(matchValue), 'name'),
		},
	},
	template: {
		name: 'Шаблон',
		spacing: '20%',
		renderCell: ({ template }) => <TemplateCell value={template}/>,
		filterConfig: {
			FilterType: TemplateFilter,
			customFilterFunc: (data, matchValue) => filterStringValue(data, String(matchValue), 'template'),
		},
	},
	leads: {
		name: 'Полученные сделки',
		spacing: '20%',
		sort: {
			asc: {
				label: 'По возрастанию',
				compareFunc: (a, b) => numericSort(a.leads, b.leads),
			},
			desc: {
				label: 'По убыванию',
				compareFunc: (a, b) => numericSort(b.leads, a.leads),
			},
		},
	},
	successLeads: {
		name: 'Успешные сделки',
		spacing: '20%',
		sort: {
			asc: {
				label: 'По возрастанию',
				compareFunc: (a, b) => numericSort(a.successLeads, b.successLeads),
			},
			desc: {
				label: 'По убыванию',
				compareFunc: (a, b) => numericSort(b.successLeads, a.successLeads),
			},
		},
	},
	conversion: {
		name: 'Конверсия',
		spacing: '20%',
		sort: {
			asc: {
				label: 'По возрастанию',
				compareFunc: (a, b) => numericSort(a.conversion, b.conversion),
			},
			desc: {
				label: 'По убыванию',
				compareFunc: (a, b) => numericSort(b.conversion, a.conversion),
			},
		},
		renderCell: ({ conversion }) => <div>{conversion.toFixed(DIGITS_AFTER_COMMA)}%</div>,
	},
};
