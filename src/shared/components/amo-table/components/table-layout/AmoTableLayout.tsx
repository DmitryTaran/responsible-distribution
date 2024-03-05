import { PropsWithChildren, ReactNode } from 'react';
import cl from './tableLayout.module.scss';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import TablePagination from 'shared/components/amo-table/components/table-pagination/TablePagination';
import { observer } from 'mobx-react-lite';

type AmoTableLayoutProps = {
	toolbar?: ReactNode
	totalCount: number;
} & PropsWithChildren

const AmoTableLayout = observer(({ children, toolbar, ...paginationProps }: AmoTableLayoutProps): JSX.Element => {

	const filterStore = useFilterContext();
	const { initialLimit, page } = filterStore;

	const hasPagination = paginationProps.totalCount > initialLimit;

	return (
		<div className={cl['table-layout']}>
			<div className={cl['toolbar']}>
				{toolbar}
			</div>
			<div className={cl['table-container']}>
				<table className={cl['table-container__table']}>
					{children}
				</table>
				{hasPagination &&
                    <TablePagination
                        currentPage={page}
                        pageSizeList={[ initialLimit, 50, 100 ]}
                        siblingCount={1}
                        onPageChange={(pageNumber) => filterStore.setPage(pageNumber)}
						{...paginationProps}
                    />
				}
			</div>
		</div>
	);
});

export default AmoTableLayout;