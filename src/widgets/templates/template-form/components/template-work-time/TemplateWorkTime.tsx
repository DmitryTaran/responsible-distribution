import React from 'react';
import {
	defaultWorkTimeSettings,
	TemplateFieldNames,
	useTemplateConditionalForm,
	useTemplateFormContext,
	WorkTime
} from 'entities/templates';
import WorkTimeSettings from 'features/templates/work-time-settings/WorkTimeSettings';
import ToggleTitle from 'shared/components/toggle-title/ToggleTitle';
import FormCardLayout from 'widgets/templates/template-form/components/form-card-layout/FormCardLayout';

const TemplateWorkTime = (): JSX.Element => {

	const { WORK_TIME } = TemplateFieldNames;

	const { formState } = useTemplateFormContext();

	const { isOpen: isSettingsOpen, handleToggle: handleWorkTimeSettingsChange }
		= useTemplateConditionalForm(
		WORK_TIME,
		defaultWorkTimeSettings,
		formState.defaultValues?.workTime as WorkTime,
	);

	return (
		<FormCardLayout
			title={<ToggleTitle
				title="Расписание работы шаблона"
				subtitle="Выберите дни недели и время (по умолчанию шаблон работает всегда)"
				handleToggle={handleWorkTimeSettingsChange}
				condition={isSettingsOpen}
			/>}
			collapsed={isSettingsOpen}
			styles={{card: {paddingRight: '80px'}}}
		>
			<WorkTimeSettings field="workTime"/>
		</FormCardLayout>
	);
};

export default TemplateWorkTime;