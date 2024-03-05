import { ManagerDTO, RolesValues, useGetManagers } from 'entities/managers';
import StatusesToolbar from 'features/statuses-toolbar/StatusesToolbar';
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
import { statusTableHeaders } from 'widgets/statuses-table/lib/consts/statusesTableHeaders';
import { StatusesValues } from 'entities/statuses';
import { PopulatedModel } from 'shared/types/Widget.types';
import { getGroupColorIndex } from 'entities/managers/utils/helpers';

const StatusTable = withFilterProvider(observer((): JSX.Element => {

	const { isLoading, managers } = useGetManagers();

	const renderingManagers = useMemo(() => managers.map(manager => ({
		...manager,
		userId: String(manager.userId),
		groupName: GROUPS[manager.group],
	})), [ managers ]);

	const sortedByGroupsManagers = useMemo(() => Object.values(groupBy(renderingManagers, 'groupId')).flat(), [ renderingManagers ]);

	const filteredManagers = useFilteredData(sortedByGroupsManagers, statusTableHeaders);

	const [ selectedManagers, setSelectedManagers ] = useState<string[]>([]);

	const getDefaultValues = ( managers: PopulatedModel<ManagerDTO, {
		userId: string
	}>[], selectedManagers: string[] ): {
		status: StatusesValues | null,
		widgetRole: RolesValues | null
	} => {
		return selectedManagers.length === 1
			? managers.find(manager => String(manager.userId) === selectedManagers[0])!
			: { status: null, widgetRole: null };
	};

	return (
		<ContentLayout>
			<AmoTableLayout
				totalCount={filteredManagers.length}
				toolbar={
					<StatusesToolbar
						isShow={Boolean(selectedManagers.length)}
						selectedManagers={selectedManagers}
						setSelectedManagers={setSelectedManagers}
						defaultValues={getDefaultValues(filteredManagers, selectedManagers)}
					/>
				}
			>
				<AmoTableHead
					checkbox
					data={filteredManagers}
					headers={statusTableHeaders}
					selectedRows={selectedManagers}
					totalCount={filteredManagers.length}
					selectionField={'userId'}
					onRowCheck={( ids ) => setSelectedManagers(ids)}
				/>
				<GroupedTableBody
					checkbox
					data={filteredManagers}
					headers={statusTableHeaders}
					selectedRows={selectedManagers}
					totalCount={filteredManagers.length}
					groupByField={'group'}
					onRowClick={( { userId } ) => {
						setSelectedManagers(prevState =>
							prevState.includes(userId)
								? prevState.filter(id => userId !== id)
								: [ ...prevState, userId ],
						);
					}}
					selectionField={'userId'}
					onGroupRowClick={( group ) => {
						const groupUserIds = group.map(( { userId } ) => userId);
						const mergedIdsSet = new Set([ ...selectedManagers, ...groupUserIds ]);
						mergedIdsSet.size > selectedManagers.length
							? setSelectedManagers([ ...mergedIdsSet ])
							: setSelectedManagers(selectedManagers.filter(userId => !groupUserIds.includes(userId)));
					}}
					renderGroupRow={( groupId ) => GROUPS[groupId]}
					colorIndexFunc={getGroupColorIndex}
				/>
			</AmoTableLayout>
		</ContentLayout>
	);
}));

export default StatusTable;
