import React from 'react';
import { ServerRoutes } from 'shared/api/routes';
import cl from './leadRef.module.scss';

type LeadRefProps = {
	id: number,
	name: string
}

const LeadRef = ({ name, id }: LeadRefProps): JSX.Element => {
	return (
		<a className={cl.refWrap} href={ServerRoutes.AccountUrl + `/leads/detail/${id}skip_filter=Y`} target='_blank'>
			<span className={cl.leadRef}>{name}</span>
		</a>
	);
};

export default LeadRef;