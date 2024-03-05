import { ReportService } from 'entities/report/api/ReportService';
import { DEFAULT_DATE_FORMAT } from 'entities/report/consts/consts';
import { ConversionReportDTO, ConversionReportParams } from 'entities/report/types/ConversionReportDTO';
import { SwrKeys } from 'shared/consts/SwrKeys';
import useSWRImmutable, { SWRResponse } from 'swr';
import $dayjs from 'shared/config/dayjsConfig';

export const useGetConversionReport = (params: ConversionReportParams): SWRResponse<ConversionReportDTO> => {

	const { dateFrom, dateTo, template } = params;

	const shouldFetch = Boolean(dateFrom) && Boolean(dateTo) && Boolean(template);
	const formattedDateFrom = $dayjs(dateFrom).utc().format(DEFAULT_DATE_FORMAT);
	const formattedDateTo = $dayjs(dateTo).utc().format(DEFAULT_DATE_FORMAT);
	const swrResponse = useSWRImmutable(
		shouldFetch
		? [SwrKeys.ConversionReport, template, formattedDateFrom, formattedDateTo]
		: null,
		([_, template, dateFrom, dateTo]) => ReportService.getConversionReport( dateFrom, dateTo, template),
	);
	return swrResponse;
};