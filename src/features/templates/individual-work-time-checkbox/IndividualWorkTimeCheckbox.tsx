import { Box, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { DistributionTypes } from 'entities/templates';
import { TemplateFieldNames } from 'entities/templates';
import { useTemplateFormContext } from 'entities/templates';
import FormCheckbox from 'shared/components/form-checkbox/FormCheckbox';

const IndividualWorkTimeCheckbox = (): JSX.Element => {
	const { DISTRIBUTION_TYPE, IS_CONSIDER_INDIVIDUAL_WORK_TIME } = TemplateFieldNames;
	const { setValue } = useTemplateFormContext();

	const distributionType = useWatch({
		name: DISTRIBUTION_TYPE,
	});

	useEffect(() => {
		if (isIndividualWorkTimeDisabled) {
			setValue(IS_CONSIDER_INDIVIDUAL_WORK_TIME, false);
		}
	}, [ distributionType ]);

	const isIndividualWorkTimeDisabled = distributionType !== DistributionTypes.QUEUE;

	return (
		<FormCheckbox
			key={IS_CONSIDER_INDIVIDUAL_WORK_TIME}
			name={IS_CONSIDER_INDIVIDUAL_WORK_TIME}
			label={'Учитывать индивидуальный рабочий график'}
			hint={<>*При активации - данный шаблон распределения будет проверять рабочий график пользователя</>}
			disabled={isIndividualWorkTimeDisabled}
			tooltip={{
				isShow: isIndividualWorkTimeDisabled,
				text: 'Опция доступна только для алгоритма “По очереди”'
			}}
		/>
	);
};

export default IndividualWorkTimeCheckbox;