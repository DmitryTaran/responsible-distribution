import React, { ReactNode } from 'react';
import { Box } from '@mui/material';
import CustomPieChartRecharts from 'shared/components/custom-pie-chart/components/custom-chart/CustomPieChartRecharts';
import { ChartData } from 'shared/components/custom-pie-chart/lib/types/ChartData';
import ChartLabelsList from 'shared/components/custom-pie-chart/components/chart-labels-list/ChartLabelsList';
import ChartPlaceholder from 'shared/components/custom-pie-chart/components/chart-placeholder/ChartPlaceholder';

type ChartWithLabelsProps = {
	total: number;
	data: ChartData[];
	labelLimit?: number;
	fallbackText?: ReactNode
};

export const ChartWithLabels = ({
	data,
	total,
	labelLimit = 30,
	fallbackText,
}: ChartWithLabelsProps): JSX.Element => {
	return (
		<Box
			display="flex"
			gap="65px"
			alignItems="center"
		>
			{Boolean(data.length)
				? <>
					<div>
						<CustomPieChartRecharts
							total={total}
							size={349}
							data={data}
						/>
					</div>
					<ChartLabelsList
						data={data}
						labelLimit={labelLimit}
					/>
				</>
				: <ChartPlaceholder
					 text={fallbackText}
				/>
			}
		</Box>
	);
};
