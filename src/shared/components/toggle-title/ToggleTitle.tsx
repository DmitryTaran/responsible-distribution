import { Box } from '@mui/material';
import React, { forwardRef, RefObject } from 'react';
import AmoSwitch from 'shared/components/amo-switch/AmoSwitch';
import Title from '../title/Title';

type ToggleTitleProps = {
	condition: boolean
	title: string
	subtitle?: string
	handleToggle: (checked: boolean) => void
	disabled?: boolean
	switchContainerRef?: RefObject<HTMLDivElement>
}

const ToggleTitle = (({ condition, title, subtitle, handleToggle, disabled, switchContainerRef }: ToggleTitleProps): JSX.Element => {

	return (
		<Box
			sx={{ cursor: 'pointer' }}
			display="flex"
			justifyContent="space-between"
			alignItems="center"
			onClick={() => handleToggle(!disabled && !condition)}
		>
			<Title text={title} subtitle={subtitle}/>
			<AmoSwitch
				containerRef={switchContainerRef}
				styles={{
					switch: {
						alignSelf: 'start'
					}
				}}
				variant="primary"
				checked={condition}
				value={String(condition)}
				disabled={disabled}
			/>
		</Box>
	);
});

export default ToggleTitle;