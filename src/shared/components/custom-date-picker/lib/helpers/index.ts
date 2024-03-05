import { Dayjs } from 'dayjs';
import { DateRangeType } from 'shared/components/custom-date-picker/lib/types';
import $dayjs from 'shared/config/dayjsConfig';

export const validateDate = (date: Dayjs): Date | null => date.isValid() ? date.toDate() : null;

export const parseDateRangeString = (date?: string): DateRangeType => {
	const [dateFrom, dateTo] = date ? date.split(' - ') : [''];

	const formattedDateFrom = $dayjs(dateFrom, 'DD.MM.YY');
	const formattedDateTo = $dayjs(dateTo, 'DD.MM.YY');
	const dateDifference = formattedDateTo.diff(formattedDateFrom);
	return dateDifference > 0 || isNaN(dateDifference)
	       ? [
			validateDate(formattedDateFrom),
			validateDate(formattedDateTo),
		]
	       : [
			validateDate(formattedDateTo),
			validateDate(formattedDateFrom),
		];
};