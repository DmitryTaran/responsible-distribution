import { PaymentPlan } from 'entities/payment/lib/SettingsOptionsTypes';

export const paymentPlan: PaymentPlan[] = [
	{
		id: 1,
		title: '6 месяцев',
		period: {
			name: '6 месяцев',
			value: 6,
		},
		price: {
			name: '190 ₽ за пользователя / месяц',
			value: 190,
		},
	},
	{
		id: 2,
		title: '10 месяцев + 3 в подарок',
		period: {
			name: '10 месяцев + 3 в подарок',
			value: 10,
		},
		price: {
			name: '146 ₽ за пользователя / месяц',
			value: 190,
		},
	},
];