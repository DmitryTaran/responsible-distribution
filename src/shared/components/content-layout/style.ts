import { Colors } from '../../theme/AmoLightTheme';
import { SxMuiStyle } from '../../types/MUI.types';

export const contentLayoutStyle: SxMuiStyle = {
	borderRadius: '15px',
	border: `1px solid ${Colors.divider}`,
	backgroundColor: Colors.absoluteWhite,
	boxShadow: '0px 2px 34px 10px rgba(0, 0, 0, 0.10)',
	p: '30px',
	flexGrow: '2',
};