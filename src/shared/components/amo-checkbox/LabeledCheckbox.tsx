import React, { forwardRef, ReactNode, useRef } from 'react';
import AmoCheckbox, { AmoCheckboxProps } from 'shared/components/amo-checkbox/AmoCheckbox';
import classes from 'shared/components/amo-checkbox/labeledCheckbox.module.scss';
import cn from 'classnames';
import CustomTooltip from 'shared/components/custom-tooltip/CustomTooltip';

type LabeledCheckboxProps = {
	label: ReactNode
	hint?: ReactNode
	tooltip?: {
		isShow: boolean
		text: string
	}
} & AmoCheckboxProps

const LabeledCheckbox = forwardRef<HTMLInputElement, LabeledCheckboxProps>(({
	label,
	hint,
	tooltip,
	...props
}, ref): JSX.Element => {
	const { onChange, name, disabled } = props;

	const checkboxContainerRef = useRef<HTMLDivElement | null>(null);

	return (
		<CustomTooltip
			placement={'bottom-start'}
			anchorRefCurrent={checkboxContainerRef.current}
			tooltipText={tooltip?.text}
			disableHoverListener={!tooltip?.isShow}
		>
			<div
				className={classes['checkbox-container']}
			>
				<div
					ref={checkboxContainerRef}
					style={{ height: 'fit-content' }}
				>
					<AmoCheckbox
						ref={ref}
						{...props}
					/>
				</div>
				<div className={classes['checkbox-container-text-container']}>
					<label
						onClick={(e) => {
							!name && onChange && onChange(e);
						}}
						className={cn({
							[classes['checkbox-container-label']]: true,
							[classes['checkbox-container-label-disabled']]: disabled,
						})}
						htmlFor={props.id}
					>
						{label}
					</label>
					{hint && <div className={cn({
						[classes['checkbox-container-hint']]: true,
						[classes['checkbox-container-hint-disabled']]: disabled,
					})}>
						{hint}
                    </div>}

				</div>
			</div>
		</CustomTooltip>
	);
});

export default LabeledCheckbox;