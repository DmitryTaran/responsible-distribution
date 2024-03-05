import React from 'react';
import {
	DistributionTypes,
	TemplateFieldNames,
	TemplateRDO,
	useResetManagersWeight,
	useTemplateFormContext,
} from 'entities/templates';
import { DistributionTypeSelectObjectConfig } from './lib/consts';
import FormWrapper from 'shared/components/form-wrapper/FormWrapper';
import { NativeSelect } from 'shared/components/native-select/NativeSelect';
import { recountPercentWeightNew } from 'entities/templates/helpers/recountPercentWeight';

const DistributionTypeSelect = (): JSX.Element => {
	const { DISTRIBUTION_SETTINGS } = TemplateFieldNames;

	const { resetField, getValues } = useTemplateFormContext();

	const { resetManagersWeights } = useResetManagersWeight<TemplateRDO>('distributionSettings');

	const handleDistributionTypeChange = (distributionType: string): void => {
		const selectedManagers = getValues(DISTRIBUTION_SETTINGS);
		resetField(DISTRIBUTION_SETTINGS, { defaultValue: selectedManagers });
		switch (distributionType) {
			case DistributionTypes.PERCENT:
				resetManagersWeights(recountPercentWeightNew(selectedManagers));
				break;
			case DistributionTypes.QUANTITY:
				resetManagersWeights(selectedManagers, 1);
				break;
		}
	};
	return (
		<div>
			<FormWrapper
				{...DistributionTypeSelectObjectConfig}
				defaultValue={DistributionTypes.QUEUE}
				additionalFormChange={handleDistributionTypeChange}
				fieldName={'distributionType'}
				Component={NativeSelect}
			/>
		</div>
	);
};

export default DistributionTypeSelect;
