import { ReportService } from 'entities/report/api/ReportService';
import { GroupReportDTO } from 'entities/report/types/GroupReportDTO';
import { SwrKeys } from 'shared/consts/SwrKeys';
import useSWRImmutable, { SWRResponse } from 'swr';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from 'entities/report/consts/consts';
import { PickerDate } from 'shared/components/custom-date-picker/lib/types';
import $dayjs from 'shared/config/dayjsConfig';

export const useGetGroupReport = (dateFrom: PickerDate, dateTo: PickerDate): SWRResponse<GroupReportDTO> => {

	const shouldFetch = Boolean(dateFrom) && Boolean(dateTo);
	const formattedDateFrom = $dayjs(dateFrom).utc().format(DEFAULT_DATE_FORMAT);
	const formattedDateTo = $dayjs(dateTo).utc().format(DEFAULT_DATE_FORMAT);

	const swrResponse = useSWRImmutable(
		shouldFetch
			? [ SwrKeys.GroupReport, formattedDateFrom, formattedDateTo ]
			: null,
		([ _, dateFrom, dateTo ]) =>
			ReportService.getGroupReport(dateFrom, dateTo));
	return swrResponse;
};