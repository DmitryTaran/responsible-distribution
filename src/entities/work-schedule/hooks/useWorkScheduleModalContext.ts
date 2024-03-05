import { createContext, useContext } from 'react';
import { WorkScheduleDrawerStore } from '../store';

export const WorkScheduleModalContext = createContext<WorkScheduleDrawerStore | null>(null);

export const useWorkScheduleModalContext = (): WorkScheduleDrawerStore => {
	const context = useContext(WorkScheduleModalContext);
	if (context === null) {
		throw new Error('WorkScheduleDrawerContext is not available');
	}
	return context;
};