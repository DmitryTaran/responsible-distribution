import cn from 'classnames';
import React from 'react';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';
import classes from '../../lib/styles/filter.module.scss';

type FilterSelect = {
	options: {
		id: string
		name: string
	}[]
} & FilterInputProps<string>

export const FilterSelect = ({
	options,
	onChange,
	matchValue,
	handleConfirm,
	handleCancel
}: FilterSelect): JSX.Element => {
	return (
		<div
			className={classes['select']}
		>
			{options.map(({ id, name }) =>
				<div
					key={id}
					style={{ cursor: 'pointer' }}
					onClick={() => {
						if (matchValue === id) {
							handleCancel();
							return;
						}
						handleConfirm(id);
						onChange(id);
					}}
				>
					<div
						className={cn(
							classes['select-item'],
							matchValue === id && classes['select-item-selected']
						)}
					>
						{name}
					</div>
				</div>,
			)}
		</div>
	);
};
