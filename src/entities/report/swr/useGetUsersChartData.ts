import { ReportService } from 'entities/report/api/ReportService';
import { shouldFetch } from 'entities/report/helpers/shouldFetch';
import { GetUsersChartParams } from 'entities/report/types/GetUsersReportParams';
import { UsersChartDTO } from 'entities/report/types/UserChartDTO';
import { SwrKeys } from 'shared/consts/SwrKeys';
import useSWRImmutable from 'swr';
import useSWR, { SWRResponse } from 'swr';
import $dayjs from 'shared/config/dayjsConfig';
import { DEFAULT_DATE_FORMAT } from 'entities/report/consts/consts';

export const useGetUsersChartData = ({ dateFrom, dateTo, ...params }: GetUsersChartParams): SWRResponse<UsersChartDTO> => {

	const formattedDateFrom = dateFrom
		? $dayjs(dateFrom).utc().format(DEFAULT_DATE_FORMAT)
		: $dayjs().utc().subtract(1, 'month').format(DEFAULT_DATE_FORMAT);

	const formattedDateTo = dateTo
		? $dayjs(dateTo).utc().format(DEFAULT_DATE_FORMAT)
		: $dayjs().utc().format(DEFAULT_DATE_FORMAT);

	const reqParams = {dateFrom: formattedDateFrom, dateTo: formattedDateTo, ...params}

	const swrResponse = useSWRImmutable(shouldFetch(reqParams.filters)
	                                    ? [SwrKeys.UsersChart, reqParams]
	                                    : null,
		([_, params]) => ReportService.getUsersChartData(reqParams));
	return swrResponse;
};