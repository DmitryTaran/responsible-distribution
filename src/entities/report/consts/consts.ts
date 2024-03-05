import $dayjs from 'shared/config/dayjsConfig';

export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';
export const TABLE_DATE_FORMAT = 'DD.MM.YYYY';
export const defaultDateStart = $dayjs().utc().subtract(1, 'month').toDate();
export const defaultDateEnd = $dayjs().utc().toDate();