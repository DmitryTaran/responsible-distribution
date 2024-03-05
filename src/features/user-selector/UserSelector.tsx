import React, { ReactNode, useMemo } from 'react';
import classes from './userSelector.module.scss';
import { ManagerDTO, useGetManagers } from 'entities/managers';
import { groupBy } from 'shared/utils/helpers';
import SelectableManagers from 'features/user-selector/components/selectable-managers/SelectableManagers';
import SelectedManagers from 'features/user-selector/components/selected-managers/SelectedManagers';
import { UserSettingDTO } from 'entities/templates/types';
import cn from 'classnames';
import UserSelectorSearch from 'features/user-selector/components/search/UserSelectorSearch';

type UserSelectorProps = {
	onManagersAppend?: (managers: ManagerDTO[]) => void
	onManagersRemove?: (managers: ManagerDTO[]) => void
	append: (managers: UserSettingDTO[]) => void
	remove: (indices: number[]) => void
	selectedManagersValue: UserSettingDTO[]
	weightInput?: (manager: ManagerDTO) => ReactNode
	error?: ReactNode
	hint?: ReactNode
	invalid?: boolean
}

const UserSelector = ({
	onManagersAppend,
	onManagersRemove,
	append,
	remove,
	selectedManagersValue,
	weightInput,
	error,
	hint,
	invalid
}: UserSelectorProps): JSX.Element => {

	const { managers } = useGetManagers();

	const sortedByGroupsManagers = useMemo(() => Object.values(groupBy(managers, 'groupId')).flat(), [ managers ]);

	const selectedManagersIds = useMemo(() => {
		return selectedManagersValue.map(({ user }) => user);
	}, [ selectedManagersValue ]);

	const [ selectableManagers, selectedManagers ] = useMemo(() => {
		const selectedManagers: ManagerDTO[] = [];
		const selectableManagers: ManagerDTO[] = [];
		sortedByGroupsManagers.forEach(manager => {
				selectedManagersIds.includes(manager.id)
					? selectedManagers.push(manager)
					: selectableManagers.push(manager);
			}
		);
		return [ selectableManagers, selectedManagers ];
	}, [ sortedByGroupsManagers, selectedManagersIds ]);


	const groupedSelectableManagers = useMemo(() => groupBy(selectableManagers, 'group'), [ selectableManagers ]);
	const groupedSelectedManagers = useMemo(() => groupBy(selectedManagers, 'group'), [ selectedManagers ]);

	const handleManagersAppend = (managers: ManagerDTO[]): void => {
		const appendingManagers = managers.map(({ id }) => ({
			user: id,
			weight: 1
		}));
		append(appendingManagers);
		onManagersAppend && onManagersAppend(managers);
	};

	const handleManagersRemove = (managers: ManagerDTO[]): void => {
		const removingIndices = managers.map(({ id }) => selectedManagersIds.indexOf(id));
		remove(removingIndices);
		onManagersRemove && onManagersRemove(managers);
	};

	return (
		<div className={cn(
			classes['user-selector'],
			invalid && classes['user-selector_invalid'],
		)}>
			<div className={cn(
				classes['left-side'],
				invalid && classes['left-side_invalid']
			)}>
				<div className={classes['left-side__search']}>
					<UserSelectorSearch
						onManagersAppend={handleManagersAppend}
						selectableManagers={selectableManagers}
					/>
				</div>
				<SelectableManagers
					onManagersAppend={handleManagersAppend}
					groupedManagers={groupedSelectableManagers}
				/>
			</div>
			<div className={classes['right-side']}>
				<SelectedManagers
					groupedManagers={groupedSelectedManagers}
					onManagersRemove={handleManagersRemove}
					weightInput={weightInput}
				/>
			</div>
			<div className={classes['user-selector__hint']}>
				{hint}
			</div>
			<div className={classes['user-selector__error']}>
				{error}
			</div>
		</div>
	);
};

export default UserSelector;