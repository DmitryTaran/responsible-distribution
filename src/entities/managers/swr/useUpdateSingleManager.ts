import useSWR from 'swr';
import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { ManagersService } from '../api/ManagersService';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { mutationOptions } from 'shared/consts/const';
import { ManagerDTO } from '../types/ManagerDTO';

export const useUpdateSingleManager = (): TriggerWithArgs<
	ManagerDTO[],
	SwrKeys.SingleManager,
	SwrKeys.SingleManager,
	ManagerDTO[]
> => {

	const { mutate } = useSWR(SwrKeys.Managers);

	const { trigger: updateManagers } = useSWRMutation(
		SwrKeys.SingleManager,
		(_, { arg }: { arg: ManagerDTO[] }) =>
			ManagersService.patchManagers(arg),
		{
			populateCache(responseData) {
				const [updated] = responseData;
				mutate(updated, {
					populateCache: (updatedManager, managers: ManagerDTO[] | undefined) => managers?.map((manager: ManagerDTO) =>
						manager.id === updatedManager.id
						? updatedManager
						: manager,
					),
				});
				return updated;
			},
			revalidate: false,
			...mutationOptions,
		},
	);

	return updateManagers;
};