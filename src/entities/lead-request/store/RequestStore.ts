import { makeAutoObservable } from 'mobx';
import { LeadRequestDto } from '../types/LeadRequestDto';

class RequestStore {
	private _requests: LeadRequestDto[] = [];
	private limit = 5;

	constructor() {
		makeAutoObservable(this);
	}

	public deleteRequest(webhookId: string): void {
		this._requests = this._requests.filter(
			(request) => request.webhookId !== webhookId,
		);
	}

	public addRequest(request: LeadRequestDto): void {
		if (this._requests.length < this.limit) {
			this._requests.push(request);
		}
	}

	get requests(): LeadRequestDto[] {
		return this._requests;
	}
}

export const requestStore = new RequestStore();
