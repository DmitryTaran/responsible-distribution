import React, { Dispatch, ReactElement, SetStateAction } from 'react';
import { ClickAwayListener, Fade, Popper } from '@mui/material';
import muiZIndex from '@mui/material/styles/zIndex';
import { Placement } from '@popperjs/core/lib/enums';
import { VirtualElement } from '@popperjs/core';

type AnchorType = null | VirtualElement | HTMLElement | (() => HTMLElement) | (() => VirtualElement)

type CustomPopperProps<T> = {
	children: ReactElement
	placement?: Placement
	onClickAway?: (event: MouseEvent | TouchEvent) => void
	anchor: AnchorType;
	setAnchor: Dispatch<SetStateAction<T>>
	anchorId?: string
	zIndex?: number
	disablePortal?: boolean
	transitionDelay?: number
}

const CustomPopper = <T, >({
	children,
	placement = 'bottom-start',
	onClickAway,
	anchor,
	setAnchor,
	anchorId,
	zIndex,
	disablePortal,
	transitionDelay
}: CustomPopperProps<T>): JSX.Element => {
	return (
		<ClickAwayListener
			onClickAway={(event) => {
				onClickAway && onClickAway(event);
				const isInsideAnchorClick = event.composedPath().some(element => {
					return anchorId
						? (element as Element).id === anchorId
						: element === anchor;
				});
				if (!isInsideAnchorClick) {
					setAnchor(null as T);
				}
			}}>
			<Popper
				open={Boolean(anchor)}
				anchorEl={anchor}
				placement={placement}
				sx={{ zIndex: zIndex || muiZIndex.drawer - 1 }}
				onKeyDown={(event) => event.key === 'Esc' && setAnchor(null as T)}
				transition
				disablePortal={disablePortal}
			>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps} timeout={transitionDelay || 350}>
						{children}
					</Fade>
				)}
			</Popper>
		</ClickAwayListener>
	);
};

export default CustomPopper;