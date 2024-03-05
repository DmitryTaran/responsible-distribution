import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const StatusToggleWrapper: SxMuiStyle = {
	paddingY: '20px',
	paddingX: '35px',
	borderBottom: `1px solid ${Colors.divider}`,
}

export const StatusToggleLoader = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	height: 70,
	borderBottom: `1px solid ${Colors.divider}`,
}

export const StatusLabel: SxMuiStyle = {
	fontSize: '15px',
	fontStyle: 'normal',
	fontWeight: 700,
	lineHeight: 'normal',
}

export const StatusCaption: SxMuiStyle = {
	color: Colors.lightText,
	fontSize: '13px',
	fontStyle: 'normal',
	fontWeight: 400,
	lineHeight: '108.696%',
}