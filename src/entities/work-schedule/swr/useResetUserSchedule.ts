import { ManagerDTO } from 'entities/managers';
import { mutationOptions } from 'shared/consts/const';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { SWRError } from 'shared/types/Widget.types';
import useSWR from 'swr';
import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { ScheduleService } from '../api/ScheduleService';
import { WorkSchedule } from '../types';

export const useResetUserSchedule = (): TriggerWithArgs<
	WorkSchedule[],
	SWRError,
	SwrKeys.Managers,
	number[]
> => {

	const { data: officeWorkSchedule } = useSWR(SwrKeys.OfficeSchedule);

	const { trigger: updateSchedule } = useSWRMutation(
		SwrKeys.Managers,
		(_, { arg }: {
			arg: number[]
		}) =>
			ScheduleService.resetUserWorkSchedule(arg),
		{
			populateCache(updatedSchedules, currentCache: ManagerDTO[] | undefined) {
				return currentCache?.map((manager) =>
					updatedSchedules.includes(manager.userId)
						? ({ ...manager, workSchedule: officeWorkSchedule })
						: manager,
				) ?? [];
			},
			revalidate: false,
			...mutationOptions,
		},
	);

	return updateSchedule;
};