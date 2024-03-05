import classes from './lib/redestribution-settings.module.scss';
import { Box, Collapse } from '@mui/material';
import React, { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { DistributionTypes } from 'entities/templates/consts';
import { TemplateFieldNames } from 'entities/templates/consts/templateFieldNames';
import { defaultRedistributionSettings, defaultWorkTimeSettings, } from 'entities/templates/consts/defaultValues';
import { useTemplateConditionalForm, useTemplateFormContext, } from 'entities/templates/hooks/aliases';
import { RedistributeByTimeSettings, WorkTime } from 'entities/templates/types';
import AudioSelect from 'features/templates/audio-select/AudioSelect';
import RedistributionDisablingTitle
	from 'features/templates/redistribution-disabling-title/RedistributionDisablingTitle';
import WorkTimeSettings from 'features/templates/work-time-settings/WorkTimeSettings';
import LabeledCheckbox from 'shared/components/amo-checkbox/LabeledCheckbox';
import FormTextInput from 'shared/components/form-text-input/FormTextInput';
import { RedistributionInputsSettings, RedistributionSettingsInputs } from './lib/const';
import FormCardLayout from 'widgets/templates/template-form/components/form-card-layout/FormCardLayout';
import cn from 'classnames';

const RedistributionSettings = (): JSX.Element => {
	const { formState, getFieldState } = useTemplateFormContext();

	const {
		DISTRIBUTION_TYPE,
		REDISTRIBUTION_WORK_TIME_SETTINGS,
		REDISTRIBUTE_BY_TIME_SETTINGS,
	} = TemplateFieldNames;

	const {
		isOpen: isWorkTimeSettingsOpen,
		setIsOpen: setIsWorkTimeSettingsOpen,
		handleToggle: handleWorkTimeSettingsToggle,
	} = useTemplateConditionalForm(
		REDISTRIBUTION_WORK_TIME_SETTINGS,
		defaultWorkTimeSettings,
		formState.defaultValues?.redistributeByTimeSettings
			?.workTimeSettings as WorkTime,
		() => {}
	);

	const { isOpen: isSettingsOpen, handleToggle: handleSettingsToggle } =
		useTemplateConditionalForm(
			REDISTRIBUTE_BY_TIME_SETTINGS,
			defaultRedistributionSettings,
			formState.defaultValues
				?.redistributeByTimeSettings as RedistributeByTimeSettings,
			() => {
				setIsWorkTimeSettingsOpen(false);
			}
		);

	const distributionType = useWatch({ name: DISTRIBUTION_TYPE });

	const isSwitchDisabled = distributionType !== DistributionTypes.QUEUE;
	useEffect(() => {
		if (isSwitchDisabled) {
			handleSettingsToggle(false);
		}
	}, [ distributionType ]);

	return (
		<FormCardLayout
			collapsed={isSettingsOpen}
			title={<RedistributionDisablingTitle
				isSettingsOpen={isSettingsOpen}
				handleSettingsToggle={handleSettingsToggle}
			/>}
			styles={{ card: { paddingRight: '77px' } }}
		>
			<div>
				<Box
					display="flex"
					justifyContent="space-between"
					flexDirection={'column'}
					gap={'20px'}
				>
					{Object.entries<RedistributionInputsSettings>(RedistributionSettingsInputs).map(
						([ name, props ]) => (
							<FormTextInput
								helperComponent={
									<div
										className={
											classes['helper__wrapper']
										}
									>
											<span
												className={
													classes['helper__title']
												}
											>
												{props.label}
											</span>
										<span
											className={cn(
												classes['helper__subtitle'],
												getFieldState(name).invalid && classes['helper__subtitle-error']
											)}
										>
												{props.helperText}
											</span>
									</div>
								}
								variant="outline"
								classes={{
									input: classes['form-input'],
									wrapper: classes['form-wrapper'],
								}}
								key={name}
								{...props}
							/>
						)
					)}
					<AudioSelect/>
					<LabeledCheckbox
						label={'Только в рабочее время'}
						onChange={() =>
							handleWorkTimeSettingsToggle(
								!isWorkTimeSettingsOpen
							)
						}
						checked={isWorkTimeSettingsOpen}
					/>

				</Box>
				<Collapse in={isWorkTimeSettingsOpen} unmountOnExit>
					<WorkTimeSettings
						collapsable
						field={REDISTRIBUTION_WORK_TIME_SETTINGS}
					/>
				</Collapse>
			</div>

		</FormCardLayout>
	);
};

export default RedistributionSettings;
