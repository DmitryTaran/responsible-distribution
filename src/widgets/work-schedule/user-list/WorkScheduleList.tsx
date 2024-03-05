import { useGetManagers } from 'entities/managers';
import { RenderingManager } from 'entities/managers/types/ManagerDTO';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useState } from 'react';
import GroupedTableBody from 'shared/components/amo-table/components/table-body/GroupedTableBody';
import AmoTableHead from 'shared/components/amo-table/components/table-header/AmoTableHead';
import AmoTableLayout from 'shared/components/amo-table/components/table-layout/AmoTableLayout';
import withFilterProvider from 'shared/components/amo-table/lib/helpers/withFilterProvider';
import { useFilteredData } from 'shared/components/amo-table/lib/hooks/useFilteredData';
import ContentLayout from 'shared/components/content-layout/ContentLayout';
import { GROUPS } from 'shared/consts/AMO.consts';
import { groupBy } from 'shared/utils/helpers';
import WorkScheduleToolbar from 'widgets/work-schedule/user-list/components/user-list-toolbar/WorkScheduleToolbar';
import { workScheduleTableHeaders } from 'widgets/work-schedule/user-list/lib/workScheduleTableHeaders';
import { getGroupColorIndex } from 'entities/managers/utils/helpers';


const WorkScheduleList = withFilterProvider(observer((): JSX.Element => {

	const { isLoading, managers } = useGetManagers();

	const renderingManagers = useMemo<RenderingManager[]>(() => managers.map(manager => ({
			...manager,
			userId: String(manager.userId),
			groupName: GROUPS[manager.group],
		}
	)), [managers]);

	const sortedByGroupsManagers = useMemo(() => Object.values(groupBy(renderingManagers, 'groupId')).flat(), [renderingManagers]);

	const filteredManagers = useFilteredData(sortedByGroupsManagers, workScheduleTableHeaders);

	const [selectedManagers, setSelectedManagers] = useState<string[]>([]);


	return (
		<ContentLayout>
			<AmoTableLayout
				totalCount={filteredManagers.length}
				toolbar={<WorkScheduleToolbar
					selectedManagers={selectedManagers}
					setSelectedManagers={setSelectedManagers}
				/>}
			>
				<AmoTableHead
					headers={workScheduleTableHeaders}
					data={renderingManagers}
					checkbox
					selectedRows={selectedManagers}
					selectionField={'userId'}
					onRowCheck={(ids) => setSelectedManagers(ids)}
					totalCount={renderingManagers.length}
				/>
				<GroupedTableBody
					checkbox
					data={filteredManagers}
					headers={workScheduleTableHeaders}
					selectedRows={selectedManagers}
					totalCount={filteredManagers.length}
					groupByField={'group'}
					onRowClick={({ userId }) => {
						setSelectedManagers(prevState =>
							prevState.includes(userId)
							? prevState.filter(id => userId !== id)
							: [...prevState, userId],
						);
					}}
					selectionField={'userId'}
					onGroupRowClick={(group) => {
						const groupUserIds = group.map(({ userId }) => userId);
						const mergedIdsSet = new Set([...selectedManagers, ...groupUserIds]);
						mergedIdsSet.size > selectedManagers.length
						? setSelectedManagers([...mergedIdsSet])
						: setSelectedManagers(selectedManagers.filter(userId => !groupUserIds.includes(userId)));
					}}
					renderGroupRow={(groupId) => GROUPS[groupId]}
					colorIndexFunc={getGroupColorIndex}
				/>
			</AmoTableLayout>
		</ContentLayout>
	);
}));

export default WorkScheduleList;