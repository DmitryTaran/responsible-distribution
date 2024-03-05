import { normalizeString } from 'shared/utils/helpers';
import { DateRangeType } from 'shared/components/custom-date-picker/lib/types';
import dayjs from 'dayjs';
import { DEFAULT_DATE_FORMAT } from 'entities/report/consts/consts';

export const filterStringValue = <T>(data: T[], matchValue: string, field: keyof T): T[] => {
	const normalizedMatchValue = normalizeString(matchValue);
	return data.filter(dataItem => {
		const normalizedStringValue = normalizeString(String(dataItem[field]));
		try {
			return normalizedStringValue.match(normalizedMatchValue);
		} catch {
			return normalizedStringValue.includes(normalizedMatchValue);
		}
	});
};

export const filterStringGroupedValue = <T>(data: T[], matchValue: string, field: keyof T, groupedByField: keyof T): T[] => {
	const normalizedMatchValue = normalizeString(String(matchValue));
	return data.filter(dataItem => {
		const normalizedValue = normalizeString(String(dataItem[field]));
		const normalizedGroupName = normalizeString(String(dataItem[groupedByField]));
		try {
			return normalizedValue.match(normalizedMatchValue)
				|| normalizedGroupName.match(normalizedMatchValue);
		} catch {
			return normalizedValue.includes(normalizedMatchValue)
				|| normalizedGroupName.includes(normalizedMatchValue);
		}
	})
}

export const filterDateRangeValue = <T>(data: T[], matchValue: DateRangeType, field: keyof T): T[] => {
	const [dateFrom, dateTo] = matchValue;
	const decrementedDateFrom = dayjs(dateFrom).subtract(1, 'day');
	const incrementedDateTo = dayjs(dateTo).add(1, 'day');
	return data.filter(dataItem =>
		dayjs(dataItem[field] as string, DEFAULT_DATE_FORMAT).isBetween(decrementedDateFrom, incrementedDateTo),
	);
}

export const filterSelectValue = <T>(data: T[], matchValue: string, field: keyof T): T[] => {
	return data.filter(dataItem => dataItem[field] === matchValue)
}