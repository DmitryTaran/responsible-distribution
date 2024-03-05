import { Collapse } from '@mui/material';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { normalizeUsername } from 'shared/utils/helpers';
import classes from './formTitle.module.scss';
import { NORMAL_LINE_HEIGHT } from 'shared/theme/AmoLightTheme';

type FormTitleProps = {
	usernames?: string[]
	isOfficeSchedule?: boolean
}


const MAX_SHOWN_ROWS = 3;

const FormTitle = ({ usernames, isOfficeSchedule }: FormTitleProps): JSX.Element => {

	const [open, setOpen] = useState(false);
	const [hidden, setHidden] = useState(true);

	const [height, setHeight] = useState(NORMAL_LINE_HEIGHT);

	const usernamesRef = useRef<HTMLSpanElement | null>(null);

	useEffect(() => {
		if (usernamesRef.current) {
			const { current: usernamesBlock } = usernamesRef;
			if (usernamesBlock?.offsetHeight < NORMAL_LINE_HEIGHT * MAX_SHOWN_ROWS) {
				setHeight(usernamesBlock?.offsetHeight);
			} else {
				setHeight(NORMAL_LINE_HEIGHT * MAX_SHOWN_ROWS);
			}
		}
	}, [usernamesRef.current]);


	return (
		<div className={classes['title-container']}>
			<div className={classes['title']}>Настройки рабочего графика для:</div>
			<Collapse
				in={open}
				collapsedSize={height}
				onTransitionEnd={() => {
					if (!open) {
						setHidden(true);
					}
				}}
			>
				<span
					ref={usernamesRef}
					style={{ lineHeight: `${NORMAL_LINE_HEIGHT}px` }}
					className={cn(
						classes['usernames'],
						hidden && classes['usernames-hidden'],
					)}
					onClick={() => {
						if (!open) {
							setHidden(false);
						}
						setOpen(!open);
					}}
				>
					{isOfficeSchedule
					 ? 'График офиса'
					 : usernames?.map(username =>
						normalizeUsername(username)).join(', ')
					}
				</span>
			</Collapse>
		</div>
	);
};

export default FormTitle;