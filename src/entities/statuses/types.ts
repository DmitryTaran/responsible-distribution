import { StatusesNames, StatusesValues } from 'entities/statuses';

export type StatusConfigType = {
	[key in StatusesValues]: {
		icon: JSX.Element;
		text: string;
		status: string;
		name: StatusesNames
	};
};
