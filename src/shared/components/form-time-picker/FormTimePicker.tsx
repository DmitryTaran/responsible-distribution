import React, { FocusEventHandler } from 'react';
import { useInput } from 'shared/hooks/useInput';
import TimePicker from 'shared/components/time-picker/TimePicker';
import { FieldPath, FieldValues, RegisterOptions } from 'react-hook-form';
import { Placement } from '@popperjs/core/lib/enums';

type FormTimePickerProps<T extends FieldValues> = {
	disabled?: boolean;
	placeholder?: string;
	fieldName: FieldPath<T>;
	options?: RegisterOptions<T>;
	popperPlacement?: Placement
	onFocus?: FocusEventHandler
}

const FormTimePicker = <T extends FieldValues>({
	disabled,
	options,
	placeholder,
	fieldName,
	popperPlacement,
	onFocus
}: FormTimePickerProps<T>): JSX.Element => {
	const { register, invalid } = useInput(fieldName, options);

	return (
		<TimePicker
			disabled={disabled}
			error={invalid}
			autoComplete="off"
			placeholder={placeholder}
			placement={popperPlacement}
			onFocus={onFocus}
			{...register}
		/>
	);
};

export default FormTimePicker;