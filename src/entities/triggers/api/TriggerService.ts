import { account } from 'shared/consts/AMO.consts';
import { $api } from 'shared/api';
import { ServerRoutes } from 'shared/api/routes';

export const TriggerService = {
	async deleteTriggers(triggerUuids: string[]): Promise<void> {
		await $api.delete<string[]>(
			ServerRoutes.Triggers, {
				data: {
					accountId: Number(account.id),
					triggerUuids,
				},
			});
	},
};