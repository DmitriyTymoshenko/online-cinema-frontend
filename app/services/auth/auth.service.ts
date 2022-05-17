import Cookies from 'js-cookie';

import { getAuthUrl } from '@/config/api.config';

import { IAuthResponse } from '@/store/user/user.interface';

import { getContentType } from '../../api/api.helper';
import { axiosClassic } from '../../api/interceptors';

import { removeTokenStorage, saveToStorage } from './auth.helper';

export const AuthService = {
	async register(email: string, password: string) {
		const { data } = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/register'),
			{ email, password }
		);
		if (data.accessToken) saveToStorage(data);

		return data;
	},

	async login(email: string, password: string) {
		const { data } = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login'),
			{ email, password }
		);
		if (data.accessToken) saveToStorage(data);

		return data;
	},

	logout() {
		removeTokenStorage();
		localStorage.removeItem('user');
	},

	async getNewTokens() {
		const refreshToken = Cookies.get('refreshToken');
		const { data } = await axiosClassic.post<IAuthResponse>(
			getAuthUrl('/login/access-token'),
			{ refreshToken },
			{ headers: getContentType() }
		);
		if (data.accessToken) saveToStorage(data);

		return data;
	},
};
