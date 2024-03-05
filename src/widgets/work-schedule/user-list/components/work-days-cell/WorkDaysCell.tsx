import React, { Fragment, MouseEvent, useState } from 'react';
import { WorkSchedule } from 'entities/work-schedule';
import { getDetailedWorkDays, getWorkDays } from 'widgets/work-schedule/user-list/lib/helpers';
import { NORMAL_LINE_HEIGHT } from 'shared/theme/AmoLightTheme';
import classes from './workDaysCell.module.scss';
import cn from 'classnames';
import ArrowDownSvg from 'shared/svg/arrow-down/ArrowDownSvg';
import { OFFICE_SCHEDULE_ID } from 'widgets/work-schedule/work-schedule-form/lib/consts';

type WorkDaysCellProps = {
	workSchedule: WorkSchedule
}


const WorkDaysCell = ({ workSchedule }: WorkDaysCellProps): JSX.Element => {
	const [ open, setOpen ] = useState(false);
	const workDaysBrief = getWorkDays(workSchedule);
	const collapseHeight = workDaysBrief.length * NORMAL_LINE_HEIGHT + 'px';
	const handleClick = <T, >(e: MouseEvent<T>): void => {
		e.stopPropagation();
		setOpen(!open);
	};

	if (!Boolean(workDaysBrief.length)) {
		return (
			<div
				className={classes['work-days-cell']}
			>
				Пустой
			</div>
		);
	}


	return (
		<div
			className={classes['work-days-cell']}
			style={{
				height: open ? collapseHeight : `${NORMAL_LINE_HEIGHT}px`,
			}}
			onClick={handleClick}
		>
			<div
				className={classes['work-days-cell-text-wrapper']}
			>
				<div
					className={cn(
						classes['work-days-cell-text-wrapper-content'],
						open
							? classes['work-days-cell-text-wrapper-content-visible']
							: classes['work-days-cell-text-wrapper-content-hidden']
					)}
				>
					{getDetailedWorkDays(workSchedule).map(({ day, time }, index, days) =>
						<div key={day} className={classes['work-days-text-grid']}>
							<div>{day}</div>
							<div>
								<div className={classes['work-days-text-grid-time']}>{time}</div>
							</div>
						</div>
					)}
				</div>
				<div
					className={cn(
						classes['work-days-cell-text-wrapper-content'],
						open
							? classes['work-days-cell-text-wrapper-content-hidden']
							: classes['work-days-cell-text-wrapper-content-visible']
					)}
				>
					{workDaysBrief.join(', ')}
				</div>
			</div>
			<ArrowDownSvg
				className={cn(
					classes['work-days-cell-icon'],
					open && classes['work-days-cell-icon-reverted']
				)}
			/>
		</div>
	);
};

export default WorkDaysCell;