import React from 'react';
import { Collapse } from '@mui/material';
import {
	isControlRepeatSalesOptions,
	TemplateFieldNames,
	useTemplateConditionalForm,
	useTemplateFormContext,
} from 'entities/templates';
import LabeledCheckbox from 'shared/components/amo-checkbox/LabeledCheckbox';
import { IsControlRepeatSalesSelectObjectProps, RepeatEntityCheckboxHint, RepeatSalesCheckboxHint } from './lib/consts';
import FormWrapper from 'shared/components/form-wrapper/FormWrapper';
import { EntityTypes } from 'entities/templates/consts';
import { NativeSelect } from 'shared/components/native-select/NativeSelect';
import cl from './control-repeat-sales-select.module.scss';
import FormCheckbox from 'shared/components/form-checkbox/FormCheckbox';

const ControlRepeatSalesSelect = (): JSX.Element => {
	const { IS_CONTROL_REPEAT_SALES, IS_CONTROL_REPEAT_ENTITY_RESPONSIBLE } = TemplateFieldNames;

	const { formState, setValue } = useTemplateFormContext();

	const {
		isOpen: isRepeatSalesOpen,
		handleToggle: handleIsRepeatSalesToggle,
	} = useTemplateConditionalForm(
		IS_CONTROL_REPEAT_SALES,
		isControlRepeatSalesOptions[0].id,
		formState.defaultValues?.isControlRepeatSales
	);
	return (
		<div>
			<LabeledCheckbox
				label={'Учитывать текущего ответственного'}
				checked={isRepeatSalesOpen}
				onChange={(e) => {
					handleIsRepeatSalesToggle(!isRepeatSalesOpen);
					setValue(IS_CONTROL_REPEAT_ENTITY_RESPONSIBLE, false);
				}}
				hint={RepeatSalesCheckboxHint}
			/>
			<Collapse
				in={isRepeatSalesOpen}
				unmountOnExit
			>
				<div className={cl['collapsable']}>
					<FormCheckbox
						label={'Контроль текущего ответственного'}
						name={IS_CONTROL_REPEAT_ENTITY_RESPONSIBLE}
						hint={RepeatEntityCheckboxHint}
					/>
					<FormWrapper
						{...IsControlRepeatSalesSelectObjectProps}
						defaultValue={EntityTypes.CONTACT}
						fieldName={TemplateFieldNames.IS_CONTROL_REPEAT_SALES}
						Component={NativeSelect}
					/>
				</div>
			</Collapse>
		</div>
	);
};

export default ControlRepeatSalesSelect;
