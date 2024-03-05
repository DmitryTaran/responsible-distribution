import { ManagerDTO } from 'entities/managers';
import { mutationOptions } from 'shared/consts/const';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { SWRError } from 'shared/types/Widget.types';
import useSWR from 'swr';
import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { OFFICE_SCHEDULE_ID } from 'widgets/work-schedule/work-schedule-form/lib/consts';
import { ScheduleService } from '../api/ScheduleService';
import { UpdateWorkScheduleDTO, WorkSchedule } from '../types';


export const useUpdateSchedule = (): TriggerWithArgs<
	WorkSchedule[],
	SWRError,
	SwrKeys.Managers,
	UpdateWorkScheduleDTO
> => {

	const { mutate } = useSWR(SwrKeys.OfficeSchedule);

	const { trigger: updateSchedule } = useSWRMutation(
		SwrKeys.Managers,
		(_, { arg }: {
			arg: UpdateWorkScheduleDTO
		}) =>
			ScheduleService.patchSchedule(arg),
		{
			populateCache(updatedSchedules, currentCache: ManagerDTO[] | undefined) {

				const [officeSchedule] = updatedSchedules;

				if (officeSchedule.user === OFFICE_SCHEDULE_ID) {
					mutate(officeSchedule);
					return currentCache?.map(manager =>
						manager.workSchedule.user === OFFICE_SCHEDULE_ID
						? { ...manager, workSchedule: officeSchedule }
						: manager,
					) ?? [];
				}
				return currentCache?.map(manager => {
					const usersSchedule = updatedSchedules.find(({ user }) => user === manager.userId);
					return usersSchedule ? { ...manager, workSchedule: usersSchedule } : manager;
				}) ?? [];
			},
			revalidate: false,
			...mutationOptions,
		},
	);

	return updateSchedule;
};