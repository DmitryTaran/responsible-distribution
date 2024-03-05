import { ComponentType, ReactNode } from 'react';
import { DateRangeType } from 'shared/components/custom-date-picker/lib/types';
import { FilterStore } from 'shared/components/table-filter-menu/lib/store/FilterStore';
import { FilterInputProps } from 'shared/components/table-filter-menu/lib/types/FilterInputProps';

export type TableData<T extends TableId> = {
	id: T
}

export type TableId = string | number

export type FilterMatchValues = string[] | string | DateRangeType

export type TableHeaderValue<T> = {
	[key in keyof T]?: {
		name: string
		renderCell?: (value: T) => ReactNode
		spacing: string
		sort?: SortConfig<T>
		filterConfig?: FilterConfig<T, FilterMatchValues>
		renderHead?: (fieldName: string) => JSX.Element
	}
}

export type SortConfig<T> = {
	asc: {
		label: string
		compareFunc?: (a: T, b: T) => number
	}
	desc: {
		label: string
		compareFunc?: (a: T, b: T) => number
	}
}

export type FilterConfig<T, U> = {
	customFilterFunc: (data: T[], matchValue: U) => T[]
	FilterType: ComponentType<FilterInputProps<U>>

}

export type TableContextType<T> = {
	filter: FilterStore<T>
}
