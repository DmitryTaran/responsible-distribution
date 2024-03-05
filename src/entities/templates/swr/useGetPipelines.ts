import { AmoService } from 'shared/api/AmoService';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { Pipeline } from 'shared/types/AMO.types';
import useSWRImmutable, { SWRResponse } from 'swr';

export const useGetPipelines = (): SWRResponse<Pipeline> => {
	return useSWRImmutable(SwrKeys.Pipelines, AmoService.getPipelines);
};