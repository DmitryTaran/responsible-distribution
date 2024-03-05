import { TriggerService } from '../api/TriggerService';
import { DpQuerySelectors } from '../consts/DpQuerySelectors';
import { CurrentTriggerStore, DeletedTriggersStore } from '../types';

export const deletedTriggersStore: DeletedTriggersStore = {
	triggerIdsList: [],
};

export const currentTriggerStore: CurrentTriggerStore = {};

export const dpSaveTrigger = (): void => {
	const triggerInfoInput: HTMLInputElement = document.querySelector(DpQuerySelectors.NewDistributionTriggerInput)!;
	if (currentTriggerStore.selectedTrigger) {
		triggerInfoInput.value = JSON.stringify(currentTriggerStore.selectedTrigger);
	}
};
export const dpCancelEdit = (): void => {
	deletedTriggersStore.triggerIdsList = [];
};
export const dpSaveEdit = (): void => {
	if (deletedTriggersStore.triggerIdsList.length) {
		TriggerService.deleteTriggers(deletedTriggersStore.triggerIdsList);
		deletedTriggersStore.triggerIdsList = [];
	}
};