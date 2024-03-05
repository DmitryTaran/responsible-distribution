import React, { useMemo } from 'react';
import { Bar, BarChart, LabelList, Rectangle, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import CustomXTick from 'shared/components/custom-bar-chart/components/custom-x-tick/CustomXTick';
import CustomYTick from 'shared/components/custom-bar-chart/components/custom-y-tick/CustomYTick';
import {
	BAR_CHART_TEXT_SIZE,
	CONVERSION_KEY_NAME,
	MAX_Y_AXIS_WIDTH
} from 'shared/components/custom-bar-chart/lib/consts/BarChartConfig';
import { BarChartData } from 'shared/components/custom-bar-chart/lib/types';
import { ChartColors } from 'shared/theme/AmoLightTheme';
import { getTextSize, normalizeUsername } from 'shared/utils/helpers';
import { getBarChartConfig } from 'shared/components/custom-bar-chart/lib/helpers/getChartConfig';

type ConversionBarChartProps = {
	data: BarChartData[]
}


const CustomBarChart = ({ data }: ConversionBarChartProps): JSX.Element => {

	const normalizedData = useMemo(() => data.map(({ name, value, hidden }) =>
		({
			name: normalizeUsername(name),
			hidden: hidden,
			value,
		}),
	), [ data ]);


	const mockChartItem: BarChartData = {
		value: false,
		name: '',
		hidden: true
	};

	const normalizedMockData = normalizedData.length < 5
		? [ ...normalizedData, ...Array.from({ length: 5 - normalizedData.length }).fill(mockChartItem) ]
		: normalizedData;

	const yAxisWidth = useMemo<number>(() => {
		const maxTextWidth = normalizedData.reduce((accum, { name }) => {
			const { width } = getTextSize(name, BAR_CHART_TEXT_SIZE);
			return accum < width ? width : accum;
		}, 0);

		return maxTextWidth > MAX_Y_AXIS_WIDTH ? MAX_Y_AXIS_WIDTH : maxTextWidth;
	}, [ data ]);

	const { barCategoryGap, maxBarSize, barChartHeight, paddingBottom } = getBarChartConfig(normalizedData.length);

	return (
		<ResponsiveContainer
			height={barChartHeight}
		>
			<BarChart
				layout="vertical"
				data={normalizedMockData}
				barCategoryGap={barCategoryGap}
				maxBarSize={maxBarSize}
			>
				<XAxis
					fill={'#666'}
					stroke={'#D9D9D9'}
					strokeWidth={2}
					type="number"
					dataKey={CONVERSION_KEY_NAME}
					tickLine={false}
					padding={{ left: 1 }}
					tickMargin={7}
					tickCount={20}
					fontFamily={'PT Sans'}
					height={20}
					tick={CustomXTick}
				/>
				<YAxis
					stroke={'#D9D9D9'}
					reversed
					strokeWidth={2}
					overflow={'scroll'}
					width={yAxisWidth}
					type="category"
					dataKey="name"
					interval={0}
					tick={CustomYTick}
					tickLine={false}
					padding={{ bottom: paddingBottom }}
				/>
				<Bar
					minPointSize={1}
					dataKey={CONVERSION_KEY_NAME}
					shape={(props) => {
						return <Rectangle
							key={props.index}
							{...props}
							fill={props.payload.hidden ? 'none' : ChartColors[props.index % ChartColors.length]}
						/>;
					}}
				>
					<LabelList
						dataKey={CONVERSION_KEY_NAME}
						position="right"
						fontFamily="PT Sans"
						fontSize="15px"
						formatter={(value: number | false) => {
							return typeof value === 'number'
								? `${value.toFixed(2)}%`
								: '';
						}}
					/>
				</Bar>
			</BarChart>
		</ResponsiveContainer>

	);
};

export default CustomBarChart;