import React from 'react';
import { BAR_CHART_TEXT_SIZE, MAX_Y_AXIS_WIDTH } from 'shared/components/custom-bar-chart/lib/consts/BarChartConfig';
import { CustomTickProps } from 'shared/components/custom-bar-chart/lib/types';
import { Colors } from 'shared/theme/AmoLightTheme';
import { getTextSize } from 'shared/utils/helpers';

const WHITESPACE_OFFSET = 3;

const CENTER_ALIGNMENT_Y_OFFSET = 7;

const CustomYTick = ({ x, y, payload }: CustomTickProps): JSX.Element => {

	const { value, index } = payload;
	const clipId = 'clipText' + index;
	const { width: valueWidth, height: valueHeight } = getTextSize(value, BAR_CHART_TEXT_SIZE);
	const leftEdgeX = x - valueWidth;
	const textXOffset = leftEdgeX > 0 ? x : x - leftEdgeX;

	return (
		<g>
			<text
				alignmentBaseline="middle"
				clipPath={`url(#${clipId})`}
				x={textXOffset}
				y={y}
				className="recharts-text recharts-yAxis yAxis"
				textAnchor="end"
				fill={Colors.chartTickColor}
				fontFamily={'PT Sans'}
			>
				{payload.value}
			</text>
			<clipPath id={clipId}>
				<rect
					x={textXOffset - valueWidth - WHITESPACE_OFFSET}
					y={y - valueHeight}
					width={MAX_Y_AXIS_WIDTH}
					height={valueHeight + CENTER_ALIGNMENT_Y_OFFSET}
				/>
			</clipPath>
		</g>
	);
};

export default CustomYTick;