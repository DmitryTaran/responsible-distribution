export type Trigger = {
	templateId: string
	triggerUuid: string
}

export type DeletedTriggersStore = {
	triggerIdsList: string[];
};

export type CurrentTriggerStore = {
	selectedTrigger?: Trigger
}

export enum DpListenerKeys {
	DELETE_TRIGGER_BUTTON = 'deleteTriggerButtonListener',
	SAVE_TRIGGER_BUTTON = 'saveTriggerButtonListener',
	DP_MODAL_CANCEL_BUTTON = 'dpModalCancelButtonListener',
	DP_MODAL_SAVE_BUTTON = 'dpModalSaveButtonListener',
	DP_SAVE_BUTTON = 'dpSaveButtonListener',
	DP_CANCEL_BUTTON = 'dpCancelButtonListener',
	DP_MODAL_SAVE_TRIGGER = 'dpModalSaveTrigger',
}

export type Listener = {
	callback: () => void
	node: Node
}

export type DpListenersStore = {
	[key in DpListenerKeys]: Listener | null
}

export type ObserverStoreType = {
	dpSettingsCloseObserver?: MutationObserver
	dpSettingsConfirmModalOpenObserver?: MutationObserver
};


