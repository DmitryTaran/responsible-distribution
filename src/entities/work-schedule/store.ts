import { makeAutoObservable } from 'mobx';
import { WorkSchedule } from './types';
import { OFFICE_SCHEDULE_ID } from 'widgets/work-schedule/work-schedule-form/lib/consts';
import { ManagerDTO } from 'entities/managers';

type StoredWorkSchedule = WorkSchedule | null

type WorkScheduleStoreData = {
	selectedSchedule: WorkSchedule
	userIds: number[]
	userNames: string[]
	onSubmit?: () => void
} | null

export class WorkScheduleDrawerStore {

	private _isOpen: boolean = false;

	private _selectedSchedule: StoredWorkSchedule = null;

	private _userNames: string[] = [];

	private _userIds: number[] = [ OFFICE_SCHEDULE_ID ];

	private _selectedManagers: ManagerDTO[] = [];

	private _workScheduleData: WorkScheduleStoreData = null;

	constructor() {
		makeAutoObservable(this);
	}

	get workScheduleData(): WorkScheduleStoreData {
		return this._workScheduleData;
	}

	setWorkScheduleData(workScheduleData: WorkScheduleStoreData): void {
		this._workScheduleData = workScheduleData;
	}

	get selectedSchedule(): StoredWorkSchedule {
		return this._selectedSchedule;
	}

	get userNames(): string[] {
		return this._userNames;
	}

	public setUserNames(userNames: string[]): void {
		this._userNames = userNames;
	}

	public setSelectedSchedule(schedule: StoredWorkSchedule): void {
		this._selectedSchedule = schedule;
	}

	public resetSelectedSchedule(): void {
		this._selectedSchedule = null;
		this._userIds = [ OFFICE_SCHEDULE_ID ];
		this._userNames = [];
		this._workScheduleData = null;
	}

	get isOpen(): boolean {
		return this._isOpen;
	}

	public setIsOpen(isOpen: boolean): void {
		this._isOpen = isOpen;
	}

	get userIds(): number[] {
		return this._userIds;
	}

	public setUserIds(userIds: number[]) {
		this._userIds = userIds;
	}

	get selectedManagers(): ManagerDTO[] {
		return this._selectedManagers;
	}

	public setSelectedManagers(managers: ManagerDTO[]) {
		this._selectedManagers = managers;
	}

}

export const workScheduleDrawerStore = new WorkScheduleDrawerStore();
