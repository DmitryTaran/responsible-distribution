import { RenderingGroup } from 'entities/report';
import { User } from 'entities/report/types/UserChartDTO';
import { UserReportsRenderingData } from 'entities/report/types/UserReportDTO';
import { sortableFields } from 'widgets/user-report/lib/consts';
import React, { useMemo } from 'react';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { ChartWithLabels } from 'shared/components/custom-pie-chart';
import { ASC_SORT } from 'shared/components/table-filter-menu/lib/store/FilterStore';
import { stringSort } from 'shared/components/table-filter-menu/lib/utils/sortCompareFuncs';
import { MANAGERS } from 'shared/consts/AMO.consts';
import { HUNDRED_PERCENT } from 'shared/consts/const';
import { AllLeadsDataDTO } from 'entities/report/types/AllLeadsDataDTO';

type UsersChartProps = {
	data?: User[]
	totalLeadsCount?: number
	allLeadsData?: AllLeadsDataDTO
}

const UsersChart = ({ data, totalLeadsCount, allLeadsData }: UsersChartProps): JSX.Element => {

	const { sortType } = useFilterContext<UserReportsRenderingData>();

	const sortedData = useMemo<User[]>(() => {
			if (!data) {
				return [];
			}
			return sortableFields.includes(sortType?.field || '')
				? Array.from(data.sort((a, b) => {
					const firstManager = MANAGERS[Number(a.id)].title;
					const secondManager = MANAGERS[Number(b.id)].title;
					return sortType?.type === ASC_SORT
						? stringSort(firstManager, secondManager)
						: stringSort(secondManager, firstManager);
				}))
				: data;
		},
		[ data, sortType?.type, sortType?.field ]);
	const renderingChartData = useMemo<RenderingGroup[]>(() =>
		sortedData.map(user => ({
			id: user.id,
			value: user.leads,
			name: MANAGERS[Number(user.id)]?.title,
			percent: Math.round((user.leads / Number(totalLeadsCount)) * HUNDRED_PERCENT),
		})), [ sortedData ]);

	return (
		<ChartWithLabels
			data={renderingChartData}
			total={totalLeadsCount || 0}
			fallbackText={allLeadsData?.totalLeads && 'Недостаточно данных для построения отчета'}
		/>
	);
};

export default UsersChart;