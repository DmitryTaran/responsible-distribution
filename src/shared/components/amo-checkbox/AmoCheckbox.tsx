import cn from 'classnames';
import React, {
	ChangeEventHandler,
	CSSProperties,
	DetailedHTMLProps,
	FocusEventHandler,
	forwardRef,
	memo,
	SyntheticEvent
} from 'react';
import CheckSvg from '../../svg/check/CheckSvg';
import CheckboxIntermediateSvg from '../../svg/checkbox-intermediate/CheckboxIntermediateSvg';
import globalStyles from '../../styles/globalStyles.module.scss';
import classes from './amoCheckbox.module.scss';

export type AmoCheckboxProps = {
	style?: CSSProperties
	checked?: boolean
	intermediate?: boolean
	disabled?: boolean
	onChange?: ChangeEventHandler
	onFocus?: FocusEventHandler
	onBlur?: FocusEventHandler
	name?: string
} & DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const AmoCheckbox = memo(forwardRef<HTMLInputElement, AmoCheckboxProps>(({
	style,
	checked,
	intermediate,
	onChange,
	disabled,
	onClick,
	...props
}, ref): JSX.Element => {
	const toggle = <T extends SyntheticEvent, >(e: T): void => {
		if (!disabled) {
			onChange && onChange(e);
			onClick && onClick(e);
		}
	};

	return (
		<div
			className={cn(
				classes['amo-checkbox'],
				disabled && classes['amo-checkbox__disabled']
			)}
			style={style}
			onClick={toggle}
		>
			{checked && !intermediate && <CheckSvg/>}
			{!checked && intermediate && <CheckboxIntermediateSvg/>}
			<input
				ref={ref}
				className={globalStyles['input__hidden']}
				type="checkbox"
				checked={checked}
				onChange={toggle}
				{...props}
			/>
		</div>
	);
}));

export default AmoCheckbox;