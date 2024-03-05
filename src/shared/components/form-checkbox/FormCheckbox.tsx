import React, { ReactNode } from 'react';
import { FieldPath, FieldValues, PathValue, useController, useFormContext } from 'react-hook-form';
import LabeledCheckbox from 'shared/components/amo-checkbox/LabeledCheckbox';

type FormCheckboxProps<U extends FieldValues> = {
	name: FieldPath<U>
	hint?: ReactNode
	label: string
	disabled?: boolean
	onChange?: () => void
	tooltip?: {
		isShow: boolean
		text: string
	}
}

const FormCheckbox = <U extends FieldValues>({
	name,
	label,
	disabled,
	hint,
	onChange,
	tooltip
}: FormCheckboxProps<U>): JSX.Element => {

	const { control, setValue } = useFormContext<U>();
	const { field } = useController({
		control,
		name,
		defaultValue: false as PathValue<U, typeof name>,
	});

	return (
		<LabeledCheckbox
			id={'reon-' + name}
			name={name}
			onChange={() => {
				setValue(name, !field.value as PathValue<U, typeof name>);
				onChange && onChange();
			}}
			disabled={disabled}
			checked={field.value}
			value={field.value}
			label={label}
			hint={hint}
			tooltip={tooltip}
		/>
	);
};

export default FormCheckbox;