import cn from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent, useCallback, useState } from 'react';
import { DOTS, usePagination } from 'shared/components/amo-table/lib/hooks/usePagination';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import CustomPopper from 'shared/components/custom-popper/CustomPopper';
import ArrowDownSvg from 'shared/svg/arrow-down/ArrowDownSvg';
import ArrowLeftSvg from 'shared/svg/arrow-left/ArrowLeftSvg';
import ArrowRightSvg from 'shared/svg/arrow-right/ArrowRightSvg';
import classes from './tablePagination.module.scss';

type PaginationProps = {
	pageSizeList: number[];
	siblingCount: number
	currentPage: number
	totalCount: number;
	onPageChange: (pageNumber: number) => void
};

const TablePagination = observer(({
	totalCount,
	siblingCount,
	currentPage,
	pageSizeList,
	onPageChange,
}: PaginationProps): JSX.Element => {

	const filterStore = useFilterContext();

	const [ pageSelectAnchor, setPageSelectAnchor ] = useState<HTMLDivElement | null>(null);

	const handleSelectClick = (e: MouseEvent<HTMLDivElement>): void => {
		pageSelectAnchor
			? setPageSelectAnchor(null)
			: setPageSelectAnchor(e.currentTarget);
	};

	const handlePageSizeSelect = (pageSize: number): void => {
		filterStore.setLimit(pageSize);
		filterStore.setPage(1);
		setPageSelectAnchor(null);
	};

	const totalPagesCount = Math.ceil(totalCount / filterStore.limit);
	const paginationRange = usePagination(totalCount, filterStore.limit, siblingCount, currentPage);

	const [ pageInputValue, setPageInputValue ] = useState<string>('');

	const changePage = useCallback(() => {
		const numberPageInputValue = Number(pageInputValue);
		if (numberPageInputValue > 0 && numberPageInputValue <= totalPagesCount) {
			onPageChange(numberPageInputValue);
		}
		setPageInputValue('');
	}, [ pageInputValue, totalPagesCount, onPageChange ]);

	const handlePageInputEnterDown = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
		if (e.code === 'Enter') {
			changePage();
			e.currentTarget.blur();
		}
	}, [ changePage ]);

	const handlePageInputChange = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
		setPageInputValue(e.target.value);
	}, [ setPageInputValue ]);

	const handlePageInputBlur = useCallback((_: FocusEvent<HTMLInputElement>): void => {
		changePage();
	}, [ changePage ]);

	return (
		<div className={classes.paginationContainer}>
			<div className={classes.pageSelect}>
				<div className={classes.pageCounter}>
					<button
						className={classes.paginationArrow}
						onClick={() => onPageChange(currentPage - 1)}
						disabled={currentPage <= 1}
					>
						<ArrowLeftSvg/>
					</button>
					<input
						type="number"
						className={classes.counterInput}
						min={1}
						max={totalPagesCount}
						onChange={handlePageInputChange}
						onBlur={handlePageInputBlur}
						value={pageInputValue}
						onKeyDown={handlePageInputEnterDown}
					/>
					<button
						className={classes.paginationArrow}
						onClick={() => onPageChange(currentPage + 1)}
						disabled={currentPage >= totalPagesCount}
					>
						<ArrowRightSvg/>
					</button>
				</div>
				<div className={classes.pagesValues}>
					{paginationRange.map((pageValue, index) =>
						pageValue === DOTS
							? <span key={index}>
								...
							</span>
							: <span
								key={index}
								className={cn({
									[classes.pageValue]: true,
									[classes.pageValueSelected]: currentPage === pageValue,
								})}
								onClick={() => onPageChange(pageValue)}
							>
								{pageValue}
							</span>,
					)}
				</div>
			</div>
			<div className={classes.pagesLimit}>
				<span>
					Строк на странице
				</span>
				<div
					className={cn({
						[classes.pagesLimitSelect]: true,
						[classes.pagesLimitSelectActive]: Boolean(pageSelectAnchor),
					})}
					onClick={handleSelectClick}
				>
					{filterStore.limit}
					<span className={classes.pagesLimitSvg}>
						<ArrowDownSvg/>
					</span>
				</div>
				<CustomPopper
					placement="top"
					anchor={pageSelectAnchor}
					setAnchor={setPageSelectAnchor}
				>
					<div
						className={classes.pagesLimitContainer}
					>
						{pageSizeList.map(pageSize =>
							<div
								className={cn({
									[classes.pagesLimitListItem]: true,
									[classes.pagesLimitListItemSelected]: pageSize === filterStore.limit,
								})}
								key={pageSize}
								onClick={() => handlePageSizeSelect(pageSize)}
							>
								{pageSize}
							</div>,
						)}
					</div>
				</CustomPopper>
			</div>
		</div>
	);
});

export default TablePagination;