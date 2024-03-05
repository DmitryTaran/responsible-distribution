import React, { ReactNode, useState } from 'react';
import { GROUPS } from 'shared/consts/AMO.consts';
import { ManagerDTO } from 'entities/managers';
import classes from './selectedGroup.module.scss';
import { GroupsColors } from 'shared/theme/AmoLightTheme';
import { getGroupColorIndex } from 'entities/managers/utils/helpers';
import CircleCrossSvg from 'shared/svg/circle-cross/CircleCrossSvg';
import cn from 'classnames';
import SelectedManager from 'features/user-selector/components/selected-manager/SelectedManager';

type SelectedGroupProps = {
	onManagersRemove: (managers: ManagerDTO[]) => void
	managers: ManagerDTO[]
	groupId: string
	weightInput?: (manager: ManagerDTO) => ReactNode
}
const SelectedGroupRow = ({ onManagersRemove, managers, groupId, weightInput }: SelectedGroupProps): JSX.Element => {

	const [ isCrossShow, setIsCrossShow ] = useState(false);

	return (
		<>
			<div
				className={classes['selected-group']}
				onMouseEnter={() => setIsCrossShow(true)}
				onMouseLeave={() => setIsCrossShow(false)}
				style={{ backgroundColor: GroupsColors[getGroupColorIndex(groupId)] }}
			>
				<div className={classes['selected-group__text']}>
					{GROUPS[groupId]}
				</div>
				<div
					className={cn(
						classes['selected-group__svg'],
						isCrossShow && classes['selected-group__svg_hidden']
					)}
					onClick={() => {
						onManagersRemove && onManagersRemove(managers);
					}}
				>
					<CircleCrossSvg
						width={20}
						height={20}
					/>
				</div>
			</div>
			<div className={classes['selected-managers-row']}>
				{managers.map((manager) =>
					<SelectedManager
						key={manager.id}
						onManagersRemove={onManagersRemove}
						manager={manager}
						weightInput={weightInput}
					/>
				)}
			</div>
		</>
	);
};

export default SelectedGroupRow;