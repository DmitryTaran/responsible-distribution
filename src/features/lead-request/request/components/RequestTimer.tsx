import React from 'react';
import { Timer } from 'shared/components/timer/timer';

type RequestTimerProps = {
	acceptanceDeadline: number
	acceptanceTime: number
	onTimeExpired: () => void
}

const RequestTimer = ({acceptanceDeadline, acceptanceTime, onTimeExpired}: RequestTimerProps): JSX.Element => {
    return (
        <>
	        <Timer
		        deadlineMs={acceptanceDeadline}
		        style={{ marginRight: '10px' }}
		        radius={37}
		        time={acceptanceTime}
	        />
        </>
    );
};

export default RequestTimer;