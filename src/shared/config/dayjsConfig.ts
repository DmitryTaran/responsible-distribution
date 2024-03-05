import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(timezone);

const $dayjs = dayjs;

export default $dayjs;
