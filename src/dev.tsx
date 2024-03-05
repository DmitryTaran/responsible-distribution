import React from 'react';
import './index.css';
import webSocketApi from './entities/lead-request/api/LeadRequestService';
import { createReactRoot } from 'shared/utils/helpers';
import { ReactRootIds } from 'shared/types/Widget.types';
import { App } from 'app';
import LeadRequestLayout from 'widgets/lead-request-layout/LeadRequestLayout';


webSocketApi.createWsConnection();
const body = document.querySelector('body');
const reqRoot = document.createElement('div');
reqRoot.setAttribute('id', 'test_root');
body?.append(reqRoot);
createReactRoot('#test_root', <LeadRequestLayout/>, ReactRootIds.REQUEST);
createReactRoot('#work_area',
		<App/>,
	ReactRootIds.DEV,
);
