import { StatusConfigType } from 'entities/statuses/types';
import React, { CSSProperties, ReactNode } from 'react';
import CircleSvg from 'shared/svg/cicle/CircleSvg';
import StopSignSvg from 'shared/svg/stop-sign/StopSignSvg';
import { Colors } from 'shared/theme/AmoLightTheme';

export enum StatusesValues {
	On = 'on',
	Off = 'off',
	ForcedOn = 'forced_on',
	ForcedOff = 'forced_off',
}

export enum StatusesNames {
	on = 'Включен',
	off = 'Выключен',
	forced_on = 'Включен принудительно',
	forced_off = 'Выключен принудительно'
}

export const statusConfig: StatusConfigType = {
	[StatusesValues.On]: {
		icon: <CircleSvg width={10} height={10} color={Colors.statusSuccessColor}/>,
		text: 'Вы включены в распределение',
		status: 'ONLINE',
		name: StatusesNames.on
	},
	[StatusesValues.Off]: {
		icon: <CircleSvg width={10} height={10} color={Colors.statusErrorColor}/>,
		text: 'Вы выключены из распределения',
		status: 'OFFLINE',
		name: StatusesNames.off
	},
	[StatusesValues.ForcedOn]: {
		icon: <StopSignSvg height={10} width={10} color={Colors.statusSuccessColor}/>,
		text: 'Вы принудительно включены в распределение',
		status: 'ONLINE',
		name: StatusesNames.forced_on
	},
	[StatusesValues.ForcedOff]: {
		icon: <StopSignSvg height={10} width={10} color={Colors.statusErrorColor}/>,
		text: 'Вы принудительно выключены из распределения',
		status: 'OFFLINE',
		name: StatusesNames.forced_off
	},
};

const selectOptionStyle: CSSProperties = { display: 'flex', alignItems: 'center', gap: '5px' };

export const StatusesSelectOptions: Record<string, ReactNode> = {
	[StatusesValues.On]: <div style={selectOptionStyle}>
		<CircleSvg width={10} height={10} color={Colors.statusSuccessColor}/>
		{StatusesNames.on}
	</div>,
	[StatusesValues.Off]: <div style={selectOptionStyle}>
		<CircleSvg width={10} height={10} color={Colors.statusErrorColor}/>
		{StatusesNames.off}
	</div>,
	[StatusesValues.ForcedOn]: <div style={selectOptionStyle}>
		<StopSignSvg height={10} width={10} color={Colors.statusSuccessColor}/>
		{StatusesNames.forced_on}
	</div>,
	[StatusesValues.ForcedOff]: <div style={selectOptionStyle}>
		<StopSignSvg height={10} width={10} color={Colors.statusErrorColor}/>
		{StatusesNames.forced_off}
	</div>
};