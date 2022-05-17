import { axiosClassic } from 'api/interceptors';

import { IActorEditInput } from '@/screens/admin/actor/actor-edit.interface';

import { IActor } from '@/shared/types/movie.types';

import { getActorsUrl } from '@/config/api.config';

import axios from '../api/interceptors';

export const ActorService = {
	async getAll(searchTerm?: string) {
		return await axiosClassic.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		});
	},
	async getById(_id: string) {
		return await axios.get<IActorEditInput>(getActorsUrl(`/${_id}`));
	},

	async getBySlug(slug: string) {
		return await axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`));
	},
	async update(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data);
	},
	async create() {
		return axios.post<string>(getActorsUrl(``));
	},
	async delete(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`));
	},
};
