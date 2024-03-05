import { makeAutoObservable } from 'mobx';
import { FilterMatchValues } from 'shared/components/amo-table/lib/types';

export const ASC_SORT = 'asc' as const;
export const DESC_SORT = 'desc' as const;

export type SortType =
	typeof ASC_SORT |
	typeof DESC_SORT

type Sort<T> = {
	type: SortType
	field: keyof T
}

type Filter<T> = {
	match: FilterMatchValues
	field: keyof T
}

type FilterMapType<T, U> = Map<keyof T, U>


export class FilterStore<T> {

	private _sortType: Sort<T> | null = null;
	private _filters: FilterMapType<T, FilterMatchValues> = new Map();
	private _page: number = 1;
	private _initialLimit = 25;
	private _limit: number = this._initialLimit;

	constructor() {
		makeAutoObservable(this);
	}

	get sortType(): Sort<T> | null {
		return this._sortType;
	}

	get filters(): FilterMapType<T, FilterMatchValues> {
		return this._filters;
	}

	get page(): number {
		return this._page;
	}

	get limit(): number {
		return this._limit;
	}

	get initialLimit(): number {
		return this._initialLimit;
	}

	public setSortType(sortType: Sort<T> | null): void {
		this._sortType = sortType;
	}

	public addFilter(filter: Filter<T>): void {
		this._filters.set(filter.field, filter.match);
	}

	public removeFilter(field: keyof T): void {
		this._filters.delete(field);
	}

	public setLimit(limit: number): void {
		this._limit = limit;
	}

	public setPage(page: number): void {
		this._page = page;
	}


}