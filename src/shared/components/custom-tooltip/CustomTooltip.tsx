import React, { PropsWithChildren, ReactNode, useState, } from 'react';
import { Placement } from '@popperjs/core/lib/enums';
import classes from './customTooltip.module.scss';
import { Fade, Popper } from '@mui/material';

type CustomTooltipProps<U extends Element> = {
	anchorRefCurrent?: U | null
	placement?: Placement
	zIndex?: number
	tooltipText: ReactNode
	disableHoverListener?: boolean
	controlShow?: boolean
} & PropsWithChildren

const CustomTooltip = <U extends Element>({
	anchorRefCurrent,
	tooltipText,
	disableHoverListener,
	placement,
	children,
	controlShow = false,
	zIndex
}: CustomTooltipProps<U>): JSX.Element => {

	const [ tooltipAnchor, setTooltipAnchor ] = useState<U | null>(null);
	return (
		<div
			onMouseEnter={() => {
				if (!disableHoverListener && anchorRefCurrent) {
					setTooltipAnchor(anchorRefCurrent);
				}
			}}
			onMouseLeave={() => {
				!disableHoverListener && setTooltipAnchor(null);
			}}
		>
			{children}
			<Popper
				open={controlShow || Boolean(tooltipAnchor)}
				anchorEl={controlShow ? anchorRefCurrent : tooltipAnchor}
				placement={placement}
				transition
				disablePortal
				style={{ zIndex }}
				className={classes['popper']}
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={350}>
						<div className={classes['tooltip']}>
							{tooltipText}
						</div>
					</Fade>
				)}
			</Popper>
		</div>
	);
};

export default CustomTooltip;