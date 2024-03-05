import React, { SVGProps } from 'react';

const MinusSvg = ({ ...props }: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg {...props} width="9" height="1" viewBox="0 0 9 1" fill="none" xmlns="http://www.w3.org/2000/svg" >
			<g>
				<line y1="0.5" x2="9" y2="0.5" stroke="white"/>
			</g>
		</svg>

	);
};

export default MinusSvg;