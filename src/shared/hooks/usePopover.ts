import { Dispatch, Ref, RefObject, useRef, useState } from 'react';

type UsePopoverReturn<T> = {
	anchor: T | null
	setAnchor: Dispatch<T | null>
	elementRef: RefObject<T | null>
}

export const usePopover = <T extends HTMLElement>(): UsePopoverReturn<T> => {
	const [anchor, setAnchor] = useState<T | null>(null);
	const elementRef = useRef<T | null>(null);
	return { anchor, setAnchor, elementRef };
};


type usePopupProps<T extends Element> = {
	handlePopupOpen: (event: React.MouseEvent<T>) => void;
	handlePopupClose: () => void;
	anchorEl: T | null;
	open: boolean;
	id: string | undefined;
};

export const usePopup = <T extends Element>(name: string): usePopupProps<T> => {
	const [anchorEl, setAnchorEl] = useState<T | null>(null);

	const handlePopupOpen = (event: React.MouseEvent<T>): void => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopupClose = (): void => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? name : undefined;
	return { handlePopupOpen, handlePopupClose, anchorEl, open, id };
};
