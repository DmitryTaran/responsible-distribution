import cn from 'classnames';
import React from 'react';
import { PaymentPlan } from '../../../../entities/payment/lib/SettingsOptionsTypes';
import classes from './widgetSettingsPayment.module.scss';

type PaymentItemProps = {
	plan: PaymentPlan
	isActive: boolean
	setActive: (planId: number) => void
}

const WidgetSettingsPaymentItem = ({ plan, isActive, setActive }: PaymentItemProps): JSX.Element => {
	return (
		<div
			className={cn(classes.reon_widget_settings_price_item, { [classes._active]: isActive })}
			key={plan.id}
			onClick={() => setActive(plan.id)}
		>
			<div className={classes.reon_widget_settings_price_item_title}>
				{plan.title}
			</div>
			<div className={classes.reon_widget_settings_price_item_body}>
				<span className={classes.reon_widget_settings_price_period}>{plan.period.name}</span>
				<span className={classes.reon_widget_settings_price_value}>{plan.price.name}</span>
			</div>
		</div>
	);
};

export default WidgetSettingsPaymentItem;