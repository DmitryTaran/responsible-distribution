import { Box, Button, Tooltip } from '@mui/material';
import React from 'react';
import { UseFieldArrayAppend } from 'react-hook-form/dist/types/fieldArray';
import { ManagerDTO } from 'entities/managers';
import { DistributionTypes, recountPercentWeight, TemplateRDO, TemplateFieldNames, User, useResetManagersWeight, UserSettingRDO, useTemplateFormContext } from 'entities/templates';
import CustomListItemButton from 'shared/components/custom-list-item-button/CustomListItemButton';
import { SortedGroup } from 'shared/types/AMO.types';
import { groupButtonStyle, selectManagersListStyle } from './styles';

type SelectableManagersListProps = {
	renderingGroups: SortedGroup[]
	append: UseFieldArrayAppend<TemplateRDO, 'distributionSettings'>
	selectedManagers: UserSettingRDO[]
}

const SelectableManagersList = ({
	renderingGroups,
	append,
	selectedManagers,
}: SelectableManagersListProps): JSX.Element => {

	const { resetManagersWeights } = useResetManagersWeight<TemplateRDO>('distributionSettings');

	const { DISTRIBUTION_SETTINGS, DISTRIBUTION_TYPE } = TemplateFieldNames;

	const { getValues, getFieldState } = useTemplateFormContext();

	const handleAddGroup = (group: SortedGroup): void => {
		const selectedManagersIds: string[] = selectedManagers.map(({ user }) => user.id);
		const addingManagers: ManagerDTO[] = group.managers.filter(({ id }) => !selectedManagersIds.includes(id));
		append(addingManagers.map(({ id, userName }) => ({
			user: { id, userName },
			weight: 1,
		})), { shouldFocus: false });

		const updatedManagers = getValues(DISTRIBUTION_SETTINGS);
		const distributionType = getValues(DISTRIBUTION_TYPE);
		const { isDirty } = getFieldState(DISTRIBUTION_SETTINGS);
		if (distributionType === DistributionTypes.PERCENT && !isDirty) {
			resetManagersWeights(recountPercentWeight(updatedManagers));
		}
	};

	const handleAddManager = (user: User): void => {
		append({ user, weight: 1 }, { shouldFocus: false });
		const distributionType = getValues(DISTRIBUTION_TYPE);
		const updatedManagers = getValues(DISTRIBUTION_SETTINGS);
		const { isDirty } = getFieldState(DISTRIBUTION_SETTINGS);
		if (distributionType === DistributionTypes.PERCENT && !isDirty) {
			resetManagersWeights(recountPercentWeight(updatedManagers));
		}
	};

	return (
		<Box sx={selectManagersListStyle}>
			{renderingGroups.map((group) =>
				<Box key={group.id}>
					<Tooltip title={'Выбрать весь отдел'}>
						<Button
							onClick={() => handleAddGroup(group)}
							sx={groupButtonStyle(group.colorIndex)}
							variant="contained"
							fullWidth
						>
							{group.name}
						</Button>
					</Tooltip>
					{group.managers.map(({ id, userName }) =>
						<CustomListItemButton
							onClick={() => handleAddManager({ id, userName })}
							text={userName}
							key={id}
						/>,
					)}
				</Box>,
			)}
		</Box>
	);
};

export default SelectableManagersList;