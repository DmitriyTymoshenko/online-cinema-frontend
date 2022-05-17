import { axiosClassic } from 'api/interceptors';

import { IGenreEditInput } from '@/components/screens/admin/genre/genre-edit.interface';

import { ICollection } from '@/screens/collections/collections.interface';

import { IGenre } from '@/shared/types/movie.types';

import { getGenresUrl } from '@/config/api.config';

import axios from '../api/interceptors';

export const GenreService = {
	async getAll(searchTerm?: string) {
		return await axiosClassic.get<IGenre[]>(getGenresUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getById(_id: string) {
		return await axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`));
	},

	async getCollections() {
		return await axiosClassic.get<ICollection[]>(getGenresUrl(`/collections`));
	},

	async getBySlug(slug: string) {
		return await axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`));
	},

	async create() {
		return axios.post<string>(getGenresUrl(``));
	},

	async update(_id: string, data: IGenreEditInput) {
		return axios.put<string>(getGenresUrl(`/${_id}`), data);
	},

	async delete(_id: string) {
		return axios.delete<string>(getGenresUrl(`/${_id}`));
	},
};
