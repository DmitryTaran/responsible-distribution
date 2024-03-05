export enum PagesKeys {
	Templates = 'templates',
	WorkSchedule = 'workSchedule',
	Instructions = 'instructions',
	ShiftSchedule = 'shiftSchedule',
	Statuses = 'statuses',
	GroupReport = 'groupReport',
	UsersReport = 'usersReport',
	ConversionReport = 'conversionReport',
}

export type Subtitle = {
	pageKey: PagesKeys
	title: string
}