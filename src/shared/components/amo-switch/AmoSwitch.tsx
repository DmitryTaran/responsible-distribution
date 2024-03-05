import React, {
	CSSProperties,
	DetailedHTMLProps,
	forwardRef,
	InputHTMLAttributes,
	memo,
	RefObject,
	SyntheticEvent
} from 'react';
import SwitchCircleSvg from 'shared/svg/switch-circle/SwitchCircleSvg';
import globalStyles from '../../styles/globalStyles.module.scss';
import classes from './AmoSwitch.module.scss';
import cn from 'classnames';

type AmoSwitchProps = {
	variant?: 'primary' | 'success'
	styles?: {
		switch?: CSSProperties,
		svgCircle?: CSSProperties,
	},
	classes?: {
		switch?: string,
		svgCircle?: string,
	}
	containerRef?: RefObject<HTMLDivElement>
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const AmoSwitch = memo(forwardRef<HTMLInputElement, AmoSwitchProps>(({
	variant = 'primary',
	checked,
	disabled,
	onChange,
	onClick,
	containerRef,
	styles: externalStyles,
	classes: externalClasses,
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
			ref={containerRef}
			className={cn(
				classes.switch,
				classes[`switch-${variant}`],
				checked && classes[`switch-${variant}-active`],
				externalClasses?.switch
			)}
			style={externalStyles?.switch}
			onClick={toggle}
		>
			<SwitchCircleSvg
				className={cn(
					classes['switch-svg'],
					checked && classes['switch-svg-checked'],
					externalClasses?.svgCircle
				)}
				cx={10}
				cy={10}
				color={disabled ? '#CACACA' : '#fff'}
			/>
			<input
				ref={ref}
				className={
					globalStyles['input__hidden']
				}
				type="checkbox"
				checked={checked}
				onChange={toggle}
				disabled={disabled}
				{...props}
			/>
		</div>
	);
}));

export default AmoSwitch;