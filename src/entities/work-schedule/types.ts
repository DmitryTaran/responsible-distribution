export type DayWorkSchedule = {
	dayBeginTime: string
	dayEndTime: string
}

export type WorkSchedule = {
	id?: string
	user: number
	Mon: DayWorkSchedule | null
	Tue: DayWorkSchedule | null
	Wed: DayWorkSchedule | null
	Thu: DayWorkSchedule | null
	Fri: DayWorkSchedule | null
	Sat: DayWorkSchedule | null
	Sun: DayWorkSchedule | null
}

export type WorkScheduleDTO = {
	id?: string[]
	userIds: number[]
	schedule: {
		Mon: DayWorkSchedule | null
		Tue: DayWorkSchedule | null
		Wed: DayWorkSchedule | null
		Thu: DayWorkSchedule | null
		Fri: DayWorkSchedule | null
		Sat: DayWorkSchedule | null
		Sun: DayWorkSchedule | null
	}
}

export type UpdateWorkScheduleDTO = { ids: number[] } & Omit<WorkScheduleDTO, 'userIds'>