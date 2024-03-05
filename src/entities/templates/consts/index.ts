import { SelectOption } from 'shared/components/custom-select/CustomSelect';

export enum DistributionTypes {
	QUEUE = 'queue',
	QUANTITY = 'quantity',
	PERCENT = 'percent',
	CONVERSION = 'conversion',
}

export enum EntityTypes {
	COMPANY = 'company',
	CONTACT = 'contact',
}

export enum DistributionTypesNames {
	queue = 'По очереди',
	quantity = 'По количеству',
	percent = 'В процентном соотношении',
	conversion = 'По конверсии',
}

export const distributionTypesOptions = Object.entries(DistributionTypesNames).map(([id, name]) => ({ id, name }));

export const isControlRepeatSalesOptions: SelectOption[] = [
	{ id: 'company', name: 'Компании' },
	{ id: 'contact', name: 'Контакта' },
];

export enum IsControlRepeatSalesObjectOptions {
	company = 'Компании',
	contact = 'Контакта',
}

export enum RedistributionSoundsNames {
	none = 'Без звука',
	echo = 'Эффект эха',
	beautiful = 'Красивый нежный',
	peep = 'Пип пип',
	bird = 'Сойка',
	chponk = 'Чпоньк',
}

export enum RedistributionSoundsTypes {
	NONE = 'none',
	ECHO = 'echo',
	BEAUTIFUL = 'beautiful',
	PEEP = 'peep',
	BIRD = 'bird',
	CHPONK = 'chponk',
}

export const DIGITS_AFTER_COMMA = 2;

export const SUCCESS_STATUS_ID_VALUE = 142;
