import { AmoManagers, DefaultAmoValuesType, Manager } from '../types/AMO.types';
import { AmoCrmMock } from './AMOCRM.mock';

const AMOCRMInstance = typeof AMOCRM === 'object' ? AMOCRM : AmoCrmMock

export const getWidgetArea = (): string => AMOCRMInstance.getWidgetsArea();

export const account = {
	id: AMOCRMInstance.constant('account').id,
	subdomain: AMOCRMInstance.constant('account').subdomain,
	timezone: 'Europe/Moscow',
};

export const user = {
	id: AMOCRMInstance.constant('user').id,
};

export const TASK_TYPES = Object.keys(
	AMOCRMInstance.constant('task_types'),
).map((taskKey) => ({
	id: AMOCRMInstance.constant('task_types')[taskKey].id as unknown as string,
	name: AMOCRMInstance.constant('task_types')[taskKey]
		.option as unknown as string,
}));

export const MANAGERS: AmoManagers = AMOCRMInstance.constant('managers')

export const MANAGERS_ARRAY: Manager[] = Object.keys(
	AMOCRMInstance.constant('managers'),
).map((managerKey) => ({
	id: managerKey,
	group: AMOCRMInstance.constant('managers')[managerKey].group,
	name: AMOCRMInstance.constant('managers')[managerKey].option,
	isAdmin: AMOCRMInstance.constant('managers')[managerKey].is_admin === 'Y',
}));

export const defaultAmoInputValues: DefaultAmoValuesType = {
	user_rights: MANAGERS_ARRAY.filter((manager) => manager.isAdmin).map(
		({ id }) => id,
	),
	user_includes: MANAGERS_ARRAY.map(({ id }) => id),
};

export const GROUPS = AMOCRMInstance.constant('groups');

export const userId = AMOCRMInstance.constant('user').id;
