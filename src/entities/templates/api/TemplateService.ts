import { TemplateRDO, TemplateDTO } from '../types';
import { account } from 'shared/consts/AMO.consts';
import { $api } from 'shared/api';
import { ServerRoutes } from 'shared/api/routes';

export const TemplateService = {
	getAllTemplates: async (): Promise<TemplateRDO[]> => {
		const { data } = await $api.get<TemplateRDO[]>(
			ServerRoutes.Template,
			{
				params: {
					accountId: account.id,
				},
			},
		);
		return data;
	},
	createTemplate: async (template: TemplateDTO): Promise<TemplateRDO> => {
		const { data } = await $api.post<TemplateRDO>(ServerRoutes.Template, template, {
			params: {
				accountId: account.id,
			},
		});
		return data;
	},
	updateTemplate: async (template: TemplateDTO): Promise<TemplateRDO> => {
		const { data } = await $api.patch<TemplateRDO>(ServerRoutes.Template + `/${account.id}`, template);
		return data;
	},
	deleteTemplates: async (templateIds: string[]): Promise<void> => {
		await $api.delete<string[]>(ServerRoutes.Template,
			{
				data: { templateIds },
				params: { accountId: account.id },
			});
	},
};
