import React, { forwardRef } from 'react';
import CalendarSvg from 'shared/svg/calendar/CalendarSvg';
import cl from './smallFilterInput.module.scss';
import cn from 'classnames';

const SmallDatePickerInput = forwardRef<HTMLInputElement>(({
	...props
}, ref): JSX.Element => {

	return (
		<div className={cl['filter-input-container']}>
			<input
				{...props}
				ref={ref}
				className={cl['filter-input']}
				placeholder={'дд.мм.гг - дд.мм.гг'}
			/>
			<CalendarSvg
				width={19}
				height={19}
				className={cn(cl['input-icon-calendar'], cl['input-icon'])}
			/>
		</div>
	);
});

export default SmallDatePickerInput;