import { ConversionReportRenderingItem } from 'entities/report/types/ConversionReportDTO';
import { conversionSortableFields } from 'features/reports/conversion-chart/lib/consts';
import { useSortedChartData } from 'features/reports/conversion-chart/lib/hooks/useSortedChartData';
import React, { useMemo } from 'react';
import CustomBarChart from 'shared/components/custom-bar-chart/CustomBarChart';
import { ChartData } from 'shared/components/custom-pie-chart/lib/types/ChartData';
import { conversionReportTableHeaders } from 'widgets/conversion-report/lib/consts/conversionReportTableHeaders';
import ChartPlaceholder from 'shared/components/custom-pie-chart/components/chart-placeholder/ChartPlaceholder';
import Box from '@mui/material/Box';
import { useGetFallback } from 'features/reports/conversion-chart/lib/hooks/useGetFallback';

type ConversionBarChartProps = {
	data: ConversionReportRenderingItem[]
	fallback: string
}

const ConversionBarChart = ({ data, fallback }: ConversionBarChartProps): JSX.Element => {

	const sortedData = useSortedChartData(data, conversionSortableFields, conversionReportTableHeaders);

	const barChartData = useMemo<Omit<ChartData, 'percent'>[]>(() => {
		return sortedData.map((dataItem) => ({
			id: String(dataItem.id),
			value: dataItem.conversion,
			name: dataItem.name,
		})).reverse();
	}, [ sortedData ]);

	return (
		barChartData.length
			? <CustomBarChart data={barChartData}/>
			: <Box
				display="flex"
				gap="65px"
				alignItems="center"
			>
				<ChartPlaceholder
					text={fallback}
				/>
			</Box>
	);
};

export default ConversionBarChart;