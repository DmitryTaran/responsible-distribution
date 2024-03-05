import React, { ReactNode } from 'react';
import UserSelector from 'features/user-selector/UserSelector';
import { useFieldArray, useWatch } from 'react-hook-form';
import {
	DistributionTypes,
	TemplateFieldNames,
	TemplateRDO,
	useResetManagersWeight,
	useTemplateFormContext
} from 'entities/templates';
import { recountPercentWeightNew } from 'entities/templates/helpers/recountPercentWeight';
import FormCardLayout from 'widgets/templates/template-form/components/form-card-layout/FormCardLayout';
import Title from 'shared/components/title/Title';
import { HUNDRED_PERCENT } from 'shared/consts/const';
import { getPercentWeightSum } from 'entities/templates/helpers/getPercentWeightSum';
import PercentSumHint
	from 'widgets/templates/template-form/components/template-user-selector-new/components/percent-sum-hint/PercentSumHint';
import { Colors } from 'shared/theme/AmoLightTheme';
import {
	TemplateUserSelectorErrors
} from 'widgets/templates/template-form/components/template-user-selector-new/lib/const';
import WeightInput
	from 'widgets/templates/template-form/components/template-user-selector-new/components/weight-input/WeightInput';

const weightedDistributionTypes = [ DistributionTypes.PERCENT, DistributionTypes.QUANTITY ];

const TemplateUserSelector = (): JSX.Element => {

	const { DISTRIBUTION_TYPE, DISTRIBUTION_SETTINGS } = TemplateFieldNames;

	const {
		control,
		getValues,
		getFieldState,
		resetField
	} = useTemplateFormContext();

	const { append, remove, fields } = useFieldArray({
		control: control,
		keyName: 'key',
		name: DISTRIBUTION_SETTINGS,
		rules: {
			validate: {
				minLength: (value) => value.length > 1 || 'Минимальное количество выбранных пользователей: 2',
				hundredPercentSum: (value, formValues) => {
					if (formValues.distributionType === DistributionTypes.PERCENT) {
						return getPercentWeightSum(value) === HUNDRED_PERCENT || 'Сумма значений должна составлять 100%';
					}
					return true;
				},
				notZeroValue: (value, formValues) => {
					if (weightedDistributionTypes.includes(formValues.distributionType)) {
						return value.every(({ weight }) => (weight || 0) > 0) || 'Все значения должны быть больше 0';
					}
					return true;
				},
			},
		},
	});

	const { resetManagersWeights } = useResetManagersWeight<TemplateRDO>(DISTRIBUTION_SETTINGS);

	const distributionType = useWatch({ name: DISTRIBUTION_TYPE });

	const isShowWeight = distributionType === DistributionTypes.PERCENT || distributionType === DistributionTypes.QUANTITY;

	const userSelectorError = getFieldState(DISTRIBUTION_SETTINGS).error?.root;

	return (
		<FormCardLayout
			title={
				<Title
					text="Выбор пользователей"
					subtitle="Выберите пользователей, которые будут участвовать в распределении."
				/>
			}
		>
			<UserSelector
				invalid={
					[
						TemplateUserSelectorErrors.NOT_ZERO_VALUE,
						TemplateUserSelectorErrors.MIN_LENGTH
					].includes(userSelectorError?.type as TemplateUserSelectorErrors)
				}
				selectedManagersValue={fields}
				append={(managers) => append(managers, { shouldFocus: false })}
				remove={remove}
				weightInput={
					isShowWeight
						? (manager) =>
							<WeightInput
								error={userSelectorError?.type}
								manager={manager}
								fields={fields}
							/>
						: undefined
				}
				onManagersAppend={() => {
					const { isDirty } = getFieldState(DISTRIBUTION_SETTINGS);
					if (distributionType === DistributionTypes.PERCENT && !isDirty) {
						const selectedManagers = getValues(DISTRIBUTION_SETTINGS);
						resetManagersWeights(recountPercentWeightNew(selectedManagers));
					}
				}}
				onManagersRemove={() => {
					const { isDirty } = getFieldState(DISTRIBUTION_SETTINGS);
					if (distributionType === DistributionTypes.PERCENT && !isDirty) {
						const selectedManagers = getValues(DISTRIBUTION_SETTINGS);
						resetManagersWeights(recountPercentWeightNew(selectedManagers));
					}
					if (getValues(DISTRIBUTION_SETTINGS).length === 0) {
						resetField(DISTRIBUTION_SETTINGS, { defaultValue: [] });
					}
				}}
				error={
					userSelectorError?.type === TemplateUserSelectorErrors.MIN_LENGTH
					&& userSelectorError?.message
				}
				hint={((): ReactNode => {
					if (distributionType === DistributionTypes.PERCENT) {
						return <PercentSumHint/>;
					}
					if (userSelectorError?.type === TemplateUserSelectorErrors.NOT_ZERO_VALUE) {
						return <div style={{ color: Colors.statusErrorColor }}>{userSelectorError.message}</div>;
					}
				})()}
			/>
		</FormCardLayout>

	);
};

export default TemplateUserSelector;