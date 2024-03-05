import { makeAutoObservable } from 'mobx';
import { TemplateDTO } from '../types';

type StoredTemplate = TemplateDTO | null

export class TemplateDrawerStore {

	private _isOpen: boolean = false;

	private _selectedTemplate: StoredTemplate = null;

	constructor() {
		makeAutoObservable(this);
	}

	get selectedTemplate(): StoredTemplate {
		return this._selectedTemplate;
	}

	public setSelectedTemplate(template: StoredTemplate): void {
		this._selectedTemplate = template;
	}

	public resetTemplate(): void {
		this._selectedTemplate = null;
	}

	get isOpen(): boolean {
		return this._isOpen;
	}

	public setIsOpen(isOpen: boolean): void {
		this._isOpen = isOpen;
	}

	public isUpdate(): boolean {
		return Boolean(this._selectedTemplate);
	}

}

export const templateDrawerStore = new TemplateDrawerStore();
