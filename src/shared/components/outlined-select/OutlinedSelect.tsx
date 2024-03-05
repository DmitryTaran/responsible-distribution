import React, { ReactNode, useRef, useState } from 'react';
import CustomPopper from 'shared/components/custom-popper/CustomPopper';
import classes from './outlinedSelect.module.scss';
import cn from 'classnames';
import SelectArrowDownSvg from 'shared/svg/select-arrow-down/SelectArrowDownSvg';

type OutlinedSelectProps<T extends string> = {
	options: Record<T, ReactNode>
	value: T | null
	onChange: (value: T) => void
	placeholder?: ReactNode
	width?: number
}
const OutlinedSelect = <T extends string>({
	options,
	onChange,
	value,
	placeholder,
	width
}: OutlinedSelectProps<T>): JSX.Element => {

	const [ selectAnchor, setSelectAnchor ] = useState<HTMLDivElement | null>(null);
	const selectRef = useRef<HTMLDivElement | null>(null);

	const handleSelectToggle = () => {
		selectAnchor
			? setSelectAnchor(null)
			: setSelectAnchor(selectRef.current);
	};

	const handleItemSelect = (item: T): void => {
		onChange(item);
		setSelectAnchor(null);
	};

	return (
		<>
			<div
				ref={selectRef}
				onClick={handleSelectToggle}
				className={cn(
					classes['select'],
					selectAnchor && classes['selectActive']
				)}
			>
				<div
					className={classes.selectValue}
					style={{ minWidth: width }}
				>
					{options[value] || placeholder}
				</div>
				<div className={
					cn({
						[classes.svg]: true,
						[classes.svgOpen]: Boolean(selectAnchor),
					})}
				>
					<SelectArrowDownSvg/>
				</div>
			</div>
			<CustomPopper
				anchor={selectAnchor}
				setAnchor={setSelectAnchor}
			>
				<div style={{ minWidth: selectRef?.current?.offsetWidth }} className={classes.selectOptions}>
					{Object.entries<Record<T, ReactNode>>(options).map(([ listItemValue, name ]) =>
						<div
							className={cn({
								[classes.listItem]: true,
								[classes.listItemSelected]: listItemValue === value,
							})}
							key={listItemValue}
							onClick={() => handleItemSelect(listItemValue)}
						>
							{name}
						</div>,
					)}
				</div>
			</CustomPopper>
		</>
	);
};

export default OutlinedSelect;