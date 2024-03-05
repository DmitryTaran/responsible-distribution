export enum SettingsOptions {
	user = 'Настройки',
	payment =  'Подписка',
}

type PaymentPlanProp = {
	name: string,
	value: number
}

export type PaymentPlan = {
	id: number
	title: string
	period: PaymentPlanProp
	price: PaymentPlanProp
}

export type PaymentStatusDTO = {
	finishPaymentDate: string
	finishTrialDate: string
}