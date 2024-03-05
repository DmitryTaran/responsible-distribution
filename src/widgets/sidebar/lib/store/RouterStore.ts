import { makeAutoObservable } from 'mobx';
import { SidebarCollapsableItems } from 'widgets/sidebar/lib/consts/sidebarOptions';
import { PagesKeys } from '../types';

export class RouterStore {

	private _selectedItem: PagesKeys = PagesKeys.Instructions;
	private _openedCollapseItem: SidebarCollapsableItems | null = null;


	constructor() {
		makeAutoObservable(this);
	}

	get selectedItem(): PagesKeys {
		return this._selectedItem;
	}

	public setSelectedItem(selectedItem: PagesKeys): void {
		this._selectedItem = selectedItem;
	}

	get openedCollapseItem(): SidebarCollapsableItems | null {
		return this._openedCollapseItem;
	}

	setOpenCollapseItem(openCollapseItem: SidebarCollapsableItems | null) {
		this._openedCollapseItem = openCollapseItem;
	}

}
