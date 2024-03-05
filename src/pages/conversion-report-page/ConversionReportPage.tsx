import ConversionReport from 'widgets/conversion-report/ConversionReport';
import React from 'react';
import ReportPageLayout from 'shared/components/report-page-layout/ReportPageLayout';

const ConversionReportPage = (): JSX.Element => {
	return (
		<>
			<ReportPageLayout>
				<ConversionReport/>
			</ReportPageLayout>
		</>
	);
};

export default ConversionReportPage;