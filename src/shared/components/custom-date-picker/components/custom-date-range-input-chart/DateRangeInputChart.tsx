import { forwardRef } from 'react';
import cl from './dateRangeInputChart.module.scss';

const DateRangeInputChart = forwardRef<HTMLInputElement>(({
	 ...props
}, ref): JSX.Element => {
	return (
		<input
			{...props}
			ref={ref}
			placeholder={'дд.мм.гг - дд.мм.гг'}
			className={cl.dateRangeInput}
		/>
	);
});

export default DateRangeInputChart;