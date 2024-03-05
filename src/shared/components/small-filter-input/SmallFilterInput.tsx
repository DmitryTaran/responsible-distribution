import cn from 'classnames';
import React, { forwardRef } from 'react';
import CrossSvg from 'shared/svg/cross/CrossSvg';
import cl from './smallFilterInput.module.scss';

type SmallFilterInputProps = {
	value?: string
	onChange?: (value: string) => void
	handleCrossClick?: () => void
}

const SmallFilterInput = forwardRef<HTMLInputElement, SmallFilterInputProps>(({ value, onChange, handleCrossClick, ...props }, ref): JSX.Element => {
	return (
		<div className={cl['filter-input-container']}>
			<input
				ref={ref}
				className={cl['filter-input']}
				value={value}
				onChange={(event) => onChange && onChange(event.target.value)}
				{...props}
			/>
			{Boolean(value) &&
                <CrossSvg
                    className={
						cn(cl['input-icon-cross'], cl['input-icon'])
					}
                    onClick={() => handleCrossClick && handleCrossClick()}
                />
			}
		</div>
	);
});

export default SmallFilterInput;