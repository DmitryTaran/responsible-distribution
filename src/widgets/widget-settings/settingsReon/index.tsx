import React, { useRef, useState } from 'react';
import WidgetSettingsLayout from './components/widget-settings-layout/WidgetSettingsLayout';
import WidgetSettingsToggler from './components/widget-settings-toggler/WidgetSettingsToggler';
import classes from './WidgetMainSettings.module.scss';
import classNames from 'classnames';
import { SettingsConfig } from './lib/config';
import { OptionT } from './lib/types';
import { createPortal } from 'react-dom';
import WidgetSettingsFooter from 'widgets/widget-settings/components/widget-settings-footer/WidgetSettingsFooter';

const SettingsModalWindow = (): JSX.Element => {

	const {current: footerContainer } = useRef(document.querySelector('#reon-widget-settings__footer')!)

    const [selectedOption, setSelectedOption] = useState<OptionT>(SettingsConfig[0]);

    const selectedOptionHandler = (option: OptionT): void => {
        setSelectedOption(option)
    }

    return (
        <div className={classNames(classes['container'])}>
            <div className={classNames(classes['container__text-block'])}>
                <div className={classNames(classes['container__text'])}>
                    Во время установки виджета крайне важно <span style={{ fontWeight: 700 }}>корректно заполнить</span> обязательные поля “Имя” и “Телефон”. После заполнения данных необходимо обязательно нажать на кнопку “Сохранить”. По указанному номеру телефона через WhatsApp производится подтверждение ID вашего аккаунта amoCRM и активация виджета.
                </div>
                <div className={classNames(classes['container__text'])}>
                    В случае неверного заполнения номера телефона, мы не сможем подтвердить ID вашего аккаунта amoCRM - виджет не будет активирован и будет доступен только 14 дней.
                </div>
            </div>
            <WidgetSettingsToggler
                selectedOption={selectedOption}
                selectedOptionHandler={selectedOptionHandler}
            />
            <WidgetSettingsLayout selectedOptionId={selectedOption.id} />
	        {createPortal(<WidgetSettingsFooter/>, footerContainer, 'footer')}
        </div>
    )
};

export default SettingsModalWindow;
