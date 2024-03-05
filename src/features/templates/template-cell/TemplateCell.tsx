import { useGetTemplate } from 'entities/templates';
import React from 'react';

const TemplateCell = ({ value }: { value: string }): JSX.Element => {
	const { templateData } = useGetTemplate();
	const renderingValue = templateData.find(({ id }) => id === value)?.name;
	return (
		<div>
			{renderingValue}
		</div>
	);
};

export default TemplateCell;