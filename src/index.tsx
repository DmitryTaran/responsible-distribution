import { App } from 'app';
import {
	cleanStores,
	initDpPage,
	observeDpConfirmModalOpen,
	observeDpSettingClose,
	ObserverStore
} from 'entities/triggers';
import React from 'react';
import { AmoService } from 'shared/api/AmoService';
import { ServerRoutes } from 'shared/api/routes';
import { getWidgetArea } from 'shared/consts/AMO.consts';
import { AMO_DP_AREA, REDISTRIBUTION_CONTAINER_ID, WORK_AREA_ELEMENT_ID, WORK_AREA_NAME } from 'shared/consts/const';
import { ReactRootIds, WidgetSchema } from 'shared/types/Widget.types';
import { createReactRoot, removeWidgetPageHeader } from 'shared/utils/helpers';
import { createDPRoot } from 'widgets/digital-pipeline/helpers/createDPRoot';
import LeadRequestLayout from 'widgets/lead-request-layout/LeadRequestLayout';
import webSocketApi from './entities/lead-request/api/LeadRequestService';
import './index.css';
import { ReactRootStore } from 'shared/store/AppStore';
import SettingsModalWindow from 'widgets/widget-settings/settingsReon';

const Widget: WidgetSchema = {
	render(): boolean {
		cleanStores(); //Очистка слушателей и отписка от наблюдения за DOM
		ReactRootStore.app?.unmount();
		ReactRootStore.settings?.unmount();
		const area: string = getWidgetArea();
		if (area === AMO_DP_AREA) {
			initDpPage(); //Добавление слушателей на кнопки "Сохранить" и "Отменить"
		}
		return true;
	},

	init(): boolean {
		ObserverStore.dpSettingsCloseObserver = new MutationObserver(observeDpSettingClose);
		ObserverStore.dpSettingsConfirmModalOpenObserver = new MutationObserver(observeDpConfirmModalOpen);
		webSocketApi.createWsConnection();
		document.body.insertAdjacentHTML('afterbegin', `<div id="${REDISTRIBUTION_CONTAINER_ID}"></div>`);
		AmoService.subscribe(ServerRoutes.BaseUrl + ServerRoutes.WebhookRoute);
		createReactRoot(
			`#${REDISTRIBUTION_CONTAINER_ID}`,
			<LeadRequestLayout/>,
			ReactRootIds.REQUEST,
		);
		return true;
	},

	bind_actions(): boolean {
		return true;
	},

	settings(): boolean {
		const modalBlock = document.querySelector('.widget-settings__wrap-desc-space')!;

		modalBlock.insertAdjacentHTML('beforeend',
			`<div id="reon-widget-settings__footer">
		        </div>`);

		const rootBlock = document.getElementById(
			'widget_settings__fields_wrapper',
		)!;

		const amoInputs: NodeListOf<HTMLDivElement> =
			rootBlock.querySelectorAll('.widget_settings_block__item_field');

		amoInputs.forEach((input) => {
			input.style.display = 'none';
		});

		rootBlock.insertAdjacentHTML(
			'afterbegin',
			`<div id="reon-widget-settings">
		    </div>`,
		);

		createReactRoot(
			'#reon-widget-settings',
			<SettingsModalWindow/>,
			ReactRootIds.SETTINGS,
		);
		return true;
	},

	advancedSettings(): boolean {
		return true;
	},

	dpSettings() {
		createDPRoot();
		return true;
	},

	onSave(): boolean {
		return true;
	},

	initMenuPage(): boolean {
		if (getWidgetArea().match(WORK_AREA_NAME)) {
			removeWidgetPageHeader();
			createReactRoot(
				WORK_AREA_ELEMENT_ID,
				<App/>,
				ReactRootIds.APP,
			);
		}
		return true;
	},

	destroy(): void {
		cleanStores();
		AmoService.unsubscribe(ServerRoutes.BaseUrl + ServerRoutes.WebhookRoute);
	},

};

export default Widget;
