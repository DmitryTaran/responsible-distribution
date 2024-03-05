import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import { ConversionReportRenderingItem } from 'entities/report/types/ConversionReportDTO';

export const useGetFallback = (leadsCount: number, isEnoughData?: boolean) => {
	const { filters } = useFilterContext<ConversionReportRenderingItem>();

	const isDataNotFoundInTemplate = Boolean(filters.get('template') && !leadsCount);
	const getChartFallback = (): string => {
		if (isDataNotFoundInTemplate) {
			return 'В данном шаблоне недостаточно данных для построения отчета, выберите другой шаблон';
		}
		if (!isEnoughData) {
			return 'Не хватает данных для построения отчета';
		}
		return 'По данному запросу ничего не найдено';
	};
	return getChartFallback()
}