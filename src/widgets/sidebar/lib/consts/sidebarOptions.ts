import { PagesKeys, Subtitle } from '../types';

export enum SidebarCollapsableItems {
	OPTIONS = 'Настройки',
	REPORTS = 'Отчеты'
}

export const sidebarOptionsItem: Subtitle[] = [
	{
		title: 'Шаблоны',
		pageKey: PagesKeys.Templates
	},
	{
		title: 'Рабочее время',
		pageKey: PagesKeys.WorkSchedule
	},
]

export const sidebarReportsItem: Subtitle[] = [
	{
		title: 'Распределение по группам',
		pageKey: PagesKeys.GroupReport
	},
	{
		title: 'Распределение по пользователям',
		pageKey: PagesKeys.UsersReport
	},
	{
		title: 'Распределение по конверсии',
		pageKey: PagesKeys.ConversionReport
	}
]