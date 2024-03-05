import UserReportTableWithChart from 'widgets/user-report/UsersReportTable';
import React from 'react';
import ReportPageLayout from 'shared/components/report-page-layout/ReportPageLayout';

const UsersReportPage = (): JSX.Element => {

	return (
		<ReportPageLayout>
			<UserReportTableWithChart/>
		</ReportPageLayout>
	);
};

export default UsersReportPage;