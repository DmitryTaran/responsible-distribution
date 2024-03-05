import { FieldsWithWorkTime } from './types';

export const TIME_STRING_PATTERN = /^([0-1][0-9]|2[0-3]):[0-5]\d$/g;

export const WorkTimeSettingsInputsConfig = (fieldName: FieldsWithWorkTime) => ({
	[`${fieldName}.dayBeginTime`]: {
		shrink: true,
		label: 'Время начала дня',
		type: 'time',
		fieldName: `${fieldName}.dayBeginTime`,
		width: 150,
	},
	[`${fieldName}.dayEndTime`]: {
		shrink: true,
		label: 'Время конца дня',
		type: 'time',
		fieldName: `${fieldName}.dayEndTime`,
		width: 150,
	},
} as const);