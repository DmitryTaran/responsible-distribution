export type UsersChartDTO = {
	users: User[]
	totalLeads: number
}

export type User = {
	id: string
	leads: number
}
