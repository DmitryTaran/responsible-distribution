import { userId } from 'shared/consts/AMO.consts';
import { mutationOptions } from 'shared/consts/const';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { SWRError } from 'shared/types/Widget.types';
import useSWR from 'swr';
import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { ManagerDTO, PatchManagerDTO, UpdateStatusDTO } from '../types/ManagerDTO';
import { ManagersService } from '../api/ManagersService';

export const useUpdateManagers = (): TriggerWithArgs<
	ManagerDTO[],
	SWRError,
	SwrKeys.Managers,
	UpdateStatusDTO[]
> => {

	const { mutate } = useSWR(SwrKeys.SingleManager);

	const { trigger: updateManagers } = useSWRMutation(
		SwrKeys.Managers,
		(_, { arg }: { arg: UpdateStatusDTO[] }) =>
			ManagersService.patchManagers(arg),
		{
			populateCache(updatedManagers, current: ManagerDTO[] | undefined) {
				const currentUser = updatedManagers.find(manager => manager.userId === userId);
				currentUser && mutate(currentUser, {
					populateCache: (updatedManager) => updatedManager,
				});
				return current
					? current.map<ManagerDTO>((manager) => {
						const updatedManager: ManagerDTO | undefined =
							updatedManagers.find(
								(updated) => updated.userId === manager.userId,
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