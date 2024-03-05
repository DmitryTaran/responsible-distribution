import { useEffect, useMemo } from 'react';
import { useNow } from 'shared/hooks/useNow';

export const useTimeout = (updateIntervalMs: number, timeoutMs: number, callback: () => void): number => {

	const timeoutDeadline = useMemo(() => Date.now() + timeoutMs, [ timeoutMs ]);

	const now = useNow(updateIntervalMs, (Date.now() > timeoutDeadline));

	useEffect(() => {
		if (Date.now() > timeoutDeadline) {
			callback();
		}
	}, [ now, callback, timeoutDeadline ]);


	return now;

};