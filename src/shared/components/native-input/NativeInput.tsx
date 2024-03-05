import cn from 'classnames';
import cl from './native-input.module.scss';
import React, { DetailedHTMLProps, forwardRef, memo } from 'react';

type AmoInputProps = {
	helperComponent?: React.ReactNode;
	classes?: {
		wrapper?: string;
		input?: string;
		label?: string;
	};
	error?: boolean;
	variant?: 'standard' | 'outline';
	labelText?: string;
} & DetailedHTMLProps<
	React.InputHTMLAttributes<HTMLInputElement>,
	HTMLInputElement
>;

const StraightInput = memo(
	forwardRef<HTMLInputElement, AmoInputProps>(
		(
			{
				helperComponent,
				classes,
				labelText,
				error = false,
				className,
				variant,
				children,
				...props
			},
			ref
		): JSX.Element => {
			const { type } = props;
			return (
				<label
					className={cn(
						cl['native-input__wrapper'],
						classes?.wrapper
					)}
				>
					{helperComponent}
					<input
						{...props}
						type={props.type}
						className={cn(
							variant === 'outline' &&
							cl['native-input__outline'],
							variant === 'standard' &&
							type !== 'time' &&
							cl['native-input__standard'],
							error && cl['native-input__error'],
							classes?.input
						)}
						ref={ref}
					/>
				</label>
			);
		}
	)
);

export default StraightInput;
