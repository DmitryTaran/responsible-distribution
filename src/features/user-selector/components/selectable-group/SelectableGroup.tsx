import React, { useState } from 'react';
import { GroupsColors } from 'shared/theme/AmoLightTheme';
import { getGroupColorIndex } from 'entities/managers/utils/helpers';
import classes from 'features/user-selector/components/selectable-managers/selectableManagers.module.scss';
import { GROUPS } from 'shared/consts/AMO.consts';
import ArrowDownSvg from 'shared/svg/arrow-down/ArrowDownSvg';
import { ManagerDTO } from 'entities/managers';
import { Collapse } from '@mui/material';
import cn from 'classnames';

type SelectableRowProps = {
	groupId: string
	managers: ManagerDTO[]
	onManagersAppend: (managers: ManagerDTO[]) => void
}
const SelectableGroup = ({ groupId, managers, onManagersAppend }: SelectableRowProps): JSX.Element => {

	const [ open, setOpen ] = useState(true);

	return (
		<>
			<div
				style={{ backgroundColor: GroupsColors[getGroupColorIndex(groupId)] }}
				className={classes['group-row']}
				onClick={() => onManagersAppend(managers)}
			>
				<div className={classes['group-row__text']}>
					{GROUPS[groupId]}
				</div>
				<div
					className={cn(
						classes['group-row__svg'],
						open && classes['group-row__svg_open']
					)}
					onClick={(e) => {
						e.stopPropagation();
						setOpen(!open);
					}}
				>
					<ArrowDownSvg/>
				</div>
			</div>
			<Collapse in={open}>
				{managers.map((manager) =>
					<div
						key={manager.id}
						className={classes['selectable-manager-row']}
						onClick={() => onManagersAppend([ manager ])}
					>
						{manager.userName}
					</div>
				)}
			</Collapse>
		</>

	);
};

export default SelectableGroup;