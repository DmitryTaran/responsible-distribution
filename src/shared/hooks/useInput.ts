import {
	Control,
	FieldError,
	FieldPath,
	FieldValues,
	Path,
	RegisterOptions,
	useFormContext,
	UseFormRegisterReturn,
} from 'react-hook-form';

type useInputReturn<T extends FieldValues> = {
	register: UseFormRegisterReturn<Path<T>>;
	invalid: boolean;
	isDirty: boolean;
	isTouched: boolean;
	error?: FieldError | undefined;
	control: Control<T>;
};

export const useInput = <T extends FieldValues>(
	field: FieldPath<T>,
	options?: RegisterOptions<T>
): useInputReturn<T> => {
	const { register, getFieldState, control } = useFormContext<T>();
	return {
		register: register(field, options),
		...getFieldState(field),
		control,
	};
};
