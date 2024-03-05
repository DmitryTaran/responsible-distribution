import { Collapse } from '@mui/material';
import classes from 'entities/statuses/components/status-page-description/statusPageDescription.module.scss';
import React, { ReactNode, useState } from 'react';

type CollapsableTextProps = {
	textPreview: ReactNode
	textHidden: ReactNode
}

const CollapsableText = ({ textPreview, textHidden }: CollapsableTextProps): JSX.Element => {

	const [open, setOpen] = useState(false);

	return (
		<div>
			<div>
				{textPreview}
			</div>
			<Collapse in={open}>
				{textHidden}
			</Collapse>
			<div className={classes['text-collapse-container']}>
				<span className={classes['text-collapse']} onClick={() => setOpen(!open)}>
					{open
					 ? 'Скрыть текст'
					 : 'Читать далее'
					}
				</span>
				<br/>
			</div>
		</div>
	);
};

export default CollapsableText;