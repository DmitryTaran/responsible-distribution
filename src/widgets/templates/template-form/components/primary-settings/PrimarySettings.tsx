import ControlRepeatSalesSelect from 'features/templates/control-repeat-sales-select/ControlRepeatSalesSelect';
import DistributionTypeSelect from 'features/templates/distribution-type-select/DistributionTypeSelect';
import IndividualWorkTimeCheckbox from 'features/templates/individual-work-time-checkbox/IndividualWorkTimeCheckbox';
import React from 'react';
import FormCheckbox from 'shared/components/form-checkbox/FormCheckbox';
import FormTextInput from 'shared/components/form-text-input/FormTextInput';
import Title from 'shared/components/title/Title';
import { PrimaryFieldNames, primarySettingsInputs } from './lib/const';
import FormCardLayout from 'widgets/templates/template-form/components/form-card-layout/FormCardLayout';

const PrimarySettings = (): JSX.Element => {

	return (
		<FormCardLayout
			title={
				<Title
					text={'Основные настройки'}
					subtitle={'Применяются для любого алгоритма распределения'}
				/>
			}
			styles={{ card: { paddingRight: '112px' } }}
		>
			<FormTextInput {...primarySettingsInputs[PrimaryFieldNames.name]}/>
			<DistributionTypeSelect/>
			<FormCheckbox
				name={'isConsiderUserStatus'}
				label={'Учитывать статус пользователя'}
				hint={'*При активации - данный шаблон распределения будет проверять статус пользователя'}

			/>
			<IndividualWorkTimeCheckbox/>
			<ControlRepeatSalesSelect/>
		</FormCardLayout>

	);
};

export default PrimarySettings;