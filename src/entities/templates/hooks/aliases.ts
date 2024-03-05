import { useFormContext } from 'react-hook-form';
import { TemplateDTO, TemplateRDO } from '../types';
import { useConditionalForm } from 'shared/hooks/useConditionalForm';

export const useTemplateFormContext = () => useFormContext<TemplateDTO>();

export const useTemplateConditionalForm = useConditionalForm<TemplateDTO>;


