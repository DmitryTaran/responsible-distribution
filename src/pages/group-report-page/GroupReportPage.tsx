import { GroupReport } from 'widgets/group-report/GroupsReport';
import React from 'react';
import ReportPageLayout from 'shared/components/report-page-layout/ReportPageLayout';

const GroupReportPage = (): JSX.Element => {
	return (
		<ReportPageLayout>
			<GroupReport/>
		</ReportPageLayout>
	);
};

export default GroupReportPage;