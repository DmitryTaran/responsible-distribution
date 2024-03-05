import { UserReportFilters } from '../types/UserReportFilters';

export const shouldFetch = (filters?: UserReportFilters): boolean => {
	return Object.entries<UserReportFilters>(filters || {}).every(([_, matchArray]) => Boolean(matchArray?.length));
};