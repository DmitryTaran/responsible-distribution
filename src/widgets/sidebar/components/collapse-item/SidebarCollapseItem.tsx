import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ArrowDownSvg from 'shared/svg/arrow-down/ArrowDownSvg';
import { SidebarCollapsableItems } from 'widgets/sidebar/lib/consts/sidebarOptions';
import { useRouterContext } from 'widgets/sidebar/lib/hooks/useRouterContext';
import { Subtitle } from '../../lib/types';
import CollapseSubItem from '../collapse-subitem/CollapseSubItem';
import { SidebarCollapseItemContainer, SidebarCollapseItemStyle, SidebarCollapseItemText } from './styles';
import classes from './sidebarCollapseItem.module.scss';
import cn from 'classnames';

type SidebarCollapseItemProps = {
	title: SidebarCollapsableItems
	subtitles: Subtitle[]
}

const SidebarCollapseItem = observer(({ title, subtitles }: SidebarCollapseItemProps): JSX.Element => {

	const routerStore = useRouterContext();
	const { selectedItem, openedCollapseItem } = routerStore;
	const isOpen = openedCollapseItem === title;
	const isActive = subtitles.some(({ pageKey }) => (pageKey === selectedItem));
	return (
		<Box sx={SidebarCollapseItemContainer}>
			<Box sx={SidebarCollapseItemStyle(isActive)}
			     onClick={() => {
				     isOpen
					     ? routerStore.setOpenCollapseItem(null)
					     : routerStore.setOpenCollapseItem(title);
			     }}
			>
				<Typography sx={SidebarCollapseItemText}>
					{title}
				</Typography>
				<ArrowDownSvg className={cn(
					classes['arrow-icon'],
					isOpen && classes['arrow-icon-reversed']
				)}/>
			</Box>
			<Collapse in={isOpen}>
				{subtitles.map(subtitle =>
					<CollapseSubItem key={subtitle.pageKey} subtitle={subtitle}/>,
				)}
			</Collapse>
		</Box>
	);
});

export default SidebarCollapseItem;