import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';
import { borderedBottom, itemSelected } from '../../styles';

export const SidebarCollapseItemStyle = (active: boolean): SxMuiStyle => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	paddingY: '15px',
	paddingLeft: '35px',
	paddingRight: '20px',
	cursor: 'pointer',
	transition: '0.1s',
	color: Colors.primaryFontColorLight,
	...(active && itemSelected),
	'&:hover': {
		color: Colors.sidebarBlue,
		'& path': {
			stroke: Colors.sidebarBlue,
		},
	},
});

export const SidebarCollapseItemContainer: SxMuiStyle = {
	...borderedBottom,
};

export const SidebarCollapseItemText: SxMuiStyle = {
	fontSize: '18px',
	lineHeight: 'normal',
	color: 'inherit',
	fontWeight: 'inherit',
};