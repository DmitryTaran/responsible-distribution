import React, { useState } from 'react';
import cl from './WidgetSettingsPayment.module.scss';
import classNames from 'classnames';
import { MANAGERS_ARRAY } from 'shared/consts/AMO.consts';

const paymentPlan = [
    {
        id: 1,
        title: '6 месяцев',
        period: {
            name: '6 месяцев',
            value: 6
        },
        price: {
            name: '490 ₽ за пользователя / месяц',
            value: 490
        }
    },
    {
        id: 2,
        title: '10 месяцев + 3 в подарок',
        period: {
            name: '10 месяцев + 3 в подарок',
            value: 10,
        },
        price: {
            name: '377 ₽ за пользователя / месяц',
            value: 490,
        }
    }
];

const WidgetSettingsPayment = (): JSX.Element => {
    const [selectedPlan, setSelectedPlan] = useState(paymentPlan[0]);
    const handleChangePlan = (id: number): void => {
        const newPlan = paymentPlan.find(plan => plan.id === id);
        if (newPlan) {
            setSelectedPlan(newPlan)
        }
    }

    return (
        <div className={cl['reon-plan-sales-payment-display-container']}>
            <div className={cl.reon_widget_settings_body_item}>
                <div className={cl.reon_widget_settings_forwardToContact}>
                    <span>
                    Все виджеты REON входят в единую подписку на <a href="https://reon.pro/marketplace" target="_blank">Маркетплейс REON</a>. Вы можете БЕСПЛАТНО получить все виджеты при оплате лицензии amoCRM через компанию REON или по единой цене - 490 ₽/месяц за 1 пользователя за пакет из 15+ виджетов!
                    </span>
                </div>
                <div className={cl.reon_widget_settings_price}>
                    <div className={cl.reon_widget_settings_price_body}>
                        {
                            paymentPlan.map(plan =>
                                <div
                                    className={classNames(cl.reon_widget_settings_price_item, { [cl._active]: plan.id === selectedPlan.id })}
                                    key={plan.id}
                                    onClick={() => handleChangePlan(plan.id)}
                                >
                                    <div className={cl.reon_widget_settings_price_item_body}>
                                        <span className={cl.reon_widget_settings_price_period}>{plan.title}</span>
                                        <span className={cl.reon_widget_settings_price_value}>{plan.price.name}</span>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                    <span className={cl['reon-plan-sales-payment-amount']}>
                        Итоговая сумма подписки за {MANAGERS_ARRAY.length} польз. =  <span className={cl['reon-plan-sales-payment-amount__inner']}>{ selectedPlan.price.value * MANAGERS_ARRAY.length * selectedPlan.period.value } ₽</span>
                    </span>
                    <a
                        href="https://reon.pro/marketplace#oplata_vidgeta"
                        target="_blank"
                        className="button-input button-input_blue reon_widget_settings-price-btn"
                        id="reon-btn-payment"
                    >
                        <span className="button-input-inner "><span className="button-input-inner__text">Оплатить онлайн</span></span>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default WidgetSettingsPayment;