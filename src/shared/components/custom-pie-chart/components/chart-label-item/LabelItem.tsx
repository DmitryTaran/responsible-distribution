import { Box, Typography } from '@mui/material';
import React from 'react';
import { LabelItemCenterValue, LabelItemContainer, LabelItemLeftValue, LabelItemRightValue } from 'shared/components/custom-pie-chart/components/chart-label-item/LabelItem.style';
import CircleSvg from 'shared/svg/cicle/CircleSvg';

type LabelItemProps = {
	color: string
	percent: number
	name: string
	value: number
}

const LabelItem = ({ name, value, percent, color }: LabelItemProps): JSX.Element => {
	return (
		<Box sx={LabelItemContainer}>
			<CircleSvg
				color={color}
				height={20}
				width={20}
			/>
			<Typography sx={LabelItemLeftValue}>
				{percent}%
			</Typography>
			<Typography sx={LabelItemCenterValue}>
				{name}
			</Typography>
			<Typography sx={LabelItemRightValue}>
				{value}
			</Typography>
		</Box>
	);
};

export default LabelItem;