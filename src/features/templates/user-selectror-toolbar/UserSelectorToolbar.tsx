import { Box, CircularProgress, Typography } from '@mui/material';
import { ManagerDTO } from 'entities/managers';
import {
	DIGITS_AFTER_COMMA,
	DistributionTypes,
	roundForTwoDigits,
	TemplateRDO,
	TemplateFieldNames,
	UserSettingRDO,
	useTemplateFormContext,
} from 'entities/templates';
import React, { Dispatch, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import {
	UseFieldArrayAppend,
	UseFieldArrayRemove,
} from 'react-hook-form/dist/types/fieldArray';
import AmoButton from 'shared/components/amo-button/AmoButton';
import { HUNDRED_PERCENT } from 'shared/consts/const';
import { percentCountStyle } from './styles';
import StraightInput from 'shared/components/native-input/NativeInput';

type UserSelectorToolbarProps = {
	append: UseFieldArrayAppend<
		TemplateRDO,
		typeof TemplateFieldNames.DISTRIBUTION_SETTINGS
	>;
	remove: UseFieldArrayRemove;
	selectedManagers: UserSettingRDO[];
	managers: ManagerDTO[];
	search: string;
	setSearch: Dispatch<string>;
	isUsersLoading: boolean;
};

const UserSelectorToolbar = ({
	append,
	remove,
	selectedManagers,
	managers,
	search,
	setSearch,
	isUsersLoading,
}: UserSelectorToolbarProps): JSX.Element => {
	const { DISTRIBUTION_SETTINGS, DISTRIBUTION_TYPE } = TemplateFieldNames;

	const { resetField } = useTemplateFormContext();

	const [percentSum, setPercentSum] = useState(0);

	const distributionType = useWatch({
		name: DISTRIBUTION_TYPE,
	});

	const distributionSettings: UserSettingRDO[] = useWatch({
		name: DISTRIBUTION_SETTINGS,
	});

	useEffect(() => {
		const recountedPercentSum = distributionSettings.reduce(
			(accum, { weight }) => (weight ? accum + weight : accum),
			0
		);
		setPercentSum(roundForTwoDigits(recountedPercentSum));
	}, [distributionSettings]);

	const handleSelectAll = (): void => {
		const selectedManagersIds: string[] = selectedManagers.map(
			({ user }) => user.id
		);
		const addingManagers = managers.filter(
			({ id }) => !selectedManagersIds.includes(id)
		);
		append(
			addingManagers.map(({ id, userName }) => ({
				user: { id, userName },
				weight: 1,
			})),
			{ shouldFocus: false }
		);
	};

	const handleClearAll = (): void => {
		if (Boolean(selectedManagers.length)) {
			remove();
			resetField(DISTRIBUTION_SETTINGS, { defaultValue: [] });
		}
	};

	return (
		<Box display="flex" alignItems="center" justifyContent="space-between">
			<Box display="flex" columnGap={2} alignItems="flex-end">
				<AmoButton
					variant="primary"
					onClick={handleSelectAll}
					style={{ whiteSpace: 'nowrap' }}
				>
					Выбрать всех
				</AmoButton>
				<AmoButton
					variant="primary"
					onClick={handleClearAll}
					style={{ whiteSpace: 'nowrap' }}
				>
					Очистить выбор
				</AmoButton>
				<StraightInput
					value={search}
					placeholder="Поиск"
					variant="standard"
					onChange={(event) => setSearch(event.target.value)}
				/>
				{distributionType === DistributionTypes.PERCENT && (
					<Typography sx={percentCountStyle}>
						Сумма процентов:{' '}
						{percentSum !== HUNDRED_PERCENT
							? percentSum.toFixed(DIGITS_AFTER_COMMA)
							: HUNDRED_PERCENT}
					</Typography>
				)}
			</Box>
			{isUsersLoading && <CircularProgress size={40} />}
		</Box>
	);
};

export default UserSelectorToolbar;
