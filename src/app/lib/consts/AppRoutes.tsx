import StatusPageDescription from 'entities/statuses/components/status-page-description/StatusPageDescription';
import ConversionReportPage from 'pages/conversion-report-page/ConversionReportPage';
import GroupReportPage from 'pages/group-report-page/GroupReportPage';
import UsersReportPage from 'pages/users-report-page/UsersReportPage';
import React from 'react';
import InstructionsPage from '../../../pages/instructions-page/InstructionsPage';
import ShiftSchedulePage from '../../../pages/shift-shedule-page/ShiftSchedulePage';
import { PagesKeys } from 'widgets/sidebar/lib/types';
import { Pages } from '../types';
import TemplatePage from '../../../pages/templates-page/TemplatesPage';
import StatusesPage from '../../../pages/statuses/StatusesPage';
import WorkSchedulePage from '../../../pages/work-schedule-page/WorkSchedulePage';

export const AppRoutes: Pages = {
	[PagesKeys.Instructions]: {
		page: <InstructionsPage/>,
		title: {
			text: '',
			subtitle: 'Создавайте шаблоны, а потом добавляйте их в цифровую воронку',
		},
	},
	[PagesKeys.ShiftSchedule]: {
		page: <ShiftSchedulePage/>,
		title: {
			text: 'Сменный график',
			subtitle: 'Настройте сменный график, который будет использоваться в шаблонах',
		},
	},
	[PagesKeys.Templates]: {
		page: <TemplatePage/>,
		title: {
			text: 'Настройки/Шаблоны распределения',
			subtitle: 'В данном разделе вы можете создавать, редактировать и удалять шаблоны сценариев распределения карточек Сделок между пользователями amoCRM. После создания и сохранения шаблона, вы можете настроить его применение в Digital Pipeline в любой из воронок, на любом этапе.'
		},
	},
	[PagesKeys.WorkSchedule]: {
		page: <WorkSchedulePage/>,
		title: {
			text: 'Настройки/Рабочий график',
			subtitle: 'В данном разделе вы можете настроить рабочий график индивидуально для каждого пользователя или общий график сразу для всех. В случае настройки общего графика работы пользователей, все индивидуальные настройки будут перезаписаны общим графиком.',
		},
	},
	[PagesKeys.Statuses]: {
		page: <StatusesPage/>,
		title: {
			text: 'Статусы',
			subtitle: <StatusPageDescription/>,
		},
	},

	[PagesKeys.ConversionReport]: {
		page: <ConversionReportPage/>,
		title: {
			text: 'Отчеты/Распределение по конверсии',
			subtitle: 'Отчет показывает отношение распределенных карточек Сделок и конверсию в успешный этап для каждого пользователя добавленного в шаблон с типом распределения “По конверсии”.',
		},
	},
	[PagesKeys.GroupReport]: {
		page: <GroupReportPage/>,
		title: {
			text: 'Отчеты/Распределение по группам',
			subtitle: 'Отчет показывает отношение распределенных карточек Сделок между группами пользователей в CRM системе.',
		},
	},
	[PagesKeys.UsersReport]: {
		page: <UsersReportPage/>,
		title: {
			text: 'Отчеты/Распределение по пользователям',
			subtitle: 'Отчет показывает отношение распределенных карточек Сделок между всеми пользователями в CRM системе.',
		},
	},
};