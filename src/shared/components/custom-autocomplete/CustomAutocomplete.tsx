import { useAutocomplete } from '@mui/material';
import React from 'react';

type Option = {
	id: number | string
	name: string
}

type CustomAutocompleteProps = {
	options: Option[]
}

const CustomAutocomplete = ({ options }: CustomAutocompleteProps): JSX.Element => {

	const {
		getRootProps,
		getInputLabelProps,
		getInputProps,
		getListboxProps,
		getOptionProps,
		groupedOptions,
	} = useAutocomplete({
		id: 'use-autocomplete-demo',
		options,
		getOptionLabel: (option) => option.name,
	});
	return (
		<div {...getRootProps()}>
			<label {...getInputLabelProps()}>Хуй</label>
			<input type="text" {...getInputProps()}/>
			<ul {...getListboxProps()}>
				{(groupedOptions as typeof options).map((option, index) =>
					<li {...getOptionProps({ option, index })}>{option.name}</li>,
				)}
			</ul>
		</div>
	);
};

export default CustomAutocomplete;