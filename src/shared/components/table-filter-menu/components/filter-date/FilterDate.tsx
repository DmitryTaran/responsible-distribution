import cn from 'classnames';
import React from 'react';
import { CustomDatePicker } from 'shared/components/custom-date-picker';
import { DateRangeType } from 'shared/components/custom-date-picker/lib/types';
import SmallDatePickerInput from 'shared/components/small-filter-input/SmallDatepickerInput';
import classes from 'shared/components/table-filter-menu/lib/styles/filter.module.scss';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';

const FilterDate = ({ matchValue, onChange, handleConfirm }: FilterInputProps<DateRangeType>): JSX.Element => {

	const [dateFrom, dateTo] = matchValue

	return (
		<div
			onKeyDown={(event) => {
				if (
					event.key === 'Enter'
					&& dateFrom
					&& !dateTo
				) {
					event.stopPropagation();
					handleConfirm([dateFrom, dateFrom])
				}
			}}
			className={classes['filter-container']}
		>
			<CustomDatePicker
				CustomInput={SmallDatePickerInput}
				dateRange={matchValue}
				onChange={onChange}
			/>
			<div
				className={cn(
					classes['confirm-text'],
					Boolean(matchValue) && classes['confirm-text-active'],
				)}
				tabIndex={-1}
				onClick={() => handleConfirm(matchValue)}
			>
				Применить
			</div>
		</div>
	);
};

export default FilterDate;