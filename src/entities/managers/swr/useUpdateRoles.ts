import { userId } from 'shared/consts/AMO.consts';
import { mutationOptions } from 'shared/consts/const';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { SWRError } from 'shared/types/Widget.types';
import useSWR from 'swr';
import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { ManagersService } from '../api/ManagersService';
import { ManagerDTO, UpdateRoleDTO } from '../types/ManagerDTO';

export const useUpdateRoles = (): TriggerWithArgs<
	ManagerDTO[],
	SWRError,
	SwrKeys.Managers,
	UpdateRoleDTO
> => {

	const { data: currentUser, mutate } = useSWR<ManagerDTO>(SwrKeys.SingleManager);

	const { trigger: updateManagers } = useSWRMutation(
		SwrKeys.Managers,
		( _, { arg }: { arg: UpdateRoleDTO } ) =>
			ManagersService.updateRoles({ ...arg, userIds: arg.userIds.filter(id => id !== currentUser?.userId!) }),
		{
			populateCache( updatedManagers, current: ManagerDTO[] | undefined ) {
				const currentUser = updatedManagers.find(manager => manager.userId === userId);
				currentUser && mutate(currentUser, {
					populateCache: ( updatedManager ) => updatedManager,
				});
				return current
					? current.map<ManagerDTO>(( manager ) => {
						const updatedManager: ManagerDTO | undefined =
							updatedManagers.find(
								( updated ) => updated.userId === manager.userId,
							);
						return updatedManager || manager;
					})
					: [];
			},
			revalidate: false,
			...mutationOptions,
		},
	);

	return updateManagers;
};
