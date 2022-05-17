import { IMovieEditInput } from '@/components/screens/admin/movie/movie-edit.interface';

import { IActor, IMovie } from '@/shared/types/movie.types';

import { getMoviesUrl } from '@/config/api.config';

import axios, { axiosClassic } from '../api/interceptors';

export const MovieService = {
	async getAll(searchTerm?: string) {
		return await axiosClassic.get<IMovie[]>(getMoviesUrl(``), {
			params: searchTerm ? { searchTerm } : {},
		});
	},

	async getMostPopularMovies() {
		const { data: movies } = await axiosClassic.get<IMovie[]>(
			getMoviesUrl('/most-popular')
		);
		return movies;
	},

	async getById(_id: string) {
		return await axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`));
	},

	async getBySlug(slug: string) {
		return await axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`));
	},

	async getByGenres(genreIds: string[]) {
		return await axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres/`), {
			genreIds,
		});
	},
	async getByActor(actorId: string) {
		return await axiosClassic.get<IActor>(getMoviesUrl(`/by-actor/${actorId}`));
	},

	async update(_id: string, data: IMovieEditInput) {
		return axios.put<string>(getMoviesUrl(`/${_id}`), data);
	},

	async create() {
		return axios.post<string>(getMoviesUrl(``));
	},

	async delete(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`));
	},

	async updateCountOpened(slug: string) {
		return axiosClassic.put<string>(getMoviesUrl(`/update-count-opened`), {
			slug,
		});
	},
};
