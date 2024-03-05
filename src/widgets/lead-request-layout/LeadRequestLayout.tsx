import zIndex from '@mui/material/styles/zIndex';
import { requestStore } from 'entities/lead-request';
import Request from 'features/lead-request/request/Request';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import classes from './lead-request-layout.module.scss';
import { RolesValues, useGetSingleManager } from 'entities/managers';
import { INTEGRATION_NAME } from 'shared/consts/const';

const LeadRequestLayout = observer((): JSX.Element => {

	const { manager } = useGetSingleManager();

	const { current: widgetIconRef } = useRef<HTMLDivElement>(document.querySelector(`div[data-widget-code="${INTEGRATION_NAME}"]`));

	useEffect(() => {
		if (widgetIconRef && manager?.widgetRole === RolesValues.None) {
			widgetIconRef.style = 'display: none';
		}
	}, [ manager ]);

	return (
		<>
			{
				Boolean(requestStore.requests.length) &&
                <div style={{ zIndex: zIndex.drawer + 1 }} className={classes['notifications-wrapper']}>
                    <div style={{ position: 'relative' }}>
						{requestStore.requests.map((request, index) =>
							<Request
								key={request.webhookId}
								requestDto={request}
								{...request}
								index={index}
							/>
						)}
                    </div>
                </div>
			}
		</>
	);
});

export default LeadRequestLayout;