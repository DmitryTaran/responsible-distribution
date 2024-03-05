import React from "react";
import { SettingsOptions } from 'entities/payment/lib/SettingsOptionsTypes';
import WidgetSettingsPayment from "../widget-settings-payment/WidgetSettingsPayment";
import WidgetSettingsUser from "../widget-settings-user/WidgetSettingsUser";

type SettingsProps = {
	selectedOption: SettingsOptions
}

const WidgetSettingsLayout = ({ selectedOption }: SettingsProps): JSX.Element => {
	switch (selectedOption){
		case SettingsOptions.payment:
			return (
				<WidgetSettingsPayment/>
			);
		case SettingsOptions.user:
			return (
				<WidgetSettingsUser/>
			);
	}
};

export default WidgetSettingsLayout;