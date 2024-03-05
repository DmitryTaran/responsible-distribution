export type UsersReportDTO = {
	id: string
	createdAt: string
	group: {
		id: number
		name: string
	}
	template: {
		id: string;
		name: string;
	},
	lead: {
		id: number;
		name: string;
	}
	user: {
		id: number;
		name: string;
	}
};

export type UserReportsRenderingData = {
	id: string
	createdAt: string
	group: string
	template: string
	lead: {
		id: number
		name: string
	}
	user: string
}
