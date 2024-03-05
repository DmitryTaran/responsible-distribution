import cl from 'classnames';
import React, { CSSProperties, DetailedHTMLProps, forwardRef, memo, ReactNode } from 'react';
import LoaderSvg from 'shared/svg/loader/LoaderSvg';
import classes from './amoButton.module.scss';
import cn from 'classnames';

type AmoButtonProps = {
	variant?: 'danger' | 'primary'
	leftSvg?: ReactNode
	loading?: boolean
	styles?: {
		container?: CSSProperties
	}
	classes?: {
		container?: string
	}
} & DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const AmoButton = memo(forwardRef<HTMLButtonElement, AmoButtonProps>(({
	variant = 'primary',
	leftSvg,
	loading = false,
	children,
	styles: externalStyles,
	classes: externalClasses,
	...props
}, ref): JSX.Element => {

	return (
		<button
			{...props}
			ref={ref}
			style={externalStyles?.container}
			onClick={(e) => {
				props.onClick && props.onClick(e);
				!props.onSubmit && e.preventDefault();
			}}
			className={cl(
				classes['amo-button'],
				classes[`amo-button-${variant}`],
				externalClasses?.container
			)}
		>
			<div className={classes['amo-button__content']}>
				<div className={cn(
					classes['amo-button__content__text'],
					loading && classes['amo-button__content_loading']
				)}>
					{leftSvg}
					{children}
				</div>
				<div className={cn(
					classes['amo-button__content__loader'],
					loading && classes['amo-button__content__loader_loading']
				)}>
					<LoaderSvg/>
				</div>
			</div>

		</button>
	);
}));

export default AmoButton;