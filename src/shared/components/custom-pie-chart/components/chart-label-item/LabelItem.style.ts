import { SxMuiStyle } from 'shared/types/MUI.types';
import { Colors } from 'shared/theme/AmoLightTheme';

export const LabelItemContainer: SxMuiStyle = {
	display: 'flex',
	padding: '10px',
	alignItems: 'center',
	gap: '15px',
	borderRadius: '3px',
	border: '1px solid #C2C2C2',
};

export const LabelItemLeftValue: SxMuiStyle = {
	width: '49px',
	textAlignLast: 'right',
	fontSize: '20px',
	lineHeight: 'normal',
	color: `${Colors.primaryFontColorLight}`
};

export const LabelItemCenterValue: SxMuiStyle = {
	width: 160,
	fontSize: '20px',
	lineHeight: 'normal',
	fontWeight: 700,
	overflow: 'hidden',
	textOverflow: 'ellipsis',
	textWrap: 'nowrap',
	color: `${Colors.primaryFontColorLight}`
};

export const LabelItemRightValue: SxMuiStyle = {
	width: '33px',
	textAlignLast: 'right',
	fontSize: '20px',
	lineHeight: 'normal',
	color: '#C2C2C2',
};