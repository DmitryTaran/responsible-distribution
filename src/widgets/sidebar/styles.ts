import { SIDEBAR_WIDTH } from './lib/consts';
import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const sidebarContainer: SxMuiStyle = {
	minWidth: SIDEBAR_WIDTH,
	maxWidth: SIDEBAR_WIDTH,
	backgroundColor: '#fff',
	border: '1px solid #E1E1E1',
	borderBottom: 0,
};

export const borderedBottom = {
	borderBottom: `1px solid ${Colors.divider}`,
};

export const sidebarHeaderContainer: SxMuiStyle = {
	paddingX: '35px',
	paddingY: '21px',
	...borderedBottom,
};

export const sidebarHeaderText: SxMuiStyle = {
	fontSize: '18px',
	fontWeight: 700,
	lineHeight: 'normal',
};

export const itemHovered = {
	'&:hover': {
		color: Colors.sidebarBlue,
		'& path': {
			stroke: Colors.sidebarBlue,
		},
	},
};

export const itemSelected = {
	fontWeight: 'bold',
	color: Colors.sidebarBlue,
};