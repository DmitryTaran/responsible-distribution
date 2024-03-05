import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const FilterLabelStyle: SxMuiStyle = {
	paddingLeft: '7px',
	color: Colors.tableGrey,
	fontSize: '12px',
	lineHeight: 'normal',
}

export const ConfirmText = (active: boolean): SxMuiStyle => ({
	paddingTop: '2px',
	color: Colors.tableGrey,
	fontSize: '12px',
	lineHeight: 'normal',
	cursor: 'pointer',
	alignSelf: 'flex-end',
	...(active && {color: Colors.tableBlue}),
	'&:hover': {
		color: Colors.tableBlue,
	},
})