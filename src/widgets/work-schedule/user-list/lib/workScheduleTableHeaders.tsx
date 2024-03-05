import { TableHeaderValue } from 'shared/components/amo-table';
import FilterInput from 'shared/components/table-filter-menu/components/filter-input/FilterInput';
import { stringSort } from 'shared/components/table-filter-menu/lib/utils/sortCompareFuncs';
import DayFilterMultiselect
	from 'widgets/work-schedule/user-list/components/day-filter-multiselect/DayFilterMultiselect';
import { filterStringGroupedValue } from 'shared/components/table-filter-menu/lib/utils/filterFuncs';
import { RenderingManager } from 'entities/managers/types/ManagerDTO';
import WorkDaysCell from 'widgets/work-schedule/user-list/components/work-days-cell/WorkDaysCell';

export const workScheduleTableHeaders: TableHeaderValue<RenderingManager> = {
	userName: {
		name: 'Отдел/Имя',
		sort: {
			asc: {
				label: 'По возрастанию',
				compareFunc: (a, b) => stringSort(a.userName, b.userName),
			},
			desc: {
				label: 'По убыванию',
				compareFunc: (a, b) => stringSort(b.userName, a.userName),
			},
		},
		filterConfig: {
			customFilterFunc: (data, matchValue) =>
				filterStringGroupedValue(data, matchValue as string, 'userName', 'groupName'),
			FilterType: FilterInput,
		},
		spacing: '50%',
	},
	workSchedule: {
		name: 'График',
		spacing: '50%',
		filterConfig: {
			FilterType: DayFilterMultiselect,
			customFilterFunc: (managers, days) => {
				return managers.filter(({ workSchedule }) =>
					(days as string[]).every(day => Boolean(workSchedule[day])),
				);

			},
		},
		renderCell: ({ workSchedule }) => <WorkDaysCell workSchedule={workSchedule}/>
	},
};