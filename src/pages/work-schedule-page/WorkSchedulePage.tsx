import { workScheduleDrawerStore, WorkScheduleModalContext } from 'entities/work-schedule';
import React from 'react';
import WorkScheduleList from '../../widgets/work-schedule/user-list/WorkScheduleList';
import WorkSchedulePageModal from './components/work-schedule-page-modal/WorkSchedulePageModal';

const WorkSchedulePage = (): JSX.Element => {
	return (
		<WorkScheduleModalContext.Provider value={workScheduleDrawerStore}>
				<WorkScheduleList/>
				<WorkSchedulePageModal/>
		</WorkScheduleModalContext.Provider>
	);
};

export default WorkSchedulePage;