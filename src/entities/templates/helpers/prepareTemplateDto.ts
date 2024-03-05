import { TemplateDTO } from 'entities/templates';

export const prepareTemplateDto = ({
	successPipelineId,
	successStatusId,
	...template
}: TemplateDTO): TemplateDTO => {

	return {
		successStatusId: Number(successStatusId),
		successPipelineId: Number(successPipelineId),
		...template
	};
};