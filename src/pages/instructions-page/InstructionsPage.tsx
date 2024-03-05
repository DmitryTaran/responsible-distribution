import React from 'react';
import ContentLayout from 'shared/components/content-layout/ContentLayout';
import CustomBarChart from 'shared/components/custom-bar-chart/CustomBarChart';
import { BarChartData } from 'shared/components/custom-bar-chart/lib/types';
import ReportPageLayout from 'shared/components/report-page-layout/ReportPageLayout';

const InstructionsPage = (): JSX.Element => {

	return (
		<ReportPageLayout>
			<div style={{ position: 'relative' }}>
				<ContentLayout>
					{/*<CustomBarChart data={data.slice(0, 23)}/>*/}
				</ContentLayout>
			</div>
		</ReportPageLayout>
	);
};

export default InstructionsPage;