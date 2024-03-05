import { io } from 'socket.io-client';
import { ServerRoutes } from 'shared/api/routes';
import { account, user } from 'shared/consts/AMO.consts';
import { requestStore } from '../store/RequestStore';
import { LeadRequestWebSocketApi, SocketEvents } from '../types/leadRequestSocketApi';

export const webSocketApi: LeadRequestWebSocketApi = {
	ws: null,
	createWsConnection(): void {
		this.ws = io(ENV_SERVER_URL + ServerRoutes.RedistributionWsRoute, {
			auth: {
				accountId: account.id,
				userId: user.id,
			},
			autoConnect: false,
			path: ServerRoutes.RedistributionWsRoute,
		});
		this.ws.connect();
		this.ws.on(SocketEvents.LeadRequest, (requestDto): void => {
			requestStore.addRequest(requestDto);
		});
		this.ws.on(SocketEvents.Ping, (ping): void => {
			console.log(ping);
		});
		this.ws.on(SocketEvents.CloseAllModals, (webhookId): void => {
			requestStore.deleteRequest(webhookId);
		});

	},

};

export default webSocketApi;
