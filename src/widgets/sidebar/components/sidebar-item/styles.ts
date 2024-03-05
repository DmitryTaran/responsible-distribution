import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';
import { borderedBottom, itemHovered } from '../../styles';

export const SidebarItemStyle: SxMuiStyle = {
	paddingY: '15px',
	paddingX: '35px',
	cursor: 'pointer',
	transition: '0.1s',
	'&:last-child': { borderBottom: 0 },
	color: Colors.primaryFontColorLight,
	...itemHovered,
	...borderedBottom
};

export const SidebarItemText: SxMuiStyle = {
	fontSize: '18px',
	lineHeight: 'normal',
	color: 'inherit',
	fontWeight: 'inherit'
};