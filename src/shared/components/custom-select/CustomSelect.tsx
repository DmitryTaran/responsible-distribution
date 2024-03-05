import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React, { FocusEventHandler, ForwardedRef, forwardRef, ReactNode } from 'react';

type SelectProps<T> = {
	onChange: (event: SelectChangeEvent<T>, child?: ReactNode) => void
	onBlur?: FocusEventHandler
	name?: string
	defaultValue?: T
	options: SelectOption[]
	label: string
	helperText?: string,
	disabled?: boolean,
	value?: T
	width?: number
	multiple?: boolean
	renderValue?: (value: T) => ReactNode
	variant?: 'standard' | 'outlined' | 'filled'
}

export type SelectOption = {
	id: string
	name: ReactNode
}

const CustomSelect = forwardRef(
	<T,>({
		label,
		value,
		onChange,
		onBlur,
		name,
		options,
		defaultValue,
		disabled,
		width,
		multiple,
		renderValue,
		variant,
	}: SelectProps<T>, ref: ForwardedRef<HTMLInputElement>): JSX.Element => {

		return (
			<FormControl
				variant={variant || 'standard'}
				size='small'
			>
				<InputLabel id="customInputLabel">{label}</InputLabel>
				<Select
					placeholder={'Не выбрано'}
					ref={ref}
					labelId="customInputLabel"
					name={name}
					onBlur={onBlur}
					disabled={disabled}
					onChange={onChange}
					defaultValue={defaultValue}
					value={value || defaultValue}
					sx={{ width: width || 200 }}
					multiple={multiple}
					renderValue={renderValue}
					label={label}
				>
					{options?.map((option) =>
						<MenuItem
							key={option.id}
							value={option.id}
						>
							{option.name}
						</MenuItem>,
					)}
				</Select>
			</FormControl>
		);
	});

export default CustomSelect;