import useSWRImmutable, { SWRResponse } from 'swr';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { ReportService } from 'entities/report/api/ReportService';
import { AllLeadsDataDTO } from 'entities/report/types/AllLeadsDataDTO';

export const useGetAllLeadsCount = (): SWRResponse<AllLeadsDataDTO> => {

	const swrResponse = useSWRImmutable(
		SwrKeys.AllDealsCount,
		ReportService.getAllDealsCount,

	);

	return swrResponse;
};