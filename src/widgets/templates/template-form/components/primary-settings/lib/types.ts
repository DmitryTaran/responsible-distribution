import { TemplateRDO } from 'entities/templates';
import { InputsSettings } from 'shared/components/form-text-input/FormTextInput';
import { PrimaryFieldNames } from './const';


export type PrimarySettingsInputsConfig = Pick<InputsSettings<TemplateRDO, PrimaryFieldNames>, PrimaryFieldNames.name>

