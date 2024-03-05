import zIndex from '@mui/material/styles/zIndex';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const notificationsLayoutStyle: SxMuiStyle = {
	position: 'fixed',
	minWidth: 300,
	right: 20,
	bottom: 0,
	zIndex: zIndex.drawer + 1,
};