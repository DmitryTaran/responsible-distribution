import { ManagerDTO } from 'entities/managers';
import { RenderingManager } from 'entities/managers/types/ManagerDTO';

export type AmoManagers = {
	[key: number]: AmoManager
}

export type AmoManager = {
	active: boolean
	amo_profile_id: string
	amojo_id: string
	avatar: string
	free_user: string
	group: string
	id: string
	is_admin: 'Y' | 'N'
	login: string
	option: string
	status: string
	theme: number
	title: string
}

export type Pipeline = {
	_embedded: {
		pipelines: ({
			id: number
			name: string
		} & PipelineStatuses)[]
	}
}

export type PipelineStatuses = {
	_embedded: {
		statuses: {
			id: number
			name: string
		}[]
	}
}

export type SortedGroup = {
	id: string;
	name: string;
	managers: RenderingManager[];
	managersIds: number[];
	mongoIds: string[];
	colorIndex: number;
};

export type Manager = {
	id: string;
	name: string;
	group: string;
	isAdmin: boolean;
};

export type DefaultAmoValuesType = {
	[key: string]: string[];
};

export type AmoConstant = {
	managers: {
		[id: string]: {
			id: string;
			title: string;
			option: string;
			active: boolean;
			login: string;
			status: string;
			is_admin: string;
			free_user: string;
			amojo_id: string;
			amo_profile_id: string;
			avatar: string;
			group: string;
			theme?: number;
			online?: boolean;
		};
	};
	groups: {
		[id: string]: string;
	};
	account: {
		id: number;
		subdomain: string;
		cf: {
			[id: string]: AMOCustomField;
		};
	};
	task_types: {
		[keyName: string]: TaskTypes;
	};
	user: {
		id: number;
	};
};

export type AMOCustomField = {
	ID: number;
	NAME: string;
	TYPE_ID: number;
	ACCOUNT_ID: number;
	DESCRIPTION: string | null;
	CODE: number | null;
	SORT: number;
	ENTREE_COMPANY: number;
	ENTREE_CATALOG: number;
	ENTREE_CUSTOMERS: number;
	PREDEFINED: string;
	MULTIPLE: string;
	DISABLED: number;
	ORIGIN: number | null;
	CATALOG_ID: number | null;
	SETTINGS: CustomFieldSettings;
	deleted_at: number | null;
	ELEMENT_TYPES: {
		[index: number]: number;
	};
	ENTREE_DEALS: number;
	ENTREE_CONTACTS: number;
	TYPE_CODE: string;
	'~NAME': string;
	ENUMS?: {
		[id: number]: {
			ID: number;
			VALUE: string;
			'~VALUE': string;
			SORT: number;
			code: number | null;
			TOTAL: number;
		};
	};
};

export type CustomFieldSettings = {
	is_required: object;
	is_deletable: boolean;
	is_visible: boolean;
	triggers: object | null;
	vat_rates: object;
	filter_type: null;
	tracking_callback: string;
	search_in: string;
	currency: string;
	chained_lists: string | null;
};

export type TaskTypes = {
	id: number;
	option: string;
	color: string;
	icon_id: number;
};

export type AMOCRMScheme = {
	managers: AmoConstant['managers'];
	groups: AmoConstant['groups'];
	account: AmoConstant['account'];
	task_types: AmoConstant['task_types'];
	user: AmoConstant['user'];
	constant: <U extends keyof AmoConstant>(arg: U) => AmoConstant[U];
	getWidgetsArea: () => string;
};


