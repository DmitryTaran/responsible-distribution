import { $api } from 'shared/api';
import { ServerRoutes } from 'shared/api/routes';
import { account, userId } from 'shared/consts/AMO.consts';
import { ManagerDTO, UpdateRoleDTO, UpdateStatusDTO } from '../types/ManagerDTO';

export const ManagersService = {
	getSingleStatus: async (): Promise<ManagerDTO> => {

		const { data } = await $api.get<ManagerDTO>(
			ServerRoutes.GetSingleStatus,
			{
				params: {
					accountId: account.id,
					subdomain: account.subdomain,
					userId: userId,
				},
			},
		);
		return data;
	},
	getManagers: async (): Promise<ManagerDTO[]> => {
		const { data } = await $api.get<ManagerDTO[]>(
			ServerRoutes.Managers,
			{
				params: {
					accountId: account.id,
					subdomain: account.subdomain,
				},
			},
		);
		return data;
	},
	patchManagers: async (
		updatedManagers: UpdateStatusDTO[],
	): Promise<ManagerDTO[]> => {
		const { data } = await $api.patch<ManagerDTO[]>(
			`${ServerRoutes.Managers}/${account.id}`,
			updatedManagers,
		);
		return data;
	},

	updateRoles: async (updatedManagers: UpdateRoleDTO): Promise<ManagerDTO[]> => {
		const { data } = await $api.patch<ManagerDTO[]>(
			`${ServerRoutes.Managers}${ServerRoutes.UserRoles}/${account.id}`,
			updatedManagers,
		);
		return data;
	},

};
