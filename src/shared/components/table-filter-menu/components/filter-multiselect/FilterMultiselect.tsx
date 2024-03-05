import cn from 'classnames';
import React, { ReactNode, useEffect, useRef } from 'react';
import classes from 'shared/components/table-filter-menu/lib/styles/filter.module.scss';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';

type FilterMultiselectProps = {
	options: {
		id: string
		name: ReactNode
	}[]
} & FilterInputProps<string[]>

export const FilterMultiselect = ({
	options,
	onChange,
	matchValue,
	handleConfirm,
	handleCancel,
}: FilterMultiselectProps): JSX.Element => {

	const handleItemClick = (id: string): void => {
		const selectedItems = matchValue.includes(id)
			? matchValue.filter(selectedId => selectedId !== id)
			: [...matchValue, id];
		onChange(selectedItems);
	};

	const ref = useRef<HTMLDivElement>()
	useEffect(() => {ref?.current?.focus()}, [matchValue])

	return (
		<>
			<div>
				{options.map(({ id, name }) =>
					<div
						key={id}
						style={{ cursor: 'pointer' }}
						onClick={() => handleItemClick(id)}
					>
						<div
							className={cn(
								classes['select-item'],
								matchValue.includes(id) && classes['select-item-selected'],
							)}
						>
							{name}
						</div>
					</div>,
				)}
			</div>
			<div
				ref={ref}
				style={{ paddingRight: '7px' }}
				className={cn(
					classes['confirm-text'],
					Boolean(matchValue.length) && classes['confirm-text-active'],
				)}
				onClick={() => {
					Boolean(matchValue.length)
						? handleConfirm(matchValue)
						: handleCancel();
				}}
				tabIndex={-1}
				onKeyDown={(event) => {
					if (event.key === 'Enter' && !Boolean(matchValue.length)) {
						event.stopPropagation();
						handleCancel();
					}
				}}
			>
				Применить
			</div>
		</>
	);
};
