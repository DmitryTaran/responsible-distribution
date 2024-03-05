import { useGetUsersChartData } from 'entities/report/swr/useGetUsersChartData';
import { useGetUsersReport } from 'entities/report/swr/useGetUsersReport';
import { UserReportsRenderingData } from 'entities/report/types/UserReportDTO';
import { useGetTemplate } from 'entities/templates';
import UsersChart from 'features/reports/users-chart/UsersChart';
import { observer } from 'mobx-react-lite';
import React, { useMemo } from 'react';
import { TableContent } from 'shared/components/amo-table';
import withFilterProvider from 'shared/components/amo-table/lib/helpers/withFilterProvider';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import ContentLayout from 'shared/components/content-layout/ContentLayout';
import { ASC_SORT } from 'shared/components/table-filter-menu/lib/store/FilterStore';
import { adaptedGroups, adaptedManagers, getFilteredIds } from 'shared/components/table-filter-menu/lib/utils/adapters';
import { filterUserReportFieldMap, sortMap } from 'widgets/user-report/lib/consts/adapters';
import { userReportHeaders } from 'widgets/user-report/lib/consts/userReportHeaders';
import { useGetAllLeadsCount } from 'entities/report/swr/useGetAllLeadsCount';

const DEFAULT_SORT_FIELD = 'createdAt';

const UserReportTableWithChart = withFilterProvider(observer((): JSX.Element => {

	const { sortType, filters, limit, page } = useFilterContext<UserReportsRenderingData>();
	const { templateData } = useGetTemplate();
	const groupMatch = filters.get('group');
	const usersMatch = filters.get('user');
	const templateMatch = filters.get('template');
	const dateFilter = filters.get('createdAt');

	const adaptedFilters = useMemo(() => {
		return {
			...(groupMatch && { groupId: getFilteredIds(adaptedGroups, groupMatch) }),
			...(usersMatch && { userId: getFilteredIds(adaptedManagers, usersMatch) }),
			...(templateMatch && { template: getFilteredIds(templateData, templateMatch) }),
		};
	}, [ groupMatch, usersMatch, templateMatch ]);

	const [ dateFrom, dateTo ] = Array.from(dateFilter || '');

	const { data: usersReportTableData, isLoading: isTableDataLoading } = useGetUsersReport({
		page,
		limit,
		sort: sortMap[sortType?.type || ASC_SORT],
		sortField: filterUserReportFieldMap[sortType?.field] || DEFAULT_SORT_FIELD,
		dateFrom,
		dateTo,
		filters: adaptedFilters,
	});

	const { data: usersReportChartData, isLoading: isChartDataLoading } = useGetUsersChartData({
		dateFrom,
		dateTo,
		filters: adaptedFilters,
	});

	const renderingData = useMemo<UserReportsRenderingData[]>(() => {
		return usersReportTableData?.map(({ id, group, createdAt, template, user, lead }) => ({
			id,
			group: group.name,
			createdAt,
			template: template.name,
			lead,
			user: user.name,
		})) || [];
	}, [ usersReportTableData ]);

	const { data: allLeadsCount } = useGetAllLeadsCount();

	return (
		<>
			<ContentLayout>
				<div style={{ position: 'relative' }}>
					<UsersChart
						data={usersReportChartData?.users}
						totalLeadsCount={usersReportChartData?.totalLeads}
						allLeadsData={allLeadsCount}
					/>
				</div>
			</ContentLayout>
			<ContentLayout>
				{!isChartDataLoading &&
                    <TableContent
                        data={renderingData}
                        headers={userReportHeaders}
                        totalCount={usersReportChartData?.totalLeads || 0}
                    />
				}
			</ContentLayout>
		</>
	);
}));

export default UserReportTableWithChart;