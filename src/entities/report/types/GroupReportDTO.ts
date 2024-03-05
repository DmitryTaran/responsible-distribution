export type GroupReportDTO = {
	groups: Group[]
	totalLeads: number
}

export type Group = {
	id: string
	leads: number
}

export type RenderingGroup = {
	id: string
	value: number
	name: string
	percent: number
}