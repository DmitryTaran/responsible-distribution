import { AxiosError } from 'axios';
import { ManagerDTO } from 'entities/managers';
import { mutationOptions } from 'shared/consts/const';
import { SwrKeys } from 'shared/consts/SwrKeys';
import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { ScheduleService } from '../api/ScheduleService';
import { WorkSchedule, WorkScheduleDTO } from '../types';


export const useCreateSchedule = (): TriggerWithArgs<
	WorkSchedule[],
	AxiosError<{message?: string}>,
	SwrKeys.Managers,
	WorkScheduleDTO
> => {
	const { trigger: createSchedule } = useSWRMutation(
		SwrKeys.Managers,
		(_, { arg }: {
			arg: WorkScheduleDTO
		}) =>
			ScheduleService.createSchedule(arg),
		{
			populateCache(createdSchedules, currentCache: ManagerDTO[] | undefined) {
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