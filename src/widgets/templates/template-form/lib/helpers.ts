import { TemplateRDO, TemplateDTO } from 'entities/templates/types';

export const prepareDto = (template: TemplateRDO): TemplateDTO => {
	return {
		...template,
		successPipelineId: Number(template.successPipelineId),
		distributionSettings: template.distributionSettings.map(({ user, weight }) => ({
			user: user.id,
			weight,
		})),
	};
};


