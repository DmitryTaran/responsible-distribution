import { Pipeline } from 'shared/types/AMO.types';
import { $amoApi } from './index';
import { ServerRoutes } from './routes';

export const AmoService = {

	async subscribe(destination: string): Promise<void> {
		await $amoApi.post(
			ServerRoutes.AmoWebHookRoute,
			{
				destination,
				settings: ['status_lead'],
			},
		);
	},

	async unsubscribe(destination: string): Promise<void> {
		await $amoApi.delete(
			ServerRoutes.AmoWebHookRoute,
			{ data: { destination } },
		);
	},

	async getPipelines(): Promise<Pipeline> {
		const { data } = await $amoApi.get<Pipeline>(ServerRoutes.AmoPipelineRoute);
		return data;
	},
};
