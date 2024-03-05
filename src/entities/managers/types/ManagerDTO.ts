import { StatusesValues } from '../../statuses/consts';
import { WorkSchedule } from '../../work-schedule/types';

export type ManagerDTO = {
	id: string
	userId: number;
	userName: string;
	isInclude: boolean;
	status: StatusesValues;
	groupId: number;
	group: string;
	isActive: boolean;
	widgetRole: RolesValues;
	accountId?: number;
	workSchedule: WorkSchedule
};

export type RenderingManager = { groupName: string, userId: string } & Omit<ManagerDTO, 'userId'>

export type UpdateStatusDTO = {
	userId: number
	status: StatusesValues
	accountId: number
}

export type UpdateRoleDTO = {
	userIds: number[]
	widgetRole: RolesValues
}
export type PatchManagerDTO = Partial<Omit<ManagerDTO, 'userId'>> & { userId: string }

export enum RolesValues {
	User = 'user',
	Admin = 'admin',
	None = 'none'
}

export const RolesNames: Record<RolesValues, string> = {
	[RolesValues.Admin]: 'Администратор',
	[RolesValues.User]: 'Пользователь',
	[RolesValues.None]: ' - '
};

