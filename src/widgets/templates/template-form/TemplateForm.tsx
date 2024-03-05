import { Box } from '@mui/material';
import { PipelineSelect } from 'features/templates/pipeline-select';
import React from 'react';
import { useForm } from 'react-hook-form';
import {
	templateDefaultValue,
	TemplateDTO,
	useCreateTemplate,
	useTemplateDrawerContext,
	useUpdateTemplate
} from 'entities/templates';
import Form from 'shared/components/form/Form';
import RelatedEntities from 'features/templates/related-entities/RelatedEntities';
import PrimarySettings from './components/primary-settings/PrimarySettings';
import RedistributionSettings from './components/redistribution-settings/RedistributionSettings';
import TemplateWorkTime from './components/template-work-time/TemplateWorkTime';
import classes from './templateForm.module.scss';
import AmoButton from 'shared/components/amo-button/AmoButton';
import TemplateUserSelector
	from 'widgets/templates/template-form/components/template-user-selector-new/TemplateUserSelector';
import { prepareDto } from 'widgets/templates/template-form/lib/helpers';
import { prepareTemplateDto } from 'entities/templates/helpers/prepareTemplateDto';

const TemplateForm = (): JSX.Element => {

	const templateDrawerStore = useTemplateDrawerContext();

	const { selectedTemplate } = templateDrawerStore;
	const createTemplate = useCreateTemplate();
	const updateTemplate = useUpdateTemplate();

	const methods = useForm<TemplateDTO>({
		defaultValues: selectedTemplate
			? { ...templateDefaultValue, ...selectedTemplate }
			: templateDefaultValue,
	});

	//Без этого не работает валидация
	const { formState: { errors } } = methods;

	const onTemplateFormSubmit = (template: TemplateDTO) => {
		const preparedDto = prepareTemplateDto(template);
		selectedTemplate
			? updateTemplate(preparedDto)
			: createTemplate(preparedDto);
		templateDrawerStore.setIsOpen(false);
	};


	return (
		<Form<TemplateDTO> onSubmit={onTemplateFormSubmit} methods={methods}>
			<Box gap="30px" display="flex" flexDirection="column" width="545px">
				<span className={classes['form-title']}>
					{templateDrawerStore.isUpdate()
						? 'Редактировать шаблон'
						: 'Создать новый шаблон'
					}
				</span>
				<PrimarySettings/>
				<TemplateUserSelector/>
				<PipelineSelect/>
				<RelatedEntities/>
				<RedistributionSettings/>
				<TemplateWorkTime/>
				<AmoButton
					styles={{ container: { alignSelf: 'end' } }}
					variant="primary"
					onSubmit={(e) => e.preventDefault()}
					type="submit"
				>
					Сохранить
				</AmoButton>
			</Box>
		</Form>
	);
};

export default TemplateForm;