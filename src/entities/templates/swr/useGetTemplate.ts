import { TemplateService } from 'entities/templates/api/TemplateService';
import { SwrKeys } from 'shared/consts/SwrKeys';
import useSWRImmutable from 'swr';
import { TemplateDTO, UserSettingDTO } from '../types';
import { useMemo } from 'react';

type UseTemplateReturn = {
	templateData: TemplateDTO[]
	templateError: unknown;
	isTemplateValidating: boolean;
	isTemplateLoading: boolean;
};

export const useGetTemplate = (): UseTemplateReturn => {
	const { data, error, isValidating, isLoading } =
		useSWRImmutable(
			SwrKeys.Template,
			TemplateService.getAllTemplates,
		);

	const serializedTemplates = useMemo(() => data?.map(({ distributionSettings, ...template }) => {
		const serializedSettings: UserSettingDTO[] = distributionSettings.map((setting) => ({
			weight: setting.weight,
			user: setting.user.id
		}));
		return {
			...template,
			distributionSettings: serializedSettings
		};
	}) || [], [ data ]);
	return {
		templateData: serializedTemplates,
		templateError: error,
		isTemplateValidating: isValidating,
		isTemplateLoading: isLoading,
	};
};




