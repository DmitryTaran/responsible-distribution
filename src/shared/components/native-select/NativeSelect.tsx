import { useForkRef } from '@mui/material';
import {
	DetailedHTMLProps,
	forwardRef,
	InputHTMLAttributes,
	MouseEventHandler,
	ReactNode,
	useRef,
	useState,
} from 'react';
import cn from 'classnames';
import cl from './native-select.module.scss';
import ArrowUpSvg from 'shared/svg/arrow-up/ArrowUpSvg';
import CustomPopper from 'shared/components/custom-popper/CustomPopper';
import zIndex from '@mui/material/styles/zIndex';

export type SelectProp = {
	classes?: {
		wrapper?: string;
		list?: string;
		listItem?: string;
	};
	label?: string;
	options: Record<string, ReactNode>;
	formValue?: string;
	formChange?: (value: string) => void;
	invalid?: boolean
} & DetailedHTMLProps<
	InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

export const NativeSelect = forwardRef<HTMLInputElement, SelectProp>((
		{
			options,
			value,
			formValue,
			formChange,
			classes,
			invalid,
			label,
			disabled,
			...props
		},
		ref
	): JSX.Element => {
		const inputRef = useRef<HTMLInputElement>(null);
		const wrapperRef = useRef<HTMLLabelElement | null>(null);
		const forkRefs = useForkRef(ref, inputRef);
		const [ wrapperAnchor, setWrapperAnchor ] = useState<HTMLLabelElement | null>(null);
		const handleSelectOnClick: MouseEventHandler<
			HTMLButtonElement
		> = (e) => {
			if (!inputRef.current) {
				return;
			}
			inputRef.current.value = String(e.currentTarget.value);
			formChange && formChange(inputRef.current.value);
		};
		return (
			<label
				className={cn(
					cl['native-select__wrapper'],
					!disabled && cl['native-select__wrapper-active'],
					invalid && cl['native-select__wrapper-invalid'],
					disabled && cl['native-select__wrapper-disabled'],
					classes?.wrapper,
				)}
				onClick={() => {
					wrapperAnchor
						? setWrapperAnchor(null)
						: setWrapperAnchor(wrapperRef.current);
				}}
				ref={wrapperRef}
			>
				<CustomPopper
					anchor={wrapperAnchor}
					setAnchor={setWrapperAnchor}
					zIndex={zIndex.drawer + 1}
					disablePortal
				>
					<ul
						style={{ minWidth: wrapperRef?.current?.offsetWidth }}
						className={cn(cl['native-select__list-wrapper'])}
					>
						{Object.entries<Record<string, ReactNode>>(
							options
						).map(([ id, name ]) => (
							<li key={id}>
								<button
									className={cn(
										cl['native-select__list-item'],
										(id === formValue ||
											id === value) &&
										cl['native-select__list-item_selected']
									)}
									type="button"
									value={id}
									onMouseDown={handleSelectOnClick}
								>
									{name}
								</button>
							</li>
						))}
					</ul>
				</CustomPopper>
				<input
					{...props}
					readOnly
					ref={forkRefs}
					defaultValue={formValue || value}
					className={cl['native-select__input']}
				/>
				<button
					disabled={disabled}
					onMouseDown={(e) => {
						e.stopPropagation();
						wrapperRef.current && wrapperRef.current.focus();
					}}
					type="button"
					className={cn(
						cl['native-select__open-button'],
						!options[String(formValue || value)] && cl['native-select__open-button__placeholder'],
						disabled && cl['native-select__open-button_disabled']
					)}
				>
					{options[String(formValue || value)] || label || 'Не выбрано'}
					<ArrowUpSvg
						className={cn(
							cl['native-select__icon'],
							wrapperAnchor && cl['native-select__icon_open']
						)}
					/>
				</button>
			</label>
		);
	}
);
