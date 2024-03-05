import { Box, Dialog } from '@mui/material';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { useWorkScheduleModalContext } from 'entities/work-schedule';
import WorkScheduleForm from 'widgets/work-schedule/work-schedule-form/WorkScheduleForm';
import { WorkScheduleModalStyle } from './style';

const WorkSchedulePageModal = observer((): JSX.Element => {
	const workScheduleDrawerStore = useWorkScheduleModalContext();
	const { isOpen } = workScheduleDrawerStore;
	return (
		<Dialog
			sx={{
				'& .MuiDialog-paper': {
					borderRadius: '10px'
				}
			}}
			open={isOpen}
			onClose={() => {
				workScheduleDrawerStore.setIsOpen(false);
			}}
		>
			<Box
				sx={WorkScheduleModalStyle}>
				<WorkScheduleForm/>
			</Box>
		</Dialog>
	);
});

export default WorkSchedulePageModal;