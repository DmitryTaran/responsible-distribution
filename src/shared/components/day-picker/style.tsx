import { Colors } from '../../theme/AmoLightTheme';
import { SxMuiStyle } from '../../types/MUI.types';

export const dayPickerErrorStyle = (isValid: boolean): SxMuiStyle => {
	const styles = {
		gap: '9px',
		'& .MuiToggleButtonGroup-grouped': {
			borderRadius: '3px',
			'&.Mui-selected, &:not(:last-of-type), &:not(:first-of-type), & .Mui-selected+.MuiToggleButtonGroup-grouped':
				{
					borderLeft: '1px solid!important',
					margin: 0,
					border: '1px solid',
					borderRadius: '3px',
				},
		},
	};
	if (isValid) {
		return { ...styles, border: `1px solid ${Colors.errorRed}` };
	}
	return styles;
};

export const toggleButtonStyle: {
	horizontal: SxMuiStyle;
	vertical: SxMuiStyle;
} = {
	horizontal: {
		border: '1px solid',
		borderLeft: '1px solid',
		fontSize: '12px',
		padding: '10px 20px',
		boxSizing: 'border-box',
		'&.Mui-selected': {
			border: '1px solid',
		},
	},
	vertical: {
		border: '1px solid',
		borderLeft: '1px solid',
		fontSize: '12px',
		padding: '10px 20px',
		boxSizing: 'border-box',
		'&.Mui-selected': {
			border: '1px solid',
		},
	},
};
