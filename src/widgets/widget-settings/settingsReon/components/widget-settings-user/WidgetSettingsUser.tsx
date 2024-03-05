import React, { useState } from 'react';
import cl from './WidgetSettingsUser.module.scss';
import { WidgetStatusResponse } from '../../lib/types';
import AmoInput from '../amo-input/AmoInput';
import { useGetPaymentInfo } from 'entities/payment/lib/swr/useGetPaymentInfo';
import { PaymentStatusDTO } from 'entities/payment/lib/SettingsOptionsTypes';

const WidgetSettingsUser = (): JSX.Element => {
	const systemNameInput = document.querySelector<HTMLInputElement>('input[name=client_name]');
	const systemPhoneInput = document.querySelector<HTMLInputElement>('input[name=phone_number]');
	const systemTermsOfUseInput = document.querySelector<HTMLInputElement>('input[name=terms_of_use]');

	const { data: paymentInfo } = useGetPaymentInfo();

	const [ name, setName ] = useState<string>(systemNameInput?.value || '');
	const [ phone, setPhone ] = useState<string>(systemPhoneInput?.value || '');
	const [ termsOfUse, setTermsOfUse ] = useState<boolean>(systemTermsOfUseInput?.value ? systemTermsOfUseInput?.value === 'true' : false);

	const widgetStatuses = (widgetStatus: PaymentStatusDTO): string => {

		const {finishPaymentDate, finishTrialDate} = widgetStatus

		switch (widgetStatus.response) {
			case 'trial':
				return `Статус виджета: <span style="color: #C0782D;">Установлен и активирован на тестовый период в 14 дней до ${new Date(widgetStatus.finishUsingDate).toLocaleDateString()}</span>`;
			case 'paid':
				return `Статус виджета: <span style="color: #729E5F;">Установлен и активирован</span>`;
			default:
				return `Статус виджета: <span style="color: #9F5040;">Установлен некорректно, пожалуйста, заполните обязательные поля и нажмите кнопку "Сохранить"</span>`;
		}
	};
	const validationInputCheck = (systemDomElement: HTMLInputElement | null) => {
		if (systemDomElement) {
			return !Boolean(systemDomElement.value.trim());
		}
		return false;
	};

	const changeInputValue = <T extends Object>(newValue: T, stateCallback: React.Dispatch<React.SetStateAction<T>>, systemDomElement: HTMLInputElement | null): void => {
		if (systemDomElement) {
			systemDomElement.value = newValue.toString();
			stateCallback(newValue);
		}
	};

	return (
		<div className={cl['content']}>
			<div className={cl['content__row']}>
				<AmoInput label="Ваше имя:" value={name} isValidate={validationInputCheck(systemNameInput)}
				          onChangeHandler={(event) => changeInputValue<string>(event.target.value, setName, systemNameInput)}/>
				<AmoInput label="Ваш телефон:" value={phone} isValidate={validationInputCheck(systemPhoneInput)}
				          onChangeHandler={(event) => changeInputValue<string>(event.target.value, setPhone, systemPhoneInput)}/>
			</div>
			<div className={cl['content__row']}>
				<label
					className="control-checkbox reon-advanced-interface-widget-checkbox is-checked"
				>
					<div className="control-checkbox__body">
						<input
							type="checkbox"
							className="reon-advanced-interface-widget-checkbox-terms_of_use"
							checked={termsOfUse}
							autoComplete="off"
							onChange={() => changeInputValue<boolean>(!termsOfUse, setTermsOfUse, systemTermsOfUseInput)}
						/>
						<span className="control-checkbox__helper"></span>
					</div>
					<div className="control-checkbox__text element__text " title="Я прочитал(-а) "
					     style={{ display: `block`, fontSize: `14px` }}>
						Я прочитал(-а) и согласен(-на) с условиями <a style={{ color: '#4c8bf7' }} target="_blank"
						                                              href="https://drive.google.com/file/d/13HBl0vCbeyxANlA3VszC57_xZP-IJbpw/view">договора
						оферты №1</a>
					</div>
				</label>
			</div>
			{
				paymentInfo &&
			    <div className={cl['content__row']}>
			        <span dangerouslySetInnerHTML={{__html:widgetStatuses(paymentInfo) }}></span>
			    </div>
			}
		</div>
	);
};

export default WidgetSettingsUser;
