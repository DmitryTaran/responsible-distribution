import React from 'react';
import { X_AXIS_TICKS_HORIZONTAL_OFFSET, X_AXIS_TICKS_VERTICAL_OFFSET } from 'shared/components/custom-bar-chart/lib/consts/BarChartConfig';
import { CustomTickProps } from 'shared/components/custom-bar-chart/lib/types';
import { Colors } from 'shared/theme/AmoLightTheme';

const CustomXTick = ({x, y, payload}: CustomTickProps): JSX.Element => {
	return (
			<text
				style={{ overflow: 'hidden' }}
				x={x + X_AXIS_TICKS_HORIZONTAL_OFFSET}
				y={y + X_AXIS_TICKS_VERTICAL_OFFSET}
				className="recharts-text recharts-yAxis yAxis"
				textAnchor="end"
				fill={Colors.chartTickColor}
				width="60"
				stroke="none"
				alignmentBaseline="after-edge"
				fontFamily={'PT Sans'}
			>
				{payload.value}
			</text>
	);
};

export default CustomXTick;