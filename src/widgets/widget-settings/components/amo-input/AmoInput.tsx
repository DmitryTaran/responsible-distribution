import cn from 'classnames';
import React, { ChangeEvent } from 'react';
import cl from './amoInput.module.scss';

type AmoInputProps = {
	label: string
	value: string | number
	isValidate: boolean
	onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void
}

const AmoInput = ({ value, isValidate, onChangeHandler, label }: AmoInputProps): JSX.Element => {
	return (
		<div className={cl['amo-input__label-input']}>
			<div className="widget_settings_block__title_field reon_widget_settings-label">
				{label}
			</div>
			<div className={cn('widget_settings_block__input_field', cl['amo-input'])}>
				<input
					className="widget_settings_block__controls__ text-input"
					type="text"
					value={value}
					placeholder=""
					autoComplete="off"
					onChange={onChangeHandler}
				/>
				{
					isValidate &&
                    <span className={cl['amo-input__label-input-note']}>*Поле обязательное для заполнения</span>
				}
			</div>

		</div>
	);
};

export default AmoInput;