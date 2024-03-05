import LabelItem from 'shared/components/custom-pie-chart/components/chart-label-item/LabelItem';
import { ChartColors } from 'shared/theme/AmoLightTheme';
import { Box } from '@mui/material';
import React from 'react';
import { ChartData } from 'shared/components/custom-pie-chart/lib/types/ChartData';

type ChartLabelsListProps = {
	data: ChartData[]
	labelLimit?: number
}

const ChartLabelsList = ({ data, labelLimit = 30 }: ChartLabelsListProps): JSX.Element => {
	return (
		<Box
			display="flex"
			flexWrap="wrap"
			alignItems="center"
			rowGap="15px"
			columnGap="10px"
		>
			{data
				.slice(0, labelLimit)
				.map(({ id, ...data }, index) => (
					<LabelItem
						key={id}
						color={
							ChartColors[index % ChartColors.length]
						}
						{...data}
					/>
				))}
		</Box>
	);
};

export default ChartLabelsList;