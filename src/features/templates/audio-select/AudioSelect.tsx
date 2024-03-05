import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { useWatch } from 'react-hook-form';
import {
	RedistributionSoundsNames,
	RedistributionSoundsTypes,
	TemplateFieldNames,
	useTemplateFormContext,
} from 'entities/templates';
import { ServerRoutes } from 'shared/api/routes';
import { SoundEffectSelectObject } from './lib/consts';
import FormWrapper from 'shared/components/form-wrapper/FormWrapper';
import { NativeSelect } from 'shared/components/native-select/NativeSelect';
import SoundSvg from 'shared/svg/sound/SoundSvg';
import classes from './audioSelect.module.scss';
import DisabledSoundSvg from 'shared/svg/disabled-sound/DisabledSoundSvg';
import cn from 'classnames';

const AudioSelect = (): JSX.Element => {
	const { SOUND_EFFECT } = TemplateFieldNames;
	const soundRef = useRef<HTMLAudioElement>(null);
	const { getValues } = useTemplateFormContext();

	const soundEffect = useWatch({ name: SOUND_EFFECT });

	const isNone = soundEffect === RedistributionSoundsTypes.NONE;

	return (
		<Box
			maxWidth={'400px'}
			display="flex"
			alignItems="center"
			position={'relative'}
		>
			<FormWrapper
				{...SoundEffectSelectObject}
				defaultValue={RedistributionSoundsNames.none}
				fieldName={SOUND_EFFECT}
				Component={NativeSelect}
			/>
			<div
				style={{
					position: 'absolute',
					left: '100%',
					alignSelf: 'center',
				}}
			>
				{
					isNone
						?
						<button
							className={classes['audio-button']}
							disabled
						>
							<DisabledSoundSvg/>
						</button>
						: <button
							className={cn(
								classes['audio-button'],
								classes['audio-button_active']
							)}
							onClick={(e) => {
								e.preventDefault();
								soundRef.current?.play();
							}}
						>
							<SoundSvg/>
						</button>
				}

				{!isNone && (
					<audio
						ref={soundRef}
						preload={'auto'}
						src={
							ServerRoutes.BaseUrl +
							`/sound-effects/${getValues(SOUND_EFFECT)}`
						}
					></audio>
				)}
			</div>
		</Box>
	);
};

export default AudioSelect;
