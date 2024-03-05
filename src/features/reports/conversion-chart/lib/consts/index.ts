import { ConversionReportRenderingItem } from 'entities/report/types/ConversionReportDTO';

export enum ConversionChartsNames {
	CONVERSION = 'Распределение по конверсии',
	COUNT = 'Распределение по количеству'
}

export enum ConversionSelectKeys {
	Conversion = 'conversion',
	Count = 'count'
}

export const ConversionSelectItems = {
	[ConversionSelectKeys.Conversion]: 'Распределние по конверсии',
	[ConversionSelectKeys.Count]: 'Распределние по количеству'
};

export const conversionChartSelectItems = Object.values(ConversionChartsNames);

export const conversionSortableFields: (keyof ConversionReportRenderingItem)[] = [ 'name', 'conversion' ];

export const countSortableFields: (keyof ConversionReportRenderingItem)[] = [ 'name', 'leads' ];