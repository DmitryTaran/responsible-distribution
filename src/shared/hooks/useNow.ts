import { useEffect, useState } from 'react';

export const useNow = (updateIntervalMs: number, disabled?: boolean): number => {

	const [ now, setNow ] = useState(Date.now());

	useEffect(() => {

		if (disabled) {
			return;
		}

		setNow(Date.now());

		const interval = setInterval(() => {
			setNow(Date.now());
		}, updateIntervalMs);

		return () => clearInterval(interval);

	}, [ updateIntervalMs, disabled ]);

	return now;

};