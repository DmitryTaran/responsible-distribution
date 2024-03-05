export type LeadRequestDto = {
	acceptanceTime: number;
	soundEffect: string;
	webhookId: string;
	userId: number
	queueId: string;
	contact: {
		id: number
		name: string
	} | null
	lead: {
		id: number;
		name: string;
		createdAt: number
	};
	pipeline: {
		id: number;
		name: string;
		status: {
			id: number;
			name: string;
		};
	};
}