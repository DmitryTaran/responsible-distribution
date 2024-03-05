import { Socket } from 'socket.io-client';
import { LeadRequestDto } from './LeadRequestDto';

export enum SocketEvents {
	LeadRequest = 'lead-request',
	RequestAccepted = 'request-accepted',
	RequestDeclined = 'request-declined',
	CloseAllModals = 'close-user-modal',
	Ping = 'ping'
}

export type LeadRequestSocketListeners = {
	[SocketEvents.LeadRequest](requestDto: LeadRequestDto): void
	[SocketEvents.Ping](ping: string): void
	[SocketEvents.CloseAllModals](webhookId: string): void;
}

type LeadRequestSocketEmits = {
	[SocketEvents.RequestAccepted](requestDto: Pick<LeadRequestDto, 'queueId' | 'webhookId'>): void
	[SocketEvents.RequestDeclined](requestDto: LeadRequestDto): void
}

export type LeadRequestWebSocketApi = {
	ws: Socket<LeadRequestSocketListeners, LeadRequestSocketEmits> | null;
	createWsConnection(): void;
};