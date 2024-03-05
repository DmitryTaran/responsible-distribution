import { Box } from '@mui/material';
import React from 'react';
import { TemplateRDO } from 'entities/templates';
import TimeInputs from 'shared/components/time-inputs/TimeInputs';
import DayPicker from 'shared/components/day-picker/DayPicker';
import { FieldsWithWorkTime } from './lib/types';

type WorkTimeSettingsProps = {
	field: FieldsWithWorkTime
	collapsable?: boolean
}

const WorkTimeSettings = ({ field, collapsable }: WorkTimeSettingsProps): JSX.Element => {
	return (
		<Box display="flex" flexDirection="column" gap="20px" marginTop={collapsable ? '20px' : 0}>
			<TimeInputs field={field} placement={'top-end'}/>
			<DayPicker<TemplateRDO> name={`${field}.days`}/>
		</Box>
	);
};

export default WorkTimeSettings;