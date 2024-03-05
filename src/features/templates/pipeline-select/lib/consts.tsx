import React from 'react';

export const SubtitlePreviewText = 'Расчёт конверсии производится отдельно для каждого шаблона. Для расчета общего числа, полученных пользователями Сделок, учитываются все Сделки которые были распределены данным шаблоном через Цифровую воронку (Digital';
export const SubtitleHiddenText = 'Pipeline). А для учёта успешно завершенных Сделок необходимо ниже выбрать любой необходимый вам этап в любой воронке продаж. Триггер распределения Сделок может находиться в одной воронке, а успешный завершенный этап в другой.';

export const PipelineSelectHint = <>
	*У каждого шаблона распределения заявок может быть только один триггер распределения на все
	воронки продаж в amoCRM. <br/>
	**В случае если карточка Сделки была распределена на одного пользователя, а на успешно
	завершенный этап карточку Сделки перевел другой пользователь, то данная карточка Сделки
	полностью будет изъята из статистики первого пользователя (виджет будет считать, что данный
	пользователь эту Сделку не получал), и перенесена в статистику пользователя, который перевел
	карточку Сделки на успешно завершённый этап (виджет будет считать, что данный пользователь
	получил эту карточку Сделки в момент распределения). В случае если карточка Сделки
	перенесена на успешно завершенный этап пользователем, не участвующим в шаблоне, то карточка
	Сделки будет полностью удалена из статистики распределения этого шаблона (отчет
	“Распределение по конверсии”).
</>;