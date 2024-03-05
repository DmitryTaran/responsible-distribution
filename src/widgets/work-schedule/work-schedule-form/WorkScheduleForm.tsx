import { useUpdateSchedule, useWorkScheduleModalContext } from 'entities/work-schedule';
import { useCreateOrUpdateSchedule } from 'entities/work-schedule/swr/useCreateOrUpdateSchedule';
import { WorkScheduleDTO } from 'entities/work-schedule/types';
import React from 'react';
import { useForm } from 'react-hook-form';
import AmoButton from 'shared/components/amo-button/AmoButton';
import Form from 'shared/components/form/Form';
import { weekDays } from 'shared/consts/const';
import FormTitle from 'widgets/work-schedule/work-schedule-form/components/form-title/FormTitle';
import classes from './workScheduleForm.module.scss';
import DaySettings from 'widgets/work-schedule/work-schedule-form/components/day-settings/DaySettings';

const WorkScheduleForm = (): JSX.Element => {

	const workScheduleDrawerStore = useWorkScheduleModalContext();

	const createOrUpdateSchedule = useCreateOrUpdateSchedule();

	const updateOfficeWorkSchedule = useUpdateSchedule();

	const {
		workScheduleData,
	} = workScheduleDrawerStore;

	const isOfficeSchedule = workScheduleData?.userIds.some(id => typeof id === 'string');
	const methods = useForm<WorkScheduleDTO>({
		...(workScheduleData?.selectedSchedule && {
			defaultValues: {
				schedule: workScheduleData?.selectedSchedule,
				userIds: workScheduleData?.userIds,
			},
		}),
	});

	//Без этого не работает валидация
	const { formState: { errors }, } = methods;

	const handleWorkScheduleFormSubmit = (workSchedule: WorkScheduleDTO): void => {
		isOfficeSchedule
			? updateOfficeWorkSchedule({ ...workSchedule, ids: workSchedule.userIds })
			: createOrUpdateSchedule(workSchedule);
		workScheduleDrawerStore.setIsOpen(false);
		workScheduleDrawerStore.resetSelectedSchedule();
		workScheduleData?.onSubmit && workScheduleData.onSubmit();


	};

	return (
		<Form<WorkScheduleDTO> methods={methods} onSubmit={handleWorkScheduleFormSubmit}>
			<div className={classes['form']}>
				<div className={classes['form-background']}>
					<FormTitle usernames={workScheduleData?.userNames} isOfficeSchedule={isOfficeSchedule}/>
					<div className={classes['form-content']}>
						<div
							className={classes['form-content-text']}
						>
							День недели
						</div>
						<div
							className={classes['form-content-text']}
						>
							Начало дня
						</div>
						<div
							className={classes['form-content-text']}
						>
							Конец дня
						</div>
						{weekDays.map((day) =>
							<DaySettings key={day} dayName={day}/>
						)}
					</div>
					<div className={classes['form-footer']}>
						<AmoButton
							variant="primary"
							onSubmit={(e) => e.preventDefault()}
							type="submit"
						>
							Сохранить
						</AmoButton>
					</div>
				</div>
			</div>
		</Form>
	);
};

export default WorkScheduleForm;