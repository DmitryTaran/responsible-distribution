import { Box, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

export type TitleProps = {
	text: string
	subtitle?: ReactNode
}

const Title = ({ subtitle, text }: TitleProps): JSX.Element => {
	return (
		<Box sx={{display: 'flex', flexDirection: 'column', gap: '5px'}}>
			<Typography variant="h6">{text}</Typography>
			<Typography variant="subtitle1">{subtitle}</Typography>
		</Box>
	);
};

export default Title;