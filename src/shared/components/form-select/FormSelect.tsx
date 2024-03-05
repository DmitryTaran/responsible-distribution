import { SelectChangeEvent } from '@mui/material';
import React from 'react';
import { FieldPath, FieldValues, PathValue, useController, useFormContext } from 'react-hook-form';
import CustomSelect, { SelectOption } from '../custom-select/CustomSelect';

export type FormSelectProps<T extends FieldValues> = {
	name: FieldPath<T>;
	label: string;
	options: SelectOption[];
	handleChange?: (e: SelectChangeEvent) => void;
	width?: number;
};

const FormSelect = <T extends FieldValues>({
	                                           name,
	                                           options,
	                                           label,
	                                           handleChange,
	                                           width,
                                           }: FormSelectProps<T>): JSX.Element => {
	const { control } = useFormContext<T>();

	const { id: defaultValue } = options[0];

	const { field } = useController({
		defaultValue: defaultValue as PathValue<T, typeof name>,
		control,
		name,
	});

	return (
		<CustomSelect

			options={options}
			label={label}
			defaultValue={defaultValue}
			{...field}
			onChange={(e) => {
				handleChange && handleChange(e);
				field.onChange(e);
			}}
			width={width}
		/>
	);
};

export default FormSelect;
