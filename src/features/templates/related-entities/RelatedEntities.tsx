import { Box, Collapse } from '@mui/material';
import { TemplateFieldNames, useTemplateFormContext } from 'entities/templates';
import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';
import FormCheckbox from 'shared/components/form-checkbox/FormCheckbox';
import ToggleTitle from 'shared/components/toggle-title/ToggleTitle';
import classes from './relatedEntities.module.scss';
import { checkboxSettings } from 'features/templates/related-entities/lib/const';
import FormCardLayout from 'widgets/templates/template-form/components/form-card-layout/FormCardLayout';


const RelatedEntities = (): JSX.Element => {

	const {
		setValue,
		getValues,
		getFieldState,
		trigger,
		clearErrors,
	} = useTemplateFormContext();

	const { IS_CHANGE_COMPANY_RESPONSIBLE } = TemplateFieldNames;

	const isOpen = checkboxSettings.some(({ name }) => Boolean(getValues(name)));

	const [ isRelatedEntitiesOpen, setIsRelatedEntitiesOpen ] = useState(isOpen);

	useEffect(() => {
		!isRelatedEntitiesOpen && checkboxSettings.forEach(({ name }) => setValue(name, false));
		clearErrors(IS_CHANGE_COMPANY_RESPONSIBLE);
	}, [ isRelatedEntitiesOpen ]);

	useController({
		name: IS_CHANGE_COMPANY_RESPONSIBLE,
		rules: {
			validate: () => {
				return isRelatedEntitiesOpen
					? checkboxSettings.some(({ name }) => Boolean(getValues(name)))
					: true;
			},
		},
	});
	return (
		<FormCardLayout
			collapsed={isRelatedEntitiesOpen}
			title={<ToggleTitle
				title="Сменить ответственного у связанных сущностей"
				subtitle="После распределения ответственный автоматически изменится в связанных сущностях"
				handleToggle={() => setIsRelatedEntitiesOpen(!isRelatedEntitiesOpen)}
				condition={isRelatedEntitiesOpen}
			/>}
		>
			<div>
				<Box display="flex" flexDirection="column" gap="20px">
					{checkboxSettings.map(setting =>
						<FormCheckbox
							key={setting.name}
							{...setting}
							onChange={() => trigger(IS_CHANGE_COMPANY_RESPONSIBLE)}
						/>,
					)}
				</Box>
				<Collapse in={getFieldState(IS_CHANGE_COMPANY_RESPONSIBLE).invalid}>
					<div className={classes['error-text']}>
						Выберите хотя бы одно значение
					</div>
				</Collapse>
			</div>
		</FormCardLayout>
	);
};

export default RelatedEntities;