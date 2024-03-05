import React, { useRef, useState } from 'react';
import LabeledCheckbox from 'shared/components/amo-checkbox/LabeledCheckbox';
import AmoInput from 'widgets/widget-settings/components/amo-input/AmoInput';
import classes from './widgetSettingsUser.module.scss';

const WidgetSettingsUser = (): JSX.Element => {
	const { current: systemNameInput } = useRef(document.querySelector<HTMLInputElement>('input[name=client_name]'));
	const { current: systemPhoneInput } = useRef(document.querySelector<HTMLInputElement>('input[name=phone_number]'));
	const { current: systemTermsOfUseInput } = useRef(document.querySelector<HTMLInputElement>('input[name=terms_of_use]'));
	const [name, setName] = useState<string>(systemNameInput?.value || '');
	const [phone, setPhone] = useState<string>(systemPhoneInput?.value || '');
	const [termsOfUse, setTermsOfUse] = useState<boolean>(Boolean(systemTermsOfUseInput?.value === 'true'));
	const isSaveButtonActive = Boolean(name && phone && termsOfUse);

	const changeInputValue = <T, >(newValue: T, stateCallback: React.Dispatch<T>, systemDomElement: HTMLInputElement | null): void => {
		if (systemDomElement) {
			systemDomElement.value = String(newValue);
			stateCallback(newValue);
		}
	};

	const validationInputCheck = (systemDomElement: HTMLInputElement | null): boolean => {
		return !Boolean(systemDomElement?.value?.trim());
	};

	return (
		<div className={classes['content']}>
			<AmoInput
				value={name}
				label="Ваше имя"
				onChangeHandler={(event) => changeInputValue(event.target.value, setName, systemNameInput)}
				isValidate={validationInputCheck(systemNameInput)}
			/>
			<AmoInput
				value={phone}
				label="Телефон"
				onChangeHandler={(event) => changeInputValue(event.target.value, setPhone, systemPhoneInput)}
				isValidate={validationInputCheck(systemPhoneInput)}
			/>
			<LabeledCheckbox
				checked={termsOfUse}
				onChange={() => changeInputValue(!termsOfUse, setTermsOfUse, systemTermsOfUseInput)}
				label={
					<>
						Я прочитал(-а) {' '}
						<a onClick={(e) => e.stopPropagation()} target="_blank"
						   href="https://drive.google.com/file/d/13HBl0vCbeyxANlA3VszC57_xZP-IJbpw/view">
							Условия
						</a> соглашения
						и согласен(-на) с условиями
					</>
				}
			/>
		</div>
	);
};

export default WidgetSettingsUser;
