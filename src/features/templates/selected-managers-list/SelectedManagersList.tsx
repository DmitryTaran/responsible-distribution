import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { useWatch } from 'react-hook-form';
import { UseFieldArrayRemove } from 'react-hook-form/dist/types/fieldArray';
import {
	DistributionTypes,
	recountPercentWeight, TemplateRDO,
	TemplateFieldNames,
	useResetManagersWeight,
	UserSettingRDO,
	useTemplateFormContext,
} from 'entities/templates';
import FormTextInput from 'shared/components/form-text-input/FormTextInput';
import {
	selectedManagersInputStyle,
	selectedManagersItemStyle,
	selectedManagersListBoxStyle,
	selectedManagersTitleStyle,
} from './styles';

type SelectedManagersListProps = {
	remove: UseFieldArrayRemove;
	selectedManagers: UserSettingRDO[];
};

const SelectedManagersList = ({
	remove,
	selectedManagers,
}: SelectedManagersListProps): JSX.Element => {

	const { resetManagersWeights } = useResetManagersWeight<TemplateRDO>('distributionSettings');

	const { DISTRIBUTION_SETTINGS, DISTRIBUTION_TYPE } = TemplateFieldNames;

	const { resetField, getValues, getFieldState } = useTemplateFormContext();

	const handleRemoveManager = (index: number) => {
		remove(index);
		const updatedManagers = getValues(DISTRIBUTION_SETTINGS);
		const distributionType = getValues(DISTRIBUTION_TYPE);
		const { isDirty } = getFieldState(DISTRIBUTION_SETTINGS);
		if (distributionType === DistributionTypes.PERCENT && !isDirty) {
			resetManagersWeights(recountPercentWeight(updatedManagers));
		}
		if (selectedManagers.length <= 1) {
			resetField(DISTRIBUTION_SETTINGS, { defaultValue: [] });
		}
	};

	const distributionType = useWatch({ name: DISTRIBUTION_TYPE });

	return (
		<Box sx={selectedManagersListBoxStyle}>
			{selectedManagers.map(({ user }, index) => (
				<Box key={user.id} sx={selectedManagersItemStyle}>
					<Box sx={selectedManagersTitleStyle}>
						<Typography>
							{index + 1}. {user.userName}
						</Typography>
					</Box>
					{(distributionType === DistributionTypes.PERCENT ||
						distributionType === DistributionTypes.QUANTITY) && (
						<FormTextInput
							variant="outline"
							type={'number'}
							options={{ valueAsNumber: true }}
							fieldName={`${DISTRIBUTION_SETTINGS}.${index}.weight`}
						/>
					)}
					<Tooltip title="Удалить" placement="bottom">
						<IconButton
							onClick={() => handleRemoveManager(index)}
							sx={{ alignSelf: 'flex-end' }}
						>
							<ClearIcon/>
						</IconButton>
					</Tooltip>
				</Box>
			))}
		</Box>
	);
};

export default SelectedManagersList;
