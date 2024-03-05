import { scrollbarStyle } from 'shared/styles/scrollbarStyle';
import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const selectedManagersListBoxStyle: SxMuiStyle = {
	width: '60%',
	borderLeft: `1px solid ${Colors.lightGrey}`,
	maxHeight: 500,
	overflowY: 'scroll',
	...scrollbarStyle,
};

export const selectedManagersItemStyle: SxMuiStyle = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	padding: 0.5,
	borderBottom: `1px solid ${Colors.lightGrey}`,
};

export const selectedManagersTitleStyle: SxMuiStyle = {
	display: 'flex',
	alignItems: 'center',
	width: '80%',
};

export const selectedManagersInputStyle: SxMuiStyle = {
	width: '90px',
	'& .MuiInputBase-input': {
		paddingY: 0.5,
	},
	marginRight: 1,
};