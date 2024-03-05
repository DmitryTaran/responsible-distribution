import React, { SVGProps } from 'react';

const CrossSvg = ({...props}: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
			<path
				d="M3.2 14.5L2 13.3L6.8 8.5L2 3.7L3.2 2.5L8 7.3L12.8 2.5L14 3.7L9.2 8.5L14 13.3L12.8 14.5L8 9.7L3.2 14.5Z"
				fill="currentColor"/>
		</svg>
	);
};

export default CrossSvg;