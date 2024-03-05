import { UserReportFilters } from 'entities/report/types/UserReportFilters';
import { PickerDate } from 'shared/components/custom-date-picker/lib/types';
export type GetUsersReportParams = {
	dateFrom: string | null,
	dateTo: string | null,
	page: number,
	limit: number,
	sortField: UserReportSortField,
	sort: 1 | -1,
	filters?: UserReportFilters
}

export type GetUsersChartParams = {
	dateFrom: string | null,
	dateTo: string | null,
	filters?: UserReportFilters
}

type UserReportSortField = 'templateName' | 'userName' | 'createdAt' | 'groupName' | 'leadName';
