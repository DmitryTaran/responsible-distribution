import { webSocketApi } from 'entities/lead-request';
import { requestStore } from 'entities/lead-request';
import { LeadRequestDto } from 'entities/lead-request';
import { SocketEvents } from 'entities/lead-request/types/leadRequestSocketApi';
import { ServerRoutes } from 'shared/api/routes';

export const accept = (requestDto: LeadRequestDto): void => {
	requestStore.deleteRequest(requestDto.webhookId);
	webSocketApi.ws?.emit(SocketEvents.RequestAccepted, requestDto);
};
export const acceptFollow = (requestDto: LeadRequestDto): void => {
	requestStore.deleteRequest(requestDto.webhookId);
	webSocketApi.ws?.emit(SocketEvents.RequestAccepted, requestDto);
	const win = window.open(
		ServerRoutes.AccountUrl + `/leads/detail/${requestDto.lead.id}skip_filter=Y`,
		'_blank');
	win && win.focus();
};

export const decline = (requestDto: LeadRequestDto): void => {
	requestStore.deleteRequest(requestDto.webhookId);
	webSocketApi.ws?.emit(SocketEvents.RequestDeclined, requestDto);
};