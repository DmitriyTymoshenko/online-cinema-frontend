import { createSlice } from '@reduxjs/toolkit';

import { getStoreLocalStorage } from '@/utils/local-storage';

import { checkAuth, login, logout, register } from '@/store/user/user.actions';

import { IInitialState } from './user.interface';

const initialState: IInitialState = {
	isLoading: false,
	user: getStoreLocalStorage('user'),
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(register.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(register.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.user = payload.user;
		});
		builder.addCase(register.rejected, (state) => {
			state.isLoading = false;
			state.user = null;
		});
		builder.addCase(login.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(login.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.user = payload.user;
		});
		builder.addCase(login.rejected, (state) => {
			state.isLoading = false;
			state.user = null;
		});
		builder.addCase(logout.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.user = null;
		});
		builder.addCase(checkAuth.fulfilled, (state, { payload }) => {
			state.isLoading = false;
			state.user = payload.user;
		});
	},
});

export const { reducer } = userSlice;