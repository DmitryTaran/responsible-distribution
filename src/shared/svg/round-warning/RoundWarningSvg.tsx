import React, { SVGProps } from 'react';

const RoundWarningSvg = ({ ...props }: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 22 22" fill="none" {...props}>
			<path
				d="M11 0C4.928 0 0 4.928 0 11C0 17.072 4.928 22 11 22C17.072 22 22 17.072 22 11C22 4.928 17.072 0 11 0ZM12.1 16.5H9.9V14.3H12.1V16.5ZM12.1 12.1H9.9V5.5H12.1V12.1Z"
				fill="currentColor"/>
		</svg>
	);
};

export default RoundWarningSvg;