import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import React from 'react';
import { infoStyle, nameStyle, requestInfoWrapper } from './styles';

type RequestInfoProps = {
	name: string
	info: string
}

const RequestInfo = ({ info, name }: RequestInfoProps): JSX.Element => {
	return (
		<Box sx={requestInfoWrapper}>
			<Typography sx={nameStyle}>
				{name}
			</Typography>
			<Typography sx={infoStyle}>
				{info}
			</Typography>
		</Box>
	);
};

export default RequestInfo;