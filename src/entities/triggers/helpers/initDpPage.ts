import { DpQuerySelectors } from '../consts/DpQuerySelectors';
import { addDpListener } from '../store/DpListenersStore';
import { ObserverStore } from '../store/DpObserverStore';
import { dpCancelEdit, dpSaveEdit } from '../store/TriggerStore';
import { DpListenerKeys } from '../types';

export const initDpPage = (): void => {
	ObserverStore.dpSettingsConfirmModalOpenObserver?.observe(document.body, { childList: true });
	const dpSaveButton = document.querySelector(DpQuerySelectors.DpSaveButton);
	const dpCancelButton = document.querySelector(DpQuerySelectors.DpCancelButton);
	addDpListener(dpSaveEdit, dpSaveButton, DpListenerKeys.DP_SAVE_BUTTON);
	addDpListener(dpCancelEdit, dpCancelButton, DpListenerKeys.DP_CANCEL_BUTTON);
};