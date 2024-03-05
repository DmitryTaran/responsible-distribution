import { PaymentStatusDTO } from 'entities/payment/lib/SettingsOptionsTypes';
import { $api } from 'shared/api';
import { ServerRoutes } from 'shared/api/routes';
import { account } from 'shared/consts/AMO.consts';

export const PaymentService = {
	getPaymentInfo: async (): Promise<PaymentStatusDTO> => {
		const { data } = await $api.get<PaymentStatusDTO>(
			ServerRoutes.PaymentRoute,
			{
				params: {
					accountId: account.id,
				},
			},
		);
		return data;
	},
};