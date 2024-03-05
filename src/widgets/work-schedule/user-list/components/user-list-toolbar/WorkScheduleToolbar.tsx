import { Box } from '@mui/material';
import {
	defaultOfficeSchedule,
	useGetOfficeSchedule,
	useWorkScheduleModalContext,
	WorkSchedule
} from 'entities/work-schedule';
import React, { Dispatch, useState } from 'react';
import AmoButton from 'shared/components/amo-button/AmoButton';
import Confirmation from 'shared/components/confirmation/Confirmation';
import MinusSvg from 'shared/svg/minus/MinusSvg';
import PlusSvg from 'shared/svg/plus/PlusSvg';
import { tableToolbarContainerStyle } from '../../lib/styles';
import { useGetManagers } from 'entities/managers';
import { useResetUserSchedule } from 'entities/work-schedule/swr/useResetUserSchedule';
import { defaultEmptySchedule } from 'entities/work-schedule/defaultValues';

type UserListToolbarProps = {
	selectedManagers: string[]
	setSelectedManagers: Dispatch<string[]>
}

type WorkScheduleStoreData = {
	userNames: string[]
	workSchedule?: WorkSchedule
}

const WorkScheduleToolbar = ({
	selectedManagers,
	setSelectedManagers
}: UserListToolbarProps): JSX.Element => {

	const workScheduleDrawerStore = useWorkScheduleModalContext();

	const { managers } = useGetManagers();

	const { officeScheduleData, isOfficeScheduleLoading } = useGetOfficeSchedule();

	const resetUserSchedule = useResetUserSchedule();

	const [ confirmationOpen, setConfirmationOpen ] = useState(false);

	const handleOpenWorkScheduleForm = (userIds: number[]): void => {

		const selectedManagers = managers.reduce<WorkScheduleStoreData>((
				accum, {
					userName,
					userId,
					workSchedule,
				}) =>
				userIds.includes(userId)
					? { workSchedule, userNames: [ ...accum.userNames, userName ] }
					: accum
			, { userNames: [] });

		switch (selectedManagers.userNames.length) {
			case 0:
				workScheduleDrawerStore.setWorkScheduleData({
					selectedSchedule: officeScheduleData || defaultOfficeSchedule,
					userIds,
					userNames: [ 'Общий график' ],
				});
				break;
			case 1:
				const { workSchedule, userNames } = selectedManagers;
				workScheduleDrawerStore.setWorkScheduleData({
					selectedSchedule: workSchedule!,
					userIds,
					userNames,
					onSubmit: () => setSelectedManagers([])
				});
				break;
			default:
				workScheduleDrawerStore.setWorkScheduleData({
					selectedSchedule: defaultEmptySchedule,
					userIds,
					userNames: selectedManagers.userNames,
					onSubmit: () => setSelectedManagers([])
				});
				break;
		}

		workScheduleDrawerStore.setIsOpen(true);
	};

	const handleResetSchedule = (): void => {
		resetUserSchedule(selectedManagers.map(id => Number(id)));
	};


	return (
		<Box sx={tableToolbarContainerStyle}>
			{selectedManagers.length
				? <Box display="flex" alignItems="center" gap="30px">
					<AmoButton
						leftSvg={<MinusSvg/>}
						variant="primary"
						onClick={() => setConfirmationOpen(true)}
					>
						Сбросить график
					</AmoButton>
					<AmoButton
						leftSvg={<PlusSvg/>}
						variant="primary"
						onClick={() => handleOpenWorkScheduleForm(
							selectedManagers.map(id => Number(id)),
						)}
					>
						Создать график
					</AmoButton>
				</Box>
				: <AmoButton
					disabled={isOfficeScheduleLoading}
					loading={isOfficeScheduleLoading}
					leftSvg={<PlusSvg/>}
					variant="primary"
					onClick={() => handleOpenWorkScheduleForm([ officeScheduleData?.id ])}
				>
					создать график офиса
				</AmoButton>
			}

			<Confirmation
				text={{
					title: 'Сбросить график',
					subtitle: 'Вы действительно хотите сбросить график пользователя?',
					description: 'После сброса личного графика пользователя, к нему будет применён график офиса, при условии, что он задан.',
				}}
				setOpen={setConfirmationOpen}
				open={confirmationOpen}
				handleYes={handleResetSchedule}
			/>
		</Box>
	);
};

export default WorkScheduleToolbar;