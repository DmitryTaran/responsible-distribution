import { Box } from '@mui/material';
import { Placement } from '@popperjs/core/lib/enums';
import ru from 'date-fns/locale/ru';
import React, { ForwardRefExoticComponent, RefAttributes } from 'react';
import DatePicker from 'react-datepicker';
import CustomHeader from 'shared/components/custom-date-picker/components/custom-header/CustomHeader';
import { parseDateRangeString } from 'shared/components/custom-date-picker/lib/helpers';
import { DateRangeType } from 'shared/components/custom-date-picker/lib/types';
import { REDISTRIBUTION_CONTAINER_ID } from 'shared/consts/const';
import './datePicker.css';


type CustomDatePickerProps = {
	dateRange: DateRangeType
	onChange: (dateRange: DateRangeType) => void
	CustomInput: ForwardRefExoticComponent<RefAttributes<HTMLInputElement>>
	placement?: Placement
}

export const CustomDatePicker = ({ dateRange, onChange, CustomInput, placement }: CustomDatePickerProps): JSX.Element => {
	const [startDate, endDate] = dateRange;
	return (
		<Box>
			<DatePicker
				onChangeRaw={(event) => {
					const [dateFrom, dateTo] = parseDateRangeString(event.target.value);
					dateFrom && onChange([dateFrom, dateTo]);
				}}
				popperPlacement={placement}
				portalId={REDISTRIBUTION_CONTAINER_ID}
				renderCustomHeader={CustomHeader}
				customInput={<CustomInput/>}
				selected={startDate}
				startDate={startDate}
				endDate={endDate}
				onChange={(date, event) => {
					if (event?.type === 'click') {
						onChange(date);
					}
				}}
				onCalendarClose={() => {
					!endDate && onChange([startDate, startDate]);
				}}
				locale={ru}
				dateFormat={'dd.MM.yy'}
				selectsRange
			/>
		</Box>
	);
};