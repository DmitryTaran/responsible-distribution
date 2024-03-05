import React from 'react';
import { useTimeout } from 'shared/hooks/useTimeout';

type TimeoutProps = {
	timeoutMs: number
	updateInterval: number
	onTimeExpire: () => void
}

const Timeout = ({ timeoutMs, updateInterval, onTimeExpire }: TimeoutProps): JSX.Element => {

	useTimeout(updateInterval, timeoutMs, onTimeExpire);

	return <></>;

};

export default Timeout;