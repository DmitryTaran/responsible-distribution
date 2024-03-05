import { createTheme, Theme } from '@mui/material';


export const NORMAL_LINE_HEIGHT = 19;
export enum Colors {
	sidebarBlue = '#366FB4',
	statusErrorColor='#E56B6B',
	statusSuccessColor='#AFE56B',
	chartTickColor='#666',
	absoluteWhite = '#fff',
	divider = '#e1e1e1',
	arrowIcon = '#848484',
	lightText = '#c2c2c2',
	lightGrey = '#d0d0d0',
	tableBorder = '#C2C2C2',
	darkerGrey = '#C1C5C6',
	blue = '#4c8bf7',
	darkerBlue = '#4077d6',
	darkererBlue = '#3771d6',
	errorRed = 'rgb(243,117,117)',
	anchorBlue = 'rgb(88, 144, 233)',
	contrastButtonColor = '#f5f5f5',
	transparentBlue = 'rgba(25, 118, 210, 0.15)',
	primaryFontColorLight = '#363B44',
	backgroundColor = '#E9E9E9',
	white = '#fafafa',
	successAlertBorder = '#B7CCB9',
	errorAlertBorder = '#DBA9A9',
	tableGrey = '#92989B',
	tableBlue = '#76ACDE',
	tableMenuItemHover = '#F6F6F6'
}

export const GroupsColors = ['#ffff99', '#99ccff', '#ffcc66', '#ffcccc'];

export const ChartColors = [
	'#FFCC66',
	'#CCC8F9',
	'#87F2C0',
	'#FFCCCC',
	'#EB93FF',
	'#FFFF99',
	'#99CCFF',
]

export const amoTheme: Theme = createTheme({
	typography: {
		fontFamily: 'PT Sans, Arial, sans-serif',
		body1: {
			fontSize: '0.95rem',
		},
		button: {
			fontFamily: 'PT Sans, sans-serif',
			fontSize: '0.9rem',
		},
		h6: {
			color: Colors.primaryFontColorLight,
			lineHeight: 'normal',
			fontSize: '18px',
			fontWeight: 700
		},
		h5: {
			fontSize: '2rem',
		},
		subtitle1: {
			fontSize: '15px',
			color: Colors.primaryFontColorLight,
			lineHeight: 'normal'
		},
		caption: {
			fontSize: '0.71rem',
		},
	},
	palette: {
		primary: {
			main: Colors.sidebarBlue,
			contrastText: Colors.contrastButtonColor,
		},
		error: {
			main: Colors.errorRed,
			contrastText: Colors.contrastButtonColor,
		},
	},
	components: {
		MuiDrawer: {
			styleOverrides: {
				paper: {
					backgroundColor: Colors.backgroundColor,
				},
			},
		},
		MuiDialog: {
			styleOverrides: {
				paper: {
					backgroundColor: Colors.white,
				},
			},
		},
		MuiButton: {
			defaultProps: {
				disableElevation: true,
			},
		},
		MuiAlert: {
			styleOverrides: {
				standardSuccess: {
					border: `1px solid ${Colors.successAlertBorder}`,
				},
				standardError: {
					border: `1px solid ${Colors.errorAlertBorder}`,
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				input: {color: Colors.primaryFontColorLight}
			}
		}
	},

});

export const AmoLightTheme = amoTheme;

