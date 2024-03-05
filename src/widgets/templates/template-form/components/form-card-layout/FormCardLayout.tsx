import React, { CSSProperties, PropsWithChildren, ReactNode } from 'react';
import classes from './formLayout.module.scss';
import cn from 'classnames';
import { Collapse } from '@mui/material';

type FormLayoutProps = {
	title: ReactNode
	classes?: {
		layout?: string
		card?: string
	}
	styles?: {
		layout?: CSSProperties
		card?: CSSProperties
	}
	collapsed?: boolean

} & PropsWithChildren
const FormCardLayout = ({
	title,
	children,
	classes: externalClasses,
	styles: externalStyles,
	collapsed = true
}: FormLayoutProps): JSX.Element => {
	return (
		<div
			className={
				cn(classes['layout'], externalClasses?.layout)
			}
			style={externalStyles?.layout}
		>
			{title}
			<Collapse in={collapsed} unmountOnExit>
				<div
					className={
						cn(
							classes['card'],
							externalClasses?.card
						)
					}
					style={externalStyles?.card}
				>
					{children}
				</div>
			</Collapse>
		</div>
	);
};

export default FormCardLayout;