import {
	DistributionTypesNames, TemplateDTO,
	useDeleteTemplate,
	useGetTemplate,
	useTemplateDrawerContext
} from 'entities/templates';
import { observer } from 'mobx-react-lite';
import React, { useMemo, useState } from 'react';
import AmoButton from 'shared/components/amo-button/AmoButton';
import AmoTableBody from 'shared/components/amo-table/components/table-body/AmoTableBody';
import AmoTableHead from 'shared/components/amo-table/components/table-header/AmoTableHead';
import withFilterProvider from 'shared/components/amo-table/lib/helpers/withFilterProvider';
import { useFilteredData } from 'shared/components/amo-table/lib/hooks/useFilteredData';
import { usePagedData } from 'shared/components/amo-table/lib/hooks/usePagedData';
import { useSortedData } from 'shared/components/amo-table/lib/hooks/useSortedData';
import { useFilterContext } from 'shared/components/amo-table/lib/hooks/useTableContext';
import Confirmation from 'shared/components/confirmation/Confirmation';
import ContentLayout from 'shared/components/content-layout/ContentLayout';
import PlusSvg from 'shared/svg/plus/PlusSvg';
import { templateListHeaders } from 'widgets/templates/template-list/lib/templateListHeaders';
import AmoTableLayout from 'shared/components/amo-table/components/table-layout/AmoTableLayout';

const TemplateList = withFilterProvider(observer((): JSX.Element => {

	const { templateData } = useGetTemplate();
	const filterStore = useFilterContext<TemplateDTO>();
	const [ selectedRows, setSelectedRows ] = useState<string[]>([]);
	const templateDrawerStore = useTemplateDrawerContext();
	const deleteTemplates = useDeleteTemplate();
	const renderingTemplateData = useMemo(() =>
			templateData.map(template => ({
				...template,
				distributionTypeName: DistributionTypesNames[template.distributionType],
			})),
		[ templateData ]);
	const filteredData = useFilteredData(renderingTemplateData, templateListHeaders);
	const sortedAndFilteredData = useSortedData(filteredData, templateListHeaders);
	const pagedData = usePagedData(sortedAndFilteredData);

	const [ isOpenConfirmation, setIsOpenConfirmation ] = useState<boolean>(false);

	return (
		<ContentLayout>
			<AmoTableLayout
				totalCount={filteredData.length}
				toolbar={
					<div style={{ display: 'flex', marginBottom: '20px', justifyContent: 'end' }}>
						<AmoButton
							leftSvg={<PlusSvg/>}
							onClick={() => {
								templateDrawerStore.resetTemplate();
								templateDrawerStore.setIsOpen(true);
							}}
						>
							Создать новый шаблон
						</AmoButton>
					</div>
				}
			>
				<AmoTableHead
					data={filteredData}
					headers={templateListHeaders}
					totalCount={filteredData.length}
					selectedRows={selectedRows}
					checkbox
					onRowCheck={(ids) => {
						setSelectedRows(ids as string[]);
					}}
					onDelete={() => setIsOpenConfirmation(true)}
				/>
				<AmoTableBody
					data={pagedData}
					headers={templateListHeaders}
					totalCount={filteredData.length}
					selectedRows={selectedRows}
					onRowCheck={(ids) => {
						setSelectedRows(ids as string[]);
					}}
					checkbox
					onRowClick={(template) => {
						templateDrawerStore.setSelectedTemplate(template);
						templateDrawerStore.setIsOpen(true);
					}}/>
			</AmoTableLayout>
			<Confirmation
				open={isOpenConfirmation}
				setOpen={setIsOpenConfirmation}
				handleYes={() => {
					deleteTemplates(selectedRows);
					setSelectedRows([]);
					filterStore.setPage(1);
				}}
				text={{
					title: 'Удалить элементы',
					subtitle: 'Вы действительно хотите удалить выбранные элементы?',
					description: 'Все данные, как-либо связанные с выбранными элементами, будут удалены. Востановить удаленные данные будет невозможно.',
				}}
			/>
		</ContentLayout>
	);
}));

export default TemplateList;