import React, { useState } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import { TextStyle } from 'shared/components/custom-pie-chart/components/custom-chart/centerText.style';
import CustomTooltip from 'shared/components/custom-pie-chart/components/custom-tooltip/CustomTooltip';
import { CENTER_OFFSET, leadCases, PIE_WIDTH, } from 'shared/components/custom-pie-chart/lib/consts';
import { ChartColors } from 'shared/theme/AmoLightTheme';
import { getWordCase } from 'shared/utils/helpers';

type CustomPieChartProps = {
	data: {
		name: string;
		value: number;
	}[];
	size: number;
	total: number;
};

const CustomPieChartRecharts = ({
	size,
	data,
	total,
}: CustomPieChartProps): JSX.Element => {
	const [ tooltipPosition, setTooltipPosition ] = useState<{
		x: number;
		y: number;
	}>({ x: 0, y: 0 });
	return (
		<PieChart width={size} height={size}>
			<text
				textAnchor="middle"
				dominantBaseline="middle"
				style={TextStyle}
			>
				{total} {getWordCase(total, leadCases)}
			</text>
			<Pie
				data={data}
				cx={size / 2 - CENTER_OFFSET}
				cy={size / 2 - CENTER_OFFSET}
				innerRadius={size / 2 - PIE_WIDTH}
				outerRadius={size / 2}
				fill="#8884d8"
				paddingAngle={1}
				cornerRadius={10}
				dataKey="percent"
				onMouseMove={(data, index, event) => {
					const {
						nativeEvent: { offsetX, offsetY },
					} = event;
					setTooltipPosition({ x: offsetX, y: offsetY });
				}}
			>
				{data.map((_, index) => (
					<Cell
						key={`cell-${index}`}
						fill={ChartColors[index % ChartColors.length]}
					/>
				))}
			</Pie>
			<Tooltip
				position={tooltipPosition}
				content={(props) => (
					<CustomTooltip
						{...props}
						x={tooltipPosition.x}
						y={tooltipPosition.y}
					/>
				)}
			/>
		</PieChart>
	);
};

export default CustomPieChartRecharts;
