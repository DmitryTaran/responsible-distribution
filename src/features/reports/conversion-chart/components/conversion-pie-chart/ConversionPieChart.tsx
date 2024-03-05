import { ConversionReportRenderingItem } from 'entities/report/types/ConversionReportDTO';
import { countSortableFields } from 'features/reports/conversion-chart/lib/consts';
import { useSortedChartData } from 'features/reports/conversion-chart/lib/hooks/useSortedChartData';
import React, { useMemo } from 'react';
import { ChartWithLabels } from 'shared/components/custom-pie-chart';
import { ChartData } from 'shared/components/custom-pie-chart/lib/types/ChartData';
import { HUNDRED_PERCENT } from 'shared/consts/const';
import { conversionReportTableHeaders } from 'widgets/conversion-report/lib/consts/conversionReportTableHeaders';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { useGetFallback } from 'features/reports/conversion-chart/lib/hooks/useGetFallback';

type ConversionPieChartProps = {
	data: ConversionReportRenderingItem[];
	leadsCount: number
	fallback: string
};

const ConversionPieChart = ({ data, fallback, leadsCount }: ConversionPieChartProps): JSX.Element => {

	const sortedData = useSortedChartData(
		data,
		countSortableFields,
		conversionReportTableHeaders,
	);


	const pieChartData = useMemo<ChartData[]>(() => {
		return sortedData.map(({ id, leads, name }) => ({
			id: String(id),
			value: leads,
			name: name,
			percent: Math.round(
				(leads / leadsCount) * HUNDRED_PERCENT,
			),
		}));
	}, [ sortedData ]);


	return (
		<ChartWithLabels
			data={pieChartData}
			total={leadsCount}
			fallbackText={fallback}
		/>
	);
};

export default ConversionPieChart;
