import { DistributionTypes, TemplateDTO, useGetTemplate } from 'entities/templates';
import { useMemo } from 'react';

export const useFilteredTemplates = (type: DistributionTypes): TemplateDTO[] => {
	const { templateData } = useGetTemplate();

	const filteredTemplates = useMemo<TemplateDTO[]>(
		() => templateData.filter(({ distributionType }) => distributionType === type),
		[templateData]);

	return filteredTemplates
}