import { DIGITAL_PIPELINE_CONTAINER_ID } from 'shared/consts/const';
import { ReactRootStore } from 'shared/store/AppStore';
import { ENTIRE_PAGE_MATCHER, TRIGGER_SETTINGS_MATCHER } from '../consts';
import { DpQuerySelectors } from '../consts/DpQuerySelectors';
import { DpListenerKeys, ObserverStoreType } from '../types';
import { addDpListener, dpListenersStore, removeDpListener } from './DpListenersStore';
import { dpCancelEdit, dpSaveEdit, dpSaveTrigger } from './TriggerStore';

export const ObserverStore: ObserverStoreType = {};

export const observeDpSettingClose: MutationCallback = (_, dpSettingsCloseObserver): void => {
	const dpRoot = document.getElementById(DIGITAL_PIPELINE_CONTAINER_ID);
	if (!dpRoot) {
		ReactRootStore.dp?.unmount();
		dpSettingsCloseObserver.disconnect();
		removeDpListener(dpListenersStore.deleteTriggerButtonListener, DpListenerKeys.DELETE_TRIGGER_BUTTON);
	}
};

export const observeDpConfirmModalOpen: MutationCallback = (): void => {
	const confirmModal = document.querySelector(DpQuerySelectors.ConfirmModal);
	if (confirmModal) {
		const modalSaveButton = confirmModal.querySelector(DpQuerySelectors.ModalSaveButton)!;
		const modalCancelButton = confirmModal.querySelector(DpQuerySelectors.ModalCancelButton)!;
		const modalTitle = confirmModal.querySelector(DpQuerySelectors.ModalTitle);
		if (modalTitle?.textContent?.match(ENTIRE_PAGE_MATCHER)) {
			addDpListener(dpSaveEdit, modalSaveButton, DpListenerKeys.DP_MODAL_SAVE_BUTTON);
			addDpListener(dpCancelEdit, modalCancelButton, DpListenerKeys.DP_MODAL_CANCEL_BUTTON);
		}
		if (modalTitle?.textContent?.match(TRIGGER_SETTINGS_MATCHER)) {
			addDpListener(dpSaveTrigger, modalSaveButton, DpListenerKeys.DP_MODAL_SAVE_TRIGGER);
		}
	} else {
		removeDpListener(dpListenersStore.dpModalSaveButtonListener, DpListenerKeys.DP_MODAL_SAVE_BUTTON);
		removeDpListener(dpListenersStore.dpModalCancelButtonListener, DpListenerKeys.DP_MODAL_CANCEL_BUTTON);
		removeDpListener(dpListenersStore.dpModalSaveTrigger, DpListenerKeys.DP_MODAL_SAVE_TRIGGER);
	}
};
