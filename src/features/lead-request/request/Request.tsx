import Box from '@mui/material/Box/Box';
import cn from 'classnames';
import React, { useMemo } from 'react';
import { LeadRequestDto, requestStore } from 'entities/lead-request';
import { ServerRoutes } from 'shared/api/routes';
import { ONE_SECOND } from 'shared/consts/const';
import { useAudio } from 'shared/hooks/useAudio';
import RequestInfo from '../request-info/RequestInfo';
import { requestInfoWrapper } from './styles';
import classes from './styles/requests.module.scss';
import RequestButtons from 'features/lead-request/request-buttons/RequestButtons';
import { Timer } from 'shared/components/timer/timer';
import { RedistributionSoundsTypes } from 'entities/templates';
import { observer } from 'mobx-react-lite';
import { DURATIONS } from 'entities/lead-request/consts/AnimationsDurations';
import { useSlide } from 'features/lead-request/request/hooks/useSlide';
import {
	REQUEST_HEIGHT_PX,
	REQUEST_MARGIN_PX,
	REQUEST_WIDTH_PX,
	SlideClasses
} from 'features/lead-request/request/consts';
import $dayjs from 'shared/config/dayjsConfig';
import { account } from 'shared/consts/AMO.consts';
import { TABLE_DATE_FORMAT } from 'entities/report/consts/consts';
import Timeout from 'shared/components/timeout/Timeout';

const Request = observer(({ requestDto, index }: { requestDto: LeadRequestDto, index: number }): JSX.Element => {

	const { acceptanceTime, soundEffect, lead, webhookId, pipeline, contact, queueId, userId } = requestDto;

	const acceptanceDeadline = useMemo(() => Date.now() + acceptanceTime * ONE_SECOND, [ acceptanceTime ]);

	const { slideClass, setSlideClass } = useSlide(acceptanceTime);

	useAudio(
		soundEffect === RedistributionSoundsTypes.NONE,
		ServerRoutes.BaseUrl + `/sound-effects/${soundEffect}`
	);

	return (
		<div
			style={{
				transition: `right ${DURATIONS.slideHorizontalDuration}s ease, top ${DURATIONS.slideVerticalDuration}s ease`,
				top: `${index * (REQUEST_HEIGHT_PX + REQUEST_MARGIN_PX)}px`,
				width: REQUEST_WIDTH_PX,
			}}
			className={cn(classes['request-box'], classes[slideClass])}
		>
			<div className={classes['request-box__content']}>
				<div className={classes['text-container']}>
					<div className={classes['ref-container']}>
						<a
							className={classes['ref-container__ref']}
							target={'_blank'}
							href={ServerRoutes.AccountUrl + `/leads/detail/${lead.id}skip_filter=Y`}
						>
							{lead.name}
						</a>
						{contact
							? <a
								href={`${ServerRoutes.AccountUrl + `/contacts/detail/${contact.id}skip_filter=Y`}`}
								className={classes['ref-container__ref']}
								target={'_blank'}
							>
								{contact.name}
							</a>
							: <span
								className={cn(
									classes['ref-container__ref_disabled'],
									classes['ref-container__ref']
								)}>
								Контакт не прикреплен
							</span>
						}
					</div>
					<Box sx={requestInfoWrapper}>
						<RequestInfo name="Воронка:" info={pipeline.status.name}/>
						<RequestInfo
							name="Дата создания:"
							info={$dayjs(lead.createdAt).tz(account.timezone).format(`${TABLE_DATE_FORMAT} HH:mm`)}
						/>
					</Box>
				</div>
				<Timer
					deadlineMs={acceptanceDeadline}
					style={{ marginRight: '10px' }}
					radius={37}
					time={acceptanceTime}
				/>
				<Timeout
					timeoutMs={(acceptanceTime + DURATIONS.slideHorizontalDuration) * ONE_SECOND}
					onTimeExpire={() => requestStore.deleteRequest(webhookId)}
					updateInterval={100}
				/>
				<Timeout
					timeoutMs={acceptanceTime * ONE_SECOND}
					onTimeExpire={() => setSlideClass(SlideClasses.UnSlide)}
					updateInterval={100}
				/>
			</div>
			<RequestButtons setSlideClass={setSlideClass} {...requestDto}/>
		</div>
	);
});
export default Request;
