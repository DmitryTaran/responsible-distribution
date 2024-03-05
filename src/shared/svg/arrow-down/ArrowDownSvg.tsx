import React, { SVGProps } from 'react';

const ArrowDownSvg = ({
	...props
}: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" width="15" height="10" viewBox="0 0 15 10" fill="none" {...props}>
			<path d="M7.95833 8L14 1.95833L7.95833 8ZM7.95833 8L1.91667 1.95833L7.95833 8Z" fill="#363B44"/>
			<path d="M14 1.95833L7.95833 8L1.91667 1.95833" stroke={'currentColor'} strokeWidth="2"
			      strokeLinecap="round"/>
		</svg>
	);
};

export default ArrowDownSvg;

