import { defaultDayWorkSchedule } from 'entities/work-schedule';
import React, { useRef } from 'react';
import TimePicker from 'shared/components/time-picker/TimePicker';
import { RuWeekDays, weekDays } from 'shared/consts/const';
import { useWorkScheduleConditionalForm, useWorkScheduleFormContext } from '../../lib/hooks/aliases';
import classes from './day-settings.module.scss';
import AmoToggleButton from 'shared/components/amo-toggle-button/AmoToggleButton';
import FormTimePicker from 'shared/components/form-time-picker/FormTimePicker';
import { RegisterOptions, useController } from 'react-hook-form';
import { TIME_STRING_PATTERN } from 'features/templates/work-time-settings/lib/const';
import { timeToSeconds } from 'shared/components/time-inputs/lib/timeToSeconds';
import { DayWorkSchedule } from 'entities/work-schedule/types';
import CustomTooltip from 'shared/components/custom-tooltip/CustomTooltip';
import zIndex from '@mui/material/styles/zIndex';

export const SCHEDULE_FIELD_PREFIX = 'schedule.';

type DaySettingsProps = {
	dayName: (typeof weekDays)[number];
};

const DaySettings = ({ dayName }: DaySettingsProps): JSX.Element => {

	const { control, getFieldState, trigger } = useWorkScheduleFormContext();

	const workScheduleFieldName = SCHEDULE_FIELD_PREFIX + dayName;

	const workTimeOptions: RegisterOptions = {
		pattern: TIME_STRING_PATTERN,
		validate: () => !getFieldState(workScheduleFieldName).invalid,
		onBlur: () => trigger(workScheduleFieldName),
	};
	useController({
		name: workScheduleFieldName,
		control,
		rules: {
			validate: (value: DayWorkSchedule) => {
				return !value || Boolean(
					value?.dayBeginTime &&
					value?.dayEndTime &&
					timeToSeconds(value.dayEndTime) >
					timeToSeconds(value.dayBeginTime)
				);
			},
		},
	});
	const { formState, clearErrors } = useWorkScheduleFormContext();
	const { isOpen: isActive, handleToggle } = useWorkScheduleConditionalForm(
		workScheduleFieldName,
		defaultDayWorkSchedule,
		formState?.defaultValues && (formState.defaultValues[dayName] as string),
	);

	const inputRef = useRef<HTMLDivElement | null>(null);

	const handleTimeInputFocus = (): void => {
		clearErrors(workScheduleFieldName);
	};

	return (
		<>
			<AmoToggleButton
				checked={isActive}
				onChange={() => handleToggle(!isActive)}
				style={{ width: '56px' }}
			>
				{RuWeekDays[dayName]}
			</AmoToggleButton>
			{isActive
				? <>
					<FormTimePicker
						popperPlacement={'bottom-end'}
						fieldName={`${workScheduleFieldName}.dayBeginTime`}
						options={workTimeOptions}
						onFocus={handleTimeInputFocus}
					/>
					<CustomTooltip
						tooltipText={'Неверный формат графика'}
						controlShow={getFieldState(workScheduleFieldName).invalid}
						placement={'bottom-end'}
						anchorRefCurrent={inputRef.current}
						zIndex={zIndex.modal + 1}
						disableHoverListener
					>
						<div ref={inputRef}>
							<FormTimePicker
								popperPlacement={'bottom-end'}
								fieldName={`${workScheduleFieldName}.dayEndTime`}
								options={workTimeOptions}
								onFocus={handleTimeInputFocus}
							/>
						</div>
					</CustomTooltip>
				</>
				: <>
					<TimePicker
						classes={{
							wrapper: classes['wrapper'],
							input: classes['disabled'],
						}}
						defaultValue={'00:00'}
						type="time"
						disabled
					/>
					<TimePicker
						classes={{ input: classes['disabled'] }}
						defaultValue={'00:00'}
						type="time"
						disabled
					/>
				</>
			}
		</>
	);
};

export default DaySettings;
