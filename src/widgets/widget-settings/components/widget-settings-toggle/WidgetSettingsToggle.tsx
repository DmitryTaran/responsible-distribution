import classNames from 'classnames';
import { SettingsOptions } from 'entities/payment/lib/SettingsOptionsTypes';
import React from 'react';
import cl from './widgetSettingsToggle.module.scss';

type WidgetSettingsTogglerProps = {
	selectedOption: SettingsOptions,
	selectedOptionHandler: (option: SettingsOptions) => void
}

const WidgetSettingsToggle = ({ selectedOption, selectedOptionHandler }: WidgetSettingsTogglerProps): JSX.Element => {

	return (
		<div className={cl['toggler-nav']}>
			{Object.values(SettingsOptions).map(option =>
				<div
					key={option}
					onClick={() => selectedOptionHandler(option)}
					className={classNames(cl['toggler-nav__item'], { [cl._active]: option === selectedOption })}
				>
					<span>{option}</span>
				</div>,
			)}
		</div>
	);
};

export default WidgetSettingsToggle;