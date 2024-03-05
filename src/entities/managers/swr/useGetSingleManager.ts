import { AxiosError } from 'axios';
import useSWR, { KeyedMutator } from 'swr';
import { ManagersService } from '../api/ManagersService';
import { SwrKeys } from 'shared/consts/SwrKeys';
import { ManagerDTO } from '../types/ManagerDTO';

type useManagerReturnType = {
    manager?: ManagerDTO
    managerError: AxiosError;
    managerIsLoading: boolean;
    managerMutate: KeyedMutator<ManagerDTO>;
};

export const useGetSingleManager = (): useManagerReturnType => {
    const {
        data: manager,
        error: managerError,
        isLoading: managerIsLoading,
        mutate: managerMutate,
    } = useSWR(SwrKeys.SingleManager, ManagersService.getSingleStatus, {});

    return {
        manager,
        managerError,
        managerIsLoading,
        managerMutate,
    };
};
