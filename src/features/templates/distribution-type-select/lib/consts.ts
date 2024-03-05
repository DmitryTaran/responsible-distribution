import { DistributionTypesNames } from 'entities/templates';
import { TemplateFieldNames } from 'entities/templates';
import { TemplateRDO } from 'entities/templates';
import { ReactNode } from 'react';
import { FormSelectProps } from 'shared/components/form-select/FormSelect';

export const distributionTypesOptions = Object.entries<
	Record<string, ReactNode>
>(DistributionTypesNames).map(([id, name]) => ({ id, name }));

export const DistributionTypeSelectConfig: FormSelectProps<
	Pick<TemplateRDO, 'distributionType'>
> = {
	name: TemplateFieldNames.DISTRIBUTION_TYPE,
	label: 'Тип распределения',
	options: distributionTypesOptions,
	width: 300,
};

export const DistributionTypeSelectObjectConfig = {
	options: DistributionTypesNames,
	fieldName: TemplateFieldNames.DISTRIBUTION_TYPE,
	label: 'Тип распределения',
};
