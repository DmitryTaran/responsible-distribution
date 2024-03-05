import React from 'react';

type CircleSvgProps = {
	color: string
	width: number
	height: number
}

const CircleSvg = ({ height, color, width }: CircleSvgProps): JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
			<circle cx={width / 2} cy={height / 2} r={height / 2} fill={color}/>
		</svg>
	);
};

export default CircleSvg;