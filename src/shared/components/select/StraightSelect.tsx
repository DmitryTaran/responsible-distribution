import React from 'react';
import classes from './select.module.scss';
import {
	Controller,
	FieldPath,
	FieldValues,
	useFormContext,
} from 'react-hook-form';
import { usePopup } from 'shared/hooks/usePopover';
import cn from 'classnames';
import { Popover } from '@mui/material';
import ArrowUpSvg from 'shared/svg/arrow-up/ArrowUpSvg';

type SelectProps<T extends FieldValues> = {
	name: FieldPath<T>;
	options: Record<string, string>;
};

const StraightSelect = <T extends FieldValues>({
	name,
	options,
}: SelectProps<T>): JSX.Element => {
	const { anchorEl, handlePopupClose, handlePopupOpen, id, open } =
		usePopup<HTMLButtonElement>(name);
	const { control } = useFormContext<T>();

	return (
		<Controller
			control={control}
			name={name}
			render={({ field }) => (
				<>
					<button
						className={cn(
							classes['select__list-button'],
							open && classes['select__list-button_open']
						)}
						onClick={handlePopupOpen}
						aria-describedby={id}
						type="button"
					>
						<span>{options[field.value]}</span>
						<div
							className={cn(
								classes['select__list-button-icon'],
								open && classes['select__list-button-icon_open']
							)}
						>
							<ArrowUpSvg />
						</div>
					</button>
					<Popover
						id={id}
						open={open}
						anchorEl={anchorEl}
						onClose={handlePopupClose}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'center',
						}}
						PaperProps={{
							style: { width: `${anchorEl?.offsetWidth}px` },
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'center',
						}}
					>
						<ul className={classes['select__list-wrapper']}>
							{Object.entries<Record<string, string>>(
								options
							).map(([key, name]) => (
								<li
									className={cn(
										classes['select__list-item'],
										field.value === key &&
											classes[
												'select__list-item_selected'
											]
									)}
									onClick={() => {
										field.onChange(key);
										handlePopupClose();
									}}
									key={key}
								>
									{name}
								</li>
							))}
						</ul>
					</Popover>
				</>
			)}
		/>
	);
};

export default StraightSelect;
