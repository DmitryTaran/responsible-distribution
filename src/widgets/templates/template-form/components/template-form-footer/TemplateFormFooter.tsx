import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import { useTemplateDrawerContext } from 'entities/templates';
import { useDeleteTemplate } from 'entities/templates';
import AmoButton from 'shared/components/amo-button/AmoButton';
import Confirmation from 'shared/components/confirmation/Confirmation';

import { templateFormFooterStyle } from './styles';

const TemplateFormFooter = (): JSX.Element => {
	const deleteTemplate = useDeleteTemplate();

	const [deleteConfirmationOpen, setDeleteConfirmationOpen] =
		useState<boolean>(false);

	const templateDrawerStore = useTemplateDrawerContext();

	const handleDeleteButtonClick = (): void => {
		const id = templateDrawerStore.selectedTemplate?.id;
		id && deleteTemplate([id]);
		templateDrawerStore.setIsOpen(false);
	};

	return (
		<Box sx={templateFormFooterStyle}>
			<AmoButton
				variant="primary"
				onSubmit={(e) => e.preventDefault()}
				type="submit"
			>
				Сохранить
			</AmoButton>
			{templateDrawerStore.isUpdate() && (
				<AmoButton
					variant="danger"
					color="error"
					onClick={(event) => {
						event.preventDefault();
						setDeleteConfirmationOpen(true);
					}}
				>
					Удалить
				</AmoButton>
			)}
			<Confirmation
				text={{
					title: 'Вы уверены, что хотите удалить шаблон?',
					subtitle: '',
					description: '',
				}}
				open={deleteConfirmationOpen}
				setOpen={setDeleteConfirmationOpen}
				handleYes={handleDeleteButtonClick}
			/>
		</Box>
	);
};

export default TemplateFormFooter;
