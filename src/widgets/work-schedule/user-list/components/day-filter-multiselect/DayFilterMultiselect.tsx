import React from 'react';
import { FilterMultiselect } from 'shared/components/table-filter-menu/components/filter-multiselect/FilterMultiselect';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';

const days = [
	{
		id: 'Mon',
		name: 'Понедельник',
	},
	{
		id: 'Tue',
		name: 'Вторник',
	},
	{
		id: 'Wed',
		name: 'Среда',
	},
	{
		id: 'Thu',
		name: 'Четверг',
	},
	{
		id: 'Fri',
		name: 'Пятница',
	},
	{
		id: 'Sat',
		name: 'Суббота',
	},
	{
		id: 'Sun',
		name: 'Воскресенье',
	},
];

const DayFilterMultiselect = ({...filterProps}: FilterInputProps<string[]>): JSX.Element => {
	return (
		<FilterMultiselect
			options={days}
			{...filterProps}
		/>
	);
};

export default DayFilterMultiselect;