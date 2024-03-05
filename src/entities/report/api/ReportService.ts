import { ConversionReportDTO } from 'entities/report/types/ConversionReportDTO';
import { GroupReportDTO } from 'entities/report/types/GroupReportDTO';
import { UsersChartDTO } from 'entities/report/types/UserChartDTO';
import { UsersReportDTO } from 'entities/report/types/UserReportDTO';
import { GetUsersChartParams, GetUsersReportParams } from 'entities/report/types/GetUsersReportParams';
import { $api } from 'shared/api';
import { ServerRoutes } from 'shared/api/routes';
import { account } from 'shared/consts/AMO.consts';
import { AllLeadsDataDTO } from 'entities/report/types/AllLeadsDataDTO';

export const ReportService = {
	getGroupReport: async (dateFrom: string, dateTo: string): Promise<GroupReportDTO> => {
		const { data } = await $api.get<GroupReportDTO>(
			ServerRoutes.GroupReportRoute,
			{
				params: {
					accountId: account.id,
					dateFrom,
					dateTo,
				},
			},
		);
		return data;
	},

	getUsersReport: async ({
		dateTo,
		dateFrom,
		page,
		limit,
		sort,
		sortField,
		filters
	}: GetUsersReportParams): Promise<UsersReportDTO[]> => {
		const { data } = await $api.get<UsersReportDTO[]>(ServerRoutes.UserReportRoute, {
			params: {
				accountId: account.id,
				dateFrom,
				dateTo,
				page,
				limit,
				sortField,
				sort,
				filters
			},
		});
		return data;
	},

	getUsersChartData: async ({ dateTo, dateFrom, filters }: GetUsersChartParams): Promise<UsersChartDTO> => {
		const { data } = await $api.get<UsersChartDTO>(ServerRoutes.UserChartRoute, {
			params: {
				accountId: account.id,
				dateFrom,
				dateTo,
				filters
			},
		});
		return data;
	},

	getConversionReport: async (dateFrom: string, dateTo: string, template?: string): Promise<ConversionReportDTO> => {
		const { data } = await $api.get<ConversionReportDTO>(ServerRoutes.ConversionReportRoute, {
			params: {
				accountId: account.id,
				dateFrom,
				dateTo,
				template
			}
		});
		return data;
	},
	getAllDealsCount: async (): Promise<AllLeadsDataDTO> => {
		const { data } = await $api.get<AllLeadsDataDTO>(ServerRoutes.AllDealsCount, {
			params: {
				accountId: account.id,
			}
		});
		return data;
	}

};