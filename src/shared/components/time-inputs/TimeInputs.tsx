import React from 'react';
import { Tooltip, Box } from '@mui/material'
import {
	FieldPath,
	FieldValues,
	RegisterOptions,
	useController,
	useFormContext,
} from 'react-hook-form';
import { TIME_STRING_PATTERN } from '../../../features/templates/work-time-settings/lib/const';
import { Colors } from '../../theme/AmoLightTheme';
import { timeToSeconds } from './lib/timeToSeconds';
import FormTimePicker from 'shared/components/form-time-picker/FormTimePicker';
import { Placement } from '@popperjs/core/lib/enums';

type TimeInputsProps<T extends FieldValues> = {
	disabled?: boolean;
	field: FieldPath<T>;
	disableLabels?: boolean;
	gap?: string | number;
	placement?: Placement
};

const TimeInputs = <T extends FieldValues>({
	disabled,
	field,
	disableLabels,
	placement,
}: TimeInputsProps<T>): JSX.Element => {
	const { control, getFieldState, trigger } = useFormContext<T>();

	const workTimeOptions: RegisterOptions = {
		required: true,
		pattern: TIME_STRING_PATTERN,
		validate: () => !getFieldState(field).invalid,
		onBlur: () => trigger(field),
	};

	useController({
		name: field,
		control,
		rules: {
			validate: (value) =>
				Boolean(
					value?.dayBeginTime &&
						value?.dayEndTime &&
						timeToSeconds(value.dayEndTime) >
							timeToSeconds(value.dayBeginTime)
				),
		},
	});

	return (
		<Box display="flex" justifyContent='space-between'>
			<FormTimePicker
				popperPlacement={placement}
				disabled={disabled}
				placeholder={!disableLabels ? 'Начало рабочего дня' : ''}
				fieldName={`${field}.dayBeginTime`}
				options={workTimeOptions}
			/>
			<FormTimePicker
				popperPlacement={placement}
				disabled={disabled}
				placeholder={!disableLabels ? 'Конец рабочего дня' : ''}
				fieldName={`${field}.dayEndTime`}
				options={workTimeOptions}
			/>
		</Box>
	);
};

export default TimeInputs;
