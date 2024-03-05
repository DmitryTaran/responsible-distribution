import { darken } from '@mui/system/colorManipulator';
import { scrollbarStyle } from 'shared/styles/scrollbarStyle';
import { Colors, GroupsColors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const groupButtonStyle = (index: number): SxMuiStyle => {
	return ({
		borderRadius: 0,
		backgroundColor: GroupsColors[index % GroupsColors.length],
		'&:hover': {
			backgroundColor: darken(GroupsColors[index % GroupsColors.length], 0.1),
		},
		color: Colors.primaryFontColorLight,
		fontWeight: 'bold',
	});
};

export const selectManagersListStyle: SxMuiStyle = {
	minWidth: '40%',
	maxWidth: '40%',
	overflowY: 'scroll',
	maxHeight: 500,
	minHeight: 500,
	...scrollbarStyle,
};