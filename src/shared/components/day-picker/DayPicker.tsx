import { Collapse } from '@mui/material';
import React, { useState } from 'react';
import { FieldPath, FieldValues, useController, useFormContext, } from 'react-hook-form';
import { RuWeekDays, weekDays } from '../../consts/const';
import AmoToggleButton from 'shared/components/amo-toggle-button/AmoToggleButton';
import classes from './dayPicker.module.scss';

type DayPickerProps<T extends FieldValues> = {
	name: FieldPath<T>;
};

const DayPicker = <T extends FieldValues>({
	name,
}: DayPickerProps<T>): JSX.Element => {
	const { control } = useFormContext<T>();

	const { field, fieldState } = useController({
		control,
		name,
		rules: {
			validate: (value: string[]) => Boolean(value?.length),
		},
	});

	const [ selectedDays, setSelectedDays ] = useState<string[]>(
		field.value as string[]
	);

	const handleToggleButtonChange = (day: string): void => {
		const updatedDays = selectedDays.includes(day)
			? selectedDays.filter(selectedDay => selectedDay !== day)
			: [ ...selectedDays, day ];
		setSelectedDays(updatedDays);
		field.onChange(updatedDays);
	};

	return (
		<div>
			<div className={classes['day-container']}>
				{weekDays.map(day =>
					<AmoToggleButton
						onChange={(_, value) => handleToggleButtonChange(day)} key={day} value={day}
						checked={selectedDays.includes(day)}
						invalid={fieldState.invalid}
					>
						{RuWeekDays[day]}
					</AmoToggleButton>
				)}
			</div>
			<Collapse in={fieldState.invalid}>
				<div className={classes['day-container_error']}>
					Минимальное количество выбранных дней: 1
				</div>
			</Collapse>
		</div>
	);
};

export default DayPicker;
