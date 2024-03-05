import dayjs from 'dayjs';

export const numericSort = (a: number, b: number): number => a - b

export const stringSort = (a: string, b: string): number => {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	return 0;
}

export const dateSort = (a: string, b: string): number => {
	const dateDiff = dayjs(a).diff(b)
	return dateDiff
}

