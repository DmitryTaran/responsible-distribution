import { TemplateFieldNames } from 'entities/templates';
import { IsControlRepeatSalesObjectOptions } from 'entities/templates/consts';

export const RepeatEntityCheckboxHint = '*При активации - будет проведена проверка текущего ответственного и, если текущий ответственный не подпадает под фильтры распределения (не рабочий день по его графику, не выбран в шаблоне, OFFLINE и т.д.), то ответственный за Сделку будет распределен между подходящими пользователями';

export const RepeatSalesCheckboxHint = '*При активации - данный шаблон распределения будет учитывать ответственного, за связанные со Сделкой, Контакт или Компанию'

export const IsControlRepeatSalesSelectObjectProps = {
	options: IsControlRepeatSalesObjectOptions,
	label: 'Учитывать ответственного из карточки',
	fieldName: TemplateFieldNames.IS_CONTROL_REPEAT_SALES,
} as const;
