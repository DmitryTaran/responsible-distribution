import { Box, Typography } from '@mui/material';
import { TemplateDTO, TemplateRDO, useGetTemplate } from 'entities/templates';
import {
	addDpListener,
	currentTriggerStore,
	deletedTriggersStore,
	DISABLED_BUTTON_CLASS,
	DpListenerKeys,
	DpQuerySelectors,
	dpSaveTrigger,
	Trigger
} from 'entities/triggers';
import React, { useEffect, useRef, useState } from 'react';
import SelectPrimeItem from 'shared/components/select-prime-item/SelectPrimeList';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { UUID_NAMESPACE } from 'widgets/digital-pipeline/consts';
import { dpSettingsContainerStyle } from './styles';

const DPSettings = (): JSX.Element => {

	console.log('render');

	const { current: saveButton } = useRef<HTMLButtonElement>(document.querySelector(DpQuerySelectors.SaveTriggerButton)!);

	const { current: newDistInput } = useRef<HTMLInputElement | null>(document.querySelector(DpQuerySelectors.NewDistributionTriggerInput));

	const { current: oldDistInput } = useRef<HTMLInputElement | null>(document.querySelector(DpQuerySelectors.OldDistributionTriggerInput));

	const { current: deleteTriggerButton } = useRef<HTMLButtonElement>(document.querySelector(DpQuerySelectors.DeleteTriggerButton)!);

	const { current: newDistTriggerInfo } = useRef<Trigger>(JSON.parse(newDistInput?.value || 'null'));

	const { templateData, isTemplateLoading } = useGetTemplate();

	const [ selectedTemplate, setSelectedTemplate ] = useState<TemplateDTO | null>(null);

	useEffect(() => {
		const initialTemplate = templateData && templateData.find(template => {
				if (oldDistInput?.value && !newDistTriggerInfo?.templateId) {
					return oldDistInput.value === template.oldId;
				}
				return newDistTriggerInfo?.templateId === template.id;
			},
		) || templateData[0] || null;
		setSelectedTemplate(initialTemplate);
	}, [ templateData ]);

	const deleteTrigger = (): void => {
		deletedTriggersStore.triggerIdsList.push(newDistTriggerInfo?.triggerUuid);
	};

	useEffect(() => {
		addDpListener(deleteTrigger, deleteTriggerButton, DpListenerKeys.DELETE_TRIGGER_BUTTON);
		addDpListener(dpSaveTrigger, saveButton, DpListenerKeys.SAVE_TRIGGER_BUTTON);
	}, []);

	useEffect(() => {
		saveButton.disabled = !selectedTemplate;
		if (!selectedTemplate) {
			saveButton.classList.add(DISABLED_BUTTON_CLASS);
		} else {
			saveButton.classList.remove(DISABLED_BUTTON_CLASS);
		}
		if (newDistTriggerInfo?.triggerUuid) {
			currentTriggerStore.selectedTrigger = {
				triggerUuid: newDistTriggerInfo.triggerUuid,
				templateId: selectedTemplate?.id!,
			};
		} else {
			currentTriggerStore.selectedTrigger = {
				triggerUuid: oldDistInput?.value
					? uuidv5(oldDistInput.value, UUID_NAMESPACE)
					: uuidv4(),
				templateId: selectedTemplate?.id!,
			};
		}
	}, [ selectedTemplate ]);

	const handleChange = (id: string): void => {
		if (selectedTemplate?.id !== id) {
			const foundTemplate = templateData?.find(template => template.id === id);
			foundTemplate && setSelectedTemplate(foundTemplate);
		}
	};

	return (
		<Box
			id="reonDpSettings"
			sx={dpSettingsContainerStyle}
		>
			<Typography>Выберите шаблон:</Typography>
			{!isTemplateLoading &&
                <SelectPrimeItem
                    changeSelect={handleChange}
                    options={templateData ?? []}
                    selected={selectedTemplate}
                />}
		</Box>
	);
};

export default DPSettings;
