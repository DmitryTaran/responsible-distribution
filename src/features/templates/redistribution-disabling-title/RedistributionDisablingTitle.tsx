import React, { useEffect, useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { DistributionTypes, TemplateFieldNames } from 'entities/templates';
import ToggleTitle from 'shared/components/toggle-title/ToggleTitle';
import CustomTooltip from 'shared/components/custom-tooltip/CustomTooltip';

type RedistributionDisablingTitleProps = {
	handleSettingsToggle: (isOpen: boolean) => void
	isSettingsOpen: boolean
}

const RedistributionDisablingTitle = ({
	handleSettingsToggle,
	isSettingsOpen
}: RedistributionDisablingTitleProps): JSX.Element => {

	const { DISTRIBUTION_TYPE } = TemplateFieldNames;

	const distributionType = useWatch({ name: DISTRIBUTION_TYPE });

	const isSwitchDisabled = distributionType !== DistributionTypes.QUEUE;
	useEffect(() => {
		if (isSwitchDisabled) {
			handleSettingsToggle(false);
		}
	}, [ distributionType ]);

	const switchRef = useRef<HTMLDivElement | null>(null);
	return (
		<CustomTooltip
			anchorRefCurrent={switchRef?.current}
			tooltipText={'Опция доступна только для алгоритма “По очереди”'}
			disableHoverListener={!isSwitchDisabled}
			placement={'bottom-end'}
		>
			<ToggleTitle
				switchContainerRef={switchRef}
				title="Перераспределение по времени"
				subtitle="Если заявка не принята вовремя, то она направляется следующему в очереди"
				handleToggle={handleSettingsToggle}
				condition={isSettingsOpen}
				disabled={isSwitchDisabled}
			/>
		</CustomTooltip>
	);
};

export default RedistributionDisablingTitle;