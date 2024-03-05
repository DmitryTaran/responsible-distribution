import React from 'react';
import { SVGProps } from 'shared/types/Widget.types';



const LoaderSvg = ({size = '16px'}: SVGProps): JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
		     style={{
			     margin: 'auto',
			     background: 'rgba(255, 255, 255, 0)',
			     display: 'block',
		     }}
		     width={size} height={size} viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
			<circle cx="50" cy="50" fill="none" stroke="currentColor" strokeWidth="3" r="34"
			        strokeDasharray="160.22122533307947 55.40707511102649">
				<animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s"
				                  values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
			</circle>
		</svg>
	);
};

export default LoaderSvg;