import { DistributionTypes, RedistributionSoundsTypes, SUCCESS_STATUS_ID_VALUE } from './index';
import { RedistributeByTimeSettings, TemplateDTO, TemplateRDO, WorkTime } from '../types';


export const templateDefaultValue: Omit<TemplateDTO, 'id' | 'name' | 'createdAt' | 'updatedAt'> = {
	distributionType: DistributionTypes.QUEUE,
	distributionSettings: [],
	isChangeMainContactTasksResponsible: false,
	isChangeCompanyResponsible: false,
	isChangeMainContactResponsible: false,
	isChangeLeadTasksResponsible: false,
	isConsiderIndividualWorkTime: false,
	isChangeCompanyTasksResponsible: false,
	isConsiderUserStatus: false,
	isControlRepeatSales: null,
	redistributeByTimeSettings: null,
	workTime: null,
	isChangeContactsResponsible: false,
	isChangeContactsTasksResponsible: false,
	isControlRepeatEntityResponsible: false
};

export const defaultRedistributionSettings: RedistributeByTimeSettings = {
	acceptanceTime: 10,
	redistributionQuantity: 1,
	soundEffect: RedistributionSoundsTypes.NONE,
	workTimeSettings: null,
};

export const defaultWorkTimeSettings: WorkTime = {
	days: [ 'Mon', 'Tue', 'Wed', 'Thu', 'Fri' ],
	dayEndTime: '18:00',
	dayBeginTime: '08:00',
};

