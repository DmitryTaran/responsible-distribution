export type BarChartData = {
	name: string
	value: number | false
	hidden?: boolean
}

export type TextSize = { width: number, height: number }

export type BarChartConfig = {
	barCategoryGap: number,
	maxBarSize: number,
	barChartHeight: number
	paddingBottom?: number
}

export type CustomTickProps = {
	x: number
	y: number
	payload: {
		value: string
		width: number
		index: number
	}
}