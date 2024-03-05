import { AxiosError } from 'axios';
import useSWRMutation, { TriggerWithArgs } from 'swr/mutation';
import { TemplateService } from '../api/TemplateService';
import { mutationOptions } from '../../../shared/consts/const';
import { SwrKeys } from 'shared/consts/SwrKeys';

export const useDeleteTemplate = (): TriggerWithArgs<void, AxiosError, SwrKeys.Template, string[]> => {
	const { trigger: deleteTemplates } = useSWRMutation(
		SwrKeys.Template,
		(_, { arg }: { arg: string[] }) => TemplateService.deleteTemplates(arg),
		mutationOptions,
	);
	return deleteTemplates;
};