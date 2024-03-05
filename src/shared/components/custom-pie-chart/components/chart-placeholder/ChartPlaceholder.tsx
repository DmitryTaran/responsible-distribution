import React, { ReactNode } from 'react';
import ChartSkeleton from 'shared/components/custom-pie-chart/components/skeleton/ChartSkeleton';
import { CHART_PLACEHOLDER_Z_INDEX, leadCases } from 'shared/components/custom-pie-chart/lib/consts';
import classes from 'shared/components/custom-pie-chart/components/chart-placeholder/custom-pie-chart-recharts.module.scss';
import ChartLabelsList from 'shared/components/custom-pie-chart/components/chart-labels-list/ChartLabelsList';
import { emptyData } from 'shared/components/custom-pie-chart/components/skeleton/const';

type ChartPlaceholderProps = {
	text: ReactNode
}

const ChartPlaceholder = ({ text = "По данному запросу ничего не найдено" }: ChartPlaceholderProps): JSX.Element => {
	return (
		<>
			<div>
				<ChartSkeleton size={349} centerLabel={leadCases}/>
			</div>
			<div
				style={{ zIndex: CHART_PLACEHOLDER_Z_INDEX }}
				className={classes['fake-report__title-wrapper']}>
				<h3 className={classes['fake-report__title']}>
					{text}
				</h3>
			</div>
			<ChartLabelsList
				data={emptyData}
			/>
		</>
	);
};

export default ChartPlaceholder;