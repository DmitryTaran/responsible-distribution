import { BarChartConfig } from 'shared/components/custom-bar-chart/lib/types';

export const getBarChartConfig = (length: number): BarChartConfig => {
	switch (true) {
		case length <= 5:
			return {
				barCategoryGap: 0,
				maxBarSize: 60,
				barChartHeight: 630,
				paddingBottom: -20
			};
		case length > 5 && length < 10:
			return {
				barCategoryGap: 10,
				maxBarSize: 60,
				barChartHeight: 630,
				paddingBottom: -5
			};
		case length >= 10 && length <= 17:
			return {
				barCategoryGap: 10,
				maxBarSize: 60,
				barChartHeight: 930,
			};
		case length >= 18 && length <= 30:
			return {
				barCategoryGap: 5,
				maxBarSize: 60,
				barChartHeight: 1130,
			};
		default:
			return {
				barCategoryGap: 70,
				maxBarSize: 60,
				barChartHeight: 630,
			};
	}
};