import React, { useCallback } from 'react';

type RefItem<T> =
	| ((element: T | null) => void)
	| React.MutableRefObject<T | null>
	| null
	| undefined;
export const useForkRef = <T, >(
	...refs: RefItem<T>[]
): ((element: T | null) => void) => {
	const forkRefs = useCallback((element: T | null) => {
		refs.forEach((ref) => {
			if (!ref) {
				return;
			}
			if (typeof ref === 'function') {
				ref(element);
			} else {
				ref.current = element;
			}
		});
	}, refs);
	return forkRefs;
};