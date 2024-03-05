import { DistributionTypes, DistributionTypesNames, RedistributionSoundsTypes } from './consts';

export type User = {
	id: string
	userName?: string
}

export type UserSettingRDO = {
	user: User
	weight: number
}

export type UserSettingDTO = {
	user: string
	weight?: number
}

export type TemplateRDO = {
	id: string;
	name: string;
	oldId?: string | null;
	distributionType: DistributionTypes;
	distributionSettings: UserSettingRDO[];
	isChangeContactsResponsible: boolean;
	isChangeMainContactResponsible: boolean
	isChangeMainContactTasksResponsible: boolean;
	isChangeCompanyResponsible: boolean;
	isChangeLeadTasksResponsible: boolean;
	isChangeContactsTasksResponsible: boolean;
	isChangeCompanyTasksResponsible: boolean
	redistributeByTimeSettings: RedistributeByTimeSettings | null;
	isConsiderIndividualWorkTime: boolean;
	isControlRepeatSales: IsControlRepeatSalesOptions | null;
	isControlRepeatEntityResponsible?: boolean
	isConsiderUserStatus: boolean;
	workTime?: WorkTime | null;
	createdAt: string;
	updatedAt: string;
	successPipelineId?: number;
	successStatusId?: number;
	distributionTypeName?: DistributionTypesNames
	isValid: boolean
};

export type TemplateDTO = Omit<TemplateRDO, 'distributionSettings'> & {
	distributionSettings: UserSettingDTO[]
}

export type RedistributeByTimeSettings = {
	acceptanceTime: number;
	redistributionQuantity: number;
	soundEffect: RedistributionSoundsTypes;
	workTimeSettings: WorkTime | null;
};

export type WorkTime = {
	days: string[];
	dayBeginTime: string;
	dayEndTime: string;
};


export type IsControlRepeatSalesOptions = 'contact' | 'company'


