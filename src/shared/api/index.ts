import axios from 'axios';
import { ServerRoutes } from './routes';

export const $api = axios.create({
	baseURL: ServerRoutes.BaseUrl,
	headers: {
		'ngrok-skip-browser-warning': true,
	},
});

export const $amoApi = axios.create({
	baseURL: ServerRoutes.AccountUrl
})