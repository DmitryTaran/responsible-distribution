import { ManagerDTO } from 'entities/managers';
import { mutationOptions } from 'shared/consts/const';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { SWRError } from 'shared/types/Widget.types';
import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { ScheduleService } from '../api/ScheduleService';
import { WorkSchedule, WorkScheduleDTO } from '../types';


export const useCreateOrUpdateSchedule = (): TriggerWithArgs<
	WorkSchedule[],
	SWRError,
	SwrKeys.Managers,
	WorkScheduleDTO
> => {
	const { trigger: createSchedule } = useSWRMutation(
		SwrKeys.Managers,
		(_, { arg }: {
			arg: WorkScheduleDTO
		}) =>
			ScheduleService.createOrUpdateSchedule(arg),
		{
			populateCache(createdSchedules, currentCache: ManagerDTO[] | undefined) {
				console.log(createdSchedules);
				return currentCache?.map(manager => {
					const usersSchedule = createdSchedules.find(({ user }) => user === manager.userId);
					return usersSchedule ? ({ ...manager, workSchedule: usersSchedule }) : manager;
				}) ?? [];
			},
			revalidate: false,
			...mutationOptions,
		},
	);

	return createSchedule;
};