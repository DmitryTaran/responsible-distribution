import MenuItem from '@mui/material/MenuItem/MenuItem';
import React, { ReactNode } from 'react';
import { menuItemSxStyle } from './styles';

export const StatusesSelectMenuItems: ReactNode = Object.entries({}).map(([key, value]) => (
	<MenuItem
		key={key}
		sx={menuItemSxStyle}
		value={key}
	>
		{value}
	</MenuItem>
));