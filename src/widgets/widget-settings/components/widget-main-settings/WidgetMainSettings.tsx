import React, { useRef, useState } from 'react';
import WidgetSettingsToggle from 'widgets/widget-settings/components/widget-settings-toggle/WidgetSettingsToggle';
import classes from './widgetMainSettings.module.scss';
import WidgetSettingsLayout from '../widget-settings-layout/WidgetSettingsLayout';
import { SettingsOptions } from 'entities/payment/lib/SettingsOptionsTypes';
import { createPortal } from 'react-dom';
import WidgetSettingsFooter from 'widgets/widget-settings/components/widget-settings-footer/WidgetSettingsFooter';

const WidgetMainSettings = (): JSX.Element => {
	const [selectedOption, setSelectedOption] = useState<SettingsOptions>(SettingsOptions.user);
	const {current: footerContainer } = useRef(document.querySelector('#reon-widget-settings__footer')!)
	return (
			<div className={classes['container']}>
				<WidgetSettingsToggle
					selectedOption={selectedOption}
					selectedOptionHandler={(option) => setSelectedOption(option)}
				/>
				<WidgetSettingsLayout selectedOption={selectedOption} />
				{createPortal(<WidgetSettingsFooter/>, footerContainer, 'footer')}
			</div>
	);
};

export default WidgetMainSettings;
