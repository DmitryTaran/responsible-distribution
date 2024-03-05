import React from 'react';

type CircleSvgProps = {
	color: string
	width: number
	height: number
}

const StopSignSvg = ({height, color, width}: CircleSvgProps): JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 10 10" fill="none">
			<circle cx="5" cy="5" r="4.5" stroke={color}/>
			<line x1="1.64645" y1="8.64645" x2="8.64645" y2="1.64645" stroke={color}/>
		</svg>
	);
};

export default StopSignSvg;