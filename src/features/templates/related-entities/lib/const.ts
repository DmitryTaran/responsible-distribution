import { ResponsibleCheckboxSetting } from 'features/templates/related-entities/lib/types';

export const checkboxSettings: ResponsibleCheckboxSetting[] = [
	{
		name: 'isChangeCompanyResponsible',
		label: 'Компания',
	},
	{
		name: 'isChangeMainContactResponsible',
		label: 'Главный контакт',
	},
	{
		name: 'isChangeContactsResponsible',
		label: 'Все контакты',
	},
	{
		name: 'isChangeLeadTasksResponsible',
		label: 'Открытые задачи текущей сделки',
	},
	{
		name: 'isChangeContactsTasksResponsible',
		label: 'Открытые задачи всех контактов',
	},
	{
		name: 'isChangeCompanyTasksResponsible',
		label: 'Открытые задачи компании',
	},
];