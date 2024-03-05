import { Box } from '@mui/material';
import { RenderingGroup, useGetGroupReport } from 'entities/report';
import { defaultDateEnd, defaultDateStart } from 'entities/report/consts/consts';
import { groupReportTableHeaders } from 'widgets/group-report/lib/consts/groupReportTableHeaders';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useState } from 'react';
import { TableContent } from 'shared/components/amo-table';
import withFilterProvider from 'shared/components/amo-table/lib/helpers/withFilterProvider';
import { useFilteredData } from 'shared/components/amo-table/lib/hooks/useFilteredData';
import { usePagedData } from 'shared/components/amo-table/lib/hooks/usePagedData';
import { useSortedData } from 'shared/components/amo-table/lib/hooks/useSortedData';
import ContentLayout from 'shared/components/content-layout/ContentLayout';
import { CustomDatePicker } from 'shared/components/custom-date-picker';
import DateRangeInputChart
	from 'shared/components/custom-date-picker/components/custom-date-range-input-chart/DateRangeInputChart';
import { DateRangeType } from 'shared/components/custom-date-picker/lib/types';
import { ChartWithLabels } from 'shared/components/custom-pie-chart';
import { GROUPS } from 'shared/consts/AMO.consts';
import { HUNDRED_PERCENT } from 'shared/consts/const';
import { CHART_PLACEHOLDER_Z_INDEX } from 'shared/components/custom-pie-chart/lib/consts';
import { useGetAllLeadsCount } from 'entities/report/swr/useGetAllLeadsCount';

export const GroupReport = withFilterProvider(observer((): JSX.Element => {

	const [ dateRange, setDateRange ] = useState<DateRangeType>([ defaultDateStart, defaultDateEnd ]);

	const { data: groupReportData } = useGetGroupReport(...dateRange);
	const groupReportWithGroups = useMemo<RenderingGroup[]>(() =>
		groupReportData?.groups?.map(group => ({
			id: group.id,
			value: group.leads,
			name: GROUPS[`group_${group.id}`],
			percent: Math.round((group.leads / groupReportData?.totalLeads) * HUNDRED_PERCENT),
		})) || [], [ groupReportData ]);

	const { data: allDealsData } = useGetAllLeadsCount();

	const filteredData = useFilteredData(groupReportWithGroups, groupReportTableHeaders);

	const sortedAndFilteredData = useSortedData(filteredData, groupReportTableHeaders);

	const leadsCount = useMemo(() => sortedAndFilteredData.reduce((accum, dataItem) => accum + dataItem.value, 0), [ sortedAndFilteredData ]);

	const pagedData = usePagedData(sortedAndFilteredData);

	return (
		<>
			<ContentLayout>
				<Box position="relative">
					<Box position="absolute" right="0" zIndex={CHART_PLACEHOLDER_Z_INDEX + 1}>
						<CustomDatePicker
							CustomInput={DateRangeInputChart}
							dateRange={dateRange}
							onChange={(dateRange) => {
								setDateRange(dateRange);
							}}
							placement={'bottom-end'}
						/>
					</Box>
					<ChartWithLabels
						data={sortedAndFilteredData}
						total={leadsCount}
						fallbackText={!allDealsData?.totalLeads && 'Недостаточно данных для построения отчета'}
					/>
				</Box>
			</ContentLayout>
			<ContentLayout>
				<TableContent
					data={pagedData}
					headers={groupReportTableHeaders}
					totalCount={groupReportWithGroups.length}
				/>
			</ContentLayout>
		</>

	);
}));
