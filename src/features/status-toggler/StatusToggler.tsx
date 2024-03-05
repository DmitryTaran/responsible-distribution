import Box from '@mui/material/Box/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography/Typography';
import { statusConfig } from 'entities/statuses/consts';
import React from 'react';
import { useGetSingleManager } from 'entities/managers';
import { useUpdateSingleManager } from 'entities/managers';
import { StatusesValues } from 'entities/statuses';
import AmoSwitch from 'shared/components/amo-switch/AmoSwitch';
import { account } from 'shared/consts/AMO.consts';
import { StatusCaption, StatusLabel, StatusToggleWrapper, StatusToggleLoader } from './styles';

const StatusToggler = (): JSX.Element => {
	const { manager } = useGetSingleManager();
	const updateSingleManager = useUpdateSingleManager();
	const handleClickToggler = (): void => {
		const newStatus = manager?.status === StatusesValues.On
		                  ? StatusesValues.Off
		                  : StatusesValues.On;
		if (manager) {
			const updatedManager = [{ ...manager, status: newStatus, accountId: account.id }];
			updateSingleManager(updatedManager);
		}
	};

	return (
		<>
			{manager ?
			 <Box sx={StatusToggleWrapper}>
				 <Box display="flex" flexDirection="column" gap="7px">
					 <Box display="flex" justifyContent="space-between">
						 <Box display="flex" gap={1} alignItems="center">
							 {statusConfig[manager.status].icon}
							 <Typography sx={StatusLabel}>
								 {statusConfig[manager.status].status}
							 </Typography>
						 </Box>
						 <AmoSwitch
							 onClick={handleClickToggler}
							 checked={[StatusesValues.ForcedOn, StatusesValues.On].includes(manager.status)}
							 disabled={[StatusesValues.ForcedOn, StatusesValues.ForcedOff].includes(manager.status)}
							 variant={'success'}
						 />
					 </Box>
					 <Typography sx={StatusCaption}>
						 {statusConfig[manager.status].text}
					 </Typography>
				 </Box>
			 </Box> :
			 <Box sx={StatusToggleLoader}>
				 <CircularProgress/>
			 </Box>
			}
		</>
	);
};

export default StatusToggler;
