import { SxMuiStyle } from 'shared/types/MUI.types';

export const daySettingStyle: SxMuiStyle = {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	gap: '21px',
	'.MuiToggleButton-root': {
		margin: 0,
		padding: '10px 20px',
		borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
		borderRadius: '3px',
		fontSize: '12px',
	},
};

export const daySettingToggleButtonStyle: SxMuiStyle = {
	width: 56,
	height: 36,
};
