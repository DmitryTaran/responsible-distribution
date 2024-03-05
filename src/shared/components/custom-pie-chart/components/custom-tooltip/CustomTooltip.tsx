import { DIGITS_AFTER_COMMA } from 'entities/templates';
import React from 'react';
import classes from './customTooltip.module.scss';

type CustomTooltipProps = {
	payload: {
		name?: string
		value?: number
	}[]
	x: number
	y: number

}

const CURSOR_OFFSET_X = 15
const CURSOR_OFFSET_Y = 7

const CustomTooltip = ({ payload, y, x, ...props }: CustomTooltipProps): JSX.Element => {
	const [tooltipData] = payload;
	return (
		<div className={classes.tooltip} style={{ position: 'absolute', left: x + CURSOR_OFFSET_X, top: y + CURSOR_OFFSET_Y }}>
			<span className={classes.tooltipValue}>{Number(tooltipData?.value).toFixed(DIGITS_AFTER_COMMA)}%</span>
			<span className={classes.tooltipLabel}>{tooltipData?.name}</span>
		</div>
	);
};

export default CustomTooltip;