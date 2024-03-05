import { Collapse } from '@mui/material';
import { RolesValues, useUpdateManagers } from 'entities/managers';
import { useUpdateRoles } from 'entities/managers/swr/useUpdateRoles';
import { RolesNames, UpdateStatusDTO } from 'entities/managers/types/ManagerDTO';
import { StatusesValues } from 'entities/statuses';
import React, { Dispatch, useEffect, useState } from 'react';
import { account } from 'shared/consts/AMO.consts';
import { StatusesSelectOptions } from 'entities/statuses/consts';
import classes from './statusesToolbar.module.scss';
import OutlinedSelect from 'shared/components/outlined-select/OutlinedSelect';

type StatusesToolbarProps = {
	isShow: boolean
	selectedManagers: string[]
	setSelectedManagers: Dispatch<string[]>
	defaultValues: {
		widgetRole: RolesValues | null
		status: StatusesValues | null
	}
}

const StatusesToolbar = ({
	isShow,
	selectedManagers,
	setSelectedManagers,
	defaultValues
}: StatusesToolbarProps): JSX.Element => {
	const { widgetRole, status } = defaultValues;

	const updateStatus = useUpdateManagers();
	const updateRole = useUpdateRoles();

	const [ statusSelect, setStatusSelect ] = useState<StatusesValues | null>(status);
	const [ roleSelect, setRoleSelect ] = useState<RolesValues | null>(widgetRole);

	useEffect(() => {
		setStatusSelect(status);
		setRoleSelect(widgetRole);
	}, [ widgetRole, status ]);

	const handleStatusChange = (status: StatusesValues): void => {
		const updatedManagers = selectedManagers.map<UpdateStatusDTO>(userId => ({
			userId: Number(userId),
			status: status,
			accountId: account.id,
		}));
		updateStatus(updatedManagers);
		setSelectedManagers([]);
	};

	const handleRoleChange = (widgetRole: RolesValues): void => {
		const userIds = selectedManagers.map(userId => Number(userId));
		updateRole({ userIds, widgetRole });
		setSelectedManagers([]);
	};


	return <Collapse in={isShow} unmountOnExit>
		<div className={classes['toolbar']}>
			<OutlinedSelect
				value={statusSelect}
				onChange={handleStatusChange}
				options={StatusesSelectOptions}
				placeholder={<div style={{ marginLeft: '15px' }}>Выберите статус</div>}
				width={152}
			/>
			<OutlinedSelect
				value={roleSelect}
				onChange={handleRoleChange}
				options={RolesNames}
				placeholder={'Выберите роль'}
				width={81}
			/>
		</div>
	</Collapse>;
};

export default StatusesToolbar;