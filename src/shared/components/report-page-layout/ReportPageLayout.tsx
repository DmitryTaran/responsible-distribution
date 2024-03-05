import Box from '@mui/material/Box';
import React, { PropsWithChildren } from 'react';

const ReportPageLayout = ({ children }: PropsWithChildren): JSX.Element => {

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: '30px',
				minWidth: 840,
			}}
		>
			{children}
		</Box>
	);
};

export default ReportPageLayout;