import React, { DetailedHTMLProps, forwardRef, memo, useMemo, useRef, useState, } from 'react';
import cn from 'classnames';
import cl from './time-picker.module.scss';
import { generateTimeSeries } from 'shared/utils/generate-time-series';
import CustomPopper from 'shared/components/custom-popper/CustomPopper';
import zIndex from '@mui/material/styles/zIndex';
import { Placement } from '@popperjs/core/lib/enums';
import { useForkRef } from 'shared/hooks/useForkRef';

type TimePickerProps = {
	classes?: {
		wrapper?: string;
		input?: string;
		label?: string;
	};
	error?: boolean;
	className?: string;
	labelText?: string;
	placement?: Placement
} & DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const TimePicker = memo(
	forwardRef<HTMLInputElement, TimePickerProps>(
		(
			{
				placement,
				classes,
				labelText,
				error = false,
				className,
				children,
				onFocus,
				...props
			},
			ref
		): JSX.Element => {
			const inputRef = useRef<HTMLInputElement>(null);
			const forkRefs = useForkRef(ref, inputRef);
			const series = useMemo(() => generateTimeSeries(30), []);
			const labelRef = useRef<HTMLLabelElement | null>(null);
			const [ labelAnchor, setLabelAnchor ] = useState<HTMLLabelElement | null>(null);
			const handleOpen = (): void => {
				setLabelAnchor(labelRef.current);
			};
			const handleClose = (): void => {
				setLabelAnchor(null);
			};
			const { placeholder, disabled } = props;
			return (
				<label
					ref={labelRef}
					onFocus={handleOpen}
					onBlur={handleClose}
					className={cn(
						cl['amo-input__wrapper'],
						placeholder && cl['amo-input__wrapper-with-gap']
					)}
				>
					<>
						<span className={cl['amo-input__time-label']}>
							{placeholder}
						</span>
						{labelAnchor && !disabled && (
							<CustomPopper
								anchor={labelAnchor}
								setAnchor={setLabelAnchor}
								zIndex={zIndex.modal + 1}
								placement={placement}
							>
								<ul className={cl['time-picker__series-list']}>
									{series.map((str) => (
										<li
											id={str}
											onMouseDown={() => {
												if (!inputRef.current) {
													return;
												}
												inputRef.current.value = str;
											}}
											className={
												cl['time-picker__series-item']
											}
											key={str}
										>
											<span>{str}</span>
										</li>
									))}
								</ul>
							</CustomPopper>
						)}
					</>
					<input
						{...props}
						placeholder={labelText}
						disabled={disabled}
						id={placeholder}
						type="time"
						className={cn(
							error && cl['amo-input__error'],
							cl['amo-input__time'],
							classes?.input
						)}
						onFocus={onFocus}
						ref={forkRefs}
					/>
				</label>
			);
		}
	)
);

export default TimePicker;
