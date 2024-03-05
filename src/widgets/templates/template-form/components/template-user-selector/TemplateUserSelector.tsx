import { Box, Paper, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { sortByGroups, useGetManagers } from 'entities/managers';
import {
	DistributionTypes,
	roundForTwoDigits,
	TemplateRDO,
	TemplateFieldNames,
	useTemplateFormContext,
	TemplateDTO
} from 'entities/templates';
import Title from 'shared/components/title/Title';
import { HUNDRED_PERCENT } from 'shared/consts/const';
import { settingsBackgroundStyle } from 'shared/styles/drawerSettingsBackgroundStyle';
import { SortedGroup } from 'shared/types/AMO.types';
import SelectableManagersList from 'features/templates/selectable-managers-list/SelectableManagersList';
import SelectedManagersList from 'features/templates/selected-managers-list/SelectedManagersList';
import UserSelectorToolbar from 'features/templates/user-selectror-toolbar/UserSelectorToolbar';
import { userSelectorBoxStyle } from './styles';

const TemplateUserSelector = (): JSX.Element => {
	const { DISTRIBUTION_SETTINGS } = TemplateFieldNames;
	const { managers, isLoading } = useGetManagers();
	const { control, getFieldState } = useTemplateFormContext();

	const { append, remove, fields: selectedManagers } = useFieldArray<TemplateDTO>({
		control,
		name: DISTRIBUTION_SETTINGS,
		rules: {
			validate: {
				minLength: (value) => value.length > 1 || 'Выберите минимум двух пользователей',
				hundredPercent: (value, formValues) => {
					if (formValues.distributionType === DistributionTypes.PERCENT) {
						const percentSum = value.reduce((accum, { weight }) => accum + (weight || 0), 0);
						return roundForTwoDigits(percentSum) === HUNDRED_PERCENT || 'Сумма значений должна составлять 100%';
					}
					return true;
				},
				notNullValue: (value, formValues) => {
					if (formValues.distributionType === DistributionTypes.PERCENT ||
						formValues.distributionType === DistributionTypes.QUANTITY) {
						return value.every(({ weight }) => (weight || 0) > 0) || 'Все значения должны быть больше нуля';
					}
					return true;
				},
			},
		},
	});

	console.log(selectedManagers);

	const [search, setSearch] = useState<string>('');
	const distributionSettingsState = getFieldState(DISTRIBUTION_SETTINGS);

	const groupedManagers = useMemo(() => sortByGroups(managers), [managers]);

	const renderingSelectableGroups = useMemo<SortedGroup[]>(() => {
		const usersIds = selectedManagers.map(({ user }) => user.id);
		return groupedManagers.map((group) => {
			const filteredGroup = group.managers.filter(manager => !usersIds.includes(manager.id) && manager.userName.toLowerCase().match(search.trim().toLowerCase()));
			return {
				...group,
				managers: filteredGroup,
			};
		}).filter(group => Boolean(group.managers.length));
	}, [selectedManagers, search, groupedManagers]);

	return (
		<>
			<Title
				text="Выбор пользователей"
				subtitle="Выберите пользователей, которые будут участвовать в распределении."
			/>
			<Paper sx={settingsBackgroundStyle}>
				<UserSelectorToolbar
					search={search}
					setSearch={setSearch}
					append={append}
					remove={remove}
					managers={managers}
					selectedManagers={selectedManagers}
					isUsersLoading={isLoading}
				/>
				<Box position="relative" marginTop={1}>
					{
						distributionSettingsState.invalid &&
                        <Typography color="error" fontSize="0.75rem" position="absolute" top={-20} left={20}>
							{distributionSettingsState.error?.root?.message}
                        </Typography>
					}
					<Box sx={userSelectorBoxStyle(distributionSettingsState.invalid)}>
						<Box display="flex">
							<SelectableManagersList
								selectedManagers={selectedManagers}
								renderingGroups={renderingSelectableGroups}
								append={append}
							/>
							<SelectedManagersList
								selectedManagers={selectedManagers}
								remove={remove}
							/>
						</Box>
					</Box>
				</Box>
			</Paper>
		</>
	)
		;
};

export default TemplateUserSelector;


