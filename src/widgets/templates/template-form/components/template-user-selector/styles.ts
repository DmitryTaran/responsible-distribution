import { Colors } from 'shared/theme/AmoLightTheme';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const userSelectorBoxStyle = (invalid: boolean): SxMuiStyle => ({
	border: `1px solid ${invalid ? Colors.errorRed : Colors.lightGrey}`,
	borderRadius: 1,
	maxHeight: 500,
	minHeight: 500,
});