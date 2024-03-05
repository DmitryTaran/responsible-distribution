import { AxiosError } from 'axios';
import useSWR, { KeyedMutator } from 'swr';
import { ScheduleService } from '../api/ScheduleService';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { WorkSchedule } from '../types';

type useGetOfficeScheduleReturnType = {
	officeScheduleData: WorkSchedule | undefined;
	officeScheduleError: AxiosError;
	isOfficeScheduleValidating: boolean;
	isOfficeScheduleLoading: boolean;
	mutate: KeyedMutator<WorkSchedule>
};

export const useGetOfficeSchedule = (): useGetOfficeScheduleReturnType => {
	const { data, error, isValidating, isLoading, mutate } = useSWR(SwrKeys.OfficeSchedule, ScheduleService.getOfficeSchedule);
	return {
		mutate,
		officeScheduleData: data,
		officeScheduleError: error,
		isOfficeScheduleValidating: isValidating,
		isOfficeScheduleLoading: isLoading,
	};
};