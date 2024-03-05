import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';
import { ChartColors } from 'shared/theme/AmoLightTheme';
import { getWordCase } from 'shared/utils/helpers';
import { CENTER_OFFSET, PIE_WIDTH } from '../../lib/consts';
import { TextStyle } from '../custom-chart/centerText.style';
import { emptyData } from './const';

type ChartSkeleton = {
	size: number;
	centerLabel: [string, string, string];
};

const ChartSkeleton = ({ size, centerLabel }: ChartSkeleton): JSX.Element => {
	return (
		<PieChart width={size} height={size}>
			<text
				textAnchor="middle"
				dominantBaseline="middle"
				style={TextStyle}
			>
				{0} {getWordCase(0, centerLabel)}
			</text>
			<Pie
				isAnimationActive={false}
				data={emptyData}
				cx={size / 2 - CENTER_OFFSET}
				cy={size / 2 - CENTER_OFFSET}
				innerRadius={size / 2 - PIE_WIDTH}
				outerRadius={size / 2}
				fill="#8884d8"
				paddingAngle={1}
				cornerRadius={10}
				dataKey="percent"
			>
				{emptyData.map((_, index) => (
					<Cell
						key={`cell-${index}`}
						fill={ChartColors[index % ChartColors.length]}
					/>
				))}
			</Pie>
		</PieChart>
	);
};

export default ChartSkeleton;
