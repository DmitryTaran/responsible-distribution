import { DistributionTypes, useFilteredTemplates } from 'entities/templates';
import React from 'react';
import { FilterSelect } from 'shared/components/table-filter-menu/components/filter-select/FilterSelect';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';

const TemplateFilter = ({ ...filterProps }: FilterInputProps<string>): JSX.Element => {

	const conversionTemplates = useFilteredTemplates(DistributionTypes.CONVERSION);

	return (
		<FilterSelect
			{...filterProps}
			options={conversionTemplates}
		/>);
};

export default TemplateFilter;