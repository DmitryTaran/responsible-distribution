import React, { ReactNode } from 'react';
import { GroupedData } from 'shared/utils/helpers';
import { ManagerDTO } from 'entities/managers';
import SelectedGroupRow from 'features/user-selector/components/selected-group/SelectedGroup';
import classes from './selectedManagers.module.scss';

type SelectedManagersProps = {
	groupedManagers: GroupedData<ManagerDTO>
	onManagersRemove: (managers: ManagerDTO[]) => void
	weightInput?: (manager: ManagerDTO) => ReactNode
}
const SelectedManagers = ({ groupedManagers, onManagersRemove, weightInput }: SelectedManagersProps): JSX.Element => {
	return (
		<div className={classes['selected-managers']}>
			{Object.entries<GroupedData<ManagerDTO>>(groupedManagers).map(([ groupId, managers ]) =>
				<SelectedGroupRow
					key={groupId}
					managers={managers}
					groupId={String(groupId)}
					onManagersRemove={onManagersRemove}
					weightInput={weightInput}
				/>
			)}
		</div>
	);
};
export default SelectedManagers;