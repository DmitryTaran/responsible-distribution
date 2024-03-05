import { scrollbarStyle } from 'shared/styles/scrollbarStyle';
import { SxMuiStyle } from 'shared/types/MUI.types';

export const tableStyle: SxMuiStyle = {
	height: '100%',
	minWidth: 'max-content',
	overflowY: 'auto',
	borderBottomLeftRadius: '5px',
	borderBottomRightRadius: '5px',
	border: '1px solid rgb(200, 200, 200)',
	borderTop: 0,
	transition: '1s',
	cursor: 'pointer',
	...scrollbarStyle,
};
