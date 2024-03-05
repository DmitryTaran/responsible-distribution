import React, { SVGProps } from 'react';

const CircleCrossSvg = ({
	className,
	...props
}: SVGProps<SVGSVGElement>): JSX.Element => {
	return (
		<svg
			width="15"
			height="15"
			{...props}
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 16 16"
			fill="none"
		>
			<path
				d="M8 0C3.54286 0 0 3.54286 0 8C0 12.4571 3.54286 16 8 16C12.4571 16 16 12.4571 16 8C16 3.54286 12.4571 0 8 0ZM11.0857 12L8 8.91429L4.91429 12L4 11.0857L7.08571 8L4 4.91429L4.91429 4L8 7.08571L11.0857 4L12 4.91429L8.91429 8L12 11.0857L11.0857 12Z"
				fill="currentColor"
			/>
		</svg>
	);
};

export default CircleCrossSvg;
