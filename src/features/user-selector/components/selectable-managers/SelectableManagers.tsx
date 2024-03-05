import React from 'react';
import { ManagerDTO } from 'entities/managers';
import { GroupedData } from 'shared/utils/helpers';
import classes from './selectableManagers.module.scss';
import SelectableGroup from 'features/user-selector/components/selectable-group/SelectableGroup';

type SelectableManagersProps = {
	groupedManagers: GroupedData<ManagerDTO>
	onManagersAppend: (managers: ManagerDTO[]) => void
}

const SelectableManagers = ({
	groupedManagers,
	onManagersAppend
}: SelectableManagersProps): JSX.Element => {

	return (
		<div className={classes['selectable-managers']}>
			{Object.entries<GroupedData<ManagerDTO>>(groupedManagers).map(([ groupId, managers ]) =>
				<SelectableGroup
					key={groupId}
					groupId={String(groupId)}
					onManagersAppend={onManagersAppend}
					managers={managers}
				/>
			)}
		</div>
	);
};

export default SelectableManagers;