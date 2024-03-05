import Box from '@mui/material/Box';
import React, { PropsWithChildren, useState } from 'react';
import { contentLayoutStyle } from './style';
import classes from './huy.module.scss';

const ContentLayout = ({ children }: PropsWithChildren): JSX.Element => {
	return (
		<Box sx={contentLayoutStyle} style={{ position: 'relative' }}>
			{/*<Box className={classes['huy']}/>*/}
			{children}
		</Box>
	);
};

export default ContentLayout;