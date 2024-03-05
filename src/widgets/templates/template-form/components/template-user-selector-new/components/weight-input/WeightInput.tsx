import React from 'react';
import { FieldArrayWithId } from 'react-hook-form';
import { TemplateDTO, TemplateFieldNames, useTemplateFormContext } from 'entities/templates';
import {
	TemplateUserSelectorErrors
} from 'widgets/templates/template-form/components/template-user-selector-new/lib/const';
import { ManagerDTO } from 'entities/managers';
import cn from 'classnames';
import classes from './templateUserSelector.module.scss';
import FormTextInput from 'shared/components/form-text-input/FormTextInput';

type WeightInputProps = {
	fields: FieldArrayWithId<TemplateDTO, 'distributionSettings', 'key'>[]
	error?: string,
	manager: ManagerDTO
}
const WeightInput = ({ error, fields, manager }: WeightInputProps): JSX.Element => {

	const { DISTRIBUTION_SETTINGS } = TemplateFieldNames;

	const { getValues } = useTemplateFormContext();

	const selectedManagersIds = fields.map(({ user }) => user);

	const weightFieldName = `${DISTRIBUTION_SETTINGS}.${selectedManagersIds.indexOf(manager.id)}.weight` as const;

	return (
		<FormTextInput
			classes={{
				input: cn(
					classes['weight-input'],
					error === TemplateUserSelectorErrors.NOT_ZERO_VALUE &&
					getValues(weightFieldName) === 0
					&& classes['weight-input_invalid']
				)
			}}
			variant="outline"
			type="number"
			options={{ valueAsNumber: true }}
			fieldName={weightFieldName}
		/>
	);
};

export default WeightInput;