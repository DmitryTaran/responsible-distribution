import React, { CSSProperties } from 'react';
import classes from './styles/timer.module.scss';
import { CountdownStyle, SvgWrapperStyle, TimerWrapperStyle } from './styles/timer.style';
import { ONE_SECOND } from '../../consts/const';
import { useNow } from 'shared/hooks/useNow';

type TimerProps = {
	radius: number;
	time: number;
	deadlineMs: number
	style?: CSSProperties
};

export const Timer = ({ radius, time, style, deadlineMs }: TimerProps): JSX.Element => {

	const now = useNow(100, Date.now() > deadlineMs);

	const currentTime = Math.max(Math.ceil((deadlineMs - now) / ONE_SECOND), 0);

	return (
		<div
			style={{
				...TimerWrapperStyle(radius),
				...style
			}}
			className={classes['countdown']}
		>
			<div className={classes['countdown-number']}>{currentTime}</div>
			<svg
				className={classes['svg-wrapper']}
				style={SvgWrapperStyle(radius)}
			>
				<g>
					<circle
						fill={'none'}
						strokeWidth={4}
						className={classes['circle']}
						r={radius}
						cx={(radius * 2 + 6) / 2}
						cy={(radius * 2 + 6) / 2}
					/>
					<circle
						style={CountdownStyle(radius, time)}
						className={classes['circle_animated']}
						r={radius}
						cx={(radius * 2 + 6) / 2}
						cy={(radius * 2 + 6) / 2}
					/>
				</g>
			</svg>
		</div>
	);
};
