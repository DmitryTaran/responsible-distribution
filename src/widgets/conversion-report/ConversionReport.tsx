import Box from '@mui/material/Box';
import { defaultDateEnd, defaultDateStart } from 'entities/report/consts/consts';
import { useGetConversionReport } from 'entities/report/swr/useGetConversionReport';
import { ConversionReportRenderingItem } from 'entities/report/types/ConversionReportDTO';
import { DistributionTypes, useFilteredTemplates } from 'entities/templates';
import ConversionChart from 'features/reports/conversion-chart/ConversionChart';
import { ConversionSelectItems, ConversionSelectKeys } from 'features/reports/conversion-chart/lib/consts';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useState } from 'react';
import { TableContent } from 'shared/components/amo-table';
import withFilterProvider from 'shared/components/amo-table/lib/helpers/withFilterProvider';
import { useFilteredData } from 'shared/components/amo-table/lib/hooks/useFilteredData';
import { usePagedData } from 'shared/components/amo-table/lib/hooks/usePagedData';
import { useSortedData } from 'shared/components/amo-table/lib/hooks/useSortedData';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import ContentLayout from 'shared/components/content-layout/ContentLayout';
import { CustomDatePicker } from 'shared/components/custom-date-picker';
import DateRangeInputChart
	from 'shared/components/custom-date-picker/components/custom-date-range-input-chart/DateRangeInputChart';
import { DateRangeType } from 'shared/components/custom-date-picker/lib/types';
import { MANAGERS } from 'shared/consts/AMO.consts';
import { conversionReportTableHeaders } from 'widgets/conversion-report/lib/consts/conversionReportTableHeaders';
import OutlinedSelect from 'shared/components/outlined-select/OutlinedSelect';
import { CHART_PLACEHOLDER_Z_INDEX } from 'shared/components/custom-pie-chart/lib/consts';
import { useGetAllLeadsCount } from 'entities/report/swr/useGetAllLeadsCount';

const ConversionReport = withFilterProvider(observer((): JSX.Element => {

	const [ dateRange, setDateRange ] = useState<DateRangeType>([ defaultDateStart, defaultDateEnd ]);

	const [ selectedChart, setSelectedChart ] = useState(ConversionSelectKeys.Conversion);

	const filtersStore = useFilterContext<ConversionReportRenderingItem>();

	const { filters } = filtersStore;

	const conversionTemplates = useFilteredTemplates(DistributionTypes.CONVERSION);

	const initialTemplate = conversionTemplates[0]?.id!;

	const { data: conversionData, isLoading: isConversionDataLoading } = useGetConversionReport({
		dateFrom: dateRange[0],
		dateTo: dateRange[1],
		template: filters.get('template') as string ?? initialTemplate,
	});

	const reportWithUsers = useMemo<ConversionReportRenderingItem[]>(() =>
			conversionData?.users?.map(user => ({
					template: filters.get('template') as string ?? initialTemplate,
					name: MANAGERS[user.id].title,
					...user,
				}),
			) || [],
		[ conversionData?.users ]);

	const { data: allDealsData } = useGetAllLeadsCount();

	const filteredData = useFilteredData(reportWithUsers, conversionReportTableHeaders);

	const sortedAndFilteredData = useSortedData(filteredData, conversionReportTableHeaders);

	const pagedData = usePagedData(sortedAndFilteredData);

	return (
		<>
			<OutlinedSelect
				value={selectedChart}
				onChange={(value) => setSelectedChart(value)}
				options={ConversionSelectItems}
				width={158}
			/>
			<ContentLayout>
				<Box position="relative" display="flex" flexDirection="column">
					<Box sx={
						selectedChart === ConversionSelectKeys.Count || !filteredData.length
							? { position: 'absolute', right: 0, zIndex: CHART_PLACEHOLDER_Z_INDEX + 1 }
							: { alignSelf: 'end' }}
					>
						<CustomDatePicker
							CustomInput={DateRangeInputChart}
							dateRange={dateRange}
							onChange={(dateRange) => {
								setDateRange(dateRange);
							}}
							placement={'bottom-end'}
						/>
					</Box>
					<ConversionChart
						data={filteredData}
						chartType={selectedChart}
						allDealsData={allDealsData}
					/>
				</Box>
			</ContentLayout>
			<ContentLayout>
				<TableContent
					data={pagedData}
					headers={conversionReportTableHeaders}
					totalCount={sortedAndFilteredData.length}
				/>
			</ContentLayout>
		</>
	);
}));

export default ConversionReport;