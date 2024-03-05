import { DpListenerKeys, DpListenersStore, Listener } from '../types';

export const dpListenersStore: DpListenersStore = {
	deleteTriggerButtonListener: null,
	dpCancelButtonListener: null,
	dpModalCancelButtonListener: null,
	dpModalSaveButtonListener: null,
	dpSaveButtonListener: null,
	saveTriggerButtonListener: null,
	dpModalSaveTrigger: null,
};

export const addDpListener = (callback: () => void, node: Node | null, listenerId: DpListenerKeys): void => {
	if (node) {
		node.addEventListener('click', callback);
		dpListenersStore[listenerId] = { callback, node };
	}
};

export const removeDpListener = (listener: Listener | null, listenerId: DpListenerKeys): void => {
	if (listener) {
		const { node, callback } = listener;
		node.removeEventListener('click', callback);
		dpListenersStore[listenerId] = null;
	}
};