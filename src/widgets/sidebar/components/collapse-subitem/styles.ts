import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';
import { itemHovered } from '../../styles';

export const CollapseSubItemStyle: SxMuiStyle = {
	paddingLeft: '41px',
	paddingY: '10px',
	cursor: 'pointer',
	transition: '0.1s',
	'&:first-of-type': { paddingTop: 0 },
	'&:last-child': { paddingBottom: '15px' },
	...itemHovered,
	color: Colors.primaryFontColorLight
};

export const CollapseSubItemText: SxMuiStyle = {
	fontSize: '15px',
	lineHeight: '157.221%',
	color: 'inherit',
	fontWeight: 'inherit'
};