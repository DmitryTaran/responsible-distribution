import dayjs from 'dayjs';


export function generateTimeSeries(step: number): string[] {
	const dt = new Date(1970, 0, 1);
	const series = [];
	while (dt.getDate() === 1) {
		series.push(dayjs(dt).format('HH:mm'));
		dt.setMinutes(dt.getMinutes() + step);
	}
	return series;
}
