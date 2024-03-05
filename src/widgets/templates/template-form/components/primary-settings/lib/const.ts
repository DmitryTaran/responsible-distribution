import { PrimarySettingsInputsConfig } from './types';

export enum PrimaryFieldNames {
	name = 'name',
	distributionType = 'distributionType'
}

export const primarySettingsInputs: PrimarySettingsInputsConfig = {
	[PrimaryFieldNames.name]: {
		placeholder: 'Введите наименование',
		fieldName: 'name',
		options: {
			required: 'Поле обязательно для заполнения',
		},
	},
} as const;


