import dayjs from 'dayjs';
import { TABLE_DATE_FORMAT } from 'entities/report/consts/consts';
import { UserReportsRenderingData } from 'entities/report/types/UserReportDTO';
import { TableHeaderValue } from 'shared/components/amo-table';
import FilterDate from 'shared/components/table-filter-menu/components/filter-date/FilterDate';
import FilterInput from 'shared/components/table-filter-menu/components/filter-input/FilterInput';
import { stringSort } from 'shared/components/table-filter-menu/lib/utils/sortCompareFuncs';
import LeadRef from 'widgets/user-report/components/lead-ref/LeadRef';
import $dayjs from 'shared/config/dayjsConfig';
import { account } from 'shared/consts/AMO.consts';

export const userReportHeaders: TableHeaderValue<UserReportsRenderingData> = {
	createdAt: {
		name: 'Дата',
		key: 'createdAt',
		sort: {
			asc: { label: 'Сначала старые' },
			desc: { label: 'Сначала новые' },
		},
		spacing: '17%',
		renderCell: ({ createdAt }) => <>{$dayjs(createdAt).tz(account.timezone).format(TABLE_DATE_FORMAT)}</>,
		filterConfig: {
			FilterType: FilterDate,
		},
	},
	user: {
		name: 'Пользователь',
		key: 'user',
		spacing: '20%',
		sort: {
			asc: {
				label: 'По возрастанию',
				compareFunc: (a, b) => stringSort(a.id, b.id),
			},
			desc: {
				label: 'По убыванию',
				compareFunc: (a, b) => stringSort(b.id, a.id),
			},
		},
		filterConfig: {
			FilterType: FilterInput,
		},
	},
	group: {
		name: 'Группа',
		key: 'group',
		spacing: '20%',
		sort: {
			asc: {
				label: 'По возрастанию',
			},
			desc: {
				label: 'По убыванию',
			},
		},
		filterConfig: {
			FilterType: FilterInput,
		},
	},
	template: {
		name: 'Шаблон',
		key: 'template',
		spacing: '20%',
		sort: {
			asc: {
				label: 'По возрастанию',
			},
			desc: {
				label: 'По убыванию',
			},
		},
		filterConfig: {
			FilterType: FilterInput,
		},
	},
	lead: {
		name: 'Сделка',
		spacing: '23%',
		renderCell: ({ lead }) => <LeadRef {...lead}/>,
	},
};