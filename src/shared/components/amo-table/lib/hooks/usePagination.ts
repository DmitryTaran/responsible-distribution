import { useMemo } from 'react';

export const DOTS = -1;

const DOTS_PAGINATION_THRESHOLD = 5;

const range = (start: number, end: number): number[] => {
	return Array.from({ length: end - start + 1 }, (_, idx) => idx + start);
};

export const usePagination = (
	totalCount: number,
	pageSize: number,
	siblingCount: number = 1,
	currentPage: number,
): number[] => {

	const paginationRange = useMemo<number[]>(() => {

		const totalPageCount = Math.ceil(totalCount / pageSize);

		const totalPageNumbers = siblingCount + DOTS_PAGINATION_THRESHOLD;

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(
			currentPage + siblingCount,
			totalPageCount,
		);

		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * siblingCount;
			const leftRange = range(1, leftItemCount);
			return [...leftRange, DOTS, totalPageCount];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * siblingCount;
			const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		const middleRange = range(leftSiblingIndex, rightSiblingIndex);
		return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
	}, [pageSize, siblingCount, currentPage, totalCount]);

	return paginationRange ;
};