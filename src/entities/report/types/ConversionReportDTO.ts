import { PickerDate } from 'shared/components/custom-date-picker/lib/types';

export type ConversionReportItem = {
	id: number
	leads: number
	successLeads: number
	conversion: number
}

export type ConversionReportDTO = {
	totalLeads: number,
	users: ConversionReportItem[]
}

export type ConversionReportParams = {
	dateFrom: PickerDate
	dateTo: PickerDate
	template?: string
}

export type ConversionReportRenderingItem = {
	name: string
	template: string
} & ConversionReportItem