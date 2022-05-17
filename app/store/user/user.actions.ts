import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { toastr } from 'react-redux-toastr';

import { AuthService } from '@/services/auth/auth.service';

import { toastError } from '@/utils/toast-error';

import { errorCatch } from '../../api/api.helper';

import { IAuthResponse, IEmailPassword } from './user.interface';

export const register = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/register',
	async ({ email, password }, thunkApi) => {
		try {
			const response: IAuthResponse = await AuthService.register(
				email,
				password
			);
			toastr.success('Registration', 'Completed successfully!');
			return response;
		} catch (e) {
			toastError(e);
			return thunkApi.rejectWithValue(e);
		}
	}
);

export const login = createAsyncThunk<IAuthResponse, IEmailPassword>(
	'auth/login',
	async ({ email, password }, thunkApi) => {
		try {
			const response: IAuthResponse = await AuthService.login(email, password);
			toastr.success('Login', 'Completed successfully!');
			return response;
		} catch (e) {
			toastError(e);
			return thunkApi.rejectWithValue(e);
		}
	}
);

export const logout = createAsyncThunk('auth/logout', async () => {
	await AuthService.logout();
});

export const checkAuth = createAsyncThunk<IAuthResponse>(
	'auth/check-auth',
	async (_, thunkApi) => {
		try {
			const response: IAuthResponse = await AuthService.getNewTokens();
			return response;
		} catch (e) {
			if (errorCatch(e) === 'jwt expired') {
				toastr.error(
					'Logout',
					'Your authorization is finished , please sign in again'
				);
				thunkApi.dispatch(logout());
			}
			return thunkApi.rejectWithValue(e);
		}
	}
);
