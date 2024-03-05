import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import { RolesValues, useGetSingleManager } from 'entities/managers';
import StatusToggler from 'features/status-toggler/StatusToggler';
import SidebarCollapseItem from './components/collapse-item/SidebarCollapseItem';
import SidebarItem from './components/sidebar-item/SidebarItem';
import { SidebarCollapsableItems, sidebarReportsItem } from './lib/consts/sidebarOptions';
import { sidebarContainer, sidebarHeaderContainer, sidebarHeaderText } from './styles';
import { PagesKeys } from './lib/types';

const SideBar = (): JSX.Element => {

	const { manager } = useGetSingleManager();

	return (
		<Box sx={sidebarContainer}>
			<Box sx={sidebarHeaderContainer}>
				<Typography sx={sidebarHeaderText}>
					РАСПРЕДЕЛЕНИЕ ЗАЯВОК
				</Typography>
			</Box>
			<StatusToggler/>

			{manager?.widgetRole === RolesValues.Admin &&
                <>
                    <SidebarItem title={'Статусы'} pageKey={PagesKeys.Statuses}/>
                    <SidebarItem title={'Рабочий график'} pageKey={PagesKeys.WorkSchedule}/>
                    <SidebarItem title={'Шаблоны'} pageKey={PagesKeys.Templates}/>
                    <SidebarCollapseItem title={SidebarCollapsableItems.REPORTS} subtitles={sidebarReportsItem}/>
                </>
			}
		</Box>
	);
};

export default SideBar;