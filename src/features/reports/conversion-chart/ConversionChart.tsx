import { ConversionReportRenderingItem } from 'entities/report/types/ConversionReportDTO';
import ConversionBarChart from 'features/reports/conversion-chart/components/conversion-bar-chart/ConversionBarChart';
import ConversionPieChart from 'features/reports/conversion-chart/components/conversion-pie-chart/ConversionPieChart';
import { ConversionSelectKeys } from 'features/reports/conversion-chart/lib/consts';
import React, { useMemo } from 'react';
import { AllLeadsDataDTO } from 'entities/report/types/AllLeadsDataDTO';
import { useGetFallback } from 'features/reports/conversion-chart/lib/hooks/useGetFallback';

type ConversionBarChartProps = {
	data: ConversionReportRenderingItem[]
	chartType: ConversionSelectKeys
	allDealsData?: AllLeadsDataDTO
}

const ConversionChart = ({ data, chartType, allDealsData }: ConversionBarChartProps): JSX.Element => {

	const leadsCount = useMemo<number>(
		() => data.reduce((accum, dataItem) => dataItem.leads + accum, 0),
		[ data ],
	);

	const fallback = useGetFallback(leadsCount, Boolean(allDealsData?.conversion));


	return (
		<>
			{chartType === ConversionSelectKeys.Conversion
				? <ConversionBarChart data={data} fallback={fallback}/>
				: <ConversionPieChart leadsCount={leadsCount} data={data} fallback={fallback}/>
			}
		</>
	);
};

export default ConversionChart;