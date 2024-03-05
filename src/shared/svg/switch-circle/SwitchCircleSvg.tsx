import React, { SVGProps } from 'react';

const SwitchCircleSvg = ({color = '#fff', cx, cy, style, className }: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg width="33" height="20" viewBox="0 0 33 20" className={className}>
			<circle cx={cx} cy={cy} fill={color} style={style} r={8}/>
		</svg>
	);
};

export default SwitchCircleSvg;