import { PaymentService } from 'entities/payment/lib/api/PaymentService';
import { PaymentStatusDTO } from 'entities/payment/lib/SettingsOptionsTypes';
import { SwrKeys } from 'shared/consts/SwrKeys';
import useSWRImmutable, { SWRResponse } from 'swr';

export const useGetPaymentInfo = (): SWRResponse<PaymentStatusDTO> => {
	const swrResponse = useSWRImmutable(SwrKeys.Payment, PaymentService.getPaymentInfo)
	return swrResponse
}