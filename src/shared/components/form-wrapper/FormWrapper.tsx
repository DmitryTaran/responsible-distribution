import React, { ReactNode } from 'react';
import {
	FieldValues,
	FieldPath,
	Controller,
	useFormContext,
	PathValue,
	Path, RegisterOptions,
} from 'react-hook-form';
import { SelectProp } from '../native-select/NativeSelect';

type ComponentPropsType = React.ForwardRefExoticComponent<
	Omit<SelectProp, 'ref'> & React.RefAttributes<HTMLInputElement>
>;

type FormWrapperProps<T extends FieldValues, U extends ComponentPropsType> = {
	additionalFormChange?: (value: string) => void;
	defaultValue?: PathValue<T, Path<T>>;
	fieldName: FieldPath<T>;
	Component: React.ForwardRefExoticComponent<
		Omit<SelectProp, 'ref'> & React.RefAttributes<HTMLInputElement>
	>;
	classes?: {
		wrapper?: string;
		list?: string;
		listItem?: string;
	};
	options: Record<string, ReactNode>;
	label?: string;
	rules?: RegisterOptions<T>
	disabled?: boolean
};

const FormWrapper = <T extends FieldValues, U extends ComponentPropsType>({
	additionalFormChange,
	defaultValue,
	fieldName,
	Component,
	classes,
	rules,
	disabled,
	...restProps
}: FormWrapperProps<T, U>): JSX.Element => {
	const { control } = useFormContext<T>();
	return (
		<>
			<Controller
				defaultValue={defaultValue}
				control={control}
				disabled={disabled}
				name={fieldName}
				rules={rules}
				render={({ field, fieldState }) => {
					const { onChange, ref, value, disabled } = field;
					const formChange = (value: string) => {
						onChange(value);
						additionalFormChange && additionalFormChange(value);
					};
					return (
						<Component
							disabled={disabled}
							classes={classes}
							invalid={fieldState.invalid}
							{...restProps}
							formValue={value}
							onChange={(e) => {
								const {
									target: { value },
								} = e;
								onChange(value);
							}}
							formChange={formChange}
							ref={ref}
						/>
					);
				}}
			/>
		</>
	);
};

export default FormWrapper;
