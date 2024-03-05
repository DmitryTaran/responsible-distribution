import { CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
import { DpQuerySelectors } from 'entities/triggers/consts/DpQuerySelectors';
import { ObserverStore } from 'entities/triggers/store/DpObserverStore';
import { DIGITAL_PIPELINE_CONTAINER_ID } from 'shared/consts/const';
import { ReactRootIds } from 'shared/types/Widget.types';
import { createReactRoot } from 'shared/utils/helpers';
import DPSettings from '../DPSettings';

export const createDPRoot = (): void => {
	const settingsBlock = document.getElementById(DpQuerySelectors.DpSettingsBlock);
	const inputContainers = settingsBlock?.querySelectorAll(DpQuerySelectors.DpInputContainer);
	inputContainers?.forEach(container => container.setAttribute('style', 'display: none;'));
	settingsBlock?.insertAdjacentHTML(
		'afterbegin',
		`<div id="${DIGITAL_PIPELINE_CONTAINER_ID}" class="reon-responsible-distribution-widget-container"></div>`,
	);
	createReactRoot(`#${DIGITAL_PIPELINE_CONTAINER_ID}`,
		<Suspense fallback={<CircularProgress size={25}/>}>
			<DPSettings/>
		</Suspense>,
		ReactRootIds.DIGITAL_PIPELINE,
	);
	const dpSettings = document.querySelector(DpQuerySelectors.DpTable);
	dpSettings && ObserverStore.dpSettingsCloseObserver?.observe(dpSettings, { childList: true, subtree: true });
};