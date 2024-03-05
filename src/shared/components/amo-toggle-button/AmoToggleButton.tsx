import React, {
	ChangeEvent,
	DetailedHTMLProps,
	forwardRef,
	InputHTMLAttributes,
	PropsWithChildren,
	SyntheticEvent,
	useRef
} from 'react';
import globalStyles from '../../styles/globalStyles.module.scss';
import classes from './amoToggleButton.module.scss';
import cn from 'classnames';
import { useForkRef } from 'shared/hooks/useForkRef';

type AmoToggleButtonProps = {
	onChange?: (event: ChangeEvent<HTMLInputElement>, value?: string) => void
	invalid?: boolean
} & PropsWithChildren & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange'>

const AmoToggleButton = forwardRef<HTMLInputElement, AmoToggleButtonProps>(({
	checked,
	disabled,
	onChange,
	onClick,
	children,
	className,
	style,
	invalid,
	...props
}: AmoToggleButtonProps, ref): JSX.Element => {

	const inputRef = useRef<HTMLInputElement | null>(null);

	const forkedRefs = useForkRef(inputRef, ref);

	const toggle = (e: SyntheticEvent): void => {
		if (!disabled) {
			onChange && onChange(e as ChangeEvent<HTMLInputElement>, inputRef.current?.value);
			onClick && onClick(e);
		}
	};

	return (
		<div
			style={style}
			className={cn(
				classes['amo-toggle-button'],
				checked && classes['amo-toggle-button_active'],
				invalid && classes['amo-toggle-button_invalid'],
				!invalid && classes['amo-toggle-button_hoverable'],
				className && className,
			)}
			onClick={toggle}
		>
			{children}
			<input
				ref={forkedRefs}
				className={globalStyles['input__hidden']}
				type="checkbox"
				checked={checked}
				onChange={toggle}
				disabled={disabled}
				{...props}
			/>
		</div>
	);
});

export default AmoToggleButton;