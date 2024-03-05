import { dpListenersStore, removeDpListener } from '../store/DpListenersStore';
import { ObserverStore } from '../store/DpObserverStore';
import { DpListenerKeys } from '../types';

export const cleanStores = (): void => {
	Object.values(ObserverStore).forEach((observer: MutationObserver) => observer.disconnect());
	Object.entries(dpListenersStore).forEach(([key, listener]) => removeDpListener(listener, key as DpListenerKeys));
}
