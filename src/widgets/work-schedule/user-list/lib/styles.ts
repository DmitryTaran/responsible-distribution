import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const tableToolbarContainerStyle: SxMuiStyle = {
	justifyContent: 'end',
	display: 'flex',
	marginBottom: '20px'
};

export const userListRowStyle: SxMuiStyle = {
	cursor: 'pointer',
	transition: '0.15s',
	'&:hover': {
		backgroundColor: Colors.tableMenuItemHover,
	},
	'&:last-of-type td': {
		borderBottom: '0'
	}
};

export const tableCellStyle: SxMuiStyle = {
	lineHeight: 'normal',
	paddingY: '13px',
	color: Colors.primaryFontColorLight,
	'&:first-of-type': {
		paddingLeft: '40px',
	},
	'&:last-of-type': {
		paddingLeft: 0,
	},
};

export const tableHeaderStyle: SxMuiStyle = {
	paddingY: '18px',
	fontFamily: 'PT Sans Caption',
	fontSize: '12px',
	lineHeight: 'normal',
	textTransform: 'uppercase',
	fontWeight: 'bold',
	color: Colors.tableGrey,
	'&:first-of-type': {
		paddingLeft: '30px',
	},
};
export const tableSubHeaderStyle: SxMuiStyle = {
	lineHeight: 'normal',
	paddingY: '15px',
	'&:first-of-type': {
		paddingLeft: '30px',
	},
	fontSize: '15px',
	textTransform: 'uppercase',
	color: Colors.primaryFontColorLight,
};
