import { Box } from '@mui/material';
import React, { Dispatch } from 'react';
import { DURATIONS, LeadRequestDto } from 'entities/lead-request';
import AmoButton from 'shared/components/amo-button/AmoButton';
import { ONE_SECOND } from 'shared/consts/const';
import { SlideClasses } from '../request/consts';
import { accept, acceptFollow, decline } from '../request/helpers/leadRequestActions';
import { buttonStyle, buttonsWrapperStyle } from './styles';

type RequestButtonsProps = {
	setSlideClass: Dispatch<SlideClasses>
} & LeadRequestDto

const RequestButtons = ({ setSlideClass, ...requestDto }: RequestButtonsProps): JSX.Element => {

	const handleClick = (emitter: (requestDto: LeadRequestDto) => void): void => {
		setSlideClass(SlideClasses.UnSlide);
		setTimeout(() => {
			emitter(requestDto);
		}, (DURATIONS.slideHorizontalDuration) * ONE_SECOND);
	};
	return (
		<Box sx={buttonsWrapperStyle}>
			<Box display="flex" gap="10px" alignItems="center">
				<AmoButton
					onClick={() => handleClick(accept)}
					variant="primary"
					styles={{ container: buttonStyle }}
				>
					Принять
				</AmoButton>
				<AmoButton
					onClick={() => handleClick(acceptFollow)}
					variant="primary"
					styles={{ container: buttonStyle }}
				>
					Принять и перейти
				</AmoButton>
			</Box>
			<AmoButton
				onClick={() => handleClick(decline)}
				variant="danger"
				styles={{ container: buttonStyle }}
			>
				Отклонить
			</AmoButton>
		</Box>
	);
};

export default RequestButtons;
