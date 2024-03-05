import React, { ReactNode, useState } from 'react';
import cn from 'classnames';
import classes from './selectedManager.module.scss';
import CircleCrossSvg from 'shared/svg/circle-cross/CircleCrossSvg';
import { ManagerDTO } from 'entities/managers';


type SelectedManagerProps = {
	manager: ManagerDTO;
	weightInput?: (manager: ManagerDTO) => ReactNode
	onManagersRemove: (managers: ManagerDTO[]) => void
}
const SelectedManager = ({ manager, weightInput, onManagersRemove }: SelectedManagerProps): JSX.Element => {

	const [ isCrossShown, setIsCrossShown ] = useState(false);

	return (
		<div
			className={classes['selected-manager']}
			onMouseEnter={() => setIsCrossShown(true)}
			onMouseLeave={() => setIsCrossShown(false)}
		>
			<div className={classes['name-container']}>
				<div className={
					cn(
						classes['name-container__name'],
						weightInput && classes['name-container__name_with-input'],
					)
				}>
					{manager.userName}
				</div>
				<div className={classes['name-container__weight-input']}>
					{weightInput && weightInput(manager)}
				</div>
			</div>
			<div
				className={cn(
					classes['selected-manager__svg'],
					isCrossShown && classes['selected-manager__svg_hidden']
				)}
				onClick={() => {
					onManagersRemove && onManagersRemove([ manager ]);
				}}
			>
				<CircleCrossSvg
					width={20}
					height={20}
				/>
			</div>
		</div>
	);
};

export default SelectedManager;