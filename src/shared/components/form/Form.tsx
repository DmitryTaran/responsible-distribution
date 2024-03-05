import React, { ReactNode } from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';

type FormProps<T extends FieldValues> = {
	children: ReactNode
	onSubmit: SubmitHandler<T>
	methods: UseFormReturn<T>
}

const Form = <T extends FieldValues, >({ children, onSubmit, methods }: FormProps<T>): JSX.Element => {
	return (
		<FormProvider {...methods}>
			<form
				style={{ width: 'inherit' }}
				noValidate
				onSubmit={methods.handleSubmit(onSubmit)}

			>
				{children}
			</form>
		</FormProvider>
	);
};

export default Form;
