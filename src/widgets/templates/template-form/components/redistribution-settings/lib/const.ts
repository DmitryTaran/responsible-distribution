import { TemplateFieldNames } from 'entities/templates/consts/templateFieldNames';
import { InputsSettings } from 'shared/components/form-text-input/FormTextInput';
import { TemplateRDO } from 'entities/templates';

export type RedistributionInputsSettings = InputsSettings<TemplateRDO, 'redistributeByTimeSettings.acceptanceTime' | 'redistributeByTimeSettings.redistributionQuantity'>

export const RedistributionSettingsInputs: RedistributionInputsSettings = {
	[TemplateFieldNames.ACCEPTANCE_TIME]: {
		width: '48%',
		type: 'number',
		fieldName: TemplateFieldNames.ACCEPTANCE_TIME,
		label: 'Время принятия заявки (сек)',
		helperText: '*От 10 сек. до 300 сек.',
		options: {
			required: 'Поле обязательно для заполнения',
			valueAsNumber: true,
			min: {
				value: 10,
				message: 'Значение должно быть больше 10 сек',
			},
			max: {
				value: 300,
				message: 'Значение должно быть меньше 5 мин',
			},
		},
	},
	[TemplateFieldNames.REDISTRIBUTION_QUANTITY]: {
		width: '48%',
		type: 'number',
		fieldName: TemplateFieldNames.REDISTRIBUTION_QUANTITY,
		label: 'Количество повторных перераспределений',
		helperText: '*Максимальное количество перераспределений - 3',
		options: {
			required: 'Поле обязательно для заполнения',
			valueAsNumber: true,
			min: {
				value: 0,
				message: 'Значение не может быть отрицательным',
			},
			max: {
				value: 3,
				message: 'До 3 раз!!!',
			},
		},
	},
} as const;
