import React from 'react';
import classes from './reportPlaceholder.module.scss';

type ReportPlaceholderProps = {
	text: string
}

const ReportPlaceholder = ({ text }: ReportPlaceholderProps): JSX.Element => {
	return (
		<div className={classes['report-placeholder']}>
			{text}
		</div>
	);
};

export default ReportPlaceholder;