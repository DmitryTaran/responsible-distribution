import { Dispatch, useState } from 'react';
import { FieldPath, FieldValues, PathValue, useFormContext } from 'react-hook-form';

type useConditionalFormReturn = {
	isOpen: boolean,
	setIsOpen: Dispatch<boolean>
	handleToggle: (checked: boolean) => void
}

export const useConditionalForm = <T extends FieldValues>(
	fieldName: FieldPath<T>,
	defaultValues: PathValue<T, FieldPath<T>>,
	currentValues: PathValue<T, FieldPath<T>>,
	onClose?: () => void,
	onOpen?: () => void,
): useConditionalFormReturn => {

	const { getValues, setValue, clearErrors } = useFormContext<T>();

	const [isOpen, setIsOpen] = useState<boolean>(Boolean(getValues(fieldName)));

	const handleToggle = (checked: boolean): void => {
		setIsOpen(checked);
		if (!checked) {
			setValue(fieldName, null as PathValue<T, FieldPath<T>>);
			clearErrors(fieldName);
			onClose && onClose();
		} else {
			currentValues
			? setValue(fieldName, currentValues)
			: setValue(fieldName, defaultValues);
			onOpen && onOpen();
		}
	};

	return {
		isOpen,
		setIsOpen,
		handleToggle,
	};

};