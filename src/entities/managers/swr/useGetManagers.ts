import { AxiosError } from 'axios';
import useSWRImmutable from 'swr/immutable';
import { ManagersService } from '../api/ManagersService';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { ManagerDTO } from '../types/ManagerDTO';

type useManagersReturnType = {
	managers: ManagerDTO[];
	error: AxiosError;
	isLoading: boolean;
	isValidating: boolean;
};

export const useGetManagers = (): useManagersReturnType => {
	const { data, error, isValidating, isLoading } = useSWRImmutable(
		SwrKeys.Managers,
		ManagersService.getManagers,
	);

	return {
		managers: data || [],
		error,
		isLoading,
		isValidating,
	};
};
