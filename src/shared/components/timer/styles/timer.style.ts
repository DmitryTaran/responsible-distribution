import { CSSProperties } from 'react';
import { DURATIONS, ONE_SECOND } from 'shared/consts/const';

export const TimerWrapperStyle = (radius: number): CSSProperties => ({
	width: `${radius * 2 + 6}px`,
	height: `${radius * 2 + 6}px`,
});

export const SvgWrapperStyle = (radius: number): CSSProperties => ({
	top: 0,
	right: 0,
	width: `${radius * 2 + 6}px`,
	height: `${radius * 2 + 6}px`,
});

export const CountdownStyle = (radius: number, time: number): CSSProperties => ({
	stroke: '#4077D6',
	strokeWidth: '4px',
	strokeDasharray: `${radius * 2 * Math.PI} 0`,
	animationDuration: `${time}s`,
	strokeLinecap: 'round',
	fill: 'none',
});
