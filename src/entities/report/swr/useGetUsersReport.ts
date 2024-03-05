import { ReportService } from 'entities/report/api/ReportService';
import { shouldFetch } from 'entities/report/helpers/shouldFetch';
import { GetUsersReportParams } from 'entities/report/types/GetUsersReportParams';
import { UsersReportDTO } from 'entities/report/types/UserReportDTO';
import { SwrKeys } from 'shared/consts/SwrKeys';
import useSWRImmutable, { SWRResponse } from 'swr';
import $dayjs from 'shared/config/dayjsConfig';
import { DEFAULT_DATE_FORMAT } from 'entities/report/consts/consts';

export const useGetUsersReport = ({
	dateFrom,
	dateTo,
	...params
}: GetUsersReportParams): SWRResponse<UsersReportDTO[]> => {

	const formattedDateFrom = dateFrom
		? $dayjs(dateFrom).utc().format(DEFAULT_DATE_FORMAT)
		: $dayjs().utc().subtract(1, 'month').format(DEFAULT_DATE_FORMAT);

	const formattedDateTo = dateTo
		? $dayjs(dateTo).utc().format(DEFAULT_DATE_FORMAT)
		: $dayjs().utc().format(DEFAULT_DATE_FORMAT);

	const reqParams = {dateFrom: formattedDateFrom, dateTo: formattedDateTo, ...params}

	const swrResponse = useSWRImmutable(
		shouldFetch(reqParams.filters)
			? [ SwrKeys.UsersReport, reqParams ]
			: null,
		([ _, params ]) => ReportService.getUsersReport(reqParams),
	);
	return swrResponse;
};