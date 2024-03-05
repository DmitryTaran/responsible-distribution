import React, { SVGProps } from 'react';

const ArrowUpSvg = ({
	...props
}: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="9"
			viewBox="0 0 15 9"
			fill="none"
		>
			<path
				d="M7.95829 1.95801L1.91663 7.99967L7.95829 1.95801ZM7.95829 1.95801L14 7.99967L7.95829 1.95801Z"
				fill="#363B44"
			/>
			<path
				d="M1.91663 7.99967L7.95829 1.95801L14 7.99967"
				stroke={'currentColor'}
				strokeWidth="2"
				strokeLinecap="round"
			/>
		</svg>
	);
};

export default ArrowUpSvg;
