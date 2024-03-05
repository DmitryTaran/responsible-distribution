import React from 'react';
import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { useInput } from '../../hooks/useInput';
import StraightInput from '../native-input/NativeInput';

export type InputsSettings<T extends FieldValues, U extends FieldPath<T>> = {
	[key in U]: CustomTextInputProps<T>;
};

type CustomTextInputProps<T extends FieldValues> = {
	disabled?: boolean;
	helperComponent?: React.ReactNode;
	classes?: {
		wrapper?: string;
		input?: string;
		label?: string;
	};
	className?: string;
	variant?: 'standard' | 'outline';
	fieldName: FieldPath<T>;
	options?: RegisterOptions<T>;
	type?: React.HTMLInputTypeAttribute;
	helperText?: string;
	label?: string;
	width?: string;
	placeholder?: string
};

const FormTextInput = <T extends FieldValues>({
	disabled,
	helperComponent,
	classes,
	className,
	variant = 'standard',
	fieldName,
	options,
	type,
	label,
	placeholder
}: CustomTextInputProps<T>): JSX.Element => {
	const { register, invalid } = useInput(fieldName, options);
	return (
		<StraightInput
			helperComponent={helperComponent}
			classes={classes}
			className={className}
			autoComplete="off"
			type={type || 'text'}
			placeholder={placeholder}
			variant={variant}
			error={invalid}
			disabled={disabled}
			{...register}
		/>
	);
};

export default FormTextInput;
