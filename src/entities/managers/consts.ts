import { RolesValues } from 'entities/managers/types/ManagerDTO';

export const RolesNames = {
	[RolesValues.Admin]: 'Администратор',
	[RolesValues.User]: 'Пользователь',
	[RolesValues.None]: ' - ',
};

export const RolesSelectOptions = [
	{id: RolesValues.Admin, name: RolesNames[RolesValues.Admin]},
	{id: RolesValues.User, name: RolesNames[RolesValues.User]},
	{id: RolesValues.None, name: RolesNames[RolesValues.None]},
]