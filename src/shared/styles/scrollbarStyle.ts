import { alpha } from '@mui/material';
import { SxMuiStyle } from '../types/MUI.types';
import { Colors } from '../theme/AmoLightTheme';

export const scrollbarStyle: SxMuiStyle = {
	'&::-webkit-scrollbar': {
		WebkitTransition: '.1s',
		WebkitTransitionDelay: '.1s',
		width: '12px',
	},
	'&::-webkit-scrollbar-track': {
		backgroundColor: alpha(Colors.transparentBlue, 0.05),
	},
	'&::-webkit-scrollbar-thumb': {
		backgroundColor: Colors.transparentBlue,
		borderRadius: '3px',
	},
	'&::-webkit-scrollbar-thumb:hover': {
		backgroundColor: Colors.darkererBlue,
		borderRadius: '3px',
	},
	scrollbarWidth: 'thin',
	msScrollbarTrackColor: 'red',
	scrollbarColor: `${Colors.transparentBlue} ${alpha(Colors.transparentBlue, 0.05)}`,
};