import { WorkSchedule } from 'entities/work-schedule';
import { UpdateWorkScheduleDTO, WorkScheduleDTO } from 'entities/work-schedule/types';
import { $api } from 'shared/api';
import { ServerRoutes } from 'shared/api/routes';
import { account } from 'shared/consts/AMO.consts';
import { OFFICE_SCHEDULE_ID } from 'widgets/work-schedule/work-schedule-form/lib/consts';


export const ScheduleService = {
	async patchSchedule(schedule: UpdateWorkScheduleDTO): Promise<WorkSchedule[]> {
		const { data } = await $api.patch<WorkSchedule[]>(
			ServerRoutes.Schedule, schedule, {
				params: { accountId: account.id },
			});
		return data;
	},

	async createSchedule(schedule: WorkScheduleDTO): Promise<WorkSchedule[]> {
		const { data } = await $api.post<WorkSchedule[]>(
			ServerRoutes.Schedule, schedule, {
				params: { accountId: account.id },
			});
		return data;
	},

	async getOfficeSchedule(): Promise<WorkSchedule> {
		const { data } = await $api.get<WorkSchedule>(
			ServerRoutes.Schedule + '/' + OFFICE_SCHEDULE_ID, {
				params: { accountId: account.id },
			});
		return data;
	},

	async createOrUpdateSchedule(schedule: WorkScheduleDTO): Promise<WorkSchedule[]> {
		const { data } = await $api.post<WorkSchedule[]>(
			ServerRoutes.Schedule + ServerRoutes.CreateOrUpdateSchedule, schedule, {
				params: { accountId: account.id },
			},
		);
		return data;
	},

	async resetUserWorkSchedule(userIds: number[]): Promise<number[]> {
		const { data } = await $api.post<number[]>(
			ServerRoutes.Schedule + ServerRoutes.ResetUsersWorkSchedule,
			{ userIds }, {
				params: { accountId: account.id },
			},
		);
		return data;
	},
};