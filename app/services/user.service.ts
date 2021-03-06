import { IProfileInput } from '@/components/screens/profile/profile.interface';

import { IGenreEditInput } from '@/screens/admin/genre/genre-edit.interface';

import { IMovie } from '@/shared/types/movie.types';
import { IUser } from '@/shared/types/user.interface';

import { getGenresUrl, getUsersUrl } from '@/config/api.config';

import axios from '../api/interceptors';

export const UserService = {
	async getAll(searchTerm?: string) {
		return await axios.get<IUser[]>(getUsersUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getProfile() {
		return await axios.get<IUser>(getUsersUrl(`/profile`));
	},
	async getFavorites() {
		return await axios.get<IMovie[]>(getUsersUrl(`/profile/favorites`));
	},
	async toggleFavorite(movieId: string) {
		return await axios.put<string>(getUsersUrl(`/profile/favorites`), {
			movieId,
		});
	},

	async updateProfile(data: IProfileInput) {
		return await axios.put<string>(getUsersUrl(`/profile`), data);
	},
	async getById(_id: string) {
		return await axios.get<IUser>(getUsersUrl(`/${_id}`));
	},

	async update(_id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data);
	},

	async deleteUser(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`));
	},
};
