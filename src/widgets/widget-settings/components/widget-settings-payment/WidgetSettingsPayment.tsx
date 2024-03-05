import cn from 'classnames';
import dayjs from 'dayjs';
import { PaymentPlan } from 'entities/payment/lib/SettingsOptionsTypes';
import { useGetPaymentInfo } from 'entities/payment/lib/swr/useGetPaymentInfo';
import { TABLE_DATE_FORMAT } from 'entities/report/consts/consts';
import React, { useState } from 'react';
import classes from './widgetSettingsPayment.module.scss';
import WidgetSettingsPaymentItem from './WidgetSettingsPaymentItem';
import { paymentPlan } from 'widgets/widget-settings/lib/consts';

const WidgetSettingsPayment = (): JSX.Element => {

	const { data: paymentInfo } = useGetPaymentInfo();
	const [selectedPlan, setSelectedPlan] = useState<PaymentPlan>(paymentPlan[0]);

	const handleChangePlan = (id: number): void => {
		const newPlan = paymentPlan.find(plan => plan.id === id);
		if (newPlan) {
			setSelectedPlan(newPlan);
		}
	};

	const isWidgetActive = dayjs().diff(paymentInfo?.finishPaymentDate) < 0;

	return (

		<div className={classes['reon-plan-sales-payment-display-container']}>
			{paymentInfo &&
                <div className={classes.widget_settings_block__item}>
				<span
                    className={cn(classes.reon_widget_ai_modal_text, {
						[classes.paid]: !isWidgetActive,
					})}
                >
					{isWidgetActive
						? `Подписка оплачена, дата окончания подписки - ${dayjs(
							paymentInfo.finishPaymentDate,
						).format(TABLE_DATE_FORMAT)}.`
						: `Подписка не оплачена, виджет не работает. Пробная версия виджета заканчивется ${dayjs(
							paymentInfo.finishTrialDate,
						).format(TABLE_DATE_FORMAT)}.`}
				</span>
                </div>
			}
			<div className={classes.reon_widget_settings_body_item}>
				<div className={classes.reon_widget_settings_forwardToContact}>
					<span>
						Для получения счёта на оплату{' '}
						<a href="https://reon.pro/plan_prodazh" target="_blank">
							свяжитесь
						</a>{' '}
						с нами любым удобным для вас способом.
					</span>
				</div>
				<div className={classes.reon_widget_settings_price}>
					<div className={classes.reon_widget_settings_price_body}>
						{paymentPlan.map((plan) => (
							<WidgetSettingsPaymentItem
								key={plan.id}
								plan={plan}
								isActive={plan.id === selectedPlan.id}
								setActive={handleChangePlan}
							/>
						))}
					</div>
					<a
						href="https://reon.pro/marketplace#oplata_vidgeta"
						target="_blank"
						className="button-input button-input_blue reon_widget_settings-price-btn"
						id="reon-btn-payment"
					>
						<span className="button-input-inner ">
							<span className="button-input-inner__text">Оплатить онлайн</span>
						</span>
					</a>
				</div>
			</div>
		</div>
	);
};

export default WidgetSettingsPayment;
