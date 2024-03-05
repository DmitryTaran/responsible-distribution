import { ListItemButton, ListItemIcon, ListItemText, SxProps } from '@mui/material';
import React, { ReactNode } from 'react';

type CustomListItemButtonProps = {
	onClick?: () => void
	text: string
	icon?: ReactNode
	sx?: SxProps
}

const CustomListItemButton = ({ onClick, icon, text, sx }: CustomListItemButtonProps): JSX.Element => {
	return (
		<ListItemButton onClick={() => onClick && onClick()} sx={sx}>
			{icon && <ListItemIcon>
				{icon}
            </ListItemIcon>}
			<ListItemText>
				{text}
			</ListItemText>
		</ListItemButton>
	);
};

export default CustomListItemButton;