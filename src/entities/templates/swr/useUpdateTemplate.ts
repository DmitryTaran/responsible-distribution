import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { TemplateService } from '../api/TemplateService';
import { mutationOptions } from 'shared/consts/const';
import { TemplateRDO, TemplateDTO } from '../types';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { AxiosError } from 'axios';
import { SWRError } from 'shared/types/Widget.types';


export const useUpdateTemplate = (): TriggerWithArgs<TemplateRDO, SWRError, SwrKeys.Template, TemplateDTO> => {
	const { trigger: updateTemplate } = useSWRMutation(
		SwrKeys.Template,
		(_, { arg }: { arg: TemplateDTO }) => TemplateService.updateTemplate(arg),
		{
			populateCache: (result: TemplateRDO, currentData: TemplateRDO[] | undefined): TemplateRDO[] => {
				if (!currentData) {
					return [];
				}
				return currentData.map(template =>
					template.id === result.id
					? result
					: template,
				);
			},
			revalidate: false,
			...mutationOptions,
		},
	);
	return updateTemplate;
};
