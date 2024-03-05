import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { TemplateService } from '../api/TemplateService';
import { mutationOptions } from 'shared/consts/const';
import { TemplateRDO, TemplateDTO } from '../types';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { SWRError } from 'shared/types/Widget.types';

export const useCreateTemplate = (): TriggerWithArgs<TemplateRDO, SWRError, SwrKeys.Template, TemplateDTO> => {
	const { trigger: createTemplate } = useSWRMutation(
		SwrKeys.Template,
		(_, { arg }: { arg: TemplateDTO }) => TemplateService.createTemplate(arg),
		{
			populateCache: (result: TemplateRDO, currentData: TemplateRDO[] | undefined): TemplateRDO[] => currentData
				? [...currentData, result]
				: [result],
			revalidate: false,
			...mutationOptions,
		});
	return createTemplate;
};