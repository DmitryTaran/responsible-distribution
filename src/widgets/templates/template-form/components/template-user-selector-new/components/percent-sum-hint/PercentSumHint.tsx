import React from 'react';
import { TemplateFieldNames, useTemplateFormContext } from 'entities/templates';
import { useWatch } from 'react-hook-form';
import cn from 'classnames';
import classes from './percentSumHint.module.scss';
import { getPercentWeightSum } from 'entities/templates/helpers/getPercentWeightSum';
import { HUNDRED_PERCENT } from 'shared/consts/const';

type PercentSumHintProps = {}
const PercentSumHint = ({}): JSX.Element => {

	const { DISTRIBUTION_SETTINGS } = TemplateFieldNames;

	const {} = useTemplateFormContext();

	const distributionSettings = useWatch({ name: DISTRIBUTION_SETTINGS });

	const percentSum = getPercentWeightSum(distributionSettings);

	const isInvalid = percentSum !== HUNDRED_PERCENT;

	return (
		<div className={cn(
			classes['hint'],
			isInvalid && classes['hint_invalid']
		)}>
			Сумма процентов {percentSum}%
		</div>
	);
};

export default PercentSumHint;