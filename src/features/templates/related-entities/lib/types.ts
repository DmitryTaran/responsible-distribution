import { TemplateDTO } from 'entities/templates';
import { ReactNode } from 'react';
import { FieldPath } from 'react-hook-form';

export type ResponsibleCheckboxSetting = {
	label: string
	name: FieldPath<TemplateDTO>
	disabled?: boolean
	hint?: ReactNode
}